# Overview

![Figure 1: Resource Browser - Overview Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/resource-browser-overview.jpg)

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

## Errors in Cluster

This shows errors in the cluster. If no error is present in the cluster, Resource Browser will not display this section.

---

## Catalog Framework <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

:::caution Who Can Perform This Action?
Users need to have super-admin permission to edit the catalog framework.
:::

Based on the schema provided in the catalog framework, you can add relevant details for each cluster. Refer [Catalog Framework](../global-configurations/catalog-framework.md) for more details. 

---

## Readme

:::caution Who Can Perform This Action?
Users need to have super-admin permission to edit the readme file.
:::

You can also include additional information about your cluster using the Markdown editor.

---

## Check Compatibility before Cluster Upgrade <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Whenever you upgrade your Kubernetes version, the API versions change and your workloads/resources may not be compatible with those API versions. Therefore, the resources need to be upgraded first. This could mean changing the API version of the resources itself or changing their outdated spec.

The **Check Compatibility** feature within Resource Browser scans your cluster and automatically identifies all such resources/workloads that need manual intervention before proceeding with an actual cluster upgrade.

![Figure 2: Checking Compatibility](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/check-compatibility.jpg)

### Walkthrough

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/mJsTN1x1fr0" title="Check Compatibility before Cluster Upgrade" frameborder="0" allowfullscreen></iframe></div>