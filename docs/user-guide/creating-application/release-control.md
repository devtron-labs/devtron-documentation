# Deployment Strategies Release and Traffic Control

Devtron helps you to manage your **Canary** and **Blue-Green** deployments by providing visibility and direct controls for managing rollout of your releases.

Devtron allows you to:

* Quickly view the current deployment status and detailed progress.

* For canary deployments you can manually trigger the next step for the release or fully complete the rollout.

* For Blue-Green deployments 

     * You can directly route the end user traffic to the application’s new deployment on a particular environment.

     * You can swap the traffic from Blue to Green.

* Easily rollback deployments (if needed).

### Configure the Application

To deploy an image using Canary deployment strategy, follow the below steps

1. Navigate to **Configurations** → **Workflow Editor** and choose your workflow.

2. Select the deployment pipeline, a **Edit deployment pipeline** window will open.

3. Select **Add Strategy** and select the strategies you want to add; Strategies will be added as the **Deployment Strategy** in your deployment pipeline.

 * In case you have multiple deployment strategies, you can choose a default deployment strategy 
 
 * You can also choose the deployment strategy in **Build & Deploy** section while triggering the deployment.

4. Configure the deployment strategy by selecting the **Settings** icon next to it to edit the strategy template according to your use case.

5. Select **Update Pipeline** to save the configurations.

### Canary Deployments

#### Manage traffic

After triggering the deployment, navigate to **App details**, to get a quick overview of your release rollout status.

You can select the **Manage Traffic** button to view the rollout status and steps involved in the release. If you wish you can also trigger the specific release steps or you can trigger the full rollout at once.

<!-- Image -->

#### Rollback the deployment.

In case you have identified some bugs or performance of the release is not as expected then you can also rollback to the previous release.

To rollback follow the below steps:

1. Navigate to **App details** of your Devtron Application.

2. Select **Rollback** in the under **Canary Strategy**, a new window will appear.

3. Select the image to which you want your release to be rolled back.

4. Select **Deploy** to rollback the release.


### Blue Green deployments

#### Skip & promote full

Devtron allows you to directly route the end user traffic to the application’s new deployment on a particular environment during the deployment.

To do so follow the below steps:

1. Navigate to **App Details** of your application.

2. While deploying, under Blue-Green Strategy, you will see a **Skip & promote full** button, clicking on it, A dialog box will appear asking you to enter the environment name to confirm the action.

In case `autoPromotionEnabled` is set to `false`, the after the deployment succeeded, you will see a **Swap Traffic** button under awaiting traffic swap.

3. Enter the name and select **Swap Traffic**; this will route the end user traffic to the application’s new deployment on a particular environment during the deployment.









