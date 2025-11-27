# Triggering CD Pipelines

After the [CI pipeline](./triggering-ci.md) is complete, you can trigger the CD pipeline.

1. Go to the `Build & Deploy` tab of your application and click **Select Image** in the CD pipeline.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/select-image.jpg)
    <center>Figure 1: 'Select Image' Button</center>

2. Select an image for deployment.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/deploy-v2.jpg)
    <center>Figure 2: Selecting an Image for Deployment</center>

 However, if an image is already deployed, you can identify it by the tag `Active on <Environment name>`.

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/active-tag.jpg)
 <center>Figure 3: Currently Deployed Image</center>

3. If in any scenario, such as deploying a hotfix, if you need to use a different deployment strategy other than the default, you can select a different deployment strategy. 

     **Note:** You can only select the deployment strategies that are configured for that pipeline. Refer to the [CD Pipeline](../creating-application/workflow/cd-pipeline.md#configure-deployment-strategies) to learn more.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deployment-build.jpg)
    <center>Figure 4: Selecting Deployment Strategy</center>

4. In case you have made any changes in the environment configurations (such as changing deployment strategy, modifying ConfigMaps & Secrets, etc.) since the last deployment, use the **Config Diff** button to compare the new configurations with the last deployed configurations before deploying. Refer to [Reviewing Configurations Differences](#reviewing-configuration-differences) to learn more.

5. Click **Deploy** to trigger the CD pipeline.

## Reviewing Configuration Differences

Before triggering a deployment, if you’ve made any changes to the environment configurations, you can review the configuration differences between your **Last Deployed Configurations** (old configurations) and your **Last Saved Configurations** (new configurations) by clicking the **Config Diff** button. After reviewing, you can choose whether to deploy using the updated configurations or stick with the previously deployed ones.

1. Click the **Config Diff** button to review the changes; a modal window will appear.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/config-diff-click.jpg)
    <center>Figure 5: Clicking 'Config Diff' button</center>

2. You can compare configuration differences for various resources, including the **Deployment template**, **Pipeline Configurations**, **ConfigMaps**, and **Secrets**.

3. To compare changes for a specific resource, select it from the left side of the modal window under **Deployment Configurations**. 

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/config-diff-modal.jpg)
    <center>Figure 6: Selecting Resource</center> 

4. The right panel displays a side-by-side comparison between the **Last Deployed** and **Last Saved** configurations for the selected resource. You can review the configuration differences for each resource before triggering the deployment.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/config-diff-deployment-template.jpg)
    <center>Figure 7a: Comparing Deployment Template</center> 

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/config-diff-pipeline-config.jpg)
    <center>Figure 7b: Comparing Pipeline Configurations</center> 

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/config-diff-configmap.jpg)
    <center>Figure 7c: Comparing ConfigMaps</center> 

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/config-diff-secret.jpg)
    <center>Figure 7d: Comparing Secrets</center> 

5. After reviewing, select whether you want to trigger the deployment with **Last Saved Config** (new configurations) or **Last Deploy Config** (old configurations).

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/config-diff-select-config.jpg)
    <center>Figure 8: Selecting Configuration For Deployment</center>

6. Select **Deploy** to trigger the deployment.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/config-diff-deploy.jpg)
    <center>Figure 9: Triggering The Deployment</center>

## Manual Approval for Deployment <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

When [manual approval is enabled](../global-configurations/approval-policy.md) for the deployment pipeline configured in the workflow, you are expected to request for an image approval before each deployment. Alternatively, you can deploy images that have already been approved once.

If no approved images are available or the current image is already deployed, you won't see any images for deployment when clicking **Select Image**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/no-approved-image-v2.jpg)
<center>Figure 10: No Approved Image</center>

### Requesting for Image Approval

Users need to have [Build & deploy permission](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and application) to request for an image approval.

To request an image approval, follow these steps:

1. Navigate to the `Build & Deploy` page, and click the **Approval for deployment** icon.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/deployment-approval-button-v2.jpg)
    <center>Figure 11: Approval Button</center>

2. Click the **Request Approval** button present on the image for which you want to request an approval and click **Submit Request**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/request-approval-v2.jpg)
    <center>Figure 12: Requesting Approval</center>

    In case you have configured [SES or SMTP on Devtron](../global-configurations/manage-notification.md#configurations), you can directly choose the approver(s) from the list of approvers as shown below.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/approver-list-v2.jpg)
    <center>Figure 13: Choosing Approvers</center>

    The users you selected will receive an approval request via email. Any user with 'Image approver' permission alongwith access to the given application and given environment would be able to approve the image.


## Extras

* In case you wish to cancel the image approval request, you can do so from the `Approval pending` tab as shown in the below image.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/cancel-approval.jpg)
    <center>Figure 14: Cancelling Request</center>

* If you've received an approval but no longer want the image to be deployable, you can let the approval expire.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/expire-approval.jpg)
    <center>Figure 15a: Expiring an Approval</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/expire-approval-1.jpg)
    <center>Figure 15b: Expiring an Approval</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/expire-approval-2.jpg)
    <center>Figure 15c: Expiring an Approval</center>

### Accepting Image Approval Request

By default, super-admin users are considered as the default approvers. Users who build the image and/or request for its approval, cannot self-approve it even if they have super-admin privileges.

Users with `Approver` permission (for the specific application and environment) can also approve a deployment. This permission can be granted to users from [`User Permissions`](../global-configurations/authorization/user-access.md#devtron-apps-permissions) present in [Global Configurations](../global-configurations/README.md).

In case [SES](../global-configurations/manage-notification.md#email-ses-configuration) or [SMTP](../global-configurations/manage-notification.md#email-smtp-configuration) was configured in Devtron, and the user chose the approvers while raising an image approval request, the approvers would receive an email notification as shown below:

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/email-notification.jpg)
<center>Figure 16: Email Notification to the Approver</center>

To approve an image approval request, follow these steps:

1. Go to the `Build & Deploy` page and click the `Approval for deployment` button.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/deployment-approval-button-v2.jpg)
    <center>Figure 17: Approval Button</center>

2. Switch to the `Approval pending` tab. Here, you will get a list of images that are awaiting approval.

3. Click **Approve** followed by **Approve Request** button.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/approve-request-v2.jpg)
    <center>Figure 18: Approving a Request</center>

### Deploying Approved Image

Users need to have [Build & deploy permission](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the respective environment and application) to select and deploy an approved image.

In case the super-admin has set the minimum number of approval to more than 1 (in [Approval Policy](../global-configurations/approval-policy.md)), you must wait for all approvals before deploying the image. In other words, partially approved image will not be eligible for deployment.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/approval-count-v2.jpg)
<center>Figure 19: Approval Count</center>

To deploy an approved image, follow these steps:

1. Navigate to the `Build & Deploy` tab and click **Select Image**. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/select-image-1.jpg)
    <center>Figure 20: Select Image Button</center>

2. You will find all the approved images listed under the `Approved images` section. From the list, you can select the desired image and deploy it to your environment.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/approved-images-v2.jpg)
    <center>Figure 21: List of Approved Images</center>

3. You can view the status of current deployment in the `App Details` tab. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/triggering-cd/app-status-v2.jpg)
    <center>Figure 22: 'App Details' Screen</center>

The status initially appears as `Progressing` for approximately 1-2 minutes, and then gradually transitions to `Healthy` state based on the deployment strategy.

Here, our CD pipeline trigger was successful, and the deployment is in `Healthy` state.