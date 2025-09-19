# Clusters and Environments

## Introduction

Devtron allows you to connect and manage your existing Kubernetes clusters by adding them to its platform. Once a cluster is added, you can create different environments within it, making it possible to deploy your applications.

You can add any of the following cluster types:
* [Kubernetes Cluster](#add-kubernetes-cluster) - If you have access to the cluster, use this option.
* [Isolated Cluster](#add-isolated-cluster) - For air-gapped use-cases, use this option.

---

## Add Kubernetes Cluster

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to add a Kubernetes cluster to Devtron.
{% endhint %}


1. Go to **Global Configurations** → **Clusters & Environments** → **Connect Cluster** (button); a **New Cluster** modal window will appear.

  ![Figure 1: Adding a Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-add-clusters-new.jpg)

2. Select **Connect Cluster**.

  ![Figure 2: Selecting 'Connect Cluster'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-select-connect-cluster.jpg)

3. You can choose to add your Kubernetes cluster using either of the following methods:

  | Method                                                                   | Description                                       |
  | :----------------------------------------------------------------------- | :------------------------------------------------ |
  | [Server URL & Bearer Token](#add-cluster-using-server-url--bearer-token) | Use Server URL and Bearer Token to add a cluster. |
  | [Kubeconfig](#add-cluster-using-kubeconfig)                              | Use `Kubeconfig` file to add a cluster.           |

  ![Figure 3: Choosing a Method](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-choosing-method.jpg)

4. Click **Save Cluster** and your cluster will be connected to Devtron.

### Add Cluster Using Server URL & Bearer Token

{% hint style="info" %}
### Note
Refer to [Get Cluster Credentials](#get-cluster-credentials) to learn the process of getting the Server URL and bearer token.
{% endhint %}

1. To add a Kubernetes cluster on Devtron using Server URL and Bearer Token, provide the following information:

  | Field | Description |
  | :--- | :--- |
  | **Name** | Enter the name of your cluster. |
  | **Server URL** |  Enter the Server URL of your cluster (with https)<br />**Note**: We recommend using a [self-hosted URL](#benefits-of-self-hosted-url) instead of a cloud-hosted URL.  |
  | **Bearer Token** | Paste the bearer token of your cluster |

  ![Figure 4: Enter Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-add-cluster-cred.jpg)

2. Complete the remaining steps (optional): 
  * [Choose Connection Type](#choose-method-of-connection)
  * [Use Secure TLS Connection](#use-secure-tls-connection)
  * [Configure Prometheus](#configure-prometheus-enable-application-metrics)
  * [Assign a Category](#assign-category-to-a-cluster)

{% hint style="tip" %}
### Tip
If you have a **kubeconfig** file ready, you may skip the above process and refer to [Add Cluster Using Kubeconfig](#add-cluster-using-kubeconfig) instead.
{% endhint %}

### Add Cluster Using Kubeconfig

In case you prefer to add clusters using kubeconfig, follow these steps: 

1. Copy and paste your kubeconfig file into the editor. Alternatively, you may browse and select the file as well.

  ![Figure 5: Choosing Kubeconfig Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-add-cluster-kubeconfig.jpg)

2. Click the **Get Cluster** button. This action will display the cluster details alongside the kubeconfig. 

  ![Figure 6: Get Cluster List from Kubeconfig](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-get-cluster.jpg)

3. If your kubeconfig file lists multiple clusters, they will be displayed in the window. Use the checkboxes to select the desired cluster(s) and click **Save**.

  ![Figure 7: Clicking Save](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-kubeconfig-save-cluster.jpg)

4. Click the saved cluster, and complete the remaining steps (optional): 
  * [Choose Connection Type](#choose-method-of-connection)
  * [Use Secure TLS Connection](#use-secure-tls-connection)
  * [Configure Prometheus](#configure-prometheus-enable-application-metrics)
  * [Assign a category](#assign-category-to-a-cluster)

{% hint style="warning" %}
### Note
Ensure that the **kubeconfig** file has admin permissions. It is crucial for Devtron to have the necessary administrative privileges; otherwise, it may encounter failures or disruptions during deployments and other operations. Admin permission is essential to ensure the smooth functioning of Devtron and to prevent any potential issues that may arise due to insufficient privileges.
{% endhint %}

### Assign Category to a Cluster

Devtron allows you to assign a category (for e.g. Prod, QA, Dev, or Stage) to your clusters. This enables category-based filtering in the UI, allowing you to determine whether an application is deployed to the Prod, QA, Dev, or Stage environment.

Before assigning a category, you must first add the category. To add a category, refer to the [Adding a Category](#add-category) section to learn more.

To assign a category to a cluster, follow the steps below:

1. Select a category from the dropdown under **Assign Category** and click **Update Cluster**.

   ![Figure 8: Assigning Category](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-assign-category-cluster.jpg)

2. The selected category will be assigned to the cluster.

   ![Figure 9: Category Assigned](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-assign-category-category-added-cluster.jpg)


### Choose Method of Connection [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

When adding a new cluster to Devtron, you must choose how Devtron will connect to it. There are three connection options available:  

#### Direct Connection
Clusters with a directly accessible API server endpoint, either publicly or via private peering, can be added as Direct Connection clusters.  
* Devtron connects directly without an intermediary.  
* Recommended when the cluster is publicly accessible or has a direct network route from Devtron.  

![Figure 10: Choosing Direct Connection](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-direct-connection.jpg)  

#### Via Proxy [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

For security reasons, some Kubernetes clusters are deployed behind a proxy. In this setup, Devtron routes all communication through the specified proxy URL.  
* Use this option when network restrictions require traffic to go through a proxy server.  
* Requires specifying a **Proxy URL** (e.g., `http://proxy.example.org:3128`).  
* **Limitation**: Deployments via [GitOps (ArgoCD)](../../reference/glossary.md#gitops) are not recommended for clusters connected via proxy.

![Figure 11: Choosing 'Via Proxy'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-via-proxy.jpg)  

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

![Figure 12: Choosing 'Via SSH Tunnel'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-via-ssh.jpg)  


### Use Secure TLS Connection

For a secure cluster connection, you can opt for TLS connection, where you need to provide Certificate Authority Data, a TLS Key, and a TLS Certificate.

If your cluster is managed (e.g., [EKS](https://aws.amazon.com/eks/), [AKS](https://learn.microsoft.com/en-us/azure/aks/), [GKE](https://cloud.google.com/kubernetes-engine)), you might need to download these certificates from your cloud provider’s dashboard or API.

| Field | Description |
|--------|------------|
| **Certificate Authority (CA) Data** | The CA certificate (see: [example](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/kubeconfig-entry.jpg)) used to verify the Kubernetes API server’s identity. |
| **TLS Key** | The private key associated with the client certificate for authentication. |
| **TLS Certificate** | The client certificate used to authenticate with the Kubernetes API server. |

![Figure 13: Using Secure TLS Connection](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-secure-tls.jpg)


### Configure Prometheus (Enable Application Metrics)

If you want to see application metrics against the applications deployed in the cluster, Prometheus must be deployed in the cluster. Prometheus is a powerful tool to provide graphical insight into your application behavior.

Enable application metrics to configure Prometheus as shown below. In case it is not available, make sure to install the **Monitoring (Grafana)** integration from [Devtron Stack Manager](../stack-manager.md) to configure Prometheus.

![Figure 14: Enabling Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-enable-app-metrics.jpg)

Provide the information in the following fields:

| Field | Description |
| :--- | :--- |
| **Prometheus endpoint** | Provide the URL of your Prometheus |
| **Authentication Type** | Prometheus supports two authentication types:<ul><li>**Basic**: If you select the `Basic` authentication type, then you must provide the `Username` and `Password` of Prometheus for authentication.</li></ul> <ul><li>**Anonymous**: If you select the `Anonymous` authentication type, then you do not need to provide the `Username` and `Password`.<br />**Note**: The fields `Username` and `Password` will not be available by default.</li></ul> |
| **TLS Key** & **TLS Certificate** | These fields are optional and can be used when you use a customized URL. |

Click **Save Cluster** to save your cluster on Devtron.

---

## Create Kubernetes Cluster [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

### Prerequisites

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/user-access.md#assign-super-admin-permissions) can add an OCI Registry in Devtron.

{% endhint %}

To create an EKS cluster, you need: 

* [OpenTofu](#install-opentofu) (`tofu-controller`) chart installed in your Devtron instance. 
  
  Refer to [Getting Started with OpenTofu](https://opentofu.org/docs/intro/) for more information.

* [FluxCD controller](#install-fluxcd-controller) (`flux2`) chart installed in your Devtron instance

* [Secret](#create-a-secret) containing AWS credentials

#### Install OpenTofu

Follow the steps mentioned below to install OpenTofu:

1. Navigate to **Global Configurations** → **Container/OCI Registry**.

2. Refer to the following table and enter the information in the appropriate fields:

    | Field | Value |
    | :--- | :--- |
    | **Registry provider** | Other | 
    | **Registry type** | Public Registry | 
    | **Name** | `tofu` | 
    | **Registry URL** | `ghcr.io` | 
    | **List of repositories** | `flux-iac/charts/tofu-controller` | 

    <br />

    ![Figure 16: Container/OCI Registry](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/container-oci-registry.jpg)

3. Click **Save**. The `tofu-controller` chart will be displayed in the [Chart Store](../../user-guide/deploy-chart/README.md) page.

4. Navigate to **Chart Store** and search for `tofu-controller` in the search box.

5. Select the chart and click **Configure & Deploy**. The following page will be displayed.

    ![Figure 17: Tofu Controller Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/tofu-controller-chart.jpg)

6. Enter the app name (e.g., `tofu-controller`) in the **App Name** field. 

7. Select your project in the **Project** drop-down box. 

8. Select the environment where you want to deploy the chart in the **Deploy to Environment** drop-down box.

{% hint style="warning" %}

### Important Note

The environment/namespace where you install OpenTofu must be the same environment/namespace where the FluxCD controller will be installed (the next step) to create the cluster. 

{% endhint %}

9. Choose either **Helm** or **GitOps** [if configured](../../user-guide/global-configurations/gitops.md) as the deployment method. 

10. Click **Deploy Chart**. OpenTofu will be installed in your Devtron instance. 

Now that OpenTofu is installed, you can [install the FluxCD controller](#install-fluxcd-controller) in your Devtron instance.

#### Install FluxCD Controller

Follow the steps mentioned below to install OpenTofu:

1. Navigate to [Chart Store](../../user-guide/deploy-chart/README.md) and search for `flux2` in the search box.

    ![Figure 18: "flux2" Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/flux-cd-chart.jpg)

2. Select the chart and click **Deploy**.

3. Enter the app name (e.g., `tofu2`) in the **App Name** field.

4. Select your project in the **Project** drop-down box. 

5. Select the environment where you want to deploy the chart in the **Deploy to Environment** drop-down box.

{% hint style="warning" %}

### Important Note

The environment/namespace where you install the FluxCD controller must be the same environment/namespace where OpenTofu was installed to create the cluster. 

{% endhint %}

6. Choose either **Helm** or **GitOps** [if configured](../../user-guide/global-configurations/gitops.md) as the deployment method. 

7. Click **Deploy Chart**. FluxCD controller will be installed in your Devtron instance. 

Now that FluxCD controller is installed, the final prerequisite is to [create a secret](#create-a-secret) containing your AWS credentials.

#### Create a Secret

{% hint style="warning" %}

### Who Can Perform This Action?

User needs to be an [Admin](../../user-guide/global-configurations/authorization/user-access.md#kubernetes-resources-permissions) of the Kubernetes resource or a [Super-Admin](../../user-guide/global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to create a Secret. 

{% endhint %}

Follow the steps mentioned below to create a secret containing your AWS credentials:

1. Navigate to **Resource Browser**. 

2. Click the **default_cluster**. 

3. Click **Create Resource**. 

4. Copy the YAML snippet given below and paste it in the **Create Kubernetes Resource** page.  

    ```yaml
    apiVersion: v1
    data:
      AWS_ACCESS_KEY_ID: SDKDI382DKD0=
      AWS_SECRET_ACCESS_KEY: YVZsSIEOwcFRSMjlvM2xaUjSIE823J3PT0=
    kind: Secret
    metadata:
      name: tf-aws-creds
      namespace: your-namespace
    type: Opaque
    ```

{% hint style="warning" %}

### Important Note

* It is recommended to keep the `name` attribute to `tf-aws-creds`. Changing this value might make the secret go unrecognized. 

* The secret must be created in the same namespace where OpenTofu and FluxCD controller are installed. 

* When creating a secret, kindly ensure that your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are encoded in base64. Go to [Devtron Base64 Encoder](https://strings.devtron.ai/base64-encoder) to encode your AWS credentials. 

{% endhint %}

5. Enter your AWS access key against the `AWS_ACCESS_KEY_ID` attribute and AWS secret key against the `AWS_SECRET_ACCESS_KEY` attribute. Refer to [Create New Access Keys](https://docs.aws.amazon.com/keyspaces/latest/devguide/create.keypair.html) for more information. 

6. Click **Apply**. The secret will be created. 

Now that all the prerequisites are met, you can proceed to create a cluster from the **Create Kubernetes Cluster** page. 

### Steps

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/user-access.md#assign-super-admin-permissions) can create a Kubernetes cluster.

{% endhint %}

* Navigate to **Global Configurations** → **Clusters & Environments** → **New Cluster** → **Create Kubernetes Cluster**. 

* Refer the following table (containing **mandatory** fields) and enter the details in the corresponding fields:

  | Field | Description |
  | :--- | :--- |
  | `Cluster Provider` | Select the type of cluster you'd like to create based on your requirement | 
  | `Name` | Enter the name of your Kubernetes cluster (e.g., `eks-cluster-nonprod` in the case of EKS and `rancher-cluster-qa` in the case of Rancher) | 
  | `Region` | Select the region where your cluster is hosted (e.g., `us-east-1` in the case of EKS and `ap-south-3` in the case of Rancher) <br> Refer to [View cluster details using the AWS Management Console](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-manage-view-clusters.html#emr-view-cluster-console) for more information| 
  | `VPC CIDR` | Enter the [VPC CIDR](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html) value. This value determines the number of [pods](../../reference/glossary.md#pod), [nodes](../../reference/glossary.md#nodes), or services your cluster can host (e.g., `10.0.1.6/16`)| 
  | `Authentication Mode` | Select the authentication mode you wish to perform for the cluster <br> <ul><li> **API_AND_CONFIG_MAP** - Select this if you want to use both the API and the ConfigMap to authenticate who can access the cluster. This option is recommended if you are migrating from the old `aws-auth` ConfigMap method (which is deprecated) to the new API method. <br> Refer to [Grant IAM users access to Kubernetes with EKS access entries](https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html) for more information. </li> <li>**API** - Select this if you want to manage access using a single API. This option is recommended as this is the best practice for EKS cluster creation. <br> Refer to [Manage User Access with API](https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html) for more information.</li> <li> **CONFIG MAP** - Select this if you want to rely on the original (but deprecated) way of authentication using `aws-auth` ConfigMap. This option is not recommended anymore. <br> Refer to [Grant IAM users access to Kubernetes. with a ConfigMap.](https://docs.aws.amazon.com/eks/latest/userguide/auth-configmap.html) for more information.</li></ul>| 
  | `Enable IRSA` | Turn on this IRSA toggle (IAM Roles for [Service Accounts](https://kubernetes.io/docs/concepts/security/service-accounts/)) if you want your application to securely connect to other AWS services using a service account| 
  | `Allow public access` | Turn on this toggle if you want to allow your [EKS control plane](https://docs.aws.amazon.com/eks/latest/best-practices/control-plane.html) endpoint to be accessed publicly from anywhere without the VPC. It is recommended to keep this toggle disabled |
  | `Cluster Version` | Select your preferred Kubernetes cluster version. If you are running a live application in a production environment, it is recommended that you select a stable version instead of the latest version | 

  <br />

  ![Figure 19: Create Kubernetes Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/create-k8s-cluster.jpg)
  
  <br />
  
* Refer the following table (containing **optional** fields) and enter the details in the corresponding fields:

  | Field | Description |
  | :--- | :--- |
  | `Team` | Select the team whose tag you want to attach to the cluster resources. For example, when you select `qa-team`, it means that the cluster resources (pods, ConfigMaps, etc.) created with this cluster are owned by the QA team | 
  | `Environment` | Select the environment. For example, when you select `qa`, it means that this cluster is a part of the QA environment | 
  | `Availability Zones` | Select availability zones (e.g., `us-east-2b` and `ap-west-1a`) if you prefer to distribute your worker nodes across multiple zones to make your cluster highly available. <br> This means that even if one availability zone goes down (e.g., `us-east-2b`), the other zones (e.g., `ap-west-1a`) keep your cluster up and running | 
  | `Private access CIDRs` | Enter the private access CIDRs (IP addresses that are allowed to reach the API server). If you had turned off the **Allow public access** toggle, then your EKS control plane endpoint would be private. <br> It then becomes crucial to enter the private access CIDRs so that the API server recognizes them and allows them to access the endpoint | 

* Click **Create Cluster**.

---

## Add Isolated Cluster [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to add an isolated/air-gapped cluster to Devtron.
{% endhint %}

For air-gapped Kubernetes clusters with restricted inbound and outbound traffic, Devtron enables seamless management using isolated clusters. While these are not actual clusters with API endpoints, they provide a convenient way to deploy applications in such environments.

1. On the **New Cluster** modal window, select **Add Isolated Cluster**.

  ![Figure 20: Selecting Isolated Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-select-isolated-cluster.jpg)

2. Add a cluster name (e.g. *banking-airgapped-cluster*) and click **Save Cluster**.

  ![Figure 21: Saving Isolated Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-isolated-cluster-save.jpg)

You have successfully configured an isolated cluster.

![Figure 22: New Isolated Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-new-isolated-cluster.jpg)

{% hint style="info" %}
### Note
When you deploy to an isolated environment, Devtron automatically packages application manifests and images into a [Helm chart](../../reference/glossary.md#helm-chartspackages). You can then either:
* Download and install manually in a fully air-gapped setup.
* Push it to an [OCI registry](../global-configurations/container-registries.md) (provided pushing of helm package is enabled), allowing manifests to be pulled manually or automatically via Devtron on an air-gapped cluster (if pull access to the OCI registry is available).
{% endhint %}

---

## Add Environment to a Cluster

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to add an environment to a cluster.
{% endhint %}

After adding a cluster to Devtron ([Kubernetes Cluster](#add-kubernetes-cluster), [Isolated Cluster](#add-isolated-cluster), and a newly created cluster), initially it has no environments.

1. Select the Cluster to which you want to add an Environment and click **Add Environment**. Alternatively you can also hover over the cluster and click `+` icon (Add Environment icon); an **Add Environment** modal window appears.

  ![Figure 23a: Adding an Environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-add-environment-option.jpg)

  ![Figure 23b: Clicking 'Add Environment'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-click-add-environment.jpg)

2. Fill the following details within the **Add Environment** modal window.

  | Field | Description |
  | :--- | :--- |
  | **Environment Name** | Enter a name for your environment. |
  | **Enter Namespace** | Enter a namespace corresponding to your environment.<br>**Note**: If this namespace does not exist in your cluster, Devtron will create it. If it already exists, Devtron will map the environment to it.</br> |
  | **Environment Type** | Select your environment type:<ul><li>`Production`</li></ul> <ul><li>`Non-production`</li></ul>Note: Devtron shows deployment metrics (DORA metrics) for environments tagged as `Production` only. |

  ![Figure 24: Saving an Environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-add-env-fields.jpg)

3. **Assign a Category to environment** [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) - Devtron allows you to assign a category (for e.g. Prod, QA, Dev, or Stage) to your environments. This enables category-based filtering in the UI, allowing you to determine whether an application is deployed to Prod, QA, Dev, or Stage environment.<br><br>
 To assign a category to your environment, follow the steps below: 
   1. Select a category from the dropdown under **Assign Category** and click **Update**.

   ![Figure 25: Assigning Category](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-assign-category-env.jpg)

   2. The selected category will be assigned to the environment.

   ![Figure 26: Category Assigned](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-assign-category-category-added-env.jpg)

 **Note:** Before assigning a category, you must first add the category. To add a category, refer to [Adding a Category](#add-category) section to learn more.

4. **Add/Edit labels to namespace** [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) - You can attach labels to your specified namespace in the Kubernetes cluster. Using labels will help you filter and identify resources via CLI or other Kubernetes tools. [Click here](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) to know more about labels.

  ![Figure 27: Adding Labels to Namespace](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/labels-namespace.gif)

5. Click **Save**. Your new environment will be visible in your cluster as shown below.

  ![Figure 28: Newly Created Environment in the Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/added-env.jpg)

---

## Edit Environment

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to edit an environment in a cluster.
{% endhint %}

You can also make edits to an existing environment if needed.

1. Navigate to **Environments** tab. 

2. Hover over the environment you wish to edit, and click the **edit** icon.

![Figure 29: Editing Environment in the Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-edit-env.jpg)

3. Edit the environment fields.

| Feature                              | Editable? |
| :----------------------------------- | :-------- |
| **Production/Non-Production Option** | ✅ Yes    |
| **Description**                      | ✅ Yes    |
| **Labels for Namespace**             | ✅ Yes    |
| **Assign a category**                | ✅ Yes    |
| **Environment Name**                 | ❌ No     |
| **Namespace Name**                   | ❌ No     |

4. Click **Update** to save your changes.

![Figure 30: Updating Environment in the Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-update-env.jpg)

---

## Delete Environment

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to delete an environment from a cluster.
{% endhint %}

If an environment is no longer needed, you can delete it by following these steps:  

1. Navigate to **Environments** tab. 

2. Hover over the environment you wish to remove, and click the **delete** icon.

  ![Figure 31: Deleting Environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-delete-env.jpg)

{% hint style="warning" %}
### Important  
Environment deletion is not allowed if any application has a CD pipeline corresponding to the environment. In such a case, go to [Workflow Editor](../creating-application/workflow/README.md) and delete the deployment pipeline first, and then return to delete the environment. This action is irreversible, so make sure no critical applications or resources depend on the environment before deleting.
{% endhint %}

2. A confirmation dialog will appear. Click **Delete** to permanently delete the environment.  

    ![Figure 32: Confirming Environment Deletion](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/cluster-env-confirm-delete-env.jpg)

---

## Add Category

Before assigning a category, you must first add the category. To add a category, follow the steps below:

1. Go to **Global Configurations**. 

   ![Figure 33: Navigating to Global Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-global-config.jpg)

2. Select **Clusters and Environments** and click **Manage Categories**, a modal window will open.

   ![Figure 34: Clicking Manage Categories](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-manage-categories.jpg)

3. Enter the name of the category in the **CATEGORIES** field and provide a description in the **DESCRIPTION** field.
  
 {% hint style="info" %}
 ### Note:
 * The category name must be unique and cannot be changed once defined. It should be a minimum of 3 characters.
 * It can contain alphanumeric characters, but cannot start with a number.
 * The name should be in lowercase only.
 {% endhint %}

   ![Figure 35: Adding Category](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-add.jpg)

4. If you wish to add more categories, click **Add Category**, a new row will appear, enter the name and description of the new category.

   ![Figure 36: Adding More Categories](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-add-category.jpg)

5. Click **Update** and your categories will be added.

   ![Figure 37: Categories Added](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-update.jpg)


## Delete Category

To delete a category, follow the steps below:

1. Go to **Global Configurations**. 

   ![Figure 38: Navigating to Global Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-global-config.jpg)

2. Select **Clusters and Environments** and click **Manage Categories**, a modal window will open.

   ![Figure 39: Clicking Manage Categories](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-manage-categories.jpg)

3. Select the `x` icon next to the categories you want to delete.

   **Note**: You cannot delete a category if it is assigned to a cluster or environment.

  ![Figure 40: Clicking 'x' icon](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/assign-category-x-icon.jpg)

4. Click **Update** to delete the categories.
---

## Extras

### Get Cluster Credentials

{% hint style="info" %}
### Prerequisite
[kubectl](https://kubernetes.io/docs/tasks/tools/) must be installed on the bastion.
{% endhint %}

{% hint style="info" %}
### Note
We recommend using a self-hosted URL instead of a cloud-hosted URL. Refer to the benefits of a [self-hosted URL](#benefits-of-self-hosted-url).
{% endhint %}

You can get the **Server URL** and **Bearer Token** by running the following command, depending on the cluster provider:

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

![Figure 41: Generating Cluster Credentials](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/cluster-and-environments/generate-cluster-credentials.jpg)

### Benefits of Self-hosted URL

* **Disaster Recovery**: 
  * You cannot edit the server URL of a cloud-specific provider. If you're using an EKS URL (e.g.` *****.eu-west-1.elb.amazonaws.com`), it will be a tedious task to add a new cluster and migrate all the services one by one. 
  * But in case of using a self-hosted URL (e.g. `clear.example.com`), you can just point to the new cluster's server URL in DNS manager and update the new cluster token and sync all the deployments.

* **Easy Cluster Migrations**: 
  * In case of managed Kubernetes clusters (like EKS, AKS, GKE etc) which is a cloud provider specific, migrating your cluster from one provider to another will result in waste of time and effort. 
  * On the other hand, migration for a self-hosted URL is easy, as the URL belongs to a single hosted domain independent of the cloud provider.
