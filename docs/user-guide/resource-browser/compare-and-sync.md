# Compare & Sync Clusters 

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

The Compare & Sync feature in Devtron allows you to: 

* Compare two different [clusters](../../reference/glossary.md#cluster)

* Create missing Kubernetes resources (e.g., pods, ConfigMaps, Secrets, etc.) 

* Match the manifests (if required)

Refer to [Use Cases](#use-cases) to know more on how this feature can help you. 

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/compare-sync-highlighted.jpg)
<center>Figure 1: Compare & Sync Feature</center>

:::caution Who Can Perform This Action?
Only a [Super-Admin](../global-configurations/authorization/user-access.md#grant-super-admin-permission) can compare and sync clusters.

:::

---

## Steps

1. Navigate to **Resource Browser**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/k8s-resource-browser.jpg)
    <center>Figure 2: Resource Browser</center>

2. Click the reference cluster (e.g., `default-cluster`) to compare against other clusters.

3. Click the **Compare & Sync** button. The **Compare & Sync Clusters** page is displayed.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/compare-sync-highlighted.jpg)
    <center>Figure 3: Compare & Sync Button</center>

    The **Compare & Sync Clusters** page is primarily divided into two halves. The left side of the page displays the resources of the reference cluster you previously selected (`default-cluster` in this case). The right side of the page displays the resources of the target cluster you want to compare against.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/compare-sync-home.jpg)
    <center>Figure 4: Compare & Sync Clusters Page</center>

4. Select the target cluster in the **Select Cluster** drop-down box (e.g., `playground-vcluster` in this case).

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/select-cluster-option.jpg)
    <center>Figure 5: Select the Cluster</center>

    Once you select the clusters that you want to compare, all the resources associated with those clusters are listed in the **Compare & Sync Clusters** page.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/resources-displayed.jpg)
    <center>Figure 6: Cluster Resources are Displayed</center>

:::info How to Identify Missing Resource(s)?
When the color of the resource is: 

* **Red** - The resource is not available in that particular cluster. 

* **Blue** - The resource is available in that particular cluster, but the [manifest](../../reference/glossary.md#manifest) may not be the same. It is recommended to compare the manifest once.

For instance, when a resource is displayed in blue in cluster A and in red in cluster B, it means that the resource available in cluster A is not available in cluster B.

:::

5. Click the filter available at the top left corner of the page. All the resource groups and resource kinds are displayed in the filter box. For example, when you select `ConfigMap` as a resource kind, all the available ConfigMaps in both clusters are displayed.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/resource-group-filterbox.jpg)
    <center>Figure 7: Resource Kind Filter</center>

6. Click the **View all** drop-down box. This filter allows you to filter the resources based on the following criteria:

    * `View all` - To display all resources from both clusters without any filters.

    * `Only matching` - To only display resources that exist in both clusters.

    * `Only non-matching` - To only display resources that are present in one cluster but not the other.

    * `View left join` - To display all resources from the reference cluster (left-hand side) and only matching resources from the target cluster (right-hand side).

    * `View right join` - To display all resources from the target cluster (right-hand side) and only matching resources from the reference cluster (left-hand side).

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/view-all-filterbox.jpg)
    <center>Figure 8: View All Filter</center>

:::caution Creating a Missing Resource?
Before creating a missing resource or comparing a manifest, it is very important to match the namespaces in both clusters. Otherwise, an error will be displayed. For example, if cluster A has a namespace `devtroncd` and cluster B does not have the same namespace, then you will get an error message while creating a missing resource.

:::

Follow the below steps to match the namespaces: 

1. Enter `Namespace` in the filter available at the top left corner of the **Compare & Sync Clusters** page. 

2. Compare the namespaces available in the reference cluster (left-hand side) against the namespaces available in the target cluster (right-hand side).

3. Select the namespace(s) for which you prefer to create missing resources for using the checkboxes. 

4. Click the **Create Resources** button. The namespaces will now be matched.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/sync-namespaces.gif)
    <center>Figure 9: Match Namespaces</center>

### Create Missing Resource(s)

Hover over the resource that you'd like to create in the target cluster and click the **Create Resource** option.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/create-resource.jpg)
    <center>Figure 10: Create Resource</center>

:::info Note
* To create missing resources in bulk, select the checkboxes against the resources or resource groups and click the **Create Resources** button. All the selected resources will be created in the target cluster.

* Even after creating missing resources, a few of them may not run as expected unless the dependencies required to run the resources correctly are also met. Therefore, it is recommended that you ensure all the necessary dependencies are taken care of while creating missing resources. 

:::

### Compare Manifest

1. Hover over the resource and click the **Compare manifest** option to compare the manifest of the resource in both clusters.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/compare-manifest.jpg)
    <center>Figure 11: Compare Manifest</center>

2. Click **Edit YAML**. 

3. Click the **Revert this chunk** option to enforce the values, if required, from the reference cluster to the target cluster.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/compare-sync/compare-manifest.gif)
    <center>Figure 12: Revert this Chunk</center>

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