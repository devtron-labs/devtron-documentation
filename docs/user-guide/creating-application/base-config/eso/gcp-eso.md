---
hide_table_of_contents: true
---

# Google Secrets Manager

:::caution Prerequisite 
Install [External Secret Operator (ESO)](install-eso.md).
:::

To add secrets from **Google Secrets Manager**, follow the steps mentioned below :

1. Go to Google cloud console and create a Service Account.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-sa.jpg)
<center>Figure 1: Create Service Account</center>


    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-sa-create.jpg)
<center>Figure 2: Service Account Creation</center>

2. Assign roles to the service account.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-sa-roles.jpg)
<center>Figure 3: Assign Service Account Roles</center>

3.  Add and create a new key.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-key.jpg)
<center>Figure 4a: Add Service Account Key</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/google-key-create.jpg)
<center>Figure 4b: Create Service Account Key</center>


4. Create a Kubernetes secret in the namespace in which the application is to be deployed using base64 encoded service account key.

    You can use devtron generic chart for this. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/gcp-auth-generic.jpg)
<center>Figure 5: Create Kubernetes Secret</center>

5. After creating the generic secret, navigate to `Secrets` section of the application and click `Add Secret` to add a new secret.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/add-secrets.jpg)
<center>Figure 6: Add New Secret</center>

6. Select `Google Secrets Manager` under `External Secret Operator` (ESO) from the dropdown of `Data type`.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/gcp-secret-manager-dropdown.jpg)
<center>Figure 7: Select Google Secrets Manager</center>

7. Configure secret.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/gcp-es-configure.jpg)
<center>Figure 8: Configure Secret Settings</center>

    | Key | Description |
    | :--- | :--- |
    | `secretAccessKeySecretRef.name` | Name of secret created that would be used for authentication.|
    | `secretAccessKeySecretRef.key` | In generic secret created for GCP authentication, variable name in which base64 encoded service account key is stored.|
    | `ProjectID` | GCP Project ID where secret is created. |
    | `secretKey` | Key name to store secret. |
    | `key` | GCP Secrets Manager secret name. |


    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/secrets/gcp-secret.jpg)
<center>Figure 9: Google Secret Example</center>

8. Save secret.