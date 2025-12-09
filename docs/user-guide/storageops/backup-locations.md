# Backup Locations

The **Backup Locations** section lets you configure and manage where your cluster data is stored.  
Devtron supports two types of locations for storing backup data:

| **Location Types** | **Description** |
|-------------|-----------------|
| **Volume Snapshot Locations** | Used to store volume snapshots created using your cloud provider’s native snapshot service. |
| **Storage Locations** | Used to store backup files and metadata. |

## Storage Locations

A **Storage Location** defines where Devtron stores backup files, manifests, and metadata.  

### Adding Storage Location

To add a storage location, navigate to **Data Protection Management** → **Backup Locations** → **Storage Locations**.

#### Provider Configuration

| **Field** | **Required / Optional** | **Description** |
|-----------|-------------------------|-------------------|
| **Provider** | Required | Select your cloud provider, for example **GCP**, **AWS**, or **Azure**. |
| **Backup Storage Location Name** | Required | A descriptive name, for example `gcp-prod-storage` or `s3-backup-primary`. |

#### Storage Configuration

These fields are for provider-specific advanced settings.

| **Field** | **Required / Optional** | **Sample Value** | **Description** |
|-----------|-------------------------|-------------------|------------------|
| **Key** | Optional | `region`. | Lets you pass extra configuration to the storage provider. For most standard GCP, AWS, or Azure object storage setups you can leave this empty. Use it only if your provider documentation mentions additional keys. |
| **Value** | Optional |  `us-east-1` for a `region` key. | The value that applies to the configuration key. You can add multiple key–value pairs if needed. |
| **CA Certificate** | Optional | Paste a PEM-encoded CA certificate, if your object storage uses a custom or internal CA. | Used to trust a custom TLS certificate for the storage endpoint. Leave this empty when using standard cloud providers (GCP, AWS, Azure) with their default certificates. |

#### Credentials

This section defines **how Devtron authenticates with your cloud storage provider** to access the backup bucket. Without valid credentials, Devtron won’t be able to read from or write to your storage location.

You can either select an existing Kubernetes secret** or create a new secret directly from Devtron UI.

## Volume Snapshot Locations

The **Volume Snapshot Locations** tab lists all configured snapshot endpoints where persistent volume data is stored.  
These locations are specific to each cloud provider (AWS, Azure, GCP) and are used whenever you enable snapshot-based backups.

| **Column** | **Description** |
|-------------|-----------------|
| **Name** | Displays the name of the configured snapshot location. Click the name to view or edit its details. |
| **Provider** | Indicates the cloud provider (AWS, Azure, or GCP) used for snapshot storage. |
| **Added By** | Shows the user who created the snapshot location configuration. |

You can use the **Search** or **Filter** options to quickly locate existing snapshot locations.  
Click **Add** to configure a new snapshot location.

---

### Adding a Volume Snapshot Location

When you click **Add**, a configuration form appears. This form lets you specify provider details, configuration parameters, and credentials.

| **Field** | **Required/Optional** | **Description** |
|------------|-----------------------|-----------------|
| **Provider** | Required | Choose the cloud provider where snapshots will be stored. Supported options: **AWS**, **Azure**, **GCP**. |
| **Volume Snapshot Location Name** | Required | Provide a unique, descriptive name for the snapshot location. |
| **Configuration Fields** | Optional | Add provider-specific parameters (such as region, resource group, or project ID) as key–value pairs. |
| **Credentials** | Required | Choose how to authenticate with your cloud provider: <ul><li>**Select Secret** – Use an existing secret.</li><li>**Create New Secret** – Add credentials directly in the form.</li></ul> |

---

## Provider-Specific Configuration

### AWS

For **AWS**, Devtron uses **Amazon Elastic Block Store (EBS)** to create volume snapshots.

| **Field** | **Description** |
|------------|-----------------|
| **Key** | `region` |
| **Value** | Specify the AWS region where snapshots should be created (for example, `us-east-1`). |
| **Credentials** | Provide IAM access credentials with permissions for EBS and EC2 operations. |

**Example Configuration**
```yaml
Key: region
Value: us-east-1