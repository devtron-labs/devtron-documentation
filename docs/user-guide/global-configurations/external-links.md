# External Links

External Links allow you to connect to the third-party applications within your Devtron dashboard for seamlessly monitoring/debugging/logging/analyzing your applications. You can select from the pre-defined third-party applications such as `Grafana` to link to your application for quick access.

Configured external links will be available on the `App details` page. You can also integrate `Document` or `Folder` using **External Links**.

Some of the third-party applications which are pre-defined on `Devtron` Dashboard are:
* Grafana
* Kibana
* Newrelic
* Coralogix
* Datadog
* Loki
* Cloudwatch
* Swagger 
* Jira etc.



## Use Case for Monitoring Tool

To monitor/debug an application using a specific Monitoring Tool (such as Grafana, Kibana, etc.), you may need to navigate to the tool's page, then to the respective app/resource page.

`External Links` can take you directly to the tool's page, which includes the context of the application, environment, pod, and container.

## Prerequisites

Before you begin, configure an application in the Devtron dashboard.

- Super admin access
- Monitoring tool URL

**Note**: External links can only be added/managed by a super admin, but non-super admin users can [access the configured external links](../app-details/README.md) on the `App Configuration` page.

## Add an External Link

1. On the Devtron dashboard, go to the `Global Configurations` from the left navigation pane.
2. Select `External links`.
   
![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/external-links/external-links-v2.jpg)

3. Select **Add Link**.
4. On the `Add Link` page, select the external link (e.g. Grafana) which you want to link to your application from Webpage.


![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/external-links/external-add-link.jpg)

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/external-links/external-link-specific-applications.jpg)

The following fields are provided on the **Add Link** page:

| Field         | Description |
|---------------|-------------|
| **Link name** | Provide name of the link. |
| **Description** | Description of the link name. |
| **Show link in** | - All apps in specific clusters: Select this option to select the cluster.<br/>- Specific applications: Select this option to select the application. |
| **Clusters** | Choose the clusters for which you want to configure the selected external link with.<br/><br/>- Select one or more than one cluster to enable the link on the specified clusters.<br/>- Select All Clusters to enable the link on all the clusters. |
| **Applications** | Choose the application for which you want to configure the selected external link with.<br/><br/>- Select one or more than one application to enable the link on the specified application.<br/>- Select All applications to enable the link on all the applications.<br/><br/>**Note**: If you enable `App admins can edit`, then you can view the selected links on the App-Details page. |
| **URL Template** | The configured URL Template is used by apps deployed on the selected clusters/applications.<br/><br/>By combining one or more of the env variables, a URL with the structure shown below can be created:<br/><br/>http://www.domain.com/`{namespace}`/`{appName}`/details/`{appId}`/env/`{envId}`/details/`{podName}`<br/><br/>If you include the variables `{podName}` and `{containerName}` in the URL template, then the configured links (e.g. Grafana) will be visible only on the pod level and container level respectively.<br/><br/>The env variables:<br/>- `{appName}`<br/>- `{appId}`<br/>- `{envId}`<br/>- `{namespace}`<br/>- `{podName}`: If used, the link will only be visible at the pod level on the [App Details](../app-details/README.md) page.<br/>- `{containerName}`: If used, the link will only be visible at the container level on the [App Details](../app-details/README.md) page.<br/><br/>**Note**: The env variables will be dynamically replaced by the values that you used to configure the link. |


> Note: To add multiple links, select **+ Add another** at the top-left corner.

Click **Save**.

## Access an external link

The users (admin and others) can access the configured external link on the [App Details](../app-details/README.md) page. 

**Note**: If you enable `App admins can edit` on the `External Links` page, then only non-super admin users can view the selected links on the `App Details` page. 

## Manage External links

On the `External Links` page, the configured external links can be filtered/searched, as well as edited/deleted.

Go to **Application Management** → **Configurations** → **External links**.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/external-links/manage-external-links-v2.jpg)

* Filter and search the links based on the link's name or a user-defined name.
* Edit a link by selecting the edit icon next to an external link.
* Delete an external link by selecting the delete icon next to a link. The bookmarked link will be removed in the clusters for which it was configured.
