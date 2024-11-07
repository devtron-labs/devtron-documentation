# Show/Hide Argo CD App Listing

## Prerequisite
The cluster in which Argo CD apps exist should be added in **Global Configurations** → **Clusters and Environments**

---

## Steps

{% hint style="warning" %}
### Who Can Perform This Action?
Users need super-admin permission to view/enable/disable the ArgoCD listing.
{% endhint %}

{% embed url="https://www.youtube.com/watch?v=4KyYnsAEpqo" caption="Enabling External ArgoCD Listing" %}

1. Go to the **Resource Browser** of Devtron.

2. Select the cluster (in which your Argo CD app exists).

3. Type `ConfigMap` in the 'Jump to Kind' field.

4. Search for `dashboard-cm` using the available search bar and click it.

5. Click **Edit Live Manifest**.

6. Set the feature flag accordingly:
    * **`ENABLE_EXTERNAL_ARGO_CD: "true"`** - Use this to show the Argo CD App Listing
    * **`ENABLE_EXTERNAL_ARGO_CD: "false"`** - Use this to hide the Argo CD App Listing

7. Click **Apply Changes**.

8. Go back to the 'Jump to Kind' field and type `Pod`.

9. Search for `dashboard` pod and use the kebab menu (3 vertical dots) to delete the pod.

10. Go to **Applications** and refresh the page (the **ArgoCD Apps** tab will be visible if you enabled it in step 6).