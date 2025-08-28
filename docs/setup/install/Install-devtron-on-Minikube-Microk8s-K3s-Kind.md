# Install Devtron on Minikube, Microk8s, K3s, Kind, Cloud VMs

## Introduction

You can install and try Devtron on a high-end machine or a Cloud VM. If you install it on a laptop/PC, it may start to respond slowly.

{% hint style="success" %}

Try Devtron Freemium to access all the enterprise features for free and forever, limited to adding one additional cluster. [Install Devtron Freemium](https://license.devtron.ai/dashboard)

{% endhint %}

---

## Tutorial 

{% embed url="https://www.youtube.com/watch?v=rKUymNJqcjA" caption="Installing Devtron on Minikube" %}

---

## Add Helm Repo

```bash
helm repo add devtron https://helm.devtron.ai
```

---

## Update Helm Repo

```bash
helm repo update devtron
```

---

## For Minikube, MicroK8s, Kind, K3s

{% hint style="warning" %}

### Prerequisites 

Ensure you meet [all the requirements](../getting-started/getting-started.md#prerequisites) for installing Devtron.

{% endhint %}

### Installation Commands

{% tabs %}

{% tab title="Without Integrations" %}

**Minikube/MicroK8s/Kind Cluster**

To install Devtron on **Minikube/MicroK8s/Kind** cluster, run the following command:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort
```

**K3s Cluster**

To install Devtron on **K3s** cluster, run the following commands:

```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
```

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort
```

{% endtab %}

{% tab title="With CI/CD" %}

**Minikube/MicroK8s/Kind Cluster**

To install Devtron on **Minikube/MicroK8s/Kind** cluster, run the following command:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort \
--set installer.modules={cicd}
```

**K3s Cluster**

To install Devtron on **K3s** cluster, run the following commands:

```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
```

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort \
--set installer.modules={cicd}
```

{% endtab %}

{% tab title="With CI/CD and GitOps (Argo CD)" %}

**Minikube/MicroK8s/Kind Cluster**

To install Devtron on **Minikube/MicroK8s/Kind** cluster, run the following command:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort \
--set installer.modules={cicd} \
--set argo-cd.enabled=true
```

**K3s Cluster**

To install Devtron on **K3s** cluster, run the following commands:

```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
```

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort \
--set installer.modules={cicd} \
--set argo-cd.enabled=true
```

{% endtab %}

{% endtabs %}
 
### Access Devtron Dashboard

{% tabs %}
{% tab title="Minikube" %}

To access the dashboard on **Minikube** cluster, run the following command:

```bash
minikube service devtron-service --namespace devtroncd
```

This will directly open the dashboard URL in your browser

{% endtab %}
{% tab title="MicroK8s/Kind/K3s Cluster" %}

To access the dashboard on **MicroK8s/Kind/K3s** cluster, run the following command to port-forward the devtron service to port 8000:

```bash
kubectl -n devtroncd port-forward service/devtron-service 8000:80
```

After port-forwarding, you can access the dashboard at this URL: `http://127.0.0.1:8000`

{% endtab %}
{% endtabs %}

### Get Admin Credentials

When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use those credentials to log in as an administrator. 

**Username**: `admin` <br>
**Password**: Run the following command to get the admin password:

```bash
kubectl -n devtroncd get secret devtron-secret \
-o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
```

You can also install integrations from the [Devtron Stack Manager](../../user-guide/integrations/README.md).

{% hint style="info" %}

#### Next Recommended Action

When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use it to log in as an administrator.

After the initial login, we recommend you set up any [Single Sign-On (SSO)](../../user-guide/global-configurations/sso-login.md) service like Google, GitHub, etc., and then add other users (including yourself). Subsequently, all the users can use the same SSO (e.g., GitHub) to log in to the Dashboard.

{% endhint %}

---

## For Cloud VM (AWS EC2, Azure VM, GCP VM)

{% hint style="warning" %}

### Prerequisites 

* Ensure you meet [all the requirements](../getting-started/getting-started.md#prerequisites) for installing Devtron.

* It is recommended to use Cloud VM with 2vCPU+, 4GB+ free memory, 20GB+ storage, Compute Optimized VM type & Ubuntu Flavoured OS.

{% endhint %}

### Create MicroK8s Cluster

```bash
sudo snap install microk8s --classic 
sudo usermod -a -G microk8s $USER
sudo chown -f -R $USER ~/.kube
newgrp microk8s
microk8s enable dns storage helm3
echo "alias kubectl='microk8s kubectl '" >> .bashrc
echo "alias helm='microk8s helm3 '" >> .bashrc
source .bashrc
```

### Installation Commands

{% tabs %}

{% tab title="Without Integrations" %}

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort 
```

{% endtab %}

{% tab title="With CI/CD" %}

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort \
--set installer.modules={cicd}
```

{% endtab %}

{% tab title="With CI/CD and GitOps (Argo CD)" %}

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort \
--set installer.modules={cicd} \
--set argo-cd.enabled=true
```

{% endtab %}

{% endtabs %}

### Get devtron-service Port Number

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```

Make sure that the port used by the devtron-service remain open in the VM's security group or network security group.

You can also install integrations from the [Devtron Stack Manager](../../user-guide/integrations/README.md).

{% hint style="info" %}

#### Next Recommended Action

When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use it to log in as an administrator.

After the initial login, we recommend you set up any [Single Sign-On (SSO)](../../user-guide/global-configurations/sso-login.md) service like Google, GitHub, etc., and then add other users (including yourself). Subsequently, all the users can use the same SSO (e.g., GitHub) to log in to the Dashboard.

{% endhint %}

{% hint style="info" %}

If you have questions, please let us know on our Discord channel. [![Join Discord](https://img.shields.io/badge/Join%20us%20on-Discord-e01563.svg)](https://discord.gg/jsRG5qx2gp)

{% endhint %}