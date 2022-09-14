---
title: infra-mgr
weight: 10
inner-title: th2-infra-mgr
repo_owner: th2-net
repo: th2-infra-mgr
related:
  - name: "th2-net/th2-infra"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-infra"
--- 

**infra-mgr** (th2 Infrastructure manager) is one of the th2 [infra components](../infra-components). 
It is installed alongside with the th2 framework infrastructure. 
Basically, **infra-mgr** is the one of middle steps of interaction between user and Kubernetes cluster in building system for tests.

<!--more-->

## Functionality

The th2 infra components control all infrastructure of th2 environments, from RabbitMQ exchanges to Kubernetes Pods.  
As for **infra-mgr**, it interacts with the **infra-schema**, **infra-editor**, and with Kubernetes cluster during process of changing th2 environment. 

[![img](/img/boxes/exactpro/infra-mgr/infra-mgr-functionality.png)](https://www.plantuml.com/plantuml/png/VP71QiCm38RlUWgTDXYai5qsnYY5ibFPfTVIWs8hYMbi5rc1zUsdrApPO2mNnvy-IJzuKvH4fpZ2o9sYPfJG3ue-23iDEG4ST7XgGkg46lP1i-3RtPcJ2-FwY5ImmfzQxAiZ9QVg684kZvu5Yniu4XvWyIk2nZveyoSNS5aOVBWc80b6nf1E1Mxp6vTJ5_hLnP8V0UocaaVSJIrBOhK6yAJKKc7SKYcKl110pOgDD6kSKxxYkn6i0M0cpMIbUhVgdid_WRSvHcjp0wMU2rJ3X6MzIH-Kg6TC5BcSoN7vLzlkxnVXbjXM2PCodlXIXpm0f6oWpQevOkuM6H1ttngICBfhhqShj1Vy_JuXpG0VLyzepNQ-0DivpuQD_Krn_080)

**infra-mgr** receives necessary information about th2 environment from an **infra-schema** which describes a target state of cluster via a set of `.yaml` config files.

Also, there is **infra-editor**, which can be called visualization of **infra-mgr**. **infra-editor** is a web based GUI for working with th2 state. 
When user saves new state in GUI, it firstly changes **infra-schema** and then, processes go like **infra-schema** was changed manually.

### Infra schema

**infra-mgr** continiously reads **infra-schema** for updates. 
Also it can apply changes to the **infra-schema**, in some configuration cases.

### Kubernetes cluster

Depending on the configuration for th2 environment, **infra-mgr** can commit 3 types of actions in the Kubernetes cluster:

1. Create namespace for each th2 environment;
2. Create basic ConfigMaps for th2 environment;
3. Apply th2 Custom Resources which will be caught by **infra-operator**;
4. Delete existing namespaces, Deployments, Pods.

### Cassandra

When new th2 environment is created, **infra-mgr** creates special config map for the Cassandra database. 
Then with config map created **estore** or **mstore** creates new keyspace in the Cassandra database for storing messages and events. 

<notice info>

**infra-mgr** creates keyspaces directly on Cassandra only in th2 of versions 1.7 and 1.8.

</notice>

## Configuration

**infra-mgr** can be configured on the th2 cluster level and th2 environment level.

### th2 cluster

Settings for **infra-mgr** should be defined in the section of special config map, which is applied during th2-infra installation to the Kubernetes cluster.

Example provides default values for configuration.

```yaml
# service.values.yaml
# ...
infraMgr:
  image:
    repository: ghcr.io/th2-net/th2-infra-mgr
    tag: 1.1.1
  git:
    secretName: infra-mgr
    privateKeyFileSecret: infra-mgr
    secretMountPath: /home/service/keys
    repository: git@github.com:th2-net/th2-demo-configuration.git
    repositoryLocalCache: /home/service/repository
    httpAuthUsername: "" #should be stored in secret th2-git-access-schemas 
    httpAuthPassword: "" #should be stored in secret th2-git-access-schemas
  rabbitmq:
    vHostPrefix: th2-
    usernamePrefix: th2-user-
    secret: rabbitmq
    passwordLength: 24
  cassandra:
    keyspacePrefix: schema_
    secret: cassandra
  kubernetes:
    namespacePrefix: "th2-" # must be not more than 5 symbols
    ingress: ingress-rules
    configMaps:
      logging: logging-config-template
      rabbitmq: rabbit-mq-app-config
      rabbitmq-ext: rabbit-mq-external-app-config
      cassandra: cradle
      cassandra-ext: cradle-external
      prometheus: prometheus-app-config
    secrets:
    - th2-core 
    - th2-solution
    - th2-proprietary
# ...
```

### Git authorization

**infra-mgr** supports several ways of authorization on the git service:

1. SSH key (default) - private SSH key should be stored in the special Kubernetes secret. With this key app is authorized on the git service.
2. HTTP credentials - fill appropriate fields to authorize on the git service with your login and password.
3. Personal access token - to authorize with your PAT, put it to `httpAuthUsername` field for GitHub or to  `httpAuthPassword` field for GitLab.

### th2 environment

`infra-mgr-config.yml` is a setting file, in which you configure synchronization type between Git and Kubernetes. 
There are 4 synchronization options:

1. `off` - No synchronization will be done;
2. `deny` - No synchronization will be done and associated namespaces will be removed from Kubernetes;
3. `sync` - Synchronizes repository changes with Kubernetes;
4. `rule` - Synchronizes repository changes with Kubernetes, watches resource changes in it and brings those changes back to the repository state.

<notice info>

Configuration is done in `infra-mgr-config.yml` for each th2 environment. 

</notice>

```yaml
# infra-mgr-config.yml
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
