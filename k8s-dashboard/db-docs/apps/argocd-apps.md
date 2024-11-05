# View ArgoCD App Listing

{% hint style="warning" %}
### Who Can Perform This Action?
Users need super-admin permission to view/enable/disable the ArgoCD listing.
{% endhint %}

## Preface

In Argo CD, a user manages one dashboard for one ArgoCD instance. Therefore, with multiple ArgoCD instances, the process becomes cumbersome for the user to manage several dashboards.

With Devtron, you get an entire Argo CD app listing in one place. This listing includes:
* Apps deployed using [GitOps](../../reference/glossary.md#gitops) on Devtron
* Other Argo CD apps present in your cluster

![Figure 1: ArgoCD App List](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/argocd/app-details-argo.gif)

---

## Advantages

Devtron also bridges the gap for ArgoCD users by providing additional features as follows:

* **Resource Scanning**: You can scan for vulnerabilities using Devtron's [resource scanning](../../user-guide/security-features.md#from-app-details) feature. [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

* **Single-pane View**: All Argo CD apps will show details such as their app status, environment, cluster, and namespace together in one dashboard. 

* **Feature-rich Options**: Clicking an Argo CD app will give you access to its logs, terminal, events, manifest, available resource kinds, pod restart log, and many more.

{% hint style="info" %}
### Additional References
[ArgoCD: Standalone Configuration vs Devtron Configuration](https://devtron.ai/blog/argocd-standalone-configuration-vs-devtron-configuration/#argocd-installation-and-configuration)
{% endhint %}