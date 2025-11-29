# Manage Environments

Environments allow you to structure your deployment stages inside Devtron by mapping logical stages like dev, QA, staging, or production to actual namespaces within your clusters. Once a cluster is added, you can create environments, define their type, attach labels, and assign categories for cleaner filtering. This page explains how to add, edit, and delete environments.

## Add Environment to a Cluster

:::caution Who Can Perform This Action?
Users need to have super-admin permission to add an environment to a cluster.
:::

After adding a cluster to Devtron ([existing Kubernetes cluster](./add-clusters.md#connect-your-existing-kubernetes-cluster), [Isolated cluster](./add-clusters.md#add-isolated-cluster-), or a [newly created cluster](./add-clusters.md#create-kubernetes-cluster-)), initially it has no environments.

1. Select the cluster to which you want to add an Environment and click **Add Environment**. Alternatively you can also hover over the cluster and click `+` icon (Add Environment icon); an **Add Environment** modal window appears.

  ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-add-environment-option.jpg)
  <center>Figure 23a: Adding an Environment</center>

  ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-click-add-environment.jpg)
  <center>Figure 23b: Clicking 'Add Environment'</center>

2. Fill the following details within the **Add Environment** modal window.

  | Field | Description |
  | :--- | :--- |
  | **Environment Name** | Enter a name for your environment. |
  | **Enter Namespace** | Enter a namespace corresponding to your environment.<br/>**Note**: If this namespace does not exist in your cluster, Devtron will create it. If it already exists, Devtron will map the environment to it. |
  | **Environment Type** | Select your environment type:<ul><li>`Production`</li></ul> <ul><li>`Non-production`</li></ul>Note: Devtron shows deployment metrics (DORA metrics) for environments tagged as `Production` only. |

  ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-add-env-fields.jpg)
  <center>Figure 24: Saving an Environment</center>

3. **Assign a Category to environment** <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a> - Devtron allows you to assign a category (for e.g. Prod, QA, Dev, or Stage) to your environments. This enables category-based filtering in the UI, allowing you to determine whether an application is deployed to Prod, QA, Dev, or Stage environment.<br/><br/>
 To assign a category to your environment, follow the steps below: 
   1. Select a category from the dropdown under **Assign Category** and click **Update**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-assign-category-env.jpg)
    <center>Figure 25: Assigning Category</center>

   2. The selected category will be assigned to the environment.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-assign-category-category-added-env.jpg)
    <center>Figure 26: Category Assigned</center>

 **Note:** Before assigning a category, you must first add the category. To add a category, refer to [Adding a Category](./manage-categories.md#add-category) section to learn more.

4. **Add/Edit labels to namespace** <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a> - You can attach labels to your specified namespace in the Kubernetes cluster. Using labels will help you filter and identify resources via CLI or other Kubernetes tools. [Click here](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) to know more about labels.

  ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/labels-namespace.gif)
  <center>Figure 27: Adding Labels to Namespace</center>

5. Click **Save**. Your new environment will be visible in your cluster as shown below.

  ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/added-env.jpg)
  <center>Figure 28: Newly Created Environment in the Cluster</center>

---

## Edit Environment

:::caution Who Can Perform This Action?
Users need to have super-admin permission to edit an environment in a cluster.
:::

You can also make edits to an existing environment if needed.

1. Navigate to **Environments** tab. 

2. Hover over the environment you wish to edit, and click the **edit** icon.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-edit-env.jpg)
<center>Figure 29: Editing Environment in the Cluster</center>

3. Edit the environment fields.

| Feature                              | Editable? |
| :----------------------------------- | :-------- |
| **Production/Non-Production Option** | ✅ Yes    |
| **Description**                      | ✅ Yes    |
| **Labels for Namespace**             | ✅ Yes    |
| **Assign a category**                | ✅ Yes    |
| **Environment Name**                 | ❌ No     |
| **Namespace Name**                   | ❌ No     |

4. Click **Update** to save your changes.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-update-env.jpg)
<center>Figure 30: Updating Environment in the Cluster</center>

---

## Delete Environment

:::caution Who Can Perform This Action?
Users need to have super-admin permission to delete an environment from a cluster.
:::

If an environment is no longer needed, you can delete it by following these steps:  

1. Navigate to **Environments** tab. 

2. Hover over the environment you wish to remove, and click the **delete** icon.

  ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-delete-env.jpg)
  <center>Figure 31: Deleting Environment</center>

:::caution Important  
Environment deletion is not allowed if any application has a CD pipeline corresponding to the environment. In such a case, go to [Workflow Editor](../../creating-application/workflow/README.md) and delete the deployment pipeline first, and then return to delete the environment. This action is irreversible, so make sure no critical applications or resources depend on the environment before deleting.
:::

2. A confirmation dialog will appear. Click **Delete** to permanently delete the environment.  

  ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-confirm-delete-env.jpg)
  <center>Figure 32: Confirming Environment Deletion</center>
