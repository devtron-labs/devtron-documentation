# Charts and Chart Store

## Introduction

Devtron makes it easier for you to populate your charts from multiple sources to the [chart store](./resources/glossary.md#chart-store). These sources are: 
* [Chart Repository](./chart-repo.md)
* [OCI Registry](./oci-registry.md#use-as-chart-repository)

![Figure 1: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/dashboard/charts-store-page.jpg)

### Prerequisites 

* Helm Chart(s)
* Chart Repository added to Devtron
* OCI-Compliant Registry (e.g. Docker Hub and [many more](./oci-registry.md#supported-registry-providers)) 


## Removing your Charts from the Chart Store

{% hint style="warning" %}
### Who Can Perform This Action?
You cannot remove a chart from the Chart Store if the source was a [chart repository](./chart-repo.md). Removal is possible only if the charts [come from OCI registry](./oci-registry.md#push-helm-packages).
{% endhint %}

1. Go to your OCI registry settings in Devtron.

2. In the **List of repositories** field, remove the unwanted chart repo.

    ![Figure 6: Removing a Chart Repo](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/dashboard/remove-chart-repo.gif)

3. Click **Update**.

The removed chart will no longer appear in the Chart Store.

{% hint style="info" %}
Deleting a chart repo from your OCI registry will not lead to the removal of chart from the Chart Store
{% endhint %}

A light alternative is to disable the chart source as shown below, but this doesn't imply the removal of a chart.

![Figure 7: Disabling a Chart Source](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/overview-of-charts/disable-chart-source-db.jpg)