# Ansible Runner

## Introduction
The **Ansible Runner** plugin by Devtron enables seamless execution of Ansible Playbooks within your Devtron workflows using the Ansible Runner tool. For example, users can use this plugin to trigger the Ansible Playbooks which can automate tasks like configuring cluster add-ons managing node configurations, and network configurations.

### Prerequisites
Before integrating the **Ansible Runner** plugin make sure that you have properly configured Ansible playbooks.

---

## Steps
1. Navigate to the **Jobs** section, click **Create**, and choose **Job**.
2. In the 'Create job' window, enter **Job Name** and choose a target project.
3. Click **Create Job**.
4. In the 'Configurations' tab, fill the required fields under the 'Source code' section and click **Save**.
5. In Workflow Editor, click **+ Job Pipeline**.
6. Give a name to the workflow and click **Create Workflow**.
7. Click **Add job pipeline to this workflow**.
8. Fill the required fields in ‘Basic configuration’ tab.
9. Go to the ‘Tasks to be executed’ tab.
10. Under ‘Tasks’, click the **+ Add task** button.
11. Select the **Ansible Runner** plugin.
12. Enter the following [user inputs](#user-inputs) with appropriate values.
    
---

## User Inputs

### Task Name
Enter the name of your task.

e.g., `Ansible Runner`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `The Ansible Runner plugin is integrated for updating network configuration before deployment of appliction.`

### Input Variables

| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
|   ProjectDirectory       | STRING       | The project directory path containing Ansible playbooks   |/ansible/playbooks              |
|   RunnerDirectory        | STRING       | The directory path where ansible-runner will store temporary data and artifacts | /tmp/ansible-runner             |
|   RunnerArgument         | STRING       | Additional command-line arguments to pass to ansible-runner            | "-v --inventory /path/to/inventory"             |

### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
Ansible Runner plugin will not be generating an output variable.
 
Click **Update Pipeline**.

