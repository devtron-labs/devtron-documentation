# GitLab

## Introduction

Setting up GitLab SSO enables you to authenticate using your GitLab account, ensuring secure access to Devtron without the need for passwords. This document provides you step-by-step instructions on setting up GitLab SSO in Devtron.

---

## Prerequisites

To configure GitLab SSO in Devtron, you need:

* Super Admin permissions
    * Only a [Super Admin](../../user-access.md) in Devtron can configure SSO. You can use the [Admin credentials](../../../../setup/install/install-devtron-with-cicd.md) provided during the initial setup, if you’re setting up Devtron for the first time.

* A GitLab account to create and manage OAuth credentials. If you do not have a GitLab account, you must create it first on GitLab.

* [Host URL](../../host-url.md) configured on the Host URL screen (**Global Configurations** → **Host URL**).

---

## Get the redirectURI from Devtron

Configuring a redirectURI is a crucial component of the authentication process. It acts as an endpoint to which you are redirected after successful authentication. Follow the instructions below to configure the redirectURI:

1. Navigate to **Global Configurations** → **Authorization** → **SSO Login Services**. The SSO Login Service page is displayed.

    ![Figure 1: Global Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/gitlab/gitlab-sso.jpg)

2. Select **GitLab** from the list of available SSO login services.

3. Click the URL suggested in green color next to the **Click to use** label to update the **URL** field. Update the **URL** field only if the host URL displayed in the **URL** field is incorrect.

4. Click the **Update** button.

When you populate the Host URL in the **URL** text box, the redirectURI (or callbackURI) is updated automatically in the purple block at the top of the SSO Login Service screen. This redirectURI is essential, as it is required while setting up the OAuth credentials in GitLab.

---

## Configuring OAuth in GitLab

Open Authentication (OAuth) allows you to authorize one application to sign in to another without the need for passwords. Configuring OAuth credentials in GitLab involves creating a GitLab OAuth Client ID and Client Secret, which will then be used in Devtron for authentication.

Follow the below instructions to create a OAuth application in GitLab:

1. Navigate to **GitLab** → **Avatar** → **Applications** → **Add new application**. 

2. Enter the name of your application in the **Name** field.

3. Update the **Redirect URI** field with the redirectURI created in Devtron.

4. Enable the required scopes in the **Scopes** section as per the requirements.

5. Click the **Save Application** button. “*The application was created successfully*” message will appear.

    ![Figure 2: GitLab OAuth Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/gitlab/oauth-gitlab.jpg)

    The client ID is displayed in the **Application ID** field and the client secret is displayed in the **Secret** field. 

6. Click the **Continue** button. 

---

## Configuring GitLab SSO in Devtron

To configure the GitLab SSO in Devtron, follow the below steps of instructions:

1. Navigate back to the **SSO Login Services** screen in Devtron.

2. Select the **Configuration** section available next to the **URL** field.

    ![Figure 3: GitLab SSO Configuraion](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/gitlab/configuration-gitlab.jpg)

3. Update the `clientID` attribute with the Client ID generated in the OAuth application on GitLab.

4. Update the `clientSecret` attribute with the Client Secret generated in the OAuth application on GitLab.

5. Configure the `hostedDomains` and `baseURL` only if needed. If you want to restrict authentication to specific domains, for example *www.yourorg.com* and *www.yourorg2.com* specify those domains in the `hostedDomains` attribute. If you want to allow any user with a valid GitLab account, remove the entire `hostedDomains` attribute from the **Configuration** section.

6. Update the `redirectURI` attribute with the redirectURI configured earlier.

7. Click `Update` to save the configuration. GitLab SSO is now successfully configured.

![Figure 4: Login with GitLab](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/gitlab/gitlab-sso-login.gif)

{% hint style="warning" %}

### Important Note

Although GitLab SSO is now configured, you will not be able to sign in with GitLab unless you add yourself as a user with the necessary permissions and manage other user permissions as well in Devtron. It is highly recommended to create [User Permissions](../user-access.md).

{% endhint %}

---

## References

* [View GitLab Documentation](https://docs.gitlab.com/ee/integration/oauth_provider.html)

* [View Dex IdP Documentation](https://dexidp.io/docs/connectors/gitlab/)