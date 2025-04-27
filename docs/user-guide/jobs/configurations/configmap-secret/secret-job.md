# Secrets

Secrets and ConfigMaps are both used to store configurations but there is one major difference between them: ConfigMap stores key-values in normal text format; whereas secrets store them in base64 encrypted form. Devtron hides the data of secrets for the normal users and it is only visible to the users having edit permission.

Secret objects let you store and manage sensitive information, such as passwords, authentication tokens, and ssh keys. Embedding this information in secrets is safer and more flexible than putting it verbatim in a Pod definition or in a container image.

---

## Add Secret

1. Go to the **Configurations** → **Base Configurations**.

![Figure 1a: ConfigMaps & Secrets](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret.jpg)

2. Click the **+** button next to **Secrets**.

![Figure 1b: Create Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-add.jpg)

3. Enter a name for the Secret (Once defined, name cannot be changed later). 

    In case, you are mounting Existing Kubernetes Secret, name should be exactly same as the as the name given using `kubectl create secret <secret-name> <data source>` command.
    
![Figure 1c: Enter secret name](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-name.jpg)

4. **Data Type** - Choose between the following data types:

 * **Kubernetes Secret**: Select the Data Type as Kubernetes Secret, if you wish to create and use the Secret using Devtron.

 * **Mount Existing Kubernetes Secret**:  Select the Data Type as Existing Kubernetes Secret if you have already created a Secret using the kubectl command and wants to use that in Devtron.

 * **External Secret Operator (ESO)**: External Secrets Operator (ESO) is a Kubernetes component that integrates with external secret management systems like AWS Secrets Manager, HashiCorp Vault, Google Secrets Manager, Azure Key Vault, and more. It retrieves secrets from these external sources and injects them into Kubernetes Secrets automatically.
    
 > `external-secrets` helm chart should be installed before setting up ESO, otherwise the External Secret Operator (ESO) will not appear. Refer the [External Secret Operator (ESO)](#external-secret-operator-eso) section to setup ESO 

![Figure 1d: Secret data type](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-data-type.jpg)
    
**Note**: Devtron automatically converts secrets from various data types to Kubernetes Secrets. Regardless of the original data type, once the conversion is complete, the Pods can access the secrets in the same way as native Kubernetes Secrets.

5. After selecting the data type, you can choose how to mount the data of your Secret. Devtron allows you to mount Secret data in following ways <br><br> **Mount data as** - Select how you want to mount the Secret:

    * [**Environment Variable**](#mount-data-as-environment-variables) – Select this option if you want to inject Secret data(key-value pairs) as Environment Variables in pods using Secret.

    * [**Data Volume**](#mount-data-as-data-volume) – Select this option, if you want to configure a Data Volume that is accessible to Containers running in a pod and provide a Volume mount path. Go to [Data Volume](#mount-data-as-data-valume) to know more.

 ![Figure 1e: Mount data as](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-mount-data.jpg)

 ### Mount data as environment variables

 This will pass your secret data into your Job pod as environment variables, thus making the configurations values directly accessible by your job.

 #### For Kubernetes Secret

 If you have selected Data type as `Kubernetes Secret` and mount data as `Environment Variable` then, you also need to enter the required data (key-value pairs) in the **Data** field<br><br>Enter data in:

 * **GUI mode** – User-friendly interface. Click **+Add** button and enter the **Key** and **Value** fields without quotes. 

 ![Figure 2a: Enter data in 'GUI' mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-env-var-gui.jpg)

 * **YAML mode** – Raw YAML for entering key-value pairs in the format **`key: value`**. Boolean and numeric values must be wrapped in double quotes.

 ![Figure 2b: Enter data in 'YAML' mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-env-var-yaml.jpg)

 ### Mount Existing Kubernetes Secrets

 This option allows you to mount an existing Kubernetes Secret in your job pods. A Secret will not be created by system so please ensure that the secret with the same name already exists within the namespace. Otherwise, the deployment will fail.

 If you have selected Data type as `Mount Existing Kubernetes Secrets` then, no data is required as devtron will fetch the existing Secret data and use it to create a Secret.

 ![Figure 3a: Mount Existing Kubernetes Secrets for 'Environment Variable'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-mount-existing-env-var.jpg)
 
---

 ### Mount Data as Data Volume
 

This option allows you to create a Secret by passing the content of a file. The content could be a plain text, json, yaml, bash script, etc.

![Figure 4a: Mount Data as Data Volume](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-data-vol.jpg)

 ### Volume Mount Path

Enter the folder path where the data volume should be mounted for it to be accessible to the containers running in a pod. Your keys will be mounted as files to that volume.

![Figure 4b: Volume Mount Path](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-data-vol-mount-path.jpg)

 ### Set Sub Path

When mounting multiple files to the same location, you can use the **Set Sub Path** option to control how the files are handled. This setting allows you to control whether existing files are overwritten or preserved when mounting new files.

![Figure 4b: Set Sub Path](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-data-vol-sub-path.jpg)

* If **Set Sub Path** is enabled, the system will preserve existing files in the [specified path](#volume-mount-path) and append the new file using the file name as a sub-path.

* If **Set Sub Path** is disabled (unchecked), the system will delete any files already present in the [specified path](#volume-mount-path) and then mount the new files.

{% hint style="info" %}
 ### Note
In case of Kubernetes Secrets, all keys will be mounted as files on the specified path.
In case of External Secrets, manually specify the keys which should be mounted as files.
{% endhint %}

 ### Set File Permission

The **Set File Permission** option applies permissions at the Secret level, not to its individual secret keys. Enabling this option will let you enter a 3-digit standard permission value to control access to the file.

![Figure 4c: Set File Permission](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-data-vol-file-per.jpg)

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
#### For Kubernetes Secret

If you have selected Data type as `Kubernetes Secret` and mount data as `Data Volume` then, you also need to enter the required data (key-value pairs) in the **Data** field.

The key of the Secret should be your filename and the value of the Secret should be your file content. In the below example, you `file.json` is the key, and the json content is the value of that Secret (below the pipe (**|**) symbol). This file will be created on your specified [volume mount path](#volume-mount-path).

Enter data in:

 * **GUI mode** – User-friendly interface. Click **+Add** button and enter the **Key** and **Value** fields without quotes. 

 ![Figure 5a: Enter data in 'GUI' mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-data-vol-gui.jpg)

 * **YAML mode** – Raw YAML for entering key-value pairs in the format **`key: value`**. Boolean and numeric values must be wrapped in double quotes.
 
 ![Figure 5b: Enter data in 'YAML' mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-data-vol-yaml.jpg)

#### For Mount Existing Kubernetes Secrets

This option allows you to mount an existing Kubernetes Secret in your job pods as data volumes. A Secret will not be created by system so please ensure that the secret with the same name already exists within the namespace. Otherwise, the deployment will fail.<br><br>If you have selected Data type as `Mount Existing Kubernetes Secrets` then, no data is required as devtron will fetch the existing Secret data and use it to create a Secret.

![Figure 6a: Mount Existing Kubernetes Secrets for 'Data Volume'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-mount-existing-data-vol.jpg)

---

## Update Secret

1. Click your Secret available inside the list of **Secrets** inside **ConfigMaps & Secrets**.
2. Modify its values.
3. Click **Save Changes**.

![Figure 7a: Update secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-update.jpg)

{% hint style="warning" %}
### Note
You cannot change the name of a Secret. Create a new Secret instead.
{% endhint %}

---

## Delete Secret

You may delete a Secret if not in use anymore. Once a Secret is deleted, it will not be used in future deployments.

1. Click your Secret available inside the list of **Secrets** inside **Base Configurations**.
2. On the right side, click the kebab menu (3 vertical dots).
3. Click **Delete**.
4. Confirm the deletion in the dialogbox.

![Figure 8a: Delete secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/secret-delete.jpg)

---

## External Secret Operator (ESO)

{% hint style="info" %}
### Prerequisite
Chart version should be > 4.14.0
{% endhint %}

### Purpose

This section is for users who wish to use the following data type while adding secrets in Devtron:
* [Google Secrets Manager](./eso/gcp-eso.md)
* [AWS Secrets Manager](./eso/aws-eso.md)
* [Hashi Corp Vault](./eso/hashicorp-eso.md)
* [Azure Secrets Manager](./eso/azure-eso.md)

External Secrets Operator (ESO) is a Kubernetes component that integrates with external secret management systems like AWS Secrets Manager, HashiCorp Vault, Google Secrets Manager, Azure Key Vault, and more. It retrieves secrets from these external sources and injects them into Kubernetes Secrets automatically. Before you can create external secrets in Devtron, you need to install the External Secrets Operator on the target cluster. 

### Installation Steps

1. Go to the **Chart Store**.

2. Search for the `external-secrets` chart.

    ![Figure 9a: Searching External Secrets Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/external-secret.jpg)

{% hint style="info" %}
### What if external-secrets chart is not found?
Manually add the following chart repository URL in Devtron: `https://charts.external-secrets.io`. Follow this [guide](../../global-configurations/chart-repo.md#add-chart-repository) to know the steps.
{% endhint %}

3. Give a name to the helm app that will be created from the chart. Also enter the project and environment where you wish to install the chart.

    ![Figure 9b: Adding Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/ext-secret-fields.jpg)

4. Click **Deploy Chart**.

After Deploying the Chart, refer the [ESO Documentation](/docs/user-guide/creating-application/eso/README.md) to setup ESO for different providers.