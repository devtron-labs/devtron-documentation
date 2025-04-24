# Run History

The run history allows you to review each and every execution of job-pipelines. Here you can review who triggered each pipeline, when it started executing and finished, and whether it succeeded or failed. It also allows you to inspect logs for each execution.

## Accessing run history for specific pipeline

Either you have just executed the job and want to inspect live execution or you just want to check previous executions of a job pipeline

1. Navigate to  **Devtron Dashboard** → **Jobs** → **Select the job** → **Run History**, all the executions will appear in a reverse chronological order under the pipeline name. In case you have configured multiple job pipelines within a job, you need to select the pipeline from `Select Pipeline` dropdown in the top-left corner. 

<!-- image -->

2. Select the specific execution you want to inspect. By default the latest execution is selected.

<!-- image -->

3. After selecting the execution, the right section of the page will display the details about that particular execution.

|Field|Description|
|:---|:---|
|Triggered|Shows the date, time, user, and commit ID that initiated this run.|
|Environment|Indicates which execution environment (e.g., devtron-ci) was used for this job.|
|Execution started|Timestamp marking when the job actually began running.|
|Execution succeeded|Timestamp marking when the job finished successfully.|
|Worker status|Final outcome of the worker performing the job (e.g., Succeeded or Failed). On failure, the error message is also shown|

<!-- image -->

Apart from these details, you can also inspect logs, source code, security, and download artifacts (if any).

### Logs
* In logs tab, you can inspect logs for each pipeline stage and task along with thier runtime.
* Use the `Search log` search bar to search specific keywords or errors.
* You can expand/collapse each pipeline stage to view specific logs related to that stage. Use the `Expand/collapse all stages` button near the search bar to expand or collapse all stages at once.
* Select the fullscreen button in the bottom-right corner to view logs in fullscreen.

<!-- image  -->

### Source
The source tab shows which commit is from the source code (configured Git repository) is used to execute the job pipeline. 

It shows following commit details
|Field|Description|
|:---|:---|
|Repository name & icon |The Git repo used with its provider logo|
|Commit hash|A short, clickable commit ID (e.g. 443vecd) that opens the full commit details when clicked.|
|Commit message|Commit message used while psuhing that commit|
|Author|Name & email of the committer.|
|Date & time|When that commit was authored|

<!-- image -->

### Artifacts 
The Artifacts tab shows all archives or files your job has produced such as backup binaries, reports, log bundles and let you download them for inspection or further use your job has produced.

<!-- image -->
### Security

The Security tab provides a view of vulnerability scanning results for code, the container images used or built  during the job execution. It appears when a security scan plugin (e.g., Trivy via the Code Scan plugin) is integrated into your job pipeline.

<!-- image -->