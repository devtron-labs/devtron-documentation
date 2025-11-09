---
id: README
title: Global Configurations
sidebar_label: Global Configurations
description: Manage cluster-level, authorization, and integration settings that apply across all Devtron modules.
---

The **Global Configurations** section defines system-wide settings that govern clusters, environments, container registries, authentication, and integrations across Devtron.

Before you start creating an application, we recommend to you to complete the Global Configurations.

These configurations act as the foundation for all application, deployment, and policy operations.

---

## Table of Contents

### 1. SSO Login Services
* [Google](./authorization/sso/google.md)  
* [GitHub](./authorization/sso/github.md)  
* [GitLab](./authorization/sso/gitlab.md)  
* [Microsoft](./authorization/sso/microsoft.md)  
* [LDAP](./authorization/sso/ldap.md)  
* [OIDC](./authorization/sso/oidc.md)  
* [Keycloak](./authorization/sso/keycloak.md)  
* [Okta](./authorization/sso/okta.md)  
* [OpenShift](./authorization/sso/openshift.md)

### 2. [Host URL](./host-url.md)
Define the base URL for accessing the Devtron dashboard and related services.

### 3. [Cluster and Environments](./cluster-and-environments.md)
Register and manage Kubernetes clusters and deployment environments available to applications.

### 4. [Container/OCI Registry](./container-registries.md)
Configure Docker or OCI registries where your build artifacts are stored and fetched from during deployment.

### 5. [Authorization](./authorization/README.md)
Control user access and authentication mechanisms (RBAC).

* [User Permissions](./authorization/user-access.md)  
* [Permission Groups](./authorization/permission-groups.md)  
* [API Tokens](./authorization/api-tokens.md)


<!-- You can also refer our YouTube video provided here.

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/4VFjrjtieMI" title="" frameborder="0" allow="fullscreen"></iframe></div> -->


