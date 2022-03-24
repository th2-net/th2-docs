---
title: "Create th2 environment"
weight: 12
chapter: false
image: /img/getting-started/th2-env-schema/Demo-cluster-components-5-create-env.drawio.png
prev:
  title: Install th2
  link: ./step-3
next:
  title: Get and run demo script
  link: ./step-5
---

<custom-stepper :steps="6" :step="4" > </custom-stepper>

Since you have already installed the th2 framework, lets use it to build some testing system.
In the previous steps you copied **th2-infra-schema**. It describes simulator of exchange system, 
components for testing and entry point for exchange client. In this case the th2 environment will contain 
system under test and system for testing. 

<!--more-->

During this step you will add the final component to the environment schema.
This component is **"th2 environment"**.

![](/img/getting-started/th2-env-schema/Demo-cluster-components-5-create-env.drawio.png)

## Create infra schema with Git branches

Find [th2-infra-schema-demo](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
repository copied by you.

Every branch in this repository is the custom configuration for the th2 environment.

Select `ver-1.5.4-main_scenario` branch to create environment by this configuration.

![](/img/getting-started/th2-infra-schema/git-based/choose-branch.png)

Create new branch from `ver-1.5.4-main_scenario` to not commit changes in
the base configuration.

![](/img/getting-started/th2-infra-schema/git-based/create-branch.png)

In the new branch edit `infra-mgr-config.yml`: variable `spec.k8s-propagation` should be configured as a rule
instead of `off` to automatically apply all dependencies from _`th2-infra-schema`_. Commit changes.

```yml[infra-mgr-config.yml]
kind: SettingsFile
metadata:
  name: infra-mgr-config
spec:
  k8s-propagation: rule
```

### What changed?

`th2-infra-editor` edits infra schema repository linked to the cluster with access provided by SSH key.
`th2-infra-mgr` is monitoring your infra schema repository.
After described actions it will create th2-<new_branch_name> namespace and deploy all needed components.

In the infra editor new schema is available.

![Infra Schema](/img/getting-started/th2-infra-schema/git-based/infra-schema.png)

Infra Editor will create new namespace th2-<new_schema_name> in kubernetes cluster for new schema.
It will have all components defined in schema.

![New namespace](/img/getting-started/th2-infra-schema/git-based/new-namespace.png)


