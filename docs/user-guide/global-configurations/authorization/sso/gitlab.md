# GitLab

## Introduction

Setting up GitLab SSO enables you to authenticate using your GitLab account, ensuring secure access to Devtron without the need for passwords. This document provides you step-by-step instructions on setting up GitLab SSO in Devtron.

---

## Prerequisites

To configure GitLab SSO in Devtron, you need:

* Super Admin permissions
    * Only a [Super Admin](../../user-access.md) in Devtron can configure SSO. You can use the [Admin credentials](../../../../setup/install/devtron-oss.md#install-devtron-oss) provided during the initial setup, if you’re setting up Devtron for the first time.

* A GitLab account to create and manage OAuth credentials. If you do not have a GitLab account, you must create it first on GitLab.

* [Host URL](../../host-url.md) configured on the Host URL screen (**Global Configurations** → **Host URL**).

---

## Get the redirectURI from Devtron

Getting the redirectURI from Devtron is a crucial component of the authentication process. It acts as an endpoint to which you are redirected after successful authentication. Follow the below instructions to get the redirectURI:

1. Navigate to **Global Configurations** → **Authorization** → **SSO Login Services**. The SSO Login Service page is displayed.

    ![Figure 1: Global Configurations](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/gitlab/gitlab-sso.jpg)

2. Select **GitLab** from the list of available SSO login services.

3. Click the URL suggested in green color next to the **Click to use** label to update the **URL** field. Update the **URL** field only if the host URL displayed in the **URL** field is incorrect.

4. Click the **Save** button.

When you populate the Host URL in the **URL** text box, the redirectURI (or callbackURI) is updated automatically in the purple block at the top of the SSO Login Service screen. This redirectURI is essential, as it is required while setting up the OAuth credentials in GitLab.

---

## Configuring OAuth in GitLab

Open Authentication (OAuth) allows you to authorize one application to sign in to another without the need for passwords. Configuring OAuth credentials in GitLab involves creating a GitLab OAuth Client ID and Client Secret, which will then be used in Devtron for authentication. 

1. Navigate to **GitLab** → **Profile** → **Edit Profile** → **Applications** → **Add new application**. 

    If you do not already have an OAuth application created on GitLab, refer to [Creating an OAuth app](https://docs.gitlab.com/integration/oauth_provider/). If you already have an OAuth application on GitLab, follow the instructions below:

2. Select your preferred OAuth app and click **Edit**.

    ![Figure 2: GitLab OAuth Applications List](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/gitlab/gitlab-oauth-applist.jpg)

3. Update the **Redirect URI** field with the redirectURI created in Devtron.

4. Enable the required scopes in the **Scopes** section as per the requirements. To know more, refer to [Required scopes](https://docs.gitlab.com/integration/oauth_provider/).

5. Click the **Save Application** button. The following page is displayed.

    ![Figure 3: GitLab OAuth Application](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/gitlab/gitlab-oauth-edit-page.jpg)

    The client ID is displayed in the **Application ID** field.

6. Click the **Renew secret** button against the **Secret** field. The Client Secret is then displayed in the **Secret** field.

---

## Configuring GitLab SSO in Devtron

To configure the GitLab SSO in Devtron, follow the below steps of instructions:

1. Navigate back to the **SSO Login Services** screen in Devtron.

2. Select the **Configuration** section available next to the **URL** field.

    ![Figure 4: GitLab SSO Configuraion](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/gitlab/configuration-gitlab.jpg)

3. Update the `clientID` attribute with the Client ID generated in the OAuth application on GitLab.

4. Update the `clientSecret` attribute with the Client Secret generated in the OAuth application on GitLab.

5. Update the `redirectURI` attribute with the redirectURI configured earlier.

6. Click **Update** button to save the configuration. GitLab SSO is now successfully configured.

![Figure 5: Login with GitLab](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/gitlab/gitlab-sso-login.gif)

{% hint style="warning" %}

### Important Note

Although GitLab SSO is now configured, you will not be able to sign in with GitLab unless you add yourself as a user with the necessary permissions and manage other user permissions as well in Devtron. It is highly recommended to create [User Permissions](../user-access.md).

{% endhint %}

---

## References

* [GitLab Documentation](https://docs.gitlab.com/ee/integration/oauth_provider.html)

* [Authentication Through GitLab](https://dexidp.io/docs/connectors/gitlab/)