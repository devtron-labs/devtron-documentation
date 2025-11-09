---
hide_table_of_contents: true
---

# Uninstall Devtron 

To uninstall Devtron, run the following command:

This command will remove all the namespaces related to Devtron (`devtroncd`, `devtron-cd`, `devtron-ci` etc.).

```bash
helm uninstall devtron --namespace devtroncd

kubectl delete -n devtroncd -f https://raw.githubusercontent.com/devtron-labs/charts/main/charts/devtron/crds/crd-devtron.yaml

kubectl delete -n argo -f https://raw.githubusercontent.com/devtron-labs/devtron/main/manifests/yamls/workflow.yaml

kubectl delete ns devtroncd devtron-cd devtron-ci devtron-demo argo

```


**Note**: If you have questions, please let us know on our discord channel. <span className="inline-badge">[![](https://img.shields.io/badge/Join%20us%20on-Discord-e01563.svg)
<center>Join us on Discord</center>](https://discord.gg/jsRG5qx2gp)</span>