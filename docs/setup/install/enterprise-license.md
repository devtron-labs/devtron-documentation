---
hidden: true
---

# Install Devtron Enterprise Trial

## Introduction

With the Enterprise version of Devtron, you can access the premium features beyond the open-source version. For your advanced and challenging use cases, you get comprehensive enterprise features including but not limited to:
1. Release orchestration
2. Resource monitoring 
3. Advanced filtering 
4. Fine-grained access control 
5. Security scans
6. Policies related to approval, deployment, plugins, tags, infra...and many more. 

Enjoy an uninterrupted 14-day free trial and explore [all the features of Devtron Enterprise](https://devtron.ai/pricing#compare-plans) to their full potential.

{% hint style="info" %}
### Already using Devtron's Open Source version?
This guide is intended for fresh installation of **Devtron Enterprise**.  
If you're currently using the open-source (OSS) version of Devtron, we **do not recommend** converting your existing setup to the Enterprise edition.

Instead, we suggest you to perform a [fresh installation of Devtron Enterprise](#install-devtron-enterprise) for the best experience.
{% endhint %}

---

## Step 1: Go to the Devtron License Dashboard

{% hint style="info" %}
### Note
Personal email accounts such as Gmail, Yahoo are not supported.
{% endhint %}

1. To install Devtron Enterprise; Go to the [Devtron License Dashboard](https://license.devtron.ai/dashboard/).

2. Log in with your work email to access the license dashboard

* You can log in using **Google**, **GitHub**, or **Microsoft** SSO providers.

     ![Figure 1: Selecting SSO Provider](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-dashboard-sso.jpg)

* Alternatively, you can also log in via **Continue with Email**. This will send a **Login Link** to the provided email. To do so, follow the below steps:

    * Select **Continue with Email** to log in.

     ![Figure 2: Selecting 'Continue with Email'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-dashboard-email.jpg)

    * Enter your work email to receive the Login Link and select **Send Login Link**

     ![Figure 3: Entering Email](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-dashboard-enter-email.jpg)

    * A login link will be sent to the email provided by you. If you do not revive the link, you can resend it after 30 seconds.

     ![Figure 4: Sending Login Link](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-dashboard-resend-email.jpg)

    * Go to your provided email inbox and use the login link to log into the **Devtron License Dashboard**.

3. Once logged in, **Devtron License Dashboard** will open.

4. Under **Tell Us About You**, enter some basic details to help us improve your Devtron Experience.

5. After entering the details, click **Next** to proceed to [Step 2: Install Devtron](install-devtron-enterprise-trial.md#step-2-install-devtron).

 ![Figure 5: Entering the Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-step-1.jpg)

---

## Step 2: Install Devtron

After entering the basic details, the next step is to install **Devtron Enterprise**. 

The installation commands for installing **Devtron in Full Mode** (with integrations) is directly available on the **Devtron License Dashboard** for different K8s distributions.

Choose your preferred K8s distribution and follow the displayed commands to install **Devtron in Full Mode**.  

![Figure 6: Installing Devtron](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-step-2.jpg)

In case, you want to install Devtron dashboard only, use the commands given in **Devtron without integrations (only dashboard)** tab in [Choose an Installation Option](#id-2.2-choose-an-installation-option) section.

{% hint style="info" %}
### Install Devtron in Air-Gapped Environments

You can also install Devtron in Air-Gapped environments to securely manage and deploy applications without internet access. 

Refer the [Devtron Enterprise (Air‐gapped) Guide](https://github.com/devtron-labs/utilities/wiki/Devtron-Enterprise-(Air%E2%80%90gapped)) to install Devtron in Air-Gapped environments.

{% endhint %}


{% hint style="warning" %}
### Note
Please ensure that cluster `kubeconfig` is properly configured and available in your system.
{% endhint %}


### 2.1 Add Devtron Helm Repository

 ```bash
 helm repo add devtron https://helm.devtron.ai
 helm repo update devtron
 ```

### 2.2 Choose an Installation Option 

{% tabs %}

{% tab title="Devtron in Full Mode" %}

* To install Devtron with all core enterprise features **except ArgoCD**:

```bash
helm install devtron devtron/devtron-enterprise --create-namespace --namespace devtroncd 
```

* To include ArgoCD integration, add `--set devtron.argo-cd.enabled=true`

```bash
helm install devtron devtron/devtron-enterprise --create-namespace --namespace devtroncd --set devtron.argo-cd.enabled=true
```


{% endtab %}

{% tab title="Devtron without integrations (only Dashboard)" %}

To install only the Devtron Dashboard (without CI/CD, ArgoCD, Security, Notification, or Monitoring):

```bash
helm install devtron devtron/devtron-enterprise --create-namespace --namespace devtroncd \
--set devtron.installer.modules={} --set devtron.security.enabled=false  \
--set devtron.notifier.enabled=false  --set devtron.security.trivy.enabled=false --set devtron.monitoring.grafana.enabled=false
```

{% endtab %}

{% endtabs %}

### 2.3 Obtain the Dashboard URL

{% tabs %}

{% tab title="For EKS/AKS/GKE" %}

Run the following command to get the Dashboard URL:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
```

You can access your Devtron Dashboard using the LoadBalancer URL displayed in the output.
{% endtab %}

{% tab title="MicroK8s/Kind/K3s" %}

### Accessing the Dashboard locally (MicroK8s/Kind/K3s)
To obtain the Dashboard URL when MicroK8s/Kind/K3s running locally, run the following command to port-forward the devtron service to port `8000`

```bash
kubectl -n devtroncd port-forward service/devtron-service 8000:80
```
After port-forwarding, The Dashboard URL will be: `http://127.0.0.1:8000`

### Accessing the Dashboard via NodePort 
To obtain the Dashboard URL on MicroK8s/Kind/K3s using NodePort, run the following command to  retrieve the port number assigned to the service:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```
The Dashboard URL will be: `http://<HOST_IP>:<NODEPORT>/dashboard`

### Accessing the Dashboard locally from a remote VM (Port Forwarding via Kubeconfig)
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

{% endtab %}

{% tab title="Minikube" %}

To access the dashboard on Minikube cluster, run the following command:

```bash
minikube service devtron-service --namespace devtroncd
```

This will directly open the dashboard URL on your browser

{% endtab %}

{% tab title="Cloud VMs" %}

### Accessing the Dashboard via NodePort 
To obtain the dashboard URL on Cloud VMs using NodePort, run the following command to  retrieve the port number assigned to the service:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```
The Dashboard URL will be: `http://<HOST_IP>:<NODEPORT>/dashboard`

### Accessing the Dashboard locally from a remote VM (Port Forwarding via Kubeconfig)
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

{% endtab %}

{% endtabs %}

After successfully installing Devtron and obtaining the dashboard URL, click **Next** to proceed to [Step 3: Get License Key](#step-3-get-license-key)

---

## Step 3: Get License Key

You will now need to enter your Devtron **Installation Fingerprint** to generate a license key.

![Figure 7: Enter Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-step-3.jpg)

### Get Devtron installation's fingerprint

To get the **Installation Fingerprint** follow the below steps 

1. Visit your Dashboard URL (which you have obtained in [Step-2.3](#23-obtain-the-dashboard-url))as shown below.

 ![Figure 8: License Activation Screen](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-fingerprint.jpg)

2. You will see an Installation Fingerprint that uniquely identifies your installation. Copy the fingerprint.

 ![Figure 9: Copying Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-copy-fingerprint.jpg)

3. Go back to the **License Dashboard** and paste the fingerprint you copied earlier and click **Get License Key**.

 ![Figure 10: Pasting Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-paste-fingerprint.jpg)

4. Your license will be generated. Copy the license key.

 ![Figure 11: Copying Generated License Key](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-key-generated.jpg)

{% hint style="warning" %}
### Note
The license key you generate will be valid only for your enterprise installation. It is uniquely mapped to your installation fingerprint.
{% endhint %}

5. Go back to your **Devtron Dashboard URL** page and paste your license key under **License Key** field and click **Activate**.

 ![Figure 12: Pasting License Key and Activating](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-paste-license-key.jpg)

6. **Devtron Enterprise License** has been activated and now you can log in into **Devtron Dashboard**. 

 ![Figure 13: Log in as Administrator ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-login.jpg)

{% hint style="info" %}
### Facing Issues?
Visit the [Troubleshoot](#troubleshoot-issues) section to identify the issue or connect with [Devtron Support](support@devtron.ai).
{% endhint %}

---

## Log in to Devtron

1. After successful license activation, you will see the Devtron login page.

 ![Figure 14: Devtron Login Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-login-admin.jpg)

2. Initially, log in with the administrator credentials. By default, the username is **admin**. Run the following command to get the admin password:

```bash
kubectl -n devtroncd get secret devtron-secret \
-o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
```

{% hint style="info" %}
### Note
When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use it to log in as an administrator.

After the initial login, we recommend you set up any [Single Sign-On (SSO) service](../../user-guide/global-configurations/sso-login.md) like Google, GitHub, etc., and then add other users (including yourself). Subsequently, all the users can use the same SSO (let's say, GitHub) to log in to the Dashboard.
{% endhint %}

3. After a successful login, the **Devtron Dashboard** will open, and you can start exploring **Devtron Enterprise** features.

 ![Figure 15: Devtron Dashboard](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterpise-license-dashbaord.jpg)

---

## Additional Actions

### Check License Details

In Devtron, click the **Help** menu (top-right corner) → **About Devtron** to know the following:
* License details (Key and Expiry)
* Installation fingerprint
* Enterprise version

![Figure 16: 'About Devtron' Help Menu](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-check.gif)

### Update License

If you have a new license key, you can update the license key directly within Devtron, from the **About Devtron** page.

![Figure 17: Updating License](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/update-license.jpg)

### Renew License

If your trial license has expired and you wish to renew it, email us at enterprise@devtron.ai or reach out to your Devtron representative.

---

## Troubleshoot Issues

| Issue | What it means | Where is it shown | Solution |
|-------|----------------|-------------------|----------|
| **License Claimed** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-claimed-v2.jpg) | Someone from your organization has already availed a license | License Dashboard | Reach out to enterprise@devtron.ai for another trial |
| **Invalid License Key** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/invalid-license-v2.jpg) | The license key is incorrect or partial | Devtron Dashboard Page | Go to the License Dashboard and recheck the license |
| **License Key No Longer Valid** <br />  [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-no-longer-valid-v2.jpg) | The license key has become invalid for your installation fingerprint | Devtron Dashboard Page | Generate a new license from License Dashboard. |
| **Invalid Fingerprint** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-invalid-fingerprint-v2.jpg) | The fingerprint is incorrect or partial | License Dashboard (Step-3) | Go to the License Activation Page and verify the fingerprint |
| **License Has Expired** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-expired-v2.jpg) | You have exhausted the free trial | Devtron Dashboard Page or License Dashboard | Reach out to enterprise@devtron.ai for renewal |
| **License Key Already Exists for Fingerprint** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-already-exists-v2.jpg) | You cannot generate more than 1 license key for 1 fingerprint | License Dashboard (Step-3)| Contact Support |