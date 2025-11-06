# Application Summary

## Introduction

Devtron helps you to view your application summary in the form of [cards](#cards-overview) and [Application Metrics](#application-metrics). It also helps you perform [quick actions](#action-icons) and [manage the most widely used Kubernetes resources](app-resource-management.md) directly from the **App Details** page. 

![Figure 1: App Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/cards-highlighted.jpg) 

:::caution Who can perform this action?
Anyone with a `View Only` permission can view this page, but only those at the level of `Admin` (with specific app permissions) or above can take actions on this page. Refer to [User Permissions](../global-configurations/authorization/user-access.md) for more information. 

:::

Follow the below steps to access the **App Details** page: 

1. Navigate to **Applications** and choose your preferred application. 

2. Choose **App Details** and select the environment for which you'd like to see the application summary in the **Env** drop-down box. 

The icon next to the **Env** drop-down box denotes the application deployment method. It can be any of the following: 

* Deployed using Helm

* Deployed using ArgoCD

* Deployed using FluxCD

![Figure 2: Deployment Method and Manifest Status](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/dep-method-manifest-status.jpg)

Manifest status (whether they are in sync or not) is denoted by [this](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/manifest-status-icon.jpg) icon. When you click on this icon, the **Live and desired manifest comparison** page is displayed (read-only) allowing you to compare the manifests and view config drifts (if there are any). 

---
## Cards Overview

Devtron provides you a quick summary of your application via cards. Refer to the following table to know more about cards:

| **Card Name** |**Description**|
|:------------- |:--------------| 
| **Application Status** | Tells you the application status (e.g., `Healthy` or `Degraded`). The available application statuses in Devtron are: <br/><ul><li>Degraded</li><li>Healthy</li><li>Hibernating</li><li>Missing</li><li>Not Deployed</li><li>Progressing</li></ul> When you click **Details**, all the details about the resource kinds, their statuses, and the message (if any) are displayed. | 
| **Blackout Window** / **Maintenance Window** <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>| Tells you whether the application deployment is blocked or allowed for the chosen environment. This card also displays the upcoming blackout/maintenance window and the remaining time for the blackout/maintenance window to complete. Refer to [Deployment Window](../global-configurations/deployment-window.md) for more information. |
| **Chart Used** (available only for Helm apps) | Displays the chart used to deploy the application. When you hover over the (**?**) icon in the card, you can directly configure the YAML values by clicking the **Go to Configure** option. |
| **Deployed commit** (available only for Devtron apps) | Displays the commit ID of the deployed image. When you click **Details**, the commit ID, repository name, branch name, and the deployed image ID are displayed. |
| **Deployment Status** | Tells you the deployment status (e.g., `Succeeded` or `Failed`). The available deployment statuses in Devtron are: <br/><ul><li>Failed</li><li>Progressing</li><li>Succeeded</li><li>Timed Out</li><li>Triggered</li></ul> When you click **Details**, the complete deployment status, from when it was deployed by whom to the current status of it, is displayed. |
| **Security** (available only for Devtron and Helm apps) | Displays the following security scan results: <ul><li>Image Scan</li><li>Code Scan <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a></li><li>Manifest Scan <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a></li></ul>Refer to [Security Policies](../security-features/security-policies.md) for more information.|
| **Rollout Deployment Visibility** <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>| <ul><li>**Canary Strategy** - Displays the live progress of how many users are being redirected to the new release. Refer to [Canary Deployments](deployment-visibility.md#for-canary-deployments) for more information.</li><li>**Blue Green Strategy** - Displays the progress of the Blue Green deployment. You can [swap traffic](deployment-visibility.md#swap-traffic) or [skip and promote full](deployment-visibility.md#skip--promote-full) directly from this card as per your requirement. Refer to [Blue Green Deployments](deployment-visibility.md#for-blue-green-deployments) for more information.</li></ul>| 

---
## Action Icons

You can perform a variety of actions right from the **App Details** page using the following action icons:

### URLs

When you click the **URLs** icon, the **URLs** page is displayed with the [Ingress Host URL](../../reference/glossary.md#ingress-host-url) and the [Load Balancer URL](../../reference/glossary.md#load-balancer-url) (if available).

![Figure 3a: URLs icon](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/urls-apppage.jpg)

![Figure 3b: URLs Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/ingress-host-url1.jpg)

You can directly copy the URLs (Ingress and Load Balancer) from the **URLs** page instead of searching in the manifest. 

The Ingress Host URL will point to the load balancer of your application, and you can also view the service name with the load balancer details.

### Hibernate

:::info Note
* This functionality is available as **Hibernate/Unhibernate** icons in Devtron apps and as a **Scale Workloads** icon in Helm apps.

* When there is an ongoing blackout or maintenance window for the application, then the option to hibernate or unhibernate that app (**Scale Workloads**, in the case of a Helm app) will be restricted.

:::

The **Hibernate** icon (**Scale Workloads**, in the case of a Helm app) allows you to hibernate (to rest) your application when not in use by scaling down the pods to nearly zero in that selected environment (e.g., `QA`). The application will automatically unhibernate when you make a new deployment. 

However, you can manually unhibernate the application by clicking the **Unhibernate** icon. 

![Figure 4: Hibernate Your Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/hibernate.jpg)

### Restart Workloads 

:::info Note
* The **Restart Workloads** icon is available only for Devtron custom applications.

* When there is an ongoing blackout or maintenance window for the application, then the **Restart Workloads** icon will be restricted.

:::

When you are facing issues with your application (e.g., crashing of pods) or prefer to use a new configuration, you restart the workloads. When you click the **Restart Workloads** icon, the **Restart Workloads** page is displayed.

![Figure 5: Restart Workloads](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/restart-workloads.jpg)

When you select a workload and click **Restart Workloads**, all the pods for the selected workloads are restarted using the configured deployment strategy (e.g., `Rolling`).

### Rollback

:::info Note
* The **Rollback** icon is available only for Devtron custom applications.

* You will not be able to rollback your deployment during blackout window and outside maintenance window of the application.

:::

You can perform a rollback of your deployment directly from the **App Details** page. When you click the **Rollback** icon, the following page is displayed. 

![Figure 6: Rollback Your Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/rollback.jpg)

* Select an image from the available list of previously deployed images in that specific environment. 

:::info Note
When there is an active policy in place for an environment, and there are no approved images, then no images will be displayed in the **Rollback** page.

:::

* Select one of the following deployment configurations in the **Deploy** drop-down box:

    * Last Saved Config

    * Last Deployed Config

    * Config Deployed with Selected Image

* Review configuration differences (if any) by selecting the **Review** option. If there is any config difference, it will be highlighted in this section.

* Choose a deployment strategy in the **Rolling (Default)** drop-down box. 

* Click **Deploy**.

### Deploy

:::info Note
* The **Deploy** button is available only for Devtron custom applications. 

* When there is an ongoing blackout or maintenance window for the application, the **Deploy** button will be changed to **Deployment is Blocked** and you will not be able to deploy during this time period.

:::

Devtron helps you in deploying images directly from the **App Details** page. When you click the **Deploy** button, the following page is displayed. 

![Figure 7: Deploy Your Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/deploy.jpg)

Follow the below steps to deploy an image:

* Select an image from the available list of previously deployed images in that specific environment. 

* Select one of the following deployment configurations in the **Deploy** drop-down box:

    * Last Saved Config

    * Last Deployed Config

    * Config Deployed with Selected Image

* Review configuration difference (if any) by selecting the **Review** option. If there is any config difference, it will be highlighted in this section.

* Choose a deployment strategy in the **Rolling (Default)** drop-down box. 

* Click **Deploy**.

### Environment Configurations

:::info Note
The **Environment Configuration** icon is available only for Devtron custom applications. 

:::

You can quickly configure Deployment Templates, ConfigMaps and Secrets for the selected environment directly from the **App Details** page. When you click the **Go to Environment Config** icon, the following page is displayed. 

![Figure 8: Environment Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/env-config.jpg)

To configure enviroment specific Deployment Templates, ConfigMaps, Secrets, refer to [Environment Overrides](../creating-application/environment-overrides.md).

---
## External Links 

All your [external links configured](../../user-guide/global-configurations/external-links.md) in the **Configurations** tab are displayed in the **App Details** page. When you hover around an external link (e.g. `Grafana`), a description of the external link is displayed. To know more, refer to [External Links](../global-configurations/external-links.md).

![Figure 9: External Links](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/external-links/app-details-external-link.jpg)

:::info Note
If you enable `App admins can edit` in the **External Links** page, then only non super admins can view the selected links on the **App Details** page.

:::

---
## Application Metrics

Application metrics help you in evaluating the performance and efficiency of your application. The Application Metrics section can be enabled by enabling the checkbox **Show application metrics** while configuring the application. Refer to [Application Metrics](../creating-application/app-metrics.md) for more information.

![Figure 10: Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-metrics.jpg)

---
## Next Steps

Devtron also allows you to manage a few of your Kubernetes resource kinds from the **App Details** page. Refer to [App Resource Management](app-resource-management.md) to manage your Kubernetes resources. 

If you want to manage your **Canary** and **Blue-Green** deployments, refer to [Deployment Visibility & Actions](deployment-visibility.md).