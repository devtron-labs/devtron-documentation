# Create Job

In Devtron, jobs can be created in two ways:

* **Blank Job**: This allows you to create a new job from scratch by manually defining all configurations.

* **Clone Job**: This allows you to create a new job by reusing the configuration of an existing job.

---

## Create a Blank Job

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have the **Admin role** or the **Super Admin role**.
Refer the [User permissions](../global-configurations/authorization/user-access.md#roles-available-for-jobs).
{% endhint %}

To create a new **Blank Job** in Devtron, follow these steps:

1. Navigate to **Devtron Dashboard** → **Jobs**.

    ![Figure 1: Job's Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/jobs.jpg)

2. Click **Create** button in the top-right corner and select **Job** from the drop-down list.

    ![Figure 2: Selecting Job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/select-create-job-latest.jpg)

3. The **Create Job** page opens. From the left panel, select **Blank job**, then enter the required details as listed in the table below.

    | Fields| Description|
    |:---|:---|
    | `Project`| Select the project from the dropdown.|
    | `Job Name`| User-defined name for the job in Devtron.|
    | `Description` | Enter the description for the job.|
    | `Tags`| Key-value pairs used for identifying and organizing the application and can be propagated as Kubernetes labels. To learn more refer [Tags](#tags) section.|

    ![Figure 3: Creating Blank Job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/create-job-page.jpg)

4. Click **Create Job**. The job will be created, and you will be automatically redirected to the [Configurations page](/docs/user-guide/jobs/configurations/README.md) to continue setting up the job pipeline.

---

## Create a Clone Job

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have [Admin role](../global-configurations/authorization/user-access.md#roles-available-for-jobs) or above (along with access to the environment and applications) to perform environment override.
{% endhint %}

To create a new **Clone Job** in Devtron, follow these steps:

1. From the Devtron Dashboard, navigate to **Jobs**.
2. Click the **Create** button in the top-right corner and select **Job** from the drop-down list.

    ![Figure 4: Selecting Job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/select-create-job-latest.jpg)

3. The **Create Job** page opens. From the left panel, select **Clone Job**, then enter the required details as listed in the table below.

    | Fields| Description|
    |:---|:--- |
    | `Project`| Select the project from the dropdown.|
    | `Job Name`| User-defined name for the job in Devtron.|
    | `Description`| Enter the description of a job.|
    | `Tags`| Key-value pairs used for identifying and organizing the application and can be propagated as Kubernetes labels. To learn more refer [Tags](#tags) section.|

    ![Figure 5: Creating Clone Job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/create-job-clone-job.jpg)

4. Click **Create Job**. The **Clone job** will be created, and you will be automatically redirected to the [Configurations page](/docs/user-guide/jobs/configurations/README.md), where the configuration will be pre-populated based on the selected source job. You may review and modify these settings as required.

---

## Delete Job

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have the **Admin role** or the **Super Admin role**.
Refer the [User permissions](../global-configurations/authorization/user-access.md#roles-available-for-jobs).
{% endhint %}

To delete a job, you have to first delete any configured pipelines in that job workflow.

1. Navigate to **Jobs** → **Select the job** → **Configurations** → **Workflow Editor**.

2. Select the job pipeline you wish to delete, and an edit job pipeline modal window will appear.

    ![Figure 6: Selecting Job Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-delete-select.jpg)

3. Select **Delete Pipeline** at the bottom left corner of the edit job pipeline modal window to delete the job pipeline.

    ![Figure 7: Deleting Job Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-delete-pipeline.jpg)

4. A pop-up window will appear asking you to confirm the **Delete Pipeline** action.

    ![Figure 8: Confirming Delete Job Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-delete-dialog-box.jpg)


5. After deleting any configured pipelines in a job workflow, select **Delete Job** to delete the job.

    ![Figure 9: Deleting Job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/create-job-delete-job.jpg)

6. A pop-up window will appear asking you to confirm the **Delete Job** action.

    ![Figure 10: Confirming Delete Job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/create-job-delete-job-dialog.jpg)

---

After creating a job, the next step is to configure the job. Refer to the [Configurations](./configurations/README.md) section to configure the job.

## Extras

### Tags 

Tags are Key-value pairs used for identifying and organizing the application. Users can propagate tags as Kubernetes labels to enable filtering, bulk operations, and integrations with Kubernetes tools. To do so, follow the steps below. 

1. Click the **Add tags to job** dropdown on the **Create job** page.

2. Under the **Tags** section, Click `+` to add a new tag.

3. You can click `X` icon to delete an existing tag.

4. You can click the **propagation icon** <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg" alt=""> to propagate a tag (turns dark grey when propagated), click again to remove propagation.

![Figure 11: Tags](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-latest-1.jpg)
