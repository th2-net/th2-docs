---
title: Basic installation
weight: 2
image: /img/getting-started/th2-env-schema/Demo-cluster-components-full-schema.drawio.png
---

There you can find links and recommendations for installation of Kubernetes and Cassandra clusters without unnessesery abstractions. We recommend this option for production system.

<!--more-->

You can find some th2 use cases with provided machines listing [here](../../requirements/hardware).

## Kubernetes cluster

### Install kubelet, kubeadm v1.19.x - 1.20.x

The [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) is a service that powers the Kubernetes.

[Kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/) is a set of tools for creating and managing a Kubernetes cluster.

Instructions for installing these tools can be found in the official Kubernetes [installation guide](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/).


### Run cluster

The th2 modules will run on the Kubernetes [cluster](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-cluster). Use the official [guide](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) to create a cluster.

## Cassandra cluster

To install Cassandra, follow the [guide](https://cassandra.apache.org/doc/latest/cassandra/getting_started/installing.html).

Also it is needed to:
- Create user with admin rights for th2
- Provide access to Cassandra database over network
