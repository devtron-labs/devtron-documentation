---
id: chart-repo
title: Chart Repository
sidebar_label: Chart Repository
slug: /user-guide/app-management/configurations/chart-repo
---

# Chart Repository

## Introduction

A Chart repository is like a library where [Helm charts](../../reference/glossary.md#helm-chartspackages) are stored and shared. It provides a centralized place to store and distribute your Helm charts across environments and teams.

You can add one ore more chart repositories to Devtron. Once added, the charts from these repositories will be available in the **All Charts** section of the [Chart Store](../../user-guide/deploy-chart/README.md). This process may take a few minutes. 

By default, Devtron automatically includes a set of built-in chart repositories during installation.

:::caution Who Can Perform This Action?
Only a [Super-Admin](../global-configurations/authorization/user-access.md#grant-super-admin-permission) can add, update, delete chart repositories. 

:::

---

## Add Chart Repository

To add a chart repository, follow the steps below:

1. Navigate to **Application Management** → **Configurations** → **Chart Repository**. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/configurations/chart-repo/chart-repo-nav.jpg)
    <center>Figure 1: Adding a Chart Repository</center>

2. Click **Add repository**.

<!-- **Note**: Only public chart repositories can be connected as of now via Devtron. -->

3. Provide below information in the following fields:

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/configurations/chart-repo/chart-repo-fields.jpg)
    <center>Figure 2: Entering Repository Details</center>

    | Fields | Description |
    | --- | --- |
    | **Name** | Provide a `Name` of your chart repository. This name is added as prefix to the name of the chart in the listing on the helm chart section of application. |
    | **URL** | This is the URL of your chart repository (e.g., `https://charts.bitnami.com/bitnami`)|

4. Click **Save**.

---

## Update a Chart Repository

To update a chart repository, follow the below steps: 

1. Navigate back to **Chart Repositories** page.

2. Select the repository you prefer to update.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/configurations/chart-repo/update-chart-repository.jpg)
    <center>Figure 3: Updating a Chart Repository</center>

3. Modify the repository as per your requirements.

:::info Perform Dry Run
If you prefer to perform a dry run to validate the chart repository configurations, click **Validate**.

:::

4. Click **Update**.

<!-- * You can enable or disable your chart repository. If you enable it, then you will be able to see the enabled chart in `All Charts` section of the [Chart Store](../deploy-chart/overview-of-charts.md). -->

---

## Delete a Chart Repository

If you are using an chart repository as your chart source and prefer to delete it, follow the instructions below:

1. Navigate back to **Chart Repositories**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/configurations/chart-repo/delete-chart-repos.gif)
    <center>Figure 4: Deleting a Chart Repository</center>

2. Select your preferred chart repository. 

3. Click the **Delete** button. 

    The chart repository will be deleted and removed from the **Chart Store** page.