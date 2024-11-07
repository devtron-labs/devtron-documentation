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
| **AWS EKS** | Create a cluster using [AWS EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html). |
| **Google Kubernetes Engine (GKE)** | Create a cluster using [GKE](https://cloud.google.com/kubernetes-engine/). |
| **Azure Kubernetes Service (AKS)** | Create a cluster using [AKS](https://learn.microsoft.com/en-us/azure/aks/). | 
| **k3s - Lightweight Kubernetes** | Create a cluster using [k3s - Lightweight Kubernetes](https://devtron.ai/blog/deploy-your-applications-over-k3s-lightweight-kubernetes-in-no-time/). | 

The above is not an exhaustive list. You may create a cluster using a platform of your choice, such as [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Farm64%2Fstable%2Fbinary+download), [MicroK8s](https://microk8s.io/docs), [Kind](https://kind.sigs.k8s.io/docs/user/quick-start) on your local machine.


### Recommended Resources

The minimum cluster resource requirements for installing **Modern Kubernetes Dashboard** (as per the number of applications you want to manage on Devtron) are provided below:

| Resource Type              | CPU | Memory |
|----------------------------|-----|--------|
| **Small (≤5 apps)**        | 1   | 1 GB   |
| **Medium/Large (>5 apps)** | 2   | 3 GB   |

---

## Install Helm

Refer [Helm's official site](https://helm.sh/docs/intro/install/) to know the process of installing Helm on your target machine.

---

## Next Steps

Refer [Install Modern Kubernetes Dashboard by Devton](./install-devtron-dashboard.md)

