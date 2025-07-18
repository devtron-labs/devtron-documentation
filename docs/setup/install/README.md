# Install Devtron

## Introduction 

Devtron is installed over a Kubernetes cluster. Once you [Create a Kubernetes Cluster](../getting-started/getting-started.md#create-a-kubernetes-cluster), Devtron can be installed standalone or along with CI/CD integration.

{% hint style="success" %}

Try Devtron Enterprise for free — unlock advanced features built for scale. [Start Your Free Trial](https://license.devtron.ai/dashboard).

{% endhint %}

---

{% hint style="warning" %}

### Prerequisites 

Ensure you meet [all the requirements](../getting-started/getting-started.md#prerequisites) for installing Modern Kubernetes Dashboard.

{% endhint %}

## Installation Methods 

Choose one of the following installation methods as per your requirements:

| | Local | MiniKube, MicroK8s, K3s, Kind | Cloud VM (AWS EC2, Azure, GCP) | Air-Gapped Environments | 
| --- | --- | --- | --- | --- | 
| **Without Integrations** | [Install without Integrations](../install/install-devtron.md)| [Install without Integrations](../install/Install-devtron-on-Minikube-Microk8s-K3s-Kind.md#install-devtron-without-integrations)| [Install without Integrations](../install/Install-devtron-on-Minikube-Microk8s-K3s-Kind.md#install-devtron-without-integrations-1) | [Install without Integrations](../install/install-devtron-in-airgapped-environment.md#install-devtron-without-any-integration)| 
| **With Integrations** | | | | | 
| CI/CD | [Install with CI/CD](../install/install-devtron-with-cicd.md) | [Install with CI/CD](../install/Install-devtron-on-Minikube-Microk8s-K3s-Kind.md#install-devtron-with-cicd)| [Install with CI/CD](../install/Install-devtron-on-Minikube-Microk8s-K3s-Kind.md#install-devtron-with-cicd-1) | [Install with CI/CD](../install/install-devtron-in-airgapped-environment.md#installing-devtron-with-cicd-mode) | 
| GitOps (ArgoCD) | [Install with CI/CD & GitOps (Argo CD)](../install/install-devtron-with-cicd-with-gitops.md)| [Install with CI/CD & GitOps (Argo CD)](../install/Install-devtron-on-Minikube-Microk8s-K3s-Kind.md#install-devtron-with-cicd-and-gitops-argo-cd)| [Install with CI/CD & GitOps (Argo CD)](../install/Install-devtron-on-Minikube-Microk8s-K3s-Kind.md#install-devtron-with-cicd-and-gitops-argo-cd-1) | [Install with CI/CD & GitOps (Argo CD)](../install/install-devtron-in-airgapped-environment.md#install-devtron-with-cicd-mode-including-argocd)| 


{% hint style="info" %}

If you are planning to install Devtron in production environments, kindly refer to [Production Infra Recommendations](../install/prod-infra.md). 

{% endhint %}

You can also install integrations from the [Devtron Stack Manager](/docs/user-guide/integrations/README.md).

---

## Upgrade Devtron

You can upgrade Devtron in one of the following ways:

* [Upgrade Devtron Using Helm](../upgrade/README.md)

* [Upgrade Devtron from UI](../upgrade/upgrade-devtron-ui.md)

{% hint style="info" %}

If you have questions, please let us know on our Discord channel. [![Join us on Discord](https://img.shields.io/badge/Join%20us%20on-Discord-e01563.svg)](https://discord.gg/jsRG5qx2gp)

{% endhint %}