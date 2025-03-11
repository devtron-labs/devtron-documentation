# Application Metrics

Application Metrics are the indicators used to evaluate the performance and efficiency of your application. It can be enabled in the Devtron platform to see your application's metrics.

## Types of Metrics available in the Devtron platform:

1. **CPU usage:** Overall CPU utilization per pod and aggregated.
2. **Memory Usage:** Overall memory utilization per pod and aggregated.
3. **Throughput:** Number of requests processed per minute.
4. **Latency:** Delay between request and response, measured in percentiles.

## Setup Application Metrics

1. **Install Grafana Dashboard:** 

    To use the Grafana dashboard, you need to first install the integration from the Devtron Stack Manager. 

    [Read Grafana Dashboard](https://docs.devtron.ai/devtron/v0.7/usage/integrations/grafana)

2. **Install Prometheus:**
   
    Go to the Chart Store and search for `prometheus`. Use the Prometheus community's `kube-prometheus-stack` chart to deploy Prometheus.

    ![Fig 1: Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app2.jpg)

    After selecting the chart, configure these values as needed before deployment.

    ```
    kube-state-metrics: 
	  metricLabelsAllowlist:   
	  - pods=[*]
    ```

    Search for the above parameters, and update them as shown (or customize as needed).

    ![Fig 2: Prometheus Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app3.jpg)

3. **Enable `upgradeJob` paramter to install CRDs:**

   Since Helm does not automatically apply CRDs, you need to enable the `upgradeJob` parameter in the Helm chart to ensure CRDs are applied before deploying Prometheus.

    - In the Prometheus Helm chart settings, locate the `upgradeJob` parameter and set it to `true` if it is `false`.
      
      	![Fig 3: upgradeJob Parameter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new2.jpg)
      
     	After enabling the parameter, click `Deploy Chart`.

4. **Setup Prometheus Endpoint:**
   
    Once Prometheus is installed, navigate to `Networking → Service` in the K8s resources. Expand the Prometheus server service to see the endpoints. 

    Copy the URL of the `kube-prometheus` service as shown in the image below.

    ![Fig 4: Prometheus Service](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app4.jpg)

    To set Prometheus as a data source in Grafana, navigate to `Global Configurations → Clusters & Environments`, select your cluster, and edit its settings.

    ![Fig 5: Clusters and Environments](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app5.jpg)

    Now to set up the Prometheus endpoint:
    - Enable the See metrics for applications in this cluster option, as shown in the image below.
    - Paste the copied URL into the Prometheus endpoint field, ensuring it includes `http://`
    - Click Update Cluster to save the changes.

    	![Fig 6: Prometheus Endpoint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app6.jpg)

    After adding the endpoint, application metrics will be visible in the Devtron dashboard for all the Devtron apps in the cluster. This includes CPU usage and Memory usage.

    ![Fig 7: CPU Usage & Memory Usage](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app7.jpg)

5. **Enable Application Metrics:**

    To enable Throughput and Latency metrics in Devtron, follow these steps:
      - Open your Devtron app.
      - Go to `Configurations → Base Configurations → Deployment Template`.
      - Enable `Application Metrics` in the Deployment Template as shown below and save the changes.

   {% hint style="warning" %}
**Note:** Enable metrics option is only available for [Devtron charts](https://docs.devtron.ai/usage/deploy-chart) and not for [Custom Deployment Charts](https://docs.devtron.ai/devtron/v0.6/global-configurations/custom-charts).
{% endhint %}


      ![Fig 8: Enable Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app8.jpg)

      Now, you can track all your application metrics by navigating to `Devtron Apps → Your App → App Details`, where you can view the Application Metrics as shown below.

      ![Fig 9: Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new3.jpg)
