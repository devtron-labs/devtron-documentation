# Using Ephemeral Containers

## Introduction

An ephemeral container runs temporarily in an existing running pod primarily for debugging and troubleshooting purposes. When your pod(s) crash or your application misbehaves, but you can't restart the workloads for various reasons, you create an ephemeral container.  

In Devtron, you can create an ephemeral container in the following ways:

* [From App Details Page](#create-from-app-details-page)

* [From Resource Browser](#create-from-resource-browser)

* [From Cluster Terminal](#create-from-cluster-terminal)

---

## Create From App Details Page

You can quickly create an ephemeral container directly from the **App Details** page of your application. Refer to [Create Ephemeral Containers](app-resource-management.md#create-ephemeral-containers) for more information.

---

## Create From Resource Browser

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/Ml19i29Ivc4" title="Launching Ephemeral Containers from Resource Browser" frameborder="0" allowfullscreen></iframe></div>

To create an ephemeral container from the Resource Browser, refer to [Launching Ephemeral Container](../resource-browser/pods.md#launching-ephemeral-container). 

---

## Create From Cluster Terminal

:::caution 
This is not a recommended method. However, if you still wish to proceed, then this option is available only if you are an [Admin](../global-configurations/authorization/user-access.md).

:::

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/PzB6dFRYe38" title="Externally Created Ephemeral Container" frameborder="0" allowfullscreen></iframe></div>

---

## Remove an Ephemeral Container

You can remove an ephemeral container from either the **App Details** page or the **Resource Browser**.

:::info 
If you had created an ephemeral container using the Kubernetes CLI, then you will not be able to remove the container from the **App Details** page or the **Resource Browser**.

:::

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/tZID0YU0YUU" title="Deleting Ephemeral Containers" frameborder="0" allowfullscreen></iframe></div>