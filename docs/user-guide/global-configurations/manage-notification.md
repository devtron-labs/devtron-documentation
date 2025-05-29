# Manage CI/CD Notifications

## Introduction

Monitoring updates of your CI/CD pipelines, such as their triggers, successes, and failures, can be challenging without a proper notification system in place.

The **Notifications** module in Devtron helps you solve this problem by sending you timely updates about your CI/CD pipelines through various tools such as Email, Slack, Discord, and much more - ensuring you stay informed at all times.

---

## Initial Prerequisites

* [Build and Deploy (CI/CD)](../integrations/build-and-deploy-ci-cd.md) integration installed in your system.

* [Super-Admin](user-access.md) permission.

* **Notifications** module integration installed in your system. 

    * For an OSS user, the **Notifications** page will not be displayed unless you install the **Notifications** module from the Devtron Stack Manager. 

    * For Enterprise users, this module is integrated by default in our Enterprise offering.

---

## Configurations

The **Notifications** page allows you to configure and manage notifications for your CI/CD pipeline(s). To access the **Notifications** page, navigate to **Global Configurations** → **Notifications**.

![Figure 1: Notifications Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/notifications-screen-configurations.jpg)

The **Notifications** page has the following two tabs:

* **Configurations** - allows you to configure the way (such as Slack, Email, etc.,) through which the notifications will be delivered.

* **Notifications** - allows you to define the recipients and the conditions (e.g., CI/CD success, failure, trigger) under which the notifications must be sent out.

You can configure notifications in Devtron in the following four ways: 

* [SES Configuration](#ses-configuration)

* [SMTP Configuration](#smtp-configuration)

* [Slack Configuration](#slack-configuration)

* [Webhook Configuration](#webhook-configuration)

### SES Configuration

{% hint style="info" %}
    
### Prerequisites

AWS access key and secret key - When obtaining access key and secret access key from AWS SES, make sure to generate them from the **Security credentials** page (**Profile** → **Security credentials** → **Access keys** → **Create access key**) and not from the **SMTP settings** page in AWS.

Domain verification - Make sure to [Verify Domain Identities](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html#verify-domain-procedure) (e.g., *devtron.ai*) of the sender email address you wish to use for sending email notifications.

{% endhint %}

{% hint style="warning" %}
    
### Who Can Perform This Action?

Only [Super-Admins](user-access.md) can create and manage configurations.

{% endhint %}

{% embed url="https://www.youtube.com/watch?v=WRP1CBHW6Ic" caption="Enabling Email Notifications for Devtron CI/CD" %}

If you prefer to configure the notifications to be sent via Amazon Simple Email Service (SES), please watch the above AWS SES tutorial or follow the below instructions:

1. Navigate to the **Global Configurations** → **Notifications** → **Configurations** → **Email (SES)** → **Add SES**.

    ![Figure 2: Configure SES](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/configure-ses.jpg)

2. Enter the following details in the **Configure SES** page:

    | Key | Description |
    | --- | ----------- |
    | **Configuration Name** | Give a name to your SES Configuration, e.g., `Email SES 2024` |
    | **Access Key ID** | Valid access key from your **AWS Security credentials** page, e.g., `AKIAWEAVHF123ABCD123` |
    | **Secret Access Key** | Secret access key from your **AWS Security credentials** page |
    | **AWS Region** | The AWS Region you used while setting up SES |
    | **Send email from** | The sender email address verified by SES for sending emails |

3. Enable the **Set as default configuration to send emails** check box (optional) if you wish to keep this configuration as the default one for sending emails.

4. Click **Save**.

Now that the Email (SES) configuration is set up, you can proceed to [Add Notifications](#add-notifications). 

### SMTP Configuration

{% hint style="info" %}
    
### Prerequisite

SMTP credentials (username and password) from your SMTP provider. 

{% endhint %}

{% hint style="warning" %}
    
### Who Can Perform This Action?

Only [Super-Admins](user-access.md) can create and manage configurations.

{% endhint %}

{% embed url="https://www.youtube.com/watch?v=CkPG7wC59hY" caption="Enabling Email Notifications for Devtron CI/CD" %}

If you prefer to configure the notifications to be sent via SMTP providers (such as Gmail SMTP, AWS), please watch the tutorial or follow the below instructions:

1. Navigate to the **Global Configurations** → **Notifications** → **Configurations** → **Email (SMTP)** → **Add SMTP**.

    ![Figure 3: Configure SMTP](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/configure-smtp.jpg)

2. Enter the following details in the **Configure SMTP** page:

    | Key | Description |
    | :--- | :--- |
    | **Configuration Name** | Give a name to your SMTP Configuration, e.g., `Email SMTP 2024` |
    | **SMTP Port** | The port number available in your SMTP settings, e.g., `587` |
    | **SMTP Host address/Server** | The SMTP endpoint available in your SMTP settings, e.g., `smtp.gmail.com`  |
    | **SMTP Username** | A valid username created with your SMTP provider, e.g., `AKIAWEAVHF123ABCD123` in case of AWS SMTP and `johndoe@gmail.com` in case of Gmail SMTP. |
    | **SMTP Password** | The password generated by your SMTP provider |
    | **Send email from** | The sender email address verified by your SMTP provider for sending emails |

3. Enable the **Set as default configuration to send emails** check box (optional) if you wish to keep this configuration as the default one for sending emails.

4. Click **Save**.

Now that the Email (SMTP) configuration is set up, you can proceed to [Add Notifications](#add-notifications).

### Slack Configuration

{% hint style="info" %}
    
### Prerequisite

A Slack account, a Slack channel, and an [Incoming Webhook URL](https://slack.com/intl/en-gb/help/articles/115005265063-Incoming-webhooks-for-Slack) for your Slack channel (if you prefer to configure notifications to be sent via Slack). 

{% endhint %}

{% hint style="warning" %}
    
### Who Can Perform This Action?

Only [Super-Admins](user-access.md) can create and manage configurations.

{% endhint %}

{% embed url="https://www.youtube.com/watch?v=ve1eGqslBqc" caption="Enabling Slack Notifications for Devtron CI/CD" %}

If you prefer to receive the notifications via Slack, please watch the above Slack notification tutorial or follow the below instructions:

1. Navigate to the **Global Configurations** → **Notifications** → **Configurations** → **Slack** → **Add Slack**.

    ![Figure 4: Configure Slack](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/configure-slack.jpg)

2. Enter the following details in the **Configure Slack** page:

    | Key | Description |
    | :--- | :--- |
    | **Slack Channel** | Name of the Slack channel on which you wish to receive notifications |
    | **Webhook URL** | Enter a valid incoming webhook URL |
    | **Project** | Select the project name to control user access. Apps outside your selected project cannot use this configuration.|

3. Click **Save**. 

Now that the Slack configuration is set up, you can proceed to [Add Notifications](#add-notifications).

### Webhook Configuration

{% hint style="info" %}
    
### Prerequisite

A Webhook URL to receive notifications (e.g., Microsoft Teams Webhook URL, Discord Webhook URL). 

{% endhint %}

{% hint style="warning" %}
    
### Who Can Perform This Action?

Only [Super-Admins](user-access.md) can create and manage configurations.

{% endhint %}

{% embed url="https://www.youtube.com/watch?v=8RQ2dezrVvY" caption="Enabling Notifications for Devtron CI/CD using Webhook" %}

If you prefer to receive the notifications via Discord, please watch the above Discord notification tutorial for better understanding. If you prefer to receive the notifications via other applications, follow the below instructions:

1. Navigate to the **Global Configurations** → **Notifications** → **Configurations** → **Slack** → **Add Webhook**.

    ![Figure 5: Configure Webhook](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/configure-webhook.jpg)

2. Enter the following details in the **Configure Webhook** page:

    | Key | Description |
    | :--- | :--- |
    | **Configuration name** | Give a name to your webhook configuration |
    | **Webhook URL** | Enter a valid Webhook URL link |
    | **Headers** | Add optional key-value pairs, e.g. `Content-Type: application/json` |
    | **Data to be shared through webhook** | Write the payload content of the notification in a JSON format. <br /> Refer: <ul><li>[Microsoft Teams Payload](#for-microsoft-teams)</li><li>[Discord Payload](#for-discord)</li><li>[Slack Payload](#for-slack)</li><li>[RingCentral Payload](#for-ringcentral)</li></ul> |

3. Click **Save**. 

Now that the Webhook configuration is set up, you can proceed to [Add Notifications](#add-notifications).

---

## Notifications

### Add Notifications

Once you have configured the notifications in the **Configuration** tab, you can then add, edit, and delete notifications in the **Notifications** tab. To create a new notification, follow the below instructions:

1. Navigate back to the **Notifications** tab.

    ![Figure 6: Notifications Tab](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/notifications-tab.jpg)

2. Click the **Add Notification** button. The **Add Notifications** page is displayed.

    ![Figure 7: Add Notifications Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/add-notifications-page.jpg)

3. Enter your preferred recipient in the **Send to** drop-down box. You can add one or more recipients in the **Send to** drop-down box and the recipients can be any or all of the following:

    a. A verified email address (by SES/SMTP)

    b. A Slack channel

    c. A Webhook

4. Select your preferred filter type from the following in the **Select pipelines** field:

    a. **Application** - Select **Application**, if you specifically know for which application(s) you need notifications for.

    b. **Project** - Select **Project**, if you want notifications for one or more applications within specific project(s). 

    c. **Environment** - Select **Environment**, if you want notifications for applications deployed in specific environment(s) (e.g., production).

    d. **Cluster** - Select **Cluster**, if you want notifications for applications in a select cluster(s).

    Once you have selected your preferred filter type, a list of CI/CD pipelines are displayed as filter results. 

    * <span><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/ci1.jpg" alt="CI Icon"></span> indicates that it is a CI (Build) pipeline.

    * <span><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/cd1.jpg" alt="CD Icon"></span> indicates that it is a CD (Deployment) pipeline.

    * You can also choose to receive notifications for any CI or CD pipelines that do not exist currently but may exist in future by enabling the **All current and future pipelines matching** pipeline in the **Pipeline Name** column. 

5. Select your preferred events for which a notification must be sent out in the **Events** column. The labels are displayed when you hover over the check boxes. You can enable one or more events as per your requirements.

    a. **Trigger** - Enable this if you wish to receive notification whenever the pipeline is triggered.

    b. **Success** - Enable this if you wish to receive notification upon a successful build or deploy.

    c. **Failure** - Enable this if you wish to receive notification upon a failed build or deploy.

6. Click **Save**. The notification is now successfully added. You can now build and deploy your application to get notifications of its CI/CD events.

### Modify Notifications

To modify the events, follow the below steps:

1. Navigate to the **Notifications** tab. 

2. Select your preferred notification. 

3. Check the check box in the left side of the notification to select it. 

4. Click **Modify Events** to modify the events. Check or uncheck the events based on your requirements.

5. Click **Apply**.

![Figure 8: Modify Events](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/modify-event.gif)

To modify the recipients, follow the below steps:

1. Navigate to the **Notifications** tab. 

2. Select your preferred notification. 

3. Check the check box in the left side of the notification to select it. 

4. Click **Modify Recipients** to modify the recipients. Add or remove the recipients based on your requirements.

5. Click **Save Changes**.

![Figure 9: Modify Recipients](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/modify-receipient.gif)

To delete a notification, follow the below steps:

1. Navigate to the **Notifications** tab. 

2. Select your preferred notification. 

3. Check the check box in the left side of the notification to select it. 

4. Click **Delete** to delete the notification.

![Figure 10: Delete Notifications](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/manage-notification/revised-imgs-21052025/delete-notification.gif)

---

## Sample Payloads

### For Microsoft Teams

{% code title="Teams Webhook Payload" overflow="wrap" lineNumbers="true" %}
```json
{
    "type": "message",
    "attachments": [
        {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "contentUrl": null,
            "content": {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.2",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": "Automation Notification for Devtron \n *App* : {{devtronAppName}} \n *Event Type* : {{eventType}}"
                    }
                ]
            }
        }
    ]
}
```
{% endcode %}

### For Slack

{% code title="Slack Webhook Payload" overflow="wrap" lineNumbers="true" %}
```json
{
    "text": "CI Triggered",
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Automation Notification for Devtron \n *App* : {{devtronAppName}} \n *Event Type* : {{eventType}}"
            },
            "accessory": {
                "type": "image",
                "image_url": "https://awsmp-logos.s3.amazonaws.com/3ec35b66-ca90-4ed0-8c9e-146fa65e1037/f3966518a472c0e5f51c57f5efb20da7.png",
                "alt_text": "Devtron Logo"
            }
        }
    ]
}
```
{% endcode %}

### For Discord

{% code title="Discord Webhook Payload" overflow="wrap" lineNumbers="true" %}
```json
{
    "content": "Automation Notification at Devtron \n App : {{devtronAppName}} \n Event Type : {{eventType}}"
}
```
{% endcode %}

### For RingCentral

{% code title="RingCentral Webhook Payload" overflow="wrap" lineNumbers="true" %}
```json
{
    "activity": "CI Triggered",
    "attachments": [
    {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
        {
            "type": "TextBlock",
            "text": "Automation Notification at Devtron \n App: {{devtronAppName}} \n Event Type: {{eventType}}",
            "weight": "bolder",
            "size": "medium",
            "wrap": true
        },
        {
            "type": "ColumnSet",
            "columns": [
            {
                "type": "Column",
                "width": "auto",
                "items": [
                {
                    "type": "Image",
                    "url": "https://awsmp-logos.s3.amazonaws.com/3ec35b66-ca90-4ed0-8c9e-146fa65e1037/f3966518a472c0e5f51c57f5efb20da7.png",
                    "size": "small",
                    "style": "person"
                }
                ]
            },
            {
                "type": "Column",
                "width": "stretch",
                "items": [
                {
                    "type": "TextBlock",
                    "text": "Container Image Repo: {{devtronContainerImageRepo}} \n Container Image Tag: {{devtronContainerImageTag}}",
                    "weight": "bolder",
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "spacing": "none",
                    "text": "Triggered by: {{devtronTriggeredByEmail}}",
                    "isSubtle": true,
                    "wrap": true
                }
                ]
            }
            ]
        },
        ]
    }
    ]
}
```
{% endcode %}