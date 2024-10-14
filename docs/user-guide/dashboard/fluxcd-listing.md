# View FluxCD App Listing

{% hint style="warning" %}
### Who Can Perform This Action?
Users need super-admin permission to view/enable/disable the FluxCD listing.
{% endhint %}

## Preface

Flux CD doesn't have any official dashboard; however, Devtron supports the listing of your [Flux CD](https://fluxcd.io/) apps in one dashboard. Here, the [advantages](#advantages) are same as those of [ArgoCD app listing](#view-argocd-app-listing).

![Figure 4: FluxCD App List and Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/fluxcd-listing.jpg)

---

## Prerequisite

The cluster in which Flux CD apps exist should be added in **Global Configurations** → **Clusters and Environments**

---

## Feature Flag

> **`FEATURE_EXTERNAL_FLUX_CD_ENABLE: "true"`**

---

## Steps to Enable FluxCD App Listing

Using Devtron's Resource Browser, add the [feature flag](#feature-flag-1) in the Dashboard ConfigMap as shown below.

![Figure 5: Editing Dashboard ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/flux-feature-flag.jpg)

After successfully executing all the steps, a new tab named **FluxCD Apps** will be visible. Select the cluster(s) from the dropdown to view the Flux CD apps available in the chosen cluster(s).

![Figure 6: Selecting Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/cluster-selection.jpg)

(Optional) Once you choose cluster(s), you may use the **Template Type** dropdown to further filter your Flux CD app listing based on its type, i.e., [Kustomization](https://fluxcd.io/flux/components/kustomize/kustomizations/) or [Helmrelease](https://fluxcd.io/flux/components/helm/helmreleases/).

Click any Flux CD app to view its details as shown below.

![Figure 7: Flux App Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/app-details-flux.gif)