# Overview

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

The Backup & Restore Overview page helps you quickly see the current state of backups and restores across your clusters. From one place, you can check backup health, restore activity, schedules, and storage status.

At the top of the page, you can filter data by **cluster** to narrow down insights or view the status across **all clusters**.

## At a Glance

The At a Glance section helps you quickly check the status of your backups and restores.

| Card | Description |
|-----|-------------|
| **Backups Initiated** | Total number of backups triggered across the selected clusters |
| **Restores Initiated** | Total number of restore operations started |
| **Backup Schedules** | Number of backup schedules configured |

---

## Backup & Restore Summary

The **Backup & Restore Summary** section helps you quickly understand the current status of your backups, restores, schedules, and backup locations across your clusters.

| **Field** | **Description** |
|----------|-----------------|
| **Backup Status** | Shows the status of backups based on their current state, such as **Completed**, **In Progress**, or **Failed**. Hover over a state to see the number of backups in that state |
| **Restore Status** | Shows the status of restores based on their current state, such as **Completed**, **In Progress**, or **Failed**. Hover over a state to see the number of restores in that state |
| **Clusters with Backup Schedule** | Shows how many clusters have backup schedules configured |
| **Unavailable Storage Locations** | Indicates the number of storage locations that are currently unavailable |
| **Paused Schedules** | Displays the number of backup schedules that are currently paused |

---

## Backup Success Rate by Clusters

The **Backup Success Rate by Clusters** graph shows how successful backups have been for each cluster, expressed as a percentage.

Each bar represents a cluster, and the length of the bar indicates the percentage of backups that completed successfully for that cluster. This helps you quickly compare backup reliability across clusters. Hover over a bar to view the exact success rate for the selected cluster.

You can use the sort option to sort the data according to your use case.

| **Sort Option** | **Description** |
|-----------------|-----------------|
| **High to Low** | Sorts clusters by backup success rate from highest to lowest |
| **Low to High** | Sorts clusters by backup success rate from lowest to highest |
| **A to Z** | Sorts clusters alphabetically by cluster name |
| **Z to A** | Sorts clusters in reverse alphabetical order |
