# Enable Flux CD App Listing

## Prerequisite

The cluster in which Flux CD apps exist should be added in **Global Configurations** → **Clusters and Environments**

---

## Steps to Enable

{% hint style="warning" %}
### Who Can Perform This Action?
Users need super-admin permission to view/enable/disable the FluxCD listing.
{% endhint %}

1. Go to the **Resource Browser** of Devtron.

2. Select the cluster (in which your Argo CD app exists).

3. Type `ConfigMap` in the 'Jump to Kind' field.

4. Search for `dashboard-cm` using the available search bar and click it.

5. Click **Edit Live Manifest**.

6. Set the feature flag accordingly:
    * **`FEATURE_EXTERNAL_FLUX_CD_ENABLE: "true"`** - Use this to show the Flux CD App Listing
    * **`FEATURE_EXTERNAL_FLUX_CD_ENABLE: "false"`** - Use this to hide the Flux CD App Listing

    ![Figure 2: Editing Dashboard ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/fluxcd/flux-feature-flag.jpg)

7. Click **Apply Changes**.

8. Go back to the 'Jump to Kind' field and type `Pod`.

9. Search for `dashboard` pod and use the kebab menu (3 vertical dots) to delete the pod.

10. Go to **Applications** and refresh the page (the **FluxCD Apps** tab will be visible if you enabled it in step 6).