# Application Metrics

Application Metrics are the indicators used to evaluate the performance and efficiency of your application. It can be enabled in the Devtron platform to see your application's metrics.

## Types of Metrics available in the Devtron platform:

1. **CPU usage:** Overall CPU utilization per pod and aggregated.
2. **Memory Usage:** Overall memory utilization per pod and aggregated.
3. **Throughput:** Number of requests processed per minute.
4. **Latency:** Delay between request and response, measured in percentiles.

## Setup Application Metrics

{% hint style="warning" %}
### Note 
These steps will not take effect if your application is deployed using [Custom Deployment Charts](../global-configurations/deployment-charts.md) as those configurations override the default Deployment Template settings.
{% endhint %}

1. **Install Grafana Dashboard:** 

    To use the Grafana dashboard, you need to first install the integration from the [Devtron Stack Manager](../integrations/README.md). 

    [Read Grafana Dashboard](../integrations/grafana.md)

2. **Install Prometheus:**
   
    Go to the Chart Store and search for `prometheus`. Use the Prometheus community's `kube-prometheus-stack` chart to deploy Prometheus.

    ![Figure 1: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app2.jpg)

    After selecting the chart, configure these values as needed before deployment.

    ```
    kube-state-metrics: 
	  metricLabelsAllowlist:   
	  - pods=[*]
    ```

    Search for the above parameters, and update them as shown (or customize as needed).

    ![Figure 2: Prometheus Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app3.jpg)

3. **Enable `upgradeJob` paramter to install CRDs:**

   Since Helm does not automatically apply CRDs, you need to enable the `upgradeJob` parameter in the Helm chart to ensure CRDs are applied before deploying Prometheus.

    - In the Prometheus Helm chart settings, locate the `upgradeJob` parameter and set it to `true` if it is `false`.
      
      	![Figure 3: upgradeJob Parameter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new2.jpg)
      
     	After enabling the parameter, click `Deploy Chart`.

4. **Setup Prometheus Endpoint:**
   
    Once Prometheus is installed, go to its **App Details** and navigate to **Networking → Service** in the K8s resources. Expand the Prometheus server service to see the endpoints. 

    Copy the URL of the `kube-prometheus` service as shown in the image below.

    ![Figure 4: Prometheus Service](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app4.jpg)

    To set Prometheus as a data source in Grafana, navigate to **Global Configurations → Clusters & Environments**, select your cluster, and edit its settings.

    ![Figure 5: Clusters and Environments](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app5.jpg)

    Now to set up the Prometheus endpoint:
    - Enable the `See metrics for applications in this cluster` option, as shown in the image below.
    - Paste the copied URL into the Prometheus endpoint field, ensuring it includes `http://`
    - Click Update Cluster to save the changes.

    	![Figure 6: Prometheus Endpoint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app6.jpg)

    After adding the endpoint, application metrics will be visible in the Devtron dashboard for all the Devtron apps in the cluster (it may take a few minutes). This includes CPU usage and Memory usage.

	![Figure 7: CPU Usage & Memory Usage](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app7.jpg)

5. **Enable Application Metrics:**

    To enable Throughput and Latency metrics in Devtron, follow these steps:
      - Open your Devtron app.
      - Go to **Configurations → Base Configurations → Deployment Template**.
      - Enable **Application Metrics** in the Deployment Template as shown below and save the changes.

	![Figure 8: Enable Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app8.jpg)

	Now, you can track all your application metrics by navigating to Applications and going to the App Details page of your Devtron App as shown below. 

	![Figure 9: Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new3.jpg)

{% hint style="warning" %}
### Note 
You won’t be able to enable the Application Metrics if your environment is [Overridden](../creating-application/environment-overrides.md), as it overrides the Deployment Template settings.
{% endhint %}
