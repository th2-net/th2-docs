---
title: th2-infra components
weight: 5
---

th2-infra components are the main part of the **th2-core**, one of the components of the th2 itself. While th2 environments are responsible for testing your system, the infra components provide control over these environments. 

<!--more-->

Infra components are the intermediate layer between user and Kubernetes cluster. This layer changes th2 environments in accordance with the state of the **th2-infra-schema**.

![](/img/fundamentals/infra/infra-comp-1.png)

## Components

There are 5 Infra components:

1. **[th2-infra-schema](https://github.com/th2-net/th2-infra-schema-demo)** - a special repository that contains schema configurations, acting as a config files storage that works via Git.
2. **[th2-infra-mgr](https://github.com/th2-net/th2-infra-mgr)** watches for changes in the repositories and deploys changed components to Kubernetes. 
3. **[th2-infra-operator](https://github.com/th2-net/th2-infra-operator)** - an implementation of Kubernetes custom resource controller.
4. **[th2-infra-editor](https://github.com/th2-net/th2-infra-editor)** - web GUI for schema control.
5. **th2-infra-repo** - abstract chart used by helm operator (the element is hidden in the diagram below).

## Components interactions

![img.png](/img/fundamentals/infra/infra-comp-2.png)

### Edit infra-schema

You have 2 ways to edit your **th2-infra-schema**:

1. Git-based - by committing changes directly into your **th2-infra-schema**.
2. GUI-based - by interacting with **th2-infra-editor** (special Graphical User Interface).

### infra-editor and infra-mgr interaction


**th2-infra-editor** gets information on current state of **th2-infra-schema** from **th2-infra-mgr**, displays it for user using web GUI, and allows them to configure environment via sending changes to **th2-infra-mgr**.

### Reading-editing infra-schema by infra-mgr 

**th2-infra-mgr** can check **th2-infra-schema** repository and store its state in the cache.

Also, **th2-infra-mgr** can change **th2-infra-schema** repository.

### infra-mgr and infra-operator interaction

**th2-infra-mgr** applies <term term="Custom Resource">Custom Resources</term> from **th2-infra-schema** to the Kubernetes cluster. **th2-infra-operator** watches over the new <term term="Custom Resource">CR's</term> and creates/changes/deletes th2 components using `helm-operator`.

## Data transformation

There is dependency between the types of data in **th2-infra-schema** and what will be created in the cluster.

| **th2-infra-schema** repository                                                       | Kubernetes cluster                                                             |
|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Git branch                                                                            | th2 environment (Kubernetes namespace + Cassandra keyspace + RabbitMQ VHost)   |
| `Th2Box`, `Th2CoreBox`, `Th2Estore`, `Th2Mstore` <term term="Custom Resource"></term> | Kubernetes <term term="ConfigMap"></term>, Kubernetes <term term="Pod"></term> |
| `Th2Link` <term term="Custom Resource"></term>                                        | Queues in RabbitMQ                                                             |
| `Th2Dictionary` <term term="Custom Resource"></term>                                  | Kubernetes <term term="ConfigMap"></term> (saved in encoded format)            |

## Scenarios 

All the infra components are created to work as one system for **th2-infra-schema** `=>` th2 environment interpretation.

There are several scenarios for the infra components.

<!-- Plantuml code is ciphered inside link -->
<!-- To see plantuml code, go to a link in browser and change '/png/' to '/uml/' in the path -->

1. Create new schema with **th2-infra-editor**  
  The schema is edited manually by default, but you can change it with **th2-infra-editor** Web GUI.

[![Create new schema with th2-infra-editor](/img/fundamentals/infra/new-schema.png)](https://www.plantuml.com/plantuml/png/RP0zIy0m48Rt_8gRt5AmRaLAqTt5iNGuqgi9v4CkL_htlPeMHLmol7dkdfURgY3BdgAH897WbGc58DC1rNbA24SG3-9x6_B6Q6aDKjYO-My4pm-Vb5s8um9OeOM_iVJH6AubDqOJivMu4j-osVpmBJABGNUktokfzdp1iXqlmG2FtLtwJKk_jw6habLE9GFq_q5d8HiLQQO1dhhlxnV6x3niN18ahABUYVAgH_e2)

2. Create th2 environment from **th2-infra-schema** branch

[![Create th2 environment from th2-infra-schema branch](/img/fundamentals/infra/new-schema.png)](https://www.plantuml.com/plantuml/png/TP5BZnCn48Jl_XMjFS0f5hky8nIjDa820P5s471079oPdjYI7r6x7H27_UthUSWp4srkIVTNrJNbsyYAE3ahBBOC783CGJCqXh1c4xnWmnPXIwWOWVKDe3yP2jwXPsWfk6wuChubjOgrHgTWJyhNMeZVqyOT23uyEoB5u3T_G4N8apaGyavne7ut_ic0HkkMErsMRR0D4boTtx_giE6dg8Dd2XQ-f3sIHyPOHfNQxmr_knUY2_UG7ZQZ2DRmIt6jeGq4Mwty8Ql6gnbiCZZPPVYhYOn-e2j8nqPrP_IaI0l5A72zu1DQLw555R4enHX3Dd83NROrN4lOuL-uwuk5ZoVqtATUhSwot4Zux0qRPSr_XE-3qKuvZ4TLuzEQbt9uti9lg-THp12PvAQyoHfUoUax0Viiux8tByMkuNLn_gb3l8YzoLZmhJaaGhXFc30kqNbvRoNyw4_FkrkapM7rbFQTVA9aeI_wlo-PPvuxnUQ4K64CYMfSj7DkSFsYEDo5VvczHTyaPny1)

3. Update th2 environment

[![Update th2 environment](/img/fundamentals/infra/update-env.png)](https://www.plantuml.com/plantuml/png/TP7BpjCm58JtVegZBc0LIvHxXAAAWeG4L6eGOe5OkCb9RCcNoZukiEcpuwJ1IQh_toMUcS-JoIwGy1IDPXex0dBWLIy9MkMn8UKi8qKQuVkv5OH0SWjeByexQz0IOp_JIQ5ivqLXUW_ldfpH1sUhNo02f9EbmILDaFEZDhqaWqHjrfhCOkTqYnusCoGq4etO3BRR8skS9UyqV8udz1O9GpwgnUcawEkHiQ7SDLwhAGGb_13KIEYSXxqKja-fVEtDEVDA-A82eHdTdrBT6ZMAW137LGARW-qg25FItkwfSu1DDNZBgs6cP7p6uO2_OU-CKGGVByEyWr8KTyGj__ytlesGn7qQsCB28w_olYKyv_FDW2Dt4aTu7gc45vbyZ1Wnf3AsK_tQlfpbPGuiLbbLIKtaNEKLVs0-9X_blyxy1VCWI5qGQWmk-WPNdtuFUCEJh_6O41EfXVVk3uOyxTBzbiC7r3XuhSM08GZ_T_BlqBRHw7y0)

4. Delete th2 environment

[![Delete th2 environment](/img/fundamentals/infra/delete-env.png)](https://www.plantuml.com/plantuml/png/TP9FZzCm4CNl_XIZFS0f5bt-HoXQ5f2GW9Ks23WW3cuogItvJsMF8qxzx3YfwoOLlRKpl_VcvILtWOIdQ3JJE12G0wzsag1N7ZjIpZ9If14-eaP287aBQ4VbdJLeYR7VQL8fEtXHcPs7Tq_sw8EppHyG0T9a2RYq4-JylCj_4Y1Hc_LEbkNWT8yURiucePDenCs47N-opbdoJiENk4LlaJ2KKIksMqNV7XcRmXtYeSaYgE6Ne4x2u3nyaCBkaggSdSc5NmrVLI0qC_qPjMbHemW8ST-BwTvPsA-4a9NsUASj0fPZy9utKqq9tF1JoVTUs1JjqpWrF2shwiBqjh3VPvza_JIm1S8ZRqh5DJpdYJX9SFRDozcyz5J3Y-By635YkCQzBDnFwSBARjtSAmuj6ZVYihXLr9HKdgE-vaimQtDcUVNA6mu_vcgNFJq8KkDa4Lpq7QuAkZHuMvxdlTPmx_vYADKlkSspL6N-kX9r52bd_mzlBj_JWp0Ozg93TeUsZqR_0m00)

## Installation

You can deploy all **th2-infra** components as one Helm release:
 
```shell
helm repo add th2 https://th2-net.github.io
helm install -n service --version=<version> th2-infra th2/th2 -f configuration.yaml -f secrets.yaml
```

## Configuration

All the th2-infra components are deployed within `th2-infra` Helm release. So these components can be configured at initialization only with provided config files.

### th2-infra configuration

Short configuration:

```yaml
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

<spoiler title="Full configuration">

All the provided values are default. 

```yaml
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
</spoiler>

### Credentials for service integration

```yaml
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
