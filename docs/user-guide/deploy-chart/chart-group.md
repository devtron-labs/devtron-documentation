# Chart Groups

## Introduction

A Chart Group in Devtron is a collection of [Helm charts](../../reference/glossary.md#helm-chartspackages) grouped together (e.g., what a folder is to files) to help you create, manage, and deploy them easily.

When setting up a new environment or a microservice, or when your application requires multiple Helm charts, you can simply group the required charts into a chart group. You can then view, manage, and deploy related charts together in one place instead of searching and installing each one individually.

---

## Prerequisites

Ensure the [Build and Deploy (CI/CD)](../../user-guide/integrations/build-and-deploy-ci-cd.md) module is installed in your Devtron instance if you are an OSS user. Enterprise user can skip this step. 

---

## Create and Deploy a Chart Group

:::caution Who Can Perform This Action?
* A user with the **Create** permission enabled for [Chart Groups](../global-configurations/authorization/user-access.md#chart-groups-permissions) can create a chart group. However, they will not be able to deploy it.  

* Only a [Super-Admin](../global-configurations/authorization/user-access.md#chart-groups-permissions) can create as well as deploy a chart group. 

:::

To create a chart group, follow the instructions below:

1. Navigate to **Chart Store**.

2. Click the **Create Group** button. The **Create Chart Group** page is displayed. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/create-chart-groups.jpg)
<center>Figure 1a: Create Chart Group</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/create-chart-groups-1.jpg)
<center>Figure 1b: Create Chart Group</center>

3. Enter your preferred chart group name in the **Name** field. 

4. (Optional) Enter the chart group description in the **Description** field.

5. Click **Create Group** button.

6. Select your preferred charts from the list of charts available in the **Edit group** page. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/select-charts.jpg)
<center>Figure 2: Edit Group</center>

7. Click **Save**. The chart group is now saved. 

8. Navigate back to the chart group page.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/deploy-to.jpg)
<center>Figure 3: Chart Group</center>

9. Click on the **Deploy to...** button. The **Deploy Selected Charts** screen is displayed.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/deploy-selected-charts.jpg)
<center>Figure 4a: Deploy Selected Charts</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/deploy-selected-charts-1.jpg)
<center>Figure 4b: Deploy Selected Charts</center>

10. Select the project in the **Project** drop-down box.

11. Select the environment where you want to deploy the charts in the **Deploy to Environment** drop-down box. 

12. Click **Deploy Chart** to deploy the charts. The deployment will be initiated.

    If you prefer to change the chart values in the `.yaml` file or change chart configurations, click **Advanced Options**. Refer to [Advanced Options](#advanced-options) for more information.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/deployment-initiated.jpg)
<center>Figure 5: Deployment Initiated</center>

---

## Edit a Chart Group

:::caution Who Can Perform This Action?
* A user with the **Edit** permission for the specific [Chart Group](../global-configurations/authorization/user-access.md#chart-groups-permissions) can edit that chart group. 

* A [Super-Admin](../global-configurations/authorization/user-access.md#chart-groups-permissions) can also edit a chart group. 

:::

If you want to add/remove a chart to your existing chart group, or change the chart group name, you can edit the chart group. Follow the below instructions to edit a chart group:

1. Select your preferred chart group in the **Chart Store**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/select-chart-group-edit.jpg)
<center>Figure 6: Select a Chart Group</center>

2. Click the **Edit** button. The **Edit group** page is displayed. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/chart-group-edit.jpg)
<center>Figure 7: Edit a Chart Group</center>

3. Add or remove charts based on your needs from the list of charts available in the **Edit group** page. 

4. Enter your new chart group name (if required) in the **Group name** field.

5. Click **Save** to save the changes. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/chart-group-save-edit.jpg)
<center>Figure 8: Save a Chart Group</center>

---

## Delete a Chart Group

:::caution Who Can Perform This Action? 
Only a [Super-Admin](../global-configurations/authorization/user-access.md#chart-groups-permissions) or a user with the **Create** permission can delete a chart group. 

:::

When you delete a chart group, only the chart group is deleted. Application deployed using that chart group remain unaffected. Follow the below instructions to delete a chart group. 

1. Select your preferred chart group in the **Chart Store**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/delete-chart-group.gif)
<center>Figure 9: Delete a Chart Group</center>

2. Click the **Delete** button. A pop-up window will appear, asking for confirmation to delete the chart group.

---

## Extras

### Advanced Options

The **Advanced Options** page enables you to change the chart values, chart configurations, use preset values (if already configured) for your charts. 

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/chart-store/chart-group/advanced-options.jpg)
<center>Figure 10: Advanced Options</center>

1. Enter your preferred application name in the **App name** field.

2. Select the environment where you want to deploy the charts in the **Deploy to Environment** drop-down box.

3. Select the chart version you'd like to use from the **Chart version** drop-down box. 

4. Select the chart values you'd like to use from the **Values** drop-down box. If you want to configure a preset value for your chart, or use a previously configured one, select **Preset values**. Refer to [Preset Values](deployment-of-charts.md#preset-values) for more information.

5. Select the project in the **Project** drop-down box.

6. Click **Deploy** to deploy the charts. The deployment will be initiated.