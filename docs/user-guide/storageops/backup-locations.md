# Backup Locations

The **Backup Locations** section lets you configure and manage where your cluster data is stored.  
Devtron supports two types of locations for storing backup data:

| **Location Types** | **Description** |
|-------------|-----------------|
| **Volume Snapshot Locations** | Used to store volume snapshots created using your cloud provider’s native snapshot service. |
| **Storage Locations** | Used to store backup files and metadata. |

## Storage Locations

A **Storage Location** defines where Devtron stores backup files, manifests, and metadata.  

To add a storage location, navigate to **Data Protection Management** → **Backup Locations** → **Storage Locations**.

### Provider Configuration

#### Basic Details

| **Field** | **Required / Optional** | **Description** |
|-----------|-------------------------|-------------------|
| **Provider** | Required | Select your cloud provider, for example **GCP**, **AWS**, or **Azure**. |
| **Backup Storage Location Name** | Required | A descriptive name, for example `gcp-prod-storage` or `s3-backup-primary`. |

#### Storage Configuration

These fields are for provider-specific advanced settings.

| **Field** | **Required / Optional** | **Sample Value** | **Description** |
|-----------|-------------------------|-------------------|------------------|
| **Key** | Optional | `region` | Lets you pass extra configuration to the storage provider. For most standard GCP, AWS, or Azure object storage setups you can leave this empty. Use it only if your provider documentation mentions additional keys. |
| **Value** | Optional |  `us-east-1` for a `region` key. | The value that applies to the configuration key. You can add multiple key–value pairs if needed. |
| **CA Certificate** | Optional | A base64 encoded CA bundle to be used when verifying TLS connections |

#### Credentials

This section defines how Devtron authenticates with your cloud storage provider to access the backup bucket. Without valid credentials, Devtron won’t be able to read from or write to your storage location. 

To configure credentials, first **enable the Credentials toggle**. You can either reuse an existing secret or create a new one directly from the Devtron UI.

#### Option 1: Select Secret

Use this option if the required credentials are **already stored as a Kubernetes secret**.

| Field | Required | What to Enter | Description |
|------|----------|---------------|-------------|
| Secret Name | Yes | Name of an existing Kubernetes secret | The secret must already exist and contain valid cloud provider credentials. |
| Secret Key | Yes | Key inside the secret (for example, `cloud`) | This key should point to the credential data stored inside the secret. |

#### Option 2: Create New Secret

Use this option if you want to add credentials for the first time while configuring the storage location.

| Field | Required | What to Enter | Description |
|------|----------|---------------|-------------|
| Secret Name | Yes | A unique name (for example, `gcp-backup-secret`) | This name will be used to create a new Kubernetes secret in the cluster. |
| Secret Key | Yes | A key name (for example, `cloud`) | The key under which the credential data will be stored. |
| Credential Data | Yes | Full credential payload | Paste the cloud provider credentials here (for example, a GCP service account JSON). |

### Object Storage Details

After configuring the **credentials**, the next step is to specify which storage bucket for which you set up the credentials. Enter the following details to point Devtron to the correct storage bucket.c

| Field | Required | What to Enter | Description |
|------|----------|---------------|-------------|
| **Storage Bucket** | Yes | Name of the object storage bucket | Enter the name of the bucket that will store backups, for example `devtron-backups-prod`. This bucket must already exist and be accessible using the configured credentials |
| **Bucket Path Prefix** | Optional | Folder path inside the bucket | Specify a path within the bucket, such as `cluster-1/backups`, to organize backups by cluster or environment. If left empty, backups are stored at the root of the bucket |
| **Access Mode** | Yes | `Read and Write` or `Read Only` | Defines how Devtron can use this bucket with the provided credentials |

### Sync & Validation

After configuring the storage bucket, you can optionally define how Devtron syncs and validates this storage location. These configurations help Devtron stay up to date with backups stored in the bucket and ensure the location remains accessible.

| Field | Required | What to Enter | Description |
|------|----------|---------------|-------------|
| **Backup Sync Period** | Optional | Duration (for example, `5m`, `1h`) | Defines how often Devtron syncs backup information from this storage location. This helps Devtron discover new or updated backups present in the bucket |
| **Validation Frequency** | Optional | Duration (for example, `10m`, `2h`) | Defines how often Devtron validates the object storage location to check connectivity and access using the configured credentials |

### Configuring Default Storage Location

If you want a storage location to be used as the default location for backups, enable the **Set as Default** toggle. When enabled, Devtron automatically selects this storage location for new backups and backup schedules, unless a different location is explicitly chosen during configuration.

---

## Volume Snapshot Locations

A **Volume Snapshot Location** defines where Devtron stores and manages volume-level snapshots for persistent volumes. These snapshots are used to restore application data backed by persistent volumes during a restore operation.

To add a volume snapshot location, navigate to **Data Protection Management** → **Backup Locations** → **Volume Snapshot Locations**.

### Basic Details

| **Field** | **Required / Optional** | **Description** |
|-----------|-------------------------|------------------|
| **Provider** | Required | Select the cloud provider where your persistent volumes are provisioned, such as **GCP**, **AWS**, or **Azure** |
| **Volume Snapshot Location Name** | Required | A descriptive name for the snapshot location, for example `gcp-prod-snapshots` or `aws-ebs-snapshots`|

### Configuration Fields

These fields allow you to pass **provider-specific configuration** required for snapshot operations.

| **Field** | **Required / Optional** | **Sample Value** | **Description** |
|-----------|-------------------------|------------------|------------------|
| **Key** | Optional | `region` | Used to pass additional configuration required by the snapshot provider|
| **Value** | Optional | `us-central1` | The value corresponding to the configuration key. Multiple key–value pairs can be added if required |

### Credentials

This section defines how Devtron authenticates with your cloud storage provider to access the volume snapshot bucket. Without valid credentials, Devtron won’t be able to read from or write to your volume snapshot location. 

To configure credentials, first **enable the Credentials toggle**. You can either reuse an existing secret or create a new one directly from the Devtron UI.

#### Option 1: Select Secret

Use this option if the required credentials are **already stored as a Kubernetes secret**.

| Field | Required | What to Enter | Description |
|------|----------|---------------|-------------|
| Secret Name | Yes | Name of an existing Kubernetes secret | The secret must already exist and contain valid cloud provider credentials |
| Secret Key | Yes | Key inside the secret (for example, `cloud`) | This key should point to the credential data stored inside the secret |

#### Option 2: Create New Secret

Use this option if you want to add credentials for the first time while configuring the storage location.

| Field | Required | What to Enter | Description |
|------|----------|---------------|-------------|
| Secret Name | Yes | A unique name (for example, `gcp-backup-secret`) | This name will be used to create a new Kubernetes secret in the cluster |
| Secret Key | Yes | A key name (for example, `cloud`) | The key under which the credential data will be stored |
| Credential Data | Yes | Full credential payload | Paste the cloud provider credentials here (for example, a GCP service account JSON) |

---

## Updating Backup Locations 

To update the configuration of an existing storage location or volume snapshot location, follow the steps below

1. Go to **Data Protection Management** → **Backup Locations**.

2. Open the **Storage Locations** or **Volume Snapshot Locations** tab.

3. Hover over the **Storage Location** or **Volume Snapshot Location** you want to update, and then click the **Edit** icon. 

4. Modify the required fields.

5. Click **Save** to apply the changes.

---

## Deleting Backup Locations 

To Delete the configuration of an existing storage location or volume snapshot location, follow the steps below

1. Go to **Data Protection Management** → **Backup Locations**.

2. Open the **Storage Locations** or **Volume Snapshot Locations** tab.

3. Hover over the **Storage Location** or **Volume Snapshot Location** you want to delete, and then click the **Delete** icon. 

4. A pop-up window will appear. Enter the name of the **Storage Location** or **Volume Snapshot Location**. 

5. Click **Delete** to apply the changes.