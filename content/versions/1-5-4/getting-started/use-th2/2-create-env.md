---
title: Create testing environment
weight: 10
test_config:
  - title: Test configuration
    href: https://github.com/th2-net/th2-infra-schema-demo/tree/ver-1.5.4-main_scenario
    icon: mdi-github
---

## Create testing environment

You can create modules for your custom test logic and architect any system from them. 

All you need is create Docker images of your module and describe it in `th2-infra-schema` repository. Every branch in this repository is the custom configuration for the th2 environment. 

We have prepared demonstration environment for you. All modules are already in the container registry. To try it, you need just create branch in `th2-infra-schema` with the content from our branch for th2 1.5.4 test configuration.

<recommendations :items="test_config"></recommendations>

As we created our `th2-infra-schema` from this template, we will just create new branch from this one.

We created new branch from `ver-1.5.4-main_scenario` to not commit changes in
the base configuration.

![](/img/getting-started/th2-infra-schema/git-based/create-branch.png)

In the new branch you need to edit `infra-mgr-config.yml`: variable `spec.k8s-propagation` should be configured as `rule`
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
It can require some time, there will be pods for this environment in Kubernetes cluster. You can go to the Kubernetes dashboard and see it.

![New namespace](/img/getting-started/th2-infra-schema/git-based/new-namespace.png)

## Prepare environment

In our environment `ver-1.5.4-main_scenario` there are some external boxes. Boxes of this type should be run on your machine from outside the cluster. 

<notice note>

You need `kubectl` configured to work with your cluster.

</notice>

### Clone simulator boxes

Clone [Simulator](https://github.com/th2-net/th2-sim-template) branch for the demo script:

```shell
git clone -b demo-ver-1.5.4-local --single-branch https://github.com/th2-net/th2-sim-template.git
```

Clone [Log reader](https://github.com/th2-net/th2-read-log) branch for the demo script:

```shell
git clone -b demo-ver-1.5.4-local --single-branch https://github.com/th2-net/th2-read-log.git
```

Clone [CSV reader](https://github.com/th2-net/th2-read-log) branch for the demo script:

```shell
git clone -b demo-ver-1.5.4-local --single-branch https://github.com/th2-net/th2-read-csv.git
```

### Run simulator boxes

Run CSV reader:

```shell
gradle run --args='--namespace <schema-namespace> --boxName read-csv --contextName $(kubectl config current-context)'
```

Run Log reader:

```shell
gradle run --args='--namespace <schema-namespace> --boxName read-log --contextName $(kubectl config current-context)'
```

Run simulator:

```shell
gradle run --args='--namespace <schema-namespace> --boxName sim-demo --contextName $(kubectl config current-context)'
```
