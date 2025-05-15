# Create Job

In devtron, jobs can be created by two ways:

* **Blank Job**: This allows you to create a new job from scratch by manually defining all configurations.

* **Clone Job**: This allows you to create a new job by reusing the configuration of an existing job.

---

## Create a Blank Job

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have **Admin role** or **Super Admin role**.
Refer the [User permissions](../global-configurations/authorization/user-access.md#roles-available-for-jobs).
{% endhint %}

To create a new **Blank Job** in Devtron, follow these steps:

1. Navigate to **Devtron Dashboard** → **Jobs**.

 ![Figure 1a: Job's page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/jobs.jpg)

2. Click **Create** button in the top-right corner and select **Job** from the drop-down list.

 ![Figure 1b: Select job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/select-create-job-latest.jpg)

3. The **Create Job** page opens. From the left panel, select **Blank job**, then enter the required details as listed in the table below.

 | Fields| Description|
 |:---|:---|
 | `Project`| User-defined name for the job in Devtron.|
 | `Job Name`| User-defined name for the job in Devtron.|
 | `Description` | Enter the description of a job.|
 | `Tags`| <p>Key-value pairs used for identifying and organizing the application.<br>Users can propagate tags as Kubernetes labels to enable filtering, bulk operations, and integrations with Kubernetes tools.</p><ol><li>Click the <strong>Add tags to job</strong> dropdown on the <strong>Create job</strong> page.</li><li>Under the <strong>Tags</strong> section, Click <code>+</code> to add a new tag.</li><li>You can click <code>X</code> icon to delete an existing tag.</li><li>You can click the <code>propagation icon</code> <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg" alt=""> to propagate a tag (turns dark grey when propagated), click again to remove propagation.<br>[Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-latest-1.jpg)</li></ol> |

 ![Figure 1b: Blank job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/create-job-page.jpg)

4. Click **Create Job**. The job will be created, and you will be automatically redirected to the [Configurations page](/docs/user-guide/jobs/configurations/README.md)to continue setting up the job pipeline.

---

## Create a Clone Job

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have [Admin role](../global-configurations/authorization/user-access.md#role-based-access-levels) or above (along with access to the environment and applications) to perform environment override.
{% endhint %}

To create a new **Clone Job** in Devtron, follow these steps:

1. From the **Devtron Dashboard** → **Jobs**.
2. Click the **Create** button in the top-right corner and select **Job** from the drop-down list.

 ![Figure 2a: Select job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/select-create-job-latest.jpg)

3. The **Create Job** page opens. From the left panel, select **Clone Job**, then enter the required details as listed in the table below.

 | Fields| Description|
 |:---|:--- |
 | `Project`| User-defined name for the job in Devtron.|
 | `Job Name`| User-defined name for the job in Devtron.|
 | `Description`| Enter the description of a job.|
 | `Tags`| <p>Key-value pairs used for identifying and organizing the application.<br>Users can propagate tags as Kubernetes labels to enable filtering, bulk operations, and integrations with Kubernetes tools.</p><ol><li>Click the <strong>Add tags to job</strong> dropdown on the <strong>Create job</strong> page.</li><li>Under the <strong>Tags</strong> section, Click <code>+</code> to add a new tag.</li><li>You can click <code>X</code> icon to delete an existing tag.</li><li>You can click the <code>propagation icon</code> <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg" alt=""> to propagate a tag (turns dark grey when propagated), click again to remove propagation.<br>[<a href="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/overview/manage-tags-latest-1.jpg">Snapshot</a>]</li></ol> |
 | `Select an job to clone` | Select the existing job from the dropdown that you want to clone.Enter the description of a job.|

 ![Figure 2b: Clone job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/create-job-clone-job.jpg)

4. Click **Create Job**. The **Clone job** will be created, and you will be automatically redirected to the [Configurations page](/docs/user-guide/jobs/configurations/README.md), where the configuration will be pre-populated based on the selected source job. You may review and modify these settings as required.

---

## Delete Job

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have **Admin role** or **Super Admin role**.
Refer the [User permissions](../global-configurations/authorization/user-access.md#roles-available-for-jobs).
{% endhint %}

To delete a job:

1. Navigate to **Devtron Dashboard** → **Jobs** → **Select the job** → **Configurations**.

2. To delete the job, you have to first delete any configured pipelines in the jobs.

 ### Delete job pipelines

 * Navigate to **Devtron Dashboard** → **Jobs** → **Select the job** → **Configurations** → **Workflow Editor**.

 * Select the job pipeline you wish to delete, a edit job pipeline modal window will appear.

 ![Figure 3a: Select job pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-delete-select.jpg)

 * Select **Delete Pipeline** at the bottom left corner of the edit job pipeline modal window to delete the job pipeline.

 ![Figure 3b: Delete job pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-delete-pipeline.jpg)

 * A pop-up window will appear asking you to confirm the **Delete Pipeline** action.

 ![Figure 3c: Confirm delete job pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-delete-dialog-box.jpg)

3. Select **Delete Job** to delete the job.

 ![Figure 4a: Delete job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/create-job-delete-job.jpg)

4. A pop-up window will appear asking you to confirm the **Delete Job** action.

 ![Figure 4b: Confirm delete job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/create-job-delete-job-dialog.jpg)

---

After creating a job, the next step is to configure the job, refer the [Configurations](./configurations/README.md) section to configure the job.