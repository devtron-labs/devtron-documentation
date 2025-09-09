# Codacy

Codacy is an automated code analysis/quality tool that helps developers to ship better software in a faster manner.

**Prerequisite**: Make sure you have set up an account in `Codacy` or get the API keys from an admin.

1. On the **Edit build pipeline** page, select the **Pre-Build Stage** (or Post-Build Stage).

2. Click **+ Add task**.

3. Select **Codacy** from **PRESET PLUGINS** and configure it.
    1. Enter a relevant name in the `Task name` field. It is a mandatory field.

    2. Enter a descriptive message for the task in the `Description` field. It is an optional field.
    
    3. Provide a value for the input variable.<br> **Note:** The value may be any of the values from the previous build stages, a global variable, or a custom value.</br>
        | Variable | Format | Description |
        | ---- | ---- | ---- |
        | CodacyEndpoint | String | API endpoint for Codacy |
        | GitProvider | String | Git provider for the scanning |
        | CodacyApiToken | String | API token for Codacy. If it is provided, it will be used; otherwise it will be picked from the Global secret (CODACY_API_TOKEN). |
        | Organisation | String | Your Organization for Codacy|
        | RepoName | String | Your Repository name |
        | Branch | String | Your branch name |

    4. `Trigger/Skip Condition` refers to a conditional statement to execute or skip the task. You can select either:<ul><li>`Set trigger conditions` or</li><li>`Set skip conditions`</li></ul> 

    5. `Pass/Failure Condition` refers to conditions to execute a pass or fail of your build. You can select either:<ul><li>`Set pass conditions` or</li><li>`Set failure conditions`</li></ul> 

4. Click **Update Pipeline**.

5. Go to the **Build & Deploy**, click the build pipeline and start your build.

6. Click `Details` on the build pipeline, and you can view the details on the `Logs`.