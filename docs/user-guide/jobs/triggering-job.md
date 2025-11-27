---
hide_table_of_contents: true
---

# Triggering Job Pipeline

After creating the job pipeline, the next step is to trigger the job pipeline. This is the step where the job will be executed in the selected environment.

To trigger the job pipeline:

:::caution Who Can Perform This Action?
Users need to have the **Admin role** or the **Super Admin role**.
Refer the [User permissions](../global-configurations/authorization/user-access.md#roles-available-for-jobs).
:::

1. Navigate to the **Trigger Job** tab of your job, which lists all configured pipelines.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/trigger-job.jpg)
    <center>Figure 1: Triggering job</center>

2. Click **Select Material** for the job pipeline you wish to execute. A modal window will open, under the **Code-source** tab, this window lists all recent commits along with their hash, author, date, and message from your configured source repository.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/trigger-job-select-material.jpg)
    <center>Figure 2: Selecting Material for Specific Pipeline</center>

3. Select the commit you want to use in the job execution. You can use the search bar to filter the commit hash, and you can also click the kebab menu to reveal excluded commits. If a recent commit isn’t displayed, click the Refresh icon to reload the commit list from your Git repository.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/trigger-job-commit.jpg)
    <center>Figure 3: Selecting Commit</center>

4. Select the **Parameters** tab to configure pipeline runtime inputs(if any). The Key and Type columns are read‑only; enter values for each required parameter (denoted by *). Optional parameters can be configured as needed or left blank.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/trigger-job-parameter.jpg)
    <center>Figure 4: Configuring Runtime Parameters</center>

5. After selecting the commit and configuring runtime parameters, pick the target environment from the **Execute job in** dropdown at the bottom.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/trigger-job-execute-env.jpg)
    <center>Figure 5: Select Environment for Job's Execution</center>

6. Select **Run Job** to execute your pipeline.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/trigger-job-run-job.jpg)
    <center>Figure 6: Run Job</center>

---

After executing your pipeline, the pipeline will now be in running state, and you can monitor the pipeline execution (such as logs, source, artifacts) in [run-history](./run-history-job.md) either by navigating to **Run History** tab or by clicking `details` above the **Select Material** of the specific pipeline.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/trigger-job-details.jpg)
<center>Figure 7: Job Status</center>
