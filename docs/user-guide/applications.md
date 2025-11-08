---
id: applications
title: Applications
---

# Applications

:::caution 
Configure [Global Configurations](./global-configurations/README.md) first before creating an application or cloning an existing application.
:::

## Introduction

The **Applications** page helps you create and manage your microservices, and it majorly consists of the following:

* [Application Listing](#application-listing)
* [Create Button](#create-button)
* [Other Options](#other-options)

### Application Listing

You can view the app name, its status, environment, namespace, and many more upfront.

![Figure 1: App Types](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/argocd/app-types.jpg)

### Create Button

You can use this to:
* [Create a Devtron app](./create-application.md)
* [Create a Helm app](./deploy-chart/deployment-of-charts.md)
* [Create a Job](./jobs/create-job.md)

### Other Options

There are additional options available for you:
* **Search and filters** to make it easier for you to find applications.
* **Export CSV** to download the data of Devtron apps (not supported for Helm apps and Argo CD apps).
* **Sync button** to refresh the app listing.