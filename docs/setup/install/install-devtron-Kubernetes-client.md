# Devtron Kubernetes Desktop Client

## Introduction

The Devtron Kubernetes Desktop Client is a lightweight dashboard that is installed outside a Kubernetes [cluster](../../reference/glossary.md#cluster) on a `arm64` / `amd64` based architecture to help you manage your Kubernetes resources with a unified view.

By installing **Devtron Kubernetes Desktop Client**, you can access:

* [Kubernetes Resource Browser](#kubernetes-resource-browser)
* [Clusters Management Feature](#clusters)

{% hint style="success" %}

Try Devtron Freemium to access all the enterprise features for free and forever, limited to adding one additional cluster. [Install Devtron Freemium](https://license.devtron.ai/dashboard)

{% endhint %}

---

## Install Devtron Kubernetes Desktop Client

Run the following command in your terminal to automatically download the executable file.

   ```bash
      wget https://cdn.devtron.ai/k8s-client/devtron-install.bash && sh devtron-install.bash start  
   ```
Devtron Kubernetes Desktop Client is automatically opened in your default browser.

---

## Add a Kubernetes Cluster

{% hint style="info" %}

### Note

A [Super-Admin](../../user-guide/global-configurations/user-access.md#assign-super-admin-permissions) permission is not required for you to add a cluster in the Devtron Kubernetes Desktop Client. 

{% endhint %}

Only when you add your cluster in the **Global Configurations** page is when you will see your cluster(s) displayed in the **Kubernetes Resource Browser** page. To add a cluster, follow the below instructions:

1. Navigate to **Global Configurations** → **Clusters** → **Add cluster**.

   ![Figure 1: Add a Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/global-configs-clusters.jpg)

2. Open your terminal and enter the following command:

   ```bash
   curl -O https://raw.githubusercontent.com/devtron-labs/utilities/main/kubeconfig-exporter/kubernetes_export_sa.sh && bash kubernetes_export_sa.sh cd-user devtroncd
   ```
3. Fetch the cluster credentials (`Cluster name`, `Server URL`, `Bearer token`) from the terminal and enter them in their appropriate fields.

   ![Figure 2a: Fetching Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/cluster-credentials.jpg)

   ![Figure 2b: Adding Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/adding-cluster.jpg)

4. Click **Save Cluster**. This cluster will now be displayed in the **Kubernetes Resource Browser** page.

---

## Kubernetes Resource Browser

Kubernetes Resource Browser, in short, is a central interface from which you can view logs, edit live manifests, and even create/delete resources directly across clusters. 

![Figure 3: Kubernetes Resource Browser](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/resource-browser.jpg)

With **Kubernetes Resource Browser**, you can also monitor the real-time health status of all your clusters. For more information, refer to [Resource Browser](../../user-guide/resource-browser/README.md). 

---

## Clusters

Devtron Kubernetes Desktop Client allows you to add multiple clusters and manage all of them (running on-premises or on a cloud) from a single place.

![Figure 4: Clusters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/cluster-terminal.jpg)

The cluster management feature, specifically, provides a summary of [nodes](../../reference/glossary.md#nodes) with all available labels, annotations, [taints](../../reference/glossary.md#node-taint), and other parameters such as resource usage. In addition, you can easily manage and [Debug Clusters through Cluster terminal Access](../../user-guide/resource-browser/cluster-terminal.md).

For more information, refer to [Clusters and Environments](../../user-guide/global-configurations/cluster-and-environments.md).

---

## Extras

### Reopen Devtron Kubernetes Desktop Client 

In case you closed the Devtron Kubernetes Desktop Client browser tab by mistake, you can reopen it by executing the following command in your terminal:

```bash
sh devtron-install.bash open 
```

### Stop Devtron Kubernetes Desktop Client 
To stop the Devtron Kubernetes Desktop Client, run the following command in your terminal:

```bash
sh devtron-install.bash stop
``` 

### Upgrade Devtron Kubernetes Desktop Client 
To upgrade your Devtron Kubernetes Desktop Client, run the following command in your terminal. The Devtron Kubernetes Desktop Client will automatically be stopped, and the downloaded latest executable file will be opened in the default browser.

```bash
sh devtron-install.bash upgrade
```