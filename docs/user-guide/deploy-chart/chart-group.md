# Chart Groups

## Introduction

<<<<<<< HEAD
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

1. To add a chart to the group, click the `+` sign next to the chart you wish to add. You also can add multiple copies of the same chart in the chart group as per your requirements.

    ![Figure 3: Adding Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-group/add-chart.jpg)

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

<!-- {% hint style="warning" %}
If you selected specific charts for deployment, and then if you use **Advanced Options**, you may have to select the charts again and deselect the ones you don't wish to deploy.
{% endhint %} -->

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

=======
A Chart Group in Devtron is a collection of [Helm charts](../../reference/glossary.md#helm-chartspackages) grouped together (e.g., what a folder is to files) to help you create, manage, and deploy them easily.

When setting up a new environment or a microservice, or when your application requires multiple Helm charts, you can simply group the required charts into a chart group. You can then view, manage, and deploy related charts together in one place instead of searching and installing each one individually.

---

## Prerequisites

Ensure the [Build and Deploy (CI/CD)](../../user-guide/integrations/build-and-deploy-ci-cd.md) module is installed in your Devtron instance if you are an OSS user. Enterprise user can skip this step. 

---

## Create and Deploy a Chart Group

{% hint style="warning" %}

### Who Can Perform This Action?

* A user with the **Create** permission enabled for [Chart Groups](../global-configurations/authorization/user-access.md#chart-groups-permissions) can create a chart group. However, they will not be able to deploy it.  

* Only a [Super-Admin](../global-configurations/authorization/user-access.md#chart-groups-permissions) can create as well as deploy a chart group. 

{% endhint %}

To create a chart group, follow the instructions below:

1. Navigate to **Chart Store**.

2. Click the **Create Group** button. The **Create Chart Group** page is displayed. 

    ![Figure 1: Create Chart Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/create-chart-group.jpg)

3. Enter your preferred chart group name in the **Name** field. 

4. (Optional) Enter the chart group description in the **Description** field.

5. Click **Create Group** button.

6. Select your preferred charts from the list of charts available in the **Edit group** page. 

    ![Figure 2: Edit Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/edit-group.jpg)

7. Click **Save**. The chart group is now saved. 

8. Navigate back to the chart group page.

    ![Figure 3: Chart Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploy-to.jpg)

9. Click on the **Deploy to...** button. The **Deploy Selected Charts** screen is displayed.

    ![Figure 4: Deploy Selected Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploy-selected-charts.jpg)

10. Select the project in the **Project** drop-down box.

11. Select the environment where you want to deploy the charts in the **Deploy to Environment** drop-down box. 

12. Click **Deploy Chart** to deploy the charts. The deployment will be initiated.

    If you prefer to change the chart values in the `.yaml` file or change chart configurations, click **Advanced Options**. Refer to [Advanced Options](#advanced-options) for more information.

    ![Figure 5: Deployment Initiated](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deployment-initiated.jpg)

---

## Edit a Chart Group

{% hint style="warning" %}

### Who Can Perform This Action?

* A user with the **Edit** permission for the specific [Chart Group](../global-configurations/authorization/user-access.md#chart-groups-permissions) can edit that chart group. 

* A [Super-Admin](../global-configurations/authorization/user-access.md#chart-groups-permissions) can also edit a chart group. 

{% endhint %}

If you want to add/remove a chart to your existing chart group, or change the chart group name, you can edit the chart group. Follow the below instructions to edit a chart group:

1. Select your preferred chart group in the **Chart Store**.

    ![Figure 6: Edit a Chart Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploy-to.jpg)

2. Click the **Edit** button. The **Edit group** page is displayed. 

3. Add or remove charts based on your needs from the list of charts available in the **Edit group** page. 

4. Enter your new chart group name (if required) in the **Group name** field.

5. Click **Save** to save the changes. 

---

## Delete a Chart Group

{% hint style="warning" %}

### Who Can Perform This Action? 

Only a [Super-Admin](../global-configurations/authorization/user-access.md#chart-groups-permissions) or a user with the **Create** permission can delete a chart group. 

{% endhint %}

When you delete a chart group, only the chart group is deleted. Application deployed using that chart group remain unaffected. Follow the below instructions to delete a chart group. 

1. Select your preferred chart group in the **Chart Store**.

    ![Figure 7: Delete a Chart Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/delete-chart-group.gif)

2. Click the **Delete** button. A pop-up window will appear, asking for confirmation to delete the chart group.

---

## Extras

### Advanced Options

The **Advanced Options** page enables you to change the chart values, chart configurations, use preset values (if already configured) for your charts. 

![Figure 8: Advanced Options](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/advanced-options.jpg)

1. Enter your preferred application name in the **App name** field.

2. Select the environment where you want to deploy the charts in the **Deploy to Environment** drop-down box.

3. Select the chart version you'd like to use from the **Chart version** drop-down box. 

4. Select the chart values you'd like to use from the **Values** drop-down box. If you want to configure a preset value for your chart, or use a previously configured one, select **Preset values**. Refer to [Preset Values](deployment-of-charts.md/#preset-values) for more information.

5. Select the project in the **Project** drop-down box.

6. Click **Deploy** to deploy the charts. The deployment will be initiated.
>>>>>>> main
