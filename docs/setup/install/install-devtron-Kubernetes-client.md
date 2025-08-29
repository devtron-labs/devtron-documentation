# Devtron Kubernetes Desktop Client

## Introduction

The Devtron Kubernetes Desktop Client is a lightweight dashboard that is installed outside a Kubernetes [cluster](../../reference/glossary.md#cluster) on a `arm64` / `amd64` based architecture to help you manage your Kubernetes resources with a unified view.

The **Devtron Kubernetes Desktop Client** comes packaged with the following modules:

* [Kubernetes Resource Browser](#kubernetes-resource-browser) - To manage all Kubernetes resources in your cluster(s)
* [Clusters](#clusters) - To manage the clusters you connect from the Devtron Kubernetes Desktop Client

{% hint style="success" %}

Try Devtron Freemium to access all the enterprise features for free and forever, limited to adding one additional cluster. [Install Devtron Freemium](https://license.devtron.ai/dashboard)

{% endhint %}

---

## Steps

{% hint style="info" %}

### Note

A [Super-Admin](../../user-guide/global-configurations/user-access.md#assign-super-admin-permissions) permission is not required for you to do any operations in the Devtron Kubernetes Desktop Client. 

{% endhint %}

1. Run the following command in your terminal to automatically download the executable file. Devtron Kubernetes Desktop Client is automatically opened in your default browser.

   ```bash
   wget -O devtron-install.bash https://cdn.devtron.ai/k8s-client/devtron-install.bash && [ -f devtron-install.bash ] && sh devtron-install.bash start  
   ```
{% hint style="info" %}

### Reopen Devtron Kubernetes Desktop Client

In case you closed the Devtron Kubernetes Desktop Client browser tab by mistake, you can reopen it by executing the following command in your terminal:

```bash
sh devtron-install.bash open 
```                           
{% endhint %}

{% hint style="info" %}

### Delete the Application

When installing the Devtron Kubernetes Desktop Client, if you encounter any errors, or if the tab opened in your default browser fails to load, or you encounter any issue because of the existence of the application, run the following command to delete the application.

```bash
rm -rf .devtron/ 
```                           
{% endhint %}

2. Navigate to **Global Configurations** → **Clusters** → **Add cluster**.

   ![Figure 1: Add a Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/global-configs-clusters.jpg)

3. Open your terminal and enter the following command to download and run a bash script for generating the [kubeconfig](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/):

   ```bash
   curl -O https://raw.githubusercontent.com/devtron-labs/utilities/main/kubeconfig-exporter/kubernetes_export_sa.sh && bash kubernetes_export_sa.sh cd-user devtroncd
   ```

{% hint style="info" %}

### Important Note

If you already have a service account named `cd-user`, executing the above-mentioned command will result in an error. In that case, change the service account name in the command from `cd-user` to `cd-user1` or `cd-user2`.

{% endhint %}

4. Fetch the cluster credentials (`Cluster name`, `Server URL`, `Bearer token`) from the terminal and enter them in their appropriate fields.

   ![Figure 2a: Fetching Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/cluster-credentials.jpg)

   ![Figure 2b: Adding Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/adding-cluster.jpg)

5. Click **Save Cluster**. This cluster will now be displayed in the **Kubernetes Resource Browser** page. Refer [Kubernetes Resource Browser](#kubernetes-resource-browser) or [Clusters](#clusters) in the Devtron Kubernetes Desktop Client for more information. 

6. To stop the Devtron Kubernetes Desktop Client, run the following command in your terminal:

   ```bash
   sh devtron-install.bash stop
   ``` 

---

## Kubernetes Resource Browser

Kubernetes Resource Browser, in short, is a central interface from which you can view logs, edit live manifests, and even perform CRUD operations (create, read, update, or delete) on resources like pods, deployments, configmaps, jobs, and many more in the cluster(s). For more information, refer to [Resource Browser](../../user-guide/resource-browser/README.md). 

![Figure 3: Kubernetes Resource Browser](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/resource-browser.jpg)

On the left side bar, under the **K8s Resources** tab, the Kubernetes resources are grouped into the following categories:

* Workloads

* Config & Storage

* Networking

* RBAC

* Administration

* Other Resources

* Custom Resource

![Figure 4: Search Bar](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/search-bar.jpg)

The Search Bar allows you to quickly search for your preferred Kubernetes resource (e.g., pod) from the list of available resources.

![Figure 5: Cluster and Namespace Filters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/filter-boxes.jpg)

You can filter the Kubernetes resources by clusters, by namespaces, or by both using the filters available in the Kubernetes Resource Browser page. For example, when you select a specific namespace (e.g., `devtroncd`) from the filter drop-down box, all the Kubernetes resources associated with that particular namespace are displayed. 

### Create a Kubernetes Resource 

![Figure 6: Create a Pod](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/creating-resource.gif)

#### Sample Script for Creating a Pod

```bash
apiVersion: v1
kind: Pod
metadata:
  name: my-sample-pod
  labels:
    app: sampleApp
spec:
  containers:
  - name: nginx-container
    image: nginx:latest
    ports:
    - containerPort: 80
```

### View a Kubernetes Resource

![Figure 7: View a Pod](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/viewing-resource.gif)

### Update a Kubernetes Resource

![Figure 8: Update a Live Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/updating-resource.gif)

### Delete a Kubernetes Resource

![Figure 9: Delete a Pod](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/deleting-resource.gif)

---

## Clusters

![Figure 10: Clusters](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/clusters-metrics.jpg)

Devtron Kubernetes Desktop Client allows you to add multiple clusters and manage all of them from your local machine. The **Clusters** module allows you to view CPU and Memory metrics like CPU Capacity, Memory Capacity, and much more.

### Perform Node Operations

![Figure 11: Peform Node Operations Using the (&#8942;) Icon](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/cluster-node-operations.jpg)

You can perform node operations such as [Cordon](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_cordon/), [Drain](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_drain/), and [Taints](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) either from the (&#8942;) icon displayed against the cluster name or by clicking the cluster itself.

![Figure 12: Peform Node Operations by Clicking the Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/cluster-view.jpg)

### Access Cluster Terminal

![Figure 13a: Terminal Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/terminal-option.jpg)

![Figure 13b: Debug Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/install+devtron+K8s+client/debug-option.jpg)

At any time, you can debug and troubleshoot any issues in your cluster using the Cluster Terminal. You can access the Cluster Terminal by either clicking **Terminal** option in the Overview page or by clicking the cluster and then clicking the **Debug** option. The same Cluster Terminal will be opened irrespective of the option that you choose. 

---

## Upgrade Devtron Kubernetes Desktop Client 
To upgrade your Devtron Kubernetes Desktop Client, run the following command in your terminal. The Devtron Kubernetes Desktop Client will automatically be stopped, and the downloaded latest executable file will be opened in the default browser.

```bash
sh devtron-install.bash upgrade
```