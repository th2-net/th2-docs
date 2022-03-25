---
title: Generate configs
weight: 5
image: /img/getting-started/th2-env-schema/Demo-cluster-components-full-schema.drawio.png
---

On this page you will find instructions about th2 installation. All configs will be automatically generated with special API.

<!--more-->

## Set up cluster

### Install Flannel CNI

Flannel is a Kubernetes add-on that addresses networking [issues](https://kubernetes.io/docs/concepts/cluster-administration/networking/).

To install it, you need to run the following command:

```shell
kubectl apply -f "https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml"
```


### Create namespaces

Create namespaces for _`monitoring`_ and _`th2 service`_ tools.

```shell
kubectl create namespace monitoring
kubectl create namespace service
```

### Create directories for data persistence

Data persistence is required for the following components: Grafana, Prometheus,
Loki, RabbitMQ - and should be set up at this point.

<notice note >

Examples below use HostPath type of
[Persistent Volume (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
Please read the documentation to choose an appropriate PV type for your environment.

</notice >

Create directories for data persistence with the next command.

<notice info >

If you are using minikube, directories must be created in the container with
Kubernetes cluster.

Use this command to get to minikube container:

```shell
minikube ssh
```

</notice >


```shell
sudo mkdir /opt/grafana /opt/prometheus /opt/loki /opt/rabbitmq
```

### Create Kubernetes entities for data persistence

Create the persistent volumes (PVs) and persistent volume claims (PVCs):

Create environment variable with node name:

```shell
NODE_NAME=<node-name>
```

```shell
kubectl apply -f https://th2-docs.herokuapp.com/api/config/pvs?node-name=$NODE_NAME
kubectl apply -fhttps://th2-docs.herokuapp.com/api/config/pvcs
```

## Deploy th2

### Components of th2

#### Helm Operator

The Helm Operator is a Kubernetes operator, allowing one to declaratively manage Helm chart releases.
Using this you can automatically create Kubernetes objects (as **Pods**, **Namespaces**, **Deployments**, **Configmaps**,
**Secrets**, **Custom Resources**).

#### NGINX Ingress Controller

th2 uses its own implementation of the NGINX Ingress Controller.
It provides access to the th2 web services through HTTP.

#### Prometheus

Prometheus is an open-source systems monitoring and alerting toolkit.
It will be used by Grafana as data source.
And also it contains **Custom Resource Definitions** (CRD) required by the th2 infra.

#### th2 infra components

`th2-infra` helm chart contains description for 4 th2 components:
1. [_`th2-infra-editor`_](https://github.com/th2-net/th2-infra-editor)
2. [_`th2-infra-mgr`_](https://github.com/th2-net/th2-infra-mgr)
3. [_`th2-infra-operator`_](https://github.com/th2-net/th2-infra-operator)
4. [_`th2-infra-repo`_](https://github.com/th2-net/th2-infra-repo)


#### Kubernetes Dashboard

[Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
is a web-based Kubernetes user interface.
With this tool you can monitor existing Kubernetes Objects and its details.

#### Grafana

Grafana provides dashboard for the CPU, memory, and network usage of th2.

### Download Helm charts

```shell
helm repo add fluxcd "https://charts.fluxcd.io"
helm repo add ingress-nginx "https://kubernetes.github.io/ingress-nginx"
helm repo add prometheus-community "https://prometheus-community.github.io/helm-charts"
helm repo add th2 "https://th2-net.github.io"
helm repo add kubernetes-dashboard "https://kubernetes.github.io/dashboard/"
helm repo add grafana "https://grafana.github.io/helm-charts"
```

### Install Helm charts

Create environment variables for your configs

```shell
K8S_HOSTNAME=<cluster-hostname>
MQ_HOSTNAME=<rabbit-mq-hostname>
CASSANDRA_HOST=<cassandra-cluster-hostname>
CASSANDRA_DC=<cassandra-datacenter-name>
SCHEMA_SSH=<ssh-link-to-th2-infra-schema-git-repository>
```

```shell
helm install helm-operator -n "service" --version=1.2.0 fluxcd/helm-operator -f "https://th2-docs.herokuapp.com/api/config/helm-operator.values"
helm install ingress -n "service" --version=3.31.0 ingress-nginx/ingress-nginx -f "https://th2-docs.herokuapp.com/api/config/ingress.values"
helm install prometheus -n "monitoring" --version=15.0.0 prometheus-community/kube-prometheus-stack -f "https://th2-docs.herokuapp.com/api/config/prometheus-operator.values?hosts=$K8S_HOSTNAME"
helm install th2-infra -n "service" --version=1.5.4 th2/th2 -f "https://th2-docs.herokuapp.com/api/config/service.values?repository=$SCHEMA_SSH&host=$MQ_HOSTNAME&c-host=$CASSANDRA_HOST&dc=$CASSANDRA_DC" -f "https://th2-docs.herokuapp.com/api/config/secrets"
helm install dashboard -n "monitoring" kubernetes-dashboard/kubernetes-dashboard -f "https://th2-docs.herokuapp.com/api/config/dashboard.values?hosts=$K8S_HOSTNAME"
helm install loki -n "monitoring" --version=0.40.1 grafana/loki-stack -f "https://th2-docs.herokuapp.com/api/config/loki.values"
```
