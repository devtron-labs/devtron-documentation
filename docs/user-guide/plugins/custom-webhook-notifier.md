# Custom Webhook Notifier

## Introduction
The Custom Webhook Notifier plugin by Devtron allows users to set up automated webhook notifications that integrate with various third-party services in their Job pipelines and at pre/post stages of Devtron CI/CD workflows. Teams can seamlessly integrate this plugin to keep external services and team members updated about pipeline events and status changes. Some key use cases of this plugin can be:
- Configuring notifications at pre/post stages to update teams on task completion status, such as sending vulnerability scanning reports.
- Setting up automated alerts at the runbooks of auto-remediation using jobs.

{% hint style="warning" %}
If you wish to get notifications at Trigger, Success, and Failure events of CI/CD pipelines, use Devtron's native [Notifications](https://docs.devtron.ai/global-configurations/manage-notification).
{% endhint %}

### Prerequisites
Before integrating the **Custom Webhook Notifier** plugin, you must ensure that you have properly configured weebhook notifications in your Devtron setup.

---

## Steps

{% hint style="warning" %}
If you want to integrate the **Custom Webhook Notifier** at the job, navigate to the **[Custom Email Notifier](https://docs.devtron.ai/usage/plugins/plugin-list/custom-email-notifier)** plugin and follow the steps mentioned.
{% endhint %}

1. Go to **Applications** → **Devtron Apps**.
2. Click your application.
3. Go to **App Configuration** → **Workflow Editor**.
4. Click **New Workflow** and navigate to the **Build and Deploy from Source Code**.
5. Fill the required fields in the **Create build pipeline** window and navigate to the **Post-build stage**.

{% hint style="warning" %}
If you have already configured workflow, edit the build pipeline, and navigate to **Post-build stage**.
{% endhint %}

6. Under 'TASKS', click the **+ Add task** button.
7. Click the **Custom Webhook Notifier** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.

---

## User Inputs

### Task Name
Enter the name of your task

e.g., `Webhook Notifier`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `The Custom Webhook Notifier plugin is integrated for sending an automated email notifications to relevant stakeholders.`

### Input Variables
| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
|       CONFIG_TYPE        | STRING       | Type of notification configuration. SES or SMTP  |  SES            |
|       CONFIG_NAME         | STRING       | Name of the notification configuration to be used. This should match an existing notification configuration in Devtron.     |   vulnerability-scan report           |

### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
Custom Webhook Notifier will not be generating an output variable.

Click **Update Pipeline**.



