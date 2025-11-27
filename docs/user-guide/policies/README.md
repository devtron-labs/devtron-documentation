---
id: README
title: Policies
sidebar_label: Policies
description: Define and enforce governance policies for deployments, image management, and plugin usage in Devtron.
---

The **Policies** section allows admins and DevOps teams to enforce consistent governance across all applications and environments in Devtron.  

These policies help regulate deployments, approvals, plugin usage, and image promotions, ensuring both compliance and operational safety.

---

## Table of Contents

### 1. [Deployment Window](../global-configurations/deployment-window.md)
Define specific timeframes during which application deployments are either blocked or allowed in specific environments

### 2. [Approval Policy](../global-configurations/approval-policy.md)
Introduce an approval mechanism to ensure that changes to sensitive configurations and deployment are authorized by the right stakeholders before execution.

### 3. [Plugin Policy](../global-configurations/plugin-policy.md)
Enforce the presence of specific plugins at various stages in your application's build and deployment pipelines.

### 4. [Pull Image Digest](../global-configurations/pull-image-digest.md)
Enforce image pull-by-digest instead of pull-by-tag for deployments.

### 5. [Tags Policy](../global-configurations/tags-policy.md)
Enforce the presence of tag before application creation or before deployment to an environment, for better auditing and rule creation.

### 6. [Filter Condition](../global-configurations/filter-condition.md)
Apply conditional logic to determine which images should be eligible for deployment after the CI stage.

### 7. [Lock Deployment Config](../global-configurations/lock-deployment-config.md)
Lock down deployment configurations to prevent unauthorized modifications or accidental changes to critical base configurations or environment configurations.

### 8. [Image Promotion](../global-configurations/image-promotion-policy.md)
Promote verified builds between deployment pipelines (e.g., from staging to production) by skipping intermediate pipelines.