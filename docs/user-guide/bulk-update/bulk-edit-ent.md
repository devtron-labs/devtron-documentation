# Bulk Edit (v1beta2)

## Introduction  <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

**v1beta2** is the latest YAML script to perform bulk edits to Deployment Templates, ConfigMaps, or Secrets across multiple applications. This version is currently available only to Enterprise users.

The script provides selectors for choosing the project, application, and environment within which you wish to edit the configs (can be used in combo). Moreover, you now have granular control over the update and delete operations you wish to perform on the configs.

> **RBAC**: User needs to have [permissions](../global-configurations/authorization/user-access#grant-specific-permissions) to apps and environments to edit their configs.

### Tree Structure of the Bulk Edit Script

Below is the visual structure of the script. Refer [Examples](#examples-with-full-script) and [YAML Template](#combined-yaml-template) to know more.

```yaml
v1beta2 Script
├── apiVersion                            # (API version is batch/v1beta2)
├── kind                                  # (Resource kind is Application)
└── spec                                  # (Main configuration)
    ├── selectors                         # (Target apps filter)
    │   └── match                         # (Filter logic used in solo or combo)
    │       ├── project                   # (Project filters)
    │       │   ├── includes              # (Projects to include)
    │       │   │   └── names             # (Array of project names)
    │       │   └── excludes              # (Projects to exclude)
    │       │       └── names             # (Array of project names)
    │       │
    │       ├── app                       # (Application filters)
    │       │   ├── includes              # (Apps to include)
    │       │   │   └── names             # (Array of app names)
    │       │   └── excludes              # (Apps to exclude)
    │       │       └── names             # (Array of app names)
    │       │
    │       └── env                       # (Environment filters)
    │           ├── includes              # (Envs to include)
    │           │   └── names             # (Array of env names)
    │           ├── excludes              # (Envs to exclude)
    │           │   └── names             # (Array of env names)
    │           └── type                  # (prod / non-prod)
    │
    ├── deploymentTemplate                # (Edit deployment template)
    │   └── spec                          # (Template spec)
    │       ├── match                     # (Filter for DT)
    │       │   ├── include-base-config   # (true or false)
    │       │   └── chart                 # (Filter for charts)  
    │       │       ├── name              # (Enter chart type, e.g. Deployment)  
    │       │       ├── custom            # (true if it's a user-uploaded custom chart)
    │       │       └── version           # (Filter for chart version)
    │       │            ├── value        # (Enter chart version, e.g. 4.20.0)
    │       │            └── operator     # (EQUAL | LESS | GREATER | LESS_EQUAL | GREATER_EQUAL)
    │       └── operation                 # (Edit operation)
    │           ├── action                # (update only)
    │           ├── field                 # (values / version)
    │           ├── patchJson             # (Define if operation.field=values)
    │           └── chartVersion          # (Define if operation.field=version)
    │
    ├── configMap                         # (Edit config maps)
    │   └── spec                          # (ConfigMap spec)
    │       ├── match                     # (Filter for ConfigMaps)
    │       │   ├── include-base-config   # (true or false)
    │       │   ├── includes              # (CMs to include)
    │       │   │   └── names             # (Array of config map names)
    │       │   └── excludes              # (CMs to exclude)
    │       │       └── names             # (Array of config map names)
    │       │
    │       └── operation                 # (Edit operation)
    │           ├── action                # (create/update/delete)
    │           ├── field                 # (data)
    │           ├── patchJson             # (JSON patch for update)
    │           └── value                 # (Key-values for create/delete)
    │
    └── secret                            # (Edit secrets)
        └── spec                          # (Secret spec)
            ├── match                     # (Filter for Secrets)
            │   ├── include-base-config   # (true or false)
            │   ├── includes              # (Secrets to include)
            │   │   └── names             # (Array of secret names)
            │   └── excludes              # (Secrets to exclude)
            │       └── names             # (Array of secret names)
            │
            └── operation                 # (Edit operation)
                ├── action                # (create/update/delete)
                ├── field                 # (data)
                ├── patchJson             # (JSON patch for update)
                └── value                 # (Key-values for create/delete)
```

We recommend you to perform bulk edits in 4 parts:

1. [Use Selector Block](#step-1-use-selector-block)
2. [Choose the Configs](#step-2-choose-the-configs)
3. [Specify the Operation](#step-3-specify-the-operation)
4. [Run the Script](#step-4-run-the-script)

---

## Step 1: Use Selector Block

In Devtron, configs like Deployment Template, ConfigMaps, and Secrets are specified within application. So you need to determine the target applications initially. 

In the first part, we will look at the selector script required to filter the applications. Only the applications that match your selector logic will have their Deployment Template, ConfigMap, or Secret available for edits.

```yaml
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      project:
        includes: 
            names: ["dev-project", "qa-project"]
        excludes: 
            names: ["test-project"]
      app:
        includes: 
            names: ["%-dashboard"]
        excludes: 
            names: ["demo-%"]
      env:
        includes: 
            names: ["staging", "dev"]
        excludes: 
            names: ["%qa%"]
        type: non-prod
# Next Steps: Add spec.deploymentTemplate, spec.configMap, and/or spec.secret (check Step 2 and 3)
```
 
You can use `project`, `app`, `env` selectors with the following lists:
* `includes.names` - A list to specify the ones we need to edit.
* `excludes.names` - A list to specify the ones which are not to be edited.

In **includes** and **excludes**, you can give the names of your projects/apps/environments. Additionally, you may use wildcard patterns (like `%-dashboard%`).

---

## Step 2: Choose the Configs

Here you can filter the Deployment Templates, ConfigMaps, and Secrets you wish to edit (refer the block below).

### Deployment Templates

After you add the selector block, add `deploymentTemplate` object.

```yaml
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors: # Add selector logic (check Step 1)
  deploymentTemplate:
    spec:
      match:
        chart:
          name: "Deployment" ## Name of the deployment chart
          custom: false ## Set as true if using your uploaded custom deployment chart
          version:
            value: "4.20.0"
            operator: EQUAL ## Supports "GREATER", "LESS", "GREATER_EQUAL", "LESS_EQUAL"
      operation: # Add operation object (check Step 3)
```

#### What you can do?
* Add or remove Helm values defined in your chart
* Update the chart version itself
* When editing deployment templates, you may choose whether to apply changes to only environment-specific overrides or also to the base configuration:
    * When `true`, your operations apply to base deployment template shared across environments
    * When `false` or omitted, changes apply only to environment-level deployment templates
* Combine with `configMap` and `secret` objects in the same script

:::success Next Step
[Add operations for your Deployment Template(s)](#on-deployment-templates)
:::

### ConfigMaps

```yaml
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors: # Add selector logic (check Step 1)
  configMap:
    spec:
      match:
        include-base-config: true
        includes:
          names: ["qa-cm-%", "prod-cm-%"]
        excludes:
          names: ["%dev%", "%test%"]
      operation: # Add operation object (check Step 3)
```

#### What you can do?
* Add new keys, e.g., `FEATURE_ENABLE_X: true`
* Update existing keys
* Delete keys or the entire ConfigMap by name
* Include Base Configuration
    * This allows updates to the base-level ConfigMap
    * Environment-level ConfigMaps remain unaffected if this flag is not set
* Combine with `deploymentTemplate` and `secret` objects in the same script.

:::success Next Step
[Add operations for your ConfigMap(s)](#on-configmaps)
:::

### Secrets

```yaml
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors: # Add selector logic (check Step 1)
  secret:
    spec:
      match:
        include-base-config: true
        includes:
          names: ["qa-secret-%", "prod-secret-%"]
        excludes:
          names: ["%dev%", "%test%"]
      operation: # Add operation object (check Step 3)
```

#### What you can do?
* Add or update secret keys, e.g., `API_KEY: efd32tr6tsjbf43765`
* Delete keys or the entire Secret by name
* Same usage pattern as ConfigMaps using `action`, `field: data`, and `value`/`patchJson`.
* Include Base Configuration
    * Enables edits on base-level Secret
    * Use this to update secrets across environments from a single source of truth
* Combine with `deploymentTemplate` and `configMap` objects in the same script

:::success Next Step
[Add operations for your Secret(s)](#on-secrets)
:::

---

## Step 3: Specify the Operation

Add the operation to be performed on the selected Deployment Templates, ConfigMaps, and Secrets.

:::caution Supported operations vary by config type
The supported operations depend on the type of config being edited.

| Config Type            | Supported Actions |
|------------------------|---------------------------|
| Deployment Templates   | `update` only             |
| ConfigMaps             | `create`, `update`, `delete` |
| Secrets                | `create`, `update`, `delete` |
:::


### On Deployment Templates 

:::info
Deployment Templates support only `action: update`, along with `field: values` or `field: version`, and the corresponding `patchJson` or `chartVersion`.
:::

#### Example 1 - Configure memory to `250Mi`

```yaml
...
...
... # Add the following in deploymentTemplate.spec
      operation:
        action: update
        field: values
        patchJson: '[{ "op": "replace", "path": "/resources/requests/memory", "value": "250Mi" }]'
```

#### Example 2 - Add a new value `ENABLE_AUTOSCALING: true`

```yaml
...
...
... # Add the following in deploymentTemplate.spec
      operation:
        action: update
        field: values
        patchJson: '[{ "op": "add", "path": "/ENABLE_AUTOSCALING", "value": true }]'
```

#### Example 3 - Update deployment chart version to `4.30.1`

```yaml
...
...
... # Add the following in deploymentTemplate.spec
      operation:
        action: update
        field: version
        chartVersion: "4.30.1"           
```

### On ConfigMaps

#### Example 1 - Add `FEATURE_ENABLE_X` key in existing ConfigMap

```yaml
...
...
... # Add the following in configMap.spec
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "add", "path": "/FEATURE_ENABLE_X", "value": "true" }]'
```

#### Example 2 - Update existing key `FEATURE_ENABLE_X`

```yaml
...
...
... # Add the following in configMap.spec
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "replace", "path": "/FEATURE_ENABLE_X", "value": "false" }]'
```

#### Example 3 - Remove existing key `FEATURE_ENABLE_X: true` from ConfigMap

```yaml
...
...
... # Add the following in configMap.spec
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "remove", "path": "/FEATURE_ENABLE_X" }]'
```

#### Example 4 - Delete ConfigMap

```yaml
...
...
... # Add the following in configMap.spec
      operation:
        action: delete
        field: data
        value: banking-cm # In 'value', enter the name of the ConfigMap to delete
```


### On Secrets

#### Example 1 - Add `API_TOKEN` key in existing secret

```yaml
...
...
... # Add the following in secret.spec
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "add", "path": "/API_TOKEN", "value": "u4hg847598fc" }]'
```

#### Example 2 - Update `DB_PASSWORD` key in secret

```yaml
...
...
... # Add the following in secret.spec
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "replace", "path": "/DB_PASSWORD", "value": "root@123" }]'
```

#### Example 3 - Remove `API_KEY` key in secret

```yaml
...
...
... # Add the following in secret.spec
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "remove", "path": "/API_KEY" }]'
```

#### Example 4 - Add multiple secret keys

```yaml
...
...
... # Add the following in secret.spec
      operation:
        action: update
        field: data
        patchJson: '[
          { "op": "add", "path": "/TOKEN", "value": "shc24235" },
          { "op": "replace", "path": "/API_KEY", "value": "u4hg847598fc" }
        ]'
```

#### Example 5 - Delete Secret

```yaml
...
...
... # Add the following in secret.spec
      operation:
        action: delete
        field: data
        value: banking-secret # In 'value', enter the name of the secret to delete
```

---

## Step 4: Run the Script

Before running the script, make sure to check the impacted applications and configs, by clicking the **Show Impacted Objects** button. We recommend you to do this just so you don't end up unintentionally editing any config (Deployment Templates, ConfigMaps, and Secrets). 

Next, click **Run** to execute the script. The output of the script execution will be shown in the **Output** tab in the bottom drawer.

---

## Examples (With Full Script)

### Edit Deployment Template

**CASE 1**: Update `replicaCount` in only Base Deployment Templates of `devtron` project

```YAML
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      project:
        includes:
          names: 
            - devtron
  deploymentTemplate:
    spec:
      match:
        include-base-config: true
      operation:
        action: update
        field: values
        patchJson: '[{ "op": "replace", "path": "/replicaCount", "value": 2 }]'
```

**CASE 2**: Remove `replicaCount` in only Base Deployment Templates of all applications (names) that end with `-sanity-app`

```YAML
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      app:
        includes:
          names:
            - "%-sanity-app"
  deploymentTemplate:
    spec:
      match:
        include-base-config: true
      operation:
        action: update
        field: values
        patchJson: '[{ "op": "remove", "path": "/replicaCount" }]'
```

**CASE 3**: Add `replicaCount` in both (Base + Env Override) Deployment Templates of all applications (names) having at least one prod environment (excluding any environment name containing `virtual`)

```YAML
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      env:
        type: prod
        excludes:
          names:
            - "%virtual%"
  deploymentTemplate:
    spec:
      match:
        include-base-config: true
      operation:
        action: update
        field: values
        patchJson: '[{ "op": "add", "path": "/replicaCount", "value": 2 }]'
```

**CASE 4**: Change Deployment Chart Version (Only Env Override) to `4.30.0` for all `non-prod` environments having `Rollout Deployment` chart and version `<= 4.20.0`

```YAML
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      env:
        type: non-prod
  deploymentTemplate:
    spec:
      match:
        chart:
          name: "Rollout Deployment"
          version:
            value: 4.20.0
            operator: LESS_EQUAL
      operation:
        action: update
        field: version
        chartVersion: 4.30.0
```

### Edit ConfigMap

**CASE 1**: Update `USE_GIT_CLI` in `orchestrator-cm` in only Base ConfigMap of all projects (names) that starts with `go-lang`

```YAML
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      project:
        includes:
          names: 
            - "go-lang%"
  configMap:
    spec:
      match:
        include-base-config: true
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "replace", "path": "/USE_GIT_CLI", "value": "true" }]'
```

**CASE 2**: Remove `USE_GIT_CLI` in `orchestrator-cm` in only Base ConfigMap of all applications, except for the ConfigMaps with name `orchestrator-cm`

```YAML
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      app:
        includes:
          names: 
            - "%%" # %% Wildcard for all applications
  configMap:
    spec:
      match:
        include-base-config: true
        excludes:
          names:
            - orchestrator-cm
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "remove", "path": "/USE_GIT_CLI" }]'
```

**CASE 3**: Add `USE_GIT_CLI` in `orchestrator-cm` in both (Base + Env Override) ConfigMaps of all applications (names) having at least one `non-prod` environment (excluding any environment name containing `virtual`)

```YAML
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      env:
        type: non-prod
        excludes:
          names:
            - "%virtual%"
  configMap:
    spec:
      match:
        include-base-config: true
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "add", "path": "/USE_GIT_CLI", "value": "true" }]'
```

**CASE 4**: Delete a ConfigMap named `orchestrator-cm` (Only From Env Override) from all `non-prod` environments except for the applications with name `orchestrator-app`

```YAML
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      app:
        excludes:
          names:
            - orchestrator-app
      env:
        type: non-prod
  configMap:
    spec:        
      operation:
        action: delete
        value: orchestrator-cm
```

---

## Combined YAML Template

You can use the below script as a template if you wish to edit Deployment Templates, ConfigMaps, Secrets of one or more apps in bulk.

```yaml
apiVersion: batch/v1beta2
kind: Application
spec:
  selectors:
    match:
      project:
        includes:
          names: ["dev"]
        excludes:
          names: ["test"]
      app:
        includes:
          names: ["%-dashboard", "%-server"]
        excludes:
          names: ["%demo-%", "%test-%"]
      env:
        type: non-prod
  deploymentTemplate:
    spec:
      match:
        include-base-config: true
        chart:
          name: "Deployment"          
          custom: false               
          version:
            value: "4.20.0"
            operator: LESS_EQUAL
  configMap:
    spec:
      match:
        include-base-config: true
        includes:
          names: ["qa-cm-%", "prod-cm-%"]
        excludes:
          names: ["%dev%", "%test%"]
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "add", "path": "/FEAT_TEST_ENABLE", "value": "true" },{"op": "replace","path":"/LOG_LEVEL","value": "-1"}]'
  secret:
    spec:
      match:
        include-base-config: true
        includes:
          names: ["qa-secret-%", "prod-secret-%"]
        excludes:
          names: ["%dev%", "%test%"]
      operation:
        action: update
        field: data
        patchJson: '[{ "op": "add", "path": "/DB_PASSWORD", "value": "********" },{"op": "replace","path":"/ADMIN_PASSWORD","value": "********"}]'
```

