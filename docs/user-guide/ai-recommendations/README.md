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

It operates across four modules to implement rightsizing actions:

1. [**AI Recommendations (Notifications)**](#notifications) - Automated optimization insights of your Kubernetes resources.
2. [**Runbooks**](#runbooks) - Predefined or AI-generated remediation workflows.  
3. [**Ask Devtron Expert**](#ask-devtron-expert) - A simple chat interface for queries and analytics.
4. [**Audit Logs**](#audit-logs) - Activity trail for compliance and traceability.

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

Click here to know more about Notifications.

---

### Runbooks
Defines YAML-based remediation actions.
* Supports indefinite and time-bound approvals.
* Includes per-cluster execution and audit tracking.

Click here to know more about Runbooks.

---

### Ask Devtron Expert
Conversational AI assistant for FinOps-related queries.
* Shows interactive charts and follow-up actions.
* Support for chat history.

Click here to know more about AI Chat.

---

### Audit Logs
Maintains a full record of all user and AI-driven actions.
* Provides audit trail of runbook.
* Filterable by user, module, and action type.

Click here to know more about Audit Logs.