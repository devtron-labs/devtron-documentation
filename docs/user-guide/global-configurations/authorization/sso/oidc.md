# OIDC

## Sample Configuration

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/oidc.jpg)
<center>Figure 1: Sample Configuration</center>

---

## Values You Would Require at SSO Provider

Devtron provides a sample configuration out of the box. There are some values that you need to either get from your SSO provider or give to your SSO provider.

### Values to Fetch

* clientID

* clientSecret

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/secret/oidc-id-secret.jpg)
    <center>Figure 2: Fetching Client ID and Secret</center>

### Values to Provide

* redirectURI (provided in SSO Login Services by Devtron)

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/redirect/oidc-redurl.jpg)
    <center>Figure 3: Copying Redirect URI from Devtron</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/redirect/oidc-redirect.jpg)
    <center>Figure 4: Pasting Redirect URI</center>

---

## Reference

* [View Okta Documentation](https://developer.okta.com/docs/guides/find-your-app-credentials/main/)

* [Configure Keycloak SSO](../sso/keycloak.md)

* [Configure Okta SSO](../sso/okta.md)

* [View Dex IdP Documentation](https://dexidp.io/docs/connectors/oidc/)