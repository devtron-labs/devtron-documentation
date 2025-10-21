# Infrastructure Overview

## Introduction

## At a Glance

The At a Glance section helps you quickly understand the overall state of your connected clusters and available resources. It helps you understand your current infrastructure capacity and connectivity status at a single glance.

| **Card** | **Description** |
|:----------|:----------------|
| **Reachable Clusters** | Shows the number of clusters that are currently reachable out of the total clusters connected to Devtron |
| **Total CPU Capacity** | Displays the total CPU capacity across all reachable clusters, giving you an overview of your available compute power|
| **Total Memory Capacity** | Displays the total memory capacity across all reachable clusters, helping you keep track of your memory resources |


{% embed url="" %}

{% hint style=“info” %}
If some clusters don’t appear, they might be temporarily unreachable. You can verify their status under Cluster Configuration.
{% endhint %}

## Cluster & Nodes

The **Cluster & Nodes** section helps you monitor the health and stability of your connected clusters and nodes. It gives you visibility into cluster connectivity, node errors, and scheduling readiness, allowing you to quickly spot and resolve any infrastructure level issues before they affect workloads.

| **Card** | **Description** |
|:----------|:----------------|
| **Cluster Health Status** | Displays the number of clusters which are healthy. A healthy cluster indicates active connectivity, while **Connection Failed** highlights clusters that are currently unreachable|
| **Node Errors** | Shows whether any node-level issues exist. If you see **No node errors**, all nodes are operating normally |
| **Node Scheduling** | Displays the percentage of nodes currently available for scheduling workloads. **Schedulable** nodes are ready to accept pods|

{% hint style="info" %}
If you notice connection failures or scheduling issues, verify your cluster connectivity and node configurations under **Cluster Management**.
{% endhint %}

{% embed url="" %}

### Cluster Counts

The **Cluster Counts** section gives you visibility into how your clusters are distributed across different cloud providers and Kubernetes versions. It helps you identify where most of your clusters are hosted and which versions are actively running in your infrastructure.

There are two views available:

| **Tab** | **Description** |
|:---------|:----------------|
| **By Providers** | Displays the total number of clusters grouped by cloud providers such as **GCP**, **AWS**, **Azure**, or Unknown. This helps you understand your cloud distribution and dependency. |
| **By Cluster Versions** | Displays the number of clusters based on their Kubernetes version. This helps you track version diversity and identify clusters that may require upgrades for consistency and security. |

{% hint style="info" %}
You can sort the data **High to Low** or **Low to High** to quickly identify the most used cloud provider or the most common Kubernetes version in your setup.
{% endhint %}

{% embed url="" %}

### Cluster Capacity & Resource Allocation

The **Cluster Capacity & Resource Allocation** section provides a detailed view of how CPU and Memory resources are distributed and utilized across all connected clusters.  
It helps you assess infrastructure efficiency, monitor resource limits, and identify clusters that may be underutilized or overcommitted.

| **Field** | **Description** |
|:-----------|:----------------|
| **Cluster Name** | Lists all clusters connected to Devtron. You can click on a cluster name to view its detailed resource usage |
| **CPU** | Displays the total CPU capacity, along with utilization, requests, and limits for each cluster. This helps you track compute usage and detect over-provisioning |
| **Memory** | Displays the total memory capacity, along with utilization, requests, and limits for each cluster. It helps you ensure workloads are balanced, and resource allocation is efficient |

You can **sort** the data by:
* **Cluster Name** (A to Z or Z to A)
* **Utilization** (High to Low or Low to High)

{% hint style="info" %}
If a cluster shows zero utilization or capacity, it may be inactive or disconnected. Verify its status under **Cluster Configuration**.
{% endhint %}

{% embed url="" %}

## Node Counts

The **Node Counts** section helps you visualize how nodes are distributed across clusters and autoscaling modes.  
It provides a quick overview of your cluster node density and helps identify environments with higher or lower capacity.

| **Tab** | **Description** |
|:----------|:----------------|
| **By Cluster** | This graph displays the total number of nodes within each cluster. Each bar shows the number of clusters within a specific cluster. This view helps you assess how evenly nodes are distributed and whether specific clusters may be over or under-provisioned |
| **By Autoscaler** | Groups nodes based on their autoscaling configuration (for example, **GKE Automode** or **Not Detected**). Each bar shows the number of nodes within the autoscaling configuration|

You can **sort** the chart data using the dropdown in the top-right corner:
* **High to Low** or **Low to High**, to focus on clusters with the most or fewest nodes.

{% hint style="info" %}
If some clusters show **Not Detected** under autoscaler, it means Devtron could not identify their scaling configuration.  
You can verify autoscaling settings in your respective cloud console or cluster configuration.
{% endhint %}

<!-- the above hint block is my assumption, needs to be verified -->

{% embed url="" %}

### Cost Breakdown Graph

The Cost Breakdown chart helps you see how costs are distributed across different infrastructure components for the selected time period. 

Each bar represents one Application, Cluster, Environment, or Project, and the colored segments in the bar show the share of different resource types. This makes it easy to compare categories and see which resources are contributing most to their total cost.

{% embed url="https://app.supademo.com/demo/cmgaj0aid3d8l2nomb611rpbl" %}

| Resource Type         | Color Used in Chart  |
|:--------------------- |:---------------------|
| **CPU Cost**          |     LimeGreen     |
| **Memory Cost**       |        SkyBlue          |
| **Storage (PV) Cost** |         AquaTeal       |
| **GPU Cost**          |      Magenta      |
| **Network Cost**      |         GoldenYellow       |

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

# Overview

## Introduction

The **Overview** page provides a summary of infrastructure costs across your Applications, Clusters, Environments, Projects, and Infra Components in Devtron. It highlights overall spend, resource-level distribution, and opportunities for optimization (Potential Savings).

At the top, you can choose your preferred currency time and time duration to set the context for your usage costs. This makes sure all costs on the **Overview** page are displayed in the correct currency and time range.

![Figure 1: Cost Visibility Overview](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/cost-visibility/cost-visibility-overview.jpg)

## At a Glance

The **At a Glance** summarizes the total cost for the selected period and breaks it down by resource type. Each card shows the cost, its share of the total, and a usage trend graph.

| Card             | Description                                                                                      |
|:---------------- |:------------------------------------------------------------------------------------------------ |
| **Total Cost**   | Shows the overall infrastructure cost for the selected time period, and the cost-trend graph for the selected period of time |
| **CPU Cost**     | Shows the cost of CPU resources, their percentage contribution to the total cost, and the cost-trend graph for the selected period of time |
| **RAM Cost**     | Shows the cost of memory resources, their percentage contribution to the total cost, and the cost-trend graph for the selected period of time |
| **PV Cost**      | Shows the cost of persistent volume (storage), its percentage contribution to the total cost, and the cost-trend graph for the selected period of time |
| **GPU Cost**     | Shows the cost of GPU resources, their percentage contribution to the total cost, and the cost-trend graph for the selected period of time         |
| **Network Cost** | Shows the cost of network usage, its percentage contribution to the total cost, and the cost-trend graph for the selected period of time           |

{% embed url="https://app.supademo.com/demo/cmg7svcus10om2nommllm1nu2" %}

## Potential Savings
 
The Potential Savings section estimates how much cost can be saved by comparing the resources you have provisioned with the resources you have actually used. It also shows the percentage of current spend that could be saved.

| Field                  | Description                                                                                      |
|:---------------------- |:------------------------------------------------------------------------------------------------ |
| **Recommended Cost**   | The estimated cost calculated from actual resource usage instead of allocated capacity           |
| **Potential Savings**  | The percentage of your current spend that could be saved, for the selected time period           |
| **Monthly Savings**    | The estimated savings for one month based on the difference between allocated and used resources |
| **Annual Savings**     | The projected savings over a year based on the same calculation                                  |

{% embed url="https://app.supademo.com/demo/cmg7qkb510x8w2nomc6d29rir" %}

## Track Performance

The Track Performance section helps you understand costs in more detail by breaking them down across different views and time ranges. It includes two charts, **Cost Breakdown** and **Cost Trend**.

### Cost Breakdown Graph

The Cost Breakdown chart helps you see how costs are distributed across different infrastructure components for the selected time period. 

Each bar represents one Application, Cluster, Environment, or Project, and the colored segments in the bar show the share of different resource types. This makes it easy to compare categories and see which resources are contributing most to their total cost.

{% embed url="https://app.supademo.com/demo/cmgaj0aid3d8l2nomb611rpbl" %}

| Resource Type         | Color Used in Chart  |
|:--------------------- |:---------------------|
| **CPU Cost**          |     LimeGreen     |
| **Memory Cost**       |        SkyBlue          |
| **Storage (PV) Cost** |         AquaTeal       |
| **GPU Cost**          |      Magenta      |
| **Network Cost**      |         GoldenYellow       |

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

### Cost Trend Graph

The Cost Trend chart helps you understand, how your resource usage costs change over time, broken down by the selected category, Applications, Clusters, Environments, or Infrastructure Resources.

Each bar represents the total cost for a specific time period (week, month, quarter, or year). 

Within the bar, each colored segment shows the contribution of the selected category (Applications, Clusters, Environments, or Infrastructure Resources). This makes it easier to inspect both the overall cost usage and the relative share of each category over the selected time range.

{% embed url="https://app.supademo.com/demo/cmgg88zje6r362nom7ko7mz4t" %}

#### Time Range  

| Options    | Description |
|:-----------|:--------------|
| **Week**   | Breaks down costs for each week |
| **Month**  | Aggregates costs by month |
| **Quarter**| Groups costs into calendar quarters (Q1, Q2, etc.) | 
| **Year**   | Shows yearly cost trends, useful for long-term analysis |

<!-- need to confirm the quarter type -->

#### Stack By  

| Options                | Description |
|:----------------------|:------------------------------|
| **Applications**      | Cost share of each application in the selected time range |
| **Clusters**          | Cost share of each cluster in the selected time range |
| **Environments**      | Cost share of each environment (e.g., dev, staging, prod) |
| **Infrastructure Resources** | Cost share of CPU, Memory, Storage (PV), GPU, and Network, in the selected time range |

## Actions and Insights

The Actions & Insights section highlights where you can achieve the highest cost savings. It shows the categories with the largest cost saving opportunities, based on the difference between allocated resources and your actual usage.

It also shows, which version of Kubernetes your cluster is running, and you can also check the compatibility of the cluster to upgrade to the latest Kubernetes version. You can click **Show All** to expand and view additional clusters that are not immediately visible in the list.

Each item in the **Top saving opportunities** will show

| Field                  | Description |
|:-----------------------|:------------|
| **Name**               | The name of the category (for example, a cluster, application, or environment) with the largest savings opportunities |
| **Potential Savings (%)** | The percentage of your current spend that could be saved, for the selected time range |
| **Estimated Savings**  | The estimated cost you could save in that category, based on the difference between provisioned and used resources, for the selected time range|

Clicking on any item in this list takes you to its detailed Cost Breakdown page. Refer [Cost Breakdown](./cost-breakdown.md) to learn more.

### Checking Upgrade Compatibility

1. To check upgrade capability, go to **Infrastructure Management** → **Overview**.

2. Under **Check cluster update compatibility**, hover over the cluster you want to check compatibility for and click the search button.

3. A pop-up modal will appear, select the target version, and click scan cluster.

4. A Page will open, with the summary of all the API-endpoints that are compatible for upgrading. You can also check **Deprecated Fields** (Against current API version), **Resources with no PDB**, **Resources with 0 Disruption PDB**


{% embed url="" %}
