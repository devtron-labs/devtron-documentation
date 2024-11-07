# Permission Groups

Using the `Permission groups`, you can assign a user to a particular group and a user inherits all the permissions granted to the group. 

The advantage of the `Permission groups` is to define a set of privileges like create, edit, or delete for the given set of resources that can be shared among the users within the group.

{% hint style="info" %}
The [User permissions](./user-permissions.md) section for `Specific permissions` contains a drop-down list of all existing groups for which a user has an access. This is an optional field and more than one groups can be selected for a user.
{% endhint %}

## Add Group

Go to **Global Configurations** → **Authorization** → **Permissions groups** → **Add group**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/permission-group/permission-group-1.png)

Enter the `Group Name` and `Description`.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/permission-group/permission-group-2.png)

You can either grant [super-admin](./user-permissions.md#role-based-access-levels) permission to a user group or specific permissions to manage access for:

   * [Helm Apps](#helm-apps-permissions)
   * [Kubernetes Resources](#kubernetes-resources-permissions)

### Helm Apps Permissions

In `Helm Apps` option, you can provide access to a group to manage permission for Helm apps deployed from Devtron or outside Devtron.

Provide the information in the following fields:

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/permission-group/permission-groups-helm-apps-v2.jpg)

| Dropdown | Description |
| --- | --- |
| **Project** | Select a project from the drop-down list to which you want to give permission to the group. You can select only one project at a time.<br>Note: If you want to select more than one project, then click `Add row`.</br> |
| **Environment or cluster/namespace** | Select the specific environment or `all existing environments in default cluster` from the drop-down list.<br>Note: If you select `all existing + future environments in default cluster` option, then a user gets access to all the current environments including any new environment which gets associated with the application later.</br> |
| **Application**  | Select the specific application or all applications from the drop-down list corresponding to your selected Environments.<br>Note: If `All applications` option is selected, then a user gets access to all the current applications including any new application which gets associated with the project later</br>.  |
| **Role**  | Select one of the [roles](#role-based-access-levels) to which you want to give permission to the user:<ul><li>`View only`</li></ul> <ul><li>`View & Edit`</li></ul><ul><li>`Admin`</li></ul>  |

You can add multiple rows for Devtron app permission.

Once you have finished assigning the appropriate permissions for the groups, Click **Save**.

### Kubernetes Resources Permissions

In `Kubernetes Resources` option, you can provide permission to view, inspect, manage, and delete resources in your clusters from [Resource Browser](../resource-browser/README.md) in Devtron. You can also create resources from Resource Browser.

{% hint style="info" %}
Only super admin users will be able to see `Kubernetes Resources` tab and provide permission to other users to access `Resource Browser`.
{% endhint %}

To provide Kubernetes resource permission, click `Add permission`.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/permission-group/kubernetes-resources-permission-group-v2.jpg)

On the `Kubernetes resource permission`, provide the information in the following fields:

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/user-access/user-permission/kubernetes-resources-permission-page-v2.jpg)

| Dropdown | Description |
| --- | --- |
| **Cluster** | Select a cluster from the drop-down list to which you want to give permission to the user. You can select only one cluster at a time.<br>Note: To add another cluster, then click `Add another`.</br> |
| **Namespace** | Select the namespace from the drop-down list. |
| **API Group**  | Select the specific API group or `All API groups` from the drop-down list corresponding to the K8s resource.  |
 **Kind**  | Select the kind or `All kind` from the drop-down list corresponding to the K8s resource.  |
  **Resource name**  | Select the resource name or `All resources` from the drop-down list to which you want to give permission to the user. |
| **Role**  | Select one of the [roles](#role-based-access-levels) to which you want to give permission to the user and click `Done`:<ul><li>`View`</li></ul> <ul><li>`Admin`</li></ul>  |

You can add multiple rows for Kubernetes resource permission.

Once you have finished assigning the appropriate permissions for the groups, Click **Save**.

### Edit Permissions Groups

You can edit the permission groups by clicking the `downward arrow.`

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/permission-group/edit-permission-group.jpg)

Edit the permission group.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/permission-group/save-permission-group.jpg)

Once you are done editing the permission group, click **Save**.

If you want to delete the groups with particular permission group, click **Delete**.


