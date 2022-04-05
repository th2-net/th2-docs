---
title: Publish th2-infra-schema
weight: 5
image: /img/getting-started/th2-env-schema/Demo-cluster-components-full-schema.drawio.png
prev:
  title: Install Required Software
  link: ./step-1
next:
  title: Install th2
  link: ./step-3
---

<custom-stepper :steps="6" :step="2" > </custom-stepper>

**th2-infra-schema** is probably the most important component in your testing process. 
Technically, it is just a repository in the Git system. th2 sychronizes with this repository
and changes your system, if the changes are made in the schema. 

With this instruction you will copy demonstration schema to your GitHub. No worries, all components are already prepared and accessable for free use.

<!--more-->

As a result of this and previous steps, you should have the following part of the th2
framework ready:

![](/img/getting-started/th2-env-schema/Demo-cluster-components-2-final.drawio.png)

## th2-infra-schema

**th2-infra-schema** is an abstract representation of interdependencies between the th2 components.
The actual schemas in form of repositories are created in line with the purpose of the testing system that you are building.

Some configuration examples of the **th2-infra-schema** repository are available in different branches of the
[`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master) repository.

See the [Theory of pins and links](https://th2-docs.herokuapp.com/1-5-4/fundamentals/pins-and-links) section for more information.

You can publish the th2-infra-schema in two possible ways:
1. [Default](#default-publish-th2-infra-schema-to-create-a-th2-environment-by-editing-repository) - GitHub-based. You will edit schemas by editing repository.
2. [Alternative](#alternative-publish-th2-infra-schema-to-create-a-th2-environment-via-a-th2-gui) - GUI-based. You will edit schemas via the th2-infra-editor GUI.

## Publish the th2-infra-schema

[`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
is the template repository with predefined schemas, which you can use.

Fork the [`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
repository or use it as a template. It can be either **public** or **private**.

![](/img/getting-started/th2-infra-schema/git-based/clone-th2-infra-schema-demo.png)

<notice info >

th2 will sync with published **th2-infra-schema** using `ssh`.
In the future, you will provide the link to this repository in a separate th2 configuration
(this will be discussed in one of the subsequent steps).

</notice >

If you have completed this step, you can go to the [next step](../set-up-cluster).

## Provide access to the _th2-infra-schema_ Git repository for _th2-infra-mgr_

The `th2-infra-mgr` component monitors the `th2-infra-schema` repository and updates it
according to the user's actions in the `th2-infra-editor` GUI. To make it possible,
it is required that the `th2-infra-mgr` component is granted SSH access with write permissions.

Generate SSH keys without a passphrase:

```shell
ssh-keygen -t rsa -m pem -f ./infra-mgr-rsa.key
```

[Add a new SSH key to your GitHub account](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)

Create a Kubernetes Secret `infra-mgr` from the private SSH key:

```shell
kubectl -n service create secret generic infra-mgr --from-file=infra-mgr=./infra-mgr-rsa.key
```