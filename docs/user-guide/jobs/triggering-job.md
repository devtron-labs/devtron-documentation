# Triggering Job Pipeline

After creating the job pipeline, the next step is to trigger the job pipeline. This is the step where the job will executed in the selected environment.

To trigger the job-pipeline:

1. Navigate to the **Devtron Dashboard** → **Jobs** → **Select the job** → **Trigger Job**, which list all configured pipelines.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job.jpg)

2. Select `Select Material` for the job-pipeline you wish to execute, a modal window will open, under `Code-source` tab, this window lists all recent commits along with their hash, author, date, and message. from your configured source repository.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-select-material.jpg)

3. Select the commit you want to use in the job execution. You can use the search bar to filter the commits hash, and you can also click the kebab menu to reveal excluded commits. If a recent commit isn’t displayed, click the Refresh icon to reload the commit list from your Git repository.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-commit.jpg)

4. Select the `Parameters` tab to configure pipeline runtime inputs(if any). The Key and Type columns are read‑only; enter values for each required parameter (denoted by *). Optional parameters can be configured as needed or left blank.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-parameter.jpg)

5. After selecting the commit and configuring runtime inputs, pick the target environment from the `Execute job in` dropdown at the bottom.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-execute-env.jpg)

6. Select `Run Job` to execute your pipeline.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-run-job.jpg)

After executing your pipeline, the pipeline will now be in running state and you can monitor the pipeline execution(such as logs, source,artifacts)in [run-history](./run-history.md) either by navigating to `Run History` tab or by clicking `details` above the `Select Material` of the specific pipeline.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/trigger-job-details.jpg)