# User Permissions

## Add User

To add a user, go to the `Authorization > User Permissions` section of `Global Configurations`. Click **Add user**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/user-permissions-add-user.jpg)

There are two types of permissions in Devtron:

| Permission Type | Description |
| --- | --- |
| **Specific permissions** | Selecting [Specific permission](#assign-specific-permissions) option allows you to manage access and provide the [role-based access](#role-based-access-levels) accordingly for:<ul><li>`Helm Apps`</li></ul><ul><li>`Kubernetes Resources`</li></ul> |
| **Super admin permission** | Selecting [Super admin permission](#assign-super-admin-permission) option will get full access to Devtron resources and the rest of the options will not be available. |

### Assign Super admin permission

To assign a super admin access, go to the `Authorization > User Permissions` section of `Global Configurations`. 

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/super-admin-user-permission.jpg)

* Click **Add user**.
* Provide the email address of a user. You can add more than one email address. Please note that email address must be same as that in the `email` field in the JWT token returned by OIDC provider.
* Select `Super admin permission` and click `Save`.
* A user now will have a [Super admin](#role-based-access-levels) access.

**Note**: 
* Only users with `Super admin permission` can assign super admin permissions to a user.
* We suggest that super admin access must be given to the selected users only.


### Assign Specific permissions

To assign a specific permission, go to the `Authorization > User Permissions` section of `Global Configurations`. 

* Click **Add user**.
* Provide the email address of a user. You can add more than one email address. Please note that email address must be same as that in the `email` field in the JWT token returned by OIDC provider.
* Select `Specific permissions`.
* Select the group permission from the drop-down list, if required.
* Selecting `Specific permission` option allows you to manage access and provide the [role-based access](#role-based-access-levels) accordingly for

   * [Helm Apps](#helm-apps-permissions)
   * [Kubernetes Resources](#kubernetes-resources-permissions)


#### Helm Apps Permissions

In `Helm Apps` option, you can provide access to a user to manage permission for Helm apps deployed from Devtron or outside Devtron.

Provide the information in the following fields:

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/specific-permissions-helm-apps.jpg)

| Registry Type | Credentials |
| --- | --- |
| **Project** | Select a project from the drop-down list to which you want to give permission to the user. You can select only one project at a time.<br>Note: If you want to select more than one project, then click `Add row`.</br> |
| **Environment or cluster/namespace** | Select the specific environment or `all existing environments in default cluster` from the drop-down list.<br>Note: If you select `all existing + future environments in default cluster` option, then a user gets access to all the current environments including any new environment which gets associated with the application later.</br> |
| **Application**  | Select the specific application or all applications from the drop-down list corresponding to your selected Environments.<br>Note: If `All applications` option is selected, then a user gets access to all the current applications including any new application which gets associated with the project later</br>.  |
| **Role**  | Select one of the [roles](#role-based-access-levels) to which you want to give permission to the user:<ul><li>`View only`</li></ul> <ul><li>`View & Edit`</li></ul><ul><li>`Admin`</li></ul>  |

You can add multiple rows for Helm app permission.

Once you have finished assigning the appropriate permissions for the users, Click `Save`.


#### Kubernetes Resources Permissions

In `Kubernetes Resources` option, you can provide permission to view, inspect, manage, and delete resources in your clusters from [Kubernetes Resource Browser](../../resource-browser.md) page in Devtron. You can also create resources from the `Kubernetes Resource Browser` page.

**Note**: Only super admin users will be able to see `Kubernetes Resources` tab and provide permission to other users to access `Resource Browser`.

To provide Kubernetes resource permission, click `Add permission`.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/kubernetes-resource-specific-permission.jpg)

On the `Kubernetes resource permission`, provide the information in the following fields:

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/kubernetes-resource-permission-page-latest.jpg)

| Registry Type | Credentials |
| --- | --- |
| **Cluster** | Select a cluster from the drop-down list to which you want to give permission to the user. You can select only one cluster at a time.<br>Note: To add another cluster, then click `Add another`.</br> |
| **Namespace** | Select the namespace from the drop-down list. |
| **API Group**  | Select the specific API group or `All API groups` from the drop-down list corresponding to the K8s resource.  |
 **Kind**  | Select the kind or `All kind` from the drop-down list corresponding to the K8s resource.  |
  **Resource name**  | Select the resource name or `All resources` from the drop-down list to which you want to give permission to the user. |
| **Role**  | Select one of the [roles](#role-based-access-levels) to which you want to give permission to the user and click `Done`:<ul><li>`View`</li></ul> <ul><li>`Admin`</li></ul>  |

##### Role-based Access Levels

Devtron supports the following levels of access:

1. **View only**: User with `View only` access has the least privilege. This user can only view the combination of environments and helm charts whose access is granted to that user. This user cannot view sensitive data like secrets used in the charts.
2. **View and Edit**: User with `View and Edit` access can view as well as edit the helm charts whose access is granted to that user.
3. **Admin**: User with `Admin` access can create, edit, delete, and view permitted Helm apps in the permitted projects.

| User Roles       | View        | Deploy         | Edit        | Delete        |
| :---:            |  :---:      |    :---:       |   :---:     |   :---:       |
| View Only        | Yes         | No             | No          | No            |
| View and Edit    | Yes         | Yes            | Yes         | No            |
| Admin            | Yes         | Yes            | Yes         | Yes           |

You can add multiple rows for Kubernetes resource permission.

Once you have finished assigning the appropriate permissions for the users, Click `Save`.

---

## Edit User Permissions

{% hint style="warning" %}
Direct user permissions cannot be edited if you're using [LDAP](./sso-login-services/ldap.md)/[Microsoft](./sso-login-services/microsoft.md) for SSO and 'auto-assign permission' is enabled. Permissions can only be [managed via permission groups](./permission-groups.md#edit-permissions-groups) in such a scenario.
{% endhint %}

You can edit the user permissions by clicking on the `downward arrow`.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/edit+user+permission_dropdown_1.JPG)

Edit the user permissions.

After you have done editing the user permissions, click `Save`.

If you want to delete the user/users with particular permissions, click `Delete`.