# Manage Schema

## Introduction <a href="https://devtron.ai/pricing"><img src="https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/elements/EnterpriseTag.svg" className="enterprise-badge-img" /></a>

Ideally, all resources such as microservices, clusters, jobs, and pods should include detailed information, so users know what each resource does, how to use it, and its technical specifications. 

To achieve this, Devtron provides a feature called **Catalog**, which lets a [super-admin](../global-configurations/authorization/user-access.md#devtron-apps-permissions) define a custom JSON schema that renders a form for resource owners to fill. After defining a schema, it generates a form that users can fill out, and the entered data appears in a clear GUI format. 

Currently, Devtron supports catalog for the following resource types (a.k.a. resource kind):

* [Devtron applications](../../reference/glossary.md#devtron-apps)
* [Helm applications](../../reference/glossary.md#helm-apps)
* [Clusters](../../reference/glossary.md#cluster)
* [Jobs](../../reference/glossary.md#job)

![Figure 1: Sample Catalog Data](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-final-view.jpg)

There are two parts involved in the creation of a desirable resource catalog:

1. [Managing a Schema](#managing-a-schema) 
2. [Filling the Schema-Generated Form](#filling-the-schema-generated-form)

---

## Managing a Schema

:::caution Who Can Perform This Action?
Only a super-admin can create/edit a schema.
:::

:::caution Note
The **Catalog** schema you define applies to all resources of that type. For example, managing the schema for one Devtron application updates the catalog for every Devtron app in your system.
:::

1. Go to the **Overview** tab of your resource (for example, a **Devtron App**, or **Helm App**, or **Job**, or **Cluster**) and locate the **Catalog** section. 

:::caution Note
Here, we’re defining schema for a **Devtron application** as an example. You can define schemas for all other supported resource types (**Helm App**, or **Job**, or **Cluster**) in exactly the same way.
:::

2. Click **Manage Schema**. A new page will open.

    ![Figure 2: Clicking 'Manage Schema'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-manage-schema.jpg)

3. Enter a **Name** and **Description** (optional). The **Kind** field is automatically filled with the resource type (such as **Devtron application**, **Helm application**, **cluster**, or **job**) based on where you opened **Manage Schema**.

    ![Figure 3: Entering Details](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-enter-details.jpg)

4. There is a sample schema available for you to create your own customized schema. Using this schema, you can decide the input types that render within the form, for e.g., a dropdown of enum values, a boolean toggle button, text field, label, and many more.

    ![Figure 4a: Using Sample Schema](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-sample-schema.jpg)

    ![Figure 4b: Expected Future Output](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-defining-schema.jpg)

5. After defining your schema, click **Review Changes**.

6. You get a side-by-side comparison (diff) highlighting the changes you made.

    ![Figure 5a: Clicking 'Review Changes'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-review-changes.jpg)

    ![Figure 5b: Change Diff](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-review-changes-view.jpg)

7. Click **Save**. 

**Note**: If you edit a field (of an existing schema) for which users have already filled the data, that data will be erased. You will receive a prompt (as shown below) to confirm whether you want to proceed with the changes.

![Figure 6: Indication of Existing Data](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-data-clear.jpg)

---

## Filling the Schema-Generated Form

Once a schema is defined, the form generated from it appears in the **Overview** section of that resource.

1. Since we defined a schema for **Devtron applications** in the above example, go to the **Overview** tab of your application (any Devtron application). Click the **Edit** button within the `About` section.

    ![Figure 7: Clicking 'Edit'](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-edit.jpg)

2. The schema created for Devtron applications would render into an empty form as shown below.

    ![Figure 8: Rendered Empty Form](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-schema-generated-form.jpg)

3. Fill as many details as an application owner to the best of your knowledge and click **Save**.

    ![Figure 9: Filled Form](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-filling-form.jpg)

4. Your saved data would be visible in a GUI format (and also in JSON format) as shown below.

    ![Figure 10a: App Catalog Data in GUI Format](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-final-view.jpg)

    ![Figure 10b: App Catalog Data in JSON Format](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/devtron-v2/catalog/catalog-final-view-json.jpg)


This catalog data would be visible to all the users who have access to the application, but its data can be edited only by the resource owners (in this case, application admin/managers).