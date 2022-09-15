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

1. Core components are responsible for:
   - saving data from the testing environment to the database. 
   - fetching data from the database
   - displaying events and messages using a GUI
2. Modules - boxes of the type Module contain custom logic (e.g. connection between client and system, analyzers, client and exchange simulators).

![](/img/fundamentals/th2-infra-2.png)

Learn more about th2 infrastructure:
- [th2-infra](./infrastructure/th2-infra-repository)
- [th2-infra-schema](./infrastructure/th2-infra-schema)
- [th2-infra components](./infrastructure/infra-components)

