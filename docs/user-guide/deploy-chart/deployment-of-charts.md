# Chart Operations

## Introduction

This document helps you perforing chart operations, such as deploying, updating, upgrading, disabling and deleting charts. 

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/authorization/user-access.md) can perform chart-related operations. 

{% endhint %}

---

## Prerequisites

* [Chart Repository](../global-configurations/chart-repo.md) added to Devtron

* [OCI-Compliant Registry](../global-configurations/container-registries.md) (e.g., Docker Hub)

---

## Configure and Deploy Charts

When you want to install your own helm chart or browse through available helm charts in Chart Store and set up services or tools, follow the instructions below:

1. Navigate to **Chart Store**. 

2. Enter your preferred chart name in the search bar at the top-left corner of the screen. 

3. Select your preferred chart.

    ![Figure 1: Discover a Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/configure-deploy.jpg)

    The **About** section provides a short description of the chart. The **README.MD** file contains the instructions, configurations and everything related to the configuration and deployment of the chart. The **Deployments** section contains the list of projects where the helm chart is deployed.

4. Click **Configure & Deploy**. Configuring a Helm chart gives you the flexibility to customize it to your needs instead of relying on the default values of the chart.
    
    If you frequently deploy a particular chart, you can then predefine the configurations for that chart as a template, making it easier to deploy across projects and environments. To set preset values for a chart, refer to [Preset Values](#preset-values).

    ![Figure 2: Configure & Deploy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploy-chart.jpg)

5. Refer to the table below and fill in the details:

    | Key | Description |
    | :--- | :--- |
    | **App Name** | Enter your application name|
    | **Project** |  Select the project where you want to deploy the chart |
    | **Deploy to Environment** | Select the environment where you want to deploy the chart |
    | **Chart Version** | Select the chart version you prefer to deploy|
    | **Chart Value** | Select the chart value you prefer to use. Kindly refer to [Preset Values](#preset-values) |

6. Click **Deploy Chart**.

Once you have deployed a chart, you will be redirected automatically to the **App Details** tab where the deployment status is shown. 

![Figure 3: Check Deployment Status](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/app-installation-success.jpg)

The application deployment could take a couple of minutes, after which the Application Status should be `Healthy`, indicating that the application has been successfully deployed.

---

## Refetch Charts

When you click on **Refetch Charts**, the system fetches the latest Helm charts (e.g., `stable/mySQL`, `bitnami/mySQL`) and their latest available versions (e.g., v1.0, v1.1) that include improvements, features, and fixes. You can then either update a chart version or upgrade the chart itself in your project or environment. 

To check the latest charts and chart versions, follow the instructions below:

1. Navigate to the **Configure** tab of your helm application.

    ![Figure 4: Update Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/update-chart.jpg)

2. Click **Refetch Charts**. All the latest charts are displayed in the **Helm Chart** drop-down box and all the latest versions of a chart will be displayed in the **Chart Version** drop-down box.

---

## Update Charts

When you update a Helm chart, the system actually deploys the selected latest version of a chart (e.g., `12.4.2`) in your project or environment, just like how you'd install the latest version of an app from the app store.

Follow the below instructions to update a Helm chart:

1. Navigate back to the **Configure** tab of your Helm application.

2. Select your preferred chart version from the **Chart Version** drop-down box.

    You can also compare the existing configured values of the previous chart version with the default values of the newer chart version by clicking the **Compare Values** button in the top-right corner of the page.

    ![Figure 5: Compare Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/compare-values.jpg)

3. Click **Update And Deploy**.

---

## Upgrade Charts

If the chart you're already using is deprecated or for other business reasons you wish to move from one chart to another (e.g., `stable/mySQL` to `bitnami/mySQL`), consider upgrading your charts. 

Follow the below instructions to upgrade a Helm chart:

1. Navigate back to the **Configure** tab of your Helm application.

2. Select your preferred chart from the **Helm Chart** drop-down box.

    When you upgrade your helm chart, ensure that the values are compatible with the new chart.

    ![Figure 6: Upgrade Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/upgrade-chart.jpg)

3. Click **Update And Deploy**. 

---

## Security Scan

Enabling the **Security scan** toggle scans the image(s) in the chart for vulnerabilities and license risks. To know more about security scan, refer to [Vulnerability Scanning](../plugins/vulnerability-scanning.md).

---

## Disable Chart Source
 
Disabling a Helm chart source (e.g., Bitnami) does not display all associated charts in the Chart Store. When you previously used charts from a particular chart source, but no longer want to use it, you can simply disable the chart source by following the instructions below:

1. Navigate to **Chart Store** → **Source**.

2. Disable the **Disable chart repository** toggle next to your preferred chart source (e.g., Bitnami).

    ![Figure 7: Disable chart repository](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/disable-charts.jpg)

The chart source (e.g., Bitnami) will no longer be displayed in the **Chart Store** drop-down box, and all its associated charts will no longer be displayed in the **All Charts** section of the **Chart Store** page.

You can always enable the chart source again anytime by enabling the **Enable chart repository** toggle next to the chart source.

---

## Delete Chart Source

When you delete a chart source in Devtron, all associated charts will be removed from the Chart Store, and you will no longer be able to view or deploy them. You can consider deleting a chart source when you no longer have any applications running on its charts or when the chart repository is no longer relevant to your business needs.

{% hint style="danger" %}

### Disabling Chart Source vs Deleting Chart Source

Disabling charts only hides specific chart repositories and their associated charts from appearing on the Chart Store page. They are not removed from Devtron. However, deleting a chart source removes the chart repository or OCI registry from Devtron entirely, along with all its associated charts.

{% endhint %}

You can delete a chart source in the following two ways:

* [By deleting a chart repository](#delete-a-chart-repository)

* [By deleting an OCI registry](#delete-an-oci-registry)

A Helm chart source can be deleted only if no active applications are running on any of its charts. If an application is using a Helm chart from the chart source, you will not be able to delete that chart source. Additionally, you cannot disable or delete the default charts provided by Devtron.

### Delete a Chart Repository

If you are using an chart repository as your chart source and prefer to delete it, follow the instructions below:

1. Navigate to **Global Configurations** → **Chart Repositories**. The **Chart Repository** page is displayed.

    ![Figure 8: Delete a Chart Repository](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/delete-chart-repos.gif)

2. Select your preferred chart repository. 

3. Click the **Delete** button. 

    The chart repository will be deleted and removed from the **Chart Store** page.

### Delete an OCI Registry

If you are using a OCI registry as your chart source and prefer to delete it, follow the instructions below:

1. Navigate to **Global Configurations** → **Container/OCI Registry**. The **Container/OCI Registry** page is displayed.

    ![Figure 9: Delete an OCI Registry](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/delete-oci-registry.jpg)

2. Select your preferred OCI registry. 

3. Click the **Delete** button. 

    The OCI registry will be deleted and removed from the **Chart Store** page.

---

## Extras

### Preset Values

To predefine the configurations for a chart, follow the instructions below:

1. Click the **Preset Values** button. 

    ![Figure 10: Preset Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/configure-deploy.jpg)

2. Enter your preferred preset value name in the **Name** field. 

    ![Figure 11: Editing Preset Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/preset-values.jpg)

3. Select the chart version for which you'd like to create a preset value from the **Chart Version** drop-down box. 

4. Edit the chart values as per your needs. 

5. Click on the **Save Value** button. 

A preset value for the selected chart version is now created and will be displayed in the **Chart Values** drop-down box whenever you wish to deploy the same chart again.

---

## Example

### Deploying mySQL Helm Chart

#### Discover the mySQL Helm Chart in Chart Store

1. Navigate to **Chart Store**. 

    ![Figure 12: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/discover-chart.jpg) 

2. Enter `mySQL` in the search bar at the top-left corner of the **Chart Store** page.

3. Select `bitnami/mySQL` from the list of available charts.

#### Configure and Deploy the Chart

Once you have clicked on the `bitnami/mySQL`, follow the set of instructions below:

1. Read the **README.md** file to know more about the chart configurations. 

    ![Figure 13: Configure and Deploy Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/configure-deploy.jpg) 

2. Refer to the tables below and fill in the details:

    ![Figure 14: Configure Values](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/configure-values.jpg)

    | Key | Description |
    | :--- | :--- |
    | `App Name` | Enter the name of your application |
    | `Project` | Select the project where you want to deploy the chart|
    | `Environment` | Select the environment where you want to deploy the chart |
    | `Chart Version` | Select the chart version you prefer to deploy |
    | `Chart Value` | Select the chart value you prefer to use. Kindly refer to [Preset Values](#preset-values) |

    | Parameters | Description |
    | :--- | :--- |
    | `mysqlRootPassword` | Password for the root user. Ignored if existing secret is provided |
    | `mysqlDatabase` | Name of your MySQL database |
    | `mysqluser` | Username of new user to create |
    | `mysqlPassword` | Password for the new user. Ignored if existing secret is provided |  

3. Click **Deploy Chart** to deploy the chart.   

#### Check the Deployment Status

When you deploy the chart, you will be redirected to the **App Details** tab of the Helm application. 

![Figure 15: Deployment Status](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/application-status.jpg)

The application deployment could take a couple of minutes, after which the **Application Status** should be `Healthy`, indicating that the application has been successfully deployed.

#### Extract the Service Name

To extract the service name, navigate to **K8s Resources** → **Networking** → **Service**. The service name(s) are displayed in the **Name** column along with the URL in the **URL** column. 

![Figure 16: Service Name](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/service-name.gif)