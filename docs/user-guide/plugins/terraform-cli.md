# Terraform CLI 

## Introduction
The **Terraform CLI** plugin by Devtron enables infrastructure provisioning and across multiple cloud providers using Infrastructure as Code (IaC). You can integrate this plugin into Devtron's Job pipelines, to automate infrastructure provisioning, modifications, and teardowns using Terraform configurations. 

### Prerequisites
Before integrating the **Terraform CLI** plugin, you must ensure that you have properly configured terraform scripts.

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
11. Select the **Terraform CLI**  plugin.
12. Enter the following [user inputs](#user-inputs) with appropriate values.

---

## User Inputs

### Task Name
Enter the name of your task

e.g., `Terraform CLI`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `The Terraform CLI plugin is integrated to provision infrastructure at AWS.`

### Input Variables

| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
| HTTP_PROXY               | STRING       | Specify the HTTP proxy server for non-SSL requests | http://proxy.example.com:8080     |
| HTTPS_PROXY              | STRING       | Specify the HTTPS proxy server for SSL requests  | https://proxy.example.com:8080             |
| NO_PROXY                 | STRING       | HTTPS/HTTP request. Use this to specify host that should bypass the proxy | localhost,127.0.0.1,.example.com             |
| TERRAFORM_IMAGE          | STRING       | Terraform container image for executing Terraform commands.  | terraform:1.10.0-alpha20240730  |
| WORKINGDIR               | STRING       | Directory containing Terraform configuration files for running commands.  | terraform-dir   |
| ARGS                     | STRING       | List of Terraform CLI commands to execute during deployment or management.   | apply -auto-approve             |
| RUN_TERRAFORM_INIT       | BOOL         | Boolean flag to determine whether to run terraform init to initialize the working directory.            | True             |
| ADDITIONALPARAMS         | STRING       | Key-value pairs injected into the Terraform container            | TF_LOG=trace, TF_LOG_PATH=./terraform.log       |

### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
Terraform CLI will not be generating an output variable.

Click **Update Pipeline**.



