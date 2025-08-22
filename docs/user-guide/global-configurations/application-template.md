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

## Modifying an Application Template

After creation of Application Template, if you wish, you can modify the configurations of the 
