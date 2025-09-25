# Triggering CD Pipelines

After the [CI pipeline](./triggering-ci.md) is complete, you can trigger the CD pipeline.

1. Go to the `Build & Deploy` tab of your application and click **Select Image** in the CD pipeline.

    ![Figure 1: 'Select Image' Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/select-image.jpg)

2. Select an image for deployment.

    ![Figure 2: Selecting an Image for Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/deploy-v2.jpg)

 However, if an image is already deployed, you can identify it by the tag `Active on <Environment name>`.

 ![Figure 3: Currently Deployed Image](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/active-tag.jpg)

3. If in any scenario, such as deploying a hotfix, if you need to use a different deployment strategy other than the default, you can select a different deployment strategy. 

     **Note:** You can only select the deployment strategies that are configured for that pipeline. Refer to the [CD Pipeline](../creating-application/workflow/cd-pipeline.md#configure-deployment-strategies) to learn more.

     ![Figure 4: Selecting Deployment Strategy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-build.jpg)

4. In case you have made any changes in the environment configurations (such as changing deployment strategy, modifying ConfigMaps & Secrets, etc.) since the last deployment, use the **Config Diff** button to compare the new configurations with the last deployed configurations before deploying. Refer to [Reviewing Configurations Differences](#reviewing-configuration-differences) to learn more.

5. Click **Deploy** to trigger the CD pipeline.

## Reviewing Configuration Differences

Before triggering a deployment, if you’ve made any changes to the environment configurations, you can review the configuration differences between your **Last Deployed Configurations** (old configurations) and your **Last Saved Configurations** (new configurations) by clicking the **Config Diff** button. After reviewing, you can choose whether to deploy using the updated configurations or stick with the previously deployed ones.

1. Click the **Config Diff** button to review the changes; a modal window will appear.

     ![Figure 5: Clicking 'Config Diff' button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/config-diff-click.jpg)

2. You can compare configuration differences for various resources, including the **Deployment template**, **Pipeline Configurations**, **ConfigMaps**, and **Secrets**.

3. To compare changes for a specific resource, select it from the left side of the modal window under **Deployment Configurations**. 

     ![Figure 6: Selecting Resource](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/config-diff-modal.jpg) 

4. The right panel displays a side-by-side comparison between the **Last Deployed** and **Last Saved** configurations for the selected resource. You can review the configuration differences for each resource before triggering the deployment.

     ![Figure 7a: Comparing Deployment Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/config-diff-deployment-template.jpg) 

     ![Figure 7b: Comparing Pipeline Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/config-diff-pipeline-config.jpg) 

     ![Figure 7c: Comparing ConfigMaps](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/config-diff-configmap.jpg) 

     ![Figure 7d: Comparing Secrets](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/config-diff-secret.jpg) 

5. After reviewing, select whether you want to trigger the deployment with **Last Saved Config** (new configurations) or **Last Deploy Config** (old configurations).

     ![Figure 8: Selecting Configuration For Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/config-diff-select-config.jpg)

6. Select **Deploy** to trigger the deployment.

     ![Figure 9: Triggering The Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/config-diff-deploy.jpg)

## Manual Approval for Deployment [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

When [manual approval is enabled](../global-configurations/approval-policy.md) for the deployment pipeline configured in the workflow, you are expected to request for an image approval before each deployment. Alternatively, you can deploy images that have already been approved once.

If no approved images are available or the current image is already deployed, you won't see any images for deployment when clicking **Select Image**.

![Figure 10: No Approved Image](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/no-approved-image-v2.jpg)

### Requesting for Image Approval

Users need to have [Build & deploy permission](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and application) to request for an image approval.

To request an image approval, follow these steps:

1. Navigate to the `Build & Deploy` page, and click the **Approval for deployment** icon.

    ![Figure 11: Approval Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/deployment-approval-button-v2.jpg)

2. Click the **Request Approval** button present on the image for which you want to request an approval and click **Submit Request**.

    ![Figure 12: Requesting Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/request-approval-v2.jpg)

    In case you have configured [SES or SMTP on Devtron](../global-configurations/manage-notification.md#configurations), you can directly choose the approver(s) from the list of approvers as shown below.

    ![Figure 13: Choosing Approvers](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/approver-list-v2.jpg)

    The users you selected will receive an approval request via email. Any user with 'Image approver' permission alongwith access to the given application and given environment would be able to approve the image.


## Extras

* In case you wish to cancel the image approval request, you can do so from the `Approval pending` tab as shown in the below image.

    ![Figure 14: Cancelling Request](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/cancel-approval.jpg)

* If you've received an approval but no longer want the image to be deployable, you can let the approval expire.

    ![Figure 15: Expiring an Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/expire-approval.jpg)

### Accepting Image Approval Request

By default, super-admin users are considered as the default approvers. Users who build the image and/or request for its approval, cannot self-approve it even if they have super-admin privileges.

Users with `Approver` permission (for the specific application and environment) can also approve a deployment. This permission can be granted to users from [`User Permissions`](../global-configurations/authorization/user-access.md#devtron-apps-permissions) present in [Global Configurations](../global-configurations/README.md).

In case [SES](../global-configurations/manage-notification.md#email-ses-configuration) or [SMTP](../global-configurations/manage-notification.md#email-smtp-configuration) was configured in Devtron, and the user chose the approvers while raising an image approval request, the approvers would receive an email notification as shown below:

![Figure 16: Email Notification to the Approver](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/email-notification.jpg)

To approve an image approval request, follow these steps:

1. Go to the `Build & Deploy` page and click the `Approval for deployment` button.

    ![Figure 17: Approval Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/deployment-approval-button-v2.jpg)

2. Switch to the `Approval pending` tab. Here, you will get a list of images that are awaiting approval.

    ![Figure 18: List of Pending Approvals](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/approval-pending-tab.jpg)

3. Click **Approve** followed by **Approve Request** button.

    ![Figure 19: Approving a Request](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/approve-request-v2.jpg)

### Deploying Approved Image

Users need to have [Build & deploy permission](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the respective environment and application) to select and deploy an approved image.

In case the super-admin has set the minimum number of approval to more than 1 (in [Approval Policy](../global-configurations/approval-policy.md)), you must wait for all approvals before deploying the image. In other words, partially approved image will not be eligible for deployment.

![Figure 20: Approval Count](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/approval-count-v2.jpg)

To deploy an approved image, follow these steps:

1. Navigate to the `Build & Deploy` tab and click **Select Image**. 

    ![Figure 21: Select Image Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/select-image.jpg)

2. You will find all the approved images listed under the `Approved images` section. From the list, you can select the desired image and deploy it to your environment.

    ![Figure 22: List of Approved Images](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/approved-images-v2.jpg)

3. You can view the status of current deployment in the `App Details` tab. 

    ![Figure 23: 'App Details' Screen](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploying-application/triggering-cd/app-status-v2.jpg)

The status initially appears as `Progressing` for approximately 1-2 minutes, and then gradually transitions to `Healthy` state based on the deployment strategy.

Here, our CD pipeline trigger was successful, and the deployment is in `Healthy` state.