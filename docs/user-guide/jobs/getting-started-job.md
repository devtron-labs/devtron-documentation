# Getting Started With Jobs 

Devtron Jobs provide a streamlined way to execute specific tasks or set of tasks within your application environment direlty on the source code. Devtron Jobs leverage Kubernetes Jobs to run isolated, task-specific operations within your Kubernetes cluster. 

Unlike Devtron CI/CD pipelines that primarily focus on building, testing, and deploying applications, Devtron Jobs are designed to handle independent, ephemeral tasks and allows you to execute tasks without impacting Ci/CD workflows or pipelines, making them ideal for specific tasks.

Each Devtron Job corresponds to a [Kubernetes Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) that creates one or more Pods to carry out a specified task. Once the task is completed, the Pods are terminated, making Devtron Jobs an ideal solution for one-time, recurring, or event-driven workloads.

Jobs can be configured to run as:

* **One-time tasks**: Useful for maintenance operations, data migrations, backups, or environment cleanups.

* **Recurring tasks**: Scheduled operations like daily scans, periodic backups, or routine security checks.

* **Event-driven tasks**: Triggered by specific events such as commits, pull requests, or tag creation.

 ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/jobs.jpg)

Additionally, Devtron provides integrated [plugins]() that can be utilized within Jobs to enhance automation and streamline operations. You can explore the full list of plugins and their configurations in the [Devtron Plugin Documentation]() 

To learn how to create a new Job in Devtron, continue with the next section. 