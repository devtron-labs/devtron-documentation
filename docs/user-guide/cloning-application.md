# Clone an Existing Application

## Introduction

In Devtron, an application represents your software project. You can clone a Devtron application but not a Helm application created using the Chart store. So if you prefer to know more about creating Helm apps using Charts, please refer to [Charts](../user-guide/deploy-chart/README.md). However, when you clone a Devtron application, you can configure the CI/CD pipeline, build and deploy your application, and perform other related tasks just like how you would do when creating a new Devtron application.

This document provides you step-by-step instructions on cloning an existing Devtron application.

---

## Prerequisites

To clone an existing Devtron application, you need:

* **Admin** access to create, edit, deploy, and delete permitted Devtron applications. For more information, refer to [Devtron App Permissions](../user-guide/global-configurations/user-access.md).

* An existing Devtron application. 

* A project created in the **Projects** page (**Global Configurations** → **Projects**).

---

## Clone an Existing Devtron Application

Follow the below instructions to clone an existing Devtron application:

1. Navigate to the **Applications** page in Devtron.

2. Click the **Create** button at the top-right corner of the screen.

    ![Figure 1: Custom App](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/create-custom-app/custom-application.jpg)

3. Perform one of the following actions:

    a. Click on the **From Chart store** option to create an application from the chart store. For more information, refer to [Charts](../user-guide/deploy-chart/README.md).

    b. Click on the **Job** option to create or clone a job. For more information, refer to [Jobs](./jobs/README.md).

    c. Click on the **Custom app** option to clone an existing Devtron application. The **Create Devtron Application** page is then displayed. If you prefer to create a new Devtron application instead of cloning an existing one, please refer to [Create an Application](./create-application.md).

    ![Figure 2: Clone an Existing Devtron Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/cloning-application/clone-application.jpg)

4. Click **Clone application** to clone an existing Devtron application.

5. Select your preferred project from the **Project** drop-down box. All the projects that you have created in the **Projects** page (**Global Configurations** → **Projects**) are displayed as available options in the **Project** drop-down box.

6. Enter your cloned application name in the **Application name** text box. You can enter a minimum of 3 and a maximum of 30 alphanumeric characters in the **Application name** text box. The usage of special characters and spaces are restricted. However, you can use hyphens (-) for separation.

7. Enter the description for your cloned application in the **Description** text box (optional step). 

8. Expand the **Add tags to application** (optional step). To propagate tags to your application, refer to [Propagate Tags to Your Application](#propagate-tags-to-your-application). 

    ![Figure 3: Add Tags to Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/create-custom-app/tags.jpg)

9. Select your preferred existing application to clone from the **Select an app to clone** drop-down box. All Devtron applications created, irrespective of whether it is configured or not, are displayed as available options in the **Select an app to clone** drop-down box. 

10. Click the **Create Application** button. 

    A cloned Devtron application is now created. The same is also displayed in the **Devtron Apps** tab in the **Applications** page.

    ![Figure 4: Application Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/cloning-application/clone-application-created.jpg)

---

## Next Steps

Now that a cloned application is created, the immediate next step is to modify the Git repositories, corresponding branches and container registries to be used for each CI pipeline if required. Please refer to [What is Cloned and What is Not](#what-is-cloned-and-what-is-not) section in this document to know what is cloned and what is not from the existing Devtron application. 

To know more about configuring a Devtron application, please refer to [Configuring a Devtron Application](./Deploy-sample-app/nodejs_app.md).

---

## Extras

### Propagate Tags to Your Application

You can propagate tags while creating a Devtron application. When you propagate tags to your application, the specified tags are automatically transferred from a high-level Kubernetes resource, such as your application, to the low-level Kubernetes resources, such as pods, services, etc., This way, tag propagation allows you to troubleshoot issues, query on related components, filter, group metrics and much more.

Follow the below instructions to propagate tag to your application:

1. Enter the key name in the **KEY** field and the corresponding value in the **VALUE** field of the **Create Devtron Application** page.

2. Click the symbol <img src  = "https://docs.devtron.ai/~gitbook/image?url=https%3A%2F%2Fdevtron-public-asset.s3.us-east-2.amazonaws.com%2Fimages%2Fcreating-application%2Fdonot-propagate.jpg&width=300&dpr=2&quality=100&sign=a92f66cf&sv=2" height = 10> on the left side of the **KEY** column to propagate a tag. A dark color in the symbol represents that the tags are propagated. 

3. Click the symbol <img src  = "https://docs.devtron.ai/~gitbook/image?url=https%3A%2F%2Fdevtron-public-asset.s3.us-east-2.amazonaws.com%2Fimages%2Fcreating-application%2Fdonot-propagate.jpg&width=300&dpr=2&quality=100&sign=a92f66cf&sv=2" height = 10> again to remove the tags from propagation. 

4. Click the **+** icon against **KEY** to add more tags, if required. 

5. Click the **Create Application** button.

### What is Cloned and What is Not

Please refer to the below table to know what is cloned and what is not when you clone an existing Devtron application that is already configured:

| Cloned | Not Cloned |
| ------ | ---------- |
| GitHub repository configurations | Build not triggered |
| Container registry and repository  | Deployment not triggered | 
| Target platform for the build | No commit is deployed |
| Base configurations | |
| CI/CD pipeline | |
| Trigger build & deploy pipeline configuration | | 
| Deployment strategy | | 
| Cluster | |
| Namespace | | 
| Code source | | 

When you clone an existing Devtron application that is not yet configured, then the cloned application will also have no configurations configured. 