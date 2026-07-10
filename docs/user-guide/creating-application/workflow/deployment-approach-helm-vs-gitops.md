---
canonical: https://docs.devtron.ai/docs/user-guide/creating-application/workflow/deployment-approach-helm-vs-gitops
meta-description: Learn how to configure feature flags in Devtron's ConfigMaps to control whether users can choose between Helm and GitOps deployment approaches when creating a deployment pipeline.
---

# Choosing Deployment Approach (Helm or GitOps)

## Introduction

When creating a deployment pipeline in Devtron, you can choose how your application gets deployed to a Kubernetes cluster. Devtron supports three deployment approaches:

- **Helm** — Deploys directly to the cluster using Helm, without any Git-based state tracking.
- **GitOps (Via Argo CD)** — Uses Argo CD to sync your deployment state from a Git repository to the cluster.
- **GitOps (Via Flux CD)** — Uses Flux CD to sync your deployment state from a Git repository to the cluster.

By default, this choice is presented as a set of radio buttons in the **Create Deployment Pipeline** dialog. However, this UI can be shown or hidden using feature flags — giving platform admins control over which deployment approach is available to users.

---

## Prerequisites

:::info Who Can Perform This Action?
Users need to have [Super-Admin](https://docs.devtron.ai/docs/user-guide/global-configurations/authorization/user-access#grant-super-admin-permission) permission to modify feature flags in ConfigMaps.
:::

Before the GitOps deployment options are available, ensure the following:

1. **GitOps module is installed and enabled** — The GitOps integration (Argo CD or Flux CD) must be installed and enabled in Devtron via **Global Configurations** → **GitOps**. Without this, the GitOps radio button options will not function even if they are visible.

2. **GitOps repository is configured** — Before users can select **GitOps (Via Argo CD)** or **GitOps (Via Flux CD)**, a GitOps repository must be configured. If GitOps is not configured and a user selects a GitOps option, a warning banner — *"GitOps repository is required to deploy using GitOps"* — will appear in the pipeline dialog with a **Configure →** link.

![GitOps not configured warning](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/gitops-not-configured.jpg)

:::warning Impact of Missing Prerequisites
If either of the above prerequisites is not met, the **"How do you want to deploy?"** section will not be functional for GitOps. Even if the radio buttons are visible, selecting a GitOps option will show a warning and block pipeline creation until the repository is configured. In such cases, **Helm is used as the default deployment method**.
:::

---

## Feature Flags

Two feature flags control the visibility of the deployment approach selector:

| Flag | ConfigMap | Default | Effect |
|---|---|---|---|
| `IS_INTERNAL_USE` | `orchestrator-cm` (Orchestrator) | — | When enabled, controls internal Devtron behaviour related to deployment method selection |
| `HIDE_GITOPS_OR_HELM_OPTION` | `dashboard-cm` (Dashboard) | `false` | When set to `true`, hides the **How do you want to deploy?** radio buttons from the deployment pipeline dialog |

:::note
- Setting `HIDE_GITOPS_OR_HELM_OPTION: "false"` (default) **shows** the Helm / GitOps radio buttons to users, letting them explicitly choose their preferred deployment approach.
- Setting `HIDE_GITOPS_OR_HELM_OPTION: "true"` **hides** the selector. In this case, Devtron falls back to **Helm** as the default deployment method for all pipelines.
:::

---

## How to Configure the Feature Flags

You can edit the relevant ConfigMaps in two ways:

### Method 1: Via Devtron's Resource Browser

1. Go to **Resource Browser** from the left navigation.
2. Select the cluster where Devtron is running — typically `default_cluster`.
3. In the left panel, expand the **Config & Storage** dropdown.
4. Click **ConfigMap**.
5. Use the namespace filter on the right to select the `devtroncd` namespace. This filters ConfigMaps to only those belonging to Devtron.

#### Editing `dashboard-cm` (for `HIDE_GITOPS_OR_HELM_OPTION`)

6. Find `dashboard-cm` (it may have an optional suffix).
7. Click **Edit Live Manifest**.
8. Under the `data` section, add or update the flag:

   ```yaml
   data:
     HIDE_GITOPS_OR_HELM_OPTION: "false"   # "true" to hide the selector
   ```

9. Click **Apply Changes**.

#### Editing `orchestrator-cm` (for `IS_INTERNAL_USE`)

6. Find `orchestrator-cm` (it may have an optional suffix).
7. Click **Edit Live Manifest**.
8. Under the `data` section, add or update the flag:

   ```yaml
   data:
     IS_INTERNAL_USE: "true"   # set as needed
   ```

9. Click **Apply Changes**.

---

### Method 2: Via the Parent Deployment Pipeline (Helm Chart / GitOps App)

If Devtron itself is managed as a service through a deployment pipeline (e.g., via its own Helm chart or a GitOps-managed app), you can edit the ConfigMap values directly from that parent pipeline's configuration:

1. Navigate to the parent application that manages the Devtron deployment.
2. Go to **App Configuration** → **ConfigMaps**.
3. Find `dashboard-cm` or `orchestrator-cm` as applicable.
4. Click the edit (pencil) icon.
5. Add or update the relevant flag key-value pair.
6. Save the changes and trigger a re-deployment if needed for the values to take effect.

:::caution
Changes to ConfigMaps in a running pod may require a pod restart to take effect, depending on how the application reads its configuration. If the change does not reflect immediately, restart the relevant Devtron component (`dashboard` or `orchestrator`) from the Resource Browser.
:::

---

## Behaviour Reference

| `HIDE_GITOPS_OR_HELM_OPTION` value | What the user sees | Deployment method used |
|---|---|---|
| `false` (default) | Radio buttons for **Helm**, **GitOps (Via Argo CD)**, and **GitOps (Via Flux CD)** are visible | Whichever method the user selects |
| `true` | The **How do you want to deploy?** section is hidden | **Helm** (always the default fallback) |

---

## Related Topics

- [GitOps Configuration](https://docs.devtron.ai/docs/user-guide/app-management/configurations/gitops)
- [Creating a Deployment Pipeline](https://docs.devtron.ai/docs/user-guide/creating-application/workflow/cd-pipeline)
- [GitOps Configuration per Application](https://docs.devtron.ai/docs/user-guide/creating-application/gitops-config)
- [Resource Browser](https://docs.devtron.ai/docs/user-guide/resource-browser)