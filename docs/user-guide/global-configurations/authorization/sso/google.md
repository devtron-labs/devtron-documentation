# Google

## Introduction

Integrating Google as your Single Sign-On (SSO) provider enables users to authenticate with their Google accounts, ensuring secure and streamlined access to Devtron. This document walks you through setting up Google SSO in Devtron, ensuring users can log in smoothly.

:::info Prerequisites
To configure Google SSO in Devtron, you will need:

* Super Admin permissions

  * Only a [Super-Admin](../user-access.md#grant-super-admin-permission) can configure SSO. If you are setting up SSO for the first time, use [Admin Credentials](https://docs.devtron.ai/install/install-devtron#devtron-admin-credentials) instead.

* A Google Cloud account to create and manage OAuth credentials. If you don’t have one, you must create it at the [Google Cloud Console](https://console.cloud.google.com/).

:::

## Get the Redirect URI from Devtron

Before configuring Google as an SSO provider, 
* Ensure that the [Host URL](../../host-url.md) is correctly configured in Devtron. This is crucial because the Redirect URI is generated based on the Host URL.
* You need to retrieve the Redirect URI from Devtron, which will be required in Google Cloud while setting up OAuth credentials.

  * Log in to Devtron.
  * Navigate to **Global Configurations** → **SSO Login Services**.
  * Select **Google** as the authentication provider.
  * Click the URL next to **Click to use** in green color. The URL field will be automatically populated with the URL next to **Click to use**; this is essential to generate the correct **Redirect URI**.
  * Copy the **Redirect URI** displayed in this section. You will need to enter this in Google Cloud.

 <div class="video-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/QvufIzUSNpg" title="Getting the Redirect URI" frameborder="0" allowfullscreen></iframe></div>

## Configure OAuth in Google Cloud Console

The next step is to configure OAuth credentials in Google Cloud Console. This involves creating a Google OAuth Client ID and Client Secret, which will be used in Devtron for authentication.

### To set up OAuth, follow these steps:

* Access [Google Cloud Console](https://console.cloud.google.com/) and create a new project or select an existing one.
* Navigate to **APIs & Services** → **OAuth Consent Screen** and configure the required details as shown on the screen.
* In **APIs & Services** → **Credentials**, create a new OAuth Client ID:
  * Select 'Web application' as the application type.
  * Paste the Redirect URI (copied from Devtron) under Authorized Redirect URIs.
* Click **Create** to generate the Client ID and Client Secret.

:::caution
### Google SSO Requires a Valid Domain with HTTPS

Google does not support IP addresses as valid redirect URIs. You must use a valid domain name ([FQDN](https://en.wikipedia.org/wiki/Fully_qualified_domain_name)) accessible over HTTPS.

Examples of valid URIs:

✅ https://devtron.example.com/api/dex/callback

✅ https://auth.yourcompany.com/callback

Examples of invalid URIs:

❌ http://localhost:8080/callback

❌ http://192.168.1.10/callback
:::

![Figure 1: Creating OAuth Client](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/creating-oauth-client-google-sso.jpg)

You can see a new client ID is created in the **APIs & Services** → **Credentials**, under **OAuth 2.0 Client IDs** section. To obtain Client ID and Client Secret, click on the name (devtron-sso in our case) of the **OAuth 2.0 Client IDs**

![Figure 2: Client ID Created](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/client-id-created-google-sso.jpg)

Copy the Client ID and Client Secret, as they will be required in Devtron’s SSO configuration.

![Figure 3: Get the Client ID and Client Secret](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/client-id-and-secret-google-sso.jpg)

For a detailed step-by-step guide, refer to Google’s official documentation: [Get Google API Client ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid).

## Configure Google SSO in Devtron

The next step is to configure Devtron to use these credentials for authentication. For this, navigate back to **Global Configurations → SSO Login Services**, here you can already find a configuration template.

## Configuration

![Figure 4: Configuring SSO in Devtron](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/configuration-devtron-google-sso.jpg)

In the configuration,

* Enter the OAuth Credentials:
  * Paste the Client ID obtained from Google Cloud in the `clientID` field.
  * Paste the Client Secret obtained from Google Cloud in the `clientSecret` field.
* Configure Hosted Domains (Optional):
  * If you want to restrict authentication to specific domains (e.g., only users from company.com can log in), add these under `hostedDomains` in Devtron.
  * If you want to allow all users with any valid Google account, remove the entire `hostedDomains` section from the configuration.
* Enter the Redirect URI:
  * Copy the Redirect URI displayed in Devtron and paste the value in the `redirectURI` field.
* Click **Update** to save the configuration, once saved, Google SSO is successfully configured

:::caution 
Although Google SSO is now set up, users will not be able to sign in unless they are explicitly added to Devtron with the necessary permissions.
:::

## Important: Enable User Access After SSO Setup

To ensure users can log in:

* Go to **Global Configurations** → **Authorization** → **User Permissions**.
* Click **Add User**.

![Figure 5: Configuring User Permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/config-user-permissions-google-sso.jpg)

* Enter their email (matching their Google account).
* Assign the required role.
* Click **Save** to complete the setup.

![Figure 6: Adding User with required permissions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/adding-user-google-sso.jpg)

Once saved, Devtron will use Google OAuth for authentication, allowing users to log in using their Google accounts.

For detailed steps on managing user permissions, refer to the [User Permissions Documentation](../user-access.md).

## Reference

* [View Google Documentation](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)
* [View Dex IdP Documentation](https://dexidp.io/docs/connectors/google/)