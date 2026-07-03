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

Devtron Intelligence is powered by the **Athena** backend, which runs as independent microservices — `athena-mcp-engine`, `athena-api-server`, and `athena-worker-engine` — plus a **Redis** cache, deployed on the cluster where the Devtron orchestrator runs.

### 1. Get API Key from LLM

Devtron Intelligence supports all major large language models (LLM), e.g., OpenAI, Gemini, AWS Bedrock, Anthropic, and many more. Generate an API key (or credential) for the LLM of your choice.

### 2. Create Secret in Devtron

Create a Kubernetes Secret holding your LLM provider credential in the namespace where you will deploy the Athena services. The `athena-api-server` references this Secret for its LLM credentials.

There are 2 methods to create a secret in Devtron, follow the one you prefer:
* [Method A: Using 'Create Resource'](#method-a-using-create-resource)
* [Method B: Using kubectl command](#method-b-using-kubectl-command)

#### Method A: Using 'Create Resource'

1. Go to [strings.devtron.ai](https://strings.devtron.ai/base64-encoder) and encode your credential in base64.

2. Go to **Infrastructure Management** → **Resource Browser** → (Select Cluster) → **Create Resource**

3. Paste the following YAML, replace the value with your base64-encoded credential, and set the namespace where the Athena services will be deployed:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ai-secret
  namespace: <your-namespace>  # Namespace where the Athena services will be deployed
type: Opaque
data:
  ## Provide the credential key(s) for your LLM provider, for example:
  ## AWS_BEARER_TOKEN_BEDROCK: <base64-encoded-token>   # For AWS Bedrock
  ## OPENAI_API_KEY: <base64-encoded-openai-key>        # For OpenAI
  ## GOOGLE_API_KEY: <base64-encoded-google-key>        # For Gemini
  ## ANTHROPIC_API_KEY: <base64-encoded-anthropic-key>  # For Anthropic
```

#### Method B: Using kubectl command

:::tip
Unlike [Method A](#method-a-using-create-resource), this method doesn't require you to base64-encode your credential.
:::

1. Go to Devtron's [Resource Browser](./resource-browser/README.md) and click the terminal icon next to the target cluster.

2. Create the secret (use the key name matching your LLM provider):

```bash
kubectl create secret generic ai-secret \
  --namespace=<your-namespace> \
  --from-literal=AWS_BEARER_TOKEN_BEDROCK='your-token-here'
#  --from-literal=OPENAI_API_KEY='openai-key-here'
```

  ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/kubernetes-resource-browser/devtron-intelligence/secret-using-kubectl.jpg)
  <center>Figure 2: Creating Secret using Cluster Terminal</center>

### 3. Deploy the Athena Microservices

Deploy the Athena backend as **independent applications** on the cluster where the Devtron orchestrator runs:

* **athena-mcp-engine** — exposes Devtron operations to the agent at `/devtron/mcp`.
* **athena-api-server** — the main chat/agent service (also runs the AI Debug capability via Holmes, in-process).
* **athena-worker-engine** — background worker for runbooks/remediation.
* **Redis** — shared cache used by the chat agent. Deploy it as a StatefulSet reachable at the `REDIS_URL` below. Without Redis, the agent falls back to an in-process cache (single replica only), so Redis is required when running more than one replica.

Configure each service with the environment variables below. Provide sensitive values (LLM credentials, auth tokens) through the **Secret** from Step 2, not inline, and replace every `<placeholder>` with a value for your environment.

**athena-mcp-engine**

| Variable | Example | Description |
|:---|:---|:---|
| `DEVTRON_API_ENDPOINT` | `https://<devtron-url>` | Your Devtron server URL |
| `DOC_RAG_SEARCH_SERVER_URL` | `<doc-search-url>` | Documentation-search (RAG) endpoint |
| `PG_ADDR` / `PG_PORT` / `PG_USER` / `PG_DATABASE` | `<pg-host>` / `5432` / `<user>` / `<db>` | Postgres connection |
| `REQUIRED_RECOMMENDATION_DATA_COUNT` | `10` | Minimum data points required for recommendations |
| `SERVICE_PLATFORM` | `k8s` | Platform identifier |

**athena-api-server**

| Variable | Example | Description |
|:---|:---|:---|
| `DEVTRON_MCP_API_ENDPOINT` | `http://<mcp-engine-service>.<namespace>/devtron/mcp` | Endpoint of `athena-mcp-engine`, suffixed with `/devtron/mcp` |
| `REDIS_URL` | `redis://<redis-service>.<namespace>:6379` | Redis shared-cache connection URL |
| `LLM_MODEL_ID` | `<provider-or-bedrock-model-id>` | Chat LLM model, e.g. `bedrock/<...>`, `gpt-4o`, `gemini/<...>`, `claude-<...>` |
| `LLM_TEMPERATURE` | `0.01` | LLM temperature |
| `HOLMES_ENABLED` | `true` | Enables the AI Debug (Holmes) capability |
| `HOLMES_MODEL` | `<holmes-llm-model>` | LLM model Holmes uses for debugging |
| LLM credential | `<from Secret>` | Provider credential referenced from the Step 2 Secret (e.g., `AWS_BEARER_TOKEN_BEDROCK`, `OPENAI_API_KEY`) |
| `DEVTRON_WORKER_ENGINE_SERVICE_AUTH_TOKEN` | `<from Secret>` | Shared auth token between the API server and worker engine |
| `PG_ADDR` / `PG_PORT` / `PG_USER` / `PG_DATABASE` | `<pg-host>` / `5432` / `<user>` / `<db>` | Postgres connection |

Optional chat-agent tuning (defaults shown; set only to override):

| Variable | Default | Description |
|:---|:---|:---|
| `CHAT_AGENT_MAX_LLM_TURNS` | `7` | Max LLM reasoning turns per request |
| `CHAT_AGENT_MAX_TOOL_TOKENS` | `50000` | Total token budget across tool responses per request |
| `CHAT_AGENT_MAX_TOOL_CALLS` | `30` | Max tool calls allowed per LLM turn |

**athena-worker-engine**

| Variable | Example / Default | Description |
|:---|:---|:---|
| `DEVTRON_WORKER_ENGINE_SERVICE_AUTH_TOKEN` | `<from Secret>` | Shared auth token — must match the value set on `athena-api-server` |
| `DEVTRON_MCP_API_ENDPOINT` | `http://<mcp-engine-service>.<namespace>/devtron/mcp` | Same `athena-mcp-engine` endpoint as the API server |
| `LLM_MODEL_ID` | `<provider-or-bedrock-model-id>` | LLM model for the worker |
| `LLM_TEMPERATURE` | `0.1` | LLM temperature |
| `PG_ADDR` / `PG_PORT` / `PG_USER` / `PG_PASSWORD` / `PG_DATABASE` | `<pg-host>` / `5432` / `<user>` / `<from Secret>` / `<db>` | Postgres connection |
| `MAX_CONCURRENT_RECOMMENDATION_TASKS` | `4` | (optional) Max concurrent recommendation tasks |
| `MAX_REACT_AGENT_ITERATIONS` | `20` | (optional) Max ReAct agent iterations per task |
| `SUPPORTED_UPDATE_WORKLOAD_KINDS` | `Deployment,StatefulSet,DaemonSet,ReplicaSet` | (optional) Workload kinds the worker may patch during remediation |

After deploying, note the ClusterIP **service endpoints** (format `<service-name>.<namespace>:<port>`) of `athena-api-server` and `athena-mcp-engine` — you will need them for `DEVTRON_MCP_API_ENDPOINT` above and `PROXY_SERVICE_CONFIG` in Step 4.

### 4. Update ConfigMaps

In the cluster where the Devtron orchestrator is running, go to **Infrastructure Management** → **Resource Browser** → (Select Cluster) → **Config & Storage** → **ConfigMap**, and edit:

* **orchestrator-cm** — enable the chatbot and register the Athena service proxy:

  ```yaml
  FEATURE_ASK_DEVTRON_EXPERT: "true"
  PROXY_SERVICE_CONFIG: '{"athena":{"host":"<athena-api-server-service>","port":"80"}}'
  ```

  | Key | Description |
  |:---|:---|
  | `FEATURE_ASK_DEVTRON_EXPERT` | Enables the **Ask Devtron Expert** chatbot (default `false`). |
  | `PROXY_SERVICE_CONFIG` | Routes requests from the orchestrator to the Athena API server. Replace `<athena-api-server-service>` with the `athena-api-server` service endpoint from Step 3. |

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
