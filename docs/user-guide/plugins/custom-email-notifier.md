# Custom Email Notifier

## Introduction
The **Custom Email Notifier** plugin by Devtron enables users to set automated email notifications to respective stakeholders of that specific CI/CD workflow. The Custom Email Notifier can be integrated into pre/post stages of Devtron CI/CD workflows to inform team members about the current status and other pipeline events. Some key use cases of this plugin can be:
- Configuring notifications at pre/post stages to update teams on task completion status, such as sending vulnerability scanning reports.
- Setting up automated alerts at the runbooks of auto-remediation using jobs.

### Prerequisites
Before integrating the **Custom Email Notifier** plugin, you must ensure that you have properly configured notifications in your Devtron setup. For detailed notification configuration steps, please refer to the Devtron documentation at: [Devtron Notifications](https://docs.devtron.ai/global-configurations/manage-notification).

---

## Steps

{% hint style="warning" %}
If you want to integrate the **Custom Email Notifier** plugin into pre/post stages of CI/CD pipelines, navigate to the **[Custom Webhook Notifier](https://docs.devtron.ai/usage/plugins/plugin-list/custom-webhook-notifier)** plugin and follow the steps mentioned.
{% endhint %}

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
11. Select the **Custom Email Notifier**  plugin.
12. Enter the following [user inputs](#user-inputs) with appropriate values.
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



