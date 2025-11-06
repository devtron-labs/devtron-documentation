# GCS Create Bucket

## Introduction
The **GCS Create Bucket** plugin of Devtron enables automated creation of Google Cloud Storage (GCS) bucket directly within CI/CD workflows. By integrating the **GCS Create Bucket** plugin, teams can simplify cloud storage provisioning and can efficiently manage and store application logs, deployment artifacts, backup data, and other critical application assets in a centralized cloud storage.

### Prerequisites
Before integrating the **GCS Create Bucket** plugin, ensure you have a Google Cloud Platform (GCP) account and GCP Project with appropriate permissions.

---

## Steps
1. Navigate to the **Jobs** section, click **Create**, and choose **Job**.
2. In the 'Create job' window, enter **Job Name** and choose a target project.
3. Click **Create Job**.
4. In the 'Configurations' tab, fill the required fields under the 'Source code' section and click **Save**.
5. In Workflow Editor, click **+ Job Pipeline**.
6. Give a name to the workflow and click **Create Workflow**.
7. Click **Add job pipeline to this workflow**.
8. Fill the required fields in ‘Basic configuration’ tab.
9. Go to the ‘Tasks to be executed’ tab.
10. Under ‘Tasks’, click the **+ Add task** button.
11. Select the **GCS Create Bucket** plugin.
12. Enter the following [user inputs](#user-inputs) with appropriate values.
    
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
| EnableAutoClass          | BOOL         | Automatically optimizes storage costs by moving objects between storage classes based on how frequently they are accessed. The default is false.             |  true            |
| UniformAccess            | STRING       | Enable uniform bucket-level access control to create a bucket with bucket-level permissions instead of an Access control list (true/false)            |  true            | 
        
### Trigger/Skip Condition
Here you can set conditions to execute or skip the task. You can select `Set trigger conditions` for the execution of a task or `Set skip conditions` to skip the task.

### Output Variables

| Variable                 | Format       | Description |
| ------------------------ | ------------ | ----------- | 
|   BucketName             | STRING       | The name of the bucket created.

### Pass/Failure Condition
Here you can define when a task should be marked as passed or failed. You can select `Set pass conditions` to define success criteria or `Set failure conditions` to specify failure scenarios.


Click **Update Pipeline**.



