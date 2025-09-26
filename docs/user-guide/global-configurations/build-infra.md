# Build Infra

## Introduction

The [CI process](../creating-application/workflow/ci-pipeline.md) involves activities that require infra resources such as CPU, memory (RAM), and many more. The amount of resources required depends on the complexity of the application. In other words, large applications require more resources compared to small applications.

Therefore, applying a common infra configuration to all applications is not optimal. Since resources incur heavy costs, it's wise to efficiently allocate resources (*not more, not less*). 

With the 'Build Infra' feature, Devtron makes it possible for you to tweak the resources as per the needs of your applications. The build (ci-runner) pod will be scheduled on an available node (considering applied taints and tolerations) in the cluster on which 'Devtron' is installed.

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to configure Build Infra.
{% endhint %}

---

## Configure Build Infra

From the left sidebar, go to **Global Configurations** → **Build Infra**. 

![Figure 1: Global Configurations - Build Infra](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/gc-build-infra.jpg)

Under **Profiles** tab, you will see the [Global Profile](#global-profile) and a list of [Custom Profiles](#creating-custom-profile) (if they exist). Setting up profiles makes it easier for you to manage the build infra configurations, ensuring its reusability in the long term.

### Global Profile

This contains the default infra configuration applicable to all the applications, be it large or small.

![Figure 2: Global Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/default-profile.jpg)

You may click it to modify the following:

|Field| Description |
|:---|:---|
|**CPU**|Processor core allocated to the build process. See [CPU units](#cpu-units).|
|**Memory**|RAM allocated to the build process. See [memory units](#memory-units).|
|**Build Timeout**|Max. time limit allocated to the build process. See [timeout units](#timeout-units).|
|**Node Selector** <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" height="12"></a> |Node Selector are key-value pair labels to match Pods with Nodes. To learn more, refer to [nodeSelector](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) page.|
|**Toleration** <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" height="12"></a>|A Toleration allow a pod to be scheduled on a Node that has a matching Taint. To learn more, refer to [Taints and Toleration](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) page.|
|**ConfigMaps** <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" height="12"></a>|Key Value pairs to store non-sensitive configurations. Refer to [ConfigMaps](../creating-application/base-config/config-maps.md).|
|**Secrets** <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" height="12"></a>|Key Value pairs to store sensitive configurations. Refer to [Secrets](../creating-application/base-config/secrets.md).|

{% hint style="info" %}
### Note
ConfigMaps and Secrets defined here will be used at the time of build, not during deployment.
{% endhint %}

![Figure 3: Editing Global Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/default-infra-config.jpg)

Furthermore, CPU and Memory have 2 fields each:

|Field|Description|
|:---|:---|
| **Request** | This field is use to specify the minimum guaranteed amount of CPU/Memory resources your application needs for its CI build. In our example, we required 1500m or 1.5 cores CPU along with 6 GB of RAM.|
| **Limit** | This field is use to set the maximum amount of CPU/Memory resources the build process can use, even if there is a lot available in the cluster.|


### Creating Custom Profile [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Instead of global profile, you can create custom profiles having different infra configurations. Example: One profile for Python apps, a second profile for large apps, and a third profile for small apps, and many more.

1. Click **Create Profile**.

    ![Figure 4: Creating Custom Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/create-new-profile.jpg)

2. Enter a name for the profile along with a brief description (optional) and click **Create** button.

    ![Figure 5: Entering Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/new-profile-fields.jpg)

3. Your custom profile will appear under the list of custom profiles as shown below.

    ![Figure 6: Profile Created](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/build-infra-profile-created.jpg)
   
4. Click on your custom profile; a new page will open displaying the custom runner configuration which is inherited from global profile by default.

    ![Figure 7: Editing Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/filled-profile-fields.jpg)

5. To modify a specific configuration, click the **edit** icon next to that configuration, and turn off the **Inherit** toggle; this will stop that configuration from being inherited from global profile.

    ![Figure 8: Configuring Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/new-profile-listed.jpg)

6. Modify the resources according to your use case and click **Save**.

7. Repeat step 5 and 6 to define other resources.

---

## Adding Platform Specific Configurations [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Modern applications often need to run on different hardware platforms (architectures), such as `amd64` (x86_64) and `arm64` to support cross-platform compatibility.

[Multi-architecture (multi-arch) builds](https://docs.docker.com/build/building/multi-platform/) enables you to build container images that work seamlessly across multiple platforms.

Optimizing your CI builds for each platform ensures:
   
   * **Better performance**: Builds are tailored to the capabilities of the target architecture.
   
   * **Resource efficiency**: Prevents over or under-provisioning, saving costs and improving reliability.

Each platform may have unique requirements for resources like CPU and memory, or they may benefit from different configuration of resources. Thus, Devtron allows defining platform specific configurations within a build infra profile. This ensures each build is executed with the right configurations specific to the target platform.

{% hint style="info" %}
### K8s Driver v/s Container Driver
 **Platform specific configurations** are only supported for builds executed using the k8s driver. 
 
 When you use the K8s driver, each build for a target platform runs as its own pod within your Kubernetes cluster. This allows you to assign different CPU, memory, and other configurations for each target platform like `amd64` or `arm64`. 
 
 If you use the container driver, all builds run inside a single CI runner pod and share the same configuration, regardless of the target platform while K8s driver.

 {% endhint %}

To configure platform specific configurations:

1. From the left sidebar, go to **Global Configurations** → **Build Infra**. 

2. Select the profile for which you want to configure platform specific configurations.

3. Check the **Use K8s driver for build** and click **+Add Target Platform**; a modal window will open.

4. Under **Select a target platform**, select the platform for which you want to define platform specific configurations.
     1. You can choose from `linux/amd64` or `linux/arm64`.

     2. You can also type to add a new platform.

5. Configure the resources for the specific platform and click **Save**.

6. The platform specific configuration will be available below the runner configuration.

{% embed url="https://www.youtube.com/watch?v=5nFJfai125U" caption="Platform Specific Configurations" %}

---

## Attaching Profile

Once you create a profile, attach it to the intended applications, or else the [global profile](#global-profile) will remain applied. 

1. Go to the **Applications** tab.

    ![Figure 9: Applications Tab](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/applications-tab.jpg)

2. Choose an application and click the dropdown below it.

    ![Figure 10: Profile Dropdown](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/profile-dropdown.jpg)

3. Choose the profile you wish to apply from the dropdown.

    ![Figure 11: Selecting a Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/profile-selection.jpg)

4. Click **Change** to apply the profile to your application.

    ![Figure 12: Confirming Profile Change](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/confirm-profile-change.jpg)


{% hint style="success" %}
### Tip
If you missed creating a profile but selected your application(s), you can use the 'Create Profile' button. This will quickly open a new tab for creating a profile. Once done, you can return and click the refresh icon as shown below.
{% endhint %}

![Figure 13: Quick Profile Creation](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/quick-profile-creation.jpg)

### Performing Bulk Action

If you wish to apply a profile to multiple applications at once, you can do that too.

Simply use the checkboxes to select the applications. You can do this even if there are many applications spanning multiple pages. You will see a draggable floating widget as shown below.

![Figure 14: Floating Widget](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/floating-widget.jpg)

Select the profile you wish to apply from the dropdown and confirm the changes.

![Figure 15: Selecting a Profile](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/profile-selection-bulk.jpg)

Once you apply a profile, it will show the count of applications attached to it.

![Figure 16: Count of Applications](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/profile-applicable-count.jpg)

---

## Editing or Deleting Profile

You can edit or delete a custom profile using the respective icons as shown below.

![Figure 17: Edit and Delete Icons](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/edit-delete-icons-v2.jpg)

If you delete a profile attached to one or more applications, the [global profile](#global-profile) will apply from the next build.

![Figure 18: Confirm Profile Deletion](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/build-infra/delete-dialog.jpg)


### Need More Options?

If you need extra control on the build infra configuration apart from CPU, memory, and build timeout, feel free to open a [GitHub issue](https://github.com/devtron-labs/devtron/issues) for us to help you.

---

## Extras

### CPU Units

CPU resources are measured in millicore. 1000m or 1000 millicore is equal to 1 core. If a node has 4 cores, the node's CPU capacity would be represented as 4000m.

### Memory Units

Memory is measured in bytes. You can enter memory with suffixes (E, P, T, G, M, K, and Ei, Pi, Ti, Gi, Mi, Ki).

| Symbol | Prefix | Value (Bytes)                   |
| ------ | ------ | ------------------------------- |
| m      | -      | 0.001 byte                      |
| byte   | -      | 1 byte                          |
| k      | Kilo   | 1,000 bytes                     |
| Ki     | Kibi   | 1,024 bytes                     |
| M      | Mega   | 1,000,000 bytes                 |
| Mi     | Mebi   | 1,048,576 bytes                 |
| G      | Giga   | 1,000,000,000 bytes             |
| Gi     | Gibi   | 1,073,741,824 bytes             |
| T      | Tera   | 1,000,000,000,000 bytes         |
| Ti     | Tebi   | 1,099,511,627,776 bytes         |
| P      | Peta   | 1,000,000,000,000,000 bytes     |
| Pi     | Petabi | 1,125,899,906,842,624 bytes     |
| E      | Exa    | 1,000,000,000,000,000,000 bytes |
| Ei     | Exabi  | 1,152,921,504,606,846,976 bytes |

### Timeout Units

You can specify timeouts in the following units, beyond which the build process would be marked as failed:

* seconds
* minutes
* hours


