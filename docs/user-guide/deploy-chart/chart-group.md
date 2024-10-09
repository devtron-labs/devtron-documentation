# Chart Group

## Introduction

Using the Chart Group feature of Devtron, you can group and deploy one or more Helm charts in a single click.

---

## 1. Create a Group 

1. Go to the **Chart Store** page and click **+ Create Group**.

    ![Figure 1: Creating a Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/create-group.jpg)

2. In the **Create Chart Group** window, give a name and description (optional) to your chart group, and then click **Create Group**.

    ![Figure 2: Adding Group Data](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/create-group-window.jpg)

Once you create a group, you can now select and add charts to it. 

---

## 2. Add Charts to the Group 

1. To add a chart to the group, click the `+` sign next to the chart you wish to add. 

    ![Figure 3: Adding Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/add-chart.jpg)

    You also can add multiple copies of the same chart in the chart group as your requirements.

2. Once you have finalized the charts for your group, click **Save**.

    ![Figure 4: Saving Chart Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/save-chart.jpg)

---

## 3. Bulk Deploy and Edit Option for Charts

1. By default, a chart group will show all the charts you added to it. However, you may choose to deploy only selected charts and deselect the rest from the chart group.

    ![Figure 5: Selecting Charts for Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/deploy-selected-charts.jpg)

2. In the **Deploy Selected Charts** window, select the project and environment where you wish to deploy the chart group. You may use the [Advanced Options](#advanced-options) if you wish to edit the chart configurations too.

    ![Figure 6: Deploying Selected Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/deploy-chart-group-window.jpg)

3. Click **Deploy** to initiate the deployment of the selected charts in the Chart Group.

    ![Figure 7: Deploying Chart Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/deploy-chart.jpg)

### Advanced Options

Before deploying your chart group, you may click **Advanced Options** to edit the chart configuration of any chart in the group. 

![Figure 8: Using Advanced Options](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/advanced-options.jpg)

{% hint style="warning" %}
If you selected specific charts for deployment, and then if you use **Advanced Options**, you may have to select the charts again and deselect the ones you don't wish to deploy.
{% endhint %}

![Figure 9: Editing Individual Chart Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/advanced-options-2.jpg)

You can edit the following fields and also the YAML file of the corresponding chart.

| Key | Description |
| :--- | :--- |
| **App name** | Name of the app |
| **Deploy to Environment** | Select the environment in which the chart has to be deployed |
| **Chart version** | Select the version of the chart to be used |
| **Values** | You can use a default value or custom value. Ensure the value that you select for the chart is compatible with the 'Chart Version' you selected. |

After changing the configurations, select your project and click **Deploy**

![Figure 10: Deploying Chart Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/project-selection.jpg)

---

## Extras

### Edit a Chart Group

You can rename a chart group, remove charts from it, or add new charts to the group. To edit a chart group, click it and use the **Edit** button.

{% embed url="https://www.youtube.com/watch?v=4bsxuUyRYTI" caption="Editing Chart Group in Devtron" %}

You may click **Group Detail** to view the charts added to the group and check their running instances. 


### Delete a Chart Group

To delete a chart group, click it and use the **Delete** button.

![Figure 11: Deleting a Chart Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/delete-chart-group.gif)

