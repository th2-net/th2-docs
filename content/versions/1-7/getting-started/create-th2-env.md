---
title: Create th2 environment
weight: 6
read_before:
  - title:  Install th2
    href: ./install-th2
    icon: mdi-tune-vertical
schema_link:
  - title: There should be the link to th2-infra-schema
    href: ''
    icon: mdi-graph
demo_link:
  - title:  Demo main scenario
    href: ../cookbook/demo-main-scenario
    icon: mdi-language-python
---

Understand how testing is going with th2.

<!--more-->

As you already have Kubernetes cluster along with th2, we can try testing it.


## Create environment

First of all, you need a special th2 schema environment for testing. This environment includes modules your tests will interact with and a bunch of components for historical data storage and displaying status and actions of the environment. During installation you have binded `th2-infra-schema` repository to th2 cluster. For creating new schema environment just create a new branch with `yaml` files describing it.

<recommendations :items="schema_link"></recommendations>

Now you can run your test scripts or any software, that simulates activity of real people.

## Persistent Volume for read components

If you would like to include th2 read components into your configuration, you also have to set up a dedicated PersistentVolume for th2-read log directory.
PersistentVolume mapped to `/opt/components` directory is already created during installation. Now you need to create PersistentVolumeClaim. PVC example can be found in [`example-values/persistence/`](https://github.com/th2-net/th2-infra/tree/v1.7.3/example-values/persistence).

* create PVC:
```shell
kubectl apply -f ./persistence/pvc.yaml
```

Details for th2-read-log [README.md](https://github.com/th2-net/th2-read-log#configuration)

## Send requests to environment

<notice info>

Sometimes it is [needed](./requirements/software#tester-box) to install additional software to run external boxes and scripts.

</notice>

For practice you can try some script demonstration examples. Repositories with schema environments and external boxes are provided.

<recommendations :items="demo_link"></recommendations>
