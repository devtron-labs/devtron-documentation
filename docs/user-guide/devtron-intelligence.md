import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Devtron Intelligence

## What is Devtron Intelligence (AI Agent) <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Devtron Intelligence is an AI assistant that helps you troubleshoot issues faster by analyzing your Kubernetes workloads. It offers smart and easy-to-understand suggestions using large language models (LLM) of your choice.

Check out the [Results](#results) section to see where Devtron gives you AI-powered explanation for troubleshooting.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/devtron-ai-assist-v3.gif)
<center>Figure 1: Devtron Intelligence for AI-assisted Debugging</center>

### Tutorial

<div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/WW7skAa0XAs" title="Enabling Devtron Intelligence (AI)" frameborder="0" allow="fullscreen"></iframe></div>

## Capabilities

Devtron Intelligence is an AI agent that can reason over your Devtron-managed Kubernetes estate and assist you across several areas:

* **Explain with AI** — Analyze pod errors, restart snapshots, events, and application status, and get easy-to-understand explanations and remediation steps.

* **AI Debug (autonomous root-cause)** — Investigate Kubernetes issues autonomously (powered by Holmes) and return a detailed root-cause analysis.

* **Ask Devtron Expert (chatbot)** — Ask free-form questions about your applications and Kubernetes issues in a chat side panel.

* **Cost insights** — Answer questions about cost breakdown and cost summary for your applications and clusters.

* **Application and resource Q&A** — Query applications, environments, projects, jobs, Helm apps, manifests, and resource utilization in natural language.

* **Documentation search** — Answer product questions grounded in Devtron's documentation.

---

## Steps to Configure Devtron Intelligence

:::caution Who Can Perform This Action?
User must have permissions to:
  * Deploy applications (with environment access)
  * Edit the ConfigMaps of the cluster where Devtron is running
  * Restart the pods
:::

Devtron Intelligence is powered by the **Athena** backend, which is deployed by the Devtron enterprise Helm chart on the cluster where the orchestrator runs. When enabled, it brings up three services — **`athena-api`** (the agent/chat service, which also runs the AI Debug capability via Holmes), **`athena-mcp`** (the MCP engine that exposes Devtron operations to the agent), and a background **worker engine** (recommendations and remediation) — backed by a bundled **Redis** cache and a dedicated **`athena`** database in Devtron's PostgreSQL. You enable and configure it through the chart's `devtronEnterprise.athenaApi` values, as described below.

### 1. Get API Key from LLM

Devtron Intelligence supports all major large language models (LLM), e.g., OpenAI, Gemini, AWS Bedrock, Anthropic, and many more. Generate an API key (or credential) for the LLM of your choice.

### 2. Provide the LLM Credential

Athena reads your LLM provider credential from the chart's `athenaApi.secrets`. Add it there using the key name your provider expects — the chart renders these into a Kubernetes Secret that `athena-api` consumes:

```yaml
devtronEnterprise:
  athenaApi:
    secrets:
      # Use the key that matches your LLM provider (one of):
      OPENAI_API_KEY: "<your-openai-key>"           # OpenAI
      # AWS_BEARER_TOKEN_BEDROCK: "<your-token>"    # AWS Bedrock
      # GEMINI_API_KEY: "<your-gemini-key>"         # Gemini
      # ANTHROPIC_API_KEY: "<your-anthropic-key>"   # Anthropic
```

:::caution
Do not commit real credentials to a values file in Git. Supply them at install/upgrade time (for example, a separate secrets values file or your installer's secret store).
:::

:::note
Athena uses **LiteLLM**, so the credential key name is LiteLLM's standard variable for your provider, selected by the `LLM_MODEL_ID` prefix you set in Step 3 — for example `OPENAI_API_KEY` (OpenAI), `ANTHROPIC_API_KEY` (Anthropic), `GEMINI_API_KEY` (Gemini), or AWS credentials for `bedrock/...` models (`AWS_BEARER_TOKEN_BEDROCK`, or `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` + `AWS_REGION_NAME`).
:::

### 3. Enable and Configure Athena

Enable Athena and set your model in the chart's `devtronEnterprise.athenaApi` values (or pass `--set devtron.devtronEnterprise.athenaApi.enabled=true` at install/upgrade time):

```yaml
devtronEnterprise:
  athenaApi:
    enabled: true
    configs:
      LLM_MODEL_ID: "<your-model-id>"       # e.g. gpt-4o, claude-<...>, gemini/<...>, bedrock/<...>
      LLM_TEMPERATURE: "0.01"               # default
      REDIS_URL: redis://redis.devtroncd    # bundled Redis (default — leave as-is)
      PG_DATABASE: athena                   # dedicated Athena database (default — leave as-is)
    secrets:
      # your LLM credential from Step 2
```

| Key | Description |
|:---|:---|
| `athenaApi.enabled` | Set to `true` to deploy the Athena backend (`athena-api` + `athena-mcp`). Default `false`. |
| `athenaApi.configs.LLM_MODEL_ID` | The chat/agent model. The format depends on the provider — e.g. `gpt-4o`, `claude-<...>`, `gemini/<...>`, `bedrock/<...>`. |
| `athenaApi.configs.LLM_TEMPERATURE` | LLM temperature. Default `0.01`. |
| `athenaApi.configs.REDIS_URL` | Connection to the bundled Redis cache. The chart defaults this to `redis://redis.devtroncd`; leave it unchanged unless you point Athena at an external Redis. |
| `athenaApi.configs.PG_DATABASE` | The database Athena uses within Devtron's PostgreSQL. Defaults to `athena` and is created automatically. |

Applying these values deploys the `athena-api` and `athena-mcp` services and the Redis cache, and provisions the `athena` database. Wait until their pods are **Running** before continuing.

:::note
How you apply these values depends on how your Devtron is installed. If Devtron manages your cluster for you, ask your Devtron/DevOps contact to enable `athenaApi` with your model and credential instead.
:::

### 4. Update ConfigMaps

In the cluster where the Devtron orchestrator is running, go to **Infrastructure Management** → **Resource Browser** → (Select Cluster) → **Config & Storage** → **ConfigMap**, and edit:

* **orchestrator-cm** — enable the chatbot and register the Athena service proxy:

  ```yaml
  FEATURE_ASK_DEVTRON_EXPERT: "true"
  PROXY_SERVICE_CONFIG: '{"athena":{"host":"<athena-api-service>","port":"80"}}'
  ```

  | Key | Description |
  |:---|:---|
  | `FEATURE_ASK_DEVTRON_EXPERT` | Enables the **Ask Devtron Expert** chatbot (default `false`). |
  | `PROXY_SERVICE_CONFIG` | Routes requests from the orchestrator to the Athena API server. Set `host` to the **`athena-api` Kubernetes Service name** created by the chart in Step 3 — confirm the exact name with `kubectl get svc -n <namespace> \| grep athena`. |

* **dashboard-cm** — enable AI integration and (optionally) AI Debug Mode:

  ```yaml
  FEATURE_AI_INTEGRATION_ENABLE: "true"
  FEATURE_ATHENA_DEBUG_MODE_ENABLE: "true"
  ```

  | Key | Description |
  |:---|:---|
  | `FEATURE_AI_INTEGRATION_ENABLE` | Master switch that enables the **Explain with AI** buttons across the UI. |
  | `FEATURE_ATHENA_DEBUG_MODE_ENABLE` | When `true`, using **Explain with AI** opens the Holmes debugger as a new chat in the **Ask Devtron** side panel. When `false` (default), the AI response appears in a draggable widget. |

### 5. Restart Pods and Perform Hard Refresh

1. Go to **Infrastructure Management** → **Resource Browser** → (Select Cluster) → **Workloads** → **Deployment**, and restart the following deployments using the **`⟳`** button:
    * `devtron`
    * `dashboard`

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/restart-deployments.jpg)
    <center>Figure 3: Restart 'devtron' and 'dashboard' deployment workloads</center>

2. Perform a hard refresh of the browser to clear the cache:
    * **Mac**: Hold down `Cmd` and `Shift` and then press `R`
    * **Windows/Linux**: Hold down `Ctrl` and then press `F5`

---

## Results

Devtron supports **Explain** option at the following screens (only for specific scenarios where troubleshooting is possible through AI):

### Pod Errors

**Path**: Infrastructure Management → Resource Browser → (Select Cluster) → Workloads → Pod

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/explain-with-ai.jpg)
<center>Figure 4a: AI Explain for Pod Issues</center> 

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/ai-explanation.jpg)
<center>Figure 4b: AI-assisted Troubleshooting</center>

### Pod Last Restart Snapshot

**Path**: Infrastructure Management → Resource Browser → (Select Cluster) → Workloads → Pod → Pod Last Restart Snapshot

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/pod-restart-explain.jpg)
<center>Figure 5: AI Explain for Pod Restart Snapshot</center>

### Event Errors

**Path**: Infrastructure Management → Resource Browser → (Select Cluster) → Events

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/events-explain.jpg)
<center>Figure 6: AI Explain for Event Errors</center>

### App Details - Application Status

**Path**: Application Management → Applications → (Select Application) → App Details → Application Status Drawer

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/appstatus-drawer-explain1.jpg)
<center>Figure 7a: AI Explain at Application Status</center>

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/appstatus-drawer-explain2.jpg)
<center>Figure 7b: AI Explain at Application Status Drawer</center>

### App Details - K8s Resources

**Path**: Application Management → Applications → (Select Application) → App Details → K8s Resources (tab) → Workloads

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/app-workload-explain.jpg)
<center>Figure 8: AI Explain at K8s Resources (tab)</center>
