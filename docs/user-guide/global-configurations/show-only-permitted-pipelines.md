---
canonical: https://docs.devtron.ai/docs/user-guide/global-configurations/show-only-permitted-pipelines
meta-description: Learn how to enable the CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL flag in Devtron's Orchestrator ConfigMap to show sub-users only the pipelines they are permitted to access, reducing noise in the Build & Deploy view.
title: Show Only Permitted Pipelines | Devtron Docs
---

# Show Only Permitted Pipelines

Who Can Perform This Action?

| Action | Required Permission |
|---|---|
| Enable the flag via Helm upgrade | Super Admin |

## Introduction[​](#introduction "Direct link to Introduction")

By default, when a sub-user opens the **Build & Deploy** tab of an application in Devtron, they see **all pipelines** — including pipelines for environments they have no access to. While they cannot trigger or interact with those restricted pipelines, the volume of visible pipelines can be overwhelming in large organizations with many environments (e.g., `dev`, `qa`, `staging`, `canary`, `prod-us`, `prod-eu`).

To solve this, Devtron provides a configuration flag in the **Orchestrator service ConfigMap**:

```
CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL: "true"
```

When this flag is enabled, any sub-user (non-super-admin) will only see the pipelines for environments they have been **explicitly permitted** to access. Super admins are unaffected and continue to see all pipelines.

**This feature helps you:**

- Reduce visual noise for developers, testers, and other sub-users
- Prevent confusion caused by visible but inaccessible pipelines
- Enforce a cleaner, role-scoped view of the CI/CD workflow
- Improve focus and productivity for large teams with fine-grained access control

## Prerequisites[​](#prerequisites "Direct link to Prerequisites")

Before enabling this feature, ensure the following:

- You have **Super Admin** access on Devtron.
- User permissions have already been configured correctly under **Global Configurations → Authorization → User Access**. The flag only filters what is displayed — it relies on permissions being accurately set up beforehand.
- You are familiar with editing Helm values via the **Helm CLI** 

## How It Works[​](#how-it-works "Direct link to How It Works")

Devtron's permission model ties each user's access to specific **projects**, **applications**, and **environments**. When `CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL` is set to `"true"`, the platform uses these permission bindings to filter the pipeline view at render time.

| Scenario | Default Behavior (flag off) | With Flag Enabled |
|---|---|---|
| Sub-user has access to `dev` only | Sees all pipelines (dev, qa, staging, prod, …) | Sees only the `dev` pipeline |
| Sub-user has access to `dev` and `qa` | Sees all pipelines | Sees only `dev` and `qa` pipelines |
| Super Admin | Sees all pipelines | Sees all pipelines (unaffected) |

:::note
The flag filters **visibility** only — it does not change underlying permissions. A user who previously could not trigger a production pipeline still cannot trigger it; they simply no longer see it.
:::

## Enabling the Flag[​](#enabling-the-flag "Direct link to Enabling the Flag")

- [Via Helm](#via-helm) — for direct updates using the Helm CLI

### Via Helm[​](#via-helm "Direct link to Via Helm")

Use this path when you manage the Devtron installation directly via the Helm CLI.

#### Step 1 — Update the Helm Values[​](#step-1--update-the-helm-values "Direct link to Step 1 — Update the Helm Values")

In your Helm values file for the Devtron chart, add or update the key under `devtron.components.devtron.customOverrides`:

```yaml
devtron:
  components:
    devtron:
      customOverrides:
        CAN_ONLY_VIEW_PERMITTED_ENV_ORG_LEVEL: "true"
```

If the key already exists with the value `"false"`, update it to `"true"`.

#### Step 2 — Apply the Helm Upgrade[​](#step-2--apply-the-helm-upgrade "Direct link to Step 2 — Apply the Helm Upgrade")

Run the following command to apply the updated values:

```bash
helm upgrade devtron devtron/devtron-enterprise \
  --namespace devtroncd \
  --reuse-values \
  -f your-values.yaml
```

:::info
- Replace `your-values.yaml` with the path to your custom values file.
- `--reuse-values` ensures all existing Helm values are preserved and only the overrides in your values file are applied.
:::

#### Step 3 — Restart the Orchestrator Deployment[​](#step-3--restart-the-orchestrator-deployment "Direct link to Step 3 — Restart the Orchestrator Deployment")

After the Helm upgrade, restart the Orchestrator deployment for the ConfigMap change to take effect:

```bash
kubectl rollout restart deployment/devtron -n devtroncd
```

Once the deployment restarts successfully, the flag is active.

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

| Issue | Possible Cause | Resolution |
|---|---|---|
| Sub-users still see all pipelines after enabling the flag | Orchestrator deployment was not restarted | Run `kubectl rollout restart deployment/devtron -n devtroncd` |
| Sub-users see no pipelines at all | User has no permissions assigned | Verify user permissions in **Global Configurations → Authorization → User Access** |
| Super Admin cannot see all pipelines | User is not correctly assigned as Super Admin | Confirm the Super Admin toggle is enabled for the user in **User Access** |
| Flag key is not being picked up | Helm upgrade was not run after updating values, or wrong namespace used | Verify the key exists in your Helm values file and re-run `helm upgrade` with the correct namespace |
| Change was lost after a Devtron upgrade | Flag was set directly on the ConfigMap instead of via Helm values | Always set this flag in your Helm values file and apply via `helm upgrade` — direct ConfigMap edits are overwritten on redeploy or pod restart |

## Related Topics[​](#related-topics "Direct link to Related Topics")

- [User Permissions](https://docs.devtron.ai/docs/user-guide/global-configurations/authorization/user-access)
- [Permission Groups](https://docs.devtron.ai/docs/user-guide/global-configurations/authorization/permission-groups)
- [Resource Browser — Discover and Manage Resources](https://docs.devtron.ai/docs/user-guide/resource-browser/manage-resources)
- [CD Pipeline](https://docs.devtron.ai/docs/user-guide/creating-application/workflow/cd-pipeline)
- [Application Groups](https://docs.devtron.ai/docs/user-guide/app-management/application-groups)