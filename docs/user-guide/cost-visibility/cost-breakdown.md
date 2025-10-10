# Cost Breakdown

The Cost Breakdown page helps you analyze costs within a selected category (**Clusters**, **Applications**, **Environments**, or **Projects**), for a specific time range.

![Figure 1: Cost Breakdown Overview](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/cost-visibility/cost-visibility-cost-breakdown.jpg)

At the top of the **Cost Breakdown** page, you can apply filters in the top-right corner to adjust the view.

| Filter           | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Cluster Scope** | Choose whether to view costs across all clusters or environments, or limit the view to only production or non-production clusters or environments |
| **Currency**      | Displays all cost values in the currency of your choice.                    |
| **Time Range**    | Defines the time range for data displayed |

## Inspecting Different Categories

For the chosen category type, it shows the following:

| Field                       | Description                                                              |
|:--------------------------- |:----------------------------------------------------------------------------|
| **Total Cost**              | The actual spend for the selected category type (e.g., all clusters).       |
| **Recommended Cost**        | The estimated cost calculated from actual resource usage instead of allocated capacity|
| **Potential Savings**       | The percentage of your current spend that could be reduced|
| **Monthly Savings**         | The estimated savings for one month based on the difference between allocated and used resources |
| **Annual Savings**          | The projected savings over a year based on the same calculation|
| **Top 10 Costly Resources** | A ranked list of 10 highest cost resources of the selected category|

You will also find a complete list of all the resources for the selected category at the bottom.
Each row in the list shows the following for the specific resource of the selected category: 

| Field              | Available For Categories     | Description                                                            |
|:------------------------|:---------------------------------|:--------------------------------------------------------------------       |
| **Provider**           | Clusters                        | Shows the cloud provider or infrastructure source for each cluster         |
| **Type**               | Clusters, Environments          | Shows whether each cluster or environment is **Production** or **Non-Production** |
| **Applications Count** | Environments, Projects          | Shows the number of applications linked to each environment or project |
| **Environments**       | Applications                    | Shows the number of environments where each application is deployed |
| **Memory Cost**        | All categories                  | Shows the cost of memory usage for each resource in the selected category |
| **CPU Cost**           | All categories                  | Shows the cost of CPU usage for each resource in the selected category |
| **Storage (PV) Cost**  | All categories                  | Shows the cost of persistent volume (storage) usage for each resource in the selected category |
| **GPU Cost**           | All categories                  | Shows the cost of GPU usage for each resource in the selected category |
| **Network Cost**       | All categories                  | Shows the cost of network usage for each resource in the selected category |
| **Total Cost**         | All categories                  | Shows the total cost of each resource |
| **Potential Savings**  | All categories                  | Shows the cost and percentage of your current spend that could be saved for each resource |

{% embed url="https://app.supademo.com/demo/cmgaokrt93iuk2nomat2gyz7c" %}

### Inspecting Specific Resource

Clicking on any resource in the Cost Breakdown list opens its detailed cost breakdown view. Based on the category you will see the following

| Field           |Available For Categories | Description |
|:-----------------|:-------------|:----|
| **Total Cost**  | All categories | Shows the overall cost for the selected resource, along with a cost trend graph for the chosen time range |
| **CPU**    | All categories | Shows the total spend on CPU resources, along with the potential savings |
| **Memory** | All categories | Shows the total cost for memory resources, along with the potential savings |
| **Storage**| All categories | Shows the total cost for persistent volume (storage), along with potential savings |
| **GPU**    | All categories | Shows the total cost for GPU resources, along with potential savings |
|**Top 10 costly namespace**|Cluster| A ranked list of 10 highest cost namespaces within a specific cluster|
|**Top 10 costly application**|Environments & Projects|A ranked list of 10 highest cost application within a specific environment or project|
|**Top 10 costly deployment**|Applications|A ranked list of 10 highest cost deployments within a specific application|
|**Cost Breakdown by Namespace**|Clusters|Shows the distribution of costs across namespaces within the selected cluster. <ul><li>Each bar represents a namespace, segmented by CPU, Memory, GPU, Storage, and Network costs</li><li> Helps identify which namespaces are responsible for most cost inside a cluster</li></ul> |
|**Cost Breakdown by Application**|Clusters, Projects, & Environments|Shows the cost distribution across applications in the selected category <ul><li>Each bar represents an application, segmented by CPU, Memory, GPU, Storage, and Network costs </li></ul>|
|**Cost Breakdown by Resource kind**|All categories|Shows the costs broken down by Kubernetes resource types (e.g., Pod, Deployment, StatefulSet, Job, DaemonSet, Rollout, Container). <ul><li>Each bar represents a resource kind, segmented by CPU, Memory, GPU, Storage, and Network costs </li></ul>|
|**Cost Breakdown by Deployment**|Applications|Shows the distribution of costs across deployments within the selected application <ul><li>Each bar represents a deployment, segmented by CPU, Memory, GPU, Storage, and Network costs </li></ul>|

{% embed url="https://app.supademo.com/demo/cmgga3snk6u0a2nomqwfntj11" %}

### Custom Views

Custom Views allows you to define your own filtered view of cluster costs. Instead of looking at costs for the entire cluster, you can create a focused view based on propagated tags (for example, filter by team, environment, or application tag).

This feature is available only under the Clusters category.

**Note:** Custom Views are dependent on propagated tags (labels). If tags are not mentioned and propagated in the workloads, some resources may not appear in the view. Ensure that you have added and propagated tags for the workloads you want to include in the custom view.

#### Creating a Custom View

To create a custom view:

1.	Go to **Cost Visibility** → **Cost Breakdown** → **Cluster**.

2.	In the sidebar, click `+` icon next to **Custom Views**.

3.	Enter a **Name** and an optional **Description** for your view.

4.	Enter one or more label-based filters using **Key**, **Operator**, and **Value**.

5.	Click Apply Changes.

Once applied, a Custom View works just like any other category breakdown in Cost Visibility.

### Filters  

| **Field**    | **Description**                                                                 |
|--------------|---------------------------------------------------------------------------------|
| **Key**      | The label key applied to your Kubernetes resources (for example, `app`, `team`). |
| **Operator** | Defines the comparison logic between the key and value.                         |
| **Value**    | The label value to match against (for example, `logistics`, `prod`).            |

### Operators  

| **Operator** | **Meaning**              | **Example**                                |
|--------------|--------------------------|--------------------------------------------|
| `:`          | Equality                 | `app   :   frontend` → selects resources where `app=frontend`. |
| `!:`         | Inequality               | `team  !:  dev` → excludes resources with `team=dev`. |
| `~:`         | Contains                 | `name  ~:  api` → selects resources where label contains `api`. |
| `!~`         | Not Contains             | `app  !~:  test` → excludes resources where label contains `test`. |
| `<~`         | Contains Prefix          | `env  <~:  prod` → selects resources where label starts with `prod`. |
| `!<~`        | Not Contains Prefix      | `env  !<~: staging` → excludes resources where label starts with `staging`. |