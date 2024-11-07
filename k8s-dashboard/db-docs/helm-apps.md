# Manage Helm Apps

The Devtron Dashboard displays the helm applications deployed to your cluster and lets you deploy your own helm charts or third-party charts (e.g. postgresql) using the [Chart Store](../deploy-chart/README.md).

## View Helm Apps

1. From the left pane, go to **Applications**.

2. Click the **Helm Apps** tab. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/dashboard/helm-app-list.jpg)

You can see the Helm Apps available in your cluster. If you have connected more than one cluster to Devtron, you can use the **Cluster** selection dropdown to view the respective Helm Apps in your other clusters.

---

## Deploy Helm Charts

### 1. Discover the Chart from Chart Store

* Select the `Charts` section from the left pane, you will be landed to the `Chart Store` page. 

* Search `nginx` or any other charts in search filter.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/search-chart.jpg)

* Click on chart and it will redirect you to `Chart Details` page where you can see a number of instances deployed by using the same chart.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/chart-details.jpg)

---

### 2. Configure the Chart

* You may refer the `README.md` attached to the chart to know more about the chart configurations.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/overview-of-charts/overview-of-charts-2.jpg)

* Click **Configure & Deploy** and enter the following details:

    | Key | Description |
    | :--- | :--- |
    | **App Name** | Unique name of the chart|
    | **Project** |  Select the project of the application |
    | **Deploy to Environment** | Environment in which you want to deploy the chart |
    | **Chart Version** | Shows all available versions of the chart. Select the version of the chart to be used. |
    | **Chart Value** | Shows the latest default value or you may [create a custom value](#create-a-custom-value) |

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/values-field.jpg)

* Once you choose a preferred chart version, chart value, and update the values.yaml using the editor, click **Deploy** to deploy the chart.

#### Create a Custom Value

* You can use the default values or create custom value by clicking on `Create Custom`.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/overview-of-charts/overview-of-charts-7.jpg)

* You can name your Custom Value, select the Chart Version and change the configurations in YAML file.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/overview-of-charts/overview-of-charts-8-2.jpg)

* Click on `Save Template` to save the configurations.


---

### 3. Check Deployment Status

After clicking the **Deploy** button, you will land on the **App Details** page that shows the status of the chart deployment.

The status of the chart should be `Healthy`. It might take a few seconds after initiating the deployment of the chart.
In case the status of the deployment shows `Degraded` or if takes a long time to get deployed, click **Details** in `Application Status` section on the same page or check the logs of the pods to debug the issue.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/chart-app-details.jpg)

1. Shows status of deployed chart.

2. Shows the controller service accounts being used.

3. In the **Configure** tab, you can update, upgrade, or delete your chart instance.

4. From the `Chart used` section you can go to the charts page where you can see all the running instances of this chart.

5. Click the **Deployment history** tab to view the deployment history of Helm application and values.yaml corresponding to the deployment.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/chart-deployment-history.jpg)

---

## Update or Upgrade Helm Chart

* For update, you can change its `Chart Version` or `values.yaml` and then click **Update And Deploy**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/update-chart.jpg)

* For upgrade, click on `Helm Chart` field, search a chart name, change its values corresponding, and click **Update And Deploy**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/upgrade-chart.jpg)

* After an update or upgrade, you will land on the **App Details** page where you can check the pods and service name.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/charts-status.jpg)

---

## 5. Delete Chart Instances

Clicking on `View Chart` in `Chart Used` section in the **App Details** page will redirect you to the `Chart Details` page where you can see the number of instances installed by that chart along with an option to delete those chart instances too.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/delete-chart-instance.jpg)




