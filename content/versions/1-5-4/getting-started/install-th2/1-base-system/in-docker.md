---
title: Installation via Docker
weight: 3
---

Fundamental system for th2 can be runned in Docker containers. It is easer to configure and control. 

<!--more-->

<notice note>

We would not recommend this approach for production systems. But you still can use it for small configurations or demo purposes.

</notice>



## Kubernetes cluster

### Install minikube

Minikube runs a Kubernetes cluster inside a container.
It is easier to configure than common Kubernetes cluster,
but it cannot be expanded to several nodes.
See the [installation instructions](https://minikube.sigs.k8s.io/docs/start/)
in the official minikube documentation.

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


