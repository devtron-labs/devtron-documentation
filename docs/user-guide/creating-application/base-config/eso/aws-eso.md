# AWS Secrets Manager

{% hint style="warning" %}
### Prerequisite 
Install [External Secret Operator (ESO)](install-eso.md).
{% endhint %}

To add secrets from **AWS Secrets Manager**, we need to create a generic Kubernetes secret for AWS authentication.

Create a Kubernetes secret in the namespace in which the application is to be deployed using base64 encoded AWS access-key and secret-access-key. You can use a Devtron generic chart for it.

**Note**: You don't have to create the Kubernetes secret every time you create external secret for the respective namespace.

![Figure 1: Create Kubernetes Secret for AWS Authentication](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/aws-secret-generic-chart.jpg)

After creating the generic secret, navigate to `Secrets` section of the application and follow the steps mentioned below :

1. Click `Add Secret` to add a new secret

    ![Figure 2: Add a New Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/add-secret.jpg)

2. Select `AWS Secret Manager` under `External Secret Operator` (ESO) from the dropdown of `Data type`

    ![Figure 3: Select AWS Secrets Manager](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/aws-secret-manager-dropdown.jpg)

3. Configure the secret.

    | Key | Description |
    | :--- | :--- |
    | `region` | AWS region in which secret is created |
    | `accessKeyIDSecretRef.name` | Name of secret created that would be used for authentication|
    | `accessKeyIDSecretRef.key` | In generic secret created for AWS authentication, variable name in which base64 encoded AWS access-key is stored |
    | `secretAccessKeySecretRef.name` | Name of secret created that would be used for authentication|
    | `secretAccessKeySecretRef.key` | In generic secret created for AWS authentication, variable name in which base64 encoded secret-access-key is stored|
    | `secretKey` | Key name to store secret |
    | `key` | AWS Secrets Manager secret name |
    | `property` | AWS Secrets Manager secret key |

    ![Figure 4: Configure AWS Secret Settings](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/aws-eso.jpg)

    ![Figure 5: AWS External Secret Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/aws-external-secret.jpg)


4. Save the secret.


## ESO AWS secrets Manager Setup with Devtron using ClusterSecretsStore

ClusterSecretStore provides a secure and centralized storage solution for managing and accessing sensitive information, such as passwords, API keys, certificates, and other credentials, within a cluster or application environment.

**Requirement:** Devtron deployment template chart version should be 4.17 and above.

To setup ESO AWS secrets manager with Devtron using ClusterSecretsStore, follow the mentined steps:

**1. Create a secret for AWS authentication**

Create a Kubernetes secret in any namespace using base64 encoded AWS access-key and secret-access-key. You can use the devtron generic chart for this.

![Figure 6: Use Generic Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/aws-secret-generic-chart.jpg)

**2. Create a `ClusterSecretStore`**

Create a `ClusterSecretStore` using the secret created for AWS authentication in step 1.

![Figure 7: Create ClusterSecretStore](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/clustersecretstore-yaml.jpg)

**3. Create a secret in the application using ESO AWS Secrets Manager**

Go to the application where you want to create an external secret. Navigate to secrets section under application configuration and create a secret using ESO AWS Secrets Manager.

![Figure 8: Create Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/app-secret-clustersecretstore.jpg)

<!-- ----------
### AWS Secret Manager
The secret data of your application is fetched from AWS Secret Manager and then converted to Kubernetes Secret from AWS Secret.
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
![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/creating-applications-secrets-10.jpg) -->