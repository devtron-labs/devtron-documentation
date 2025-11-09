---
id: filter-condition
title: Filter Condition
sidebar_label: Filter Condition
slug: /user-guide/app-management/policies/filter-condition
---

# Filter Condition

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

The [workflows](../creating-application/workflow/README.md) you create in Devtron for managing the CI-CD of your application can be made flexible or restricting with the help of CD filter conditions, for e.g., not all events (such as image builds) generated during the CI stage require progression to the CD stage. Therefore, instead of creating multiple workflows that cater to complex requirements, Devtron provides you the option of defining filters to tailor your workflow according to your specific needs. 

Using filter conditions, you can control the progression of events. Here are a few general examples:
* Images containing the label "test" should not be eligible for deployment in production environment
* Only images having tag versions greater than v0.7.4 should be eligible for deployment
* Images hosted on Docker Hub should be eligible but not the rest
* Only images derived from master branch should be eligible for production deployment (see [example](#scenario-2))

---

## Steps to Create a Filter

:::info Prerequisites
You must have application(s) with CI-CD workflow(s) configured
:::

1. From the left sidebar, go to **Application Management** → **Policies** → **Filter Condition**.

2. Add a filter condition.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/add-filter.jpg)
<center>Figure 1: Creating Our First Filter</center>

3. In the **Define Filter condition** section, you get the following fields:
    * **Filter For**: Choose the pipeline upon which the filter should apply. Currently, you can use filter conditions for CD pipelines only. Support for CI pipelines is underway.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/define-filter-page.jpg)
<center>Figure 2: 'Define Filter Condition' section</center>

    * **Filter Name**: Give a name to the filter.
    * **Description**: (Optional) Add a description to the filter, preferably explaining what it does.
    * **Filter Condition**: You can specify either a pass condition, fail condition, or both the conditions:
        * **Pass Condition**: Events that satisfy the pass condition are eligible to trigger your CD pipeline.
        * **Fail Condition**: Events that satisfy the fail condition are not eligible to trigger your CD pipeline.
    * **Use CEL Expression**: You can use `Common Expression Language` (CEL) to define the conditions. Currently, you can create conditions with the help of following variables:
        * **containerImage**: Package that contains all the necessary files and instructions to run an application in a container, e.g., gcr.io/k8s-minikube/kicbase:v0.0.39. It returns a string value in the following format: `<registry>/<repository>:<tag>`
        * **containerRepository**: Storage location for container images, e.g., kicbase
        * **containerImageTag**: Versioning of image to indicate its release, e.g., v0.0.39
        * **imageLabels**: The label(s) you assign to an image in the CD pipeline, e.g., ["PROD","Stage"]. It returns an array of strings.

        Click **View filter criteria** to check the supported criteria. You get a copy button and a description of each criterion upon hovering. Moreover, you can go to **CEL expression** to learn more about the rules and supported syntax. Check [Examples](#examples) to know more.

        ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/filter-criteria.jpg)
<center>Figure 3: List of Supported Values</center>

4. Click **Next**.

5. In the **Apply to** section, you get the following fields:
    * **Application**: Choose one or more applications to which your filter condition must apply.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/app-selection.jpg)
<center>Figure 4: Selecting Application(s)</center>

    * **Environment**: Choose one or more environments to which your filter condition must apply.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/environment-selection.jpg)
<center>Figure 5: Selecting Environment(s) from Cluster(s)</center>

:::info 
Since an application can have more than one environment, the filter conditions apply only to the environment you chose in the **Apply to** section. If you create a filter condition without choosing an application or environment, it will not apply to any of your pipelines.
:::

6. Click **Save**. You have successfully created a filter.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/filter-created.jpg)
<center>Figure 6: Success Toast</center>

:::caution 
If you create filters using CEL expressions that result in a conflict (i.e., passing and failing of the same image), fail will have higher precedence
:::

---

## Examples

Here's a sample pipeline we will be using for our explanation of [pass condition](#pass-condition) and [fail condition](#fail-condition).

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/sample-workflow.jpg)
<center>Figure 7: Sample Pipeline</center>


### Pass Condition

#### Scenario 1

Consider a scenario where you wish to make an image eligible for deployment only if its tag version is greater than `v0.0.7`

The CEL Expression should be `containerImageTag > "v0.0.7"`

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/pass-condition-1.jpg)
<center>Figure 8: CEL Expression for Pass Condition</center>

Go to the **Build & Deploy** tab. The filter condition was created specifically for `test` environment, therefore the filter condition would be evaluated only at the relevant CD pipeline, i.e., `test`

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/pass-env.jpg)
<center>Figure 9: Build & Deploy tab</center>

Click **Select Image** for the `test` CD pipeline. The first tab **Eligible images** shows the list and count of images that have satisfied the pass condition since their tag versions were greater than `v0.0.7`. Hence, they are marked eligible for deployment.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/eligible-list-1.jpg)
<center>Figure 10: List of Eligible Images</center>

The second tab **Latest images** shows the latest builds (up to 10 images) irrespective of whether they have satisfied the filter condition(s) or not. The ones that have not satisfied the filter conditions get marked as `Excluded`. In other words, they are not eligible for deployment. 

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/latest-list-1.jpg)
<center>Figure 11: List of Latest Images</center>

Clicking the filter icon at the top-left shows the filter condition(s) applied to the `test` CD pipeline.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/filter-icon-pass-1.jpg)
<center>Figure 12a: Filter Icon</center>

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/conditions-applied-1.jpg)
<center>Figure 12b: Conditions Applied</center>

#### Scenario 2

Consider another scenario where you wish to make images eligible for deployment only if the application's git branch starts with the word `hotfix` and also if its repo URL matches your specified condition.

**CEL Expression**:

`gitCommitDetails.filter(gitCommitDetail, gitCommitDetail.startsWith('https://github.com/devtron-labs')).map(repo, gitCommitDetails[repo].branch).exists_one(branch, branch.startsWith('hotfix-'))`

where, `https://github.com/devtron-labs` is a portion of the repo URL <br/>
and `hotfix-` is for finding the branch name (say *hotfix-sept-2024*)

Alternatively, if you have a fixed branch (say *hotfix-123*), you may write the following expression:

`'hotfix-123' in gitCommitDetails.filter(gitCommitDetail, gitCommitDetail.startsWith('https://github.com/devtron-labs')).map(repo, gitCommitDetails[repo].branch)`

**Walkthrough Video**:

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/R8IbZhXhH-k" title="Filter Condition Example" frameborder="0" allow="fullscreen"></iframe></div>


### Fail Condition

Consider a scenario where you wish to exclude an image from deployment if its tag starts with the word `trial` or ends with the word `testing`

The CEL Expression should be `containerImageTag.startsWith("trial") || containerImageTag.endsWith("testing")`

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/test-filter-1.jpg)
<center>Figure 13: CEL Expression for Fail Condition</center>

Go to the **Build & Deploy** tab. The filter condition was created specifically for `devtron-demo` environment, therefore the filter condition would be evaluated only at the relevant CD pipeline, i.e., `devtron-demo`

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/fail-filter.jpg)
<center>Figure 14: Build & Deploy tab</center>

Click **Select Image** for the `devtron-demo` CD pipeline. The first tab **Eligible images** shows the list and count of images that have not met the fail condition. Hence, they are marked eligible for deployment.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/eligible-list-3.jpg)
<center>Figure 15: List of Eligible Images</center>

The second tab **Latest images** shows the latest builds (up to 10 images) irrespective of whether they have satisfied the filter condition(s) or not. The ones that have satisfied the filter conditions get marked as `Excluded`. In other words, they are not eligible for deployment. 

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/latest-list-2.jpg)
<center>Figure 16: List of Latest Images</center>

Clicking the filter icon at the top-left shows the filter condition(s) applied to the `devtron-demo` CD pipeline.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/doner-menu-fail-1.jpg)
<center>Figure 17a: Filter Menu Icon</center>

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/filters/conditions-applied-3.jpg)
<center>Figure 17b: Conditions Applied</center>

