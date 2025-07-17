# Lock Deployment Configuration

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The [Deployment Template](../../reference/glossary.md#base-deployment-template) might contain certain configurations intended for the DevOps team (e.g., `ingress`), and not meant for developers to modify. 

Therefore, Devtron allows super-admins to restrict such fields from modification or deletion.

![Figure 1: Preventing Changes to Locked Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/not-eligible-changes.jpg)

This stands true for deployment templates in:
* [Base configuration](../../user-guide/creating-application/deployment-template.md)
* [Environment-level configuration](../../user-guide/creating-application/environment-overrides.md)

**How is this different from the 'Protect Configuration' feature?**

The 'protect configuration' feature is meant to verify the edits by introducing an approval flow for any changes made to the configuration files, i.e., Deployment template, ConfigMaps, and Secrets. Refer [Approval Policy](../global-configurations/approval-policy.md).

Whereas, the 'lock deployment configuration' feature goes one step further. It is meant to prevent any edits to specific keys by non-super-admins. This applies only to deployment templates and is performed at global-level. -->

---

## Locking Deployment Keys

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to lock deployment keys.
{% endhint %}

To lock deployment keys, you first need to create a profile and apply it to the specific deployment templates.

{% hint style="Tip" %}
### Who is a Lock Deployment Profile?
A Lock Deployment profile is a template which specifies which keys in the deployment template can be edited or locked. It enables super-admins to manage which deployment template keys other users can modify. By using profiles, super-admins can manage edit access at different levels, such as, global, cluster, environment, application, or a combination of application and environment.

This allows for better control by making sure critical deployment template keys are locked in sensitive environments (production), while giving flexibility to change deployment template keys in other less critical environments (QA, Staging, etc.).
{% endhint %}

### Creating Profile

To create a profile, follow the below steps:

1. Go to **Global Configurations** → **Lock Deployment Configuration**. Click **+ Create Profile**; a new **Create Profile** page will open.

    ![Figure 2: Creating Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-deployment-config.jpg)

2. Enter the **Name** (Required) and a **Description** (Optional) for the profile.  

3. (Optional) Click **Refer Values.YAML** to check which keys you wish to lock.

     * Select the relevant Chart type and its version to reference the keys.

    ![Figure 3: Values.YAML File](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/values-yaml.jpg)

4. Enter the keys inside the editor on the left-hand side, e.g., `autoscaling.MaxReplicas`. Use [JSONpath expressions](https://goessner.net/articles/JsonPath/index.html) to enter specific keys, lists, or objects to lock.

    ![Figure 4: Referring Values.YAML File for Locking Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/autoscaling-lock.jpg)

5. Click **Save Changes**. 

    ![Figure 5: Saving Locked Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/saving-locked-keys.jpg)

6. Profile will be created, and available under the **Profiles** tab.

    ![Figure 6: Confirmation Dialog](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/confirmation.jpg)

### Applying Profile

After creating a profile, the next step is to apply the profile to the specific deployment templates according to your use case. To apply a profile follow the below steps:

1. Go to **Global Configurations** → **Lock Deployment Configuration**. Click **Apply Profile**; a new **Apply Profile** page will open.

2. Select the profiles which you want to apply from the dropdown under **Select profiles to apply**.
     
     * You can select multiple Profiles.

3. Select how you want to apply the profiles under **Apply selected profiles to deployment templates of**.

     There are 3 options you can choose from

     |Method|Description|
     |:---|:---|
     |**Specific deployment templates**|Choose this option if you want to apply profile to specific deployment templates. Refer to [Specific deployment templates](#specific-deployment-templates) to learn more.|
     |**By match criteria**|Choose this option to apply the profile based on specific criteria, such as applying it to the deployment templates of an entire project.|
     |**Global (All deployment templates)**|Choose this option if you want to apply profile to all deployment template.|
 
     #### Specific deployment templates

     This option allows you to apply the lock deployment configuration profile to the deployment template of a specific application within a particular environment.

     To do so, follow the below steps;

     1. Select the **Specific deployment templates** option under **Apply selected profiles to deployment templates of**.

     2. Apply a filter from the dropdown to view deployment templates.

         * Deployment templates can be filtered by:

         |Filter|Description|
         |:---|:---|
         |**Project**|This option allows you to filter the deployment templates based on **Projects**, and it will display all applications available in the selected projects along with their environments.|
         |**Application**|This option allows you to filter the deployment templates based on **Applications**, and it will display the selected applications along with their environments.|
         |**Cluster**|This option allows you to filter the deployment templates based on **Cluster**, and it will display all applications in the selected clusters along with their environments.|
         |**Environment**|This option allows you to filter the deployment templates based on **Environments**, and it will display all the applications in the selected Environments.|

     3. Select the applications for which you want to apply the profile.

     #### By Match Criteria 
 
     This option allows you to apply the lock deployment configuration profile to the deployment templates of all the applications matching certain criteria.
     
     For example, 
     
     * Suppose, you want to apply a lock deployment configuration profile to all applications in a particular project, you can achieve this by selecting that project as the match criteria.
     
     * Now, let's say your use case is even more specific, suppose you want to apply the lock deployment configuration profile to all the application's deployment templates in a particular cluster, that also belongs to a specific project and are deployed in a certain environment, then, you can choose your required **Cluster**, **Project** and **Environment** as the match criteria. Devtron will then apply the profile only to those application's deployment templates that meet every single one of the criteria you have selected.

     * If you have selected multiple options in a particular category, let's say you have selected multiple environments and a project as the match criteria, then the profile will apply to all the applications in that particular project that are deployed to any of the environments you have selected as the match criteria. 

     #### Global (All deployment templates)

     This option allows you to apply the lock deployment configuration profile to all the existing and future deployment templates across all the applications.

4. Click **Save Changes** and the selected profiles will apply on the required deployment templates.
---

## Result

While super-admins can directly edit the locked keys, let's look at a scenario where a user (non-super-admin) tries to edit the same in an [unprotected](../../user-guide/creating-application/config-approval.md) base deployment template.

* User can hide/unhide the locked keys as shown below.

    ![Figure 7: Hiding Locked Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/hide-locked-keys.gif)

{% hint style="info" %}
<span><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/mode.jpg" alt="GUI or YAML Mode"></span> <br />
If you select 'Basic' mode instead of 'Advanced (YAML)', all the keys meant for basic mode will be displayed in the GUI even if some are locked. While users can modify these keys, they cannot save the changes made to the locked keys.
{% endhint %}

* Let's assume the user edits one of the locked keys...

    ![Figure 8: Editing Locked Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/change-locked-values.gif)

    ...and saves the changes.

    ![Figure 9: Saving Edits to Locked Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/changing-values.jpg)

* A modal window will appear on the right highlighting the non-eligible edits.

    ![Figure 10: Eligible and Non-eligible Changes](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/not-eligible-changes.jpg)

* Let's assume the user edits a key that is not locked or adds a new key.

    ![Figure 11: Editing Allowed Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/changing-allowed-values.jpg)

* The modal window will highlight the eligible edits. However, it will not let the user save those eligible edits unless the user clicks the checkbox: **Save changes which are eligible for update**.

    ![Figure 12: Saving Eligible Changes](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/saving-allowed-changes.jpg)

{% hint style="warning" %}
### Who Can Perform This Action?
Only a super-admin, manager, or application admin can edit the configuration values. 
{% endhint %}

* Once the user clicks the **Update** button, the permissible changes will reflect in the deployment template. 

    ![Figure 13: Updating Deployment Config](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/updating-changes.jpg)

    However, if it's a [protected template](../../user-guide/creating-application/config-approval.md), the user will require the approval of a [configuration approver](./user-access.md#devtron-apps-permissions) as shown below.

    ![Figure 14: Proposing Changes to Protected Config](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/proposing-changes.jpg)

The same result can be seen if the user tries to edit environment-specific deployment templates.

