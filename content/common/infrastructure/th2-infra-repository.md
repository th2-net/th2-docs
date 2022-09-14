---
title: th2-infra
weight: 0
related:
  - name: "th2-net/th2-infra"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-infra"
---

[th2-infra](https://github.com/th2-net/th2-infra) is a repository containing a set of charts and values for the deployment of infrastructure components. 
Also, it provides monitoring capabilities that are technologically supported by a number of third-party open-source solutions:

<!--more-->

1. [Helm Operator](https://docs.fluxcd.io/projects/helm-operator/) – a Kubernetes operator, allowing one to declaratively manage Helm chart releases. The th2 uses this component to create/edit/delete schema environments.
2. [RabbitMQ](https://www.rabbitmq.com/) – one of the most popular open source message brokers. The th2 components use RabbitMQ to send and receive messages.
3. [Apache Cassandra](https://cassandra.apache.org/_/index.html) – a NoSQL distributed database. The th2 uses Cassandra to store the history of events and messages.  
4. [K8s Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) – a web-based Kubernetes user interface. Here you can track Kubernetes objects and their hardware usage.
5. [Grafana](https://grafana.com/grafana/) – flexible dashboard for any data. Here you can track the state of your system and customize views.
6. [Prometheus](https://grafana.com/docs/grafana/latest/getting-started/getting-started-prometheus/) – an open source monitoring system for which Grafana provides out-of-the-box support.
7. [Grafana Loki](https://grafana.com/oss/loki/) – a horizontally-scalable, highly-available, multi-tenant log aggregation system.

After any new schema environment is being configured, it automatically connects to RabbitMQ, Cassandra, Dashboard, and Grafana.  
The configuration supporting this is stored in the [th2-infra](https://github.com/th2-net/th2-infra) repository.

![](/img/fundamentals/th2-infra-3.png)

## Interaction with th2

Interaction with th2 can be done via:
1. K8s Dashboard;
2. Grafana;
3. th2 Report GUI for each schema environment; 
4. Infra Editor; 
5. RabbitMQ dashboard.

th2 uses [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/) to provide access to these web applications via HTTP.

![](/img/fundamentals/th2-infra-4.png)
