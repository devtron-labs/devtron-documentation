# Secrets

Secrets allow you to store environment variables and files. With Secrets, you can store and manage sensitive information (e.g., passwords, authentication tokens, and SSH keys) in base64 encrypted form. Embedding this information in secrets is safer and more flexible than putting it verbatim in a pod definition or in a container image. Devtron generally hides the data of secrets, and it is only visible to the users having the edit permission.

Simply put, if a [ConfigMap](../config-maps.md) is a recipe card in the kitchen, then a secret is the locked box containing a special ingredient that only your chef (application) can unlock and use.

## Add Secret

1. Go to the **Configurations** → **Base Configurations**.

    ![Figure 1: Application's 'Configurations' Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/appconfig-page.jpg)

2. Click the **+** button next to **Secrets**.

    ![Figure 2: Add Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/add-secret.jpg)

3. **Data Type** - Choose between the following data types:
    * [Kubernetes Secret](#kubernetes-secret)
    * [Mount Existing Kubernetes Secret](#mount-existing-kubernetes-secrets)
    * [External Secret Operator (ESO)](#external-secret-operator-eso)

    **Note**: Devtron automatically converts secrets from various data types to Kubernetes Secrets. Regardless of the original data type, once the conversion is complete, the Pods can access the secrets in the same way as native Kubernetes Secrets.

### Kubernetes Secret

1. Select **Kubernetes Secret** as the Data Type.

2. **Name** - Provide a name to your Secret (cannot be changed later).

    ![Figure 3: Naming the Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/creating-applications-secrets-2.jpg)

3. **Mount data as** - Select how you want to mount the Secret:
    * **Environment Variable** – Select this option if you want to inject Environment Variables in pods using Secret.
    * **Data Volume** – Select this option, if you want to configure a Data Volume that is accessible to Containers running in a pod and provide a Volume mount path. Go to [Data Volume](#mount-data-as-data-volume) to know more.

4. Enter data in:
   - **GUI mode** – User-friendly interface. Click **+Add** button and enter the **Key** and **Value** fields without quotes. 
   - **YAML mode** – Raw YAML for entering key-value pairs in the format **`key: value`**. Boolean and numeric values must be wrapped in double quotes.

   <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/x6IIr6pDZig" title="" frameborder="0" allowfullscreen></iframe></div>

5. You may [perform a dry run](#perform-a-dry-run) before clicking **Save**.

### Mount Existing Kubernetes Secrets

Use this option to mount an existing Kubernetes Secret in your application pods. A Secret will not be created by system so please ensure that the secret with the same name already exists within the namespace. Otherwise, the deployment will fail.

1. Select **Mount Existing Kubernetes Secrets** as the Data Type.

2. **Name** - Make sure you give the same name as the existing secret. Otherwise, it might result in an error during the build.

3. Mount data as: **Environment Variable** or [Data Volume](#mount-data-as-data-volume)

4. Click **Save**.

---

## Mount Data as Data Volume

### Mount Secret from File

In the above example, we have seen how to pass environment variables in your Secret. Additionally, there is an option to mount a Secret by passing its content to a file. The content could be a plain text, json, yaml, bash script, etc. You can do so by selecting the `Data Volume` option in **Mount data as**.

![Figure 4: Naming the Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/secret-data-volume.jpg)

The key of the Secret should be your filename and the value of the Secret should be your file content. In the below example, you `file.json` is the key, and the json content is the value of that Secret (below the pipe (**|**) symbol). This file will be created on your specified [volume mount path](#volume-mount-path).

![Figure 5: Adding File Content](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/filecontent-secret.jpg)

### Volume Mount Path

Enter the folder path where the data volume should be mounted for it to be accessible to the containers running in a pod. Your keys will be mounted as files to that volume.

![Figure 6: Selecting Data Volume Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/secret-volume-mount-path.jpg)

### Set Sub Path

When mounting multiple files to the same location, you can use the **Set Sub Path** option to control how the files are handled. This setting allows you to control whether existing files are overwritten or preserved when mounting new files.

* If **Set Sub Path** is enabled, the system will preserve existing files in the [specified path](#volume-mount-path) and append the new file using the file name as a sub-path.

* If **Set Sub Path** is disabled (unchecked), the system will delete any files already present in the [specified path](#volume-mount-path) and then mount the new files.

:::info Note
In case of Kubernetes Secrets, all keys will be mounted as files on the specified path.
In case of External Secrets, manually specify the keys which should be mounted as files.
:::


### Set File Permission

The **Set File Permission** option applies permissions at the Secret level, not to its individual secret keys. Enabling this option will let you enter a 3-digit standard permission value to control access to the file.

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

Before saving your configured Secret, you can use the **Dry Run** option (as shown below) to preview the final Kubernetes manifest.

This feature helps you verify your configurations, detect issues, and ensure correctness.

![Figure 7: Performing a Dry Run](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/dry-run-secret.gif)

Your configurations will appear in the left pane, while the right pane will display a section named `Manifest generated from merged` showing the computed Kubernetes manifest.

---

## Update Secret

1. Click your Secret available inside the list of **Secrets** inside **Base Configurations**.
2. Modify its values.
3. Click **Update**.

:::caution Note
You cannot change the name of a Secret. Create a new Secret instead.
:::

![Figure 8: Updating Existing Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/update-secret.jpg)

---

## Delete Secret

You may delete a Secret if not in use anymore. Once a Secret is deleted, it will not be used in future deployments.

1. Click your Secret available inside the list of **Secrets** inside **Base Configurations**.
2. On the right side, click the kebab menu (3 vertical dots).
3. Click **Delete**.
4. Confirm the deletion in the dialogbox.

![Figure 9: Deleting Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/delete-secret.jpg)

---

## Edit a Protected Secret <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Any changes made to the protected base configurations (Deployment Template, ConfigMap, Secret) will require approval if an [approval policy](../../../global-configurations/approval-policy.md) is enforced.

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/pJPX-rJNb_o" title="" frameborder="0" allowfullscreen></iframe></div>

---

## External Secret Operator (ESO)

:::info Prerequisite
Chart version should be > 4.14.0
:::

### Purpose

This section is for users who wish to use the following data type while adding secrets in Devtron:
* [Google Secrets Manager](../eso/gcp-eso.md)
* [AWS Secrets Manager](../eso/aws-eso.md)
* [Hashi Corp Vault](../eso/hashicorp-eso.md)
* Azure Secrets Manager

External Secrets Operator (ESO) is a Kubernetes component that integrates with external secret management systems like AWS Secrets Manager, HashiCorp Vault, Google Secrets Manager, Azure Key Vault, and more. It retrieves secrets from these external sources and injects them into Kubernetes Secrets automatically. Before you can create external secrets in Devtron, you need to install the External Secrets Operator on the target cluster. 

### Installation Steps

1. Go to the **Chart Store**.

2. Search for the `external-secrets` chart.

    ![Figure 10: Searching External Secrets Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/external-secret.jpg)

:::info What if external-secrets chart is not found?
Manually add the following chart repository URL in Devtron: `https://charts.external-secrets.io`. Follow this [guide](../../../global-configurations/chart-repo.md#add-chart-repository) to know the steps.
:::

3. Give a name to the helm app that will be created from the chart. Also enter the project and environment where you wish to install the chart.

    ![Figure 11: Adding Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/ext-secret-fields.jpg)

4. Click **Deploy Chart**.

<!-- ### Kubernetes External Secret (Deprecated)
The secret that is already created and stored in the environment and being used by Devtron externally is referred here as `Kubernetes External Secret`. For this option, Devtron will not create any secret by itself but they can be used within the pods. Before adding secret from kubernetes external secret, please make sure that secret with the same name is present in the environment. To add secret from kubernetes external secret, follow the steps mentioned below:
1. Navigate to `Secrets` of the application.
2. Click `Add Secret` to add a new secret.
3. Select `Kubernetes External Secret` from dropdown of `Data type`.
4. Provide a name to your secret. Devtron will search secret in the environment with the same name that you mention here.  -->