# Enable GitOps Deployments with FluxCD
 
:::info Prerequisite
Make sure to install:

1. [Build and Deploy (CI/CD) integration](../integrations/build-and-deploy-ci-cd.md)

2. [GitOps (ArgoCD) integration](../integrations/argocd.md)

:::

Devtron supports FluxCD to enable GitOps-based deployments. With FluxCD, you can:

* Deploy applications via GitOps (via FluxCD).

* Deploy Helm charts via FluxCD.

* Migrate existing FluxCD applications into Devtron.

Your Git repository becomes the single source of truth for your Kubernetes workloads. Any changes you make in Git are automatically applied to your Kubernetes cluster by FluxCD. Refer to the [FluxCD documentation](https://fluxcd.io/flux/) to learn more.


## Installation

:::caution Who Can Perform This Action?
The user must have permissions to:
  * Edit the ConfigMaps of 'default-cluster'
  * Restart the pods
:::

To enable deployments through GitOps via FluxCD, you need to enable a specific feature flag for the `default_cluster` in Devtron.

 |Feature|Flag|Description|
 |:---|:---|:---|
 |**Deployments via FluxCD**|`FEATURE_FLUX_DEPLOYMENTS_ENABLE: "true"`|This flag will enable deployments through GitOps via FluxCD.<ul><li> After enabling this flag, you also need to install FluxCD controller in order to deploy applications successfully. Refer [Installing FluxCD Controller](#installing-fluxcd-controller-only-for-deployments) to know more.</li></ul>|
 |**Migrating existing FluxCD applications**|`FEATURE_LINK_EXTERNAL_FLUX_ENABLE: "true"`|This flag will enable migrations for external FluxCD apps into Devtron.|

 :::caution Deployment Strategies for FluxCD Deployments
 Application deployments through GitOps (via FluxCD) are supported only when using the `Deployment` or `Rollout` deployment strategies with the latest chart versions. Other deployment strategies are currently not supported. 
 :::

### Enabling Feature Flags

1. Navigate to Devtron's **Resource Browser**.

      ![Figure 1: Navigating to Resource Browser](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-resource-browser.jpg)

2. Select the `default_cluster` to enable the feature flags.
     
      ![Figure 2: Selecting 'default_cluster'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-select-cluster.jpg)

3. Go to Config & Storage → ConfigMap, and click `dashboard-cm` ConfigMap

      ![Figure 3: Clicking 'dashboard-cm'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-select-dashboard-cm.jpg)

4. Edit the `dashboard-cm` ConfigMap by clicking **Edit live manifest**.

      ![Figure 4: Editing Live Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-edit-live-manifest.jpg)
      1. To enable deployments via FluxCD, check if the below entries are present in the ConfigMap (create one if it doesn't exist) and select **Apply changes**.<br/>

            ```yaml
            FEATURE_FLUX_DEPLOYMENTS_ENABLE: "true"
            ```

      2. To enable migration for external FluxCD applications, check if the below entries are present in the ConfigMap (create one if it doesn't exist) and select **Apply changes**.<br/>

            ```yaml
            FEATURE_LINK_EXTERNAL_FLUX_ENABLE: "true"
            ```
      
      <br/>

      ![Figure 5: Adding Feature Flags](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-add-flags.jpg)

5. Restart the deployment: 
      1. **For OSS Users:**
          1. Navigate to Devtron's [Resource Browser](../resource-browser/).

          2. Select the cluster for which you have enabled the feature flags.

          3. Click the **Terminal** tab.
          
          4. Restart the deployment using the following command:  

               ```yaml
               kubectl rollout restart deployment dashboard -n devtroncd 
               ```

               ![Figure 6: Restarting Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-restart-deployment.gif)
      2. **For Enterprise Users:**
           1. Go to **Infrastructure Management** → **Resource Browser** → (select the cluster in which you have enabled the feature flags) → **Workloads** → **Deployment**

           2. Click the checkbox next to the `dashboard` Deployment workloads and restart them using the `⟳` button.

                ![Figure 7: Restart 'dashboard' deployment workloads](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/restart-deployments.jpg)

6. Perform a hard refresh of the browser to clear the cache:

      * **Mac**: Hold down Cmd and Shift and then press R.

      * **Windows/Linux**: Hold down Ctrl and then press F5.

### Installing FluxCD Controller (Only for Deployments)

After enabling the feature flag for deployments, the next step is to install FluxCD Controller in every cluster (including the default cluster) in which you want to deploy the FluxCD applications. 

You can install FluxCD Controller by any of the following ways:

 1. [Install FluxCD controller via Cluster Terminal](#install-fluxcd-controller-via-cluster-terminal) (Recommended)

 2. [Install FluxCD controller via Chart Store](#install-fluxcd-controller-via-chart-store)


#### Install FluxCD controller via Cluster Terminal.

1. Navigate to Devtron's Resource Browser.

2. Select the cluster for which you have enabled the feature flags.

3. Click the **Terminal** tab.

4. Run the following command to install the FluxCD Controller:

      ```yaml
      kubectl apply -f https://github.com/fluxcd/flux2/releases/download/v0.35.0/install.yaml
      ```

      ![Figure 8: Installing FluxCD Controller](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-install-controller.gif)

5. After the command is executed successfully, you can deploy or migrate your applications in that cluster through GitOps (via FluxCD).

#### Install FluxCD controller via Chart Store.

To install FluxCD controller via Chart Store, follow the below steps.

 1. Add FluxCD controller repository, `https://fluxcd-community.github.io/helm-charts` in the chart repositories (if not already added) in Global Configurations. Refer [Chart Repositories](../global-configurations/chart-repo.md#add-chart-repository) to learn more.

       ![Figure 9: Adding FluxCD Chart Repository](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-add-chart-repo.gif) 

 2. Add a new environment in the cluster in which you want to deploy the application via FluxCD linked to namespace as `flux-system`. Refer [Clusters and Environments](../global-configurations/cluster-and-environments.md#add-environment-to-a-cluster) to lean more.

       ![Figure 10: Adding Environment linked to 'flux-system' namespace](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-add-env.gif) 

 3. Navigate to **Chart Store** and select the `flux2` chart.

       ![Figure 11: Selecting 'flux2' Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-flux2.jpg) 

 4. Click **Configure and Deploy**.

       ![Figure 12: Deploying 'flux2' Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-deploy-chart.jpg) 

 5. Configure the following configurations:

       |Field Name|Description|
       |:---|:---|
       |**App Name**|Define a name for the chart.|
       |**Project**|Select a project from the dropdown|
       |**Deploy to Environment**|Select the environment which you have created in your preferred cluster linked to `flux-system` namespace.|

       ![Figure 13: Configuring 'flux2' Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-chart-config.jpg)  

 6. Click **Deploy** and the chart will be deployed.

After the chart is successfully deployed, you can deploy applications though GitOps (via FluxCD).