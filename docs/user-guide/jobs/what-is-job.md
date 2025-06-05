# What is Jobs?

Devtron Jobs provides a streamlined way to execute specific tasks or a set of tasks defined by the user within the user's application environment.

Unlike Devtron CI/CD pipelines that primarily focus on building, testing, and deploying applications, Devtron Jobs are designed to handle independent, ephemeral tasks and allows you to execute tasks without impacting CI/CD workflows or pipelines, making them ideal for specific tasks.

Each Devtron Job corresponds to a [Kubernetes Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) that creates one or more Pods to carry out the specific task. Once the task is completed, the Pods are terminated, making Devtron Jobs an ideal solution for one-time, recurring, or event-driven workloads.

Jobs can be configured to run as:

* **One-time tasks**: Useful for maintenance operations, data migrations, backups, or environment cleanups.

* **Recurring tasks**: Scheduled operations like daily scans, periodic backups, or routine security checks.

* **Event-driven tasks**: Triggered by specific events such as commits, pull requests, or tag creation.

Devtron Jobs supports executing custom tasks or predefined operations using integrated pipeline plugins. These plugins extend job functionality by enabling tasks such as code scanning, image signing, vulnerability patching, container image copying, and external automation through tools like Ansible and Bitbucket Runners. To explore the full list of supported plugins and their configuration options, refer to the [Devtron Plugin Documentation](/docs/user-guide/plugins/README.md).

To learn how to create a new Job in Devtron, continue to the [Create a new job](./create-job.md) section.
