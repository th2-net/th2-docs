---
title: Basic installation
weight: 2
image: /img/getting-started/th2-env-schema/Demo-cluster-components-full-schema.drawio.png
continue_learning:
  - title: Publish infra schema
    href: ../2-infra-schema
use_cases_link:
  - title: th2 use cases
    icon: mdi-cog
    href: ../../requirements/hardware
clusters_link:
  - title: Run Kubernetes cluster
    icon: mdi-kubernetes
    href: ../../requirements/software#th2-node
  - title: Run Cassandra cluster
    icon: mdi-database
    href: ../../requirements/software#apache-cassandra-node
---

There you can find links and recommendations for installation of Kubernetes and Cassandra clusters without unnessesery abstractions. We recommend this option for production system.

<!--more-->

You can find some th2 use cases with provided machines listing.

<recommendations :items="use_cases_link"></recommendations>

## Run Kubernetes and Cassandra clusters

Run Kubernetes and Cassandra clusters with instructions given in th2 software requirements:

<recommendations :items="clusters_link"></recommendations>

