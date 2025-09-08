# Compare & Sync Clusters

## Introduction

The Compare & Sync feature in Devtron allows you to compare two different [clusters](../../reference/glossary.md#cluster) and sync the Kubernetes resources (e.g., pods, ConfigMaps, Secrets, etc.) across them. 

This feature helps you in cluster migrations without the need to recreate all applications and configurations, take a complete backup to ensure consistency across production environments, or sync specific resources such as [ConfigMaps](../../reference/glossary.md#configmaps) and [Secrets](../../reference/glossary.md#secrets) across multiple clusters.

![Figure 1: Compare & Sync Feature](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/compare-sync-highlighted.jpg)

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/user-access.md#assign-super-admin-permissions) can compare and sync clusters.

{% endhint %}

---

## Compare & Sync Clusters

1. Navigate to **Kubernetes Resource Browser**.

    ![Figure 2: Kubernetes Resource Browser ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/k8s-resource-browser.jpg)

2. Select the reference cluster (e.g., `default-cluster`) to compare against other clusters.

3. Select the **Compare & Sync** button. The **Compare & Sync Clusters** page is displayed.

    ![Figure 3: Compare & Sync Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/compare-sync-highlighted.jpg)

    The **Compare & Sync Clusters** page is primarily divided into two halves. The left side of the page displays the resources of the reference cluster you previously selected (`default-cluster` in this case). The right side of the page displays the resources of the cluster you want to compare against.

    ![Figure 4: Compare & Sync Clusters Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/compare-sync-home.jpg)

4. Select the target cluster that you want to compare with your reference cluster in the **Select Cluster** drop-down box (e.g., `playground-vcluster` in this case). The cluster resources are displayed on the right side of the page.

    ![Figure 5: Select the Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/select-cluster-option.jpg)

    Once you select the clusters that you want to compare, all the resources associated with those clusters are listed in the **Compare & Sync Clusters** page.

    ![Figure 6: Cluster Resources are Displayed](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/resources-displayed.jpg)

{% hint style="info" %}

### What Color Represents What?

When the color of the resource is: 

* **Red** - The resource is not available in that particular cluster. 

* **Blue** - The resource is available in that particular cluster, but the [manifest](../../reference/glossary.md#manifest) might differ. It is recommended to compare the manifest once.

For instance, when a resource is displayed in blue in cluster A and in red in cluster B, it means that the resource available in cluster A is not available in cluster B.

{% endhint %}

5. Select the filter available at the top left corner of the page. All the resource groups and resource kinds are displayed in the filter box. For example, when you select `ConfigMap` as a resource kind, all the available ConfigMaps in both clusters are displayed.

    ![Figure 7: Resource Kind Filter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/resource-group-filterbox.jpg)

6. Select the **View all** drop-down box. This filter allows you to filter the resources based on the following criteria:

    * `View all` - To display all resources from both clusters without any filters.

    * `Only matching` - To only display resources that exist in both clusters.

    * `Only non-matching` - To only display resources that are present in one cluster but not the other.

    * `View left join` - To display all resources from the reference cluster and only matching resources from the target cluster.

    * `View right join` - To display all resources from the target cluster and only matching resources from the reference cluster.

    ![Figure 8: View All Filter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/view-all-filterbox.jpg)

### Create Resource

Hover over the resource that you'd like to create in the target cluster and click the **Create Resource** option.

![Figure 9: Create Resource](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/create-resource.jpg)

{% hint style="info" %}

### Note

To create resources in bulk, select the check box(es) against the resource(s) or resource group(s) and click the **Create Resources** button. All the selected resources will be created in the target cluster.

{% endhint %}

### Compare Manifest

1. Hover over the resource and click the **Compare manifest** option to compare the manifest of the resource in both clusters.

    ![Figure 10: Compare Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/compare-manifest.jpg)

2. Click **Edit YAML**. 

3. Click the **Revert this chunk** option to enforce the values, if required, from the reference cluster to the target cluster.

    ![Figure 11: Revert this Chunk](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/revert-this-chunk.jpg)

4. Select **Apply Changes**.

When you apply the changes, the Kubernetes resources from your reference cluster are copied to the target cluster. 