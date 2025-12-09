---
hide_table_of_contents: true
---

# Backup & Restore
## Introduction

The **Backup & Restore** feature in Devtron helps you protect your Kubernetes workloads and data by allowing you to back up and restore your **clusters**, **namespaces**, or **specific resources** directly from the Devtron UI. 

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/3r0E-rXT8v4" title="" frameborder="0" allow="fullscreen"></iframe></div>

You can 

 * Create on-demand or scheduled backups
 * Choose where your data is stored (such as AWS S3, Azure Blob, or GCP Storage)
 * Restore the backups to the same or another cluster when needed. 
 
 Whether you are preparing for disaster recovery, migrating environments, or ensuring business continuity, Devtron makes the process simple, reliable, and transparent while giving you complete visibility and control.

---

## Creating Backup

You can create a backup in Devtron to capture the current state of your Kubernetes clusters, namespaces, and resources.

1. Go to **Data Protection Management** → **Backup & Schedule**. 

2. Select **Create Backup** and select one of the following:

    | **Option** | **Description** |
    |-------------|-----------------|
    | **From Scratch** | Configure a new backup manually by defining the scope, storage, and snapshot settings |
    | **From Schedule** | Trigger a backup using an existing backup schedule configuration |
    | **Create Backup Schedule** | Create a recurring backup policy to automatically perform backups at regular intervals |

    ### From Scratch

    After selecting **From Scratch**, a new modal window will open, enter the required details for each section

    #### 1. Basic Details

    | **Field** | **Required / Optional** | **Description** |
    |------------|-------------------------|-----------------|
    | **Backup Name** | Required | Enter a unique name for the backup to identify it in the list view |
    | **Labels** | Optional | Add key-value pairs to organize and filter backups by environment, team, or purpose |

    #### 2. Backup Scope & Policy

    | **Field** | **Required / Optional** | **Description** |
    |------------|-------------------------|-----------------|
    | **Select Cluster to Backup** | Required | Choose the Kubernetes cluster where the backup will be performed|
    | **Namespaces to Backup** | Required | Define which namespaces to include in the backup <ul><li>**All Namespaces** – Backs up all the namespaces in the cluster</li><li> **All Production Environments** - Backs up namespaces tagged as production</li><li> **All Non-Production Environments** - Backs up namespaces tagged as npn-production </li><li>**Specific Namespaces** - Select specific namespaces manually</li></ul> |
    | **Resources to Backup** | Optional | Choose which Kubernetes resources to include<br /> <ul><li>**All Resources** – Includes all resources</li><li> **Specific Resources** – Select **Global**, **Cluster**, or **Namespace** scoped resources</li></ul> |
    | **Included Resources** | Optional | Specify resource kinds to include, such as `deployments` or `configmaps` |
    | **Excluded Resources** | Optional | Specify resource kinds to exclude, such as `secrets` or `events` |
    |**Item Operation Timeout**|Required |Defines how long Devtron should wait for asynchronous plugin operations to complete before timing out|

    #### 3. Storage & Snapshot Location

    | **Field** | **Required / Optional** | **Description** |
    |------------|-------------------------|-----------------|
    | **Volume Snapshot Location** | Required | Select where the volume snapshots will be stored. Each cloud provider supports one snapshot location per backup |
    | **Storage Location** | Required | Choose the object storage target (for example, **AWS S3**, **Azure Blob**, **GCP Storage**) to store backup data and logs |
    | **Snapshot Option** | Required | Choose how to handle volume data <ul><li> **Take Snapshot** – Capture persistent volume data</li> <li>**Skip Volume Snapshot** – Back up only resource manifests</li></ul> |

    #### Snapshot Volume Settings (When *Take Snapshot* is selected)

    | **Field** | **Required / Optional** | **Description** |
    |------------|-------------------------|-----------------|
    | **Snapshot Move Data** | Optional | Specify whether snapshot data should be moved after creation |
    | **Default Volumes to FS Backup** | Optional | Use file system backup for all volumes instead of block-level snapshots |
    | **Data Mover** | Optional | Select the data mover for transferring snapshot data (for example, `velero` or `kopia`) |
    | **Parallel Files Upload** | Optional | Define the number of files uploaded in parallel. Applicable when using the **kopia** uploader|

    #### 4. Advanced Timeouts & Tuning

    | **Field** | **Required / Optional** | **Description** |
    |------------|-------------------------|-----------------|
    | **CSI Snapshot Timeout** | Optional | Set the maximum time to wait for CSI snapshot creation before timing out (for example, `10m`) |
    | **Item Operation Timeout** | Optional | Define how long to wait for asynchronous plugin operations. Default is `72h` |

3. After entering the required details, click **Create Backup** and a backup will be created.

### From Schedule

:::warning Note
A **Backup Schedule** is required to create a backup using the *From Schedule* option.  
Refer to [Creating Backup Schedule](#creating-backup-schedule) to learn how to configure and manage backup schedules in Devtron.
:::

If you already have a backup schedule, you can create a backup from it without going through the configuration process again. This helps you quickly trigger a backup using the same configurations which are defined in the selected schedule.

1. After selecting **From Schedule**, a new modal window will open. Enter the required details as described below.

2. Enter the required information:

| **Field** | **Required / Optional** | **Description** |
|------------|-------------------------|-----------------|
| **Backup Name** | Required | Enter a unique name for the backup. This name will help identify the backup in the list. |
| **Schedule** | Required | Select one of the existing schedules (for example, **Daily Backup Schedule**, **Weekly Database Backup**, **Monthly Archive Schedule**). The configurations from the selected schedule will automatically be used to create the backup. |

3. Click **Create Backup**, and the backup creation process will start.

## Creating Backup Schedule

A **Backup Schedule** helps you automate backups at regular intervals without having to manually create them every time.  
It uses the same configuration options available in [Creating a Backup](#creating-backup), with a few additional fields that define when and how often the backup should run.  

This makes it easier to ensure that your cluster data is always protected, even if you forget to trigger a backup manually.

After selecting **Create Backup Schedule**, a modal window opens where you can specify the schedule details along with your backup configuration.

### Backup Schedule Specific Fields

| **Field** | **Required / Optional** | **Description** |
|------------|-------------------------|-----------------|
| **Schedule Name** | Required | Enter a unique name for the schedule. Backups created through this schedule use this name as a prefix |
| **Description** | Optional | Provide a short description to identify the purpose of the schedule |
| **Backup Schedule (Cron Expression)** | Required | Define when backups should run (for example, daily at midnight or every 6 hours) |
| **Pause Schedule** | Optional | Temporarily disable the schedule without deleting it. Backups will not run until resumed |
| **Skip Upcoming Backup** | Optional | Skips the next scheduled backup but keeps the schedule active |
| **Delete Backups on Schedule Deletion** | Optional | Automatically deletes backups created by this schedule when the schedule itself is removed |
| **Backup TTL** | Optional | Defines how long each backup should be retained before it’s automatically deleted |

---

## Viewing Backups and Backup Schedules

### Backups 

After you initiated the backup, you can find it under **Backup** tab. This tab shows all the backups weather they are created manually or via a backup-schedule.

| **Column** | **Description** |
|-------------|-----------------|
| **Name** | Displays the unique name of the backup. Click the name to view the backup details, and restore it |
| **Cluster** | Shows the cluster where the backup was taken |
| **Created By** | Shows the user or backup schedule name that initiated the backup |
| **Status** | Shows the current state of the backup:<ul><li> **Creating** – Backup is in progress</li><li> **Completed** – Backup finished successfully</li><li> **Failed** – Backup failed</li><li> **Partially Failed** – Some resources were not backed up </li><li> **Expired** – The backup has reached its retention (TTL) limit</li></ul> |
| **Backup Date** | Shows the date and time of when the backup was created |
| **Expires In** | Shows the remaining time before the backup expires |
| **Size** | Indicates the total size of the backup stored in the configured location|

You can use the **Search** bar or apply filters such as **Cluster**, **Status**, and **Created By** to quickly locate specific backups or narrow down the list based on: their current state, or who initiated them.

These filters help you quickly find backups for restore operations or verify recent backup activity across clusters.

### Backup Schedules

After creating a backup schedule, you can view it under **Backup Schedules** tab. This tab shows all the backup schedules and displays the following details for each of them

| **Column** | **Description** |
|-------------|-----------------|
| **Schedule Name** | Name of the backup schedule. Click to view or edit details |
| **Status** | Indicates the current state of the backup schedule: <ul><li>**New** – The schedule has been created successfully but no backups have run yet. Once the first scheduled backup is executed, the status changes to **Active**</li><li> **Active** – The schedule is valid and enabled. Backups are automatically triggered at the defined intervals based on the configured cron expression</li><li> **Paused** – The schedule is temporarily disabled. No backups will run until the schedule is resumed manually</li> <li> **Failed Validation** – The schedule configuration is invalid due to missing or incorrect parameters (for example, an invalid cron expression, unavailable cluster, or deleted storage location). Backups will not run until the issue is resolved, and the schedule is validated again </li></ul> |
| **Cluster** | Shows the cluster associated with the schedule |
| **Storage Location** | Displays the storage target (for example, AWS S3, Azure Blob, or GCP Storage)|
| **Cron** | The cron expression defining how frequently the backup runs (for example, *Every 6 hours*)|
| **Last Backup** | The timestamp of the last backup triggered by this schedule|
| **Last Skipped** | Displays when the schedule last skipped a run (if applicable)|
