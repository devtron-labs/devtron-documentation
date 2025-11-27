# Keycloak

## Prerequisites

* Install and [configure Keycloak](https://www.keycloak.org/guides#getting-started) on your server or cloud environment.
* Create a new [realm in Keycloak](https://www.keycloak.org/getting-started/getting-started-kube#_create_a_realm) for your application.

---

## Get the redirectURI from Devtron

1. Navigate to **Global Configurations** → **Authorization** → **SSO Login Services**. The SSO Login Service page is displayed.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/select-oidc.jpg)
    <center>Figure 1: Select OIDC</center>

2. Select **OIDC** from the list of available SSO login services.

3. Click the URL suggested in green color next to the **Click to use** label to update the **URL** field. 

    When you populate **URL** field, the redirectURI (or callbackURI) is updated automatically in the purple block displayed at the top of the SSO Login Service screen. This redirectURI is essential, as it is required while setting up the OAuth credentials in GitHub.

4. Copy the redirectURI from the purple block.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/copy-redirect-uri.jpg)
    <center>Figure 2: Copy Redirect URI</center>

---

## Steps on Keycloak Admin Console

### Creating a Client

Here, we will add Devtron as a client for using Keycloak SSO.

1. In the Admin Console, go to **Clients** and click **Create client**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/create-client.gif)
    <center>Figure 3: Creating Client on Keycloak</center>

2. Within **General Settings**:
    * Enter `devtron` in the **Client ID** field. We will use this ID while configuring SSO later in Devtron.
    * Enter `Devtron` in the **Name** field.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/client-id.jpg)
    <center>Figure 4: Client ID and Name</center>

3. Within **Capability config**, turn on **Client Authentication**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/enable-client-auth.gif)
    <center>Figure 5: Enabling Client Authentication Toggle</center>


4. Within **Login settings**, enter the `redirectURI` you have copied earlier in the following fields. 
    * **Valid redirect URIs**
    * **Valid post logout redirect URIs**
    * **Web origins**

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/redirect-url.gif)
    <center>Figure 6: Entering Callback/Redirect URIs</center>

5. Click **Save**.

### Getting Client Secret

Here, we will obtain the secret we need while configuring SSO in Devtron.

1. Go to the **Credentials** tab of the client you created.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/client-secret.gif)
    <center>Figure 7: Obtaining Client Secret</center>

2. Use the copy button next to the **Client Secret** field and paste it somewhere for future reference. 

### Creating Users

Here, we will create a user that can log in to Devtron via SSO. We will assign a username and password that the user can enter while logging in to Devtron via Keycloak SSO.

1. In the Admin Console, go to **Users** and click **Add user**.

2. Give a username (e.g., *usertest*) in the **Username** field and enter the user's email address (e.g., *usertest@example.com*) in the **Email** field.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/create-user.gif)
    <center>Figure 8: Creating User Data</center>

3. Click **Create**. Your user creation will be successful.

4. Go to the **Credentials** tab of the user you created.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/set-user-password.gif)
    <center>Figure 9: Adding User Password</center>

5. Click **Set password**.

6. Enter the password and confirm it.

7. Click **Save**.

### Retrieving Issuer URL

Here, we will obtain the Issuer URL we need while configuring SSO in Devtron.

1. In the Admin Console, go to **Realm settings**.

2. In the **General** tab, scroll down to the **Endpoints** field, and click the **OpenID Endpoint Configuration** link.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/endpoint-config.gif)
    <center>Figure 10: OpenID Endpoint Configuration Link</center>

3. This will open a new page, copy the value of the key named `issuer`, and paste it somewhere for future reference. 

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/issuer-url.jpg)
    <center>Figure 11: Locating Issuer URL</center>

---

## Steps on Devtron

### Configuring OIDC SSO

:::caution Who Can Perform This Action?
Users need to have super-admin permission to configure SSO.
:::

Here, we will set up an OIDC SSO and enter the values we obtained in the [previous section](#steps-on-keycloak-admin-console).

1. Go to **Global Configurations** → **SSO Login Services** → **OIDC**.

2. In the **Configuration** editor, do the following:
    * In the `issuer` field, paste the URL you got while [retrieving issuer URL](#retrieving-issuer-url).
    * In the `clientID` field, paste the ID you entered while [creating the client](#creating-a-client).
    * In the `clientSecret` field, paste the secret you got under [client credentials tab](#getting-client-secret).
    * In the `redirectURI` field, make sure to enter the same redirect URI you gave in step 4 of [client creation](#creating-a-client).

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/keycloak-sso-config.jpg)
    <center>Figure 12: Sample Keycloak SSO Config</center>

3. Click **Save** or **Update** to activate Keycloak SSO login. 

### Adding Users

:::caution Who Can Perform This Action?
Users need to have super-admin permission to add users.
:::

Here, we will add the user we created in the Keycloak Admin Console. If this step is skipped, the user might not be able to log in to Devtron via Keycloak.

1. Go to **Global Configurations** → **Authorization** → **User Permissions**.

2. Click **+ Add Users**.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/add-user.jpg)
    <center>Figure 13: Adding Users to Devtron</center>

3. In the **Email addresses** field, enter the email address of the user you created in Keycloak.

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/add-email.jpg)
    <center>Figure 14: Entering User Data and Permissions</center>

4. Assign necessary permissions to this new user. Refer [user permissions](../user-access.md) to know more.

5. Click **Save**.

Now, you may log out and test the Keycloak OIDC login method using the [user credentials](#creating-users). Clicking the **Login with Oidc** button will land you on Keycloak's login page.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/login-oidc.jpg)
<center>Figure 15a: Login using OIDC method</center> 


![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/sso-login-services/keycloak/keycloak-login.jpg)
<center>Figure 15b: Keycloak's Login Page</center>

:::caution Note
Kindly get in touch with us if you encounter any issues while logging out of Keycloak on Devtron as it might be buggy.
:::