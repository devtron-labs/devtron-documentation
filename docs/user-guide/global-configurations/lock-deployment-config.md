---
id: lock-deployment-config
title: Lock Deployment Configuration
sidebar_label: Lock Deployment Configuration
slug: /user-guide/app-management/policies/lock-deployment-config
---

# Lock Deployment Configuration

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

The [Deployment Template](../../reference/glossary.md#deployment-template) might contain certain configurations (e.g., `ingress`) that are critical to the stability and security of the applications. To prevent unauthorized or accidental changes to such configurations, Devtron allows super admins to restrict (lock) such critical configurations from modification or deletion.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/not-eligible-changes.jpg)
<center>Figure 1: Preventing Changes to Locked Keys</center>

These restrictions can be applied for deployment templates in both the:

* [Base configuration](../../user-guide/creating-application/base-config/README.md)
* [Environment-level configuration](../../user-guide/creating-application/environment-overrides.md)

**How is this different from the 'Protect Configuration' feature?**

The 'protect configuration' feature is meant to verify the edits by introducing an approval flow for any changes made to the configuration files, i.e., Deployment template, ConfigMaps, and Secrets. Refer [Approval Policy](../global-configurations/approval-policy.md).

Whereas, the 'lock deployment configuration' feature goes one step further. It is meant to prevent any edits to specific keys by non-super-admins. This applies only to deployment templates and is performed at the global level.

---

## Locking Deployment Configurations

:::caution Who Can Perform This Action?
Users need to have super-admin permission to lock deployment keys.
:::

To lock deployment configurations, you must first create a profile and apply it to the specific deployment templates.

:::tip What is a Lock Deployment Profile?
A lock deployment configuration profile is a template that specifies which configurations (keys) in the deployment template cannot be edited or deleted by non-super admin users. By using lock deployment configuration profiles, super-admins can manage edit access at different levels, such as global, cluster, environment, application, or a combination of application and environment.

This allows for better control by making sure critical deployment template configurations are locked in sensitive environments (production), while giving flexibility to change deployment template configurations in other less critical environments (QA, Staging, etc.).
:::

### Creating Profile

To create a profile, follow the steps below:

1. Go to **Application Management** → **Policies** → **Lock Deployment Configuration**.

2. Click **+ Create Profile**; a new **Create Profile** page will open.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-deployment-config.jpg)
<center>Figure 2: Creating Profile</center>

3. Enter the **Name** (Required) and a **Description** (Optional) for the profile.  

4. (Optional) Click **Refer values.yaml** to check which keys you wish to lock.

     * Select the relevant Chart type and its version to reference the keys.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/values-yaml.jpg)
<center>Figure 3: values.yaml File</center>

5. Enter the keys inside the editor on the left-hand side, e.g., `autoscaling.MaxReplicas`. Use [JSONpath expressions](https://goessner.net/articles/JsonPath/index.html) to enter specific keys, lists, or objects to lock.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/autoscaling-lock.jpg)
<center>Figure 4: Referring Values.YAML File for Locking Keys</center>

:::caution Keys are case-sensitive
Use the exact case as defined in the deployment template, otherwise the keys will not be locked.
:::


:::info Locking custom configurations (keys)
You can lock custom configurations (keys) defined in your deployment template, even if they are not listed in the **Refer values.yaml** section. As long as the key matches your lock rule, it will be locked.

:::

6. Click **Save Changes**. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/saving-locked-keys.jpg)
<center>Figure 5: Saving Locked Keys</center>

7. Profile will be created, and available under the **Profiles** tab.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/confirmation.jpg)
<center>Figure 6: Confirmation Dialog</center>

:::caution Handling Locked Index Ranges
If you have locked a range of configurations using JSONPath (e.g., `ingressInternal.hosts[1:3].paths`), the specified index positions are protected. 

If you want to add a new configuration entry (e.g., a new host), it should be added after the locked range i.e., in case of `ingressInternal.hosts[1:3].paths`, new host configuration entry should be added at the index 4. 

Adding an entry within the locked range may shift the indices and result in validation errors or unintended modifications of locked values.

:::

### Applying Profile

After creating a profile, the next step is to apply the profile to the specific deployment templates according to your use case. To apply a profile, follow the steps below:

1. Go to **Application Management** → **Policies** → **Lock Deployment Configuration**.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-apply-profile.jpg)
<center>Figure 7: Clicking 'Apply Profile'</center>

2. Click **Apply Profile**; a new **Apply Profile** page will open.

3. Select the profiles that you want to apply from the dropdown under **Select profiles to apply**; you can select multiple profiles.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-select-profile.jpg)
<center>Figure 8: Selecting Lock Deployment Configuration Profile</center>

4. Select how you want to apply the profiles under **Apply selected profiles to deployment templates of**.

     There are three options you can choose from:

     1. **Specific deployment templates**: This option allows you to apply the lock deployment configuration profile to the deployment template(s) of specific application(s) within particular environment(s).

        ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-specific-apps.gif)
<center>Figure 9: Applying Profile to Specific Deployment Templates</center>

     2. **By match criteria**: This option allows you to use a combination of filters to create criteria. Lock deployment configuration profile will only apply to the deployment templates of the applications fulfilling your criteria (including existing and future ones).<br/>(Optional) You may also write a note for your other team members to understand the intent and context of your policy.

        Let's understand how to use **By match criteria** with the below example:<br/><br/>

        Suppose you want to apply a lock deployment configuration profile to all applications in a particular project. You can achieve this by selecting that project as the match criteria.

        ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-match-criteria-use-case-1.gif)
<center>Figure 10: Applying Profile By Match Criteria - Use Case 1</center>

     3. **Global (All deployment templates)**: This option allows you to apply the lock deployment configuration profile to all the existing and future deployment templates across all the applications. 

        ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-global.gif)
<center>Figure 11: Applying Profile for all the Deployment Templates</center>

5. Click **Save Changes**, and the selected profiles will apply to the required deployment templates and be visible under the **Applied Profiles** tab.

---

## Effect on Deployment Templates

Only super admins can edit the locked configurations directly once the lock deployment configuration profile is applied to the deployment templates. Non-super admin users cannot edit the locked keys for those deployment templates.

Let's look at a scenario where a user (non-super-admin) tries to edit the same in an [unprotected](../../user-guide/creating-application/config-approval.md) base deployment template.


### Viewing Locked Configurations

* User can hide/unhide the locked configurations as shown below.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/hide-locked-keys.gif)
<center>Figure 12: Hiding Locked Keys</center>

### Editing Locked Configurations

:::info GUI/YAML Mode
<span className="inline-badge"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/mode1.jpg" alt="GUI or YAML Mode" /></span> <br/>
If you select 'GUI' mode instead of 'YAML', all the keys meant for GUI mode will be displayed in the GUI even if some are locked. While users can modify these keys, they cannot save the changes made to the locked keys.
:::

* Let's assume the user edits one of the locked keys...

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/change-locked-values.gif)
<center>Figure 13: Editing Locked Keys</center>

    ...and saves the changes.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/changing-values.jpg)
<center>Figure 14: Saving Edits to Locked Keys</center>

* A modal window highlighting the non-eligible edits will appear on the right.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/not-eligible-changes.jpg)
<center>Figure 15: Eligible and Non-eligible Changes</center>

### Editing Unlocked Keys 

* Let's assume the user edits a key that is not locked or adds a new key.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/changing-allowed-values.jpg)
<center>Figure 16: Editing Allowed Keys</center>

* The modal window will highlight the eligible edits. However, it will not let the user save those eligible edits unless the user clicks the checkbox: **Save changes which are eligible for update**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/saving-allowed-changes.jpg)
<center>Figure 17: Saving Eligible Changes</center>

:::caution Who Can Perform This Action?
Only a super-admin, manager, or application admin can edit the configuration values. 
:::

* Once the user clicks the **Save Changes** button, the permissible changes will reflect in the deployment template. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/updating-changes.jpg)
<center>Figure 18: Updating Deployment Config</center>

    However, if it's a [protected template](../../user-guide/creating-application/config-approval.md), the user will require the approval of a [configuration approver](./authorization/user-access.md#devtron-apps-permissions) as shown below.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/proposing-changes.jpg)
<center>Figure 19: Proposing Changes to Protected Config</center>

The same result can be seen if the user tries to edit environment-specific deployment templates.

---

## Managing an Applied Profile

To manage an existing applied profile, follow the steps below:

1. Go to **Application Management** → **Policies** → **Lock Deployment Configuration**. 

2. Click the **Applied Profiles** tab and click the `⋮` button next to the preferred applied profile.

3. Click **Manage Policy** to add or remove the profiles. If you have applied the profile using match criteria, then you can also click **Edit match criteria** to edit the match criteria.

4. In case you want to delete an applied profile, click **Delete** and the applied profile will be removed.

5. Click **Save Changes**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-edit-profiles.gif)
<center>Figure 20a: Editing Applied Profiles</center>

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-edit-match-criteria.gif)
<center>Figure 20b: Editing Match Criteria</center>

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-delete-applied-profile.gif)
<center>Figure 20c: Removing an Applied Profile</center>

:::caution Note
Removing an applied profile does not delete the lock deployment configuration profile. It only removes the associated restrictions from the deployment templates where the profile was applied.
:::

---

## Updating Profile

To update a lock deployment configuration file, follow the steps below:

1. Go to **Application Management** → **Policies** → **Lock Deployment Configuration**. 

2. Click the **Profiles** tab and then click the edit button next to the preferred profile.

3. Edit the profile.

4. Click **Save Changes**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-edit-profile.gif)
<center>Figure 21: Updating Lock Deployment Configuration File</center>

---

## Deleting Profile

To delete a lock deployment configuration file, follow the steps below:

1. Go to **Application Management** → **Policies** → **Lock Deployment Configuration**. 

2. Click the **Profiles** tab and then click the delete button next to the preferred profile.

3. A pop-up window will appear, prompting you to enter the profile name for confirmation. 

4. Enter the name of the profile and click **Delete**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/lock-dt/lock-config-delete-profile.gif)
<center>Figure 22: Deleting Lock Deployment Configuration File</center>

:::caution Note 
Deleting a profile will automatically remove it from the Applied Profiles tab and remove its restrictions from all deployment templates where it was previously applied.
:::


## Use Cases

### Locking Resources 

Managing resources configurations (CPU & Memory) is critical for application stability (specifically in production environments).

To prevent accidental or unauthorized changes to resource configurations (CPU & Memory), you can create a lock deployment configuration profile which locks resource configurations, and then you can apply it to the relevant deployment templates.

**Lock Deployment Configuration Profile**

```yaml
resources.limits.cpu
resources.limits.memory
resources.requests.cpu
resources.requests.memory
```

This ensures that only super admins can modify critical resource configurations (increasing CPU or reducing memory) especially in sensitive environments like production.

### Locking Autoscaling

Autoscaling configurations controls how your application scales based on traffic or resource usage. If not managed properly, accidental or unauthorized changes to autoscaling configurations can cause resource overuse resulting in high cost or application instability.

To prevent accidental or unauthorized changes to autoscaling configurations, you can create a lock deployment configuration profile which locks autoscaling configurations, and then you can apply it to the relevant deployment templates.

**Lock Deployment Configuration Profile**

```yaml 
autoscaling.MaxReplicas
autoscaling.MinReplicas
autoscaling.TargetCPUUtilizationPercentage
autoscaling.TargetMemoryUtilizationPercentage
autoscaling.annotations
autoscaling.behavior
autoscaling.containerResource.TargetCPUUtilizationPercentage
autoscaling.containerResource.TargetMemoryUtilizationPercentage
autoscaling.containerResource.enabled
autoscaling.enabled
autoscaling.extraMetrics
autoscaling.labels
```

### Locking Ingress

Ingress configuration defines how external traffic is routed to your application. Unauthorized or accidental changes to ingress rules (hostnames or paths), can lead to incorrect routing, broken endpoints, or access to unintended environments.

To prevent accidental or unauthorized changes to ingress configurations, you can create a lock deployment configuration profile which locks ingress configurations, and then you can apply it to the relevant deployment templates.

**Lock Deployment Configuration Profile**

```yaml 
ingress
ingressinternal.hosts
ingressInternal.hosts[*].pathType
```
