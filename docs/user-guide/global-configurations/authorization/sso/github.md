# GitHub

## Introduction

Setting up GitHub SSO enables you to authenticate using your GitHub account, ensuring secure access to Devtron without the need for passwords. This document provides you step-by-step instructions on setting up GitHub SSO in Devtron.

## Prerequisites

To configure GitHub SSO in Devtron, you need:

* Super Admin permission
    * Only a [Super-Admin](../user-access.md) in Devtron can configure SSO. However, you can use the [Admin credentials](../../../../setup/install/install-devtron-with-cicd.md) provided during the initial setup, if you’re setting up Devtron for the first time.
* A GitHub account to create and manage OAuth credentials. If you do not have a GitHub account, you must create it first on GitHub.
* [Host URL](../../host-url.md) configured on the Host URL screen (**Devtron** > **Global Configurations** > **Host URL**).

## Get the redirectURI from Devtron

Configuring a redirectURI is a crucial component of the authentication process. It acts as an endpoint to which you are redirected after successful authentication. Follow the instructions below to configure the redirectURI:

1. Navigate to **Devtron** > **Global Configurations** > **Authorization** > **SSO Login Services**. The SSO Login Service page is displayed.

    ![Figure 1: Get the redirectURI](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/github/global-configurations.jpg)

2. Select **GitHub** from the list of available SSO login services.

3. Click the suggested URL below the **URL** field. The Host URL is then updated in the **URL** field.

4. Click the **Update** button.

When you populate the Host URL in the **URL** field, the redirectURI (or callbackURI) is updated automatically at the top of the SSO Login Service screen. This redirectURI is essential, as it is required while setting up the OAuth credentials in GitHub.

## Configuring OAuth in GitHub

Open Authentication (OAuth) allows you to authorize one application to sign in to another without the need for passwords. Configuring OAuth credentials in GitHub involves creating a GitHub OAuth Client ID and Client Secret, which will then be used in Devtron for authentication.

If you do not already have an OAuth application created on GitHub, refer to [Creating an OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app). Once you have an OAuth application on GitHub, follow the instructions below:

1. Navigate to **GitHub** > **Settings** > **Developer Options** > **OAuth Apps**.

2. Select your preferred OAuth app and click **Edit**.

    ![Figure 2: Client ID and Client Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/github/oauth-app-masked.jpg)

3. Click the **Generate a new client secret button** to create a new client secret. The client secret is created and displayed in the **Client Secrets** section. The Client ID is created by default and can be found in the **Client ID** field.

4. Update the **Homepage URL** field with the host URL configured in Devtron.

5. Update the **Authorization callback URL** with the redirectURI created in Devtron.

6. Click **Update** application.

{% hint style="warning" %}

### GitHub SSO Requires a Valid Domain with HTTPS

GitHub does not support IP addresses as valid redirect URIs. You must use a valid domain name ([FQDN](https://en.wikipedia.org/wiki/Fully_qualified_domain_name)) accessible over HTTPS.

Examples of valid URIs: 

✅ https://devtron.example.com/api/dex/callback

✅ https://auth.yourcompany.com/callback


Examples of invalid URIs:

❌ http://localhost:8080/callback

❌ http://192.168.1.10/callback

{% endhint %}

## Configuring GitHub SSO in Devtron

To configure the GitHub SSO in Devtron, follow the below steps of instructions:
1. Navigate back to **Devtron** > **Global Configurations** > **Authorization** > **SSO Login Services**. The SSO Login Service page is displayed.

2. Select the **Configuration** section available below the **URL** field.

    ![Figure 3: Configuration Section](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/github/configuration-section.jpg)

3. Update the `clientID` attribute with the Client ID generated in the OAuth application on GitHub.

4. Similarly, update the `clientSecret` attribute with the Client Secret generated in the OAuth application on GitHub.

5. Configure the `hostedDomains` only if needed. For example, if you want to restrict authentication to specific domains, specify those domains in the `hostedDomains` attribute. If you want to allow any user with a valid GitHub account, remove the entire `hostedDomains` attribute from the **Configuration** section.

6. Update the `redirectURI` attribute with the `redirectURI` configured earlier.

7. Click **Update** to save the configuration. GitHub SSO is now successfully configured.

{% hint style="warning" %}

Although GitHub SSO is now configured, you will not be able to sign in with GitHub unless you add yourself as a user with the necessary permissions in Devtron. For detailed steps on managing user permissions, refer to the [User Permissions Documentation](../user-access.md).

{% endhint %}