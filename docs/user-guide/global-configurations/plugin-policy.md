# Plugin Policy

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Your [application workflow](../creating-application/workflow/README.md) should follow certain standards and precautions to ensure reliability and a smooth release. For example, mandating load testing for production deployments might help you identify performance bottlenecks early rather than face possible outages, unhappy users, or revenue loss.

The **Plugin Policy** feature in Devtron lets you enforce the presence of specific [plugins](../plugins/README.md) at various stages in your application's build and deployment pipelines, such as [pre-build](../../reference/glossary.md#pre-build), [post-build](../../reference/glossary.md#post-build), [pre-deployment](../../reference/glossary.md#pre-deployment), or [post-deployment](../../reference/glossary.md#post-deployment). Therefore, if the required plugins do not exist in the specified stage(s), you can decide the action (whether to allow or block the pipeline trigger).

![Figure 1: How Plugin Policy Works](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/plugin-policy-main.gif)

---

## Tutorial 

{% embed url="https://www.youtube.com/watch?v=Cb25p_n3YTs" caption="Using Plugin Policy in Devtron" %}

---

## Creating a Plugin Policy

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to create a plugin policy.
{% endhint %}

1. Go to **Global Configurations** → **Plugin Policy**.

    ![Figure 2: Plugin Policy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/gc-plugin-policy.jpg)

2. Click **+ Create Profile**.

    ![Figure 3: Create Profile Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/create-profile-button.jpg)

3. Give a name to the profile, e.g., *`check-jira`*, and add a description (optional) preferably explaining what it does.

    ![Figure 4: Choosing a Pipeline Type](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/pipeline-type.jpg)

4. Choose whether the profile should apply to the **Build pipeline** or the **Deployment pipeline**.

{% hint style="warning" %}
### Note
A single policy cannot apply to both build and deployment pipelines simultaneously. You can create separate policies instead.
{% endhint %}

5. Under **Mandatory Plugin(s)**, click **Add Plugin**.

    ![Figure 5: 'Add Plugin' Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/add-plugin-button.jpg)

6. A list of plugins will appear for you to choose from. Select one or more plugins to make them mandatory for the pipeline you selected in step 4.

    ![Figure 6: Finding and Choosing Plugins](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/choose-plugins.gif)

{% hint style="info" %}
### Tip
There is a search box for you to quickly find the plugins. Moreover, since plugins are classified by tags, you can use the tag filter to find your intended plugins.
{% endhint %}

7. Click **Done**.

8. Use the dropdown menu to choose the stage (pre or post) at which you wish to enforce your chosen plugin(s). You can select mixed stages too.

    ![Figure 7: Finding and Choosing Plugins](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/choose-stage.gif)

    Here, `Pre` means before and `Post` means after.

9. Decide the action that the system should take in case your policy is not followed by the intended pipelines in your application workflow.

    ![Figure 8: Taking Action](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/take-action.jpg)

    * **Allow respective triggers with warning** - This will allow the non-compliant pipeline to run. However, it will display an 'Action required' warning at the intended stage (pre/post) of the pipeline in the application's workflow.
    * **Block respective triggers immediately** - This will not allow the non-compliant pipeline to run (whether manual execution or automated) effective immediately, unless the user configures the mandatory plugins.
    * **Block respective triggers from date/time** - This will allow the non-compliant pipeline to run only till a given date and time. After that, it will block the non-compliant pipeline unless the user configures the mandatory plugins.

10. Click **Save Changes**.

---

## Applying a Plugin Policy

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to apply a plugin policy.
{% endhint %}

1. After you create a policy, you can apply it. Click **Apply Profile** on the same screen.

    ![Figure 9: Apply Profile Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/apply-plugin-policy.jpg)

2. From the **Select profiles to apply** dropdown, choose the policy you wish to apply. You also have the option to select more than one policy (if they exist) using the checkbox.

    ![Figure 10: Selecting Profiles](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/select-profiles.jpg)

3. Under **Apply selected policies to all pipelines**: 
    * **Global** - Select this option to apply your chosen policies to all application workflows across all clusters.
    * **By Match Criteria** - Select this option to use a combination of filters to decide the target pipelines fulfilling your criteria. Your policy will only apply to such target pipelines.

    ![Figure 11: Choosing Scope](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/select-scope.jpg)


4. (*Skip this if you chose **Global** in the previous step*) Upon choosing the **By Match Criteria** option, the following match criteria are available for you:
    * Project
    * Application
    * Cluster
    * Environment
    * Branch fixed
    * Branch regex

    Once you select the criteria, choose the value displayed to you in the dropdown list as shown below.

    ![Figure 12: Deciding Matching Criteria for Pipelines](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/match-criteria.gif)

5. (Optional) You may also write a note for your other team members to understand the intent and context of your policy.

    ![Figure 13: Deciding Matching Criteria for Pipelines](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/leave-note.gif)

6. Click **Save Changes**.

Once you apply the plugin policy, you can view the pipelines that are not adhering to your policy as shown below. Clicking on the non-compliant pipeline will take you directly to the application workflow prompting you to take action.

![Figure 14: Non-compliant Pipelines](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/non-compliant-pipelines.gif)

---

## Results

Since we created a policy that blocks the trigger of non-compliant deployment pipelines, no user can trigger the deployment unless the mandatory plugins are configured as shown below.

![Figure 15: Blocked Non-compliant CD Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/blocked-deployment.gif)

On the other hand, if you selected **Build pipeline** in step 4 of [Creating Plugin Policy](#creating-a-plugin-policy), the build trigger would get blocked as shown below.

![Figure 16: Blocked Non-compliant CI Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/plugin-policy/blocked-build.gif)