# Deploy Charts

## Introduction

This document helps you deploy, update, upgrade, disable, and delete charts.

---

## Configure and Deploy Charts

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin or an Admin](../global-configurations/authorization/user-access.md#helm-apps-permissions) can configure and deploy charts. 

{% endhint %}

To configure and deploy Helm, follow the instructions below:

1. Navigate to **Chart Store**. 

2. Enter your preferred chart name in the search bar at the top-left corner of the screen. 

3. Select your preferred chart. The chart page is displayed.

    ![Figure 1: Discover a Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/configure-deploy.jpg)

    | Section | Description |
    | :--- | :--- |
    | **About** | A short description of the chart|
    | **README.md** | Contains the instructions, configurations, and everything related to the configuration and deployment of the chart |
    | **Deployments** | Displays the list of projects under which the chart is deployed |

4. Click **Configure & Deploy**. Configuring a Helm chart gives you the flexibility to customize it to your needs instead of relying on the default values of the chart.
    
    To predefine configurations and make future deployments across environments easier, refer to [Preset Values](#preset-values).

    ![Figure 2: Configure & Deploy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploy-chart.jpg)

5. Refer to the table below and fill in the details:

    | Key | Description |
    | :--- | :--- |
    | **App Name** | Enter your application name|
    | **Project** |  Select your project |
    | **Deploy to Environment** | Select the environment where you want to deploy the chart |
    | **Chart Version** | Select the chart version you prefer to deploy|
    | **Chart Value** | Select the chart value you prefer to use. Kindly refer to [Preset Values](#preset-values) |

6. Click **Deploy Chart**.

Once you have deployed a chart, you will be redirected automatically to the **App Details** tab where the deployment status is shown. 

![Figure 3: Check Deployment Status](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/app-installation-success.jpg)

The Application Status should be `Healthy`, indicating that the application has been successfully deployed.

---

## Refetch Charts

When you click on **Refetch Charts**, the system fetches the latest Helm charts (e.g., `stable/mySQL`, `bitnami/mySQL`) and their latest available versions (e.g., v1.0, v1.1) that include improvements, features, and fixes. You can then either update a chart version or upgrade the chart itself in your environment. 

To check the latest charts and chart versions, follow the instructions below:

1. Navigate to the **Configure** tab of your helm application.

    ![Figure 4: Update Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/update-chart.jpg)

2. Click **Refetch Charts**. All the latest charts are displayed in the **Helm Chart** drop-down box and all the latest versions of a chart will be displayed in the **Chart Version** drop-down box.

---

## Update Charts

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin or an Admin](../global-configurations/authorization/user-access.md#helm-apps-permissions) can update charts. 

{% endhint %}

When you update a Helm chart, the system actually deploys the selected latest version of a chart (e.g., `12.4.2`) in your environment, just like how you'd install the latest version of an app from the app store.

Follow the below instructions to update a Helm chart:

1. Navigate back to the **Configure** tab of your Helm application.

2. Select your preferred chart version from the **Chart Version** drop-down box.

    You can also compare the existing configured values of the previous chart version with the default values of the newer chart version by clicking the **Compare Values** button in the top-right corner of the page.

    ![Figure 5: Compare Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/compare-values.jpg)

3. Click **Update And Deploy**.

---

## Upgrade Charts

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin or an Admin](../global-configurations/authorization/user-access.md#helm-apps-permissions) can upgrade charts. 

{% endhint %}

If the chart you're already using is deprecated or for other business reasons you wish to move from one chart to another (e.g., `stable/mySQL` to `bitnami/mySQL`), consider upgrading your charts. 

Follow the below instructions to upgrade a Helm chart:

1. Navigate back to the **Configure** tab of your Helm application.

2. Select your preferred chart from the **Helm Chart** drop-down box.

    {% hint style="info" %}

    ### Note

    When you upgrade your helm chart, ensure that the values are compatible with the new chart.

    {% endhint %}

    ![Figure 6: Upgrade Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/upgrade-chart.jpg)

3. Click **Update And Deploy**. 

---

## Security Scan [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Enabling the **Security scan** toggle scans the image(s) in the chart for vulnerabilities and license risks. To know more about security scan, refer to [Vulnerability Scanning](../plugins/vulnerability-scanning.md).

---

## Disable Chart Source

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/authorization/user-access.md#helm-apps-permissions) can disable a chart source in the Chart Store. 

{% endhint %}

Disabling a Helm chart source (e.g., Bitnami) does not display all associated charts in the Chart Store. When you previously used charts from a particular chart source, but no longer want to use it, you can simply disable the chart source by following the instructions below:

1. Navigate to **Chart Store** → **Source**.

2. Disable the toggle next to your preferred chart source (e.g., Bitnami).

    ![Figure 7: Disable chart repository](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/disable-charts.jpg)

The chart source (e.g., Bitnami) will no longer be displayed in the **Chart Source** drop-down box, and all its associated charts will no longer be displayed in the **All Charts** section of the **Chart Store** page.

You can always enable the chart source again anytime by enabling the toggle next to the chart source.

---

## Delete Chart Source

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/authorization/user-access.md#helm-apps-permissions) can delete a chart source in Devtron. 

{% endhint %}

When you delete a chart source in Devtron, all associated charts will be removed from the Chart Store, and you will no longer be able to view or deploy them. You can consider deleting a chart source when you no longer have any applications running on its charts or when the chart repository is no longer relevant to your business needs.

{% hint style="danger" %}

### Disabling Chart Source vs Deleting Chart Source

Disabling charts only hides specific chart repositories and their associated charts from appearing on the Chart Store page. They are not removed from Devtron. However, deleting a chart source removes the chart repository or OCI registry from Devtron entirely, along with all its associated charts.

{% endhint %}

You can delete a chart source in the following two ways:

* [By deleting a chart repository](../global-configurations/chart-repo.md#delete-a-chart-repository)

* [By deleting an OCI registry](../global-configurations/container-registries.md#delete-an-oci-registry)

You cannot disable or delete the default charts provided by Devtron.

---

## Extras

### Preset Values

If you frequently deploy a particular chart, you can then predefine its configurations as a template, making it easier to deploy across environments. 

To predefine the configurations for a chart, follow the instructions below:

1. Click the **Preset Values** button. 

    ![Figure 8: Preset Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/configure-deploy.jpg)

2. Enter your preferred preset value name in the **Name** field. 

    ![Figure 9: Editing Preset Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/preset-values.jpg)

3. Select the chart version for which you'd like to create a preset value from the **Chart Version** drop-down box. 

4. Edit the chart values as per your needs. 

5. Click on the **Save Value** button. 

A preset value for the selected chart version is now created and will be displayed in the **Chart Values** drop-down box whenever you wish to deploy the same chart again.

---

## Example

### Deploying mySQL Helm Chart

#### Discover the mySQL Helm Chart in Chart Store

1. Navigate to **Chart Store**. 

    ![Figure 10: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/discover-chart.jpg) 

2. Enter `mySQL` in the search bar at the top-left corner of the **Chart Store** page.

3. Select `bitnami/mySQL` from the list of available charts.

#### Configure and Deploy the Chart

Once you have clicked on the `bitnami/mySQL`, follow the set of instructions below:

1. Read the **README.md** file to know more about the chart configurations. 

    ![Figure 11: Configure and Deploy Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/configure-deploy.jpg) 

2. Refer to the tables below and fill in the details:

    ![Figure 12: Configure Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/configure-values.jpg)

    | Key | Description |
    | :--- | :--- |
    | **App Name** | Enter the name of your application |
    | **Project** | Select your project |
    | **Environment** | Select the environment where you want to deploy the chart |
    | **Chart Version** | Select the chart version you prefer to deploy |
    | **Chart Value** | Select the chart value you prefer to use. Kindly refer to [Preset Values](#preset-values) |

    | Parameters | Description |
    | :--- | :--- |
    | `mysqlRootPassword` | Password for the root user. Ignored if existing secret is provided |
    | `mysqlDatabase` | Name of your MySQL database |
    | `mysqluser` | Username of new user to create |
    | `mysqlPassword` | Password for the new user. Ignored if existing secret is provided |  

3. Click **Deploy Chart** to deploy the chart.   

#### Check the Deployment Status

When you deploy the chart, you will be redirected to the **App Details** tab of the Helm application. 

![Figure 13: Deployment Status](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/application-status.jpg)

The **Application Status** should be `Healthy`, indicating that the application has been successfully deployed.

#### Extract the Service Name

Service names makes it easier to find, connect to, and interact with your application. To extract the service name, navigate to **K8s Resources** → **Networking** → **Service**. The service name(s) are displayed in the **Name** column along with the URL in the **URL** column. 

![Figure 14: Service Name](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/service-name.gif)