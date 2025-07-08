# GitOps (Flux CD)
 
## Prerequisite

 Please make sure to install **Build and Deploy (CI/CD)** integration. To install it, click [here](../integrations/build-and-deploy-ci-cd.md).

Devtron supports FluxCD to help you manage application deployments using GitOps. With FluxCD, your Git repository becomes the single source of truth for your Kubernetes apps. Any changes you make in Git are automatically applied to your Kubernetes cluster by FluxCD. Learn more in the [FluxCD documentation](https://fluxcd.io/flux/)

{% hint style="info" %}
### Additional Resources
 [What is FluxCD? A Quick Guide to GitOps with FluxCD](https://devtron.ai/blog/what-is-fluxcd/)

 [Choosing the Right GitOps Tool: ArgoCD vs. FluxCD](https://devtron.ai/blog/gitops-tool-selection-argo-cd-or-flux-cd/)

{% endhint %}

## Key features

* Works with Devtron CI pipelines and other Devtron integrations.

* Supports Helm deployment method only.

## Installation

To enable deployments through GitOps via FluxCD or if you want to migrate your existing FluxCD application to Devtron, you need to enable two specific feature flags for the specific cluster and then install FluxCD CRD on that specific cluster. To do so, follow the below steps:

### Step 1: Enable Feature Flags

1. Navigate to Devtron Resource Browser.

2. Select the cluster for which you want to enable the feature flags.

3. Go to Config & Storage → ConfigMap, and select `dashboard-cm` ConfigMap

4. Edit the `dashboard-cm` ConfigMap by clicking **Edit live manifest**.

 * To enable deployments via FluxCD, check if the below entries are present in the ConfigMap (create one if it doesn't exist) and select **Apply changes**.

 ```yaml
 FEATURE_FLUX_DEPLOYMENTS_ENABLE: " true"
 FEATURE_LINK_EXTERNAL_FLUX_ENABLE: "true"
 ```

5. Restart the Pod
     1. Go to Resource Browser → (Select Cluster in which you have enabled the feature flags) → Workloads → Deployment.

     2. Click the checkbox next to the `dashboard` Deployment workload and restart it using the ⟳ button.

6. Perform a hard refresh of the browser to clear the cache:

     * Mac: Hold down Cmd and Shift and then press R.

     * Windows/Linux: Hold down Ctrl and then press F5.

### Step:2 Install FluxCD CRD

After enabling the feature flags, the next step is to install FluxCD CRD in the same cluster. To do so follow the below steps:

1. Navigate to Devtron Resource Browser.

2. Select the same cluster for which you have enabled the feature flags.

3. Click the **Terminal** tab.

4. Run the following command to install the FluxCD CRD.

 ```bash
 kubectl apply -f https://github.com/fluxcd/flux2/releases/download/v0.35.0/install.yaml
 ```

5. After the command executed successfully, you can now deploy or migrate your apps through GitOps (via FluxCD).