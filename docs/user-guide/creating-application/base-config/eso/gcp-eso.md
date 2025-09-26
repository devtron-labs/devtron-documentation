# Google Secrets Manager

{% hint style="warning" %}
### Prerequisite 
Install [External Secret Operator (ESO)](install-eso.md).
{% endhint %}

To add secrets from **Google Secrets Manager**, follow the steps mentioned below :

1. Go to Google cloud console and create a Service Account.

    ![Figure 1: Create Service Account](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-sa.jpg)


    ![Figure 2: Service Account Creation](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-sa-create.jpg)

2. Assign roles to the service account.

    ![Figure 3: Assign Service Account Roles](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-sa-roles.jpg)

3.  Add and create a new key.

    ![Figure 4a: Add Service Account Key](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-key.jpg)

    ![Figure 4b: Create Service Account Key](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-key-create.jpg)


4. Create a Kubernetes secret in the namespace in which the application is to be deployed using base64 encoded service account key.

    You can use devtron generic chart for this. 

    ![Figure 5: Create Kubernetes Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/gcp-auth-generic.jpg)

5. After creating the generic secret, navigate to `Secrets` section of the application and click `Add Secret` to add a new secret.

    ![Figure 6: Add New Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/add-secrets.jpg)

6. Select `Google Secrets Manager` under `External Secret Operator` (ESO) from the dropdown of `Data type`.

    ![Figure 7: Select Google Secrets Manager](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/gcp-secret-manager-dropdown.jpg)

7. Configure secret.

    ![Figure 8: Configure Secret Settings](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/gcp-es-configure.jpg)

    | Key | Description |
    | :--- | :--- |
    | `secretAccessKeySecretRef.name` | Name of secret created that would be used for authentication.|
    | `secretAccessKeySecretRef.key` | In generic secret created for GCP authentication, variable name in which base64 encoded service account key is stored.|
    | `ProjectID` | GCP Project ID where secret is created. |
    | `secretKey` | Key name to store secret. |
    | `key` | GCP Secrets Manager secret name. |


    ![Figure 9: Google Secret Example](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/gcp-secret.jpg)

8. Save secret.