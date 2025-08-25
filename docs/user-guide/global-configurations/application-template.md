# Application Templates 

## Introduction

Application Templates in Devtron allows you to create Devtron application quickly and consistently. An application template in Devtron is created from an existing application. It captures the configuration (workflows, ConfigMaps, Secrets, Build Configurations, Source Repository, etc.) of that application, so the same setup can be reused to create new applications.

Let's assume you have already created a microservice (Devtron Application) with all the required configurations, Git Repository, Build configurations, CI/CD workflows, deployment configurations, etc. Now, instead of repeating the same setup each time when you create a new microservice, you can create an Application Template from this already configured microservice (Devtron Application). This template can then be used to quickly create new microservices (Devtron applications) with the same trusted setup.

## Creating an Application Template

1. Navigate to **Global Configurations** → **Application Templates**.

2. Click **+ Create Template**; a modal window will appear.

3. Select the Application from which you want to create the Application Template; you can also search for the preferred application from the search bar.

4. Enter the information required by the following fields and click **Create Template**.

    | Field                     | Required/Optional | Description                                  |
    | :------------------------ | :---------------- | :------------------------------------------- |
    | **Template display name** | Required          | Provide a name for the Application Template  |
    | **Template ID**           | Required          | Provide an ID for the Application Template   |
    | **Description**           | Optional          | Provide a short for the Application Template |

5. Application Template will be created.

## Customizing an Application Template

After creation of Application Template, if you wish, you can modify the configurations of your application template according to your use cases. By default, configurations are inherited from the application which is used to create that application template.

1. Navigate to **Global Configurations** → **Application Templates**.

2. Select your preferred application template.

3. You can customize the following configurations under **Configurations** tab

    | Field                     | Description                                  |
    | :------------------------ | :------------------------------------------- |
    | **Git Repository**        | The source code repository linked to the application.|
    | **Build Configurations**  | Build configuration is used to create and push docker images in the container registry of your application; refer [Build Configurations](../creating-application/docker-build-configuration.md) to learn more.  |
    | **Base Configurations**   | Base Configurations let you define the following configurations:<ol><li><b>Deployment Template</b>; refer [Base Deployment Template](../creating-application/deployment-template.md) to learn more.</li><li><b>ConfigMaps</b>; refer [ConfigMaps](../creating-application/config-maps.md) to learn more.</li><li><b> Secrets</b>; refer [Secrets](../creating-application/secrets.md) to learn more. |
    | **CI/CD Workflows**| Define and manage your build and deployment pipelines using Workflow Editor; refer [Workflow Editor](../creating-application/workflow/README.md) to learn more.|
    | **Environment Overrides** | Environment Overrides lets you define custom configurations for different without changing the base configurations; refer [Environment Overrides](../creating-application/environment-overrides.md) to learn more.|

4. (Optional) You can also define a README for your Application Template
    1. Click the Edit button in the Readme section.

    2. A Markdown editor will appear where you can write or modify content under the Write tab.

    3. Use standard Markdown syntax to format text, create lists, insert links, and more.

    4. Preview the content using the Preview tab.

    5. Click Save to update the Readme.

## Using an Application Template

<!-- link need to be added -->

## Deleting an Application Template

1. Navigate to **Global Configurations** → **Application Templates**.

2. Select your preferred application template.

3. Click **Delete Template** in the bottom right corner under **Configurations** tab

4. A modal window will appear, click **Delete**; application template will be deleted.
