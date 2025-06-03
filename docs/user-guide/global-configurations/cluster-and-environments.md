# Clusters and Environments

## Introduction

Devtron allows you to connect and manage your existing Kubernetes clusters by adding them to its platform. Once a cluster is added, you can create different environments within it, making it possible to deploy your applications.

Go to **Global Configurations** → **Clusters & Environments** → **Add Cluster** (button)

![Figure 1: Adding a Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-clusters-new.jpg)

You can add any of the following cluster types:
* [Kubernetes Cluster](#add-kubernetes-cluster) - If you have access to the cluster, use this option.
* [Isolated Cluster](#add-isolated-cluster) - For airgapped-related use-cases, use this option.

![Figure 2: Choosing Cluster Type](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-cluster-screen.jpg)

---

## Add Kubernetes Cluster

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to add a Kubernetes cluster to Devtron.
{% endhint %}

On the **Add Cluster** screen, select **Add Kubernetes Cluster**.

![Figure 3: Selecting 'Add Kubernetes Cluster'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/select-kubernetes-cluster.jpg)

You can choose to add your Kubernetes cluster using either of the following methods:
  * [Server URL & Bearer Token](#add-cluster-using-server-url--bearer-token)
  * [Kubeconfig](#add-cluster-using-kubeconfig)

![Figure 4: Choosing a Method](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/choosing-method.jpg)

### Add Cluster Using Server URL & Bearer Token

{% hint style="info" %}
### Note
Refer [Get Cluster Credentials](#get-cluster-credentials) to learn the process of getting Server URL and bearer token.
{% endhint %}

1. To add a Kubernetes cluster on Devtron using Server URL and Bearer Token, provide the following information:

  | Field | Description |
  | :--- | :--- |
  | **Name** | Enter the name of your cluster. |
  | **Server URL** |  Enter the Server URL of your cluster (with https)<br />**Note**: We recommend using a [self-hosted URL](#benefits-of-self-hosted-url) instead of cloud hosted URL.  |
  | **Bearer Token** | Paste the bearer token of your cluster |

  ![Figure 5: Enter Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-cluster-cred.jpg)

2. complete the remaining steps (optional): 
  * [Choose Connection Type](#choose-connection-type)
  * [Use Secure TLS Connection](#use-secure-tls-connection)
  * [Configure Prometheus](#configure-prometheus-enable-application-metrics)

{% hint style="tip" %}
### Tip
If you have a kubeconfig file ready, you may skip the above process and refer [Add Cluster Using Kubeconfig](#add-cluster-using-kubeconfig) instead.
{% endhint %}

### Add Cluster Using Kubeconfig

In case you prefer to add clusters using kubeconfig, follow these steps: 

1. Copy and paste your kubeconfig file into the editor. Alternatively, you may browse and select the file as well.

  ![Figure 6: Choosing Kubeconfig Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-cluster-kubeconfig.jpg)

2. Click the **Get Cluster** button. This action will display the cluster details alongside the kubeconfig. 

  ![Figure 7: Get Cluster List from Kubeconfig](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/get-cluster.jpg)

3. If your kubeconfig file lists multiple clusters, they will be displayed in the window. Use the checkboxes to select the desired cluster(s) and click **Save**.

  ![Figure 8: Clicking Save](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/kubeconfig-save-cluster.jpg)

4. Click the saved cluster, and complete the remaining steps (optional): 
  * [Choose Connection Type](#choose-method-of-connection)
  * [Use Secure TLS Connection](#use-secure-tls-connection)
  * [Configure Prometheus](#configure-prometheus-enable-application-metrics)

{% hint style="warning" %}
### Note
Ensure that the kubeconfig file has admin permissions. It is crucial for Devtron to have the necessary administrative privileges; otherwise, it may encounter failures or disruptions during deployments and other operations. Admin permission is essential to ensure the smooth functioning of Devtron and to prevent any potential issues that may arise due to insufficient privileges.
{% endhint %}

### Choose Method of Connection [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

When adding a new cluster to Devtron, you must choose how Devtron will connect to it. There are three connection options available:  

#### Direct Connection
Clusters with a directly accessible API server endpoint—either publicly or via private peering—can be added as Direct Connection clusters.  
* Devtron connects directly without an intermediary.  
* Recommended when the cluster is publicly accessible or has a direct network route from Devtron.  

![Figure 9: Choosing Direct Connection](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/direct-connection.jpg)  

#### Via Proxy [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

For security reasons, some Kubernetes clusters are deployed behind a proxy. In this setup, Devtron routes all communication through the specified proxy URL.  
* Use this option when network restrictions require traffic to go through a proxy server.  
* Requires specifying a **Proxy URL** (e.g., `http://proxy.example.org:3128`).  
* **Limitation**: Deployments via [GitOps (ArgoCD)](../../reference/glossary.md#gitops) are not recommended for clusters connected via proxy.

![Figure 10: Choosing 'Via Proxy'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/via-proxy.jpg)  

#### Via SSH Tunnel [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

When a direct connection isn't possible, Devtron can connect to the Kubernetes cluster through an SSH tunnel, ensuring secure and encrypted communication.  
* Requires:  
  * **SSH Server URL** (e.g., `http://proxy.example.org`).  
  * **Username** for authentication.  
  * **Authentication Method**:  
    * Password  
    * SSH Private Key  
    * Both Password & SSH Private Key  
* **Limitation**: Deployments via [GitOps (ArgoCD)](../../reference/glossary.md#gitops) are **not recommended** for clusters connected via SSH Tunnel.

![Figure 11: Choosing 'Via SSH Tunnel'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/via-ssh.jpg)  


### Use Secure TLS Connection

For a secure cluster connection, you can opt for TLS connection, where you need to provide Certificate Authority Data, a TLS Key, and a TLS Certificate.

If your cluster is managed (e.g., [EKS](https://aws.amazon.com/eks/), [AKS](https://learn.microsoft.com/en-us/azure/aks/), [GKE](https://cloud.google.com/kubernetes-engine)), you might need to download these certificates from your cloud provider’s dashboard or API.

| Field | Description |
|--------|------------|
| **Certificate Authority (CA) Data** | The CA certificate (see: [example](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/kubeconfig-entry.jpg)) used to verify the Kubernetes API server’s identity. |
| **TLS Key** | The private key associated with the client certificate for authentication. |
| **TLS Certificate** | The client certificate used to authenticate with the Kubernetes API server. |

![Figure 12: Using Secure TLS Connection](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/secure-tls.jpg)


### Configure Prometheus (Enable Application Metrics)

If you want to see application metrics against the applications deployed in the cluster, Prometheus must be deployed in the cluster. Prometheus is a powerful tool to provide graphical insight into your application behavior.

Enable application metrics to configure Prometheus as shown below. In case it is not available, make sure to install the **Monitoring (Grafana)** integration from [Devtron Stack Manager](../stack-manager.md) to configure Prometheus.

![Figure 13: Enabling Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/enable-app-metrics.jpg)

Provide the information in the following fields:

| Field | Description |
| :--- | :--- |
| **Prometheus endpoint** | Provide the URL of your Prometheus |
| **Authentication Type** | Prometheus supports two authentication types:<ul><li>**Basic**: If you select the `Basic` authentication type, then you must provide the `Username` and `Password` of Prometheus for authentication.</li></ul> <ul><li>**Anonymous**: If you select the `Anonymous` authentication type, then you do not need to provide the `Username` and `Password`.<br />**Note**: The fields `Username` and `Password` will not be available by default.</li></ul> |
| **TLS Key** & **TLS Certificate** | These fields are optional and can be used when you use a customized URL. |

Click **Save Cluster** to save your cluster on Devtron.

---

## Add Isolated Cluster [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to add an isolated/airgapped cluster to Devtron.
{% endhint %}

For air-gapped Kubernetes clusters with restricted inbound and outbound traffic, Devtron enables seamless management using isolated clusters. While these are not actual clusters with API endpoints, they provide a convenient way to deploy applications in such environments.

1. On the **Add Cluster** screen, select **Add Kubernetes Cluster**.

  ![Figure 14: Selecting Isolated Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/select-isolated-cluster.jpg)


2. Add a cluster name (e.g. *banking-airgapped-cluster*) and click **Save Cluster**.

  ![Figure 15: Saving Isolated Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/isolated-cluster-save.jpg)

You have successfully configured an isolated cluster.

![Figure 16: New Isolated Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/new-isolated-cluster.jpg)

{% hint style="info" %}
### Note
When you deploy to an isolated environment, Devtron automatically packages application manifests and images into a [Helm chart](../../reference/glossary.md#helm-chartspackages). You can then either:
* Download and install manually in a fully air-gapped setup.
* Push it to an [OCI registry](../global-configurations/container-registries.md) (provided pushing of helm package is enabled), allowing manifests to be pulled manually or automatically via Devtron on air-gapped cluster (if pull access to the OCI registry is available).
{% endhint %}

---

## Add Environment to a Cluster

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to add an environment to a cluster.
{% endhint %}

1. Whether it is a [Kubernetes Cluster](#add-kubernetes-cluster) or [Isolated Cluster](#add-isolated-cluster), a newly created cluster initially has no environments, so click **Add Environment**.

  ![Figure 17: Adding an Environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-environment-option.jpg)

2. Fill the following details within the **Add Environment** modal window.

  | Field | Description |
  | :--- | :--- |
  | **Environment Name** | Enter a name for your environment. |
  | **Enter Namespace** | Enter a namespace corresponding to your environment.<br>**Note**: If this namespace does not exist in your cluster, Devtron will create it. If it already exists, Devtron will map the environment to it.</br> |
  | **Environment Type** | Select your environment type:<ul><li>`Production`</li></ul> <ul><li>`Non-production`</li></ul>Note: Devtron shows deployment metrics (DORA metrics) for environments tagged as `Production` only. |

  ![Figure 18: Saving an Environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-env-fields.jpg)

3. **Add/Edit labels to namespace** [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) - You can attach labels to your specified namespace in the Kubernetes cluster. Using labels will help you filter and identify resources via CLI or other Kubernetes tools. [Click here](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) to know more about labels.

  ![Figure 19: Adding Labels to Namespace](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/labels-namespace.gif)

4. Click **Save**. Your new environment will be visible in your cluster as shown below.

  ![Figure 20: Newly Created Environment in the Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/added-env.jpg)


---

## Edit Environment

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to edit an environment in a cluster.
{% endhint %}

You can also make edits to an existing environment if need be by clicking the edit icon.

![Figure 21: Editing Environment in the Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/edit-env.jpg)

| Feature                           | Editable? |
|-----------------------------------|-----------|
| **Production/Non-Production Option** | ✅ Yes |
| **Description**                   | ✅ Yes |
| **Labels for Namespace**           | ✅ Yes |
| **Environment Name**               | ❌ No  |
| **Namespace Name**                 | ❌ No  |

Click **Update** to save your changes.

![Figure 22: Updating Environment in the Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/update-env.jpg)


---

## Delete Environment

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to delete an environment from a cluster.
{% endhint %}

If an environment is no longer needed, you can delete it by following these steps:  

1. Click the delete icon for the environment you wish to remove.

  ![Figure 23: Deleting Environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/delete-env.jpg)

{% hint style="warning" %}
### Important  
Environment deletion is not allowed if any application has a CD pipeline corresponding to the environment. In such a case, go to [Workflow Editor](../creating-application/workflow/README.md) and delete the deployment pipeline first, and then return to delete the environment. This action is irreversible, so make sure no critical applications or resources depend on the environment before deleting.
{% endhint %}

2. A confirmation dialog will appear. Click **Confirm** to permanently delete the environment.  

    ![Figure 24: Confirming Environment Deletion](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/confirm-delete-env.jpg)

---

## Assign Category to the Cluster & Environment

Devtron allows you to assign a category, (for e.g. Prod, QA, Dev, or Stage) to both clusters and their environments. This enables category-based filtering in the UI, allowing you to determine whether an application is deployed to Prod, QA, Dev, or Stage environment.

### Adding a Category

Before assigning a category, you must first add the category. To add a category, follow the below steps:

1. Go to **Global Configurations**. 

   ![Figure 25: Navigating to Global Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-global-config.jpg)

2. Select **Clusters and Environments** and click **Manage Categories**, a modal window will open.

   ![Figure 26: Clicking Manage Categories](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-manage-categories.jpg)

3. Enter the name of the category in the **CATEGORIES** field and provide a description in the **DESCRIPTION** field.

   **Note:** Category name should be unique and cannot be changed once defined. It must be minimum of 3 characters.

   ![Figure 27: Adding Category](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-add.jpg)

4. If you wish to add more categories, click **Add Category**, a new row will appear, enter the name and description of the new category.

   ![Figure 28: Adding More Categories](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-add-category.jpg)

5. Click **Update** and your categories will be added.

   ![Figure 29: Categories Added](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-update.jpg)

### Assigning Category To A Cluster

To assign a category to a cluster, follow the below steps:

1. Go to **Global Configurations**. 

   ![Figure 30: Navigating to Global Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-global-config.jpg)

2. Select **Clusters and Environments** and then click the **Edit Cluster** icon for the cluster you want to modify, a **Edit Cluster** modal window will appear.

   ![Figure 31: Editing Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-edit-cluster.jpg)

3. Select a category from the dropdown under **Assign Category** amd click **Update Cluster**.

   ![Figure 32: Assigning Category](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-cluster.jpg)

4. The selected category will be assigned to the cluster.

   ![Figure 33: Category Assigned](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-category-added-cluster.jpg)

### Assigning Category To A Environment

1. Go to **Global Configurations**.

   ![Figure 34: Navigating to Global Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-global-config.jpg)

2. Select **Clusters and Environments** and click the **Edit Environment** icon for the environment you want to modify, a **Edit Environment** modal window will appear.

   ![Figure 35: Editing Environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-edit-env.jpg)

3. Select a category from the dropdown under **Assign Category** amd click **Update**.

   ![Figure 36: Assigning Category](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-env.jpg)

4. The selected category will be assigned to the environment.

   ![Figure 37: Category Assigned](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-category-added-env.jpg)

---

## Extras

### Get Cluster Credentials

{% hint style="info" %}
### Prerequisite
[kubectl](https://kubernetes.io/docs/tasks/tools/) must be installed on the bastion.
{% endhint %}

{% hint style="info" %}
### Note
We recommend using a self-hosted URL instead of a cloud-hosted URL. Refer the benefits of a [self-hosted URL](#benefits-of-self-hosted-url).
{% endhint %}

You can get the **Server URL** and **Bearer Token** by running the following command depending on the cluster provider:

{% tabs %}
{% tab title="k8s Cluster Providers" %}
If you are using EKS, AKS, GKE, Kops, Digital Ocean managed Kubernetes, run the following command to generate the server URL and bearer token:
```bash
curl -O https://raw.githubusercontent.com/devtron-labs/utilities/main/kubeconfig-exporter/kubernetes_export_sa.sh && bash kubernetes_export_sa.sh cd-user  devtroncd
```
{% endtab %}
{% tab title="Microk8s Cluster" %}
If you are using a **`microk8s cluster`**, run the following command to generate the server URL and bearer token:

```bash
curl -O https://raw.githubusercontent.com/devtron-labs/utilities/main/kubeconfig-exporter/kubernetes_export_sa.sh && sed -i 's/kubectl/microk8s kubectl/g' \
kubernetes_export_sa.sh && bash kubernetes_export_sa.sh cd-user \
devtroncd
```
{% endtab %}
{% endtabs %}

![Figure 38: Generating Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/generate-cluster-credentials.jpg)

### Benefits of Self-hosted URL

* **Disaster Recovery**: 
  * You cannot edit the server URL of a cloud-specific provider. If you're using an EKS URL (e.g.` *****.eu-west-1.elb.amazonaws.com`), it will be a tedious task to add a new cluster and migrate all the services one by one. 
  * But in case of using a self-hosted URL (e.g. `clear.example.com`), you can just point to the new cluster's server URL in DNS manager and update the new cluster token and sync all the deployments.

* **Easy Cluster Migrations**: 
  * In case of managed Kubernetes clusters (like EKS, AKS, GKE etc) which is a cloud provider specific, migrating your cluster from one provider to another will result in waste of time and effort. 
  * On the other hand, migration for a self-hosted URL is easy, as the URL belongs to a single hosted domain independent of the cloud provider.