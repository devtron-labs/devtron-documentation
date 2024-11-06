# FluxCD App Listing

{% hint style="warning" %}
### Who Can Perform This Action?
Users need super-admin permission to view/enable/disable the FluxCD listing.
{% endhint %}

## Preface

Flux CD doesn't have any official dashboard; however, Devtron supports the listing of your [Flux CD](https://fluxcd.io/) apps in one dashboard.

With Devtron, you get an entire Flux CD app listing in one place. This listing includes:
* Flux CD apps present in the cluster where Devtron is installed
* Flux CD apps present in other clusters you added to Devtron

---

## View FluxCD App Listing

In the **Flux CD Apps** tab, select the cluster(s) from the dropdown to view the Flux CD apps available in the chosen cluster(s).

![Figure 1: Selecting Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/cluster-selection.jpg)

(Optional) Once you choose cluster(s), you may use the **Template Type** dropdown to further filter your Flux CD app listing based on its type, i.e., [Kustomization](https://fluxcd.io/flux/components/kustomize/kustomizations/) or [Helmrelease](https://fluxcd.io/flux/components/helm/helmreleases/).

Click any Flux CD app to view its details as shown below.

![Figure 2: Flux App Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/app-details-flux.gif)

---

## Advantages

Devtron also bridges the gap for Flux CD users by providing additional features as follows:

* **Resource Scanning**: You can scan for vulnerabilities using Devtron's [resource scanning](../../user-guide/security-features.md#from-app-details) feature. [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

* **Single-pane View**: All Flux CD apps will show details such as their app status, environment, cluster, and namespace together in one dashboard. 

* **Feature-rich Options**: Clicking an Flux CD app will give you access to its logs, terminal, events, manifest, available resource kinds, pod restart log, and many more.

{% hint style="info" %}
### Additional References
[Visualize Argo CD and Flux CD Apps on a Single Dashboard](https://devtron.ai/blog/devtrons-september-2024-release-now-visualize-your-argo-cd-and-flux-cd-applications-on-a-single-dashboard/)
{% endhint %}