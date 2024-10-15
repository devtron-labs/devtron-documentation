# Pods

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have [access to the cluster](../../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to view its pods and its data.
{% endhint %}

## Manifest

Shows you the [configuration](../../../reference/glossary.md#manifest) of the selected pod and allows you to edit it. Refer [Edit Manifest](#edit-manifest) to learn more.

---

## Events

Shows you all the activities (create/update/delete) of the selected pod. Refer [View Events](#view-events) to know more.

---

## Logs

Examining your cluster's pods helps you understand the health of your application. By inspecting pod logs, you can check the performance and identify if there are any failures. This is especially useful for debugging any issues effectively.

Moreover, you can download the pod logs for ease of sharing and troubleshooting as shown in the below video.

{% embed url="https://www.youtube.com/watch?v=PP0ZKAZCT58" caption="Downloading Pod Logs" %}

### Pod Last Restart Snapshot [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Frequent pod restarts can impact your application as it might lead to unexpected downtimes. In such cases, it is important to determine the root cause and take actions (both preventive and corrective) if needed.

In case any of your pod restarts, you can view its details from the pod listing screen:
* Last pod restart event, along with the timestamp and message
* Reason behind restart
* Container log before restart
* Node status and events  

![Figure 1: Checking Restart Pod Log](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/restart-pod-log.gif)

---

## Terminal

{% hint style="warning" %}
### Who Can Perform This Action?
User needs to be an [admin of the Kubernetes resource](../../global-configurations/authorization/user-access.md#kubernetes-resources-permissions) to access pod terminal.
{% endhint %}

You can access the terminal within a running container of a pod to view its logs, troubleshoot issues, or execute commands directly. This is different from the [cluster terminal](#cluster-terminal) you get at node level. 

### Launching Ephemeral Container

This is a part of [Pod Terminal](#pod-terminal). It is especially useful when `kubectl exec` is insufficient because a container has crashed or a container image doesn't include debugging utilities.

{% embed url="https://www.youtube.com/watch?v=Ml19i29Ivc4" caption="Launching Ephemeral Containers from Resource Browser" %}

1. In the Resource Browser, select **Pod** within `Workloads`.
2. Use the searchbar to find and locate the pod you wish to debug. Click the pod.
3. Go to the **Terminal** tab 
4. Click **Launch Ephemeral Container** as shown below.

    You get 2 tabs:
    1. **Basic** - It provides the bare minimum configurations required to launch an ephemeral container.

    ![Figure 2: Basic Tab](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/debugging-deployment-and-monitoring/basic.jpg)

    It contains 3 mandatory fields:

    * **Container name prefix** - Type a prefix to give to your ephemeral container, for e.g., *debug*. Your container name would look like `debug-jndvs`.

    * **Image** - Choose an image to run from the dropdown. Ephemeral containers need an image to run and provide the capability to debug, such as `curl`. You can use a custom image too.
    
    * **Target Container name** - Since a pod can have one or more containers, choose a target container you wish to debug, from the dropdown.

    2. **Advanced** - It is particularly useful for advanced users that wish to use labels or annotations since it provides additional key-value options. Refer [Ephemeral Container Spec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.28/#ephemeralcontainer-v1-core) to view the supported options.
    
{% hint style="info" %}
Devtron ignores the 'command' field while launching an ephemeral container
{% endhint %}