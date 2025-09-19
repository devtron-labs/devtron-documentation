# SSO Login Services

## Introduction

After successful installation of Devtron, when you login for the first time with the [Admin Credentials](../../setup/install/devtron-oss.md#step-4-log-in-to-devtron) provided during the initial setup, you will have [Super-Admin](user-access.md) privileges with unrestricted access to all Devtron resources including configuring SSO and creating new user permissions.

Therefore, we highly recommend that you also create and manage necessary [User Permissions](user-access.md) for other users immediately after configuring the SSO, to ensure secure and streamlined access to Devtron. 

Devtron uses Dex to authenticate you against the identity providers such as GitHub, GitLab, Google, Microsoft, LDAP, OIDC, and OpenShift.

---

## Supported SSO Providers

To configure SSO in Devtron, navigate to **Global Configurations** → **Authorizations** → **SSO Login Services**. The SSO Login Services page is displayed.

![Figure 1: Supported SSO Providers](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/sso-login-home.jpg)

Devtron supports the following SSO providers:

* [Google](./authorization/sso/google.md)

* [GitHub](./authorization/sso/github.md)

* [GitLab](./authorization/sso/gitlab.md)

* [Microsoft](./authorization/sso/microsoft.md)

* [LDAP](./authorization/sso/ldap.md)

* [OpenID Connect](./authorization/sso/oidc.md)

* [OpenShift](./authorization/sso/openshift.md)

Only one SSO configuration can be active at a time. Display of multiple SSO configurations is currently not supported on Devtron's login page. When you create a SSO configuration, for e.g., Google, the Google SSO configuration is made active and will be used by Devtron for authentication.  

{% hint style="warning" %}

### Note

If Google SSO is configured in Devtron, for example, and multiple users have logged in using it, changing the SSO configuration from Google to GitHub or any other providers will forcibly sign out all users who were logged in with Google SSO.

{% endhint %}

---

## Next Steps

The next step is to select your preferred SSO login service from the available list of providers and set up the SSO configuration. 