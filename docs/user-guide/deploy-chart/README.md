# Chart Store

## Introduction
 
A Helm chart is like a blueprint for deploying your application on Kubernetes. It contains all the necessary configuration files needed to define what and how your application should run. The **Chart Store** in Devtron offers a wide variety of helm charts from different sources for you to select and install based on your requirement. It helps you in managing and organizing charts in the same way an app store helps you manage apps. 

To perform any operations related to Helm charts, navigate to the **Chart Store**.

![Figure 1: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-store-without-chartgroup.jpg)

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/authorization/user-access.md) can deploy, update, upgrade, disable, or delete charts. 

{% endhint %}

---

## Prerequisites

* [Chart Repository](../global-configurations/chart-repo.md) added to Devtron

* [OCI-Compliant Registry](../global-configurations/container-registries.md) (e.g., Docker Hub)

---

## Fetching and Populating Charts

The **Chart Store** populates charts from three sources:

* The default charts that come with Devtron installation.

* The chart repositories added to the [Chart Repository](../global-configurations/chart-repo.md) section of the **Global Configurations** page.

* The OCI registry added to the [Container/OCI Registry](../global-configurations/container-registries.md) section of the **Global Configuration** page.

![Figure 2: Chart Sources](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/chart-sources.jpg)

When you add a chart repository and/or OCI registry, the sources along with the associated charts are automatically populated in the **Chart Store**. The chart sources are displayed in the **Chart Source** drop-down box, and the charts are displayed in the **All Charts** section. 

When you click the **Sources** button, the **Helm chart sources** section appears, displaying all helm chart sources. If you are unable to find your chart in the **All Charts** section, try performing a resync by clicking the **Resync** button available next to each chart source. 

You can add a chart repository or an OCI registry directly from this section by clicking the **Add** button. Clicking on **Add Chart Repository** takes you to the **Chart Repository** page in the **Global Configurations** page, and clicking on **Add OCI Registry** takes you to the **Container/OCI Registry** page in the **Global Configurations** page.

You can quickly search for a chart using the search bar at the top-left corner of the screen, select your preferred chart source(s) using the checkboxes in the **Chart Source** drop-down box, and display deprecated charts by enabling the checkbox in the **Filters** section, if required.

---

## Next Steps

The next step for you is to select and deploy a chart or create a chart group and deploy charts in bulk. Refer to:

* [Chart Operations](deployment-of-charts.md) - if you need to perform any chart related operations (deploy, update/upgrade, disable/delete). 

* [Chart Groups](chart-group.md) - if you need to create a chart group and bulk deploy them. 