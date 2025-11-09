# Openshift

## Sample Configuration

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/openshift.jpg)
<center></center>

---

## Values You Would Require at SSO Provider

Devtron provides a sample configuration out of the box. There are some values that you need to either get from your SSO provider or give to your SSO provider.

### Values to Fetch

* clientID

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/secret/openshift-id-secret1.jpg)
<center>Fetching Client ID</center>

* clientSecret

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/secret/openshift-id-secret2.jpg)
<center>Fetching Secret</center>

### Values to Provide

* redirectURI (already provided in SSO Login Services by Devtron)

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/redirect/openshift-redurl.jpg)
<center>Copying Redirect URI from Devtron</center>

    ![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/redirect/openshift-redirect.jpg)
<center>Pasting Redirect URI</center>

---

## Reference

* [View Openshift Documentation](https://docs.openshift.com/container-platform/4.14/authentication/configuring-oauth-clients.html)

* [View Dex IdP Documentation](https://dexidp.io/docs/connectors/openshift/)







