# Okta

## Prerequisites

A verified account on [Okta](https://www.okta.com/). Okta activates your account only if email verification is successful.

Here's a reference guide to set up your Okta org and application: [Link](https://developer.okta.com/docs/guides/oie-embedded-common-org-setup/go/main/)

{% hint style="warning" %}
### Who Can Perform This Action?
Only super admin users can set up SSO providers.
{% endhint %}

## Tutorial

{% embed url="https://www.youtube.com/watch?v=i-7IWkg6Ipk" caption="Okta App Setup" %}

## Steps on Okta Admin Console

Once your Okta org is set up, create an app integration on Okta to get a Client ID and Client Secret.

1. In the Admin Console, go to **Applications** → **Applications**.

2. Click **Create App Integration**.

3. Select **OIDC - OpenID Connect** as the **Sign-in method**. [Click here](https://www.okta.com/openid-connect/) to read more.

4. Select **Web** as the application type and click **Next**.

5. On the **App Integration** page:
    * Give a name to your application.
    * Select the **Interaction Code** and **Refresh Token** checkbox.
    * Now go to Devtron's Global Configurations → SSO Login Services → OIDC.
    * Copy the redirect URI given in the helper text (might look like: https://xxx.xxx.xxx/xxx/callback).
    * Return to the Okta screen, and remove the prefilled value in **Sign-in redirect URIs**.
    * Paste the copied URI in **Sign-in redirect URIs**.
    * Click **Save**.

6. On the **General** tab:
    * Note the **Client ID** value.
    * Click the **Edit** option.
    * In Client Authentication, choose **Client Secret**.
    * Click **Save**.
    * Click **Generate new secret**.
    * Note the **Client Secret** value.


## Steps on Devtron

1. Go to the **Global Configurations** → **SSO Login Services** → **OIDC**.
2. In the **URL** field, enter the Devtron application URL (a valid https link) where it is hosted.
3. Under `Configuration` tab, locate the config object, and provide the `clientID` and `clientSecret` of the app integration you created on Okta.
4. Add a key `insecureSkipEmailVerified: true`. Note that this key is only required for Okta SSO. For other types of OIDC SSO, refer [OIDC supported configurations](https://dexidp.io/docs/connectors/oidc/).
5. Provide `issuer` value as `https://${yourOktaDomain}`. Replace `${yourOktaDomain}` with your domain on Okta as shown in the video.
6. For providing `redirectURI` or `callbackURI` registered with the SSO provider, you can either select `Configuration` or `Sample Script`. Note that the redirect URI is already given in the helper text (as seen in the previous section).
7. Click **Save** to create and activate Okta SSO login.

### Sample Configuration

![Figure 1: Sample Configuration](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/sample-config-okta.jpg)

Now your users will be able to log in to Devtron using the Okta authentication method. Note that existing signed-in users will be logged out, and they have to log in again using their OIDC account.

## Auto-assign Permissions [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

{% hint style="warning" %}
### Prerequisites

In order to auto-assign feature to work

1. A groups claim is configured in the authorization server, so that group information is included in the token. Refer to [Add a groups claim in Okta](https://developer.okta.com/docs/guides/customize-tokens-groups-claim/main/#add-a-groups-claim-for-the-org-authorization-server) to learn more.

2. The required groups are created in Okta Universal Directory. Refer [Create a group in Okta](https://help.okta.com/en-us/content/topics/users-groups-profiles/usgp-groups-create.htm) to learn more.

3. Relevant users are added to these groups. Refer [Add Users to Okta groups](https://support.okta.com/help/s/article/adding-users-to-okta-groups?language=en_US) to learn more.

{% endhint %}

Since Okta provides centralized user management through its Universal Directory, this feature further simplifies the onboarding process of organizations with a large number of users. It also eliminates repetitive permission assignment by automatically mapping your Okta groups to Devtron’s Permission Groups during single sign-on (SSO) login.

If you’ve defined groups in your Okta Universal Directory, you can create corresponding permission groups in Devtron with the same names. When members of those Okta groups first log in to Devtron, they’ll automatically inherit the permissions from their Devtron permission group. This means you can’t manually adjust or add individual permissions for users mapped to a permission group.

### Enable Auto-Assign Permissions

1. Go to the **Global Configurations** → **SSO Login Services** → **OIDC**.

2. Add a key `insecureEnableGroups: true` as shown in the image below. Note that this key is only required for Okta SSO. For other types of OIDC SSO, refer [OIDC supported configurations](https://dexidp.io/docs/connectors/oidc/).

3. Enable the toggle for **Auto-assign permission to users on SSO login**.

4. Click **Update**.

![Figure 2: Sample Configuration for Auto -assign Permission](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/okta-sample-config-auto-assign.jpg)

{% hint style="warning" %}
### Note
SSO login requires exact matching between Devtron permission group names and Okta groups. Any discrepancies or missing groups will prevent successful login.

Once you save the configuration with this feature enabled, existing user permissions will be cleared and the future permissions will be managed through [permission groups](../permission-groups.md) linked to Okta groups.
{% endhint %}

{% hint style="info" %}
### Tip
If your Okta groups permissions aren't reflecting in Devtron, a quick sign-out and sign-in can resolve the issue.
{% endhint %}
