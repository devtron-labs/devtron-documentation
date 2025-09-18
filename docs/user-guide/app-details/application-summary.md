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

You can perform a variety of actions right from the **App Details** page using the following action buttons:

### URLs

When you click the **URLs** button, the **URLs** page is displayed with the [Ingress Host URL](../../reference/glossary.md#ingress-host-url) and the [Load Balancer URL](../../reference/glossary.md#load-balancer-url) (if available).

![Figure a: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/ingress-url-appdetails.jpg)


![Figure b: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/ingress-host-url1.jpg)

You can directly copy the URLs (Ingress and Load Balancer) from the **URLs** page instead of searching in the manifest. 

The Ingress Host URL will point to the load balancer of your application and you can also view the service name with the load balancer details.

### Hibernate

{% hint style="info" %}

### Note

The **Hibernate** button is available only for Devtron custom applications. 

{% endhint %}

The **Hibernate** button allows you to hibernate (to rest) your application when not in use, by scaling down the pods to nearly zero in that selected environment (e.g., `qa`). The application will automatically un-hibernate when you make a new deployment. 

![Figure : Hibernate Your Application]()

### Restart Workloads 

{% hint style="info" %}

### Note

The **Restart Workloads** button is available only for Devtron custom applications. 

{% endhint %}

When you are facing issues with your application (e.g., crashing of pods) or prefer to use a new configuration, you restart the workloads. When you click the **Restart Workloads** button, the **Restart Workloads** page is displayed.

![Figure : Restart Workloads]()

When you select a workload and click **Restart Workloads**, all the pods for the selected workloads are restarted using the configured deployment strategy (e.g., `Rolling`).

### Rollback

{% hint style="info" %}

### Note

The **Rollback** button is available only for Devtron custom applications. 

{% endhint %}

You can perform a rollback of your deployment directly from the **App Details** page (for Blue-Green & Canary deployment strategies only). When you click the **Rollback** button, the following page is displayed. 

![Figure : Rollback Your Deployment]()

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

![Figure : Swap Traffic]()

Click **Swap Traffic** to redirect the live traffic of your application.

### Deploy

{% hint style="info" %}

### Note

The **Deploy** button is available only for Devtron custom applications. 

{% endhint %}

Devtron helps you in deploying images directly from the **App Details** page. When you click the **Deploy** button, the following page is displayed. 

![Figure : Deploy Your Application]()

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

![Figure : Environment Configurations]()

To configure enviroment specific deployment templates, configMaps, secrets, refer to [Environment Overrides](../creating-application/environment-overrides.md#how-to-add-environment-overrides).

### Scale Workloads

{% hint style="info" %}

### Note

The **Scale Workloads** button is available only for Helm, ArgoCD, and FluxCD applications. 

{% endhint %}

<!-- More information to be gathered and updated here -->

---
## External Links 

<!-- We already have a doc for this; check it out 

Why do I need external links here?

What can I do with it? 

-->
You can access your [configured external links](../../user-guide/global-configurations/external-links.md) directly from the **App Details** page. 

![Figure : External Links](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/external-links/app-details-external-link.jpg)

{% hint style="info" %}

### Note

If you enable `App admins can edit` in the **External Links** page, then only non super admins can view the selected links on the **App Details** page.

{% endhint %}

All the external links that you have configured in the **Configurations** tab are displayed in this section. When you hover around an external link (e.g. `Grafana`), a description of the external link is displayed. To know more, refer to [External Links](../global-configurations/external-links.md).

---
## Application Metrics
<!-- Provides an overview about application metrics; but links to the appropriate document-->

Application metrics helps you in evaluating the performance and efficiency of your application. The Application Metrics section can be enabled by enabling the checkbox **Show application metrics** while configuring the application. Refer to [Application Metrics](../creating-application/app-metrics.md) for more information.  

---
## Next Steps
<!-- Provides an overview about K8s resource management and links to the concerned doc (specifically prepared for App Details) -->
Devtron also allows you to manage a few of your Kubernetes resource kinds from the **App Details** page. Refer to [App Resource Management](app-resource-management.md) to manage your Kubernetes resources. 