import SupademoEmbed from '@site/src/components/SupademoEmbed';

# Overview

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

The **Overview** page provides a summary of infrastructure costs across your Applications, Clusters, Environments, Projects, and Infra Components in Devtron. It highlights overall spend, resource-level distribution, and opportunities for optimization (Potential Savings).

At the top, you can choose your preferred currency time and time duration to set the context for your usage costs. This makes sure all costs on the **Overview** page are displayed in the correct currency and time range.

![Figure 1: Cost Visibility Overview](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/cost-visibility/cost-visibility-overview.jpg)

Cost Overview has the following sections:

1. [At a Glance](#at-a-glance)
2. [Potential Savings](#potential-savings)
3. [Track Performance](#track-performance)
4. [Actions and Insights](#actions-and-insights)

### How is the cost calculated?

* Devtron calculates and updates cost data **every hour** based on the resource usage metrics collected from **Prometheus**.  
* Prometheus gathers real-time data for **CPU**, **Memory**, **GPU**, **Storage (PV)**, and **Network** from your connected clusters.  
* Devtron then processes this data every hour to display accurate and up-to-date cost insights across your infrastructure.

:::info Note
Cost Visibility is currently supported **only for Devtron and Helm applications**.  
It is **not available** for applications deployed externally through **Argo CD** or **Flux**.
:::

---

## At a Glance

The **At a Glance** summarizes the total cost for the selected period and breaks it down by resource type. Each card shows the cost, its share of the total, and a usage trend graph.

<SupademoEmbed id="cmg7svcus10om2nommllm1nu2" /><br />


| Card             | Description                                                                                      |
|:---------------- |:------------------------------------------------------------------------------------------------ |
| **Total Cost**   | Shows the overall infrastructure cost for the selected time period, and the cost-trend graph for the selected period of time |
| **CPU Cost**     | Shows the cost of CPU resources, their percentage contribution to the total cost, and the cost-trend graph for the selected period of time |
| **RAM Cost**     | Shows the cost of memory resources, their percentage contribution to the total cost, and the cost-trend graph for the selected period of time |
| **PV Cost**      | Shows the cost of persistent volume (storage), its percentage contribution to the total cost, and the cost-trend graph for the selected period of time |
| **GPU Cost**     | Shows the cost of GPU resources, their percentage contribution to the total cost, and the cost-trend graph for the selected period of time         |
| **Network Cost** | Shows the cost of network usage, its percentage contribution to the total cost, and the cost-trend graph for the selected period of time           |

:::success Tip 
Network cost refers to the expenses associated with **data transfer**, including communication between **pods, nodes, and external services** within or across clusters. Refer to [AWS guide on network cost](https://aws.amazon.com/premiumsupport/knowledge-center/eks-cluster-networking-costs/) to learn more.
:::

---

## Potential Savings
 
The **Potential Savings** section estimates how much cost can be saved by comparing the resources you have provisioned with the resources you have actually used. It also shows the percentage of current spend that could be saved.

<SupademoEmbed id="cmg7qkb510x8w2nomc6d29rir" /><br />


| Field                  | Description                                                                                      |
|:---------------------- |:------------------------------------------------------------------------------------------------ |
| **Recommended Cost**   | The estimated cost calculated from actual resource usage instead of allocated capacity           |
| **Potential Savings**  | The amount which you could have saved, for the selected time period|
| **Estimated cost reduction**  | The percentage of your current spend that could be saved, for the selected time period           |


---

## Track Performance

The **Track Performance** section helps you understand costs in more detail by breaking them down across different views and time ranges. It includes two charts, **Cost Breakdown** and **Cost Trend**.

### Cost Breakdown Bar Chart

The **Cost Breakdown** Bar Chart helps you see how costs are distributed across different infrastructure components for the selected time period. 

<SupademoEmbed id="cmgaj0aid3d8l2nomb611rpbl" /><br />


Each bar represents one [Application](../../reference/glossary.md#devtron-apps), [Cluster](../../reference/glossary.md#cluster), [Environment](../../reference/glossary.md#environment), or [Project](../global-configurations/projects.md), and the colored segments in the bar show the share of different resource types. This makes it easy to compare categories and see which resources are contributing most to their total cost.

#### Color Schema 

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
| **Application**  | Each bar represents an application (Devtron App or Helm App), segmented by CPU, Memory, Storage (PV), GPU, and Network costs |
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

#### Time Range Filters

| Options    | Description |
|:-----------|:--------------|
| **Last 24 hours**   | Shows cost for the last 24 hours |
| **Last 7 days**  | Shows cost for last 7 days |
| **Last 30 days**| Shows cost for the last 30 days | 
| **last 90 days**   | Shows cost for the last 90 days |

### Cost Trend Line Chart

The **Cost Trend** line chart helps you understand, how your total and individual resource usage costs change over time. It helps you analyze spending patterns and identify which resources contribute most to your overall cost.

<SupademoEmbed id="cmh343wdi09qkcdwp0vw8ncaw" /><br />


Each colored line represents a specific infrastructure component, CPU, Memory, Storage, Network, or GPU, while the Total line combines all costs. Hovering over any point on the graph displays the exact cost breakdown for that day.

You can change the time range (for example, Last 7 Days, Last 30 Days, or Last 90 Days) to view trends for a specific period.

#### Time Range  

| Options    | Description |
|:-----------|:--------------|
| **Last 24 hours**   | Shows cost for the last 24 hours |
| **Last 7 days**  | Shows cost for last 7 days |
| **Last 30 days**| Shows cost for the last 30 days | 
| **last 90 days**   | Shows cost for the last 90 days |

#### Color Schema 

| Resource Type         | Color Used in Chart  |
|:--------------------- |:---------------------|
| **CPU Cost**          |     LimeGreen     |
| **Memory Cost**       |        SkyBlue          |
| **Storage (PV) Cost** |         AquaTeal       |
| **GPU Cost**          |      Magenta      |
| **Network Cost**      |         GoldenYellow       |

### Most Cost Efficient 

The **Most Cost Efficient** section helps you identify which resources are utilizing costs most effectively across different scopes, such as Cluster, Application, Environment, or Project.

<SupademoEmbed id="cmh344vs309sicdwphlwbua6e" /><br />


Each row in the list displays

| **Field** | **Description** |
|------------|-----------------|
| **Name** | The name of the selected category (for example, a project, application, cluster, or environment)|
| **Total Cost** | The total cost incurred by that category within the selected time range |
| **Cost Efficiency (%)** | Indicates how efficiently the resource utilizes its allocated cost compared to others. Higher values represent better cost efficiency |

You can use the dropdown menus to customize your view:

| **Filter** | **Description** |
|-------------|-----------------|
| **Scope Selector** | Lets you choose whether to view cost efficiency by **Cluster**, **Application**, **Environment**, or **Project**. |
| **Time Range** | Allows you to select the time range, **Last 24 Hours**, **Last 7 Days**, **Last 30 Days**, or **Last 90 Days**. |


### Most Expensive

The **Most Expensive** section highlights the clusters, applications, environments, or projects that contribute the highest costs over a selected time range. This helps you quickly identify where your infrastructure expenses are concentrated and which components may require optimization.

<SupademoEmbed id="cmh34ohno0au7cdwpoz8p8bgg" /><br />


Each row in the list displays:

| **Field** | **Description** |
|------------|-----------------|
| **Name** | The name of the selected category, such as a **Cluster**, **Application**, **Environment**, or **Project** |
| **Cost Type** | The selected cost type, such as **CPU**, **Memory**, **Storage**, **GPU**, **Network**, or **Total Cost** |
| **Total Cost** | The total cost incurred by that category for the chosen cost type within the specified time period |

You can customize the view using the following filters:

| **Filter** | **Description** |
|-------------|-----------------|
| **Scope Selector** | Lets you choose for which category (**Cluster**, **Application**, **Environment**, or **Project**), you want to view the most expensive resources |
| **Time Range** | Allows you to choose the time period for cost evaluation,  **Last 24 Hours**, **Last 7 Days**, **Last 30 Days**, or **Last 90 Days**. |
| **Cost Type** | Enables you to filter costs by specific categories such as **CPU Cost**, **Memory Cost**, **Storage Cost**, **GPU Cost**, **Network Cost**, or **Total Cost**. |

---

## Actions and Insights

The **Actions & Insights** section highlights where you can achieve the highest cost savings. It shows the categories with the largest cost saving opportunities, based on the difference between allocated resources and your actual usage.

<SupademoEmbed id="cmgj316cr0x93krn9l7g4uo7a" /><br />


It also shows the cost visibility status, which displays the number of clusters where cost visibility is enabled, failed, in progress, or not enabled. This helps you understand for which clusters cost data is currently being tracked and if you want you can enable/disable cost tracking for the cluster by clicking on **Go to configurations** button. Refer [configurations](./configurations.md) to learn more.

Each category in the **Top saving opportunities** will show

| Field                  | Description |
|:-----------------------|:------------|
| **Name**               | The name of the category (for example, a cluster, application, or environment) with the largest savings opportunities |
| **Potential Savings (%)** | The percentage of your current spend that could be saved, for the selected time range |
| **Estimated Savings**  | The estimated cost you could save in that category, based on the difference between provisioned and used resources, for the selected time range|

Clicking on any item in this list takes you to its detailed Cost Breakdown page. Refer [Cost Breakdown](./cost-breakdown.md) to learn more.

---

## FAQs

<details>
<summary><strong>1. Why am I not seeing cost data on the Overview page?</strong></summary>

Cost Visibility is only supported for **Devtron** and **Helm** applications.  
If you’re only using **Argo CD** or **Flux** apps, their cost data won’t appear.  
Also, ensure that **Cost Visibility** is enabled for your cluster, refer [Configurations](./configurations.md) to learn more.
</details>

<details>
<summary><strong>2. What should I do if the graphs look empty or incomplete?</strong></summary>

This usually happens when cost tracking is not enabled for certain clusters or when there’s no activity in the selected time range.  
Try expanding the time range. 
</details>

<details>
<summary><strong>3. Can I compare costs across different clusters or applications?</strong></summary>

Yes. The **Cost Breakdown**, let you compare spend across **Clusters**, **Applications**, **Environments**, or **Projects**.  
You can also use filters and sorting options to focus on a specific scope or resource type.
</details>

<details>
<summary><strong>4. What does Potential Savings mean in simple terms?</strong></summary>

It shows how much you could save if your resources were right-sized, i.e, it’s the difference between what you’ve **allocated** and what you actually **use**.
</details>

<details>
<summary><strong>5. How often is the cost data updated?</strong></summary>

Cost data is refreshed **automatically every hour**, based on the latest metrics from Prometheus.
</details>