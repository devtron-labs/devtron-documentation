# Overview

The Overview page provides a centralized view of an application’s details within Devtron. It allows users to quickly access information about the application, manage tags, view deployment environments, and understand inter-app dependencies — all in a single, organized interface.

The **Overview** page contains three main sections:
*	[**About**](#about): Contains application metadata such as name, description, project, creator, tags, and connected code source. It also includes options to manage tags and configure PVCs.
*	[**Environments**](#environments): Displays all environments where the application is deployed, along with their current status and quick access to associated workflows.
*	[**Dependencies**](#dependencies): Shows which Devtron applications this application depends on, and which other Devtron applications depend on it — helping visualize inter-app relationships.

![Figure 1: Overview](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/overview-latest-1.jpg)

## About

The **About** section allows you to:

* View key application details
* Change the project your application is assigned to
* Manage tags that you may have added during the application’s creation
* Configure Persistent Volume Claims (PVCs)

The left side of the **About** section displays essential information about the application.

![Figure 2a: About Section](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/left-about.jpg)

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
| **Tags** |Yes|Key-value pairs used for identifying and organizing the application.<br>Users can propagate tags as Kubernetes labels to enable filtering, bulk operations, and integrations with Kubernetes tools.<ol><li> Click the **Edit** icon next to **Tags**.</li><li> On the **Manage Tags** page, Click **+ Add tag** to add a new tag. <li>You can click **X** icon to delete an existing tag.</li><li>You can click the **propagation icon** <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg" height="10"> to propagate a tag (turns dark grey when propagated), click again to remove propagation.<br>[[Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-latest-1.jpg)]</li><li> Click `Save`, Configured Tags will reflect immediately under **Tags** in **About** Section </li></ol><ul><li>Tags can also be used to [configure PersistentVolumeClaims (PVCs)](#configure-persistentvolumeclaim-pvc) for build time optimization.</li></ul> |

### Readme
The right side of the **About** section contains a **Readme** area where you can maintain application-specific notes or documentation. The **Readme** supports Markdown formatting, making it easy to include formatted text, instructions, or important context related to the application.

![Figure 2b: Readme](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/readme-edit.jpg)

To add or update the **Readme**:
1.	Click the **Edit** button in the Readme section.
2.	A Markdown editor will appear where you can write or modify content under the **Write** tab.
3.	Use standard Markdown syntax to format text, create lists, insert links, and more.
4.	Preview the content using the **Preview** tab.
5.	Click **Save** to update the Readme.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/readme.jpg)

{% hint style="info" %}
 After saving, the system displays the email address of the user who last updated the README, along with the date and time. This information appears in the header of the Readme section, beside the title.
{% endhint %}

### Deployment Window [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The **Deployment Window** in the **About** section displays all Blackout Windows and Maintenance Windows configured for your application’s environments.

These windows are defined by Super-Admins to control when deployments and related actions are allowed or blocked. The goal is to minimize disruptions during critical business hours or maintenance periods.

*	**Blackout Window**: Periods during which deployments are strictly blocked.
*	**Maintenance Window**: Periods during which deployments are allowed; outside of this window, they are blocked.
*	If both are configured for the same time period, **Blackout Window** takes precedence.

You can expand each environment row to view detailed information like window name, duration, and frequency.

![Figure 2c: Deployement Window](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/deployement-window.jpg)

{% hint style=“info” %}
This section is view-only and does not require any configuration at the application level.
{% endhint %}

> To learn how to configure deployment windows, refer to the [Deployment Window documentation](../global-configurations/deployment-window.md).

### Catalog [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The **Catalog** in the **About** section displays information about your application—such as documentation references, ownership details, and technical specifications. This data is managed using [Devtron’s Catalog Framework](../global-configurations/catalog-framework.md).

![Figure 2d: Catalog](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/catalog.jpg)

Super-Admins define a custom JSON schema that determines what fields are shown in the catalog form. This schema is specific to each resource type, such as Devtron applications.

When you click the **Edit** icon, a form appears based on the defined schema. As an application owner or client, you can fill out fields like:
*	Documentation (e.g., API contract, service documentation)
*	Code owners and on-call responsibilities
*	Service attributes (e.g., internet-facing flag, communication method, framework, language)

![Figure 2e: Catalog Form ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/catalog-expanded.jpg)

{% hint style= "info" %}
The structure and labels in the catalog form are entirely configurable by your platform team via JSON schema in **Catalog Framework**. Field names and sections may vary depending on how the schema was defined by your organization.
{% endhint %}

Once saved, this information is displayed in a readable format within the Catalog subsection and is accessible to all users who have permission to view the application.

![Figure 2e: Catalog final view ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/catalog-final.jpg)

### Configure PersistentVolumeClaim (PVC)

A [PersistentVolumeClaim (PVC)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) is a request for storage, which is used to mount a PersistentVolume (PV) into a Pod that can be used by your application’s CI pipeline.

In Devtron, you can use a PersistentVolumeClaim (PVC) to provide persistent storage to the Pod that runs your CI pipeline, enabling the pod to store and reuse cached data such as dependencies. This is particularly beneficial when building for multiple target platforms like amd64 and arm64, where caching can significantly reduce build time.

Mounting a PVC into the build Pod gives it access to a dedicated storage volume for caching, without interfering with the normal build process, which continues to run based on the architecture and operating system of the Kubernetes node where the CI pipeline is executed.

#### Configure PVC in Your Application

##### Create a PVC 

Before you can configure an Application to use a PVC, you need to make sure the PVC is created in the Kubernetes cluster.

The following is a sample PVC YAML configuration. You can modify it as needed based on your storage class, access mode, and resource requirements:

```
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
You can apply this configuration using either of the following methods:

**Apply using kubectl**

1. Save the above YAML in a file named `cache-pvc.yaml`.
2. Run the following command:
```
kubectl apply -f cache-pvc.yaml
```
3. The PVC will now be created and visible using:
```
kubectl get pvc -n devtron-ci
```
4. You should see its status as `Bound`, indicating that it’s successfully created and ready to be used by your CI pipelines.

**Apply using Devtron’s Resource Browser**

1.	Navigate to [Resource Browser](../resource-browser.md) in the Devtron sidebar.
2.	Select the Cluster where your CI pipelines run.
3.	Click **Create Resource**.
4.	Paste the YAML into the editor and click **Create**.
5. The PVC will now be created and will appear under **Resource Browser** → **Config & Storage** → **PersistentVolumeClaim** with the status shown as `Bound`

**2.** **Apply PVC to CI Pipelines Using Tags**

Once PVC is created and in the Bound state, the next step is to configure it within your application using tags from the **About** section.

Devtron allows you to define special tags as key-value pairs. These tags act as instructions for Devtron to mount the specified PVC to the Pod where the CI pipeline runs, making the storage available during pipeline execution.

You can choose to mount the PVC for all pipelines in the application or for a specific pipeline, depending on your use case. The configuration remains the same in both cases — the only difference lies in the tag key used to define the scope of the PVC.

Follow the steps below to apply the PVC to all or specific pipelines
1. Navigate to your application’s **Overview** → **About** section.
2. Click the **Edit** icon next to the Tags section.

![Figure 3a: Click on the Edit Icon](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/pvc-edit-tags-1.jpg)

3. Add one of the following key-value tags depending on how you want the PVC to be applied
  * To mount the PVC across all pipelines in the application

| Key | Value|
|:--- |:---  | 
|devtron.ai/ci-pvc-all | cache-pvc |

![Figure 3b: Mount PVC across all pipelines](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-pvc-1.jpg)

  * To mount the PVC for a specific pipeline only in the application

| Key | Value|
|:--- |:---  | 
|devtron.ai/ci-pvc-<pipeline-name>| cache-pvc |

![Figure 3c: Find Pipeline name](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/pipeline-name-pvc-1.jpg)

![Figure 3d: Mount PVC to a specific pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/pipeline-level-tag.jpg)

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
| **Comit**|Displays the Git commit hash associated with the last deployment.|
| **Deployed AT**|Indicates who deployed the application and when, it is shown as the email ID of the user along with a relative timestamp (e.g.,9 days ago).|

![Figure 4: Environments](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/environments.jpg)

## Dependencies [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The Dependencies section displays the relationship of the current application with other Devtron-managed applications in the form of upstream and downstream dependencies.

* Upstream dependencies are other applications that the current application depends on.
* Downstream dependencies are applications that rely on the current application.

### Upstream Dependencies

Upstream dependencies are other Devtron applications that your current application depends on. You can manually define upstream dependencies to indicate that your application depends on certain devtron applications.

To add upstream dependencies:
1. Click the **Add Dependency** button in the **Dependencies** section. If dependencies already exist, click the **Edit Dependency** button on the right instead.

![Figure 5a: Dependencies Section](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies.jpg)

2. In the right-side panel, under Upstream Dependency, click **+ Add Dependency**.

![Figure 5b:Add Dependency](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-2.jpg)

3. Use the search bar to find and select one or more applications that your app depends on.

![Figure 5c: Select dependency](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-3.jpg)

4. Click **Map Environments** to associate each selected application with a specific environment.
  * This helps Devtron understand where your dependencies are running. By mapping environments, you can view the correct deployment details (like image, commit, and status) for each dependency.

![Figure 5d: Map Environments](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-4.jpg)

5. Once you’ve mapped the environments, click **Save** to confirm and apply the upstream dependencies.

![Figure 5e: Select environments for each dependency](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-5.jpg)

6. After saving:
*	The selected applications will appear under **Dependent Applications** above your current application as Upstream Dependencies.
*	Your current application will be shown in bold, displaying its mapped environment and latest deployment details.
    * You can switch the environment of your current application using the dropdown next to its name under **Environment**. This allows you to view the upstream and downstream dependencies specific to that environment. The table will refresh to show deployment details for the selected environment.
* Any applications that have added your app as an upstream will automatically be listed below your app as Downstream Dependencies.

![Figure 5f: Dependencies List](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/add-dependencies-part-6.jpg)

### Downstream Dependencies

Downstream dependencies are Devtron applications that rely on current application. These are automatically listed when your app is added as an upstream in another application’s configuration.

You don’t need to configure anything manually for downstream entries — they are system-generated based on how other apps define their upstreams.

For every downstream application listed, a **Map Environment** link appears beside its name.

* Clicking this link redirects you to that application’s Dependencies section, where your app will appear in the upstream list.

* From there, you can assign or update the environment mapping for your app in the context of that downstream application.