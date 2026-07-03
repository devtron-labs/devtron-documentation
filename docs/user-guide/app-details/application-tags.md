# Application Tags & Special Tag Handling

## Introduction

Application **tags** (also called **labels**) are key–value pairs you attach to a Devtron application. They are used to organize and search applications, to enforce governance through mandatory tags, and—when **propagated**—to add Kubernetes labels to the resources created for the application, including the **build (CI) infrastructure**.

This document explains:

* What application tags are and how to set them.
* The **Propagate** flag and where propagated tags end up.
* How tags are used by the **build infrastructure** (CI build pods).
* **Special and reserved tag handling** — the `devtron.ai/` reserved prefix, and enterprise **Global Tags** (mandatory tags, deployment policies, and value constraints).

:::info
### What is OSS vs Enterprise
* **Application tags** and the **Propagate** flag are available in all editions.
* **Build Infrastructure profiles** are available in all editions; the **Node Selector**, **Tolerations**, **ConfigMap**, and **Secret** options are **Enterprise-only**.
* **Global Tags** (mandatory tags, deployment policies, value constraints) are an **Enterprise-only** feature.
:::

---

## Application Tags (Labels)

Each tag on an application has three parts:

| Field | Type | Description |
| --- | --- | --- |
| `key` | string | The tag key. **Required.** Must be a valid Kubernetes label key when propagated. |
| `value` | string | The tag value. Optional when the tag is **not** propagated; **required** when propagated. |
| `propagate` | boolean | Whether the tag is added as a Kubernetes label on the application's resources. Defaults to `true`. |

You set tags when creating or editing an application (under the application's **Overview / About** section), or via the API. A tag can be added with only a key (no value) as long as it is **not** propagated.

### Tag Validation Rules

Validation depends on whether the tag is propagated:

* **`propagate = false`** — The tag is stored in Devtron only. The key is required; the value may be empty. It is **not** applied to any Kubernetes resource.
* **`propagate = true`** — The tag becomes a real Kubernetes label, so both key and value must satisfy Kubernetes label rules:
  * **Key** must be a *qualified name* (optional DNS-subdomain prefix + name, allowed characters, length limits) and cannot be empty.
  * **Value** must be a valid Kubernetes label value and cannot be empty.

:::info
If a propagated tag's key or value is not a valid Kubernetes label, Devtron rejects the application create/update with a validation error.
:::

---

## The Propagate Flag

The `propagate` flag controls whether a tag is merely metadata inside Devtron or a real Kubernetes label on the resources Devtron creates for the application.

* **`propagate = false`** — The tag is kept only in Devtron's database. Use this for organizational/searchable metadata (owner, team, cost-center notes, etc.) that you don't want on cluster objects.
* **`propagate = true`** — The tag is added as a Kubernetes label to the application's resources. Use this when you want the label to exist on the cluster for selection, cost allocation, network policies, or observability.

You can filter an application's tags by propagation status when reading them (e.g. "show propagated only").

---

## Tags and Build Infrastructure

When you trigger a CI build, the application's tags travel with the build request. Whether the **propagated** tags are applied as Kubernetes labels on the **build pod** (the buildx/CI runner pod) is controlled by a per-application feature flag.

| Feature Flag | Default | Effect |
| --- | --- | --- |
| `propagate-labels-in-buildx-pod` | `FALSE` | When enabled for an application, that application's **propagated** tags are added as labels on the CI build (buildx) pod. When disabled, build pods are not labelled with the application's tags. |

This lets platform teams apply governance, cost-allocation, or scheduling-related labels to the ephemeral build pods, consistently with the deployed workload.

:::info
### Tags do not select the build infra profile
A common misconception is that tags choose *which* build infrastructure profile a build uses. They do **not**. Build infrastructure profiles are selected by **scope/identifiers** (application, project, environment) — see below. Tags only add **labels** to the build pod; they don't change its CPU/memory/node placement.
:::

---

## Build Infrastructure Profiles

A **Build Infrastructure profile** defines the resources and runtime settings for CI build pods. Profiles are applied by **scope** using identifiers (application / project / environment), not by tags.

### Configurable Settings

| Setting | API key | Availability |
| --- | --- | --- |
| CPU Request | `cpu_request` | All editions |
| CPU Limit | `cpu_limit` | All editions |
| Memory Request | `memory_request` | All editions |
| Memory Limit | `memory_limit` | All editions |
| Build Timeout | `timeout` | All editions |
| Node Selector | `node_selector` | Enterprise |
| Tolerations | `tolerations` | Enterprise |
| ConfigMap | `cm` | Enterprise |
| Secret | `cs` | Enterprise |

### Profile Types

| Type | Description |
| --- | --- |
| `GLOBAL` / `DEFAULT` | The baseline profile applied when no specific profile is targeted. |
| `NORMAL` | A custom profile you create and apply to specific identifiers (apps/projects/environments). |

To target build pods to specific nodes (e.g. a dedicated build node pool), use the **Node Selector** and **Tolerations** settings of an Enterprise build infra profile — this is the supported way to control *where* a build runs, as opposed to using tags.

---

## Special & Reserved Tag Handling

### Reserved prefix: `devtron.ai/`

Tag keys beginning with `devtron.ai/` are reserved by the platform. A tag with this prefix **cannot be propagated** — its `propagate` flag must be `false`. Attempting to propagate a `devtron.ai/*` tag is rejected with a validation error.

### Global Tags [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

**Global Tags** let platform administrators define tag keys centrally and enforce them across applications. They differ from ordinary application tags in that they can be made **mandatory** and can **gate deployments**.

A Global Tag has the following key properties:

| Field | Description |
| --- | --- |
| `key` | The tag key (validated as a Kubernetes qualified name). |
| `description` | Human-readable description of the tag's purpose. |
| `mandatoryProjectIdsCsv` | Comma-separated list of project IDs for which this tag is mandatory. The special value `-1` makes it mandatory for **all** projects. |
| `propagate` | Whether the tag should be propagated as a Kubernetes label. |
| `deploymentPolicy` | How a missing mandatory tag affects deployments (see below). |
| `valueConstraint` | Optional restriction limiting the allowed values to a predefined choice list. |

#### Deployment Policies

When a Global Tag is mandatory, its **deployment policy** decides what happens if an application is missing that tag:

| Policy | Effect |
| --- | --- |
| `allow` | Tag is not enforced at deploy time; deployment proceeds. |
| `block` | Deployment is **blocked** (for any environment) until the tag is present. |
| `block-prod` | Deployment to **production** environments is blocked until the tag is present. |
| `block-non-prod` | Deployment to **non-production** environments is blocked until the tag is present. |

#### Mandatory Tag Validation

For a project where a Global Tag is mandatory, Devtron validates each application's tags and rejects the operation if:

* the mandatory tag **key is missing**, or
* the mandatory tag's **value is empty**, or
* the Global Tag is defined as `propagate = true` but the application's tag is **not** set to propagate.

#### Value Constraints

A Global Tag may carry a **value constraint** that restricts which values are acceptable (a predefined choice list). When enforced, a tag value that is not in the allowed list is rejected.

---

## Validation Rules — Quick Reference

| Rule | Applies to | Behavior |
| --- | --- | --- |
| Key required | All tags | A tag must have a non-empty key. |
| Value required | Propagated tags | A propagated tag must have a non-empty value. |
| Kubernetes label format | Propagated tags | Key must be a qualified name; value must be a valid label value. |
| `devtron.ai/` not propagatable | Reserved tags | Keys with this prefix must have `propagate = false`. |
| Mandatory tag present | Enterprise / Global Tags | Mandatory tags must be present with a value; propagate must match the Global Tag definition. |
| Value within allowed list | Enterprise / Global Tags | If a value constraint exists, the value must be one of the allowed choices. |
| Deployment policy | Enterprise / Global Tags | A missing mandatory tag can block deployment per its policy. |

---

## API Reference

### Application Tags

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/app/{appId}/labels` | Get an application's tags (supports `showPropagatedOnly=true/false`). |
| `GET` | `/app/{appId}/meta` | Get application meta info, including tags. |
| `PUT` | `/app/{appId}` | Update an application, including its tags. |

### Global Tags (Enterprise)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/global-tag` | List all active global tags. |
| `GET` | `/global-tag?id={id}` | Get a global tag by ID. |
| `GET` | `/global-tag/filter?projectId={id}` | Get active global tags for a project (with mandatory flags). |
| `POST` | `/global-tag` | Create global tags. |
| `PUT` | `/global-tag` | Update global tags. |
| `DELETE` | `/global-tag` | Delete global tags. |

### Build Infrastructure Profiles

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/infra/config/profile/alpha1` | Create a profile. |
| `GET` | `/infra/config/profile/alpha1?name={name}` | Get a profile. |
| `PUT` | `/infra/config/profile/alpha1?name={name}` | Update a profile. |
| `GET` | `/infra/config/profile/alpha1/list` | List profiles. |
| `POST` | `/infra/config/identifier/{identifierType}/apply` | Apply a profile to identifiers (apps/projects/environments). |

---

## Best Practices

* Use **non-propagated** tags for internal/organizational metadata you don't want on cluster objects.
* Use **propagated** tags only for labels you genuinely need on Kubernetes resources (cost allocation, network policies, observability). Keep keys/values Kubernetes-valid.
* Reserve **Global Tags** for governance you must enforce (e.g. an `owner` or `cost-center` tag), and pick a **deployment policy** that matches how strictly it must be enforced (`block-prod` is a common choice).
* To control **where** build pods run, use a build infra profile's **Node Selector / Tolerations** — not tags.
* Avoid the `devtron.ai/` prefix for your own tags; it is reserved and cannot be propagated.

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
| --- | --- | --- |
| Cannot save a propagated tag | Key/value not Kubernetes-valid, or value empty | Ensure the key is a qualified name and the value is a valid, non-empty label value. |
| Propagated tag not showing on build pod | `propagate-labels-in-buildx-pod` disabled for the app | Enable the feature flag for the application. |
| "tag should not be propagated as label" error | Using a `devtron.ai/` key with propagate on | Set `propagate = false` for `devtron.ai/*` tags. |
| Deployment blocked by a tag | A mandatory Global Tag is missing or empty | Add the mandatory tag with a valid value (and matching propagate setting) to the application. |
| Build runs on the wrong nodes | Expecting tags to place build pods | Configure Node Selector / Tolerations in the build infra profile instead. |
