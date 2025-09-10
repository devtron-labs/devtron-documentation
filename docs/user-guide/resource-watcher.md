# Resource Watcher

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

An incident response if delayed can impact businesses, revenue, and waste valuable engineering time. Devtron's Resource Watcher enables you to perform automated actions upon the occurrence of events:

* **Create Event** - Occurs when a new Kubernetes resource is created, for e.g., a new pod spun up to handle increased traffic.
* **Update Event** - Occurs when an existing Kubernetes resource is modified, for e.g., deployment configuration tweaked to increase the replica count.
* **Delete Event** - Occurs when an existing Kubernetes resource is deleted, for e.g., deletion of an orphaned pod. 

You can make the Resource Watcher listen to the above events and accordingly run a webhook or run a job you wish to get done, for e.g., increasing memory, executing a script, raising Jira ticket, emailing your stakeholders, sending Slack notifications, and many more. Since manual intervention is absent, the timely response of this auto-remediation system improves your operational efficiency.

---

## Creating a Watcher

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to create a watcher.
{% endhint %}

This page allows you to create a watcher to track events and run a job. It also shows the existing list of watchers (if any).

1. Click **+ Create Watcher**. 

    ![Figure 1: Watchers - Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/watchers-page.jpg)

2. Creating a watcher consists of 4 parts, fill all the sections one by one:
    * [Basic Details](#basic-details)
    * [Namespaces to Watch](#namespaces-to-watch)
    * [Intercept Change in Resources](#intercept-change-in-resources)
    * [Execute Runbook](#execute-runbook)

    ![Figure 2: Create Watcher - Window](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/create-watcher-window.jpg)

### Basic Details

Here, you can give a name and description to your watcher.

![Figure 3: Adding Name and Description of Watcher](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/basic-details.gif)

### Namespaces to Watch

Here, you can select the [namespaces](../reference/glossary.md#namespace) whose [Kubernetes resource](../reference/glossary.md#objects) you wish to monitor for changes. 

* You can watch the namespace(s) across **All Clusters** (existing and future). 

    ![Figure 4: Choosing Namespaces of all Clusters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/all-cluster.gif)

* Or you can watch namespace(s) of **Specific Clusters**.

    ![Figure 5: Choosing Namespaces of Specific Clusters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/specific-cluster.gif)

{% hint style="info" %}
In both the above options, if you choose 'Specific Namespaces', you can further decide whether to track the namespaces you enter (by clicking 'Include selections') or to track the namespaces except the ones you enter (by clicking 'Exclude selections').
{% endhint %}


### Intercept Change in Resources

Here, you can select the exact Kubernetes resource(s) you wish to track for changes (in the namespace(s) you selected in the previous step).

![Figure 6: Picking Resources to Track](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/intercept-changes.gif)

* You can choose the resource from the **Resource kind(s) to watch** dropdown. Enter the Group/Version/Kind (GVK) if it's a custom resource definition (CRD), for e.g., `install.istio.io/v1apha1/IstioOperator`

* Choose the event type your watcher should listen to: `Created`, `Updated`, `Deleted`.

    | Event Type | Description                                                             |
    | ---------- | ----------------------------------------------------------------------- |
    | Created    | Triggers the watcher when your Kubernetes resource is created           |
    | Updated    | Triggers the watcher when your existing Kubernetes resource is modified |
    | Deleted    | Triggers the watcher when your existing Kubernetes resource is deleted  |

* Enter a [CEL expression](https://kubernetes.io/docs/reference/using-api/cel/) to catch a specific change in the resource's manifest.

{% hint style="info" %}
* **If resource is created** - Use 'DEVTRON_FINAL_MANIFEST'
* **If resource is updated** - Both 'DEVTRON_INITIAL_MANIFEST' and 'DEVTRON_FINAL_MANIFEST' can exist
* **If resource is deleted** - Use 'DEVTRON_INITIAL_MANIFEST'
{% endhint %}

**Example**: `DEVTRON_FINAL_MANIFEST.status.currentReplicas == DEVTRON_FINAL_MANIFEST.spec.maxReplicas`

### Execute Runbook

#### Trigger Devtron Job

The **Trigger Devtron Job** option allows you to choose a Devtron job pipeline that triggers a job (e.g., executing a script, emailing your stakeholders, etc.) whenever the watcher intercepts any changes.

![Figure 7: Trigger Devtron Job](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/trigger-job.gif)

Follow the below steps to trigger Devtron job: 

1. Select the **Trigger Devtron Job** option.

2. Choose your preferred [Devtron job pipeline](./jobs/configurations/workflow-editor-job.md) from the **Run Devtron Job pipeline** drop-down box. The pipelines configured while creating a job are displayed as options in the **Run Devtron Job pipeline** drop-down box. Unless a job pipeline is selected, the watcher will not intercept matching resource changes, even if defined conditions are met.

3. Select your preferred environment for the job to run in the **Execute job in environment** drop-down box.

4. Enter the runtime parameters (`Key`, `Type`, `Value`) in the **Runtime Parameters** section.

    When a job is executed, its container can access the initial and final resource manifest through the following special environment variables:

    * To access the initial resource manifest use: `DEVTRON_INITIAL_MANIFEST`

    * To access the final resource manifest use: `DEVTRON_FINAL_MANIFEST`

5. Click **Create Watcher**.

The watcher is now ready to intercept changes to selected resources and execute the configured job.

![Figure 8: Intercepted Changes](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/intercepted-changes-job.jpg)

#### Trigger Webhook

The Trigger Webhook option allows you to configure a [Webhook](https://hookdeck.com/webhooks/guides/what-are-webhooks-how-they-work) URL along with the payload (data) to be sent whenever the webhook is triggered. For example, to receive notifications in Slack, you can provide the Slack webhook URL and define the payload accordingly.

![Figure 9: Trigger Webhook](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/run-webhook.gif)

Follow the below steps to trigger webhook:

1. Select the **Trigger Webhook** option.

2. Enter your complete webhook URL, including `https://`, in the **Webhook URL** field.  Your configured payload will be delivered through this webhook.

3. Enter the relevant header key-value pairs that are necessary for authentication or to include additional metadata for the receiving endpoint in the `Header Key` and `Value` fields accordingly. 

4. Configure the payload in the **Payload (Data to be shared through Webhook)** field. 
    
    The payload is the actual content delivered to the webhook endpoint when the webhook is triggered. It contains the relavant information about changes in intercepted resources. The payload data must be entered in valid JSON format. Other formats such as YAML, or plain text are not supported. You can also customize the payload to include any resource-specific values that are useful for your integration. You can pass the properties of resource manifest in the webhook payload using the following keys:

    * To access the initial resource manifest use: `DEVTRON_INITIAL_MANIFEST`

    * To access the final resource manifest use: `DEVTRON_FINAL_MANIFEST`

        The above keys return values as stringified JSON.

5. Click **Create Watcher**. 

The watcher is now ready to intercept changes to selected resources and trigger the webhook.

![Figure 10: Intercepted Changes](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/intercepted-changes.jpg)

---

## Viewing Intercepted Changes

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to view intercepted changes.
{% endhint %}

### Details

This page allows you to view the changes to Kubernetes resources that you have selected for tracking changes. 

![Figure 11: Intercepted Changes - Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/intercepted-changes-page.jpg)

It comes with the following items to help you locate the resource, where the event has been intercepted:

* Searchbox 
* Cluster filter 
* Namespace filter
* Action filter (event type, i.e., `Created`, `Updated`, `Deleted`)
* Watcher filter (to check the intercepted changes of a specific watcher)

You get the following details in the results shown on the page.

|Field  | Description |
|-------|-------------|
|[Change In Resource](#change-in-resource)|Describes the type of change to the Kubernetes resource along with a link to its manifest|
|[Cluster/Namespace](#namespaces-to-watch) |Shows the cluster and namespace where the tracked Kubernetes resource belongs to|
|Intercepted By    |Shows the name of the watcher that intercepted the change|
|Intercepted At    |Shows the date and time when the event occurred |
|[Job Execution](#execute-runbook)     |Shows the status of the execution of job, e.g., `In Progress`, `Succeeded`, `Failed`|
|[Logs](#job-execution-log) |Links to the job log, i.e, the `Run history` page of the job|

### Change in Resource

You can check the changes in manifest by clicking **View Manifest** in `Change In Resource` column.

![Figure 12a: Created Resource Manifest - Final Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/view-manifest-v1.gif)


![Figure 12b: Updated Resource - Initial and Final Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/view-manifest-v2.gif)


![Figure 12c: Deleted Resource - Initial Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/view-manifest.gif)

### Job Execution Log

You can check the logs of the job executed when the Resource Watcher intercepts any change by clicking **logs**.

![Figure 13: Job Progress](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/job-exec-log.gif)

---

## Use Cases

### Live Stream Traffic Surge

A live streaming sports application experiences a surge in viewers during a major game. The Horizontal Pod Autoscaler (HPA) might not be able to handle the unexpected traffic if it's capped at a low max replica count.

1. Create a watcher named 'Live Stream Scaling Alert'.
2. Monitor updates to HPA resource in the application's namespace.
3. When `currentReplicas` count reaches `maxReplicas`, trigger a job that contains the script to increase the replica count.

### Pod Health Monitoring

A stock trading application constantly updates stock prices for its traders. If the pods become unhealthy, traders might see incorrect stock prices leading to bad investments.

1. Create a watcher named 'Pod Health Monitor'.
2. Track the pod workload of your application, if `DEVTRON_FINAL_MANIFEST.status.phase != 'Running'`, trigger a job that sends an Email/Slack alert with pod details.

