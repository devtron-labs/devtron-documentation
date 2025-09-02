# Overview

The Overview page provides a centralized view of an application’s details within Devtron. It allows users to quickly access information about the application, manage tags, view deployment environments, and understand inter-app dependencies, all in a single, organized interface.

The **Overview** page contains three main sections:
*	[**About**](#about): Contains application metadata such as name, description, project, creator, tags, and connected code source. It also includes options to manage tags and [Configure PVCs](#configure-persistentvolumeclaim-pvc).
*	[**Environments**](#environments): Displays all environments where the application is deployed, along with their current status and quick access to associated workflows.
*	[**Dependencies**](#dependencies): Shows which Devtron applications this application depends on, and which other Devtron applications depend on it, thus helping visualize microservices dependency.

![Figure 1: Overview Tab](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/overview-latest-1.jpg)

## About

The **About** section allows you to:

* View key application details
* Change the project your application is assigned to
* Manage tags that you may have added during the application’s creation
* [Configure Persistent Volume Claims (PVCs)](#configure-persistentvolumeclaim-pvc)

The left side of the **About** section displays essential information about the application.

![Figure 2: About Section](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/left-about.jpg)

 The table below captures all the key elements presented in this section, along with their descriptions and whether they can be edited by the user.

| Field Name | User Editable |Description|
| :--------- | :--------------- |:--------- |
| **Application Name** | No |Displays the name of the application (e.g., backend-healthcare-app).|
| **Short Description**|Yes|A short, optional description to summarize the application's purpose.|
| **Project** |Yes|Indicates the current project under which the application is organized.<br>You can change the project directly from this section.<ol><li> Click the **Edit** icon next to the current project.</li><li> In the **Change Project** window, select the new project from the dropdown.</li><li>Click **Save**.</li></ol>Changing the project will revoke access for existing users and grant access only to those who have permissions in the newly selected project.|
| **Created on** |No|Shows the exact date and time when the application was created.|
| **Created by**|No|Displays the email address of the user who created the application.|
| **Code Source** |No|Shows the connected Git repository or template used for the application.|
| **Part of release track** |No|Lists all release track names linked to the app.<ul><li>Clicking a release opens its detailed view in the Software Distribution Hub.</li><li>This is an enterprise-only feature available as part of Devtron's SDH offering.</li></ul>|
| **Tags** |Yes| Refer [Manage Tags](#manage-tags) |


### Manage Tags

Tags are key-value pairs used to identify and organize applications effectively. These tags can be propagated as Kubernetes labels, enabling filtering, bulk operations, and integrations with Kubernetes tools.

1. Click the **Edit** icon next to **Tags**.
2. On the **Manage Tags** page, click **+ Add tag** to create a new tag.
3. To delete a tag, click the **X** icon next to it.
4. To propagate a tag as a Kubernetes label, click the **Propagation** icon ![propagation icon](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg).  
   - The icon turns dark grey when propagation is enabled.  
   - Click again if you wish to disable propagation.  
   
  ![Snapshot of Manage Tags](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-latest-1.jpg)

5. Click **Save**. The configured tags will appear under the **Tags** in the **About** section immediately.

> **Note:** Tags can also be used to [configure PersistentVolumeClaims (PVCs)](#configure-persistentvolumeclaim-pvc) to optimize build time.


### Readme
The right side of the **About** section contains a **Readme** area where you can maintain application-specific notes or documentation. The **Readme** supports Markdown formatting, making it easy to include formatted text, instructions, or important context related to the application.

![Figure 3: Readme](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/readme-edit.jpg)

To add or update the **Readme**:
1.	Click the **Edit** button in the Readme section.
2.	A Markdown editor will appear where you can write or modify content under the **Write** tab.
3.	Use standard Markdown syntax to format text, create lists, insert links, and more.
4.	Preview the content using the **Preview** tab.
5.	Click **Save** to update the Readme.

![Figure 4: Editing Readme](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/readme.jpg)

{% hint style="info" %}
 After saving, the system displays the email address of the user who last updated the README, along with the date and time. This information appears in the header of the Readme section, beside the title.
{% endhint %}

### Deployment Window [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The **Deployment Window** in the **About** section displays all Blackout Windows and Maintenance Windows configured for your application’s environments.

These windows are defined by Super-Admins to control when deployments and related actions are allowed or blocked. The goal is to minimize disruptions during critical business hours.

*	**Blackout Window**: Periods during which deployments are strictly blocked.
*	**Maintenance Window**: Periods during which deployments are allowed; outside of this window, they are blocked.
*	If both are configured for the same time period, **Blackout Window** takes precedence.

You can expand each environment row to view detailed information like window name, duration, and frequency.

![Figure 5: Deployment Window](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/deployement-window.jpg)

{% hint style=“info” %}
This section is view-only and does not require any configuration at the application level.
{% endhint %}

> To learn how to configure deployment windows, refer to the [Deployment Window documentation](../global-configurations/deployment-window.md).

### Catalog [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The **Catalog** in the **About** section displays information about your application, such as documentation references, ownership details, and technical specifications. This data is managed using [Devtron’s Catalog Framework](../global-configurations/catalog-framework.md).

![Figure 6: Catalog](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/catalog.jpg)

You can use the **Catalog framework** to maintain information about your application, such as Documentation (e.g., API contract, service documentation), ownership details, technical attributes, etc. This makes it easier for others to understand, manage, and use your application.

Super-Admins define a custom JSON schema that determines what fields are shown in the catalog form. This schema is specific to each resource type, such as Devtron applications.

When you click the **Edit** icon, a form appears based on the defined schema. As an application owner or client, you can fill out fields like:

*	Documentation (e.g., API contract, service documentation)
*	Code owners and on-call responsibilities
*	Service attributes (e.g., internet-facing flag, communication method, framework, language)

![Figure 7: Catalog Form](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/catalog-expanded.jpg)

{% hint style= "info" %}
The structure and labels in the catalog form are entirely configurable by your platform team via JSON schema in **Catalog Framework**. Field names and sections may vary depending on how the schema was defined by your organization.
{% endhint %}

Once saved, this information is displayed in a readable format within the Catalog subsection and is accessible to all users who have permission to view the application.

![Figure 8: Catalog Final View](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/catalog-final.jpg)

### Configure PersistentVolumeClaim (PVC)

A [PersistentVolumeClaim (PVC)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) is a request for storage, which is used to mount a PersistentVolume (PV) into a Pod that can be used by your application’s CI pipeline.

In Devtron, you can use a [PersistentVolumeClaim (PVC)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) to provide persistent storage to the Pod that runs your CI pipeline, enabling the pod to store and reuse cached data such as dependencies.

Mounting a PVC into the build Pod gives it access to a dedicated storage volume for caching, without interfering with the normal build process, which continues to run based on the architecture and operating system of the Kubernetes node where the CI pipeline is executed.

#### Configure PVC in Your Application

##### Create a PVC 

Before you can configure an Application to use a PVC, you need to make sure the PVC is created in the Kubernetes cluster.

The following is a sample PVC YAML configuration. You can modify it as needed based on your storage class, access mode, and resource requirements:

{% code title="pvc.yaml" overflow="wrap" lineNumbers="true" %}
```bash
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: cache-pvc
  namespace: devtron-ci
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: standard-rwo
  resources:
    requests:
      storage: 30Gi
```
{% endcode %}
      
You can apply this configuration using Devtron’s **Resource Browser** 

**Apply using Devtron’s Resource Browser**

1.	Navigate to [Resource Browser](../resource-browser/README.md) in the Devtron sidebar.
2.	Select the Cluster where your CI pipelines run.
3.	Click **Create Resource**.
4.	Paste the YAML into the editor and click **Create**.
5. The PVC will now be created and will appear under **Resource Browser** → **Config & Storage** → **PersistentVolumeClaim** with the status shown as `Bound`

##### Apply PVC to CI Pipelines Using Tags

Once PVC is created and in the Bound state, the next step is to configure it within your application using tags from the **About** section.

Devtron allows you to define special tags as key-value pairs. These tags act as instructions for Devtron to mount the specified PVC to the Pod where the CI pipeline runs, making the storage available during pipeline execution.

You can choose to mount the PVC for all pipelines in the application or for a specific pipeline, depending on your use case. The configuration remains the same in both cases, the only difference lies in the tag key used to define the scope of the PVC.

Follow the steps below to apply the PVC to all or specific pipelines
1. Navigate to your application’s **Overview** → **About** section.
2. Click the **Edit** icon next to the Tags section.

![Figure 9: Clicking Edit Icon](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/pvc-edit-tags-1.jpg)

3. Add one of the following key-value tags depending on how you want the PVC to be applied
  * To mount the PVC across all pipelines in the application

| Key | Value|
|:--- |:---  | 
|devtron.ai/ci-pvc-all | cache-pvc |

![Figure 10: Mounting PVC across all pipelines](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-pvc-1.jpg)

  * To mount the PVC for a specific pipeline only in the application

| Key | Value|
|:--- |:---  | 
|devtron.ai/ci-pvc-<pipeline-name>| cache-pvc |

![Figure 11a: Finding Pipeline name](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/pipeline-name-pvc-1.jpg)

![Figure 11b: Mounting PVC to a specific pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/pipeline-level-tag.jpg)

> Replace <pipeline-name> with the exact name of the CI pipeline (visible in the Workflow Editor).

4. Click **Save** to apply the tag.

After saving, Devtron will automatically mount the PVC into your CI pipeline Pod, allowing it to use the configured persistent storage for caching purposes. No further manual configuration is required.

## Environments

The Environments section provides a detailed view of all environments where the application is configured. For each environment, it displays

| Field Name |Description|
| :--------- |:--------- |
| **Application Status** |The current application status in that particular environment.|
| **Environment** | Displays the name of the Environment.|
| **Last Deployed**|Shows the image tag or artifact version from the latest deployment. If the application has not been deployed yet, this shows Not Deployed.|
| **Commit**|Displays the Git commit hash associated with the last deployment.|
| **Deployed At**|Indicates who deployed the application and when, it is shown as the email ID of the user along with a relative timestamp (e.g.,9 days ago).|

![Figure 12: Environments List](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/environments.jpg)

## Dependencies [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The Dependencies section displays the relationship of the current application with other Devtron-managed applications in the form of upstream and downstream dependencies.

* Upstream dependencies are other applications that the current application depends on.
* Downstream dependencies are applications that rely on the current application.

### Upstream Dependencies

Upstream dependencies are other Devtron applications that your current application depends on. You can manually define upstream dependencies to indicate that your application depends on certain Devtron applications.

To add upstream dependencies:
1. Click the **Add Dependency** button in the **Dependencies** section. If dependencies already exist, click the **Edit Dependency** button on the right instead.

![Figure 13: Dependencies Section](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies.jpg)

2. In the right-side panel, under Upstream Dependency, click **+ Add Dependency**.

![Figure 14: Adding Dependency](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-2.jpg)

3. Use the search bar to find and select one or more applications that your app depends on.

![Figure 15: Selecting dependency](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-3.jpg)

4. Click **Map Environments** to associate each selected application with a specific environment.
  * This helps Devtron understand where your dependencies are running. By mapping environments, you can view the correct deployment details (like image, commit, and status) for each dependency.

![Figure 16: Mapping Environments](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-4.jpg)

5. Once you’ve mapped the environments, click **Save** to confirm and apply the upstream dependencies.

![Figure 17: Selecting environments for each dependency](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-5.jpg)

6. After saving:
  *	The selected applications will appear under **Dependent Applications** above your current application as Upstream Dependencies.
  *	Your current application will be shown in bold, displaying its mapped environment and latest deployment details.
    * You can switch the environment of your current application using the dropdown next to its name under **Environment**. This allows you to view the upstream and downstream dependencies specific to that environment. The table will refresh to show deployment details for the selected environment.
  * Any applications that have added your app as an upstream will automatically be listed below your app as Downstream Dependencies.

![Figure 18: Dependencies List](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-6.jpg)

### Downstream Dependencies

Downstream dependencies are Devtron applications that rely on current application. These are automatically listed when your app is added as an upstream in another application’s configuration.

You don’t need to configure anything manually for downstream entries, they are system-generated based on how other apps define their upstreams.

For every downstream application listed, a **Map Environment** link appears beside its name.

* Clicking this link redirects you to that application’s Dependencies section, where your app will appear in the upstream list.

* From there, you can assign or update the environment mapping for your app in the context of that downstream application.
