# Creating Application From Template

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Application templates provide a predefined configuration for creating new applications. You can create an application directly from an application template instead of setting up and repeating the app configuration steps from scratch (such as build configurations, base configurations, CI/CD workflows, and environment details).

Refer [Application Templates](./global-configurations/application-template.md) to learn more.

:::caution Who Can Perform This Action?
* Users need to have Admin permission or above to create applications from application templates.
* Users need to have super-admin permissions in order to customize template configurations.

:::

---

## Using Application Templates

You can create an application using an application template by following the below steps:

1. On the Devtron dashboard, select **Applications**.

2. On the upper-right corner of the screen, click **Create**.

3. Select **Custom app** from the drop-down list; a **Create Devtron Application** modal window will appear.

    ![Figure 1: Clicking 'Custom app'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application-from-template/application-template-custom-app.jpg)

4. Select **From template** from the left-side of the modal window; a list of all [application templates](./global-configurations/application-template.md) will appear.

    ![Figure 2: Selecting 'From template'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application-from-template/application-template-from-template.jpg)

5. Select the application template from which you want to create the application; you can also search for the preferred application template from the search bar.

    ![Figure 3: Selecting Application Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application-from-template/application-template-select-template.jpg)

6. After selecting the application template, you need to provide the following details

    | Field                    | Required/Optional | Description                                                                                                                                                |
    | :----------------------- | :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | **Project**              | Required          | Select the [Project](./global-configurations/projects.md) for your Application                                                                             |
    | **Application Name**     | Required          | Enter a name for the Application                                                                                                                           |
    | **Description**          | Optional          | Provide a short description for the application                                                                                                            |
    | **Tags**                 | Optional          | Key-value pairs used for identifying and organizing the application and can be propagated as Kubernetes labels. To learn more refer [Tags](#tags) section. |
    | **Git Account**          | Required          | Select a Git Account                                                                                                                                       |
    | **Git Repo URL**         | Required          | Enter the preferred Git Repository                                                                                                                         |
    | **Container Registry**   | Required          | Select a Container Registry                                                                                                                                |
    | **Container Repository** | Optional          | Enter a container repository; desired format: `username/repo-name`                                                                                         |
    | **Workflows**            | Optional          | Select preferred environments for your deployment pipeline in your workflows                                                                               |


    ![Figure 4a: Entering Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application-from-template/application-template-enter-details-1.jpg)

    ![Figure 4b: Configuring Code Source, Container Registry and Environments](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application-from-template/application-template-enter-details-2.jpg)

:::caution Note
By default, configurations are inherited from the application which is used to create that application template.
:::

7. Click **Create Application** and the application will be created.

    ![Figure 5: Creating Application From Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application-from-template/application-template-click-create-application.jpg)

---

## Extras

### Tags

`Tags` are key-value pairs. You can add one or multiple tags in your application. 

**Propagate Tags** 
When tags are propagated, they are considered as labels to Kubernetes resources. Kubernetes offers integrated support for using these labels to query objects and perform bulk operations e.g., consolidated billing using labels. You can use these tags to filter/identify resources via CLI or in other Kubernetes tools.

![Figure 6: Adding Tags](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application-from-template/application-template-tags.jpg)

1. Click **Add tags to application**.

2. Add your preferred **Tags**.

3. Click `+` icon next to **KEY** field to add a new tag.

4. Click the symbol <span className="inline-badge">![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg)</span> on the left side of your tag to propagate a tag.<br/>`Note`: Dark grey colour in symbol specifies that the tags are propagated.

5. To remove the tags from propagation, click the symbol <span className="inline-badge">![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/propagate-dark.jpg)</span> again.


