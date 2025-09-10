# Compare & Sync Clusters 

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The Compare & Sync feature in Devtron allows you to: 

* Compare two different [clusters](../../reference/glossary.md#cluster)

* Create missing Kubernetes resources (e.g., pods, ConfigMaps, Secrets, etc.) 

* Match the manifests (if required)

Refer to [Use Cases](#use-cases) to know more on how this feature can help you. 

![Figure 1: Compare & Sync Feature](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/compare-sync-highlighted.jpg)

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/authorization/user-access.md#grant-super-admin-permission) can compare and sync clusters.

{% endhint %}

---

## Steps

1. Navigate to **Resource Browser**.

    ![Figure 2: Resource Browser](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/k8s-resource-browser.jpg)

2. Click the reference cluster (e.g., `default-cluster`) to compare against other clusters.

3. Click the **Compare & Sync** button. The **Compare & Sync Clusters** page is displayed.

    ![Figure 3: Compare & Sync Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/compare-sync-highlighted.jpg)

    The **Compare & Sync Clusters** page is primarily divided into two halves. The left side of the page displays the resources of the reference cluster you previously selected (`default-cluster` in this case). The right side of the page displays the resources of the target cluster you want to compare against.

    ![Figure 4: Compare & Sync Clusters Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/compare-sync-home.jpg)

4. Select the target cluster in the **Select Cluster** drop-down box (e.g., `playground-vcluster` in this case).

    ![Figure 5: Select the Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/select-cluster-option.jpg)

    Once you select the clusters that you want to compare, all the resources associated with those clusters are listed in the **Compare & Sync Clusters** page.

    ![Figure 6: Cluster Resources are Displayed](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/resources-displayed.jpg)

{% hint style="info" %}

### How to Identify Missing Resource(s)?

When the color of the resource is: 

* **Red** - The resource is not available in that particular cluster. 

* **Blue** - The resource is available in that particular cluster, but the [manifest](../../reference/glossary.md#manifest) may not be the same. It is recommended to compare the manifest once.

For instance, when a resource is displayed in blue in cluster A and in red in cluster B, it means that the resource available in cluster A is not available in cluster B.

{% endhint %}

5. Click the filter available at the top left corner of the page. All the resource groups and resource kinds are displayed in the filter box. For example, when you select `ConfigMap` as a resource kind, all the available ConfigMaps in both clusters are displayed.

    ![Figure 7: Resource Kind Filter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/resource-group-filterbox.jpg)

6. Click the **View all** drop-down box. This filter allows you to filter the resources based on the following criteria:

    * `View all` - To display all resources from both clusters without any filters.

    * `Only matching` - To only display resources that exist in both clusters.

    * `Only non-matching` - To only display resources that are present in one cluster but not the other.

    * `View left join` - To display all resources from the reference cluster (left-hand side) and only matching resources from the target cluster (right-hand side).

    * `View right join` - To display all resources from the target cluster (right-hand side) and only matching resources from the reference cluster (left-hand side).

    ![Figure 8: View All Filter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/view-all-filterbox.jpg)

{% hint style="warning" %}

### Creating a Missing Resource?

Before creating a missing resource or comparing a manifest, it is very important to match the namespaces in both clusters. Otherwise, an error will be displayed. For example, if cluster A has a namespace `devtroncd` and cluster B does not have the same namespace, then you will get an error message while creating a missing resource.

{% endhint %}

Follow the below steps to match the namespaces: 

1. Enter `Namespace` in the filter available at the top left corner of the **Compare & Sync Clusters** page. 

2. Compare the namespaces available in the reference cluster (left-hand side) against the namespaces available in the target cluster (right-hand side).

3. Select the namespace(s) for which you prefer to create missing resources for using the checkboxes. 

4. Click the **Create Resources** button. The namespaces will now be matched.

    ![Figure 9: Match Namespaces](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/sync-namespaces.gif)

### Create Missing Resource(s)

Hover over the resource that you'd like to create in the target cluster and click the **Create Resource** option.

![Figure 10: Create Resource](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/create-resource.jpg)

{% hint style="info" %}

### Note

* To create missing resources in bulk, select the checkboxes against the resources or resource groups and click the **Create Resources** button. All the selected resources will be created in the target cluster.

* Even after creating missing resources, a few of them may not run as expected unless the dependencies required to run the resources correctly are also met. Therefore, it is recommended that you ensure all the necessary dependencies are taken care of while creating missing resources. 

{% endhint %}

### Compare Manifest

1. Hover over the resource and click the **Compare manifest** option to compare the manifest of the resource in both clusters.

    ![Figure 11: Compare Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/compare-manifest.jpg)

2. Click **Edit YAML**. 

3. Click the **Revert this chunk** option to enforce the values, if required, from the reference cluster to the target cluster.

    ![Figure 12: Revert this Chunk](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/compare-manifest.gif)

4. Click **Apply Changes**.

When you apply the changes, the Kubernetes resources from your reference cluster are copied to the target cluster. However, you can also make changes bidirectionally i.e., from the target cluster to the reference cluster. You can do so by copy pasting the values from one resource to another. 

---

## Use Cases

The following table highlights the use cases which the Compare and Sync Clusters feature:

| **What you can do** | **How it helps you** |
|:--- |:--- |
| **Backup Clusters**| Create backup clusters for disaster recovery (e.g., cluster failure) |
| **Compare Resources** | Compare and spot missing resources across clusters |
| **Create Missing Resources** | Create and sync missing resources such as [ConfigMaps](../../reference/glossary.md#configmaps) and [Secrets](../../reference/glossary.md#secrets) across multiple clusters |
| **Match Manifest** | Compare the resource manifest and match them, if required |