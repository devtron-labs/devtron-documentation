# ConfigMaps

A ConfigMap stores key-value pairs that your applications can use as environment variables or mounted files. Unlike secrets, ConfigMaps are meant for non-sensitive data. Moreover, you can update configurations without modifying or rebuilding your container images, thus making the deployments more efficient.

## Adding a ConfigMap

1. Go to the **Configurations** → **Base Configurations**.

    ![Figure 1: Application's 'Configurations' Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/appconfig-page.jpg)

2. Click the **+** button next to **ConfigMaps**.

    ![Figure 2: Adding ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/config-map.jpg)

3. **Data Type** - Choose between the following data types:
    * [Kubernetes ConfigMap](#kubernetes-configmap)
    * [Kubernetes External ConfigMap](#kubernetes-external-configmap)

### Kubernetes ConfigMap

1. Select **Kubernetes ConfigMap** as the Data Type.

2. **Name** - Provide a name to your ConfigMap (cannot be changed later).

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/created-configmap.gif)

3. **Mount data as** - Select how you want to mount the ConfigMap:
    * **Environment Variable** – Select this option if you want to inject Environment Variables in pods using ConfigMap.
    * **Data Volume** – Select this option, if you want to configure a Data Volume that is accessible to Containers running in a pod and provide a Volume mount path. Go to [Data Volume](#mount-data-as-data-valume) to know more.

4. Enter data in:
   - **GUI mode** – User-friendly interface. Click **+Add** button and enter the **Key** and **Value** fields without quotes. 
   - **YAML mode** – Raw YAML for entering key-value pairs in the format **`key: value`**. Quotes are not mandatory for either key or value.

   {% embed url="https://www.youtube.com/watch?v=QfJqX6KM2lU" %}

5. Click **Save**.


### Kubernetes External ConfigMap

Use this option if you have a ConfigMap created using the kubectl command. Ensure that the External ConfigMap exists and is available to the pod.

1. Select **Kubernetes External ConfigMap** as the Data Type.

2. **Name** - Since you are using Kubernetes External ConfigMap, make sure you give the name of ConfigMap the same as the name given using `kubectl create configmap <configmap-name> <data source>` command, otherwise, it might result in an error during the build.

3. Mount data as: **Environment Variable** or [Data Volume](#mount-data-as-data-valume)

4. Click **Save**.

---

## Mount Data as Data Volume

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/cm-data-volume.jpg)

In the above example, we have seen how to pass environment variables in your ConfigMap. Additionally, there is an option to create a ConfigMap by passing the content of a file. The content could be a plain text, json, yaml, bash script, etc. You can do so by selecting the `Data Volume` option in **Mount data as**.

The key of the ConfigMap should be your filename and the value of the ConfigMap should be your file content. In the below example, you `file.json` is the key, and the json content is the value of that ConfigMap (below the pipe (**|**) symbol). This file will be created on your specified [volume mount path](#volume-mount-path).

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/filecontent-cm.jpg)

### Volume Mount Path

Enter the folder path where the data volume should be mounted for it to be accessible to the containers running in a pod. Your keys will be mounted as files to that volume.

### Set Sub Path

When mounting multiple files to the same location, you can use the **Set Sub Path** option to control how the files are handled. This setting allows you to control whether existing files are overwritten or preserved when mounting new files.

* If **Set Sub Path** is enabled, the system will preserve existing files in the [specified path](#volume-mount-path) and append the new file using the file name as a sub-path.

* If **Set Sub Path** is disabled (unchecked), the system will delete any files already present in the [specified path](#volume-mount-path) and then mount the new files.

{% hint style="info" %}
### Note
In case of Kubernetes ConfigMap, all keys will be mounted as files on the specified path.
In case of Kubernetes External ConfigMap, manually specify the keys which should be mounted as files.
{% endhint %}


### Set File Permission

The **Set File Permission** option applies permissions at the ConfigMap level, not to individual keys within the ConfigMap. Enabling this option will let you enter a 3-digit standard permission value to control access to the file.

The 3-digit numeric value represents the permission settings for the file:

- **First digit**: Owner permissions (user).
- **Second digit**: Group permissions.
- **Third digit**: Other users' permissions.

| **Permission** | **Description**                                |
|----------------|------------------------------------------------|
| **r** (read)   | Grants the ability to read the file.           |
| **w** (write)  | Grants the ability to modify the file.         |
| **x** (execute)| Grants the ability to execute the file as a program. |

For example, **755** means:
- Owner can read, write, and execute (7),
- Group can read and execute (5),
- Others can read and execute (5).

---

## Update ConfigMap

1. Click your configmap available inside the list of **ConfigMaps** inside **Base Configurations**.
2. Modify its values
3. Click **Update**

**Note**: You cannot change the name of a ConfigMap. Create a new ConfigMap instead.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/update_configmap.jpg)

---

## Delete ConfigMap

You may delete a ConfigMap if not in use anymore. Once a ConfigMap is deleted, it will not be used in future deployments.

1. Click your configmap available inside the list of **ConfigMaps** inside **Base Configurations**.
2. On the right side, click the kebab menu (3 vertical dots).
3. Click **Delete**.
4. Confirm the deletion in the dialogbox.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/delete_configmap.jpg)

