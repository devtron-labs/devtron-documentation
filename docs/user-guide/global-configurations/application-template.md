# Application Templates 

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Application Templates in Devtron allows you to create Devtron application quickly and consistently. An application template in Devtron is created from an existing application. It captures the configuration (workflows, ConfigMaps, Secrets, Build Configurations, Source Repository, etc.) of that application, so the same setup can be reused to create new applications.

Let's assume you have already created a microservice (Devtron Application) with all the required configurations, Git Repository, Build configurations, CI/CD workflows, deployment configurations, etc. Now, instead of repeating the same setup to create a similar Devtron app, you can create an Application Template from your existing Devtron app. This template can then be used to quickly create new microservices (Devtron applications) with the same trusted setup.

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to create Application Templates.
{% endhint %}

---

## Creating an Application Template

1. Navigate to **Global Configurations** → **Application Templates**.

2. Click **+ Create Template**; a modal window will appear.

    ![Figure 1: Clicking 'Create Template'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/application-templates/application-template-create-template.jpg)

3. Select the Application from which you want to create the Application Template; you can also search for the preferred application from the search bar.

    ![Figure 2: Selecting Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/application-templates/application-template-select-template.jpg)

4. Enter the information required by the following fields.

    | Field                     | Required/Optional | Description                                  |
    | :------------------------ | :---------------- | :------------------------------------------- |
    | **Template display name** | Required          | Provide a name for the application template, e.g., `Banking-backend`|
    | **Template ID**           | Required          | Template ID is a unique identifier for application templates, and is uniquely mapped to the application template. <ol><li>Character limit: 3-50</li><li>Only lowercase alphanumeric characters are allowed</li><li>Special Characters: `-`,`_`,`.`</li><li>Template ID should be unique for each application template</li></ol>|
    | **Description**           | Optional          | Provide a short description for the application template |


    ![Figure 3: Entering required details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/application-templates/application-template-details.jpg)

5.  Click **Create Template**; application template will be created.

---

## Customizing an Application Template

After you create an application template, you can view the configurations it inherited (Git, Build, Chart, Pipeline config) from the source application. If you wish, you may modify those configurations according to your use cases.

1. Navigate to **Global Configurations** → **Application Templates**.

2. Select your preferred application template.

3. You may customize the following configurations under **Configurations** tab

    | Field                     | Description                                  |
    | :------------------------ | :------------------------------------------- |
    | **Git Repository**        | The source code repository linked to the application.|
    | **Build Configurations**  | Build configuration is used to create and push docker images in the container registry of your application; refer [Build Configurations](../creating-application/docker-build-configuration.md) to learn more.  |
    | **Base Configurations**   | Base Configurations let you define the following configurations:<ol><li><b>Deployment Template</b>; refer [Base Deployment Template](../creating-application/base-config/deployment-template.md) to learn more.</li><li><b>ConfigMaps</b>; refer [ConfigMaps](../creating-application/base-config/config-maps.md) to learn more.</li><li><b> Secrets</b>; refer [Secrets](../creating-application/base-config/secrets.md) to learn more</li></ol>|
    | **CI/CD Workflows**| Define and manage your build and deployment pipelines using Workflow Editor; refer [Workflow Editor](../creating-application/workflow/README.md) to learn more.|
    | **Environment Overrides** | Environment Overrides lets you define custom configurations for different environments without changing the base configurations; refer [Environment Overrides](../creating-application/environment-overrides.md) to learn more.|

    ![Figure 4: Customizing Application Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/application-templates/application-template-configurations.jpg)



4. (Optional) You can also define a README for your Application Template
    1. Click the **Edit** button in the **Readme** section.

        ![Figure 5: Clicking 'Edit' button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/application-templates/application-template-overview.jpg)

    2. A Markdown editor will appear where you can write or modify content under the Write tab.

    3. Use standard Markdown syntax to format text, create lists, insert links, and more.

    4. Preview the content using the **Preview** tab.

    5. Click Save to update the **Readme**.

        ![Figure 6: Creating Readme](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/application-templates/application-template-readme.jpg)

---

## Using an Application Template

You can use an application template to create an application. Refer [Creating Application From Template](../using-application-templates.md) to learn more.

---

## Deleting an Application Template

1. Navigate to **Global Configurations** → **Application Templates**.

2. Select your preferred application template.

3. Click **Delete Template** in the bottom right corner under **Configurations** tab

    ![Figure 7: Deleting Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/application-templates/application-template-delete-template.jpg)

4. A modal window will appear, click **Delete**; application template will be deleted.

    ![Figure 8: Confirming Delete Action](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/application-templates/application-template-confirm-delete.jpg)

{% hint style="success" %}
### Note
Deleting an Application Template does not affect any applications, neither the application used to create that template, nor the applications created using that template.
{% endhint %}
