# GitOps (Flux CD)
 
## Prerequisite

 Please make sure to install **Build and Deploy (CI/CD)** integration. To install it, click [here](../integrations/build-and-deploy-ci-cd.md).

Devtron supports FluxCD to help you manage application deployments using GitOps. With FluxCD, your Git repository becomes the single source of truth for your Kubernetes apps. Any changes you make in Git are automatically applied to your Kubernetes cluster by FluxCD. Learn more in the [FluxCD documentation](https://fluxcd.io/flux/)

{% hint style="info" %}
### Additional Resources
 [What is FluxCD? A Quick Guide to GitOps with FluxCD](https://devtron.ai/blog/what-is-fluxcd/)

 [Choosing the Right GitOps Tool: ArgoCD vs.FluxCD](https://devtron.ai/blog/gitops-tool-selection-argo-cd-or-flux-cd/)

{% endhint %}

## Key features

* Works with Devtron CI pipelines and other Devtron integrations.

* Supports Helm deployment method only.

## Installation

To enable deployments through GitOps via FluxCD or if you want to migrate your existing FluxCD application to Devtron, you need to enable two specific feature flags for the default cluster in Devtron and then install FluxCD controller on that clusters in which you want to deploy the FluxCD applications. To do so, follow the below steps:

### Step 1: Enable Feature Flags

1. Navigate to Devtron **Resource Browser**.

2. Select the default-cluster to enable the feature flags.

3. Go to Config & Storage → ConfigMap, and select `dashboard-cm` ConfigMap

4. Edit the `dashboard-cm` ConfigMap by clicking **Edit live manifest**.

 * To enable deployments via FluxCD, check if the below entries are present in the ConfigMap (create one if it doesn't exist) and select **Apply changes**.

 ```yaml
 FEATURE_FLUX_DEPLOYMENTS_ENABLE: " true"
 FEATURE_LINK_EXTERNAL_FLUX_ENABLE: "true"
 ```

5. Rotate the pods: 
     1. Go to Resource Browser → (Select Cluster in which you have enabled the feature flags) → Workloads → Pods.

     2. Select the pod `dashboard-xxxx` in the devtroncd namespace.
     
     3. Select the Kebab menu (⋮) next to the `dashboard-xxxx` pod and click **Delete**.  
     
     4. The pod will spin up automatically again after deletion.

6. Perform a hard refresh of the browser to clear the cache:

     * Mac: Hold down Cmd and Shift and then press R.

     * Windows/Linux: Hold down Ctrl and then press F5.

### Step:2 Install FluxCD Controller

After enabling the feature flags, the next step is to install FluxCD Controller in every cluster (including default cluster) in which you want to deploy the FluxCD applications. To do so follow the below steps:

1. Navigate to Devtron Resource Browser.

2. Select the cluster for which you have enabled the feature flags.

3. Click the **Terminal** tab.

4. Run the following command to install the FluxCD Controller.

 ```bash
 kubectl apply -f https://github.com/fluxcd/flux2/releases/download/v0.35.0/install.yaml
 ```

5. After the command executed successfully, you can now deploy or migrate your applications through GitOps (via FluxCD) in that cluster.