# Manage Categories

Categories help you group and classify both clusters and environments based on your organization’s standards. Teams commonly use categories like prod, QA, dev, or stage for quick filtering and visual clarity across the Devtron UI. This page guides you through creating, updating, and deleting categories, along with the rules that govern naming and usage. 

## Add Category

Before assigning a category, you must first add the category. To add a category, follow the steps below:

1. Go to **Global Configurations** and click **Clusters and Environments**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/clusterenv/assign-category-global-config.jpg)
   <center>Figure 1: Navigating to Global Configurations</center>

2. Click **Manage Categories**, a modal window will open.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/clusterenv/assign-category-manage-categories.jpg)
   <center>Figure 2: Clicking Manage Categories</center>

3. Click **Add Category**, a new row will appear, enter the name and description of the new category.
  
:::info Note:
* The category name must be unique and cannot be changed once defined. It should be a minimum of 3 characters.
* It can contain alphanumeric characters, but cannot start with a number.
* The name should be in lowercase only.
:::

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/clusterenv/assign-category-add-category.jpg)
   <center>Figure 3: Adding More Categories</center>

5. Click **Update** and your categories will be added.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/clusterenv/assign-category-update.jpg)
   <center>Figure 4: Categories Added</center>


## Delete Category

To delete a category, follow the steps below:

1. Go to **Global Configurations** and click **Clusters and Environments**.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/clusterenv/assign-category-global-config.jpg)
   <center>Figure 5: Navigating to Global Configurations</center>

2. Click **Manage Categories**, a modal window will open.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/clusterenv/assign-category-manage-categories.jpg)
   <center>Figure 6: Clicking Manage Categories</center>

3. Select the `x` icon next to the categories you want to delete.

   **Note**: You cannot delete a category if it is assigned to a cluster or environment.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/clusterenv/assign-category-x-icon.jpg)
   <center>Figure 7: Clicking 'x' icon</center>

4. Click **Update** to delete the categories.
