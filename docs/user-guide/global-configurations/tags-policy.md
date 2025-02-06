# Tags Policy

## Introduction [![](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg)](https://devtron.ai/pricing)

Tags are key-value pairs containing metadata that helps in identifying and categorizing Devtron apps. For example, you can have a tag named *`Business-Unit`* with a value assigned during application creation (or later, if mandatory).

The **Tags Policy** feature lets you create tags for applications, and enforce deployment-specific rules if needed. It also allows you to propagate these tags as labels to the Kubernetes resources associated with the application.

![Figure 1: How Tags Policy Works](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/mandatory-tag.gif)

## Adding Tags

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to add tags.
{% endhint %}

1. Go to **Global Configurations** → **Tags Policy**.

    ![Figure 2: Tags Policy](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/gc-tags-policy.jpg)

2. Click **+ Add Tag**.

    ![Figure 3: 'Add Tag' Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/add-tags-gc.jpg)

3. **Suggested tags/Mandatory tags** - If you choose and create `Suggested tags`, they will appear as [dropdown suggestions](#appearance-of-suggested-tags) when adding tags to applications. However, if you create `Mandatory tags` and enforce deployment restrictions, the user must configure the tag for applications within the selected project (refer next step).

    ![Figure 4: Creating Suggested or Mandatory Tag](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/suggested-mandatory.gif)

4. **Select Project(s)** - (Not available for `Suggested tags`) Select the projects whose applications will have the mandatory tags enforced. For all other projects, mandatory tags will appear just as a suggestion.

    ![Figure 5: Selecting One or More Projects](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/select-projects.jpg)

5. **Tag Key** - Enter the key from the key-value pair (tag), e.g., *Business Unit*, *Team*, *Owner*.

    ![Figure 6: Entering Tag Key](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/tag-key.gif)

6. **Value Choices** - Here, you can create a list of values for the key-value pair (tag). Users can choose one of your configured values.

    ![Figure 7: Creating List of Choices](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/value-choices.gif)

You may enable **Allow Custom Input** to give the user a choice to enter their own value if it is unavailable in the list. Or you may skip creating the list of choices altogether so that your user can enter their own value. 

7. **Description** - Write a brief description explaining the significance of the tag.

    ![Figure 8: Adding Description for the Tag](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/tag-description.gif)

8. **Allow/Block Deployments** - (Not available for `Suggested tags`) Select the action to be taken if mandatory tags are not configured by the user in the intended projects:
    * **Allow deployments** - Use this option if you want to allow the user to deploy an existing application where mandatory tags are not configured yet.
    * **Block deployment stages of prod environments** - Use this option if you want to prevent the user from deploying an existing application to production environments, if mandatory tags are not configured. 
    * **Block deployment stages of non-prod enviroments** - Use this option if you want to prevent the user from deploying an existing application to non-production environments, if mandatory tags are not configured. 
    * **Block deployment stages of all environments** - This will prevent the user from deploying an existing application to all environments if mandatory tags are not configured.

    ![Figure 9: Deciding Deployment Restrictions](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/allow-block.gif)

9. **Propagate Tag** - By default, tags assigned to applications in Devtron are not automatically propagated to Kubernetes resources as labels.

    * Click the <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/donot-propagate.jpg"  height="10"> symbol on the left side of your tag to propagate a tag. The symbol turns dark to indicate that the tag propagation is enabled.
    * To remove the tags from propagation, click the <img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/creating-application/propagate-dark.jpg" height="10"> symbol again.

    ![Figure 10a: Enabling/Disabling Tag Propagation](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/propagate-tag.gif) 
    
    <br />

    ![Figure 10b: How Tag Propagation Works](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/inject-tags.jpg)

{% hint style="Info" %}
### Changing Propagation in Suggested Tags vs. Mandatory Tags
**In suggested tags**: When you enable/disable tag propagation, users can still disable/enable it during app creation, ensuring its tags propagate to associated Kubernetes resources.

**In mandatory tags**: When you enable/disable tag propagation, users do not get the option to change the propagation setting.
{% endhint %} 

10. (Optional) Click the **`+`** option to create more suggested tags or more mandatory tags in one go.

    ![Figure 11: Adding More Tag](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/add-more-tags.gif)

11. Click **Save** to create the tag(s).

---

## Editing a Tag

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to edit tags.
{% endhint %}

You can edit an existing tag key to do the following:
* Modify the tag key
* Add/remove value choices
* Tweak the description
* Change deployment restrictions
* Add or remove projects
* Convert Tags from Suggested to Mandatory (or vice versa)
* Enable/Disable the propagation of tags

Once done, click **Update** to apply the changes.

![Figure 12: Editing a Tag](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/edit-tags.gif)

### Editing in Bulk

You may use the checkboxes to add/remove projects from multiple tags at once as shown below.

![Figure 13: Adding/Removing projects in Bulk](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/add-remove-projects.gif)

---

## Deleting a Tag

{% hint style="warning" %}
### Who Can Perform This Action?
Users need to have super-admin permission to delete tags.
{% endhint %}

If you delete a 'Suggested Tag', it will no longer show up as a suggestion to your users while adding tags. If it's a 'Mandatory Tag', the deployment rules (if any, associated with that tag) will no longer be enforced.

However, this action will not delete the applied tag from existing applications.

![Figure 14: Deleting a Tag](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/delete-tag.gif)

If you wish to delete multiple tags, you may use the checkboxes to select the tags and delete them from the floating widget as shown below.

![Figure 15: Deleting Multiple Tags](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/bulk-delete-tags.gif)


---

## Results

### Appearance of Mandatory Tags

* The mandatory tag is available for users to configure after they select the project in the app creation page. It is marked by a red asterisk.

    ![Figure 16: Mandatory Tag - App Creation Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/mandatory-tag-result1.gif)

* For an existing application, users can configure it from the **Overview** page of the application.

    ![Figure 17: Mandatory Tag - Overview Page](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/mandatory-tag-overview.gif)

* In a project where mandatory tags are enabled, if the user does not provide values for the mandatory tags, the user cannot create an app in that project.

    ![Figure 18: App creation not allowed](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/mandatory-tag-result3.gif)

### Appearance of Suggested Tags

Users can see a dropdown list of your suggested tags while creating a new app or on the **Overview** page of an existing application.

![Figure 19: Suggested Tags in Dropdown](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/suggested-tag-result.gif)

### Impact on Deployment Pipelines

If an existing application belongs to a project where mandatory tags are enabled along with deployment restrictions, if the user does not provide values for the mandatory tags, they cannot deploy that app to the intended environment (check step 9 of [adding tags](#adding-tags)).

The same is true for auto-triggering deployment pipelines. A new image available after the build stage will not auto-trigger the deployment pipeline due to the missing mandatory tags.

![Figure 20: Deployment Restriction](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/deployment-impact.gif)

### Impact on Application Group

Similarly, if deployment restrictions apply due to missing mandatory tags, users cannot deploy apps to the intended environment from the [Application Group](../application-groups.md).

![Figure 21: Deployment Restriction in Application Group](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/global-configurations/mandatory-tags/application-group-impact.gif)