---
title: Installation via Docker
weight: 3
continue_learning:
  - title: Publish infra schema
    href: ../2-infra-schema
---

The fundamental system for th2 can be run in Docker containers, so it is easer to configure and control. 

<!--more-->

<notice note>

We would not recommend this approach for production systems. You can use it for demo purposes.

</notice>



## Kubernetes cluster

### Install minikube

Minikube runs a Kubernetes cluster inside the container. It is easier to configure than common Kubernetes cluster, but it cannot be expanded to several nodes. See the instructions for installation [here](https://minikube.sigs.k8s.io/docs/start/).

### Run cluster

The th2 modules will run on the Kubernetes [cluster](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-cluster).

With the minikube it is possible to specify a version of a Kubernetes cluster before running it.

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


