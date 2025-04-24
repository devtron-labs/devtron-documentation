# CI Pipeline

{% hint style="info" %}
For Devtron version older than v0.4.0, please refer the [CI Pipeline (legacy)](https://docs.devtron.ai/v/v0.4/devtron/user-guide/creating-application/workflow/ci-pipeline-legacy) page.
{% endhint %} 

## Introduction

In Devtron, the Build and Deploy from Source Code method allows users to build container images directly from a Git repository and deploy them in a Kubernetes environment.

## When to Use This Method?

* When you need to build a container image from your application's source code.
* When you want automated builds triggered by code changes.
* When you require pre-build and post-build customization steps.

{% hint style="info" %}
hint about docker image
{% endhint %}

## Step-by-Step Guide to Creating a CI Pipeline

1. Navigate to Workflow Editor
2. From the Applications menu, select your application.
3. Go to the App Configuration page and select Workflow Editor.
4. Click + New Workflow.
5. Select Build and Deploy from Source Code.

### Configure Build Pipeline
1. In the Create Build Pipeline window, enter the following details:

| Field Name | Required/Optional | Description |
| :--- | :--- | :--- |
| Pipeline Name | Required | A unique name for the build pipeline. |
| Source type | Required | Source type to trigger the CI. Available options: [Branch Fixed](#source-type-branch-fixed) \| [Branch Regex](#source-type-branch-regex) \|[Pull Request](#source-type-pull-request) \| [Tag Creation](#source-type-tag-creation) |
| Branch Name | Required | Branch that triggers the CI build |
| Advanced Options | Optional | Create Pre-Build, Build, and Post-Build tasks |

#### Understanding Source Types

Devtron provides multiple ways to trigger a build pipeline:

| Source Type | Description | Additional Requirements |
| :--- | :--- | :--- |
| Branch Fixed | Triggers a CI build whenever changes are pushed to a specified branch. | Requires a predefined branch name.|
| Branch Regex | Allows dynamic branch selection based on a regex pattern, useful for branches following a common naming convention (e.g., feature-*). | Requires a regex pattern to be defined.|
| Pull Request (PR) | Triggers a CI build when a new pull request is created.| Requires webhook configuration for GitHub or Bitbucket.|
| Tag Creation | Triggers a build whenever a new tag is created. | Requires webhook configuration for GitHub or Bitbucket.|

2. Click Create Pipeline to save the configuration and proceed. You can now use the default settings, or continue below to explore additional configuration options for customizing your pipeline.

### Configuring Advanced Options

Devtron provides three stages in a CI pipeline: Pre-Build, Build, and Post-Build.

1. Pre-Build Stage: This stage is used for preparing the environment before the actual build begins. Tasks such as dependency installation, secret management, and validation can be configured here.

2. Build Stage: The core stage where the application source code is compiled, a container image is built, and the necessary artifacts are generated.

3. Post-Build Stage: This stage runs after the build is complete, where additional tasks such as security scans, notifications, or artifact uploads can be executed.

This guide focuses on configuring the Build Stage. If you want to set up Pre-Build and Post-Build stages, refer to the separate documentation

* Pre-Build Stage Configuration
* Post-Build Stage Configuration

#### Scan for Vulnerabilities

Devtron supports security scanning after the build stage.

##### Prerequisite

Ensure you have installed one of the following integrations:
* Clair
* Trivy

##### How to Enable Security Scan?

* In the Build Stage tab, enable Scan for vulnerabilities.
* This will scan the built container image for known vulnerabilities.

#### Custom Image Tag Pattern

You can define custom image tags for better version tracking.

* Enable the Custom Image Tag Pattern toggle.
* Define an alphanumeric pattern (e.g., test-v1.0.{x} where x auto-increments with each build).
* Click Update Pipeline.

{% hint style="info" %}
Ensure custom tags do not start or end with a period (.) or comma (,).
{% endhint %} 

#### Triggering a Build

Once the CI pipeline is set up, follow these steps to trigger a build:

* Navigate to Build & Deploy.

* Click Select Material.

* Choose the Git commit to build.

* Click Start Build.

Once successful, the image tag will be available in:

* Build History
* Docker Registry 
* CD Pipeline (Image Selection)