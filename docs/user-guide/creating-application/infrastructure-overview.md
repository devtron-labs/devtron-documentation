# Infrastructure Overview

## Introduction

The **Infrastructure Overview** page provides a centralized view of your Kubernetes infrastructure across all connected clusters. It displays cluster health, resource capacity, node distribution, and version details in a single dashboard.

It contains the following sections:

1. [At a Glance](#at-a-glance)
2. [Cluster & Nodes](#cluster--nodes)  
3. [Cost Visibility](#cost-visibility)
4. [Actions & Insights](#actions-and-insights)

---

## At a Glance

The **At a Glance** section helps you quickly understand the overall state of your connected clusters and available resources. It helps you understand your current infrastructure capacity and connectivity status at a single glance.

{% embed url="https://app.supademo.com/demo/cmh0e4sh81naf6nxtlvrh3kwy" %}

| **Card** | **Description** |
|:----------|:----------------|
| **Reachable Clusters** | Shows the number of clusters that are currently reachable out of the total clusters connected to Devtron |
| **Total CPU Capacity** | Displays the total CPU capacity across all reachable clusters, giving you an overview of your available compute power|
| **Total Memory Capacity** | Displays the total memory capacity across all reachable clusters, helping you keep track of your memory resources |


{% hint style=“info” %}
If some clusters don’t appear, they might be temporarily unreachable. You can verify their status under Cluster Configuration.
{% endhint %}

--- 

## Cluster & Nodes

The **Cluster & Nodes** section helps you monitor the health and stability of your connected clusters and nodes. It gives you visibility into cluster connectivity, node errors, and scheduling readiness, allowing you to quickly spot and resolve any infrastructure level issues before they affect workloads.

{% embed url="https://app.supademo.com/demo/cmh0eklkn1npo6nxta30w3fnb" %}

| **Card** | **Description** |
|:----------|:----------------|
| **Cluster Health Status** | Displays the number of clusters which are healthy. A healthy cluster indicates active connectivity, while **Connection Failed** highlights clusters that are currently unreachable|
| **Node Errors** | Shows whether any node-level issues exist. If you see **No node errors**, all nodes are operating normally |
| **Node Scheduling** | Displays the percentage of nodes currently available for scheduling workloads. **Schedulable** nodes are ready to accept pods|

{% hint style="info" %}
If you notice connection failures or scheduling issues, verify your cluster connectivity and node configurations under **Cluster Management**.
{% endhint %}

### Cluster Counts

The **Cluster Counts** section gives you visibility into how your clusters are distributed across different cloud providers and Kubernetes versions. It helps you identify where most of your clusters are hosted and which versions are actively running in your infrastructure.

{% embed url="https://app.supademo.com/demo/cmh0f2cp21nuo6nxt0u0xu6ab" %}

There are two views available:

| **Tab** | **Description** |
|:---------|:----------------|
| **By Providers** | Displays the total number of clusters grouped by cloud providers such as **GCP**, **AWS**, **Azure**, or Unknown. This helps you understand your cloud distribution and dependency. |
| **By Cluster Versions** | Displays the number of clusters based on their Kubernetes version. This helps you track version diversity and identify clusters that may require upgrades for consistency and security. |

{% hint style="info" %}
You can sort the data **High to Low** or **Low to High** to quickly identify the most used cloud provider or the most common Kubernetes version in your setup.
{% endhint %}

### Cluster Capacity & Resource Allocation

The **Cluster Capacity & Resource Allocation** section provides a detailed view of how CPU and Memory resources are distributed and utilized across all connected clusters. It helps you assess infrastructure efficiency, monitor resource limits, and identify clusters that may be underutilized or over committed.

{% embed url="https://app.supademo.com/demo/cmh1t50wh0e6rnitlu546ellj" %}

| **Field** | **Description** |
|:-----------|:----------------|
| **Cluster Name** | Lists all clusters connected to Devtron. You can click on a cluster name to view its detailed resource usage |
| **CPU** | Displays the total CPU capacity, along with utilization, requests, and limits for each cluster. This helps you track compute usage and detect over-provisioning |
| **Memory** | Displays the total memory capacity, along with utilization, requests, and limits for each cluster. It helps you ensure workloads are balanced, and resource allocation is efficient |

You can sort the data by:
* **Cluster Name** (A to Z or Z to A)
* **Utilization** (High to Low or Low to High)

{% hint style="info" %}
### Note
If a cluster shows zero utilization or capacity, it may be inactive or disconnected. Verify its status under **Cluster Configuration**.
{% endhint %}

---

## Node Counts

The **Node Counts** section helps you visualize how nodes are distributed across clusters and autoscaling modes.  
It provides a quick overview of your cluster node density and helps identify environments with higher or lower capacity.

{% embed url="https://app.supademo.com/demo/cmh1te7ck0ei9nitl41zpx5mg" %}

| **Tab** | **Description** |
|:----------|:----------------|
| **By Cluster** | This graph displays the total number of nodes within each cluster. Each bar shows the number of clusters within a specific cluster. This view helps you assess how evenly nodes are distributed and whether specific clusters may be over or under-provisioned |
| **By Autoscaler** | Groups nodes based on their autoscaling configuration (for example, **GKE Automode** or **Not Detected**). Each bar shows the number of nodes within the autoscaling configuration|

You can sort the chart data using the dropdown in the top-right corner:
* **High to Low** or **Low to High**, to focus on clusters with the most or fewest nodes.

{% hint style="info" %}
If some clusters show **Not Detected** under autoscaler, it means Devtron could not identify their scaling configuration.  
You can verify autoscaling settings in your respective cloud console or cluster configuration.
{% endhint %}

### Cost Visibility

The Cost Breakdown chart helps you see how costs are distributed across different infrastructure components for the selected time period. 

Each bar represents one Application, Cluster, Environment, or Project, and the colored segments in the bar show the share of different resource types. This makes it easy to compare categories and see which resources are contributing most to their total cost.

{% embed url="https://app.supademo.com/demo/cmh1u1s3o0fbmnitleo58pcg3" %}

| Resource Type         | Color Used in Chart  |
|:--------------------- |:---------------------|
| **CPU Cost**          |     LimeGreen        |
| **Memory Cost**       |        SkyBlue       |
| **Storage (PV) Cost** |         AquaTeal     |
| **GPU Cost**          |      Magenta         |
| **Network Cost**      |         GoldenYellow |

#### Filters

| Filters | What It Shows |
|:-----------------|:--------------|
| **Application**  | Each bar represents an application, segmented by CPU, Memory, Storage (PV), GPU, and Network costs |
| **Cluster**      | Each bar represents a cluster, segmented by CPU, Memory, Storage (PV), GPU, and Network costs |
| **Environment**  | Each bar represents an environment, segmented by CPU, Memory, Storage (PV), GPU, and Network costs |
| **Project**      | Each bar represents a project, segmented by CPU, Memory, Storage (PV), GPU, and Network costs |

#### Sorting Criteria

| Sorting Option     | Description |
|:-------------------|:------------|
| **Cost: High to Low** | Shows the highest cost items first |
| **Cost: Low to High** | Shows the lowest cost items first |
| **A to Z**           | Sorts items alphabetically |
| **Z to A**           | Sorts items in reverse alphabetical order |

---

## Actions and Insights

The **Actions & Insights** section highlights where you can achieve the highest cost savings. It shows the categories with the largest cost saving opportunities, based on the difference between allocated resources and your actual usage.

{% embed url="https://app.supademo.com/demo/cmh1u9uss0fvjnitlk1tn4lv0" %}

It also shows, which version of Kubernetes your cluster is running, and you can also check the compatibility of the cluster to upgrade to the latest Kubernetes version. You can click **Show All** to expand and view additional clusters that are not immediately visible in the list.

Each item in the **Top saving opportunities** will show

| Field                  | Description |
|:-----------------------|:------------|
| **Name**               | The name of the category (for example, a cluster, application, or environment) with the largest savings opportunities |
| **Potential Savings (%)** | The percentage of your current spend that could be saved, for the selected time range |
| **Estimated Savings**  | The estimated cost you could save in that category, based on the difference between provisioned and used resources, for the selected time range|

Clicking on any item in this list takes you to its detailed Cost Breakdown page. Refer [Cost Breakdown](../cost-visibility/configurations.md) to learn more.

### Checking Upgrade Compatibility

1. To check upgrade capability, go to **Infrastructure Management** → **Overview**.

2. Under **Check cluster update compatibility**, hover over the cluster you want to check compatibility for and click the search button.

3. A pop-up modal will appear, select the target version, and click scan cluster.

4. A page will open, with the summary of all the API-endpoints that are compatible for upgrading. You can also check **Deprecated Fields** (Against current API version), **Resources with no PDB**, **Resources with 0 Disruption PDB**

---

## FAQs

<details>
<summary><strong>1. Why does Cost Visibility show data for some clusters but not others?</strong></summary>

Cost data appears only for clusters where **Cost Visibility** is enabled.  
If a cluster doesn’t show cost insights, verify that the **Cost Visibility** module is active for that cluster. 

Refer [Configurations](../cost-visibility/configurations.md) to learn more.
</details>

<details>
<summary><strong>2. What does **Connection Failed** mean in Cluster Health Status?</strong></summary>

**Connection Failed** means Devtron could not reach the cluster’s API server or retrieve data from it.  
This can happen due to:
* Network or firewall restrictions  
* Expired or invalid Kubernetes credentials  
* Misconfigured cluster agent  

Try revalidating credentials or redeploying the Devtron agent to restore connectivity.
</details>

<details>
<summary><strong>3. Why does a cluster show **Not Detected** under Autoscaler in Node Counts?</strong></summary>

This means Devtron couldn’t identify any predefined autoscaling configuration, it can be a custom autoscaler.
</details>

<details>
<summary><strong>4. How often is the infrastructure data updated?</strong></summary>

Infrastructure data (including metrics, cost, and health status) is refreshed automatically every hour.  
</details>