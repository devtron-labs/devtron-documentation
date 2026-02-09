# Devtron CLI (Tron)

Tron is a command-line tool that automates Devtron application and configuration tasks using modular YAML configuration.

> **Support status**
> The CLI is currently validated and supported for the Enterprise edition. OSS edition may work but is not officially supported yet.

## Highlights

- Create Devtron applications from YAML
- Update existing applications
- Manage environments and pipelines
- Simple CLI interface
- Usable as a Python module

## Install

```bash
pip install devtron-cli
```

## Quick Start

```bash
# Create a new application (provide Devtron URL and API token via CLI or environment variables)
tron --config config.yaml create-app --devtron-url https://devtron.example.com --api-token your-api-token

# Update an existing application
tron --config config.yaml update-app --devtron-url https://devtron.example.com --api-token your-api-token

# Or set environment variables and omit the URL and token from CLI
export DEVTRON_URL=https://devtron.example.com
export DEVTRON_API_TOKEN=your-api-token
tron --config config.yaml create-app
```

## Global Options

These options can be used with any command:

| Option | Short | Required | Description | Possible Values |
|--------|-------|----------|-------------|-----------------|
| `--config` | `-c` | No | Path to the YAML configuration file | Any valid file path |
| `--devtron-url` | `-u` | Yes | Devtron URL | Valid Devtron instance URL |
| `--api-token` | `-t` | Yes | API token | Valid Devtron API token with required access |

## Environment Variables

You can also set the following environment variables instead of providing options on the command line:

| Environment Variable | Description |
|----------------------|-------------|
| `DEVTRON_URL` | Devtron URL |
| `DEVTRON_API_TOKEN` | Devtron API token |

## Commands

### 1. create-app

Creates a new application in Devtron.

```bash
tron create-app [OPTIONS]
```

#### Options

| Option | Short | Required | Description | Possible Values |
|--------|-------|----------|-------------|-----------------|
| `--config` | `-c` | Yes | Path to the YAML configuration file | Any valid file path |
| `--devtron-url` | `-u` | Yes | Devtron URL | Valid Devtron instance URL |
| `--api-token` | `-t` | Yes | API token | Valid Devtron API token with required access |

#### Configuration File Fields

The configuration file should contain the following fields:

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `app_name` | Yes | Name of the application | String |
| `project_name` | Yes | Name of the project | String |
| `description` | No | Description of the application | String |
| `labels` | No | Labels for the application | Array of label objects |
| `git_repositories` | Yes | Git repository configurations | Array of git repository objects |
| `build_configurations` | Yes | Build configuration settings | Build configuration object |
| `base_configurations` | Yes | Base deployment configuration | Base configuration object |
| `workflows` | Yes | Workflow configurations for CI/CD | Array of workflow objects |

#### Label Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `key` | Yes | Label key | String |
| `value` | Yes | Label value | String |
| `propagate` | No | Whether to propagate the label to all resources created in application | `true` or `false` |

#### Git Repository Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `url` | Yes | Git repository URL | Valid Git URL |
| `git_account_name` | Yes | Name of the git account | String |
| `checkout_path` | Yes | Path to checkout the repository | String (default: "./") |
| `fetch_submodules` | No | Whether to fetch submodules | `true` or `false` |
| `filter_pattern` | No | Filter patterns for files | Array of strings |

#### Build Configuration Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `container_registry_name` | Yes | Name of the container registry | String |
| `repository_name` | Yes | Name of the repository | String |
| `target_platform` | No | Target platforms for buildx | Comma-separated platform list |
| `dockerfile_repository` | Yes | Repository for Dockerfile | String |
| `build_context` | No | Docker build context | String (default: "./") |
| `docker_build_args` | No | Docker build arguments | Key-value pairs |
| `build_type` | Yes | Type of build | `"DockerfileExists"`, `"CreateDockerfile"`, or `"Buildpacks"` |
| `dockerfile_path` | Yes (if build_type is DockerfileExists) | Path to Dockerfile | String |
| `language` | Yes (if build_type is CreateDockerfile) | Programming language | String |
| `language_framework` | Yes (if build_type is CreateDockerfile) | Framework | String |
| `dockerfile_content` | Yes (if build_type is CreateDockerfile) | Dockerfile content | Multi-line string |
| `builder_image` | Yes (if build_type is Buildpacks) | Builder image for buildpacks | String |
| `version` | Yes (if build_type is Buildpacks) | Language version | String |

#### Base Configuration Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `deployment_template` | Yes | Base deployment template | Template object |
| `config_maps` | No | ConfigMap configurations | Array of ConfigMap objects |
| `secrets` | No | Secret configurations | Array of Secret objects |

#### Template Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `version` | Yes | Version of the template | `"1.6.0"`, `"4.21.0"`, `"5.0.0"` |
| `chart_type` | Yes | Type of chart | `"Job & CronJob"`, `"Deployment"`, `"StatefulSet"`, `"GPU-Workload"`, `"Rollout Deployment"` |
| `use_default` | No | Whether to use default values | `true` or `false` |
| `values_patch` | No (works only if use_default is true) | Patch/override keys in deployment template | Object |

#### ConfigMap Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `name` | Yes | Name of the ConfigMap | String |
| `type` | No | Type of ConfigMap | `"volume"` or `"environment"` (default: "environment") |
| `data` | Yes (if from_file not provided) | Key-value data | Object |
| `mountPath` | No | Mount path for volume | String |
| `subPath` | No | Whether to use subPath | `true` or `false` |
| `filePermission` | No | File permission | String |
| `external` | No | Whether it's an external ConfigMap | `true` or `false` |
| `from_file` | Yes (if data not provided) | Path to ConfigMap value file | String |

#### Secret Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `name` | Yes | Name of the Secret | String |
| `type` | No | Type of Secret | `"volume"` or `"environment"` (default: "environment") |
| `data` | No | Key-value data | Object |
| `mountPath` | No | Mount path for volume | String |
| `subPath` | No | Whether to use subPath | `true` or `false` |
| `filePermission` | No | File permission | String |
| `external` | No | Whether it's an external Secret | `true` or `false` |
| `from_file` | No | Path to Secret value file | String |
| `roleARN` | No | AWS role ARN | String |
| `externalType` | No | External secret type | String (for example, `"ESO_AWSSecretsManager"`) |
| `esoSecretData` | No | ESO secret data | Object |

#### Workflow Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `ci_pipeline` | Yes | CI pipeline configuration | CI Pipeline object |
| `cd_pipelines` | No | CD pipeline configurations | Array of CD Pipeline objects |

#### CI Pipeline Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `type` | Yes | Type of pipeline | `"CI_JOB"`, `"CI_BUILD"`, `"LINKED"` |
| `is_manual` | Yes | Whether to trigger the CI pipeline manually | `true` or `false` |
| `name` | Yes | Name of the CI pipeline | String |
| `branches` | Yes (unless type is LINKED) | Branches for the git repositories | Array of branch objects |
| `source_pipeline` | Yes (if type is LINKED) | Name of the source CI pipeline | String |
| `pre_build_configs` | No | Pre-build configurations | Object (see below) |
| `post_build_configs` | No | Post-build configurations | Object (see below) |

##### Pre/Post Build Configs Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `tasks` | No | List of build tasks | Array of build task objects |
| `is_manual` | No | Manual trigger | `true` or `false` (default: `true`) |

##### Build Task Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `type` | Yes | Type of build task | `"plugin"` |
| `task_name` | Yes | Name of the task | String |
| `name` | Yes | Name of the plugin | String |
| `version` | Yes | Plugin version | String |
| `input_variables` | No | Input variables | Key-value dict |

#### Branch Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `repo` | Yes | Repository name | String |
| `branch` | Yes | Branch name | String |
| `type` | Yes | Branch type | `"SOURCE_TYPE_BRANCH_FIXED"` |
| `regex` | No | Regex pattern for branch | String |

#### Build Config Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `type` | Yes | Type of pre or post build config | `"plugin"` |
| `name` | Yes | Name of the plugin to use or task being created using custom script | String |
| `version` | Yes | Version of the plugin to use (Empty in case of custom script) | String |
| `input_variables` | No | Input variables | Array of variable objects |

#### Variable Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| Variable name | Yes | Variable name | String |
| Variable value | Yes | Variable value | String |

#### CD Pipeline Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `name` | No | Name of the CD pipeline | String |
| `environment_name` | Yes | Name of the environment for deployment | String |
| `is_manual` | Yes | Whether to trigger the CD pipeline manually | `true` or `false` |
| `deployment_type` | No | Deployment type | `"helm"`, `"argo_cd"` (default: "helm") |
| `placement` | No | Placement strategy | `"parallel"`, `"serial"` (default: "parallel") |
| `deployment_strategies` | No | Deployment strategies | Array of strategy objects |
| `depends_on` | No | Name of environment to which this pipeline needs to be attached | String |
| `pre_cd_configs` | No | Pre-deploy configurations | Object (see below) |
| `post_cd_configs` | No | Post-deploy configurations | Object (see below) |
| `env_configuration` | No | Environment-specific overrides | Object (see below) |

##### Pre/Post CD Configs Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `tasks` | No | List of build tasks | Array of build task objects |
| `is_manual` | No | Manual trigger | `true` or `false` (default: `true`) |

##### Env Configuration Object Structure

| Field | Required | Description | Possible Values |
|-------|----------|-------------|-----------------|
| `deployment_template` | No | Deployment template override | Object |
| `config_maps` | No | ConfigMap overrides | Array of ConfigMap objects |
| `secrets` | No | Secret overrides | Array of Secret objects |

### 2. update-app

Updates an existing application in Devtron.

```bash
tron update-app [OPTIONS]
```

#### Options

| Option | Short | Required | Description | Possible Values |
|--------|-------|----------|-------------|-----------------|
| `--config` | `-c` | Yes | Path to the YAML configuration file | Any valid file path |
| `--devtron-url` | `-u` | Yes | Devtron URL | Valid Devtron instance URL |
| `--api-token` | `-t` | Yes | API token | Valid Devtron API token |

#### Configuration File Fields

The configuration file structure is the same as for `create-app`. Refer to the `create-app` section for details on all possible fields and their values.

### 3. get-app

Gets application configuration from Devtron and outputs it in YAML format.

```bash
tron get-app --app APPLICATION_NAME [OPTIONS]
```

#### Options

| Option | Short | Required | Description | Possible Values |
|--------|-------|----------|-------------|-----------------|
| `--app` | | Yes | Name of the application to fetch | String |
| `--config` | `-c` | No | Path to the YAML configuration file | Any valid file path |
| `--devtron-url` | `-u` | Yes | Devtron URL | Valid Devtron instance URL |
| `--api-token` | `-t` | Yes | API token | Valid Devtron API token |

## Examples

### Create a new application

```bash
tron create-app -c config.yaml -u https://devtron.example.com -t your_api_token
```

### Update an existing application

```bash
tron update-app -c config.yaml -u https://devtron.example.com -t your_api_token
```

### Get application configuration

```bash
tron get-app --app my-app -u https://devtron.example.com -t your_api_token
```

## Sample Configuration File (create-app)

```yaml
app_name: "my-application"
project_name: "my-project"
description: "Sample application created via Tron"
labels:
  - key: "app-usage"
    value: "platform"
    propagate: false
  - key: "owner"
    value: "devtron-team"
    propagate: true
git_repositories:
  - url: "https://github.com/org/sample-repo.git"
    git_account_name: "GitHub"
    checkout_path: "./src"
    fetch_submodules: false
    filter_pattern:
      - "!Dockerfile.old"
  - url: "https://github.com/org/another-repo.git"
    git_account_name: "GitHub"
    checkout_path: "./lib"
build_configurations:
  container_registry_name: "company-registry"
  repository_name: "sample-app"
  target_platform: "linux/amd64,linux/arm64"
  dockerfile_repository: "sample-repo"
  build_context_repository: "sample-repo"
  build_context: "./"
  docker_build_args:
    ENV: production
    DEBUG: "false"
  build_type: "DockerfileExists"
  dockerfile_path: "Dockerfile"
config_approval:
  action: proposed
  if_draft_already_exists: merge
  notify_all: true
  specific_approvers:
    - "devtron@example.com"
  comments: "Proposed by CLI"
base_configurations:
  deployment_template:
    show_application_metrics: true
    version: "4.21.0"
    chart_type: "Deployment"
    # values_path: "base-deployment.yaml"
    values_patch:
      EnvVariables:
        - name: ENVIRONMENT
          value: production
      replicaCount: 3
    # NOTE: Set either values_path or values_patch (not both).
  config_maps:
    - name: app-config-env
      data:
        API_URL: "https://api.example.com"
        FEATURE_FLAG: "enabled"
      mountPath: /etc/config
      subPath: true
      filePermission: "0644"
    - name: logging-config
      data:
        LOG_LEVEL: "INFO"
        LOG_FORMAT: "json"
      mountPath: /etc/logging
      subPath: true
      filePermission: "0644"
    - name: external-config-env
      external: true
    - name: external-config-volume
      external: true
      mountPath: /mnt/external
      subPath: true
      filePermission: "0644"
    - name: configmap-from-file-volume
      from_file: "config-volume.yaml"
      mountPath: /mnt/volume
      subPath: true
      filePermission: "0644"
    - name: configmap-from-file-env
      from_file: "config-env.yaml"
  secrets:
    - name: db-credentials
      from_file: "db-creds.yaml"
      mountPath: /etc/secrets
      subPath: false
      filePermission: "0600"
    - name: api-secret
      data:
        API_KEY: "REDACTED"
        API_SECRET: "REDACTED"
    - name: external-secret-env
      external: true
    - name: external-secret-vol
      external: true
      mountPath: /mnt/secret
      subPath: true
      filePermission: "0600"
    - name: cloud-secret
      roleARN: "arn:aws:iam::123456789012:role/CloudSecretRole"
      externalType: ESO_AWSSecretsManager
      external: true
      esoSecretData:
        secretStore:
          aws:
            service: SecretsManager
            region: us-east-1
            auth:
              secretRef:
                accessKeyIDSecretRef:
                  name: aws-secret
                  key: access-key
                secretAccessKeySecretRef:
                  name: aws-secret
                  key: secret-access-key
        esoData:
          - secretKey: prod-db-password
            key: secrets/prod-db-secrets
            property: prodPassword
      esoSecretData:
        secretStore:
          aws:
            service: SecretsManager
            region: us-east-1
            auth:
              secretRef:
                accessKeyIDSecretRef:
                  name: awssm-secret
                  key: access-key
                secretAccessKeySecretRef:
                  name: awssm-secret
                  key: secret-access-key
        esoData:
          - secretKey: prod-mysql-password
            key: secrets/prod-mysql-secrets
            property: prodPassword
workflows:
  - ci_pipeline:
      type: "CI_JOB"
      is_manual: true
      name: "test-ci-pipeline"
      branches:
        - repo: "test"
          branch: "master"
          type: "SOURCE_TYPE_BRANCH_FIXED"
          regex: ""
        - repo: "getting-started-node-js"
          branch: "main"
          type: "SOURCE_TYPE_BRANCH_FIXED"
          regex: ""
      pre_build_configs:
        tasks:
        - type: "plugin"
          task_name: Devtron CI Trigger
          name: "Devtron CI Trigger"
          version: "1.1.0"
          input_variables:
            DevtronApiToken: "demo-repo"
            DevtronEndpoint: "https://demo.ai"
            DevtronApp: "sample-app-10"
            DevtronEnv: "@{{Keka}}"
        - type: "plugin"
          task_name: Devtron CI Trigger 2
          name: "Devtron CI Trigger"
          version: "1.1.0"
          input_variables:
            DevtronApiToken: "demo-repo"
            DevtronEndpoint: "https://demo.ai"
            DevtronApp: "sample-app-10"
            DevtronEnv: "@{{Keka}}"
      post_build_configs: {}
    cd_pipelines:
      - name: my-new-pipeline
        environment_name: "devtron-demo"
        is_manual: true
        deployment_type: "helm"
        placement: parallel
        deployment_strategies:
          - name: "Rolling"
            strategy:
              maxSurge: 25%
              maxUnavailable: 1
            default: true
          - name: "recreate"
            strategy: {}
        pre_cd_configs:
          tasks:
          - type: "plugin"
            task_name: Devtron CI Trigger
            name: "Devtron CI Trigger"
            version: "1.1.0"
            input_variables:
              DevtronApiToken: "demo-repo"
              DevtronEndpoint: "https://demo.ai"
              DevtronApp: "sample-app-10"
              DevtronEnv: "@{{Keka}}"
          - type: "custom"
            task_name: "Create Readme File"
            description: "Creates a README.md file with project information"
            input_variables:
              - key: "PROJECT_NAME"
                type: "STRING"
                value: "sample-app"
              - key: "AUTHOR"
                type: "STRING"
                value: "devtron-labs"
            output_variables:
              - key: "README_PATH"
                type: "STRING"
                description: "Path to the created README file"
            output_directory_paths:
              - "/workspace"
            script: |
              #!/bin/sh
              set -e
              echo "# $PROJECT_NAME" > /workspace/README.md
              echo "Author: $AUTHOR" >> /workspace/README.md
            trigger_conditions:
              - key: "PROJECT_NAME"
                operator: "!="
                value: "dummy-project"
            pass_conditions:
              - key: "README_PATH"
                operator: "!="
                value: "/workspace/README.md"
          - type: "plugin"
            task_name: Code Scan
            name: "Code Scan"
            version: "1.0.0"
            input_variables: {}
          is_manual: true
        post_cd_configs:
          is_manual: true
          tasks:
          - type: "plugin"
            task_name: Code Scan
            name: "Code Scan"
            version: "1.0.0"
            input_variables: {}
          - type: "plugin"
            task_name: Devtron CI Trigger
            name: "Devtron CI Trigger"
            version: "1.1.0"
            input_variables:
              DevtronApiToken: "demo-repo-5"
              DevtronEndpoint: "https://demo.ai"
              DevtronApp: "sample-app-10"
              DevtronEnv: "@{{Keka}}"
        env_configuration:
          deployment_template:
            version: "4.20.0"
            merge_strategy: "patch"
            show_application_metrics: true
            values_patch:
              replicaCount: 2
              resources:
                limits:
                  cpu: "2"
                  memory: "500Mi"
                requests:
                  cpu: "0.50"
                  memory: "200Mi"
          config_maps:
            - name: configmap-from-file-env
              type: "volume"
              mountPath: /etc/config
              filePermission: "0400"
              subPath: false
              merge_strategy: "patch"
              data:
                key1: overridden-value1
                key4: value4
            - name: configmap-from-file-env-new
              type: "volume"
              mountPath: /etc/config
              filePermission: "0400"
              subPath: false
              merge_strategy: "replace"
              data:
                key1: overridden-value1
                key4: value4
          secrets:
            - name: secret-from-file-env
              type: "volume"
              mountPath: /etc/config
              filePermission: "0400"
              subPath: false
              merge_strategy: "replace"
              from_file: "test-config-map.yaml"
              data:
                key1: overridden-value1
                key4: value4
            - name: secret-from-file-env-new
              data:
                key1: overridden-value1
                key4: value4
      - name: demo3-deploy
        environment_name: "demo3"
        is_manual: true
        deployment_type: "helm"
  - ci_pipeline:
      type: "LINKED"
      is_manual: true
      name: "test-ci-pipeline-2"
      source_pipeline: "test-ci-pipeline"
    cd_pipelines:
      - name: demo2-deploy
        environment_name: "demo2"
        is_manual: true
        deployment_type: "helm"
        pre_cd_configs:
          tasks:
          - type: "plugin"
            task_name: Devtron CI Trigger
            name: "Devtron CI Trigger"
            version: "1.1.0"
            input_variables:
              DevtronApiToken: "demo-repo"
              DevtronEndpoint: "https://demo.ai"
              DevtronApp: "sample-app-10"
              DevtronEnv: "@{{Keka}}"
          - type: "custom"
            task_name: "Run container task"
            description: "Runs a container task with the specified image and command"
            container_image: "alpine:latest"
            input_variables:
              - key: "PROJECT_NAME"
                type: "STRING"
                value: "sample-app"
              - key: "AUTHOR"
                type: "STRING"
                value: "devtron-labs"
            output_directory_paths:
              - "/container_workspace"
            script: |
              #!/bin/sh
              set -e
              echo "# $PROJECT_NAME" > /container_workspace/README.md
              echo "Author: $AUTHOR" >> /container_workspace/README.md
            script_mount_path: "/container_workspace/test.sh"
            command: "/bin/sh"
            args: ["-c", "test.sh"]
            ports_mappings:
              - 8080:8090
            script_mount_path_on_container: "/sourcecode/test.sh"
            directory_mappings:
              - "/devtroncd:/sourcecode"
          - type: "plugin"
            task_name: Code Scan
            name: "Code Scan"
            version: "1.0.0"
            input_variables: {}
          is_manual: true
          run_in_app_env: true
```
