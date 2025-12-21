---
hidden: true
hide_table_of_contents: true
---

# Get Admin Credentials

:::info Note
Refer [Install Devtron](./README.md) to know the available tiers and installation options.
:::

## Using Own Kubernetes Cluster?

When Devtron is installed on your own Kubernetes cluster, it creates a default admin user and password (with unrestricted access to Devtron). You can use that credentials to log in as an administrator. 

**Username**: `admin` <br/>
**Password**: Run the following command to get the admin password:

```bash
kubectl -n devtroncd get secret devtron-secret \
-o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d
```

---

## Using Devtron Cloud (SaaS)?

If you are using the 30-day trial version of [Devtron Cloud (SaaS)](../install/devtron-freemium.md#option-3-devtron-cloud-saas), follow the steps below to get the credentials.

1. Go to [Devtron's License Dashboard](https://license.devtron.ai/dashboard/) and sign in using SSO or registered email address used at the time of installation.

2. Once logged in, the Devtron License Dashboard will show your existing license. Below the license, you will find the Dashboard URL and login password (username will be `admin`).

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/install-devtron/freemium/view-creds.jpg)
    <center>Figure 1: License Page</center>

:::info Next Recommended Action
When you install Devtron for the first time, it creates a default admin user and password (with unrestricted access to Devtron). You can use it to log in as an administrator.

After the initial login, we recommend you set up any [Single Sign-On (SSO)](../../user-guide/global-configurations/sso-login.md) service like Google, GitHub, etc., and then add other users (including yourself). Subsequently, all the users can use the same SSO (e.g., GitHub) to log in to the Dashboard.
:::