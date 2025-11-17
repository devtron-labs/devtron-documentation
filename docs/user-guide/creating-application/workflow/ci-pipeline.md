# CI Pipeline

:::caution Who Can Perform This Action?
Users need to have the **Admin role**, the **Manager role**, or the **Super Admin role**.
Refer the [User permissions](../../global-configurations/authorization/user-access.md#roles-available-for-devtron-apps).
:::

A workflow can be created in one of the following ways:

* [Build from Source Code](#1-build-from-source-code)
* [Linked Build Pipeline](#2-linked-build-pipeline)
* [Deploy Image from External Service](#3-deploy-image-from-external-service)
* [Sync with Environment](#4-sync-with-environment-) <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>
* [Create a Job](#5-create-a-job)

Each method has different use-cases that can be tailored according to the needs of the organization.

---

## 1. Build from Source Code

**Build from Source Code** workflow allows you to build the container image from a source code repository.

:::info Note
Devtron typically uses a Dockerfile from your repository to build container images. If you don’t have one, Devtron provides default templates to help you get started. You can also build images without a Dockerfile using **Buildpacks**.
:::

### Creating a CI Pipeline

1. From the **Applications** page, select your application.

2. Go to **Configurations** tab and select **Workflow Editor**.

3. Click **+ New Workflow**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/new-workflow.jpg)
   <center>Figure 1: Creating New Workflow</center>

4. Select **Build from Source Code**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/workflow-ci-2.jpg)
   <center>Figure 2: 'Selecting Build from Source Code'</center>

5. In the **Create Build Pipeline** window, enter the following details:

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/create-build-pipeline.jpg)
   <center>Figure 3: Configuring build pipeline</center>

   | Field Name|Required/Optional| Description|
   | :--- | :--- | :--- |
   | `Pipeline Name`| Required (Auto-Assigned) | Devtron automatically assigns a unique name for the pipeline. If you wish, you can change it in [Advanced Options](#configuring-advanced-options)|
   | `Source type`| Required| Source type to trigger the CI. **Available options:** `Branch Fixed`, `Branch Regex`, `Pull Request`, `Tag Creation`|
   | `Branch Name`| Required| Branch that triggers the CI build|
   | `Advanced Options` | Optional| Create Pre-Build, Build, and Post-Build tasks <br/> Refer the [Configure Advanced options](#configuring-advanced-options) section to configure **Advanced options**. |

   ### Understanding Source Types

   Devtron allows you set up different source types for a build pipeline, source types specify the repository events that initiate a build pipeline, such as a change in a branch, pull request creation, or tag creation.
   
   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-deploy-source-type.jpg)
   <center>Figure 4: Source Types</center>
   
   |Source Type| Description| Additional Requirements|
   |:---|:---|:---|
   | `Branch Fixed`| Triggers a CI build whenever changes are pushed to a specified branch.| Requires a predefined branch name.|
   | `Branch Regex`| Allows dynamic branch selection based on a regex pattern| Requires a regex pattern to be defined. For example, if the user sets the Branch Regex as feature-\*, then users can trigger the build from branches such as feature-1450, feature-hot-fix, etc. |
   | `Pull Request` (PR) | Triggers a CI build when a new pull request is created. You can also define filters (such as PR author, title, or branch) to control which pull requests trigger the pipeline. | Requires [configuring a webhook](#configuring-webhook) for GitHub or Bitbucket.|
   | `Tag Creation`| Triggers a build whenever a new tag is created. You can also define filters (such as author and tag name) to control which tags trigger the pipeline.| [Configuring a webhook](#configuring-webhook) for GitHub or Bitbucket.|


   #### Pull Request Filters

   When using **Pull Request** as a source type, Devtron allows you to filter which PRs should trigger a build using the following filters

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-deploy-pull-request-filters.jpg)
   <center>Figure 5: Pull Request Filters</center>

   Select the appropriate filter and pass the matching condition as a regular expression (regex).

   :::info 
Devtron uses the regexp library, view [regexp cheatsheet](https://yourbasic.org/golang/regexp-cheat-sheet/). You can test your custom regex from [here](https://regex101.com/r/lHHuaE/1).
   :::

   | Filter Key      | Description                                                            |
   | :-------------- | :--------------------------------------------------------------------- |
   | `Author`        | Author of the PR                                                       |
   | `Source Branch` | The git branch from which the PR originates, e.g., `feature-login-auth`|
   | `Target Branch` | The git branch to which the PR is being merged, e.g., `main`           |
   | `Title`         | Title of the PR                                                        |
   | `State`         | Status of the PR (default is `open`)                                   |

   #### Tag Creation Filters

   When using **Tag Creation** as a source type, Devtron allows you to filter which tags should trigger a build based on the following filters

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-deploy-tag-creation-filters.jpg)
<center>Figure 6: Tag Creation Filters</center>

   Select the appropriate filter and pass the matching condition as a regular expression (regex).

   :::info 
Devtron uses the regexp library, view [regexp cheatsheet](https://yourbasic.org/golang/regexp-cheat-sheet/). You can test your custom regex from [here](https://regex101.com/r/lHHuaE/1).
   :::

   | Filter Key | Description              |
   | ---------- | ------------------------ |
   | `Author`   | User who created the tag |
   | `Tag Name` | Name of the tag          |

6. Click **Create Pipeline** to save the configuration. You can now proceed to trigger the build, or continue below to explore additional configuration options for customizing your pipeline.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-deploy-create-pipeline.jpg)
<center>Figure 7: Creating pipeline</center>

### Configuring Advanced Options

Devtron provides three stages in a CI pipeline: `Pre-Build`, `Build`, and `Post-Build`.

* **Pre-build stage**: The tasks in this stage are executed before the image is built.

* **Build stage**: In this stage, the build is triggered from the source code that you provide.

* **Post-build stage**: The tasks in this stage will be triggered once the build is complete.

This document focuses on configuring the Build Stage. If you want to set up Pre-Build and Post-Build stages, refer to the [Pre/Post Stages](./pre-post-tasks.md) to learn more.

### Build Stage

1. In **Create Build Pipeline** window, select **Advanced options**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/advanced-options.jpg)
   <center>Figure 8: Advanced Options</center>
 
2. Go to **Build stage** tab and configure the following fields: 

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-stage.jpg)
   <center>Figure 9: Build stage</center>


   | Field Name| Required/Optional | Description|
   | :---| :--- |:---|
   | `TRIGGER BUILD PIPELINE`| Required| <p>The build execution may be set to:</p><ul><li><code>Automatically</code>(default): Build is triggered automatically as the Git source code changes.</li><li><code>Manually</code>: Build is triggered manually.</li></ul>|
   | DOCKER LAYER CACHING | Optional | Use this to [enable/disable caching of docker image layers](#docker-layer-caching-) from your build pipeline |
   | `Pipeline Name`| Required| Devtron automatically assigns a unique name for the pipeline, if you wish, you can edit it here.|
   | `Scan for Vulnerabilities` | Optional| <p><strong>Prerequisite</strong>: Install either [Clair](../../integrations/vulnerability-scanning/clair.md) or [Trivy](../../integrations/vulnerability-scanning/trivy.md).</p><ul><li>In the **Build** Stage, enable the **Scan for vulnerabilities** toggle.</li><li>Refer: [Vulnerability Scanning](../../integrations/vulnerability-scanning/README.md) to learn more.</li></ul>|
   | `Override Options`| Optional| Allows overriding configurations from earlier stages like CRI configuration, target platform configuration, etc.|
   | `Docker build arguments`|Optional| <p>Override docker build configurations for this pipeline.</p><ul><li><strong>Key</strong>: Field name</li><li><strong>Value</strong>: Field value.</li></ul>|
   | `Custom Image Tag Pattern` | Optional| <p>Enable the Custom Image Tag Pattern toggle.</p><ul><li>Define an alphanumeric pattern (e.g., <code>test-v1.0.`{x}`</code>) where <code>`{x}`</code> auto-increments with each build.</li><li>Tags must not start or end with a period (.) or comma (,).</li><li>After configuration, trigger a build by navigating to **Build & Deploy**, selecting the Git commit by clicking on **Select Material**, and clicking **Start Build**.</li><li>The generated image tag will be available in **Build History**, Docker Registry, CD Pipeline (Image Selection)</li></ul> <p> Note: Build will fail if the resulting image tag has already been built in the past. This error might occur when you reset the value of the variable `x` or when you disable/enable the toggle button for **Custom image tag pattern**.</p>|

3. Click **Create Pipeline** to save the configuration.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-deploy-create-pipeline-2.jpg)
   <center>Figure 10: Create Pipeline</center>

#### Triggering a Build

Once the CI pipeline is set up, follow these steps to trigger a build:

1. Navigate to **Build & Deploy**.

2. Click **Select Material** in the specific pipeline for which you want to trigger the build.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-deploy-select-material.jpg)
   <center>Figure 11: Selecting Material</center>

3. Choose the **Git commit** to build under **Code Source** tab.
 
   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-deploy-git-commit.jpg)
   <center>Figure 12: Selecting Git Commit</center>


4. Configure runtime parameters (if any) before starting the build under the **Parameters** tab.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-deploy-runntime-parameters.jpg)
   <center>Figure 13: Configuring Runtime Parameters</center>

5. Click **Start Build**. This will trigger the build process and push the generated container image to the configured container registry for storage, versioning, and later use in the CD pipeline.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-deploy-start-build.jpg)
   <center>Figure 14: Starting Build</center>

---

## 2. Linked Build Pipeline

**Linked Build Pipeline** allows you to reuse build images from another pipeline within **Devtron**, instead of building images from source code each time.
 
This is useful when the same codebase is shared across multiple applications. 
 
Instead of creating and maintaining separate pipelines for each application, you can first set up a primary build pipeline (in the same application or in any other application) that builds the image from source code using **Build and Deploy from Source Code** or you can also use an existing pipeline from any application with the same codebase. 

Then, for other applications, you can simply link that source pipeline to reuse its build images directly in your workflow and proceed to create a CD pipeline using those images.

:::info 
The **Linked Build Pipeline** can only access build images that are generated after it has been created. Any images built by the source pipeline before the Linked Build Pipeline was set up will not be available.
:::

To create a **Linked Build Pipeline**, follow the steps below. 

:::caution Who Can Perform This Action?
Users need to have the **Admin role**, the **Manager role**, or the **Super Admin role**.
Refer the [User permissions](../../global-configurations/authorization/user-access.md#roles-available-for-devtron-apps).
:::

1. Navigate to **Configurations** (tab) → **Workflow Editor** of your application.

2. Select **+ New Workflow**, a modal window will appear where you can select the type of pipeline you want to create. 

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/linked-build-pipeline-new-workflow.jpg)
   <center>Figure 15: Creating New Workflow</center>

3. Select **Linked Build Pipeline**. Another modal window will appear where you can enter the details of the existing pipeline you want to link.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/linked-build-pipeline.jpg)
   <center>Figure 16: Selecting 'Linked Build Pipeline'</center>

4. Enter the details of the existing pipeline you want to link and click **Create Linked CI Pipeline** to create the pipeline.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/linked-build-pipeline-create-pipeline.jpg)
   <center>Figure 17: Entering details of existing pipeline</center>

   :::caution Note
   The user must have at least view access to the application that contains the source pipeline, otherwise, the application will not appear in the **Filter By Application** field.
   :::

   |Field Name|Description|
   |:---|:---|
   |Filter By Application|Enter the application name in which the source CI pipeline exists.|
   |Source CI pipeline|List all the build pipelines for the selected application. Choose the pipeline that you want to link|
   |Name|Enter the name for the **Linked Build Pipeline**. <br/><ul><li> By default, it takes the name of the source pipeline, if you wish, you can rename it.</li><li> In case the source pipeline exists within the same application, the **Linked Build Pipeline** name must be different from the source pipeline, as Devtron does not allow two pipelines with the same name within a single application.</li></ul>|

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/linked-build-pipeline-created.jpg)
   <center>Figure 18: Pipeline created</center>

   Thereafter, the source CI pipeline will indicate the number of Linked CI pipelines. On clicking it, a modal window will appear, which lists all the applications from which the source pipeline is linked, as shown in the image below.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/linkedci.gif)
   <center>Figure 19: Linked CI with Child Information</center>

5. After creating a **Linked CI Pipeline**, you can create a CD pipeline. Refer to [CD Pipeline](./cd-pipeline.md) page to know more.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/linked-build-pipeline-cd.jpg)
   <center>Figure 20: Creating CD pipeline</center>

:::caution Note
Linked CI pipelines can't trigger builds. They rely on the source CI pipeline to build images. Trigger a build in the source CI pipeline to see the images available for deployment in the linked CI pipeline's Deployment stage.
:::

---

## 3. Deploy Image from External Service

**Deploy Image from External Service** allows you to deploy container images built by external CI tools such as Jenkins, CircleCI, etc., using webhooks.

This is useful when your CI pipeline is managed outside the Devtron platform, allowing you to use Devtron exclusively for deploying container images on Kubernetes while maintaining your existing CI setup.

To create a pipeline form **Deploy Image from External Service**, follow the steps below

1. Navigate to **Configurations** (tab) → **Workflow Editor** of your application.

2. Select **+ New Workflow**, a modal window will appear where you can select the type of pipeline you want to create.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-new-workflow.jpg)
   <center>Figure 21: Creating New Workflow</center>

3. Select **Deploy Image from External Service**, another modal window will appear where you can enter deployment details such as environment, execution mode, and deployment strategy.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image.jpg)
   <center>Figure 22: Selecting 'Deploy Image from External Service'</center>

4. Enter the deployment details and click **Create Pipeline** to create the pipeline.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-create-pipeline.jpg)
   <center>Figure 23: Entering deployment details</center>

   | Fields | Description |
   | --- | --- |
   |**Environment**|Provide the name of the Environment in which you want to deploy your image.| 
   |**Namespace**|It will display the namespace of that Environment.|
   | **When do you want the pipeline to execute?** | You can deploy either in one of the following ways: <ul><li>`Automatic`: Pipeline triggers automatically when a new container image is received from the previous stage. Users can also trigger the pipeline manually.</li> <li>`Manual`: Users can trigger the pipeline manually.</li></ul>|
   | **Deployment Strategy** | Choose the [Deployment Strategy](./cd-pipeline.md#deployment-strategies) according to your preference. |

   To get the image from an external CI service (let's say Jenkins), you need to configure the Webhook provided by Devtron in your existing External CI pipeline.

### Configure Webhook in External CI

To configure the Webhook in External CI, follow the steps below.

1.  After creating the pipeline, select **Show webhook details** or select **External Source** stage to get the webhook URL and JSON sample payload to be used in the external CI pipeline.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-show-webhook.jpg)
   <center>Figure 24: Getting Webhook Details</center>

2. On the **Webhook Details** page, click **Select or auto-generate token with required permissions** to select or generate a `API token`. This token allows external CI services to authenticate with Devtron.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-select-auto-generate.jpg)
   <center>Figure 25: Clicking 'Select or auto-generate token with required permissions'</center>

   * To select an existing API token, choose an API token from the dropdown under **Select API token**.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-select-api-token.jpg)
   <center>Figure 26: Selecting existing API Token</center>

   * To generate an API token, select **Auto-generate token** sub tab → Enter a name for the token in the **Token Name** field → Click **Generate token** to generate a token.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-auto-generate-token.jpg)
   <center>Figure 27a: Generating API Token</center>

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-auto-generate-token-2.jpg)
   <center>Figure 27b: API Token Generated</center>

3. After generating an API token, click **Sample cURL request** and select the metadata you want to send to Devtron. Sample JSON and cURL request will be generated accordingly.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-select-metadata.jpg)
   <center>Figure 28: Getting sample cURL request and selecting metadata</center>

4. Copy the Sample cURL request and integrate it into your External CI (Jenkins) pipeline along with the API token and tag for Docker Image. Refer to [Integrate with External Sources](#integrate-with-external-sources---jenkins) to know more.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-copy-curl-cmd.jpg)
   <center>Figure 29: Copying Sample cURL request</center>

5. After integrating the webhook, whenever the external CI pipeline is triggered and generates an image, the webhook will automatically send the image details to Devtron for deployment.


### Integrate with External Sources - Jenkins

To integrate Webhook with your Jenkins project/pipeline, you need to add a new step/stage in your project/pipeline.

Before adding the stage/step, you need to add the API token provided by Devtron as the secret in Jenkins. To do so, follow the steps below:

1. Go to **Manage Jenkins** → **Credentials**.
 
   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-manage-jenkins.jpg)
   <center>Figure 30a: Selecting 'Manage Jenkins'</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-credentials.jpg)
   <center>Figure 30b: Selecting 'Credentials'</center>

2. Select **System** under **Stores scoped to Jenkins** → **Global credentials (unrestricted)** → **+Add Credentials**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-system.jpg)
   <center>Figure 31a: Selecting 'System' under 'Stores scoped to Jenkins'</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-global-cred.jpg)
   <center>Figure 31b: Selecting Global credentials (unrestricted)</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-add-cred.jpg)
   <center>Figure 31c: Selecting 'Add Credentials'</center>

3. Select `Secret text` in the **Kind** field and select the required **Scope**

4. Enter the **API Token** generated from Devtron in the **Secret** field.

5. Provide a `ID` (devtron-token) in the **ID** field. If left blank, Jenkins will automatically generate an ID for the credential.

6. If you want you can also provide an optional description in the **Description** field.

7. Select **Create** to create the secret in Jenkins.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-add-secret.jpg)
   <center>Figure 32a: Adding Credential</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-secret-added.jpg)
   <center>Figure 32b: Credential Added</center>

After adding the API token as a secret, add a new step/stage in your Jenkins project/pipeline.

In case your Jenkins project is of type `freestyle`, follow the steps below:

1. Select the Jenkins project in which you want to integrate the Webhook.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-select-project.jpg)
   <center>Figure 33: Selecting Jenkins Project</center>

2. Go to **Configure** → **Environments** and enable the **Use secret text(s) or file(s)** option.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-configure.jpg)
   <center>Figure 34: Selecting 'Configure'</center>

3. Click **Add** under **Bindings** and select **Secret Text**.

4. Provide a variable name (eg., `DEVTRON_TOKEN`) for the secret in **Variable** field. This variable name will be used to access the secret.

5. Select the credential's `ID` in **Specific credentials** under **Credentials**. 
 
   **Note:** In case you have provided a description for your credential, then instead of the credential `ID`, the description will be displayed.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-bindings.jpg)
   <center>Figure 35a: Binding Credential in the project</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-secret-binded.jpg)
   <center>Figure 35b: Credential Binding successful</center>

6. Go to **Configure** → **Build Steps**, click **Add build step**, and then select **Execute Shell**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-add-build-task.jpg)
   <center>Figure 36: Adding Build Step for Webhook</center>

7. Enter the cURL request command as shown below. Make sure to enter the `API token` and `dockerImage` in your cURL command and click **Save**.

   **Note:** API Token has been referenced from the secret via **Variable Name** (`DEVTRON_TOKEN`) configured in Jenkins credentials using its `ID`
 
   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-build-task-added.jpg)
   <center>Figure 37: Configuring Webhook Build Step</center>


In case your Jenkins project is of type `pipeline`, `Multibranch Pipeline`, etc., which uses a **Pipeline Script** or **Jenkinsfile**, then you need to add a new stage in the pipeline for configuring the webhook. To do so follow the steps below.

1. Select the Jenkins project in which you want to integrate the Webhook.
 
   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-select-project-2.jpg)
   <center>Figure 38: Selecting Jenkins Project</center>

2. Go to **Configure** → **Pipeline**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-configure-2.jpg)
   <center>Figure 39: Selecting 'Configure'</center>

3. In case you are using **Pipeline Script**, then modify the script to add a new stage as shown below. If you are using **Pipeline script from SCM**, then modify your Jenkinsfile in the same way.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-add-webhook-stage.jpg)
   <center>Figure 40: Adding Webhook pipeline stage</center>

4. Click **Save**.

The new images that will be built after adding the webhook will be available to Devtron for deployment.

Now, you can access the images on the Devtron dashboard and deploy manually. If you select the **Automatic** deployment option, your application deployment will trigger automatically when a new image is received.

### Integrate with External Sources - GitHub Actions

To integrate Webhook with your GitHub Actions workflow, you need to add a new step in your workflow file.

Before adding the step in the workflow, you need to add the API token provided by Devtron as a secret in your repository. To do so, follow the steps below

1. Navigate to **Settings** tab of your repository.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-settings.jpg)
   <center>Figure 41: Navigating to 'Settings'</center>

2. Select **Secrets and variables** → **Actions** under **Security**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-secrets.jpg)
   <center>Figure 42: Selecting 'Actions'</center>

3. Under **Secrets** tab, select **New repository secret**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-new-secret.jpg)
   <center>Figure 43: Selecting 'New repository secret'</center>

4. Enter a name for your secret in the **Name** field.

5. Enter the value of the secret in the **Secret** field.

6. Select **Add Secret** and the secret will be added to your repository.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-add-secret.jpg)
   <center>Figure 44a: Entering secret info</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-secret-added.jpg)
   <center>Figure 44b: Secret Added</center>

After adding the API token as a secret, add a new step in your GitHub Action workflow. To do so, follow the steps below:

1. Navigate to **Actions** tab of your repository. 

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-actions.jpg)
   <center>Figure 45: Navigating to Actions</center>

2. Select your workflow under the **All workflows** section.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-select-workflow.jpg)
   <center>Figure 46: Selecting workflow</center>

3. Click the workflow file (`main.yml`) under the workflow name, this will open the workflow file in GitHub.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-select-workflow-file.jpg)
   <center>Figure 47: Selecting 'Workflow File'</center>

4. Select the edit icon to add the webhook step in the workflow file.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-edit-icon.jpg)
   <center>Figure 48: Selecting 'Edit' Icon</center>

5. Add the webhook step in the workflow file and select **Commit changes...**

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-step-added.jpg)
   <center>Figure 49a: Adding Webhook Step</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-commit-changes.jpg)
   <center>Figure 49b: Committing Changes</center>

6. Provide a **Commit message** and an optional description.

7. Select **Commit changes**, and the workflow file will be updated with the webhook step.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-commit-changes-2.jpg)
   <center>Figure 50: Selecting 'Commit changes'</center>

The new images that will be built after adding the webhook will be available to Devtron for deployment.

Now, you can access the images on the Devtron dashboard and deploy manually. If you select the **Automatic** deployment option, your application deployment will trigger automatically when a new image is received.

---

## 4. Sync with Environment <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

**Sync with Environment** allows you to reuse the deployed container image from one CD workflow in another CD workflow within the same application. 

It is useful when you want to test a microservice (say, A) in a test environment, and it depends on another microservice (say, B). To ensure accurate testing of **Microservice (A)**, you need a stable version of **Microservice (B)** (the one that is already running in production). However, modifying the production pipeline for testing purposes is not ideal and often not allowed due to stability concerns.

In such cases, you can use **Sync with Environment** to create a new workflow that uses the deployed image from the existing CD pipeline (of microservice B) from a specific environment. This image then acts as the source CI for the new workflow within the same application.

This allows the new workflow to use the same image as the stable production environment, thus enabling consistent and reliable testing without impacting production workloads. 

To create a pipeline form **Sync with Environment**, follow the steps below

1. Navigate to **Configurations** (tab) → **Workflow Editor** of your application.

2. Select **+ New Workflow**, a modal window will appear where you can select the type of pipeline you want to create.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/sync-env-new-workflow.jpg)
   <center>Figure 51: Creating New Workflow</center>

3. Select **Sync with Environment**, another modal window will appear where you need to select the environment in which the source CD pipeline exists.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/sync-env.jpg)
   <center>Figure 52 : Selecting 'Sync with Environment'</center>

4. Select the environment in which the source CD pipeline exists. You can only select one source CD per workflow.

   **Note:** The CD pipeline used as a source cannot be deleted while it’s linked.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/sync-env-select-source-cd.jpg)
   <center>Figure 53: Selecting Source CD Environment</center>

5. Select **Deploy to** in the top right corner to select the environment in which you want to deploy the source CD image.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/sync-env-deploy-to.jpg)
   <center>Figure 54a: Selecting 'Deploy To'</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/sync-env-select-deploy-env.jpg)
   <center>Figure 54b: Selecting the Deployment Environment</center>

6. Select **Create Pipeline** to create a new workflow.

You can now configure the deployment pipeline, and if you wish, you can also add more deployment pipelines within the same workflow. 

---

## 5. Create a Job

If options like **Build and Deploy from Source Code** do not satisfy your use case, you can use **Create a Job** to define a workflow with a custom Build stage and with deployment capabilities.

In this workflow, the build stage is replaced by a Job stage, where you can either use [Preset Plugins](./pre-post-tasks.md#configure-a-task-using-preset-plugins) or define [custom tasks](./pre-post-tasks.md#execute-custom-task) to define custom steps to satisfy your use case. For e.g., you can use a preset plugin to pull the container images required for deployment from a container registry (such as ACR or ECR). 

This is useful when the image is built externally (for example, in Jenkins) and needs to be brought into Devtron for further processing and deployment. You can configure tasks like scanning, testing, or notifications using preset plugins either in the Job stage or the pre-CD stage, depending on your use case.

**Create a Job** differs from **Deploy Image from External Source** by allowing you to define custom tasks after the image is received, using Job tasks.

To create a workflow using **Create a job**, follow the steps below

1. Navigate to **Configurations** (tab) → **Workflow Editor** of your application.

2. Select **+ New Workflow**, a modal window will appear where you can select the type of pipeline you want to create.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/job-ci-new-workflow.jpg)
   <center>Figure 55: Creating New Workflow</center>

3. Select **Create a job**. This opens the **Create job pipeline** Window in which you can create and configure your job.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/job-ci.jpg)
   <center>Figure 56: Selecting 'Create a job'</center>

4. In the **Create job pipeline** window, you can create and configure job pipelines.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/job-ci-create-job-pipeline.jpg)
   <center>Figure 57: Create job pipeline</center>

It includes 2 stages 

* [**Basic Configurations**](#basic-configurations)  

* [**Tasks to be executed**](#tasks-to-be-executed)

### Basic Configurations

This stage allows you to define primary configurations such as Pipeline name, Source Type, Branch Name, and how the job should be triggered. Refer to the following table to configure each field.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/job-ci-basic-config.jpg)
<center>Figure 58: Configure Basic Configurations</center>

| Field Name|Description|
| :--- |:--- |
| `Trigger Job Pipeline` | <p>The job execution may be set to:</p><ul><li><code>Automatically</code>: Job execution is triggered automatically as the Git source code changes.</li><li><code>Manually</code>: Build is triggered manually.</li></ul>|
| `Pipeline Name` | Assign a name to your job pipeline|
| `Source type` | Source type to trigger the job pipeline. Available options: Branch Fixed, Branch Regex, Pull Request, Tag Creation|
| `Branch Name`| Branch that triggers the CI build|
| `Use remote cache`| <p>Enable this option to use the Docker cache from previous builds. Docker's layer caching mechanism allows unchanged docker images layers to be reused across pipeline runs, thus drastically reducing execution times<br/></p><div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>The globe toggle, next to <code>Docker Layer Caching</code> means that the configuration is inherited from global<br/></p><ul><li>Enabled: Inherits the caching settings defined globally.</li><li> Disabled: Allows you to define a pipeline-level configuration specific to this job.</li></ul></div> |

### Tasks to be executed

The Stage allows you to define tasks for your job.

You can create one or more tasks. Tasks can be dependent on each other for execution. In other words, the output variable of one task can be used as an input for the next task to execute your job. Tasks will execute in the order they are arranged and can be rearranged by drag-and-drop, however, the order of passing the variables must be followed.

To create a task:

1. Navigate to **Tasks to be executed** in the **Create job pipeline** window. 

2. Click **Add Task** to add a task in your job pipeline.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/job-ci-task-exec.jpg)
   <center>Figure 59: Add task</center>

3. A new task will be added (on the left side of the Create job pipeline window), you can configure the task either by selecting one of the available [preset plugins](#pulling-images-through-preset-plugin) or by [Executing a custom script](#create-task-using-custom-script)

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/job-ci-add-task.jpg)
   <center>Figure 60: Type of tasks</center>

#### Pulling Images through Preset Plugin

In Devtron, preset plugins are pre-defined tasks templates that helps you automate and execute common operations such as provisioning infrastructure, taking backups, exporting container images etc., without writing custom scripts.

Devtron provides a set of built-in preset plugins, and you can also create your own plugins in Devtron according to your specific needs.

To create a task using the **Pull Images from Container Repository** plugin, follow the steps below:

**Note:** **Pull Images from Container Repository** plugin only supports [ECR (Elastic Container Registry)](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html) and [ACR (Azure Container Registry)](https://learn.microsoft.com/en-us/azure/container-registry/). 

1. After configuring the basic configurations, select the **Tasks to be executed** Tab

2. Click **+Add Task** from the left side panel.

3. Search for `Pull Images from Container Repository` in the **Search Plugin** Search bar and select **Pull Images from Container Repository** from the list of plugins. 

   * The right-side panel will display the fields specific to the **Pull Images from Container Repository** plugin, which are required to be configured.

   * The left-side panel will now show a task under **Tasks (IN ORDER OF EXECUTION)**, named after the selected plugin(by default), along with its logo.<br/> You can change the task's name using the **Task name** field, but plugin's logo will remain indicating that it is a preset plugin.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/job-ci-pull-images.jpg)
   <center>Figure 61: Search 'Pull Images from Container Repository' plugin</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/job-ci-pull-images-added.jpg)
   <center>Figure 62: 'Pull Images from Container Repository' plugin</center>

4. Refer the [Pull Images from Container Repository](../../plugins/pull-images-from-container-repository.md) documentation to configure the **Pull Images from Container Repository** fields with appropriate values. You may explore [Plugins documentation](../../plugins/README.md) to configure any of the available plugins. 

5. After configuring the fields successfully, your task will be created. If you wish, you can add more tasks by clicking on **+ Add task** in the left-side panel.

#### Create Task using Custom Script

In the job stage, you can also define a task using a custom script to meet specific requirements. To create a task using a custom script, follow the steps below:

1. After configuring the basic configurations, select the **Tasks to be executed** Tab.

2. Click **+Add Task** from the left side panel, and then select **Execute custom task**.

   * The right-side panel will display the fields that are required to be configured in order to create the task.

   * The left-side panel will now display a task under **Tasks (IN ORDER OF EXECUTION)**.

3. Enter the Task name (required) and Task Description (optional).

4. Select the **Task type**, it can be `Shell` or `Container Image`.

   * **Shell Tasks**: These execute shell scripts directly within the job runtime environment. In this type of task, you can define inline scripts or use script files from your configured source code.

   * **Container Image Tasks**: These allow you to execute commands and scripts inside a custom Docker container. Instead of using the default environment provided by Devtron, you can specify you own container image with all dependencies and tools required for the tasks. 

 These Tasks run using container in container approach, which means the specified image is pulled and run inside the job pod, thus providing a complete isolated environment.

5. After selecting the **Task type**, you need to configure task-specific fields based on that **Task type**.

   <!-- Refer to [Create Task using Custom Script for Devtron Jobs]() to know more. -->

After configuring the **Basic Configurations** and adding the tasks, select **Create Pipeline** to create a new workflow with a job stage (instead of a build stage). 

Now, you can add a deployment pipeline to this workflow. The image will be pulled during the execution of the pipeline using the configured plugin, and then passed to the CD stage for deployment.

---

## Updating CI Pipeline

You can update the configurations of an existing CI Pipeline except for the pipeline's name.
To update a pipeline, 

1. Select your CI pipeline.

2. In the **Edit build pipeline** window, edit the required stages and select **Update Pipeline**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/update-pipeline.jpg)
   <center>Figure 63: Updating CI pipeline</center>

---

## Deleting CI Pipeline

Before deleting a CI pipeline, make sure that there is no CD pipeline attached to it in your workflow. In that case, you must first delete the CD pipeline, and only then you can delete a CI pipeline.

To delete a CI pipeline, follow the steps below.

1. Navigate to **Configurations** (tab) → **Workflow Editor** and click the pipeline you wish to delete.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/delete-pipeline-select-workflow.jpg)
   <center>Figure 64: Selecting Workflow to delete</center>


2. Click on the Deployment Stage, **Edit deployment pipeline** window will open and select **Delete Pipeline**. 

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/delete-pipeline-delete-cd.jpg)
   <center>Figure 65: Clicking 'Delete Pipeline'</center>

3. A pop-up will appear asking you to enter the environment name of the deployment. 

4. Enter the environment name and select **Delete**. The CD pipeline will be deleted. 

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/delete-pipeline-delete-cd-popup.jpg)
   <center>Figure 66: Deleting CD Pipeline</center>

 In case there are multiple CD pipelines in the workflow, then you need to delete them individually in a similar way.

5. After deleting all CD pipelines, click the Build stage, and the **Edit build pipeline** window will open. 

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/delete-pipeline-select-build.jpg)
   <center>Figure 67: Selecting build stage</center>

6. Select **Delete Pipeline** from the bottom left corner of the window button in the Build stage, a pop-up will appear prompting you to delete the CI pipeline.
 
   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/delete-pipeline-delete-CI.jpg)
   <center>Figure 68: Clicking 'Delete Pipeline'</center>

 In case your build pipeline is linked to another pipeline through **Linked Build Pipeline**, then you must first delete the linked pipeline in order to delete your pipeline.

7. Select **Delete** and the CI pipeline will be deleted along with its workflow.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/delete-pipeline-delete-ci-popup.jpg)
   <center>Figure 69: Deleting CI pipeline</center>

---

## Extras

### Changing Image Source

The **Change Image Source** feature in Devtron lets you update the container image source for an application’s workflow without modifying it.

1. In the **Configurations** tab of your application, hover over the intended workflow name and click **Change Image Source** icon.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/change-image-source-click.jpg)
   <center>Figure 70a: Clicking 'Change Image Source'</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/change-image-source-select-workflow.jpg)
   <center>Figure 70b: Selecting Workflow Template</center>

2. Select the intended workflow template and enter the details required as per the selected workflow template. Refer [Types of workflow templates](../workflow/README.md#types-of-ci-pipelines) to learn more.

### Docker Layer Caching <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

:::caution Prerequisite
[Configure blob storage](../../../setup/install/installation-configuration.md#configuration-of-blob-storage) if you wish to store cache.
:::

If you are rebuilding the same Docker image frequently, an effective cache strategy can cut down build time. Docker images are built layer by layer, and [Docker’s layer caching mechanism](https://docs.docker.com/build/cache/) allows unchanged layers to be reused across pipeline runs.

You can disable caching if:
* It’s not relevant to your workflow
* It consumes unnecessary storage
* The pipeline doesn’t perform an actual Docker build

:::info Which cache gets impacted? 
If a PVC with cache is attached, it will not be impacted by disabling cache. Only the remote cache is disabled.
:::

There are 3 places from where you can control the cache behavior:

* [Orchestrator ConfigMap (Global Settings)](#1-orchestrator-configmap-global-settings)

* [Editing Pipeline](#2-editing-pipeline)

* [During Trigger](#3-during-trigger)

#### 1. Orchestrator ConfigMap (Global Settings)

Super-admins can define the cache settings in `orchestrator-cm` globally for all applications and jobs using the following flags:

``` shell
DEFAULT_CACHE_FOR_CI_BUILD # for main application build stage 
DEFAULT_CACHE_FOR_CI_JOB # for CI jobs
DEFAULT_CACHE_FOR_JOB # for general jobs
DEFAULT_CACHE_FOR_CD_PRE # for pre-deployment stage 
DEFAULT_CACHE_FOR_CD_POST # for post-deployment stage
```

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/orchestrator-cm.jpg)
<center>Figure 71: Cache behavior at Global-level</center>

#### 2. Editing Pipeline

Go to **Workflow Editor** → **Edit Build Pipeline** (Build Stage) → **Docker Layer Caching** (toggle)  → **Use remote cache** (checkbox)

By default, your build pipeline will inherit the Global Settings. However, you can use the toggle button to override it and decide the caching behavior using the **Use remote cache** checkbox. In other words, cache behavior defined in the pipeline configuration will have higher priority than the global one.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/inherit-global.gif)
<center>Figure 72: Cache behavior at Pipeline-level</center>

#### 3. During Trigger

Go to **Build & Deploy** (tab) → **Select Material** → **Ignore Cache** (checkbox)

You have the option to ignore cache while triggering a build (regardless of the cache settings defined at the pipeline or global level).

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/ignore-cache.gif)
<center>Figure 73: Cache behavior at Trigger</center>

:::caution Note
If the caching flags in **Global Settings** are set to false, ignoring cache becomes the default behavior even if you don't select the 'Ignore Cache' checkbox during trigger.
:::

###  Override Build Configuration

**Override Options** in **Build Stage** lets you override **Build Configurations** for each workflow of the same application. You can configure overrides in the build stage of each workflow.

For example, you might want to push development or testing builds to a separate registry from production builds, but in **Build Configurations** you have configured the production container registry to push build images. This means for all the workflows (testing or production), build images will be pushed to the production container registry by default. 

To override this Build configuration for the specific workflow (testing workflow), you can use **Override Options** in the **Build Stage** of that workflow that lets you specify different container registries, how to build container images, and target platforms for different workflows of the same application. This means the images built for testing environment can be included to the testing registry and the images for production environment can be included to the production registry. This helps keep environments isolated, improves deployment safety, and makes managing multiple environments easier.

#### Creating Build Configuration Override

To override a container registry, container image, or target platform:

1. Go to **Applications** and select your application from the **Devtron Apps** tabs.

2. On the **App Configuration** tab, select **Workflow Editor**.

3. Select the build pipeline of your application.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/select-build-override.jpg)
   <center>Figure 74: Selecting Build Pipeline</center>

4. Click **Allow Override** in the **Build Stage**:

   * Select the new container registry from the drop-down list.

   * [Create and build the new container image](../../creating-application/docker-build-configuration.md#build-the-container-image) with different options.

   * Set a [new target platform](../../creating-application/docker-build-configuration.md#set-target-platform-for-the-build) from the drop-down list or enter a new target platform.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-allow-override.jpg)
   <center>Figure 75: Selecting Allow Override</center>

5. Select **Update Pipeline**, The override will be effective when the next build is triggered.

The overridden container registry/container image location/target platform will be reflected on the [Build Configuration](../../creating-application/docker-build-configuration.md) page. You can also see the number of build pipelines for which the container registry/container image location/target platform are overridden.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/build-configuration-overridden.jpg)
   <center>Figure 76: Overrides in Build Configuration</center>

### Configuring Webhook

:::info 
If you choose **Pull Request** or **Tag Creation** as the **Source Type**, you must first configure the Webhook for GitHub/Bitbucket as a prerequisite step.
:::

#### For GitHub

1. Go to **Settings** → **Webhooks** of your repository.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/deploy-image-ga-settings.jpg)
   <center>Figure 77a: Navigating to Repository Settings</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-github-webhooks.jpg)
   <center>Figure 77b: Selecting 'Webhooks'</center>

2. Select **Add webhook**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-github-add-webhook.jpg)
   <center>Figure 78: Selecting 'Add webhook'</center>

3. In the **Payload URL** field, enter the Webhook URL that you get on selecting the source type as "Pull Request" or "Tag Creation" in Devtron the dashboard.

4. Select the Content-type as `application/json`.

5. In the **Secret** field, enter the secret from Devtron the dashboard when you select the source type as "Pull Request" or "Tag Creation".

6. Under **Which events would you like to trigger this webhook?**, select **Let me select individual events** to trigger the webhook for specific events.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-github-enter-info.jpg)
   <center>Figure 79: Configuring Webhook</center>

7. Select the appropriate triggers

   * For Pull Requests, select **Pull Requests**.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-github-pull.jpg)
   <center>Figure 80: Selecting 'Pull Requests'</center>

   * For Tag Creation, select **Branch or tag creation**.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-github-branch.jpg)
   <center>Figure 81: Selecting 'Branch or tag creation'</center>

8. Select **Add webhook**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-github-webhook-added.jpg)
   <center>Figure 82: Selecting 'Add webhook'</center>

#### For GitLab 

1. Navigate to **Setting** → **Webhooks** of your repository. 

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-gitlab-settings-webhook.jpg)
   <center>Figure 83: Navigating to Repository Settings</center>

2. Select **Add new webhook**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-gitlab-add-new-webhook.jpg)
   <center>Figure 84: Selecting 'Add new webhook'</center>

3. You can provide a name and description (optional).

4. In the **URL** field, enter the Webhook URL that you get on selecting the source type as "Pull Request" or "Tag Creation" in the Devtron dashboard.

5.  In the **Secret token** field, enter the secret from the Devtron dashboard when you select the source type as "Pull Request" or "Tag Creation".

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-gitlab-enter-info.jpg)
   <center>Figure 85: Configuring Webhook</center>

6. Checkmark the appropriate triggers under the **Trigger** section.

   * For Pull Requests, select **Merge request events**.

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-gitlab-merge.jpg)
   <center>Figure 86: Selecting 'Merge request events'</center>

   * For Tag Creation, select **Tag push events**

      ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-gitlab-tag.jpg)
   <center>Figure 87: Selecting 'Tag push events'</center>

7. Select **Add Webhook** and the webhook will be added to your repository.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-gitlab-webhook-added.jpg)
   <center>Figure 88:Selecting 'Add Webhook'</center>

#### For Bitbucket Cloud

1. Navigate to the **Repository settings** page of your Bitbucket repository.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-bitbucket-settings.jpg)
   <center>Figure 89: Navigating to Repository Settings</center>

2. Select **Webhooks** under **Workflow** section and then select **Add webhook**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-bitbucket-webhook.jpg)
   <center>Figure 90a: Selecting 'Webhooks'</center>

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-bitbucket-add-webhook.jpg)
   <center>Figure 90b: Selecting 'Add webhook'</center>

3. Enter a **Title** for the webhook.

4. In the **URL** field, enter the Webhook URL that you get on selecting the source type as "Pull Request" or "Tag Creation" in the Devtron dashboard.

5. In the **Secret** field, enter the secret from the Devtron dashboard when you select the source type as "Pull Request" or "Tag Creation".

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-bitbucket-enter-info.jpg)
   <center>Figure 91: Configuring Webhook</center>

6. Select the event triggers for which you want to trigger the webhook under the **Triggers** section.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-bitbucket-trigger.jpg)
   <center>Figure 92: Selecting triggers</center>

7. Select **Save** to save your configurations.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/ci-pipeline/webhooks-bitbucket-save.jpg)
   <center>Figure 93: Saving Configurations</center>

