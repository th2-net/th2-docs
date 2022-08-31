---
title: infra-operator
weight: 15
inner-title: th2-infra-operator
repo_owner: th2-net
repo: th2-infra-operator
related:
  - name: "th2-net/th2-infra"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-infra"
--- 

**infra-operator** (from _th2 infrastructure operator_) is one of the components in the th2 infra components, which works with the current state of th2 system. It is installed along with the th2 framework infrastructure.

Basically, **infra-operator** is an implementation of Kubernetes custom controller. It ensures the synchronization between <term term="Custom resource">custom resources</term> in the Kubernetes cluster and the Helm releases in Kubernetes cluster. 

As the component’s name suggests, **infra-operator** monitors th2 custom resources in the Kubernetes cluster.

## Functionality

![img](/img/boxes/exactpro/infra-operator/main.png)

Being the component that interacts with schema environment, **infra-operator** has the following objectives:

- It monitors Kubernetes events related to the th2 <term term="Custom resource">Custom resources</term> and generates or modifies the corresponding Helm Releases.
- Based on the config map `rabbit-mq-app-config` which is deployed by **infra-mgr**, it creates Vhost in RabbitMQ for every schema namespace.
- For each Vhost it creates a user in RabbitMQ and configures its permissions.
- Based on the pins described in the custom resources it declares queues in RabbitMQ.
- It binds the queues in RabbitMQ according to `Th2Link` resources.
- Generates RabbitMQ configs for each resource that needs it.
- Generates [gRPC](https://grpc.io/docs/) configs for each resource that needs it.

Mostly, **infra-operator** communicates with other infra components using Kubernetes as an intermediary. All the interconnections are displayed on the diagram below.

[![img](/img/boxes/exactpro/infra-operator/operator-functionality.png)](https://www.plantuml.com/plantuml/png/XP0nQyCm48Lt_OgRsibBnr92e4kXJI66TWaTPFlP4aYw89qwvhTNDaLs0gNhlUyxlTC-YOwIlLCEev0mHJiPeS56z68vAB7YG2qx48yavg6nOOowuJEY5evAdTQXdo8ztPKaSTXzaKvK9YkmMajMLvmCdB_EJ0rx3XBPqMlk40C4gOvQtNLM3aUbAawNVDbjs4TwiqdWQIpP2vnluQ0JA9y7FUzQnU5Af5ypBEPpMmKr7zaqD-n11prX_f_2tjUr2rbxLkoOaV4Vz6auIOLktwpOvgYap9_qnr9_M_fTY_q6jKYSOr_aFSAGlVi1)

## Configuration

**infra-operator** can be configured on 2 levels:

1. On the level of infra components
2. Internal configuration

### Part of infra components

Settings for **infra-operator** should be defined in the section of special config map, which is applied during **th2-infra** installation to the Kubernetes cluster.

An example below provides default values for the configuration:

```yaml
# service.values.yaml
# ...
infraOperator:
  image:
    repository: ghcr.io/th2-net/th2-infra-operator
    tag: 3.1.3
  config:
    chart:
      repository: http://infra-repo:8080
      version: 0.4.3
      name: infra-operator-tpl
    namespacePrefixes: 
    - "th2-"
    k8sUrl: "<kubernetes-external-entrypoint>"
    rabbitMQManagement:
      host: "rabbitmq-discovery.service.svc.cluster.local" - deprecated. host is taken from rabbitmq config
      port: "15672"
      username: "th2"
      password: "${RABBITMQ_PASS}"
      persistence: true
      schemaPermissions:
        configure: ""
        read: ".*"
        write: ".*"
```

### Internal

The **infra-operator** configuration is given with the  `infra-operator.yml` file that should be on the classpath of the application. The configuration file itself must be created by the person responsible for installing th2 and filled with predetermined values. 

The template of the `infra-operator.yml` file is given below:

```yaml
# infra-operator.yml
# version 1.5.4

namespacePrefixes:
  - namespace-
  - prefixes-
# these prefixes are used to filter namespaces that infra-operator will manage as a schema

chart:
# this section includes information about git or helm repository as a source of helm charts
# you can specify either git or helm repository

  # git repository parameters 
  git: git@some.server.com:some/repository
  # git repository URL for helm charts used by Th2 Custom Resources
  
  ref: branch
  # branch for helm charts

  path: /path/to/charts
  # repository path for charts

  # helm repository parameters 
  repository: https://helm.server.com/some/repository
  # helm repository URL for helm charts used by Th2 Custom Resources

  name: components
  # the name of the Helm chart without an alias

  version: 3.2.0
  # the targeted Helm chart version

rabbitMQManagement:
  host: host
  # RabbitMQ host used for managing vHosts and users
  
  port: 8080
  # RabbitMQ port
  
  username: username
  # RabbitMQ management username
  
  password: password
  # password for management user
  
  persistence: true
  # determines if the RabbitMQ resources are persistent or not
  
  schemaPermissions:
  # this section describes what permissions schema RabbitMQ user will have on its own resources
  # see RabbitMQ documentation to find out how permissions are described

    configure: pattern
    # configuration permissions on resources
    
    read: pattern
    # read permission on resources
    
    write: pattern
    # write permission on resources
    
configMaps:
# this section contains names of the ConfigMaps that are mounted in the boxes

  rabbitMQ: rabbit-mq-config-map
  # RabbitMQ server connectivity ConfigMap

k8sUrl: kubernetes-address
# address for kubernetes cluster. 
# this will be used as host in gRPC config for boxes that are running in node network or externally

schemaSecrets:
# this section contains secret names that are mounted in the boxes

  rabbitMQ: rabbitmq
  # secret name to connect to RabbitMQ server

  cassandra: cassandra
  # secret name to connect to cassandra database
  
ingressHost: hostName
# host name that will be used inside ingress rules

```