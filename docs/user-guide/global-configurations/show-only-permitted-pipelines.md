---
canonical: https://docs.devtron.ai/docs/user-guide/global-configurations/show-only-permitted-pipelines
meta-description: Learn how to enable the CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL flag in Devtron's Orchestrator ConfigMap to show sub-users only the pipelines they are permitted to access, reducing noise in the Build & Deploy view.
---

# Show Only Permitted Pipelines

:::info Who Can Perform This Action?

| Action | Required Permission |
|---|---|
| Edit the Orchestrator ConfigMap via Resource Browser | Super Admin |
| Edit the Orchestrator ConfigMap via Parent Management Pipeline | Super Admin / Pipeline access on the management cluster |

:::

## Introduction

By default, when a sub-user opens the **Build & Deploy** tab of an application in Devtron, they see **all pipelines** — including pipelines for environments they have no access to. While they cannot trigger or interact with those restricted pipelines, the volume of visible pipelines can be overwhelming in large organizations with many environments (e.g., `dev`, `qa`, `staging`, `canary`, `prod-us`, `prod-eu`).

To solve this, Devtron provides a configuration flag in the **Orchestrator service ConfigMap**:

```yaml
CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL: "true"
```

When this flag is enabled, any sub-user (non-super-admin) will only see the pipelines for environments they have been **explicitly permitted** to access. Super admins are unaffected and continue to see all pipelines.

This feature helps you:

- Reduce visual noise for developers, testers, and other sub-users
- Prevent confusion caused by visible but inaccessible pipelines
- Enforce a cleaner, role-scoped view of the CI/CD workflow
- Improve focus and productivity for large teams with fine-grained access control

## Prerequisites

Before enabling this feature, ensure the following:

- You have **Super Admin** access on Devtron.
- User permissions have already been configured correctly under **Global Configurations → Authorization → User Access**. The flag only filters what is displayed — it relies on permissions being accurately set up beforehand.
- You are familiar with editing Kubernetes ConfigMaps either through Devtron's **Resource Browser** or a **parent management pipeline**.

## How It Works

Devtron's permission model ties each user's access to specific **projects**, **applications**, and **environments**. When `CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL` is set to `"true"`, the platform uses these permission bindings to filter the pipeline view at render time.

| Scenario | Default Behavior (flag off) | With Flag Enabled |
|---|---|---|
| Sub-user has access to `dev` only | Sees all pipelines (dev, qa, staging, prod, …) | Sees only the `dev` pipeline |
| Sub-user has access to `dev` and `qa` | Sees all pipelines | Sees only `dev` and `qa` pipelines |
| Super Admin | Sees all pipelines | Sees all pipelines (unaffected) |

:::note
The flag filters **visibility** only — it does not change underlying permissions. A user who previously could not trigger a production pipeline still cannot trigger it; they simply no longer see it.
:::

## Enabling the Flag

There are two ways to edit the Orchestrator ConfigMap, depending on your setup:

- [Via Resource Browser](#via-resource-browser) — for direct in-cluster edits
- [Via the Parent Management Pipeline](#via-the-parent-management-pipeline) — for enterprise clusters managed via GitOps

### Via Resource Browser

Use this path when you have direct access to the Devtron cluster through the Resource Browser.

#### Step 1 — Navigate to the Resource Browser

Go to **Infrastructure Management → Resource Browser** and select the cluster where Devtron is installed (typically the primary or hub cluster).


#### Step 2 — Locate the Orchestrator ConfigMap

1. In the left panel, navigate to **Config & Storage → ConfigMap**.
2. Select the namespace where Devtron is installed (e.g., `devtroncd`).
3. Find and click the ConfigMap named **`devtron-cm`**.


#### Step 3 — Edit the ConfigMap

1. Click the **Edit** (pencil) icon to open the ConfigMap editor.
2. In the YAML editor, add the following key under the `data` section:

```yaml
data:
  CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL: "true"
```

If the key already exists with the value `"false"`, update it to `"true"`.

3. Click **Apply Changes** to save.


#### Step 4 — Restart the Orchestrator Pod

The Orchestrator service reads its configuration at startup. After saving the ConfigMap, you must restart the pod for the change to take effect.

1. In the Resource Browser, navigate to **Workloads → Pods** in your Devtron namespace.
2. Find the pod prefixed with `devtron-` (the Orchestrator pod).
3. Delete the pod — Kubernetes will automatically recreate it with the updated configuration.

Alternatively, run a rollout restart from the terminal:

```bash
kubectl rollout restart deployment/devtron -n devtroncd
```

Once the pod restarts successfully, the flag is active.

### Via the Parent Management Pipeline

Use this path in **enterprise setups** where the Devtron cluster is itself managed by a parent or hub pipeline — a common GitOps pattern where Devtron's installation is treated as a managed application.

#### Step 1 — Locate the Management Pipeline

Navigate to the parent application or pipeline that manages the Devtron installation in your enterprise cluster. This is typically a Helm-based deployment pipeline or a GitOps-managed application pointing to Devtron's Helm chart values.

#### Step 2 — Update the Configuration

In your Helm values file or the configuration source for the Devtron chart, add or update the following under the Orchestrator configuration block:

```yaml
orchestrator:
  env:
    CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL: "true"
```

:::note
The exact key path may vary depending on how your Helm values are structured. Refer to your enterprise Devtron Helm chart's `values.yaml` for the correct location.
:::

#### Step 3 — Trigger the Pipeline

Commit the change to your configuration repository and trigger the parent pipeline. The pipeline will apply the updated ConfigMap and roll out a restart of the Orchestrator deployment automatically.

## Verifying the Change

After the Orchestrator pod restarts, verify the flag is working as expected:

1. Log in as a **sub-user** (non-super-admin) who has access to only a subset of environments.
2. Navigate to any application in **Application Management**.
3. Open the **Build & Deploy** tab.
4. Confirm that only the pipelines corresponding to the user's permitted environments are visible. Pipelines for environments they do not have access to should no longer appear.

To cross-check, log in as a **Super Admin** and confirm that all pipelines are still visible for the same application.

## Reverting the Flag

To restore the default behavior (all pipelines visible to all sub-users), set the flag back to `"false"`:

```yaml
data:
  CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL: "false"
```

Or remove the key entirely from the `data` section of the ConfigMap.

Then restart the Orchestrator pod as described in [Step 4](#step-4--restart-the-orchestrator-pod).

## Behavior Reference

| User Type | Flag Off (default) | Flag On |
|---|---|---|
| Super Admin | Sees all pipelines | Sees all pipelines |
| Sub-user (View only) | Sees all pipelines | Sees only permitted pipelines |
| Sub-user (Build and Deploy) | Sees all pipelines | Sees only permitted pipelines |
| Sub-user (Admin on specific environments) | Sees all pipelines | Sees only permitted pipelines |

## Troubleshooting

| Issue | Possible Cause | Resolution |
|---|---|---|
| Sub-users still see all pipelines after enabling the flag | Orchestrator pod was not restarted | Delete the Orchestrator pod or run `kubectl rollout restart` |
| Sub-users see no pipelines at all | User has no permissions assigned | Verify user permissions in **Global Configurations → Authorization → User Access** |
| Super Admin cannot see all pipelines | User is not correctly assigned as Super Admin | Confirm the Super Admin toggle is enabled for the user in **User Access** |
| Flag key is not being picked up | Wrong ConfigMap or namespace was edited | Confirm you edited `devtron-cm` in the correct Devtron namespace (e.g., `devtroncd`) |
| Change was lost after a Devtron upgrade | ConfigMap was overwritten during the upgrade | Re-apply the flag post-upgrade, or include it in your Helm values so it persists across upgrades |

## Related Topics

- [User Permissions](https://docs.devtron.ai/docs/user-guide/global-configurations/authorization/user-access)
- [Permission Groups](https://docs.devtron.ai/docs/user-guide/global-configurations/authorization/permission-groups)
- [Resource Browser — Discover and Manage Resources](https://docs.devtron.ai/docs/user-guide/resource-browser/manage-resources)
- [CD Pipeline](https://docs.devtron.ai/docs/user-guide/creating-application/workflow/cd-pipeline)
- [Application Groups](https://docs.devtron.ai/docs/user-guide/app-management/application-groups)