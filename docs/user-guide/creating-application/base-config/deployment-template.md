# Deployment Template

## Introduction 

![Figure 1: Deployment Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/base-config/deployment-template.jpg)

In Devtron, a [Deployment Template](../../../reference/glossary.md#deployment-template) defines how your application should run by defining its specifications. Devtron uses [Helm charts](../../../reference/glossary.md#helm-chartspackages) to manage these deployments, allowing you to control everything from [Resource Allocation](../../../reference/glossary.md#resource-allocation) to environment variables. 

You can use default [Deployment Charts](../../../reference/glossary.md#deployment-charts) provided by Devtron or [Custom Deployment Charts](../../global-configurations/deployment-charts.md) developed by a super-admin to suit your needs.

This guide covers how to:

* [Select a Deployment Chart](#select-a-deployment-chart-type)

* [Choose a Chart Version](#choose-a-chart-version)

* [Configure the Deployment Template](#configure-the-deployment-template)

* [Enable Application Metrics](#enable-application-metrics)

* [Perform a Dry Run](#perform-a-dry-run)

* [Extra: Edit a Protected Deployment Configuration](#edit-a-protected-deployment-template) [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

---

## Select a Deployment Chart Type

{% hint style="warning" %}

### Who Can Perform This Action?

Users need to have [Admin role](../../../user-guide/global-configurations/user-access.md#role-based-access-levels) or above to select a chart.

{% endhint %}

1. Go to the **Configurations** page of your application.

  ![Figure 2: Application's 'Configurations' Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/app-config-page.jpg)

2. Click **Base Configuration** → **Deployment Template**.

  ![Figure 3: Navigating to Base Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/click-baseconfig.gif)

3. Select the **Chart** drop-down box. The following tabs are displayed:

  * [Charts by Devtron](./deployment-template/README.md) - Displays the default deployment charts provided by Devtron

  * [Custom charts](../../global-configurations/deployment-charts.md) - Displays your custom deployment charts (if available). To create a custom deployment chart, refer to [Deployment Charts](../../global-configurations/deployment-charts.md).

  ![Figure 4a: Charts by Devtron](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/base-config/deployment-charts-devtron.gif)

  ![Figure 4b: Custom Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/base-config/deployment-charts-custom.gif)

{% hint style="danger" %}

### Important Note

After you select and save a chart type for a given application, you won't be able to change it later. Make sure to choose the correct chart type before saving.

{% endhint %}

---

## Choose a Chart Version

{% hint style="warning" %}

### Who Can Perform This Action?

Users need to have [Admin role](../../../user-guide/global-configurations/authorization/user-access.md#roles-available-for-devtron-apps) or above to select a chart version.

{% endhint %}

Devtron maintains multiple chart versions for each chart type. Additionally, each chart version has a supporting README file that you can use to know more about the features and variables.

![Figure 5: Accessing the README file](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/readme-version.gif)

Once you [select a deployment chart](#select-a-deployment-chart-type), choose a chart version with which you wish to deploy your application from the **Version** drop-down box. By default, the latest version of the helm chart is selected.

![Figure 6: Choosing the Chart Version](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/chart-version.jpg)

---

## Configure the Deployment Template

{% hint style="warning" %}

### Who Can Perform This Action?

Users need to have [Admin role](../../../user-guide/global-configurations/authorization/user-access.md#roles-available-for-devtron-apps) or above to configure a deployment template. However, super-admins can lock keys in deployment template to prevent non-super-admins from modifying them. Refer [Lock Deployment Configuration](../../global-configurations/lock-deployment-config.md) to know more.

{% endhint %}

You can edit a deployment template using the following two ways:

* [Using GUI](#using-gui)

* [Using YAML](#using-yaml)

### Using GUI

If you prefer to use a simple way to configure your chosen deployment chart, select **GUI**.

![Figure 7: GUI Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/basic-gui.jpg)

By default, the following fields are commonly available for you to modify in the **GUI** section of most charts:

| Fields | Description |
| :---    |     :---       |
| **Container Port** | The internal port on which the container listens for HTTP requests. Specify the container port and optionally the service port that maps to it. |
| **Resources**  | Here, you can tweak the requests and limits of the CPU resource and RAM resource as per the application. |
| **Autoscaling** | Define the autoscaling parameters to automatically scale your application's deployment based on resource utilization.<ul><li>**Maximum Replicas**: The maximum number of replicas your application can scale up to.</li><li>**Minimum Replicas**: The minimum number of replicas your application should run at any time.</li><li>**Target CPU Utilization Percentage**: The average CPU utilization across all pods that will trigger scaling.</li><li>**Target Memory Utilization Percentage**: The average memory utilization across all pods that will trigger scaling.</li></ul>|
| **Replica Count** | Defines the number of pod replicas to be deployed for the application. Adjusting this value helps scale the application horizontally. |
| **Ingress** | Enable the `Ingress` to control external access to the application using HTTP/HTTPS routes. You can define hostnames, paths, and ingress class settings. By default, it is in the `disabled` state.<ul><li> **Host**: Domain name of the server. </li><li>**Path**: Path of the specific component in the host that the HTTP wants to access.</li></ul> You can define multiple paths as required by clicking **Add paths**.|
| **Environment Variables** (**Key/Value**)  | Define `key/value` by clicking **Add variable**. <ul><li> **Key**: Define the key of the environment.</li><li>**Value**: Define the value of the environment.</li></ul> You can define multiple env variables by clicking **Add EnvironmentVariables**.  |
| **Readiness Probe** | Define the readiness probe to determine when a container is ready to start accepting traffic.<ul><li>**Path**: The HTTP path that the readiness probe will access.</li><li>**Port**: The port on which the readiness probe will access the application.</li></ul>|
| **Liveness Probe** | Define the liveness probe to check if the container is still running and to restart it if it is not.<ul><li>**Path**: The HTTP path that the liveness probe will access.</li><li>**Port**: The port on which the liveness probe will access the application.</li></ul>|
| **Service** | Configure the service that exposes your application to the network.<ul><li>**Type**: Specify the type of service (e.g., ClusterIP, NodePort, LoadBalancer).</li><li>**Annotations**: Add custom annotations to the service for additional configuration.</li></ul>|
| **serviceAccount** | Specify the service account for the deployment to use, allowing it to access Kubernetes API resources.<ul><li>**Create**: Toggle to create a new service account.</li><li>**Name**: The name of the service account to use.</li></ul>|
| **podDisruptionBudget** | Ensure high availability by setting limits on how many pods can be disrupted at a time during voluntary disruptions like maintenance or updates. |
| **Spec** | Define node selection rules using key-value pairs. This ensures that the pod runs on specific nodes that match your given labels. |
| **Tolerations** | Define tolerations to allow the pods to be scheduled on nodes with matching taints.<ul><li>**Key**: The key of the taint to tolerate.</li><li>**Operator**: The relationship between the key and the value (e.g., Exists, Equal).</li><li>**Value**: The value of the taint to match.</li><li>**Effect**: The effect of the taint to tolerate (e.g., NoSchedule, NoExecute).</li></ul>|
| **Image** | Defines the container image to be used for deployment, including its pull policy (e.g., IfNotPresent, Always, Never) |
| **Arguments**  | Enable the `Arguments` to pass one or more argument values. By default, it is in the `disabled` state. |
| **Command**  | Enable the `Command` to pass one or more command values (e.g., `/bin/sh -c "/app/custom-script.sh"`). By default, it is in the `disabled` state. |
| **imagePullSecrets** | Provide secrets to authenticate and pull container images from a private registry. |


If you wish to perform additional configurations, click the **Switch to Advanced** button or **YAML** button. Or [perform a dry run](#perform-a-dry-run) before saving your configuration.

![Figure 8: Switch to Advanced (YAML Method)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/yaml-switch-new.jpg)

{% hint style="info" %}

### Note

* If you change any values in the **GUI**, then the corresponding values will change in **YAML** too.

* Users who are not super-admins will land on **GUI** section when they visit **Deployment Template** page; whereas super-admins will land on **YAML** section. This is just a default behavior, they can still navigate to the other section if needed.

{% endhint %}

#### Customize the GUI [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../../global-configurations/user-access.md#assign-super-admin-permissions) can customize the GUI section.

{% endhint %}

By default, the **GUI** section comes with multiple predefined fields as seen earlier [in the table](#using-gui). However, if you wish to display a different set of fields to your team, you can modify the whole section as per your requirement.

This is useful in scenarios where:

  * Your team members find it difficult to understand and edit the YAML section.

  * You frequently edit certain fields in **YAML**, which you expect to remain easily accessible in **GUI** section.

  * You don't require some fields in **GUI** section.

  * You need the autonomy to keep the GUI unique for applications/clusters/environments/charts, or display the same GUI everywhere.

There are two ways you can customize the GUI, use any one of the following:

1. From [Deployment Charts](../../global-configurations/deployment-charts.md#editing-gui-schema-of-deployment-charts) section

2. Using APIs (explained below)

{% embed url="https://www.youtube.com/watch?v=09VP1I-WvUs" caption="JSON-driven Deployment Schema" %}

You can pass a custom JSON (deployment schema) of your choice through the following API. You may need to run the API with the `POST` method if you are doing it for the first time.

```
PUT {{DEVTRON_BASEURL}}/orchestrator/deployment/template/schema
```

{% code title="Sample API Request Body" overflow="wrap" lineNumbers="true" %}

```json
{
  "name": "schema-1",
  "type": "JSON",
  "schema": "{\"type\":\"object\",\"properties\":{\"args\":{\"type\":\"object\",\"title\":\"Arguments\",\"properties\":{\"value\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"title\":\"Value\"},\"enabled\":{\"type\":\"boolean\",\"title\":\"Enabled\"}}},\"command\":{\"type\":\"object\",\"title\":\"Command\",\"properties\":{\"value\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"title\":\"Value\"},\"enabled\":{\"type\":\"boolean\",\"title\":\"Enabled\"}}},\"resources\":{\"type\":\"object\",\"title\":\"Resources(CPU&RAM)\",\"properties\":{\"limits\":{\"type\":\"object\",\"required\":[\"cpu\",\"memory\"],\"properties\":{\"cpu\":{\"type\":\"string\"},\"memory\":{\"type\":\"string\"}}},\"requests\":{\"type\":\"object\",\"properties\":{\"cpu\":{\"type\":\"string\"},\"memory\":{\"type\":\"string\"}}}}},\"autoscaling\":{\"type\":\"object\",\"title\":\"Autoscaling\",\"properties\":{\"MaxReplicas\":{\"type\":[\"integer\",\"string\"],\"title\":\"MaximumReplicas\",\"pattern\":\"^[a-zA-Z0-9-+\\\\/*%_\\\\\\\\s]+$\"},\"MinReplicas\":{\"type\":[\"integer\",\"string\"],\"title\":\"MinimumReplicas\",\"pattern\":\"^[a-zA-Z0-9-+\\\\/*%_\\\\\\\\s]+$\"},\"TargetCPUUtilizationPercentage\":{\"type\":[\"integer\",\"string\"],\"title\":\"TargetCPUUtilizationPercentage\",\"pattern\":\"^[a-zA-Z0-9-+\\\\/*%_\\\\\\\\s]+$\"},\"TargetMemoryUtilizationPercentage\":{\"type\":[\"integer\",\"string\"],\"title\":\"TargetMemoryUtilizationPercentage\",\"pattern\":\"^[a-zA-Z0-9-+\\\\/*%_\\\\\\\\s]+$\"}}},\"EnvVariables\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"key\":{\"type\":\"string\"},\"value\":{\"type\":\"string\"}}},\"title\":\"EnvironmentVariables\"},\"ContainerPort\":{\"type\":\"array\",\"items\":{\"type\":\"object\",\"properties\":{\"port\":{\"type\":\"integer\"}}},\"title\":\"ContainerPort\"}}}",
  "selectors": [
    {
      "attributeSelector": {
        "category": "APP",
        "appNames": ["my-demo-app"]
      }
    },
    {
      "attributeSelector": {
        "category": "ENV",
        "envNames": ["env1", "env2", "env3"]
      }
    },
    {
      "attributeSelector": {
        "category": "CLUSTER",
        "clusterNames": ["cluster1", "cluster2", "cluster3"]
      }
    },
    {
      "attributeSelector": {
        "category": "CHART_REF",
        "chartVersions": [
          {
            "type": "Deployment",
            "version": "1.0.0"
          }
        ]
      }
    },
    {
      "attributeSelector": {
        "category": "APP_ENV",
        "appEnvNames": [
          {
            "appName": "my-demo-app",
            "envName": "devtron"
          }
        ]
      }
    }
  ]
}

```
{% endcode %}

1. In the `name` field, give a name to your schema, e.g., *schema-1*

2. Enter the `type` as JSON.

3. The `schema` field is for entering your custom JSON representing the deployment template's GUI. You can customize the fields that are displayed in the GUI section while configuring the deployment template. Perform the following steps:

  * To create a custom JSON for your deployment, you may use [RJSF JSON Schema Tool](https://rjsf-team.github.io/react-jsonschema-form/). 

  * Copy the final JSON and stringify it using any free online tool. 

  * Paste the stringified JSON in the `schema` field of the API request body.

  * Send the API request. If your schema already exists, use the `PUT` method instead of `POST` in the API call.

4. The `attributeSelector` object helps you choose the scope at which your custom JSON will take effect.

    | Priority | Category Scope  | Description                                                                |
    |----------|-----------------|----------------------------------------------------------------------------|
    | 1 (High) | APP_ENV         | Specific to an application and its environment                             |
    | 2        | APP             | Applies at the application level if no specific environment is defined     |
    | 3        | ENV             | Applies to specific deployment environment                                 |
    | 4        | CHART_REF       | Applies to all applications using a specific chart type and version        |
    | 5        | CLUSTER         | Applies across all applications and environments within a specific cluster |
    | 6        | GLOBAL          | Universally applies if no other more specific schemas are defined          |


### Using YAML

If you prefer to perform additional configurations in your chosen deployment template, select **YAML**.

![Figure 9: YAML Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/advanced-yaml.jpg)

Every chart version has its own YAML file that provides specifications for your application. To make it easy to use, we have created templates for the YAML file and added some variables inside the YAML. You can provide or change the values of these variables as per your requirement.

Refer the respective templates to view the YAML details.

* [Deployment](./deployment-template/deployment.md)

* [Rollout Deployment](./deployment-template/rollout-deployment.md)

* [Job & CronJob](./deployment-template/job-and-cronjob.md)

* [StatefulSet](./deployment-template/statefulset.md)

Before saving your configuration in YAML, make sure to [perform a dry run](#perform-a-dry-run).

---

## Enable Application Metrics

The availability of application metrics depends on the selected chart type and version. If supported, you can view key performance metrics such as:

* Status codes (2xx, 3xx, 5xx)
* Throughput
* Latency
* And more

To enable this, turn on the **Show application metrics** toggle.

![Figure 10: Enabling Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/show-application-metrics-v2.jpg)

Once enabled, you can view the application metrics on the **App Details** page.

![Figure 11: Application metrics on 'App Details' page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/app-metric-op.jpg)

{% hint style="info" %}

### Important

Enabling application metrics adds a sidecar container to your main container, which may require additional configuration. We recommend running a load test in a non-production environment before enabling it in production.

{% endhint %}

---

## Perform a Dry Run

Before saving your configured deployment template, you can use the **Dry Run** option (as shown below) to preview the final Kubernetes manifests.

This feature helps you verify your configurations, detect issues, and ensure correctness before actual deployment.

![Figure 12: Show application metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/dry-run-dt.gif)

Your configurations will appear in the left pane, while the right pane will display a section named `Manifest generated from merged` showing the computed Kubernetes manifests, each representing a separate resource after merging all your changes.

---

## Edit a Protected Deployment Template [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="info" %}

### Who Can Perform This Action?

Only a super-admin, manager, and admin can edit the configuration values. 

{% endhint %}

Any changes made to the deployment template will require approval if an approval policy is enforced. To check if your deployment template is protected, check the stamp/approve symbol as shown below.

![Figure 13: Checking Protected Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/protected-dt.jpg)

### Request Approval for Changes

Let's assume you are the application admin and your deployment template in **Base Configurations** is protected from edits.

1. In the YAML editor of the deployment template, modify the values. 

    ![Figure 14: Selecting Values to Change](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/edit-deployment-template-v2.jpg)

2. You can change the value of a key to a desired value as shown below. Once done, click the **Save Changes** button.

    ![Figure 15: Changing Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/changed-values-v2.jpg)

{% hint style="info" %}

### What if the keys are locked from editing?

You cannot modify locked keys in deployment template unless you are a super-admin. Refer [Lock Deployment Configuration](../../global-configurations/lock-deployment-config.md) to know more. 

{% endhint %}

3. Since the deployment configuration is protected, your changes won't be published right away. You can do either of the following:

    * **Save as draft** : Selecting this option will save your file as a draft. You and other users can view and edit the saved draft and propose it further for approval.

    * **Save & Propose Changes** : Selecting this option will allow you to choose and notify the configuration approver(s) and propose your changes for a review. Moreover, it also has the option to notify all the users having access to the application on Devtron.

    Since we are proposing the changes immediately, click **Propose Changes**.

    ![Figure 16: Proposing Changes](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/propose-changes-v2.gif)

4. You can also view the approval status if you wish.

    ![Figure 17: Viewing the Approval Status](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/approval-status.jpg)

{% hint style="info" %}

### Can I approve my own changes?

No, the one who performs the edits cannot approve their own changes. A different user has to review and approve.

{% endhint %}

Only one draft can exist at time and you cannot create multiple drafts. In the top-right corner, you have the option to discard the draft if you don't wish to proceed with the edits you made. 

![Figure 18: Discarding the Draft](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/discard-draft.jpg)

### Grant Approval for Changes

{% hint style="info" %}

### Who Can Perform This Action?

Only a valid approver or a Super-Admin can approve the changes made to the deployment configuration. Refer to [Approval Policy](../../global-configurations/approval-policy.md) for more information.

{% endhint %}

Go to the edited configuration file to review and approve the changes as shown below.

![Figure 19: Approving the Changes](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/approval-screen-v2.jpg)

{% hint style="info" %}

### Note

If [SES/SMTP](../../global-configurations/manage-notification.md) is configured in Devtron, the approver gets notified via email. Therefore, the approver can take an action directly from the mail as shown below. Once the approver validates and approves your configuration changes, you can proceed to deploy your application with the updated configuration.

{% endhint %}