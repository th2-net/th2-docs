---
title: Architecture
weight: 0
---

This page provides an overview of the th2 architecture 
along with a high-level summary of its main components.

<!--more-->

The [th2 test automation toolkit](https://github.com/th2-net) is designed as a set of 
microservices, built out of a number of repositories. The 
most up-to-date schema of the th2 dependencies is provided [here](https://github.com/th2-net/th2-documentation/wiki/th2-Map#th2-dependencies). 
Additional information on the th2 architecture and configuration 
details can be found in README files in the corresponding repositories.

![](/img/fundamentals/th2-intro.png)

## Boxes

The best analogy to describe the modular nature of th2 is a 
construction set: the toolkit provides you with a 
number of components that you can use to custom-build 
your own testing system. These components are called **boxes**.

There are two types of th2 boxes:

1. **Core** - stores main configuration for schema environments. Core components create and control these environments. Core connects to the data store from inside schema environments.  
2. **Modules** - contain custom logic (e.g. connection between client and system, analyzers, client and exchange simulators).


## Infrastructure

th2 allows you to control a lot of schema environments for 
different testing logic. th2-infra components (part of the **core**) 
are the components for creating, changing and deleting schema 
environments. th2 also has an interface to perform these actions manually.

![](/img/fundamentals/th2-infra-1.png)

## Schema environment

There are two types of schema environment components:

1. **Core components** contain:
   - Events and messages store (events and messages that are produced by the whole environment);
   - Components for accessing data;
   - GUI to display events and messages.
2. **Modules** - components of this type are responsible for any custom 
logic (e.g. connection between client and system, analyzers, client 
and exchange simulators).

![](/img/fundamentals/th2-infra-2.png)

## More about infrastructure

Along with th2-infra components, th2 infrastructure leverages the following open-source solutions:

1. [Helm Operator](https://docs.fluxcd.io/projects/helm-operator/) - a Kubernetes operator, allowing one to declaratively manage Helm chart releases. th2 uses this component to create/edit/delete schema environments.
2. [RabbitMQ](https://www.rabbitmq.com/) - one of the most popular open-source message brokers. The th2 components use RabbitMQ to send and receive messages.
3. [Apache Cassandra](https://cassandra.apache.org/_/index.html) - a NoSQL distributed database. th2 uses Cassandra to store the history of events and messages.
4. [Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) - a web-based Kubernetes user interface. Here you can track Kubernetes objects and their hardware usage.
5. [Grafana](https://grafana.com/grafana/) - flexible dashboard for any data. Here you can track the state of your system and customize views.
6. [Prometheus](https://grafana.com/docs/grafana/latest/getting-started/getting-started-prometheus/) - an open-source monitoring system for which Grafana provides out-of-the-box support.
7. [Grafana Loki](https://grafana.com/oss/loki/) - a horizontally-scalable, highly-available, multi-tenant log aggregation system.

After a new th2 schema environment is configured, it automatically 
connects to RabbitMQ, Cassandra, Dashboard, and Grafana services. 
The configuration for this is stored in the `th2-infra` repository.

![](/img/fundamentals/th2-infra-3.png)

## Interaction with th2

There are several ways to interact with th2:

1. Kubernetes Dashboard;
2. Grafana;
3. th2 Report GUI for each schema environment;
4. th2 Infra Editor;
5. RabbitMQ dashboard.

th2 uses [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/) to provide an access to these web apps through HTTP.

![](/img/fundamentals/th2-infra-4.png)
