# Notifications

The **Notifications** screen lists AI-generated recommendations for your Kubernetes cluster. Each recommendation highlights cost or performance improvement opportunities.

---

## Viewing Recommendations

Go to **AI Recommendations** → **Notifications** to view the list.

Each recommendation item includes:

| Field | Description |
|--------|-------------|
| **Read/Unread Indicator** | Represented by a bulb icon on the left. Unread notifications display a red dot indicator 🔴. Once you read or acknowledge it, the red dot disappears. |
| **Title** | One-line description of what the AI recommends. |
| **Description** | Shows why the recommendation is suggested to you. |
| **Category** | Tags representing the scope of improvement: e.g. `Cost Optimization` or `Performance Improvement`. |
| **Priority** | Tags representing the importance of the recommendation item: `Low`, `Medium`, `High`, or `Urgent`. |
| **Potential Savings** | The impact or extent of savings (e.g., “80% resource reduction”). |
| **Cluster** | The affected cluster you have added to Devtron. |
| **Status** | Action Pending, Completed, Failed, etc. |
| **Processed By** | Associated runbook or automation. |
| **Timestamp** | Date and time when the recommendation is generated or updated. |
| **(⋮) Context Menu** | **Acknowledge** - To mark as read <br /> **Revert Change** - To undo the remediation. Only possible when `Status` = `Completed`. |

You can click a recommendation to get its [Detailed View](#detailed-view).

---

## Detailed View

This modal window has two tabs: [Summary](#summary) and [Recommended Change](#recommended-change):

### Summary

Apart from the recommendation details seen earlier, this will show additional information, such as:

* **AI Thought Process** -  Displays the line-by-line analysis done by AI before suggesting you the recommendation.
* **Activity Trail** - Shows the actions taken by the AI as well as the approver.

The next step is to [review the recommendation](#recommended-change). 

### Recommended Change

This tab shows you the configuration diff for you to compare the existing configuration vs recommended change.
If the recommended change is yet to be acted upon (i.e. `Status` != `Completed`), you get **Approve** and **Reject** button for accepting/discarding the recommendation.

AI automatically generates the runbook corresponding to the recommendation. When the user (superadmin) approves a recommendation, it triggers the corresponding runbook and the remediation takes place.

:::info What is a Runbook?
A [Runbook](./runbook.md) is a predefined action that Devtron runs to apply a change, such as resizing resources or hibernating a namespace.  
When you approve a recommendation, its linked runbook carries out the change with the required safety checks and approvals.
:::


