# Discover and Manage Resources 

:::caution Who Can Perform This Action?
Users need to have [access to the cluster](../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to discover resources.
:::

## Search a Resource

You can use the searchbox to browse the resources.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/discover-resource.gif)
<center>Figure 1: Locate Resources using Searchbox</center>

### Filter Resources <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Moreover, you can use filters that allow you to quickly filter your workload as per labels, field selectors, or [CEL expression](https://kubernetes.io/docs/reference/using-api/cel/) as shown below.

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/E-V-ELCXtfs" title="Filtering Workloads in Devtron" frameborder="0" allow="fullscreen"></iframe></div>

### Resource Kinds

Resource kinds displayed upfront for you to manage:

* Nodes
* Events
* Namespaces

Further resources in the cluster are grouped under the following categories:

* Namespace
* Workloads
* Config & Storage
* Networking
* RBAC
* Administration
* Other Resources
* Custom Resource

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/cluster-resources.jpg)
<center>Figure 2: Resources within Cluster</center>

---

## Edit a Manifest 

:::caution Who Can Perform This Action?
User needs to be an [admin of the Kubernetes resource](../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to edit its manifest. The fields/paths locked by superadmins in the manifest cannot be edited by non-superadmins.
:::

You can edit the [manifest](../../reference/glossary.md#manifest) of a Kubernetes object. This can be for fixing errors, scaling resources, or changing configuration. Moreover, you can edit a manifest [using YAML](#edit-using-yaml) or [GUI](#edit-using-gui-), as per your convenience.

### Edit using YAML

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/edit-live-manifest-yaml.gif)
<center>Figure 3a: Editing Manifest (Using YAML)</center>

### Edit using GUI <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/edit-live-manifest-gui.gif)
<center>Figure 3b: Editing Manifest (Using GUI)</center>

:::info Note
The fields displayed in GUI mode will be as per the GUI schema configured by the operator for that resource kind.
:::

---

## View Events

You can monitor activities like creation, deletion, updation, scaling, or errors in the resources involved. Refer [Events](https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/event-v1/) to learn more.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/events.gif)
<center>Figure 4a: Viewing All Events</center>

### AI-assistance on Events <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

:::info How to Configure Devtron Intelligence?
Refer [Devtron Intelligence](../devtron-intelligence.md) to enable this feature.
:::

For events with warnings, you can take the assistance of AI. Clicking the **Explain** button will help you identify the root cause of the issue along with suggestions to fix those.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/ai-assist-eventfix.gif)
<center>Figure 4b: AI-assistance</center>

---

## Delete a Resource

:::caution Who Can Perform This Action?
User needs to be an [admin of the Kubernetes resource](../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to delete it.
:::

You can delete an unwanted resource if it is orphaned and no longer required by your applications.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/delete.gif)
<center>Figure 5: Deleting a Resource</center>

---

## Create a Resource

:::caution Who Can Perform This Action?
User needs to be an [admin of the Kubernetes resources](../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to create resources.
:::

You can create one or more [Kubernetes objects](../../reference/glossary.md#objects) in your cluster using YAML. In case you wish to create multiple objects, separate each resource definition by three dashes (---).

Once you select a cluster in Resource Browser, click **+ Create Resource**, and add the resource definition.  

In the below example, we have created a simple pod named `nginx`:

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/create-resource.gif)
<center>Figure 6: Creating Resources within Cluster</center>

Here's one more example that shows the required fields and object specifications for a Kubernetes Deployment:

```yml title="Spec File" showLineNumbers
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels: 
     app: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
       app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
       - name: nginx
         image: nginx:1.14.2
         ports:
         - containerPort: 80
```


---

## Bulk Actions on Resources <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

You can use the checkbox to select the resources/workloads you wish to delete or restart.

### Bulk Delete

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/bulk-delete-resources.gif)
<center>Figure 7a: Deleting Resources in Bulk</center>

### Bulk Restart

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/infra-management/resource-browser+/manage-resources/bulk-restart-resources.gif)
<center>Figure 7b: Restarting Workloads in Bulk</center>

:::info Note
You can only restart certain workloads such as Deployment, DaemonSet, StatefulSet, etc. and not all resource types.
:::