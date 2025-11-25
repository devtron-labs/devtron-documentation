# Applying Labels and Comments

## Introduction

Typically in a CI pipeline, you [build container images](./triggering-ci.md), and the number of images gradually increases over a period of time. Devtron's image labels and comments feature helps you to mark and recall specific images from the repository by allowing you to add special instructions or notes to them. 

For example:
* You can label an image as `non-prod` to indicate that it is meant for 'Dev' or 'QA' environments, but not for production.
* Add `hotfix image only` label to indicate a one-time patch on production.
* Comments like `This image is buggy and shouldn't be used for deployment` to caution other users from deploying an unwanted image.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/image-tags/tag-and-comment.jpg)
<center>Figure 1: Labels and Comments</center>

Such labels and comments will be visible only within Devtron, and will not propagate to your [container registry](../../reference/glossary.md#containeroci-registry) (say Docker Hub), unlike custom image tag pattern. You may use it to simplify the management and [selection of container images](./triggering-cd.md#deploying-approved-image) for deployment.

:::caution 
Tagging labels and comments are supported only for images in workflows with at least one production deployment pipeline. In Devtron, you can go to **Global Configurations** → **Clusters & Environments** to identify a production environment by checking the 'Prod' label.
:::

---

## Adding Labels & Comments

:::caution Who Can Perform This Action?
Users need to have [Build & deploy permission](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and application) to add labels and comments.
:::

You can add labels and comments from the following pages:

* [From Build & Deploy](#from-build--deploy)
* [From Build History](#from-build-history)
* [From Deployment History](#from-deployment-history) (only after deployment)
* [From App Details](#from-app-details) (only after deployment)

:::caution 
You can add multiple labels to an image. but each label can be used only once 'per image, per application'. You may use it in an image of other application though. <br/>
Refer [Deleting Labels](#deleting-labels--comments) if you commit a mistake while adding labels.
:::
 
### From Build & Deploy

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/image-tags/tag-build.gif)
<center>Figure 2: Adding Labels and Comments - 'Build & Deploy' Page</center>

### From Build History

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/image-tags/tag-build-history.gif)
<center>Figure 3: Adding Labels and Comments - 'Build History' Page</center>

### From Deployment History

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/image-tags/tag-deployment-history.gif)
<center>Figure 4: Adding Labels and Comments - 'Deployment History' Page</center>

### From App Details

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/image-tags/tag-app-details.gif)
<center>Figure 5: Adding Labels and Comments - 'App Details' Page</center>

---

## Deleting Labels & Comments

### Soft-Delete Labels

:::caution Who Can Perform This Action?
Users need to have [Build & deploy permission](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and application) to perform soft deletion of labels.
:::

This action marks the label as invalid but doesn't delete the label. Therefore, you can recover it again but you cannot reuse it for other image (unless it's a different application).

1. Click the edit option.
2. Use the (-) icon to strike off the label. This icon is available on the left-side of a label.
3. Click **Save**. 

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/image-tags/soft-delete-tag.gif)
<center>Figure 6: Soft Deletion of a Label</center>

### Hard-Delete Labels

:::caution Who Can Perform This Action?
Users need to have super-admin permission to perform hard deletion of labels.
:::

This action deletes the label permanently and makes it available for reuse in same/other image of the given application.

1. Click the edit option.
2. Use the (x) icon to permanently remove the label. This icon is available on the right-side of a label.
3. Click **Save**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/image-tags/hard-delete-tag.gif)
<center>Figure 7: Hard Deletion of a Label</center>

### Removing Comments

:::caution Who Can Perform This Action?
Users need to have [Build & deploy permission](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and application) to remove comments.
:::

If you wish to permanently remove a comment, do the following:

1. Click the edit option.
2. Empty the content of an existing comment.
3. Click **Save**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/image-tags/remove-comment.gif)
<center>Figure 8: Removing a Comment</center>

---

## Extra Use Case

If you use [Application Groups](../application-groups.md) to deploy in bulk, image labels (if added) will be available as filters for you to quickly locate the container image.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/devtron-apps/build-and-deploy/image-tags/ag-image-filter.gif)
<center>Figure 9: Application Groups - Filter by Image Label</center>

This will be helpful in scenarios (say release package) where you wish to deploy multiple applications at once, and you have already labelled the intended images of the respective applications.

