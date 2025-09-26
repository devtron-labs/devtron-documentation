# Environment Overrides

You can view all environments associated with an application under the **Environment Overrides** section.

![Figure 1: Environment Overrides Section](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/environment-override-v3.jpg)

The Environment Overrides section allows you to customize the **Deployment Template**, **ConfigMaps**, and **Secrets** for different environments such as development, testing, staging, and production.

## How it works

* When you add a deployment pipeline to an application's workflow, each environment configuration initially inherits the Deployment Template, ConfigMap and Secret from the **Base Configurations** of the application.

* The **Environment Overrides** section lets you customize those Deployment Template, ConfigMap and Secret per environment without affecting those of other environments. For example, in a non-production environment, you might allocate `100m` CPU, while in production, you may increase it to `500m` to handle higher traffic.

---

## Environment Configurations Page

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have [Admin role](../global-configurations/authorization/user-access.md#roles-available-for-devtron-apps) or above (along with access to the environment and applications) to perform environment override.
{% endhint %}

1. In your application, go to **Configurations** → **Environment Overrides**. 

    ![Figure 2: Accessing Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/config-env-override.jpg)

2. Select an environment whose configurations you wish to modify.

    ![Figure 3: Selecting Environment](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/environment-override-v3.jpg)

3. You will get the following options (similar to the **Base Configurations** page):
    * [Deployment Template](#override-deployment-template)
    * [ConfigMaps](#override-configmap--secret)
    * [Secrets](#override-configmap--secret)

    ![Figure 4: Configuration Options](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/env-config-screen.gif)


Let's visit each of the configuration files and see how to override their values for the selected environment (say *banking-final*).

---

## Override Deployment Template

As you can see, the Deployment Template for the *banking-final* environment shows 3 tabs:
* Inherited
* No override or Override
* Dry run

1. Go to the **Inherited** tab. This will show the inherited configuration in a read-only YAML editor. You cannot edit any values here.

    ![Figure 5: Inherited Deployment Template](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/inherited-dt.gif)

2. Clicking **No override** to override the inherited configuration (if not done already).

    ![Figure 6: No Override Tab](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/no-override-tab.gif)

3. Click the **Create Override** button.

    ![Figure 7: Creat Override Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/create-override.gif)

4. In the same tab (now labelled as **Override**), you can choose any one mode for changing the configuration values:
    * **YAML** - This mode has a YAML based editor intended for advanced users. [Click here](../creating-application/base-config/deployment-template/deployment.md#yaml) to know more about each key-value pair within the `YAML` section.
    * **GUI** - This mode has a user-friendly interface intended for beginner to advanced users. [Click here](../creating-application/base-config/deployment-template.md#using-gui) to know more about each field within the `GUI` section.

{% hint style="info" %}
### Note
Users who are not super-admins will land on GUI mode when they override; whereas super-admins will land on YAML mode. This is just the default behavior, users can still toggle the mode if needed.
{% endhint %}

Let's choose YAML mode for now and proceed. If you prefer GUI mode, go to [Override Deployment Template using GUI](#override-deployment-template-using-gui) section.

5. You can override the values using any merge strategy:
    * [Patch](#using-patch-strategy) 
    * [Replace](#using-replace-strategy)

### Using Patch Strategy

Suppose you want to update only one field (e.g., `"username" = "johndoe"`) in a deployment template. Using the patch strategy, you can just update the field to `"username" = "mathew"`. All other fields in the deployment template will remain unchanged.

* Only the fields you explicitly specify are updated.  
* The patched template will continue to depend on the base configuration, so all other inherited fields remain unchanged and will continue to inherit in future.
* Best for minor edits.

| Field     | Inherited Configuration | Input (with Patch)    | Final Configuration  |
|-----------|--------------------|----------------------------|----------------------|
| cpu       | 100m               | 500m                       | 500m                 |
| memory    | 256Mi              | *(Not specified)*          | 256Mi *(Unchanged)*  |
| replicas  | 2                  | *(Not specified)*          | 2 *(Unchanged)*      |
| logLevel  | "info"             | *(Not specified)*          | "info" *(Unchanged)* |
| timeout   | (Not specified)    | 30s                        | 30s (Added)          |

If you know the fields you wish to change, simply enter the changed key-value fields along with indentation (if any).

{% embed url="https://www.youtube.com/watch?v=phhv1_2eStI" %}

<!--* Or you may copy-paste the entire config, and change the fields.
    {% embed url="https://www.youtube.com/watch?v=4eHM5ZsNoCg" %}
-->

### Using Replace Strategy 

Suppose you update your deployment chart version (e.g., from `4.0.0` to `4.0.1`). Although the new chart version contains new features and key-value pairs, if you prefer to keep a few configurations unchanged regardless of the new key-value pairs added in the new chart version, you can use the replace strategy.

* The entire configuration is replaced with your new environment-specific settings.
* The replaced template will no longer depend or inherit from base configuration anymore.
* Best for a complete override.

| Field     | Inherited Configuration | Input (with Replace)    | Final Configuration |
|-----------|--------------------|------------------------------|---------------------|
| cpu       | 100m               | 500m                         | 500m                |
| memory    | 256Mi              | 512Mi                        | 512Mi               |
| replicas  | 2                  | *(Not specified)*            | *(Removed)*         |
| logLevel  | "info"             | *(Not specified)*            | *(Removed)*         |
| timeout   | (Not specified)    | 30s                          | 30s (Added)         |

{% hint style="info" %}
### What if some keys are locked from editing?
You cannot modify locked keys in an environment's deployment template unless you are a super-admin. Refer [Lock Deployment Configuration](../global-configurations/lock-deployment-config.md) to know more.
{% endhint %}

### Override Deployment Template using GUI 

Follow the below steps to override your deployment template using GUI: 

1. Navigate to **Applications** and click on your preferred application. 

2. Go to **Configurations** → **Base Configurations** → **Environment Overrides** and click on your preferred environment to override deployment template.

3. Click on the **No Override** option and then click on **Create Override**. 

4. Click on the **GUI** option. The available fields will be displayed on the right side of the page. 

5. Select your preferred fields and enter the values to override.

6. Select your preferred merge strategy from the **Merge Strategy** drop-down box. 

7. Click on **Save Changes**.

{% hint style="info" %}

### Want to customize the deployment template values displayed on GUI? [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

The GUI mode shows limited number of fields as specified by the super-admin in the GUI schema. Refer [Customize GUI](../creating-application/base-config/deployment-template.md#customize-the-gui) to know more.

{% endhint %}

---

## Override ConfigMap & Secret

If you want to configure your ConfigMap and Secret at the application-level then you can provide them in [ConfigMaps](../creating-application/base-config/config-maps.md) and [Secrets](../creating-application/base-config/secrets.md), but if you want to have environment-specific ConfigMap and Secret, use **Environment Override** to create them. At the time of deployment, it will pick both of them and pass them to your cluster.

The process to override both ConfigMaps and Secrets is similar to [Override Deployment Template](#override-deployment-template). Refer the tutorials below to know the process in YAML mode. In case you wish to use GUI mode, skip to [Overriding in GUI mode](#override-configmaps-and-secrets-using-gui).

### Patch Strategy

{% hint style="info" %}

### Impact of Patch strategy on Base Configuration's CM/Secret?

You cannot delete a ConfigMap or Secret in **Base Configurations** if you have used 'Patch' strategy for overridding ConfigMap or Secret at your environment-level. This happens because they are still dependent and inheriting their values from Base Configurations.

{% endhint %}

### Replace Strategy

{% embed url="https://www.youtube.com/watch?v=lSoj8wwOej0" %}

### Override ConfigMaps and Secrets using GUI

{% embed url="https://www.youtube.com/watch?v=UOTKLVuSkDg" %}

---

## Delete Override

This action will discard the current overrides and the base configuration file (in this example, deployment template) will be restored back for the environment. 

1. On the right side, click the kebab menu (3 vertical dots).
2. Click **Delete Override**.
3. Confirm the deletion in the dialogbox.

![Figure 8: Delete Override Option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/delete-override.gif)

---

## Protected Environment Configurations [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Any changes made to the protected environment configurations (Deployment Template, ConfigMap, Secret) will require approval if an [approval policy](../global-configurations/approval-policy.md) is enforced.

Follow the below steps to make changes to a protected environment: 

1. Navigate to **Applications** and click on your preferred application. 

2. Go to **Configurations** → **Base Configurations** → **Environment Overrides** and click on your preferred environment.

3. Click on the **No Override** option and then click on **Create Override**.

4. Select your preferred merge strategy from the **Merge Strategy** drop-down box. 

5. Make changes to the key-value pairs in the **Patch data** section. 

6. Click **Save Changes**. The **Save as draft** pop-up page will be displayed.

    * **Save as draft** - Select this option if you want to continue making your changes later but save your changes as a draft for now.

    * **Save & Propose changes** - Select this option if you want to save and propose your changes to the approvers. You can then select the approvers to get notified regarding the change from the **Select approvers to notify** drop-down box. 

7. Enter your comments (reason for making the changes) in the **Comment** text box. 

8. Click **Propose Changes**. The corresponding approver will be notified via email regarding your request. 