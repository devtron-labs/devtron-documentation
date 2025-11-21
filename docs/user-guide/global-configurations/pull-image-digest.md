---
id: pull-image-digest
title: Pull Image Digest
sidebar_label: Pull Image Digest
slug: /user-guide/app-management/policies/pull-image-digest
---

# Pull Image Digest

## Introduction

Devtron offers the option to pull container images using digest. Refer [CD Pipeline - Image Digest](../creating-application/workflow/cd-pipeline.md#pull-container-image-with-image-digest) to know the purpose it serves. 

Though it can be enabled by an application-admin for a given CD Pipeline, Devtron also allows super-admins to enable pull image digest at environment level.

This helps in better governance and less repetitiveness if you wish to manage pull image digest for multiple applications across environments.

:::caution Who Can Perform This Action?
Users need to have super-admin permission to enable pull image digest at environment level.
:::

---

## Steps to Enable Pull Image Digest

From the left sidebar, go to **Application Management** → **Policies** → **Pull Image Digest**. 

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/image-digest/pull-image-digest-nav.jpg)
<center>Figure 1: Enabling for all Env</center>

As a super-admin, you can decide whether you wish to enable pull image digest [for all environments](#for-all-environments) or [for specific environments](#for-specific-environments).

### For all Environments

This is for enabling pull image digest for deployment to all environments.

1. Enable the toggle button next to `Pull image digest for all existing & future environments`.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/image-digest/global-toggle.jpg)
    <center>Figure 2: Enabling for all Env</center>

2. Click **Save Changes**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/image-digest/save-global-pull.jpg)
    <center>Figure 3: Saving Changes</center>


### For Specific Environments

This is for enabling pull image digest for specific environments. Therefore, only those applications deploying to selected environment(s) will have pull image digest enabled in its CD pipeline.

1. Use the checkbox to choose one or more environments present within the list of clusters you have on Devtron.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/image-digest/environment-selection.jpg)
    <center>Figure 4: Selecting Environments</center>

2. Click **Save Changes**.

Once you enable pull image digest for a given environment in Global Configurations, users won't be able to modify the [image digest setting in the CD pipeline](../creating-application/workflow/cd-pipeline.md#pull-container-image-with-image-digest). The toggle button would appear disabled for that environment as shown below.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/image-digest/disabled-pull-digest.jpg)
<center>Figure 5: Non-editable Option</center>
    




