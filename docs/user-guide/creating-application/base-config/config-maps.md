# ConfigMaps

A ConfigMap stores key-value pairs (non-sensitive data) that your applications can use as environment variables or mounted files. You can update configurations without modifying or rebuilding your container images, thus making the deployments more efficient.

## Add ConfigMap

1. Go to **Application Management** → **Applications** → **Devtron Apps** (tab) → (Select Your App)

2. Go to **Configurations** (tab) → **Base Configurations**.

    ![Figure 1: Application's 'Configurations' Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/appconfig-page.jpg)

3. Click the **+** button next to **ConfigMaps**.

    ![Figure 2: Adding ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/config-map.jpg)

4. **Data Type** - Choose between the following data types:

    * [Kubernetes ConfigMap](#kubernetes-configmap) - When you want to create a ConfigMap that is specific to an application and is managed within the cluster

    * [Kubernetes External ConfigMap](#kubernetes-external-configmap) - When you want to create a ConfigMap outside the cluster to use it across environments and applications

### Kubernetes ConfigMap

Kubernetes ConfigMap stores and manages non-sensitive data such as application settings, environment variables, etc. When you want to create a configuration that is specific to a cluster or an environment, you create a Kubernetes ConfigMap. 

Follow the instructions below to create a Kubernetes ConfigMap:

1. Select **Kubernetes ConfigMap** as the Data Type.

2. **Name** - Provide a name to your ConfigMap (cannot be changed later).

    ![Figure 3: Naming the ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/created-configmap.gif)

3. **Mount data as** - Select how you want to mount the ConfigMap:

    * **Environment Variable** – Select this option if you want to inject Environment Variables in pods using ConfigMap.

    * **Data Volume** – Select this option, if you want to configure a Data Volume that is accessible to Containers running in a pod and provide a Volume mount path. Go to [Data Volume](#mount-data-as-data-volume) to know more.

4. Enter data in:
   * **GUI mode** – User-friendly interface. Click **+Add** button and enter the **Key** and **Value** fields without quotes. 
   * **YAML mode** – Raw YAML for entering key-value pairs in the format **`key: value`**. Boolean and numeric values must be wrapped in double quotes.

   <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/QfJqX6KM2lU" title="" frameborder="0" allowfullscreen></iframe></div>

5. You may [perform a dry run](#perform-a-dry-run) before clicking **Save**.


### Kubernetes External ConfigMap

Kubernetes External ConfigMap is usually created to reuse a configMap outside the cluster (e.g., from another namespace or an application). You create an external ConfigMap when you want to use the same ConfigMap across multiple applications or environments. Follow the below steps to create an external ConfigMap:

1. Select **Kubernetes External ConfigMap** as the Data Type.

2. **Name** - Since you are using Kubernetes External ConfigMap, make sure you give the name of ConfigMap the same as the name given using `kubectl create configmap <configmap-name> <data source>` command, otherwise, it might result in an error during the build.

3. Mount data as: **Environment Variable** or [Data Volume](#mount-data-as-data-volume)

4. Click **Save**.

---

## Mount Data as Data Volume

### Mount ConfigMap Data

![Figure 4: Selecting Data Volume Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/cm-data-volume.jpg)

In the above example, we have seen how to pass environment variables in your ConfigMap. Additionally, there is an option to mount a ConfigMap by passing its content to a file. The content could be a plain text, json, yaml, bash script, etc. You can do so by selecting the `Data Volume` option in **Mount data as**.

The key of the ConfigMap should be your filename and the value of the ConfigMap should be your file content. In the below example, you `file.json` is the key, and the json content is the value of that ConfigMap (below the pipe (**|**) symbol). This file will be created on your specified [volume mount path](#volume-mount-path).

![Figure 5: Adding File Content](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/filecontent-cm.jpg)

### Volume Mount Path

Enter the folder path where the data volume should be mounted for it to be accessible to the containers running in a pod. Your keys will be mounted as files to that volume.

### Set Sub Path

When mounting multiple files to the same location, you can use the **Set Sub Path** option to control how the files are handled. This setting allows you to control whether existing files are overwritten or preserved when mounting new files.

* If **Set Sub Path** is enabled, the system will preserve existing files in the [specified path](#volume-mount-path) and append the new file using the file name as a sub-path.

* If **Set Sub Path** is disabled (unchecked), the system will delete any files already present in the [specified path](#volume-mount-path) and then mount the new files.

:::info Note
In case of Kubernetes ConfigMap, all keys will be mounted as files on the specified path.

In case of Kubernetes External ConfigMap, manually specify the keys which should be mounted as files.

:::


### Set File Permission

The **Set File Permission** option applies permissions at the ConfigMap level, not to individual keys within the ConfigMap. Enabling this option will let you enter a 3-digit standard permission value to control access to the file.

The 3-digit numeric value represents the permission settings for the file:

* **First digit**: Owner permissions (user).
* **Second digit**: Group permissions.
* **Third digit**: Other users' permissions.

| **Permission** | **Description**                                |
|----------------|------------------------------------------------|
| **r** (read)   | Grants the ability to read the file.           |
| **w** (write)  | Grants the ability to modify the file.         |
| **x** (execute)| Grants the ability to execute the file as a program. |

For example, **755** means:
* Owner can read, write, and execute (7),
* Group can read and execute (5),
* Others can read and execute (5).

---

## Perform a Dry Run

Before saving your configured ConfigMap, you can use the **Dry Run** option (as shown below) to preview the final Kubernetes manifest.

This feature helps you verify your configurations, detect issues, and ensure correctness.

![Figure 6: Performing a Dry Run](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/dry-run-cm.gif)

Your configurations will appear in the left pane, while the right pane will display a section named `Manifest generated from merged` showing the computed Kubernetes manifest.

---

## Update ConfigMap

1. Click your ConfigMap available inside the list of **ConfigMaps** inside **Base Configurations**.
2. Modify its values.
3. Click **Update**.

:::caution Note
You cannot change the name of a ConfigMap. Create a new ConfigMap instead.
:::

![Figure 7: Updating Existing ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/update_configmap.jpg)

---

## Delete ConfigMap

You may delete a ConfigMap if not in use anymore. Once a ConfigMap is deleted, it will not be used in future deployments.

1. Click your ConfigMap available inside the list of **ConfigMaps** inside **Base Configurations**.
2. On the right side, click the kebab menu (3 vertical dots).
3. Click **Delete**.
4. Confirm the deletion in the dialogbox.

![Figure 8: Deleting ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/delete_configmap.jpg)

---

## Edit a Protected ConfigMap <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Any changes made to the protected base configurations (Deployment Template, ConfigMap, Secret) will require approval if an [approval policy](../../../user-guide/global-configurations/approval-policy.md) is enforced.

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/gY9LKJSVS-g" title="" frameborder="0" allowfullscreen></iframe></div>