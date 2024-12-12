# Bitbucket Runner Trigger

## Introduction
The **Bitbucket Runner Trigger** plugin by Devtron enables integration between Devtron CI/CD workflows and Bitbucket Runners. It allows users to remotely trigger and manage Bitbucket Runners directly from within their Devtron pipelines, enhancing automation capabilities and workflow control.

### Prerequisites
Before integrating the **Bitbucket Runner Trigger** plugin, ensure you have a Bitbucket account, properly configured Bitbucket Runner, and Bitbucket Token with appropriate permissions.

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
7. Select the **Bitbucket Runner Trigger** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.
---

## User Inputs

### Task Name
Enter the name of your task

e.g., `Bitbucket Runner Trigger`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `The Bitbucket Runner Trigger plugin is integrated to trigger a BitBucker Runner remotely through Devtron CI/CD workflow.`

### Input Variables

| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
|   BitBucketWorkspaceName | STRING       | The workspace name in Bitbucket where your repository is located | dev-workspace             |
|  BitBucketUsername       | STRING       | Your Bitbucket username used for authentication (Mandatory when pipeline is configured through SSH) | john.doe    |
|   BitBucketToken         | STRING       | Bitbucket access token for API authentication (Mandatory when pipeline is configured through SSH)  | eyJ0eXBlIjoic2VydmljZV9hY2             |
|   BitBucketBranchName    | STRING       | The branch name where the pipeline will be triggered    |   main           |
|   BitBucketRepoName      | STRING       | The name of your Bitbucket repository            |  dev-repo            |
|   StatusTimeOutSeconds   | STRING       | Maximum time (in seconds) to wait for runner status response  | 300             |


### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
Bitbucket Runner Trigger will not be generating an output variable.

Click **Update Pipeline**.



