# Approval Policy

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

When it comes to critical environments (let's say, production), you as a superadmin might want to introduce an approval flow for application deployment or changes made to the configuration files. Enforcing such restrictions will prevent unwanted deployments and direct modifications to sensitive configurations.

The **Approval Policy** feature in Devtron lets you introduce an approval mechanism whenever your users perform the following actions:

- Deploying an Application
- Changes in Deployment Template
- Changes in ConfigMap
- Changes in Secret

![Figure 1a: Approval for Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/deployment-approval.gif)

![Figure 1b: Approval for Configuration Change](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/config-approval.gif)

---

## Creating an Approval Policy

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

4. Choose the mandatory number of approvals your users must get to proceed with a deployment/configuration change. The permissible limit ranges from one approval (minimum) to six approvals (maximum). Additionally, you can decide who can grant approval from the following 3 options:

    * **Option 1**: Choose **Any Approver** if you want to allow any user with `Image Approver` permissions and/or `Configuration Approver` permissions to approve the request.

        ![Figure 5: Allowing Any Approver](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/approval-count.gif)

    * **Option 2**: Choose **Specific Approver** → **User Group** → **Add Criteria** to choose one or more user groups who can provide the requisite number of approvals. From the selected group(s), only the users having `Image Approver` and/or `Configuration Approver` permissions can approve.

        ![Figure 6: Allowing Approvers from a User Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/specific-user-group.gif)

    * **Option 3**: Choose **Specific Approver** → **Specific Users (dropdown)** to cherry-pick the names of the user(s) who can provide an approval. 

        ![Figure 7: Allowing Specific Users](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/specific-user-approval.gif)

5. Click **Save Changes**.

{% hint style="info" %}
### How does approvals work for User Groups?
If a user belongs to multiple groups (see Option 2 above), their approval is considered and counted for each group. For example, if you mandate 2 approvals: 1 from DevOps group and 1 from Compliance group; an approval from a common user belonging to both groups will count as 2 approvals.

However, once a group's required approvals are met, extra approvals won’t count. For example, if a request needs 2 Security and 3 QA approvals and already has 2 Security and 2 QA approvals, an approval from a user in both teams will count only for QA. The user appears in both lists but doesn’t add to Security’s count.
{% endhint %}


---

## Applying an Approval Policy

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permissions to apply an approval policy.
{% endhint %}

1. After you create an approval policy, you can apply it. Click **Apply Profile** on the same screen.

    ![Figure 8: Apply Profile Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/apply-approval-policy.jpg)

2. From the **Select profiles to apply** dropdown, choose the policy you wish to apply. You also have the option to select more than one policy (if they exist) using the checkbox.

    ![Figure 9: Selecting Profiles](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/select-approval-profiles.jpg)

3. Choose the scope from the dropdown given next to **Use selected policy for approval of**. Here you can decide whether your policy is for: 
    * **Approval of Deployment** - Select 'Deployments' from the dropdown.
    * **Approval of Configuration Change** - Select 'Configuration change' from the dropdown. You can further select: `Deployment template`, `ConfigMaps`, `Secrets`. Select the ones to which your policy should apply so that any change to your chosen configurations will require an approval.

    ![Figure 10: Choosing Scope](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/select-approval-scope.jpg)

4. Under **Apply to**, you get the following options to choose from: 
    * **Specific Criteria** - Select this option to apply your policy to specific environment of specific applications. <br />

        **Example: When deployment is the selected scope**:

        ![Figure 11a: Specific Criteria for 'Deployment' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/specific-criteria-deployment.gif)

        **Example: When configuration change is the selected scope**:

        ![Figure 11b: Specific Criteria for 'Configuration Change' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/specific-criteria-config.gif)

    * **By match criteria** - Select this option to use a combination of filters to create criteria. Your policy will only apply to target pipelines/configurations fulfilling your criteria (including existing and future ones). (Optional) You may also write a note for your other team members to understand the intent and context of your policy. <br />

        **Example: When deployment is the selected scope**:

        ![Figure 12a: Match Criteria for 'Deployment' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/match-criteria-approval.gif)

        **Example: When configuration change is the selected scope**:

        ![Figure 12b: Match Criteria for 'Configuration Change' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/match-criteria-config.gif)

    * **Global** - Select this option to apply your chosen policies to every deployment pipeline or configurations (existing and future) of all applications in all clusters. <br />

        **Example: When deployment is the selected scope**:

        ![Figure 13a: Global Scope for 'Deployment' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/global-deployment.jpg)

        **Example: When configuration change is the selected scope**:

        ![Figure 13b: Global Scope for 'Configuration Change' Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/global-approval-config.jpg)


5. Click **Save Changes**.

---

## Results

Since we created a policy that blocks the deployment of a banking application unless there are two approvals, no user can trigger the deployment unless the images are approved.

1. The user first requests approval of the intended image.

    ![Figure 14: Request Approval for Deployment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/request-approval.gif)

2. Only those with approver permissions can then approve the request.

    ![Figure 15: User with Approver Permissions Granting Approval](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/grant-approval.gif)

3. The user can then proceed with deploying the approved image.

    ![Figure 16: Deployment of Approved Image](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/approval-policy/deploy-approved-image.gif)