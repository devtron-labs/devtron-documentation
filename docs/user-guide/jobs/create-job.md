# Create a New Job

In Devtron, jobs can be created in two ways:

* **Blank Job**: This allows you to create a new job from scratch by manually defining all configurations.

* **Clone Job**: This allows you to create a new job by reusing the configuration of an existing job.

---

## Create a Blank Job

:::caution Who Can Perform This Action?
Users need to have the **Admin role** or the **Super Admin role**.
Refer the [User permissions](../global-configurations/authorization/user-access.md#roles-available-for-jobs).
:::

To create a new **Blank Job** in Devtron, follow these steps:

1. Navigate to **Automation & Enablement** → **Jobs**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/jobs.jpg)
<center>Figure 1: Job's Page</center>

2. Click **Create** button in the top-right corner and select **Job** from the drop-down list.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/select-create-job.jpg)
<center>Figure 2: Selecting Job</center>

3. The **Create Job** page opens. From the left panel, select **Create from Scratch**, then enter the required details as listed in the table below.

    | Fields| Description|
    |:---|:---|
    | `Project`| Select the project from the dropdown.|
    | `Job Name`| User-defined name for the job in Devtron.|
    | `Description` | Enter the description for the job.|
    | `Tags`| Key-value pairs used for identifying and organizing the application and can be propagated as Kubernetes labels. To learn more refer [Tags](#tags) section.|

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/create-job-page.jpg)
<center>Figure 3: Creating Blank Job</center>

4. Click **Create Job**. The job will be created, and you will be automatically redirected to the [Configurations page](/docs/user-guide/jobs/configurations/README.md) to continue setting up the job pipeline.

---

## Create a Clone Job

:::caution Who Can Perform This Action?
Users need to have [Admin role](../global-configurations/authorization/user-access.md#roles-available-for-jobs) or above (along with access to the environment and applications) to perform environment override.
:::

To create a new **Clone Job** in Devtron, follow these steps:

1. From the Devtron Dashboard, navigate to **Jobs**.

2. Click the **Create** button in the top-right corner and select **Job** from the drop-down list.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/select-create-job.jpg)
<center>Figure 4: Selecting Job</center>

3. The **Create Job** page opens. From the left panel, select **Clone Job** and then choose a job to clone. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/select-job-to-clone.jpg)
<center>Figure 5: Choosing a Job to Clone</center>

4. Enter the required details as listed in the table below.

    | Fields| Description|
    |:---|:--- |
    | `Project`| Select the project from the dropdown.|
    | `Job Name`| User-defined name for the job in Devtron.|
    | `Description`| Enter the description of a job.|
    | `Tags`| Key-value pairs used for identifying and organizing the application and can be propagated as Kubernetes labels. To learn more refer [Tags](#tags) section.|

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/create-job-clone-job.jpg)
<center>Figure 6: Creating Clone Job</center>

4. Click **Create Job**. The **Clone job** will be created, and you will be automatically redirected to the [Configurations page](/docs/user-guide/jobs/configurations/README.md), where the configuration will be pre-populated based on the selected source job. You may review and modify these settings as required.

---

## Delete Job

:::caution Who Can Perform This Action?
Users need to have the **Admin role** or the **Super Admin role**.
Refer the [User permissions](../global-configurations/authorization/user-access.md#roles-available-for-jobs).
:::

To delete a job, you have to first delete any configured pipelines in that job workflow.

1. Navigate to **Automation & Enablement** → **Jobs** → **Select the job** → **Configurations** → **Workflow Editor**.

2. Select the job pipeline you wish to delete, and an edit job pipeline modal window will appear.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/workflow-editor-delete-select.jpg)
<center>Figure 7: Selecting Job Pipeline</center>

3. Select **Delete Pipeline** in the bottom left corner of the edit job pipeline modal window to delete the job pipeline.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/workflow-editor-delete-pipeline.jpg)
<center>Figure 8: Deleting Job Pipeline</center>

4. A pop-up window will appear asking you to confirm the **Delete Pipeline** action.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/workflow-editor-delete-dialog-box.jpg)
<center>Figure 9: Confirming Delete Job Pipeline</center>


5. After deleting any configured pipelines in a job workflow, select **Delete Job** to delete the job.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/create-job-delete-job.jpg)
<center>Figure 10: Deleting Job</center>

6. A pop-up window will appear asking you to confirm the **Delete Job** action.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/create-job-delete-job-dialog.jpg)
<center>Figure 11: Confirming Delete Job</center>

---

After creating a job, the next step is to configure the job. Refer to the [Configurations](./configurations/README.md) section to configure the job.

## Extras

### Tags 

Tags are Key-value pairs used for identifying and organizing the application. Users can propagate tags as Kubernetes labels to enable filtering, bulk operations, and integrations with Kubernetes tools. To do so, follow the steps below. 

1. Click the **Add tags to job** dropdown on the **Create job** page.

2. Under the **Tags** section, Click `+` to add a new tag.

3. You can click `X` icon to delete an existing tag.

4. You can click the **propagation icon** <span className="inline-badge">![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg)
</span> to propagate a tag (turns dark grey when propagated), click again to remove propagation.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/manage-tags.jpg)
<center>Figure 12: Tags</center>