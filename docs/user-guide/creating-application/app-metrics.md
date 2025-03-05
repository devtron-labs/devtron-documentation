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

2. **Install Required CRDs:** 

    Before installing Prometheus from the chart store, manually apply the necessary CRDs in your cluster.

    Navigate to the `Resource Browser → Select your cluster → Click View Terminal` to open the cluster terminal.

    ![app1](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app1.jpg)

    Now, apply these manifests with server-side validation:

    ```
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0alertmanagerConfigCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0alertmanagerCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0podmonitorCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0probeCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0prometheusCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0prometheusagentCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0prometheusruleCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0prometheusruleCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0scrapeconfigCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0servicemonitorCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/0thanosrulerCustomResourceDefinition.yaml
    kubectl apply --server-side -f https://raw.githubusercontent.com/prometheus-operator/kube-prometheus/main/manifests/setup/namespace.yaml

    ```

3. **Install Prometheus:**
    Go to the Chart Store and search for `prometheus`. Use the Prometheus community's `kube-prometheus-stack` chart to deploy Prometheus.

    ![app2](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app2.jpg)

    After selecting the chart, configure these values as needed before deployment.

    ```
    kube-state-metrics: 
	  metricLabelsAllowlist:   
	  - pods=[*]
    ```

    Search for the above parameters, update them as shown (or customize as needed), and then click `Deploy Chart`.

    ![app3](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app3.jpg)

4. **Setup Prometheus Endpoint:**
    After installing Prometheus, find its endpoint under `Networking → Service` in the K8s resources. Expand the Prometheus server service to see the endpoints. 

    Copy the URL of the `kube-prometheus` service as shown in the image below.

    ![app4](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app4.jpg)

    To set Prometheus as a data source in Grafana, navigate to `Global Configurations → Clusters & Environments`, select your cluster, and edit its settings.

    ![app5](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app5.jpg)

    Now to set up the Prometheus endpoint:
    - Enable the See metrics for applications in this cluster option, as shown in the image below.
    - Paste the copied URL into the Prometheus endpoint field, ensuring it includes `http://`
    - Click Update Cluster to save the changes.

    ![app6](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app6.jpg)

    After adding the endpoint, application metrics will be visible in the Devtron dashboard for all the Devtron apps in the cluster. This includes CPU usage and Memory usage.

    ![app7](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app7.jpg)

5. **Enable Application Metrics:**

    To enable Throughput and Latency metrics in Devtron, follow these steps:
      - Open your Devtron app.
      - Go to `Configurations → Base Configurations → Deployment Template`.
      - Enable `Application Metrics` in the Deployment Template as shown below and save the changes.

      ![app8](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app8.jpg)

      Now, you can track all your application metrics by navigating to `Devtron Apps → Your App → App Details`, where you can view the Application Metrics as shown below.

      ![app9](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app9.jpg)
