# Deployment Visibility & Actions

Devtron helps you to manage your **Canary** and **Blue-Green** deployments by providing visibility and easy controls to manage how new versions (releases) are shared with users.

Devtron allows you to:

* Quickly view the current deployment status and detailed progress.

* For canary deployments you can manually trigger the next step for the release or fully complete the rollout.

* For Blue-Green deployments 

     * You can directly route the end user traffic to the application’s new deployment on a particular environment.

     * You can swap the traffic from Blue to Green.

* Easily rollback deployments (if needed).

## Deployment Strategies

A deployment strategy is a method of updating, downgrading, or creating new versions of an application. The options you see under deployment strategy depend on the selected chart type (see fig 2). Below are some deployment configuration-based strategies.

### Blue-Green Strategy

Blue-green deployments involve running two versions of an application at the same time and moving traffic from the in-production version \(the green version\) to the newer version \(the blue version\).

```markup
blueGreen:
  autoPromotionSeconds: 30
  scaleDownDelaySeconds: 30
  previewReplicaCount: 1
  autoPromotionEnabled: false
```

| Key | Description |
| :--- | :--- |
| `autoPromotionSeconds` | It will make the rollout automatically promote the new ReplicaSet to active Service after this time has passed |
| `scaleDownDelaySeconds` | It is used to delay scaling down the old ReplicaSet after the active Service is switched to the new ReplicaSet |
| `previewReplicaCount` | It will indicate the number of replicas that the new version of an application should run |
| `autoPromotionEnabled` | It will make the rollout automatically promote the new ReplicaSet to the active service |

### Canary Strategy

Canary deployments are a pattern for rolling out releases to a subset of users or servers. The idea is to first deploy the change to a small subset of servers, test it, and then roll the change out to the rest of the servers. The canary deployment serves as an early warning indicator with less impact on downtime: if the canary deployment fails, the rest of the servers aren't impacted.

```markup
canary:
  maxSurge: "25%"
  maxUnavailable: 1
  steps:
    - setWeight: 25
    - pause:
        duration: 15 # 1 min
    - setWeight: 50
    - pause:
        duration: 15 # 1 min
    - setWeight: 75
    - pause:
        duration: 15 # 1 min
```

| Key | Description |
| :--- | :--- |
| `maxSurge` | It defines the maximum number of replicas the rollout can create to move to the correct ratio set by the last setWeight |
| `maxUnavailable` | The maximum number of pods that can be unavailable during the update |
| `setWeight` | It is the required percent of pods to move to the next step |
| `duration` | It is used to set the duration to wait to move to the next step |

## Configure the Application

Before deploying the application Canary or Blue-Green deployment strategies, you must configure the application for these deployment strategies. To do so, follow the below steps:

{% hint style="info" %}
### Note
A CD pipeline (workflow) must already exist in the workflow editor. Refer [CD Pipeline](../creating-application/workflow/cd-pipeline.md) to set up a CD Pipeline.
{% endhint %}

1. Navigate to **Configurations** → **Workflow Editor** and choose your workflow.

      ![Figure 1: Selecting Workflow](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-select-workflow.jpg)

2. Select the deployment pipeline, a **Edit deployment pipeline** window will open.

      ![Figure 2: Editing Deployment Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-edit-deploy.jpg)

3. Select **Add Strategy** and select the strategies you want to add; strategies will be added as the **Deployment Strategy** in your deployment pipeline.

      ![Figure 3a: Adding Deployment Strategy ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-add-strategy.jpg)

 * In case, you have multiple deployment strategies, you can choose a default deployment strategy which are configured for the pipeline.

      ![Figure 3b: Selecting Default Deployment Strategy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-set-default.jpg)
 
 * You can also choose the deployment strategy which are configured for that pipeline in **Build & Deploy** section while triggering the deployment.

      ![Figure 3c: Selecting Deployment Strategy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-build.jpg)

4. Configure the deployment strategy by selecting the **Settings** icon next to it to edit the strategy template according to your use case.

     ![Figure 4a: Editing Canary Strategy Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-canary-config.jpg)

     ![Figure 4b: Editing Blue Green Strategy Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-blue-green-config.jpg)

5. Select **Update Pipeline** to save the configurations.

     ![Figure 5: Selecting Update Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-update-pipeline.jpg)

## Visibility & Actions

### For Canary Deployments

After triggering the deployment, navigate to **App Details**, to get a quick overview of your release rollout status.

You can select the **Manage Traffic** button to view the rollout status and steps involved in the release. 

If you wish you can also trigger the specific release steps (for example 25%, 50%, 75%) or you can also trigger the full rollout at once.

 ![Figure 6a: Selecting Manage Traffic](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-manage-traffic.jpg)

 ![Figure 6b: Managing Canary Traffic](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-manage-traffic-2.jpg)


### For Blue Green deployments

#### Skip & Promote Full

Devtron allows you to directly route the end user traffic to the application’s new deployment on a particular environment during the deployment.

To do so, follow the below steps:

1. Navigate to **App Details** of your application.

2. During Blue-Green deployment, click the **Skip & Promote Full** button to shift the traffic to application's new deployment.

      ![Figure 7: Selecting 'Skip & Promote Full'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-skip-and-promote.jpg)
      
   In case `autoPromotionEnabled` is set to `false`, then after the deployment succeeded, you will see a **Swap Traffic** button instead of **Skip & promote full**.  <br>

      ![Figure 8a: autoPromotionEnabled: false](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-auto-promotion-enabled-false.jpg)

      ![Figure 8b: Selecting Swap Traffic](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-awating-swap.jpg)

3. Enter the name of the environment and select **Swap Traffic** or **Promote to Full**; this will route the end user traffic to the application’s new deployment on a particular environment during the deployment.

      ![Figure 9a: Swap Traffic Pop Up](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-swap-live-traffic.jpg)

      ![Figure 9b: Promote to Full Pop Up](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-skip-and-promote-2.jpg)

### Rollback the Deployment

In case you have identified some bugs or performance of the release is not as expected then you can also rollback to the previous release.

To rollback follow the below steps:

1. Navigate to **App details** of your Devtron Application.

2. Based on the type of deployment strategy, perform one of the following actions:
    
  * In case of Canary deployments, select **Rollback** under **Canary Strategy**.

      ![Figure 10: Selecting Rollback For Canary Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback.jpg)

  * In case of Blue Green deployments, select **Rollback** under **Blue Green Strategy**.

      ![Figure 11: Selecting Rollback For Blue Green Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback-blue-green.jpg)

3. Select the image to which you want your release to be rolled back and click  **Deploy** to rollback the release.

      ![Figure 12: Selecting the Image](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-rollback-select-image+.jpg)

4. The application will be rolled back to the previous release (image).