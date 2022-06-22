---
title: Use th2
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

## Let's start

First of all, you need a special th2 schema environment for testing. This environment includes modules your tests will interact with and a bunch of components for historical data storage and displaying status and actions of the environment. During installation you have binded `th2-infra-schema` repository to th2 cluster. For creating new schema environment just create a new branch with `yaml` files describing it.

<recommendations :items="schema_link"></recommendations>

Now you can run your test scripts or any software, that simulates activity of real people.

<notice info>

Sometimes it is [needed](./requirements/software#tester-box) to install additional software to run external boxes and scripts.

</notice>

For practice you can try some script demonstration examples. Repositories with schema environments and external boxes are provided.

<recommendations :items="demo_link"></recommendations>
