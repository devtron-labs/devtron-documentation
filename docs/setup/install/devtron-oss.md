# Install Devtron OSS

## Introduction

Devtron OSS is the open-source edition of Devtron intended for non-enterprise users.

The table below shows the installation options available in Devtron OSS. Further, there are steps given to install your preferred option in your Kubernetes cluster.

| Installation Option                                                                                      | What Is Included                                            | When To Use                                                                            |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [**Minimal (without integrations)**](devtron-oss.md#install-devtron-without-integrations)     | Dashboard + Resource Browser + Core operator configurations | A unified view of Helm apps, FluxCD apps, ArgoCD apps, and their related K8s resources |
| [**With CI/CD**](devtron-oss.md#install-devtron-with-ci-cd)                                   | Everything in Minimal + Build and Deploy (CI/CD) module     | You need a complete CI-CD pipeline for your custom apps (a.k.a Devtron Apps)           |
| [**With CI/CD + GitOps (Argo CD)**](devtron-oss.md#install-devtron-with-ci-cd--gitops-argocd) | Everything in CI/CD + GitOps (Argo CD) module               | You need automated, Git-driven deployments                                             |

{% hint style="success" %}
#### Not Sure What To Choose?

Begin with the **Minimal** version. You can always install CI/CD and GitOps integrations later from [Devtron Stack Manager](../../user-guide/integrations/).
{% endhint %}

---

## Prerequisites

* Kubernetes cluster v1.16 or later (cloud or local)
* [Helm v3.8+ installed](https://helm.sh/docs/intro/install/)
* For production cases, fulfill the [Infrastructure Recommendations](prod-infra.md)

{% hint style="warning" %}
#### Cluster created on AWS? Is your EKS version 1.23 or above?

Install ['AWS EBS CSI' driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) using the following command:

```bash
helm repo add aws-ebs-csi-driver https://kubernetes-sigs.github.io/aws-ebs-csi-driver
helm repo update
helm upgrade --install aws-ebs-csi-driver \
--namespace kube-system aws-ebs-csi-driver/aws-ebs-csi-driver
```
{% endhint %}

{% hint style="warning" %}
#### Using K3s?

K3s does not include a default storage provisioner, so before you run Helm install in [Step 2](devtron-oss.md#step-2-choose-an-installation-option), apply the Rancher local-path-provisioner to enable dynamic storage:

```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml
```
{% endhint %}

{% hint style="info" %}
#### Want to Customize the Installation?

See [Additional Installation Resources](../../reference/README.md) for production infra recommendations, air-gapped installs, blob storage, config overrides, StorageClass, Database, Ingress setup, backups, and more.
{% endhint %}

---

## Step 1: Add Devtron Helm Repository

```bash
helm repo add devtron https://helm.devtron.ai
helm repo update devtron
```

---

## Step 2: Choose an Installation Option

{% tabs %}
{% tab title="Minimal (Dashboard Only)" %}

### Install Devtron without Integrations

After you [add Devtron Helm Repository](#step-1-add-devtron-helm-repository) run the command below:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd
```
{% endtab %}

{% tab title="With CI/CD" %}

### Install Devtron with CI/CD

After you [add Devtron Helm Repository](#step-1-add-devtron-helm-repository) run the command below:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set installer.modules={cicd}
```
{% endtab %}

{% tab title="With CI/CD + GitOps (Argo CD)" %}

### Install Devtron with CI/CD + GitOps (ArgoCD)

After you [add Devtron Helm Repository](#step-1-add-devtron-helm-repository) run the command below:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set installer.modules={cicd} \
--set argo-cd.enabled=true
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
### How much time does it take for installation?

It usually takes 5–15 minutes to spin up all Devtron microservices (depending on your installation option).

You may check the status by running the command below. If the output is `Applied`, Devtron is installed.

```bash
kubectl -n devtroncd get installers installer-devtron \
-o jsonpath='{.status.sync.status}'
```

{% endhint %}

---

## Step 3: Obtain the Dashboard URL

{% tabs %}
{% tab title="For EKS/AKS/GKE" %}
To access the dashboard on EKS, AKS, or GKE cluster, run the following command:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
```

<mark style="color:purple;">**Dashboard URL**</mark><mark style="color:purple;">: The LoadBalancer URL displayed in the output</mark>
{% endtab %}

{% tab title="MicroK8s/Kind/K3s (and Cloud VMs)" %}
You have a few different ways to open the Devtron dashboard on local or VM-based clusters.\
Pick the method that works best for you: quick port-forward, persistent NodePort, or remote access via kubeconfig.

#### Accessing the Dashboard locally (MicroK8s/Kind/K3s)

Run the following command to port-forward the devtron service to port `8000`

```bash
kubectl -n devtroncd port-forward service/devtron-service 8000:80
```

<mark style="color:purple;">**Dashboard URL**</mark><mark style="color:purple;">:</mark> <mark style="color:purple;"></mark><mark style="color:purple;">`http://127.0.0.1:8000`</mark>

***

#### Accessing the Dashboard via NodePort

If you prefer NodePort instead of port-forwarding, reinstall Devtron with:

```bash
--set components.devtron.service.type=NodePort
```

Then run the following command to get the port number assigned to the service:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```

<mark style="color:purple;">**Dashboard URL**</mark><mark style="color:purple;">:</mark> <mark style="color:purple;"></mark><mark style="color:purple;">`http://<HOST_IP>:<NODEPORT>/dashboard`</mark>

***

#### Accessing the Dashboard locally from a remote VM (Port Forwarding via Kubeconfig)

If Devtron is installed on a remote VM (e.g., AWS EC2, Azure VM, GCP Compute Engine) using MicroK8s, Kind, or K3s, run the following commands one-by-one:

```bash
scp user@cloud-vm-ip:/path/to/kubeconfig ~/.kube/config 

kubectl config use-context <context-name> # Set the correct context.

kubectl -n devtroncd port-forward service/devtron-service 8000:80
```

<mark style="color:purple;">**Dashboard URL**</mark><mark style="color:purple;">:</mark> <mark style="color:purple;"></mark><mark style="color:purple;">`http://127.0.0.1:8000`</mark>
{% endtab %}

{% tab title="Minikube" %}
Run the following command:

```bash
minikube service devtron-service --namespace devtroncd
```

<mark style="color:purple;">**Dashboard URL**</mark><mark style="color:purple;">: (Directly opens in your browser)</mark>
{% endtab %}
{% endtabs %}

---

## Step 4: Log in to Devtron

1. From your browser, visit the dashboard URL (obtained in the previous step) to view the login page of Devtron.
2. Enter **`admin`** in the username.
3.  Run the below command to get your password.

    ```bash
    kubectl -n devtroncd get secret devtron-secret \
    -o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
    ```

You should see the **Devtron Dashboard** post successful login.

{% hint style="success" %}
#### Next Recommended Action

After the initial login, we recommend you set up an [Single Sign-On (SSO) service](../../user-guide/global-configurations/sso-login.md) like Google, GitHub, etc., and then [add other members](../../user-guide/global-configurations/authorization/user-access.md#add-users) (including yourself). Thereafter, they can log in using the configured SSO.
{% endhint %}
