# CD Pipeline

After your CI pipeline is ready, you can start building your CD pipeline. Devtron enables you to design your CD pipeline in a way that fully automates your deployments. Images from CI stage can be deployed to one or more environments through dedicated CD pipelines.

## Creating CD Pipeline

Click the '**+**' sign on CI Pipeline to attach a CD Pipeline to it.

![Figure 1a: Adding CD Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/workflow-cd-v2.jpg)

A basic `Create deployment pipeline` window will pop up.

![Figure 1b: Creating CD Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/new-cd-pipeline.jpg)

Here, you get two tabs:
* [New Deployment](#new-deployment) - Use this option to create new Helm/GitOps deployment.
* [Migrate to Devtron](#migrate-to-devtron) - Use this option if you wish to migrate your existing Helm Release/Argo CD Apps to Devtron.

---

## New Deployment

The **New Deployment** tab displays the following sections:

* [Deploy to Environment](#deploy-to-environment)
* [Deployment Strategy](#deployment-strategy)
* [Advanced Options](#advanced-options)

### Deploy to Environment

This section expects four inputs from you:

| Setting     | Description                                                | Options                   |
| ----------- | ---------------------------------------------------------- | ------------------------- |
| Environment | Select the environment where you want to deploy your application | (List of available environments)  |
| Namespace   | Automatically populated based on the selected environment | Not Applicable                           |
| Trigger     | When to execute the deployment pipeline                   | **Automatic**: Deployment triggers automatically when a new image completes the previous stage (build pipeline or another deployment pipeline) <br /> **Manual**: Deployment is not initiated automatically. You can trigger deployment with a desired image. |
| Deployment Approach | How to deploy the application | **Helm** or **GitOps** <br /> Refer [GitOps](../../global-configurations/gitops.md)  |

### Deployment Strategy

Devtron supports multiple deployment strategies depending on the [deployment chart type](../../creating-application/deployment-template.md#select-chart-from-default-charts). 

![Figure 2: Strategies Supported by Chart Type](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/chart-and-strategy.jpg)

Refer [Deployment Strategies](#deployment-strategies) to know more about each strategy in depth.

The next section is [Advanced Options](#advanced-options) and it comes with additional capabilities. This option is available at the bottom of the `Create deployment pipeline` window. However, if you don't need them, you may proceed with a basic CD pipeline and click **Create Pipeline**. 

![Figure 3: Advanced Options](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/advanced-option.jpg)

Now, the window will have 3 distinct tabs, and you will see the following additions:
* [Pre-Deployment stage (tab)](#pre-deployment-stage)
* [Deployment stage (tab)](#deployment-stage)
* [Post-Deployment stage (tab)](#post-deployment-stage)

![Figure 4: Advanced Options (Expanded View)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/cd-advanced.jpg)

{% hint style="info" %}
You can create or edit a deployment strategy in Advanced Options. Remember, only the default strategy will be used for deployment, so use the **SET DEFAULT** button to mark your preferred strategy as default after creating it.
{% endhint %}

### Pre-Deployment Stage

If your deployment requires prior actions like DB migration, code quality check (QC), etc., you can use the `Pre-deployment stage` to configure such tasks.

![Figure 5: Pre-deployment Stage](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/cd-predeployment-v2.jpg)

1. **Tasks**

Here you can add one or more tasks. The tasks can be re-arranged using drag-and-drop and they will be executed sequentially. 

2. **Trigger Pre-Deployment Stage**

Refer the trigger types from [here](#1-deploy-to-environment).

3. **ConfigMaps & Secrets**

{% hint style="info" %}
### Prerequisites
Make sure you have added [ConfigMaps](../config-maps.md) and [Secrets](../secrets.md) in App Configuration.
{% endhint %}

If you want to use some configuration files and secrets in pre-deployment stages or post-deployment stages, then you can use the `ConfigMaps` & `Secrets` options. You will get them as a drop-down in the pre-deployment stage.

4. **Execute tasks in application environment**

These `Pre-deployment CD / Post-deployment CD` pods can be created in your deployment cluster or the devtron build cluster. If your scripts/tasks has some dependency on the deployment environment, you may run these pods in the deployment cluster. Thus, your scripts \(if any\) can interact with the cluster services that may not be publicly exposed.

Some tasks require extra permissions for the node where Devtron is installed. However, if the node already has the necessary permissions for deploying applications, there is no need to assign them again. Instead, you can enable the **Execute tasks in application environment** option for the pre-CD or post-CD steps. By default, this option is disabled.

To enable the `Execute tasks in application environment` option, follow these steps:

{% hint style="info" %}
Make sure your cluster has [devtron-agent](../../global-configurations/cluster-and-environments.md#installing-devtron-agent) installed.
{% endhint %}

* Go to the chart store and search for the devtron-in-clustercd chart.

  ![Figure 6: 'devtron-in-clustercd' Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/devtron-incluster-chart.jpg)

* Configure the chart according to your requirements and deploy it in the target cluster.

* After the deployment, edit the devtron-cm configmap and add the following key-value pair:

  ```bash
  ORCH_HOST: <host_url>/orchestrator/webhook/msg/nats

  Example:

  ORCH_HOST: http://xyz.devtron.com/orchestrator/webhook/msg/nats

  ```

  `ORCH_HOST` value should be same as of `CD_EXTERNAL_LISTENER_URL` value which is passed in values.yaml.

  ![Figure 7: Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/incluster-configuration.jpg)

* Delete the Devtron pod using the following command:

  ```bash
  kubectl delete pod -l app=devtron -n devtroncd
  ```

* Again navigate to the chart store and search for the "migration-incluster-cd" chart.

  ![Figure 8: 'migration-incluster-cd' chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/migration-incluster-chart.jpg)

* Edit the `cluster-name` and `secret name` values within the chart. The `cluster name` refers to the name used when adding the cluster in the global configuration and for which you are going to enable `Execute tasks in application environment` option.

  ![Figure 9: Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/migration-incluster.jpg)

* Deploy the chart in any environment within the Devtron cluster. Now you should be able to enable `Execute tasks in application environment` option for an environment of target cluster.

### Deployment Stage

#### Pipeline Name

Pipeline name will be auto-generated; however, you are free to modify the name as per your requirement.

<!-- #### Manual Approval for Deployment [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

If you want only approved images to be eligible for deployment, enable the `Manual approval for deployment` option in the respective deployment pipeline. By doing so, unapproved images would be prevented from being deployed for that deployment pipeline.

{% hint style="info" %}
Currently, only super-admins can enable or disable this option.
{% endhint %}

Users can also specify the number of approvals required for each deployment, where the permissible limit ranges from one approval (minimum) to six approvals (maximum). In other words, if the image doesn't get the specified number of approvals, it will not be eligible for deployment

![Figure 6: Configuring Manual Approval of Images](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/deployment-approval-new.jpg)

To enable manual approval for deployment, follow these steps:

1. Click the deployment pipeline for which you want to enable manual approval.
2. Turn on the ‘Manual approval for deployment’ toggle button.
3. Select the number of approvals required for each deployment.

To know more about the approval process, refer [Triggering CD](../../deploying-application/triggering-cd.md#manual-approval-for-deployment).  -->

#### Custom Image Tag Pattern

{% hint style="warning" %}
This will be utilized only when an existing container image is copied to another repository using the [Copy Container Image Plugin](../../plugins/copy-container-image.md). The image will be copied with the tag generated by the Image Tag Pattern you defined.
{% endhint %}

1. Enable the toggle button as shown below.

    ![Figure 10: Enabling Custom Image Tag Pattern](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/cd-image-pattern.jpg)

2. Click the edit icon.

    ![Figure 11: Edit Icon](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/edit-cd-image-tag.jpg)

3. You can write an alphanumeric pattern for your image tag, e.g., **prod-v1.0.{x}**. Here, 'x' is a mandatory variable whose value will incrementally increase with every pre or post deployment trigger (that option is also available to you). You can also define the value of 'x' for the next trigger in case you want to change it. 

    ![Figure 12: Defining Tag Pattern](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/cd-image-tag.jpg)

    {% hint style="warning" %}
    Ensure your custom tag do not start or end with a period (.) or comma (,)
    {% endhint %}

4. Click **Update Pipeline**. 

To know how and where this image tag would appear, refer [Copy Container Image Plugin](../../plugins/copy-container-image.md)

#### Pull Container Image with Image Digest

Although Devtron ensures that [image tags](#custom-image-tag-pattern) remain unique, the same cannot be said if images are pushed with the same tag to the same container registry from outside Devtron. 

Therefore, to eliminate the possibility of pulling an unintended image, Devtron offers the option to pull container images using digest and image tag.

![Figure 13: Pull with Image Digest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/image-digest/pull-with-digest.jpg)

An image digest is a unique and immutable SHA-256 string returned by the container registry when you push an image. So the image referenced by the digest will never change.

![Figure 14: Tag@Digest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/image-digest/tag-digest.jpg)


{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have Admin permission or above (along with access to the environment and application) to enable this option. However, this option will be non-editable in case the super-admin has enabled [pull image digest in Global Configurations](../../global-configurations/pull-image-digest.md).
{% endhint %}

### Post-Deployment Stage

If you need to run any actions for e.g., closure of Jira ticket, load testing or performance testing, you can configure such actions in the post-deployment stages.

Post-deployment stages are similar to pre-deployment stages. The difference is, pre-deployment executes before the deployment, while post-deployment occurs after.

You can use [ConfigMap and Secrets](#configmaps--secrets) in post deployments as well. The option to execute tasks in application environment is available too.

![Figure 15: Post-deployment Stage](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/cd_post_build.jpg)

---

## Migrate to Devtron

{% hint style="info" %}
### When can I see this option?
This option will be available only during the [creation of CD pipeline](#creating-cd-pipeline) in your workflow. Existing CD pipelines will not have this option.
{% endhint %}

{% hint style="warning" %}
### Who Can Perform This Action?
Only superadmins can migrate existing Helm releases or Argo apps to Devtron
{% endhint %}

If you already use external Helm or Argo CD for deployment and wish to try out Devtron, this feature helps you onboard and manage your external applications using Devtron’s CI/CD capabilities, offering the following benefits:

* No hassle of manually migrating your existing applications
* No need to set up a parallel Argo CD instance
* No risk of losing your existing configurations
* Use build pipeline in your workflow
* Execute pre-deployment and post-deployment tasks
* Scan your apps for vulnerabilities
* Hibernate or restart your app
* View config diff, deployment history, and all the capabilities that come with Devtron Apps

### Migrate Helm Release

{% hint style="warning" %}
### Prerequisites
* Add your external cluster (containing your Helm Apps) in [Clusters & Environments](../../global-configurations/cluster-and-environments.md).
* Your Helm release must use the same chart type as your application. If needed, you can upload or select the appropriate chart in **Global Configuration** → **Deployment Charts**, then save the chart type at [base configuration](../deployment-template.md) of your application.
{% endhint %}

You can not only [view your external Helm apps](../../applications.md#view-external-helm-app-listing), but also manage their deployments using Devtron's CI/CD. 

1. Click **Helm Release** in 'Select type of application to migrate'.

2. Select the external cluster containing your Helm releases, and select the Helm release you wish to migrate.

  ![Figure 16: Choosing External Cluster and Helm Release from Dropdown](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/choose-cluster-app.jpg)

3. The target cluster, its namespace, and environment would be visible. If the environment is not available, click **Add Environment**. This will open a new tab. Once you have [added the environment to your cluster](../../global-configurations/cluster-and-environments.md#add-environment-to-a-cluster), return and click the refresh button.

  ![Figure 17: Adding Environment to Target](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/add-env-helm.jpg)

4. Select the trigger (**Automatic/Manual**) and click **Create Pipeline**. 

  ![Figure 18: Creating CD Pipeline for Helm Release](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/deploy-mode.jpg)

5. Once the pipeline is created, you may go to [Build & Deploy](../../deploying-application/README.md) to trigger the pipelines. Your Helm release would be deployed using Devtron.

{% hint style="info" %}
### Limitations
This feature comes with certain mentioned limitations and expectations. If your use case doesn't fit and goes beyond, feel free to [**open a feature request**](https://github.com/devtron-labs/devtron/issues).

* Apps deployed using Helm + manual kubectl, kubectl, kustomize + helm are not supported.
* This feature is specifically designed for use cases where you need to change only the container image via CD flow.
* An installed Helm app may have multiple `values.yaml`. With Devtron, user can modify only one (if multiple files need to be modified, they must be merged into a single `values.yaml`.)
* Once onboarded to Devtron, the user should only use Devtron to manage the application and not do manual changes (outside of Devtron) on that onboarded Helm release.
* App’s custom chart and its required versions, including image descriptors, must be added in Devtron.  

{% endhint %}

### Migrate Argo CD Application

You can not only [view your external Argo CD apps](../../applications.md#view-external-argocd-app-listing), but also manage their deployments using Devtron's CI/CD.

{% hint style="warning" %}
### Prerequisites
* Your app should be an Argo Helm app ([read about supported tools](https://argo-cd.readthedocs.io/en/stable/user-guide/application_sources/)).
* It must have a single `values.yaml` file and a single Git source.
* The `values.yaml` should be in git.
* A target cluster and namespace must be available (in the application object).
* Your Argo CD app must use the same chart type as your application. If needed, you can upload or select the appropriate chart in **Global Configuration** → **Deployment Charts**. Then save the chart type at [base configuration](../deployment-template.md) of your application.
* Add your external cluster (containing your Argo Apps) in [Clusters & Environments](../../global-configurations/cluster-and-environments.md).
{% endhint %}

1. Click **Argo CD Application** in 'Select type of application to migrate'.

2. Select the external cluster containing your Argo apps, and select the Argo CD application you wish to migrate.

  ![Figure 19: Choosing External Cluster and Argo App from Dropdown](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/choose-cluster-app2.jpg)

3. The target cluster, its namespace, and environment would be visible. If the environment is not available, click **Add Environment**. This will open a new tab. Once you have [added the environment to your cluster](../../global-configurations/cluster-and-environments.md#add-environment-to-a-cluster), return and click the refresh button.

  ![Figure 20: Adding Environment to Target](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/add-env-argo.jpg)

4. Select the trigger (**Automatic/Manual**) and click **Create Pipeline**. 

  ![Figure 21: Creating CD Pipeline for Argo CD App](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/deploy-mode2.jpg)

5. Once the pipeline is created, you may go to [Build & Deploy](../../deploying-application/README.md) to trigger the pipelines. Your Argo CD app would be deployed using Devtron.

{% hint style="info" %}
### Limitations
This feature comes with certain mentioned limitations and expectations. If your use case doesn't fit and goes beyond, feel free to [**open a feature request**](https://github.com/devtron-labs/devtron/issues).

* App’s custom chart and its required versions, including image descriptors, must be added in Devtron. 
* The Git source type should be branch HEAD.
* The cluster containing Argo applications and the target deployment cluster are both added in Devtron.
* The target deployment cluster’s endpoint in Devtron must be the same as the one configured in Argo CD.
* The target deployment [environment exists in Devtron](../../global-configurations/cluster-and-environments.md#add-environment-to-a-cluster).
* GitOps credentials required to commit in the Git repo have been configured in [Global Configurations](../../global-configurations/gitops.md).
* The external Argo CD has auto-sync enabled or an alternative syncing mechanism, as Devtron does not perform manual syncs.
* Once onboarded to Devtron, users should manage the application only through Devtron and avoid making changes directly in Git or Argo CD.
{% endhint %}

---


## Updating CD Pipeline

You can update the deployment stages and the deployment strategy of the CD Pipeline whenever you require it. However, you cannot change the name of a CD Pipeline or its Deployment Environment. If you want a new CD pipeline for the same environment, first delete the previous CD pipeline.

To update a CD Pipeline, go to the `App Configurations` section, Click on `Workflow editor` and then click on the CD Pipeline you want to Update.

![Figure 22: Updating CD Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/ca-workflow-update.gif)


Make changes as needed and click on `Update Pipeline` to update this CD Pipeline.

---

## Deleting CD Pipeline

If you no longer require the CD Pipeline, you can also delete the Pipeline.

To delete a CD Pipeline, go to the App Configurations and then click on the Workflow editor. Now click on the pipeline you wish to delete. A pop-up having the CD details will appear. Verify the name and the details to ensure that you are not accidentally deleting the wrong CD pipeline and then click **Delete Pipeline** to delete it.

{% hint style="warning" %}
Deleting a CD pipeline also deletes all the K8s resources associated with it and will bring a disruption in the deployed micro-service. Before deleting a CD pipeline, please ensure that the associated resources are not being used in any production workload.
{% endhint %}

---

## Extras

### Deployment Strategies

A deployment strategy is a method of updating, downgrading, or creating new versions of an application. The options you see under deployment strategy depend on the selected chart type (see fig 2). Below are some deployment configuration-based strategies.

#### Blue-Green Strategy

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

#### Rolling Strategy

A rolling deployment slowly replaces instances of the previous version of an application with instances of the new version of the application. Rolling deployment typically waits for new pods to become ready via a readiness check before scaling down the old components. If a significant issue occurs, the rolling deployment can be aborted.

```markup
rolling:
  maxSurge: "25%"
  maxUnavailable: 1
```

| Key | Description |
| :--- | :--- |
| `maxSurge` | No. of replicas allowed above the scheduled quantity |
| `maxUnavailable` | Maximum number of pods allowed to be unavailable |

#### Canary Strategy

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

#### Recreate Strategy

The recreate strategy is a dummy deployment that consists of shutting down version 'A' and then deploying version 'B' after version 'A' is turned off. 

A recreate deployment incurs downtime because, for a brief period, no instances of your application are running. However, your old code and new code do not run at the same time. It terminates the old version and releases the new one.

```markup
recreate:
```

Unlike other strategies mentioned above, 'Recreate' strategy doesn't contain keys for you to configure.

{% hint style="info" %}
Does your app have different requirements for different environments? Read [Environment Overrides](../environment-overrides.md)
{% endhint %}

### Creating Sequential Pipelines

Devtron supports attaching multiple deployment pipelines to a single build pipeline, in its workflow editor. This feature lets you deploy an image first to stage, run tests and then deploy the same image to production.

Please follow the steps mentioned below to create sequential pipelines:

1. After creating CI/build pipeline, create a CD pipeline by clicking on the `+` sign on CI pipeline and configure the CD pipeline as per your requirements.
2. To add another CD Pipeline sequentially after previous one, again click on + sign on the last CD pipeline.
3. Similarly, you can add multiple CD pipelines by clicking + sign of the last CD pipeline, each deploying in different environments.

![Figure 23: Adding Multiple CD Pipelines](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/sequential-workflow.jpg)

{% hint style="info" %}
### Tip
If you have multiple applications that already have an existing pipeline (for a given environment) in their workflow, you may clone the same pipeline and its configurations for new environments instead of recreating them in each application. Refer [Clone Pipeline Config](../../application-groups.md#clone-pipeline-configuration) to know more.
{% endhint %}