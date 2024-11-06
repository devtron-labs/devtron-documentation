# Resource Browser

## Introduction

The Devtron Resource Browser provides you a central interface to view and manage all your [Kubernetes objects](../resources/glossary.md#objects) across clusters.  It helps you perform key actions like viewing logs, editing live manifests, and even creating/deleting resources directly from the user interface. This is especially useful for troubleshooting purposes as it supports multi-cluster too.

{% hint style="info" %}
### Additional References
* [Resource browser versus traditional tools like kubectl](https://devtron.ai/blog/managing-kubernetes-resources-across-multiple-clusters)
* [Why you should use Devtron's Resource Browser](https://devtron.ai/blog/what-is-the-kubernetes-resource-browser-in-devtron)
{% endhint %}

First, the Resource Browser shows you a list of clusters added to your Devtron setup. By default, it displays a cluster named '*default_cluster*' after the [initial setup](../setup/install/README.md) is successful.

![Figure 1: Devtron Resource Browser - List of Clusters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/resource-browser.jpg)

You can easily connect more clusters by clicking the **Add Cluster** button located at the top of the browser. This will take you to the [Cluster & Environments](../../global-configurations/cluster-and-environments.md) configuration within [Global Configurations](../../global-configurations/README.md).

You may click a cluster to view and manage all its resources as shown below.

![Figure 2: Resources within Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/resource-list.jpg)
