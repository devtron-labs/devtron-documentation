# ConfigMaps & Secrets

## ConfigMaps

A ConfigMap stores key-value pairs that your jobs can use as environment variables or mounted files. ConfigMaps are meant for non-sensitive data. Moreover, you can update configurations without modifying or rebuilding your container images, thus making the deployments more efficient.

To configure a ConfigMap for your job pipeline, refer to the [ConfigMaps](./configmap-job.md) section.

---

## Secrets

Secrets and ConfigMaps are both used to store configurations, but there is one major difference between them: ConfigMaps store key-values in normal text format, whereas secrets store them in base64 encrypted form. Devtron hides the data of secrets for the normal users, and it is only visible to the users having edit permission.

To configure a Secret for your job pipeline, refer to the [Secrets](./secret-job.md) section.
