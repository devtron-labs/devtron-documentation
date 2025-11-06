# GitHub Pull Request Updater

## Introduction
The **GitHub Pull Request Updater** plugin automatically adds pipeline status and deployment information as comments on your GitHub pull requests. Every time your Devtron CI pipeline runs, you get instant visibility onto the specific pull request on GitHub. This seamless integration eliminates the need to switch between multiple tools or platforms to track your deployment. Development teams also save time by avoiding manual status updates and reducing the back-and-forth communication about deployment states. 

### Prerequisites
Before integrating the **GitHub Pull Request Updater** plugin, ensure you have a GitHub Personal Access Token (PAT) with appropriate permissions to access your GitHub repository.

---

## Steps
1. Go to **Application Management** → **Applications** → **Devtron Apps** (tab).
2. Click your application.
3. Go to **Configurations** (tab) → **Workflow Editor**.
4. Click **New Workflow** and navigate to the **Build and Deploy from Source Code**.
5. Fill the required fields in the **Create build pipeline** window and navigate to the **Post-build stage**.

:::caution 
If you have already configured workflow, edit the build pipeline, and navigate to **Post-build stage**.
:::

6. Under 'TASKS', click the **+ Add task** button.
7. Click the **GitHub Pull Request Updater** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.
---

## User Inputs

### Task Name
Enter the name of your task

e.g., `GitHub Pull Request Updater`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `A plugin to update GitHub pull request`

### Input Variables

| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
|   AccessToken             | STRING      | GitHub Personal Access Token (PAT) with appropriate permissions, used for authentication.  | ghp_1234abcd5678efgh9012ijkl3456mnop            |
|   UpdateWithDockerImageId  | BOOL       | When set to true, the plugin will include Docker image information in PR comments. Default: True        |  true |
|   UpdateWithBuildStatus   | BOOL       | When set to true, the plugin will update PR comments with pipeline build status including success/failure state. Default: True       |   true    |


### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
The GitHub Pull Request Updater plugin will not be generating an output variable.


Click **Update Pipeline**.



