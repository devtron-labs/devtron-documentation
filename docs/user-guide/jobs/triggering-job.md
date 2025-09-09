# Triggering Job Pipeline

After creating the job pipeline, the next step is to trigger the job pipeline. This is the step where the job will be executed in the selected environment.

To trigger the job pipeline:

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have the **Admin role** or the **Super Admin role**.
Refer the [User permissions](../global-configurations/authorization/user-access.md#roles-available-for-jobs).
{% endhint %}

1. Navigate to the **Trigger Job** tab of your job, which lists all configured pipelines.

    ![Figure 1: Triggering job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job.jpg)

2. Click **Select Material** for the job pipeline you wish to execute. A modal window will open, under the **Code-source** tab, this window lists all recent commits along with their hash, author, date, and message from your configured source repository.

    ![Figure 2: Selecting Material for Specific Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-select-material.jpg)

3. Select the commit you want to use in the job execution. You can use the search bar to filter the commit hash, and you can also click the kebab menu to reveal excluded commits. If a recent commit isn’t displayed, click the Refresh icon to reload the commit list from your Git repository.

    ![Figure 3: Selecting Commit](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-commit.jpg)

4. Select the **Parameters** tab to configure pipeline runtime inputs(if any). The Key and Type columns are read‑only; enter values for each required parameter (denoted by *). Optional parameters can be configured as needed or left blank.

    ![Figure 4: Configuring Runtime Parameters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-parameter.jpg)

5. After selecting the commit and configuring runtime parameters, pick the target environment from the **Execute job in** dropdown at the bottom.

    ![Figure 5: Select Environment for Job's Execution](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-execute-env.jpg)

6. Select **Run Job** to execute your pipeline.

    ![Figure 6: Run Job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-run-job.jpg)

---

After executing your pipeline, the pipeline will now be in running state, and you can monitor the pipeline execution (such as logs, source, artifacts) in [run-history](./run-history-job.md) either by navigating to **Run History** tab or by clicking `details` above the **Select Material** of the specific pipeline.

![Figure 7: Job Status](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-details.jpg)
