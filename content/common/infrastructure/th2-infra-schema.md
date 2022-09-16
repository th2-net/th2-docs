---
title: th2-infra-schema
weight: 5
related:
  - name: "th2-net/th2-infra"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-infra"
  - name: "th2-net/th2-infra-schema-demo"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-infra"
---

th2 allows you to create your own Kubernetes-based microservices architecture without a prerequisite of profound knowledge of Kubernetes itself. 
All you need is install th2 and define components of your own system with YAML manifests in the **infra-schema** repository.

<!--more-->

**infra-schema** is one of the main components of th2. 
It is a repository, which defines your testing system architecture, boxes and connections inside it.

Repository structure:
- 📁 boxes
- 📁 dictionaries
- 📁 links
- 📁 core
- 📄 infra-mgr-config.yml

## Boxes

`boxes` folder contains configuration for components of `modules` group. 
The configuration files are Custom Resource manifests for Kubernetes. 
th2 provides a number of <term term="Custom resource">Custom Resource</term> kinds, but for boxes configuration you will need only `Th2Box` kind.

You can see the structure of the manifest below.

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: demo-conn1
spec:
  image-name: ghcr.io/th2-net/th2-conn-fix
  image-version: 3.2.1 
  type: th2-conn
  custom-config: # Component custom config
  pins: # Array of pins
  extended-settings: # Low level settings for component
```

`apiVersion`, `kind`, `metadata` are the base fields for the Kubernetes object manifest. 
The real differences from usual manifests are in the `spec` field.

`image-name` is a link to the Docker image of the box in the registry.
`image-version` specifies the version of the image.

`type` and `custom-config` fields are specific to each box. 
You can find more information in the GitHub repository of the needed box.

`pins` are some kind of ports, that used for interaction with other components. 
More details on [pins](./th2-infra-schema/pins) and [links](./th2-infra-schema/links) can be found in corresponding documentation sections.

`extended-settings` defines low level configuration of the box (e.g. hardware limits).

```yaml
extended-settings:
  service:
    enabled: true
    type: NodePort
    endpoints:
      - name: grpc
        targetPort: 8080
        nodePort: 31179
  envVariables:
    JAVA_TOOL_OPTIONS: '-XX:+ExitOnOutOfMemoryError -XX:+UseContainerSupport -XX:MaxRAMPercentage=85'
  resources:
    limits:
      memory: 600Mi
      cpu: 200m
    requests:
      memory: 100Mi
      cpu: 50m
```

## Dictionaries

`dictionaries` folder contains manifests of `Th2Dictionary` kind. 
It contains `data` field, that you can fill with any static data you want.

If you want to use dictionary in the box, you should create a [dictionary link](./th2-infra-schema/links).

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Dictionary
metadata:
  name: fix50-generic
spec:
  data: |-
    Anything you want
```

## Links

`links` folder contains manifests for `Th2Link` kind. 
It is an entity for connecting pins. 
A full guide is available on the [Links](./th2-infra-schema/links) page.

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: links
spec:
  dictionaries-relation: # Array of links between box and dictionary
  boxes-relation: # Array of links between several boxes
    router-mq: # For connecting via RabbitMQ
    router-grpc: # For connecting via gRPC
```

## Core

`core` folder contains manifests for components, which is a part of the core of the *Schema Environment*. 

There are special kinds for these components:
- `Th2Estore` - box for events store
- `Th2Mstore` - a box for message store
- `Th2CoreBox` - any other box in core

These kinds help **infra-mgr** to identify the box definitions, and thus, are necessary for creating environments.

## Infra manager configuration

`infra-mgr-config.yml` defines the behavior of the **infra-mgr** with a current *Schema environment*.

It is also the manifest. There is a special `SettingsFile` kind for it.

The main field is `k8s-propagation`. It can contain one of four values:
- `off`  - no synchronization will be done 
- `deny` - no synchronization will be done and associated namespace will be removed from Kubernetes
- `sync` - synchronizes repository changes with Kubernetes
- `rule` - synchronizes repository changes with Kubernetes and watches resource changes in Kubernetes and brings them back to repository state

![infra-mgr behaviour](/img/infrastructure/mgr-behaviour.png)

Full `infra-mgr-config.yml` configuration:

```yaml
kind: SettingsFile
metadata:
  name: infra-mgr-config
spec:
  k8s-propagation: off
  th2BoxConfig:
    logging:
      logLevelTh2: INFO
      logLevelRoot: INFO
    mqRouter:
      connectionTimeout: "-1"
      connectionCloseTimeout: "10000"
      maxRecoveryAttempts: "5"
      minConnectionRecoveryTimeout: "10000"
      maxConnectionRecoveryTimeout: "10000"
      prefetchCount: "10"
    grpcRouter:
      workers: "5"
    cradleManager:
      cradleMaxEventBatchSize: "1048576"
      cradleMaxMessageBatchSize: "1048576"
      timeout: "5000"
      pageSize: "5000"
```

Possible `logLevel` values:
- `OFF`
- `FATAL`
- `ERROR`
- `WARN`
- `INFO`
- `DEBUG`
- `TRACE`
- `ALL`

`mqRouter` fields mostly configures retry functionality. 
The `prefetchCount` field specifies the number of messages to be read from RabbitMQ.
<notice info >

Higher values increase the throughput, but set higher memory requirements

</notice >
