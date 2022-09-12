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

If you successfully completed the steps above, your th2 cluster is ready to use.


## Create environment

First of all, you need a special th2 schema environment for testing. 
This environment includes modules your tests will interact with and a bunch of components for historical data storage and displaying status and actions of the environment. 
During installation you have binded **infra-schema** repository to the th2 cluster. For creating a new schema environment just create a new branch with `yaml` files describing it.

<recommendations :items="schema_link"></recommendations>

Now you can run your test scripts or any software, that simulates activity of real people.

## Persistent Volume for read components

If you would like to include **read** components into your configuration, you also have to set up a dedicated PersistentVolume for the **read** log directory.
PersistentVolume mapped to `/opt/components` directory is already created during the installation. Now you need to create a PersistentVolumeClaim. PVC example can be found in [`example-values/persistence/`](https://github.com/th2-net/th2-infra/tree/v1.7.3/example-values/persistence).

* create PVC:
```shell
kubectl apply -f ./persistence/pvc.yaml
```

Details for **read-log** [README.md](https://github.com/th2-net/th2-read-log#configuration)

## Send requests to environment

<notice info>

Sometimes it is [needed](./requirements/software#tester-box) to install additional software to run external boxes and scripts.

</notice>
