# App Resource Management

## Introduction

You can check for vulnerabilities, analyze logs, create ephemeral containers, and manage a few resource kinds directly from the **App Details** page.

![Figure 1: Resource Management]()

---
## K8s Resources
<!-- 
Talks about: 
    1. Available resource kinds
    2. Logs
    3. Terminal 
    4. Events
    5. Manifests 
    6. New pods/Old pods
    7. Delete a pod
-->

The following Kubernetes resource kinds are available for you to view and manage in the **K8s Resources** tab:

* Deployment - View the deployment health, manifest and monitor events like creation, updation, deletion, etc., of the resources.

* [Pod](../../reference/glossary.md#pod) - View the currently running pods (both old and new), access pod terminal, view events and manifest associated with the pod, and even delete a pod. 

* [Replica Set](../../reference/glossary.md#replicaset) - View the manifest, events, and the status and health of the replica set. 

* [EndpointSlice](../../reference/glossary.md#endpointslice) - View the manifest, events of the active EndpointSlice. 

* [Endpoints](../../reference/glossary.md#endpoints) - View the endpoints of your pods, its manifest and events.

* [Service](../../reference/glossary.md#service) - View the service health, endpoint and endpointSlice information, and their manifest and events.

![Figure : Resource Kinds and Available Actions]()

When you choose a Kubernetes resource kind (e.g., pods), you can perform a few actions against the resource. Refer the following table to know more: 

| **Actions** |**Description**|
|:------------- |:--------------| 
| **Logs** | Choose **Logs** when you want to view the logs of running pods (old and new). The logs that you get when you click **Logs** and the logs you get when you go via **Log Analyser** are the same. <br /> Note: **Logs** are available only for the **Pod** resource kind. | 
| **Terminal** | Choose **Terminal** when you want to view logs, debug issues, or execute commands directly. Please note that this terminal is different from the cluster terminal that you get on a node level. | 
| **Events** | Choose **Events** when you want to view all the activities (create/update/delete) of the selected pod. | 
| **Manifest** | Choose **Manifest** when you want to view or edit the configuration of the selected pod. | 


---
### Check Vulnerabilities
<!-- Talks about the check the vulnerability feature; will address the prerequisites, if any. -->

---
## Log Analyzer 
<!-- Talks about everything in that section --> 

### Create Ephemeral Containers 
<!-- (understand what it is) -->

---
## Next Steps