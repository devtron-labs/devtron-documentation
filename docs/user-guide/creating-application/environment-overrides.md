# Environment Overrides

You can view all environments associated with an application under the **Environment Overrides** section.

![Figure 1: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/environment-override-v3.jpg)

The Environment Overrides section allows you to customize the **Deployment Template**, **ConfigMaps**, and **Secrets** for different environments such as development, testing, staging, and production.

## How it works

* When you add a deployment pipeline to an application's workflow, each environment configuration initially inherits the Deployment Template, ConfigMap and Secret from the **Base Configurations** of the application.

* The **Environment Overrides** section lets you customize those Deployment Template, ConfigMap and Secret per environment without affecting those of other environments. For example, in a non-production environment, you might allocate `100m` CPU, while in production, you may increase it to `500m` to handle higher traffic.

---

## Environment Configurations Page

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have [Admin role](../user-guide/global-configurations/authorization/user-access.md#role-based-access-levels) or above (along with access to the environment and applications) to perform environment override.
{% endhint %}

1. In your application, go to **Configurations** → **Environment Overrides**. 

    ![Figure 2: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/config-env-override.jpg)

2. Select an environment whose configurations you wish to modify.

    ![Figure 3: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/environment-override-v3.jpg)

3. You will get the following options (similar to the **Base Configurations** page):
    * [Deployment Template](#deployment-template)
    * [ConfigMaps](#configmaps--secrets)
    * [Secrets](#configmaps--secrets)

    ![Figure 4: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/env-config-screen.gif)

Let's visit each of the configuration files and see how to override the values for the selected environment (*banking-final*).

---

## Override Deployment Template

As you can see, the Deployment Template for the *banking-final* environment shows 3 tabs:
* Inherited
* No override or Override
* Dry run

1. Go to the **Inherited** tab. This will show the inherited configuration in a read-only YAML editor. You cannot edit any values here.

    ![Figure 5: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/inherited-dt.gif)

2. Clicking **No override** to override the inherited configuration (if not done already).

    ![Figure 6: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/no-override-tab.gif)

3. Click the **Create Override** button.

    ![Figure 7: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/create-override.gif)

4. In the same tab (now labelled as **Override**), you can choose any one mode for changing the configuration values:
    * **YAML** - This mode has a YAML based editor intended for advanced users. [Click here](../creating-application/base-config/deployment-template/deployment.md#yaml) to know more about each key-value pair within the `YAML` section.
    * **GUI** - This mode has a user-friendly interface intended for beginner to advanced users. [Click here](../creating-application/base-config/deployment-template.md#using-gui) to know more about each field within the `GUI` section.

{% hint style="info" %}
Users who are not super-admins will land on GUI mode when they override; whereas super-admins will land on YAML mode. This is just the default behavior, users can still toggle the mode if needed.
{% endhint %}

Let's choose YAML mode for now and proceed. If you prefer GUI mode, go to [Override in GUI mode](#gui-mode) section.

5. You can override the values using any merge strategy:
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

    {% embed url="https://www.youtube.com/watch?v=phhv1_2eStI" %}


* Or you may copy-paste the entire config, and change the fields.

    {% embed url="https://www.youtube.com/watch?v=4eHM5ZsNoCg" %}


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

![Figure 10: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/replace-dt.gif)

{% embed url="https://www.youtube.com/watch?v=KGLAT_LUqQk" %}

{% hint style="info" %}
### What if the some keys are locked from editing?
You cannot modify locked keys in an environment's deployment template unless you are a super-admin. Refer [Lock Deployment Configuration](../../global-configurations/lock-deployment-config.md) to know more. 
{% endhint %}

---

## Override ConfigMap & Secret

If you want to configure your ConfigMap and Secret at the application-level then you can provide them in [ConfigMaps](../creating-application/base-config/config-maps.md) and [Secrets](../creating-application/base-config/secrets.md), but if you want to have environment-specific ConfigMap and Secret, use **Environment Override** to create them. At the time of deployment, it will pick both of them and pass them to your cluster.

The process to override both ConfigMaps and Secrets is similar to [Override Deployment Template](#override-deployment-template). Refer the tutorials below to know the process.

### Using Patch Strategy

{% embed url="https://www.youtube.com/watch?v=kYE5iFctg4E" %}

### Using Replace Strategy

{% embed url="https://www.youtube.com/watch?v=lSoj8wwOej0" %}

---

## Overriding in GUI mode

The above sections, i.e., [Override Deployment Template](#override-deployment-template) and [Override ConfigMap & Secret](#override-configmap--secret) explained the process of environment override using YAML.

Refer the below tutorial videos to know the process of overriding them using GUI.

### Override Deployment Template using GUI 

{% embed url="https://www.youtube.com/watch?v=Wh5WKvkYNDw" %}

{% hint style="info" %}
### Want to customize the deployment template values displayed on GUI? [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)
The GUI mode shows limited number of fields as specified by the super-admin in the GUI schema. Refer [Customize GUI](../creating-application/base-config/deployment-template.md#customize-basic-gui) to know more.
{% endhint %}

### Override ConfigMaps and Secrets using GUI

{% embed url="https://www.youtube.com/watch?v=UOTKLVuSkDg" %}

---

## Delete Override

This action will discard the current overrides and the base configuration file (in this example, deployment template) will be restored back for the environment. 

1. On the right side, click the kebab menu (3 vertical dots).
2. Click **Delete Override**.
3. Confirm the deletion in the dialogbox.

![Figure 10: ](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/environment-overrides/delete-override.gif)


---

## Protected Environment Configurations [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Any changes made to the protected environment configurations (Deployment Template, ConfigMap, Secret) will require approval if an [approval policy](../global-configurations/approval-policy.md) is enforced.

{% embed url="https://www.youtube.com/watch?v=_BidCVR3hxY" %}



