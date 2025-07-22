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

Whereas, the 'lock deployment configuration' feature goes one step further. It is meant to prevent any edits to specific keys by non-super-admins. This applies only to deployment templates and is performed at the global level. -->

---

## Locking Deployment Keys

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to lock deployment keys.
{% endhint %}

To lock deployment keys, you must first create a profile and apply it to the specific deployment templates.

{% hint style="Tip" %}
### What is a Lock Deployment Profile?
A lock deployment configuration profile is a template that specifies which keys in the deployment template cannot be edited by non-super admin users. By using lock deployment configuration profiles, super-admins can manage edit access at different levels, such as global, cluster, environment, application, or a combination of application and environment.

This allows for better control by making sure critical deployment template keys are locked in sensitive environments (production), while giving flexibility to change deployment template keys in other less critical environments (QA, Staging, etc.).
{% endhint %}

### Creating Profile

To create a profile, follow the steps below:

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

After creating a profile, the next step is to apply the profile to the specific deployment templates according to your use case. To apply a profile, follow the steps below:

1. Go to **Global Configurations** → **Lock Deployment Configuration**. Click **Apply Profile**; a new **Apply Profile** page will open.

     ![Figure 7: Clicking 'Apply Profile'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-apply-profile.jpg)

2. Select the profiles that you want to apply from the dropdown under **Select profiles to apply**.
     
     * You can select multiple Profiles.

     ![Figure 8: Selecting Lock Deployment Configuration Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-select-profile.jpg)

3. Select how you want to apply the profiles under **Apply selected profiles to deployment templates of**.

     There are three options you can choose from

     |Method|Description|
     |:---|:---|
     |**Specific deployment templates**|Choose this option if you want to apply the profile to Specific deployment templates.<ul><li> Refer [Specific Deployment Templates](#specific-deployment-templates) to know more.</li><ul>|
     |**By match criteria**|Choose this option to apply the profile based on specific criteria, such as applying it to the deployment templates of an entire project. <ul><li> Refer [By match criteria](#by-match-criteria) to know more.</li><ul>|
     |**Global (All deployment templates)**|Choose this option if you want to apply the profile to all deployment templates. <ul><li> Refer [Global (All Deployment Templates)](#global-all-deployment-templates) to know more.</li><ul>|

     ![Figure 9: Selecting Apply Method](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-apply-methods.jpg)
 
### Specific Deployment Templates

This option allows you to apply the lock deployment configuration profile to the deployment template of a specific application within a particular environment.

To do so, follow the steps below:

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

     ![Figure 10: Applying Profile for Specific Deployment Templates ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-specific-apps.gif)

### By Match Criteria 
 
This option allows you to apply the lock deployment configuration profile to the deployment templates of all the applications matching certain criteria. To apply the lock deployment profile, follow the steps below:

1. Select the **By match criteria** option under **Apply selected profiles to deployment templates of**.

2. Select the match criteria by applying the filter from the dropdown based on:

    |Filter|Description|
    |:---|:---|
    |**Project**|This option allows you to filter the deployment templates based on **Projects**, and it will display all applications available in the selected projects along with their environments.|
    |**Application**|This option allows you to filter the deployment templates based on **Applications**, and it will display the selected applications along with their environments.|
    |**Cluster**|This option allows you to filter the deployment templates based on **Cluster**, and it will display all applications in the selected clusters along with their environments.|
    |**Environment**|This option allows you to filter the deployment templates based on **Environments**, and it will display all the applications in the selected Environments.|

    Let's understand how to use **By match criteria** with the below use cases:<br>

    1. Suppose you want to apply a lock deployment configuration profile to all applications in a particular project. You can achieve this by selecting that project as the match criteria.

        ![Figure 11a: Applying Profile By Match Criteria - Use Case 1](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-match-criteria-use-case-1.gif)

        ![Figure 11b: Use Case 1 - Lock Deployment Templates using Single Criteria](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-match-criteria-use-case-1.jpeg)
        
    2. Now, let's say your use case is even more specific, suppose you want to apply the lock deployment configuration profile to all the applications' deployment templates in a particular cluster, belongs to a specific project and are deployed in a particular environment, then, you can choose your required **Cluster**, **Project** and **Environment** as the match criteria. Devtron will then apply the profile only to those applications' deployment templates that meet every single one of the criteria you have selected.

        ![Figure 12a: Applying Profile By Match Criteria - Use Case 2](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-match-criteria-use-case-2.gif)

        ![Figure 12b: Use Case 2 - Lock Deployment Templates using Multiple Criteria](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-match-criteria-use-case-2.jpeg)

    3. In the above two use cases, we have selected only one option from each category, but let's say your use case requires to select multiple options from a particular category; let's say you want to apply the lock deployment configuration profile to multiple environments for a specific project, then, you can choose your required **Project** and multiple **Environments** as the match criteria, Devtron will then apply the profile to all the applications in that particular project that are deployed to any of the environments you have selected as the match criteria.

        ![Figure 13a: Applying Profile By Match Criteria - Use Case 2](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-match-criteria-use-case-3.gif)

        ![Figure 13b: Use Case 3 - Lock Deployment Templates using multiple criteria from same category](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-match-criteria-use-case-3.jpeg)


### Global (All Deployment Templates)

This option allows you to apply the lock deployment configuration profile to all the existing and future deployment templates across all the applications. 

To apply the lock deployment profile to all deployment templates, select the **Global (All deployment templates)** option under **Apply selected profiles to deployment templates of**.

 ![Figure 14: Applying Profile for all the Deployment Templates](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-global.gif)


4. Click **Save Changes**, and the selected profiles will apply to the required deployment templates and be visible under the **Applied Profiles** tab.

---

## Result

Only super admins can edit the locked keys directly once the lock deployment configuration profile is applied to the deployment templates. Non-super admin users cannot edit the locked keys for those deployment templates.

Let's look at a scenario where a user (non-super-admin) tries to edit the same in an [unprotected](../../user-guide/creating-application/config-approval.md) base deployment template.


### Viewing Locked Keys

* User can hide/unhide the locked keys as shown below.

    ![Figure 15: Hiding Locked Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/hide-locked-keys.gif)

    {% hint style="info" %}
    <span><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/mode.jpg" alt="GUI or YAML Mode"></span> <br />
    If you select 'Basic' mode instead of 'Advanced (YAML)', all the keys meant for basic mode will be displayed in the GUI, even if some are locked. While users can modify these keys, they cannot save the changes made to the locked keys.
    {% endhint %}

### Editing Locked Keys 

* Let's assume the user edits one of the locked keys...

    ![Figure 16: Editing Locked Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/change-locked-values.gif)

    ...and saves the changes.

    ![Figure 17: Saving Edits to Locked Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/changing-values.jpg)

* A modal window highlighting the non-eligible edits will appear on the right.

    ![Figure 18: Eligible and Non-eligible Changes](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/not-eligible-changes.jpg)

### Editing Unlocked Keys 

* Let's assume the user edits a key that is not locked or adds a new key.

    ![Figure 19: Editing Allowed Keys](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/changing-allowed-values.jpg)

* The modal window will highlight the eligible edits. However, it will not let the user save those eligible edits unless the user clicks the checkbox: **Save changes which are eligible for update**.

    ![Figure 20: Saving Eligible Changes](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/saving-allowed-changes.jpg)

{% hint style="warning" %}
### Who Can Perform This Action?
Only a super-admin, manager, or application admin can edit the configuration values. 
{% endhint %}

* Once the user clicks the **Save Changes** button, the permissible changes will reflect in the deployment template. 

    ![Figure 21: Updating Deployment Config](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/updating-changes.jpg)

    However, if it's a [protected template](../../user-guide/creating-application/config-approval.md), the user will require the approval of a [configuration approver](./user-access.md#devtron-apps-permissions) as shown below.

    ![Figure 22: Proposing Changes to Protected Config](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/proposing-changes.jpg)

The same result can be seen if the user tries to edit environment-specific deployment templates.

---

## Updating an Applied Profile

To update an existing applied profile, follow the steps below:

1. Go to **Global Configurations** → **Lock Deployment Configuration**. 

2. Click the **Applied Profiles** tab and click the `⋮` button next to the preferred applied profile.

3. Click **Manage Policy** to add or remove the profiles. If you have applied the profile using match criteria, then you can also click **Edit match criteria** to edit the match criteria.

4. Click **Save Changes**.

![Figure 23a: Editing Applied Profiles](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-edit-profiles.gif)

![Figure 23b: Editing Match Criteria](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-edit-match-criteria.gif)

---

## Removing an Applied Profile

To remove an applied profile, follow the steps below:

1. Go to **Global Configurations** → **Lock Deployment Configuration**. 

2. Click the **Applied Profiles** tab and click the `⋮` button next to the preferred applied profile.

3. Click **Delete** and the applied profile will be removed.

![Figure 24: Removing an Applied Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-delete-applied-profile.gif)

{% hint style="warning" %}
### Note
Removing an applied profile does not delete the lock deployment configuration profile. It only removes the associated restrictions from the deployment templates where the profile was applied.
{% endhint %}

---

## Updating Profile

To update a lock deployment configuration file, follow the steps below:

1. Go to **Global Configurations** → **Lock Deployment Configuration**. 

2. Click the **Profiles** tab and then click the edit button next to the preferred profile.

3. Edit the profile.

4. Click **Save Changes**.

![Figure 25: Updating Lock Deployment Configuration File](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-edit-profile.gif)

---

## Deleting Profile

To delete a lock deployment configuration file, follow the steps below:

1. Go to **Global Configurations** → **Lock Deployment Configuration**. 

2. Click the **Profiles** tab and then click the delete button next to the preferred profile.

3. A pop-up window will appear, prompting you to enter the profile name for confirmation. 

4. Enter the name of the profile and click **Delete**.

![Figure 26: Deleting Lock Deployment Configuration File](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-delete-profile.gif)

{% hint style="warning" %}
### Note 
Deleting a profile will automatically remove it from the Applied Profiles tab and remove its restrictions from all deployment templates where it was previously applied.
{% endhint %}
