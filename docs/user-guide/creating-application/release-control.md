# Deployment Strategies Release and Traffic Control

Devtron helps you to manage your **Canary** and **Blue-Green** deployments by providing visibility and easy controls to manage how new versions (releases) are shared with users.

Devtron allows you to:

* Quickly view the current deployment status and detailed progress.

* For canary deployments you can manually trigger the next step for the release or fully complete the rollout.

* For Blue-Green deployments 

     * You can directly route the end user traffic to the application’s new deployment on a particular environment.

     * You can swap the traffic from Blue to Green.

* Easily rollback deployments (if needed).

## Configure the Application

Before deploying the application Canary or Blue-Green deployment strategies, you must configure the application for these deployment strategies. To do so, follow the below steps:

{% hint style="info" %}
### Note
A CD pipeline (workflow) must already exist in the workflow editor. Refer [CD Pipeline](../creating-application/workflow/cd-pipeline.md) to set up a CD Pipeline.
{% endhint %}

1. Navigate to **Configurations** → **Workflow Editor** and choose your workflow.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-select-workflow.jpg)

2. Select the deployment pipeline, a **Edit deployment pipeline** window will open.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-edit-deploy.jpg)

3. Select **Add Strategy** and select the strategies you want to add; strategies will be added as the **Deployment Strategy** in your deployment pipeline.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-add-strategy.jpg)

 * In case, you have multiple deployment strategies, you can choose a default deployment strategy.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-set-default.jpg)
 
 * You can also choose the deployment strategy in **Build & Deploy** section while triggering the deployment.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-build.jpg)

4. Configure the deployment strategy by selecting the **Settings** icon next to it to edit the strategy template according to your use case.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-canary-config.jpg)

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-blue-green-config.jpg)

5. Select **Update Pipeline** to save the configurations.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-update-pipeline.jpg)

## Canary Deployments

### Manage traffic

After triggering the deployment, navigate to **App Details**, to get a quick overview of your release rollout status.

You can select the **Manage Traffic** button to view the rollout status and steps involved in the release. 

If you wish you can also trigger the specific release steps (for example 25%, 50%, 75%) or you can also trigger the full rollout at once.

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-manage-traffic.jpg)

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-manage-traffic-2.jpg)


## Blue Green deployments

### Skip & promote full

Devtron allows you to directly route the end user traffic to the application’s new deployment on a particular environment during the deployment.

To do so, follow the below steps:

1. Navigate to **App Details** of your application.

2. During Blue-Green deployment, click the **Skip & promote full** button to shift the traffic to application's new deployment.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-skip-and-promote.jpg)

 In case `autoPromotionEnabled` is set to `false`, then after the deployment succeeded, you will see a **Swap Traffic** button instead of **Skip & promote full**. 

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-auto-promotion-enabled-false.jpg)

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-awating-swap.jpg)

3. Enter the name of the environment and select **Swap Traffic** or **Promote to Full**; this will route the end user traffic to the application’s new deployment on a particular environment during the deployment.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-swap-live-traffic.jpg)

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-skip-and-promote-2.jpg)

## Rollback the deployment.

In case you have identified some bugs or performance of the release is not as expected then you can also rollback to the previous release.

To rollback follow the below steps:

1. Navigate to **App details** of your Devtron Application.

2. Based on the type of deployment strategy, perform one of the following actions:
    
  * In case of Canary deployments, select **Rollback** under **Canary Strategy**.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback.jpg)

  * In case of Blue Green deployments, select **Rollback** under **Blue Green Strategy**.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback-blue-green.jpg)

3. Select the image to which you want your release to be rolled back and click  **Deploy** to rollback the release.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback-select-image+.jpg)