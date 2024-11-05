# Install Dashboard

{% hint style="warning" %}
### Prerequisites
Make sure to meet [all the requirements](./requirements.md) for installing Modern Kubernetes Dashboard.
{% endhint %}

---

## Commands

Use the terminal or CLI to run the following commands:

### Add Helm Repo

```bash
helm repo add devtron https://helm.devtron.ai
```

### Update Helm Repo

```bash
helm repo update devtron
```

### Install Dashboard

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd
```

{% hint style="info" %}
### Having a Multi-Arch Cluster? 
If you wish to install Devtron on clusters with multi-architecture nodes (ARM and AMD), append the Devtron installation command with `--set installer.arch=multi-arch`.
{% endhint %}


### Get Dashboard URL

Run the following command to get the dashboard URL:

```text
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
```

#### Example
Assuming you have an EKS cluster, you might get a similar message as shown below:

```text
[test2@server ~]$ kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
[map[hostname:aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com]]
```

where, hostname `aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com` is the Loadbalancer URL at which you can access the Devtron dashboard.

Moreover, you can also do a CNAME entry corresponding to your domain/subdomain to point to this Loadbalancer URL to access it at a custom domain.

| Host | Type | Points to |
| :--- | :--- | :--- |
| devtron.yourdomain.com | CNAME | aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com |


### Get Admin Login credentials

By default, the username will be `admin`. Run the below command to get the admin password.

```bash
kubectl -n devtroncd get secret devtron-secret \
-o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
```

{% hint style="info" %}
### Recommended Action
When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use it to log in as an administrator. 

After the initial login, we recommend you set up any SSO service like Google, GitHub, etc., and then add other users (including yourself). Subsequently, all the users can use the same SSO (let's say, GitHub) to log in to the Dashboard.
{% endhint %}



