# Application Summary

## Introduction
<!-- Introduction -->
Devtron helps you to view your application summary (Devtron, Helm, ArgoCD, or FluxCD) using:

* [Cards](#cards-overview) - Where you can see the application status, deployment status, deployed commit, security information and chart used (if it's a Helm application)

* [Application metrics](#application-metrics) - Where you can see the CPU usage, memory usage, throughput and latency related information

![Figure 1: App Details]() <!-- Image should clearly mention what are cards and what is app metrics -->
<!-- RBAC mentioned -->
{% hint style="warning" %}

### Who can perform this action?

Anyone with a `View Only` permission can view this page, but only from the level of `Admin` (with specific app permissions) or above can take actions in this page. Refer to [User Permissions](../global-configurations/authorization/user-access.md) for more information. 

{% endhint %}
<!-- Explaining environment drop-down, deployment method, configuration details -->
Navigate to **App Details** and select the environment for which you'd like to see the application summary in the **Env** drop-down box. 

The icon next to the **Env** drop-down box denotes the deployment method with which the application is deployed. It can be any of the following: 

* Deployed using Helm

* Deployed using ArgoCD

* Deployed using FluxCD

![Figure 2: Deployment Method]()

Statuses related to manifests (whether they are in sync or not) is denoted by this icon ![](). When you click on this icon, the **Live and desired manifest comparison** page is displayed (read-only) allowing you to compare your manifests and see config drifts, if there are any. 

![Figure 3: Live and Desired Manifest Comparison Page]()

---
## Cards Overview

<!-- Questions
    1. Blackout window (alerting-hit-trail) - what is it? 
    2. When will code scan, image scan, and kubernetes manifest be displayed? What should I do to get them? 
-->
Devtron provides you quick summary of your application via cards. Refer to the following table to know more about cards:
<!-- Also tell what each status represents + organize them alphabetically -->
| **Card Name** |**Description**|
|:------------- |:--------------| 
| **Application Status** | Tells you the application status i.e., whether it is `Healthy` or `Degraded`. The available application statuses in Devtron are: <br><ul><li>Healthy</li><li>Hibernating</li><li>Missing</li><li>Not Deployed</li><li>Progressing</li><li>Degraded</li></ul> When you click **Details**, all the details about the resource kinds, their statuses, and the message (if any) are displayed in detail. | 
| **Deployment Status** | Tells you the deployment status i.e., whether it is `Succeeded` or `Failed`. The available deployment statuses in Devtron are: <br><ul><li>Triggered</li><li>Succeeded</li><li>Failed</li><li>Timed Out</li></ul> When you click **Details**, the complete deployment status from when it is deployed by whom to the current status of it are displayed. |
| **Deployed commit** (available only for Devtron apps) | Displays the commit ID of the deployed image. When you click **Details**, the commit ID, repository name, branch name and the deployed image ID are displayed. |
| **Blackout Window** | |
| **Security** (available only for Devtron apps) | Displays the security scan results of the deployed image. <ul><li>For OSS-users, this card will be available only when the `Vulnerability Scanning (Trivy)` module is installed from the Devtron Stack Manager in your Devtron instance. Refer to [Install Trivy Integration](../../user-guide/integrations/vulnerability-scanning/trivy.md#install-trivy-integration) for more information. </li> <li>For Enterprise-users, this card will be displayed by default.</li></ul> When you click **Details**, the security results are displayed in the **Security** page under the following categories: <ul><li>Image Scan - Is displayed when (so and so) is enabled. </li><li>Code Scan - Is displayed when (so and so) is enabled. </li><li>Kubernetes Manifest - Is displayed when (so and so) is enabled. </li></ul> If you want to view or change the security policies, refer to [Security Policies](../security-features/security-policies.md).|
| **Chart Used** (available only for Helm apps) | Displays the chart used to deploy the application. When you hover over the (**?**) icon in the card, you can directly configure the YAML values by clicking the **Go to Configure** option. |
---
<!-- THE FOLLOWING SECTIONS ARE TO BE REVAMPED (WIP) -->
## Action Buttons
<!-- 
Covers:
    1. URL (avl. in all apps)
    2. Hybernate (avl. only Devtron app)
    3. Restart workloads (avl. only Devtron app)
    4. Rollback (avl. only Devtron app)
    5. Swap traffic (avl. only Devtron app)
    6. Deploy (avl. only Devtron app)
    7. Env configurations (avl. only Devtron app)
    8. Scale workloads (only in Helm, ArgoCD & FluxCD apps)
-->

### Ingress Host URL

You can view the Ingress Host URL and the Load Balancer URL on the **URLs** section on the **App Details**.

You can also copy the Ingress Host URL from the **URLs** instead of searching in the `Manifest`.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/ingress-url-appdetails.jpg)

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/ingress-host-url1.jpg)

1. Select **Applications** from the left navigation pane.
2. After selecting your configured application, select the **App Details**.
3. Click **URLs**.
4. You can view or copy the **URL** of the Ingress Host.

**Note**: 
* The Ingress Host URL will point to the load balancer of your application.
* You can also view the `Service` name with the load balancer detail.

---
## External Links 

<!-- We already have a doc for this; check it out 

Why do I need external links here?

What can I do with it? 

-->

### Access an External Link

The users can access the [configured external links](../../user-guide/global-configurations/external-links.md) on the **App Details** page.

1. Select **Applications** from the left navigation pane.
2. After selecting a configured application, select the **App Details** tab.
   
> **Note**: If you enable `App admins can edit` on the `External Links` page, then only non-super admin users can view the selected links on the `App-Details` page.

As shown in the screenshot, the external links appear on the `App-Details` level:

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/external-links/app-details-external-link.jpg)

3. You can hover around an external link (e.g. Grafana) to view the description.

The link opens in a new tab with the context you specified as env variables in the [Add an external link](./global-configurations/../../global-configurations/external-links.md) section.


### Manage External Links

On the `App Configuration` page, select `External Links` from the navigation pane.
You can see the configured external links which can be searched, edited or deleted.

You can also `Add Link` to add a new external link.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/external-links/app-config-external-link.jpg)

---
## Application Metrics
<!-- Provides an overview about application metrics; but links to the appropriate document-->

---
## Next Steps
<!-- Provides an overview about K8s resource management and links to the concerned doc (specifically prepared for App Details) -->