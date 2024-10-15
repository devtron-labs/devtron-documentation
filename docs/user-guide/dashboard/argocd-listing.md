# View ArgoCD App Listing

{% hint style="warning" %}
### Who Can Perform This Action?
Users need super-admin permission to view/enable/disable the ArgoCD listing.
{% endhint %}

## Preface

In Argo CD, a user manages one dashboard for one ArgoCD instance. Therefore, with multiple ArgoCD instances, the process becomes cumbersome for the user to manage several dashboards.

With Devtron, you get an entire Argo CD app listing in one place. This listing includes:
* Apps deployed using [GitOps](../reference/glossary.md#gitops) on Devtron
* Other Argo CD apps present in your cluster

![Figure 1: ArgoCD App List](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/argocd/app-details-argo.gif)

---

## Advantages

Devtron also bridges the gap for ArgoCD users by providing additional features as follows:

* **Resource Scanning**: You can scan for vulnerabilities using Devtron's [resource scanning](../user-guide/security-features.md#from-app-details) feature. [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

* **Single-pane View**: All Argo CD apps will show details such as their app status, environment, cluster, and namespace together in one dashboard. 

* **Feature-rich Options**: Clicking an Argo CD app will give you access to its logs, terminal, events, manifest, available resource kinds, pod restart log, and many more.

{% hint style="info" %}
### Additional References
[ArgoCD: Standalone Configuration vs Devtron Configuration](https://devtron.ai/blog/argocd-standalone-configuration-vs-devtron-configuration/#argocd-installation-and-configuration)
{% endhint %}

---

## Prerequisite
The cluster in which Argo CD apps exist should be added in **Global Configurations** → **Clusters and Environments**

---

## Feature Flag

> **`ENABLE_EXTERNAL_ARGO_CD: "true"`**

---

## Steps to Enable ArgoCD App Listing

{% embed url="https://www.youtube.com/watch?v=4KyYnsAEpqo" caption="Enabling External ArgoCD Listing" %}

1. Go to the **Resource Browser** of Devtron.

2. Select the cluster (in which your Argo CD app exists).

3. Type `ConfigMap` in the 'Jump to Kind' field.

4. Search for `dashboard-cm` using the available search bar and click it.

5. Click **Edit Live Manifest**.

6. Set the feature flag **ENABLE_EXTERNAL_ARGO_CD** to  **"true"**

7. Click **Apply Changes**.

8. Go back to the 'Jump to Kind' field and type `Pod`.

9. Search for `dashboard` pod and use the kebab menu (3 vertical dots) to delete the pod.

10. Go to **Applications** and refresh the page. A new tab named **ArgoCD Apps** will be visible.

11. Select the cluster(s) from the dropdown to view the Argo CD apps available in the chosen cluster(s).

    ![Figure 3: Cluster Selection for Argo CD Listing](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/argocd/argo-cluster-selection.jpg)