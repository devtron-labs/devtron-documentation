# Overview

## Introduction

Devtron provides [DevSecOps](https://devtron.ai/videos/devsecops-policies-as-guardrails) capabilities across your software development life cycle for both: the default CI/CD solution by Devtron as well as your existing CI/CD Tools.

One of the key components of DevSecOps is the detection of security risks. Currently, Devtron supports the following types of scanning:

* Image Scan
* Code Scan <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>
* Kubernetes Manifest Scan <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/security-scan.jpg)
<center>Figure 1: Security Scan Results</center>

You can integrate a scanning tool of your choice. By default, Devtron integrates with [Trivy](./integrations/vulnerability-scanning/trivy.md) using which you can scan for the following issues:

* Vulnerability
* License Risks
* Misconfigurations
* Exposed Secrets

---

## Where to Initiate the Scan

### Before Building Artifact

When you commit the code, it's essential to scan it before building a [container image](../reference/glossary.md#image). By scanning early, you can catch and fix problems before they become expensive or time-consuming to remediate later. 

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/pre-ci.gif)
<center>Figure 2: Scanning in Pre-CI Stage</center>

1. In your Devtron application, go to **Configurations** (tab) → **Workflow Editor**.

2. Click the CI pipeline of your preferred workflow.

3. Go to the **Pre-build stage** (tab).

4. Click **+ Add Task**.

5. Choose **Vulnerability_Scanner v1.0.0** plugin from the list.

6. Click **Update Pipeline**.

<!-- Based on the results of the scanner, you can also decide whether your CI should proceed further or not. This is possible through **Pass/Failure Condition** setting in the plugin. In the below example, we are allowing image build only if the no. of high vulnerability is zero.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/pre-ci-condition.gif)
<center>Figure 3: Setting a Condition</center> -->

Results of Pre-CI scan will be visible under `Code Scan` in the **App Details** page as shown below.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/code-scan.gif)
<center>Figure 3: Pre-CI Code Scan Results</center>

### After Building Container Image

Once a container image is ready, you can scan its base image libraries, stale files, compromised licenses, and many more.

There are 2 options available:
* Image scan in the Build stage (refer [Security Scans](./security-features/security-scans.md))
* Comprehensive scan in Post-Build stage

This section contains the steps for comprehensive scan.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/post-ci.gif)
<center>Figure 4: Scanning in Post-CI Stage</center>

1. Go to the **Post-build stage** (tab) of your CI pipeline.

2. Click **+ Add Task** and choose **Vulnerability_Scanner v1.0.0**.

3. Click **Update Pipeline**.

Results of Post-CI scan will be visible under `Image Scan` in the **App Details** page as shown below.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/image-scan-1.gif)
<center>Figure 5: Post-CI Image Scan Results</center>

### Before Triggering Deployment

There can be a loophole where the original image built in the CI stage gets compromised later (say, in publicly accessible repository). Therefore, you can scan the image and catch issues before deploying it. On top of that, you can also scan manifests to detect misconfigurations and exposed secrets.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/pre-deploy.gif)
<center>Figure 6: Scanning in Pre-CD Stage</center>

1. Go to the **Pre-Deployment stage** (tab) of your CD pipeline.

2. Click **+ Add Task** and choose **Vulnerability_Scanner v1.0.0**.

3. Click **Update Pipeline**.

Results of Pre-CD scan will be visible under `Image Scan` and `Kubernetes Manifest` in the **App Details** page as shown below.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/image-scan-1.gif)
<center>Figure 7: Pre-CD Scan Results</center>

### During Helm App Deployment <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

When you [deploy a helm chart](../user-guide/deploy-chart/deployment-of-charts.md), Devtron will scan the image associated with that helm chart and also the manifests, but unlike Devtron Apps, there is no code scan involved.

Results of helm app scan will be visible under `Image Scan` and `Kubernetes Manifest` in the **App Details** page as shown below.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/helm-app-scan.gif)
<center>Figure 8: Helm App Scan Results</center>

### Extras

You can also check for vulnerabilities within a specific workload such as job, pod, deployment, etc. There are two ways to perform it:

#### From App Details

* Go to **App Details** (Devtron App/Helm App) → **Workloads** (under `K8 Resources` tab).
* Click a workload, e.g., Pod.
* On the right-hand side, click the kebab menu (3 vertical dots).
* Click **Check Vulnerabilities**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/app-details-scan.gif)
<center>Figure 9: Scanning Workloads - App Details Page</center>

#### From Resource Browser

* Go to Resource Browser.
* Select a cluster.
* Click a workload within the **Workloads** dropdown.
* Access the **Check Vulnerabilities** option from the kebab menu present to your selected workload.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/security/rb-scan.gif)
<center>Figure 10: Scanning Workloads - Resource Browser</center>

---

## Scans and Policies

:::caution Who Can Perform This Action?
Users need to have super-admin permission to enable vulnerability scanning and to define security policies in Devtron.
:::

Devtron's Security feature has two primary sections:

1. [**Security Scans**](./security-features/security-scans.md) - You can view the vulnerabilities detected across your applications.

2. [**Security Policies**](./security-features/security-policies.md) - This allows you to define guardrails to block or allow the deployment of container images depending on the vulnerabilities detected.

