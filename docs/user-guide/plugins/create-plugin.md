# Create Your Plugin

## Introduction

Devtron lets you create plugins to run specific tasks at different stages of your CI/CD pipelines. You can create any of the following:
* CI plugin (in pre-build/post-build stage)
* CD plugin (in pre-deployment/post-deployment stage)
...or both.

You can achieve this by converting a fully functional custom task into a plugin. Creating a plugin makes it reusable with other CI or CD pipelines. 

---

## Plugin Creation

There are two parts to creating a plugin:
1. [Create a Custom Task](#part-1-create-a-custom-task)
2. [Convert Custom Task to a Plugin](#part-2-convert-custom-task-to-a-plugin)

### Part 1: Create a Custom Task

{% hint style="warning" %}
### Who Can Perform This Action?
Only superadmins can create plugins.
{% endhint %}

{% hint style="info" %}
### Prerequisite
A build or deployment pipeline must exist in the **Workflow Editor** of your app.
{% endhint %}

In the following example, we are creating a plugin named 'Secret Management Validator'.

1. Go to **Applications** and select your app from the **Devtron Apps** tab.

    ![Figure 1: Choosing your App](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/select-devtron-app.jpg)

2. From the **Configurations** tab, go to **Workflow Editor**.

    ![Figure 2: Workflow Editor](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/workflow-editor.jpg)

3. Click any pipeline (build/deployment pipeline).

    ![Figure 3: Selecting Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/select-pipeline.jpg)

4. Go to the **Pre** or **Post** stage of your pipeline, e.g., `Pre-build stage`.

    ![Figure 4: Selecting Stage](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/pre-build-stage.jpg)

5. Click **+ Add Task** to create a plugin from scratch or click an existing task.

    ![Figure 5: Adding a Task](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/execute-custom-task.jpg)

6. On the **Execute Custom Task** page, fill the following details:

    * **Task Name** - Give a name to the task, e.g., `Secret Management Validator Task`.
    * **Description** - Write the purpose of the task in brief.
    * **Task Type** - Choose `Shell` if the task consists of shell commands or choose `Container Image` in case of complex operations that require a specific container environment (refer ['Container Image' task](../creating-application/workflow/pre-post-tasks.md#example-3-container-image-task)). 
    * **Input Variables** - Add one or more input variables to accept values from the user. Give a name to your input variable along with a description and input type (String/Number/Boolean/Date).
    * **Trigger Skip Condition** - Here you can set conditions to execute or skip the task. You can select **Set trigger conditions** to execute the task, or **Set skip conditions** to skip the task.
    * **Script** - Enter the script to be executed.
    * **Output directory path** - Enter the directory where your script will write/produce output files (e.g., test report, zip files).
    * **Output Variables** - Similar to input variables, you can create variables whose values will be generated as output after task execution.

    ![Figure 6: 'Execute Custom Task' Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/custom-task-page.jpg)

7. Click **Update Pipeline**.

    ![Figure 7: 'Update Pipeline' Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/update-plugin.jpg)

{% hint style="success" %}
### Next Steps
Go to the **Build & Deploy** tab of your application and run the pipeline having your custom task. If the custom task executes correctly and the script performs as expected, you may proceed to [save your custom task as a plugin](#part-2-convert-custom-task-to-a-plugin).
{% endhint %} 

---

### Part 2: Convert Custom Task to a Plugin

1. Go to your custom task that you have tried and tested, and click **Save as Plugin**.

    ![Figure 8: 'Save as Plugin' Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/save-as-plugin.jpg)

2. In the **New plugin** tab, fill the following details:

    | Fields | Description |
    |--------|-------------|
    | **Plugin Icon** | Enter the online URL of your plugin icon (jpg/png supported). This image will be shown alongside your plugin name in the list of plugins. |
    | **Plugin display name** | Enter the name of your plugin, e.g., `Secret Management Validator` |
    | **Plugin ID** | Enter a unique identifier for your plugin, e.g., `sec-mgmt-val` |
    | **Plugin version** | Enter the version of your plugin. We recommend using semantic versioning, e.g., `1.0.0` |
    | **Documentation link** | Give the user guide link for this plugin, e.g., `https://docs.devtron.ai/usage/plugins/plugin-list/jira-validator` |
    | **Description** | Enter a brief description of your plugin explaining what the plugin does |
    | **Tags** | Select one or more tags from the list or create your own tag. This tag helps in identifying and classifying the plugin, e.g., `Compliance` `Secrets` `Security`.|

    ![Figure 8: Entering New Plugin Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/new-plugin-tab.jpg)

3. You have the option of marking the input variables (defined in step 6 earlier) as mandatory/optional. Enabling the toggle will make the input variable mandatory for your users.

    ![Figure 9: Marking Variables as Mandatory or Optional](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/mandatory-optional.jpg)

4. Since you created the plugin from a custom task, you get an option to replace the original task with your plugin (in the task list).

    ![Figure 10: Replace Task with Plugin](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/replace-with-plugin.jpg)

5. Click **Create Plugin Version**.

    ![Figure 11: 'Create Plugin Version' Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/create-plugin-version.jpg)

6. Your new plugin would appear in the list of plugins.

    ![Figure 12: List of Plugins](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/plugin-list-visible.jpg)

---

## Create a New Version of Plugin

{% hint style="warning" %}
### Who Can Perform This Action?
Only superadmins can create new versions of a plugin.
{% endhint %}

You may create incremental versions of your plugin (e.g., `1.0.0` → `1.0.1` or `2.0.0`). The old version(s) of your plugins will still be available to your users.

1. Follow steps 1-7 from the [Create a New Plugin](#create-a-new-plugin) section of this document.

2. From the **New version of existing plugin** tab, select the plugin for which you want to create a new version from the **Existing Plugin** dropdown.

    ![Figure 13: Selecting Existing Plugin for Versioning](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/existing-plugin-select.jpg)

3. Specify the new version in the **New version** field.

    ![Figure 14: Creating New Version](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/new-plugin-version.jpg)

4. Verify the details in the remaining fields that got auto-populated from your existing plugin and modify if required.

5. Click **Create Plugin Version**.

6. You can view and use the available plugin versions as shown below.

    ![Figure 15: Selecting a Version](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/plugin-versions.jpg)



<!-- ## API Call

{% hint style="warning" %}
### Prerequisite
You will need a [token](../../user-guide/global-configurations/authorization/api-tokens.md) to make API calls
{% endhint %}

```
POST {{DEVTRON_BASEURL}}/orchestrator/plugin/global
```

--- -->

<!-- ### Sample Request Body

{% code title="Plugin Request Body" overflow="wrap" lineNumbers="true" %}

```json
{
    "name": "Secret Management Validator",
    "description": "The Secret Management Validator plugin integrates with your CI/CD pipeline to automatically detect and prevent the inclusion of secrets or sensitive information in your codebase, ensuring compliance and security.",
    "type": "SHARED",
    "icon": "https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/vectors/secret-management-validator.png",
    "tags": ["security", "compliance", "secrets"],
    "action": 0,
    "pluginStage": "CI_CD",
    "pluginSteps": [
        {
            "name": "Step 1",
            "description": "Step 1 - Secret Management Validator",
            "index": 1,
            "stepType": "INLINE",
            "refPluginId": 0,
            "outputDirectoryPath": null,
            "dependentOnStep": "",
            "pluginStepVariable": [
                {
                    "name": "PathToScan",
                    "format": "STRING",
                    "description": "The relative path to the directory or file that needs to be scanned for secrets.",
                    "isExposed": true,
                    "allowEmptyValue": true,
                    "defaultValue": "",
                    "variableType": "INPUT",
                    "valueType": "NEW",
                    "variableStepIndex": 1,
                    "variableStepIndexInPlugin": 0
                },
                {
                    "name": "GitGuardianApiKey",
                    "format": "STRING",
                    "description": "The API key for GitGuardian to authenticate and use the secret detection service.",
                    "isExposed": true,
                    "allowEmptyValue": false,
                    "defaultValue": "",
                    "variableType": "INPUT",
                    "valueType": "NEW",
                    "variableStepIndex": 1,
                    "variableStepIndexInPlugin": 0
                },
                {
                    "name": "ScanScope",
                    "format": "STRING",
                    "description": "Defines the scope of the scan. It can be set to scan all files, specific file types, or based on patterns.",
                    "isExposed": true,
                    "allowEmptyValue": true,
                    "defaultValue": "all",
                    "variableType": "INPUT",
                    "valueType": "NEW",
                    "variableStepIndex": 1,
                    "variableStepIndexInPlugin": 0
                },
                {
                    "name": "OutputFormat",
                    "format": "STRING",
                    "description": "The desired format for the output report, such as JSON, HTML, or plaintext.",
                    "isExposed": true,
                    "allowEmptyValue": true,
                    "defaultValue": "JSON",
                    "variableType": "INPUT",
                    "valueType": "NEW",
                    "variableStepIndex": 1,
                    "variableStepIndexInPlugin": 0
                }
            ],
            "pluginPipelineScript": {
                "script": "\n# Run GitGuardian secret detection\nif [ -n \"$GITGUARDIAN_API_KEY\" ]; then\n echo \"Running GitGuardian Secret Detection...\"\n ggshield scan path $SCAN_PATH --api-key $GITGUARDIAN_API_KEY\nelse\n echo \"GitGuardian API key is missing. Skipping secret detection.\"\nfi\n\n# Output the results\nif [ -f ggshield-output.json ]; then\n cat ggshield-output.json\nelse\n echo \"No GitGuardian output found.\"\nfi",
                "storeScriptAt": "",
                "type": "SHELL"
            }
        }
    ]
}

```
{% endcode %}

Required fields to edit in the above sample payload are:

| Key Path     | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| name         | Plugin name                                                   |
| description  | Plugin description                                            |
| tags         | Array of tags                                                 |
| icon         | Plugin icon url                                               |
| Plugin steps | Array of tasks to execute (Details of fields discussed below) |

Fields of a plugin steps are:

| Key Path                    | Description                                  |
| --------------------------- | -------------------------------------------- |
| name                        | Step name                                    |
| description                 | Description of step                          |
| index                       | Sequence at which the step needs to executed |
| outputDirectoryPath         | Artifact output path                         |
| pluginStepVariable          | Array of required input / output variables   |
| pluginPipelineScript.script | Stringified bash script                      |


### Result

Your new plugin will appear under **Shared Plugins** depending on which stage you have created it for: pre/post build (`pluginStage = CI`), pre/post deployment (`pluginStage = CD`), or both (`pluginStage = CI_CD`)

![New Shared Plugin](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/shared-plugin.jpg)

The variables defined in the `pluginStepVariable` array would appear as shown below.

![Plugin Fields](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/plugins/create-plugin/plugin-fields.jpg)

---

<!-- ## Other API calls

To fetch details of a specific plugin by its ID

```
GET 
/orchestrator/plugin/global/detail/{pluginId}
```

To fetch details of all plugins

```
GET
/orchestrator/plugin/global/detail/all
```

To fetch list of all global variables

```
GET
/orchestrator/plugin/global/list/global-variable
```

---

## Field Definitions

Refer the [spec file](https://github.com/devtron-labs/devtron/blob/main/specs/global-plugin.yaml) for detailed definition of each field present in the request/response body of the API. --> -->
