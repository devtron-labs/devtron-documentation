# Workflow Editor

After configuring the **Build Configurations** and **Base Configurations**, the next step is to create a workflow in workflow editor.

In Devtron, a **Workflow** is a logical sequence of different stages(pipelines) used for continuous integration and continuous deployment of an application. 

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/arora1.gif)

For Devtron Apps you can create five types of workflows depending upon your use case.

* [Build and Deploy from Source Code](./ci-pipeline.md#1-build-and-deploy-from-source-code): Choose this option if you want Devtron to build and deploy the image of source code.

* [Linked Build Pipeline](./ci-pipeline.md#2-linked-build-pipeline): Choose this option if you want to use an image created by an existing CI pipeline in Devtron.

* [Deploy Image from External Service](./ci-pipeline.md#3-deploy-image-from-external-service): Choose this if you want to build your image outside Devtron, it will receive a docker image from an external source via the incoming webhook.

* [Sync with Environment](./ci-pipeline.md#4-sync-with-environment) [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

* [Create a Job](./cd-pipeline.md#5-create-a-job)

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow/workflow-ci.jpg)

To know how to create the CI pipeline for your application, click on: [Create CI Pipelines](ci-pipeline.md)

To know how to create the CD pipeline for your application, click on: [Create CD Pipelines](cd-pipeline.md)