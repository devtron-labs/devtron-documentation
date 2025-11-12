---
id: README
title: Application Management
sidebar_label: Application Management
description: Learn how to create, configure, deploy, and monitor applications using Devtron.
---

The **Application Management** section helps you understand every stage of the Devtron application lifecycle, from creation and configuration to deployment, monitoring, and governance.

This section provides an end-to-end guide to how Devtron manages applications, integrates CI/CD automation, and ensures consistent, policy-driven deployments across all environments.

---

## Table of Contents

### 1. [Application Overview](./application-overview.md)
Get a high-level understanding of how applications are structured and managed in Devtron.

### 2. [Applications](../applications.md)
Learn how to create and manage applications.  
- [Create Application](../create-application.md)  
- [Clone Application](../cloning-application.md)  
- [Use Application Templates](../using-application-templates.md)  

#### App Configuration
- [Git Material](../creating-application/git-material.md)  
- [Docker Build Configuration](../creating-application/docker-build-configuration.md)  
- [Base Configurations](../creating-application/base-config/README.md)  
  - [Deployment Templates](../creating-application/base-config/deployment-template.md)  
  - [Types of Deployment Templates](../creating-application/base-config/deployment-template-types/README.md)  
  - [ConfigMaps](../creating-application/base-config/config-maps.md)  
  - [Secrets](../creating-application/base-config/secrets.md)  
  - [External Secrets (ESO)](../creating-application/base-config/eso/README.md)
- [GitOps Config](../creating-application/gitops-config.md)  
- [Workflow Editor](../creating-application/workflow/README.md)  
- [Environment Overrides](../creating-application/environment-overrides.md)  
- [Deleting an Application](../deleting-application.md)

#### Build & Deploy
- [Trigger CI/CD Pipelines](../deploying-application/README.md)  
- [Rollback Deployment](../deploying-application/rollback-deployment.md)  
- [Image Labels & Comments](../deploying-application/image-labels-and-comments.md)

#### App Details
- [Application Summary](../app-details/application-summary.md)  
- [App Metrics](../creating-application/app-metrics.md)  
- [Deployment Visibility](../app-details/deployment-visibility.md)  
- [Ephemeral Containers](../app-details/ephemeral-containers.md)

### 3. [Application Groups](../application-groups.md)
Group related applications for unified deployment management.

### 4. [Chart Store](../deploy-chart/README.md)
Deploy and manage Helm charts.  
- [Chart Deployment](../deploy-chart/deployment-of-charts.md)  
- [Chart Groups](../deploy-chart/chart-group.md)

### 5. [Bulk Updates](../bulk-update.md)
Apply bulk configuration or template updates across applications.

### 6. [Configurations](../app-configurations/README.md)
Manage GitOps, chart repositories, notifications, and build infrastructure.

### 7. [Policies](../policies/README.md)
Define and enforce deployment windows, approvals, and plugin usage rules.