# API Tokens

API tokens are the access tokens for authentication. Instead of using username and password, it can be used for programmatic access to API. It allows users to generate API tokens with the desired access. Only super admin users can generate API tokens and see the generated tokens.

## Generate API Token

To generate API tokens, go to `Global Configurations -> Authorization -> API tokens` and click `Generate New Token`.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token.jpg)
<center>Figure 1: Generating API Token</center>

* Enter a name for the token.
* Add Description. 
* Select an expiration date for the token (7 days, 30 days, 60 days, 90 days, custom and no expiration).


![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-expiration.jpg)
<center>Figure 2: Configuring Token Expiry</center>

* To select a custom expiration date, select `Custom` from the drop-down list. In the adjacent field, you can select your custom expiration date for the API token.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-custom-expiration.jpg)
<center>Figure 3: Configuring Custom Expiry</center>


* You can assign permission to the token either with:

   * **Super admin permission**: To generate a token with super admin permission, select `Super admin permission`.

   * **Specific permissions**: Selecting `Specific permissions` option allows you to generate a token with a specific role for:<ul><li>`Devtron Apps`</li></ul><ul><li>`Helm Apps`</li></ul><ul><li>`Kubernetes Resources`</li></ul><ul><li>`Chart Groups`</li></ul>


![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-specific-permissions.jpg)
<center>Figure 4: Configuring Specific Permissions</center>
  

* Click `Generate Token`.

A pop-up window will appear on the screen from where you can copy the API token.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-copy-token.jpg)
<center>Figure 5: Copying Generated Token</center>

## Use API Token

Once Devtron API token has been generated, you can use this token to request Devtron APIs using any API testing tool like Jmeter, Postman, Citrus. Using Postman here as an example.

Open Postman. Enter the request URL with `POST` method and under HEADERS, enter the API token as shown in the image below.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-postman-1.jpg)
<center>Figure 6: Entering 'RequestURL' in Postman</center>


In the `Body` section, provide the API payload as shown below and click `Send`.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-postman-2.jpg)
<center>Figure 7: Entering API Payload</center>

As soon as you click `Send`, the created application API will be triggered and a new Devtron app will be created as provided in the payload.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-postman-3.jpg)
<center>Figure 8: Clicking 'Send'</center>


## Update API Token

To set a new expiration date or to make changes in permissions assigned to the token, we need to update the API token in Devtron.
To update the API token, click the token name or click on the edit icon.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-edit.jpg)
<center>Figure 9: Editing API Token</center>

To set a new expiration date, you can regenerate the API token. Any scripts or applications using this token must be updated. To regenerate a token, click `Regenerate token`. 

A pop-up window will appear on the screen from where you can select a new expiration date.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-regenerate.jpg)
<center>Figure 10: Regenerating Token</center>

Select a new expiration date and click `Regenerate token`.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-regenerate-expiration.jpg)
<center>Figure 11: Configuring Expiry for Regenerating the Token</center>

This will generate a new token with a new expiration date.

To update API token permissions, give the permissions as you want to and click `Update Token`.

![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/global-configurations/api-token/api-token-update.jpg)
<center>Figuring 12: Updating API Token</center>


## Delete API Token

To delete an API token, click `delete` icon. Any applications or scripts using this token will no longer be able to access the Devtron API.







