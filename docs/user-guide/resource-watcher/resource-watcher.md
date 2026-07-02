# Resource Watcher [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

## Introduction

An incident response if delayed can impact businesses, revenue, and waste valuable engineering time. Devtron's **Resource Watcher** enables you to perform automated actions (auto-remediation) upon the occurrence of Kubernetes events:

* **Create Event** - Occurs when a new Kubernetes resource is created, for e.g., a new pod spun up to handle increased traffic.
* **Update Event** - Occurs when an existing Kubernetes resource is modified, for e.g., deployment configuration tweaked to increase the replica count.
* **Delete Event** - Occurs when an existing Kubernetes resource is deleted, for e.g., deletion of an orphaned pod.

You can make the Resource Watcher listen to the above events and accordingly run a job you wish to get done, for e.g., increasing memory, executing a script, raising a Jira ticket, emailing your stakeholders, sending Slack notifications, and many more. Since manual intervention is absent, the timely response of this auto-remediation system improves your operational efficiency.

{% hint style="info" %}
### Prerequisites
* This is an **Enterprise-only** feature.
* You must have **super-admin** permission to create watchers and view intercepted changes.
* The **Scoop** component must be running on every cluster you want to watch. Scoop is the per-cluster service that observes resource events, evaluates your filter, and reports intercepted changes back to Devtron. Clusters without Scoop will not produce intercepted events.
* To run a job on interception, you need at least one **Devtron Job pipeline** already configured (for the Webhook trigger type, a reachable webhook URL).
{% endhint %}

---

## Supported Events

A watcher can listen to one or more of the following event types on the resources you select:

| Event Type | Description |
| ---------- | ----------------------------------------------------------------------- |
| Created    | Triggers the watcher when your Kubernetes resource is created           |
| Updated    | Triggers the watcher when your existing Kubernetes resource is modified |
| Deleted    | Triggers the watcher when your existing Kubernetes resource is deleted  |

You can watch any built-in Kubernetes resource (Deployment, Pod, HPA, StatefulSet, etc.) as well as **Custom Resource Definitions (CRDs)** by specifying their Group/Version/Kind (GVK).

---

## How It Works

1. You create a **watcher** that defines *what* to watch (namespaces + resource kinds + event types), *when* to act (an optional CEL filter expression), and *what* to do (a runbook — a Devtron Job pipeline or a webhook).
2. Devtron pushes this configuration to the **Scoop** service running on each selected cluster.
3. Scoop observes the live resource events. For every matching event it evaluates your **CEL filter expression** against the resource manifest(s).
4. If the expression passes (or is empty), the event is recorded as an **intercepted change** and the configured runbook is triggered.
5. The triggered job can read the resource state through the `DEVTRON_INITIAL_MANIFEST` and `DEVTRON_FINAL_MANIFEST` environment variables.

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

* **Name** is mandatory and must be unique across active watchers.

![Figure 3: Adding Name and Description of Watcher](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/basic-details.gif)

### Namespaces to Watch

Here, you can select the [namespaces](../reference/glossary.md#namespace) whose [Kubernetes resource](../reference/glossary.md#objects) you wish to monitor for changes.

* You can watch the namespace(s) across **All Clusters** (existing and future).

    ![Figure 4: Choosing Namespaces of all Clusters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/all-cluster.gif)

* Or you can watch namespace(s) of **Specific Clusters**.

    ![Figure 5: Choosing Namespaces of Specific Clusters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/specific-cluster.gif)

{% hint style="info" %}
In both the above options, if you choose 'Specific Namespaces', you can further decide whether to track the namespaces you enter (by clicking 'Include selections') or to track the namespaces except the ones you enter (by clicking 'Exclude selections'). You can also scope by environment category such as all production or all non-production environments.
{% endhint %}

### Intercept Change in Resources

Here, you can select the exact Kubernetes resource(s) you wish to track for changes (in the namespace(s) you selected in the previous step).

![Figure 6: Picking Resources to Track](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/intercept-changes.gif)

* You can choose the resource from the **Resource kind(s) to watch** dropdown. Enter the Group/Version/Kind (GVK) if it's a custom resource definition (CRD), for e.g., `install.istio.io/v1apha1/IstioOperator`

* Choose the event type your watcher should listen to: `Created`, `Updated`, `Deleted`. (See [Supported Events](#supported-events).)

* Enter a [CEL expression](https://github.com/google/cel-spec/blob/master/doc/langdef.md) to catch a specific change in the resource's manifest. Leaving it **empty** matches every event of the selected type.

#### Variables available in the CEL expression

| Variable | Available on | Description |
| --- | --- | --- |
| `DEVTRON_FINAL_MANIFEST` (alias `final`) | Created, Updated | The new/final state of the resource |
| `DEVTRON_INITIAL_MANIFEST` (alias `initial`) | Updated, Deleted | The previous/initial state of the resource |
| `action` | All | The event type as a string: `CREATED`, `UPDATED`, or `DELETED` |

{% hint style="info" %}
* **If resource is created** - Use 'DEVTRON_FINAL_MANIFEST'
* **If resource is updated** - Both 'DEVTRON_INITIAL_MANIFEST' and 'DEVTRON_FINAL_MANIFEST' can exist
* **If resource is deleted** - Use 'DEVTRON_INITIAL_MANIFEST'
{% endhint %}

**Example**: `DEVTRON_FINAL_MANIFEST.status.currentReplicas == DEVTRON_FINAL_MANIFEST.spec.maxReplicas`

### Execute Runbook

Here, you can choose what should trigger if your watcher intercepts a matching change. A watcher supports two runbook (trigger) types:

#### Option A — Run a Devtron Job pipeline

* Choose a job pipeline from the **Run Devtron Job pipeline** dropdown. If a pipeline is not selected, the watcher won't intercept matching resource changes even if your defined conditions are met.

* Select the environment in which the job should run. It can either be `devtron-ci` or the source environment (the intercepted namespace where the event has occurred).

* If the job expects input parameters, you may add its key and value under **Runtime input parameters**.

    During a job's execution, its container can access the initial and final resource manifest through special environment variables. These variables are:
    * `DEVTRON_INITIAL_MANIFEST`
    * `DEVTRON_FINAL_MANIFEST`

#### Option B — Call a Webhook

Instead of a job, a watcher can notify an external system by calling a webhook when a change is intercepted. For this trigger type you provide:

* **Webhook URL** — the endpoint to call.
* **Headers** — optional key/value headers (e.g., an authorization token).
* **Payload** — the request body to send (can reference the intercepted resource data).

This is useful for forwarding events to incident management, chat, or custom automation systems.

Finally, click **Create Watcher**. Your watcher is now ready to intercept the changes to the selected resources.

![Figure 7: Choosing a Job to Trigger](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/execute-runbook.gif)

---

## Viewing Intercepted Changes

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to view intercepted changes.
{% endhint %}

### Details

This page allows you to view the changes to Kubernetes resources that you have selected for tracking changes.

![Figure 8: Intercepted Changes - Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/intercepted-changes-page.jpg)

It comes with the following items to help you locate the resource, where the event has been intercepted:

* Searchbox
* Cluster filter
* Namespace filter
* Action filter (event type, i.e., `Created`, `Updated`, `Deleted`)
* Watcher filter (to check the intercepted changes of a specific watcher)
* Time range filter (`from` / `to`)

You get the following details in the results shown on the page.

|Field  | Description |
|-------|-------------|
|[Change In Resource](#change-in-resource)|Describes the type of change to the Kubernetes resource along with a link to its manifest|
|[Cluster/Namespace](#namespaces-to-watch) |Shows the cluster and namespace where the tracked Kubernetes resource belongs to|
|Intercepted By    |Shows the name of the watcher that intercepted the change|
|Intercepted At    |Shows the date and time when the event occurred |
|[Job Execution](#execute-runbook)     |Shows the status of the execution of job, e.g., `Initiated`, `Progressing`, `Succeeded`, `Failed`, `Error`|
|[Logs](#job-execution-log) |Links to the job log, i.e, the `Run history` page of the job|

### Change in Resource

You can check the changes in manifest by clicking **View Manifest** in `Change In Resource` column.

![Figure 9a: Created Resource Manifest - Final Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/view-manifest-v1.gif)


![Figure 9b: Updated Resource - Initial and Final Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/view-manifest-v2.gif)


![Figure 9c: Deleted Resource - Initial Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/view-manifest.gif)

### Job Execution Log

You can check the logs of the job executed when the Resource Watcher intercepts any change by clicking **logs**.

![Figure 10: Job Progress](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/resource-watcher/job-exec-log.gif)

---

## API Reference

These endpoints back the Resource Watcher UI. All require a super-admin bearer token.

### Watchers

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/k8s/watcher` | Create a watcher |
| `GET` | `/k8s/watcher` | List watchers (supports `offset`, `size`, `search`, `order`, `orderBy`) |
| `GET` | `/k8s/watcher/{identifier}` | Get a watcher by ID |
| `PUT` | `/k8s/watcher/{identifier}` | Update a watcher |
| `DELETE` | `/k8s/watcher/{identifier}` | Delete a watcher |

### Intercepted Changes

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/k8s/intercept-events` | List intercepted changes (supports `search`, `from`, `to`, `watchers[]`, `namespaces[]`, `executionStatuses[]`, `selectedActions[]`) |
| `GET` | `/intercept-event/{identifier}` | Get a single intercepted change |

A watcher definition consists of the event configuration (namespace **selectors**, **resource kinds (GVKs)**, the **CEL filter expression**, and **selected actions**) plus one or more **triggers** (type `DEVTRON_JOB` or `WEBHOOK`).

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

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
| --- | --- | --- |
| Watcher created but no changes are intercepted | Scoop is not running on the watched cluster | Ensure the Scoop component is deployed and healthy on each cluster you want to watch. |
| Matching events occur but the runbook never runs | No job pipeline selected, or trigger misconfigured | Confirm a Devtron Job pipeline (or a valid webhook URL) is selected in the **Execute Runbook** step. |
| Too many / unwanted interceptions | CEL filter empty or too broad | Add or tighten the CEL expression so only the intended changes match. |
| CEL expression rejected on save | Invalid syntax, or referencing a manifest not available for that event | Use `DEVTRON_FINAL_MANIFEST` for Created, `DEVTRON_INITIAL_MANIFEST` for Deleted; both are available for Updated. |
| Job runs but can't read the resource | Manifest env vars not used | Read `DEVTRON_INITIAL_MANIFEST` / `DEVTRON_FINAL_MANIFEST` inside the job container. |
| Cannot create or view watchers | Insufficient permissions | Resource Watcher actions require super-admin permission. |
