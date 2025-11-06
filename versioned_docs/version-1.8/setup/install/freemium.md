---
hidden: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install Devtron Freemium

## Introduction

With Devtron Freemium, you can access all the enterprise features limited to adding one additional cluster only, i.e., Devtron cluster (the cluster where Devtron is installed) and you can add up to one additional Kubernetes cluster. For your advanced and challenging use cases, you get comprehensive enterprise features including but not limited to:

1. Release orchestration
2. Resource monitoring
3. Advanced filtering
4. Fine-grained access control
5. Security scans
6. Policies related to approval, deployment, plugins, tags, infra...and many more.


:::info Already using Devtron's Open Source version?
This guide is intended for fresh installation of **Devtron Freemium**.
If you're currently using the open-source (OSS) version of Devtron, we **do not recommend** upgrading your existing setup to Devtron Freemium.

Instead, we suggest you to perform a fresh installation of Devtron Freemium on a separate cluster (following the steps below) for the best experience.
:::

---

## Step 1: Go to the Devtron License Dashboard

To install Devtron Freemium; go to the [Devtron License Dashboard](https://license.devtron.ai/dashboard/).\
\
Log in with your work email to access the license dashboard. Devtron provides two login methods to log in to the License Dashboard

### Method 1: Log In with SSO

1. Log in using **Google**, **GitHub**, or **Microsoft** SSO providers. Personal email accounts such as Gmail, Yahoo are not supported.

![Figure 1: Selecting SSO Provider](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-dashboard-sso.jpg)

2. Once logged in, the **Devtron License Dashboard** will open.
3. Under **Tell Us About You**, enter some basic details to help us improve your Devtron Experience.
4. After entering the details, click **Next** to proceed to [Step 2: Install Devtron](freemium.md#step-2-install-devtron).

![Figure 2: Entering the Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-step-1.jpg)

### Method 2: Log In with Email

You can also log in via **Continue with Email**. This will send a login link to the provided work email. To do so, follow the below steps:

1. Select **Continue with Email** to log in.

![Figure 3: Selecting 'Continue with Email'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-dashboard-email.jpg)

2. Enter your work email and select **Send Login Link**

![Figure 4: Entering Email](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-dashboard-enter-email.jpg)

3. A login link will be sent to the email provided by you. If you do not receive the link, you can resend it after 30 seconds.

**Note:** Your login link is valid only for 10 minutes.

![Figure 5: Sending Login Link](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-dashboard-resend-email.jpg)

:::info Email not received?
* Check all sections of the mailbox, including the Spam section.
* If you find the login link email in the Spam section, mark it as 'Not Spam'.
:::

4. Go to your provided email inbox and use the login link.

![Figure 6: Email with Login Link](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-email.jpg)

Once logged in, the **Devtron License Dashboard** will open.

5. Under **Tell Us About You**, enter a few basic details to help us improve your Devtron Experience.
6. Click **Next** to proceed to [Step 2: Install Devtron](freemium.md#step-2-install-devtron).

![Figure 7: Entering the Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-step-1.jpg)

---

## Step 2: Install Devtron

:::success Recommendation
We recommend installing Devtron on a separate Kubernetes cluster, as Devtron Cluster (cluster on which Devtron is installed) has critical system services and should be kept separate from application workloads.
:::

After entering the basic details, the next step is to install **Devtron Freemium**.

The installation commands for installing **Devtron in Full Mode** (with integrations) is directly available on the **Devtron License Dashboard** for different K8s distributions.

Choose your preferred K8s distribution and follow the displayed commands to install **Devtron in Full Mode**.

![Figure 8: Installing Devtron](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-step-2.jpg)

In case, you want to install Devtron dashboard only, use the commands given in **Devtron without integrations (only dashboard)** tab in [Choose an Installation Option](freemium.md#22-choose-an-installation-option) section.

:::info Install Devtron in Air-Gapped Environments
You can also install Devtron in Air-Gapped environments to securely manage and deploy applications without internet access.

Refer the [Devtron Enterprise (Air‐gapped) Guide](https://github.com/devtron-labs/utilities/wiki/Devtron-Enterprise-\(Air%E2%80%90gapped\)) to install Devtron in Air-Gapped environments.
:::

:::warning Note
Please ensure that cluster `kubeconfig` is properly configured and available in your system.
:::

### 2.1 Add Devtron Helm Repository

```bash
helm repo add devtron https://helm.devtron.ai
helm repo update devtron
```

### 2.2 Choose an Installation Option

<Tabs>
<TabItem label="Devtron in Full Mode" value="Devtron in Full Mode">
* To install Devtron with all core enterprise features **except ArgoCD**:

```bash
helm install devtron devtron/devtron-enterprise --create-namespace --namespace devtroncd 
```

* To include ArgoCD integration, add `--set devtron.argo-cd.enabled=true`

```bash
helm install devtron devtron/devtron-enterprise --create-namespace --namespace devtroncd --set devtron.argo-cd.enabled=true
```
</TabItem>

<TabItem label="Devtron without integrations (only Dashboard)" value="Devtron without integrations (only Dashboard)">
To install only the Devtron Dashboard (without CI/CD, ArgoCD, Security, Notification, or Monitoring):

```bash
helm install devtron devtron/devtron-enterprise --create-namespace --namespace devtroncd \
--set devtron.installer.modules={} --set devtron.security.enabled=false  \
--set devtron.notifier.enabled=false  --set devtron.security.trivy.enabled=false --set devtron.monitoring.grafana.enabled=false
```
</TabItem>
</Tabs>

### 2.3 Obtain the Dashboard URL

<Tabs>
<TabItem label="For EKS/AKS/GKE" value="For EKS/AKS/GKE">
Run the following command to get the Dashboard URL:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
```

You can access your Devtron Dashboard using the LoadBalancer URL displayed in the output.
</TabItem>

<TabItem label="MicroK8s/Kind/K3s" value="MicroK8s/Kind/K3s">
#### Accessing the Dashboard locally (MicroK8s/Kind/K3s)

To obtain the Dashboard URL when MicroK8s/Kind/K3s running locally, run the following command to port-forward the devtron service to port `8000`

```bash
kubectl -n devtroncd port-forward service/devtron-service 8000:80
```

After port-forwarding, The Dashboard URL will be: `http://127.0.0.1:8000`

#### Accessing the Dashboard via NodePort

To obtain the Dashboard URL on MicroK8s/Kind/K3s using NodePort, run the following command to retrieve the port number assigned to the service:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```

The Dashboard URL will be: `http://<HOST_IP>:<NODEPORT>/dashboard`

#### Accessing the Dashboard locally from a remote VM (Port Forwarding via Kubeconfig)

To obtain the Dashboard URL if Devtron is installed on a remote VM (e.g., AWS EC2, Azure VM, GCP Compute Engine) using MicroK8s, Kind, or K3s, run the following commands:

```bash
scp user@cloud-vm-ip:/path/to/kubeconfig ~/.kube/config 
# Export the kubeconfig file from the remote VM to your local system.

kubectl config use-context <context-name>
# Set the correct context.

kubectl -n devtroncd port-forward service/devtron-service 8000:80
# This command will forward traffic from the service running on the 
# remote VM's MicroK8s, Kind, or K3s cluster to your local system’s port.
```

The Dashboard URL will be `http://127.0.0.1:8000` on your local machine.
</TabItem>

<TabItem label="Minikube" value="Minikube">
To access the dashboard on Minikube cluster, run the following command:

```bash
minikube service devtron-service --namespace devtroncd
```

This will directly open the dashboard URL on your browser
</TabItem>

<TabItem label="Cloud VMs" value="Cloud VMs">
#### Accessing the Dashboard via NodePort

To obtain the dashboard URL on Cloud VMs using NodePort, run the following command to retrieve the port number assigned to the service:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```

The Dashboard URL will be: `http://<HOST_IP>:<NODEPORT>/dashboard`

#### Accessing the Dashboard locally from a remote VM (Port Forwarding via Kubeconfig)

To obtain the Dashboard URL if Devtron is installed on a remote VM (e.g., AWS EC2, Azure VM, GCP Compute Engine) using MicroK8s, Kind, or K3s, run the following commands:

```bash
scp user@cloud-vm-ip:/path/to/kubeconfig ~/.kube/config 
# Export the kubeconfig file from the remote VM to your local system.

kubectl config use-context <context-name>
# Set the correct context.

kubectl -n devtroncd port-forward service/devtron-service 8000:80
# This command will forward traffic from the service running on the 
# remote VM's MicroK8s, Kind, or K3s cluster to your local system’s port.
```

The Dashboard URL will be `http://127.0.0.1:8000` on your local machine.
</TabItem>
</Tabs>

After successfully installing Devtron and obtaining the dashboard URL, click **Next** to proceed to [Step 3: Get License Key](freemium.md#step-3-get-license-key)

---

## Step 3: Get License Key

You will now need to enter your Devtron **Installation Fingerprint** to generate a license key.

![Figure 9: Enter Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-step-3.jpg)

### Get Devtron installation's fingerprint

To get the **Installation Fingerprint**, follow the below steps

1. Visit your Dashboard URL (which you have obtained in [Step-2.3](freemium.md#23-obtain-the-dashboard-url)) as shown below.

![Figure 10: License Activation Screen](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-fingerprint.jpg)

2. You will see an Installation Fingerprint that uniquely identifies your installation. Copy the fingerprint.

![Figure 11: Copying Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-copy-fingerprint.jpg)

3. Go back to the **License Dashboard** and paste the fingerprint you copied earlier and click **Get License Key**.

![Figure 12: Pasting Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-paste-fingerprint.jpg)

4. Your license will be generated. Copy the license key.

![Figure 13: Copying Generated License Key](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-key-generated-2.jpg)

:::warning Note
The license key you generate will be valid only for your Devtron Freemium installation.

* Only one Devtron Freemium cluster per organization.
* The license key is uniquely mapped to your installation fingerprint.
:::

:::danger Warning
The license is bound to your Kubernetes cluster and cannot be transferred to another cluster. In case cluster is deleted, you cannot claim freemium license on a new cluster.

In such cases, contact [Devtron Support](mailto:support@devtron.ai).
:::

5. Go back to your **Devtron Dashboard URL** page and paste your license key under **License Key** field and click **Activate**.

![Figure 14: Pasting License Key and Activating](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-paste-license-key.jpg)

6. **Devtron Freemium** will be activated, and you can log in to **Devtron Dashboard**.

![Figure 15: Log in as Administrator](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-login.jpg)

:::info Facing Issues?
Visit the [Troubleshoot](freemium.md#troubleshoot-issues) section to identify the issue or connect with [Devtron Support](mailto:support@devtron.ai).
:::

---

## Log in to Devtron

1. After successful license activation, you will see the Devtron login page.

![Figure 16: Devtron Login Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-login-admin.jpg)

2. Initially, log in with the administrator credentials. By default, the username is **admin**. Run the following command to get the admin password:

```bash
kubectl -n devtroncd get secret devtron-secret \
-o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
```

:::info Note
When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use it to log in as an administrator.

After the initial login, we recommend you set up any [Single Sign-On (SSO) service](../../user-guide/global-configurations/sso-login.md) like Google, GitHub, etc., and then add other users (including yourself). Subsequently, all the users can use the same SSO (let's say, GitHub) to log in to the Dashboard.
:::

3. After a successful login, the **Devtron Dashboard** will open, and you can explore all the enterprise features supported by Devtron Freemium.

![Figure 17: Devtron Dashboard](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-dashboard.jpg)

---

## Convert Enterprise Free Trial to Freemium

You can switch to Devtron Freemium at no cost and no reinstallation is required. All your apps, pipelines and config will remain intact.

After upgrade, with Devtron Freemium, you will be able to access all Devtron enterprise features for free and forever, with the limit of adding one additional connected cluster (the default cluster where Devtron runs + 1 additional connected cluster).

:::warning Mandatory Action Before Upgrading
Ensure your Enterprise Free Trial has no more than one additional cluster connected (Devtron Cluster + 1 additional connected cluster). If more than one additional cluster is connected, disconnect the extra clusters before upgrading; otherwise, the upgrade will not proceed.
:::

1.  Open your Devtron dashboard and navigate to **Help** → **About Devtron** → **License**.

    ![Figure 18: 'About Devtron' Help Menu](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-check.gif)
2.  Copy the Installation fingerprint.

    ![Figure 19: Copying Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-copy-fingerprint-2.jpg)
3.  Navigate to the license dashboard; and you will be automatically redirected to the step 3 (Get License Key).

    ![Figure 20: Devtron License Dashboard](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-dashboard-2.jpg)
4.  Paste the fingerprint you copied earlier and click **Get License Key**.

    ![Figure 21: Pasting Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-paste-fingerprint-2.jpg)
5.  Your license will be generated. Copy the license key.

    ![Figure 22: Copying the License Key](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-copy-license-2.jpg)
6.  Navigate back to **Help** → **About Devtron** → **License**, and click **Update License**.

    ![Figure 23: Clicking Update License](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/update-license.jpg)
7.  Paste the new license key you copied earlier and click **Activate**; Devtron Freemium is now activated.

    ![Figure 24: Click Activate](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-paste-license-2.jpg)

---

## Additional Actions

### Check License Details

In Devtron, click the **Help** menu (top-right corner) → **About Devtron** to know the following:

* License details (Key and Expiry)
* Installation fingerprint
* Enterprise version

![Figure 25: 'About Devtron' Help Menu](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-check.gif)

### Update License

If you have a new license key, you can update the license key directly within Devtron, from the **About Devtron** page.

![Figure 26: Updating License](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-update-license.jpg)

### Upgrade License

If you want to add more than one cluster, email us at [enterprise@devtron.ai](mailto:enterprise@devtron.ai) or reach out to your Devtron representative to upgrade your license.

![Figure 27: Upgrade License](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-upgrade.jpg)

---

## Troubleshoot Issues

| Issue                                                                                                                                                                                                                       | What it means                                                        | Where is it shown                           | Solution                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| <p><strong>License Claimed</strong><br/><a href="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-claimed-v2.jpg">Snapshot</a></p>                                   | Someone from your organization has already availed a license         | License Dashboard                           | Reach out to [enterprise@devtron.ai](mailto:enterprise@devtron.ai)                           |
| <p><strong>Invalid License Key</strong><br/><a href="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/invalid-license-v2.jpg">Snapshot</a></p>                                       | The license key is incorrect or partial                              | Devtron Dashboard Page                      | Go to the License Dashboard and recheck the license          |
| <p><strong>License Key No Longer Valid</strong><br/><a href="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-no-longer-valid-v2.jpg">Snapshot</a></p>                       | The license key has become invalid for your installation fingerprint | Devtron Dashboard Page                      | Generate a new license from License Dashboard.               |
| <p><strong>Invalid Fingerprint</strong><br/><a href="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-invalid-fingerprint-v2.jpg">Snapshot</a></p>                   | The fingerprint is incorrect or partial                              | License Dashboard (Step-3)                  | Go to the License Activation Page and verify the fingerprint |
| <p><strong>Multiple Cluster Detected</strong><br/><a href="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-multiple-cluster-detected.jpg">Snapshot</a></p>                  | You have added more than one cluster                                 | Devtron Dashboard Page or License Dashboard | Reach out to enterprise@devtron.ai for renewal               |
| <p><strong>License Key Already Exists for Fingerprint</strong><br/><a href="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-already-exists-v2.jpg">Snapshot</a></p> | You cannot generate more than 1 license key for 1 fingerprint        | License Dashboard (Step-3)                  | Contact Support                                              |

---

## FAQs

<details>

<summary><strong>How many clusters does Freemium support?</strong></summary>

Freemium supports **adding one additional cluster** (the **Devtron cluster** where Devtron is installed and **one additional connected cluster**). For more clusters, upgrade to the Devtron Enterprise.

</details>

<details>

<summary><strong>Can I convert my existing Devtron OSS setup to Freemium?</strong></summary>

We **don’t recommend** converting an existing OSS setup. For the best experience, perform a **fresh Freemium installation**.\
Refer [Step 2: Install Devtron](freemium.md#step-2-install-devtron) for the installation.

</details>

<details>

<summary><strong>I’m on the Enterprise Free Trial. Can I switch to Freemium for free?</strong></summary>

Yes. Generate a **Freemium** license key from the [License Dashboard](https://license.devtron.ai/dashboard/).\
In Devtron, open **Help → About Devtron → Update License**, paste the key, and select **Activate**.\
No reinstallation required; your setup remains intact.

</details>

<details>

<summary><strong>Can I switch from Freemium to the Enterprise without reinstalling Devtron?</strong></summary>

Yes. You don’t need to reinstall.\
Contact [Devtron Support](https://devtron.ai/enterprise-support) to obtain an Enterprise license key, then update the key in your existing setup.

**Steps:** In Devtron, go to **Help → About Devtron → License → Update License**, paste the Enterprise license key, and select **Activate**.\
Your apps, pipelines, and settings remain intact.

</details>

<details>

<summary><strong>Is my Freemium license transferable to another Kubernetes cluster?</strong></summary>

No. The Freemium license is bound to your **current Kubernetes cluster** and **cannot be transferred**.\
If the cluster is deleted, you will not be able to claim a Freemium license on a new cluster.

If you need help, contact [Devtron Support](mailto:support@devtron.ai).

</details>
