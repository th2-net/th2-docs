---
title: Quick demo setup
weight: 0
read_before:
  - title: Install th2
    icon: mdi-tune-vertical
    href: ../../getting-started/install-th2
  - title: Generate th2 configs with REST API
    icon: mdi-api
    href: ../config-api
tokens_link:
  - title: Creating a personal access token
    icon: mdi-github
    href: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
requirements_link:
  - title: th2 software requirements
    icon: mdi-alert-circle-outline
    href: ../../getting-started/requirements/software
continue_learning:
  - title: Demo main scenario
    icon: mdi-script-text-play-outline
    href: ./demo-script
---

Before working with th2, it is needed to install it. This section contains instructions on how to quickly setup th2 in your Kubernetes cluster. 

<!--more-->

<notice info>

In order to save time on dowloading and changing configuration files, this guide uses [th2-configs-generator](https://github.com/d0rich/th2-configs-generator) web service, developed by community.

</notice>

This guide is targeted on minikube cluster, like in [demo example](./demo-main-scenario). But with some changes it can be used for a full-fledged Kubernetes cluster.

The diagram below shows all components of th2 infrastructure and interconnectivities between them. 

![](/img/getting-started/th2-env-schema/Demo-cluster-components-full-schema.drawio.png)

## Requirements

<recommendations :items="requirements_link"></recommendations>

Install the required software for th2 on the single node:
- th2 node:
  - Docker CE v19+
  - Minikube (instead of full-capability Kubernetes along with kubeadm and kubelet)
    With minikube you can easily run Kubernetes within docker container.  
    See the instructions for installation [here](https://minikube.sigs.k8s.io/docs/start/).
- Operator box:
  - Git
  - kubectl
  - Helm 3+
  - Chrome 75 or newer
  - Portainer (optional)  
    Portainer is the web UI for Docker.
    It can help manage the `minikube` container with the Kubernetes cluster, and `th2-storage` container with the Cassandra database.  
    Run Portainer docker container:  
    ```shell
    docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
    ```
- Apache Cassandra node:
  - Python 3.7+
  - `cqlsh`

## Run dockerized Kubernetes and Cassandra

Kubernetes cluster:

```shell
minikube start --kubernetes-version v1.19.14
```

Cassandra database:

```shell
docker run --name th2-storage \
  -p "0.0.0.0:9042:9042" \
  -v "$HOME/cassandra:/var/lib/cassandra" \
  -d "bitnami/cassandra:latest"
```

## Publish the th2-infra-schema

[th2-infra-schema-demo](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
is a template repository with predefined schemas.

Fork the [th2-infra-schema-demo](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
repository or use it as a template. It can be either **public** or **private**.

<notice warning>

If you use template functionality, make sure to copy all the branches.

</notice>

![](/img/getting-started/th2-infra-schema/git-based/clone-th2-infra-schema-demo.png)

## Provide access to the th2-infra-schema Git repository for th2-infra-mgr

Create GitHub personal access token. It is required to grant permissions from `repo` scope. Other permissions are not needed.

<recommendations :items="tokens_link" ></recommendations>

Create an environment variable for your token:

```shell
TOKEN=<your_personal_access_token>
```

## Set up Kubernetes cluster

Install Flannel CNI:

```shell
kubectl apply -f "https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml"
```

Create namespaces:

```shell
kubectl create namespace monitoring
kubectl create namespace service
```

Create directories for data persistence:

```shell
minikube ssh
sudo mkdir /opt/grafana /opt/prometheus /opt/loki /opt/rabbitmq
exit
```

Specify the version of th2-infra:

```shell
VERSION=1-5-x
```

Create PVs and PVCs:

```shell
NODE_NAME=minikube
```

```shell
kubectl apply -f "https://th2-configs-generator.onrender.com/$VERSION/pvs?node-name=$NODE_NAME"
kubectl apply -f "https://th2-configs-generator.onrender.com/$VERSION/pvcs"
```

## Deploy th2

### Create environment variables

Leave cluster hostname empty:

```shell
K8S_HOSTNAME=
```

Set up an address for RabbitMQ automatically generated configurations. It must be a Kubernetes cluster's hostname or IP address.

<notice note >

You can get address with `kubectl cluster-info`.

</notice>

```shell
MQ_HOSTNAME=192.168.49.2
```

Set up the variables for the Cassandra database:

```shell
CASSANDRA_HOST=host.minikube.internal
CASSANDRA_DC=datacenter1
```

Set up a Git platform, where th2-infra-schema is published:
 
```shell
PLATFORM=github
```

Set up an HTTPS link to th2-infra-schema in GitHub:

```shell
SCHEMA_LINK=<link-to-th2-infra-schema-git-repository>
```

Create an **infra-mgr** secret required by the **th2-infra-mgr** component:

```shell
kubectl -n service create secret generic infra-mgr --from-literal=infra-mgr=infra-mgr
```

### Download Helm charts

These Helm charts contain deployment manifests for the th2 infrastructure. It includes the open source tools and th2 core components. 

You need to save the Helm charts locally on the machine, so that you can install them in the Kubernetes cluster. 

```shell
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add fluxcd https://charts.fluxcd.io
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo add th2 https://th2-net.github.io
```

### Install Helm charts

Install the Helm Operator:
```shell
helm install helm-operator -n "service" \
  --version=1.2.0 fluxcd/helm-operator \
  -f "https://th2-configs-generator.onrender.com/$VERSION/helm-operator.values"
```
Install NGINX Ingress Controller:
```shell
helm install ingress -n "service" \
  --version=3.31.0 ingress-nginx/ingress-nginx \
  -f "https://th2-configs-generator.onrender.com/$VERSION/ingress.values"
```
Install Grafana and Prometheus:
```shell
helm install prometheus -n "monitoring" \
  --version=15.0.0 prometheus-community/kube-prometheus-stack \
  -f "https://th2-configs-generator.onrender.com/$VERSION/prometheus-operator.values?hosts=$K8S_HOSTNAME"
```
Install th2-infra components and RabbitMQ:
```shell
helm install th2-infra -n "service" \
  --version=1.5.4 th2/th2 \
  -f "https://th2-configs-generator.onrender.com/$VERSION/service.values?repository=$SCHEMA_LINK&platform=$PLATFORM&token=$TOKEN&host=$MQ_HOSTNAME&c-host=$CASSANDRA_HOST&dc=$CASSANDRA_DC" \
  -f "https://th2-configs-generator.onrender.com/$VERSION/secrets"
```
Install Kubernetes Dashboard:
```shell
helm install dashboard -n "monitoring" \
  kubernetes-dashboard/kubernetes-dashboard \
  -f "https://th2-configs-generator.onrender.com/$VERSION/dashboard.values?hosts=$K8S_HOSTNAME"
```
Install Grafana Loki:
```shell
helm install loki -n "monitoring" \
  --version=0.40.1 grafana/loki-stack \
  -f "https://th2-configs-generator.onrender.com/$VERSION/loki.values"
```

<notice info>
It can take up to 5 minutes to run all the components.
</notice>

## Check out installed services

- Kubernetes dashboard `http://your-host:30000/dashboard/`
- Grafana `http://your-host:30000/grafana/`
- th2-infra-editor `http://your-host:30000/editor/`
- RabbitMQ `http://your-host:30000/rabbitmq/`
- th2-reports `http://your-host:30000/your-namespace/`
