# Prerequisites

Before installing Devtron's Modern Kubernetes Dashboard, make sure to fulfill the following requirements:

* Create a [Kubernetes cluster](#create-a-kubernetes-cluster)
* [Install Helm](https://helm.sh/docs/intro/install/)
* [Recommended Resources](#recommended-resources)

---

## Create a Kubernetes Cluster
 
You can create any [Kubernetes cluster](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/) (preferably K8s version 1.16 or higher) for installing Devtron.

You can create a cluster using one of the following cloud providers as per your requirements:

| Cloud Provider | Description |
| --- | --- |
| **AWS EKS** | Create a cluster using [AWS EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html). <br>`Note`: You can also refer our customized documentation for installing  `Devtron with CI/CD` on AWS EKS [here](https://github.com/devtron-labs/devtron/blob/b33a37bb608d07966c8f8b89e4f59287db873c6c/docs/setup/install/install-devtron-on-aws-eks.md).</br>  |
| **Google Kubernetes Engine (GKE)** | Create a cluster using [GKE](https://cloud.google.com/kubernetes-engine/). |
| **Azure Kubernetes Service (AKS)** | Create a cluster using [AKS](https://learn.microsoft.com/en-us/azure/aks/). | 
| **k3s - Lightweight Kubernetes** | Create a cluster using [k3s - Lightweight Kubernetes](https://devtron.ai/blog/deploy-your-applications-over-k3s-lightweight-kubernetes-in-no-time/).<br>`Note`: You can also refer our customized documentation for installing `Dashboard by Devtron` on `Minikube, Microk8s, K3s, Kind` [here](../install/Install-devtron-on-Minikube-Microk8s-K3s-Kind.md).</br> | 

---

## Install Helm

Refer [Helm's official site](https://helm.sh/docs/intro/install/) to know the process of installing Helm in your target machine.

---

## Recommended Resources

The minimum resource requirements for installing **Modern Kubernetes Dashboard** (as per the number of applications you want to manage on Devtron) are provided below:

| Resource Type              | CPU | Memory |
|----------------------------|-----|--------|
| **Small (≤5 apps)**        | 1   | 1 GB   |
| **Medium/Large (>5 apps)** | 2   | 3 GB   |

