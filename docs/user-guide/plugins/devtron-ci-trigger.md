# Devtron-CI-Trigger

## Introduction
The **Devtron CI Trigger** plugin allows you to trigger the CI stages of the target Devtron App from the current application workflow. This plugin offers flexibility in managing application dependencies. For example, by incorporating this plugin into your application workflow, you can trigger CI builds of other applications that contain dependencies required by your current application, ensuring a smooth and coordinated CI/CD process.

### Prerequisites
Before integrating the Devtron CI Trigger plugin, you need to properly configure the target CI pipeline of the Devtron App to ensure smooth execution.

---

## Steps
1. Go to **Applications** → **Devtron Apps**.
2. Click your application.
3. Go to **App Configuration** → **Workflow Editor**.
4. Click **New Workflow** and navigate to the **Build and Deploy from Source Code**.
5. Fill the required fields in the **Create build pipeline** window and navigate to the **Create deployment pipeline**.
6. Fill the required fields in the **Deployment Stage** window and navigate to the **Pre-Deployment stage**.

{% hint style="warning" %}
If you have already configured workflow, edit the deployment pipeline, and navigate to **Pre-Deployment stage**.
{% endhint %}

6. Under 'TASKS', click the **+ Add task** button.
7. Select the **Devtron CI Trigger** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.
---

## User Inputs

### Task Name
Enter the name of your task

e.g., `Triggers CI Pipeline`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `The Devtron CI Trigger plugin is integrated for triggering the CI stage of another application.`

### Input Variables

| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
|   DevtronApiToken        | STRING       | Enter Devtron API token. |  abc123DEFxyz456token789            |
|   DevtronEndpoint        | STRING       | Enter the URL of Devtron.     | https://devtron.example.com            |
|   DevtronApp             | STRING       | Enter the Devtron Application name/Id. | plugin-demo |
|   DevtronEnv             | STRING       | Enter the Environment name/Id. Required if JobPipeline is not given. |  preview         |
|   CiPipeline             | STRING       | Enter the name or ID of the CI pipeline to be triggered. Required if DevtronEnv is not given.   | ci-176-yu5g  |
|   GitCommitHash          | STRING       | Enter the git hash from which user wants to deploy its application. By default it takes latest Artifact ID to deploy the application. |    cf19e4fd348589kjhsdjn092nfse01d2234235sdsg        |
|   Timeout   | NUMBER       | Enter the maximum time to wait for the build status(in seconds).|   120   |

### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
Devtron CI Trigger will not be generating an output variable.

Click **Update Pipeline**.



