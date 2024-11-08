# Deploying MongoDB Helm Chart

## Introduction

Let's assume that you are creating an application and want to use mongodb to store data of your application. You can deploy mongodb using `bitnami/mongodb` Helm chart and connect it to your application.

This guide will introduce you to how to deploy the mongoDB's Helm chart.

## 1. Discover the Chart from the Chart Store

Visit the `Chart Store` page by clicking on `Charts` present on left panel and find `bitnami/mongodb` Helm Chart.
You also can search mongodb chart using the search bar.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mongodb-helm-chart/mongo-chart-db.jpg)

## 2. Configure the Chart

* After selecting the `bitnami/mongodb` Helm chart, click on `Configure & Deploy`.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mongodb-helm-chart/configure-deploy-mongo.jpg)

* Enter the following details before deploying the mongoDB chart:

    | Key | Description |
    | :--- | :--- |
    | `App Name` | Name of the Chart |
    | `Project` | Select the name of your Project in which you want to deploy the chart |
    | `Environment` | Select the environment in which you want to deploy the chart |
    | `Chart Version` | Select the latest Chart Version |
    | `Chart Value` | Select the latest default value or create a custom value |

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mongodb-helm-chart/details-mongo.jpg)

### Configure Values

#### Using GUI

Set the following parameters in the chart.

| Parameters | Description |
| :--- | :--- |
| `MongoDB architecture` | Available options: Standalone or Replication |
| `MongoDB admin user` | Username of admin |
| `MongoDB admin password` | Password for the admin |
| `MongoDB custom user` | Username of new user to create |
| `Password for MongoDB custom user` | Password for the new user. Ignored if existing secret is provided |

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mongodb-helm-chart/gui-mongo.jpg)

#### Using YAML

You can configure the `values.yaml` according to your project's requirements.
To learn about different parameters used in the chart, you can check [Documentation of mongodb Helm chart](https://hub.helm.sh/charts/bitnami/mongodb)

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mongodb-helm-chart/yaml-mongo.jpg)

Click on `Deploy Chart` once you have finished configuring the chart.

## 3. Check the Status of Deployment

After clicking on `Deploy Chart`, you will be redirected to `App Details` page that shows the deployment status of the chart. The Status of the chart should be `Healthy`. It might take few seconds after initiating the deployment.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mongodb-helm-chart/deployment-status-mongo.jpg)

In case the status of the deployment is `Degraded` or takes a long time to get deployed, click on `Status` or check the logs of the pods to debug the issue.

## 4. Extract the Service name

Copy the service name, it will be used to connect your application to mongoDB.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/deploy-chart/deploying-mongodb-helm-chart/mongo-service-db.jpg)

