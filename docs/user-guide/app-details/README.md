# App Details

## Introduction

The **App Details** page is a comprehensive dashboard that provides you a birds-eye view of your application. With the **App Details** page, you can: 

* See your application status (Devtron, Helm, ArgoCD, FluxCD)

* Scan vulnerabilities 

* View application metrics (e.g., CPU usage and memory usage)

* Manage a few of your Kubernetes resources directly from the dashboard

* Deploy your application

* Modify environment configurations 

* Rollback deployments and more

![Figure 1: "App Details" Page]()

The **App Details** page is categorized into the following two sections:

* [Application summary](application-summary.md) - Where you can view your application and deployment statuses, application metrics, swap traffic, scale workloads, deploy and more. 

* [Manage K8s resources](app-resource-management.md) - Where you can manage the logs, manifest, events of your K8s resources, and scan for vulnerabilities. 

![Figure 2: Two Sections of "App Details" Page]()

{% hint style="warning" %}

### Who can perform this action?

Anyone with a `View Only` permission can view this page, but only from the level of `Admin` (with specific app permissions) or above can take actions in this page. Refer to [User Permissions](../global-configurations/authorization/user-access.md) for more information. 

{% endhint %}

---

## Next Steps

| **What do you want to do** |**Navigate to**|
|:--------------------------- |:--------------| 
| View application summary and security details| [Cards Overview](application-summary.md#cards-overview)| 
| Monitor application metrics | [Application Metrics](application-summary.md#application-metrics)| 
| Rollback a deployment | [Rollback]()| 
| Manage K8s resources | [Resource Management](app-resource-management.md)| 
| Scan for vulnerabilities | [Check vulnerabilities](app-resource-management.md#check-vulnerabilities)| 