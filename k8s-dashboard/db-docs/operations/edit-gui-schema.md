# Configure GUI Schema for Editing Manifest

In Devtron, you can create [CRDs](../resources/glossary.md#crd) for defining the GUI schema. Your GUI schema will be used to determine the fields to be displayed to the user while [editing the manifest in GUI mode](../resource-browser/manage-resources.md#edit-using-gui).

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

    {% code title="GUI Schema for Deployment Manifest" overflow="wrap" lineNumbers="true" %}
    ```yml
    apiVersion: crd.devtron.ai/alpha1
    kind: GuiSchema
    metadata:
    name: devtron-deployment-gui
    spec:
    applyTo:
        - group: apps
        kind: Deployment
        version: v1
    schema: |
        {
        "title": "Deployment Configuration",
        "description": "A form to create a Kubernetes deployment manifest",
        "type": "object",
        "required": ["metadata", "spec"],
        "properties": {
            "metadata": {
            "type": "object",
            "required": ["name"],
            "properties": {
                "name": {
                "type": "string",
                "title": "Deployment Name",
                "default": "my-app",
                "pattern": "^[a-z0-9][a-z0-9-]*[a-z0-9]$",
                "description": "Lower case letters, numbers, and hyphens only"
                },
                "namespace": {
                "type": "string",
                "title": "Namespace",
                "default": "default",
                "pattern": "^[a-z0-9][a-z0-9-]*[a-z0-9]$",
                "description": "Kubernetes namespace for this deployment"
                },
                "labels": {
                "type": "object",
                "title": "Labels",
                "additionalProperties": {
                    "type": "string"
                },
                "default": {
                    "app": "my-app"
                }
                }
            }
            },
            "spec": {
            "type": "object",
            "required": ["replicas", "selector", "template"],
            "properties": {
                "replicas": {
                "type": "integer",
                "title": "Number of Replicas",
                "default": 1,
                "minimum": 0,
                "maximum": 100
                },
                "selector": {
                "type": "object",
                "required": ["matchLabels"],
                "properties": {
                    "matchLabels": {
                    "type": "object",
                    "title": "Selector Labels",
                    "additionalProperties": {
                        "type": "string"
                    },
                    "default": {
                        "app": "my-app"
                    }
                    }
                }
                },
                "template": {
                "type": "object",
                "required": ["metadata", "spec"],
                "properties": {
                    "metadata": {
                    "type": "object",
                    "required": ["labels"],
                    "properties": {
                        "labels": {
                        "type": "object",
                        "title": "Pod Labels",
                        "additionalProperties": {
                            "type": "string"
                        },
                        "default": {
                            "app": "my-app"
                        }
                        }
                    }
                    },
                    "spec": {
                    "type": "object",
                    "required": ["containers"],
                    "properties": {
                        "containers": {
                        "type": "array",
                        "minItems": 1,
                        "maxItems": 1,
                        "items": {
                            "type": "object",
                            "required": ["name", "image"],
                            "properties": {
                            "name": {
                                "type": "string",
                                "title": "Container Name",
                                "default": "app",
                                "pattern": "^[a-z0-9][a-z0-9-]*[a-z0-9]$"
                            },
                            "image": {
                                "type": "string",
                                "title": "Container Image",
                                "default": "nginx:latest",
                                "description": "Docker image name and tag (e.g., nginx:1.19)"
                            },
                            "ports": {
                                "type": "array",
                                "title": "Container Ports",
                                "items": {
                                "type": "object",
                                "required": ["containerPort"],
                                "properties": {
                                    "containerPort": {
                                    "type": "integer",
                                    "title": "Port",
                                    "default": 80,
                                    "minimum": 1,
                                    "maximum": 65535
                                    }
                                }
                                }
                            },
                            "env": {
                                "type": "array",
                                "title": "Environment Variables",
                                "items": {
                                "type": "object",
                                "required": ["name", "value"],
                                "properties": {
                                    "name": {
                                    "type": "string",
                                    "title": "Name"
                                    },
                                    "value": {
                                    "type": "string",
                                    "title": "Value"
                                    }
                                }
                                }
                            },
                            "resources": {
                                "type": "object",
                                "title": "Resource Limits",
                                "properties": {
                                "limits": {
                                    "type": "object",
                                    "properties": {
                                    "cpu": {
                                        "type": "string",
                                        "title": "CPU Limit",
                                        "default": "500m",
                                        "pattern": "^[0-9]+(m|\\.[0-9]+)?$",
                                        "description": "CPU units (e.g., 100m, 0.1, 1)"
                                    },
                                    "memory": {
                                        "type": "string",
                                        "title": "Memory Limit",
                                        "default": "512Mi",
                                        "pattern": "^[0-9]+(Ki|Mi|Gi|Ti|Pi|Ei|[KMGTPE]i?)?$",
                                        "description": "Memory units (e.g., 128Mi, 1Gi)"
                                    }
                                    }
                                },
                                "requests": {
                                    "type": "object",
                                    "properties": {
                                    "cpu": {
                                        "type": "string",
                                        "title": "CPU Request",
                                        "default": "200m",
                                        "pattern": "^[0-9]+(m|\\.[0-9]+)?$",
                                        "description": "CPU units (e.g., 100m, 0.1, 1)"
                                    },
                                    "memory": {
                                        "type": "string",
                                        "title": "Memory Request",
                                        "default": "256Mi",
                                        "pattern": "^[0-9]+(Ki|Mi|Gi|Ti|Pi|Ei|[KMGTPE]i?)?$",
                                        "description": "Memory units (e.g., 128Mi, 1Gi)"
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
                }
            }
            }
        }
        }

    ```
    {% endcode %}