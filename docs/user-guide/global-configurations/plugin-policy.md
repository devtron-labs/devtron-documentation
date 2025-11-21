---
id: plugin-policy
title: Plugin Policy
sidebar_label: Plugin Policy
slug: /user-guide/app-management/policies/plugin-policy
---

# Plugin Policy

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Your [application workflow](../creating-application/workflow/README.md) should follow certain standards and precautions to ensure reliability and a smooth release. For example, mandating load testing for production deployments might help you identify performance bottlenecks early rather than face possible outages, unhappy users, or revenue loss.

The **Plugin Policy** feature in Devtron lets you enforce the presence of specific [plugins](../plugins/README.md) at various stages in your application's build and deployment pipelines, such as [pre-build](../../reference/glossary.md#pre-build), [post-build](../../reference/glossary.md#post-build), [pre-deployment](../../reference/glossary.md#pre-deployment), or [post-deployment](../../reference/glossary.md#post-deployment). Therefore, if the required plugins do not exist in the specified stage(s), you can decide the action (whether to allow or block the pipeline trigger).

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/plugin-policy-main.gif)
<center>Figure 1: How Plugin Policy Works</center>

---

## Tutorial 

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/Cb25p_n3YTs" title="Using Plugin Policy in Devtron" frameborder="0" allow="fullscreen"></iframe></div>

---

## Creating a Plugin Policy

:::caution Who Can Perform This Action?
Users need to have super-admin permission to create a plugin policy.
:::

1. Go to **Application Management** → **Policies** → **Plugin Policy**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/plugin-policy-nav.jpg)
    <center>Figure 2: Plugin Policy</center>

2. Click **+ Create Profile**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/create-profile-button.jpg)
    <center>Figure 3: Create Profile Button</center>

3. Give a name to the profile, e.g., *`check-jira`*, and add a description (optional) preferably explaining what it does.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/pipeline-type.jpg)
    <center>Figure 4: Choosing a Pipeline Type</center>

4. Choose whether the profile should apply to the **Build pipeline** or the **Deployment pipeline**.

:::caution Note
A single policy cannot apply to both build and deployment pipelines simultaneously. You can create separate policies instead.
:::

5. Under **Mandatory Plugin(s)**, click **Add Plugin**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/add-plugin-button.jpg)
    <center>Figure 5: 'Add Plugin' Option</center>

6. A list of plugins will appear for you to choose from. Select one or more plugins to make them mandatory for the pipeline you selected in step 4.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/choose-plugins.gif)
    <center>Figure 6: Finding and Choosing Plugins</center>

:::info Tip
There is a search box for you to quickly find the plugins. Moreover, since plugins are classified by tags, you can use the tag filter to find your intended plugins.
:::

7. Click **Done**.

8. Use the dropdown menu to choose the stage (pre or post) at which you wish to enforce your chosen plugin(s). You can select mixed stages too.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/choose-stage.gif)
    <center>Figure 7: Finding and Choosing Plugins</center>

    Here, `Pre` means before and `Post` means after.

9. Decide the action that the system should take in case your policy is not followed by the intended pipelines in your application workflow.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/take-action.jpg)
    <center>Figure 8: Taking Action</center>

    * **Allow respective triggers with warning** - This will allow the non-compliant pipeline to run. However, it will display an 'Action required' warning at the intended stage (pre/post) of the pipeline in the application's workflow.
    * **Block respective triggers immediately** - This will not allow the non-compliant pipeline to run (whether manual execution or automated) effective immediately, unless the user configures the mandatory plugins.
    * **Block respective triggers from date/time** - This will allow the non-compliant pipeline to run only till a given date and time. After that, it will block the non-compliant pipeline unless the user configures the mandatory plugins.

10. Click **Save Changes**.

---

## Applying a Plugin Policy

:::caution Who Can Perform This Action?
Users need to have super-admin permission to apply a plugin policy.
:::

1. After you create a policy, you can apply it. Click **Apply Profile** on the same screen.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/apply-plugin-policy.jpg)
    <center>Figure 9: Apply Profile Button</center>

2. From the **Select profiles to apply** dropdown, choose the policy you wish to apply. You also have the option to select more than one policy (if they exist) using the checkbox.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/select-profiles.jpg)
    <center>Figure 10: Selecting Profiles</center>

3. Under **Apply selected policies to all pipelines**: 
    * **Global** - Select this option to apply your chosen policies to all application workflows across all clusters.
    * **By Match Criteria** - Select this option to use a combination of filters to decide the target pipelines fulfilling your criteria. Your policy will only apply to such target pipelines.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/select-scope.jpg)
    <center>Figure 11: Choosing Scope</center>


4. (*Skip this if you chose **Global** in the previous step*) Upon choosing the **By Match Criteria** option, the following match criteria are available for you:
    * Project
    * Application
    * Cluster
    * Environment
    * Branch fixed
    * Branch regex

    Once you select the criteria, choose the value displayed to you in the dropdown list as shown below.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/match-criteria.gif)
    <center>Figure 12: Deciding Matching Criteria for Pipelines</center>

5. (Optional) You may also write a note for your other team members to understand the intent and context of your policy.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/leave-note.gif)
    <center>Figure 13: Deciding Matching Criteria for Pipelines</center>

6. Click **Save Changes**.

Once you apply the plugin policy, you can view the pipelines that are not adhering to your policy as shown below. Clicking on the non-compliant pipeline will take you directly to the application workflow prompting you to take action.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/non-compliant-pipelines.gif)
<center>Figure 14: Non-compliant Pipelines</center>

---

## Results

Since we created a policy that blocks the trigger of non-compliant build pipelines, no user can trigger the build unless the mandatory plugins are configured as shown below.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/blocked-build.gif)
<center>Figure 15: Blocked Non-compliant CI Pipeline</center>

On the other hand, if you selected **Deployment pipeline** in step 4 of [Creating Plugin Policy](#creating-a-plugin-policy), the deployment trigger would get blocked as shown below.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/policies/plugin-policy/blocked-deployment.gif)
<center>Figure 16: Blocked Non-compliant CD Pipeline</center>