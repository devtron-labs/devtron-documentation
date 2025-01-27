# User Permissions

## Introduction

Here you can manage who can access your Devtron instance and what they can do with it. Use this section to add team members, assign them roles, and control their access by granting specific permissions.

![Figure 1: User Permissions - Example](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/user-sample.jpg)

---

## Add User

{% hint style="warning" %}
### Note
This is a mandatory step after you configure SSO in Devtron, otherwise your users won't be able to log in via SSO. 
{% endhint %}

1. Go to **Global Configurations** → **Authorization** → **User Permissions**.

   ![Figure 1: User Permissions - Example](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/user-list.jpg)

2. Click **Add Users**.

3. In the **Email addresses** field, type the email address of the user you wish to add. You may add more than one email address.

4. (Optional) From the **Assign user groups** dropdown, you may assign user group(s) to the user. This helps in identifying the group/team to which the user belongs (e.g., Security Team, Frontend Team, Department Leads) especially when you wish to add larger teams.

5. There are two types of permissions in Devtron (click the below links to know more):
   * [Specific permissions](#specific-permission) for granular/cherrypicked access.
   * [Super admin permission](#super-admin-permission) for full access.

6. Click **Save**. You have successfully added your user.

---

## Grant Specific Permissions

{% hint style="warning" %}
### Note
Only managers and super-admins can assign specific permissions to a user.
{% endhint %}

Upon selecting this option, you get 2 more sections:

| **Section**             | **Description**              |
|-----------------------|------------------------------|
| **Permission Groups** | (Optional) Use the dropdown to assign the user to a [permission group](./permission-groups.md). Your user will automatically inherit all the permissions defined for that group. You may select more than one permission group too. Once you select a permission group, assigning direct permissions can be skipped (unless you wish to override the former permissions). |
| **Direct Permissions**| This option allows you to grant your user the access to:<ul><li>[Devtron Apps](#for-devtron-apps)</li><li>[Helm Apps](#for-helm-apps)</li><li>[Jobs](#for-jobs)</li><li>[Kubernetes Resources](#for-kubernetes-resources)</li><li>[Chart Groups](#for-chart-groups)</li></ul> If you assign both a permission group and direct permissions to the user, the direct permissions will either provide additional access or override the group permissions in case of conflicts.  |


### For Devtron Apps

{% hint style="warning" %}
### Note
The 'Devtron Apps' tab will be available only if have the [CI/CD module](../../integrations/build-and-deploy-ci-cd.md) installed.
{% endhint %}

Here you can grant your user the permissions for custom apps created using Devtron.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/specific-permissions-devtron-apps.jpg)

| Field | Description |
| --- | --- |
| **Project** | Select a project from the drop-down list to which you want to give permission to the user. You can select only one project at a time.<br>Note: If you want to select more than one project, then click **Add Permission**.</br> |
| **Environment** | Select the specific environment or all environments from the drop-down list.<br>**Note**: If you select `All environments`, then the user will get access to all the current environments including any new environment which gets associated with the application later.</br> |
| **Application**  | Select the specific applications or all applications from the drop-down list corresponding to your selected environments.<br>**Note**: If you select `All applications`, then the user will get access to all the current applications including any new application which gets associated with the project later</br>.  |
| **Role**  | [Click here](#role-based-access-levels) to read more about the role you wish to assign the user:<ul><li>`View only`</li> <li>`Build and Deploy`</li></ul><ul><li>`Admin`</li></ul><ul><li>`Manager`</li></ul>  |

### For Helm Apps

Here you can grant your user the permissions for Helm apps deployed from Devtron or outside Devtron.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/specific-permissions-helm-apps.jpg)

| Field | Description |
| --- | --- |
| **Project** | Select a project from the drop-down list to which you want to give permission to the user. You can select only one project at a time.<br>Note: If you want to select more than one project, then click **Add Permission**.</br> |
| **Environment or Cluster/Namespace** | Select the specific environment from the drop-down list.<br>Note: If you select `all existing + future environments in default cluster`, then the user will get access to all the current environments including any new environment which gets associated with the application later.</br> |
| **Application**  | Select the specific application or all applications from the drop-down list corresponding to your selected environments.<br>Note: If `All applications` is selected, then the user will get access to all the current applications including any new application which gets associated with the project later</br>.  |
| **Role**  | [Click here](#role-based-access-levels) to read more about the role you wish to assign the user:<ul><li>`View only`</li> <li>`View & Edit`</li></ul><ul><li>`Admin`</li></ul>  |

### For Jobs

Here you can grant your user the permissions to access the jobs created in Devtron.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/specific-permissions-helm-apps.jpg)

| Field | Description |
| --- | --- |
| **Project** | Select a project from the drop-down list to which you want to give permission to the user. You can select only one project at a time.<br>Note: If you want to select more than one project, then click **Add Permission**.</br> |
| **Environment or cluster/namespace** | Select the specific environment or `all existing environments in default cluster` from the drop-down list.<br>Note: If you select `all existing + future environments in default cluster` option, then a user gets access to all the current environments including any new environment which gets associated with the application later.</br> |
| **Application**  | Select the specific application or all applications from the drop-down list corresponding to your selected Environments.<br>Note: If `All applications` option is selected, then a user gets access to all the current applications including any new application which gets associated with the project later</br>.  |
| **Role**  | [Click here](#role-based-access-levels) to read more about the role you wish to assign the user:<ul><li>`View only`</li> <li>`Run job`</li></ul><ul><li>`Admin`</li></ul>  |


### For Kubernetes Resources

{% hint style="warning" %}
### Note
The 'Kubernetes Resources' tab will be available only if have super-admin permissions.
{% endhint %}

Here you can provide permission to view, inspect, manage, and delete resources in your clusters from [Devtron's Resource Browser](../../resource-browser.md).

To provide Kubernetes resource permission, click **Add permission**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/kubernetes-resource-specific-permission.jpg)

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/kubernetes-resource-permission-page-latest.jpg)

| Field | Description |
| --- | --- |
| **Cluster** | Select a cluster from the drop-down list to which you want to give permission to the user. You can select only one cluster at a time.<br>Note: To add another cluster, then click **Add another**.</br> |
| **Namespace** | Select the namespace from the drop-down list. |
| **API Group**  | Select a specific API group or `All API groups` from the drop-down list corresponding to the K8s resource.  |
| **Kind**  | Select the kind or `All kind` from the drop-down list corresponding to the K8s resource.  |
| **Resource name**  | Select the resource name or `All resources` from the drop-down list to which you want to give permission to the user. |
| **Role**  | [Click here](#role-based-access-levels) to read more about the role you wish to assign the user:<ul><li>`View`</li> <li>`Admin`</li></ul>  |

### For Chart Groups

{% hint style="warning" %}
### Note
The 'Chart Groups' tab will be available only if have the [CI/CD module](../../integrations/build-and-deploy-ci-cd.md) installed.
{% endhint %}

Here you can grant your user the permissions for Chart Groups.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/specific-permission-chart-group.jpg)

{% hint style="warning" %}
### Note
You can only give users the ability to either 'create' or 'edit' chart groups, but not both.
{% endhint %}

| Action | Permissions |
| :---   | :---         |
| View  | Enable `View` to view only the chart groups. |
| Create | Enable `Create` if you want the users to create, view, or delete the chart groups. |
| Edit | <ul><li>**Deny**: Select `Deny` option from the drop-down list to restrict the users to edit the chart groups.</li><li>**Specific chart groups**: Select the `Specific Charts Groups` option from the drop-down list and then select the chart group for which you want to allow users to edit.</li></ul> |

---

## Grant Super Admin Permission

{% hint style="warning" %}
### Note
Only super-admins can assign super-admin permissions to a user.
{% endhint %}

Points to keep in mind before assigning this permission:

* Selecting this option will grant the user full access to all the resources. 

* Since super-admin permission is the highest level of access you can grant, we recommend you give it only to limited users.

* You always have the option to revoke the super-admin access of a user and strip it down to [specific permissions](#grant-specific-permissions).

---

## Role-based Access Levels

Devtron supports 8 levels of access:

1. **View**: Users with `view` access have the least privileges. Such users can only view combination of environments, applications and helm charts on which access has been granted to the user. They cannot view sensitive data like secrets used in applications or charts.
2. **Build and Deploy**: In addition to `view` privilege mentioned above, users with `build and deploy` permission can build and deploy the image of permitted applications and helm charts to permitted environments.
3. **Admin**: Users with `admin` privileges can create, edit, delete, and view permitted applications in permitted projects.
4. **Manager**: Users with `manager` privileges can do everything that an `admin` user can do. Additionally, they can also give and revoke access of users for the applications and environments of which they are the manager.
5. **Super Admin**: Users with `super admin` privileges have unrestricted access to all the Devtron resources. Super Admins can create, modify, delete and view any Devtron resource without any restriction; it's like Superman without the weakness of Kryptonite. Moreover, they can add and delete user access across any Devtron resource, add delete git repository Description, container registry Description, cluster, and environment.
6. **Image approver**: Users with `Image approver` privileges have the authority to approve requests for image deployment.
7. **Configuration approver**: Users with `Configuration approver` privileges have the authority to approve changes to protected configurations of Deployment Template, ConfigMaps, and Secrets. However, the user who proposed the changes cannot self-approve, even if they have configuration approver or super-admin privileges.
8. **Artifact promoter**: Users with this privilege have the authority to approve promotion of [artifacts](../../reference/glossary.md#artifacts) directly to the target CD pipeline.

### Devtron Apps

| Role             | View     | Create     | Edit     | Delete     | Build & Deploy |
| :---             | :---:    | :---:      | :---:    | :---:      | :---:          |
| View             | Yes      | No         | No       | No         | No             |
| Build and Deploy | Yes      | No         | No       | No         | Yes            |
| Admin            | Yes      | Yes        | Yes      | Yes        | Yes            |
| Manager          | Yes      | Yes        | Yes      | Yes        | Yes            |
| Super Admin      | Yes      | Yes        | Yes      | Yes        | Yes            |

### Helm Apps

| Role             | View        | Deploy         | Edit        | Delete        |
| :---:            |  :---:      |    :---:       |   :---:     |   :---:       |
| View Only        | Yes         | No             | No          | No            |
| View and Edit    | Yes         | Yes            | Yes         | No            |
| Admin            | Yes         | Yes            | Yes         | Yes           |
| Super Admin      | Yes         | Yes            | Yes         | Yes           |

### Grant User Access

| Role         | Add User Access | Edit User Access | Delete User Access |
| :---         | :---:           | :---:            | :---:              |
| Manager      | Yes             | Yes              | Yes                |
| Super Admin  | Yes             | Yes              | Yes                |

---

## Edit User Permissions

{% hint style="warning" %}
Direct user permissions cannot be edited if you're using [LDAP](./sso-login-services/ldap.md)/[Microsoft](./sso-login-services/microsoft.md) for SSO and 'auto-assign permission' is enabled. Permissions can only be [managed via permission groups](./permission-groups.md#edit-permissions-groups) in such a scenario.
{% endhint %}

You can edit the user permissions by clicking the edit icon.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/dashboard/edit-user-db.jpg)

Edit the user permissions.

After you have done editing the user permissions, click `Save`.

---

## Mark a User as Active/Inactive



---

### Delete User

If you want to delete the user/users with particular permissions, click `Delete`.

{% embed url="https://www.youtube.com/watch?v=VTqBRIFbuSU" caption="" %}

![Figure : Deleting a User](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-permissions/delete-user.jpg)

