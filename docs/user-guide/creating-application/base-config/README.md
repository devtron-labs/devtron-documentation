# Base Configurations

## Introduction

Consider Base Configurations as a master kitchen blueprint. Whenever you want to setup a new kitchen (environment/pipelines) in the future, instead of creating one from scratch, you basically create one from the master kitchen blueprint (base configurations).

Base Configurations in Devtron consists of: 

* A [Deployment Template](../../../reference/glossary.md#base-deployment-template) (kitchen template and workflow) for defining application specifications

* [ConfigMaps](../../../reference/glossary.md#configmaps) (recipe card in your kitchen) for managing non-sensitive data (e.g., `username`)

* [Secrets](../../../reference/glossary.md#secrets) (the locked box with a secret ingrediant in your kitchen) for securely handling sensitive information (e.g., `password`, `API key`). In Devtron, these are core settings that dictate the application's behavior

![Figure 1: Base Configurations of Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/base-config-main.jpg)

Base configurations help you share common configurations (configMaps) across environments, bootstrap new environments and pipelines, or use scoped variables (placeholders) to templatize your configurations. 

## Next Steps

* [Configuring Deployment Template](deployment-template.md) 

* [Creating ConfigMaps](config-maps.md) 

* [Creating Secrets](secrets.md) 