# Environment Overrides

You can view all environments associated with an application under the **Environment Overrides** section.

![Figure 1: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/environment-override-v3.jpg)

The Environment Overrides section allows you to customize the **Deployment Template**, **ConfigMaps**, and **Secrets** for different environments such as development, testing, staging, and production.

## How it works

* When you add a deployment pipeline to an application's workflow, each environment configuration initially inherits the Deployment Template, ConfigMap and Secret from the **Base Configurations** of the application.
* The **Environment Overrides** section lets you customize those Deployment Template, ConfigMap and Secret per environment without affecting those of other environment. For example, in a non-production environment, you might allocate 100m CPU, while in production, you increase it to 500m to handle higher traffic.

---

## Environment Configurations Page

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have [Admin role](../user-guide/global-configurations/authorization/user-access.md#role-based-access-levels) or above (along with access to the environment and applications) to perform environment override.
{% endhint %}

1. In your application, go to **Configurations** → **Environment Overrides**. 

    ![Figure 2: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/config-env-override.jpg)

2. Select an environment whose configurations you wish to modify.

    ![Figure 3: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/environment-override-v3.jpg)

3. You see the following options (similar to the **Base Configurations** page):
    * [Deployment Template](#deployment-template)
    * [ConfigMaps](#configmaps--secrets)
    * [Secrets](#configmaps--secrets)

    ![Figure 4: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/env-config-screen.gif)

Let's visit each of the configuration files and see how to override the values for the selected environment (*banking-final*).

---

## Override Deployment Template

As you can see, the Deployment Template for the *banking-final* environment shows 3 tabs:
* Inherited
* No override or Override
* Dry run

1. Go the **Inherited** tab. This will show the inherited configuration in a read-only YAML editor. You cannot edit any values here.

    ![Figure 5: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/inherited-dt.gif)

2. You can override the configuration (if not done already) by clicking **No override**.

    ![Figure 6: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/no-override-tab.gif)

3. Click the **Create Override** button.

    ![Figure 7: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/create-override.gif)

4. In the same tab (now labelled as **Override**), you can choose any one mode for changing the configuration values:
    * **YAML** - This is a YAML based editor intended to cater advanced users
    * **GUI** - This is a user-friendly interface intended to cater beginner to advanced users.

{% hint style="info" %}
Users who are not super-admins will land on [GUI](#gui) mode when they override; whereas super-admins will land on [YAML](#yaml) mode. This is just a default behavior, they can still toggle the mode if needed.
{% endhint %}

Let's choose YAML mode for now and proceed. If you prefer GUI mode, go to [Override in GUI mode](#gui-mode) section.

5. You can override the values using any Merge Strategy:
    * [Patch](#using-patch-strategy)
    * [Replace](#using-replace-strategy)

### Using Patch Strategy

* Only the fields you explicitly specify are updated.  
* All other inherited fields remain unchanged.
* Best for minor edits.

| Field     | Inherited Configuration | User Input (with Patch) | Final Configuration  |
|-----------|--------------------|----------------------------|----------------------|
| cpu       | 100m               | 500m                       | 500m                 |
| memory    | 256Mi              | *(Not specified)*          | 256Mi *(Unchanged)*  |
| replicas  | 2                  | *(Not specified)*          | 2 *(Unchanged)*      |
| logLevel  | "info"             | *(Not specified)*          | "info" *(Unchanged)* |
| timeout   | (Not specified)    | 30s                        | 30s (Added)          |

You can achieve this by doing either of the following to achieve the same outcome: 

* If you know the fields you wish to replace, simply enter the changed key-value fields along with indentation (if any).

    ![Figure 8: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/patch1.gif)

* Or you may copy-paste the entire config, and change the fields.

    ![Figure 9: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/patch2.gif)


### Using Replace Strategy 

* The entire configuration is replaced with your new environment-specific settings.
* Any fields not included in the new configuration are completely removed.
* Any fields included in the new configuration are added.
* Best for a complete override.

| Field     | Inherited Configuration | User Input (with Replace) | Final Configuration |
|-----------|--------------------|------------------------------|---------------------|
| cpu       | 100m               | 500m                         | 500m                |
| memory    | 256Mi              | 512Mi                        | 512Mi               |
| replicas  | 2                  | *(Not specified)*            | *(Removed)*         |
| logLevel  | "info"             | *(Not specified)*            | *(Removed)*         |
| timeout   | (Not specified)    | 30s                          | 30s (Added)         |

![Figure 10: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/no-override-tab.gif)

[Click here](../creating-application/deployment-template/deployment.md#3-advanced-yaml) to know more about each key-value pair within the `YAML` section.

---

## Override ConfigMap

The same goes for `ConfigMap` and `Secrets`. You can also create an environment-specific configmap and Secrets inside the `Environment override` section.

If you want to configure your ConfigMap and secrets at the application level then you can provide them in [ConfigMaps](config-maps.md) and [Secrets](secrets.md), but if you want to have environment-specific ConfigMap and secrets then provide them under the Environment override Section. At the time of deployment, it will pick both of them and provide them inside your cluster.

To update a ConfigMap, follow the steps below:
1. In your environment, click **ConfigMaps**.
2. Click the ConfigMap you wish to update.
3. Click **Allow Override**.
4. Edit your ConfigMap.
5. Click **Save Changes**.

![Figure 2: Updating ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/update-configmap.gif)

Similarly, you can update Secrets too as shown below.

![Figure 3: Updating Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/update-secret.gif)

---

## Override Secret

---

## Overriding in GUI mode

{% hint style="info" %}
### Want to customize the fields displayed on GUI? [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)
Refer [Customize GUI](../creating-application/deployment-template.md#customize-basic-gui) to know the process of adding, removing, and customizing the GUI section.
{% endhint %}


![Figure 2: Overriding Deployment Template - GUI Method](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/base-config-override.gif)

Refer [base configuration](../creating-application/deployment-template/deployment.md#2.-basic-configuration) to know more about each field within the `GUI` section.


---

## Delete Override

This action will discard the current overrides and the base configuration (in this example, deployment template) will be restored back for the environment. 

1. On the right side, click the kebab menu (3 vertical dots).
2. Click **Delete Override**.
3. Confirm the deletion in the dialogbox.

![Figure 10: App Configuration → Environment Overrides](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/no-override-tab.gif)
