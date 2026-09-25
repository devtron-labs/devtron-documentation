# Migrate GitOps Provider (API) <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Devtron provides APIs to migrate the GitOps configuration of your deployments from one Git provider to another — for example, from **GitHub to GitLab** (or to Bitbucket, Azure, an on-prem Git server, and so on).

When you trigger a migration, Devtron clones the deployment manifests from the existing GitOps repository and pushes them to a repository on the **target** GitOps provider, then updates the affected deployments to use the new provider.

:::info This is an API-only feature
There is currently no dashboard UI for GitOps provider migration; it is performed through the REST APIs described below.
:::

## Prerequisites

* The **target GitOps provider** must already be configured in **Global Configurations → GitOps**. Note its GitOps configuration `id` — you will pass it as `gitOpsProviderId`. (You can list configured providers via `GET /orchestrator/gitops/config`.)
* The applications/charts you want to migrate must already be deploying through GitOps (`argo_cd` or `flux_cd`).

## Authorization

These APIs can only be called by a **super-admin**. Pass your auth token in the `token` header.

## Endpoints

| Method | Path | Description |
|:---|:---|:---|
| `POST` | `/orchestrator/migration/deploy` | Migrate the GitOps provider for a set of resources selected by project, environment, and/or application. |
| `POST` | `/orchestrator/migration/deploy/app-level` | Perform the migration at the application level. Uses the same request body. |

## Request Body

Both endpoints accept the same JSON body:

```json
{
  "selectors": [
    {
      "projectIds": [1],
      "envIds": [2, 3],
      "appIds": [10, 11],
      "appType": "DevtronApp"
    }
  ],
  "migrateTo": {
    "deploymentAppType": "argo_cd",
    "gitOpsProviderId": 4
  },
  "dryRun": true
}
```

| Field | Type | Description |
|:---|:---|:---|
| `selectors` | array | Scopes the migration. Each selector narrows the set of resources to migrate. |
| `selectors[].projectIds` | array of int | Restrict to these project IDs. |
| `selectors[].envIds` | array of int | Restrict to these environment IDs. |
| `selectors[].appIds` | array of int | Restrict to these application IDs. |
| `selectors[].appType` | string | `DevtronApp` (custom apps) or `DevtronChart` (Helm apps). |
| `migrateTo` | object | The target deployment configuration. |
| `migrateTo.deploymentAppType` | string | The GitOps deployment type of the apps being migrated — `argo_cd` or `flux_cd`. |
| `migrateTo.gitOpsProviderId` | int | The `id` of the target GitOps provider to migrate to (from **Global Configurations → GitOps**). |
| `dryRun` | boolean | When `true`, Devtron evaluates the migration and returns what *would* happen, **without** making any changes. Recommended before running a real migration. |

## Response

```json
{
  "message": "migration completed",
  "details": [
    {
      "pipelineId": 25,
      "pipelineName": "cd-1-abcd",
      "appName": "my-app",
      "envName": "production",
      "appId": 10,
      "envId": 2,
      "currentConfig": {
        "deploymentAppType": "argo_cd",
        "gitOpsProviderId": 1
      },
      "status": "Success"
    }
  ]
}
```

| Field | Type | Description |
|:---|:---|:---|
| `message` | string | Overall result message. |
| `details` | array | Per-pipeline migration result. |
| `details[].pipelineId` / `pipelineName` | int / string | The CD pipeline that was migrated. |
| `details[].appName` / `appId` | string / int | The application. |
| `details[].envName` / `envId` | string / int | The environment. |
| `details[].currentConfig` | object | The deployment config (`deploymentAppType`, `gitOpsProviderId`) **before** migration. |
| `details[].status` | string | Per-pipeline status of the migration. |

## Recommended workflow

1. Configure the target GitOps provider in **Global Configurations → GitOps** and note its `gitOpsProviderId`.
2. Run the migration with **`"dryRun": true`** to preview which pipelines will be affected and validate the target configuration.
3. Review the `details` in the response.
4. Re-run the same request with **`"dryRun": false`** to perform the migration.
5. Verify that the affected applications now point to the new provider's repositories and that subsequent deployments succeed.

:::caution
GitOps provider migration moves deployment manifests to repositories on the target provider. Run a dry run first, and migrate in batches (using `selectors`) rather than all applications at once, so you can verify each batch before proceeding.
:::
