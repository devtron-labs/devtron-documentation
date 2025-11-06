# Running Kubectl Commands Locally 

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

If you wish to run kubectl commands from your local system, you need to have access to your cluster. Traditionally, the kubeconfig file (`./kube/config`) helps you connect with the cluster from your local system.

![Figure 21: Kubeconfig File](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/kubeconfig.jpg)

---

## Challenges in Kubeconfig

Kubeconfig becomes painstakingly difficult to maintain especially when it comes to:
* Granting or revoking access to the cluster for multiple people
* Changing the permissions and subsequently the access token
* Adding/Updating/Deleting the entries of cluster URLs and tokens
* Keeping a record of multiple kubeconfig files

---

## Our Solution

Devtron helps in reducing the challenges and simplifying the maintenance of kubeconfig file through:
* **Devtron's Proxy URL for Cluster** - A standardized URL that you can use in place of your Kubernetes cluster URL.
* **Devtron's Access Token** - A kubectl-compatible token which can be generated and centrally maintained from [Global Configurations → Authorization → API tokens](../global-configurations/authorization/api-tokens.md).

---

## Steps

**Prerequisite**: An [API token with necessary permissions](../global-configurations/authorization/api-tokens.md) for the user(s) to access the cluster. 

If you are not a super-admin and can't generate a token yourself, you can find the session token (argocd.token) using the Developer Tools available in your web browser as shown below.

![Figure 22: Using Session Token](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/argocd-token-v1.gif)

There are 2 methods of getting kubeconfig in your system:
* [Quick Method](#quick-method)
* [Manual Method](#manual-method)

### Quick Method

1. In Resource Browser, hover on the cluster name and click the `Get kubeconfig` icon. 

  ![Figure 23: Get Kubeconfig](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/getkubeconfig.gif)

2. Copy the commands and run them on your terminal.


### Manual Method

1. Go to `~/.kube` folder on your local machine and open the `config` file. Or you may create one with the following content:

  ```yaml title="Sample Kubeconfig" showLineNumbers
  apiVersion: v1
  kind: Config
  clusters:
  - cluster:
      insecure-skip-tls-verify: true
      server: https://<devtron_host_name>/orchestrator/k8s/proxy/cluster/<cluster_name>
    name: devtron-cluster
  contexts:
  - context:
      cluster: devtron-cluster
      user: admin
    name: devtron-cluster
  current-context: devtron-cluster
  users:
  - name: admin
    user:
      token: <devtron_token>
  ```
  

2. Edit the following placeholders in the `server` field and the `token` field:

  | Placeholder         | Description                         | Example          | Where to Find      |
  | ------------------- | ----------------------------------- | ---------------- | ------------------ |
  | `<devtron_host_name>` | Hostname of the Devtron server      | demo.devtron.ai  | [Host URL Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/hostname-page.jpg)      |
  | `<cluster_name>`      | Name of the cluster (or cluster ID) | devtron-cluster  | [Applications Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/applications-page.jpg)  |
  | `<devtron_token>`     | API token or session token          | \-               | [Authorization Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/authorization-page.jpg) |

  ![Figure 23: Editing Kubeconfig File](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/kubeconfig.gif)

3. Test the connection to the cluster by running any kubectl command, e.g., `kubectl get ns` or `kubectl get po -A`

:::info Additional References
Once the connection is successful, you may run any [kubectl operations](https://kubernetes.io/docs/reference/kubectl/#operations) from your system.
:::

---

## Use Case - Port Forwarding <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Assume your applications are running in a Kubernetes cluster on cloud. Now, if you wish to test or debug them on your local machine, you can perform [port forwarding](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/). It creates a tunnel between a port on your machine and a port on a resource within your cluster. Therefore, you can access applications running inside the cluster as though they are running locally on your machine.

Once you have successfully connected to the cluster, you may run the port-forward command. Refer [kubectl port-forward](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_port-forward/) to see a few examples.

![Figure 24: Example - Port Forwarding](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/port-forward.gif)