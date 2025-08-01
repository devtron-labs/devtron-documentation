# Install Devtron

## Introduction 

In this section, we describe on how you can install Modern Kubernetes Dashboard without any integrations. Integrations can be added later using [Devtron Stack Manager](../../user-guide/stack-manager.md).

If you want to install Devtron on Minikube, Microk8s, K3s, Kind, refer this [section](./Install-devtron-on-Minikube-Microk8s-K3s-Kind.md).

{% hint style="success" %}

Try Devtron Enterprise for free — unlock advanced features built for scale. [Start Free Trial](https://license.devtron.ai/dashboard)

{% endhint %}

{% hint style="warning" %}

### Prerequisites 

Ensure you meet [all the requirements](../getting-started/getting-started.md#prerequisites) for installing Modern Kubernetes Dashboard.

{% endhint %}

---

## Add Helm Repo

```bash
helm repo add devtron https://helm.devtron.ai
```

---

## Update Helm Repo
```bash
helm repo update devtron
```
---

## Install Modern Kubernetes Dashboard

**Note**: This installation command will not install CI/CD integration. For CI/CD, refer [install Devtron with CI/CD](../install/install-devtron-with-cicd.md) section.

Run the following command to install Modern Kubernetes Dashboard:

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd
```

<!-- ## Install Multi-Architecture Nodes (ARM and AMD)

To install Devtron on clusters with the multi-architecture nodes (ARM and AMD), append the Devtron installation command with `--set installer.arch=multi-arch`.

[//]: # (If you are planning to use Hyperion for `production deployments`, please refer to our recommended overrides for [Devtron Installation]&#40;override-default-devtron-installation-configs.md&#41;.)

[//]: # (## Installation status)

[//]: # ()
[//]: # (Run following command)

[//]: # ()
[//]: # (```bash)

[//]: # (kubectl -n devtroncd get installers installer-devtron -o jsonpath='{.status.sync.status}')

[//]: # (```) -->

---

## Devtron Dashboard

Run the following command to get the dashboard URL:

```text
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
```

You will get the result something as shown below:

```text
[test2@server ~]$ kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
[map[hostname:aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com]]
```

The hostname `aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com` as mentioned above is the Loadbalancer URL where you can access the Devtron dashboard.

> You can also do a CNAME entry corresponding to your domain/subdomain to point to this Loadbalancer URL to access it at a custom domain.

| Host | Type | Points to |
| :--- | :--- | :--- |
| devtron.yourdomain.com | CNAME | aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com |

---

## Devtron Admin credentials

When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use that credentials to log in as an administrator. 

**Username**: `admin` <br>
**Password**: Run the following command to get the admin password:

```bash
kubectl -n devtroncd get secret devtron-secret \
-o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
```

{% hint style="info" %}

### Next Recommended Action

When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use it to log in as an administrator.

After the initial login, we recommend you set up any [Single Sign-On (SSO)](../../user-guide/global-configurations/sso-login.md) service like Google, GitHub, etc., and then add other users (including yourself). Subsequently, all the users can use the same SSO (e.g., GitHub) to log in to the Dashboard.

{% endhint %}

---

## Upgrade

If required, you can install other integrations (e.g., [Build and Deploy (CI/CD)](../../user-guide/integrations/build-and-deploy-ci-cd.md) or [GitOps (Argo CD)](../../user-guide/integrations/argocd.md)) from the Devtron Stack Manager. Refer to [Devtron Stack Manager](../../user-guide/integrations/README.md) for more information. 

{% hint style="info" %}

If you have any questions, please let us know on our Discord channel. [![Join us on Discord](https://img.shields.io/badge/Join%20us%20on-Discord-e01563.svg)](https://discord.gg/jsRG5qx2gp)

{% endhint %}