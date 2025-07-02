# Upgrade Devtron to 1.5.0

This document outlines the step-by-step process to be followed before upgrading Devtron to version **1.5.0**.

## Overview of the Upgrade Process

The upgrade process consists of three sequential Kubernetes jobs:

1. **devtron-pre-upgrade**: Prepares the environment for the upgrade.
2. **devtron-upgrade-init**: Scales down Devtron and takes the backup.
3. **devtron-upgrade**: Performs the restoration of data and scales up Devtron.

After the completion of the above jobs, you may proceed to upgrade Devtron using the UI or command line.

---

## Prerequisites

* Ensure that you have [deployed the **devtron-backups** chart](../install/devtron-backup.md) and that at least one backup has been pushed successfully. [Click here](https://github.com/devtron-labs/charts/blob/main/charts/devtron-backups/README.md) to know more about the backups chart.
* You must have administrative access to the cluster where Devtron is running, along with `kubectl` configured.
* PVC creation must not be blocked by any policy. If it is, exclude the `devtroncd` namespace from it.

---

## Steps

### 1. Apply the 'pre-upgrade' job

The `devtron-pre-upgrade` job creates the necessary resources and prepares for the database backup.

```bash
# Apply the devtron-pre-upgrade job
kubectl apply -f https://raw.githubusercontent.com/devtron-labs/utilities/refs/heads/main/scripts/postgres-upgrade/devtron-pre-upgrade.yaml
```

This job will:
1. Create a ConfigMap named `devtron-postgres-upgrade` in the `devtroncd` namespace.
2. Determine the StorageClass and size of the existing PostgreSQL PVC.
3. Create a new PVC named `devtron-db-upgrade-pvc` with additional storage (+5Gi).
4. Automatically apply the upgrade-init job.

To monitor the progress of this job:

```bash
kubectl logs -f job/devtron-pre-upgrade -n devtroncd
```

Wait for this job to complete successfully before proceeding.


### 2. Monitor the 'upgrade-init' job

The `devtron-upgrade-init` job is automatically triggered by the `devtron-pre-upgrade` job:
1. It scales down all Devtron components to ensure database consistency.
2. Terminates active database connections.
3. Starts the Postgres migration process.

To monitor the progress of this job:

```bash
kubectl logs -f job/devtron-upgrade-init -n devtroncd
```

Ensure this job completes successfully before proceeding to the next step.


### 3. Apply the 'upgrade' job

Once the backup is confirmed, apply the final upgrade job:

```bash
kubectl apply -f https://raw.githubusercontent.com/devtron-labs/utilities/refs/heads/main/scripts/postgres-upgrade/devtron-upgrade.yaml
```

This job will:
1. Verify if the `devtron-upgrade-init` job was successful.
2. Extract any nodeSelectors or tolerations from the existing PostgreSQL StatefulSet.
3. Remove PostgreSQL 11 components.
4. Install PostgreSQL 14 with the same configuration.
5. Migrate the data.
6. Scale up all Devtron components.

To monitor the progress of this job:

```bash
kubectl logs -f job/devtron-upgrade -n devtroncd
```

---

## Verify the Upgrade

After the upgrade job completes, verify the PostgreSQL migration:

```bash
# Check if all pods are running
kubectl get pods -n devtroncd

# Verify PostgreSQL version (should now be 14)
kubectl get configmap devtron-postgres-upgrade -n devtroncd -o jsonpath="{.data.POSTGRES_MIGRATED}"
```

The value of `POSTGRES_MIGRATED` should be "14" if the migration was successful.

---

## Potential Issues and Troubleshooting

### Job Failure

1. If the `devtron-upgrade-init` or the `devtron-upgrade` job fails, check the logs of job and the ConfigMap for error messages:

```bash
kubectl get configmap devtron-postgres-upgrade -n devtroncd -o yaml
```

Look for any entries with "ERROR" in the keys.

2. To reapply the devtron-upgrade-init job, delete the PVC named `devtron-db-upgrade-pvc`, recreate it with the same configurations and then reapply the `devtron-upgrade-init` job.

3. If the `devtron-upgrade-init` job is in a pending state, check for the PVC named `devtron-db-upgrade-pvc`, ensure that the PVC is successfully created.

---

## Next Steps

Once the database migration is complete, you can proceed with upgrading the Devtron application through the UI as mentioned in the final message of the upgrade job. Alternatively, you may use the [upgrade commands](#upgrade-commands) mentioned below.

### Upgrade Commands

1. Update the Helm repository

```bash
helm repo update
```

2. Run the upgrade command for Devtron

```bash
helm upgrade devtron devtron/devtron-operator -n devtroncd --reuse-values -f https://raw.githubusercontent.com/devtron-labs/devtron/refs/tags/v1.5.1/charts/devtron/devtron-bom.yaml --version 0.22.93
```
