---
title: 1. Set up the environment
weight: 0
read_before:
  - title: th2 software requirements
    icon: mdi-alert-circle-outline
    href: ../getting-started/requirements/software
install_variants:
  - title: Basic installation
    href: ./1-base-system/basic
    icon: mdi-hand-back-left-outline
  - title: Install via Docker
    href: ./1-base-system/in-docker
    icon: mdi-docker
---

Install Kubernetes and Cassandra clusters to use it as fundamental system for th2.


<!--more-->

## Fundamental system

Th2 is running over Kubernetes and Cassandra clusters.

Kubernetes is needed as environment for th2 components. Th2 is microservices framework, so any component of th2 is some piece of logic, no more. With Kubernetes all pieces of th2 logic can be freely created, destroyed, and updated.

Cassandra plays role of data storage for th2. It is NoSQL distributed database with high performance. So the storage is quite flexible for your needs.

## Common tools

Independetntly of how you are going to run fundamental system, you will need some tools to interact with it. Interaction with Cassandra and Kubernetes is really needed for the process of th2 configuration. And in future it can be useful for possible debug.

| Tool    | Version         |
| ------- | --------------- |
| Docker  | 19+             |
| kubectl | 1.19.x - 1.20.x |
| Helm    | 3+              |
| cqlsh   |                 |


## Running fundamental system

You have several variants how to run Kubernetes and Cassandra clusters:
- Run it as it supposed to be
- Run it within Docker container

<recommendations :items="install_variants" ></recommendations>
