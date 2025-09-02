# Configure GUI Schema for Editing Manifest

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

In Devtron, you can create [CRDs](../../reference/glossary.md#crd) for defining the GUI schema. Your GUI schema will be used to determine the fields displayed to the user when they [edit the manifest in GUI mode](../resource-browser/manage-resources.md#edit-using-gui).

{% hint style="warning" %}

### Who Can Perform This Action?

Only a [Super-Admin](../global-configurations/authorization/user-access.md#grant-super-admin-permission) can configure GUI Schema. 

{% endhint %}

---

## Editing GUI Schema

1. Go to **Resource Browser** and select your cluster.

2. Use the searchbox labelled 'Jump to Kind' and search for `Guischema`.

    ![Figure 1: Searching GUI Schema](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/search-gui-schema.gif)

3. Click the GUI schema you wish to edit. In case no GUI schema exists, you may [create a GUI schema](#create-your-own-gui-schema) for your resource kind.

    ![Figure 2: Click GUI Schema](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/click-schema.gif)

4. Click **Edit Live Manifest** to modify the YAML.

    ![Figure 3: Edit Live Manifest](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/edit-live-manifest.gif)

5. Locate the `schema` object and customize it according to your requirements.

    ![Figure 4: Modifying Schema](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/locate-schema.gif)

6. Click **Apply Changes**.

---

## Create your own GUI Schema

1. Go to **Resource Browser** and select your cluster.

2. Click **Create Resource** at the top.

3. Use the following template and define your schema in the `schema` object, also specify the resource kinds in `applyTo`. Once done, click **Apply**.

{% code title="GUI Schema for Pod Manifest" overflow="wrap" lineNumbers="true" %}

```yml
apiVersion: crd.devtron.ai/alpha1
kind: GuiSchema
metadata:
creationTimestamp: 2024-11-08T13:01:00Z
generation: 1
name: devtron-pod-gui
resourceVersion: "216257"
uid: 70e91158-288e-4c4a-8448-012e820148ca
spec:
applyTo:
    - group: ""
    kind: Pod
    version: v1
schema: |
    {
    "title": "Pod Configuration",
    "description": "A form to create a Kubernetes pod manifest",
    "type": "object",
    "required": [
        "metadata",
        "spec"
    ],
    "properties": {
        "metadata": {
        "type": "object",
        "properties": {
            "name": {
            "type": "string",
            "title": "Pod Name",
            "default": "my-pod",
            "pattern": "^[a-z0-9][a-z0-9-]*[a-z0-9]$",
            "description": "Lower case letters, numbers, and hyphens only"
            }
        }
        },
        "spec": {
        "type": "object",
        "required": [
            "containers"
        ],
        "properties": {
            "containers": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "object",
                "required": [
                "name",
                "image"
                ],
                "properties": {
                "name": {
                    "type": "string",
                    "title": "Container Name",
                    "default": "container-1",
                    "pattern": "^[a-z0-9][a-z0-9-]*[a-z0-9]$",
                    "description": "Lower case letters, numbers, and hyphens only"
                },
                "image": {
                    "type": "string",
                    "title": "Container Image",
                    "description": "Docker image name with optional tag (e.g., nginx:1.14.2)"
                },
                "ports": {
                    "type": "array",
                    "title": "Container Ports",
                    "items": {
                    "type": "object",
                    "required": [
                        "containerPort"
                    ],
                    "properties": {
                        "containerPort": {
                        "type": "integer",
                        "title": "Port Number",
                        "minimum": 1,
                        "maximum": 65535
                        }
                    }
                    }
                }
                }
            }
            }
        }
        }
    }
    }
```

{% endcode %}