# Chart Store

The **Chart Store** shows all the Helm Charts added to the Chart Repository/OCI registry connected to Devtron.

![Figure 1: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/overview-of-charts/chart-store-main.jpg)

Refer [Manage Helm Apps](../helm-apps.md) to know the process of deploy helm charts from the chart store.


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

