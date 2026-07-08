# Release Hub

:::caution Prerequisite
Create a [Tenant](./tenants.md) before proceeding with any action in Release Hub.
:::

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

This section allows you to define [release tracks](./README.md#release-tracks), create and version software releases, add applications, select container images, and deploy releases to specified tenant [installations](./README.md#installations).

---

## Creating Release Tracks and Versions

:::caution Who Can Perform This Action?
Users need to have super-admin permission to create release track.
:::

This involves the creation of release tracks and software versions. A release track helps you organize and keep track of different versions of your software. So if you ship multiple products (say HRMS, Web Builder, Video Editing Tools), you can create separate release tracks for each.

1. Click **+ Release Track**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/add-track.jpg)
    <center>Figure 1: Creating New Release Track</center>

2. Give a name to the track, e.g., `numero`

3. (Optional) Add a description of the track.

4. Click **Create Release Track**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/track-creation.jpg)
    <center>Figure 2: Entering Track Details</center>

5. Click **+ Create Release**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/create-release.jpg)
    <center>Figure 3: Creating New Release</center>

6. Select a track (e.g., *numero*) from the **Release Track** dropdown.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/track-selection.jpg)
    <center>Figure 4: Choosing Release Track</center>

7. Enter a [semantic version](https://semver.org/) in **Release Version** field, e.g., `1.0.0`

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/semantic-versioning.jpg)
    <center>Figure 5: Versioning the Release</center>

8. (Optional) Give a name to the release, e.g., `numero-beta`. If you don’t provide one, the name will be same as release version (i.e., 1.0.0).

9. (Optional) Add a description of the release.

10. Click **Create Release**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/release-version.jpg)
    <center>Figure 6: Saving Release Details</center>

If you are creating your first release, you may proceed with the **Create from scratch** option. However, for subsequent versions of your release (say 1.0.1), you may clone an existing release (e.g., 1.0.0) as shown below. Please note, you can only clone releases belonging to the same track.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/clone-release.jpg)
    <center>Figure 7: Cloning an Existing Release</center>

---

## Adding Applications

:::caution Who Can Perform This Action?
Users need to have super-admin permission to add applications to a release track.
:::

This involves the inclusion of applications you wish to rollout in the release version created by you.

1. Click **+ Add Application** button present within the release you created.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/add-apps.jpg)
    <center>Figure 8: Adding Apps to Release</center>

2. Click the **Search and add applications** dropdown.

3. Use the checkbox to add applications from your projects.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/search-apps.gif)
    <center>Figure 9: Choosing Applications</center>

4. Click **Add Release Stage**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/add-release-stage.jpg)
    <center>Figure 10: Dividing Release in Stages</center>

:::info Importance of Release Stages
By default, your selected applications will be set to release in one go. However, you can also release them in stages. In other words, you can decide which set of applications should be released first, subsequently which ones to release next, and the ones to release last. <br/><br/> For example, if you're adding a new payment system (backend) and an updated checkout page (frontend), you would release the payment system first to ensure payments can be processed correctly.
:::

5. Use the drag-and-drop feature to move applications from one stage to another.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/release-stage-v2.gif)
    <center>Figure 11: Rearranging the Sequence</center>

:::caution 
The drag-and-drop feature is designed specifically for moving applications between different release stages. It is not meant to alter the sequence of applications within the same stage.
:::

6. Once you have finalized the sequence and stages, click **Save Changes**.

---

## Selecting Images

:::caution Who Can Perform This Action?
Users need to have super-admin permission to select images for selected applications.
:::

1. Select a workflow available for your application. All the [images](../../reference/glossary.md#image) available in the selected workflow will appear.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/workflow-selection.gif)
    <center>Figure 12: Selecting Image from Specific Workflow</center>

:::info Note
Only the images that were built already will appear. If there are no images present, [trigger the CI pipeline](../deploying-application/triggering-ci.md) of the application first to obtain the image.
:::

2. Click **SELECT** next to the image you wish to deploy from the list.

3. Repeat the above steps for other applications you added in the release.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/image-selections.gif)
    <center>Figure 13: Repeating Steps for Other Applications</center>

4. Click **Save**.

:::info Tip
In case you don’t have the correct images ready for any of your applications, you can partially save your changes at this point, and return once they are ready.
:::

5. You may add release instructions for each application using the in-built Markdown editor. This can be detailed deployment notes and configuration guidelines for the team.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/release-instructions-v2.gif)
    <center>Figure 14: Adding Release Instructions</center>

6. Before locking the requirements, make sure the release order is correct, add applications if needed, and include environments in tenants (if not done already). Once you have finalized them, click **Lock Requirements**. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/freeze-requirements.gif)
    <center>Figure 15: Locking Requirements</center>

:::info 
Once you lock the requirements, Devtron will prevent any unsolicited modifications to your release by anyone (including you). However, you can re-edit it by clicking **Unlock To Edit**.
:::

---

## Deploying Release

:::caution Who Can Perform This Action?
Users with build & deploy permission or above (for the application and target environment) can deploy a release.
:::

:::info Prerequisite
All your requirements need to be locked and [tenants](./tenants.md) must be configured.
:::

This involves the deployment of the release to the specified tenant installations.

1. Go to the **Rollout Release** tab.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/rollout-release.jpg)
    <center>Figure 16: Rollout Release Page</center>

2. Your release needs to be marked as ready to proceed further. If it isn’t, you can mark it **Ready for release** from this screen.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/ready-release.gif)
    <center>Figure 17: Marking a Release as Ready</center>


    Optionally, you can also do so by changing the status from **Draft** state to **Ready for release** within your release track. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/ready-for-release.jpg)
    <center>Figure 18: Alternative Way of Marking</center>
    
3. Use the checkbox to select the applications belonging to the first release stage. You may use the filters on the left-hand side to make it easier.

    <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/HPYZ4-hhoDM" title="First Release Stage" frameborder="0" allow="fullscreen"></iframe></div>

4. Click **Deploy**.

    If the application workflow has pre-deployment/post-deployment stage, you get a dropdown where you can specifically trigger either pre-deployment, deployment, or post-deployment stage.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/trigger-deployment.gif)
    <center>Figure 19: Pre/Post Deployment</center>

5. Once the applications from the first release stage are successfully deployed, select the applications from the subsequent release stage and deploy.

    <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/ioGZP1CCuxI" title="Last Release Stage" frameborder="0" allow="fullscreen"></iframe></div>

:::caution 
An application can be deployed on the tenant in the next release stage only if other applications in the previous stage are deployed successfully on the given tenant.
:::

Here we covered the process of performing a production installation on just one tenant. Similarly, you can perform installations on your other tenants (if any).

---

## Release Configurations

The **Configurations** tab provides visibility into all deployment-related configurations associated with an application in a specific environment within a release. It acts as a release validation checkpoint, ensuring the correct application settings are deployed to the target environment.

It enables release managers, platform engineers, and application owners to:

* Review deployment configurations before rollout.
* Inspect ConfigMaps and Secrets associated with an application.
* Understand inherited and overridden configurations.
* Compare configurations across environments.
* Validate environment-specific settings.
* Review deployment templates used during release execution.

### Accessing Release Configurations

1. Open **Release Hub** and select the desired release.

2. Open the **Configurations** tab.

3. Select the **Application** (e.g., `google-api-server`) and the **Environment** (e.g., `stage-dcd`).

All configuration information displayed on the page is contextual to the selected application and environment combination.

### Configuration Actions

#### Compare with...

Allows you to compare configuration values with another environment (e.g., `stage-dcd` vs `production`).

**When to use**:

* To validate promotion readiness.
* To compare staging vs production settings.
* To detect configuration drift.
* To verify release consistency across environments.

#### Deployment Template

Provides access to the deployment template associated with the application. The deployment template defines deployment behavior such as pod configuration, resource limits, replica settings, service configuration, and container specifications.

**When to use**:

* To review the deployment manifest configuration.
* To verify rollout settings.
* To validate infrastructure-level deployment behavior.

### Resource Explorer

The left-side resource explorer allows you to browse configuration resources. Supported resource types include:

| Resource Type | Description | Typically Contains |
|---------------|-------------|--------------------|
| **ConfigMaps** | Stores non-sensitive configuration values | Service endpoints, feature flags, application settings, runtime parameters |
| **Secrets** | Stores sensitive information | API keys, access tokens, passwords, authentication credentials |

:::info Note
Sensitive values within Secrets remain protected and are not exposed by default.
:::

#### Configuration State Indicators

Each configuration resource displays its inheritance status and current state:

| Indicator | Description |
|-----------|-------------|
| **Inheriting** / **Inherited** | The configuration is inherited from a parent configuration source (base configuration). |
| **No Override** | No environment-specific override exists; the environment uses the inherited value exactly as defined in the parent configuration. |
| **Dry Run** | Displays configuration in a non-deployment editing mode for review and validation before deployment. |

#### Configuration Source Tracking

The page identifies where a configuration originates (e.g., `Inherited from Base Configuration`), providing traceability by showing the parent source responsible for the active configuration. This enables easier debugging, configuration governance, auditability, and faster root-cause analysis.

### Viewing Configuration Details

* **Data Type** — Displays the Kubernetes resource type (e.g., `Kubernetes ConfigMap`), helping you understand how the configuration is stored within the cluster.

* **Mount Data As** — Displays how configuration values are consumed by the application (e.g., `Environment Variable`). Supported mounting methods may include Environment Variables, Volume Mounts, and Filesystem Mounts, depending on platform configuration.

* **Data** — Displays the actual configuration content with a syntax-highlighted, read-only view, copy support, and environment-specific values. For example:

    ```
    PG_DATABASE: orchestrator
    PG_USER: postgres
    PG_PORT: "5432"
    SERVICE_NAME: athena-api-server
    SERVICE_VERSION: 0.2.0
    LLM_TEMPERATURE: "0.01"
    ```

#### Variable Reference Support

Configurations may contain variable references (e.g., `LOGFIRE_ACCESS_TOKEN: ${LOGFIRE_ACCESS_TOKEN}`). These placeholders are resolved during deployment or runtime, enabling secure secret handling, environment portability, and reduced configuration duplication.

The page provides a **Show Variable Values** toggle to reveal resolved values, allowing you to verify resolved values, debug configuration issues, and confirm runtime settings.

:::caution Security Consideration
Access to actual values may be restricted based on user permissions.
:::

Use the **Copy** action to copy the entire configuration content for configuration review, incident investigation, external validation, or change auditing.

### Scoped Variables

The **Scoped Variables** section displays reusable variables available to the configuration. A scoped variable is a reusable configuration value managed centrally and injected into application configurations. It is environment-aware, dynamically resolved, reusable across applications, and managed independently of application code.

Examples include:

| Variable | Description |
|----------|-------------|
| `KedaHttpCurlHit` | Cluster curl endpoint |
| `KedaScaleDownPeriod` | Cluster scale-down period |
| `SHARED_DB_HOST` | Shared database host |
| `DB_NAME` | Database name |
| `SHARED_SA` | Service account |
| `ENV_DASHBOARD_URL_PREFIX` | Dashboard URL prefix |

Instead of hardcoding values (e.g., `DATABASE_HOST: my-database-host`), use a scoped variable reference (e.g., `DATABASE_HOST: ${SHARED_ENT_DB_HOST}`). This provides reusability, environment portability, centralized updates, and reduced maintenance.

### Typical Release Validation Workflow

Before rollout:

1. Open the release and navigate to **Configurations**.
2. Select the **Application** and **Environment**.
3. Review ConfigMaps and Secrets.
4. Validate inherited configurations.
5. Verify scoped variable usage.
6. Compare with production.
7. Proceed with rollout.

:::info Best Practices
* **Review configurations before every release** — Validate all environment-specific values before deployment.
* **Prefer scoped variables** — Avoid hardcoded infrastructure values.
* **Use environment comparison** — Compare environments before promotion to production.
* **Minimize overrides** — Keep configurations inherited whenever possible to reduce drift.
* **Validate secret references** — Ensure all secret references resolve correctly before rollout.
:::

## Extras

### Viewing Rollout Status

You can view the status of your release at a particular tenant under `Rollout Status`. Moreover, you can go to **Rollout History** tab to view the deployment history.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/rollout-status-history.gif)
<center>Figure 20: Checking Rollout Status</center>

You can view the following statuses

| Rollout Status    | Description                                                 |
|-------------------|-------------------------------------------------------------|
| All Tenants       | Overview of rollout status across all tenants installations              |
| Yet to Trigger    | Shows tenant installations for which rollout has not yet started  |
| Ongoing           | Shows tenant installations for which deployment is currently in progress |
| Failed            | Shows tenant installations where rollout has encountered issues because some deployment stage failed |
| Completed         | Shows tenant installations where deployment has successfully finished and services are live   |

Apart from the rollout status, you can also see the release status:

* If the applications are partially released, the release status shows `Partially released`.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/partial-release.jpg)
    <center>Figure 21: Partial Release</center>

* If all the applications in a release are successfully deployed, the release status shows `Completely Released`.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/complete-release.jpg)
    <center>Figure 22: Full Release</center>

* Alternatively, you can view the release status directly in the release track too.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/complete-release-2.jpg)
    <center>Figure 23: Alternative Way of Checking Status</center>

### Putting a Release on Hold

If a release is put on hold, none of the applications (in any release stage) can be deployed in that release.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/release-onhold.gif)
<center>Figure 24: Pausing a Release</center>

**When to use**:

* When a release was marked as ready, but is still not ready for deployment
* If issues are found during pre-deployment checks
* When waiting for approval from stakeholders before proceeding

**Why to use**:

* To prevent the release from being deployed prematurely
* To allow time for additional testing, review, or completion of necessary tasks
* To ensure that all requirements and dependencies are met before deployment

### Rescinding a Release

When a release is rescinded, it is marked as invalid or buggy, and cannot be used for further deployments. This action ensures that that the release cannot be modified further and no applications within the rescinded release can be deployed. However, deploying from the [Build & Deploy page](../deploying-application/README.md) of [Applications](../applications.md) or [Application Groups](../application-groups.md) will still be possible.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/rescind-release.gif)
<center>Figure 25: Cancelling a Release</center>

**When to use**:

* When a release is found to be buggy or has critical issues
* If the release does not meet the required standards or specifications
* When a decision is made to cancel the release entirely

**Why to use**:

* To ensure that faulty or incomplete software is not deployed
* To maintain the integrity and reliability of the software environment
* To provide a clear indication that the release is no longer valid and should not be used

### Adding a Release Note

In the **Overview** section, you get a Markdown editor to add release notes. You can add text, images, links, and many more to clearly communicate updates and changes in each release. This keeps everyone informed and might contribute to a smoother deployment process.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/release-note.jpg)
<center>Figure 26: Release Note Section in SDH</center>

### Release Catalog

Based on the schema provided in the catalog, you can add relevant details for release. You can manage this data using the **Manage Schema** option, which defines the structure of your catalog. Refer the [Catalog Documentation](../global-configurations/catalog-framework.md#managing-a-schema) to learn more.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/sdh/release-catalog.jpg)
<center>Figure 27: Release Catalog</center>