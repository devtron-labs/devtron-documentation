# Resource Watcher

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

An incident response if delayed can impact businesses, revenue, and waste valuable engineering time. Devtron's Resource Watcher enables you to perform automated actions upon the occurrence of events:

* **Create Event** - Occurs when a new Kubernetes resource is created, for e.g., a new pod spun up to handle increased traffic.
* **Update Event** - Occurs when an existing Kubernetes resource is modified, for e.g., deployment configuration tweaked to increase the replica count.
* **Delete Event** - Occurs when an existing Kubernetes resource is deleted, for e.g., deletion of an orphaned pod. 

You can make the Resource Watcher listen to the above events and accordingly trigger a webhook to notify the relevant party. Since manual intervention is absent, the timely response of this auto-remediation system improves your operational efficiency.

---

## Creating a Watcher

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to create a watcher.
{% endhint %}

This page allows you to create a watcher to track events and trigger a webhook. It also shows the existing list of watchers (if any).

1. Click **+ Create Watcher**. 

    ![Figure 1: Watchers - Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/watchers-page-db.jpg)

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

* Enter a [CEL expression](https://github.com/google/cel-spec/blob/master/doc/langdef.md) to catch a specific change in the resource's manifest.

{% hint style="info" %}
* **If resource is created** - Use 'DEVTRON_FINAL_MANIFEST'
* **If resource is updated** - Both 'DEVTRON_INITIAL_MANIFEST' and 'DEVTRON_FINAL_MANIFEST' can exist
* **If resource is deleted** - Use 'DEVTRON_INITIAL_MANIFEST'
{% endhint %}

**Example**: `DEVTRON_FINAL_MANIFEST.status.currentReplicas == DEVTRON_FINAL_MANIFEST.spec.maxReplicas`

### Execute Runbook

Here, you can set up a webhook to receive notifications when specified changes in Kubernetes resources are detected.

![Figure 7: Webhook to Trigger](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/run-webhook.gif)

* **Webhook URL**: Here, you'll provide the Webhook URL where you want the payload delivered. It must be valid and reachable for the watcher to work properly. 

* **Header Key-Value**: Fill in any relevant header key-value pairs necessary for authentication or to include additional metadata for the receiving endpoint. 

* **Payload**: Define what you want to deliver to the Webhook when this watcher is triggered. You can customize this payload with information related to changes in the intercepted resources. You can pass the properties of resource manifest in the webhook payload using the following keys:
    * To access initial resource manifest use `DEVTRON_INITIAL_MANIFEST`
    * To access final resource manifest use `DEVTRON_FINAL_MANIFEST`

    The above keys return values as stringified JSON

* Click **Create Watcher**. 

Your watcher is now ready to intercept the changes to the selected resources. 

---

## Viewing Intercepted Changes

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to view intercepted changes.
{% endhint %}

### Details

This page allows you to view the changes to Kubernetes resources that you have selected for tracking changes. 

![Figure 8: Intercepted Changes - Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/intercepted-changes-page-db.jpg)

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
|Execution Status  |Shows the status of the execution of webhook, e.g., `Succeeded`, `Failed`|

### Change in Resource

You can check the changes in manifest by clicking **View Manifest** in `Change In Resource` column.

![Figure 9a: Created Resource Manifest - Final Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/view-manifest-db1.gif)


![Figure 9b: Updated Resource - Initial and Final Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/view-manifest-db2.gif)


![Figure 9c: Deleted Resource - Initial Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/view-manifest-db3.gif)

---

## Use Cases

### Live Stream Traffic Surge

A live streaming sports application experiences a surge in viewers during a major game. The Horizontal Pod Autoscaler (HPA) might not be able to handle the unexpected traffic if it's capped at a low max replica count.

1. Create a watcher named 'Live Stream Scaling Alert'.
2. Monitor updates to HPA resource in the application's namespace.
3. When `currentReplicas` count reaches `maxReplicas`, trigger a webhook to intimate the concerned users.

### Pod Health Monitoring

A stock trading application constantly updates stock prices for its traders. If the pods become unhealthy, traders might see incorrect stock prices leading to bad investments.

1. Create a watcher named 'Pod Health Monitor'.
2. Track the pod workload of your application, if `DEVTRON_FINAL_MANIFEST.status.phase != 'Running'`, trigger a webhook to notify the stakeholders.