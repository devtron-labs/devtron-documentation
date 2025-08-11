# Using Scoped Variables in Devtron

## Introduction

In Devtron, many configuration values such as a database name, memory limit, or service endpoint may need to be used in multiple places. Instead of entering the same value repeatedly, you can store it in a scoped variable.

A scoped variable (key-value pair) allows you to define a value once and reuse it. The value of the variable will depend on the scopes mentioned below:

| Category                      | Description                                                                                                                                                                                                               |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Global**                    | Variable value will be universally same throughout Devtron.                                                                                                                                                               |
| **Cluster**                   | Variable value might differ for each Kubernetes cluster. <a href="https://devtron.ai/pricing" target="_blank"> <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg"></a>  |
| **Environment**               | Variable value might differ for each environment within a cluster, e.g., staging, dev, prod. [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing) |
| **Application**               | Variable value might differ for each application. [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)                                            |
| **Environment + Application** | Variable value might differ for each application on a specific environment. [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)                  |


For example, you can create a variable named `db_name` to store the database name and set its value to `dev-db` for development environment, and for production environment you can set its value to `prod-db`, at the time of deployment, Devtron will automatically choose the correct value based on the environment.

**Advantages of using scoped variables**

* **Reduces repeatability**: Configuration management team can centrally maintain the static data.
* **Simplifies bulk edits**: All the places that use a variable get updated when you change the value of the variable.
* **Keeps data secure**: You can decide the exposure of a variable's value to prevent misuse or leakage of sensitive data.

---

## How to Define a Scoped Variable

{% hint style="warning" %}
### Who can Perform this Action?
 Only super admins can define scoped variables. 
{% endhint %}

In Devtron, you can define scoped variables by using a YAML template. It will contain a schema for defining the scoped variables.

Depending on your use case, you can do either one of the following:

| Action | Description |
|:---|:---|
| **Download the YAML Template and define variables from scratch** | In case you are defining the Scoped Variables for the first time:<ol><li> [Download the YAML template](#download-the-template) to your local system.</li><li> [Define your variables](#enter-the-values)</li><li> [Upload it back to the Devtron](#upload-the-template)</li></li> |
| **Edit the existing saved YAML configuration** | If you wish to add, update or delete the existing scoped variables, you can edit the existing saved YAML configuration using any of the following methods:<ul><li>Edit using the in-built UI Editor.</li><li> You can download the existing saved configuration as a YAML file in your local system and can modify it in your preferred local editor and then upload the file to implement changes. |

### Download the Template

1. From the left sidebar, go to **Global Configurations** → **Scoped Variables**

2. Click **Download template**. 

    ![Figure 1: Downloading the Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/template-downloader.jpg)

3. Open the downloaded template using any code editor (say VS Code). 

### Enter the Values

The YAML file contains key-value pairs that follow the below schema:

| Field                   | Type    | Description                                                                  |
| :---------------------- | :------ | :--------------------------------------------------------------------------- |
| `apiVersion`            | string  | The API version of the resource (comes pre-filled)                           |
| `kind`                  | string  | The kind of resource (i.e. Variable, comes pre-filled)                       |
| `spec`                  | object  | The complete specification object containing all the variables               |
| `spec.name`             | string  | Unique name of the variable, e.g. _DB_URL_                                   |
| `spec.shortDescription` | string  | A short description of the variable (up to 120 characters)                   |
| `spec.notes`            | string  | Additional details about the variable (will not be shown on UI)              |
| `spec.isSensitive`      | boolean | Whether the variable value is confidential (will not be shown on UI if true) |
| `spec.values`           | array   | The complete values object containing all the variable values as per context |


The `spec.values` array further contains the following elements:

| Field                                           | Type   | Description                                                                                |
| :---------------------------------------------- | :----- | :----------------------------------------------------------------------------------------- |
| `category`                                      | string | The context, e.g., Global, Cluster, Application, Env, ApplicationEnv                       |
| `value`                                         | string | The value of the variable                                                                  |
| `selectors`                                     | object | A set of selectors that restrict the scope of the variable                                 |
| `selectors.attributeSelectors`                  | object | A map of attribute selectors to values                                                     |
| `selectors.attributeSelectors.<selector_key>`   | string | The key of the attribute selector, e.g., **ApplicationName**, **EnvName**, **ClusterName** |
| `selectors.attributeSelectors.<selector_value>` | string | The value of the attribute selector                                                        |



Here's a truncated template containing the specification of two variables for your understanding:

```yaml
apiVersion: devtron.ai/v1beta1
kind: Variable
spec:

# First example of a variable
  - name: DB_URL
    shortDescription: My application's customers are stored
    notes: The DB is a MySQL DB running version 7.0. The DB contains confidential
      information.
    isSensitive: true
    values:
      - category: Global
        value: mysql.example.com

# Second example of a variable
  - name: DB_Name
    shortDescription: My database name to recognize the DB
    notes: NA
    isSensitive: false
    values:
      - category: Global
        value: Devtron
      - category: ApplicationEnv
        value: app1-p
        selectors:
          attributeSelectors:
            ApplicationName: MyFirstApplication
            EnvName: prod
```

### Upload the Template

1. Once you save the YAML file, go back to the screen where you downloaded the template.

2. Click **Upload file to add**, to upload your saved YAML file.

    ![Figure 2: Uploading the Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/file-uploader.jpg)

3. The content of the file will be uploaded for you to review and edit. Click **Review Changes**.

    ![Figure 3: Reviewing the YAML file](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/file-preview.jpg)

4. You may check the changes between the last saved file and the current one before clicking **Save**.

    ![Figure 4: Saving the file](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/save.jpg)

5. Click the **Variable List** tab to view the variables. Check the [How to Use a Scoped Variable](#how-to-use-a-scoped-variable) section to know more.

    ![Figure 5: List of Variables](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/variable-list.jpg)

---

## Defining YAML values in scoped variables [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

In Devtron, Scoped variables usually store simple values like strings or numbers, but, in some cases, you may need to define more detailed configuration in a scoped variable, such as autoscaling configuration or resource configuration. You can achieve this by defining a YAML snippet as the value of a scoped variable.

Defining YAML snippets as the value of a scoped variable will help you to reuse YAML configuration across multiple applications or environments. Scoped variables with YAML snippets can be changed based on the context (`category`) such as **Global**, **Cluster**, **Environment**, **Application**, **Environment+Application**.

Here's a truncated template containing the specification of one scoped variable with a YAML snippet as its value defined for different contexts for your understanding:

```yaml
apiVersion: devtron.ai/v1beta1
kind: Variable
spec:
  - notes: Resource Configuration
    shortDescription: Scoped variable with YAML snippet
    isSensitive: false
    name: resources # Defining name for the variable.
    values:
      - category: Application
        value:  # Insert the YAML configuration block with proper indentation
          limits:
            cpu: 100m
            memory: 100Mi
          requests:
            cpu: 100m
            memory: 100Mi
        selectors:
          attributeSelectors:
            ApplicationName: banking-preprod
      - category: Env # Defining the variable for an environment.
        value: 
            limits:
              cpu: 75m
              memory: 75Mi
            requests:
              cpu: 50m
              memory: 50Mi
        selectors:
          attributeSelectors:
            EnvName: devtron-demo # Specifying the environment
      - category: Env # Defining variable's values for another environment
        value: 
          limits:
            cpu: 200m
            memory: 200Mi
          requests:
            cpu: 100m
            memory: 100Mi
        selectors:
          attributeSelectors:
            EnvName: banking # Specifying another environment name.
      - category: Global # Defining Variable's Values for global context.
        value:
          limits:
            cpu: 50m
            memory: 50Mi
          requests:
            cpu: 50m
            memory: 50Mi
```

---
## How to Edit an Existing Scoped Variable

{% hint style="warning" %}
### Who can Perform this Action?
 Only super admins can edit scoped variables
{% endhint %}

Only a super-admin can edit existing scoped variables.

### Option 1: Directly edit using the UI

![Figure 6: Editing from UI](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/edit.jpg)

### Option 2: Reupload the updated YAML file

![Figure 7: Re-uploading New File](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/reupload.jpg)

{% hint style="warning" %}
Re-uploading the YAML file will replace the previous file, so any variable that existed in the previous file but not in the latest one will be lost
{% endhint %}

### Option 3: Edit through 'Environments' tab

The **Environments** tab allows you to view and edit scoped variable values for individual environments. 

  1. Go to the **Environments** tab; you will see a list of all environments and how many scoped variables are defined for each of them. 
  
   ![Figure 8: Navigating to 'Environment' tab](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/scoped-variable-env-tab.jpg)

  2. Click the preferred environment name to view or edit. 
  
  3. You can edit the variables using the GUI or YAML mode. 

   ![Figure 9: Editing in GUI Mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/scoped-variable-edit-scoped-variable.jpg)

   ![Figure 10: Editing in YAML Mode](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/scoped-variable-edit-scoped-variable-yaml.jpg)
  
{% hint style="info" %}
### Note 
Any changes you made through this method will also update the saved YAML configuration.
{% endhint %}

---

## How to Use a Scoped Variable

{% hint style="warning" %}
### Who can Perform this Action?
 Users need to have Admin permission or above (along with access to the environment and application) to enable to use a scoped variable.
{% endhint %}

Once a variable is defined, it can be used by your authorized users on Devtron. A scoped variable widget would appear only on the screens that support its usage. 

Currently, the widget is shown only on the following screens in [App Configuration](../creating-application/README.md): 

* Workflow Editor → Edit build pipeline → Pre-build stage (tab)

* Workflow Editor → Edit build pipeline → Post-build stage (tab)

* Workflow Editor → Edit deployment pipeline → Post-Deployment stage (tab)

* Workflow Editor → Edit deployment pipeline → Post-Deployment stage (tab)

* Deployment Template

* ConfigMaps

* Secrets

![Figure 11: Unexpanded Widget](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/widget1.jpg)

To use a scoped variable, click on the floating widget; a list of variables will be visible. 

![Figure 12: Expanded Widget](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/widget-expanded.jpg)

Use the copy button to copy a relevant variable of your choice.

![Figure 13: Copying a Variable](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/display-value.jpg)

It would appear in the following format upon pasting it within an input field: `@{{variable-name}}`.

![Figure 14: Pasting a Variable](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/paste-value.jpg)

In case you are using a scoped variable in deployment template, you need to encapsulate it in double quotes i.e., `"@{{variable-name}}"`

![Figure 15: Using Scoped Variable in Deployment Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/scoped-variable-using-in-deployment-template.jpg)

![Figure 16: Performing a Dry Run](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/scoped-variable-dry-run.jpg)

**Note:** Ignore the red underline while using a scoped variable in the deployment template.

---

## Order of Precedence

When multiple values are associated with a scoped variable, the precedence order is as follows, with the highest priority at the top:

1. Environment + App [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

2. App [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

3. Environment [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

4. Cluster [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

5. Global

### Example

![Figure 17: Variable key in Red, Variable value in Green](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/scoped-variables/key-values.jpg)


1. **Environment + App:** This is the most specific scope, and it will take precedence over all other scopes. For example, the value of `DB name` variable for the `app1` application in the `prod` environment would be `app1-p`, even though there is a global `DB name` variable set to `Devtron`. If a variable value for this scope is not defined, the **App** scope will be checked.
2. **App:** This is the next most specific scope, and it will take precedence over the `Environment`, `Cluster`, and `Global` scopes. For example, the value of `DB name` variable for the `app1` application would be `project-tahiti`, even though the value of `DB name` exists in lower scopes. If a variable value for this scope is not defined, the **Environment** scope will be checked.
3. **Environment:** This is the next most specific scope, and it will take precedence over the `Cluster` and `Global` scopes. For example, the value of `DB name` variable in the `prod` environment would be `devtron-prod`, even though the value of `DB name` exists in lower scopes. If a variable value for this scope is not defined, the **Cluster** scope will be checked. 
4. **Cluster:** This is the next most specific scope, and it will take precedence over the `Global` scope. For example, the value of `DB name` variable in the `gcp-gke` cluster would be `Devtron-gcp`, even though there is a global `DB name` variable set to `Devtron-gcp`. If a variable value for this scope is not defined, the **Global** scope will be checked. 
5. **Global:** This is the least specific scope, and it will only be used if no variable values are found in other higher scopes. The value of `DB name` variable would be `Devtron`.

---

## List of Predefined Variables

There are some system variables that exist by default in Devtron that you can readily use if needed:

* **DEVTRON_NAMESPACE**: Provides name of the [namespace](../../reference/glossary.md#namespace)
* **DEVTRON_CLUSTER_NAME**: Provides name of the [cluster](../global-configurations/cluster-and-environments.md) configured on Devtron
* **DEVTRON_ENV_NAME**: Provides name of the [environment](../../reference/glossary.md#environment)
* **DEVTRON_IMAGE_TAG**: Provides [image tag](https://docs.docker.com/engine/reference/commandline/tag/) associated with the [container image](../../reference/glossary.md#image)
* **DEVTRON_IMAGE**: Provides full image path of the container image, e.g., `gcr.io/k8s-minikube/kicbase:v0.0.39`
* **DEVTRON_APP_NAME**: Provides name of the [application on Devtron](../create-application.md)

{% hint style="info" %}
Currently, these variables do not appear in the scoped variable widget, but you may use them. 
{% endhint %}