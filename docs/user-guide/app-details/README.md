# App Details

## Introduction

The **App Details** page acts as a comprehensive dashboard that provides a bird's-eye view of your application (e.g., Devtron, Helm, ArgoCD, FluxCD). From the **App Details** page, you can: 

* View your application status 

* Scan for vulnerabilities 

* Monitor application metrics (e.g., CPU usage and memory usage)

* Manage the most widely used Kubernetes resources

* Deploy your application

* Modify environment configurations 

* Rollback deployments and much more

![Figure 1: "App Details" Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/app-details-home.jpg)

Consider the **App Details** page as the following two sections:

* [Application summary](application-summary.md) - Where you can view your application and deployment statuses, application metrics, swap traffic, scale workloads, deploy, and do more. 

* [Manage Kubernetes resources](app-resource-management.md) - Where you can manage the logs, manifest, and events of your Kubernetes resources and scan for vulnerabilities. 

:::caution Who can perform this action?
Anyone with a `View Only` permission can view this page, but only those at the level of `Admin` (with specific app permissions) or above can take actions on this page. 

Refer to [User Permissions](../global-configurations/authorization/user-access.md) for more information. 

:::

---

## Next Steps

| **What do you want to do** |**Navigate to**|
|:--------------------------- |:--------------| 
| View application summary and security details| [Cards Overview](application-summary.md)|
| Perform quick actions (e.g., Hibernate) | [Action Icons](application-summary.md#action-icons) | 
| Monitor application metrics | [Application Metrics](application-summary.md#application-metrics)| 
| Rollback a deployment | [Rollback](application-summary.md#rollback)| 
| Manage Kubernetes resources | [Resource Management](app-resource-management.md)| 
| Scan for vulnerabilities | [Check Vulnerabilities](app-resource-management.md#check-vulnerabilities)| 