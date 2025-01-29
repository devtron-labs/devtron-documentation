# User Permissions

## Introduction

Here you can manage who can access your Devtron instance and what actions they can perform. Use this section to add team members, assign them roles, and control their access by granting role-based permissions.

![Figure 1: User Permissions - Example](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/user-sample.jpg)

---

## Add Users

{% hint style="warning" %}
### Who Can Perform This Action?
* Managers and super-admins can add users.
* This is a mandatory step after configuring SSO in Devtron; otherwise, your users won't be able to log in to Devtron via SSO. 
{% endhint %}

1. Go to **Global Configurations** → **Authorization** → **User Permissions**.

   ![Figure 2: User Permissions in Global Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/user-permissions-screen.jpg)

2. Click **Add Users**.

   ![Figure 3: 'Add Users' Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/add-users.jpg)

3. In the **Email addresses** field, type the email address of the user you wish to add. You may add more than one email address.

   ![Figure 3: Adding Email Addresses of Users](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/adding-email-address.gif)

4. (Optional) From the **Assign user groups** dropdown, you may assign one or more user groups to the user. This helps in identifying the group/team to which the user belongs (e.g., Security Team, Frontend Team, Department Leads) especially when adding larger teams.

   ![Figure 4: Assigning User Group(s)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/assign-user-group.gif)

5. There are two types of permissions in Devtron (click the links below to learn more):
   * [Super admin permission](#grant-super-admin-permission) for granting full access.
   * [Specific permissions](#grant-specific-permissions) for granting cherry-picked access.

   ![Figure 5: Granting Specific or Superadmin Access](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/superadmin-or-specific.gif)

6. Click **Save**. You have successfully added your user(s).

---

## Grant Super Admin Permission

{% hint style="warning" %}
### Who Can Perform This Action?
Only existing super-admins can assign super-admin permissions to another user.
{% endhint %}

![Figure 6: Granting Superadmin Access](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/superadmin-perm.jpg)

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

![Figure 7: Granting Specific Access](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/specific-perm.jpg)

Upon selecting this option, you get two additional sections:

| **Section**             | **Description**              |
|-----------------------|------------------------------|
| **Permission Groups** | (Optional, [check snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/assign-permission-groups.gif)) Use the dropdown to assign the user to a [permission group](./permission-groups.md). Your user will automatically inherit all the permissions to the projects/resources defined for that group. You may select more than one permission group too. Once you select a permission group, assigning direct permissions can be skipped (unless you wish to grant additional permissions). You may also [make users active/inactive](#at-permission-group-level) at permission group-level. |
| **Direct Permissions**| This option allows you to grant your user the access to:<ul><li>[Devtron Apps](#devtron-apps-permissions)</li><li>[Helm Apps](#helm-apps-permissions)</li><li>[Jobs](#jobs-permissions)</li><li>[Kubernetes Resources](#kubernetes-resources-permissions)</li><li>[Chart Groups](#chart-groups-permissions)</li></ul> If you assign both a permission group and direct permissions to the user, the direct permissions will either add to or override the group permissions in case of conflicts.  |


### Devtron Apps permissions

{% hint style="warning" %}
### Note
The 'Devtron Apps' tab will be available only if the [CI/CD module](../../integrations/build-and-deploy-ci-cd.md) is installed.
{% endhint %}

Here you can grant your user the permissions for custom apps created using Devtron.

![Figure 8: Granting Devtron Apps Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/devtron-apps-perm.jpg)

| Field | Description |
| --- | --- |
| **Project** | Select a project from the dropdown list to grant the user access. You can select only one project at a time.<br>Note: If you want to select more than one project, then click **Add Permission**.</br> |
| **Environment** | Select a specific environment or all environments from the dropdown list.<br>**Note**: If you select `All environments`, the user will have access to all the current environments including any new environment which gets associated with the application later.</br> |
| **Application**  | Select a specific applications or all applications from the dropdown list corresponding to your selected environments.<br>**Note**: If you select `All applications`, the user will have access to all current and future applications associated with the project.</br>.  |
| **Role**  | [Click here](#roles-available-for-devtron-apps) to learn more about the role you wish to assign the user:<ul><li>`View only`</li> <li>`Build and Deploy`</li></ul><ul><li>`Admin`</li></ul><ul><li>`Manager`</li></ul>  |
| **Status**  | [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) Read [Make Users Active/Inactive](#at-direct-permissions-level)   |

#### Roles available for Devtron Apps

There are seven role-based access levels:

1. **View only**: These users can view applications, environments, and Helm charts they have access to but cannot view sensitive data like secrets used in applications or charts.
2. **Build and Deploy**: In addition to `View only` access, these users can build and deploy images of assigned applications and Helm charts to permitted environments.
3. **Admin**: These users can create, edit, deploy, and delete permitted applications in selected projects.
4. **Manager**: These users have the same permissions as `Admin` but can also grant or revoke user access for applications and environments they manage.
5. **Image approver**: These users can approve image deployment requests.
6. **Configuration approver**: These users can approve changes to protected configurations, such as Deployment Templates, ConfigMaps, and Secrets. However, users cannot self-approve their own proposed changes, even if they have this role or Super Admin access.
7. **Artifact promoter**: These users have the authority to approve the promotion of [artifacts](../../reference/glossary.md#artifacts) directly to the target CD pipeline.

However, super-admin users have unrestricted access to all Devtron resources. They can create, modify, delete, and manage any resource, including user access, Git repositories, container registries, clusters, and environments.

| Role                  | View | Create | Edit | Delete | Build & Deploy | Approve Images | Approve Configs | Approve Artifacts | Manage User Access |
|-----------------------|:----:|:------:|:----:|:------:|:--------------:|:--------------:|:--------------:|:----------------:|:----------------:|
| **View**                 | Yes  | No     | No   | No     | No             | No             | No             | No               | No               |
| **Build and Deploy**     | Yes  | No     | No   | No     | Yes            | No             | No             | No               | No               |
| **Admin**                | Yes  | Yes    | Yes  | Yes    | Yes            | No             | No             | No               | No               |
| **Manager**              | Yes  | Yes    | Yes  | Yes    | Yes            | No             | No             | No               | Yes              |
| **Image Approver**       | Yes  | No     | No   | No     | No             | Yes            | No             | No               | No               |
| **Configuration Approver** | Yes | No    | No   | No     | No             | No             | Yes            | No               | No               |
| **Artifact Promoter**    | Yes  | No     | No   | No     | No             | No             | No             | Yes              | No               |
| **Super Admin**          | Yes  | Yes    | Yes  | Yes    | Yes            | Yes            | Yes            | Yes              | Yes              |


### Helm Apps permissions

Here you can grant your user the permissions for Helm apps deployed from Devtron or outside Devtron.

![Figure 9: Granting Helm Apps Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/helm-apps-perm.jpg)

| Field | Description |
| --- | --- |
| **Project** | Select a project from the dropdown list to grant the user access. You can select only one project at a time.<br>Note: If you want to select more than one project, then click **Add Permission**.</br> |
| **Environment or Cluster/Namespace** | Select a specific environment from the dropdown list.<br>**Note**: If you select `All existing + future environments in cluster`, then the user will get access to all the current environments including any new environment which gets associated with the application later.</br> |
| **Application**  | Select a specific helm application or all helm apps from the dropdown list corresponding to your selected environments.<br>**Note**: If `All applications` is selected, then the user will get access to all the current applications including any new application which gets associated with the project later</br>.  |
| **Permission**  | [Click here](#roles-available-for-helm-apps) to learn more about the role you wish to assign the user:<ul><li>`View only`</li> <li>`View & Edit`</li></ul><ul><li>`Admin`</li></ul>  |
| **Status**  | [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) Read [Make Users Active/Inactive](#at-direct-permissions-level)   |

#### Roles available for Helm Apps

There are three role-based access levels:

1. **View only**: Users with this role can only view Helm applications and their configurations but cannot make any modifications.
2. **View & Edit**: These users can make changes to Helm applications, such as modifying configurations.
3. **Admin**: Users with this role have full access to Helm applications, including the ability to manage and delete applications.

| Role                 | View        | Create         | Deploy         | Edit        | Delete        |
| :---:                |  :---:      |    :---:       |    :---:       |   :---:     |   :---:       |
| **View only**        | Yes         | No             | No             | No          | No            |
| **View & Edit**      | Yes         | No             | No             | Yes         | No            |
| **Admin**            | Yes         | Yes            | Yes            | Yes         | Yes           |
| **Super Admin**      | Yes         | Yes            | Yes            | Yes         | Yes           |

### Jobs permissions

Here you can grant your user the permissions to access the jobs created in Devtron.

![Figure 10: Granting Jobs Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/jobs-perm.jpg)

| Field | Description |
| --- | --- |
| **Project** | Select a project from the dropdown list to grant the user access. You can select only one project at a time.<br>**Note**: If you want to select more than one project, then click **Add Permission**.</br> |
| **Job Name** | Select a specific job or choose `All jobs` to grant access to all available jobs within the project. |
| **Workflow** | Select a specific workflow or `All workflows` to grant access to the workflows containing the job pipelines.  |
| **Environment** | Select a specific environment or `All environments` to grant access to the environments associated with the job(s). |
| **Role** | [Click here](#roles-available-for-jobs) to learn more about the role you wish to assign the user:<ul><li>`View only`</li> <li>`Run job`</li></ul><ul><li>`Admin`</li></ul> |
| **Status** | [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) Read [Make Users Active/Inactive](#at-direct-permissions-level) |


#### Roles available for Jobs

There are three role-based access levels:

1. **View only**: Users can view the job workflows and logs but cannot trigger or modify jobs.
2. **Run Job**: These users can trigger jobs but cannot make modifications to workflows.
3. **Admin**: Users with this role have full control over jobs, including creating, modifying, and deleting workflows.

| Role                 | View        | Create         | Run            | Edit        | Delete        |
| :---:                |  :---:      |    :---:       |    :---:       |   :---:     |   :---:       |
| **View only**        | Yes         | No             | No             | No          | No            |
| **Run job**          | Yes         | No             | Yes            | No          | No            |
| **Admin**            | Yes         | Yes            | Yes            | Yes         | Yes           |
| **Super Admin**      | Yes         | Yes            | Yes            | Yes         | Yes           |


### Kubernetes Resources permissions

{% hint style="warning" %}
### Note
The 'Kubernetes Resources' tab will be available only if you have super-admin permissions.
{% endhint %}

Here you can provide permission to view, inspect, manage, and delete resources in your clusters from [Devtron's Resource Browser](../../resource-browser.md).

To grant Kubernetes resource permission, click **Add permission**.

![Figure 11a: Adding Permissions for Kubernetes Resources](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/k8s-perm1.jpg)


![Figure 11b: Granting Permissions for Kubernetes Resources](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/k8s-perm2.jpg)

| Field | Description |
| --- | --- |
| **Cluster** | Select a cluster from the dropdown list to which you want to give permission to the user. You can select only one cluster at a time.<br>**Note**: To add another cluster, then click **Add another**.</br> |
| **Namespace** | Select a namespace from the dropdown list. |
| **API Group**  | Select a specific API group or `All API groups` from the dropdown list corresponding to the Kubernetes resource.  |
| **Kind**  | Select a kind or `All kind` from the dropdown list corresponding to the Kubernetes resource.  |
| **Resource name**  | Select a resource name or `All resources` from the dropdown list to which you want to give permission to the user. |
| **Role**  | [Click here](#roles-available-for-kubernetes-resources) to learn more about the role you wish to assign the user:<ul><li>`View`</li> <li>`Admin`</li></ul>  |
| **Status**  | [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) Read [Make Users Active/Inactive](#at-direct-permissions-level)   |

#### Roles available for Kubernetes Resources

There are two role-based access levels:

1. **View**: Users with this role can inspect Kubernetes resources but cannot make changes.
2. **Admin**: Users can create, modify, and delete Kubernetes resources within their assigned namespaces and clusters.

| Role                 | View        | Create         | Edit        | Delete        |
| :---:                |  :---:      | :---:          |   :---:     |   :---:       |
| **View**             | Yes         | No             | No          | No            |
| **Admin**            | Yes         | Yes            | Yes         | Yes           |
| **Super Admin**      | Yes         | Yes            | Yes         | Yes           |

### Chart Groups permissions

{% hint style="warning" %}
### Note
The 'Chart Groups' tab will be available only if the [CI/CD module](../../integrations/build-and-deploy-ci-cd.md) is installed.
{% endhint %}

Here you can grant your user the permissions for accessing Chart Groups. Note that you can only give users the permission to either create chart groups or edit them, but not both.

![Figure 12: Granting Chart Group Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/chart-group-perm.jpg)

| Action | Permissions |
| :---   | :---         |
| **View**  | Click the `View` checkbox if you want the user(s) to view only the chart groups. |
| **Create** | Click the `Create` checkbox if you want the user(s) to create, view, or delete the chart groups. |
| **Edit** | <ul><li>**Deny**: Select the `Deny` option from the dropdown list to restrict the users from editing the chart groups.</li><li>**Specific Chart Groups**: Select the `Specific Charts Groups` option from the dropdown list and then select the chart group for which you want to allow users to edit.</li></ul> |

#### Roles available for Chart Groups

1. **View**: Users can view chart groups but cannot create or edit them.
2. **Create**: Users can create new chart groups and modify existing ones.
3. **Edit**: Users can modify chart groups but cannot create new ones.

| Role                 | View        | Create         | Deploy         | Edit                    | Delete        |
| :---:                |  :---:      | :---:          |    :---:       |   :---:                 |   :---:       |
| **View**             | Yes         | No             | No             | No                      | No            |
| **Create**           | Yes         | Yes            | No             | Yes                     | Yes           |
| **Edit**             | Yes         | No             | No             | None/Specific Groups    | No           |
| **Super Admin**      | Yes         | Yes            | Yes            | Yes                     | Yes           |

---

## Make Users Active/Inactive [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="warning" %}
### Who Can Perform This Action?
* Super-admins can activate or deactivate users.
* Managers can activate or deactivate users only if the users has the same or fewer permissions than the manager.
{% endhint %}

When working with multiple collaborators in Devtron, you may need to deactivate users who no longer require access and reactivate them when needed. This applies to users of Devtron Apps, Helm Apps, Jobs, and Kubernetes Resources.

![Figure 13: Active/Inactive Options](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/user-level-activation.jpg)

You can manage a user's active status at three levels:
* 1. [User-level](#at-user-level)
* 2. [Permission Group-level](#at-group-level)
* 3. [Direct Permissions-level](#at-direct-permissions-level)


### At User level

![Figure 14: Active/Inactive User](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/user-level-activation.jpg)

* **Active/Activate** - Use this option to activate a deactivated user while retaining their previous roles and permissions.
* **Inactive/Inactivate** - Use this option to deactivate an existing active user and save the changes. If the user has an ongoing session, they will be logged out permanently on their next action or refresh.
* **Keep active until** - Use this TTl-based option to keep a user active only till a specified date and time, after which the user is automatically deactivated. The user will not be able to log in to Devtron.

### At Permission Group level

![Figure 15: Active/Inactive User from Permission Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/group-level-activation.jpg)

* **Active/Activate** - Use this option to enable the user inherit permissions from the assigned permission group.
* **Inactive/Inactivate** - Use this option to stop the user from inheriting group permissions but they can still log in/log out of Devtron if [active at the user-level](#at-user-level).
* **Keep active until** - Use this TTL-based option to grant group permissions to the user until a set date, after which permissions will be revoked.

### At Direct Permissions level

![Figure 16: Active/Inactive User for Project Access](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/permission-level-activation.jpg)

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
Direct user permissions cannot be edited if you're using [LDAP](./sso-login-services/ldap.md)/[Microsoft](./sso-login-services/microsoft.md) for SSO and 'auto-assign permission' is enabled. Permissions can only be [managed via permission groups](./permission-groups.md#edit-permissions-groups) in such a scenario.
{% endhint %}

You can edit the user permissions by clicking the edit icon. Click **Save** after editing the permissions.

![Figure 17: Editing User Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/edit-permissions.gif)

---

## Delete Users

{% hint style="warning" %}
### Who Can Perform This Action?
* Super-admins can delete users.
* Managers can delete users only if the user has the same or fewer permissions than the manager.
{% endhint %}

If you want to delete a user, click **Delete**.

![Figure 18: Deleting a User](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/delete-user.jpg)

This will remove the user from the system along with all the permissions granted earlier. The user will no longer be able to log in to Devtron unless added again.

