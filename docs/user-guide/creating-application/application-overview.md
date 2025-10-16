# Introduction

The Application Overview page in Devtron gives you a complete view of your Devtron Applications. It includes information about your projects, applications, environments, and pipelines, all in a single view.

It helps you understand how your applications are organized, how your workflows are performing, and where you can improve visibility and control by giving you all the information in a single pane of view.

## At a Glance

The At a Glance section displays the total count of Projects, Devtron Applications, Helm Applications, and Environments, giving you an instant view of your overall applications in Devtron.

| **Card**              | **Description** |
|------------------------|----------------|
| **Projects**           | Total number of projects in Devtron |
| **Devtron Applications** | Total number of Devtron applications across all the clusters |
| **Helm Applications**  | Total number of Helm applications across all the clusters|
| **Environments**       | Total number of Environments in Devtron across all the clusters|

The Workflow Overview section displays how your CI/CD workflows are functioning in Devtron. It displays important metrics such as the number of build and deployment pipelines, external image sources, and production pipelines. It also shows how many pipelines follow GitOps best practices and have image scanning enabled.

| **Card** | **Description** |
|-----------|-----------------|
| **Build Pipelines** | Shows the total number of build pipelines configured in your Devtron |
| **Deployment Pipelines** | Displays the total number of deployment pipelines across all applications|
| **External Image Sources** | Displays the total number of build pipelines which uses external image source |
| **Scanning Enabled in Workflows** | Shows the count of workflows that have image scanning enabled for security checks |
| **GitOps Compliance (Prod Pipelines)** | Displays how many production pipelines are configured using GitOps for configuration consistency|
| **Production Pipelines** | Indicates the total number of production pipelines defined within your Devtron|

### Build & Deployment Metrics

The Build & Deployment Metrics section helps you assess how efficiently your teams deliver software using Devtron pipelines. It uses the industry standard DORA metrics to measure delivery performance and reliability across production deployment pipelines.

You can track four key metrics over a selected time range (for example, the last 30 days).

| **Metric** | **Description** |
|-------------|-----------------|
| **Deployment Frequency** | Indicates how often code changes are successfully deployed to production. Higher frequency shows faster delivery and stronger CI/CD maturity|
| **Mean Lead Time** | The average time taken from code commit to production deployment. Shorter lead times reflect faster delivery cycles and efficient workflows |
| **Change Failure Rate** | The percentage of deployments that result in a failure. Lower values indicate more stable releases and stronger testing practices |
| **Mean Time to Recovery (MTTR)** | The average time it takes to restore service after a failure. A shorter recovery time reflects stronger incident response and operational resilience |
| **Pipelines Count by Performance** | Categorizes pipelines into **Elite**, **High**, **Medium**, and **Low** performance based on DORA metrics. Helps identify which pipelines are performing well and which may need improvement |

{% hint style=“success” %}

### Use Case

Suppose your DevOps team is reviewing delivery performance for the last month. You notice that while Deployment Frequency has increased, the Mean Lead Time has also gone up. This suggests that more deployments are happening, but each one is taking longer to reach production. By comparing the Change Failure Rate and Mean Time to Recovery, your team can identify whether the delay is due to testing, approvals, or rollback handling. With these insights, you can fine-tune your workflow or automation to achieve faster and more reliable releases.

{% endhint %}