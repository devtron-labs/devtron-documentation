# Cost Visibility
## Introduction

In Devtron, Cost Visibility helps you understand your infrastructure spends. Instead of only using your cloud provider billing dashboards, you can see costs directly within Devtron, broken down by **Applications**, **Clusters**, **Environments**, **Projects**, **Infra Components**.

It tracks spend on **CPU**, **Memory**, **Storage**, **GPU**, **network**, and highlights efficiency along with potential savings. You can view costs in multiple currencies, select daily, monthly, or custom ranges, and navigate from overall spend to specific cost breakdowns.

## Overview

The **Overview** page provides a summary of infrastructure costs across your Applications, Clusters, Environments, Projects, and Infra Components in Devtron. It highlights overall spend, resource-level distribution, and opportunities for optimization (Potential Savings).

At the top, you can choose your preferred currency time and time duration to set the context for your usage costs. This makes sure all costs on the **Overview** page are displayed in the correct currency and time range.

<!-- image -->

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

<!-- image -->

## Potential Savings
 
The Potential Savings section estimates how much cost can be reduced by comparing the resources you have provisioned with the resources you have actually used. It also shows the percentage of current spend that could be saved.

| Field                  | Description                                                                                      |
|:---------------------- |:------------------------------------------------------------------------------------------------ |
| **Recommended Cost**   | The estimated cost calculated from actual resource usage instead of allocated capacity           |
| **Potential Savings**  | The percentage of your current spend that could be reduced                                       |
| **Monthly Savings**    | The estimated savings for one month based on the difference between allocated and used resources |
| **Annual Savings**     | The projected savings over a year based on the same calculation                                  |

<!-- image -->

## Track Performance

The Track Performance section helps you understand costs in more detail by breaking them down across different views and time ranges. It includes two charts, **Cost Breakdown** and **Cost Trend**.

### Cost Breakdown

The Cost Breakdown chart helps you see how costs are distributed across different infrastructure components for the selected time period. 

Each bar represents one Application, Cluster, Environment, or Project, and the colored segments in the bar show the share of different resource types. This makes it easy to compare categories and see which resources are contributing most to their total cost.

| Resource Type | Color Used in Chart |
|:--------------|:---------------------|
| **CPU Cost**       | Light Green      |
| **Memory Cost**    | Blue     |
| **Storage (PV) Cost** | Violet   |
| **GPU Cost**       | Dark Green      |
| **Network Cost**   | Orange      |

#### Filters

| Filters | What It Shows |
|:-----------------|:--------------|
| **Application**  | Each bar represents an application, segmented by CPU, Memory, Storage (PV), GPU, and Network costs. |
| **Cluster**      | Each bar represents a cluster, segmented by CPU, Memory, Storage (PV), GPU, and Network costs. |
| **Environment**  | Each bar represents an environment, segmented by CPU, Memory, Storage (PV), GPU, and Network costs. |
| **Project**      | Each bar represents a project, segmented by CPU, Memory, Storage (PV), GPU, and Network costs. |

#### Sorting Criteria

| Sorting Option     | Description |
|:-------------------|:------------|
| **Cost: High to Low** | Shows the highest cost items first. |
| **Cost: Low to High** | Shows the lowest cost items first. |
| **A to Z**           | Sorts items alphabetically. |
| **Z to A**           | Sorts items in reverse alphabetical order. |

### Cost Trend

The Cost Trend chart helps you understand, how your resource usage costs change over time, broken down by the selected category, Applications, Clusters, Environments, or Infrastructure Resources.

Each bar represents the total cost for a specific time period (week, month, quarter, or year). 

Within the bar, each colored segment shows the contribution of the selected category (Applications, Clusters, Environments, or Infrastructure Resources). This makes it easier to inspect both the overall cost usage and the relative share of each category over the selected time range.

#### Time Range  

| Option     | What It Shows |
|:-----------|:--------------|
| **Week**   | Breaks down costs for each week |
| **Month**  | Aggregates costs by month |
| **Quarter**| Groups costs into calendar quarters (Q1, Q2, etc.) | 
| **Year**   | Shows yearly cost trends, useful for long-term analysis |

<!-- need to confirm the quarter type -->

#### Stack By  

| Option                | What Each Segment Represents |
|:----------------------|:------------------------------|
| **Applications**      | Cost share of each application in the selected time range |
| **Clusters**          | Cost share of each cluster in the selected time range |
| **Environments**      | Cost share of each environment (e.g., dev, staging, prod) |
| **Infrastructure Resources** | Cost share of CPU, Memory, Storage (PV), GPU, and Network, in the selected time range |

## Actions and Insights

The Actions & Insights section highlights where you can achieve the highest cost savings. It shows the categories with the largest cost saving opportunities, based on the difference between allocated resources and your actual usage.

Each category will show

| Field                  | Description |
|:-----------------------|:------------|
| **Name**               | The name of the category (for example, a cluster, application, or environment) with the largest savings opportunities. |
| **Potential Savings (%)** | The percentage of your current spend that could be reduced, for the selected time range. |
| **Estimated Savings**  | The estimated cost you could save in that category, based on the difference between provisioned and used resources, for the selected time range.|

Clicking on any item in this list takes you to its detailed Cost Breakdown page. Refer [Cost Breakdown]() to learn more.