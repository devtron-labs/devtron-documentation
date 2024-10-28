# View FluxCD App Listing

{% hint style="warning" %}
### Who Can Perform This Action?
Users need super-admin permission to view/enable/disable the FluxCD listing.
{% endhint %}

## Preface

Flux CD doesn't have any official dashboard; however, Devtron supports the listing of your [Flux CD](https://fluxcd.io/) apps in one dashboard.

![Figure 1: FluxCD App List and Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-listing.jpg)

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

---

## Prerequisite

The cluster in which Flux CD apps exist should be added in **Global Configurations** → **Clusters and Environments**

---

## Steps to Enable FluxCD App Listing

1. Go to the **Resource Browser** of Devtron.

2. Select the cluster (in which your Argo CD app exists).

3. Type `ConfigMap` in the 'Jump to Kind' field.

4. Search for `dashboard-cm` using the available search bar and click it.

5. Click **Edit Live Manifest**.

6. Add the feature flag **`FEATURE_EXTERNAL_FLUX_CD_ENABLE: "true"`** in the Dashboard ConfigMap as shown below.

    ![Figure 2: Editing Dashboard ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/flux-feature-flag.jpg)

7. After successfully executing all the steps, a new tab named **FluxCD Apps** will be visible. Select the cluster(s) from the dropdown to view the Flux CD apps available in the chosen cluster(s).

    ![Figure 3: Selecting Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/cluster-selection.jpg)

    (Optional) Once you choose cluster(s), you may use the **Template Type** dropdown to further filter your Flux CD app listing based on its type, i.e., [Kustomization](https://fluxcd.io/flux/components/kustomize/kustomizations/) or [Helmrelease](https://fluxcd.io/flux/components/helm/helmreleases/).

8.  Click any Flux CD app to view its details as shown below.

    ![Figure 4: Flux App Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/app-details-flux.gif)