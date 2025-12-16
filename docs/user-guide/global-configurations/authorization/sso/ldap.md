# LDAP

## Sample Configuration

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/ldap.jpg)
<center>Figure 1: LDAP Configurations</center>

---



## Values to fetch from LDAP

Devtron provides a sample configuration out of the box. Here are some values you need to fetch from your LDAP.

| Field                                | Required | What it is / Where to get it                                                                                   | Example                                       |
| ------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `host`                               | Yes      | LDAP server hostname with port                                                                                 | `ad.example.com:636`                          |
| `insecureNoSSL`                      | No       | Disable SSL when connecting to LDAP                                                                            | `false`                                       |
| `insecureSkipVerify`                 | No       | Skip TLS certificate verification                                                                              | `true`                                        |
| `bindDN`                             | Yes      | DN of the LDAP service account used by Devtron to query users and groups. This is **not** the user logging in. | `cn=Administrator,cn=users,dc=example,dc=com` |
| `bindPW`                             | Yes      | Password of the bindDN account                                                                                 | `admin0!`                                     |
| `usernamePrompt`                     | No       | Label shown on the login screen for LDAP users                                                                 | `Email Address`                               |
| `userSearch.baseDN`                  | Yes      | Directory path under which Devtron searches for LDAP users                                                     | `cn=Users,dc=example,dc=com`                  |
| `userSearch.filter`                  | No       | LDAP filter to restrict user search results                                                                    | `(objectClass=person)`                        |
| `userSearch.username`                | Yes      | LDAP attribute used as the login username                                                                      | `userPrincipalName`                           |
| `userSearch.idAttr`                  | No       | Unique identifier attribute for users                                                                          | `DN`                                          |
| `userSearch.emailAttr`               | No       | Attribute used to fetch user email                                                                             | `userPrincipalName`                           |
| `userSearch.nameAttr`                | No       | Attribute used to fetch user display name                                                                      | `cn`                                          |
| `groupSearch.baseDN`                 | No       | Directory path under which LDAP groups are searched. Required when auto-assign permissions is enabled.         | `cn=Users,dc=example,dc=com`                  |
| `groupSearch.filter`                 | No       | LDAP filter to fetch groups                                                                                    | `(objectClass=group)`                         |
| `groupSearch.userMatchers.userAttr`  | No       | User attribute used to match group membership                                                                  | `DN`                                          |
| `groupSearch.userMatchers.groupAttr` | No       | Group attribute that contains user references                                                                  | `member`                                      |
| `groupSearch.nameAttr`               | No       | Attribute used to fetch group names                                                                            | `cn`                                          |

:::tip Common error: "Some required field are missing"

If you see this error while saving the LDAP configuration, ensure that you have set the **URL** field above the configuration editor.

Click the **Click to use** link shown below the URL field to auto-populate the correct Devtron URL, or manually enter it before saving.
:::


---

## Reference

[What is LDAP](https://www.okta.com/identity-101/what-is-ldap/)

---

## Auto-assign Permissions <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Since LDAP supports creation of User Groups, this feature simplifies the onboarding process of organizations having a large headcount of users. It also eliminates repetitive permission assignment by automatically mapping your LDAP User groups to Devtron's [Permission Groups](../permission-groups.md) during single sign-on (SSO) login.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/sso-login-service/secret/auto-grant-ldap.jpg)
<center>Figure 2: Enabling Permission Auto-assignment</center>

If you've created user groups in LDAP, you can create corresponding permission groups in Devtron with the same names. When members of those user groups first log in to Devtron, they'll automatically inherit the permissions from their Devtron permission group. This means you can't manually adjust or add [individual permissions for users](../user-access.md) mapped to a permission group.

:::caution 
SSO login requires exact matching between Devtron permission group names and LDAP user groups. Any discrepancies or missing groups will prevent successful login.

Once you save the configuration with this auto-assign feature enabled, existing user permissions will be cleared and the future permissions will be managed through [Permission Groups](../permission-groups.md) linked to LDAP user groups.
:::

:::info 
If you're missing some permissions that you know you should have, try logging out and signing back in to Devtron. This will refresh your permissions based on your latest LDAP user group.
:::