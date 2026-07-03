---
title: Devtron Configuration Reference
sidebar_label: Configuration Reference
description: Reference for the ConfigMaps, Secrets, and dashboard flags that configure a Devtron installation — orchestrator (devtron-cm, devtron-secret, and supporting ConfigMaps) and the dashboard (dashboard-cm).
---

# Devtron Configuration Reference

This page is a consolidated reference for the configuration surfaces of a Devtron installation:

- **Orchestrator** — sections **1–9**: `devtron-cm`, `devtron-secret`, and the supporting ConfigMaps.
- **Dashboard** — section **10**: `dashboard-cm` (UI flags).

:::info How to read this page
- **Value** — a typical deployed value (as seen in a running cluster).
- **Code default** — the fallback used when the key is absent. Where a default is a Devtron-internal placeholder, it is shown generically (e.g. `<ci-runner-image>`).
- **Type** — the data type the value is parsed into.
- **⚠️ legacy** — the key is **not read by the current code**. It is either carried over from older Devtron versions or consumed by another component (ci-runner, operator/installer). It does no harm but can usually be pruned.
:::

:::warning Handling secrets
Secret values are **base64-encoded, not encrypted** — anyone can decode them. Never commit real secret values to Git, and rotate any value that has been exposed.
:::

---

## 1. `devtron-cm` (Devtron ConfigMap)

### 1.1 Core Service Identity

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| APP | orchestrator | orchestrator | string | Logical application name for the orchestrator process; used in log/metric labels. |
| MODE | PROD | DEV | string | Operating mode. `PROD` runs against the in-cluster kube config and real in-cluster services; `DEV` reads your local kubeconfig and relaxes some behavior for local development. |

---

### 1.2 Dashboard Microservice

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| DASHBOARD_PORT | 80 | 3000 | string | Port of the dashboard service that the orchestrator proxies UI traffic to. |
| DASHBOARD_HOST | dashboard-service.devtroncd | localhost | string | In-cluster DNS name of the dashboard service. |
| DASHBOARD_NAMESPACE | devtroncd | devtroncd | string | Namespace of the dashboard microservice (present in code; often omitted from the CM). |

---

### 1.3 CD / ArgoCD Connection

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| CD_HOST | argocd-server.devtroncd | localhost | string | Host used to reach the CD/ArgoCD server for the Devtron stack. |
| CD_PORT | 80 | 8000 | string | Port for the CD server / pre-post-CD communication. |
| CD_NAMESPACE | devtroncd | devtroncd | string | Namespace of the Devtron/ArgoCD stack. |
| ACD_CM | argocd-cm | argocd-cm | string | Name of the ArgoCD ConfigMap the orchestrator reads/patches. |
| ACD_NAMESPACE | devtroncd | devtroncd | string | Namespace where ArgoCD is installed. |
| ACD_USERNAME | admin | admin | string | ArgoCD admin username (password comes from the secret). |
| ACD_URL | argocd-server.devtroncd | — | ⚠️ legacy | Not read by current orchestrator code — the ArgoCD endpoint is now derived from `CD_HOST` / `ACD_NAMESPACE`. |
| ACD_USER | admin | — | ⚠️ legacy | Superseded by `ACD_USERNAME`. |
| ACD_TIMEOUT | 300 | — | ⚠️ legacy | Not read by current code. |
| ACD_SKIP_VERIFY | true | — | ⚠️ verify before removing | Controlled TLS skip-verify for ArgoCD gRPC in older versions. Behavior depends on your Devtron version — confirm against your installed build before pruning this key. |

---

### 1.4 GitOps

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| GITOPS_REPO_PREFIX | devtron | (empty) | string | Prefix prepended to GitOps repos auto-created for ArgoCD applications. |
| GIT_WORKING_DIRECTORY | /tmp/gitops/ | — | ⚠️ partially legacy | Used as a local git clone scratch directory in certain GitOps flows. Keep `/tmp/gitops/` unless you have confirmed your version no longer uses it — removing it may cause nil-path errors in GitOps commit operations. |

---

### 1.5 Microservice URLs & Timeouts

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| EVENT_URL | http://notifier-service.devtroncd:80/notify | http://localhost:3000/notify | string | Endpoint of the **notifier** microservice that Devtron POSTs pipeline events to (Slack, email, webhook notifications). |
| LENS_URL | http://lens-service.devtroncd:80 | http://\<lens-service\>:80 | string | URL of the **lens** microservice (deployment metrics / DORA analytics). |
| LENS_TIMEOUT | 300 | 0 | int | Request timeout (seconds) for lens calls. `0` = no client-side timeout. |
| HELM_CLIENT_URL | kubelink-service:50051 | 127.0.0.1:50051 | string | gRPC address of **kubelink** (the Helm client microservice). |
| NATS_SERVER_HOST | nats://devtron-nats.devtroncd:4222 | localhost:4222 | string | NATS server URL for event-driven inter-service messaging. |
| GIT_SENSOR_TIMEOUT | 300 | 0 | int | Timeout (seconds) waiting for git-sensor responses. `0` = no client timeout. |
| GIT_SENSOR_PROTOCOL | GRPC | REST | string | Transport used to talk to git-sensor. Current deployments use `GRPC`; `REST` is the code default. |
| GIT_SENSOR_URL | git-sensor-service.devtroncd:90 | 127.0.0.1:7070 | string | Address of the **git-sensor** microservice. |
| IMAGE_SCANNER_ENDPOINT | http://image-scanner-service.devtroncd:80 | http://\<image-scanner-service\>:80 | string | URL of the **image-scanner** microservice. |
| APP_SYNC_IMAGE | quay.io/devtron/chart-sync:… | quay.io/devtron/chart-sync:… | string | Image used by the app-manual-sync job that syncs the Devtron chart store. |

---

### 1.6 PostgreSQL

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| PG_ADDR | postgresql-postgresql.devtroncd | 127.0.0.1 | string | Host of the orchestrator PostgreSQL service. |
| PG_PORT | 5432 | 5432 | string | PostgreSQL port. |
| PG_USER | postgres | postgres | string | PostgreSQL user (password comes from the secret `PG_PASSWORD`). |
| PG_DATABASE | orchestrator | orchestrator | string | Primary orchestrator database name. |
| PG_LOG_QUERY | true | — | ⚠️ legacy | Superseded by the three keys below. This old key has no effect on current orchestrator builds. |
| PG_LOG_ALL_QUERY | false | false | bool | When `true`, logs every SQL query executed by the orchestrator. Very verbose — use only for debugging. Replaces the legacy `PG_LOG_QUERY`. |
| PG_LOG_SLOW_QUERY | true | true | bool | When `true`, logs queries that exceed a threshold duration. Useful for identifying performance bottlenecks without the noise of full query logging. |
| PG_LOG_ALL_FAILURE_QUERIES | true | true | bool | When `true`, logs all queries that result in a database error. Recommended to keep enabled in all environments for debugging failed operations. |

---

### 1.7 Dex (SSO via ArgoCD Dex)

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| DEX_HOST | http://argocd-dex-server.devtroncd | http://localhost | string | URL of the ArgoCD Dex server, **including the `http://` scheme**. The orchestrator builds the Dex address as `DEX_HOST:DEX_PORT` verbatim (no scheme is added for you), so omitting `http://` produces an invalid address and breaks SSO. |
| DEX_PORT | 5556 | 5556 | string | Dex OIDC server port. Appended to `DEX_HOST` to form the Dex server address. |
| DEX_RURL | http://argocd-dex-server.devtroncd:8080/callback | http://127.0.0.1:8080/callback | string | Dex **redirect/callback** URL after authentication. Must be reachable by the user's browser after login. |
| DEX_URL | http://argocd-dex-server.devtroncd:5556/dex | (empty) | string | Full Dex service endpoint including the `/dex` path. Used for OIDC discovery and token exchange. |

---

### 1.8 Auth / Caching

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| CExpirationTime | 600 | 600 | int | Generic cache expiration time (seconds). |
| JwtExpirationTime | 120 | 120 | int | JWT token lifetime (seconds). After expiry the token is rejected and the user must re-authenticate. |

---

### 1.9 Logging

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| LOG_LEVEL | 0 | -1 | int | Zap logger level. Values map to zapcore.Level: `-1` = Debug (most verbose), `0` = Info (default), `1` = Warn, `2` = Error, `3` = DPanic. Lower values produce more log output. |

---

### 1.10 Grafana (Application Metrics)

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| GRAFANA_URL | http://%s:%s@devtron-grafana.devtroncd/grafana | (empty) | string | Grafana base URL template; the `%s:%s` placeholders are substituted with username/password at runtime by the orchestrator. Do not replace the placeholders manually. |
| GRAFANA_HOST | devtron-grafana.devtroncd | localhost | string | Grafana host (used to construct embed URLs for application-metrics dashboards). |
| GRAFANA_PORT | 80 | 8090 | string | Grafana port. |
| GRAFANA_NAMESPACE | devtroncd | devtroncd | string | Namespace where Grafana runs. |
| GRAFANA_ORG_ID | 2 | 2 | int | Grafana organization ID used for application-metrics dashboards. Must match the org Devtron creates inside Grafana on first boot. |

---

### 1.11 Deployment-Type Behavior

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| IS_INTERNAL_USE | true | false | bool | When `true`, Devtron auto-determines the deployment type: it uses GitOps (ArgoCD) if GitOps is configured for the environment, otherwise falls back to plain Helm — users are not prompted to choose. When `false`, users must explicitly select ArgoCD, Helm, or Flux per pipeline. **Must be paired with the dashboard flag `HIDE_GITOPS_OR_HELM_OPTION=true`** — setting one without the other causes inconsistent UI behavior. Maps directly to `DeploymentServiceTypeConfig.ExternallyManagedDeploymentType` (`IS_INTERNAL_USE=true` → `ExternallyManagedDeploymentType=true`). |

---

### 1.12 CD Workflow (Pre/Post-CD) Resources & Placement

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| CD_LIMIT_CI_CPU | 0.5 | 0.5 | string | CPU **limit** for pre/post-CD workflow pods. |
| CD_LIMIT_CI_MEM | 3G | 3G | string | Memory **limit** for pre/post-CD workflow pods. |
| CD_REQ_CI_CPU | 0.5 | 0.5 | string | CPU **request** for pre/post-CD workflow pods. |
| CD_REQ_CI_MEM | 1G | 3G | string | Memory **request** for pre/post-CD workflow pods. (Code default is `3G`.) |
| CD_NODE_TAINTS_KEY | dedicated | dedicated | string | Taint key the CD workflow pod tolerates (node targeting). |
| CD_NODE_TAINTS_VALUE | ci | ci | string | Taint value tolerated by CD workflow pods. |
| CD_NODE_LABEL_SELECTOR | kubernetes.io/os=linux | (empty) | string | Node label selector for scheduling CD workflow pods. |
| CD_WORKFLOW_SERVICE_ACCOUNT | cd-runner | cd-runner | string | Service account used by CD workflow pods. |
| DEFAULT_CD_ARTIFACT_KEY_LOCATION | devtron/cd-artifacts | (empty) | string | Blob-storage key prefix for CD artifacts. |
| CD_ARTIFACT_LOCATION_FORMAT | %d/%d.zip | — | ⚠️ legacy | Artifact path format `<wf-id>/<runner-id>.zip`; consumed by ci-runner, not read by orchestrator env config. |
| DEFAULT_CD_NAMESPACE | devtron-cd | (empty) | string | Default namespace where CD workflows run. |
| DEFAULT_CD_TIMEOUT | 3600 | 3600 | int64 | Default CD workflow timeout (seconds). |

---

### 1.13 CI Workflow Resources & Placement

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| ENABLE_BUILD_CONTEXT | true | false | bool | Enables specifying a custom Docker build-context path per CI pipeline. **Both this flag and the dashboard `ENABLE_BUILD_CONTEXT` must be `true` together** — enabling only one results in the field appearing in the UI but being silently ignored by the backend, or vice versa. |
| DEFAULT_CI_IMAGE | quay.io/devtron/ci-runner:… | \<ci-runner-image\>:\<tag\> | string | Default image used for CI build pods (the ci-runner). Override per-pipeline or via `devtron-custom-cm`. |
| WF_CONTROLLER_INSTANCE_ID | devtron-runner | devtron-runner | string | Argo Workflow controller instance ID — must match the `--instance-id` of the workflow controller managing Devtron's workflows. |
| CI_LOGS_KEY_PREFIX | ci-artifacts | (empty) | string | Blob key prefix for CI logs. |
| DEFAULT_NAMESPACE | devtron-ci | devtron-ci | string | Default namespace where CI workflows run. |
| DEFAULT_TIMEOUT | 3600 | 3600 | float64 | Default CI workflow timeout (seconds). |
| LIMIT_CI_CPU | 0.5 | 0.5 | string | CPU **limit** for CI build pods. |
| LIMIT_CI_MEM | 3G | 3G | string | Memory **limit** for CI build pods. |
| REQ_CI_CPU | 0.5 | 0.5 | string | CPU **request** for CI build pods. |
| REQ_CI_MEM | 1G | 3G | string | Memory **request** for CI build pods. (Code default is `3G`.) |
| CI_NODE_TAINTS_KEY | (empty) | (empty) | string | Taint key tolerated by CI pods. |
| CI_NODE_TAINTS_VALUE | (empty) | (empty) | string | Taint value tolerated by CI pods. |
| CI_NODE_LABEL_SELECTOR | (empty) | (empty) | string | Node label selector for CI pods. |
| CACHE_LIMIT | 5000000000 | 5000000000 | int64 | Max CI build-cache size in bytes (~5 GB). |
| DEFAULT_ARTIFACT_KEY_LOCATION | devtron/ci-artifacts | arsenal-v1/ci-artifacts | string | Blob key prefix for CI artifacts. |
| WORKFLOW_SERVICE_ACCOUNT | ci-runner | ci-runner | string | Service account used by CI workflow pods. |
| CI_ARTIFACT_LOCATION_FORMAT | %d/%d.zip | — | ⚠️ legacy | CI artifact path format; consumed by ci-runner, not orchestrator env config. |
| DEFAULT_BUILD_LOGS_KEY_PREFIX | devtron | arsenal-v1 | string | Blob key prefix for CI build logs. |

---

### 1.14 Feature Flags (Backend)

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| SCOPED_VARIABLE_ENABLED | true | true | bool | Master backend switch for the scoped variables feature. Must be `true` for the dashboard `ENABLE_SCOPED_VARIABLES` flag to have any effect. |

---

### 1.15 Blob Storage (Logs / Cache / Artifacts)

> **Note:** each key must appear only once in a ConfigMap — duplicate keys are silently overwritten by Kubernetes, keeping only the last value.

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| MINIO_ENDPOINT | http://devtron-minio:9000 | — | string | MinIO endpoint used when MinIO is the blob backend. Do not embed credentials in this URL — use the secret keys `BLOB_STORAGE_S3_ACCESS_KEY` and `BLOB_STORAGE_S3_SECRET_KEY` (in `devtron-secret`) for MinIO authentication. |
| BLOB_STORAGE_ENABLED | "true" | false | bool | Master switch enabling blob storage for logs, cache, and artifacts. When `false`, logs are only accessible while the pod is running. |
| BLOB_STORAGE_PROVIDER | "S3" | S3 | string | Backend provider. Accepted values: `S3` (AWS S3 or any S3-compatible store), `MINIO`, `AZURE`, `GCP` (Google Cloud Storage). An empty value falls back to the code default (`S3`). |
| BLOB_STORAGE_S3_ENDPOINT | http://devtron-minio.devtroncd:9000 | (empty) | string | S3-compatible endpoint URL. Leave empty for AWS S3 (the SDK resolves the endpoint from the region). Set to the MinIO service URL for in-cluster MinIO. |
| BLOB_STORAGE_S3_ENDPOINT_INSECURE | "true" | false | bool | Allow plain-HTTP (insecure) S3 endpoint. Set to `true` for in-cluster MinIO without TLS; set to `false` for AWS S3 or any HTTPS endpoint. |
| DEFAULT_BUILD_LOGS_BUCKET | "devtron-ci-log" | \<ci-logs-bucket\> | string | Bucket for CI build logs. This bucket must already exist before Devtron starts. |
| DEFAULT_CACHE_BUCKET | "devtron-ci-cache" | ci-caching | string | Bucket for CI build cache. Caching speeds up subsequent builds by reusing unchanged Docker layers. |
| BLOB_STORAGE_S3_BUCKET_VERSIONED | "false" | true | bool | Set to `true` only if your S3/MinIO buckets have versioning explicitly enabled. An incorrect value causes object retrieval failures. For fresh MinIO installs, leave as `false` unless versioning was enabled at bucket creation. |
| DEFAULT_CACHE_BUCKET_REGION | "us-west-2" | us-east-2 | string | AWS region of the cache bucket. Required for AWS S3; used by the SDK for endpoint resolution. |
| DEFAULT_CD_LOGS_BUCKET_REGION | "us-west-2" | us-east-2 | string | AWS region of the CD logs bucket. |

---

### 1.16 Container Registry / External CI

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| ECR_REPO_NAME_PREFIX | "devtron/" | test/ | string | Prefix applied when auto-creating ECR repositories. All Devtron-managed ECR repos are created under this path. |
| EXTERNAL_CI_PAYLOAD | (JSON payload) | (sample JSON) | string | Sample payload template for external/webhook-triggered CI (project + image details). Used to validate the shape of inbound webhook events from external CI systems. |

---

### 1.17 RBAC Enforcer

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| ENFORCER_CACHE | "true" | false | bool | Enables in-memory caching of Casbin RBAC enforcement decisions. Provides a significant performance improvement at scale by avoiding repeated policy evaluation for the same user/resource pair. |
| ENFORCER_CACHE_EXPIRATION_IN_SEC | "345600" | 86400 | int | TTL of the enforcer cache in seconds (345600 = 4 days; code default = 1 day). **Important:** permission changes (grants or revocations) will not take effect for active sessions until this TTL expires. For security-sensitive environments, set to `3600` (1 hour) or restart the orchestrator pod to flush the cache immediately after any permission change. |
| ENFORCER_MAX_BATCH_SIZE | "1" | 1 | int | Max batch size when evaluating multiple RBAC checks in a single call. Increase to improve throughput under high concurrency. |

---

### 1.18 Secret / Release / Misc

| Key | Value | Code default | Type | Description |
|-----|-------|--------------|------|-------------|
| DEVTRON_SECRET_NAME | "devtron-secret" | devtron-secret | string | Name of the K8s Secret holding orchestrator secrets. |
| DEVTRON_HELM_RELEASE_NAME | devtron | devtron | string | Helm release name of the Devtron install (used by the stack manager). |
| USE_IMAGE_TAG_FROM_GIT_PROVIDER_FOR_TAG_BASED_BUILD | "True" | false | bool | For tag-based builds, reuses the Git tag as the container image tag instead of the auto-generated one. For example a Git tag `v1.2.0` produces an image tagged `v1.2.0`. |
| ENABLE_LEGACY_API | "false" | — | ⚠️ legacy | Not read by current orchestrator code. |
| INSTALLATION_THROUGH_HELM | "True" | — | ⚠️ operator only | Read by the Devtron operator/installer, not the orchestrator env config. Marks that Devtron was installed via Helm and affects operator reconciliation behavior. |

---

## 2. `devtron-secret` (Devtron Secret)

> Values are base64-encoded in the Secret. **Never commit real values.** Base64 is encoding, not encryption — treat any exposed value as compromised and rotate it.

| Key | Type | Description |
|-----|------|-------------|
| ADMIN_PASSWORD | string | Devtron admin login password. Change immediately after first login. |
| DEX_CSTOREKEY | string | Dex cookie/session store encryption key. Do not modify after installation. |
| DEX_JWTKEY | string | Dex JWT signing key for SSO sessions. |
| DEX_SECRET | string | Dex OIDC client secret shared between Devtron and Dex. |
| EXTERNAL_CI_API_SECRET | string | Shared secret authenticating external-CI webhook calls (code default `devtroncd-secret`). |
| ORCH_TOKEN | string | Orchestrator auth token used for internal service-to-service calls. |
| PG_PASSWORD | string | PostgreSQL password for `PG_USER`. |
| WEBHOOK_TOKEN | string | Token authenticating inbound webhook (e.g. Jenkins) requests. |
| BLOB_STORAGE_S3_ACCESS_KEY | string | Access key for S3/MinIO blob storage authentication. |
| BLOB_STORAGE_S3_SECRET_KEY | string | Secret key for S3/MinIO blob storage authentication. Never put credentials in `MINIO_ENDPOINT` or `BLOB_STORAGE_S3_ENDPOINT` URLs. |
| admin.password | string | ArgoCD admin bcrypt password hash. |
| admin.passwordMtime | string | ArgoCD admin password last-modified timestamp. |
| dex.config | string | Dex connector configuration (SSO providers). Empty until SSO is configured. |
| server.secretkey | string | ArgoCD server session signing key. |
| url | string | ArgoCD external URL (empty by default). |

> **Note:** `APP` and `MODE` are non-sensitive values that belong in `devtron-cm`. They may appear in older Secret manifests due to legacy copy — remove them from the Secret if present.

---

## 3. `devtron-custom-cm`

| Key | Value | Description |
|-----|-------|-------------|
| DEFAULT_CI_IMAGE | quay.io/devtron/ci-runner:… | Overrides the ci-runner image used for CI build pods. Values here take precedence over `devtron-cm`, allowing image customization without editing the primary CM. Use this to pin a specific version or a custom image with pre-installed tools. |

---

## 4. `devtron-nats-config`

NATS server + JetStream configuration (rendered into the NATS server config file).

| Key | Value | Description |
|-----|-------|-------------|
| pid_file | "/var/run/nats/nats.pid" | PID file shared with the config-reloader sidecar so it can signal NATS on config change. |
| http | 8222 | HTTP monitoring/management port. Exposes `/healthz`, `/varz`, and `/connz` endpoints for debugging. |
| server_name | $POD_NAME | NATS server name; expands to the pod name for per-pod identity in a cluster. |
| jetstream.max_mem | 1Gi | Max memory JetStream may use for in-memory streams. Increase if you have high-throughput pipelines generating many events. |
| jetstream.domain | devtron-jet | JetStream domain — isolates Devtron's streams from other NATS/JetStream users on the same broker. |
| lame_duck_duration | 120s | Graceful-shutdown window: NATS keeps serving while draining clients for this long before exiting. |

---

## 5. `devtron-cluster-components`

Resource requests/limits for the **rollout** (Argo Rollouts) component installed into managed clusters.

```yaml
rollout.yaml: |-
  rollout:
    resources:
      limits:
        cpu: 250m       # max CPU the rollout controller may use
        memory: 200Mi   # max memory
      requests:
        cpu: 50m        # guaranteed CPU reserved at scheduling
        memory: 100Mi   # guaranteed memory
```

---

## 6. `postgresql-postgresql-init-scripts`

SQL run once at first PostgreSQL startup to create the databases used by Devtron's microservices.

```sql
db_create.sql: |
  create database casbin;      -- RBAC policy store (Casbin)
  create database git_sensor;  -- git-sensor service data
  create database lens;        -- lens (deployment metrics) data
  create database clairv4;     -- Clair v4 image-vulnerability scanner data
```

---

## 7. `argocd-rbac-cm`

| Key | Value | Description |
|-----|-------|-------------|
| policy.default | role:admin | Default ArgoCD role granted to authenticated users when no explicit RBAC policy matches. `role:admin` grants full access — tighten to `role:readonly` or `''` for least-privilege in production. |

---

## 8. `devtron-operator-cm`

Consumed by the **Devtron operator/installer** (not the orchestrator's runtime env config).

| Key | Value | Description |
|-----|-------|-------------|
| BLOB_STORAGE_PROVIDER | "" | Blob provider seen by the operator; empty = use defaults / no external blob. |
| DEVTRON_HELM_RELEASE_NAME | devtron | Helm release name the operator manages. |
| ENABLE_LEGACY_API | "false" | Legacy-API toggle (operator-level; not read by the orchestrator). |
| INSTALLATION_THROUGH_HELM | "True" | Marks that Devtron was installed via Helm (affects how the operator reconciles). |
| APP | orchestrator | Application name. |
| MODE | PROD | Operating mode. |

---

## 9. `migrator-override-cm`

| Key | Value | Description |
|-----|-------|-------------|
| override | "" | Optional override block for the DB **migrator** job. Leave empty to use default migration behavior; used to inject custom migration parameters when needed. |

---

## 10. `dashboard-cm` (Dashboard ConfigMap — Frontend)

> Sourced from the dashboard repo's `config.md`. These flags control **UI** behavior only and do not require an orchestrator restart — a dashboard pod restart is sufficient.

| Key | Value | Description |
|-----|-------|-------------|
| ANNOUNCEMENT_BANNER_MSG | "" | Text shown in a banner at the top of the UI. Leave empty to hide the banner. Useful for maintenance notices or version announcements. |
| API_BATCH_SIZE | 20 | Number of items fetched per page in batched API calls from the dashboard. |
| APPLICATION_METRICS_ENABLED | "true" | Shows the application-metrics button on the app detail page, linking to embedded Grafana dashboards. |
| CLAIR_TOOL_VERSION | "" | Clair vulnerability scanner version label shown in the UI. |
| CLUSTER_TERMINAL_CONNECTION_RETRY_COUNT | 7 | Number of times the dashboard retries a dropped cluster-terminal WebSocket connection before showing a connection error. |
| CLUSTER_TERMINAL_CONNECTION_POLLING_INTERVAL | 7000 | Wait time (ms) between cluster-terminal reconnect attempts. |
| CONFIGURABLE_TIMEOUT | 10 | Timeout (seconds) for the authorization/authentication API call made on login. |
| DEFAULT_CI_TRIGGER_TYPE_MANUAL | "false" | When `"true"`, newly created CI pipelines default to manual trigger instead of automatic. |
| DEVTRON_APP_DETAILS_POLLING_INTERVAL | 3000 | How often (ms) the dashboard polls for updated status of Devtron-managed applications. |
| EA_APP_DETAILS_POLLING_INTERVAL | 3000 | Polling interval (ms) for application details in External App (EA) mode. |
| ENABLE_BUILD_CONTEXT | "true" | Shows the build-context path field in CI pipeline config. **Must also be enabled in `devtron-cm`** — enabling only one side causes the field to appear but be silently ignored. |
| ENABLE_CI_JOB | "true" | Enables the CI Job pipeline type for standalone jobs not tied to a Docker build. |
| ENABLE_CHART_SEARCH_IN_HELM_DEPLOY | "true" | Shows a search bar in the Helm chart deployment screen. |
| ENABLE_EXTERNAL_ARGO_CD | "true" | Allows linking and viewing ArgoCD applications managed outside of Devtron pipelines. |
| ENABLE_RESTART_WORKLOAD | "false" | Shows the restart-pods option on the app-details page. |
| ENABLE_SCOPED_VARIABLES | "false" | Enables the scoped variables feature in the UI. **Also requires `SCOPED_VARIABLE_ENABLED=true` in `devtron-cm`** — enabling only the dashboard flag has no effect. |
| FEATURE_ACTION_AUDIOS_ENABLE | true | Enables audio feedback (sound cues) for user actions like successful deployments or errors. Set to `false` to disable all UI sounds. |
| FEATURE_BULK_RESTART_WORKLOADS_FROM_RB | deployment,rollout,daemonset,statefulset | Workload types that support bulk restart from the resource browser. Comma-separated list. Remove a type to disable bulk restart for it. |
| FEATURE_EXTERNAL_FLUX_CD_ENABLE | false | Shows the option to link External FluxCD applications in the app list. External Flux apps are GitOps deployments managed by FluxCD that Devtron can observe. |
| FEATURE_HIDE_USER_DIRECT_PERMISSIONS_FOR_NON_SUPER_ADMINS | "true" | Hides the User Direct Permissions section in User Management for non-super-admin users. Super admins always see and can modify all permissions. |
| FEATURE_USER_DEFINED_GITOPS_REPO_ENABLE | false | Allows users to manually specify a GitOps repository URL instead of Devtron auto-creating one. |
| FORCE_SECURITY_SCANNING | "false" | When `"true"`, security scanning is mandatory for every CI build — users cannot skip it. |
| GLOBAL_API_TIMEOUT | 60000 | Default timeout (ms) for all dashboard API requests. Requests not completed within this window are aborted and show an error. |
| HELM_APP_DETAILS_POLLING_INTERVAL | 3000 | Polling interval (ms) for Helm application details. |
| HIDE_DEFAULT_CLUSTER | "true" | Hides the default (in-cluster) cluster from the cluster list. Useful when you don't want users interacting with the cluster Devtron runs on. |
| HIDE_EXCLUDE_INCLUDE_GIT_COMMITS | "true" | Hides the option to manually include or exclude specific Git commits from a CI build. |
| HIDE_GITOPS_OR_HELM_OPTION | "false" | Hides the GitOps/Helm deployment type choice in pipeline and Helm-app config. **Must be paired with `IS_INTERNAL_USE=true` in `devtron-cm`** — setting one without the other causes inconsistent UI behavior. |
| ORGANIZATION_NAME | "" | Organization name shown in the UI header and login page. Leave empty to use default Devtron branding. |
| RECOMMEND_SECURITY_SCANNING | "false" | When `"true"`, shows a recommendation nudge to enable security scanning on pipelines where it is not yet configured. Less strict than `FORCE_SECURITY_SCANNING`. |
| SERVICE_WORKER_TIMEOUT | "1" | How often (minutes) the service worker checks for dashboard updates. Change cautiously — too low a value may interfere with your release cycle. |
| SIDEBAR_DT_LOGO | "" | URL of a custom logo for the sidebar. Takes effect only when `ORGANIZATION_NAME` is not set. |
| TRIGGER_API_TIMEOUT | 60000 | Timeout (ms) for deployment trigger API calls (deploy artifact, trigger chart). Can be set higher than `GLOBAL_API_TIMEOUT` for slow deployment environments. |
| FEATURE_APPLICATION_TEMPLATES_ENABLE | true | Show the Application Templates section under Global Configurations. |
| FEATURE_CONFIG_DRIFT_ENABLE | false | Enable config-drift detection and the drift comparison modal on the app details page. |
| FEATURE_SWAP_TRAFFIC_ENABLE | false | Enable the swap-traffic action on the app details page (e.g. blue-green traffic switch). |
| FEATURE_CLUSTER_MAP_ENABLE | true | Show the cluster map visualization in the cluster node listing. |
| FEATURE_RB_SYNC_CLUSTER_ENABLE | true | Enable the compare/sync-cluster view in the Resource Browser. |
| FEATURE_DEFAULT_LANDING_RB_ENABLE | false | In EA-only (External App) mode, make the Resource Browser the default landing page after login instead of the app list. |
| FEATURE_DEFAULT_MERGE_STRATEGY | patch | Default config-override merge strategy at the environment level. Accepts `patch` or `replace`. |
| FEATURE_PROMO_EMBEDDED_IFRAME_URL | "" | URL of an embedded promotional iframe shown in a modal. Empty disables the promo modal. |
| FEATURE_PROMO_EMBEDDED_MODAL_TITLE | "" | Title text for the embedded promotional modal (used with `FEATURE_PROMO_EMBEDDED_IFRAME_URL`). |
| FEATURE_PROMO_EMBEDDED_BUTTON_TEXT | "" | Button label that opens the embedded promotional modal. |
| HIDE_RELEASES | false | Hide the Software Distribution Hub / Releases item from the sidebar navigation. |
| HIDE_RESOURCE_WATCHER | false | Hide the Resource Watcher item from the sidebar navigation. |