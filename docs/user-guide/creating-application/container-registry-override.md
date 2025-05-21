#  Override Build Configuration

## Introduction 

**Override Options** in **Build Stage** lets you override **Build Configurations** for each workflow of the same application. You can configure overrides in build stage of each workflow.

For example, you might want to push development or testing builds to a separate registry from production builds, but in **Build Configurations** you have configured the production container registry to push build images; This means for all the workflows (testing or production), build images will be pushed to the production container registry by default. 

To override this Build configuration for the specific workflow (testing workflow), you can use **Override Options** in the **Build Stage** of that workflow that lets you specify different container registries, how to build container images, and target platforms for different workflows of the same application; This means the images built for testing environment can be included to the testing registry and the images for production environment can be included to the production registry. This helps keep environments isolated, improves deployment safety, and makes managing multiple environments easier.

## Creating Build Configuration Override

To override a container registry, container image or target platform:

1. Go to **Applications** and select your application from the **Devtron Apps** tabs.

2. On the **App Configuration** tab, select **Workflow Editor**.

3. Select the build pipeline of your application.

 ![Figure 1: Selecting Build Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/select-build-override.jpg)

4. Click **Allow Override** in the **Build Stage**:

 ![Figure 2: Selecting Allow Override](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-allow-override.jpg)

 * Select the new container registry from the drop-down list.

 * [Create and build the new container image](../creating-application/docker-build-configuration.md#build-the-container-image) with different options.

 * Set a [new target platform](../creating-application/docker-build-configuration.md#set-target-platform-for-the-build) from the drop-down list or enter a new target platform.

5. Select **Update Pipeline**; The override will be effective when the next build is triggered.

The overridden container registry/container image location/target platform will be reflected on the [Build Configuration](docker-build-configuration.md) page. You can also see the number of build pipelines for which the container registry/container image location/target platform is overridden.

![Figure 3: Overrides in Build Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-configuration-overridden.jpg)