# Pre/Post Stages

The build and deployment pipelines includes Pre/Post stages where you can configure predefined or custom tasks to validate and introduce checkpoints in the build and deploy process.

* **Build Stage** includes **Pre-build stage** and **Post-build stage**.
* **Deployment Stage** includes **Pre-deployment** and **Post-deployment**.   

In Devtron, a task is a step within a CI/CD pipeline that runs a specific operation, such as executing a script or running a container image. Tasks can be created using preset plugins or custom scripts, and are executed in sequence to complete the process.

Preset plugins are micro tools that allow you to enhance and refine the CI/CD workflow of your application by adding new features, integrating with external tools, and automating tasks.Unlike custom scripts, preset plugins come bundled with specific variables and conditions that help you make the plugins work seamlessly with your CI/CD pipeline.

Some plugins are specific to build pipelines (used in **Pre-Build** and **Post-Build** stages), while others are specific to deployment pipelines (used in **Pre-Deployment** and **Post-Deployment** stages).

## Before you begin

Before you start adding Pre or Post tasks, make sure you have already setup your [Build pipeline](./ci-pipeline.md) or [Deployment pipeline](./cd-pipeline.md).

## Creating Pre/Post Tasks

Each Pre/Post task in build or deployment stage is executed as a series of events called tasks and includes custom scripts.

You can create one or more tasks. Tasks can be dependent on each other for execution, In other words, the output variable of one task can be used as an input for the next task. Tasks will execute in the order they are arranged and can be rearranged by drag-and-drop; however, the order of passing the variables must be followed.

You can create a task either by selecting one of the available preset plugins or by creating a custom script.

To create a pre/post task, follow the below steps

1. Navigate to **Configuration** → **Workflow Editor** of your Devtron App. 

2. Select the **build** or **deployment** pipeline for configuring the pre/post tasks.

 ![Figure 1: Selecting Workflow](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-workflow-editor.jpg)

3. Based on the pipeline you are editing, follow the steps below to add a task:
 
 * **Build pipelines:** On the **Edit build pipeline** window, select the **Pre-Build stage** or **Post-Build stage** tab.

 ![Figure 2: Pre/Post-build stages](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-edit-build.jpg)
 
 * **Deployment pipelines:** On the **Edit deployment pipeline** window, select the **Pre-Deployment stage** or **Post-Deployment stage** tab.

 ![Figure 3: Pre/Post-deployment stages](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-edit-deploy.jpg)

4. Select **+ Add task** to add a task.
 
 ![Figure 4: Adding task](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-add-task.jpg)

5. Configure the task using a preset plugin or **Execute custom task**; if you wish, you can add more tasks by clicking on **+ Add task** in the left-side panel.

 ![Figure 5: Configuring the task](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-configure.jpg)

6. Click **Update Pipeline**; The pre/post task will be executed when you trigger the next build or deployment.

 ![Figure 6: Select 'Update Pipeline'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-update-pipeline.jpg)

### Configure a Task using preset plugins

In Devtron, preset plugins are pre-defined tasks templates, that helps you automate and execute common operations such as provisioning infrastructure, taking backups, exporting container images etc., without writing custom scripts.

Devtron provides a set of built-in preset plugins, and you can also create your own plugins in devtron according to your specific needs.

Lets take `Codacy` as an example and configure it in the Pre-Build stage in the CI pipeline for finding bugs, detecting dependency vulnerabilities, and enforcing code standards

To create a task using preset plugins, lets take `Codacy` as an example and configure it in the **Pre-Build stage** in the build pipeline for finding bugs, detecting dependency vulnerabilities, and enforcing code standards.

To configure a task using the **Codacy** plugin follow the below steps:

1. Navigate to **Pre-Build stage** and select **+Add task**.

2. Search for `Codacy` in the **Search Plugin** bar and select **Codacy** from the list of plugins. 

 ![Figure 7: Searching 'Codacy' plugin](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-search-codacy.jpg)

   * The right-side panel will display the fields specific to the **Codacy** plugin which are required to be configured.

   * The left-side panel will now shows a task under **Tasks (IN ORDER OF EXECUTION)**, named after the selected plugin(by-default), along with it's logo.<br>You can change the task's name using the **Task name** field but plugin's logo will remain indicating that it is a preset plugin.

 ![Figure 8: Codacy plugin](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-codacy-plugin.jpg)

3. Refer the [Codacy](/docs/user-guide/plugins/codacy.md) documentation to configure the **Codacy** fields with appropriate values.

> Refer to the [Plugins documentation](/docs/user-guide/plugins/README.md) to explore and configure any of the available plugins. 

4. After configuring the fields successfully, your task will be created, if you wish, you can add more tasks by clicking on **+ Add task** in the left-side panel.

5. Select **Update pipeline**; The pre/post task will be executed when you trigger the next build or deployment.

Similarly you can configure any task with a preset plugin in Pre/post-build stages or pre/post-deployment stages. 

### Execute custom script

1. After adding the task, Select **Execute custom script**.

 ![Figure 9: Select 'Execute custom script'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-execute-custom-task.jpg)

 * The right-side panel will display the fields which are required to be configured in order to create the task.

 * The left-side panel will now displays a task under **Tasks (IN ORDER OF EXECUTION)**.

2. Enter the Task name(required) and Task Description (optional).

 ![Figure 10: Configuring Task](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-custom-task.jpg)

3. Select the **Task type**, it can be `Shell` or `Container Image`.

 * **Shell Tasks**: These execute shell scripts directly within the application runtime environment. In this type of tasks you can define inline scripts or use script files from your configured source code.

 * **Container Image Tasks**: These allows you to execute commands and scripts inside a custom docker container, instead of using the default environment provided by devtron, you can specify you own container image with all dependencies and tools required for the tasks. <br> These Tasks run using container in container approach, that means, the specified image is pulled and run inside the App pod, thus providing a complete isolated environment.

4. After selecting the **Task type**, you need to configure task-specific fields based on that **Task type**. Let's look at some examples below to configure both **Shell type** and **Container image** tasks.

### Example - Shell Task

Let's take an example of a **Shell task** in the Pre-Build stage that ensures the database configured is prod-db. If the configured database is anything else, the build should stop.

#### Tasks Configurations

 ![Figure 11a: Configuring Shell Task](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-shell-example.jpg)

 ![Figure 11b: Configuring Pass/Fail Condition](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-shell-task-2.jpg)

|Field| Values for This Example| Required/Optional | Description|
| :--- | :--- | :--- | :--- |
| `Task Name`| `check-db-name`| Required| Enter a name for the task|
| `Task Description`| `This task stops the build if database name is not 'prod-db'` | Optional | Short description for the task|
| `Task Type` | `Shell`| Optional| Select the preferred task type |
| `Input variables`| Refer the [Input Variable table](#input-variable-table) below | Optional| <p>These variables provide dynamic values to the script at the time of execution and are defined directly in the UI.<br></p><ul><li><strong>Variable name</strong>: Alphanumeric chars and (_) only</li><li><strong>Source or input value</strong>: The variable's value can be global, output from the previous task, or a custom value.<br>Accepted data types include: STRING</li></ul> |
| `Trigger/Skip condition` | Not required for this example | Optional| A conditional statement to execute or skip the task|
| `Script`| Refer the [Script](#script) below| Required| Custom script for executing tasks|
| `Output directory path`  | Not required for this example | Optional| Directory path where output files such as logs, errors, etc. will be available after the execution.|
| `Output variables`| Refer the [output variable](#output-variables) table| Optional| <p>Output variables  stores the output as variables and these variables can be used as input variables for the next task.</p><ul><li>[Pass/Failure Condition](#pass-fail-condition) (Optional): Conditional statements to determine the success/failure of the task. A failed condition stops the execution of the next task and/or build process</li></ul>|

#### Input Variable Table

 | Variable|Type| Value| Description|
 | :--- | :--- | :--- | :--- |
 | `DB_NAME`| String | `prod-db`| Name of the database to be backed up|

* To add a input variable, click **+ Add Variable** next to the **Input Variable**, a new table appear asking you to enter the variable and its required information.

* You can click `+` icon next to **Variable** header field to add more rows to the input variable table.<br>

 ![Figure 12: Variable configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-var-config.jpg)

* You can click the slider icon next to each variable name to make it's value required and add a description for it.

 ![Figure 13: Value configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-value-config.jpg)

* You can click the slider icon next to each variable value to add choices, allow custom input, and ask value at runtime.

 ![Figure 14: Add choice](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-choice.jpg)

#### Script

{% code title="Custom Script" overflow="wrap" lineNumbers="true" %}
```bash
#!/bin/sh 
set -eo pipefail 
#set -v  ## uncomment this to debug the script 

if [ "$DB_NAME" = "mysql" ]; then
  export DB_VALIDATION= pass
  echo $DB_VALIDATION
  echo "Using valid database: $DB_NAME"
else
  export DB_VALIDATION= fail
  echo $DB_VALIDATION
  echo "Unsupported DB: $DB_NAME. Only 'mysql' is allowed for this build."
fi
```
{% endcode %}

#### Output Variables

| Variable           | Type   | Description                                         |
| ------------------ | ------ | --------------------------------------------------- |
| `DB_VALIDATION`    | String | Indicates whether the DB is valid (pass or fail)  |

#### Pass/Fail Condition

PASS If: `DB_VALIDATION == pass`

After adding this database validation task, you can add more tasks as well, for example, you can add a follow-up Pre-Build task that runs only if the database is valid.

### Example - Container Image Task

Let's take an example of a **Container Image Task** that verify that the configured database is reachable and accepting connections before executing build stage. This ensures that the build does not proceed if the database configuration is incorrect or unreachable, saving time and resources.

Since we have already configured a shell task to validate that the database name, we will add this task after the shell task; This means it will execute after the shell task. This container image task will run only if that check passes, to verify that we are connecting to the correct database and that it is reachable before the build starts.

#### Tasks Configurations

 ![Figure 15a: Container Image Task](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-container-task.jpg)

 ![Figure 15b: Configuring task](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-container-task-2.jpg)

| Field| Values for This Example| Required/Optional | Description|
| :---|:---|:---|:---|
| `Task name`| `verify-db-connectivity`| Required|Enter a name for the task|
| `Description`| Verify DB connection before build | Optional| A descriptive message for the task|
| `Task type`| `Container Image`| Optional| Allows you to execute commands and scripts inside a custom docker container|
| `Input variables`| Refer the [Input Variable table](#input-variable-table-1) below | Optional| <p>These variables provide dynamic values to the script and are defined directly in the UI.<br></p><ul><li><strong>Variable name</strong>: Alphanumeric chars and (_) only</li><li><strong>Source or input value</strong>: The variable's value can be global, output from the previous task, or a custom value.<br>Accepted data types include: STRING</li></ul> |
| `Trigger/Skip condition`| `DB_VALIDATION == pass`| Optional| Execute or skip the task based on the condition provided.|
| `Container image`| `mysql:8.0`| Required| Select an image from the drop-down list or enter a custom value in the format `<image>:<tag>`|
| `Mount custom code`| Refer below [Mount custom code](#mount-custom-code) section| Optional| <p>Enable to mount the custom code in the container. Enter the script in the box below.</p><ul><li>**Mount above code at** (required): Path where the code should be mounted eg., `/scripts`</li></ul>|
| `Command`| `sh`| Optional|Mention commands to execute inside the container|
| `Args`| `/scripts/check-db.sh`| Optional| The arguments to be passed to the command mentioned in the command field|
| `Port mapping`| `No`| Optional| The port number on which the container listens. The port number exposes the container to outside services.|
| `Mount code to container`| `yes`| Optional| Mounts the source code (configured git repository) inside the container. Default is "No". If set to "Yes", enter the path where the source should be mounted inside the container.|
| `Mount directory from host` |`No`| Optional| Mount any directory from the host into the container. This can be used to mount code or even output directories.|
| `Output directory path`|`No`| Optional| Directory path where output files such as logs, errors, etc. will be available after the execution.|

#### Input Variable Table

| Variable| Type| Value| Description|
| :--- | :---| :--- | :--- |
| `DB_NAME`| String | `prod`| Name of the database|
| `DB_HOST` | String | `192.168.1.10` | Database hostname or IP address|
| `DB_USER` | String | `root` | Database user|

* To add a input variable, click **+ Add Variable** next to the `Input Variable`, a new table appear asking you to enter the variable and its required information.

* You can click `+` icon next to **Variable** header field to add more rows to the input variable table.<br>

 ![Figure 16: Variable configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-var-config.jpg)

* You can click the slider icon next to each variable name to make it's value required and add a description for it.

 ![Figure 17: Value configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-value-config.jpg)

* You can click the slider icon next to each variable value to add choices, allow custom input, and ask value at runtime.

 ![Figure 18: Add choice](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/workflow-editor-choice.jpg)

#### Mount Custom Code

{% code title="Custom Script" overflow="wrap" lineNumbers="true" %}
```bash
#!/bin/sh
set -e

echo "Checking database connectivity to $DB_NAME at $DB_HOST..."

mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1;" "$DB_NAME"

if [ $? -eq 0 ]; then
  echo "DB_CONNECTION=pass"
  echo "Database connectivity check passed."
else
  echo "DB_CONNECTION=fail"
  echo "Database connectivity check failed."
  exit 1
fi
```
{% endcode %}

**Note:** The examples above demonstrate configuring tasks in the Pre-Build stage, you can add tasks in the Post-Build, Pre-Deployment, and Post-Deployment stages in exactly the same way.

---

## Additional configurations for Pre/Post-Deployment Tasks

Pre/Post-Deployment Tasks have some additional configurations (required and optional) which are not available in Pre/Post build tasks. These configurations are explained below

### Trigger Pre/Post-Deployment Stage

The execution of the Pre/Post-Deployment stages can be set to:

**Automatically (default):** 

 * Pre-deployment stage will trigger automatically when the build image is available. 
 * Post-deployment stage will trigger automatically after the successful deployment.

**Manually:** User needs to trigger Pre/Post-Deployment stages manually.

 ![Figure 19: Trigger Deployment Pipeline](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-trigger-post.jpg)

### ConfigMaps & Secrets

{% hint style="info" %}
### Prerequisites
Make sure you have added [ConfigMaps](../config-maps.md) and [Secrets](../secrets.md) in App Configuration.
{% endhint %}

If you want to use some configuration files and secrets in pre-deployment stages or post-deployment stages, then you can use the `ConfigMaps` & `Secrets` options. You will get them as a drop-down in the pre-deployment stage.

![Figure 20: ConfigMaps & Secrets](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-cm-secret.jpg)

### Execute tasks in application environment

These `Pre-deployment CD / Post-deployment CD` pods can be created in your deployment cluster or the devtron build cluster. If your scripts/tasks has some dependency on the deployment environment, you may run these pods in the deployment cluster. Thus, your scripts \(if any\) can interact with the cluster services that may not be publicly exposed.

Some tasks require extra permissions for the node where Devtron is installed. However, if the node already has the necessary permissions for deploying applications, there is no need to assign them again. Instead, you can enable the **Execute tasks in application environment** option for the pre-CD or post-CD steps. By default, this option is disabled.

![Figure 21: Execute tasks in application environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/pre-post-execute-tasks.jpg)

To enable the `Execute tasks in application environment` option, follow these steps:

{% hint style="info" %}
Make sure your cluster has [devtron-agent](../../global-configurations/cluster-and-environments.md#installing-devtron-agent) installed.
{% endhint %}

1. Go to the chart store and search for the devtron-in-clustercd chart.

  ![Figure 22: 'devtron-in-clustercd' Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/devtron-incluster-chart.jpg)

2. Configure the chart according to your requirements and deploy it in the target cluster.

3. After the deployment, edit the devtron-cm configmap and add the following key-value pair:

  ```bash
  ORCH_HOST: <host_url>/orchestrator/webhook/msg/nats

  Example:

  ORCH_HOST: http://xyz.devtron.com/orchestrator/webhook/msg/nats

  ```

  `ORCH_HOST` value should be same as of `CD_EXTERNAL_LISTENER_URL` value which is passed in values.yaml.

  ![Figure 23: Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/incluster-configuration.jpg)

4. Delete the Devtron pod using the following command:

  ```bash
  kubectl delete pod -l app=devtron -n devtroncd
  ```

5. Again navigate to the chart store and search for the "migration-incluster-cd" chart.

  ![Figure 24: 'migration-incluster-cd' chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/migration-incluster-chart.jpg)

6. Edit the `cluster-name` and `secret name` values within the chart. The `cluster name` refers to the name used when adding the cluster in the global configuration and for which you are going to enable `Execute tasks in application environment` option.

  ![Figure 25: Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/workflow-cd-pipeline/migration-incluster.jpg)

7. Deploy the chart in any environment within the Devtron cluster. Now you should be able to enable `Execute tasks in application environment` option for an environment of target cluster.

---

## What's next

Trigger the [CI pipeline](../../deploying-application/triggering-ci.md)

Trigger the [CD pipeline](../../deploying-application/triggering-cd.md)
