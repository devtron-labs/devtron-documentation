# Resource Recommender [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

## Introduction

The **Resource Recommender** analyzes how your workloads actually consume CPU and memory over time and suggests right-sized resource **requests** and **limits**. This helps you avoid two common problems:

* **Over-provisioning** — paying for CPU/memory your workloads never use.
* **Under-provisioning** — workloads getting CPU-throttled or killed (OOMKilled) because they were given too little.

Recommendations are generated from historical usage metrics collected by **Prometheus** running on your cluster. The recommender periodically scans supported workloads and stores the latest recommendation alongside the current configuration, so you can compare the two and apply the suggested values.

{% hint style="info" %}
### Prerequisites
* This is an **Enterprise-only** feature and must be enabled by a super-admin.
* The target cluster must have a reachable **Prometheus** endpoint configured. Without it, recommendations cannot be generated.
{% endhint %}

---

## Supported Workloads

The Resource Recommender can generate recommendations for the following Kubernetes resource types:

| Group / Version | Kind |
| --- | --- |
| `apps/v1` | Deployment |
| `apps/v1` | StatefulSet |
| `apps/v1` | ReplicaSet |
| `batch/v1` | Job |
| `batch/v1` | CronJob |
| `argoproj.io/v1alpha1` | Rollout (Argo Rollouts) |
| `v1` | Pod |

Recommendations are computed per **container** for both **CPU** (in cores) and **Memory** (in MiB).

---

## Enabling the Feature

The Resource Recommender is disabled by default. A super-admin (or whoever manages your Devtron installation values) must enable it on the Devtron orchestrator.

Set the following environment variable on the Devtron orchestrator deployment:

| Variable | Value | Description |
| --- | --- | --- |
| `FEATURE_RESOURCE_RECOMMENDATION_ENABLE` | `true` | Master switch that turns the Resource Recommender on. Defaults to `false`. |

{% hint style="warning" %}
### Who Can Perform This Action?
Enabling the feature requires changing the orchestrator's installation/configuration values, which is a super-admin / cluster-operator task.
{% endhint %}

---

## Configuration

Once the feature is enabled, the behavior of the recommendation scan job (internally referred to as **KRR** – Kubernetes Resource Recommender) is controlled by the environment variables below. The defaults are suitable for most setups; adjust them only if you have specific requirements.

### Scan Job Settings

| Variable | Default | Description |
| --- | --- | --- |
| `KRR_DOCKER_IMAGE` | *(empty)* | Container image used to run the recommendation scan job. **Required** for the scan to run. |
| `KRR_SYNC_SERVICE_ACCOUNT` | `krr-sync` | Service account the scan job runs under in the cluster. |
| `KRR_SYNC_JOB_RESOURCES_OBJ` | `{}` | Resource requests/limits for the scan job pod itself, as JSON. Example: `{"requests":{"cpu":"500m","memory":"512Mi"}}`. |
| `KRR_SYNC_JOB_CRON_SCHEDULE` | `0 0 * * *` | Cron schedule for the automatic scan. Default runs daily at midnight. |
| `KRR_ACTIVE_DEADLINE_SECONDS` | `15000` | Maximum runtime for the scan job in seconds (~4 hours) before it is terminated. |
| `KRR_SYNC_JOB_SHUTDOWN_WAIT_DURATION` | `120` | Seconds to wait for graceful shutdown before force-terminating the job. |
| `KRR_SYNC_JOB_HTTP_PORT` | `8080` | Port used by the scan job for health checks and metrics. |
| `PARALLELISM_LIMIT_FOR_TAG_PROCESSING` | `1` | Number of workloads processed in parallel during a scan. |
| `KRR_LOG_LEVEL` | `-1` | Log verbosity: `-1` = debug, `0` = info, `1` = warn, `2` = error. |

### Analysis Settings

These control how recommendations are calculated from Prometheus data.

| Variable | Default | Description |
| --- | --- | --- |
| `KRR_MATRIX_TIME_RANGE` | `120h` | How far back the recommender looks at historical metrics (e.g. `120h` = 5 days). A longer range produces more stable recommendations. |
| `KRR_MATRIX_STEP_INTERVAL` | `5m` | Sampling interval for the Prometheus query. Smaller intervals capture more detail but cost more to query. |
| `KRR_EVALUATE_STRATEGIES` | `true` | Whether to evaluate the recommendation strategies during analysis. |
| `KRR_IGNORE_CPU_THROTTLING` | `false` | When `true`, CPU throttling events are ignored while computing the recommendation. |
| `KRR_IGNORE_OOM` | `false` | When `true`, Out-Of-Memory (OOM) events are ignored while computing the recommendation. |
| `MIN_CPU_REQUEST` | `0.1` | Minimum CPU request (in cores) the recommender will suggest. Set to `0` to disable the floor. |
| `MIN_MEMORY_REQUEST` | `1.0` | Minimum memory request (in MiB) the recommender will suggest. Set to `0` to disable the floor. |

{% hint style="info" %}
### Tuning Tips
* Increase `KRR_MATRIX_TIME_RANGE` (e.g. to `168h` for 7 days) if your workloads have weekly traffic patterns, so peaks are captured.
* Keep `KRR_IGNORE_OOM=false` and `KRR_IGNORE_CPU_THROTTLING=false` (the defaults) so the recommender accounts for resource starvation events when sizing.
* Use `MIN_CPU_REQUEST` / `MIN_MEMORY_REQUEST` to prevent the recommender from suggesting unrealistically small values for lightly-used services.
{% endhint %}

---

## Using the Resource Recommender

### Trigger a Scan

Recommendations refresh automatically on the configured cron schedule (`KRR_SYNC_JOB_CRON_SCHEDULE`). You can also trigger a scan on demand for a cluster.

* **Endpoint:** `POST /resource/recommendation/sync`
* **Body:**
  ```json
  { "clusterId": 1 }
  ```

{% hint style="warning" %}
### Who Can Perform This Action?
Triggering a scan requires **update** permission on the target cluster.
{% endhint %}

### View Recommendation Status

Check when a cluster was last scanned and which workload types are supported.

* **Endpoint:** `GET /resource/{clusterId}/recommendation/details`
* **Returns:** the supported resource types (GVKs) and the `lastScannedOn` timestamp.

### View Recommendations

List the current-vs-recommended resource values for workloads in a cluster (optionally filtered by namespace or workload type).

* **Endpoint:** `POST /resource/recommendation/list`
* For each container you get:
  * **Current** — the CPU/memory request and limit configured today.
  * **Recommended** — the suggested CPU/memory request and limit.
  * **Delta** — the percentage change between current and recommended.

This lets you quickly spot workloads that are significantly over- or under-provisioned.

---

## How It Works

1. When enabled, Devtron schedules a recommendation scan job on each configured cluster according to `KRR_SYNC_JOB_CRON_SCHEDULE` (or whenever you trigger a sync manually).
2. The scan job queries the cluster's **Prometheus** for historical CPU and memory usage over the configured time range (`KRR_MATRIX_TIME_RANGE`), sampled at `KRR_MATRIX_STEP_INTERVAL`.
3. For each supported workload and container, it computes a recommended CPU/memory **request** and **limit**, factoring in throttling and OOM events (unless ignored) and honoring the minimum request floors.
4. The results are stored and surfaced in the UI/API, where you can compare current vs. recommended values and apply them to your workloads.

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
| --- | --- | --- |
| No recommendations appear for a cluster | Prometheus URL not configured for the cluster | Add a reachable Prometheus URL in **Global Configurations → Clusters & Environments**. |
| Feature/options not visible | Feature flag disabled | Ensure `FEATURE_RESOURCE_RECOMMENDATION_ENABLE=true` on the orchestrator. |
| Scan job never runs | Scan image not set | Set `KRR_DOCKER_IMAGE` to a valid image URI. |
| Recommendations look too small | No minimum floor set | Set `MIN_CPU_REQUEST` / `MIN_MEMORY_REQUEST` to sensible minimums. |
| Scan times out | Job exceeds deadline on large clusters | Increase `KRR_ACTIVE_DEADLINE_SECONDS` and/or `PARALLELISM_LIMIT_FOR_TAG_PROCESSING`. |
