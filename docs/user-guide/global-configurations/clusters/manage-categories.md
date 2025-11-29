# Manage Categories

Categories help you group and classify both clusters and environments based on your organization’s standards. Teams commonly use categories like prod, QA, dev, or stage for quick filtering and visual clarity across the Devtron UI. This page guides you through creating, updating, and deleting categories, along with the rules that govern naming and usage. 

## Add Category

Before assigning a category, you must first add the category. To add a category, follow the steps below:

1. Go to **Global Configurations**. 

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-global-config.jpg)
   <center>Figure 33: Navigating to Global Configurations</center>

2. Select **Clusters and Environments** and click **Manage Categories**, a modal window will open.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-manage-categories.jpg)
   <center>Figure 34: Clicking Manage Categories</center>

3. Enter the name of the category in the **CATEGORIES** field and provide a description in the **DESCRIPTION** field.
  
:::info Note:
* The category name must be unique and cannot be changed once defined. It should be a minimum of 3 characters.
* It can contain alphanumeric characters, but cannot start with a number.
* The name should be in lowercase only.
:::

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-add.jpg)
   <center>Figure 35: Adding Category</center>

4. If you wish to add more categories, click **Add Category**, a new row will appear, enter the name and description of the new category.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-add-category.jpg)
   <center>Figure 36: Adding More Categories</center>

5. Click **Update** and your categories will be added.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-update.jpg)
   <center>Figure 37: Categories Added</center>


## Delete Category

To delete a category, follow the steps below:

1. Go to **Global Configurations**. 

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-global-config.jpg)
   <center>Figure 38: Navigating to Global Configurations</center>

2. Select **Clusters and Environments** and click **Manage Categories**, a modal window will open.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-manage-categories.jpg)
   <center>Figure 39: Clicking Manage Categories</center>

3. Select the `x` icon next to the categories you want to delete.

   **Note**: You cannot delete a category if it is assigned to a cluster or environment.

   ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-x-icon.jpg)
   <center>Figure 40: Clicking 'x' icon</center>

4. Click **Update** to delete the categories.
