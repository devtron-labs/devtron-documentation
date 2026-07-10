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

### Enabling Feature Flags

1. Navigate to Devtron's **Resource Browser**.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-resource-browser.jpg)
      <center>Figure 1: Navigating to Resource Browser</center>

2. Select the `default_cluster` to enable the feature flags.
     
      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-select-cluster.jpg)
      <center>Figure 2: Selecting 'default_cluster'</center>

3. Go to Config & Storage → ConfigMap, and click `dashboard-cm` ConfigMap

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-select-dashboard-cm.jpg)
      <center>Figure 3: Clicking 'dashboard-cm'</center>

4. Edit the `dashboard-cm` ConfigMap by clicking **Edit live manifest**.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-edit-live-manifest.jpg)
            <center>Figure 4: Editing Live Manifest</center>
      1. To enable deployments via FluxCD, check if the below entries are present in the ConfigMap (create one if it doesn't exist) and select **Apply changes**.<br/>

            ```yaml
            FEATURE_FLUX_DEPLOYMENTS_ENABLE: "true"
            ```

      2. To enable migration for external FluxCD applications, check if the below entries are present in the ConfigMap (create one if it doesn't exist) and select **Apply changes**.<br/>

            ```yaml
            FEATURE_LINK_EXTERNAL_FLUX_ENABLE: "true"
            ```
      
      <br/>

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-add-flags.jpg)
      <center>Figure 5: Adding Feature Flags</center>

5. Restart the deployment: 
      1. **For OSS Users:**
          1. Navigate to Devtron's [Resource Browser](../resource-browser/).

          2. Select the cluster for which you have enabled the feature flags.

          3. Click the **Terminal** tab.
          
          4. Restart the deployment using the following command:  

               ```yaml
               kubectl rollout restart deployment dashboard -n devtroncd 
               ```

               ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-restart-deployment.gif)
                  <center>Figure 6: Restarting Deployment</center>
      2. **For Enterprise Users:**
           1. Go to **Infrastructure Management** → **Resource Browser** → (select the cluster in which you have enabled the feature flags) → **Workloads** → **Deployment**

           2. Click the checkbox next to the `dashboard` Deployment workloads and restart them using the `⟳` button.

                ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/restart-deployments.jpg)
                  <center>Figure 7: Restart 'dashboard' deployment workloads</center>

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
      kubectl apply -f https://github.com/fluxcd/flux2/releases/download/v2.7.5/install.yaml
      ```

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-install-controller.gif)
      <center>Figure 8: Installing FluxCD Controller</center>

5. After the command is executed successfully, you can deploy or migrate your applications in that cluster through GitOps (via FluxCD).

#### Install FluxCD controller via Chart Store.

To install FluxCD controller via Chart Store, follow the below steps.

 1. Add FluxCD controller repository, `https://fluxcd-community.github.io/helm-charts` in the chart repositories (if not already added) in Global Configurations. Refer [Chart Repositories](../global-configurations/chart-repo.md#add-chart-repository) to learn more.

       ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-add-chart-repo.gif)
      <center>Figure 9: Adding FluxCD Chart Repository</center> 

 2. Add a new environment in the cluster in which you want to deploy the application via FluxCD linked to namespace as `flux-system`. Refer [Clusters and Environments](../global-configurations/clusters/manage-environments.md#add-environment-to-a-cluster) to lean more.

       ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-add-env.gif)
      <center>Figure 10: Adding Environment linked to 'flux-system' namespace</center> 

 3. Navigate to **Chart Store** and select the `flux2` chart.

       ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-flux2.jpg)
      <center>Figure 11: Selecting 'flux2' Chart</center> 

 4. Click **Configure and Deploy**.

       ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-deploy-chart.jpg)
      <center>Figure 12: Deploying 'flux2' Chart</center> 

 5. Configure the following configurations:

       |Field Name|Description|
       |:---|:---|
       |**App Name**|Define a name for the chart.|
       |**Project**|Select a project from the dropdown|
       |**Deploy to Environment**|Select the environment which you have created in your preferred cluster linked to `flux-system` namespace.|

       ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/resources/gitops-flux-cd/fluxcd-chart-config.jpg)
      <center>Figure 13: Configuring 'flux2' Chart</center>  

 6. Click **Deploy** and the chart will be deployed.

After the chart is successfully deployed, you can deploy applications though GitOps (via FluxCD).

## Advanced Configuration (Optional)

The following **orchestrator** environment variables tune the status-polling and timeout cadence for FluxCD apps. They do **not** enable any feature — the defaults are sensible, so change them only if you have a specific need. Note these are set on the **orchestrator**, not in the `dashboard-cm` ConfigMap used for the feature flags above.

| Env variable | Default | Purpose |
|---|---|---|
| `CD_FLUX_PIPELINE_STATUS_CRON_TIME` | `*/2 * * * *` | Cron frequency for checking FluxCD CD-pipeline deployment status |
| `FLUX_CD_PIPELINE_STATUS_CHECK_ELIGIBLE_TIME` | `120` (sec) | Re-check a pipeline's status only if it was not updated within this window |
| `FLUX_INSTALLATION_STATUS_CRON_TIME` | `1` (min) | Polling interval for tracking FluxCD installation status |
| `FLUX_INSTALLATION_DELETE_CRON_TIME` | `1` (min) | Polling interval for tracking FluxCD installation delete status |
| `FLUX_INSTALLATION_HELM_RELEASE_CRON_TIME` | `30` (sec) | Scan interval for HelmReleases stuck in *Applying* (timeout) or *Pending* (missed event) |
| `FLUX_APPLY_STATUS_TIMEOUT` | `2` (min) | Duration after which a HelmRelease moves from *Applying* to *TimedOut* |
| `FLUX_PENDING_STATUS_TIME` | `3` (min) | Duration after which an event is emitted for an install stuck in *Pending* |

## Limitations

Keep the following limitations in mind when using GitOps deployments via FluxCD:

* **No manual sync from Devtron**: There is no manual *sync* or *refresh* action for FluxCD applications in Devtron. Deployments reconcile automatically on FluxCD's reconciliation interval. To force an immediate reconcile, use the FluxCD CLI, for example:

      ```bash
      flux reconcile helmrelease <app-name> -n <namespace>
      ```

* **Manual controller setup required**: Devtron does not install the FluxCD controller automatically. You must install it in every target cluster (see [Installing FluxCD Controller](#installing-fluxcd-controller-only-for-deployments)) and enable the required feature flags before you can deploy.

* **Prerequisites**: FluxCD deployments require the [Build and Deploy (CI/CD)](../integrations/build-and-deploy-ci-cd.md) and [GitOps (ArgoCD)](../integrations/argocd.md) integrations to be installed.