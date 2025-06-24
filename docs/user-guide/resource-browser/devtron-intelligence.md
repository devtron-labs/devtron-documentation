# Using Devtron Intelligence

## What is Devtron Intelligence (AI Agent) [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Devtron Intelligence is an AI assistant that helps you troubleshoot issues faster by analyzing your Kubernetes workloads. It offers smart and easy-to-understand suggestions using large language models (LLM) of your choice.

Check out the [Results](#results) section to see where Devtron gives you AI-powered explanation for troubleshooting.

![Figure 1: Devtron Intelligence for AI-assisted Debugging](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/devtron-ai-assist-v3.gif)

### Tutorial

{% embed url="https://www.youtube.com/watch?v=WW7skAa0XAs" caption="Enabling Devtron Intelligence (AI)" %}

---

## Steps to Configure Devtron Intelligence

{% hint style="warning" %}
### Who Can Perform This Action?
User must have permissions to:
  * Deploy Helm Apps (with environment access)
  * Edit the ConfigMaps of 'default-cluster'
  * Restart the pods
{% endhint %}

### 1. Get API Key from LLM

Devtron Intelligence supports all major large language models (LLM) e.g., OpenAI, Gemini, AWS Bedrock, Anthropic and many more.

You can generate an API key for an LLM of your choice. Here, we will generate an API key from [OpenAI](https://platform.openai.com/account/api-keys).


### 2. Encode your API Key

Go to [strings.is](https://string.is/base64-encoder) and encode your API key in base64. This base64 encoded key will be used while creating a secret in the next step.


### 3. Create Secret in Devtron

1. Go to Devtron's **Resource Browser** → (Select Cluster) → **Create Resource**

2. Paste the following YAML and replace the key with your base64-encoded OpenAI key. Also, enter the namespace where the [AI Agent chart](#id-4.-deploy-ai-agent-chart) will be installed:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ai-secret
  namespace: <your-env-namespace>  # Namespace where the AI Agent chart will be installed
type: Opaque
data: 
  ## OpenAiKey: <base64-encoded-openai-key>           # For OpenAI
  ## GoogleKey: <base64-encoded-google-key>           # For Gemini
  ## azureOpenAiKey: <base64-encoded-azure-key>       # For Azure OpenAI
  ## awsAccessKeyId: <base64-encoded-aws-access-key>  # For AWS Bedrock
  ## awsSecretAccessKey: <base64-encoded-aws-secret>  # For AWS Bedrock
  ## AnthropicKey: <base64-encoded-anthropic-key>     # For Anthropic
```


### 4. Deploy AI Agent Chart

{% hint style="warning" %}
### Where should I install the Chart?
Deploy the chart in the cluster whose workloads you wish to troubleshoot. You may install the chart in multiple clusters (1 agent for 1 cluster). 
{% endhint %}

1. Go to Devtron's Chart Store.

2. Search the `ai-agent` chart and click on it.

3. Click the **Configure & Deploy** button.

4. In the left-hand pane:

    * **App Name**: Give your app a name, e.g. `ai-agent-app`

    * **Project**: Select your project

    * **Deploy to environment**: Choose the target environment (should be associated with the same namespace used while creating secret key in [Step 3](#id-3.-create-secret-in-devtron))

    * **Chart Version**: Select the latest chart version.

    * **Chart Values**: Choose the default one for the latest version.

5. In the `values.yaml` file editor, add the appropriate `additionalEnvVars` block based on your LLM provider. Use the tabs below to find the configuration snippet of some well-known LLM providers.

{% tabs %}

{% tab title="OpenAI" %}
```yaml
additionalEnvVars:
  - name: MODEL
    value: gpt-4o-mini       ## Examples: gpt-4o, gpt-4, gpt-3.5-turbo
  - name: OPENAI_API_KEY
    valueFrom: 
      secretKeyRef:
        key: OpenAiKey       ## Key of the secret created in Step 3
        name: ai-secret      ## Name of the secret created in Step 3
  - name: CLUSTER_NAME
    value: document-nonprod  ## Name of the target cluster (optional)
```
{% endtab %}

{% tab title="Google" %}
```yaml
additionalEnvVars:
  - name: MODEL
    value: gemini-1.5-pro    ## Examples: gemini-2.0-flash, gemini-2.0-flash-lite
  - name: GOOGLE_API_KEY
    valueFrom: 
      secretKeyRef:
        key: GoogleKey       ## Key of the secret created in Step 3
        name: ai-secret      ## Name of the secret created in Step 3
  - name: CLUSTER_NAME
    value: document-nonprod  ## Name of the target cluster (optional)
```
{% endtab %}

{% tab title="Azure OpenAI" %}
```yaml
additionalEnvVars:
  - name: MODEL
    value: azure/<DEPLOYMENT_NAME>   ## Replace with your Azure deployment name (keep "azure/" prefix)
  - name: MODEL_TYPE
    value: gpt-4o                ## Supported: gpt-4o, gpt-35-turbo, etc.
  - name: AZURE_API_VERSION
    value: <API_VERSION>    ## Replace with the version from Azure portal
  - name: AZURE_API_BASE
    value: <AZURE_ENDPOINT>  ## Your Azure endpoint e.g. https://my-org.openai.azure.com/
  - name: AZURE_API_KEY
    valueFrom:
      secretKeyRef:
        key: azureOpenAiKey      ## Key of the secret created in Step 3
        name: ai-secret          ## Name of the secret created in Step 3
  - name: CLUSTER_NAME
    value: document-nonprod  ## Name of the target cluster (optional)
```
{% endtab %}

{% tab title="AWS Bedrock" %}
```yaml
additionalEnvVars:
  - name: MODEL
    value: bedrock/anthropic.claude-3-5-sonnet-20240620-v1:0  ## Replace with your actual Bedrock model name
  - name: AWS_REGION_NAME
    value: us-east-1
  - name: AWS_ACCESS_KEY_ID
    valueFrom:
      secretKeyRef:
        key: awsAccessKeyId      ## Key of the Access Key ID created in Step 3
        name: ai-secret          ## Name of the secret created in Step 3
  - name: AWS_SECRET_ACCESS_KEY
    valueFrom:
      secretKeyRef:
        key: awsSecretAccessKey  ## Key of the secret created in Step 3
        name: ai-secret          ## Name of the secret created in Step 3
  - name: CLUSTER_NAME
    value: document-nonprod  ## Name of the target cluster (optional)
```
{% endtab %}

{% tab title="Anthropic" %}
```yaml
additionalEnvVars:
  - name: MODEL
    value: claude-3-sonnet   ## Examples: claude-3-sonnet, claude-3-haiku
  - name: ANTHROPIC_API_KEY
    valueFrom: 
      secretKeyRef:
        key: AnthropicKey    ## Key of the secret created in Step 3
        name: ai-secret      ## Name of the secret created in Step 3
  - name: CLUSTER_NAME
    value: document-nonprod  ## Name of the target cluster (optional)
```
{% endtab %}

{% endtabs %}

![Figure 2: Chart Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/chart-config-v4.jpg)

6. Click the **Deploy Chart** button.

### 5. Check Service Endpoint

1. In the **App Details** page of the deployed chart, expand **Networking** and click on **Service**.

2. Locate the service entry with the URL in the format: `<service-name>.<namespace>:<port>`. Note the values of `serviceName`, `namespace`, and `port` for the next step.

![Figure 3: Service Endpoint of AI Agent Helm App](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/service-endpoint-v3.jpg)


### 6. Update ConfigMaps

1. In a new tab, go to **Resource Browser** → (Select Cluster) → **Config & Storage** → **ConfigMap**

2. Edit the ConfigMaps:

    * **devtron-cm**

      Ensure the below entry is present in the ConfigMap (create one if it doesn't exist). Here you can define the target cluster and the endpoint where your Devtron AI service is deployed:

      ```yaml
      CLUSTER_CHAT_CONFIG: '{"<targetClusterID>": {"serviceName": "", "namespace": "", "port": ""}}'
      ```

      ![Figure 4: Entry in 'orchestrator-cm' or 'devtron-cm' ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/devtron-cm-v3.jpg)

    * **dashboard-cm**
    
      To enable AI integration via feature flag, check if the below entry is present in the ConfigMap (create one if it doesn't exist).
        
      ```yaml
      FEATURE_AI_INTEGRATION_ENABLE: "true"
      ```

      ![Figure 5: Entry in 'dashboard-cm' ConfigMap](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/dashboard-cm-v3.jpg)


### 7. Restart Pods

1. Go to **Resource Browser** → (Select Cluster) → **Workloads** → **Deployment**

2. Click the checkbox next to the following **Deployment** workloads and restart them using the **`⟳`** button:
    * `devtron`
    * `dashboard`

    ![Figure 6: Restart 'devtron' and 'dashboard' deployment workloads](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/restart-deployments.jpg)


### 8. Perform Hard Refresh

Perform a hard refresh of the browser to clear the cache: 
* **Mac**: Hold down `Cmd` and `Shift` and then press `R`
* **Windows/Linux**: Hold down `Ctrl` and then press `F5`

---

## Results

Devtron supports **Explain** option at the following screens (only for specific scenarios where troubleshooting is possible through AI):

### Pod Errors

**Path**: Resource Browser → (Select Cluster) → Workloads → Pod

![Figure 7a: AI Explain for Pod Issues](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/explain-with-ai.jpg) 

![Figure 7b: AI-assisted Troubleshooting](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/ai-explanation.jpg)

### Pod Last Restart Snapshot

**Path**: Resource Browser → (Select Cluster) → Workloads → Pod → Pod Last Restart Snapshot

![Figure 8: AI Explain for Pod Restart Snapshot](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/pod-restart-explain.jpg)

### Event Errors

**Path**: Resource Browser → (Select Cluster) → Events

![Figure 9: AI Explain for Event Errors](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/events-explain.jpg)

### App Details - Application Status

**Path**: Application → App Details → Application Status Drawer

![Figure 10a: AI Explain at Application Status](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/appstatus-drawer-explain1.jpg)

![Figure 10b: AI Explain at Application Status Drawer](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/appstatus-drawer-explain2.jpg)

### App Details - K8s Resources

**Path**: Application → App Details → K8s Resources (tab) → Workloads

![Figure 11: AI Explain at K8s Resources (tab)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/app-workload-explain.jpg)











