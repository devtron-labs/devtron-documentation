# User Permissions

## Introduction

Here you can manage who can access your Devtron instance and what actions they can perform. Use this section to add team members, assign them roles, and control their access by granting fine-grained permissions. Moreover, you can also download all user data in a CSV format.

![Figure 1: User Permissions - Example](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/user-sample.jpg)

---

## Add Users

{% hint style="danger" %}
### Mandatory Action
This is a mandatory step after configuring SSO in Devtron; otherwise, your users won't be able to log in to Devtron via SSO. 
{% endhint %}

{% hint style="warning" %}
### Who Can Perform This Action?
Only managers and super-admins can add users.
{% endhint %}

1. Go to **Global Configurations** → **Authorization** → **User Permissions**.

   ![Figure 2: User Permissions in Global Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/user-permissions-screen.jpg)

2. Click **Add Users**.

   ![Figure 3: 'Add Users' Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/add-users.jpg)

3. In the **Email addresses** field, type the email address of the user you wish to add. You may add more than one email address.

   ![Figure 4: Adding Email Addresses of Users](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/adding-email-address.gif)

4. (Optional) From the **Assign user groups** dropdown, you may assign one or more user groups to the user. This helps in identifying the group/team to which the user belongs (e.g., Security Team, Frontend Team, Department Leads) especially when adding larger teams.

   ![Figure 5: Assigning User Group(s)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/assign-user-group.gif)

5. There are two types of permissions in Devtron (click the links below to learn more):
   * [Super admin permission](#grant-super-admin-permission) for granting full access.
   * [Specific permissions](#grant-specific-permissions) for granting cherry-picked access.

   ![Figure 6: Granting Specific or Superadmin Access](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/superadmin-or-specific.gif)

6. Click **Save**. You have successfully added your user(s).

---

## Grant Super Admin Permission

{% hint style="warning" %}
### Who Can Perform This Action?
Only existing super-admins can assign super-admin permissions to another user.
{% endhint %}

![Figure 7: Granting Superadmin Access](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/superadmin-perm.jpg)

Before assigning this permission, please note the following:

* Selecting this option will grant the user full access to all the resources. 

* Since super-admin permission is the highest level of access you can grant, we recommend you give it only to limited users.

* You can revoke a user's super-admin access at any time and restrict it to [specific permissions](#grant-specific-permissions).

---

## Grant Specific Permissions

{% hint style="warning" %}
### Who Can Perform This Action?
Only managers and super-admins can assign specific permissions to a user.
{% endhint %}

![Figure 8: Granting Specific Access](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/specific-perm.jpg)

Upon selecting this option, you get two additional sections:

| **Section**             | **Description**              |
|-----------------------|------------------------------|
| **Permission Groups** <br /> | (*Recommended*, [see snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/assign-permission-groups.gif)) Use the dropdown to assign the user to a [permission group](./permission-groups.md). Your user will automatically inherit all the permissions to the projects/resources defined for that group. You may select more than one permission group too. Once you select a permission group, assigning direct permissions can be skipped (unless you wish to grant additional permissions).<br /><br />You may also [make users Active/Inactive](#at-permission-group-level) at permission group-level. <br /><br /> **We recommend using permission groups over direct permissions for easier management of user access**. |
| **Direct Permissions**| This option allows you to grant your user the access to:<ul><li>[Devtron Apps](#devtron-apps-permissions)</li><li>[Helm Apps](#helm-apps-permissions)</li><li>[Jobs](#jobs-permissions)</li><li>[Kubernetes Resources](#kubernetes-resources-permissions)</li><li>[Chart Groups](#chart-groups-permissions)</li></ul>|

{% hint style="info" %}
### What happens when a user has direct permissions as well as permissions inherited from a group?
If you assign a permission group as well as direct permissions, the user will have the combined permissions of both.

**For example**: 

* A user is granted ‘Build & Deploy’ access to three apps via direct permissions.
* The same user is part of a group that has ‘View only’ access to five apps (including those three apps).
* Now, the user will have both ‘Build & Deploy’ and ‘View only’ permissions for those three apps, and just ‘View only’ for the other two.
{% endhint %}

### Devtron Apps permissions

{% hint style="warning" %}
### Note
The 'Devtron Apps' tab will be available only if the [CI/CD module](../../integrations/build-and-deploy-ci-cd.md) is installed.
{% endhint %}

Here you can grant your user the permissions for Devtron apps.

![Figure 9: Granting Devtron Apps Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/devtron-apps-perm.jpg)

| Field | Description |
| --- | --- |
| **Project** | Select a project from the dropdown list to grant the user access. You can select only one project at a time.<br />**Note**: If you want to select more than one project, then click **Add Permission**. |
| **Environment** | Select a specific environment or all environments from the dropdown list.<br />**Note**: If you select `All environments`, the user will have access to all the current environments including any new environment which gets associated with the application later. |
| **Application**  | Select a specific application or all applications from the dropdown list corresponding to your selected environments.<br />**Note**: If you select `All applications`, the user will have access to all current and future applications associated with the project. Moreover, user with access to all applications, can create new applications too.  |
| **Role**  | Available Roles:<ul><li>`View only`</li> <li>`Build and Deploy`</li><li>`Admin`</li><li>`Manager`</li></ul>[Click here](#roles-available-for-devtron-apps) to learn more about the role you wish to assign the user.  |
| **Status**  | Read: [Making Users Active/Inactive](#at-direct-permissions-level) [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)   |

#### Roles available for Devtron Apps

There are seven role-based access levels for Devtron Apps:

1. **View only**: These users can view applications and environments access to but cannot view sensitive data like secrets used in applications or charts.
2. **Build and Deploy**: In addition to `View only` access, these users can build and deploy images of applications to permitted environments.
3. **Admin**: These users can create, edit, deploy, and delete permitted applications in selected projects.
4. **Manager**: These users have the same permissions as `Admin` but can also grant or revoke user access for applications and environments they manage.
5. **Image approver**: These users can approve image deployment requests.
6. **Configuration approver**: These users can approve configuration change requests for [Deployment Templates](../../creating-application/deployment-template.md), [ConfigMaps](../../creating-application/config-maps.md), and [Secrets](../../creating-application/secrets.md). However, users cannot self-approve their own proposed changes, even if they have this role or Super Admin access.
7. **Artifact promoter**: These users have the authority to approve the promotion of [artifacts](../../../reference/glossary.md#artifacts) directly to the target CD pipeline.

However, super-admin users have unrestricted access to all Devtron resources. They can create, modify, delete, and manage any resource, including user access, Git repositories, container registries, clusters, and environments.

| Role                  | View | Create | Edit | Delete | Build & Deploy | Approve Images | Approve Config Change | Approve Artifacts | Manage User Access |
|-----------------------|:----:|:------:|:----:|:------:|:--------------:|:--------------:|:--------------:|:----------------:|:----------------:|
| **View**                 | ✅  | ❌     | ❌   | ❌     | ❌             | ❌             | ❌             | ❌               | ❌               |
| **Build and Deploy**     | ✅  | ❌     | ❌   | ❌     | ✅            | ❌             | ❌             | ❌               | ❌               |
| **Admin**                | ✅  | ✅    | ✅  | ✅    | ✅            | ❌             | ❌             | ❌               | ❌               |
| **Manager**              | ✅  | ✅    | ✅  | ✅    | ✅            | ❌             | ❌             | ❌               | ✅              |
| **Image Approver**       | ✅  | ❌     | ❌   | ❌     | ❌             | ✅            | ❌             | ❌               | ❌               |
| **Configuration Approver** | ✅ | ❌    | ❌   | ❌     | ❌             | ❌             | ✅            | ❌               | ❌               |
| **Artifact Promoter**    | ✅  | ❌     | ❌   | ❌     | ❌             | ❌             | ❌             | ✅              | ❌               |
| **Super Admin**          | ✅  | ✅    | ✅  | ✅    | ✅            | ✅            | ✅            | ✅              | ✅              |


### Helm Apps permissions

Here you can grant your user the permissions for Helm apps deployed from Devtron or outside Devtron.

![Figure 10: Granting Helm Apps Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/helm-apps-perm.jpg)

| Field | Description |
| --- | --- |
| **Project** | Select a project from the dropdown list to grant the user access. You can select only one project at a time.<br />**Note**: If you want to select more than one project, then click **Add Permission**. |
| **Environment or Cluster/Namespace** | Select a specific environment from the dropdown list.<br />**Note**: If you select `All existing + future environments in cluster`, then the user will get access to all the current environments including any new environment which gets associated with the application later. |
| **Application**  | Select a specific helm application or all helm apps from the dropdown list corresponding to your selected environments.<br />**Note**: If `All applications` is selected, the user will have access to all current and future applications associated with the project.  |
| **Permission**  | Available Permissions:<ul><li>`View only`</li> <li>`View & Edit`</li><li>`Admin`</li></ul> [Click here](#roles-available-for-helm-apps) to learn more about the permission you wish to assign the user.  |
| **Status**  | Read: [Making Users Active/Inactive](#at-direct-permissions-level) [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)   |

#### Roles available for Helm Apps

There are three role-based access levels for Helm Apps:

1. **View only**: Users with this role can only view Helm applications and their configurations but cannot make any modifications.
2. **View & Edit**: These users can modify the configurations of permitted Helm applications and deploy them.
3. **Admin**: Users with this role have full access to Helm applications, including the ability to create, manage, and delete applications.

| Role              | View    | Create   | Deploy    | Edit      | Delete    |
| :---:             |  :---:  |    :---: |    :---:  |   :---:   |   :---:   |
| **View only**     | ✅      | ❌        | ❌        | ❌        | ❌         |
| **View & Edit**   | ✅      | ❌        | ✅        | ✅        | ❌         |
| **Admin**         | ✅      | ✅        | ✅        | ✅        | ✅         |
| **Super Admin**   | ✅      | ✅        | ✅        | ✅        | ✅         |

### Jobs permissions

Here you can grant your user the permissions to access the jobs created in Devtron.

![Figure 11: Granting Jobs Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/jobs-perm.jpg)

| Field | Description |
| --- | --- |
| **Project** | Select a project from the dropdown list to grant the user access. You can select only one project at a time.<br />**Note**: If you want to select more than one project, then click **Add Permission**. |
| **Job Name** | Select a specific job or choose `All jobs` to grant access to all available jobs within the project. |
| **Workflow** | Select a specific workflow or `All workflows` to grant access to the workflows containing the job pipelines.  |
| **Environment** | Select a specific environment or `All environments` to grant access to the environments associated with the job(s). |
| **Role** | Available Roles:<ul><li>`View only`</li> <li>`Run job`</li><li>`Admin`</li></ul>[Click here](#roles-available-for-jobs) to learn more about the role you wish to assign the user.|
| **Status** | Read: [Making Users Active/Inactive](#at-direct-permissions-level) [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) |


#### Roles available for Jobs

There are three role-based access levels for Jobs:

1. **View only**: Users can view the job workflows and logs but cannot trigger or modify jobs.
2. **Run Job**: These users can trigger jobs but cannot make modifications to workflows.
3. **Admin**: Users with this role have full control over jobs, including creating, modifying, and deleting workflows.

| Role              | View    | Create   | Run       | Edit      | Delete    |
| :---:             |  :---:  |    :---: |    :---:  |   :---:   |   :---:   |
| **View only**     | ✅       | ❌       | ❌        | ❌        | ❌         |
| **Run job**       | ✅       | ❌       | ✅        | ❌        | ❌         |
| **Admin**         | ✅       | ✅       | ✅        | ✅        | ✅         |
| **Super Admin**   | ✅       | ✅       | ✅        | ✅        | ✅         |


### Kubernetes Resources permissions

{% hint style="warning" %}
### Note
The 'Kubernetes Resources' tab will be available only if you have super-admin permissions.
{% endhint %}

Here you can provide permission to view, inspect, manage, and delete resources in your clusters from [Devtron's Resource Browser](../../resource-browser.md).

To grant Kubernetes resource permission, click **Add permission**.

![Figure 12a: Adding Permissions for Kubernetes Resources](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/k8s-perm1.jpg)


![Figure 12b: Granting Permissions for Kubernetes Resources](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/k8s-perm2.jpg)

| Field | Description |
| --- | --- |
| **Cluster** | Select a cluster from the dropdown list to which you want to give permission to the user. You can select only one cluster at a time.<br />**Note**: To add another cluster, click **Add another**. |
| **Namespace** | Select a namespace from the dropdown list. |
| **API Group**  | Select a specific API group or `All API groups` from the dropdown list corresponding to the Kubernetes resource.  |
| **Kind**  | Select a kind or `All kind` from the dropdown list corresponding to the Kubernetes resource.  |
| **Resource name**  | Select a resource name or `All resources` from the dropdown list to which you want to give permission to the user. |
| **Role**  | Available Roles:<ul><li>`View`</li> <li>`Admin`</li></ul>[Click here](#roles-available-for-kubernetes-resources) to learn more about the role you wish to assign the user. |
| **Status**  | Read: [Making Users Active/Inactive](#at-direct-permissions-level) [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) |

#### Roles available for Kubernetes Resources

There are two role-based access levels for Kubernetes Resources:

1. **View**: Users with this role can inspect Kubernetes resources but cannot make changes.
2. **Admin**: Users can create, modify, and delete Kubernetes resources within their assigned namespaces and clusters.

| Role             | View    | Create  | Edit    | Delete   |
| :---:            |  :---:  | :---:   |   :---: |   :---:  |
| **View**         | ✅      | ❌       | ❌      | ❌       |
| **Admin**        | ✅      | ✅       | ✅      | ✅       |
| **Super Admin**  | ✅      | ✅       | ✅      | ✅       |
   
### Chart Groups permissions

{% hint style="warning" %}
### Note
The 'Chart Groups' tab will be available only if the [CI/CD module](../../integrations/build-and-deploy-ci-cd.md) is installed.
{% endhint %}

Here you can grant your user the permissions for accessing Chart Groups. Note that you can only give users the permission to either create chart groups or edit them, but not both.

![Figure 13: Granting Chart Group Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/chart-group-perm.jpg)

| Action | Permissions |
| :---   | :---         |
| **View**  | Click the `View` checkbox if you want the user(s) to view only the chart groups. |
| **Create** | Click the `Create` checkbox if you want the user(s) to create, view, or delete the chart groups. |
| **Edit** | <ul><li>**Deny**: Select `Deny` from the dropdown list to restrict the users from editing the chart groups.</li><li>**Specific Chart Groups**: Select the `Specific Charts Groups` option from the dropdown list and then select the chart group for which you want to allow users to edit.</li></ul> |

#### Roles available for Chart Groups

1. **View**: Users can view chart groups but cannot create or edit them.
2. **Create**: Users can create new chart groups and modify existing ones.
3. **Edit**: Users can modify chart groups but cannot create new ones.

| Role            | View    | Create | Deploy    | Edit                 | Delete   |
| :---:           |  :---:  | :---:  |    :---:  |   :---:              |   :---:  |
| **View**        | ✅      | ❌      | ❌        | ❌                   | ❌        |
| **Create**      | ✅      | ✅      | ❌        | ✅                   | ✅        |
| **Edit**        | ✅      | ❌      | ❌        | None/Specific Groups | ❌        |
| **Super Admin** | ✅      | ✅      | ✅        | ✅                   | ✅        |

---

## Making Users Active/Inactive [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="warning" %}
### Who Can Perform This Action?
* Super-admins can activate or deactivate users.
* Managers can activate or deactivate users only if the users has the same or fewer permissions than the manager.
{% endhint %}

When working with multiple collaborators in Devtron, you may need to deactivate users who no longer require access and reactivate them when needed. This applies to users of Devtron Apps, Helm Apps, Jobs, and Kubernetes Resources.

![Figure 14: Active/Inactive Options](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/active-inactive-levels.jpg)

You can manage a user's active status at three levels:
* [User-level](#at-user-level)
* [Permission Group-level](#at-group-level)
* [Direct Permissions-level](#at-direct-permissions-level)


### At User level

![Figure 15: Active/Inactive User](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/user-level-activation.jpg)

* **Active/Activate** - Use this option to activate a deactivated user while retaining their previous roles and permissions.
* **Inactive/Inactivate** - Use this option to deactivate an existing active user and save the changes. If the user has an ongoing session, they will be logged out permanently on their next action or refresh.
* **Keep active until** - Use this TTL-based option to keep a user active only till a specified date and time, after which the user is automatically deactivated. The user will not be able to log in to Devtron.

### At Permission Group level

![Figure 16: Active/Inactive User from Permission Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/group-level-activation.jpg)

* **Active/Activate** - Use this option to allow permissions from the group to take effect for the user.
* **Inactive/Inactivate** - Use this option to prevent permissions from the group from taking effect for the user. However, they can still log in/log out of Devtron if [active at the user-level](#at-user-level).
* **Keep active until** - Use this TTL-based option to grant group permissions to the user until a set date, after which permission group will become inactive for the user.

### At Direct Permissions level

![Figure 17: Active/Inactive User for Project Access](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/permission-level-activation.jpg)

* **Active/Activate** - Use this option to grant the project/resource access to the user. 
* **Inactive/Inactivate** - Use this option to revoke the project/resource access from the user. **Note**: The user will still be able to log in/log out of Devtron if [active at user-level](#at-user-level).
* **Keep active until** - Use this TTL-based option to grant the project/resource access to the user only till a specified date and time, beyond which the user will no longer have access to the project/resource.

---

## Edit User Permissions

{% hint style="warning" %}
### Who Can Perform This Action?
* Super-admins can edit user permissions.
* Managers can edit user permissions only if the user has the same or fewer permissions than the manager.
{% endhint %}

{% hint style="warning" %}
### Note
Direct user permissions cannot be edited if you're using [LDAP](./sso/ldap.md)/[Microsoft](./sso/microsoft.md) for SSO with 'auto-assign permission' enabled. Permissions can only be [managed via permission groups](./permission-groups.md#edit-permissions-groups) in such a scenario.
{% endhint %}

You can edit the user permissions by clicking the edit icon. Click **Save** after editing the permissions.

![Figure 18: Editing User Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/edit-permissions.gif)

---

## Export User Data to CSV

You may download the user data of current users and deleted users in a CSV format. Broadly, your exported CSV will include:

* User's Email address
* User ID & Status (Active/Inactive/Deleted)
* Last Login Time
* Detailed Permissions
* Role
* Timestamps for User Addition, Updation, and Deletion

![Figure 19: Exporting User Data](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/export-users-csv-v2.gif)

---

## Delete Users

{% hint style="warning" %}
### Who Can Perform This Action?
* Super-admins can delete users.
* Managers can delete users only if the user has the same or fewer permissions than the manager.
{% endhint %}

If you want to delete a user, click **Delete**.

![Figure 20: Deleting a User](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/delete-user.jpg)

This will remove the user from the system along with all the permissions granted earlier. The user will no longer be able to log in to Devtron unless added again.
