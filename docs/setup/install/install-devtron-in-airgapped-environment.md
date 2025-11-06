import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Devtron Installation in an Airgapped Environment

## Introduction

In certain scenarios, you may need to deploy Devtron to a Kubernetes cluster that isn’t connected to the internet. Such air-gapped environments are used for various reasons, particularly in industries with strict regulatory requirements like healthcare, banking, and finance. This is because air-gapped environments aren't exposed to the public internet; therefore, they create a controlled and secure space for handling sensitive data and operations.

:::success 
Try Devtron Freemium to access all the enterprise features for free and forever, limited to adding one additional cluster. [Install Devtron Freemium](https://license.devtron.ai/dashboard)

:::

:::warning Prerequisites 
1. Install `podman` or `docker` on the VM from where you're executing the installation commands.

2. Get the latest image file

```bash
curl -LO https://raw.githubusercontent.com/devtron-labs/devtron/refs/heads/main/devtron-images.txt.source
```

3. Set the values of `TARGET_REGISTRY`, `TARGET_REGISTRY_USERNAME`, and `TARGET_REGISTRY_TOKEN`. This registry should be accessible from the VM where you are running the cloning script and the K8s cluster where you’re installing Devtron.

If you are using Docker, the TARGET_REGISTRY should be in the format `docker.io/<USERNAME>`

:::

---

## Docker Instructions

### Platform Selection

#### For Linux/amd64

```bash
export PLATFORM="linux/amd64"
```
    
#### For Linux/arm64

```bash
export PLATFORM="linux/arm64"
```

1. Set the environment variables

    ```bash
    # Set the source registry URL
    export SOURCE_REGISTRY="quay.io/devtron"

    # Set the target registry URL, username, and token/password
    export TARGET_REGISTRY=""
    export TARGET_REGISTRY_USERNAME=""
    export TARGET_REGISTRY_TOKEN=""

    # Set the source and target image file names with default values if not already set
    SOURCE_IMAGES_LIST="${SOURCE_IMAGES_LIST:=devtron-images.txt.source}"
    TARGET_IMAGES_LIST="${TARGET_IMAGES_LIST:=devtron-images.txt.target}"
    ```

2. Log in to the target Docker registry

    ```bash
    docker login -u $TARGET_REGISTRY_USERNAME -p $TARGET_REGISTRY_TOKEN $TARGET_REGISTRY
    ```

3. Clone the images

    ```bash
    while IFS= read -r source_image; do
      # Check if the source image belongs to the quay.io/devtron registry
      if [[ "$source_image" == quay.io/devtron/* ]]; then
        # Replace the source registry with the target registry in the image name
        target_image="${source_image/quay.io\/devtron/$TARGET_REGISTRY}"

      # Check if the source image belongs to the quay.io/argoproj registry
      elif [[ "$source_image" == quay.io/argoproj/* ]]; then
        # Replace the source registry with the target registry in the image name
        target_image="${source_image/quay.io\/argoproj/$TARGET_REGISTRY}"

      # Check if the source image belongs to the public.ecr.aws/docker/library registry
      elif [[ "$source_image" == public.ecr.aws/docker/library/* ]]; then
        # Replace the source registry with the target registry in the image name
        target_image="${source_image/public.ecr.aws\/docker\/library/$TARGET_REGISTRY}"
      fi

      # Pull the image from the source registry
      docker pull --platform $PLATFORM $source_image

      # Tag the image with the new target registry name
      docker tag $source_image $target_image

      # Push the image to the target registry
      docker push $target_image

      # Output the updated image name
      echo "Updated image: $target_image"

      # Append the new image name to the target image file
      echo "$target_image" >> "$TARGET_IMAGES_LIST"

    done < "$SOURCE_IMAGES_LIST"
    ```
---

## Podman Instructions

### For Multi-arch

1. Set the environment variables

    ```bash
    export SOURCE_REGISTRY="quay.io/devtron"
    export SOURCE_REGISTRY_TOKEN=#Enter token provided by Devtron team
    export TARGET_REGISTRY=#Enter target registry url 
    export TARGET_REGISTRY_USERNAME=#Enter target registry username 
    export TARGET_REGISTRY_TOKEN=#Enter target registry token/password
    ```

2. Log in to the target Podman registry

    ```bash
    podman login -u $TARGET_REGISTRY_USERNAME -p $TARGET_REGISTRY_TOKEN $TARGET_REGISTRY
    ```

3. Clone the images

    ```bash
    SOURCE_REGISTRY="quay.io/devtron"
    TARGET_REGISTRY=${TARGET_REGISTRY}
    SOURCE_IMAGES_FILE_NAME="${SOURCE_IMAGES_FILE_NAME:=devtron-images.txt.source}"
    TARGET_IMAGES_FILE_NAME="${TARGET_IMAGES_FILE_NAME:=devtron-images.txt.target}"

    cp $SOURCE_IMAGES_FILE_NAME $TARGET_IMAGES_FILE_NAME
    while read source_image; do
      if [[ "$source_image" == *"workflow-controller:"* || "$source_image" == *"argoexec:"* || "$source_image" == *"argocd:"* ]]
      then
        SOURCE_REGISTRY="quay.io/argoproj"
        sed -i "s|${SOURCE_REGISTRY}|${TARGET_REGISTRY}|g" $TARGET_IMAGES_FILE_NAME
      elif [[ "$source_image" == *"redis:"* ]]
      then
        SOURCE_REGISTRY="public.ecr.aws/docker/library"
        sed -i "s|${SOURCE_REGISTRY}|${TARGET_REGISTRY}|g" $TARGET_IMAGES_FILE_NAME
      else
        SOURCE_REGISTRY="quay.io/devtron"
        sed -i "s|${SOURCE_REGISTRY}|${TARGET_REGISTRY}|g" $TARGET_IMAGES_FILE_NAME
      fi
    done <$SOURCE_IMAGES_FILE_NAME
    echo "Target Images file finalized"

    while read -r -u 3 source_image && read -r -u 4 target_image ; do
      echo "Pushing $source_image $target_image"
      podman manifest create $source_image
      podman manifest add $source_image $source_image --all
      podman manifest push $source_image $target_image --all
    done 3<"$SOURCE_IMAGES_FILE_NAME" 4<"$TARGET_IMAGES_FILE_NAME"
    ```

---

## Devtron Installation 

Before starting, ensure you have created an image pull secret for your registry if authentication is required.

1. Create the namespace (if not already created)
    ```bash
    kubectl create ns devtroncd
    ```

2. Create the Docker registry secret
    ```bash
    kubectl create secret docker-registry devtron-imagepull \
      --namespace devtroncd \
      --docker-server=$TARGET_REGISTRY \
      --docker-username=$TARGET_REGISTRY_USERNAME \
      --docker-password=$TARGET_REGISTRY_TOKEN
    ```
    If you are installing Devtron with the CI/CD module or using Argo CD, create the secret in the following namespaces else, you can skip this step-:
    ```bash
    kubectl create secret docker-registry devtron-imagepull \
      --namespace devtron-cd \
      --docker-server=$TARGET_REGISTRY \
      --docker-username=$TARGET_REGISTRY_USERNAME \
      --docker-password=$TARGET_REGISTRY_TOKEN
    kubectl create secret docker-registry devtron-imagepull \
      --namespace devtron-ci \
      --docker-server=$TARGET_REGISTRY \
      --docker-username=$TARGET_REGISTRY_USERNAME \
      --docker-password=$TARGET_REGISTRY_TOKEN
    kubectl create secret docker-registry devtron-imagepull \
      --namespace argo \
      --docker-server=$TARGET_REGISTRY \
      --docker-username=$TARGET_REGISTRY_USERNAME \
      --docker-password=$TARGET_REGISTRY_TOKEN
    ```

### Get the Latest Devtron Helm Chart

``` bash
helm pull devtron-operator --repo http://helm.devtron.ai
```
This would download the tar file of the devtron-operator chart, Make sure to replace the `<devtron-chart-file>` in the installation commands with this file name.

### Installation Commands

<Tabs>

<TabItem label="Without Integrations" value="Without Integrations">

Use the below command to install Devtron without any integrations:

1. Without `imagePullSecrets`:
    ```bash
    helm install devtron <devtron-chart-file> -n devtroncd --set global.containerRegistry="$TARGET_REGISTRY" --set-string components.devtron.customOverrides.IS_AIR_GAP_ENVIRONMENT=true
    ```

2. With `imagePullSecrets`:
    ```bash
    helm install devtron <devtron-chart-file> -n devtroncd --set global.containerRegistry="$TARGET_REGISTRY" --set global.imagePullSecrets[0].name=devtron-imagepull --set-string components.devtron.customOverrides.IS_AIR_GAP_ENVIRONMENT=true
    ```

</TabItem>

<TabItem label="With CI/CD" value="With CI/CD">

Use the below command to install Devtron with only the CI/CD module

1. Without `imagePullSecrets`:
    ```bash
    helm install devtron <devtron-chart-file> -n devtroncd --set installer.modules={cicd} --set global.containerRegistry="$TARGET_REGISTRY" --set-string components.devtron.customOverrides.IS_AIR_GAP_ENVIRONMENT=true
    ```

2. With `imagePullSecrets`:
    ```bash
    helm install devtron <devtron-chart-file> -n devtroncd --set installer.modules={cicd} --set global.containerRegistry="$TARGET_REGISTRY" --set global.imagePullSecrets[0].name=devtron-imagepull --set-string components.devtron.customOverrides.IS_AIR_GAP_ENVIRONMENT=true
    ```

</TabItem>

<TabItem label="With CI/CD and GitOps (Argo CD)" value="With CI/CD and GitOps (Argo CD)">

Use the below command to install Devtron with the CI/CD module and Argo CD

1. Without `imagePullSecrets`:
    ```bash
    helm install devtron <devtron-chart-file> --create-namespace -n devtroncd --set installer.modules={cicd} --set argo-cd.enabled=true --set global.containerRegistry="$TARGET_REGISTRY" --set argo-cd.global.image.repository="${TARGET_REGISTRY}/argocd" --set argo-cd.redis.image.repository="${TARGET_REGISTRY}/redis" --set-string components.devtron.customOverrides.IS_AIR_GAP_ENVIRONMENT=true
    ```

2. With `imagePullSecrets`:
    ```bash
    helm install devtron <devtron-chart-file> --create-namespace -n devtroncd --set installer.modules={cicd} --set argo-cd.enabled=true --set global.containerRegistry="$TARGET_REGISTRY" --set argo-cd.global.image.repository="${TARGET_REGISTRY}/argocd" --set argo-cd.redis.image.repository="${TARGET_REGISTRY}/redis" --set global.imagePullSecrets[0].name=devtron-imagepull --set-string components.devtron.customOverrides.IS_AIR_GAP_ENVIRONMENT=true
    ```

</TabItem>

</Tabs>

---

### Devtron Dashboard

Run the following command to get the Devtron dashboard URL:

```bash
kubectl get svc -n devtroncd devtron-service \
-o jsonpath='{.status.loadBalancer.ingress}'
```

You will get an output similar to the example shown below:

```bash
[map[hostname:aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com]]
```

Use the hostname `aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com` (Loadbalancer URL) to access the Devtron dashboard.

**Note**: If you do not get a hostname or receive a message that says "service doesn't exist," it means Devtron is still installing. 
Please wait until the installation is completed.

**Note**: You can also use a `CNAME` entry corresponding to your domain/subdomain to point to the Loadbalancer URL to access at a customized domain.

| Host | Type | Points to |
| :--- | :--- | :--- |
| devtron.yourdomain.com | CNAME | aaff16e9760594a92afa0140dbfd99f7-305259315.us-east-1.elb.amazonaws.com |

---

### Devtron Admin Credentials

When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use that credentials to log in as an administrator. 

**Username**: `admin` <br/>
**Password**: Run the following command to get the admin password:

```bash
kubectl -n devtroncd get secret devtron-secret \
-o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
```

:::info Next Recommended Action
When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use it to log in as an administrator.

After the initial login, we recommend you set up any [Single Sign-On (SSO)](../../user-guide/global-configurations/sso-login.md) service like Google, GitHub, etc., and then add other users (including yourself). Subsequently, all the users can use the same SSO (e.g., GitHub) to log in to the Dashboard.

:::

:::info 
If you have questions, please let us know on our discord channel. <span className="inline-badge">[![Join us on Discord](https://img.shields.io/badge/Join%20us%20on-Discord-e01563.svg)](https://discord.gg/jsRG5qx2gp)</span>

:::