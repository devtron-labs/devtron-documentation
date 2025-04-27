# ConfigMaps

A ConfigMap stores key-value pairs that your jobs can use as environment variables or mounted files. Unlike secrets, ConfigMaps are meant for non-sensitive data. Moreover, you can update configurations without modifying or rebuilding your container images, thus making the deployments more efficient.

## Add ConfigMap

1. Go to the **Configurations** → **ConfigMaps & Secrets**.

![Figure 1a: ConfigMaps & Secrets](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap.jpg)

2. Click the **+** button next to **ConfigMaps**.

![Figure 1b: Create ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-add.jpg)

3. Enter a name for the ConfigMap (Once defined, name cannot be changed later). 

    In case, you are using a External Kubernetes ConfigMap, name should be exactly same as the as the name given using `kubectl create configmap <configmap-name> <data source>` command.

![Figure 1c: Enter ConfigMap name](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-name.jpg)

4. **Data Type** - Choose between the following data types:

 ![Figure 1d: ConfigMap data type](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-data-type.jpg)

    * [Kubernetes ConfigMap](#kubernetes-configmap): Select the Data Type as Kubernetes ConfigMap, if you wish to create and use the ConfigMap using Devtron.

    * [Kubernetes External ConfigMap](#kubernetes-external-configmap): Select the Data Type as Kubernetes External ConfigMap if you have already created a ConfigMap using the kubectl command and wants to use that in Devtron.

5. After selecting the data type, you can choose how to mount the data of your ConfigMap. Devtron allows you to mount ConfigMap Data in following ways <br><br> **Mount data as** - Select how you want to mount the ConfigMap:

    * [**Environment Variable**](#mount-data-as-environment-variables) – Select this option if you want to inject Environment Variables in pods using ConfigMap.

    * [**Data Volume**](#mount-data-as-data-volume) – Select this option, if you want to configure a Data Volume that is accessible to Containers running in a pod and provide a Volume mount path. Go to [Data Volume](#mount-data-as-data-valume) to know more.

 ![Figure 1e: Mount data as](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-mount-data.jpg)

 ### Mount data as environment variables

 This will pass your ConfigMap data into your Job pod as environment variables, thus making the configurations values directly accessible by your job.

 #### For Kubernetes ConfigMap

 If you have selected Data type as `Kubernetes ConfigMap` and mount data as `Environment Variable` then, you also need to enter the required data (key-value pairs) in the **Data** field<br><br>Enter data in:

 * **GUI mode** – User-friendly interface. Click **+Add** button and enter the **Key** and **Value** fields without quotes. 

 ![Figure 2a: Enter data in 'GUI' mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-env-var-gui.jpg)

 * **YAML mode** – Raw YAML for entering key-value pairs in the format **`key: value`**. Boolean and numeric values must be wrapped in double quotes.
 
 ![Figure 2b: Enter data in 'YAML' mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-env-var-yaml.jpg)

 #### For Kubernetes External ConfigMap

 If you have selected Data type as `Kubernetes External ConfigMap` then, no data is required as devtron will fetch the external ConfigMap data and use it to create a ConfigMap.

 ![Figure 3: Kubernetes External ConfigMap for 'Environment Variable'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-data-external-env.jpg)

 ### Mount data as Data Volume

 This option allows you to create a ConfigMap by passing the content of a file. The content could be a plain text, json, yaml, bash script, etc. 

 ![Figure 4a: Mount Data as Data Volume](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-data-vol.jpg)

 ### Volume Mount Path

 Enter the folder path where the data volume should be mounted for it to be accessible to the containers running in a pod. Your keys will be mounted as files to that volume.

 ![Figure 4b: Volume Mount Path](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-data-vol-mount-path.jpg)

 ### Set Sub Path

 When mounting multiple files to the same location, you can use the **Set Sub Path** option to control how the files are handled. This setting allows you to control whether existing files are overwritten or preserved when mounting new files.

 * If **Set Sub Path** is enabled, the system will preserve existing files in the [specified path](#volume-mount-path) and append the new file using the file name as a sub-path.

 * If **Set Sub Path** is disabled (unchecked), the system will delete any files already present in the [specified path](#volume-mount-path) and then mount the new files.

 ![Figure 4b: Set Sub Path](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-data-vol-set-subpath.jpg)

 {% hint style="info" %}
 ### Note
 In case of Kubernetes ConfigMap, all keys will be mounted as files on the specified path.
 In case of Kubernetes External ConfigMap, manually specify the keys which should be mounted as files.
 {% endhint %}

 ### Set File Permission

 The **Set File Permission** option applies permissions at the ConfigMap level, not to individual keys within the ConfigMap. Enabling this option will let you enter a 3-digit standard permission value to control access to the file.
 
 ![Figure 4c: Set File Permission](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-data-vol-set-file-per.jpg)
 
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

 ### Data

 #### For Kubernetes ConfigMap 

 If you have selected Data type as `Kubernetes ConfigMap` and mount data as `Data Volume` then, you also need to enter the required data (key-value pairs) in the **Data** field.

 The key of the ConfigMap should be your filename and the value of the ConfigMap should be your file content. In the below example, you `file.json` is the key, and the json content is the value of that ConfigMap (below the pipe (**|**) symbol). This file will be created on your specified [volume mount path](#volume-mount-path).
 
 Enter data in:

 * **GUI mode** – User-friendly interface. Click **+Add** button and enter the **Key** and **Value** fields without quotes. 

 ![Figure 5a: Enter data in 'GUI' mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-data-vol-gui.jpg)

 * **YAML mode** – Raw YAML for entering key-value pairs in the format **`key: value`**. Boolean and numeric values must be wrapped in double quotes.

 ![Figure 5b: Enter data in 'YAML' mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-data-vol-yaml.jpg)

 #### For Kubernetes External ConfigMap

 If you have selected Data type as `Kubernetes External ConfigMap` then, no data is required as devtron will fetch the external ConfigMap along with any volumes attach with it and use it to create a ConfigMap.

 ![Figure 6a: Kubernetes External ConfigMap for 'Data Volume'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-data-external-data-vol.jpg)

6. Select **Save** to create a ConfigMap.

---

## Update ConfigMap

1. Click your ConfigMap available inside the list of **ConfigMaps** inside **ConfigMaps & Secrets**.

2. Modify its values.

3. Click **Save Changes**.

![Figure 7a: Update ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-update.jpg)

{% hint style="warning" %}
### Note
You cannot change the name of a ConfigMap. Create a new ConfigMap instead.
{% endhint %}

---

## Delete ConfigMap

You may delete a ConfigMap if not in use anymore. Once a ConfigMap is deleted, it will not be used in future deployments.

1. Click your ConfigMap available inside the list of **ConfigMaps** inside **Base Configurations**.
2. On the right side, click the kebab menu (3 vertical dots).
3. Click **Delete**.
4. Confirm the deletion in the dialog box.

![Figure 8a: Delete ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/configmap-delete.jpg)

---