---
title: Download Content from Pods
description: Learn how to download files such as logs, configurations, and diagnostic outputs directly from a Pod Terminal (via App Details or Resource Browser) or Cluster Terminal in Devtron without using external CLI tools.
sidebar_label: Download Content from Pods
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Download Content from Pods

:::info Who Can Perform This Action?
The permission required depends on how you access the Pod Terminal:

| Access Path | Required Permission |
|---|---|
| App Details → Pod → Terminal | **Admin** access on the specific application |
| Resource Browser → Pods → Terminal | [Admin access on the Kubernetes resource](https://docs.devtron.ai/docs/user-guide/global-configurations/authorization/permission-groups#kubernetes-resources-permissions) |
| Resource Browser → Cluster Terminal | [Admin access of all the K8s resources of that cluster](https://docs.devtron.ai/docs/user-guide/global-configurations/authorization/permission-groups#kubernetes-resources-permissions) |
:::

## Introduction

While debugging Kubernetes clusters or pods, the workflow often requires exec-ing into a container and running commands to identify issues. Once the root cause is found, there is frequently a need to retrieve files from within the container — such as log files, configuration files, or diagnostic outputs — to share with teammates or archive for further analysis.

Devtron provides **built-in support** across **three access points** to download files directly to your local system, without needing `kubectl cp` or any external CLI tooling:

- **App Details → Pod → Terminal** — for downloading files from pods belonging to a specific application
- **Resource Browser → Pods → Terminal** — for downloading files from any pod across any cluster
- **Resource Browser → Cluster Terminal** — for downloading files at the node level

**Common use cases include:**

- Downloading application log files generated inside a container
- Retrieving runtime configuration files for auditing
- Exporting diagnostic outputs after a debugging session
- Sharing troubleshooting artifacts with your team

---

## Prerequisites

Before you can download content from a pod, ensure the following:

- To download via **App Details**, you have **Admin** access on the specific application.
- To download via **Resource Browser** or **Cluster Terminal**, you have [Admin access on the Kubernetes resource](https://docs.devtron.ai/docs/user-guide/global-configurations/authorization/permission-groups#kubernetes-resources-permissions).
- The pod you want to access is in a **Running** state.
- The file you want to download exists at a known path inside the container.

---

## Steps to Download Content from a Pod

You can access the Pod Terminal and download content from two different places in Devtron — choose the one that fits your workflow:

<Tabs>
<TabItem value="app-details" label="Via App Details" default>

Use this path when you are debugging a **specific application** and want to download files from one of its running pods.

### Step 1 — Navigate to App Details

Go to **Applications** and click the application whose pod you want to access.

In the application overview, click **App Details**.

<video width="100%" controls>
  <source src="https://cdn.devtron.ai/videos/FromAppDetailsPage.mov" type="video/mp4" />
  Your browser does not support the video tag.
</video>

*Figure 1: Downloading content from a pod via App Details*

---

### Step 2 — Locate the Pod

1. Scroll down to the **K8s Resources** section on the App Details page.
2. Click on **Pods** to expand the pod list for the application.
3. Identify the pod you want to access and click on it to open its details.

---

### Step 3 — Open the Pod Terminal

1. In the pod details panel, click the **Terminal** tab.
2. Select the **Container** from the dropdown (for pods with multiple containers).
3. Select the **Shell** type — `sh` or `bash` — depending on what is available in the container image.

:::info
If you are unable to connect, try switching the shell type. Not all container images include both `sh` and `bash`.
:::

The terminal session will open inside the running container.

---

### Step 4 — Download the File

Once you are inside the pod terminal:

1. Confirm the path of the file you want to download. For example:

    ```bash
    ls /var/log/app/
    ```

2. Click the **Download** icon (↓) in the terminal toolbar.

3. In the dialog that appears, enter the **absolute path** of the file inside the container. For example:

    ```
    /var/log/app/application.log
    ```

4. Click **Download**. The file will be transferred to your local system automatically.

</TabItem>

<TabItem value="resource-browser" label="Via Resource Browser">

Use this path when you want to access **any pod across any cluster**, regardless of which application it belongs to.

### Step 1 — Navigate to the Resource Browser

Go to **Infrastructure Management** → **Resource Browser** and select the cluster containing the pod you want to access.

<video width="100%" controls>
  <source src="https://cdn.devtron.ai/videos/ResourceBrowserPods.mov" type="video/mp4" />
  Your browser does not support the video tag.
</video>

*Figure 2: Downloading content from a specific pod via Resource Browser*

---

### Step 2 — Locate the Pod

1. In the left sidebar under **K8s Resources**, expand **Workloads**.
2. Click **Pod**.
3. Use the search bar to find the pod you wish to access.
4. Click the pod name to open its details panel.

---

### Step 3 — Open the Pod Terminal

1. In the pod details panel, click the **Terminal** tab.
2. Select the **Container** from the dropdown (for pods with multiple containers).
3. Select the **Shell** type — `sh` or `bash` — depending on what is available in the container image.

:::info
If you are unable to connect, try switching the shell type. Not all container images include both `sh` and `bash`.
:::

The terminal session will open inside the running container.

---

### Step 4 — Download the File

Once you are inside the pod terminal:

1. Confirm the path of the file you want to download. For example:

    ```bash
    ls /var/log/app/
    ```

2. Click the **Download** icon (↓) in the terminal toolbar.

3. In the dialog that appears, enter the **absolute path** of the file inside the container. For example:

    ```
    /var/log/app/application.log
    ```

4. Click **Download**. The file will be transferred to your local system automatically.

</TabItem>
</Tabs>

---

## Downloading from the Cluster Terminal

The download feature is also available at the **Cluster Terminal** level (node-level access), in addition to the Pod Terminal.

To access the Cluster Terminal:

1. In the Resource Browser, click the **Terminal** icon (⌨) on the right side of the cluster row.
2. Select a **Node**, **Namespace**, **Image**, and **Shell** from the dropdowns.
3. Use the **Download** icon in the toolbar to download files from the node.

<video width="100%" controls>
  <source src="https://cdn.devtron.ai/videos/DownloadFromPod.mov" type="video/mp4" />
  Your browser does not support the video tag.
</video>

*Figure 3: Downloading content via the Cluster Terminal*

Refer to [Cluster Terminal](https://docs.devtron.ai/docs/user-guide/resource-browser/cluster-terminal) for more details on node-level access.

---

## What You Can Download

| File Type | Example Path |
|---|---|
| Application log files | `/var/log/app/application.log` |
| Configuration files | `/etc/myapp/config.yaml` |
| Diagnostic outputs | `/tmp/debug-output.txt` |
| Any accessible file | Any path readable by the container process |

:::note
You can only download files that are accessible within the container's filesystem. Files on volumes not mounted to that container, or files requiring elevated permissions beyond the container's process user, may not be downloadable.
:::

---

## Troubleshooting

| Issue | Possible Cause | Resolution |
|---|---|---|
| Terminal does not connect | Shell (`bash`/`sh`) not present in image | Switch to a different shell from the dropdown |
| Download dialog does not appear | File path is incorrect or file does not exist | Verify the path inside the terminal first with `ls` |
| File downloads as empty | File is being actively written to | Wait for the write operation to complete, then retry |
| Permission denied on file | Container process lacks read access | Use an ephemeral container with appropriate permissions |

---

## Related Topics

- [App Details](https://docs.devtron.ai/docs/user-guide/application-management/app-details)
- [Pod Management and Debugging](https://docs.devtron.ai/docs/user-guide/resource-browser/pods)
- [Cluster Terminal](https://docs.devtron.ai/docs/user-guide/resource-browser/cluster-terminal)
- [Launching Ephemeral Container](https://docs.devtron.ai/docs/user-guide/resource-browser/pods#launching-ephemeral-container)
- [Kubernetes Resources Permissions](https://docs.devtron.ai/docs/user-guide/global-configurations/authorization/permission-groups#kubernetes-resources-permissions)