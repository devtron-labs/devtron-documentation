# Chart Repository

You can add more chart repositories to Devtron. Once added, they will be available in the `All Charts` section of the [Chart Store](./chart-store/README.md).
**Note**: After the successful installation of Devtron, click `Refetch Charts` to sync and download all the default charts listed on the dashboard.

## Add Chart Repository

1. From the left sidebar, go to **Global Configurations** → **Chart Repositories**.

    ![Figure 1: Chart Repositories](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/dashboard/chart-repo-db.jpg)

2. Click **Add repository**.

    ![Figure 2: Add Chart Repository](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/dashboard/add-chartrepo-db.jpg)

3. You can connect public and private chart repositories on Devtron.

    ![Figure 3: Select Repo Type](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/dashboard/repo-type-db.jpg)

4. Provide the following information in each field:

    | Fields    | Description   |
    | ----------| ------------- |
    | **Name**   | Provide a `Name` for your chart repository. This name is used as a prefix for the chart names listed in the Helm chart section of your application. |
    | **URL**   | Enter the URL of your chart repository. For example: `https://charts.bitnami.com/bitnami` |
    | **Username**  | For private repositories, provide the username required for access.       |
    | **Password**  | Enter the password associated with the username.     |

5. Check this box **Allow Insecure Connection** if you want to allow insecure connections, such as HTTP connections, which may not verify SSL certificates.

## Update Chart Repository

You can also update your saved chart repository settings. 

1. Click the chart repository which you want to update. 
2. Modify the required changes and click `Update` to save you changes.

**Note**: 
* You can perform a dry run to validate the below chart repo configurations by clicking `Validate`.
* You can enable or disable your chart repository. If you enable it, then you will be able to see the enabled chart in `All Charts` section of the [Chart Store](./chart-store/README.md).

