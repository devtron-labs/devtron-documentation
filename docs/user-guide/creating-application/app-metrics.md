# Application Metrics

## Introduction

Application Metrics are the indicators used to evaluate the performance and efficiency of your application. It can be enabled in the Devtron platform to see your application's metrics.

![Figure 1: Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-metrics.jpg)

---

## Types of Metrics

| Metrics          | Description                                                 |
| :----------------| :---------------------------------------------------------- |
| **CPU usage**    | Overall CPU utilization per pod and aggregated              |
| **Memory Usage** | Overall memory utilization per pod and aggregated           |
| **Throughput**   | Number of requests processed per minute                     |
| **Latency**      | Delay between request and response, measured in percentiles |

---

## Set Up Application Metrics

:::caution Note 
Application metrics can only be enabled if your application is deployed using Devtron Deployment Charts and not [Custom Deployment Charts](../global-configurations/deployment-charts.md).
:::

### Step 1: Install Monitoring (Grafana) Integration

#### For OSS and Self-Managed Enterprise

:::caution Who Can Perform This Action?
Only super admin users can install Devtron integrations.
:::

To use the Grafana dashboard, you need to first install the integration from the [Devtron Stack Manager](../integrations/README.md). Refer [Monitoring (Grafana) Integration](../integrations/grafana.md) to learn more.

#### For Devtron-Managed Enterprise

If you want to enable Grafana Integration, email us at [enterprise@devtron.ai](mailto:enterprise@devtron.ai) or reach out to your Devtron representative.


### Step 2: Install Prometheus

:::caution Who Can Perform This Action?
Users need to have [Admin role](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above to deploy a chart.
:::

:::caution Note 
Ensure [GitOps](../global-configurations/gitops.md) is configured before deploying Prometheus. If not, Prometheus will default to being deployed via Helm.
:::
   
1. Go to the **Chart Store** and search for `prometheus`. Use the Prometheus community's `kube-prometheus-stack` chart to deploy Prometheus.

    ![Figure 2: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app2.jpg)

2. After selecting the chart, configure these values as needed before deployment.

    ```yaml
    kube-state-metrics: 
        metricLabelsAllowlist:   
        - pods=[*]
    ```

    <br/>

    ```yaml
    serviceMonitorSelectorNilUsesHelmValues: false
    podMonitorSelectorNilUsesHelmValues: false
    ```

    <br/>

    Search for the above parameters, and update them as shown (or customize as needed).

    ![Figure 3a: Prometheus Chart Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app3.jpg)

    ![Figure 3b: Prometheus Chart Configuration (cont.)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-metrics-config.jpg)

3. Enable `upgradeJob` parameter to install CRDs:

    Since Helm does not automatically apply CRDs, you need to enable the `upgradeJob` parameter in the Helm chart to ensure CRDs are applied before deploying Prometheus.
   
    In the Prometheus Helm chart settings, locate the `upgradeJob` parameter and set it to `true` if it is `false`.
      
    ![Figure 4: upgradeJob Parameter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new2.jpg)
      
4. After enabling the parameter, click **Deploy Chart**.

:::caution Common Pitfall: Prometheus Deployment Timeout due to Failed CRDs
While deploying `kube-prometheus-stack` chart, the deployment status may show as **Timed out**, and some CustomResourceDefinitions (CRDs) may appear as **Failed**.

To solve it, refer [Troubleshoot Issues](#troubleshoot-issues)

:::

### Step 3: Set Up Prometheus Endpoint

:::caution Who Can Perform This Action?
Only super admin users can set up Prometheus endpoint in a cluster.
:::
   
1. Once Prometheus is installed, go to its **App Details** and navigate to **Networking** → **Service** in the K8s resources. Expand the Prometheus server service to see the endpoints. 

2. Copy the URL of the `kube-prometheus` service as shown in the image below.

    ![Figure 5: Prometheus Service](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app4.jpg)

3. To set Prometheus as a data source in Grafana, navigate to **Global Configurations** → **Clusters & Environments**, select your cluster, and edit its settings.

    ![Figure 6: Clusters and Environments](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app5.jpg)

4. Now to set up the Prometheus endpoint:
    1. Enable the `See metrics for applications in this cluster` option, as shown in the image below.
    2. Paste the copied URL into the Prometheus endpoint field, ensuring it includes `http://`
    3. Click **Update Cluster** to save the changes.

    ![Figure 7: Prometheus Endpoint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app6.jpg)


### Step 4: Enable Application Metrics

:::caution Who Can Perform This Action?
Users need to have [Admin role](../global-configurations/authorization/user-access.md#devtron-apps-permissions) or above to enable application metrics.
:::

After adding the endpoint in your preferred cluster, **CPU usage** and **Memory usage** metrics will be visible in the **App Details** page for all the Devtron apps in that cluster (it may take a few minutes).

![Figure 8: CPU Usage & Memory Usage](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app7.jpg)

To enable **Throughput** and **Latency** metrics in Devtron, follow these steps:

:::caution Note
**Throughput** and **Latency** metrics will only display data if there is active traffic (i.e., incoming requests) to your application. If there is no traffic, these metrics will show `No data`.
:::
    
1. Open your Devtron app.

2. Go to its **Configurations** (tab) → **Base Configurations** → **Deployment Template**.

3. Enable **Application Metrics** in the Deployment Template as shown below and save the changes.

    ![Figure 9: Enable Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app8.jpg)

4. Now, you can track all your application metrics by navigating to **Applications** and going to the **App Details** page of your Devtron App as shown below. 

    ![Figure 10: Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new3.jpg)

:::caution Note 
If your environment is [Overridden](../creating-application/environment-overrides.md), you need to enable the Application Metrics at the environment override deployment template instead of the base deployment template.
:::

---

## Troubleshoot Issues

<details>
<summary><strong>Facing Prometheus Deployment Timeout due to Failed CRDs</strong></summary>

While deploying `kube-prometheus-stack` chart, the deployment status may show as **Timed out**, and some CustomResourceDefinitions (CRDs) may appear as **Failed**.

![Figure 11a: Deployment Timed Out](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-metrics-deployment-timed-out-v2.jpg)

![Figure 11b: CRDs Failed](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-metrics-crds-failed.jpg)

**This behavior is expected and do not require any action from you.**

This occurs because certain Prometheus CRDs are large in size, which can lead to temporary sync issues during deployment, but, this does not impact the functionality of the Prometheus components.

ArgoCD handles such cases automatically and the `kube-prometheus-stack` will continue to function as expected.
</details>

<details>
<summary><strong>Not able to see deployment metrics on production environment or Not able to enable application-metrics</strong></summary>

Update the rollout CRDs to the latest version, run the following command:

```bash
kubectl apply -f https://raw.githubusercontent.com/devtron-labs/devtron/main/manifests/yamls/rollout.yaml -n devtroncd
```

</details>

<details>
<summary><strong> Grafana dashboards not visible in App Details page even after adding prometheus endpoint or Graphs showing error panel with id 2 not found</strong></summary>

If the graphs are not visible check if Prometheus is configured properly. Then go to **Global Configurations** → **Clusters & Environments** → Click on any environment for the cluster where you added Prometheus endpoint and simply click `Update`.  
If the charts are still not visible, try visiting the URL: `<devtron-url>/grafana?orgId=2`  
If you see `Not Found` on this page, then follow all the given steps or if the page is accessible, and you are getting `panel with id 2 not found` then follow from step 6:  
1. Get Grafana password using `kubectl -n devtroncd get secret devtron-secret -o jsonpath='{.data.GRAFANA_PASSWORD}' | base64 -d`

2. `kubectl run --rm -it --image quay.io/devtron/k8s-utils:tutum-curl curl` Run this command, and it will create a pod for using `curl`

3. Copy the following and change `grafana-password` with your password of Grafana and change the value of `prometheusUrl` with your Prometheus endpoint, and run in the pod that we created above in step 2.

    ``` bash
    cat << EOF
    grafanaUrl="http://admin:grafana-password@devtron-grafana.devtroncd/grafana"
    prometheusUrl="http://prometheus.example.com"

    ORG_ID=$( curl -d '{"name":"devtron-metrics-view"}' -H "Content-Type: application/json" -X POST "${grafanaUrl}/api/orgs" )

    echo $ORG_ID

    curl -X POST "${grafanaUrl}/api/user/using/2";

    curl -X PUT -H "Content-Type: application/json" -d '{"homeDashboardId":0,"theme":"light","timezone":"browser"}' "${grafanaUrl}/api/org/preferences";

    curl "${grafanaUrl}/api/datasources" -H 'content-type: application/json' -H 'x-grafana-org-id: 2' --data '{"name":"Prometheus-devtron-demo","type":"prometheus","access":"proxy","isDefault":true}'

    curl "${grafanaUrl}/api/datasources/2" -X PUT \
        -H 'content-type: application/json' \
        -H 'x-grafana-org-id: 2' \
        --data '{"id": 2 ,
        "orgId": 2,
        "name":"Prometheus-devtron-demo","type":"prometheus","access":"proxy",
        "url":${prometheusUrl},
        "basicAuth":false,"jsonData":{},"version":1}'
    EOF
    ```

4. Now visit `<devtron-url>/grafana?orgId=2` again, and you'll see Grafana login page. Login using username `admin` and password from step 1 and check if Prometheus URL is updated in data sources. If not, update it in the default data source.

5. Now from Devtron UI, update any of the environment again and its data source will be created automatically.

6. In Grafana UI you need to be logged in and Go to Dashboards → Manage then click `Import` and Import the given dashboards one by one.

    ```
    https://grafana.com/api/dashboards/13322/revisions/4/download
    https://grafana.com/api/dashboards/13320/revisions/4/download
    https://grafana.com/api/dashboards/13325/revisions/4/download
    https://grafana.com/api/dashboards/13321/revisions/6/download
    ```
After that, your issue should be resolved, and you should be able to see all the graphs on UI.

</details>


<details>
<summary><strong>If CPU metrics are not showing but memory metrics are visible in graphs.</strong></summary>

Do the following:-

1. Go to Grafana and Login with the credentials.
2. Edit the CPU graphs and remove `image!=””` from the query.
3. Save the dashboard.

CPU metrics should start showing up in a while.

</details>


<details>
<summary><strong>When app metrics is not coming on grafana and devtron dashboard, set the value of the following parameter as false in kube prometheus stack values.</strong></summary>


```
serviceMonitorSelectorNilUsesHelmValues: false
```

</details>