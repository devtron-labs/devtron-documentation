# Getting Started

### Introduction

Devtron is installed over a Kubernetes cluster. Once you create a Kubernetes cluster, Devtron can be installed standalone or along with integrations. This section includes information about the minimum requirements you need to install and use Devtron.

***

### Create a Kubernetes Cluster

{% hint style="info" %}
**Setting up a production-grade infrastructure?**

Refer [Devtron's Production Infra Recommendations](../install/prod-infra.md)
{% endhint %}

You can create any [Kubernetes cluster](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/) (preferably K8s version 1.16 or higher) for installing Devtron.

| Cloud Provider                     | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWS EKS**                        | <p>Create a cluster using <a href="https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html">AWS EKS</a></p><p><strong>Note</strong>: <a href="http://github.com/devtron-labs/devtron/blob/b33a37bb608d07966c8f8b89e4f59287db873c6c/docs/setup/install/install-devtron-on-aws-eks.md">Refer our documentation</a> for installing <strong>Devtron</strong> on AWS EKS Cluster</p> |
| **Google Kubernetes Engine (GKE)** | Create a cluster using [GKE](https://cloud.google.com/kubernetes-engine/)                                                                                                                                                                                                                                                                                                                             |
| **Azure Kubernetes Service (AKS)** | Create a cluster using [AKS](https://learn.microsoft.com/en-us/azure/aks/)                                                                                                                                                                                                                                                                                                                            |
| **k3s - Lightweight Kubernetes**   | <p>Create a cluster using <a href="https://devtron.ai/blog/deploy-your-applications-over-k3s-lightweight-kubernetes-in-no-time/">k3s - Lightweight Kubernetes</a></p><p><strong>Note</strong>: <a href="../install/devtron-oss.md">Refer our documentation</a> for installing Devtron on Minikube, Microk8s, K3s, or Kind</p>                                                                         |

***

### Recommended Resources

The minimum requirements for installing Devtron depends on the integrations you need.

*   For configuring small resources (to manage not more than 5 apps on Devtron):

    | Integration                                   | CPU | Memory |
    | --------------------------------------------- | :-: | :----: |
    | **With CI/CD, GitOps**                        |  2  |  6 GB  |
    | **Minimal (Only Dashboard, No Integrations)** |  1  |  1 GB  |
*   For configuring medium/larger resources (to manage more than 5 apps on Devtron):

    | Integration                                   | CPU | Memory |
    | --------------------------------------------- | :-: | :----: |
    | **With CI/CD, GitOps**                        |  6  |  13 GB |
    | **Minimal (Only Dashboard, No Integrations)** |  2  |  3 GB  |

> Refer to the [Override Configurations](../install/override-default-devtron-installation-configs.md) section for more information. If you have questions, let us know on our Discord channel. [![Join us on Discord](https://img.shields.io/badge/Join%20us%20on-Discord-e01563.svg)](https://discord.gg/jsRG5qx2gp)

{% hint style="warning" %}
#### Note

* Please make sure that the recommended resources are available on your Kubernetes cluster before you proceed with Devtron installation.
* We do not recommend using burstable CPU VMs (T series in AWS, B series in Azure, or E2/N1 in GCP) for installing Devtron, as they may lead to inconsistent performance.
{% endhint %}

{% hint style="success" %}
#### Next Step

[Install Devtron on your Kubernetes Cluster](../install/)
{% endhint %}
