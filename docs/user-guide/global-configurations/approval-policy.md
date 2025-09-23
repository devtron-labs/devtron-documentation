# Approval Policy

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

When it comes to critical environments (let's say, production), you as a super-admin might want to introduce an approval flow for application deployment or changes made to the configuration files. Enforcing such restrictions will prevent unwanted deployments and direct modifications to sensitive configurations.

The **Approval Policy** feature in Devtron lets you introduce an approval mechanism whenever your users perform the following actions:

- Deploying an Application to an Environment
- Changes in Deployment Template
- Changes in ConfigMap
- Changes in Secret

![Figure 1a: Approval for Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/deployment-approval.gif)

![Figure 1b: Approval for Configuration Change](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/config-approval.gif)

---

## Create an Approval Policy

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permissions to create an approval policy.
{% endhint %}

1. Go to **Global Configurations** → **Approval Policy**.

    ![Figure 2: Approval Policy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/gc-approval-policy.jpg)

2. Click **+ Create Profile**.

    ![Figure 3: 'Create Profile' Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/create-approval-profile.jpg)

3. Give a name to the policy, e.g., *`banking-prod-approval`*, and add a description (optional) preferably explaining what it does.

    ![Figure 4: Entering Policy Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/policy-desc.jpg)

4. Additionally, you can decide who can grant approval from the following 3 options:

    * **Option 1**: Choose **Any Approver** if you want to allow any user with `Image Approver` permissions and/or `Configuration Approver` permissions to approve 'Deployment' request and 'Configuration Change' respectively. Choose the number of approvals your users must get to proceed with their changes. The permissible limit ranges from one approval (minimum) to six approvals (maximum).

        ![Figure 5: Allowing Any Approver](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-count.gif)

    * **Option 2**: Choose **Specific Approver** → **User Group** → **Add Criteria** to choose one or more [user groups](./authorization/user-access.md#add-users) who can provide the requisite number of approvals. The permissible limit is [1 to 6] for each user group you add. From the selected group(s), only the users having `Image Approver` and/or `Configuration Approver` permissions can approve.

        ![Figure 6: Allowing Approvers from a User Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/specific-user-group.gif)

    * **Option 3**: Choose **Specific Approver** → **Specific Users (dropdown)** to cherry-pick the names of the user(s) who can provide an approval. Here, there is no upper limit to the approvals (unlike the above options), so the user must obtain approvals from all the specific members you add to the policy.

        ![Figure 7: Allowing Specific Users](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/specific-user-approval.gif)

{% hint style="warning" %}
### Caution
* The dropdown lists all users available in Devtron. Some users (except super-admins) may not have the necessary approver permissions, i.e, **Config Approver** or **Deployment approver**. These users cannot approve requests until the required permissions are assigned to them.

* Super-admins have approver permissions by default.

* Refer [User Permissions](./authorization/user-access.md#roles-available-for-devtron-apps) to learn more.
{% endhint %}

{% hint style="info" %}
### How do approvals of User Groups work?
If a user belongs to multiple groups (see Option 2 above), their approval is considered and counted for each group. For example, if you mandate 2 approvals: 1 from DevOps group and 1 from Compliance group; an approval from a common user (belonging to both groups) will count as 2 approvals.

However, once a group's required approvals are met, extra approvals won’t count. For example, if a request needs 2 Security and 3 QA approvals and already has 2 Security and 2 QA approvals, an approval from a user in both teams will count only for QA. The user appears in both lists but doesn’t add to Security’s count.
{% endhint %}

{% hint style="info" %}
### Can super-admins approve the requests?
Yes, apart from the users having approver access, super-admins can also approve the requests (provided the requests are not their own).
{% endhint %}

{% hint style="warning" %}
### What happens if a specific user mentioned in the policy gets deleted from Devtron or has their permissions revoked?
Even if the user mentioned in the policy no longer exists, the approval conditions will remain unchanged. Therefore, to prevent unfulfilled approval conditions because of an absent user, it's best to remove that specific user from the policy.
{% endhint %}

5. Click **Save Changes**.

---

## Apply an Approval Policy

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permissions to apply an approval policy.
{% endhint %}

1. After you create an approval policy, you can apply it. Click **Apply Profile** on the same screen.

    ![Figure 8: Apply Profile Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/apply-approval-policy.jpg)

2. From the **Select profiles to apply** dropdown, choose the policy you wish to apply. You also have the option to select more than one policy (if they exist) using the checkbox.

    ![Figure 9: Selecting Profiles](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/select-multiple-policies.gif)

3. Choose the scope from the dropdown given next to **Use selected policy for approval of**. Here you can decide whether your policy is for: 
    * **Approval of Deployment** - Select 'Deployments' from the dropdown.
    * **Approval of Configuration Change** - Select 'Configuration change' from the dropdown. You can further select: `Deployment template`, `ConfigMaps`, `Secrets`. Select the ones to which your policy should apply so that any change to your chosen configurations will require an approval.

    ![Figure 10: Choosing Scope](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/select-approval-scope.jpg)

4. Under **Apply to**, you get the following options to choose from: 
    * **Specific Criteria** - Select this option to apply your policy to specific environment(s) of specific applications. <br />

        **Example**: In case of Deployment

        ![Figure 11a: Specific Criteria for 'Deployment' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/specific-criteria-deployment.gif)

        **Example**: In case of Configuration Change

        ![Figure 11b: Specific Criteria for 'Configuration Change' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/specific-criteria-config.gif)

    * **By match criteria** - Select this option to use a combination of filters to create criteria. Your policy will only apply to target pipelines/configurations fulfilling your criteria (including existing and future ones). (Optional) You may also write a note for your other team members to understand the intent and context of your policy. <br />

        **Example**: In case of Deployment

        ![Figure 12a: Match Criteria for 'Deployment' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/match-criteria-approval.gif)

        **Example**: In case of Configuration Change

        ![Figure 12b: Match Criteria for 'Configuration Change' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/match-criteria-config.gif)

    * **Global** - Select this option to apply your chosen policies to every deployment pipeline or configurations (existing and future) of all applications in all clusters. <br />

        **Example**: In case of Deployment

        ![Figure 13a: Global Scope for 'Deployment' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/global-deployment.jpg)

        **Example**: In case of Configuration Change

        ![Figure 13b: Global Scope for 'Configuration Change' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/global-approval-config.jpg)


5. Click **Save Changes**.

---

## Apply Multiple Policies

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permissions to apply more policies to a scope.
{% endhint %}

As shown in step 2 of [Apply an Approval Policy](#apply-an-approval-policy), you can choose multiple policies and apply them to a scope (e.g., Global, Cluster, Application, Environment, Base Configuration). However, if you have already applied and now you wish to apply more policies to the same scope, you may do so by following either of the below steps:

* [Apply More Policies to a Scope](#apply-more-policies-to-a-scope)
* [Apply More Policies in Bulk](#apply-more-policies-in-bulk)

### Apply More Policies to a Scope

1. Go to **Applied Profiles** tab.
2. Use the filters to find the applied profile and scope (e.g., Global, Cluster, Application).
3. Click the context menu.
4. Click **Manage policy**.
5. Use the **Select profiles to apply** dropdown and tick the policy/policies you wish to apply.
6. Click **Save Changes**.
 
    ![Figure 14: Applying More Policy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/add-policy-single.gif)

### Apply More Policies in Bulk

1. Use the checkboxes to select the relevant scopes (e.g., Global, Cluster, Application).
2. Click the **Manage Profiles** button on the floating widget.
3. Click **Add**.
4. Use the **Select profile to apply** dropdown and tick the policy/policies you wish to apply in bulk.
5. Review the changes if needed, and click **Save Changes**.

    ![Figure 15: Applying More Policy in Bulk](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/add-policies-bulk.gif)

{% hint style="warning" %}
### How do multiple policies work if applied together?
If you apply multiple policies together, the user has to meet the approval conditions of all the applied policies. <br />
**Example 1**: if 'Policy A' demands 3 approvals specifically from John, Jane, and Jessy; and if 'Policy B' requires 1 approval from 'Product User Group', the user will have to get 4 approvals. <br />
**Example 2**: if 'Policy A' demands 3 approvals specifically from John, Jane, and Jessy; and if 'Policy B' requires 2 approvals from anyone, the user will still have to get 3 approvals from John, Jane, and Jessy. In short, the stricter conditions from the policies are enforced first and they have to be fulfilled.
{% endhint %}

---

## Configuring Exceptions (Optional)

The Exceptions tab allows you to specify users or groups for whom the approval policies will not apply. This is useful in cases where certain teams, such as an operations team resolving production incidents, need to bypass approvals while the policies continues to apply to all other users.

You can choose to:

   * Exclude super-admins from approval permissions.

   * Whitelist specific users or user groups who should be exempt from approvals for deployments or configuration changes.

### Excluding Super Admins

You can configure whether super-admins are required to follow approval policies or bypass them.

1. Navigate to **Approval Policy** → **Exceptions**.

2. Choose the scope, for which you want super admins to not require approval.The available scopes are:

    * **Configuration Change:** Exempts the super-admins to edit base configurations such as Deployment Templates, ConfigMaps, or Secrets without requiring approvals.

    * **Deployment:** Exempts the super-admins to deploy images to an environment without requiring approvals.

3. Enable/Disable the toggle next to **Super admins** as per your requirement.

    * When enabled, super-admins can deploy images and edit base configurations without approvals. 

    * When disabled, super-admins follow same approval policies as other users. 

    ![Figure 16: Enabling Super Admins Exception](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-super-admin-exception.gif)

{% hint style="info" %}
### Note
Super-admins can approve requests even if the toggle is turned off.
{% endhint %}

### Excluding Specific Users / User Groups / API Tokens

1. Navigate to **Approval Policy** → **Exceptions**.

    ![Figure 17: Exceptions Tab](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-exceptions.jpg)

2. Choose the scope for which specific users / user groups / API tokens do not require approval. The available scopes are:

    * **Configuration Change:** Exempts the selected users, user groups, and API tokens to edit base configurations such as Deployment Templates, ConfigMaps, or Secrets without requiring approvals.

    * **Deployment:** Exempts the selected users, user groups, and API tokens to deploy images to an environment without requiring approvals.

    ![Figure 18: Selecting Scope](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-scope.jpg)

{% hint style="info"%}
### Note
The list of users is fetched from [User Permissions](../global-configurations/authorization/user-access.md), and the list of [API tokens](../global-configurations/authorization/api-tokens.md) is sourced from API Tokens. 

You cannot enter a new email ID or token directly. 
   * Refer [Add Users (User Permissions)](../global-configurations/authorization/user-access.md#add-users) to add a new user. 

   * Refer [API token](../global-configurations/authorization/api-tokens.md#generate-api-token) to create a new API token.
{% endhint %}

3. Click the **Add**/**Edit** button next to **Specific Users / User Groups**. A pop-up modal window will appear.

    ![Figure 19: Clicking 'Add/Edit'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-add-users.jpg)

4. You can do either of the following:
    
    1. You can select specific **Users** or **API Tokens** from **Add Users** dropdown.

        ![Figure 20a: Selecting Specific Users](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-add-users-window.jpg)

        ![Figure 20b: Selecting Specific API Tokens](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-add-api-token.jpg)

    2. You can select specific **Users Groups** from **Add user groups** dropdown.

        ![Figure 21: Selecting Specific User Groups](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-add-users-group.jpg)

{% hint style="warning" %}
### Caution
* The dropdown lists all users and API tokens or user-groups, available in Devtron. Some users or API tokens may have only view permissions or lack build, deploy, or admin permissions. Such users cannot bypass approval policies until the required permissions are assigned.

* Refer [User Permissions](./authorization/user-access.md#roles-available-for-devtron-apps) to learn more.
{% endhint %}

5. Click **Save**. The selected users or user groups will no longer require approvals for the selected scope.

    ![Figure 22: Clicking 'Save'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-save.jpg)

{% hint style="warning" %}
### Caution
By default, approvers cannot approve their own deployments or base configuration edits, but, if an approver is added as an exception, this restriction does not apply, and that approver can trigger their own deployments or edit base configurations without any approvals.
{% endhint %}

After configuring exceptions, super-admins and specific users / user groups can make configuration changes and trigger deployments without requiring any approval.

#### Triggering Deployments

{% hint style="warning" %}
### Do exceptions bypass blackout or maintenance windows?  
Approval Policy exceptions do not bypass a blackout or a maintenance window:

   * During a blackout window, exception users cannot trigger deployments, unless you add them to the list of users, who are allowed to take action during the blackout window.

   * Outside a maintenance window, exception users cannot trigger deployments, unless you add them to the list of users, who are allowed to take action outside the maintenance window
   
   * Refer [Deployment Window](../global-configurations/deployment-window.md#configuring-deployment-window) to learn more.
{% endhint %}

{% hint style="info" %}
### Note
An exception user can still follow the normal flow of requesting an image approval and getting it approved, and also has the option to deploy images without approvals.
{% endhint %}

![Figure 23a: Deploying an Image without an Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-deploy-exception.jpg)

![Figure 23b: Email Notification](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/email-notification-exception.jpg)

![Figure 23c: Deployment History](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/deployment-history-exception-user.jpg)

#### Editing Base Configurations

{% hint style="info" %}
### Note 
* An exception user can still follow the normal flow of submitting a configuration change draft for approval, and getting it approved. 
* Any existing draft is discarded once the exception user updates the configuration using express edit.
{% endhint %}

![Figure 24a: Editing Deployment Template without an Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-base-config-exception.gif)

![Figure 24b: Creating/Editing ConfigMap without an Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-configmap-exception.gif)

![Figure 24c: Creating/Editing Secret without an Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-policy-secret-exception.gif)

---

## Remove Applied Policies

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permissions to remove an applied approval policy.
{% endhint %}

If you have already applied policies and wish to remove some of them from a scope, follow the steps below. The approval conditions of the removed policy will no longer apply to the given scope, and the conditions of other policies (if applied to the same scope) will remain.

* [Remove Policies Applied to a Scope](#remove-policies-applied-to-a-scope)
* [Remove Applied Policies in Bulk](#remove-applied-policies-in-bulk)

### Remove Policies Applied to a Scope

1. Go to **Applied Profiles** tab.
2. Use the filters to find the applied profile and scope (e.g., Global, Cluster, Application).
3. Click the context menu.
4. Click **Manage policy**.
5. In the **Select profiles to apply** dropdown, click '**x**' next to the policy/policies you wish to remove.
6. Click **Save Changes**.
 
    ![Figure 25: Remove Applied Policy from a Scope](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/remove-policy-single.gif)

### Remove Applied Policies in Bulk

1. Use the checkboxes to select the relevant scopes (e.g., Global, Cluster, Application)..
2. Click the **Manage Profiles** button on the widget.
3. Click **Remove**.
4. In the **Remove Approval Policy** dropdown, click '**x**' next to the policy/policies you wish to remove.
5. Review the changes if needed, and click **Save Changes**.

    ![Figure 26: Removing Policies in Bulk](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/remove-policies-bulk.gif)

{% hint style="warning" %}
### Note
At least one policy must remain applied to a scope, so you cannot remove all the policies from a scope. You may use the [delete procedure](#delete-applied-policies) instead.
{% endhint %}

---

## Delete Applied Policies

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permissions to delete an applied policy.
{% endhint %}

If you have already applied policies to a scope (e.g., Global, Cluster, Application) and wish to delete all of them from that given scope, follow the steps below. **Note**: This will not [delete the approval policy](#delete-an-approval-policy) you originally created. Moreover, deployment pipelines may still continue inheriting profiles from higher scopes (e.g., Global, Cluster, Application).

1. Go to **Applied Profiles** tab.
2. Use the filters to find the applied profile(s).
3. Click the **Delete** option in the context menu or use the checkboxes to select multiple scopes for deletion.

    ![Figure 27: Deleting Applied Policies (One-by-one or Bulk)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/remove-policies-bulk.gif)

---

## Delete an Approval Policy

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permissions to delete an approval policy.
{% endhint %}

If you no longer require a given approval policy, you may delete it. This action will automatically remove its rules enforced earlier for both, deployments and configuration change.

1. Go to **Profiles** tab.
2. Click the delete icon next to the profile you wish to delete.

    ![Figure 28: Deleting Approval Policy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/delete-approval-policy.gif)

---

## Results

### Approving Deployment Request

Assume you created a policy (shown below) that blocks the deployment of a banking application to an environment unless there are two approvals. No user can trigger the deployment unless the images are approved.

![Figure 29: Example](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/example1.jpg)

1. The user first requests approval of the intended image. Only those with the necessary permissions will show up in the approver list. Moreover, the user can also opt to notify all users apart from the approvers.

    ![Figure 30: Request Approval for Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/request-approval.gif)

2. Only those with `Image Approver` permissions can then approve the request.

    ![Figure 31: User with 'Image Approver' Permissions granting approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/grant-approval.gif)

    If [SES/SMTP](../global-configurations/manage-notification.md) is configured in Devtron, the approver gets notified via email. This enables the approver to take an action directly from the mail, such as `View Request` and `Approve Request`.

    ![Figure 32: Approval via Email](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-request-notify.gif)

3. The user can then proceed with deploying the approved image.

    ![Figure 33: Deployment of Approved Image](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/deploy-approved-image.gif)

### Approving Configuration Change Request

Assume you created a policy (shown below) that prevents direct changes to the configuration files (Deployment Template, ConfigMaps, Secrets) of a banking application unless there is one approval. 

![Figure 34: Example](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/example2.jpg)

1. The user first requests approval for pushing a configuration change in Deployment Template/ConfigMap/Secret.

    ![Figure 35: Request Approval for Configuration Change](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/config-change-request.gif)

2. Only those with `Configuration Approver` permissions can then approve the request.

    ![Figure 36: User with 'Configuration Approver' permissions granting approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approve-config-change.gif)

    If [SES/SMTP](../global-configurations/manage-notification.md) is configured in Devtron, the approver gets notified via email. Therefore, the approver can take an action directly from the mail as shown below.

    ![Figure 37: Config Approval via Email](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/config-change-mail.gif)