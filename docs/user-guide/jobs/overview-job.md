# Overview

The Overview page provides a centralized view of a job’s details within Devtron. It allows users to quickly access information about the job, manage tags, and view job pipelines — all in a single, organized interface.

![Figure 1: Job's Overview](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/overview-job.jpg)

The **Overview** page contains three main sections:

* [**About**](#about): Contains job's metadata such as name, description, project, project, creator, and it also includes options to manage tags.

* [**Job Pipelines**](#job-pipelines): Displays all job pipelines along with their last status and quick access to associated workflows.

---

## About

The **About** section allows you to:

* View key job details
* Change the project your application is assigned to
* Manage tags that you may have added during the job’s creation

The left side of the **About** section displays essential information about the job.

![Figure 2: Job's Basic Info](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/overview-job-about-left.jpg)

The table below captures all the key elements presented in this section, along with their descriptions and whether they can be edited by the user.

| Field Name | User Editable |Description|
| :--------- | :--------------- |:--------- |
| `Job Name` | No |Displays the name of the application (e.g., backend-healthcare-app).|
| `Short Description`|Yes|A short, optional description to summarize the application's purpose.|
| `Project` |Yes|Indicates the current project under which the application is organized.<br>You can change the project directly from this section.<ol><li> Click the `Edit` icon next to the current project.</li><li> In the `Change Project` window, select the new project from the dropdown.</li><li>Click `Save`.</li></ol>Changing the project will revoke access for existing users and grant access only to those who have permissions in the newly selected project.|
| `Created on` |No|Shows the exact date and time when the application was created.|
| `Created by`|No|Displays the email address of the user who created the application.|
| `Tags` |Yes|Key-value pairs used for identifying and organizing the application and can be propagated as Kubernetes labels. To learn more refer [Tags](#tags) section.|

### Tags 

Tags are Key-value pairs used for identifying and organizing the application. Users can propagate tags as Kubernetes labels to enable filtering, bulk operations, and integrations with Kubernetes tools. To do so, follow the steps below. 

1. Click the **Edit** icon next to **Tags**.

2. On the **Manage Tags** page, Click **+ Add tag** to add a new tag.

3. You can click `X` icon to delete an existing tag.

4. You can click the **propagation icon** <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg" alt=""> to propagate a tag (turns dark grey when propagated), click again to remove propagation.

5. Click **Save**, configured Tags will reflect immediately under **Tags** in **About** Section

    ![Figure 3: Tags](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-latest-1.jpg)

### Readme

The right side of the **About** section contains a **README** area where you can maintain job-specific notes or documentation. The `Readme` supports Markdown formatting, making it easy to include formatted text, instructions, or important context related to the application.

![Figure 4: Readme](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/overview-job-readme.jpg)

To add or update the **Readme**:
1.	Click the **Edit** button in the Readme section.
2.	A Markdown editor will appear where you can write or modify content under the `Write` tab.
3.	Use standard Markdown syntax to format text, create lists, insert links, and more.
4.	Preview the content using the **Preview** tab.
5.	Click **Save** to update the README.

![Figure 5: Editing Readme](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/overview-job-readme-edit.jpg)

{% hint style="info" %}
 After saving, the system displays the email address of the user who last updated the README, along with the date and time. This information appears in the header of the Readme section, beside the title.
{% endhint %}

### Catalog [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The **Catalog** in the **About** section displays information about your job, such as Container port, Environment Variables, Arguments, Resources(CPU and RAM). This data is managed using [Devtron’s Catalog Framework](../global-configurations/catalog-framework.md).

![Figure 6: Catalog](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/overview-job-catalog.jpg)

You can use the **Catalog framework** to maintain information about your job, such as Environment Variables, Resources(CPU and RAM), service documentation, etc. This makes it easier for others to understand, manage, and use your job.

`Super-Admins` define a custom JSON schema that determines what fields are shown in the catalog form. This schema is specific to each resource type, such as Devtron jobs.

When you click the **Edit** icon, a form appears based on the defined schema. As a job owner, you can fill out fields like:
*	Container port (e.g., API contract, service documentation)
*	Environment Variables 
*	Arguments
*   Resources(CPU and RAM)

![Figure 7: Editing Catalog](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/overview-job-catalog-expand.jpg)

{% hint style= "info" %}
The structure and labels in the catalog form are entirely configurable by your platform team via JSON schema in **Catalog Framework**. Field names and sections may vary depending on how the schema was defined by your organization.
{% endhint %}

Once saved, this information is displayed in a readable format within the Catalog subsection and is accessible to all users who have permission to view the job.

![Figure 8: Catalog Overview](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/overview-job-catalog-saved.jpg)

---

## Job Pipelines

The Job Pipelines section provides a detailed view of all job pipelines. For each job pipeline, it displays

| Field Name |Description|
| :--------- |:--------- |
| Pipeline name |Name of the job pipeline.|
| Last Run Status|Displays the status of the most recent job execution|
| Run in environment | Displays the name of the environment in which the job is executed. |
| Last Run At| Displays how long ago the job was last triggered.|

![Figure 9: Job Pipelines](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/overview-job-job-pipelines.jpg)
