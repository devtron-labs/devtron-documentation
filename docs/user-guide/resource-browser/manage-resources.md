# Discover and Manage Resources 

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have [access to the cluster](../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to discover resources.
{% endhint %}

## Search a Resource

You can use the searchbox to browse the resources.

![Figure 1: Locate Resources using Searchbox](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/discover-resource.gif)

### Filter Resources [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Moreover, you can use filters that allow you to quickly filter your workload as per labels, field selectors, or [CEL expression](https://kubernetes.io/docs/reference/using-api/cel/) as shown below.

{% embed url="https://www.youtube.com/watch?v=E-V-ELCXtfs" caption="Filtering Workloads in Devtron" %}

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

![Figure 2: Resources within Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/cluster-resources.jpg)

---

## Edit a Manifest 

{% hint style="warning" %}
### Who Can Perform This Action?
User needs to be an [admin of the Kubernetes resource](../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to edit its manifest. The fields/paths locked by superadmins in the manifest cannot be edited by non-superadmins.
{% endhint %}

You can edit the [manifest](../../reference/glossary.md#manifest) of a Kubernetes object. This can be for fixing errors, scaling resources, or changing configuration. Moreover, you can edit a manifest [using YAML](#edit-using-yaml) or [GUI](#edit-using-gui), as per your convenience.

### Edit using YAML

![Figure 3a: Editing Manifest (Using YAML)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/edit-live-manifest-yaml.gif)

### Edit using GUI [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

![Figure 3b: Editing Manifest (Using GUI)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/edit-live-manifest-gui.gif)

{% hint style="info" %}
### Note
The fields displayed in GUI mode will be as per the GUI schema configured by the operator for that resource kind.
{% endhint %}

---

## View Events

You can monitor activities like creation, deletion, updation, scaling, or errors in the resources involved. Refer [Events](https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/event-v1/) to learn more.

![Figure 4a: Viewing All Events](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/events.gif)

### AI-assistance on Events [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="info" %}
### How to Configure Devtron Intelligence?
Refer [Devtron Intelligence](../devtron-intelligence.md) to enable this feature.
{% endhint %}

For events with warnings, you can take the assistance of AI. Clicking the **Explain** button will help you identify the root cause of the issue along with suggestions to fix those.

![Figure 4b: AI-assistance](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/ai-assist-eventfix.gif)

---

## Delete a Resource

{% hint style="warning" %}
### Who Can Perform This Action?
User needs to be an [admin of the Kubernetes resource](../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to delete it.
{% endhint %}

You can delete an unwanted resource if it is orphaned and no longer required by your applications.

![Figure 5: Deleting a Resource](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/delete.gif)

---

## Create a Resource

{% hint style="warning" %}
### Who Can Perform This Action?
User needs to be an [admin of the Kubernetes resources](../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to create resources.
{% endhint %}

You can create one or more [Kubernetes objects](../../reference/glossary.md#objects) in your cluster using YAML. In case you wish to create multiple objects, separate each resource definition by three dashes (---).

Once you select a cluster in Resource Browser, click **+ Create Resource**, and add the resource definition.  

In the below example, we have created a simple pod named `nginx`:

![Figure 6: Creating Resources within Cluster](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/create-resource.gif)

Here's one more example that shows the required fields and object specifications for a Kubernetes Deployment:

{% code title="Spec File" overflow="wrap" lineNumbers="true" %}
```yml
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
{% endcode %}

---

## Bulk Actions on Resources [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

You can use the checkbox to select the resources/workloads you wish to delete or restart.

### Bulk Delete

![Figure 7a: Deleting Resources in Bulk](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/bulk-delete-resources.gif)

### Bulk Restart

![Figure 7b: Restarting Workloads in Bulk](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/bulk-restart-resources.gif)

{% hint style="info" %}
### Note
You can only restart certain workloads such as Deployment, DaemonSet, StatefulSet, etc. and not all resource types.
{% endhint %}