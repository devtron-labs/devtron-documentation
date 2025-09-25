# Chart Repository

## Introduction

A Chart repository is like a library where [Helm charts](../../reference/glossary.md#helm-chartspackages) are stored and shared. It provides a centralized place to store and distribute your Helm charts across environments and teams.

You can add one ore more chart repositories to Devtron. Once added, the charts from these repositories will be available in the **All Charts** section of the [Chart Store](../../user-guide/deploy-chart/README.md). This process may take a few minutes. 

By default, Devtron automatically includes a set of built-in chart repositories during installation.

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/authorization/user-access.md#grant-super-admin-permission) can add, update, delete chart repositories. 

{% endhint %}

---

## Add Chart Repository

To add a chart repository, follow the steps below:

1. Navigate to **Global Configurations** → **Chart Repositories**. 

2. Click **Add repository**.

<!-- **Note**: Only public chart repositories can be connected as of now via Devtron. -->

3. Provide below information in the following fields:

    ![Figure 1: Add a Chart Repository](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/chart-repo/add-chart-repo.jpg)

    | Fields | Description |
    | --- | --- |
    | **Name** | Provide a `Name` of your chart repository. This name is added as prefix to the name of the chart in the listing on the helm chart section of application. |
    | **URL** | This is the URL of your chart repository (e.g., `https://charts.bitnami.com/bitnami`)|

4. Click **Save**.

---

## Update a Chart Repository

To update a chart repository, follow the below steps: 

1. Navigate back to **Chart Repositories* page.

2. Select the repository you prefer to update.

    ![Figure 2: Update a Chart Repository](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/chart-repo/update-chart-repository.jpg)

3. Modify the repository as per your requirements.

{% hint style="info" %}

### Perform Dry Run

If you prefer to perform a dry run to validate the chart repository configurations, click **Validate**.

{% endhint %}

4. Click **Update**.

<!-- * You can enable or disable your chart repository. If you enable it, then you will be able to see the enabled chart in `All Charts` section of the [Chart Store](../deploy-chart/overview-of-charts.md). -->

---

## Delete a Chart Repository

If you are using an chart repository as your chart source and prefer to delete it, follow the instructions below:

1. Navigate back to **Chart Repositories**.

    ![Figure 3: Delete a Chart Repository](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/delete-chart-repos.gif)

2. Select your preferred chart repository. 

3. Click the **Delete** button. 

    The chart repository will be deleted and removed from the **Chart Store** page.