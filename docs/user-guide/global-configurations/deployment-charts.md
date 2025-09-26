# Deployment Charts

## Introduction

Devtron Apps leverage helm charts to carry out deployment of your images and configuration. Devtron includes predefined Helm charts (e.g., Deployment, Rollout, StatefulSet) that cover majority of your use cases.

For any use case not addressed by the default Helm charts, you can upload your own Helm chart and use it as a deployment chart in Devtron.

![Figure 1: Deployment Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/gc-deployment-charts.jpg)

### Tutorial

This video contains a quick walkthrough of the steps mentioned in the [Preparing a Deployment Chart](#preparing-a-deployment-chart) section of this page and the subsequent uploading of the deployment chart on Devtron.

{% embed url="https://www.youtube.com/watch?v=jzMZa7bSiyA" caption="How to Upload your Deployment Chart in Devtron" %}

---

<a id="prerequisites"></a>

## Preparing a Deployment Chart

Below is the 5-step prerequisite you can follow to have your chart ready for uploading.

### 1. Create a Helm Chart

You can use the following command to create a Helm chart:

```bash
helm create my-custom-chart
```

> **Note**: `Chart.yaml` is a metadata file that gets created when you create a [helm chart](https://helm.sh/docs/helm/helm_create/). The following table consists the fields that are relevant to you in `Chart.yaml`.

| Field | Description |
| --- | --- |
| `Name` | Name of the Helm chart (Required). |
| `Version` | This is the chart version. Update this value for each new version of the chart (Required). |
| `Description` | Give a description to your chart (Optional). |

{% hint style="info" %}
### Example of Chart.yaml
[Click here](https://devtron-public-asset.s3.us-east-2.amazonaws.com/custom-charts/chart-yaml-file.jpg) to view a sample 'Chart.yaml' file.
{% endhint %}

### 2. Create an Image Descriptor Template File

The Image Descriptor Template file is a GO template that produces a valid JSON file upon processing. It allows Devtron to dynamically inject values from the CD pipeline into your Helm chart during deployment. Therefore, details like image repository, tag, and environment are automatically populated at the placeholders specified in `.image_descriptor_template.json`.

* In the root directory of your chart, create a file named `.image_descriptor_template.json` using the following command:

    ```bash
    touch .image_descriptor_template.json
    ```

* Ensure the above file is created in the directory where the main `Chart.yaml` exists (as shown below): 

    ![Figure 2: Filepath of Image Descriptor Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/descriptor-filepath.jpg)

* Paste the following content in `.image_descriptor_template.json` file:

    ```bash
    {
        "server": {
            "deployment": {
                "image_tag": "{{.Tag}}",
                "image": "{{.Name}}"
            }
        },
        "pipelineName": "{{.PipelineName}}",
        "releaseVersion": "{{.ReleaseVersion}}",
        "deploymentType": "{{.DeploymentType}}",
        "app": "{{.App}}",
        "env": "{{.Env}}",
        "appMetrics": {{.AppMetrics}}
    }
    ```

    You can customize this template to include only the values your deployment needs. For instance, if you only require the image repository and tag, your template would look like:

    ```bash
    {
        "image": {
            "repository": "{{.Name}}",
            "tag": "{{.Tag}}"
        }
    }
    ```

{% hint style="warning" %}
### Got a JSON Error?
If your code editor highlights a syntax error (property or EOF error) in the above JSON, ignore it.
{% endhint %}

<!-- | Field | Description |
| --- | --- |
| **image_tag** | The build image tag |
| **image** | Repository name |
| **pipelineName** | The CD pipeline name created in Devtron |
| **releaseVersion** | Devtron's internal release number |
| **deploymentType** | Deployment strategy used in the pipeline |
| **app** | Application's ID within the Devtron ecosystem |
| **env** | Environment used to deploy the chart |
| **appMetrics** | For the App metrics UI feature to be effective, include the `appMetrics` placeholder. | -->

### 3. Add app-values.yaml

In the root directory of your chart, Devtron expects an `app-values.yaml` file. It uses this file to determine the values to be displayed on the [deployment template](../../reference/glossary.md#deployment-template) as shown below. 

![Figure 3: Chart Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/deployment-template.jpg)

The `app-values.yaml` file is simply a subset of your `values.yaml` file. Therefore, you can insert specific entries from `values.yaml` that you wish to display.

However, if you upload the chart without an `app-values.yaml` or with an empty one, your deployment template will appear blank (as shown below) or null.

![Figure 4: Blank Chart Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/empty-values.jpg)


### 4. Add release-values.yaml

The `release-values.yaml` file contains essential values needed for deployment that aren’t covered by [app-values.yaml](#id-3.-add-app-values.yaml). For example:

* Some dynamic values (such as `IMAGE_TAG` and `IMAGE_REPO` from the [image descriptor JSON file](#id-2.-create-an-image-descriptor-template-file)) are populated here because they are needed for deployment.
* You can use `autoPromotionSeconds` to decide how long to keep old pods running once the latest pods of new release are available.

In the root directory of your chart, create a file named `release-values.yaml` with the following command:

```bash
touch release-values.yaml
```

Use the following content in the `release-values.yaml` file (edit it as per your requirement):

```yml
server:
 deployment:
   image_tag: IMAGE_TAG
   image: IMAGE_REPO
   enabled: false
dbMigrationConfig:
  enabled: false

pauseForSecondsBeforeSwitchActive: 0
waitForSecondsBeforeScalingDown: 0
autoPromotionSeconds: 30

#used for deployment algo selection
orchestrator.deploymant.algo: 1 
```

### 5. Package the chart in a tgz format

<!-- Before you package the chart, ensure your Helm chart has the mandatory files mentioned in the [Prerequisites](#prerequisites) section of this page. -->

The Helm chart to be uploaded must be packaged as a versioned archive file in the format: `<helm-chart-name>-x.x.x.tgz`. 
Both `<helm-chart-name>` and `x.x.x` will be automatically fetched from the name and version fields present in the Chart.yaml file, respectively."

{% hint style="warning" %}
### Note
Ensure you navigate out of the Helm chart folder before packaging it in a '.tgz' format
{% endhint %}

Run the following command to package the chart:

```bash
helm package my-custom-chart
```

The above command will generate a `<helm-chart-name>-x.x.x.tgz` file.

---

## Uploading a Deployment Chart

{% hint style="warning" %}
### Who Can Perform This Action?
Only super admin users can upload a deployment chart. A super admin can upload multiple versions of a chart.
{% endhint %}

### Steps

* Go to **Global Configurations** → **Deployment Charts**.

    ![Figure 5: Global Configurations - Deployment Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/gc-deployment-charts.jpg)

* Click **Upload Chart**.

    ![Figure 6: Upload Chart Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/upload-chart.jpg)

* Click **Select .tgz file** and upload your packaged deployment chart (in **.tgz** format).

    ![Figure 7: Uploading .tgz File](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/select-tgz-file.jpg)

The system initiates the validation of your uploaded chart. You may also click **Cancel upload** if you wish to abort the process.

![Figure 8: Cancelling Upload](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/cancel-upload.jpg)

### Validation Checks

In the uploading process, your file will be validated against the following criteria:

- Supported archive template should be in `*.tgz` format.
- `Chart.yaml` must include the name and the version number.
- `.image_descriptor_template.json` file should be present.

The following are interpretations of the validation checks performed:

| Validation Status | Description | User Action |
| :--- | :--- | :--- |
| **Success** | The files uploaded are validated <br />([View Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/chart-success.jpg))  | Enter a description for the chart and select **Save** or **Cancel upload** |
| **Unsupported template** | The archive file do not match the [required template](#preparing-a-deployment-chart) <br />([View Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/unsupported-template.jpg)) | **Upload another chart** or **Cancel upload** |
| **New version detected** | You are uploading a newer version of an existing chart <br />([View Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/new-version.jpg)) | Enter a **Description** and select **Save** to continue uploading, or **Cancel upload** |
| **Already exists** | There already exists a chart with the same version <br />([View Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/chart-exists.jpg)) | <ul><li>Edit the version and re-upload the same chart using **Upload another chart**.</li><li>Upload a new chart with a new name using  **Upload another chart**</li><li>**Cancel upload**</li></ul> |

---

## Viewing Deployment Charts

{% hint style="warning" %}
### Who Can Perform This Action?
Only super-admins can view deployment charts.
{% endhint %}

To view the list of available deployment charts, go to  **Global Configurations** → **Deployment Charts** page.

![Figure 9: Viewing Deployment Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/view-charts.jpg)

* You can search a chart by its name, version, or description.
* You can add new [charts or chart versions](#uploading-a-deployment-chart) by clicking **Upload Chart**.

---

## Using Deployment Chart in Application

Once you successfully upload a deployment chart, you can start using it as a deployment template for your application. Refer [Deployment Template](../creating-application/base-config/deployment-template.md) to know more.

![Figure 10: Using Deployment Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/use-chart.gif)

{% hint style="warning" %}
### Note
The deployment strategy for a deployment chart is fetched from the chart template and cannot be configured in the [CD pipeline](../creating-application/workflow/cd-pipeline.md#deployment-strategies).
{% endhint %}

---

## Editing GUI Schema of Deployment Charts [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="warning" %}
### Who Can Perform This Action?
Only super-admins can edit the GUI schema of deployment charts.
{% endhint %}

{% hint style="info" %}
### Reference
This section is an extension of [Customize GUI](../creating-application/base-config/deployment-template.md#using-gui) feature. Refer the document to know more about the significance of having a custom GUI schema for your deployment templates.
{% endhint %}

You can edit the GUI schema of the following deployment charts:
1. Default charts provided by Devtron (*Deployment*, *Job & CronJob*, *Rollout Deployment*, and *StatefulSet*)
2. Custom charts uploaded by you

### Tutorial

{% embed url="https://www.youtube.com/watch?v=93tGIsM1qC8" caption="JSON-driven Deployment Schema" %}

### Steps

In this example, we will edit the Deployment chart type provided by Devtron.

1. Click the edit button next to the chart as shown below.

    ![Figure 11: Edit GUI Schema Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/edit-chart-schema.jpg)

2. A GUI schema is available for you to edit in case of Devtron charts. In case of custom charts, you may have to define a GUI schema yourself. To know how to create such GUI schema, refer [RJSF JSON Schema Tool](https://rjsf-team.github.io/react-jsonschema-form/). 

    ![Figure 12: Editable Schema](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/gui-schema.jpg)

3. You may start editing the schema by excluding existing fields/objects or including more of them. Click the **Refer YAML** button to view all the supported fields.

    ![Figure 13: Refer YAML Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/refer-yaml.gif)

4. While editing the schema, you may use the **Preview GUI** option for a real-time preview of your changes.

    ![Figure 14: Preview GUI Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/preview-gui.gif)

5. Click **Save Changes**.

    ![Figure 15: Save Changes](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/deployment-charts/save-changes.jpg)

Next, if you go to **Configurations** → **Base Configurations** → **Deployment Template**, you will be able to see the deployment template fields (in GUI) as per your customized schema.