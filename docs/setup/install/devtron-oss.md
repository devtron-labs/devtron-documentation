import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install Devtron OSS

## Introduction

Devtron OSS is the open-source edition of Devtron intended for non-enterprise users.

The table below shows the installation options available in Devtron OSS. Further, there are steps given to install your preferred option in your Kubernetes cluster.

| Installation Option                                                                                      | What Is Included                                            | When To Use                                                                            |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [**Minimal (without integrations)**](#option-a-minimal-without-integrations)     | Dashboard + Resource Browser + Core operator configurations | A unified view of Helm apps, FluxCD apps, ArgoCD apps, and their related K8s resources |
| [**With CI/CD**](#option-b-install-devtron-with-cicd)                                   | Everything in Minimal + Build and Deploy (CI/CD) module     | You need a complete CI-CD pipeline for your custom apps (a.k.a Devtron Apps)           |
| [**With CI/CD + GitOps (Argo CD)**](#option-c-install-devtron-with-cicd--gitops-argocd) | Everything in CI/CD + GitOps (Argo CD) module               | You need automated, Git-driven deployments                                             |

:::success Not Sure What To Choose?
Begin with the **Minimal** version. You can always install CI/CD and GitOps integrations later from [Devtron Stack Manager](../../user-guide/integrations/).
:::

---

## Prerequisites

* Kubernetes cluster v1.16 or later (cloud or local)
* [Helm v3.8+ installed](https://helm.sh/docs/intro/install/)
* For production cases, fulfill the [Infrastructure Recommendations](prod-infra.md)

### Verify Persistent Storage

Before installing Devtron, verify that your cluster has a working storage provisioner and a suitable StorageClass for its PersistentVolumeClaims (PVCs):

```bash
kubectl get storageclass
```

A default StorageClass has `(default)` next to its name. If there is no suitable default, create or select a StorageClass for your cluster, then add `--set global.storageClass=<storage-class-name>` to your chosen Helm command in [Step 2](#step-2-choose-an-installation-option). Replace `<storage-class-name>` with the existing class name, such as `local-path` or `gp3`. This selects storage for Devtron without changing the cluster-wide default. See [Set StorageClass for Devtron Microservices](installation-configuration.md#set-storageclass-for-devtron-microservices) for more details.

:::warning Storage Must Be Configured Before Installation
Without a suitable default StorageClass or an explicitly selected class backed by a working provisioner, Devtron's PVCs can remain `Pending`, preventing installation from completing. Creating a StorageClass requires cluster-level permissions; ask your cluster administrator if needed.
:::

:::info Using K3s?
[K3s ships with Rancher's Local Path Provisioner](https://docs.k3s.io/add-ons/storage) and a default `local-path` StorageClass. You normally do not need to install another local-path provisioner.

If the packaged `local-storage` component was [disabled](https://docs.k3s.io/installation/packaged-components#disabling-manifests) or removed, restore it or configure another suitable provisioner and StorageClass before installing Devtron. Local-path volumes store data on individual nodes; choose storage appropriate for your availability and durability requirements.
:::

:::warning Using Amazon EKS?
For standard EKS clusters using EBS volumes on EC2 nodes, configure the [Amazon EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) and its required IAM permissions. AWS recommends the EKS managed add-on. If the driver is already installed, use that installation rather than installing a second copy with Helm.

For a self-managed Helm installation, first follow the upstream [driver permissions setup](https://github.com/kubernetes-sigs/aws-ebs-csi-driver/blob/master/docs/install.md#set-up-driver-permissions). Associate the IAM role with the controller service account using EKS Pod Identity or configure IAM Roles for Service Accounts (IRSA). The Helm command below does not create that IAM role or association; supply the service-account configuration required by your chosen method.

```bash
helm repo add aws-ebs-csi-driver https://kubernetes-sigs.github.io/aws-ebs-csi-driver
helm repo update
helm upgrade --install aws-ebs-csi-driver \
--namespace kube-system aws-ebs-csi-driver/aws-ebs-csi-driver
```

Installing the driver with the [Helm chart defaults](https://github.com/kubernetes-sigs/aws-ebs-csi-driver/blob/master/charts/aws-ebs-csi-driver/values.yaml) does not create a StorageClass (`storageClasses: []`, `defaultStorageClass.enabled: false`). Starting with EKS 1.30, newly created clusters no longer mark the supplied `gp2` StorageClass as default; see the Kubernetes 1.30 release notes in the [Amazon EKS User Guide](https://docs.aws.amazon.com/pdfs/eks/latest/userguide/eks-ug.pdf). Check your cluster's actual configuration with `kubectl get storageclass`.

If no suitable class exists, save this example as `gp3-storageclass.yaml` for the standard EBS CSI driver:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gp3
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
reclaimPolicy: Delete
```

Apply it, then verify the class:

```bash
kubectl apply -f gp3-storageclass.yaml
kubectl get storageclass gp3
```

Add `--set global.storageClass=gp3` to your chosen Devtron installation command. Alternatively, if the cluster has no default and you want `gp3` to be the default for all workloads, run:

```bash
kubectl annotate storageclass gp3 storageclass.kubernetes.io/is-default-class=true --overwrite
kubectl get storageclass
```

Keep only one default StorageClass; follow Kubernetes guidance when [changing an existing default](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/). The example uses `reclaimPolicy: Delete`, so deleting a bound PVC also deletes its backing volume. `WaitForFirstConsumer` delays provisioning until a consuming Pod can be scheduled, so a PVC may initially be `Pending` even with correct storage configuration.
:::

:::info EKS Auto Mode and Fargate
EKS Auto Mode manages EBS storage without a separate EBS CSI controller installation, but you must still create a StorageClass using `ebs.csi.eks.amazonaws.com`. Follow the [Auto Mode StorageClass instructions](https://docs.aws.amazon.com/eks/latest/userguide/create-storage-class.html), including the node topology settings, instead of the standard-driver example above. Select that class with `global.storageClass` or make it the default. EBS volumes cannot be mounted by Fargate Pods.
:::

:::info Want to Customize the Installation?
See [Additional Installation Resources](../../reference/README.md) for production infra recommendations, air-gapped installs, blob storage, config overrides, StorageClass, Database, Ingress setup, backups, and more.
:::

---

## Step 1: Add Devtron Helm Repository

```bash
helm repo add devtron https://helm.devtron.ai
helm repo update devtron
```

---

## Step 2: Choose an Installation Option

### Option A: Minimal (without integrations)

After you [add Devtron Helm Repository](#step-1-add-devtron-helm-repository) run the command below:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd
```

### Option B: Install Devtron with CI/CD

After you [add Devtron Helm Repository](#step-1-add-devtron-helm-repository) run the command below:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set installer.modules={cicd}
```

### Option C: Install Devtron with CI/CD + GitOps (ArgoCD)

After you [add Devtron Helm Repository](#step-1-add-devtron-helm-repository) run the command below:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set installer.modules={cicd} \
--set argo-cd.enabled=true
```

:::info How much time does it take for installation?
It usually takes 5-15 minutes to spin up all Devtron microservices (depending on your installation option).

You may check the status by running the command below. If the output is `Applied`, Devtron is installed.

```bash
kubectl -n devtroncd get installers installer-devtron \
-o jsonpath='{.status.sync.status}'
```

:::

---

## Step 3: Obtain the Dashboard URL

<Tabs>
<TabItem label="For EKS/AKS/GKE" value="For EKS/AKS/GKE">
To access the dashboard on EKS, AKS, or GKE cluster, run the following command:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
```

**Dashboard URL**: The LoadBalancer URL displayed in the output

</TabItem>

<TabItem label="MicroK8s/Kind/K3s (and Cloud VMs)" value="MicroK8s/Kind/K3s (and Cloud VMs)">
You have a few different ways to open the Devtron dashboard on local or VM-based clusters.\
Pick the method that works best for you: quick port-forward, persistent NodePort, or remote access via kubeconfig.

#### Accessing the Dashboard locally (MicroK8s/Kind/K3s)

Run the following command to port-forward the devtron service to port `8000`

```bash
kubectl -n devtroncd port-forward service/devtron-service 8000:80
```

**Dashboard URL**: `http://127.0.0.1:8000`

---

#### Accessing the Dashboard via NodePort

If you prefer NodePort instead of port-forwarding, reinstall Devtron with:

```bash
--set components.devtron.service.type=NodePort
```

Then run the following command to get the port number assigned to the service:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```

**Dashboard URL**: `http://<HOST_IP>:<NODEPORT>/dashboard`

---

#### Accessing the Dashboard locally from a remote VM (Port Forwarding via Kubeconfig)

If Devtron is installed on a remote VM (e.g., AWS EC2, Azure VM, GCP Compute Engine) using MicroK8s, Kind, or K3s, run the following commands one-by-one:

```bash
scp user@cloud-vm-ip:/path/to/kubeconfig ~/.kube/config 

kubectl config use-context <context-name> # Set the correct context.

kubectl -n devtroncd port-forward service/devtron-service 8000:80
```

**Dashboard URL**: `http://127.0.0.1:8000`


</TabItem>

<TabItem label="Minikube" value="Minikube">
Run the following command:

```bash
minikube service devtron-service --namespace devtroncd
```

**Dashboard URL**: (Directly opens in your browser)

</TabItem>
</Tabs>

---

## Step 4: Log in to Devtron

1. From your browser, visit the Dashboard URL (obtained in the previous step) to view the login page of Devtron.
2. Enter **`admin`** in the username.
3.  Run the below command to get your password.

    ```bash
    kubectl -n devtroncd get secret devtron-secret \
    -o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
    ```

You should see the **Devtron Dashboard** post successful login.

:::success Next Recommended Action
After the initial login, we recommend you set up an [Single Sign-On (SSO) service](../../user-guide/global-configurations/sso-login.md) like Google, GitHub, etc., and then [add other members](../../user-guide/global-configurations/authorization/user-access.md#add-users) (including yourself). Thereafter, they can log in using the configured SSO.
:::