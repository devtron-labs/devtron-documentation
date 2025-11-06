# Deployment Visibility & Actions 

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Devtron helps you to manage your **Canary** and **Blue-Green** deployments by providing visibility and easy controls to manage how new versions (releases) are shared with users.

Devtron allows you to:

* Quickly view the current deployment status and detailed progress.

* For canary deployments you can manually trigger the next step for the release or fully complete the rollout.

* For Blue-Green deployments 

     * You can directly route the end user traffic to the application’s new deployment on a particular environment.

     * You can swap the traffic from Blue to Green.

* Easily rollback deployments (if needed).

:::info Prerequisites
The [Deployment Chart Type](../creating-application/base-config/deployment-template.md#select-a-deployment-chart-type) must be set to rollout in order to use Blue-Green or Canary strategies.

Deployment Visibility and Actions is only available for Canary and Blue-Green Strategies. Refer to the [Deployment Strategies](../creating-application/workflow/cd-pipeline.md#deployment-strategies) to learn more.

:::

:::caution Who Can Perform This Action?
Users need to have Build and Deploy or above (along with access to the environment and application).

:::

---

## Visibility & Actions

### For Canary Deployments

After triggering the deployment, navigate to **App Details**, to get a quick overview of your release rollout status.

You can click the [Manage Traffic](../application-groups.md#managing-traffic-) button to view the rollout status and steps involved in the release. 

If you wish you can also trigger the next release steps (for example 25%, 50%, 75%) or you can also trigger the full rollout at once according to your use case.

 ![Figure 1a: Selecting Manage Traffic](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-manage-traffic.jpg)

 ![Figure 1b: Managing Canary Traffic](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-manage-traffic-2.jpg)


### For Blue Green deployments

Devtron automatically swaps the traffic from the current running release to the new release based on the defined strategy configuration. In case `autoPromotionEnabled` field value is set to `false`, you can manually swap the traffic from the current release to the new release. 

![Figure 2: autoPromotionEnabled: false](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-auto-promotion-enabled-false.jpg)

To do so, follow the steps below:

#### Swap Traffic 

1. Navigate to **App Details** of your application.

2. During Blue-Green deployment, click the **Swap Traffic** button to shift the traffic to application's new release.

      ![Figure 3: Selecting Swap Traffic](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-awating-swap.jpg)

3. Enter the name of the environment and select **Swap Traffic**

      ![Figure 4: Swap Traffic Pop Up](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-swap-live-traffic.jpg)

4. This will route the end user traffic from the current running release to the new release on a particular environment.


In any scenario, if you want to skip the Blue-Green Strategy and route the end user traffic from the current running release to the new release on a particular environment, you can do that via **Skip & Promote Full** button during the deployment.

To do so, follow the below steps:

#### Skip & Promote Full

1. Navigate to **App Details** of your application.

2. During Blue-Green deployment, click the **Skip & Promote Full** button to shift the traffic to application's new deployment.

      ![Figure 5: Selecting 'Skip & Promote Full'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-skip-and-promote.jpg)

3. Enter the name of the environment and select **Promote to Full**.

      ![Figure 6: Promote to Full Pop Up](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-skip-and-promote-2.jpg)

4. This will skip the Blue-Green Strategy and route the end user traffic from the current running release to the new release on a particular environment.

### Rollback the Deployment 

In case you have identified some bugs or performance of the release is not as expected then you can also rollback to the previous release. 

You can perform a rollback from **Build & Deploy** Section and from App Details (for Blue-Green & Canary Strategies only)

To perform a rollback from App Details follow the below steps:

1. Navigate to **App details** of your Devtron Application.

2. Based on the type of deployment strategy, perform one of the following actions:
    
  * In case of Canary deployments, select **Rollback** under **Canary Strategy**.

      ![Figure 7: Selecting Rollback For Canary Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback.jpg)

  * In case of Blue Green deployments, select **Rollback** under **Blue Green Strategy**.

      ![Figure 8: Selecting Rollback For Blue Green Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback-blue-green.jpg)

3. Select the image to which you want your release to be rolled back and click **Deploy** to rollback the release.

      ![Figure 9: Selecting the Image](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback-select-image+.jpg)

4. If you wish, you can select a different deployment strategy other than the default according to the use case.

      ![Figure 10: Selecting Deployment Strategy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback-deploy-strag.jpg)

5. The application will be rolled back to the previous release (image) using the selected deployment strategy.