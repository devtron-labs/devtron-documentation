---
title: AI Recommendations
sidebar_label: AI Recommendations
---

## Introduction

As you scale with Kubernetes, you may come across the dilemma of inefficiency:
* Over-provisioned clusters
* Workloads running at, let's say, 20% utilization
* Soaring cloud bills

Devtron’s AI-powered initiative redefines how Site Reliability Engineers (SREs) and DevOps teams interact with their infrastructure. It monitors, reasons, and acts on cost inefficiencies using explainable AI.

<div class="video-wrapper"><iframe width="720" height="380" src="https://www.youtube.com/embed/4iVj5LsLPxc" title="AI Recommendations in Devtron" frameborder="0" allowfullscreen></iframe></div>

It operates across two modules to implement rightsizing actions:

1. [**Notifications**](#notifications) - Automated optimization insights of your Kubernetes resources.
2. [**Runbooks**](#runbooks) - Predefined or AI-generated remediation workflows.

---

## User Personas

| Persona | Role |
|----------|------|
| **SRE / DevOps Engineer** | Primary user for AI recommendations and runbook automation. |
| **Superadmin** | Reviews approvals and monitors audit trails. |
| **Developer** | Queries workloads and costs through AI Chat. |

---

## Associated Modules

### Notifications

Sends intimation regarding potential optimization across clusters to save costs.
* Users can **Approve**, **Reject**, or **Revert** recommendations.
* Each action links to a relevant runbook for remediation.

[Click here](notifications.md) to know more about Notifications.

---

### Runbooks
Defines YAML-based remediation actions.
* Supports indefinite and time-bound approvals.
* Includes per-cluster execution and audit tracking.

[Click here](runbook.md) to know more about Runbooks.

#### Audit Logs
Maintains a full record of all user and AI-driven actions.
* Provides audit trail of runbook.
* Filterable by user, module, and action type.

:::tip Additional Resources:
* [**Watch Devtron's AI Capabilities**](https://youtu.be/a_dgwYxrAD4).
* **Ask Devtron Expert** - A simple chat interface for queries and analytics (accessible from the top-right of your screen).
* [**Devtron Intelligence**](../devtron-intelligence.md) - An AI agent that helps you will troubleshooting of workloads.
