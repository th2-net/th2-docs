---
title: Set up Kubernetes and install th2
weight: 10
image: /img/getting-started/th2-env-schema/Demo-cluster-components-full-schema.drawio.png
prev:
  title: Publish th2-infra-schema
  link: ./step-2
next:
  title: Create th2 environment
  link: ./step-4
---

<custom-stepper :steps="6" :step="3" > </custom-stepper>

With this instruction you will install required Kubernetes components into the cluster. The th2 infrastructure components will be among them.

<!--more-->

As a result of this step, you will deploy th2 into your Kubernetes cluster.
Upon its completion, you are expected to have the environment setup as in the picture below.

![](/img/getting-started/th2-env-schema/Demo-cluster-components-4-install-th2.drawio.png)

## Set up Kubernetes cluster

### Install Flannel CNI

Flannel is a Kubernetes add-on that addresses networking [issues](https://kubernetes.io/docs/concepts/cluster-administration/networking/).

To install it, run the following command:

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

The following components require data persistence: Grafana, Prometheus, Loki, RabbitMQ - and should be set up at this point.

<notice note >

Examples below use HostPath type of
[Persistent Volume (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
Please read the documentation to choose an appropriate PV type for your environment.

</notice >

Create directories for data persistence with the next command.

<notice info >

If you are using minikube, directories must be created inside the container with Kubernetes cluster.

Use this command to get inside the minikube container:

```shell
minikube ssh
sudo mkdir /opt/grafana /opt/prometheus /opt/loki /opt/rabbitmq
```
</notice >


### Create Kubernetes entities for data persistence

Create the persistent volumes (PVs) and persistent volume claims (PVCs):

Create environment variable with the node name:

```shell
NODE_NAME=minikube
```

```shell
kubectl apply -f "https://th2-docs.herokuapp.com/api/config/pvs?node-name=$NODE_NAME"
kubectl apply -f "https://th2-docs.herokuapp.com/api/config/pvcs"
```

## Deploy th2

### Components of th2

#### Helm Operator

The Helm Operator is a Kubernetes operator, allowing one to declaratively manage Helm chart releases.
Using it you can automatically create Kubernetes objects (**Pods**, **Namespaces**, **Deployments**, **Configmaps**, **Secrets**, **Custom Resources**).

#### NGINX Ingress Controller

th2 uses its own implementation of the NGINX Ingress Controller.
It provides access to the th2 web services through HTTP.

#### Prometheus

Prometheus is an open source systems monitoring and alerting toolkit.
It will be used by Grafana as a data source.
It also contains **Custom Resource Definitions** (CRD) required by the th2 infra.

#### th2 infra components

`th2-infra` helm chart contains description for 4 th2 components:
1. [_`th2-infra-editor`_](https://github.com/th2-net/th2-infra-editor)
2. [_`th2-infra-mgr`_](https://github.com/th2-net/th2-infra-mgr)
3. [_`th2-infra-operator`_](https://github.com/th2-net/th2-infra-operator)
4. [_`th2-infra-repo`_](https://github.com/th2-net/th2-infra-repo)


#### Kubernetes Dashboard

[Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) is a web-based Kubernetes user interface.
With this tool you can monitor existing Kubernetes objects and its details.

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

### Create environment variables

Set cluster hostname.

<notice note >

Leave `K8S_HOSTNAME` empty if you have not configured DNS for your cluster. In this case it will be available by IP address. 

</notice>

```shell
K8S_HOSTNAME=
```

Set address for RabbitMQ automatically generated configurations. It must be Kubernetes cluster hostname or its IP.

<notice note >

You can get address with `kubectl cluster-info`.

</notice>

```shell
MQ_HOSTNAME=192.168.49.2
```

Set up variables for Cassandra database. As it is running on the same machine hostname will be `host.minikube.internal` ([more info](https://minikube.sigs.k8s.io/docs/handbook/host-access/)). The default name of Cassandra datacenter is `datacenter1`.

```shell
CASSANDRA_HOST=host.minikube.internal
CASSANDRA_DC=datacenter1
```
Set Git platform, where th2-infra-schema is published. Possible values: `github`, `gitlab`. 
We need to set `PLATFORM` to point to GitHub. 
```shell
PLATFORM=github
```

Store your GitHub token created earlier in environment variable:

```shell
TOKEN=<token>
```

Create `infra-mgr` secret required by `th2-infra-mgr`.

```shell
kubectl -n service create secret generic infra-mgr --from-literal=infra-mgr=infra-mgr
```
Set HTTPS link to th2-infra-schema in GitHub:
```shell
SCHEMA_LINK=<link-to-th2-infra-schema-git-repository>
```

### Install Helm charts

```shell
helm install helm-operator -n "service" \
  --version=1.2.0 fluxcd/helm-operator \
  -f "https://th2-docs.herokuapp.com/api/config/1-5-x/helm-operator.values"
```
```shell
helm install ingress -n "service" \
  --version=3.31.0 ingress-nginx/ingress-nginx \
  -f "https://th2-docs.herokuapp.com/api/config/1-5-x/ingress.values"
```
```shell
helm install prometheus -n "monitoring" \
  --version=15.0.0 prometheus-community/kube-prometheus-stack \
  -f "https://th2-docs.herokuapp.com/api/config/1-5-x/prometheus-operator.values?hosts=$K8S_HOSTNAME"
```
```shell
helm install th2-infra -n "service" \
  --version=1.5.4 th2/th2 \
  -f "https://th2-docs.herokuapp.com/api/config/1-5-x/service.values?repository=$SCHEMA_LINK&platform=$PLATFORM&token=$TOKEN&host=$MQ_HOSTNAME&c-host=$CASSANDRA_HOST&dc=$CASSANDRA_DC" \
  -f "https://th2-docs.herokuapp.com/api/config/1-5-x/secrets"
```
```shell
helm install dashboard -n "monitoring" \
  kubernetes-dashboard/kubernetes-dashboard \
  -f "https://th2-docs.herokuapp.com/api/config/1-5-x/dashboard.values?hosts=$K8S_HOSTNAME"
```
```shell
helm install loki -n "monitoring" \
  --version=0.40.1 grafana/loki-stack \
  -f "https://th2-docs.herokuapp.com/api/config/1-5-x/loki.values"
```
