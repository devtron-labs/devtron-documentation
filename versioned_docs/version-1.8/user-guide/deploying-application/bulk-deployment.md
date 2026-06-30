# Triggering Bulk Deployment

## Introduction

A Devtron application can have more than one workflow, each deploying to a different environment (for example, `dev`, `staging`, and `production`). Instead of triggering each deployment (CD) pipeline one by one, you can select multiple pipelines across the workflows of an application and deploy them together in a single action.

This is useful when you want to roll out the same release to several environments at once, or trigger a set of deployment pipelines without navigating between workflows.

> **Note:** Bulk deployment described here is performed within a **single Devtron application** (across its workflows). If you want to deploy **multiple applications** in bulk, use [Application Groups](../application-groups.md).

---

## Prerequisites

* The application must have at least one [workflow](../creating-application/workflow/README.md) with a configured deployment (CD) pipeline.
* The container images you intend to deploy must be available (i.e., the corresponding [CI builds](./triggering-ci.md) are complete).
* You must have [Build & deploy permission](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above, along with access to the relevant environments.

---

## Triggering Bulk Deployment

1. Go to the **Build & Deploy** tab of your application.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/bulk-deployment/build-deploy-tab.jpg)
    <center>Figure 1: 'Build & Deploy' Tab</center>

2. Select the deployment pipelines you want to trigger using the checkboxes. You can select pipelines across different workflows of the application.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/bulk-deployment/select-pipelines.jpg)
    <center>Figure 2: Selecting Deployment Pipelines</center>

3. Click the **Deploy** button that appears at the bottom of the screen.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/bulk-deployment/bulk-deploy-button.jpg)
    <center>Figure 3: Clicking 'Deploy'</center>

4. For each selected pipeline, select the container image you want to deploy.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/bulk-deployment/select-image.jpg)
    <center>Figure 4: Selecting an Image for Each Pipeline</center>

    An image already deployed to an environment is identified by the `Active on <Environment name>` tag.

5. Click **Deploy** to trigger the selected pipelines together.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/bulk-deployment/trigger-deploy.jpg)
    <center>Figure 5: Triggering the Bulk Deployment</center>

6. Once triggered, each pipeline shows its deployment status. You can track the progress of individual pipelines from the **App Details** tab.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/bulk-deployment/deployment-status.jpg)
    <center>Figure 6: Deployment Status</center>

---

## Triggering Pre/Post-Deployment Stages in Bulk

If the selected workflows have a [Pre-deployment or Post-deployment stage](../creating-application/workflow/pre-post-tasks.md) configured, you can trigger those stages in bulk as well.

* To trigger the Pre-deployment stage, click the dropup next to **Deploy** and select **Trigger Pre-deployment stage**.
* To trigger the Post-deployment stage, click the dropup next to **Deploy** and select **Trigger Post-deployment stage**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/bulk-deployment/trigger-pre-post.jpg)
<center>Figure 7: Triggering Pre/Post-Deployment Stages</center>

:::info Note
* The dropup appears only if at least one selected workflow has a Pre-deployment or Post-deployment stage configured.
* If both stages are configured, the dropup shows options for triggering both **Pre-deployment** and **Post-deployment** stages.
* If only one stage is configured, the dropup shows the option for that specific stage.
:::

---

## Handling Deployment Strategies

If a selected pipeline supports more than one [deployment strategy](../creating-application/workflow/cd-pipeline.md#configure-deployment-strategies), you can choose the strategy to use for that deployment. By default, each pipeline is deployed using its configured default strategy.

If a chosen strategy is not configured for a particular pipeline, deployment for that pipeline is skipped. Make sure the desired strategy is configured for every pipeline you intend to deploy.

---

## Related Topics

* [Triggering CD Pipelines](./triggering-cd.md)
* [Application Groups](../application-groups.md) — to deploy multiple applications in bulk
* [Workflow Editor](../creating-application/workflow/README.md)
