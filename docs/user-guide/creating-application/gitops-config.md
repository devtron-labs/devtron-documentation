# GitOps Configuration

:::caution 
The 'GitOps Configuration' page appears only if the super-admin has opted for **Ask git repository for each application** in [Application Management → Configurations → GitOps](../global-configurations/gitops.md).
:::

## Introduction

This configuration is an extension of the [GitOps](../global-configurations/gitops.md) settings present in [Application Management → Configurations](../global-configurations/README.md) of Devtron. Therefore, make sure you read it before making any changes to your app configuration.

The application-level GitOps configuration offers the flexibility to add a custom Git repo (as opposed to Devtron auto-creating a repo for your application). 

---

## Adding Custom Git Repo for GitOps

:::caution Who Can Perform This Action?
Users need to have [Admin permission](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and application) to configure user-defined Git repo.
:::

### For Devtron Apps

1. Go to **Application Management** → **Devtron Apps** → (choose your app) → **Configurations** (tab) → **GitOps Configuration**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/app-config-gitops.jpg)
    <center>Figure 1: App-level GitOps Config</center>

2. Assuming a GitOps repo was not added to your application earlier, you get 2 options:

    * **Auto-create repository** - Select this option if you wish to proceed with the default behavior. It will create a repository automatically, named after your application with a prefix. Thus saving you the trouble of creating one manually.
 
    * **Commit manifests to a desired repository** - Select this option if you wish to add a custom repo that is already created with your [Git provider](../global-configurations/gitops.md#supported-git-providers). Enter its link in the `Git Repo URL` field.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/gitops-config.jpg)
    <center>Figure 2: Repo Creation</center>


:::caution 
GitOps repositories, whether auto-created by Devtron or added manually, are immutable. This means they cannot be modified after creation. The same is true if you have an existing CD pipeline that uses/used GitOps for deployment.
:::

3. Click **Save**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/saved-config.jpg)
    <center>Figure 3: Saved GitOps Config</center>

**Note**: In case you skipped the GitOps configuration for your application and proceeded towards the [creation of a new CD pipeline](../creating-application/workflow/cd-pipeline.md) (that uses GitOps), you will be prompted to configure GitOps as shown below:

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/gitops-not-configured.jpg)
<center>Figure 4: Incomplete GitOps Config</center>


### For Helm Apps

You can [deploy a helm chart](../deploy-chart/deployment-of-charts.md#configure-and-deploy-charts) using either Helm or GitOps. Let's assume you wish to deploy `airflow` chart.

1. Select the helm chart from the [Chart Store](../deploy-chart/README.md).

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/chart-selection.jpg)
    <center>Figure 5: Choosing a Helm Chart</center>

2. Click **Configure & Deploy**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/configure-deploy.jpg)
    <center>Figure 6: Configure & Deploy Button</center>

3. After you enter the `App Name`, `Project`, and `Environment`; an option to choose the deployment approach (i.e., Helm or GitOps (Via ArgoCD)) would appear. Select **GitOps (Via ArgoCD)**.

:::info 
The option to choose between 'Helm' or 'GitOps' is only available in <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>
:::

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/deployment-method.jpg)
<center>Figure 7a: Deployment Approach</center>

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/select-gitops.jpg)
<center>Figure 7b: Selecting GitOps (Via ArgoCD) Method</center>

4. A modal window will appear for you to enter a Git repository. Just like [Devtron Apps](#for-devtron-apps) (step 2), you get two options:
    * Auto-create repository
    * Commit manifests to a desired repository

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/git-repository-helm-app.jpg)
    <center>Figure 8: Adding a Repo</center>

5. Enter your custom Git Repo URL, and click **Save**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/gitops/custom-git-repo-helm-apps.jpg)
    <center>Figure 9: Saved GitOps Config for Helm App</center>

Next, you may proceed to deploy the chart.

:::caution 
Once you deploy a helm app with GitOps, you cannot change its GitOps repo.
:::