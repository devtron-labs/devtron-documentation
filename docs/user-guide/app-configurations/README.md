---
id: README
title: Configurations
sidebar_label: Configurations
description: Manage GitOps, chart repositories, notifications, and build infrastructure settings for applications in Devtron.
---

The **Configurations** section in Devtron lets you manage all foundational settings that influence how your applications are built, deployed, and updated.  

It provides the configuration layer that integrates source code, chart repositories, and notification systems across your organization.

---

## Table of Contents

### 1. [GitOps](../global-configurations/gitops.md)
Enable and manage GitOps to synchronize application states between Git repositories and Kubernetes clusters.

### 2. [Git Accounts](../global-configurations/git-accounts.md)
Add and manage Git provider credentials used for fetching codebases and storing Helm chart configurations.

### 3. [External Links](../global-configurations/external-links.md)
Add supporting quick links to dashboards, documentation, or observability tools within the Devtron apps.

### 4. [Chart Repository](../global-configurations/chart-repo.md)
Integrate public or private Helm chart repositories for deploying charts.

### 5. [Deployment Charts](../global-configurations/deployment-charts.md)
Manage custom Helm charts and deployment templates that define the characteristics of your applications.

### 6. [Notifications](../global-configurations/manage-notification.md)
Configure notification channels (e.g., Slack, Email, Webhooks) to receive real-time deployment and build alerts.

### 7. [Scoped Variables](../global-configurations/scoped-variables.md)
Define and manage scoped environment variables that can be reused across multiple application and jobs pipelines.

### 8. [Build Infra](../global-configurations/build-infra.md)
Tweak the resources (CPU, RAM, and many more) as per the needs of your applications.