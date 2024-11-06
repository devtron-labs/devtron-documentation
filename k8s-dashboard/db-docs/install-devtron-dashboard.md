# Install Dashboard

{% hint style="warning" %}
### Prerequisites
Make sure to meet [all the requirements](./requirements.md) for installing Modern Kubernetes Dashboard.
{% endhint %}

---

## 1. Add Helm Repo

```bash
helm repo add devtron https://helm.devtron.ai
```

---

## 2. Update Helm Repo

```bash
helm repo update devtron
```

---

## 3. Install Dashboard

{% hint style="info" %}
### Having a Multi-Arch Cluster? 
If you wish to install Devtron on clusters with multi-architecture nodes (ARM and AMD), append the Devtron installation command with `--set installer.arch=multi-arch`.
{% endhint %}

Check the installation steps for your cluster:
* [For Amazon EKS, Azure AKS, Google GKE Users](#for-amazon-eks-azure-aks-google-gke-users)
* [For Minikube, MicroK8s, Kind, K3s Users](#for-minikube-microk8s-kind-k3s-users)
* [For Cloud VM Users (AWS EC2, Azure VM, GCP VM)](#for-cloud-vm-users-aws-ec2-azure-vm-gcp-vm)

### For Amazon EKS, Azure AKS, Google GKE Users

```bash
helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd
```

### For Minikube, MicroK8s, Kind, K3s Users

{% tabs %}
{% tab title="Minikube/MicroK8s/Kind Cluster" %}

To install on **Minikube/MicroK8s/Kind/** cluster, run the following command:

```bash
helm repo add devtron https://helm.devtron.ai

helm repo update devtron

helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort 
```

{% endtab %}
{% tab title="k3s Cluster" %}

To install on **k3s** cluster, run the following command:

```bash
kubectl apply -f https://raw.githubusercontent.com/rancher/local-path-provisioner/master/deploy/local-path-storage.yaml

helm repo add devtron https://helm.devtron.ai

helm repo update devtron

helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort
```

{% endtab %}
{% endtabs %}

### For Cloud VM Users (AWS EC2, Azure VM, GCP VM)

It is recommended to use Cloud VM with 2vCPU+, 4GB+ free memory, 20GB+ storage, Compute Optimized VM type, and Ubuntu Flavoured OS.

#### Create MicroK8s Cluster

```bash
sudo snap install microk8s --classic --channel=1.22
sudo usermod -a -G microk8s $USER
sudo chown -f -R $USER ~/.kube
newgrp microk8s
microk8s enable dns storage helm3
echo "alias kubectl='microk8s kubectl '" >> .bashrc
echo "alias helm='microk8s helm3 '" >> .bashrc
source .bashrc
```

#### Run the Installation Commands

```bash
helm repo add devtron https://helm.devtron.ai

helm repo update devtron

helm install devtron devtron/devtron-operator \
--create-namespace --namespace devtroncd \
--set components.devtron.service.type=NodePort 
```



### 4. Get Dashboard URL

### For Amazon EKS, Azure AKS, Google GKE Users

Run the following command to get the dashboard URL:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
```

### For Minikube, MicroK8s, Kind, K3s Users

{% tabs %}
{% tab title="Minikube" %}

To access the dashboard on **Minikube** cluster, run the following command:

```bash
minikube service devtron-service --namespace devtroncd
```

This will directly open the dashboard URL on your browser

{% endtab %}
{% tab title="MicroK8s/Kind/k3s Cluster" %}

To install on **MicroK8s/Kind/K3s** cluster, run the following command to port-forward the devtron service to port 8000:

```bash
kubectl -n devtroncd port-forward service/devtron-service 8000:80
```

After port-fowarding, you can access the dashboard on this URL: http://127.0.0.1:8000

{% endtab %}
{% endtabs %}

### For Cloud VM Users (AWS EC2, Azure VM, GCP VM)

Get devtron-service port number using the following command:

```bash
kubectl get svc -n devtroncd devtron-service -o jsonpath='{.spec.ports[0].nodePort}'
```

Make sure that the port on which the devtron-service runs remain open in the VM's security group or network security group.

The dashboard URL will be: http://<*HOST_IP*>:<*nodeport*>/dashboard

<!-- #### Example
Assuming you have an EKS cluster, you might get a similar message as shown below:

```text
[test2@server ~]$ kubectl get svc -n devtroncd devtron-service -o jsonpath='{.status.loadBalancer.ingress}'
[map[hostname:aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com]]
```

where, hostname `aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com` is the Loadbalancer URL at which you can access the Devtron dashboard.

Moreover, you can also do a CNAME entry corresponding to your domain/subdomain to point to this Loadbalancer URL to access it at a custom domain.

| Host | Type | Points to |
| :--- | :--- | :--- |
| devtron.yourdomain.com | CNAME | aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com | -->


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


