---
title: "Step 2: Publish th2-infra-schema"
weight: 10
chapter: false
image: /img/getting-started/th2-env-schema/Demo-cluster-components-2-final.drawio.png
prev:
  title: "Install required software"
  link: "./requirements"
  icon: ""
next:
  title: "Set up cluster"
  link: "./set-up-cluster"
  icon: ""
---

<custom-stepper steps="5" step="2" > </custom-stepper>

As a result of this step and the previous steps, you should have the following part of the th2 
framework ready:

![](/img/getting-started/th2-env-schema/Demo-cluster-components-2-final.drawio.png)

## th2-infra-schema

**th2-infra-schema** is an abstract representation of interdependencies between the th2 components.
The actual schemas in form of repositories are created in line with a purpose of a testing system that you are building.

Some example configurations of a **th2-infra-schema** repository are available in different branches of the 
[`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master) repository.

See the [Theory of pins and links](https://github.com/th2-net/th2-documentation/wiki/infra:-Theory-of-Pins-and-Links) 
section of the th2 GitHub Wiki for more information.

You can publish th2-infra-schema in two possible ways:
1. [Default](#default-publish-th2-infra-schema-to-create-a-th2-environment-by-editing-repository) - GitHub-based. You will edit schemas by editing repository.
2. [Alternative](#alternative-publish-th2-infra-schema-to-create-a-th2-environment-via-a-th2-gui) - GUI-based. You will edit schemas via the th2-infra-editor GUI.

## **Default:** Publish th2-infra-schema to create a th2 environment by editing repository

[`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master) 
is the template repository with predefined schemas, which you can use.

Fork the [`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master) 
repository or use it as a template. It can be either **public** or **private**.

![](/img/getting-started/th2-infra-schema/git-based/clone-th2-infra-schema-demo.png)

<notice info >

th2 will sync with this published **th2-infra-schema** using `ssh`. 
In the future, you will provide the link to this repository in a separate th2 configuration 
(this will be discussed in one of the subsequent steps).

</notice >

If you have completed this step, you can go to the [next step](../set-up-cluster). 
If you choose to proceed with an alternative way, please see below.

## **Alternative:** Publish th2-infra-schema to create a th2 environment via a th2 GUI

th2 uses **th2-infra-editor** as a Graphical User Interface (GUI) for management of infra schemas.

#### Download `th2-infra-schema`

Clone the needed branch of [`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master) 
(each branch of the Git repository contains a version of `th2-infra-schema`). 
Currently, [`ver-1.5.4-main_scenario`](https://github.com/th2-net/th2-infra-schema-demo/tree/ver-1.5.4-main_scenario) 
is the newest. 

```shell
git clone -b <branch_name> --single-branch https://github.com/th2-net/th2-infra-schema-demo.git
```
The contents of this repository should be placed into the th2 repository.

Open the `infra-mgr-config.yml` file. The `spec.k8s-propagation` variable should be set to 'sync' 
instead of 'off' in order to automatically inherit all dependencies from **th2-infra-schema**.

```yml[infra-mgr-config.yml]
kind: SettingsFile
metadata:
  name: infra-mgr-config
spec:
  k8s-propagation: sync
```

### Publish the Git repository

Reinitialize the repository to set the downloaded branch as `main`.

```shell
rm -rf .git
git init
```

Publish your repository on GitHub as either **public** or **private**.
