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

{% embed url="https://www.youtube.com/watch?v=Ml19i29Ivc4" caption="Launching Ephemeral Containers from Resource Browser" %}

To create an ephemeral container from the Resource Browser, refer to [Launching Ephemeral Container](../resource-browser/pods.md#launching-ephemeral-container). 

---

## Create From Cluster Terminal

{% hint style="warning" %}

This is not a recommended method. However, if you still wish to proceed, then this option is available only if you are an [Admin](../global-configurations/authorization/user-access.md).

{% endhint %}

{% embed url="https://www.youtube.com/watch?v=PzB6dFRYe38" caption="Externally Created Ephemeral Container" %}

---

## Remove an Ephemeral Container

You can remove an ephemeral container from either the **App Details** page or the **Resource Browser**.

{% hint style="info" %}

If you had created an ephemeral container using the Kubernetes CLI, then you will not be able to remove the container from the **App Details** page or the **Resource Browser**.

{% endhint %}

{% embed url="https://www.youtube.com/watch?v=tZID0YU0YUU" caption="Deleting Ephemeral Containers" %}