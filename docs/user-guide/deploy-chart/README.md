# Chart Store

## Introduction
<<<<<<< HEAD

Devtron makes it easier for you to populate your charts from multiple sources to the [chart store](../../reference/glossary.md#chart-store). These sources are: 
* [Chart Respository](../global-configurations/chart-repo.md)
* [OCI Registry](../global-configurations/container-registries.md#use-as-chart-repository)

![Figure 1: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/overview-of-charts/chart-store-main.jpg)

### Prerequisites 

* Helm Chart(s)
* Chart Repository added to Devtron
* OCI-Compliant Registry (e.g. Docker Hub and [many more](../global-configurations/container-registries.md#supported-registry-providers)) with 

---

## Populating your Charts to the Chart Store

1. From the left sidebar, go to **Chart Store**.

2. You can find your chart(s) either by using the search bar or by selecting your chart source.

    ![Figure 2: Searching your Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-pull/chart-search.jpg)

You have successfully pulled your charts to the chart store.

![Figure 3: Uploaded Helm Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-pull/chart-list.jpg)

### Unable to find your Charts?

Deprecated charts won't show up in the Chart Store unless you enable the **Show deprecated charts** filter as shown below

![Figure 4: Checking Deprecated Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-pull/deprecated.jpg)

Or, you may try performing a chart resync as shown below:

![Figure 5: Performing a Resync](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-pull/chart-sync.jpg)

---


## Removing your Charts from the Chart Store

{% hint style="warning" %}
### Who Can Perform This Action?
You cannot remove a chart from the Chart Store if the source was a [chart repository](../global-configurations/chart-repo.md). Removal is possible only if the charts [come from OCI registry](../global-configurations/container-registries.md#push-helm-packages).
{% endhint %}

1. Go to your OCI registry settings in Devtron.

2. In the **List of repositories** field, remove the unwanted chart repo.

    ![Figure 6: Removing a Chart Repo](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-pull/remove-chart-repo.jpg)

3. Click **Update**.

The removed chart will no longer appear in the Chart Store.

{% hint style="info" %}
Deleting a chart repo from your OCI registry will not lead to the removal of chart from the Chart Store
{% endhint %}

A light alternative is to disable the chart source as shown below, but this doesn't imply the removal of a chart.

![Figure 7: Disabling a Chart Source](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/overview-of-charts/disable-chart-source.jpg)
=======
 
A [Helm Chart](../../reference/glossary.md#helm-chartspackages) is like a blueprint for deploying your application on Kubernetes. It contains all the necessary configuration files needed to define what and how your application should run. The **Chart Store** in Devtron offers a wide variety of helm charts from different sources for you to select and install based on your requirement. It helps you in managing and organizing charts in the same way an app store helps you manage apps. 

Navigate to the **Chart Store**.

![Figure 1: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-store-without-chartgroup.jpg)

---

## Fetch and Populate Charts

The **Chart Store** populates charts from two sources:

* The chart repositories added to the [Chart Repository](../global-configurations/chart-repo.md) section of the **Global Configurations** page.

* The OCI registry (only if **Use as chart repository** checkbox is enabled) added to the [Container/OCI Registry](../global-configurations/container-registries.md) section of the **Global Configurations** page.

![Figure 2: Charts and Chart Sources](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/charts-chartsource.jpg)

When you add a chart repository and/or an OCI registry, the sources along with the associated charts are automatically populated in the **Chart Store**. The chart sources are displayed in the **Chart Source** drop-down box, and the charts are displayed in the **All Charts** section. 

---

## Add a Chart Source

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super Admin](../global-configurations/user-access.md#assign-super-admin-permissions) can add a chart source. The **Source** button in the **Chart Store** page is visible only to Super Admins.

{% endhint %}

To add a chart repository or an OCI registry as a chart source, follow the instructions below:

1. Navigate to **Chart Store** → **Sources**. The **Helm chart sources** section appears, displaying all helm chart sources.

2. Click the **Add** button. 

    ![Figure 3: Chart Sources](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-sources.jpg)

3. Click on **Add Chart Repository** . It will take you to the [Chart Repositories](../global-configurations/chart-repo.md#add-chart-repository) page in the **Global Configurations** page.

4. Click on **Add OCI Registry**. It will take you to the [Container/OCI Registry](../global-configurations/container-registries.md#add-container-registry) page in the **Global Configurations**.

---

## Search for a Chart

To quickly search for a chart, perform any of the following actions:

* Navigate to the search bar at the top-left corner of the screen. Enter the chart name you're looking for and press Enter. The chart will be displayed in the All Charts section.

    ![Figure 4: Search Charts](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/search-charts.jpg)

* Select your preferred chart source(s) using the checkboxes in the **Chart Source** drop-down box. The charts associated with that chart source will be displayed in the All Charts section.

{% hint style="info" %}

### Unable to Find Your Chart?

Try performing a resync by clicking the **Resync** button next to each chart source. If the chart is still not displayed, it might be deprecated. Enable the **Show deprecated charts** checkbox in the Filters section. All the deprecated charts will then be displayed in the All Charts section.

{% endhint %}

---

## Next Steps

Refer to:

* [Deploy Charts](deployment-of-charts.md) - if you need to deploy, update, upgrade, disable, or delete charts.

* [Chart Groups](chart-group.md) - if you need to create a chart group and bulk deploy them.
>>>>>>> main
