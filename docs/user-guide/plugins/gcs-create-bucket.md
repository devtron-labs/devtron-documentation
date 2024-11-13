# GCS Create Bucket

## Introduction
The **GCS Create Bucket** plugin of Devtron enables automated creation of Google Cloud Storage (GCS) bucket directly within CI/CD workflows. By integrating the **GCS Create Bucket** plugin teams can simplify cloud storage provisioning and can efficiently manage and store application logs, deployment artifacts, backup data, and other critical application assets in a centralized cloud storage.

### Prerequisites
Before integrating the **GCS Create Bucket** plugin, ensure you have a Google Cloud Platform (GCP) account and GCP Project with appropriate permissions.

---

## Steps
1. Go to **Applications** → **Devtron Apps**.
2. Click your application.
3. Go to **App Configuration** → **Workflow Editor**.
4. Click **New Workflow** and navigate to the **Build and Deploy from Source Code**.
5. Fill the required fields in the **Create build pipeline** window and navigate to the **Pre-build stage**.

{% hint style="warning" %}
If you have already configured workflow, edit the build pipeline, and navigate to **Pre-build stage**.
{% endhint %}

6. Under 'TASKS', click the **+ Add task** button.
7. Click the **GCS Create Bucket** plugin.
8. Enter the following [user inputs](#user-inputs) with appropriate values.
---

## User Inputs

### Task Name
Enter the name of your task

e.g., `GCS Create Bucket`

### Description
Add a brief explanation of the task and the reason for choosing the plugin. Include information for someone else to understand the purpose of the task.

e.g., `A Plugin to create GCS Bucket`

### Input Variables

| Variable                 | Format       | Description | Sample Value |
| ------------------------ | ------------ | ----------- | ------------ |
|   BucketName             | STRING       | Name of the GCS bucket to be created            | my-app-logs-bucket             |
|   StorageClass           | STRING       | Storage class for the bucket (STANDARD, NEARLINE, COLDLINE, ARCHIVE)            | archive             |
|   Project                | STRING       | GCP project ID where the bucket will be created             | gcp-68493       |
|   EnableBucketPrefix     | STRING       | Enable prefix for bucket naming (true/false)            |  true            |
| ServiceAccountCred       | STRING       | Base64 encoded GCP service account credentials            | eyJ0eXBlIjoic2VydmljZV9hY2             |
| LocationType             | STRING       | Type of location (region/dual-region/multi-region)            | region             |
| Location                 | STRING       | Geographic location where bucket will be created            |  us-central1            |
| EnableAutoClass          | BOOL         | Automatically optimizes storage costs by moving objects between storage classes based on how frequently they are accessed. Default is false.             |  true            |
| UniformAccess            | STRING       | Enable uniform bucket-level access control to create bucket with bucket level permissions instead of Access control list (true/false)            |  true            | 
        
### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables

| Variable                 | Format       | Description |
| ------------------------ | ------------ | ----------- | 
|   BucketName             | STRING       | The name of the bucket createed.

### Pass/Failure Condition
Here you can define when a task should be marked as passed or failed. You can select `Set pass conditions` to define success criteria or `Set failure conditions` to specify failure scenarios.


Click **Update Pipeline**.



