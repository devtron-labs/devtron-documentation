# CI Pipeline

{% hint style="info" %}
For Devtron version older than v0.4.0, please refer the [CI Pipeline (legacy)](https://docs.devtron.ai/v/v0.4/devtron/user-guide/creating-application/workflow/ci-pipeline-legacy) page.
{% endhint %}

## Creating CI Pipeline

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have **Admin role**, **Manager role**, or **Super Admin role**.
Refer the [User permissions](../../global-configurations/authorization/user-access.md#roles-available-for-devtron-apps).
{% endhint %}

A CI Workflow can be created in one of the following ways:

* [Build and Deploy from Source Code](#id-1.-build-and-deploy-from-source-code)
* [Linked Build Pipeline](#id-2.-linked-build-pipeline)
* [Deploy Image from External Service](#id-3.-deploy-image-from-external-service)
* Sync with Environment <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" height="12"></a>
* Create a Job

Each method has different use-cases that can be tailored according the needs of the organization.

---

## 1. Build and Deploy from Source Code

**Build and Deploy from Source Code** workflow allows you to build the container image from a source code repository.

{% hint style="info" %}
Devtron typically uses a Dockerfile from your repository to build container images. If you don’t have one, Devtron provides default templates to help you get started. You can also build images without a Dockerfile using Buildpacks.
{% endhint %}

### Creating a CI Pipeline

1. From the Applications menu, select your application.

2. Go to the **Configurations** page and select **Workflow Editor**.

3. Click **+ New Workflow**.

 ![Figure 1a: Create New Workflow](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/workflow-ci-1.jpg)

4. Select **Build and Deploy from Source Code**.

 ![Figure 1b: 'Select Build and Deploy from Source Code'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/workflow-ci-2.jpg)

5. In the **Create Build Pipeline** window, enter the following details:

 ![Figure 1c: Configure build pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/ci-pipeline-v1.jpg)

 | Field Name|Required/Optional| Description|
 | :--- | :--- | :--- |
 | `Pipeline Name`| Required (Auto-Assigned) | Devtron automatically assigns a unique name for the pipeline, if you wish, you can change it in Advanced Options|
 | `Source type`| Required| Source type to trigger the CI. Available options: Branch Fixed, Branch Regex, Pull Request, Tag Creation|
 | `Branch Name`| Required| Branch that triggers the CI build|
 | `Advanced Options` | Optional| Create Pre-Build, Build, and Post-Build tasks <br> Refer the [Configure Advanced options](#configuring-advanced-options) section to configure **Advanced options**. |

 ### Understanding Source Types

 Devtron provides multiple ways to trigger a build pipeline:
 
 ![Figure 1d: Source Types](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-deploy-source-type.jpg)
 
 |Source Type| Description| Additional Requirements|
 |:---|:---|:---|
 | `Branch Fixed`| Triggers a CI build whenever changes are pushed to a specified branch.| Requires a predefined branch name.|
 | `Branch Regex`| Allows dynamic branch selection based on a regex pattern| Requires a regex pattern to be defined. For example if the user sets the Branch Regex as feature-\*, then users can trigger the build from branches such as feature-1450, feature-hot-fix etc. |
 | `Pull Request` (PR) | Triggers a CI build when a new pull request is created. You can also define filters (such as PR author, title, or branch) to control which pull requests trigger the pipeline. | Requires configuring a webhook configuration for GitHub or Bitbucket.|
 | `Tag Creation`| Triggers a build whenever a new tag is created. You can also define filters (such as author and tag name) to control which tags trigger the pipeline.| Requires webhook configuration for GitHub or Bitbucket.|


 #### Pull Request Filters

 When using Pull Request as a source type, Devtron allows you to filter which PRs should trigger a build using the following filters

 ![Figure 1e: Pull Request Filters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-deploy-pull-request-filters.jpg)

 Select the appropriate filter and pass the matching condition as a regular expression (`regex`).

 {% hint style="info" %}
 Devtron uses regexp library, view [regexp cheatsheet](https://yourbasic.org/golang/regexp-cheat-sheet/). You can test your custom regex from [here](https://regex101.com/r/lHHuaE/1).
 {% endhint %}

 | Filter Key      | Description                                |
 | --------------- | ------------------------------------------ |
 | `Author`        | Author of the PR                           |
 | `Source Branch` | The branch from which the PR originates    |
 | `Target Branch` | The branch to which the PR is being merged |
 | `Title`         | Title of the PR                            |
 | `State`         | Status of the PR (default is `open`)       |

 #### Tag Creation Filters

 When using Tag Creation as a source type, Devtron allows you to filter which tags should trigger a build based on the following filters

 ![Figure 1f: Tag Creation Filters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-deploy-tag-creation-filters.jpg)

 Select the appropriate filter and pass the matching condition as a regular expression (`regex`).

 {% hint style="info" %}
 Devtron uses regexp library, view [regexp cheatsheet](https://yourbasic.org/golang/regexp-cheat-sheet/). You can test your custom regex from [here](https://regex101.com/r/lHHuaE/1).
 {% endhint %}

 | Filter Key | Description              |
 | ---------- | ------------------------ |
 | `Author`   | User who created the tag |
 | `Tag Name` | Name of the tag          |

6. Click **Create Pipeline** to save the configuration. You can now proceed to trigger the build , or continue below to explore additional configuration options for customizing your pipeline.

 ![Figure 1g: Create pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-deploy-create-pipeline.jpg)

### Configuring Advanced Options

Devtron provides three stages in a CI pipeline: `Pre-Build`, `Build`, and `Post-Build`.

`Pre-build stage`: The tasks in this stage are executed before the image is built.

`Build stage`: In this stage, the build is triggered from the source code that you provide.

`Post-build stage`: The tasks in this stage will be triggered once the build is complete.

This document focuses on configuring the Build Stage. If you want to set up Pre-Build and Post-Build stages, refer the [Pre-Build/Post-build Stages Configuration](https://docs.devtron.ai/usage/applications/creating-application/workflow/ci-pipeline/ci-build-pre-post-plugins).

### Build Stage

1. In **Create Build Pipeline** window, select **Advanced options**.

 ![Figure 2a: Advanced Options](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/advanced-options.jpg)
 
2. Go to the **Build stage** tab and configure the following fields: 

 ![Figure 2b: Build stage](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-stage-v2.jpg)


 | Field Name| Required/Optional | Description|
 | :---| :--- |:---|
 | `TRIGGER BUILD PIPELINE`| Required| <p>The build execution may be set to:</p><ul><li><code>Automatically</code>(default): Build is triggered automatically as the Git source code changes.</li><li><code>Manually</code>: Build is triggered manually.</li></ul>|
 | DOCKER LAYER CACHING | Optional | Use this to [enable/disable caching of docker image layers](#docker-layer-caching) from your build pipeline |
 | `Pipeline Name`| Required| Devtron automatically assigns a unique name for the pipeline, if you wish you can edit it here.|
 | `Scan for Vulnerabilities` | Optional| <p><strong>Prerequisite</strong>: Install either Clair or Trivy.</p><ul><li>In the <code>Build</code> Stage, enable the <code>Scan for vulnerabilities</code> toggle.</li><li>Refer: Security Features</li></ul>|
 | `Override Options`| Optional| Allows overriding configurations from earlier stages like CRI configuration, target platform configuration etc.|
 | `Docker build arguments`|Optional| <p>Override docker build configurations for this pipeline.</p><ul><li><strong>Key</strong>: Field name</li><li><strong>Value</strong>: Field value.</li></ul>|
 | `Custom Image Tag Pattern` | Optional| <p>Enable the Custom Image Tag Pattern toggle.</p><ul><li>Define an alphanumeric pattern (e.g., <code>test-v1.0.{x}</code>) where <code>{x}</code> auto-increments with each build.</li><li>Tags must not start or end with a period (.) or comma (,).</li><li>After configuration, trigger a build by navigating to <code>Build &#x26; Deploy</code>, selecting the Git commit by clicking on <code>Select Material</code>, and clicking <code>Start Build</code>.</li><li>The generated image tag will be available in <code>Build History</code>, Docker Registry, CD Pipeline (Image Selection)</li></ul> <p> **Build will fail if the resulting image tag has already been built in the past. This error might occur when you reset the value of the variable `x` or when you disable/enable the toggle button for `Custom image tag pattern`**.</p>|

 ### Docker Layer Caching [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

 {% hint style="warning" %}
 ### Prerequisite
 [Configure blob storage](https://docs.devtron.ai/configurations-overview/installation-configuration#configuration-of-blob-storage) if you wish to store cache.
 {% endhint %}

 If you are rebuilding the same Docker image frequently, an effective cache strategy can cut down build time. Docker images are built layer by layer and [Docker’s layer caching mechanism](https://docs.docker.com/build/cache/) allows unchanged layers to be reused across pipeline runs.

 You can disable caching if:
 * It’s not relevant to your workflow
 * It consumes unnecessary storage
 * The pipeline doesn’t perform an actual Docker build

 {% hint style="info" %}
 ### Which cache gets impacted? 
 If a PVC with cache is attached, it will not be impacted by disabling cache. Only the remote cache is disabled.
 {% endhint %}

 There are 3 places from where you can control the cache behavior:
 1. [Orchestrator ConfigMap (Global Settings)](#orchestrator-configmap-global-settings)
 2. [Editing Pipeline](#editing-pipeline)
 3. [During Trigger](#during-trigger)

 #### 1. Orchestrator ConfigMap (Global Settings)

 Super-admins can define the cache settings in `orchestrator-cm` globally for all applications and jobs using the following flags:

 ``` shell
 DEFAULT_CACHE_FOR_CI_BUILD # for main application build stage 
 DEFAULT_CACHE_FOR_CI_JOB # for CI jobs
 DEFAULT_CACHE_FOR_JOB # for general jobs
 DEFAULT_CACHE_FOR_CD_PRE # for pre-deployment stage 
 DEFAULT_CACHE_FOR_CD_POST # for post-deployment stage
 ```

 ![Figure 2d: Cache behavior at Global-level](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/orchestrator-cm.jpg)

 #### 2. Editing Pipeline

 Go to **Workflow Editor** → **Edit Build Pipeline** (Build Stage) → **Docker Layer Caching** (toggle)  → **Use remote cache** (checkbox)

 By default, your build pipeline will inherit the Global Settings. However, you can use the toggle button to override it and decide the caching behavior using the **Use remote cache** checkbox. In other words, cache behavior defined in pipeline configuration will have higher priority than the global one.

 ![Figure 2e: Cache behavior at Pipeline-level](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/inherit-global.gif)

 #### 3. During Trigger

 Go to **Build & Deploy** (tab) → **Select Material** → **Ignore Cache** (checkbox)

 You have the option to ignore cache while triggering a build (regardless of the cache settings defined at the pipeline or global level).

 ![Figure 2f: Cache behavior at Trigger](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/ignore-cache.gif)

 {% hint style="warning" %}
 ### Note
 If the caching flags in **Global Settings** are set to false, ignoring cache becomes the default behavior even if you don't select the 'Ignore Cache' checkbox during trigger.
 {% endhint %}

3. Click **Create Pipeline** to save the configuration.

 ![Figure 2g: Create Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-deploy-create-pipeline.jpg)

#### Triggering a Build

Once the CI pipeline is set up, follow these steps to trigger a build:

1. Navigate to **Build & Deploy**.

2. Click **Select Material** in the specific pipeline for which you want to trigger the build.

 ![Figure 3a: Select Material](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-deploy-select-material.jpg)

3. Choose the **Git commit** to build under **Code Source** tab.
 
 ![Figure 3b: Select Git Commit](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-deploy-git-comit.jpg)


4. Configure runtime parameters (if any) before starting the build under **Parameters** tab.

 ![Figure 3c: Configure Runtime Parameters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-deploy-runntime-parameters.jpg)

5. Click **Start Build**. This will trigger the build process and push the generated container image to the configured container registry for storage, versioning, and later use in the CD pipeline.

 ![Figure 3d: Start Build](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/build-deploy-start-build.jpg)

## 2. Linked Build Pipeline

**Linked Build Pipeline** allows you to reuse build images from another pipeline within **Devtron**, instead of building images from source code each time.
 
This is useful when the same codebase is shared across multiple applications. 
 
Instead of creating and maintaining separate pipelines for each application, you can first set-up a primary build pipeline (in the same application or in any other application) that builds the image from source code using **Build and Deploy from Source Code** or you can also use an existing pipeline from any application with the same codebase. 

Then for other applications you can simply link that source pipeline to reuse its build images directly in your workflow and proceed to create a CD pipeline using those images.

{% hint style="info" %}
The **Linked Build Pipeline** can only access build images that are generated after it has been created. Any images built by the source pipeline before the Linked Build Pipeline was set up will not be available.
{% endhint %}

To create a **Linked Build Pipeline** follow the below steps. 

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have **Admin role**, **Manager role**, or **Super Admin role**.
Refer the [User permissions](../../global-configurations/authorization/user-access.md#roles-available-for-devtron-apps).
{% endhint %}

1. Navigate to **Configurations** → **Workflow Editor** of your application.

2. Select **+ New Workflow**; a modal window will appear where you can select the type of pipeline you want to create. 

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/linked-build-pipeline-new-workflow.jpg)

3. Select **Linked Build Pipeline**. another modal window will appear where you can enter the details of the existing pipeline you want to link.

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/linked-build-pipeline.jpg)

4. Enter the details of the existing pipeline you want to link and click **Create Linked CI Pipeline** to create the pipeline.

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/linked-build-pipeline-create-pipeline.jpg)

 {% hint style="warning" %}
 User must have at least view access of the application that contains the source pipeline; otherwise, the application will not appear in the **Filter By Application** field.
 {% endhint %}

 |Field Name|Description|
 |:---|:---|
 |Filter By Application|Enter the application name in which the source CI pipeline exists.|
 |Source CI pipeline|List all the build pipelines for the selected application. Choose the pipeline which you want to link|
 |Name|Enter the name for the **Linked Build Pipeline**.<br><ul><li>By default, it takes the name of the source pipeline, if you wish, you can rename it.</li><li>In case the source pipeline exists within the same application, the **Linked Build Pipeline** name must be different from the source pipeline, as Devtron does not allow two pipelines with the same name within a single application.</li></ul>|

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/linked-build-pipeline-created.jpg)

 Thereafter, the source CI pipeline will indicate the number of Linked CI pipelines. On clicking it, a modal window will appear, which lists all the applications and the environments they are deployed, where this source build pipeline is being reused through **Linked Build Pipelines** as shown below.

 ![Linked CI with Child Information](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/linkedci.gif)

5. After creating a **Linked CI Pipeline**, you can create a CD pipeline. Refer [CD Pipeline](./cd-pipeline.md) page to know more.

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/linked-build-pipeline-cd.jpg)

{% hint style="warning" %}
Linked CI pipelines can't trigger builds. They rely on the source CI pipeline to build images. Trigger a build in the source CI pipeline to see the images available for deployment in the linked CI pipeline's CD stage.
{% endhint %}


## 3. Deploy Image from External Service

**Deploy Image from External Service** allows you to deploy container images built by external CI tools such as Jenkins, CircleCI, etc. using webhooks.

This is useful when your CI pipeline is managed outside the Devtron platform, allowing you to use Devtron exclusively for deploying container images on Kubernetes while maintaining your existing CI setup.

To create a pipeline form **Deploy Image from External Service**, follow the below steps

1. Navigate to **Configurations** → **Workflow Editor** of your application.

2. Select **+ New Workflow**; a modal window will appear where you can select the type of pipeline you want to create.

3. Select **Deploy Image from External Service**, another modal window will appear where you can enter deployment details such as environment, execution mode, and deployment strategy.

  ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/deploy-image-from-external-source.jpg)

4. Enter the deployment details and click **Create Pipeline** to create the pipeline.

 | Fields | Description |
 | --- | --- |
 |**Environment**|Provide the name of the Environment in which you want to deploy your image.| 
 |**Namespace**|It will display the namespace of that Environment.|
 | **When do you want the pipeline to execute?** | You can deploy either in one of the following ways: <ul><li>`Automatic`: Pipeline triggers automatically when a new container image is received from the previous stage. Users can also trigger the pipeline manually.</ul></li> <ul><li>`Manual`: Users can trigger the pipeline manually.</ul></li>|
 | **Deployment Strategy** | Choose the Deployment Strategy according to you preference. |

To get the image from a external CI service (let's say Jenkins), you need to configure the Webhook provided by Devtron in your existing External CI pipeline.

### Configure Webhook in External CI

To configure the Webhook in External CI, follow the below steps.

1.  After creating the pipeline, select **Show webhook details** to get the webhook URL and JSON sample payload to be used in external CI pipeline.

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/webhook-ci/show-webhook-details-v2.jpg)

2. On the **Webhook Details** page, click **Select or auto-generate token with required permissions** to select or generate an `API token`. This token allows external CI services to authenticate with Devtron.

 * To select an existing API token, choose an API token from the dropdown under **Select API token**.

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/webhook-ci/select-api-token-webhook-details-v2.jpg)

 * To generate an API token, select **Auto-generate token** sub tab → Enter a name for the token in **Token Name** field → Click **Generate token** to generate a token.

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/webhook-ci/auto-generate-token-webhook-details-v2.jpg)

3. After generating an API token, click **Sample cURL request** and select the metadata you want to send to Devtron. Sample JSON and cURL request will be generated accordingly.

 <!-- image -->

4. Copy the Sample cURL request and integrate it into your External CI (jenkins) pipeline along with the API token and tag for Docker Image. Refer [Integrate with External Sources](#integrate-with-external-sources---jenkins) to know more.

<!--  -->

5. After integrating the webhook, whenever the external CI pipeline is triggered and generates an image, the webhook will automatically send the image details to Devtron for deployment.


#### Integrate with External Sources - Jenkins

To integrate Webhook with your jenkins project/pipeline, you need to add a new step/stage in your project/pipeline.

Before adding the stage/step, you need to add the API token provided by Devtron as the secret in Jenkins. To do so follow the below steps.

1. Go to **Manage Jenkins** → **Credentials**.

2. Select **System** under **Stores scoped to Jenkins** → **Global credentials (unrestricted)** → **+Add Credentials**.

3. Select `Secret text` in the **Kind** field and select the required **Scope**

4. Enter the **API Token** generated from Devtron in the **Secret** field.

5. Provide an `ID` (devtron-token) in the **ID** field. If left blank, Jenkins will automatically generate an ID for the credential.

6. If you want you can also provide an optional description in the **Description** field.

7. Select **Create** to create the secret in Jenkins.

After adding the API token as secret, add a new step/stage in your Jenkins project/pipeline.

In case your Jenkins project is of type `freestyle`, follow the below steps:

1. Select the Jenkins project in which you want to integrate the Webhook.

2. Go to the **Configure** → **Environments** and enable the **Use secret text(s) or file(s)** option.

3. Click **Add** under **Bindings** and select **Secret Text**.

4. Provide a variable name (eg., `DEVTRON_TOKEN`) for the secret in **Variable** field. This variable name will be used to access the secret.

5. Select the credential's `ID` in **Specific credentials** under **Credentials**. 
 
     **Note:** In case you have provided a description for your credential, then instead of credential `ID`, description will be displayed.

6. Go to the **Configure** → **Build Steps**, click **Add build step**, and then select **Execute Shell**.

 ![]()

7. Enter the cURL request command as shown below. Make sure to enter the `API token` and `dockerImage` in your cURL command and click **Save**.

    Note: API Token has been referenced from the secret via **Variable Name** (`DEVTRON_TOKEN`) configured in Jenkins credentials using its `ID`
 
 ![]()


In case your Jenkins project is of type `pipeline`, `Multibranch Pipeline`, etc., which uses a **Pipeline Script** or **Jenkinsfile**, then you need to add a new stage in the pipeline for configuring the webhook. To do so follow the steps below.

1. Select the Jenkins project in which you want to integrate the Webhook.

2. Go to the **Configure** → **Pipeline**.

3. In case you are using **Pipeline Script**, then modify the script to add a new stage as shown below. If you are using **Pipeline script from SCM** then modify your Jenkinsfile in the same way.

<!-- image -->

4. Click **Save**

Now, you can access the images on the Devtron dashboard and deploy manually. In case, if you select **Automatic** deployment option, then your application will be deployed automatically everytime a new image is received.

---

## Sync with Environment

**Sync with Environment** allows you to reuse the deployed container image from one CD workflow in another CD workflow within the same application. 

It is useful when you want to test a microservice (say, A) in an test environment and it depends on another microservice (say, B). To ensure accurate testing of **Microservice (A)**, you need a stable version of **Microservice (B)** (the one which is already running in production). However modifying the production pipeline for testing purposes is not ideal and often not allowed due to stability concerns.

In such cases, you can use **Sync with Environment** to create a new workflow that uses the deployed image from the existing CD pipeline (of microservice B) from a specific environment. This image then acts as the source CI for the new workflow within the same application.

This allows the new workflow to use same image as the stable production environment; Thus enabling consistent and reliable testing without impacting production workloads. 

To create a pipeline form **Sync with Environment**, follow the below steps

1. Navigate to **Configurations** → **Workflow Editor** of your application.

2. Select **+ New Workflow**; a modal window will appear where you can select the type of pipeline you want to create.

3. Select **Sync with Environment**, another modal window will appear where you need to select the environment in which the source CD pipeline exists.

4. Select the environment in which the source CD pipeline exists.

5. Select **Deploy to** in the top right corner to select the environment in which you want to deploy the source CD image.

6. Select **Create Pipeline** and a deployment pipeline is created.

You can now configure the deployment pipeline and if you wish you can also add more deployment pipelines within the same workflow.   
---

## Updating CI Pipeline

You can update the configurations of an existing CI Pipeline except for the pipeline's name.
To update a pipeline, select your CI pipeline.
In the **Edit build pipeline** window, edit the required stages and select **Update Pipeline**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/update-pipeline.jpg)

---

## Deleting CI Pipeline

You can only delete a CI pipeline if there is no CD pipeline created in your workflow.

To delete a CI pipeline, go to **App Configurations > Workflow Editor** and select **Delete Pipeline**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/delete-pipeline.jpg)
---

## Extras

### Configuring Webhook

{% hint style="info" %}
If you choose [Pull Request](#pull-request) or [Tag Creation](#tag-creation) as the [source type](#source-type), you must first configure the Webhook for GitHub/Bitbucket as a prerequisite step.
{% endhint %}

#### For GitHub

1. Go to the **Settings** page of your repository and select **Webhooks**.
2. Select **Add webhook**.
3. In the **Payload URL** field, enter the Webhook URL that you get on selecting the source type as "Pull Request" or "Tag Creation" in Devtron the dashboard.
4. Change the Content-type to `application/json`.
5. In the **Secret** field, enter the secret from Devtron the dashboard when you select the source type as "Pull Request" or "Tag Creation".

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/ci-pipeline-4.jpg)

6. Under **Which events would you like to trigger this webhook?**, select **Let me select individual events.** to trigger the webhook to build CI Pipeline.
7. Select **Branch or tag creation** and **Pull Requests**.
8. Select **Add webhook**.

#### For Bitbucket Cloud

1. Go to the **Repository settings** page of your Bitbucket repository.
2. Select **Webhooks** and then select **Add webhook**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/ci-pipeline-6.jpg)

3. Enter a **Title** for the webhook.
4. In the **URL** field, enter the Webhook URL that you get on selecting the source type as "Pull Request" or "Tag Creation" in the Devtron dashboard.
5. Select the event triggers for which you want to trigger the webhook.
6. Select **Save** to save your configurations.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-ci-pipeline/ci-pipeline-7.jpg)