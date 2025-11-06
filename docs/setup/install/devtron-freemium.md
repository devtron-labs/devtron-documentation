# Install Devtron Freemium

## Introduction

With Devtron Freemium, you can access all the enterprise features limited to 1 cluster managed by Devtron. For your advanced and challenging use cases, you get comprehensive enterprise features including but not limited to:

* Release orchestration
* Resource monitoring
* Advanced filtering
* Fine-grained access control
* Security scans
* Policies related to approval, deployment, plugins, tags, infra...and many more.

:::info Already using Devtron OSS?

This guide is intended for fresh installation of **Devtron Freemium**.\
If you're currently using the [open-source (OSS) version of Devtron](../install/devtron-oss.md), we **do not recommend** upgrading your existing setup to Devtron Freemium.

Instead, we suggest you to perform a fresh installation of Devtron Freemium on a separate cluster (following the steps below) for the best experience.
:::

---

## Step 1: Sign up for License

To install Devtron Freemium, go to [Devtron's License Dashboard](https://license.devtron.ai/dashboard/).

You can choose any of the two methods to sign up: [SSO](devtron-freemium.md#method-1-sign-up-using-sso) or [Work Email](devtron-freemium.md#method-2-sign-up-using-work-email)

### Method 1: Sign up using SSO

1.  Log in using **Google**, **GitHub**, or **Microsoft** SSO providers. Personal email accounts such as Gmail, Yahoo are not supported.

    ![Figure 1: Selecting SSO Provider](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-dashboard-sso-v2.jpg)
2. Once logged in, the **Devtron License Dashboard** will open.
3. Under **Tell Us About You**, fill the required basic details, and click **Next** to proceed to [Step 2: Install Devtron](devtron-freemium.md#step-2-install-devtron).

### Method 2: Sign up using Work Email

Use this method if your email is not associated with any of the SSO options provided on the screen.

1.  Select **Continue with Email** to log in.

    ![Figure 2: Selecting 'Continue with Email'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-dashboard-email-v2.jpg)
2.  Enter your work email and select **Send Login Link**

    ![Figure 3: Entering Email](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-dashboard-enter-email-v2.jpg)
3.  A login link will be sent to the email address provided by you. If you do not receive the link, you can resend it after 30 seconds.

    **Note:** Your login link will be valid only for 10 minutes.

    ![Figure 4: Sending Login Link](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-dashboard-resend-email.jpg)

:::info 
**Did Not Receive Email?**

* Check all sections of the mailbox, including the 'Spam' section.
* If the email is in the Spam section, mark it as 'Not Spam'.
:::

4.  Open the email and click **Login to License Dashboard**.

    ![Figure 5: Email with Login Link](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-email.jpg)

    Once logged in, the **Devtron License Dashboard** will open.
5.  Under **Tell Us About You**, fill the required basic details, and click **Next** to proceed to [Step 2: Install Devtron](devtron-freemium.md#step-2-install-devtron).

    ![Figure 6: Entering the Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-step-1.jpg)

---

## Step 2: Install Devtron

:::warning Note
We recommend installing Devtron on a separate Kubernetes cluster, since the cluster may run critical system services. Therefore, it should be kept separate from application workloads. Also ensure your `kubeconfig` is properly configured.

See [Additional Installation Resources](../../reference/README.md) for production infra recommendations, air-gapped installs, blob storage, config overrides, StorageClass, Database, Ingress setup, backups, and more.
:::

The installation commands are directly available on the [Devtron License Dashboard](https://license.devtron.ai/dashboard) for supported K8s distributions.

1. Select your preferred K8s distribution.

2. Run the installation commands provided.

3. Run the dashboard access commands shown below them.

Once Devtron is installed and you have the dashboard URL, click **Next** to proceed to [Step 3: Get License Key](devtron-freemium.md#step-3-get-license-key)

:::info 
**Using MicroK8s/Kind/K3s/Cloud VMs? Want to Access Dashboard via NodePort? Or Locally from Remote VM?**

* **Access via NodePort**:

To obtain the Dashboard URL on MicroK8s/Kind/K3s/Cloud VMs using NodePort, run the following command to retrieve the port number assigned to the service:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```

**Dashboard URL**: `http://<HOST_IP>:<NODEPORT>/dashboard`

---

* **Local Access from a remote VM (Port Forwarding via Kubeconfig)**:

To obtain the Dashboard URL if Devtron is installed on a remote VM (e.g., AWS EC2, Azure VM, GCP Compute Engine) using MicroK8s, Kind, or K3s, run the following commands one-by-one:

```bash
scp user@cloud-vm-ip:/path/to/kubeconfig ~/.kube/config 
kubectl config use-context <context-name> # Set the correct context.
kubectl -n devtroncd port-forward service/devtron-service 8000:80
```

**Dashboard URL**: `http://127.0.0.1:8000`

:::

---

## Step 3: Get License Key

You will now need to enter your Devtron **Installation Fingerprint** to generate a license key.

![Figure 7: Enter Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-step-3.jpg)

### Get Devtron installation's fingerprint

To get the **Installation Fingerprint**, follow the below steps:

1.  Visit the Dashboard URL obtained in Step 2.

    ![Figure 8: License Activation Screen](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-fingerprint.jpg)
2.  You will see an installation fingerprint that uniquely identifies your installation. Copy the fingerprint.

    ![Figure 9: Copying Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-copy-fingerprint.jpg)
3.  Go back to the **License Dashboard** and paste the fingerprint you copied earlier and click **Get License Key**.

    ![Figure 10: Pasting Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-paste-fingerprint.jpg)
4.  Your license will be generated. Copy the license key.

    ![Figure 11: Copying Generated License Key](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-key-generated-2.jpg)

:::warning 
**Note**

The license key you generate will be valid only for your Devtron Freemium installation.

* Only one Devtron Freemium cluster per organization.
* The license key is uniquely mapped to your installation fingerprint.
:::

:::danger 
**Warning**

The license is bound to your Kubernetes cluster and cannot be transferred to another cluster. In case the cluster is deleted, you cannot claim freemium license on a new cluster. In that case, contact [support@devtron.ai](mailto:support@devtron.ai).
:::

5.  Go back to your **Devtron Dashboard URL** page. Paste your license key under the **License Key** field, and click **Activate**.

    ![Figure 12: Pasting License Key and Activating](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-paste-license-key.jpg)

6.  Devtron Freemium will be activated, and you can log in to **Devtron Dashboard**.

    ![Figure 13: Log in as Administrator](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-login.jpg)

:::info 
**Facing Issues?**

Visit the [Troubleshoot](devtron-freemium.md#troubleshoot-issues) section to identify the issue or connect with [Devtron Support](mailto:support@devtron.ai).
:::

---

## Step 4: Log in to Devtron

1.  After successful license activation, you will see the Devtron login page.

    ![Figure 14: Devtron Login Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/enterprise-license-login-admin.jpg)
2.  Initially, log in with the administrator credentials. By default, the username is **admin**. Run the following command to get the admin password:

    ```bash
    kubectl -n devtroncd get secret devtron-secret \
    -o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
    ```

:::success Next Recommended Action
After the initial login, we recommend you set up an [Single Sign-On (SSO) service](../../user-guide/global-configurations/sso-login.md) like Google, GitHub, etc., and then [add other members](../../user-guide/global-configurations/authorization/user-access.md#add-users) (including yourself). Thereafter, they can log in using the configured SSO.
:::

3.  After a successful login, the **Devtron Dashboard** will open, and you can explore all the enterprise features supported by Devtron Freemium.

    ![Figure 15: Devtron Dashboard](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-enterprise-license-dashboard.jpg)

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

![Figure 17: Updating License](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-update-license.jpg)

### Upgrade License

If you want to add more than one cluster, email us at enterprise@devtron.ai or reach out to your Devtron representative to upgrade your license.

![Figure 18: Upgrade License](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-upgrade.jpg)

---

## Troubleshoot Issues

| Issue                                                                                                                                                                                                                       | What it means                                                        | Where is it shown                           | Solution                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| <p><strong>License Claimed</strong><br/><a href="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/freemium-license-claimed-v2.jpg">Snapshot</a></p>                                   | Someone from your organization has already availed a license         | License Dashboard                           | Reach out to enterprise@devtron.ai                           |
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
Refer [Step 2: Install Devtron](devtron-freemium.md#step-2-install-devtron) for the installation.

</details>

<details>

<summary><strong>Can I switch from Freemium to a fully Enterprise one without reinstalling?</strong></summary>

Yes. You don’t need to reinstall.\
Contact [Devtron Support](https://devtron.ai/enterprise-support) to obtain a full Enterprise license key, then update the key in your existing setup.

**Steps:** In Devtron, go to **Help → About Devtron → License → Update License**, paste the Enterprise license key, and select **Activate**.\
Your apps, pipelines, and settings remain intact.

</details>

<details>

<summary><strong>Is my Freemium license transferable to another Kubernetes cluster?</strong></summary>

No. The Freemium license is bound to your **current Kubernetes cluster** and **cannot be transferred**.\
If the cluster is deleted, you will not be able to claim a Freemium license on a new cluster.

If you need help, contact [support@devtron.ai](mailto:support@devtron.ai).

</details>
