# Application Metrics

Application Metrics are the indicators used to evaluate the performance and efficiency of your application. It can be enabled in the Devtron platform to see your application's metrics.

---

## Types of Metrics available in the Devtron platform:

| Metrics           | Description                                                 |
| :---------------- | :---------------------------------------------------------- |
| **CPU usage:**    | Overall CPU utilization per pod and aggregated              |
| **Memory Usage:** | Overall memory utilization per pod and aggregated           |
| **Throughput:**   | Number of requests processed per minute                     |
| **Latency:**      | Delay between request and response, measured in percentiles |

---

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

 ![Figure 2a: Prometheus Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app3.jpg)

 ![Figure 2b: Prometheus Chart](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-metrics-config.jpg)

3. Enable `upgradeJob` parameter to install CRDs:

   Since Helm does not automatically apply CRDs, you need to enable the `upgradeJob` parameter in the Helm chart to ensure CRDs are applied before deploying Prometheus.
   
   In the Prometheus Helm chart settings, locate the `upgradeJob` parameter and set it to `true` if it is `false`.
      
    ![Figure 3: upgradeJob Parameter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new2.jpg)
      
4. After enabling the parameter, click `Deploy Chart`.

#### Common Pitfall: Prometheus Deployment Timeout due to Failed CRDs

While deploying `kube-prometheus-stack` chart, the deployment status may show as **Timed out**, and some CustomResourceDefinitions (CRDs) may appear as **Failed**.

 ![Figure 4a: Deployment Timed Out](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-metrics-deployment-timed-out.jpg)

 ![Figure 4b: CRDs Failed](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-metrics-crds-failed.jpg)

**This behavior is expected and do not require any action from you.**

This occurs because certain Prometheus CRDs are large in size, which can lead to temporary sync issues during deployment, but, this does not impact the functionality of the Prometheus components.

ArgoCD handle such cases automatically and the `kube-prometheus-stack` will continue to function as expected.

### Step-3: Setup Prometheus Endpoint
   
1. Once Prometheus is installed, go to its **App Details** and navigate to **Networking → Service** in the K8s resources. Expand the Prometheus server service to see the endpoints. 

2. Copy the URL of the `kube-prometheus` service as shown in the image below.

    ![Figure 5: Prometheus Service](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app4.jpg)

3. To set Prometheus as a data source in Grafana, navigate to **Global Configurations → Clusters & Environments**, select your cluster, and edit its settings.

    ![Figure 6: Clusters and Environments](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app5.jpg)

4. Now to set up the Prometheus endpoint:
    1. Enable the `See metrics for applications in this cluster` option, as shown in the image below.
    2. Paste the copied URL into the Prometheus endpoint field, ensuring it includes `http://`
    3. Click **Update Cluster** to save the changes.

    ![Figure 7: Prometheus Endpoint](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app6.jpg)


### Step-4: Enable Application Metrics

After adding the endpoint in your preferred cluster, **CPU usage** and **Memory usage** application metrics will be visible in the **App Details** page for all the Devtron apps in that cluster (it may take a few minutes).

 ![Figure 8: CPU Usage & Memory Usage](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app7.jpg)

To enable **Throughput** and **Latency** application metrics in Devtron, follow these steps:

{% hint style=“warning” %}
### Note
**Throughput** and **Latency** application metrics will only display data if there is active traffic (i.e., incoming requests) to your application. If there is no traffic, these metrics will show `No data`.
{% endhint %}
    
1. Open your Devtron app.

2. Go to **Configurations → Base Configurations → Deployment Template**.

3. Enable **Application Metrics** in the Deployment Template as shown below and save the changes.

    ![Figure 9: Enable Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app8.jpg)

4. Now, you can track all your application metrics by navigating to **Applications** and going to the **App Details** page of your Devtron App as shown below. 

    ![Figure 10: Application Metrics](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new3.jpg)

{% hint style="warning" %}
### Note 
If your environment is [Overridden](../creating-application/environment-overrides.md), you need to enable the Application Metrics at the environment override deployment template instead of the base deployment template.
{% endhint %}

---

## Troubleshooting

<details>
<summary><strong>Not able to see deployment metrics on production environment or Not able to enable application-metrics</strong></summary>

Update the rollout CRDs to latest version, run the following command:

```bash
kubectl apply -f https://raw.githubusercontent.com/devtron-labs/devtron/main/manifests/yamls/rollout.yaml -n devtroncd
```

</details>

<details>
<summary><strong> Grafana dashboards not visible in App Details page even after adding prometheus endpoint or Graphs showing error panel with id 2 not found</strong></summary>

If the graphs are not visible check if prometheus is configured properly. Then go to Global Configurations > Clusters & Environments > Click on any environment for the cluster where you added prometheus endpoint and simply click `Update`.  
If the charts are still not visible, try visiting the url: <devtron-url>/grafana?orgId=2  
If you see `Not Found` on this page, then follow all the given steps or if the page is accessible and you are getting `panel with id 2 not found` then follow from step 6:  
1. Get grafana password using `kubectl -n devtroncd get secret devtron-secret -o jsonpath='{.data.GRAFANA_PASSWORD}' | base64 -d`
2. `kubectl run --rm -it --image quay.io/devtron/k8s-utils:tutum-curl curl` Run this command and it will create a pod for using `curl`
3. Copy the following and change `grafana-password` with your password of grafana and change the value of `prometheusUrl` with your prometheus endpoint
```
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
and run in the pod that we created above in step 2.
4. Now visit <devtron-url>/grafana?orgId=2 again and you'll see grafana login page. Login using username `admin` and password from step 1 and check if prometheus url is updated in datasources. If not, update it in the default datasource.
5. Now from devtron UI, update any of the environment again and it's datasource will be created automatically.
6. In Grafana UI you need to be logged in and Go to Dashboards > Manage then click `Import` and Import the given dashboards one by one.
```
https://grafana.com/api/dashboards/13322/revisions/4/download
https://grafana.com/api/dashboards/13320/revisions/4/download
https://grafana.com/api/dashboards/13325/revisions/4/download
https://grafana.com/api/dashboards/13321/revisions/6/download
```
After that, your issue should be resolved and you should be able to see all the graphs on UI.

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