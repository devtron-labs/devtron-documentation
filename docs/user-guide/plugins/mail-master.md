# Mail Master

## Introduction
The Mail Master plugin by Devtron streamlines email communication by enabling automated bulk email notifications through your configured SMTP server. It helps keep all stakeholders informed throughout the application lifecycle, ensuring seamless communication for workflow events. When integrated into Devtron's post-CD stage, this plugin can automatically notify multiple team members, project managers, clients, and other stakeholders about new application deployments. To ensure that everyone stays informed about the latest changes and features.

### Prerequisites
Before integrating the **Mail Master** plugin, you must ensure that you have properly configured SMTP notifications in your Devtron setup.

---

## Steps
1. Go to **Applications** → **Devtron Apps**.
2. Click your application.
3. Go to **App Configuration** → **Workflow Editor**.
4. Click **New Workflow** and navigate to the **Build and Deploy from Source Code**.
5. Fill the required fields in the **Create deploy pipeline** window and navigate to the **Post-deploy stage**.

{% hint style="warning" %}
If you have already configured workflow, edit deployment pipeline, and navigate to **Post-deploy stage**.
{% endhint %}

6. Under 'TASKS', click the **+ Add task** button.
7. Click the **Mail Master** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.

---

## User Inputs

### Task Name
Enter the name of your task

e.g., `Mail Master`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `The Mail Master plugin is integrated for sending bulk automated email notifications to relevant stakeholders.`

### Input Variables
| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
| SmtpServer               | STRING       | The host name of SMTP server    | smtp.gmail.com |
| SmtpUsername             | STRING       | The username of SMTP connection | user@example.com   |
| SmtpPassword             | STRING       | Password of SMTP connection     | mysecretpassword   |
| SenderEmail              | STRING       | Sender's email address          | 	sender@example.com       |
| EmailContentFile         | STRING       | Provide path of email content file  | /path/to/emailContent.html            |
| SmtpPort                 | NUMBER       | Port that will be used for SMTP connection. Default port is 587         |   433  |
| RecipientConfigFile      | STRING       | Provide path of config.json, that contains list of recipients  | /path/to/recipientsConfig.json  |
| EmailSubject             | STRING       | Provide subject for the email. Subject can also be provided in `EmailContentFile` after "Subject"          | "Monthly Release"   |
| BatchSize                | NUMBER       | Number of emails that should be sent per batch. The default number is 10          |   200     |
| BatchDelayTime           | NUMBER       | Time to wait in two batch (in seconds)           |  15    |
| SenderName               | STRING       | Name of sender          |  John Doe   |
| RecipientsGroupName      | STRING       | Group id for selecting recipients from config.json          |  "ReleaseTeam"   |
| RecipientsSubGroupName   | STRING       | The Sub-group id for selecting recipients from config.json          | "NorthRegion"           |
| Recipients               | STRING       | Emails of recipients seprated by "," if user is not specified in config.json file          |  recipient1@example.com,recipient2@example.com        |


### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
Mail Master will not be generating an output variable.

Click **Update Pipeline**.



