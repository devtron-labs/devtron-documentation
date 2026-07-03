---
title: Silver Surfer Internals
sidebar_label: Silver Surfer Internals
---

# Silver Surfer Internals

This page explains how **Silver Surfer** works internally. It is a technical reference for those who want to understand the engine behind Devtron's [Cluster Upgrade Compatibility](./cluster-upgrade-compatibility.md) check. If you only want to *use* the feature, refer to [Cluster Upgrade Compatibility](./cluster-upgrade-compatibility.md) instead.

## What Is Silver Surfer?

[Silver Surfer](https://github.com/devtron-labs/silver-surfer) (its binary is named `kubedd`) is an **API-version compatibility checker and migration-path advisor** for Kubernetes objects. When you plan to upgrade a cluster to a newer Kubernetes version, Silver Surfer checks each object in the cluster against the **OpenAPI (swagger) specification that Kubernetes ships with the target release** and reports:

* which objects use an API version that is **removed** in the target version,
* which use an API version that is **deprecated**,
* which have a **newer API version available**, and
* which are **unchanged**.

For each object, it also states whether the object can be migrated with just an `apiVersion` change, needs field-level fixes first, or cannot be migrated as-is.

It has two entry points:

* **CLI (`kubedd`)** — takes manifests from files/directories, stdin, or a live cluster (via kubeconfig).
* **gRPC service** — a wire-injected server that Devtron's orchestrator calls. Devtron sends the target Kubernetes version and the cluster connection config, and receives back the categorized results.

---

## Architecture

The repository is organized into an orchestration layer, a core engine (`pkg/`), and a gRPC server wrapper (`app/`):

| Path | Responsibility |
| :--- | :--- |
| `main.go` | CLI entry (cobra `RootCmd`). Dispatches to `processFiles(args)` or `processCluster()`. |
| `kubedd/kubedd.go` | Orchestration. `Validate([]byte, *Config)` for files/stdin and `ValidateCluster(*Cluster, *Config)` for a live cluster. Loads schemas, splits YAML documents, invokes the validator, filters results. |
| `pkg/K8sSchemaParser.go` | Schema acquisition (download/load), swagger→OpenAPI 3 conversion, and the `KubeChecker` façade. |
| `pkg/Validator.go` | The core engine. Builds the kind-info index, performs version comparison, and runs `ValidateObject`. |
| `pkg/Visitor.go` | Custom recursive JSON walker (`VisitJSON`) for field-level deprecation detection. |
| `pkg/Cluster.go` | Live-cluster access via client-go discovery + dynamic client (`FetchK8sObjects`). |
| `pkg/Types.go` | Result types — `ValidationResult`, `SummaryValidationResult`, `SchemaError`, `KindInfo`. |
| `pkg/Util.go` | GVK parsing and version comparison (`compareVersion`, `getVersionType`). |
| `pkg/Filter.go` | Post-processing filters (ignore keys, exclude noisy errors). |
| `pkg/Output.go` | Output managers — human-readable tables, JSON, and TAP. |
| `app/` | gRPC server wrapper that reuses `kubedd.ValidateCluster` to serve Devtron. |

---

## Core Workflow

### 1. Ingesting Kubernetes objects

* **From files/stdin**: the input is read and split on the YAML document separator (`\n---\n`); each document is validated independently. Directory input collects `.yaml`/`.yml` files (respecting ignore patterns).
* **From a live cluster**: Silver Surfer builds a client-go discovery + dynamic client, determines the kinds to fetch from the server version, and lists live objects (skipping list/review/binding pseudo-resources). For each object it prefers the `kubectl.kubernetes.io/last-applied-configuration` annotation, falling back to the live manifest.

### 2. Obtaining the target version's schema

Schemas are **not bundled** in the repository — they are fetched at runtime (or read from a local path in air-gapped setups). The schema is downloaded from the Kubernetes source for the target release:

```
https://raw.githubusercontent.com/kubernetes/kubernetes/release-<version>/api/openapi-spec/swagger.json
```

If the target version's spec is not found (HTTP 404), Silver Surfer returns an "OpenAPI spec not found" error — this is why an unsupported target version is rejected.

Once downloaded, the schema is prepared through the following pipeline (`loadOpenApi2`):

1. Remove the problematic `IntOrString.format` field.
2. Parse the spec as **OpenAPI 2 (swagger)**.
3. Convert it to **OpenAPI 3**.
4. Re-inject `IntOrString` as `{"oneOf": [{"type": "string"}, {"type": "integer"}]}` so int-or-string fields validate correctly.
5. Reload and validate the resulting OpenAPI 3 document.

Objects are always validated against the **target** version's schema. In the live-cluster flow, the source/server version is used only to know which kinds to fetch.

### 3. Building the kind-info index

From the target schema, Silver Surfer builds an index (`buildKindInfoMap`) keyed by (lower-cased) `kind`. For each schema definition that carries the `x-kubernetes-group-version-kind` extension it records a `KindInfo`:

```go
type KindInfo struct {
    Version      string
    Group        string
    RestPath     string // non-empty ⇒ this GVK is actually served by the API server
    ComponentKey string // schema definition name used for validation lookup
    IsGA         bool
}
```

A key insight: the index scans the spec's `Paths` for POST/PUT operations and maps each GVK to its REST path. **A non-empty `RestPath` means that API version is actually served in the target version.** This is how a *deprecated-but-still-present* version is distinguished from a *truly removed* one.

Each kind's list of `KindInfo` is **sorted by version**, so the last element is the newest available version.

### 4. Comparing versions

Version ordering (`compareVersion` / `getVersionType`) ranks versions by:

1. `extensions` group lowest,
2. numeric major version,
3. **version type** — `alpha` < `beta` < `ga`,
4. minor number (a plain GA `vN` sorts highest).

This ordering is what identifies the "latest" available API version for a kind in the target schema.

### 5. Validating and categorizing an object

`ValidateObject` is the heart of the engine. For a given object it resolves two lookups via `getKindsMappings`:

* **`original`** — the schema whose Group+Version exactly matches the object's current `apiVersion` **and** has a non-empty `RestPath` (i.e., the current version is still served in the target).
* **`latest`** — the newest `KindInfo` for that kind in the target.

It then branches:

* If **`original` is present**, the current API version still exists in the target. The object is validated against the `original` schema; validation errors and deprecations "against current" are recorded, and the `Deprecated` flag is set from the schema description.
* Else if **`latest` is absent**, the kind is gone entirely (e.g., `PodSecurityPolicy`) → `Deleted = true`.
* Else if **`latest` is present**, the current version is gone but a newer one exists → `Deleted = true` (this is the **Removed** case).

Additionally, if a newer version exists (`original != latest`), the object is *also* validated against the `latest` schema, recording errors and deprecations "against latest" and setting `LatestAPIVersion`.

Validation against a schema (`applySchema`) does three things:

1. Resolves the schema (following `$ref` chains).
2. Runs the custom `VisitJSON` walker for field-level deprecation detection.
3. Sets the resource-level `Deprecated` flag if the schema description contains "deprecated".
4. Runs the structural (kin-openapi) validation for schema conformance.

### 6. Detecting deprecations

`VisitJSON` is a custom recursive walker (separate from structural validation). At each node it checks whether the corresponding schema's description contains the substring `"deprecated"` (case-insensitive); if so, it emits an error carrying the JSON **path** and the description as the **reason**. It descends only into keys present in the schema's properties. This is how **field-level** deprecations — not just whole-resource deprecations — are surfaced.

### 7. Determining the migration path

The migration path is derived from the combination of `Deleted`, `Deprecated`, `LatestAPIVersion`, and the per-target error counts:

| Condition | Migration status |
| :--- | :--- |
| Errors exist against the latest version | **N issue(s): fix issues before migration** |
| Current version has no served endpoint in target | **Alert! cannot migrate Kubernetes version** |
| Otherwise | **Can be migrated with just an apiVersion change** |

---

## How Categorization Is Decided

Categorization is computed **entirely against the target version's OpenAPI schema**, using the `original` and `latest` lookups described above:

| Category | Condition |
| :--- | :--- |
| **Removed** | The object's current `apiVersion` has no served endpoint (no `RestPath`) in the target version. |
| **Deprecated** | The current `apiVersion` is still served, but the target schema's description (resource- or field-level) marks it deprecated. |
| **Newer versions available** | The current `apiVersion` is still served, but a higher-sorted version exists for the kind (`original != latest`). |
| **Unchanged** | The current `apiVersion` is the latest and produced no validation or deprecation errors. |

The output bucketing priority is: `Deleted` → **Removed**; else `Deprecated` → **Deprecated**; else `LatestAPIVersion` set → **Newer**; else → **Unchanged**.

---

## Output

The output format is selectable (`-o/--output`):

* **stdout** (default) — colored, grouped tables: Removed (red), Deprecated (yellow), Newer versions (yellow), Unchanged (green). Each group renders a summary table (namespace, name, kind, current API version, replace-with API version, migration status) plus deprecation and validation-error tables. If nothing needs attention, it prints a success message.
* **json** — an indented array of `SummaryValidationResult`, skipping clean objects. Each entry contains `Kind`, `ResourceName`, `ResourceNamespace`, `APIVersion`, `LatestAPIVersion`, `Deleted`, `Deprecated`, `IsVersionSupported`, and the four error/deprecation lists (`ErrorsForOriginal`, `ErrorsForLatest`, `DeprecationForOriginal`, `DeprecationForLatest`), each error being `{Path, SchemaField, Reason, Origin}`. **This is the form the gRPC service returns to Devtron**, which then groups it into the Removed / Deprecated / New Versions sections shown in the UI.
* **tap** — TAP-protocol output for CI tooling.

---

## How Devtron Uses Silver Surfer

When you run the [Cluster Upgrade Compatibility](./cluster-upgrade-compatibility.md) check in the Resource Browser, Devtron's orchestrator calls Silver Surfer's gRPC service with the **target Kubernetes version** and the **cluster connection config**. Silver Surfer fetches the live objects, downloads and prepares the target version's OpenAPI schema, validates every object, and returns the JSON `SummaryValidationResult` list. Devtron then splits these into the **Removed ApiVersion**, **Deprecated ApiVersion**, and **New Versions Available** sections and renders them with per-object migration status.
