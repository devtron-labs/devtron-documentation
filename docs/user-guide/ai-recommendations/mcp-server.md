import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MCP Server

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Devtron exposes an [MCP](https://modelcontextprotocol.io) (Model Context Protocol) server, `devtron-mcp-engine`, that lets you connect your own AI tools — Cursor, VS Code, Claude Desktop, or a custom agent — directly to your Devtron and Kubernetes resources. It's the same tool layer Devtron's own AI Chat assistant uses internally; connecting your own client gives you the same capabilities from whichever AI tool you already work in.


:::caution Who Can Perform This Action?
User must have permissions to:
  * Generate [API tokens](../global-configurations/authorization/api-tokens.md)
  * View/act on the clusters, apps, or environments the token will be scoped to
:::

---

## What you can do with it

| Area | Tools | Access |
|---|---|---|
| Clusters & infrastructure | `list_clusters`, `get_cluster_details`, `get_cluster_level_recommendation`, `get_cluster_capacity`, `list_namespaces`, `get_node_detail` | read |
| Organization, users & permissions | `list_devtron_projects`, `list_devtron_users`, `get_devtron_user_details`, `get_my_permissions`, `list_devtron_environments`, `get_environment_status`, `get_global_config`, `get_platform_integrations` | read |
| Apps, jobs & pipelines | `list_devtron_apps`, `list_devtron_jobs`, `get_app_meta_info`, `get_deployment_status`, `get_app_detail`, `get_app_resource_tree`, `get_app_pipelines`, `get_deployment_history`, `get_app_build_history`, `get_app_other_env_min`, `list_application_groups`, `get_deployment_blockers` | read |
| CI/CD & GitOps | `get_ci_materials`, `list_deployable_artifacts`, `get_job_pipelines`, `get_job_runs`, `get_pipeline_run_logs`, `get_pipeline_run_detail`, `get_builds_in_window`, `get_deployments_in_window`, `list_gitops_applications` | read |
| App & Helm configuration | `get_app_config`, `diff_app_config`, `diff_deployments_in_window`, `get_config_drift`, `get_helm_release_values`, `diff_helm_release_values`, `get_helm_app_details`, `get_helm_application_list`, `get_helm_app_history` | read |
| App & Helm configuration | `update_devtron_apps_config`, `update_helm_app_config_resource_spec` | **write** |
| Kubernetes | `get_k8s_manifest`, `list_all_k8s_resource`, `get_resource_utilization`, `get_resource_signals`, `get_resource_events`, `get_resource_diagnostics`, `get_resource_metrics`, `get_k8s_object_tree`, `read_kubernetes_api`, `assess_fixes` | read |
| Kubernetes | `put_k8s_manifest_tool` | **write** |
| Cost | `get_cost_summary`, `get_cost_breakdown` | read |
| Security | `get_security_scan` | read |
| Documentation | `search_devtron_documentation` | read |

58 tools only read; three write: `update_devtron_apps_config` and `update_helm_app_config_resource_spec` (resizing an app's or a Helm release's CPU/memory requests), and `put_k8s_manifest_tool` (applying an arbitrary patch to a live Kubernetes manifest). Every call, read or write, is still subject to your normal Devtron RBAC for the token you connect with — this list doesn't grant anything beyond what that token already permits.

---

## Connecting a client

The server speaks **Streamable HTTP only** — there's no stdio transport, so client configs need a `url` and `headers` entry rather than a `command` entry.

### 1. Generate a Devtron API token

Go to **Global Configurations** → [**API Tokens**](../global-configurations/authorization/api-tokens.md) and generate a token. Scope it to only what you want the client to be able to do — see [Security](#security) below.

Use the token as-is in the `authorization` header — no `Bearer ` prefix.

### 2. Get the server endpoint

The server is reachable at:

```
https://<your-devtron-host>/devtron/mcp
```

:::caution Network exposure
`devtron-mcp-engine` runs as a `ClusterIP` Service by default — reachable only from
inside your cluster, not from your laptop. To connect a client running outside the
cluster, you need a path in:

```bash
kubectl -n devtroncd port-forward svc/<devtron-mcp-engine-service> 8000:80
```

then point your client at `http://localhost:8000/devtron/mcp` instead of the host above.
For anything longer-lived than a local test, use a properly authenticated ingress route —
don't expose this endpoint publicly without an auth layer in front of it, since the
per-request Devtron token check happens inside the application, not at the network edge.
:::

### 3. Configure your client

<Tabs>

<TabItem label="Cursor" value="Cursor">

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "devtron": {
      "url": "https://<your-devtron-host>/devtron/mcp",
      "headers": {
        "authorization": "<your-devtron-api-token>"
      }
    }
  }
}
```

</TabItem>

<TabItem label="VS Code" value="VS Code">

`.vscode/mcp.json`:

```json
{
  "servers": {
    "devtron": {
      "type": "http",
      "url": "https://<your-devtron-host>/devtron/mcp",
      "headers": {
        "authorization": "<your-devtron-api-token>"
      }
    }
  }
}
```

:::note
Don't want the token sitting in this file as a literal value? VS Code's own `inputs` /
`${input:...}` secure-prompt pattern is **not supported by GitHub Copilot's MCP harness** —
use an environment variable instead:

```json
"authorization": "${env:DEVTRON_API_TOKEN}"
```

On macOS, a GUI-launched VS Code won't see a plain `export`'d variable. Either launch it
from the same terminal (`code .`), or run `launchctl setenv DEVTRON_API_TOKEN "<token>"`
once per login session so normal launches (Dock, Spotlight) pick it up too.
:::

</TabItem>

<TabItem label="Claude Desktop" value="Claude Desktop">

If your version doesn't yet support a `url`-based remote server entry directly, bridge it with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote):

```json
{
  "mcpServers": {
    "devtron": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://<your-devtron-host>/devtron/mcp",
        "--header",
        "authorization:<your-devtron-api-token>"
      ]
    }
  }
}
```

</TabItem>

</Tabs>

---

## Security

The server has no read-only mode of its own — all tools, including the three that can make changes, are reachable by any client that connects. The only thing gating what a connected client can actually do is the permission scope of the Devtron API token you give it. Generate a token scoped to read-only access for any client or workflow that shouldn't be able to make changes.

If a connected client should no longer have access, [delete its API token](../global-configurations/authorization/api-tokens.md#delete-api-token) — there's no separate session to revoke, since the token is the only thing authorizing the connection.
