---
title: 1. Set up the environment 
weight: 0
read_before:
  - title: th2 software requirements
    icon: mdi-alert-circle-outline
    href: ../../getting-started/requirements/software
install_variants:
  - title: Basic installation
    href: ./1-base-system/basic
    icon: mdi-hand-back-left-outline
---

Install Kubernetes and Cassandra clusters to use them as a fundamental system for th2.


<!--more-->

## Fundamental system

th2 is running over Kubernetes and Cassandra clusters.

Kubernetes is needed as an environment for th2 components. th2 is a microservices framework, so any component of th2 is a piece of logic, no more. With Kubernetes all the pieces of the th2 logic can be freely created, destroyed, and updated.

Cassandra plays role of data storage for th2. It is a NoSQL distributed database with high performance. So the storage is quite flexible for your needs.

## Common tools

Independetntly of how you are going to run the fundamental system, you will need some tools to interact with it. Interaction with Cassandra and Kubernetes is needed for the process of the th2 configuration. It can also be useful for possible debugging.

| Tool    | Version         |
| ------- | --------------- |
| Docker  | 19+             |
| kubectl | 1.19.x - 1.20.x |
| Helm    | 3+              |
| cqlsh   |                 |


## Running fundamental system

You have two options on how to run Kubernetes and Cassandra clusters:
- Run it as it supposed to;
- Run it within the Docker container.

<recommendations :items="install_variants" ></recommendations>
