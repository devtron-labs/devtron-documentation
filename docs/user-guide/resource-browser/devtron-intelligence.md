# Using Devtron Intelligence

## What is Devtron Intelligence (AI Agent) [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Devtron Intelligence is an AI assistant that helps you troubleshoot issues faster by analyzing your Kubernetes workloads. It offers smart and easy-to-understand suggestions using large language models (LLM) of your choice.

![Figure 1: Devtron Intelligence for AI-assisted Debugging](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/devtron-ai-assist-v3.gif)

### Tutorial

{% embed url="https://www.youtube.com/watch?v=oNP-YP-9XhM" caption="Enabling Devtron Intelligence (AI)" %}

---

## Steps to Configure Devtron Intelligence

{% hint style="warning" %}
### Who Can Perform This Action?
Only superadmins can configure Devtron Intelligence.
{% endhint %}

### 1. Generate an API Key for your LLM

* Since Devtron Intelligence supports all major large language models (LLM), e.g. [OpenAI](https://platform.openai.com/account/api-keys), generate an API key for an LLM of your choice.

* Go to [strings.devtron.ai](https://strings.devtron.ai/) and encode your API key in base64.


### 2. Create a Secret in Devtron

* Go to Devtron's **Resource Browser** → (Select Cluster) → **Create Resource**

* Paste the following YAML and replace the key with your base64-encoded OpenAI key. Also, enter the namespace where [AI Agent chart](#id-3.-install-and-configure-the-ai-agent-chart) will be installed:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ai-secret
  namespace: <your-env-namespace>
data:
  AiKey: <your_base64_encoded_key>
```

![Figure 2: Creating K8s Secret for LLM API Key](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/create-secret-v3.jpg)

### 3. Install and Configure the AI Agent Chart

{% hint style="warning" %}
### Where should I install the Chart?
Install the chart in the cluster whose workloads you wish to troubleshoot.
{% endhint %}

* Go to Devtron's Chart Store.

* With `devtron` as the chart source, search the `ai-agent` chart and click on it.

* Click the **Configure & Deploy** button.

* In the left-hand pane:

  * **App Name**: Give a name to your app, e.g. `ai-agent-app`

  * **Project**: Select your project

  * **Deploy to environment**: Choose the target environment (should be associated with the same namespace used while creating secret key in [Step 2](#id-2.-create-a-secret-in-devtron))

  * **Chart Version**: Select `0.0.1` because Devtron has optimized for it

  * **Chart Values**: Choose `Default 0.0.1`

* Configure the `values.yaml` and add the `additionalEnvVars` block given below, using the editor.

```yaml
additionalEnvVars:
  - name: MODEL
    value: gpt-4o-mini ## Specify LLM Model
  - name: LLM_API_KEY
    valueFrom: 
      secretKeyRef:
        key: AiKey ## Key of the secret created in Step 2
        name: ai-secret ## Name of the secret created in Step 2
  - name: CLUSTER_NAME
    value: document-nonprod ## Name of the target cluster (optional)
```

![Figure 3: Chart Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/chart-config-v3.jpg)

* Click the **Deploy Chart** button.

* In **App Details** page of the deployed chart, expand **Networking** and click on **Service**.

* Locate the service entry with the URL in the format: `<service-name>.<namespace>:<port>`. Note the values of `serviceName`, `namespace`, and `port` for the next step.

![Figure 4: Service Endpoint of AI Agent Helm App](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/service-endpoint-v3.jpg)


### 4. Update ConfigMaps

* In a new tab, go to **Resource Browser** → (Select Cluster) → **Config & Storage** → **ConfigMap**

* Edit the ConfigMaps:

  * **Orchestrator/Devtron ConfigMap** - This config is for indicating in which target cluster the Devtron AI service exists and what is its endpoint. The cluster ID (numeric) is generally visible in the URL after you select a cluster in Resource Browser. If Devtron is managing your setup, edit `orchestrator-cm`, whereas, if you installed Devtron via Helm, edit `devtron-cm` and add the following entry:

  ```yaml
  CLUSTER_CHAT_CONFIG: '{"<enter-targetClusterID>": {"serviceName": "", "namespace": "", "port": ""}}'
  ```

  * **Dashboard ConfigMap** - To enable AI integration via feature flag, edit `dashboard-cm` and add the following entry:

  ```yaml
  FEATURE_AI_INTEGRATION_ENABLE: "true"
  ```

![Figure 5a: Entry in 'orchestrator-cm' or 'devtron-cm' ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/devtron-cm-v3.jpg) 


![Figure 5b: Entry in 'dashboard-cm' ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/dashboard-cm-v3.jpg)


### 5. Restart Required Pods

* Go to **Resource Browser** → (Select Cluster) → **Workloads** → **Pod**

* Restart the following pods:
  * `orchestrator` or `devtron` pod
  * `dashboard` pod

![Figure 6: Restart 'devtron' and 'dashboard' workloads](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/bounce-pod.jpg)

### 6. Final Step

Perform a **hard refresh** of the browser (using `Cmd+Shift+R` / `Ctrl+F5`) to clear the cache. 'Explain with AI' option will be visible to you wherever troubleshooting is possible through AI.

![Figure 7a: 'Explain with AI' option](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/explain-with-ai.jpg) 


![Figure 7b: AI-assisted Troubleshooting](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/ai-explanation.jpg)







