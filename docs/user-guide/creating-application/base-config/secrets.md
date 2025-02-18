# Secrets

Secrets and ConfigMaps are both used to store environment variables but there is one major difference between them: ConfigMap stores key-values in normal text format while secrets store them in base64 encrypted form. Devtron hides the data of secrets for the normal users and it is only visible to the users having edit permission.

Secret objects let you store and manage sensitive information, such as passwords, authentication tokens, and ssh keys. Embedding this information in secrets is safer and more flexible than putting it verbatim in a Pod definition or in a container image.

## Adding a Secret

1. Go to the **Configurations** → **Base Configurations**.

    ![Figure 1: Application's 'Configurations' Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/appconfig-page.jpg)

2. Click the **+** button next to **Secrets**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/add-secret.jpg)

3. **Data Type** - Choose between the following data types:
    * [Kubernetes Secret](#kubernetes-secret)
    * [Mount Existing Kubernetes Secret](#kubernetes-external-configmap)
    * [External Secret Operator](#ex)

    *Note: The conversion of secrets from various data types to Kubernetes Secrets is done within Devtron and irrespective of the data type, after conversion, the Pods access `secrets` normally.*

### Kubernetes Secret

1. Select **Kubernetes ConfigMap** as the Data Type.

2. **Name** - Provide a name to your Secret (cannot be changed later).

    ![Figure 3: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/config-maps/created-configmap.gif)

3. **Mount data as** - Select how you want to mount the Secret:
    * **Environment Variable** – Select this option if you want to inject Environment Variables in pods using ConfigMap.
    * **Data Volume** – Select this option, if you want to configure a Data Volume that is accessible to Containers running in a pod and provide a Volume mount path. Go to [Data Volume](#mount-data-as-data-valume) to know more.

4. Enter data in:
   - **GUI mode** – User-friendly interface. Click **+Add** button and enter the **Key** and **Value** fields without quotes. 
   - **YAML mode** – Raw YAML for entering key-value pairs in the format **`key: value`**. Quotes are not mandatory for either key or value.

   {% embed url="https://www.youtube.com/watch?v=QfJqX6KM2lU" %}

5. You may [perform a dry run](#perform-a-dry-run), before clicking **Save**.

| Key | Description |
| :--- | :--- |
| `Name` | Provide a name to your Secret |
| `Data Type` | Provide the Data Type of your secret. To know about different Data Types available click on [Data Types](secrets.md#data-types) |
| `Data Volume` | Specify if there is a need to add a volume that is accessible to the Containers running in a pod. |
| `Use secrets as Environment Variable` | Select this option if you want to inject Environment Variables in your pods using Secrets. |
| `Use secrets as Data Volume` | Select this option if you want to configure a Data Volume that is accessible to Containers running in a pod. Ensure that you provide a Volume mount path for the same. |
| `Key-Value` | Provide a key and the corresponding value of the provided key. |

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/secret-data-volume.jpg)

## Volume Mount Path

Specify the volume mount folder path in `Volume Mount Path`, a path where the data volume needs to be mounted. This volume will be accessible to the containers running in a pod.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/secret-volume-mount-path.jpg)

## Sub Path
For multiple files mount at the same location you need to check sub path `bool` field, it will use the file name (key) as sub path. 
Sub Path feature is not applicable in case of external configmap except
AWS Secret Manager, AWS System Manager and Hashi Corp Vault, for these cases `Name (Secret key)` as sub path will be picked up automatically. 

## File Permission
File permission will be provide at the configmap level not on the each key of the configmap. it will take 3 digit standard permission for the file.


Click `Save Secret` to save the secret.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/save-secret.jpg)

You can see the Secret is added.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/create-secret.gif)

## Update Secrets

You can update your secrets anytime later, but you cannot change the name of your secrets. If you want to change your name of secrets then you have to create a new secret.

To update secrets, click the secret you wish to update.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/update-secret.jpg)

Click `Update Secret` to update your secret.

## Delete Secret

You can delete your secret. Click your secret and click the `delete sign` to delete your secret.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/delete-secret.jpg)


### Mount Existing Kubernetes Secrets

Use this option to mount an existing Kubernetes Secret in your application pods. A Secret will not be created by system so please ensure that the secret already exist within the namespace else the deployment will fail.

### Google Secrets Manager

### AWS Secrets Manager

The secret data of your application is fetched from AWS Secret Manager and then converted to Kubernetes Secret from AWS Secret. 

### Azure Secrets Manager

### Hashi Corp Vault

The secret data for your application is fetched from HashiCorp Vault and the secrets stored in HashiCorp Vault are converted to Kubernetes Secret.


## Mount Existing Kubernetes Secrets

Use this option to mount an existing Kubernetes Secret in your application pods. A Secret will not be created by system so please ensure that the secret already exist within the namespace else the deployment will fail.

### Kubernetes External Secret (Deprecated)

The secret that is already created and stored in the environment and being used by Devtron externally is referred here as `Kubernetes External Secret`. For this option, Devtron will not create any secret by itself but they can be used within the pods. Before adding secret from kubernetes external secret, please make sure that secret with the same name is present in the environment. To add secret from kubernetes external secret, follow the steps mentioned below:

1. Navigate to `Secrets` of the application.
2. Click `Add Secret` to add a new secret.
3. Select `Kubernetes External Secret` from dropdown of `Data type`.
4. Provide a name to your secret. Devtron will search secret in the environment with the same name that you mention here. 

### AWS Secret Manager

Before adding any external secrets on Devtron, `kubernetes-external-secrets` must be installed on the target cluster. Kubernetes External Secrets allows you to use external secret management systems (e.g., AWS Secrets Manager, Hashicorp Vault, etc) to securely add secrets in Kubernetes.

#### Installing kubernetes-external-secrets Using Chart

To install the chart with the release named my-release:

```bash
$ helm install my-release external-secrets/kubernetes-external-secrets
```
To install the chart with AWS IAM Roles for Service Accounts:

```bash
$ helm install my-release external-secrets/kubernetes-external-secrets --set securityContext.fsGroup=65534 --set serviceAccount.annotations."eks\.amazonaws\.com/role-arn"='arn:aws:iam::111111111111:role/ROLENAME'
```
#### Adding Secrets From AWS Secret Manager

To add secrets from AWS secret manager, navigate to `Secrets` of the application and follow the steps mentioned below :

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/add-secret.jpg)

1. Click `Add Secret` to add a new secret.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/aws-secret.jpg)

2. Select `AWS Secret Manager` from dropdown of `Data type`.

3. Provide a name to your secret.

4. Select how you want to use the secret. You may leave it selected as environment variable and also you may leave `Role ARN` empty.

5. In `Data` section, you will have to provide data in key-value format.

All the required field to pass your data to fetch secrets on Devtron are described below :

| Key | Description |
| :--- | :--- |
|`key`| Secret key in backend |
|`name`| Name for this key in the generated secret |
|`property`| Property to extract if secret in backend is a JSON object |
|`isBinary`| Set this to true if configuring an item for a binary file stored else set false |

#### Adding Secrets in AWS Secret Manager

To add secrets in AWS secret manager, do the following steps :

1. Go to AWS secret manager console.
2. Click `Store a new secret`.
3. Add and save your secret.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/creating-applications-secrets-10.jpg)
