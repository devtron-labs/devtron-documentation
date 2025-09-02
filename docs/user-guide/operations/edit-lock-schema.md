# Configure Lock Schema

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

In Devtron, you can create [CRDs](../../reference/glossary.md#crd) for defining lock schema. Your lock schema will be used to determine the fields (in the resource manifest) that cannot be added/updated/deleted by non-superadmins. This is especially useful for preventing unwanted edits to the manifests of pod, deployment, configmap, and many more.

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/authorization/user-access.md#grant-super-admin-permission) can configure Lock Schema. 

{% endhint %}

---

## Editing Lock Schema

1. Go to **Resource Browser** and select your cluster.

2. Use the searchbox labelled 'Jump to Kind' and search for `LockSchema`.

    ![Figure 1: Searching Lock Schema](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/search-lock-schema.gif)

3. Click the Lock Schema you wish to edit. In case no Lock Schema exists, you may [create a Lock Schema](#create-your-own-lock-schema) for your resource kind.

    ![Figure 2: Click Lock Schema](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/click-lock-schema.gif)

4. Click **Edit Live Manifest** to modify the YAML.

    ![Figure 3: Edit Live Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/edit-live-manifest-lock.gif)

5. Locate the `lockedPaths` list and specify the fields/paths you wish to lock from unwanted edits by non-superadmins in the manifest.

    ![Figure 4: Modifying Schema](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/locate-lockedpaths.jpg)

6. Click **Apply Changes**.

---

## Create your own Lock Schema

1. Go to **Resource Browser** and select your cluster.

2. Click **Create Resource** at the top.

3. Use the following template and specify the fields/paths you wish to lock in the `lockedPaths` list, also specify the resource kinds in `applyTo`. Once done, click **Apply**.

{% code title="Lock Schema for ConfigMap" overflow="wrap" lineNumbers="true" %}

```yml
apiVersion: crd.devtron.ai/alpha1
kind: LockSchema
name: devtron-cm-lock-schema
spec:
applyTo:
    - group: ""
    kind: ConfigMap
    version: v1
lockedPaths:
    - data.ENABLE_CI_JOB
```

{% endcode %}