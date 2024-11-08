# Deploying MySQL Helm Chart

## Introduction

`bitnami/mysql` Helm chart bootstraps a single node MySQL deployment on a Kubernetes cluster using the Helm package manager.

## 1. Discover MySQL chart from Chart Store

Select `Charts` from the left panel to visit the `Chart Store` page. You will see numerous of charts on the page from which you have to find `bitnami/mysql` chart. You also can use the search bar to search the MySQL chart.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mysql-helm-chart/mysql-chart-db.jpg)

## 2. Configure the Chart

* After selecting the `bitnami/mysql` Helm chart, click on `Configure & Deploy`.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mysql-helm-chart/configure-deploy-mysql.jpg)

* Enter the following details, to deploy MySQL chart:

    | Key | Description |
    | :--- | :--- |
    | `App Name` | Name of the Chart |
    | `Project` | Select the name of your Project in which you want to deploy the chart |
    | `Environment` | Select the environment in which you want to deploy the chart |
    | `Chart Version` | Select the latest Chart Version |
    | `Chart Value` | Select the default value or create a custom value |

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mysql-helm-chart/details-mysql.jpg)

### Configure Values

#### Using GUI

Set the following parameters in the chart, to be later used to connect MySQL with your Django Application.

| Parameters | Description |
| :--- | :--- |
| `MySQL architecture` | Available options: Standalone or Replication |
| `MySQL custom username` | Username of new user to create |
| `MySQL custom password` | Password for the new user. Ignored if existing secret is provided |
| `Primary database configuration` | Persistent Volume Size in Gibibytes |
| `Secondary database configuration` | Persistent Volume Size in Gibibytes |

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mysql-helm-chart/gui-mysql.jpg)

#### Using YAML

Apart from GUI, you can directly edit the `values.yaml` file using the editor as shown below:

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mysql-helm-chart/yaml-mysql.jpg)

Finally, click on `Deploy Chart` to deploy the Chart.

## 3. Check the Status of Deployment

After clicking on `Deploy` you will be redirected to app details page where you can see deployment status of the chart. The Status of the chart should be `Healthy`. It might take few seconds after initiating the deployment of the chart.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mysql-helm-chart/deployment-status-mysql.jpg)

In case the Status, of the deployment is `Degraded` or takes a long time to get deployed.
Click on the `Status` or check the logs of the pods to debug the issue.

## 4. Extract the Service Name

Copy the service name, it will be used to connect your application to MySQL.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mysql-helm-chart/mysql-service-db.jpg)

