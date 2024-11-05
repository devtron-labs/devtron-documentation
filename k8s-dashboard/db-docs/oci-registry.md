# OCI Registry

If you have [helm charts](../../reference/glossary.md#helm-charts-packages) stored in your [OCI registry](../../reference/glossary.md#container-registry), you can add the OCI registry to Devtron's Modern Kubernetes Dashboard and pull those [helm charts](../../reference/glossary.md#helm-charts-packages) to Devtron's [Chart Store].

You can configure an OCI registry using any registry provider of your choice, including:
* ECR
* Docker
* Azure
* Artifact Registry (GCP)
* Quay

---

## Add Registry

1. From the left sidebar, go to **Global Configurations** → **OCI Registry**.

    ![Figure 1: OCI Registry](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/container-registries/add-registry.jpg)

2. Click **Add Registry**.

    ![Figure 2: Add a Registry](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/container-registries/add-container-registry-1.jpg)

3. Choose a provider from the **Registry provider** dropdown. View the [Supported Registry Providers](#supported-registry-providers).

4. Under **Registry type**, you get the following options:
    * **Private Registry**: Choose this if your artifacts are hosted or should be hosted on a private registry restricted to authenticated users of that registry. Selecting this option requires you to enter your registry credentials (username and password/token).
    * **Public Registry**: Unlike private registry, this doesn't require your registry credentials. Only the registry URL and repository name(s) would suffice.

5. Assuming your registry type is private, here are few of the common fields you can expect:

    | Fields | Description |
    | --- | --- |
    | **Name** | Provide a name to your registry, this name will appear in the **Container Registry** drop-down list available within the [Build Configuration](../creating-application/docker-build-configuration.md) section of your application|
    | **Registry URL** | Provide the URL of your registry in case it doesn't come prefilled. Do not include `oci://`, `http://`, or `/https://` in the URL. |
    | **Authentication Type** | The credential input fields may differ depending on the registry provider, check [Registry Providers](#supported-registry-providers) |
    | **Use as chart repository** | Tick this checkbox if you want Devtron to pull helm charts from your registry and display them on its chart store. Also, you will have to provide a list of repositories (present within your registry) for Devtron to successfully pull the helm charts. |

6. Click **Save**.

---

## Supported Registry Providers

### ECR

Amazon ECR is an AWS-managed container image registry service.
The ECR provides resource-based permissions to the private repositories using AWS Identity and Access Management (IAM). ECR allows both Key-based and Role-based authentications.

Before you begin, create an [IAM user](https://docs.aws.amazon.com/AmazonECR/latest/userguide/get-set-up-for-amazon-ecr.html) and attach the ECR policy according to the authentication type.

Provide the following additional information apart from the common fields:

| Fields | Description |
| --- | --- |
| **Registry URL** | Example of URL format: `xxxxxxxxxxxx.dkr.ecr.<region>.amazonaws.com` where `xxxxxxxxxxxx` is your 12-digit AWS account ID |
| **Authentication Type** | Select one of the authentication types:<ul><li>**EC2 IAM Role**: Authenticate with workernode IAM role and attach the ECR policy (AmazonEC2ContainerRegistryFullAccess) to the cluster worker nodes IAM role of your Kubernetes cluster.</li></ul><ul><li>**User Auth**: It is a key-based authentication, attach the ECR policy (AmazonEC2ContainerRegistryFullAccess) to the [IAM user](https://docs.aws.amazon.com/AmazonECR/latest/userguide/get-set-up-for-amazon-ecr.html).<ul><li>`Access key ID`: Your AWS access key</li></ul><ul><li>`Secret access key`: Your AWS secret access key ID</li></ul> |


### Docker 

Provide the following additional information apart from the common fields:

| Fields | Description |
| --- | --- |
| **Username** | Provide the username of the Docker Hub account you used for creating your registry. |
| **Password/Token** | Provide the password/[Token](https://docs.docker.com/docker-hub/access-tokens/) corresponding to your docker hub account. It is recommended to use `Token` for security purpose. |


### Azure

For Azure, the service principal authentication method can be used to authenticate with username and password. Visit this [link](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-auth-service-principal) to get the username and password for this registry.

Provide the following additional information apart from the common fields:

| Fields | Description |
| --- | --- |
| **Registry URL/Login Server** | Example of URL format: `xxx.azurecr.io` |
| **Username/Registry Name** | Provide the username of your Azure container registry |
| **Password** | Provide the password of your Azure container registry |


### Artifact Registry (GCP) 

JSON key file authentication method can be used to authenticate with username and service account JSON file. Visit this [link](https://cloud.google.com/artifact-registry/docs/docker/authentication#json-key) to get the username and service account JSON file for this registry. 

{% hint style="warning" %}
Remove all the white spaces from JSON key and wrap it in a single quote before pasting it in `Service Account JSON File` field
{% endhint %}

Provide the following additional information apart from the common fields:

| Fields | Description |
| --- | --- |
| **Registry URL** | Example of URL format: `region-docker.pkg.dev` |
| **Service Account JSON File** | Paste the content of the service account JSON file |

### Quay

Provide the following additional information apart from the common fields:

| Fields | Description |
| --- | --- |
| **Username** | Provide the username of your Quay account |
| **Token** | Provide the password of your Quay account |


### Other

Provide below information if you select the registry type as `Other`.

| Fields | Description |
| --- | --- |
| **Registry URL** | Enter the URL of your private registry |
| **Username** | Provide the username of your account where you have created your registry |
| **Password/Token** | Provide the password or token corresponding to the username of your registry |
| **Advanced Registry URL Connection Options** | <ul><li>**Allow Only Secure Connection**: Tick this option for the registry to allow only secure connections</li></ul><ul><li>**Allow Secure Connection With CA Certificate**: Tick this option for the registry to allow secure connection by providing a private CA certificate (ca.crt)</li></ul><ul><li>**Allow Insecure Connection**: Tick this option to make an insecure communication with the registry (for e.g., when SSL certificate is expired)</li></ul> |

{% hint style="info" %}
You can use any registry which can be authenticated using `docker login -u <username> -p <password> <registry-url>`. However these registries might provide a more secured way for authentication, which we will support later.
{% endhint %}