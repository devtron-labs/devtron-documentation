# Deploying Software to Air-Gapped Environments with Devtron

## Problem Statement

Industries such as healthcare, banking, and finance, have regulations that require certain data to be stored and processed in air-gapped environments. Air-gapped environments are more secure and since they are not exposed to the public, they are less vulnerable to attacks. However, this isolation brings challenges when it comes to receiving and deploying software updates, security patches, bug fixes which generally depend on Internet availability.

Devtron ensures reliable delivery of software updates regardless of whether your air-gapped environment has Internet access or not. By using Devtron’s OCI push/pull features and helm package generation, vendors and clients can overcome the challenges posed by air-gapped environments

---

## How Devtron Helps Solve the Problem:

### Scenario 1: Air-Gapped Cluster has access to OCI registry 

In cases where the air-gapped cluster gets controlled access to the Internet, Devtron's OCI push/pull feature helps in delivering your software via OCI registry.

1. **Vendor Action:**

   - The vendor uses Devtron to generate and [push Helm package](../global-configurations/container-registries.md#push-helm-packages) to an OCI registry (accessible to both vendor and client) by deploying to an [isolated cluster](../creating-application/workflow/cd-pipeline.md#deploying-to-an-isolated-environment).

2. **Client Action:**
   - The client can install the helm package from the OCI registry using their existing deployment tools, or use Devtron to [pull the Helm package](../global-configurations/container-registries.md#use-as-chart-repository) from the OCI registry to their [Chart Store](../deploy-chart/README.md).
   - Once the Helm package is pulled, it [appears in the Chart Store](../deploy-chart/README.md#populating-your-charts-to-the-chart-store), allowing easy deployment to the air-gapped environment.


### Scenario 2: Air-Gapped Cluster has no Internet Access

In fully air-gapped environments with no Internet access, the vendor and client may rely on physical transfer of Helm packages. Devtron facilitates this as follows:

1. **Vendor Action:**
   - Similar to [Scanario 1](#scenario-1-air-gapped-cluster-has-access-to-oci-registry), the vendor generates a helm package by deploying the application to an [isolated cluster](../global-configurations/cluster-and-environments.md#add-isolated-cluster).
   - Since the client has no access to the Internet, the vendor need not push it to the OCI registry but rather download the generated Helm package either from [App Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-push/app-details-page.jpg) or [Deployment History](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/use-cases/oci-push/deployment-history-page.jpg) page of the app in Devtron.
   - The Helm package (available in .tgz format) is handed over by the vendor to the client via a portable storage device (e.g., USB drive).

2. **Client Action:**
   - The client manually uploads the Helm package to their air-gapped cluster by mounting the storage device.
   - The client deploys the package to the environment using their deployment tools, CLI, or [Cluster Terminal in Devtron's Resource Browser](../resource-browser.md#cluster-terminal).

This method ensures that clients using air-gapped clusters, even without Internet access, can securely receive software updates.

