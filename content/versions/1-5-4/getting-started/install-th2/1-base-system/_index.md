---
title: 1. Set up the environment
chapter: true
weight: 0
install_variants:
  - title: Basic installation
    href: ./1-base-system/basic
    icon: mdi-hand-back-left-outline
  - title: Install via Docker
    href: ./1-base-system/in-docker
    icon: mdi-docker
---
# 1. Set up the environment
Install Kubernetes and Cassandra clusters to use it as fundamental system for th2.


<!--more-->

## Fundamental system

Th2 is running over Kubernetes and Cassandra clusters.

Kubernetes is needed as environment for th2 components. Th2 is microservices framework, so any component of th2 is some piece of logic, no more. With Kubernetes all pieces of th2 logic can be freely created, desctroyed, updated.

Cassandra plays role of data storage for th2. It is NoSQL distributed database with high performance. So the storage is quite flexible for your needs.

## Tools

Independetntly of how you are going to run fundamental system, you will need some tools to interact with it. Interaction with Cassandra and Kubernetes is really needed for the process of th2 configuration. And in future it can be useful for possible debug.

| Tool    | Version         |
| ------- | --------------- |
| Docker  | 19+             |
| kubectl | 1.19.x - 1.20.x |
| Helm    | 3+              |
| cqlsh   |                 |

### Docker CE v19+

Docker is the most popular open-source application containerization technology.
The th2 services will run inside separate Docker containers.

To install the Docker, follow the [official guide](https://docs.docker.com/engine/install/). Upon installation, you will need to [configure Docker](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker) for Kubernetes.

### kubectl

Kubectl is a command line interface for interacting with the Kubernetes cluster.

Installation instructions are given on the [Kubernetes website](https://kubernetes.io/docs/tasks/tools/#kubectl).

### Helm 3+

Helm is a package manager for Kubernetes used to deploy required modules to a Kubernetes cluster.

[Official installation guide](https://helm.sh/docs/intro/install/).

### cqlsh

`cqlsh` is the command line interface, that provides you with an access to the Cassandra database.

It based on the Python, so you need to install this programming language as well. And then you install `cqlsh` with `pip`.

```shell
pip install cqlsh
```

Also `cqlsh` can be installed with Cassandra in bundle.

## Running fundamental system

You have several variants how to run Kubernetes and Cassandra clusters:
- Run it as it supposed to be
- Run it within Docker container

<recommendations :items="install_variants" ></recommendations>
