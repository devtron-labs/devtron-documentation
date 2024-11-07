# Charts and Chart Store

## Introduction

Devtron makes it easier for you to populate your charts from multiple sources to the [chart store](./resources/glossary.md#chart-store). These sources are: 
* [Chart Repository](../global-configurations/chart-repo.md)
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