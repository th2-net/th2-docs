---
title: Use th2
weight: 6
read_before:
  - title:  Install th2
    href: ./install-th2
    icon: mdi-tune-vertical
test_config:
  - title: Test configuration
    href: https://github.com/th2-net/th2-infra-schema-demo/tree/ver-1.5.4-main_scenario
    icon: mdi-github
---

In this guide, you will learn how to use th2 in testing.

<!--more-->

As you already have Kubernetes cluster with th2, we can try it testing.

## Create testing environment

You can create any modules for test logic that you want. You can architect any system of these modules, that you want. 

All you need is create Docker images of your module and describe it in `th2-infra-schema` repository. Every branch in this repository is the custom configuration for the th2 environment. 

We have prepared demonstration environment for you. All modules are already in the container registry. To try it, you need just create branch in `th2-infra-schema` with the content from our branch for th2 1.5.4 test configuration.

<recommendations :items="test_config"></recommendations>

As we created our `th2-infra-schema` from this template, we will just create new branch from this one.

We created new branch from `ver-1.5.4-main_scenario` to not commit changes in
the base configuration.

![](/img/getting-started/th2-infra-schema/git-based/create-branch.png)

In the new branch it is needed to edit `infra-mgr-config.yml`: variable `spec.k8s-propagation` should be configured as rule
instead of `off` to automatically apply all dependencies from _`th2-infra-schema`_. Lets commit changes.

```yml[infra-mgr-config.yml]
kind: SettingsFile
metadata:
  name: infra-mgr-config
spec:
  k8s-propagation: rule
```


`th2-infra-mgr` is monitoring your infra schema repository.
After described actions it will create `th2-<new_branch_name>` namespace and deploy all needed components.

In the infra editor new schema is available.

![Infra Schema](/img/getting-started/th2-infra-schema/git-based/infra-schema.png)

Infra Editor will create new namespace `th2-<new_schema_name>` in Kubernetes cluster for new schema.
It can require some time, there will be pods for this environment in Kubernetes cluster. You can go the Kubernetes dashboard and see it.

![New namespace](/img/getting-started/th2-infra-schema/git-based/new-namespace.png)

