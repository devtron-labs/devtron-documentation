# Ansible Runner

## Introduction
The **Ansible Runner** plugin by Devtron enables seamless execution of Ansible Playbooks within your Devtron workflows using the ansible-runner tool. For example, user can use this plugin to trigger the Ansible Plabooks which can automate task like configuring cluster add-ons, managing node configurations, and network configurations.

### Prerequisites
Before integrating the **Ansible Runner** plugin make sure that you have properly configured Ansible playbooks.

---

## Steps
1. Go to **Applications** → **Devtron Apps**.
2. Click your application.
3. Go to **App Configuration** → **Workflow Editor**.
4. Click **New Workflow** and navigate to the **Build and Deploy from Source Code**.
5. Fill the required fields in the **Create build pipeline** window and navigate to the **Pre-build stage**.

{% hint style="warning" %}
If you have already configured workflow, edit the build pipeline, and navigate to **Pre-build stage**.
{% endhint %}

6. Under 'TASKS', click the **+ Add task** button.
7. Click the **Ansible Runner** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.
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

