# BitBucket Runner Trigger

## Introduction
The **BitBucket Runner Trigger** plugin by Devtron enables integration between Devtron CI/CD workflows and BitBucket Runners. It allows users to remotely trigger and manage BitBucket Runners directly from within their Devtron pipelines, enhancing automation capabilities and workflow control.

### Prerequisites
Before integrating the **BitBucket Runner Trigger** plugin, ensure you have an BitBucket account, properly configured BitBucket Runner, and BitBucketToken with appropriate permissions.

---

## Steps
1. Go to **Applications** → **Devtron Apps**.
2. Click your application.
3. Go to **App Configuration** → **Workflow Editor**.
4. Click **New Workflow** and navigate to the **Build and Deploy from Source Code**.
5. Fill the required fields in the **Create build pipeline** window and navigate to the **Pre-Build stage**.

{% hint style="warning" %}
If you have already configured workflow, edit the build pipeline, and navigate to **Pre-Build stage**.
{% endhint %}

6. Under 'TASKS', click the **+ Add task** button.
7. Select the **BitBucket Runner Trigger** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.
---

## User Inputs

### Task Name
Enter the name of your task

e.g., `BitBucket Runner Trigger`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `The BitBucket Runner Trigger plugin is integrated to trigger an BitBucker Runner remotely through Devtron CI/CD workflow.`

### Input Variables

| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
|   BitBucketWorkspaceName | STRING       | The workspace name in BitBucket where your repository is located | dev-workspace             |
|  BitBucketUsername       | STRING       | Your BitBucket username used for authentication (Mandetory when pipeline is configured through SSH) | john.doe    |
|   BitBucketToken         | STRING       | BitBucket access token for API authentication (Mandetory when pipeline is configured through SSH)  | eyJ0eXBlIjoic2VydmljZV9hY2             |
|   BitBucketBranchName    | STRING       | The branch name where the pipeline will be triggered    |   main           |
|   BitBucketRepoName      | STRING       | The name of your BitBucket repository            |  dev-repo            |
|   StatusTimeOutSeconds   | STRING       | Maximum time (in seconds) to wait for runner status response  | 300             |


### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
BitBucket Runner Trigger will not be generating an output variable.

Click **Update Pipeline**.



