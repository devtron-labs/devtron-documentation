# GitHub

## Introduction

Setting up GitHub SSO enables you to authenticate using your GitHub account, ensuring secure access to Devtron without the need for passwords. This document provides you step-by-step instructions on setting up GitHub SSO in Devtron.

---

## Prerequisites

To configure GitHub SSO in Devtron, you need:

* Super Admin permission
    * Only a [Super-Admin](../user-access.md) in Devtron can configure SSO. However, you can use the [Admin credentials](../../../../setup/install/devtron-oss.md#step-4-log-in-to-devtron) provided during the initial setup, if you’re setting up Devtron for the first time.
* A GitHub account to create and manage OAuth credentials. If you do not have a GitHub account, you must create it first on GitHub.
* [Host URL](../../host-url.md) configured on the Host URL screen (**Global Configurations** → **Host URL**).

---

## Get the redirectURI from Devtron

Getting the redirectURI from Devtron is a crucial component of the authentication process. It acts as an endpoint to which you are redirected after successful authentication. Follow the below instructions to get the redirectURI:

1. Navigate to **Global Configurations** → **Authorization** → **SSO Login Services**. The SSO Login Service page is displayed.

    ![Figure 1: Get the redirectURI](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/github/sso-login-services-2.jpg)

2. Select **GitHub** from the list of available SSO login services.

3. Click the URL suggested in green color next to the **Click to use** label to update the **URL** field. Update the **URL** field only if the host URL displayed in the **URL** field is incorrect.

4. Click the **Update** button.

When you populate the Host URL in the **URL** field, the redirectURI (or callbackURI) is updated automatically in the purple block displayed at the top of the SSO Login Service screen. This redirectURI is essential, as it is required while setting up the OAuth credentials in GitHub.

---

## Configuring OAuth in GitHub

Open Authentication (OAuth) allows you to authorize one application to sign in to another without the need for passwords. Configuring OAuth credentials in GitHub involves creating a GitHub OAuth Client ID and Client Secret, which will then be used in Devtron for authentication.

1. Navigate to **GitHub** → **Profile** → **Settings** → **Developer settings** → **OAuth Apps**. 
    
    If you do not already have an OAuth application created on GitHub, refer to [Creating an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app). If you already have an OAuth application on GitHub, follow the instructions below:

2. Select your preferred OAuth app and click **Edit**.

    ![Figure 2: Client ID and Client Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/github/oauth-application.jpg)

3. Click the **Generate a new client secret** button to create a new client secret. The client secret is created and displayed in the **Client Secrets** section. The Client ID is created by default and can be found in the **Client ID** field.

4. Update the **Homepage URL** field with the host URL configured in Devtron.

5. Update the **Authorization callback URL** with the redirectURI created in Devtron.

6. Click the **Update application** button.

---

## Configuring GitHub SSO in Devtron

To configure the GitHub SSO in Devtron, follow the below steps of instructions:

1. Navigate back to the **SSO Login Services** screen in Devtron.

2. Select the **Configuration** section available below the **URL** field.

    ![Figure 3: Configuration Section](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/github/configuration-section-2.jpg)

3. Update the `clientID` attribute with the Client ID generated in the OAuth application on GitHub.

4. Update the `clientSecret` attribute with the Client Secret generated in the OAuth application on GitHub.

5. Update the `redirectURI` attribute with the `redirectURI` configured earlier.

6. Click **Update** to save the configuration. GitHub SSO is now successfully configured.

![Figure 4: Sign in with GitHub](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/github/github-sso-final.gif)

---

:::caution Important: Enable User Access After SSO Setup
Although GitHub SSO is now configured, you will not be able to sign in with GitHub unless you add yourself as a user with the necessary permissions and manage other user permissions as well in Devtron. For detailed steps on managing user permissions, refer to the [User Permissions Documentation](../user-access.md).

:::