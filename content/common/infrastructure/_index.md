---
title: Infrastructure
weight: 13
---

th2 allows users to control multiple schema environments for different testing logic. 
Infra components are used for creating, changing and deleting schema environments.

<!--more-->

![](/img/fundamentals/th2-infra-1.png)

## Schema environment

There are two types of schema environment components:

1. Core components contain:
   - Events and messages store (events and messages that are produced by the whole environment)
   - Components for accessing data
   - GUI to display events and messages
2. Modules - components of this type are responsible for any custom logic (e.g. connection between client and system, analyzers, client and exchange simulators).

![](/img/fundamentals/th2-infra-2.png)

Learn more about th2 infrastructure:
- [th2-infra](./infrastructure/th2-infra-repository)
- [th2-infra-schema](./infrastructure/th2-infra-schema)
- [th2-infra components](./infrastructure/infra-components)

