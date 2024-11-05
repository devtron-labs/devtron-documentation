# Enable Argo CD App Listing

## Prerequisite
The cluster in which Argo CD apps exist should be added in **Global Configurations** → **Clusters and Environments**

---

## Steps to Enable

{% embed url="https://www.youtube.com/watch?v=4KyYnsAEpqo" caption="Enabling External ArgoCD Listing" %}

1. Go to the **Resource Browser** of Devtron.

2. Select the cluster (in which your Argo CD app exists).

3. Type `ConfigMap` in the 'Jump to Kind' field.

4. Search for `dashboard-cm` using the available search bar and click it.

5. Click **Edit Live Manifest**.

6. Set the feature flag **`ENABLE_EXTERNAL_ARGO_CD: "true"`**

7. Click **Apply Changes**.

8. Go back to the 'Jump to Kind' field and type `Pod`.

9. Search for `dashboard` pod and use the kebab menu (3 vertical dots) to delete the pod.

10. Go to **Applications** and refresh the page. A new tab named **ArgoCD Apps** will be visible.

11. Select the cluster(s) from the dropdown to view the Argo CD apps available in the chosen cluster(s).

    ![Figure 3: Cluster Selection for Argo CD Listing](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/argocd/argo-cluster-selection.jpg)