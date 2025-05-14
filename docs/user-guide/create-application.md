# Create a New Application

## Introduction

In Devtron, an application represents your software project. When you create an application, you can configure the CI/CD pipeline, build and deploy your application, and perform other related tasks. You can create a Devtron application either by using the Chart Store or by creating it from scratch as a Custom Application. If you prefer to create a Devtron application using the Chart Store, please refer to [Charts](../user-guide/deploy-chart/README.md). 

This document provides you step-by-step instructions on creating a new custom application in Devtron.

---

## Prerequisites 

To create a custom application, you need:

* **Admin** access to create, edit, deploy, and delete permitted Devtron applications. For more information, refer to [Devtron App Permissions](../user-guide/global-configurations/user-access.md).

* Build and Deploy (CI/CD) integration set up in Devtron to automate the build and deployment process. For more information on the integration, please refer to [Build and Deploy (CI/CD)](../user-guide/deploying-application/README.md). 

    {% hint style="warning" %}

    ### Important Note

    The **Devtron Apps** tab on the Applications page is displayed only after you have integrated Build and Deploy (CI/CD) with Devtron. If Build and Deploy (CI/CD) is not integrated, the **Devtron Apps** tab will not be visible.

    {% endhint %}

* A project created in the **Projects** page (**Global Configurations** → **Projects**). 

---

## Creating a New Custom Devtron Application

Follow the below instructions to create a new custom Devtron application: 

1. Navigate to the **Applications** page in Devtron.

2. Click the **Create** button at the top-right corner of the screen.

    ![Figure 1: Custom App](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/create-custom-app/custom-application.jpg)

3. Perform one of the following actions: 

    a. Click on the **From Chart store** option to create an application from the chart store. For more information, refer to [Charts](../user-guide/deploy-chart/README.md).

    b. Click on the **Job** option to create or clone a job. For more information, refer to [Jobs](./jobs/README.md).

    c. Click on the **Custom app** option to create a custom application. The **Create Devtron Application** page is then displayed. The **Blank application** option is selected by default. However, if you wish to clone an existing application, click on **Clone application**. For more information, refer to [Clone Application](cloning-application.md).

    ![Figure 2: Create a Devtron Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/create-custom-app/create-application.jpg)

4. Select your preferred project from the **Project** drop-down box. All the projects that you have created in the Projects page (**Global Configurations** → **Projects**) are displayed as available options in the **Project** drop-down box.

5. Enter your application name in the **Application name** text box. You can enter a minimum of 3 and a maximum of 30 alphanumeric characters in the **Application name** text box. The usage of special characters and spaces are restricted. However, you can use hyphens (-) for separation. 

6. Enter the description for your application in the **Description** text box (optional step). 

7. Expand the **Add tags to application** (optional step).

    ![Figure 3: Add Tags to Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/create-custom-app/tags.jpg)

    You can add propagate tags while creating an application. When you propagate tags to your application, the specified tags are automatically transferred from a high-level Kubernetes resource, such as your application, to the low-level Kubernetes resources, such as pods, services, etc., This way, tag propagation allows you to troubleshoot issues, query on related components, filter, group metrics and much more. 

8. Enter the key name in the **KEY** field and the corresponding value in the **VALUE** field.

9. Click the symbol <img src  = "https://docs.devtron.ai/~gitbook/image?url=https%3A%2F%2Fdevtron-public-asset.s3.us-east-2.amazonaws.com%2Fimages%2Fcreating-application%2Fdonot-propagate.jpg&width=300&dpr=2&quality=100&sign=a92f66cf&sv=2" height = 10> on the left side of the **KEY** column to propagate a tag. A dark color in the symbol represents that the tags are propagated. 

10. Click the symbol <img src  = "https://docs.devtron.ai/~gitbook/image?url=https%3A%2F%2Fdevtron-public-asset.s3.us-east-2.amazonaws.com%2Fimages%2Fcreating-application%2Fdonot-propagate.jpg&width=300&dpr=2&quality=100&sign=a92f66cf&sv=2" height = 10> again to remove the tags from propagation. 

11. Click the **+** icon against **KEY** to add more tags, if required. 

12. Click the **Create Application** button. 
    
    A new custom application is now created and displayed in the **Devtron Apps** tab in the **Applications** page.

    ![Figure 4: Applications Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/create-custom-app/applications-page.jpg)

---

## Next Steps

Now that a new custom Devtron application has been created, the next step is to deploy it. To deploy an application, refer to [Deploy a Sample Application](./Deploy-sample-app/nodejs_app.md).