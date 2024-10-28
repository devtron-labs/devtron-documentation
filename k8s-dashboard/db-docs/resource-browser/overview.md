# Overview

![Figure 1: Resource Browser - Overview Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/rb-overview.jpg)

## Resource Utilization

This shows the combined CPU and memory consumption of all running pods in the cluster.

| Parameter       | Description                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------|
| CPU Usage       | Percentage of CPU resources currently being used across all the pods in the cluster.                        |
| CPU Capacity   | Total amount of CPU resources available across all the nodes in the cluster. Measured in millicores (m).    |
| CPU Requests   | Total amount of CPU resources requested by all the pods in the cluster.                                     |
| CPU Limits      | Maximum amount of CPU resources that a total number of pods can use in the cluster.                        |
| Memory Usage   | Percentage of memory resources currently being used across all the pods in the cluster.                     |
| Memory Capacity | Total amount of memory resources available across all the nodes in the cluster. Measured in Megabytes (Mi). |
| Memory Requests | Total amount of memory resources requested by all the pods in the cluster.                                  |
| Memory Limits  | Maximum amount of memory resources that a total number of pods can use in the cluster.                       |

---

## Errors

This shows errors in the cluster. If no error is present in the cluster, Resource Browser will not display this section.

### Catalog Framework [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to edit the catalog framework.
{% endhint %}

Based on the schema provided in the catalog framework, you can add relevant details for each cluster. Refer [Catalog Framework](../../global-configurations/catalog-framework.md) for more details. 

---

## Readme

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to edit the readme file.
{% endhint %}

You can also include additional information about your cluster using the Markdown editor.