# Create Job

Devtron provides two ways to create a Job: 
* **Blank Job**: Create a new job by manually defining all configurations.
* **Clone Job**: Create a new job by reusing the configuration of an existing job.

## Create a Blank Job

To create a new **Blank Job** in Devtron, follow these steps:
1. From the **Devtron Dashboard** → **Jobs**.

2. Click the **Create** button in the top-right corner and select **Job** from the drop-down list.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/select-create-job-latest.jpg)

3. The **Create Job** page opens. From the left panel, select **Blank job**, then enter the required details as listed in the table below.

<!-- Provide below information on the `Create job` page to create a new **Blank Job**: -->

| Fields| Description|
|:---|:---|
| **Project**           | User-defined name for the job in Devtron.|
| **Job Name**           | User-defined name for the job in Devtron.|
| **Description**        | Enter the description of a job.|
|**Tags**|Key-value pairs used for identifying and organizing the application.<br>Users can propagate tags as Kubernetes labels to enable filtering, bulk operations, and integrations with Kubernetes tools.<ol><li> Click the **Add tags to job** dropdown on the **Create job** page.</li><li> Under the **Tags** section, Click `+` to add a new tag. <li>You can click `X` icon to delete an existing tag.</li><li>You can click the `propagation icon` <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg" height="10"> to propagate a tag (turns dark grey when propagated), click again to remove propagation.<br>[[Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-latest-1.jpg)]</li></ol>|

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/create-job-page.jpg)

4. Click **Create Job**. The job will be created, and you will be automatically redirected to the [Configurations page](./configuration.md)to continue setting up the job pipeline.
<!-- <ul><li>Tags can also be used to [configure PersistentVolumeClaims (PVCs)](#configure-persistentvolumeclaim-pvc) for build time optimization.</li></ul> -->

<!-- | **Select one of them** | <ul><li><strong>Create from scratch</strong> :Select the project from the drop-down list.<br><code>Note</code>: You have to add project under Global Configurations. Only then, it will appear in the drop-down list here.</li><li><strong>Clone existing application</strong>: Select an app you want to clone from and the project from the drop-down list.<br><code>Note</code>: You have to add project under Global Configurations. Only then, it will appear in the drop-down list here.</li></ul> | -->

## Create a Clone Job

To create a new **Clone Job** in Devtron, follow these steps:
1. From the **Devtron Dashboard** → **Jobs**.

2. Click the **Create** button in the top-right corner and select **Job** from the drop-down list.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/select-create-job-latest.jpg)

3. The **Create Job** page opens. From the left panel, select **Clone Job**, then enter the required details as listed in the table below.

<!-- Provide below information on the `Create job` page to create a new **Blank Job**: -->

| Fields| Description|
|:---|:---|
| **Project**           | User-defined name for the job in Devtron.|
| **Job Name**           | User-defined name for the job in Devtron.|
| **Description**        | Enter the description of a job.|
|**Tags**|Key-value pairs used for identifying and organizing the application.<br>Users can propagate tags as Kubernetes labels to enable filtering, bulk operations, and integrations with Kubernetes tools.<ol><li> Click the **Add tags to job** dropdown on the **Create job** page.</li><li> Under the **Tags** section, Click `+` to add a new tag. <li>You can click `X` icon to delete an existing tag.</li><li>You can click the `propagation icon` <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg" height="10"> to propagate a tag (turns dark grey when propagated), click again to remove propagation.<br>[[Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-latest-1.jpg)]</li></ol>|
| **Select an job to clone** | Select the existing job from the dropdown that you want to clone.Enter the description of a job.|

4. Click **Create Job**. The **Clone job** will be created, and you will be automatically redirected to the [Configurations page](./configuration.md), where the configuration will be pre-populated based on the selected source job. You may review and modify these settings as required.