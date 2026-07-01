---
canonical: https://docs.devtron.ai/docs/user-guide/creating-application/workflow/deployment-approach-helm-vs-gitops
meta-description: Learn how to configure feature flags in Devtron's ConfigMaps to control whether users can choose between Helm and GitOps deployment approaches when creating a deployment pipeline.
---

# Choosing a Deployment Approach (Helm or GitOps)

:::info Who Can Perform This Action?
Users with **Super Admin** permission can modify feature flags in ConfigMaps.
:::

## Introduction

When creating a deployment pipeline in Devtron, you can choose how your application gets deployed to a Kubernetes cluster. Devtron supports three deployment approaches:

- **Helm** — Deploys directly to the cluster using Helm, without any Git-based state tracking.
- **GitOps (Via Argo CD)** — Uses Argo CD to sync your deployment state from a Git repository to the cluster.
- **GitOps (Via Flux CD)** — Uses Flux CD to sync your deployment state from a Git repository to the cluster.

By default, this choice is presented as a set of radio buttons in the **Create Deployment Pipeline** dialog. However, this UI can be shown or hidden using feature flags — giving platform admins control over which deployment approach is available to users.

## Prerequisites

Before users can select **GitOps (Via Argo CD)** or **GitOps (Via Flux CD)**, a GitOps repository must be configured. If GitOps is not configured and a user selects a GitOps option, a warning banner will appear in the pipeline dialog with a **Configure →** link.

<!-- TODO: Add image — Screenshot of the GitOps not configured warning banner in the Create Deployment Pipeline dialog. Upload to S3: devtron-public-asset/images/devtron-v2/ci-cd/ -->

## Feature Flags

Two feature flags work together to control the deployment approach behavior:

| Flag | ConfigMap | Default | Effect |
|---|---|---|---|
| `HIDE_GITOPS_OR_HELM_OPTION` | `dashboard-cm` | `false` | When set to `true`, hides the **How do you want to deploy?** radio buttons from the deployment pipeline dialog |
| `IS_INTERNAL_USE` | `orchestrator-cm` | `false` | When set to `true`, skips Devtron's enforcement of a deployment app type — the type is auto-determined based on whether GitOps is configured for the environment |

:::note
These two flags are designed to be used together. Set `HIDE_GITOPS_OR_HELM_OPTION: "true"` and `IS_INTERNAL_USE: "true"` to hide the deployment type selector from users and let the platform silently determine the right deployment method per environment.
:::

## How It Works

By default (`IS_INTERNAL_USE: "false"`), Devtron enforces a deployment app type when creating CD pipelines and Helm apps. It automatically overrides the user's selection if needed, in this order:

- Argo CD — if GitOps is configured and allowed for the environment.
- Helm — if GitOps is not configured or not allowed.
- Flux CD — as a further fallback.

When `IS_INTERNAL_USE` is set to `"true"`, this enforcement is skipped entirely. The deployment type is no longer forced — instead, it is silently auto-determined:

- If GitOps is configured and allowed for the environment → **Argo CD** is used.
- Otherwise → **Helm** is used.

This makes the flag suited for managed or enterprise setups where the platform admin wants to control the deployment method centrally, without exposing the choice to individual users.

## How to Configure the Feature Flags

You can edit the relevant ConfigMaps in two ways:

- [Via Devtron's Resource Browser](#method-1-via-devtrons-resource-browser) — for direct in-cluster edits
- [Via the Parent Deployment Pipeline](#method-2-via-the-parent-deployment-pipeline) — for enterprise clusters managed via Helm or GitOps

### Method 1: Via Devtron's Resource Browser

1. Go to **Infrastructure Management → Resource Browser** from the left navigation.
2. Select the cluster where Devtron is running — typically `default_cluster`.
3. In the left panel, navigate to **Config & Storage → ConfigMap**.
4. Use the namespace filter to select the `devtroncd` namespace.

#### Setting `HIDE_GITOPS_OR_HELM_OPTION` in `dashboard-cm`

1. Find `dashboard-cm` (it may have an optional suffix) and click **Edit Live Manifest**.
2. Under the `data` section, add or update the flag:

   ```yaml
   data:
     HIDE_GITOPS_OR_HELM_OPTION: "false"   # set to "true" to hide the selector
   ```

3. Click **Apply Changes**.

#### Setting `IS_INTERNAL_USE` in `orchestrator-cm`

1. Find `orchestrator-cm` (it may have an optional suffix) and click **Edit Live Manifest**.
2. Under the `data` section, add or update the flag:

   ```yaml
   data:
     IS_INTERNAL_USE: "true"
   ```

3. Click **Apply Changes**.

### Method 2: Via the Parent Deployment Pipeline

If Devtron itself is managed through a deployment pipeline (e.g., via its own Helm chart or a GitOps-managed app), you can edit the ConfigMap values directly from that parent pipeline's configuration.

1. Navigate to the parent application that manages the Devtron deployment.
2. Go to **App Configuration → ConfigMaps**.
3. Find `dashboard-cm` or `orchestrator-cm` as applicable.
4. Click the edit (pencil) icon.
5. Add or update the relevant flag key-value pair.
6. Save the changes and trigger a re-deployment for the values to take effect.

:::note
Changes to ConfigMaps may require a pod restart to take effect. If the change does not reflect immediately, restart the relevant Devtron component (`dashboard` or `orchestrator`) from the Resource Browser under **Workloads → Deployment**.
:::

## Related Topics

- [GitOps Configuration](https://docs.devtron.ai/docs/user-guide/global-configurations/gitops)
- [Creating a Deployment Pipeline](https://docs.devtron.ai/docs/user-guide/creating-application/workflow/cd-pipeline)
- [GitOps Configuration per Application](https://docs.devtron.ai/docs/user-guide/creating-application/gitops-config)
- [Resource Browser](https://docs.devtron.ai/docs/user-guide/resource-browser)