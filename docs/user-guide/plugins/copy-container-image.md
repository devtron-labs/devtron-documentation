# Copy Container Image

## Introduction

Building container images in CI often results in a growing number of images, not all of which are production-ready. Therefore, it's a best practice to maintain a separate repository exclusively for storing production-builds. However, this would involve copying the container image (production-ready) from your existing repository to the production repository. 

This plugin helps you copy a container image to a desired container [repository](../../reference/glossary.md#repo). The pushing of image can be between repositories of the same container [registry](../../reference/glossary.md#containeroci-registry) or between repositories of different container registry. One of the major usecases this plugin serves is multi-cloud deployments.

The plugin can be used at post CI, pre-CD, and post-CD. Moreover, you can also [customize the image tag pattern](../creating-application/workflow/cd-pipeline.md#custom-image-tag-pattern) for the copied image.

## Steps to Use

1. Go to **App Configuration** tab of your application.

2. Select **Workflow Editor** and click your deployment pipeline.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/plugins/copy-container/cd-pipeline.jpg)
    <center>Figure 1: CD Pipeline</center>

3. In this example, we will be adding the plugin in pre-CD stage; therefore, go to **Pre-Deployment stage** tab of your deployment pipeline and click **Add task**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/plugins/copy-container/pre-deployment-tab.jpg)
    <center>Figure 2: Pre Deployment Tab</center>

4. From the list of plugins, choose **Copy container image**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/plugins/copy-container/copy-container-image.jpg)
    <center>Figure 3: Copy Container Image</center>

5. Add the image destination in the field given for **DESTINATION_INFO** variable. The format is `registry-name | username/repository-name`.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/plugins/copy-container/image-destination.jpg)
    <center>Figure 4: Image Destination</center>

    * **registry-name** is the name you gave to your container registry while adding it in [Global Configuration → OCI/Container Registry](../global-configurations/container-registries.md#add-container-registry).

    * **user-name** is the your account name registered with you container registry, e.g., DockerHub.

    * **repository-name** is the name of the repository within your container registry that hosts the container images of your application.

6. Click **Update Pipeline**.

7. Go to the **Build & Deploy** tab of your application and click **Select Image** in the pre-deployment stage.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/plugins/copy-container/select-image-for-cd.jpg)
    <center>Figure 5: Select Image</center>

8. Choose a CI image that you wish to copy to the destination and click **Trigger Stage**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/plugins/copy-container/trigger-pre-cd.jpg)
    <center>Figure 6: Trigger Pre-CD</center>

9. The copying process will initiate, and once it is successful, the [tag for the copied image](../creating-application/workflow/cd-pipeline.md#custom-image-tag-pattern) would reflect at all relevant screens:

    * **Destination Repository**

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/plugins/copy-container/docker-destination-image.jpg)
    <center>Figure 7: Docker Destination Image</center>

    * **CD Pipeline (Image Selection)**
    
    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/plugins/copy-container/cd-image.jpg)
    <center>Figure 8: CD Image</center>
        
    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/plugins/copy-container/prod-image.jpg)
    <center>Figure 9: Prod Image</center>

:::info 
You can also filter out specific images (of target repository) from deployment. Refer [Filter Condition](../global-configurations/filter-condition.md) to know the process.
:::