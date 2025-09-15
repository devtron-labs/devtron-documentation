# Getting Started

## Introduction

Devtron is installed over a Kubernetes cluster. Once you create a Kubernetes cluster, Devtron can be installed standalone or along with integrations. This section includes information about the minimum requirements you need to install and use Devtron.

---

## Prerequisites

* Create a [Kubernetes cluster](#create-a-kubernetes-cluster)

* [Helm Installation](https://helm.sh/docs/intro/install/)

* [Recommended Resources](#recommended-resources)

{% hint style="warning" %}

### Are you using EKS version 1.23 or above?

You must also install [aws-ebs-csi-driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html). Run the following command to install AWS EBS CSI driver using Helm:

```bash
helm repo add aws-ebs-csi-driver \
https://kubernetes-sigs.github.io/aws-ebs-csi-driver \
helm repo update \
helm upgrade --install aws-ebs-csi-driver \
--namespace kube-system aws-ebs-csi-driver/aws-ebs-csi-driver
```

{% endhint %}

### Create a Kubernetes Cluster

{% hint style="info" %}

### Setting up a production-grade infrastructure?

Refer [Devtron's Production Infra Recommendations](../install/prod-infra.md).

{% endhint %}
 
You can create any [Kubernetes cluster](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/) (preferably K8s version 1.16 or higher) for installing Devtron.

You can create a cluster using one of the following cloud providers as per your requirements:

| Cloud Provider | Description |
| --- | --- |
| **AWS EKS** | Create a cluster using [AWS EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html). <br>`Note`: You can also refer our customized documentation for installing  `Devtron with CI/CD` on AWS EKS [here](https://github.com/devtron-labs/devtron/blob/b33a37bb608d07966c8f8b89e4f59287db873c6c/docs/setup/install/install-devtron-on-aws-eks.md).</br>  |
| **Google Kubernetes Engine (GKE)** | Create a cluster using [GKE](https://cloud.google.com/kubernetes-engine/). |
| **Azure Kubernetes Service (AKS)** | Create a cluster using [AKS](https://learn.microsoft.com/en-us/azure/aks/). | 
| **k3s - Lightweight Kubernetes** | Create a cluster using [k3s - Lightweight Kubernetes](https://devtron.ai/blog/deploy-your-applications-over-k3s-lightweight-kubernetes-in-no-time/).<br>`Note`: You can also refer our documentation for installing Devtron on `Minikube, Microk8s, K3s, Kind` [here](../install/devtron-oss.md).</br> | 

### Install Helm

Make sure to install [Helm](https://helm.sh/docs/intro/install/).

### Recommended Resources

The minimum requirements for installing `Modern Kubernetes Dashboard by Devtron` and `Devtron with CI/CD` as per the number of applications you want to manage on `Devtron` are provided below:

* For configuring small resources (to manage not more than 5 apps on Devtron):

| Integration | CPU | Memory |
| --- | :---: | :---: |
| **Devtron with CI/CD** | 2 | 6 GB |
| **Modern Kubernetes Dashboard by Devtron** | 1 | 1 GB |

* For configuring medium/larger resources (to manage more than 5 apps on Devtron):

| Integration | CPU | Memory |
| --- | :---: | :---: |
| **Devtron with CI/CD** | 6 | 13 GB |
| **Modern Kubernetes Dashboard by Devtron** | 2 | 3 GB |

> Refer to the [Override Configurations](../install/override-default-devtron-installation-configs.md) section for more information.

{% hint style="warning" %}

* Please make sure that the recommended resources are available on your Kubernetes cluster before you proceed with Devtron installation.

* It is NOT recommended to use brustable CPU VMs (T series in AWS, B Series in Azure and E2/N1 in GCP) for Devtron installation to experience consistency in performance.

{% endhint %}

---
 
## Installation of Devtron

You can install Devtron standalone (Modern Kubernetes Dashboard by Devtron) or along with integrations. Or, you can upgrade Devtron to the latest version.

Refer to [Devtron Installation Options](../install/README.md) to install Devtron as per your requirements.

{% hint style="info" %}

If you have questions, please let us know on our discord channel. [![Join us on Discord](https://img.shields.io/badge/Join%20us%20on-Discord-e01563.svg)](https://discord.gg/jsRG5qx2gp)

{% endhint %}