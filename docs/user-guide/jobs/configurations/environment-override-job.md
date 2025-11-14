# Environment Overrides

The Environment Overrides section allows you to customize the **ConfigMaps**, and **Secrets** for different environments such as development, testing, staging, and production, and it even allows you to create additional **ConfigMaps**, and **Secrets** (if required) for different environments

## How it Works ?

* When you add a job pipeline to a job's workflow, each environment configuration initially inherits the ConfigMap and Secret from the **Base Configurations** of the job.

* The **Environment Overrides** section lets you customize the ConfigMap and Secret per environment without affecting those of other environments. For example, in a non-production environment, you might allocate `100m` CPU, while in production, you may increase it to `500m` to handle higher traffic, or you can add additional ConfigMaps and Secrets for testing environments, while production uses only the base configurations needed to run the application

---

## Environment Configurations Page

:::caution Who Can Perform This Action?
Users need to have the **Admin role** or the **Super Admin role**.
Refer the [User permissions](../../global-configurations/authorization/user-access.md#roles-available-for-jobs).
:::

1. In your job, go to **Configurations** (tab) → **Environment Overrides**. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over.jpg)
<center>Figure 1: Environment Override</center>

2. Click **Add Environment** and select an environment from the dropdown for which you want your configurations to be modified.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-select-env.jpg)
<center>Figure 2: Adding Environment</center>

3. The environment will be added under **Environment Override**. If you wish, you can add more environments by clicking **Add Environment**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-env-added.jpg)
<center>Figure 3: Selecting Environment</center>

4. Click on the environment you have added under **Environment Override**, you will get the following options (similar to the **ConfigMaps & Secrets** page):

    * **ConfigMaps**
    
    * **Secrets**

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-view.jpg)
<center>Figure 4: ConfigMaps & Secrets</center>

5. You can now do one of the following:

    * Override the existing **ConfigMap & Secrets** which are being inherited from the base configurations specific to the selected environment.

    * Create additional **ConfigMap & Secrets** specific to the selected environment.

Let's see how to override the values of ConfigMaps & Secrets for the selected environment.

---

## Override ConfigMaps & Secrets

If you want to have environment-specific **ConfigMaps & Secrets**, use **Environment Override** to override them for specific environments or create new environment-specific **ConfigMaps & Secrets**. At the time of execution, Devtron will pick environment-specific **ConfigMaps & Secrets** according to the environment in which the job is executed and pass them to your job pods.

1. Under the selected environment, select the **ConfigMap** or **Secret** you wish to override; by default, the ConfigMap or Secret is inherited from the base configuration.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-select-config-secret.jpg)
<center>Figure 5: Selecting ConfigMap or Secrets</center>

2. To create Override, select the **No Override** tab and click the **Create Override** button.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-create-override.jpg)
<center>Figure 6: Creating Override</center>

3. In the same tab (now labelled as **Override**), you can now change the configuration of your ConfigMap or Secret that will be specific to the selected environment.

    **Note** Except `Name` cannot be changed for ConfigMaps & Secrets that are inherited from the base configuration.
 
    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-config-override.jpg)
<center>Figure 7: Overriding ConfigMap or Secret</center>

4. Override the data values using [Replace](#replace-strategy) merge strategy.

### Replace Strategy 

* The entire configuration is replaced with your new environment-specific settings.
* The replaced template will no longer depend on or inherit from the base configuration anymore.
* Best for a complete override.

| Field     | Inherited Configuration | Input (with Replace)    | Final Configuration |
|-----------|--------------------|------------------------------|---------------------|
| cpu       | 100m               | 500m                         | 500m                |
| memory    | 256Mi              | 512Mi                        | 512Mi               |
| replicas  | 2                  | *(Not specified)*            | *(Removed)*         |
| logLevel  | "info"             | *(Not specified)*            | *(Removed)*         |
| timeout   | (Not specified)    | 30s                          | 30s (Added)         |

**Note:** To know how to configure ConfigMaps & Secrets refer to the following sections: <ul><li>[ConfigMaps](./configmap-secret/configmap-job.md)</li> <li> [Secrets](./configmap-secret/secret-job.md)</li></ul>

---

## Create Additional ConfigMaps & Secrets
 
To create additional ConfigMaps & Secrets, follow the given steps

1. Under the selected environment, click the `+` button next to ConfigMap or Secret.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-add-config-secret.jpg)
<center>Figure 8: Adding ConfigMap or Secret</center>

2. A configuration tab will open (which was previously named override) to add a new **ConfigMap** or **Secret**. 

    Follow the guide below to create a ConfigMap or Secret:

    * [Add ConfigMaps](./configmap-secret/configmap-job.md)
 
    * [Add Secrets](./configmap-secret/secret-job.md)
 
    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-add-view.jpg)
<center>Figure 9: Configuring ConfigMap or Secret</center>

3. Once created, a new ConfigMap or Secret will be added with a label `Created at environment` under its name, in the left section under ConfigMap or Secret, respectively.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-new-added.jpg)
<center>Figure 10: ConfigMap or Secret added</center>

---

## Delete Override

This action will discard the current overrides, and the base configuration file (in this example, the deployment template) will be restored back for the environment. 

1. On the right side, click the kebab menu (3 vertical dots).

2. Click **Delete Override**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-delete.jpg)
<center>Figure 11: Deleting Override</center>

3. Confirm the deletion in the dialog box.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/automation-and-enablement/jobs/env-over-delete-dialog-box.jpg)
<center>Figure 12: Confirming Delete Override</center>

---

After setting up **Environment Overrides**, you can refer to the [Trigger Job](../triggering-job.md) section to trigger your job pipeline in different environments. 
