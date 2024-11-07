# Clusters and Environments

## Introduction

You can add your existing Kubernetes clusters and environments on the `Clusters and Environments` section. You must have a [super admin](./authorization/user-permissions.md#assign-super-admin-permissions) access to add a cluster.

![Figure 1: Clusters and Environments in Devtron](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-and-environments.jpg)

Refer the following:

* [Add Kubernetes Cluster](#add-kubernetes-cluster)
* [Add Isolated Cluster](#add-isolated-cluster)

---

## Add Kubernetes Cluster

Use this option to add a managed or on-premise Kubernetes cluster.

1. Go to **Global Configurations** → **Clusters & Environments**.

2. Click the **Add Cluster** button on the top-right corner. 

  ![Figure 2: Adding a Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-clusters.jpg)

3. Click **Add Kubernetes Cluster**. 

  ![Figure 3: Adding a Kubernetes Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-kubernetes-cluster.jpg)

You can choose to add your Kubernetes cluster using either of the following:
  * [Server URL & Bearer Token](#add-clusters-using-server-url--bearer-token)
  * [Kubeconfig](#add-clusters-using-kubeconfig)

### Add Clusters Using Server URL & Bearer Token

{% hint style="info" %}
### Note
Refer [Get Cluster Credentials](#get-cluster-credentials) to know the process of getting Server URL and bearer token.
{% endhint %}

To add a Kubernetes cluster on Devtron using a Server URL and bearer token, provide the information in the following fields:

| Field | Description |
| :--- | :--- |
| `Name` | Enter a name of your cluster |
| `Server URL` |  Server URL of a cluster.<br>Note: We recommended to use a [self-hosted URL](#benefits-of-self-hosted-url) instead of cloud hosted URL.</br>  |
| `Bearer Token` | Bearer token of a cluster |

![Figure 4: Entering Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-cluster-cred-v2.jpg)

### Add Clusters Using Kubeconfig

To add clusters using kubeconfig, follow these steps: 

1. First, navigate to the global configurations menu, and then go to "clusters and environment" section.

2. Click on the `Add cluster` button. In the options provided, choose the `From kubeconfig` option. 

3. Next, either paste the kubeconfig file or browse for it and select the appropriate file. 

4. Afterward, click on the `Get cluster` button. This action will display the cluster details alongside the kubeconfig. 

  ![Figure 5: Using Kubeconfig](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/add-cluster-kubeconfig.jpg)

5. Select the desired cluster and click on `Save` to successfully add the cluster to Devtron.

  ![Figure 6: Saving Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/kubeconfig-save-cluster.jpg)

{% hint style="info" %}
### Note
Please ensure that the kubeconfig file you use has `admin permissions`. It is crucial for Devtron to have the necessary administrative privileges; otherwise, it may encounter failures or disruptions during deployments and other operations. Admin permission is essential to ensure the smooth functioning of Devtron and to prevent any potential issues that may arise due to insufficient privileges.
{% endhint %}


### Configure Prometheus (Enable Applications Metrics)

If you want to see application metrics against the applications deployed in the  cluster, Prometheus must be deployed in the cluster. Prometheus is a powerful tool to provide graphical insight into your application behavior.

{% hint style="warning" %}
### Note
Make sure that you install `Monitoring (Grafana)` from the `Devtron Stack Manager` to configure prometheus.
If you do not install `Monitoring (Grafana)`, then the option to configure prometheus will not be available. 
{% endhint %}

![Figure 7: Enabling App Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/enable-app-metrics.png)

Enable the application metrics to configure prometheus and provide the information in the following fields:

| Field | Description |
| :--- | :--- |
| `Prometheus endpoint` | Provide the URL of your prometheus. |
| `Authentication Type` | Prometheus supports two authentication types:<ul><li>**Basic:** If you select the `Basic` authentication type, then you must provide the `Username` and `Password` of prometheus for authentication.</li></ul> <ul><li>**Anonymous:** If you select the `Anonymous` authentication type, then you do not need to provide the `Username` and `Password`.<br>Note: The fields `Username` and `Password` will not be available by default.</li></ul> |
| `TLS Key` & `TLS Certificate` | `TLS Key` and `TLS Certificate` are optional, these options are used when you use a customized URL. |

Now, click `Save Cluster` to save your cluster on Devtron.

### Installing Devtron Agent

Your Kubernetes cluster gets mapped with Devtron when you save the cluster configurations. Now, the Devtron agent must be installed on the added cluster so that you can deploy your applications on that cluster.

![Figure 8: Installing Devtron Agent](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/install-devtron-agent.png)

When the Devtron agent starts installing, click `Details` to check the installation status.

![Figure 9: Running Agent](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/gc-cluster-agents.jpg)

A new window pops up displaying all the details about the Devtron agent.

![Figure 10: Agent Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster_gc5.jpg)

---

## Add Isolated Cluster

Deploying to an isolated environment will generate and [push the helm package](../global-configurations/container-registries.md#push-helm-packages) to your OCI registry (if need be). Further, this package can be used to [deploy to an air-gapped environment](../use-cases/airgapped-app-deployment.md) via Internet or non-Internet mediums.

1. Go to **Global Configurations** → **Clusters & Environments**.

2. Click the **Add Cluster** button on the top-right corner. 

    ![Figure 11: Adding a Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-push/add-cluster.jpg)

3. Select **Add Isolated Cluster** (2nd option). 

    ![Figure 12: Adding an Isolated Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-push/adding-cluster.jpg)

4. Add a cluster name (let's say, *demo*) and click **Save Cluster**.

5. Since the newly created cluster has no environments, click **Add Environment**.

6. Add an environment name and namespace. Click **Save**. 

    ![Figure 13: Adding an Environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-push/adding-env.jpg)

You have successfully configured an isolated cluster.

![Figure 14: Isolated Cluster Successfully Created](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-push/added-env.jpg)

---

## Add Environment

Once you have added your cluster in the `Clusters & Environments`, you can add the environment by clicking `Add environment`.

A new environment window pops up.

| Field | Description |
| :--- | :--- |
| `Environment Name` | Enter a name of your environment. |
| `Enter Namespace` | Enter a namespace corresponding to your environment.<br>**Note**: If this namespace does not already exist in your cluster, Devtron will create it. If it exists already, Devtron will map the environment to the existing namespace.</br> |
| `Environment Type` | Select your environment type:<ul><li>`Production`</li></ul> <ul><li>`Non-production`</li></ul>Note: Devtron shows deployment metrics (DORA metrics) for environments tagged as `Production` only. |

Click **Save** and your environment will be created. 


![Figure 15: Adding an Environment in Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/gc-cluster-add-environment.jpg)

---

## Update Environment

* You can also update an environment by clicking the environment.
* You can change `Production` and `Non-Production` options only.
* You cannot change the `Environment Name` and `Namespace Name`.
* Make sure to click **Update** to update your environment.

---

## Extras

### Get Cluster Credentials

{% hint style="info" %}
### Prerequisites
`kubectl` must be installed on the bastion.
{% endhint %}

{% hint style="info" %}
### Note
We recommend to use a self-hosted URL instead of cloud hosted URL. Refer the benefits of [self-hosted URL](#benefits-of-self-hosted-url).
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

![Figure 16: Generating Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/generate-cluster-credentials.png)

### Benefits of Self-hosted URL

* Disaster Recovery: 
  * It is not possible to edit the server URL of a cloud specific provider. If you're using an EKS URL (e.g.` *****.eu-west-1.elb.amazonaws.com`), it will be a tedious task to add a new cluster and migrate all the services one by one. 
  * But in case of using a self-hosted URL (e.g. `clear.example.com`), you can just point to the new cluster's server URL in DNS manager and update the new cluster token and sync all the deployments.

* Easy Cluster Migrations: 
  * In case of managed Kubernetes clusters (like EKS, AKS, GKE etc) which is a cloud provider specific, migrating your cluster from one provider to another will result in waste of time and effort. 
  * On the other hand, migration for a  self-hosted URL is easy as the URL is of single hosted domain independent of the cloud provider.