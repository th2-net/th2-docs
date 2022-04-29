---
title: Infra components
weight: 0
---

## Basics

Infra components are the main part of the `th2-core`, one of the components of the
th2 itself. While schema environments are responsible for testing your system, 
infra components provide control over these environments. Also it contains 
configuration for future environments to interact with other infrastructure 
components (Grafana, Cassandra, RabbitMQ). Infra components provide system 
operation and monitoring and interaction between other parts of th2. Infra 
components transform branches in Git into namespaces in the Kubernetes cluster.

![](/img/fundamentals/infra/infra-comp-1.png)

## Components

There are 5 Infra components:

1. `th2-infra-schema` - a special repository that contains schema configurations, acting as a config files storage that works via Git;
2. `th2-infra-mgr` watches for changes in the repositories and deploys changed components to Kubernetes; 
3. `th2-infra-operator` - an implementation of Kubernetes custom resource controller;
4. `th2-infra-editor` - web GUI for schema control;
5. `th2-infra-repo` - abstract chart used by helm operator (the element is hidden in the diagram below)

## Components interactions

![img.png](/img/fundamentals/infra/infra-comp-2.png)

### Edit infra-schema

You have 2 ways to edit your `th2-infra-schema`:

1. Git-based - by commiting changes directly into your `th2-infra-schema`
2. GUI-based - by interacting with `th2-infra-editor` (special Graphical User Interface)

### infra-editor and infra-mgr interaction

`th2-infra-editor` get information about current state of 
`th2-infra-schema` from `th2-infra-mgr`, displays it for Operator 
using web GUI, and allows Operator configure environment via 
sending changes to `th2-infra-mgr`.

### Reading-editing infra-schema by infra-mgr 

`th2-infra-mgr` can check `th2-infra-schema` repository and store its state in the cache.

Also `th2-infra-mgr` can change `th2-infra-schema` repository.

### infra-mgr and infra-operator interaction

`th2-infra-mgr` sends Kubernetes cluster changes to `th2-infra-operator` in 
order to create/change/delete th2 components using `helm-operator`.

## Installation

You can deploy all `th2-infra` components as one Helm release:

```shell
helm repo add th2 https://th2-net.github.io
helm install -n service --version=<version> th2-infra th2/th2 -f configuration.yaml -f secrets.yaml
```

## Configuration

`th2-infra` release can be configured at initialization only with config files.

### th2-infra configuration

Short configuration:

```yaml[service.values.yaml]
infraMgr:
  git:
    repository: git@github.com:th2-net/th2-infra-demo-configuration.git

rabbitmq:
  prometheus:
    operator:
      enabled: false
  persistentVolume:
    enabled: true
    storageClass: local-storage
    size: 10Gi

cassandra:
  internal: false
  host: <cassandra-host>
```

Full configuration:
```yaml[service.values.yaml]
# Image repositories and credentials to create pull secrets
productRegistry:
  secret: th2-core
  name:
  username:
  password:

solutionRegistry:
  secret: th2-solution
  registry:
  username:
  password:

ingress:
  host:

externalRabbitMQHost:
  host: localhost

infraEditor:
  image:
    repository: ghcr.io/th2-net/th2-infra-editor
    tag: 1.0.65

infraRepo:
  image:
    repository: ghcr.io/th2-net/infra-repo
    tag: 0.6.0

infraOperator:
  prometheusConfiguration:
    enabled: true
  image:
    repository: ghcr.io/th2-net/th2-infra-operator
    tag: 3.2.8
  config:
    chart:
      # external mirror
      # repository: https://th2-net.github.io
      repository: http://infra-repo:8080
      version: 0.6.0
      name: infra-operator-tpl
    namespacePrefixes:
      - "th2-"
    k8sUrl: "<kubernetes-external-entrypoint>"
    rabbitMQManagement:
      #      host: "rabbitmq-discovery.service.svc.cluster.local" - deprecated. host is taken from rabbitmq config
      port: "15672"
      username: "th2"
      password: "${RABBITMQ_PASS}"
      persistence: true
      schemaPermissions:
        configure: ""
        read: ".*"
        write: ".*"

infraMgr:
  prometheusConfiguration:
    enabled: true
  image:
    repository: ghcr.io/th2-net/th2-infra-mgr
    tag: 1.2.9
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

# If service not internal - ExternalName service will be created, credentials will be mapped to secrets / config maps
# otherwise service will be deployed as a chart dependency
rabbitmq:
  internal: true
  rabbitmqMemoryHighWatermark: 1024MB
  #it is not required if the service internal
  #  host: ""
  fullnameOverride: rabbitmq
  rabbitmqVhost: th2
  rabbitmqUsername: th2
  # will be generated if empty
  rabbitmqPassword: ""
  rabbitmqErlangCookie: ""
  rabbitmqExchange: th2-exchange
  replicaCount: 1
  podAntiAffinity: hard
  persistentVolume:
    enabled: true
    storageClass: local-storage
    size: 10Gi
  livenessProbe:
    exec:
      command:
        - /bin/bash
        - -ec
        - rabbitmq-diagnostics -q check_running
    initialDelaySeconds: 120
    timeoutSeconds: 20
    periodSeconds: 30
    failureThreshold: 6
    successThreshold: 1
  readinessProbe:
    exec:
      command:
        - /bin/bash
        - -ec
        - rabbitmq-diagnostics -q check_running
    initialDelaySeconds: 10
    timeoutSeconds: 20
    periodSeconds: 30
    failureThreshold: 3
    successThreshold: 1
  service:
    type: "NodePort"
    amqpNodePort: 32000
  rabbitmqPrometheusPlugin:
    enabled: true
  prometheus:
    exporter:
      enabled: false
    operator:
      enabled: true
      alerts:
        enabled: true
      serviceMonitor:
        selector:
          release: prometheus

# If service not internal - ExternalName service will be created, credentials will be mapped to secrets / config maps
# otherwise service will be deployed as a chart dependency
cassandra:
  internal: true
  #it is not required if the service internal
  #  host: ""
  fullnameOverride: cassandra
  cluster:
    datacenter: dc1
  dbUser:
    user: th2
    # will be generated if empty
    password: ""
  keyspace: cradle
  persistence:
    enabled: false
    storageClass: local-storage
    size: 50Gi
```

### Credentials for service integration

```yaml[secrets.yaml]
# reguired only for images from a private registry, will be attached as the first PullSecret to deployments
#productRegistry:
#  username: user
#  password: password
#  name: private-registry-1.example.com # core components registry

# reguired only for images from a private registry, will be attached as the second PullSecret to deployments
#solutionRegistry:
#  username: user
#  password: password
#  name: private-registry-2.example.com # components registry

# reguired only for images from a private registry, will be attached as the third PullSecret to deployments
#proprietaryRegistry:
#  username: user
#  password: password
#  name: private-registry-3.example.com # components registry

cassandra:
# set credentials for existing Cassandra cluster
  dbUser:
    user: <user-name>
    password: <password>

rabbitmq:
# set admin user credentials, it will be created during deployment
  rabbitmqUsername: th2
  rabbitmqPassword: rab-pass
  # must be random string
  rabbitmqErlangCookie: cookie
```
