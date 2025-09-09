# Workflow Editor

## Introduction

After configuring the **Build Configurations** and **Base Configurations**, the next step is to create a workflow using the Workflow Editor.

In Devtron, a **Workflow** is a logical sequence of different stages(pipelines) used for continuous integration and continuous deployment of an application. 

 ![Figure 1: Workflow Editor](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/arora1.gif)

---

## Create Workflow

The **Build and Deploy from Source Code** provides a simple way to create both CI and CD pipelines in one step. It is for users who want to set up a complete workflow quickly using minimal required information, such as the source repository branch and the target environment.

To create a quick workflow with both build and deployment pipelines, follow the steps below: 

1. Click **New Workflow** in the workflow editor.

     ![Figure 2: Selecting 'New Workflow'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow/build-deploy-new-create-workflow.jpg)

2. Select **Build and Deploy from Source Code**; a window appears.

     ![Figure 3: Selecting 'Build and Deploy from Source Code'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow/build-deploy-new-build-deploy-from-source-code.jpg)

3. Enter the required information in the following fields.

 | Field Name|Required/Optional| Description|
 | :--- | :--- | :--- |
 | `Source type`| Required| Source type to trigger the CI. Available options: Branch Fixed, Branch Regex, Pull Request, Tag Creation|
 | `Branch Name`| Required| Branch that triggers the CI build|
 | `Environment` | Required |Select the environment where you want to deploy your application |
 | `Namespace`| Required (Auto Filled)| Automatically populated based on the selected environment | 

   ![Figure 4: Entering Information](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow/build-deploy-new-cred.jpg)

 **Source Types**

 |Source Type| Description| Additional Requirements|
 |:---|:---|:---|
 | `Branch Fixed`| Triggers a CI build whenever changes are pushed to a specified branch.| Requires a predefined branch name.|
 | `Branch Regex`| Allows dynamic branch selection based on a regex pattern| Requires a regex pattern to be defined. For example, if the user sets the Branch Regex as feature-\*, then users can trigger the build from branches such as feature-1450, feature-hot-fix, etc.. |
 | `Pull Request` (PR) | Triggers a CI build when a new pull request is created. You can also define filters (such as PR author, title, or branch) to control which pull requests trigger the pipeline. | Requires configuring a webhook configuration for GitHub or Bitbucket.|
 | `Tag Creation`| Triggers a build whenever a new tag is created. You can also define filters (such as author and tag name) to control which tags trigger the pipeline.| Requires webhook configuration for GitHub or Bitbucket.|
 
4. Click **Create Workflow**; a workflow with both build and deployment pipelines will be created.

     ![Figure 5: Clicking 'Create Workflow'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow/build-deploy-new-save-workflow.jpg)

5. If you want to configure advanced configurations in the build pipeline, such as Custom image tag pattern, Vulnerability Scanning, etc., refer to the [CI Pipeline](./ci-pipeline.md#configuring-advanced-options) page to learn more.

6. If you want to configure advanced configurations in the deployment pipeline, such as adding pre/post tasks, Custom image tag pattern, configure different deployment strategies, etc., refer to the [CD Pipeline](./cd-pipeline.md) page to learn more.

7. If you want, you can also add Pre/Post Tasks in both build and deployment pipelines. To do so, refer to the [Pre/Post tasks](./pre-post-tasks.md) page to learn more.

---

## Types of CI Pipelines

Apart from configuring advanced options, you can create five types of CI pipelines depending on your use case.

* [Build from Source Code](./ci-pipeline.md#id-1.-build-from-source-code): Choose this option if you want Devtron to build the image of the source code.

* [Linked Build Pipeline](./ci-pipeline.md#id-2.-linked-build-pipeline): Choose this option if you want to use an image created by an existing CI pipeline in Devtron.

* [Deploy Image from External Service](./ci-pipeline.md#id-3.-deploy-image-from-external-service): Choose this if you want to build your image outside Devtron; it will receive a Docker image from an external source via the incoming webhook.

* [Sync with Environment](./ci-pipeline.md#id-4.-sync-with-environment) [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

* [Create a Job](./ci-pipeline.md#id-5.-create-a-job)

![Figure 6: Selecting an Image Source](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow/workflow-ci.jpg)