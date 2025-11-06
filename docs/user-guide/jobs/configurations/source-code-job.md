# Source Code

In Devtron, the Source Code configuration is used to specify the repository that contains your scripts, Terraform files, YAML configurations, or other resources. The repository acts as a central location for these files, allowing you to reference and execute them in your job without needing to rewrite the scripts in the Workflow Editor each time.

:::caution Who Can Perform This Action?
Users need to have the **Admin role** or the **Super Admin role**.
Refer the [User permissions](../../global-configurations/authorization/user-access.md#roles-available-for-jobs).
:::

To configure the Source Code, follow these steps:

1. If the job has just been created, you will be automatically directed to the Configurations page. If not, navigate to the **Configurations** tab of your job..

2. Select the **Source Code** tab from the left sidebar.

    ![Figure 1: Selecting Source Code](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/source-code.jpg)

3. Under **Add Git Repository**, select the **Git Account** from the dropdown menu. You can also select `GitHub Public` from the same dropdown to configure a public repository that does not require authentication.

    ![Figure 2: Adding Git Account](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/source-code-git-account.jpg)

4. Enter the **Repository URL** in the Git Repo `URL` field, corresponding to the selected Git account. If `GitHub Public` is selected, you can enter the URL of any public repository, as no authentication is required. 

    ![Figure 3: Adding Git Repository](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/source-code-repo-url.jpg)

5. Configure the [Additional Options](#configure-additional-options-optional) for the job as per your requirements.

6. Click on the **Save** button to save the changes.

    ![Figure 4: Saving Source Code](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/source-code-save.jpg)

---

## Configure Additional Options (optional)

### Exclude Specific File/Folder in this Repo

Devtron allows you to exclude specific files or folders from the repository from being included in the job execution. This is particularly useful for avoiding unnecessary files or folders that do not contribute to the job’s tasks that are not relevant to the current job execution. 

You can define either exclusion rules or inclusion rules to filter the files and folders, ensuring that only the necessary parts of the repository are used in the job.

Commits that contain only changes to excluded files or folders will be marked as excluded when selecting commits to trigger the job, preventing them from being included in the build.

To define the exclusion or inclusion rules, follow these steps:

1. Check the **Exclude specific file/folder in this repo** checkbox.

    ![Figure 5: Excluding Specific File/Folder](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/source-code-exclude-files.jpg)

2. Enter the exclusion or inclusion rules in the **Enter file or folder paths to be included or excluded** field.

    | Sample Rules | Description | Impact on Commits |
    |:---|:---|:---|
    | `!README.md` | **Exclusion of a single file in root folder** | Commits containing changes made only in the README.md file will not be shown |
    | `!README.md` <br/> `!index.js` | **Exclusion of multiple files in root folder** |  Commits containing changes made only in README.md or/and index.js files will not be shown |
    |  `README.md` | **Inclusion of a single file in root folder** | Commits containing changes made only in the README.md file will be shown. Rest all will be excluded. |
    |  `!src/extensions/printer/code2.py` | **Exclusion of a single file in a folder tree** |Commits containing changes made specifically to code2.py file will not be shown |
    |  `!src/*` | **Exclusion of a single folder and all its files:** |Commits containing changes made specifically to files within the `src` folder will not be shown |
    |  `!README.md` <br/> `index.js` | **Exclusion and inclusion of files** | Commits containing changes made only in README.md will not be shown, but commits made in the index.js file will be shown. All other commits apart from the aforementioned files will be excluded. |
    |  `!README.md` <br/> `README.md` | **Exclusion and inclusion of conflicting files** | If conflicting paths are defined in the rule, the one defined later will be considered. In this case, commits containing changes made only in README.md will be shown. |


    You may use the **Learn how** link (as shown below) to understand the syntax of defining an exclusion or inclusion rule.

    ![Figure 6: 'Learn how' Button](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/source-code-learn-how.jpg)

    Since file paths can be long, Devtron supports regex too for writing the paths. To understand it better, you may click the **How to use** link as shown below.

    ![Figure 7: Regex Support](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/source-code-regex.jpg)


### Set Checkout Path

Devtron allows you to define a custom directory path where the repository will be checked out during job execution. By default, the repository is checked out to the root directory (./). However, you can set a custom path to specify a particular folder within the repository to be accessed and utilized during job execution.

To set the checkout path, follow these steps:

1. Check the **Set checkout path** checkbox.

2. Enter the path to the folder you want to check out from the repository in the **Set checkout path** field.

    |Sample paths|Description|
    |:---|:---|
    |`./`|Checkout the repository to the root directory, i.e., the entire repository itself|
    |`./src`|Checkout the repository to the src folder|
    |`./src/app`|Checkout the repository to the app folder inside the src folder|

    ![Figure 8: Checkout Path](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/source-code-checkout.jpg)

### Pull Submodules Recursively

This checkbox is used for pulling [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) present in a repo. The submodules will be pulled recursively, and the auth method used for the parent repo will be used for submodules too.

To pull the submodules recursively, check the **Pull submodules recursively** checkbox.

![Figure 9: Pulling Submodules Recursively](https://devtron-public-asset.s3.us-east-2.amazonaws.com/images/create-job/source-code-pull.jpg)

---

After configuring **Source Code**, the next step is to create and configure job pipelines.

Refer to the [Workflow editor](./workflow-editor-job.md) section to create and configure job pipelines.
