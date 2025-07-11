# GitOps (Flux CD)
 
{% hint style="info" %} 
### Prerequisite

Please make sure to install **Build and Deploy (CI/CD)** integration. To install it, click [here](../integrations/build-and-deploy-ci-cd.md).

{% endhint %}

Devtron supports FluxCD to help you manage application deployments using GitOps. With FluxCD, your Git repository becomes the single source of truth for your Kubernetes apps. Any changes you make in Git are automatically applied to your Kubernetes cluster by FluxCD. Refer to the [FluxCD documentation](https://fluxcd.io/flux/) to learn more.

{% hint style="info" %}
### Additional Resources
 [What is FluxCD? A Quick Guide to GitOps with FluxCD](https://devtron.ai/blog/what-is-fluxcd/)

 [Choosing the Right GitOps Tool: ArgoCD vs.FluxCD](https://devtron.ai/blog/gitops-tool-selection-argo-cd-or-flux-cd/)

{% endhint %}

## Key features

* Works with Devtron CI pipelines and other Devtron integrations.

* Supports Helm deployment method only.

## Installation

{% hint style="warning" %}
### Who Can Perform This Action?
The user must have permissions to:
  * Edit the ConfigMaps of 'default-cluster'
  * Restart the pods
{% endhint %}

To enable deployments through GitOps via FluxCD or if you want to migrate your existing FluxCD application to Devtron, you need to enable two specific feature flags for the `default_cluster` in **Devtron** and then install the FluxCD controller on those clusters in which you want to deploy the FluxCD applications. To do so, follow the steps below:

### Step 1: Enable Feature Flags

1. Navigate to Devtron **Resource Browser**.

      ![Figure 1: Navigating to Resource Browser](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-resource-browser.jpg)

2. Select the `default_cluster` to enable the feature flags.
     
      ![Figure 2: Selecting 'default_cluster'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-select-cluster.jpg)

3. Go to Config & Storage → ConfigMap, and select `dashboard-cm` ConfigMap

      ![Figure 3: Selecting 'dashboard-cm'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-select-dashboard-cm.jpg)

4. Edit the `dashboard-cm` ConfigMap by clicking **Edit live manifest**.

      * To enable deployments via FluxCD, check if the below entries are present in the ConfigMap (create one if it doesn't exist) and select **Apply changes**.<br>

           ```yaml
           FEATURE_FLUX_DEPLOYMENTS_ENABLE: " true"
           FEATURE_LINK_EXTERNAL_FLUX_ENABLE: "true"
           ```

      ![Figure 4: Editing Live Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-edit-live-manifest.jpg)

      ![Figure 5: Adding Feature Flags](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-add-flags.jpg)

5. Restart the deployment: 

      * For OSS Users:
          1. Navigate to Devtron Resource Browser.

          2. Select the cluster for which you have enabled the feature flags.

          3. Click the **Terminal** tab.
          
          4. Restart the deployment using the following command:  

               ```yaml
               kubectl rollout restart deployment dashboard -n devtroncd 
               ```
               <br>

               ![Figure 6: Restarting Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-restart-deployment.gif)

      * For Enterprise Users:
           1. Go to Resource Browser → (Select Cluster in which you have enabled the feature flags) → Workloads → Deployment

           2. Click the checkbox next to the following Deployment workloads and restart them using the ⟳ button:

                * devtron

                * dashboard

                ![Figure 7: Restart 'devtron' and 'dashboard' deployment workloads](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/restart-deployments.jpg)

6. Perform a hard refresh of the browser to clear the cache:

      * Mac: Hold down Cmd and Shift and then press R.

      * Windows/Linux: Hold down Ctrl and then press F5.

### Step 2: Install FluxCD Controller

After enabling the feature flags, the next step is to install FluxCD Controller in every cluster (including the default cluster) in which you want to deploy the FluxCD applications. To do so, follow the steps below:

1. Navigate to Devtron Resource Browser.

2. Select the cluster for which you have enabled the feature flags.

3. Click the **Terminal** tab.

4. Run the following command to install the FluxCD Controller:<br> 

 ```bash
 kubectl apply -f https://github.com/fluxcd/flux2/releases/download/v0.35.0/install.yaml
 ```
 <br>

 ![Figure 8: Installing FluxCD Controller](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-install-controller.gif)

5. After the command is executed successfully, you can deploy or migrate your applications in that cluster through GitOps (via FluxCD).
