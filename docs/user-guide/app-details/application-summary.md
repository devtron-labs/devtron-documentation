# Application Summary

## Introduction

Devtron helps you to view your application summary (Devtron, Helm, ArgoCD, or FluxCD) via [Cards](#cards-overview) and [Application metrics](#application-metrics). It also helps you perform [Quick actions](#action-buttons) and [Manage the most-widely used Kubernetes resources](app-resource-management.md) directly from the **App Details** page. 

![Figure 1: App Details]() 

{% hint style="warning" %}

### Who can perform this action?

Anyone with a `View Only` permission can view this page, but only from the level of `Admin` (with specific app permissions) or above can take actions in this page. Refer to [User Permissions](../global-configurations/authorization/user-access.md) for more information. 

{% endhint %}

Follow the below steps to access the **App Details** page: 

1. Navigate to **Applications** and choose your preferred application. 

2. Choose **App Details** and select the environment for which you'd like to see the application summary in the **Env** drop-down box. 

The icon next to the **Env** drop-down box denotes the deployment method with which the application is deployed. It can be any of the following: 

* Deployed using Helm

* Deployed using ArgoCD

* Deployed using FluxCD

![Figure 2: Deployment Method and Manifest Status]()

Statuses related to manifests (whether they are in sync or not) is denoted by this icon ![](). When you click on this icon, the **Live and desired manifest comparison** page is displayed (read-only) allowing you to compare your manifests and see config drifts, if there are any. 

---
## Cards Overview

Devtron provides you quick summary of your application via cards. Refer to the following table to know more about cards:

| **Card Name** |**Description**|
|:------------- |:--------------| 
| **Application Status** | Tells you the application status (e.g.,`Healthy` or `Degraded`). The available application statuses in Devtron are: <br><ul><li>Degraded</li><li>Healthy</li><li>Hibernating</li><li>Missing</li><li>Not Deployed</li><li>Progressing</li></ul> When you click **Details**, all the details about the resource kinds, their statuses, and the message (if any) are displayed in detail. | 
| **Blackout Window** | Tells you whether the application is blacked out (Blackout Window) or allowed only in specific environments (Maintenance Window). This card also displays the upcoming blackout/maintenance window and the remaining time for the blackout/maintenance window to complete. Refer to [Deployment Window](../global-configurations/deployment-window.md) for more information. |
| **Chart Used** (available only for Helm apps) | Displays the chart used to deploy the application. When you hover over the (**?**) icon in the card, you can directly configure the YAML values by clicking the **Go to Configure** option. |
| **Deployed commit** (available only for Devtron apps) | Displays the commit ID of the deployed image. When you click **Details**, the commit ID, repository name, branch name and the deployed image ID are displayed. |
| **Deployment Status** | Tells you the deployment status i.e., whether it is `Succeeded` or `Failed`. The available deployment statuses in Devtron are: <br><ul><li>Failed</li><li>Progressing</li><li>Succeeded</li><li>Timed Out</li><li>Triggered</li></ul> When you click **Details**, the complete deployment status from when it is deployed by whom to the current status of it are displayed. |
| **Security** (available only for Devtron and Helm apps) | Displays the security scan results of the deployed image. <ul><li>For OSS-users, this card will be available only when the `Vulnerability Scanning (Trivy)` module is installed from the Devtron Stack Manager in your Devtron instance. Refer to [Install Trivy Integration](../../user-guide/integrations/vulnerability-scanning/trivy.md#install-trivy-integration) for more information. </li> <li>For Enterprise-users, this card will be displayed by default.</li></ul> When you click **Details**, the security results are displayed in the **Security** page. Refer to [Security Policies](../security-features/security-policies.md) for more information.|

---
## Action Buttons

You can perform a variety of actions right from the **App Details** page using the following action buttons:

### URLs

When you click the **URLs** button, the **URLs** page is displayed with the [Ingress Host URL](../../reference/glossary.md#ingress-host-url) and the [Load Balancer URL](../../reference/glossary.md#load-balancer-url) (if available).

![Figure 3a: URLs Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/ingress-url-appdetails.jpg)

![Figure 3b: URLs Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/ingress-host-url1.jpg)

You can directly copy the URLs (Ingress and Load Balancer) from the **URLs** page instead of searching in the manifest. 

The Ingress Host URL will point to the load balancer of your application and you can also view the service name with the load balancer details.

### Hibernate

{% hint style="info" %}

### Note

* This functionality is available as **Hibernate/Un-Hibernate** buttons in Devtron apps and as **Scale Workloads** button in Helm apps.

* When there is an ongoing blackout or maintenance window for the application, then hibernation or un-hibernation (**Scale Workloads**, in the case of Helm app) of an application will be blocked.

{% endhint %}

The **Hibernate** button (**Scale Workloads**, in the case of Helm app) allows you to hibernate (to rest) your application when not in use, by scaling down the pods to nearly zero in that selected environment (e.g., `qa`). The application will automatically un-hibernate when you make a new deployment. 

However you can manually un-hibernate the application by clicking the **Un-hibernate** button. 

![Figure 4: Hibernate Your Application]()

### Restart Workloads 

{% hint style="info" %}

### Note

* The **Restart Workloads** button is available only for Devtron custom applications.

* When there is an ongoing blackout or maintenance window for the application, then the **Restart Workloads** button will be disabled.

{% endhint %}

When you are facing issues with your application (e.g., crashing of pods) or prefer to use a new configuration, you restart the workloads. When you click the **Restart Workloads** button, the **Restart Workloads** page is displayed.

![Figure 5: Restart Workloads]()

When you select a workload and click **Restart Workloads**, all the pods for the selected workloads are restarted using the configured deployment strategy (e.g., `Rolling`).

### Rollback

{% hint style="info" %}

### Note

* The **Rollback** button is available only for Devtron custom applications.

* When there is an ongoing blackout or maintenance window for the application, you will not be able to rollback your deployment.

{% endhint %}

You can perform a rollback of your deployment directly from the **App Details** page. When you click the **Rollback** button, the following page is displayed. 

![Figure 6: Rollback Your Deployment]()

* Select an image from the available list of previously deployed images in that specific environment. 

* Select one of the following deployment configurations in the **Deploy** drop-down box:

    * Last Saved Config

    * Last Deployed Config

    * Config Deployed with Selected Image

* Review configuration difference (if any) by selecting the **Review** option. If there is any config difference, it will be highlighted in this section.

* Choose a deployment strategy in the **Rolling (Default)** drop-down box. 

* Click **Deploy**.

### Swap Traffic 

{% hint style="info" %}

### Note

The **Swap Traffic** button is available only for Devtron custom applications. 

{% endhint %}

Swap Traffic helps you in redirecting the live traffic from one version of your application to another (e.g., `v1.2` to `v1.1`). When something goes wrong with a particular version (e.g., `v1.2`), and you want to immediately redirect the traffic to an older version of the same application (e.g., `v1.1`) without rolling back `v1.2`, you swap traffic.

The key difference between rolling back and swapping traffic is that, when you rollback, you rollback the entire application to its older version. Whereas when you swap traffic, you keep both the versions of the application (the current one and the older one), but just redirect the traffic. 

![Figure 7: Swap Traffic]()

Click **Swap Traffic** to redirect the live traffic of your application.

### Deploy

{% hint style="info" %}

### Note

* The **Deploy** button is available only for Devtron custom applications. 

* When there is an ongoing blackout or maintenance window for the application, the **Deploy** button will be changed to **Deployment is Blocked** and you will not be able to deploy during this time period.

{% endhint %}

Devtron helps you in deploying images directly from the **App Details** page. When you click the **Deploy** button, the following page is displayed. 

![Figure 8: Deploy Your Application]()

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

{% hint style="info" %}

### Note

The **Environment Configuration** button is available only for Devtron custom applications. 

{% endhint %}

You can quickly configure Deployment Templates, ConfigMaps and Secrets for the selected environment directly from the **App Details** page. When you click the **Go to Environment Config** button, the following page is displayed. 

![Figure 9: Environment Configurations]()

To configure enviroment specific deployment templates, configMaps, secrets, refer to [Environment Overrides](../creating-application/environment-overrides.md#how-to-add-environment-overrides).

---
## External Links 

All your [external links configured](../../user-guide/global-configurations/external-links.md) in the **Configurations** tab are displayed in the **App Details** page. When you hover around an external link (e.g. `Grafana`), a description of the external link is displayed. To know more, refer to [External Links](../global-configurations/external-links.md).

![Figure 10: External Links](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/external-links/app-details-external-link.jpg)

{% hint style="info" %}

### Note

If you enable `App admins can edit` in the **External Links** page, then only non super admins can view the selected links on the **App Details** page.

{% endhint %}

---
## Application Metrics

Application metrics helps you in evaluating the performance and efficiency of your application. The Application Metrics section can be enabled by enabling the checkbox **Show application metrics** while configuring the application. Refer to [Application Metrics](../creating-application/app-metrics.md) for more information.  

---
## Next Steps

Devtron also allows you to manage a few of your Kubernetes resource kinds from the **App Details** page. Refer to [App Resource Management](app-resource-management.md) to manage your Kubernetes resources. 