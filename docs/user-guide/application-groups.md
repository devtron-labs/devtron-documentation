# Application Groups

## Introduction

Application groups in Devtron streamline the deployment of microservices by enabling you to build and deploy multiple applications simultaneously. This feature is particularly beneficial when your microservices are interdependent, as a change in one service often triggers the need to redeploy others.

:::info Note
Only one application group would exist for each [environment](../reference/glossary.md#environment). You cannot group applications belonging to different environments.

:::

---

## Accessing Application Groups

:::info Who Can Perform This Action?
Users need to have [View only permission](../user-guide/global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and applications) to view all the applications within a group.

:::

1. From the left sidebar, go to **Application Groups**

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/app-group-tab.jpg)
<center>Figure 1: Application Group (Beta)</center>

2. You will see a list of environments. Select the environment to view the application group.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/app-groups.jpg)
<center>Figure 2: List of Environments</center>

3. The application group would contain the applications meant for deployment in the chosen environment.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/app-group-overview.jpg)
<center>Figure 3: Sample Application Group</center>

As you can see, it has similar options as available under [Applications](./applications.md):
* Overview
* Build & Deploy
* Build history
* Deployment history
* Configurations

First, we will walk you through the [key features](#key-features) of Application Groups, followed by [additional features](#additional-features) that will help you perform bulk actions.

---

## Key Features

### Building Application Images

:::info Who Can Perform This Action?
Users need to have [Build and deploy permission](../user-guide/global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and applications) to trigger the build.

:::

The **Build & Deploy** tab of your application group enables you to trigger the [CI builds](../reference/glossary.md#image) of one or more applications in bulk.

1. Select the applications using the checkboxes and click the **Build Image** button present at the bottom.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/select-app.jpg)
<center>Figure 4: Build Option</center>

2. The `Build image` screen opens. Select the application and the [commit](../reference/glossary.md#commit-hash) for which you want to trigger the CI build.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/select-commit-1.jpg)
<center>Figure 5: Selecting Commit</center>

:::info Tip
Adding [image labels](./deploying-application/image-labels-and-comments.md) can help you quickly locate the container image from the list of images shown in Application Groups.
:::

3. Similar to application, you can also [pass build parameters](./deploying-application/triggering-ci.md#passing-build-parameters-) in application groups before triggering the build.

:::info Note
Passing build parameters feature is only available in <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

:::

* Go to the **Parameters** tab.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-parameter-tab.jpg)
<center>Figure 6: Parameters Tab</center>

* Click **+ Add parameter**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-add-parameter.jpg)
<center>Figure 7: Adding a Parameter</center>

* Enter your key-value pair as shown below. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-key-value.jpg)
<center>Figure 8: Entering Key-Value Pair</center>

* You may follow the above steps for other applications too, and then click **Start Build**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-next-app.jpg)
<center>Figure 9: Choosing Commit for Other Application</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-start-build.jpg)
<center>Figure 10: Passing Build Parameters and Triggering Build</center>

4. The builds will initiate, following which, you can close the `Build image` screen.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/build-image.jpg)
<center>Figure 11: Triggered Deployment</center>

### Changing Configurations

:::info Who Can Perform This Action?
Users need to have [Admin role](../user-guide/global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and applications) to change their configuration. Please note, you might not be able to change the values of locked keys in deployment template. Refer [Lock Deployment Configuration](./global-configurations/lock-deployment-config.md) to know more.

:::

The **Configurations** tab of your application group allows you to configure the following:

* [Deployment template](../reference/glossary.md#deployment-template)
* [ConfigMaps](../reference/glossary.md#configmaps)
* [Secrets](../reference/glossary.md#secrets)

As shown below, you can handle the configurations of more than one application from a single screen.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/configurations.jpg)
<center>Figure 12: Configurations of each App</center>

### Deploying Applications

:::info Who Can Perform This Action?
Users need to have [Build and deploy permission](../user-guide/global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and applications) to initiate the deployment.

:::

The **Build & Deploy** tab of your application group helps you deploy one or more applications in bulk.

1. Select the applications using the checkboxes.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/select-app-deploy.jpg)
<center>Figure 13: Deploy Option</center>

2. You can also trigger Pre-deployment stage or Post-deployment stage for your applications in bulk.

    * To trigger Pre-deployment stage, click the droupup next to **Deploy** and select **Trigger Pre-deployment stage**. 

    * To trigger Post-deployment stage, click the droupup next to **Deploy** and select **Trigger Post-deployment stage**. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-trigger-pre-post.jpg)
<center>Figure 14: Triggering Pre/Post Stages</center>

:::info Note
* The dropup appears only if your workflow has Pre-deployment stage or Post-deployment stage configured for the selected environment.  
* If both stages are configured, the dropup will display options for triggering **Pre-deployment** and **Post-deployment** stages.  
* If only one stage is configured, the dropup will show the option for triggering that specific stage.  
:::

3. After selecting the applications, click the **Deploy** button present at the bottom.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-deploy.jpg)
<center>Figure 15: Clicking 'Deploy'</center>

4. Select the desired container image that you want to deploy for respective application.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/select-image-1.jpg)
<center>Figure 16: Selecting Image</center>

    Repeat the step for other applications too.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/select-image-2.jpg)
<center>Figure 17: Deploying Apps</center>

5. If you wish, you can deploy all applications in an Application Group using a single deployment strategy, select the preferred deployment strategy for all the applications and click **Deploy**. <br/><br/> By default, all applications will be deployed using their respective default strategies.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-default-strategy.jpg)
<center>Figure 18: Selecting Deployment Strategy</center>

    * **Deployment feasibility** page will open, in case for any application, the selected deployment strategy is not configured, you can select one of the configured strategies for that application. <br/><br/> If you do not select a configured deployment strategy, deployment will be skipped for that particular application.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-deployment-feasibility.jpg)
<center>Figure 19: Deployment Feasibility</center>

6. The deployment will be initiated, following which, you can close the screen as shown below.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/deploy-app.jpg)
<center>Figure 20: Triggered Deployment</center>

7. Once the deployment is successful, the pipelines will show `Succeeded`.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/successful.jpg)
<center>Figure 21: Successful Deployment</center>

:::info Note
You can go to the **App Details** tab to have a bird's-eye view of your application, view application metrics, and even perform quick actions (e.g., restarting workloads). Refer to [App Details](../user-guide/app-details/README.md) for more information. 

:::

### Managing Traffic <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

While deployment, Devtron allows you to manage your **Canary** and **Blue-Green** deployments by providing visibility and easy controls to manage how new versions (releases) are shared with users.

To do so, follow the below steps:

1. Go to **Overview** and click **Manage Traffic**. 

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-click-manage-traffic.jpg)
<center>Figure 22: Selecting Managing Traffic</center>

2. Select the required applications, a side window will appear displaying all the eligible rollouts.

3. You can take the following actions based on the deployment strategy of the application

 * For **Canary Deployments**, you can either choose to initiate the next step or to initiate the full rollout.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-canray-options.jpg)
<center>Figure 23: Selecting Action for Canary Deployments</center>

 * For **Blue Green deployments**, you can either choose to **Swap Traffic**, or you can choose Skip & Promote Full. 

     * **Swap Traffic**: This will swap the traffic from the current deployment to the application latest deployment.

         ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-blue-green-swap.jpg)
<center>Figure 24: Selecting 'Swap Traffic'</center>

     * **Skip & Promote Full**: While deploying, this will directly deploy the whole traffic to application latest deployment.

         ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-blue-green-skip.jpg)
<center>Figure 25: Selecting 'Skip & Promote Full'</center>

4. Click **Initiate Eligible Rollouts** to implement the actions.

     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-initiate-eligible-rollouts.jpg)
<center>Figure 26a: Clicking 'Initiate Eligible Rollouts'</center>
     
     ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/ag-rollouts-success.jpg)
<center>Figure 26b: Rollout Status</center>

---

## Additional Features

### Clone Pipelines <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

:::caution Who Can Perform This Action?
Only a [Super-Admin](../user-guide/global-configurations/authorization/user-access.md#grant-super-admin-permission) can clone pipelines.

:::

This feature aims at helping the user clone existing CI/CD pipelines for new target environments in multiple applications. The configurations present in the given CI/CD pipeline also get copied to the cloned pipelines (refer the below table).

| Configuration Item              | Cloning Behavior                                             |
|----------------------------------|--------------------------------------------------------------|
| [**CI Workflow**](../user-guide/creating-application/workflow/ci-pipeline.md)                  | Clones the source’s workflow CI as it is                    |
| [**Pipeline Configuration**](../user-guide/creating-application/workflow/pre-post-tasks.md)       | Cloned, including Pre-CD and Post-CD scripts/plugins        |
| [**Environment Configuration**](../user-guide/creating-application/environment-overrides.md)    | Cloned, including Deployment Template (DT), ConfigMap (CM), and Secret |
| [**GitOps Configuration**](../user-guide/creating-application/gitops-config.md)         | Not cloned              |
| [**Environment Policies**](../user-guide/creating-application/environment-overrides.md)         | Cloned if at pipeline level,ignored if global              |
| [**CD Filter**](../user-guide/global-configurations/filter-condition.md)                    | Not cloned (handled globally)                              |
| [**Protect Configurations**](../user-guide/creating-application/config-approval.md)       | Cloned (handled at pipeline level)                         |
| [**Deployment Approvals**](../user-guide/global-configurations/approval-policy.md)         | Not cloned (handled globally)                                                    |
| [**Lock Configurations**](../user-guide/global-configurations/lock-deployment-config.md)          | Not cloned                                                 |
| [**Mandatory Plugin**](../user-guide/global-configurations/plugin-policy.md)             | Not cloned                                                 |
| [**Image Digest Policy**](../user-guide/global-configurations/pull-image-digest.md)          | Cloned at pipeline level, ignored if global                |
| [**Promotion Policy**](../user-guide/global-configurations/image-promotion-policy.md)             | Not cloned                                                 |
| [**Deployment Window**](../user-guide/global-configurations/deployment-window.md)            | Not cloned                                                 |
| [**Security Policy**](../user-guide/security-features/security-policies.md)              | Not cloned                                                 |
| [**Permissions**](../user-guide/global-configurations/authorization/user-access.md)                  | Not cloned                                                 |


**Use Case**: Let's say you have 'n' number of apps deployed to a development environment named `dev-env`. Later, a few testers joined your team, thus necessitating the addition of a testing environment (`test-env`) with those same apps deployed. Manually creating the pipelines and configuring them for `test-env` environment in each app might be impractical. Therefore, we recommend you to use the cloning feature. 

#### Methods of Cloning

This feature gives you two methods of cloning:

1. **New Workflow**: Creates a new workflow and clones the source CI and CD pipeline. Gives you the flexibility to tweak the cloned CI (e.g., changing code branch for build) too.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/new-workflow-v2.jpg)
<center>Figure 27: New Workflow</center>

2. **Source Workflow**: Uses the same workflow and clones only the source CD pipeline, thus keeping the original CI pipeline unchanged.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/source-workflow-v2.jpg)
<center>Figure 28: Source Workflow</center>

#### Steps to Clone Pipelines

1. Go to **Application Groups** and click the source environment from the list.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups.jpg)
<center>Figure 29: Source Environment Selection</center>

2. Select the applications whose pipelines you wish to clone. 

3. A floating widget will appear at the bottom. Click the `⋮` menu and then click **Clone Pipeline Config**.  

    * Alternatively, you may access **Clone Pipeline Config** from the `⋮` menu next to the application name.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-click-clone-pipelines.gif)
<center>Figure 30: Choosing Applications</center>

4. From the dropdown, select the target environment for which pipelines should be created for selected applications.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-select-env.gif)
<center>Figure 31: Selecting Target Environment</center>

5. Select the workflow where you wish to create deployment pipeline: **New Workflow** or **Workflow as source environment**. Refer [Methods of Cloning](#methods-of-cloning) to know which option will fulfill your requirement.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-choose-workflow.jpg)
<center>Figure 32: Creating CD Pipeline in Workflow</center>

6. Click **Clone in new workflow** or **Clone in source workflow** (depending on the option you selected in the previous step).

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-clone-status.gif)
<center>Figure 33: Initiating Clone</center>

:::caution Note
The cloning process will skip if a CD pipeline (for the target environment) already exists in the chosen application's workflow. You can view this in the clone status generated after the above process.

:::


### Hibernating and Unhibernating Apps

:::caution Who Can Perform This Action?
Users need to have [Build & deploy permission](./global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and application) to hibernate or unhibernate applications.

:::

Since every application comes with an option to hibernate, the same is true for application groups. Using application group, you can hibernate one or more applications belonging to the same environment if you do not want them to consume resources (replica count will be set to 0). 

In other words, you can hibernate running applications or unhibernate hibernated applications as per your requirement.

#### Hibernation Process

1. In the **Overview** page of your application group, use the checkboxes to choose the applications you wish to hibernate. 

2. A floating widget will appear at the bottom. Click the **Hibernate** button. 

    * Alternatively, you may access **Hibernate** from the `⋮` menu next to the application name.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-click-hibernate.jpg)
<center>Figure 34: Selecting Apps to Hibernate</center>

3. Confirm the hibernation by clicking **Hibernate**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-confirm-hibernate.jpg)
<center>Figure 35: Confirming Hibernation</center>

4. Hibernation will initiate as shown below. You may close the window. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-hibernate-status.jpg)
<center>Figure 36: Initiation Status of Hibernation</center>

Your applications pods would be scaled down and would stop incurring costs.

:::caution Note
* The hibernation process will show the status as `Skipped` for the applications which are already hibernated.
* The hibernation process will show the status as `Failed` for the applications which have no deployment history.
:::

#### Unhibernation Process

1. In the **Overview** page of your application group, use the checkboxes to choose the applications you wish to unhibernate. 

2. A floating widget will appear at the bottom. Click the **Unhibernate** button. 

    * Alternatively, you may access **Unhibernate** from the `⋮` menu next to the application name.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-click-unhibernate.jpg)
<center>Figure 37: Selecting Hibernated Apps to Unhibernate</center>

3. Confirm the unhibernation by clicking **Unhibernate**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-confirm-unhibernate.jpg)
<center>Figure 38: Confirming Unhibernation</center>

4. Unhibernation will initiate as shown below. You may close the window. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-unhibernate-status.jpg)
<center>Figure 39: Initiation Status of Unhibernation</center>

Your applications would be up and running in some time.

:::caution Note
* The unhibernation process will show the status as `Skipped` for the applications which are already running.
* The unhibernation process will show the status as `Failed` for the applications which have no deployment history.
:::

### Restart Workloads

:::caution Who Can Perform This Action?
Users need to have [Build & deploy permission](./global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and application) to restart workloads in bulk.

:::

Restarting workloads might be necessary if you want your new code or configuration to come into effect, or you are experiencing issues like crashing of pods.  

Using application group, you can select the workloads (i.e., Pod, Deployment, ReplicaSet, etc.) of specific applications and restart them. 

1. In the **Overview** page of your application group, use the checkboxes to choose the applications you wish to restart. 

2. A floating widget will appear, click the **Restart Workloads** button. 

    * Alternatively, you may access **Restart Workload** from the `⋮` menu next to the application name.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-click-restart-workloads.jpg)
<center>Figure 40: Selecting Apps to Restart</center>

3. Next to the application, click the workload dropdown to view all the individual workloads of an application. Choose only the ones you wish to restart.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/choose-workload.jpg)
<center>Figure 41: Choosing Workloads</center>

    Moreover, you can easily select, deselect, or choose multiple workloads as shown below.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/bulk-restart.gif)
<center>Figure 42: Selecting and Unselecting Workloads</center>

4. Click **Restart Workloads**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/select-workloads.jpg)
<center>Figure 43a: Restarting Workloads</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/retry-failed.jpg)
<center>Figure 43b: Retry Failed</center>

Restarting workloads might take time depending on the number of applications.

### Filtering Applications

Assume you have multiple applications (maybe 10, 50, 100, or more) showing up in an application group. If you want to limit your operations (build/deploy/other) to a specific set of applications, the filter feature will help you narrow down the list. Thus, you will see only those applications you select from the filter (be it on the **Overview** page, **Build & Deploy** page, and so on.)

1. Click the filter next to the application group as shown below.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/app-filter-1.jpg)
<center>Figure 44: Filter Option</center>

2. The filter will show all the applications present in the group. Click to select the relevant ones.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/app-filter-2.jpg)
<center>Figure 45: All Apps</center>

3. The filter narrows down the list of applications as shown below.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/app-filter-3.jpg)
<center>Figure 46: Filtered Apps</center>

4. (Optional) If required, you can save the filter for future use by clicking **Save selection as filter**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/save-filter.jpg)
<center>Figure 47: Saving a Filter</center>

5. Add a name and description to the filter to help you know its purpose, and click **Save**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/save-filter-2.jpg)
<center>Figure 48: Naming a Filter</center>

Now when you access the application group, your saved filter will be visible on top.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/save-filter-3.jpg)
<center>Figure 49: Saved Filter</center>

:::info Permissions
#### 1. Creating a filter

Users can create a filter if they have Admin/Manager access on all selected applications.

* **Case 1**: User has Admin/Manager access on all selected applications

    User will be able to create a filter with all selected applications.

* **Case 2**: User does not have Admin/Manager access on all selected applications

    User will not be able to create a filter.

* **Case 3**: User selected 4 applications but has Admin/Manager access for only 2 of them

    User should be able to create filter with these 2 applications.

#### 2. Editing a saved filter

Users can edit a saved filter if they have Admin/Manager access on all applications in the saved filter.

#### 3. Deleting a saved filter

Users can delete a saved filter if they have Admin/Manager access on all applications in the saved filter.

:::

### Changing Branch

:::caution Who Can Perform This Action?
Users need to have [Admin role](../user-guide/global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and applications) to update their branch.

:::

Assume you have a few applications whose [build pipelines](../reference/glossary.md#build-pipeline) fetch from the `main` branch of your code repository. However, you decided to maintain a `master` branch, and you want all the upcoming CI builds to consider the `master` branch as the source. Devtron provides you the option to change the branch at both levels, individual application as well as application group.

1. In the **Build & Deploy** tab of your application group, select the intended applications and click the **Change Branch** button present at the bottom.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/change-branch.jpg)
<center>Figure 50: Changing Branch</center>

2. Enter the new branch name. If your build pipeline has `Branch Regex` as the Source Type, you must ensure your new branch name matches the regex (regular expression) provided in that build pipeline. Once done, click **Update Branch**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/update-branch.jpg)
<center>Figure 51: Updating Branch Name</center>

### Changing Image Source

:::caution Who Can Perform This Action?
Users need to have [Admin role](../user-guide/global-configurations/authorization/user-access.md#devtron-apps-permissions) or above (along with access to the environment and applications) to update their branch.
:::

The **Change Image Source** feature in Devtron lets you update the container image source for an application’s workflow without modifying it.

1. In the **Build & Deploy** tab of your application group, select the preferred workflows and click the **Change Image Source** button present at the bottom.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-change-image-source.jpg)
<center>Figure 52: Clicking 'Change Image Source'</center>

2. Select the preferred Workflow template, and enter the required details as per the workflow template. Currently, **Change Image Source** feature for **Application Groups** is only supported for **Build from Source Code** and **Sync with Environment**.

    1. **Build from Source Code**
        * After selecting **Build from Source Code**, a feasibility check will run. You can click **Create Build Pipeline** only if the application's feasibility shows `Can change`.

            **Note:** Application for which the feasibility shows `Cannot change` will be skipped due to following reasons:

            * `Multi git material found at the source, not allowed to change the source`
            * `No cd pipeline found for the selected app and env combination`
            * `Invalid request, trying to create self loop, cannot create sync-cd source pipeline with source environment in same workflow`
            
            ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-build-from-source-code.jpg)
<center>Figure 53a: Selecting 'Build From Source'</center>

            ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-build-from-source-code-feasibility-window.jpg)
<center>Figure 53b: Feasibility Window</center>

        * A pop-up window will open, enter the **Source Type** and **Branch** under **Select code source**. 
            
            ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-build-from-source-code-details.jpg)
<center>Figure 54: Entering Required Details</center>

        * Click **Create Pipeline**. A modal window will appear showing the status of the image source change.

            ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-build-from-source-code-changed.jpg)
<center>Figure 55: Clicking 'Create Pipeline'</center> 

    2. **Sync with Environment**
        * After selecting **Sync with Environment**, a modal window will open.

            ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-sync-with-environment.jpg)
<center>Figure 56: Selecting Sync With Environment</center>

        * Select the environment from which you want to sync your workflow, and then click **Next**.

            ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-sync-with-environment-select-env.jpg)
<center>Figure 57: Selecting Environment</center>

        * A feasibility check will run. You can click **Change Image Source** only if the application's feasibility is marked as `Can change`.
            
            **Note:** Application for which the feasibility shows `Cannot change` will be skipped due to following reasons:

            * `Multi git material found at the source, not allowed to change the source`
            * `No cd pipeline found for the selected app and env combination`
            * `Invalid request, trying to create self loop, cannot create sync-cd source pipeline with source environment in same workflow`

            ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-sync-with-environment-feasibility.jpg)
<center>Figure 58: Feasibility Window</center>

        * Click **Change Image Source**. A modal window will appear showing the operation status.

            ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/app-management/application-groups/application-groups-sync-with-environment-changed.jpg)
<center>Figure 59: Clicking 'Change Image Source'</center>

3. The image source is applied to all selected workflows where the feasibility check passed.
        