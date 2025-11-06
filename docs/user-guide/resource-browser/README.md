# Resource Browser

## Introduction

The Devtron Resource Browser provides you a central interface to view and manage all your [Kubernetes objects](../../reference/glossary.md#objects) across clusters.  It helps you perform key actions like viewing logs, editing live manifests, and even creating/deleting resources directly from the user interface. This is especially useful for troubleshooting purposes as it supports multi-cluster too.

:::info Additional References
* [Resource browser versus traditional tools like kubectl](https://devtron.ai/blog/managing-kubernetes-resources-across-multiple-clusters)
* [Why you should use Devtron's Resource Browser](https://devtron.ai/blog/what-is-the-kubernetes-resource-browser-in-devtron)
:::

First, the Resource Browser shows you a list of clusters added to your Devtron setup. By default, it displays a cluster named '*default_cluster*' after the Devtron setup is successful.

![Figure 1: Devtron Resource Browser - List of Clusters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/resource-browser-new.jpg)

In the image above, you can see a visual display of the health status for all clusters connected to Devtron. If any node within a cluster encounters an issue and is not ready, it will be highlighted in red, allowing you to quickly address the problem.

If you are a superadmin, you can connect more clusters by clicking the **Add Cluster** button located at the top of the browser. This will take you to the [Clusters & Environments](../global-configurations/cluster-and-environments.md) page within **Global Configurations**.

You may click a cluster to view and manage all its resources as shown below.

![Figure 2: Resources within Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/cluster-resources.jpg)

---

## Sections

* [Overview Page](overview.md)
* [Discover and Manage Resources](manage-resources.md)
* [Compare & Sync Clusters](compare-and-sync.md)
* [Nodes and Operations](nodes.md)
* [Pod Management and Debugging](pods.md)
* [Cluster Terminal](cluster-terminal.md)
* [Add Monitoring Dashboards/Graphs](monitoring-graphs.md)
* [Run Kubectl Commands Locally](kubectl-local.md)

