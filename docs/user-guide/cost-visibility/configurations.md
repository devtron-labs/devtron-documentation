# Configurations

The Configurations page lets you manage configurations for Cost Visibility in Devtron. You can:

   * Set the default currency for all cost-related data.
   * Enable or disable cost tracking for your connected clusters.

## Currency (Default)

You can select your preferred currency as default. 

<!-- GIF -->


## Enable Cost Tracking

To enable cost visibility for a cluster, follow the below steps:

1. Choose your preferred cluster, and click on **Off/Enabled**, an **Edit Cluster** modal window will open.

2. Enable the toggle next to **Enable cost tracking**.

3. Select the cloud provider in which you have created your cluster.

4. Based on the cloud provider you need to do the following configurations:

{% tabs %}

{% tab title="GCP" %}

To enable cost visibility for Google Cloud in Devtron, you need to generate an API key and use it to connect Devtron with your GCP account.

1. Generate the API key using standard [Google Cloud API key documentation](https://cloud.google.com/docs/authentication/api-keys#gcloud).

2. Now go back to the **Edit cluster** modal window, and enter the API key in the **Cloud Provider API Key** field.

{% endtab %}

{% tab title="Azure" %} 

To enable cost visibility for your Azure clusters in Devtron, you need to allow Devtron to access your billing data securely. This requires two steps:
   1. Create a custom role in Azure with billing access.
   2. Create a service principal (an identity) that Devtron can use to fetch cost details.

 ### Step 1: Creating Custom Role

 1. Open a text editor and copy the following JSON:

 ```json
{
   "Name": "OpenCostRole",
   "IsCustom": true,
   "Description": "Rate Card query role",
   "Actions": [
       "Microsoft.Compute/virtualMachines/vmSizes/read",
       "Microsoft.Resources/subscriptions/locations/read",
       "Microsoft.Resources/providers/read",
       "Microsoft.ContainerService/containerServices/read",
       "Microsoft.Commerce/RateCard/read"
   ],
   "AssignableScopes": [
       "/subscriptions/YOUR_SUBSCRIPTION_ID"
   ]
}
 ```

2. Replace YOUR_SUBSCRIPTION_ID with your actual subscription ID.

3. Save the file as `myrole.json`.

4. Run the following command in your terminal:

```bash
az role definition create --verbose --role-definition @myrole.json
```

This creates a role called `OpenCostRole` with just enough access to read pricing information.

### Step 2: Create a Service Principal

1. Run the command below, again replacing YOUR_SUBSCRIPTION_ID with your subscription ID:

```bash
az ad sp create-for-rbac \
  --name "OpenCostAccess" \
  --role "OpenCostRole" \
  --scope "/subscriptions/YOUR_SUBSCRIPTION_ID" \
  --output json
```

2. You’ll get an output like this:

```json
{
   "appId": "1d9b1532-abe4-4e08-b172-adfa5384da1",
   "displayName": "OpenCostAccess",
   "password": "3DZ8Q~KOE.WgdmmRkBHg3dF1rfrpFhSPk.Hnb4-",
   "tenant": "aee9b2ed-7ecc-4cb2-bfed-60d71c0e957"
}
```

3. Note this information as you need to enter this in Devtron.

### Step 3: Enter Details in Devtron

Now go back to the **Edit cluster** modal window, and fill the following fields:

| **Field**          | **Value to Provide**            |
|---------------------|---------------------------------|
| Subscription ID     | Your Azure subscription ID      |
| App ID              | Value of `appId` from the output |
| Display Name        | Value of `displayName` from the output|
| Password            | Value of `password` from the output |
| Tenant              | Value of `tenant` from the output |
| Billing Account     | Optional (fill if available)    |
| Offer ID            | Optional (fill if available)    |

{% endtab %}

{% tab title="AWS" %} 

To enable cost visibility for AWS in Devtron, follow the below steps:

### Step 1: Set up a Spot Instance Data Feed

1. Create an S3 bucket

2. Assign full access permissions to the AWS Spot Data Feed service

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "spot.amazonaws.com"
      },
      "Action": "*",
      "Resource": "arn:aws:s3:::devtron-spot-feed/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "spot.amazonaws.com"
      },
      "Action": "*",
      "Resource": "arn:aws:s3:::devtron-spot-feed"
    }
  ]
}
```

3. Run the following command to subscribe to the data feed using the AWS CLI

```bash
aws ec2 create-spot-datafeed-subscription \
  --bucket devtron-spot-feed --prefix cost
```

**Note:** You can subscribe to the Spot Data Feed for only one S3 bucket at a time. Running the command again updates the feed to the latest bucket.

### Step 2: Create an IAM Role or Use Access Keys

You can connect Devtron to AWS cost data using either of the following methods:

#### IAM Role (Recommended)

Create a Web Identity IAM role for your EKS/EC2 cluster with permissions to access the Spot Data Feed bucket. Attach the following policy (replace CHANGE-ME with your bucket name)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:ListAllMyBuckets",
        "s3:ListBucket",
        "s3:Get*"
      ],
      "Resource": [
        "arn:aws:s3:::CHANGE-ME",
        "arn:aws:s3:::CHANGE-ME/*"
      ],
      "Effect": "Allow"
    }
  ]
}

```

#### Access Keys (Alternative)

Provide an Access Key and Secret Key with permissions `s3:ListBucket` and `s3:GetObject` for the Spot Data Feed bucket.

### Step 3: Configure in Devtron

Now go back to the **Edit cluster** modal window, and fill the following fields:

| **Field**            | **Description**                                                                  |
|-----------------------|---------------------------------------------------------------------------------|
| Spot Data Bucket      | Name of the S3 bucket storing Spot Instance Data Feed                           |
| Spot Data Region      | AWS region of the Spot Data Feed                                                |
| Spot Data Prefix      | Prefix (if any) used for the Spot Data Feed                                     |
| Project ID            | Your AWS Account ID                                                             |
| Access Key            | (Optional) AWS Access Key with S3 read permissions                              |
| Secret Access Key     | (Optional) AWS Secret Access Key with S3 read permissions                       |
| IAM Role              | (Recommended) IAM role ARN assigned to the EKS/EC2 cluster for bucket access    |

{% endtab %}

{% endtabs %}

5. Enter Prometheus endpoint of your cluster. Refer [Fetching Prometheus Endpoint](#fetching-prometheus-endpoint) to learn more.

6. Click save.

### Fetching Prometheus Endpoint

{% hint style="warning" %}
### Note 
Ensure [GitOps](../global-configurations/gitops.md) is configured before deploying Prometheus. If not, Prometheus will default to being deployed via Helm.
{% endhint %}

#### Installing Prometheus
   
1. Go to the **Chart Store** and search for `prometheus`. Use the Prometheus community's `kube-prometheus-stack` chart to deploy Prometheus.

    ![Figure : Chart Store](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app2.jpg)

2. After selecting the chart, configure these values as needed before deployment.

    ```yaml
    kube-state-metrics: 
        metricLabelsAllowlist:   
        - pods=[*]
    ```

    <br />

    ```yaml
    serviceMonitorSelectorNilUsesHelmValues: false
    podMonitorSelectorNilUsesHelmValues: false
    ```

    <br />

    Search for the above parameters, and update them as shown (or customize as needed).

    ![Figure a: Prometheus Chart Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app3.jpg)

    ![Figure b: Prometheus Chart Configuration (cont.)](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-metrics-config.jpg)

3. Enable `upgradeJob` parameter to install CRDs:

    Since Helm does not automatically apply CRDs, you need to enable the `upgradeJob` parameter in the Helm chart to ensure CRDs are applied before deploying Prometheus.
   
    In the Prometheus Helm chart settings, locate the `upgradeJob` parameter and set it to `true` if it is `false`.
      
    ![Figure : upgradeJob Parameter](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app-new2.jpg)
      
4. After enabling the parameter, click **Deploy Chart**.

{% hint style="warning" %}
### Common Pitfall: Prometheus Deployment Timeout due to Failed CRDs

While deploying `kube-prometheus-stack` chart, the deployment status may show as **Timed out**, and some CustomResourceDefinitions (CRDs) may appear as **Failed**.

To solve it, refer [Troubleshoot Issues](#common-pitfall-prometheus-deployment-timeout-due-to-failed-crds)

{% endhint %}

#### Set Up Prometheus Endpoint

{% hint style="warning" %}
### Who Can Perform This Action?
Only super admin users can set up Prometheus endpoint in a cluster.
{% endhint %}
   
1. Once Prometheus is installed, go to its **App Details** and navigate to **Networking** → **Service** in the K8s resources. Expand the Prometheus server service to see the endpoints. 

2. Copy the URL of the `kube-prometheus` service as shown in the image below.

    ![Figure : Prometheus Service](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/app-metrics/app4.jpg)

3. Now enter the Prometheus endpoint:
    1. Paste the copied URL into the Prometheus endpoint field, ensuring it includes `http://`
    2. Click **Update Cluster** to save the changes.

    ![Figure : Prometheus Endpoint]()
