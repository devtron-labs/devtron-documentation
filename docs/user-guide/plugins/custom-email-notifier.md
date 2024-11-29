# Custom Email Notifier

## Introduction
The **Custom Email Notifier** plugin by Devtron enables user to set an automated email notifications to respective stakeholders of that specific CI/CD workflow. The Custom Email Notifier can be integrated into pre/post stages of Devtron CI/CD workflows to keep team members informed about current status and other pipeline events. 
For better understanding consider a common development scenario where a developer needs to notify the operations team about build completion. Using this plugin, the developer can configure Custom Email Notifier at the post-build stage to automatically send an email notification informing that the build process has completed successfully and the Docker image is ready for deployment.

### Prerequisites
Before integrating the **Custom Email Notifier** plugin, you must ensure that you have properly configured notifications in your Devtron setup. For detailed notification configuration steps, please refer to the Devtron documentation at: [Devtron Notifications](https://docs.devtron.ai/global-configurations/manage-notification).

---

## Steps
1. Go to **Applications** → **Devtron Apps**.
2. Click your application.
3. Go to **App Configuration** → **Workflow Editor**.
4. Click **New Workflow** and navigate to the **Build and Deploy from Source Code**.
5. Fill the required fields in the **Create build pipeline** window and navigate to the **Post-build stage**.

{% hint style="warning" %}
If you have already configured workflow, edit the build pipeline, and navigate to **Post-build stage**.
{% endhint %}

6. Under 'TASKS', click the **+ Add task** button.
7. Click the **Custom Email Notifier** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.
---

## User Inputs

### Task Name
Enter the name of your task

e.g., `Email Notifier`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `The Custom Email Notifier plugin is integrated for sending an automated email notifications to relevant stakeholders.`

### Input Variables
| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
|       CONFIG_TYPE        | STRING       | Type of notification configuration. SES or SMTP  |  SES            |
|       CONFIG_NAME         | STRING       | Name of the notification configuration to be used. This should match an existing notification configuration in Devtron.     |   prod-deploy-notify           |
|       EMAIL_IDS           | STRING       | Comma-separated list of email addresses that should receive the notification. | devops@company.com,team@company.com    |

### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
Custom Email Notifier will not be generating an output variable.

Click **Update Pipeline**.



