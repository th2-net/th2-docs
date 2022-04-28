---
title: 2. Publish infra schema
chapter: true
weight: 1
---
# 2. Publish infra schema
## th2-infra-schema

**th2-infra-schema** is an abstract representation of interdependencies between the th2 components.
The actual schemas in form of repositories are created in line with a purpose of a testing system that you are building.

Some example configurations of a **th2-infra-schema** repository are available in different branches of the
[`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master) repository.

## Publish th2-infra-schema

You have several variants how to publish **th2-infra-schema**:
- Create new repository from scratch
- Copy the template repository

You can use either GitHub or GitLab for hosting repository.

[`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
is the template repository with predefined schemas, which you can use.

Fork the [`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
repository or use it as a template. It can be either **public** or **private**.

![](/img/getting-started/th2-infra-schema/git-based/clone-th2-infra-schema-demo.png)

<notice info >

th2 will sync with this published **th2-infra-schema** using `ssh`.
In the future, you will provide the link to this repository in a separate th2 configuration.

</notice >

