# Install Devtron Enterprise Trial

## Introduction

With the Enterprise version of Devtron, you can access the premium features beyond the open-source version. For your advanced and challenging use cases, you get comprehensive enterprise features including but not limited to:
1. Release orchestration
2. Resource monitoring 
3. Advanced filtering 
4. Fine-grained access control 
5. Security scans
6. Policies related to approval, deployment, plugins, tags, infra...and many more. 

In order to use these enhanced features, you can get an uninterrupted 14-day free trial to explore and experience Devtron to its full potential.

---

## Prerequisites

* [Helm CLI](https://helm.sh/docs/intro/install/#from-script) and [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) installed
* Access to a Kubernetes cluster. If you wish to install Devtron in Full Mode (step 2 of [Install Devtron Enterprise](#install-devtron-enterprise)), ensure that neither ArgoCD nor Argo Workflows are installed in your cluster.
* Download `ent-bom.yaml` using this command:

```bash
curl -O https://raw.githubusercontent.com/devtron-labs/utilities/main/scripts/devtron-oss-to-ent/ent-bom.yaml
```


---

## Install Devtron Enterprise

1. **Add Devtron Helm repository**

```bash
kubectl create ns devtroncd
helm repo add devtron https://helm.devtron.ai
helm repo update devtron
```

2. **Depending on your requirements, use any one of the following:**

{% tabs %}

{% tab title="Devtron in Full Mode" %}

To install Devtron with all the features, run the following command:

```bash
helm install devtron devtron/devtron-operator -f ent-bom.yaml --namespace devtroncd \
--set installer.modules={cicd} --set argo-cd.enabled=true --set security.enabled=true  \
--set notifier.enabled=true  --set security.trivy.enabled=true --set monitoring.grafana.enabled=true \
```
{% endtab %}

{% tab title="Devtron without integrations (only Dashboard)" %}

To install Devtron with just the Dashboard and without integrations, run the following command:

```bash
helm install -n devtroncd devtron  devtron/devtron-operator  -f ent-bom.yaml
```

{% endtab %}

{% endtabs %}

3. **Obtain the Dashboard URL to access Devtron**

{% tabs %}

{% tab title="For EKS/AKS/GKE" %}

Run the following command to get the Dashboard URL:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
```

You can access your Devtron Dashboard using the LoadBalancer URL displayed in the output.
{% endtab %}

{% tab title="MicroK8s/Kind/K3s" %}

Run the following command to port-forward the devtron service to port 8000

```bash
kubectl -n devtroncd port-forward service/devtron-service 8000:80
```

After port-forwarding, you can access the dashboard on this URL: http://127.0.0.1:8000


{% endtab %}

{% tab title="Minikube" %}

To access the dashboard on Minikube cluster, run the following command:

```bash
minikube service devtron-service --namespace devtroncd
```

This will directly open the dashboard URL on your browser

{% endtab %}

{% tab title="Cloud VMs" %}

Get devtron-service port number using the following command:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```

The dashboard URL will be: http://<HOST_IP>:<nodeport>/dashboard

{% endtab %}

{% endtabs %}

You will see a `License Activation` screen upon visiting your Dashboard URL as shown below. If you already have a license key, paste it and click **Activate**. If not, you can [generate a fresh license key](#generate-license-key).

![Figure 1: License Activation Screen](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-activation.jpg)



---

## Generate License Key

1. You will see an installation fingerprint that uniquely identifies your installation. Copy the fingerprint and click the **Get License** link.

    ![Figure 2: Copying Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-activation-2.jpg)

{% hint style="info" %}
### What if my installation is airgapped and has no Internet access?
In case your installation is not connected to the Internet, clicking the **Get License** link will display a QR code that you can scan with an Internet-enabled device to obtain a license ([check snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/qr-code-airgapped.jpg)).
{% endhint %}


2. Log in to the **License Dashboard** using SSO or a valid work email. Personal email addresses are not allowed.

    ![Figure 3: Log in to License Dashboard](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-sso-login.jpg)

3. From your work email address, the system will try to autopopulate the details in the form. If not, you can enter or modify the details too.

    ![Figure 4: Entering User Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/user-details.jpg)

4. Paste the fingerprint you copied earlier and click **Get License Key**.

    ![Figure 5: Pasting Installation Fingerprint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/pasted-fingerprint.jpg)

5. Your license will be generated. Copy the license key.

    ![Figure 6: Copying Generated License Key](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/generated-license-key.jpg)

{% hint style="warning" %}
### Note
The license key you generate will be valid only for your enterprise installation. It is uniquely mapped to your installation fingerprint.
{% endhint %}

6. Go back to your **License Activation** page (from [step 1](#generate-license-key)). Paste your license key and click **Activate**.

    ![Figure 7: Pasting License Key and Activating](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-activation-3.jpg)

{% hint style="info" %}
### Facing Issues?
Visit the [Troubleshoot](#troubleshoot-issues) section to identify the issue or connect with [Devtron Support](support@devtron.ai).
{% endhint %}

---

## Log in to Devtron

1. After successful license activation, you will see the Devtron login page.
 
    ![Figure 8: Devtron Login Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/admin-login.jpg)

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

---

## Additional Actions

### Check License Details

In Devtron, click the **Help** menu (top-right corner) → **About Devtron** to know the following:
* License details (Key and Expiry)
* Installation fingerprint
* Enterprise version

![Figure 9: 'About Devtron' Help Menu](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-check.gif)

### Update License

If you have a new license key, you can update the license key directly within Devtron, from the **About Devtron** page.

![Figure 10: Updating License](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/update-license.jpg)

### Renew License

If your trial license has expired and you wish to renew it, email us at enterprise@devtron.ai or reach out to your Devtron representative.

---

## Troubleshoot Issues

| Issue | What it means | Where is it shown | Solution |
|-------|----------------|-------------------|----------|
| **License Claimed** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/license-claimed.jpg) | Someone from your organization has already availed a license | License Dashboard | Reach out to enterprise@devtron.ai for another trial |
| **Invalid License Key** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/invalid-license-key.jpg) | The license key is incorrect or partial | License Activation Page | Go to the License Dashboard and recheck the license |
| **License Key No Longer Valid** <br />  [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/invalid-license-2.jpg) | The license key has become invalid for your installation fingerprint | License Activation Page | Generate a new license from License Dashboard. |
| **Invalid Fingerprint** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/invalid-fingerprint.jpg) | The fingerprint is incorrect or partial | License Dashboard | Go to the License Activation Page and verify the fingerprint |
| **License Has Expired** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/expired-license.jpg) | You have exhausted the free trial | License Activation Page or License Dashboard | Reach out to enterprise@devtron.ai for renewal |
| **License Key Already Exists for Fingerprint** <br /> [Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/ent-trial/key-already-exists.jpg) | You cannot generate more than 1 license key for 1 fingerprint | License Dashboard | Contact Support |