# Base Configurations

## Introduction

Base configurations help you share common configurations across environments, bootstrap new environments and pipelines, or use scoped variables (placeholders) to templatize your configurations. 

Base Configurations in Devtron consists of: 

* A [Deployment Template](../../../reference/glossary.md#deployment-template) for defining application specifications

* [ConfigMaps](../../../reference/glossary.md#configmaps) for managing non-sensitive data (e.g., `username`)

* [Secrets](../../../reference/glossary.md#secrets) for securely handling sensitive information (e.g., `password`, `API key`). 

In Devtron, these are the core settings that dictate an application's behavior.

![Figure 1: Base Configurations of Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/deployment-template/base-config-main.jpg)

## Next Steps

* [Configuring Deployment Template](deployment-template.md) 

* [Creating ConfigMaps](config-maps.md) 

* [Creating Secrets](secrets.md) 