---
title: 2. Publish infra schema
weight: 1
---

## infra-schema

**infra-schema** is an abstract representation of interdependencies between the th2 components.
The actual schemas in the form of the repositories are created with the purpose of testing the system that you are building.

Examples of the **infra-schema** repository configurations are available in the different branches of the
[th2-infra-schema-demo](https://github.com/th2-net/th2-infra-schema-demo/tree/master) repository.

## Publish infra-schema

You have two options on how to publish **th2-infra-schema**:
- create a new repository from scratch;
- copy the repository template;

You can use either GitHub or GitLab for hosting the repository.

[th2-infra-schema-demo](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
is the template repository with the predefined schemas.

Fork the [th2-infra-schema-demo](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
repository or use it as a template. It can be either **public** or **private**.

![](/img/getting-started/th2-infra-schema/git-based/clone-th2-infra-schema-demo.png)

<notice info >

Th2 will synchronize with the published **th2-infra-schema** using SSH.
In the future, you will be able to provide the link to this repository in a separate th2 configuration.

</notice >

