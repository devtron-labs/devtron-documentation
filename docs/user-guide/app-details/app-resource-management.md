# App Resource Management

## Introduction

You can check for vulnerabilities, analyze logs, create ephemeral containers, and manage a few resource kinds directly from the **App Details** page.

![Figure 1: Resource Management](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/resource-management.jpg)

---
## K8s Resources

The following Kubernetes resource kinds are available for you to view and manage in the **K8s Resources** tab:

* Deployment - View the deployment health, manifest and monitor events like creation, updation, deletion, etc., of the resources.

* [Pod](../../reference/glossary.md#pod) - View the currently running pods (both old and new), access pod terminal, view events and manifest associated with the pod, and even delete a pod. 

* [Replica Set](../../reference/glossary.md#replicaset) - View the manifest, events, and the status and health of the replica set. 

* [EndpointSlice](../../reference/glossary.md#endpointslice) - View the manifest, events of the active EndpointSlice. 

* [Endpoints](../../reference/glossary.md#endpoints) - View the endpoints of your pods, their manifest, and their events.

* [Service](../../reference/glossary.md#service) - View the service health, endpoint and endpointSlice information, and their manifest and events.

When you choose a Kubernetes resource kind (e.g., pods), you can perform a few actions against the resource. Refer the following table to know more: 

| **Actions** |**Description**|
|:------------- |:--------------| 
| **Logs** | Choose **Logs** when you want to view the logs of running pods (old and new). The logs that you get when you click **Logs** and the logs you get when you go via **Log Analyzer** are the same. <br/> Note: **Logs** are available only for the **Pod** resource kind. | 
| **Terminal** | Choose **Terminal** when you want to view logs, debug issues, or execute commands directly. Please note that this terminal is different from the cluster terminal that you get on a node level. | 
| **Events** | Choose **Events** when you want to view all the activities (create/update/delete) of the selected pod. | 
| **Manifest** | Choose **Manifest** when you want to view or edit the configuration of the selected pod. | 

![Figure 2: Resource Kinds and Available Actions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/available-actions.jpg)

---
### Check Vulnerabilities

:::caution Prerequisite
To check vulnerabilities, any one of the following integrations must be installed in your Devtron instance:

* [Clair](../../user-guide/integrations/vulnerability-scanning/clair.md) 

* [Trivy](../../user-guide/integrations/vulnerability-scanning/trivy.md) 

:::

One of the primary reasons to check for vulnerabilities is to catch problems in images, or code, or in the Kubernetes manifest before they end up in production. While Code Scan and Kubernetes Manifest Scan are a part of Devtron's Enterprise offering, you can, however, check for vulnerabilities in your images directly from the **App Details** page.

Follow the below steps to check for vulnerabilities: 

1. Choose any one of the following resource kinds from the **K8s Resources** tab: 

    * Deployment

    * Pod

    * ReplicaSet

2. Click the (**&#8942;**) icon against the resource. 

3. Click **Check Vulnerabilities**. The **Security** page will be displayed.

    ![Figure 3: Security Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-details/security-page.jpg)

    From the **Security** page, you can view the scan results categorized by severity. When you click on the image link, you will get an even more detailed scan results, including CVE ID (Common Vulnerabilities and Exposures) and package (the specific place where the vulnerability is present) information. To know more, refer to [Security](../../user-guide/security-features.md).

---
## Log Analyzer 

Log Analyzer in Devtron helps you to manage the logs of multiple pods and services from one place. You can then: 

* Stop the logs

* Clear the logs

* Select the pod for which you'd like to see the logs

* Select the container for which you'd like to see the logs

* Decide how many lines of logs are to be displayed at once 

* Download the logs

* Quickly search for and filter the logs based on your requirement

To know more about analyzing logs, refer to [Logs](../resource-browser/pods.md#logs).

---

## Create Ephemeral Containers 

You create [Ephemeral Containers](https://kubernetes.io/docs/concepts/workloads/pods/ephemeral-containers/) when you want to add a temporary container to a running pod for troubleshooting and debugging purposes. 

:::info 
Ephemeral containers are turned on by default in Kubernetes v1.23 and later

:::

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/TnaHRugYvSI" title="Launching Ephemeral Container from App Details" frameborder="0" allowfullscreen></iframe></div>

Follow the instructions below to create an ephemeral container from the **App Details** page:

1. Navigate to **Applications** and choose your preferred application.

2. Go to the **App Details** tab.

3. Choose **Pod** under the **K8 Resources** tab.

4. Locate the pod you wish to debug. Hover over and click **Terminal**.

    ![Figure 4: Opening a Terminal](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/terminal.jpg)

5. Click **Launch Ephemeral Container**. The **Launch ephemeral container on pod** page is displayed.

    ![Figure 5: Launching an Ephemeral Container](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/launch-ec-new.jpg)

6. Choose **Basic** to create a bare minimum ephemeral container: 

    ![Figure 6: Basic View](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/basic.jpg)

    * Enter a prefix to your ephemeral container, for e.g., *debug* in the **Container name prefix** field.

    * Choose an image to run from the **Image** drop-down box. Ephemeral containers need an image to run and provide the capability to debug, such as `curl`. You can use a custom image too.
    
    * Choose a target container you wish to debug from the **Target Container name**. 

7. Choose **Advanced** if you wish to use labels or annotations to create an ephemeral container since it provides additional key-value options. Refer [Ephemeral Container Spec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.28/#ephemeralcontainer-v1-core) to view the supported options.

    ![Figure 7: Advanced View](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/advanced.jpg)
    
8. Click **Launch Container**.

Refer to [Using Ephemeral Containers](ephemeral-containers.md) for more information.