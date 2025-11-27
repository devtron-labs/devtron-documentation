---
hide_table_of_contents: true
---

# App Configurations

<!-- <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/9u-pKiWV-tM" title="" frameborder="0" allow="fullscreen"></iframe></div> -->

This section helps you define how your application is built, deployed, and managed within Devtron. Each part below guides you through the stages of the app configuration process.

---

## Table of Contents

### [Git Repository](git-material.md)
Connect your application’s source code to Devtron by adding one or more Git repositories.  
Here you’ll specify the repository URL, and branch or folder paths to pull your manifests and code from.

### [Build Configuration](docker-build-configuration.md)
Define how your application’s container image is built.  
You can set the Dockerfile path, build context, build arguments, and target Docker registry to generate the image for deployment.

### [Base Configurations](./base-config/README.md)
Set up the fundamental deployment parameters for your application.  
This includes environment variables, secrets, deployment templates, and configuration files that define the behavior of your workloads.

### [GitOps Configuration](gitops-config.md)
Enable GitOps for your application to automatically sync configuration changes from Git to your cluster.  
This ensures your deployments remain consistent with the declared state in your repositories.

### [Workflow Editor](workflow/README.md)
Use the Workflow Editor to define CI/CD pipelines for your application.  
Here you can create and customize build, test, and deployment stages, and add pre- or post-deployment tasks for full automation.

### [External Links](external-links.md)
Link your application to third-party tools or dashboards such as monitoring, logging, or analytics systems.  
This helps you quickly navigate to related tools directly from Devtron.


### [Environment Overrides](environment-overrides.md)
Override specific configurations for different environments (e.g., dev, staging, production).  
Environment overrides let you have different parameters like resource limits in deployment template, configmaps, secrets, or URLs without changing the base configuration.


### [Deleting Application](../deleting-application.md)
Learn how to safely delete an application and its related configurations from Devtron when you no longer need it.