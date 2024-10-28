# Manage Helm Apps

The Devtron Dashboard displays the helm applications deployed to your cluster and lets you deploy your own helm charts or third-party charts (e.g. postgresql) using the [Chart Store](../deploy-chart/README.md).

## View Helm Apps

1. From the left pane, go to **Applications**.

2. Click the **Helm Apps** tab. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/dashboard/helm-app-list.jpg)

You can see the Helm Apps available in your cluster. If you have connected more than one cluster to Devtron, you can use the **Cluster** selection dropdown to view the respective Helm Apps in your other clusters.

---

## Deploy Helm Charts

### Discover the Chart from Chart Store

1. From the left pane, go to **Chart Store**. 

2. Let's say you wish to deploy the *ingress-nginx* helm chart, search `nginx` in search filter.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/search-chart.jpg)

3. Click on chart and it will redirect you to `Chart Details` page where you can see a number of instances deployed by using the same chart.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/chart-details.jpg)

### Configure the Chart

1. Refer the `README.md` attached to the chart to know more about the chart configurations.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/overview-of-charts/overview-of-charts-2.jpg)

2. Click **Configure & Deploy** and enter the following details:

    | Key | Description |
    | :--- | :--- |
    | **App Name** | Unique name of the chart|
    | **Project** |  Select the project of the application |
    | **Deploy to Environment** | Environment in which you want to deploy the chart |
    | **Chart Version** | Shows all available versions of the chart. Select the version of the chart to be used. |
    | **Chart Value** | Shows the latest default value or you may [create a custom value](#create-a-custom-value) |

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-of-charts/values-field.jpg)

3. You can choose your preferred chart version, chart value, and update the values.yaml using the editor on the right.

4. Click **Deploy** to deploy the chart.



