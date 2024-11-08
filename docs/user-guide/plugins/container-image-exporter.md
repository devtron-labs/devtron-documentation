# Container Image Exporter

## Introduction
The **Container Image Exporter** plugin facilitates the export of container images into tarball files and then uploads these files to cloud storage. This process simplifies the transfer of container images, particularly beneficial for air-gapped environments where external network access is restricted. By converting images to tarballs, you can easily transport them via physical drives to the isolated systems. This approach is especially valuable in scenarios where direct network-based transfers are not permitted.

### Prerequisites
Before integrating the Container Image Exporter plugin, you need to properly configure your cloud storage to store the generated tarball files.

---

## Steps
1. Go to **Applications** → **Devtron Apps**.
2. Click your application.
3. Go to **App Configuration** → **Workflow Editor**.
4. Click **New Workflow** and navigate to the **Build and Deploy from Source Code**.
5. Fill the required fields in the **Create build pipeline** window and navigate to the **Post-Build stage**.

{% hint style="warning" %}
If you have already configured workflow, edit the build pipeline, and navigate to **Post-Build stage**.
{% endhint %}

6. Under 'TASKS', click the **+ Add task** button.
7. Select the **Container Image Exporter** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.
---

## User Inputs

### Task Name
Enter the name of your task

e.g., `Container Image Exporter `

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `The Container Image Exporter plugin is integrated to generate a tarball archive of docker images`

### Input Variables

| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
|   Platform               | STRING       | Specify the CPU architecture for the exported images (arm64 or amd64)            |   amd64           |
|  AwsRegion               | STRING       | Enter the AWS region where your S3 bucket is located                             |     ap-south-1         |
|   FilePrefix             | STRING       | Add a prefix to your exported image file name  |  temp_            |
|   AwsAccessKey           | STRING       | Provide your AWS Access Key ID for authentication if using AWS as a cloud provider       |  VtbXliYXNlNjR2YWx1            |
|   AwsSecretKey           | STRING       | Enter your AWS Secret Access Key if using AWS as a cloud provider       | VtudqygefuyqgjR29283bcq            |
|   AzureAccountKey        | STRING       | Provide the Account Key for your Azure Storage account, if using Azure as a cloud provider      |   abc123def567ghi           |
|   AzureAccountName       | STRING       | Enter the Account Name of your Azure Storage account, if using Azure as a cloud provider  |  	prod-us            |
|   Expiry                 | STRING       | Set the expiration time for the S3 bucket (in minutes, a whole number between 1 and 720)|     10         |  
|   BucketName             | STRING       | Enter the name of the storage container where you want to upload the exported image file|   tarball-store           |
|   ContainerImage         | STRING       | Provide the name of the system variable containing the image to be exported  |   DOCKER_IMAGE           |  
|   GcpServiceAccountJson  | STRING       | Enter your Google Cloud service account JSON credentials in base64 format (use scoped variables for security), if using GCP as a cloud provider|  wogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiZHV            |
|   GcpProjectName         | STRING       | Specify the Google Cloud project name associated with your service account, if using GCP as a cloud provider     |    project-12345          |
|   CloudProvider          | STRING       | Choose your preferred cloud storage provider (aws for Amazon S3, Azure for azure Blob Storage, or gcp for Google Cloud Storage)|    aws           |

### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables
Container Image Exporter will not be generating an output variable.

Click **Update Pipeline**.



