---
title: Quick th2 setup
weight: 0
schema_links:
  - title: Publish infra schema
    href: ../getting-started/install-th2/2-infra-schema
install_links:
  - title: Deploy th2
    href: ../getting-started/install-th2/3-th2
---

This page is about how to setup small limited Kubernetes cluster with th2 for trial purposes.

<!--more-->

In this case fundamental system for th2 will be run in Docker containers. It is easier to configure and control. 


<notice note>

We would not recommend this approach for production systems. But you still can use it for demo purposes.

</notice>

## Kubernetes cluster

### Install minikube

Minikube runs a Kubernetes cluster inside a container. 
It is easier to configure than a common Kubernetes cluster, but it cannot be expanded to several nodes. 
See the instructions for installation [here](https://minikube.sigs.k8s.io/docs/start/).

### Run cluster

The th2 modules will run on the Kubernetes [cluster](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-cluster).

With minikube it is possible to specify a version of a Kubernetes cluster before running it.

```shell
minikube start --kubernetes-version v1.19.14
```

## Cassandra cluster

Download and run Docker container with Cassandra:

```shell
docker run --name th2-storage \
  -p "0.0.0.0:9042:9042" \
  -v "$HOME/cassandra:/var/lib/cassandra" \
  -d "bitnami/cassandra:latest"
```


## th2-infra-schema

th2-infra-schema deployment is the same as in full-fledged th2 version:

<recommendations :items="schema_links"></recommendations>

## Deploy th2

th2 installation into Kubernetes cluster is very similar to standard instructions, but there are some differences.

<recommendations :items="install_links"></recommendations>

1. Whenever you want to create folders for PersistentVolume and PersistentVolumeClaim, do it via `minikube ssh`.
2. When you define Cassandra hostname in `service.values.yaml`, set it as `host.minikube.internal` for Cassandra on localhost.
