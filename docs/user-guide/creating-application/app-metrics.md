# Application Metrics

Application Metrics are the indicators used to evaluate the performance and efficiency of your application. It can be enabled in the Devtron platform to see your application's metrics.

## Types of Metrics available in the Devtron platform:

| Metrics           | Description                                                 |
| :---------------- | :---------------------------------------------------------- |
| **CPU usage:**    | Overall CPU utilization per pod and aggregated              |
| **Memory Usage:** | Overall memory utilization per pod and aggregated           |
| **Throughput:**   | Number of requests processed per minute                     |
| **Latency:**      | Delay between request and response, measured in percentiles |

## Setup Application Metrics

{% hint style="warning" %}
### Note 
Application metrics can only be enabled if your application is deployed using Devtron Deployment Charts and not [Custom Deployment Charts](../global-configurations/deployment-charts.md).
{% endhint %}

### Step-1: Install Monitoring (Grafana) Integration

#### For OSS and Self Managed Enterprise

 To use the Grafana dashboard, you need to first install the integration from the [Devtron Stack Manager](../integrations/README.md). Refer [Monitoring (Grafana) Integration](../integrations/grafana.md) to learn more.

#### For Devtron Managed Enterprise

 If you want to enable Grafana Integration, email us at enterprise@devtron.ai or reach out to your Devtron representative enable it.


### Step-2: Install Prometheus

{% hint style="info" %}
### Note 
Ensure GitOps is configured before deploying Prometheus. If not, Prometheus will default to being deployed via Helm.
{% endhint %}
   
1. Go to the Chart Store and search for `prometheus`. Use the Prometheus community's `kube-prometheus-stack` chart to deploy Prometheus.

 ![Figure 1: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app2.jpg)

2. After selecting the chart, configure these values as needed before deployment.

 ```bash
 kube-state-metrics: 
     metricLabelsAllowlist:   
     - pods=[*]
 ```

 ```bash
 serviceMonitorSelectorNilUsesHelmValues: false
 podMonitorSelectorNilUsesHelmValues: false
 ```

 Search for the above parameters, and update them as shown (or customize as needed).

 ![Figure 2: Prometheus Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app3.jpg)

3. Enable `upgradeJob` parameter to install CRDs:

   Since Helm does not automatically apply CRDs, you need to enable the `upgradeJob` parameter in the Helm chart to ensure CRDs are applied before deploying Prometheus.
   
   In the Prometheus Helm chart settings, locate the `upgradeJob` parameter and set it to `true` if it is `false`.
      
    ![Figure 3: upgradeJob Parameter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new2.jpg)
      
4. After enabling the parameter, click `Deploy Chart`.

#### Common Pitfall: Prometheus Deployment Timeout due to Failed CRDs

While deploying `kube-prometheus-stack` chart, the deployment status may show as **Timed out**, and some CustomResourceDefinitions (CRDs) may appear as **Failed**.

**This behavior is expected and do not require any action from you.**

This occurs because certain Prometheus CRDs are large in size, which can lead to temporary sync issues during deployment, but, this does not impact the functionality of the Prometheus components.

ArgoCD handle such cases automatically and the `kube-prometheus-stack` will continue to function as expected.

### Step-3: Setup Prometheus Endpoint
   
1. Once Prometheus is installed, go to its **App Details** and navigate to **Networking → Service** in the K8s resources. Expand the Prometheus server service to see the endpoints. 

2. Copy the URL of the `kube-prometheus` service as shown in the image below.

    ![Figure 4: Prometheus Service](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app4.jpg)

3. To set Prometheus as a data source in Grafana, navigate to **Global Configurations → Clusters & Environments**, select your cluster, and edit its settings.

    ![Figure 5: Clusters and Environments](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app5.jpg)

4. Now to set up the Prometheus endpoint:
    1. Enable the `See metrics for applications in this cluster` option, as shown in the image below.
    2. Paste the copied URL into the Prometheus endpoint field, ensuring it includes `http://`
    3. Click **Update Cluster** to save the changes.

    ![Figure 6: Prometheus Endpoint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app6.jpg)


### Step-4: Enable Application Metrics

After adding the endpoint in your preferred cluster, **CPU usage** and **Memory usage** application metrics will be visible in the **App Details** page for all the Devtron apps in that cluster (it may take a few minutes).

 ![Figure 7: CPU Usage & Memory Usage](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app7.jpg)

To enable **Throughput** and **Latency** application metrics in Devtron, follow these steps:
    
 1. Open your Devtron app.

 2. Go to **Configurations → Base Configurations → Deployment Template**.

 3. Enable **Application Metrics** in the Deployment Template as shown below and save the changes.

    ![Figure 8: Enable Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app8.jpg)

4. Now, you can track all your application metrics by navigating to **Applications** and going to the **App Details** page of your Devtron App as shown below. 

    ![Figure 9: Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new3.jpg)

{% hint style="warning" %}
### Note 
If your environment is [Overridden](../creating-application/environment-overrides.md), you need to enable the Application Metrics at the environment override deployment template instead of the base deployment template.
{% endhint %}
