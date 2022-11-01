---
title: Generate configs
weight: 5
image: /img/getting-started/th2-env-schema/Demo-cluster-components-full-schema.drawio.png
continue_learning:
  - title: Use th2
    href: ../../use-th2
tokens_link:
  - title: Creating a personal access token
    icon: mdi-github
    href: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
---

This page contains instructions about installation of th2. All the configs will be automatically generated with a special API.

<!--more-->

## Set up cluster

### Install Flannel CNI

Flannel is a Kubernetes add-on that addresses networking [issues](https://kubernetes.io/docs/concepts/cluster-administration/networking/).

For installation, run the following command:

```shell
kubectl apply -f "https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml"
```


### Create namespaces

Create a namespaces for the _`monitoring`_ and _`th2 service`_ tools.

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
Read the documentation to choose an appropriate PV type for your environment.

</notice >

Create the directories for the data persistence with the following command.

<notice info >

If you are using a minikube, the directories must be created in the container with
the Kubernetes cluster.

To get to the minikube container, use the following command:

```shell
minikube ssh
```

</notice >


```shell
sudo mkdir /opt/grafana /opt/prometheus /opt/loki /opt/rabbitmq
```

### Create Kubernetes entities for data persistence

Create the persistent volumes (PVs) and the persistent volume claims (PVCs):

Create an environment variable with a node name:

```shell
NODE_NAME=<node-name>
```

```shell
kubectl apply -f https://th2.dev/api/config/pvs?node-name=$NODE_NAME
kubectl apply -f https://th2.dev/api/config/pvcs
```

## Access to the th2-infra-schema Git repository for th2

The `th2-infra-mgr` component monitors the `th2-infra-schema` repository and updates it
according to the user's actions in the `th2-infra-editor` GUI. To make it possible,
it is required that the `th2-infra-mgr` component is granted an SSH access with write permissions.

Different Git systems have different mechanisms for accessing the repository. So, your next actions depend on the system where your th2-infra-schema is published.

### GitHub

Due to [improvements in Git protocol security](https://github.blog/2021-09-01-improving-git-protocol-security-github/) on GitHub, the policy around SSH keys underwent changes. In th2, these changes affected SSH connections to its GitHub repositories. 
SSH keys generated with the RSA algorithm are no longer accepted when uploaded to GitHub starting from March 16, 2022. Keys uploaded before this date will continue to work.

The GitHub repositories can be accessed via personal access tokens. In case you cannot use a token, update your th2 version to use the SSH connection. 

<recommendations :items="tokens_link" ></recommendations>

You need to grant permissions from `repo` scope. Other permissions are not needed.

![Token permissions](/img/getting-started/install-th2/gh-token-permissions.png)

You will need a generated token for the next step. Save the token as an environment variable:

```shell
TOKEN=<token>
```

Create `infra-mgr` secret required by `th2-infra-mgr`.

```shell
kubectl -n service create secret generic infra-mgr --from-literal=infra-mgr=infra-mgr
```

### GitLab

GitLab uses SSH keys to authorize all the requests to read and change repository.

Generate SSH keys pair without a passphrase:

```shell
ssh-keygen -t rsa -m pem -f ./infra-mgr-rsa.key
```

[Add an SSH key to your GitLab account](https://docs.gitlab.com/ee/ssh/#add-an-ssh-key-to-your-gitlab-account)

Create a Kubernetes Secret `infra-mgr` from the private SSH key:

```shell
kubectl -n service create secret generic infra-mgr --from-file=infra-mgr=./infra-mgr-rsa.key
```

In this case your link to configuration will be the default link to clone repository with SSH.


## Deploy th2

### Download Helm charts

```shell
helm repo add fluxcd "https://charts.fluxcd.io"
helm repo add ingress-nginx "https://kubernetes.github.io/ingress-nginx"
helm repo add prometheus-community "https://prometheus-community.github.io/helm-charts"
helm repo add th2 "https://th2-net.github.io"
helm repo add kubernetes-dashboard "https://kubernetes.github.io/dashboard/"
helm repo add grafana "https://grafana.github.io/helm-charts"
```

### Install components of th2

Set the Kubernetes cluster hostname via environment variable (leave it empty if you have an unconfigured DNS name):

```shell
K8S_HOSTNAME=<cluster-hostname>
```

#### Helm Operator

The Helm Operator is a Kubernetes operator, allowing one to declaratively manage Helm chart releases.
By using it you can automatically create Kubernetes objects (as **Pods**, **Namespaces**, **Deployments**, **Configmaps**,
**Secrets**, **Custom resources**).

Install Helm Operator:

```shell
helm install helm-operator -n "service" \
  --version=1.2.0 fluxcd/helm-operator \
  -f "https://th2.dev/api/config/1-5-x/helm-operator.values"
```

#### NGINX Ingress Controller

th2 uses its own implementation of the NGINX Ingress Controller.
It provides access to the th2 web services through HTTP.

Install NGINX Ingress Controller:

```shell
helm install ingress -n "service" \
  --version=3.31.0 ingress-nginx/ingress-nginx \
  -f "https://th2.dev/api/config/1-5-x/ingress.values"
```

#### Prometheus

Prometheus is an open-source systems' monitoring and alerting toolkit.
It will be used by Grafana as a data source.
It also contains **Custom resource Definitions** (CRD) required by the th2 infra.

Install Prometheus:

```shell
helm install prometheus -n "monitoring" \
  --version=15.0.0 prometheus-community/kube-prometheus-stack \
  -f "https://th2.dev/api/config/1-5-x/prometheus-operator.values?hosts=$K8S_HOSTNAME"
```

#### th2 infra components

`th2-infra` helm chart contains description of 4 th2 components:
1. [_`th2-infra-editor`_](https://github.com/th2-net/th2-infra-editor)
2. [_`th2-infra-mgr`_](https://github.com/th2-net/th2-infra-mgr)
3. [_`th2-infra-operator`_](https://github.com/th2-net/th2-infra-operator)
4. [_`th2-infra-repo`_](https://github.com/th2-net/th2-infra-repo)


Set the environment variables for further config generation:

- `MQ_HOSTNAME` - identical to [`K8S_HOSTNAME`](#install-components-of-th2). Should be filled with IP address of Kubernetes cluster if DNS is not configured. 
- `CASSANDRA_HOST` - hostname or IP address of Cassandra cluster.
- `CASSANDRA_DC` - datacenter in Cassandra cluster to work with.
- `SCHEMA_LINK` - SSH link to th2-infra-schema if you use SSH keys for authorization, or HTTPS link if you use tokens.
- `PLATFORM` - Git platform, where th2-infra-schema is published (required only if you use tokens). Possible values: `github`, `gitlab`.
- `TOKEN` - token for authorization on Git platform (required only if you use tokens). You might have token set in an environment variable as done in the [previous step](#github).

```shell
MQ_HOSTNAME=<rabbit-mq-hostname>
CASSANDRA_HOST=<cassandra-cluster-hostname>
CASSANDRA_DC=<cassandra-datacenter-name>
SCHEMA_LINK=<link-to-th2-infra-schema-git-repository>
PLATFORM=<platform-where-th2-infra-schema-published>
TOKEN=<token-for-authorization-on-platform>
```

Install th2-infra components:

```shell
helm install th2-infra -n "service" \
  --version=1.5.4 th2/th2 \
  -f "https://th2.dev/api/config/1-5-x/service.values?repository=$SCHEMA_LINK&platform=$PLATFORM&token=$TOKEN&host=$MQ_HOSTNAME&c-host=$CASSANDRA_HOST&dc=$CASSANDRA_DC" \
  -f "https://th2.dev/api/config/1-5-x/secrets"
```

#### Kubernetes Dashboard

[Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
is a web-based Kubernetes user interface.
With this tool you can monitor existing Kubernetes Objects and their details.

Install Kubernetes Dashboard:

```shell
helm install dashboard -n "monitoring" \
  kubernetes-dashboard/kubernetes-dashboard \
  -f "https://th2.dev/api/config/1-5-x/dashboard.values?hosts=$K8S_HOSTNAME"
```

#### Grafana

Grafana provides dashboards for the CPU, memory, and network usage of th2.

Install Grafana:

```shell
helm install loki -n "monitoring" \
  --version=0.40.1 grafana/loki-stack \
  -f "https://th2.dev/api/config/1-5-x/loki.values"
```
## Check out installed services

- Kubernetes dashboard `http://your-host:30000/dashboard/`
- Grafana `http://your-host:30000/grafana/`
- th2-infra-editor `http://your-host:30000/editor/`
- RabbitMQ `http://your-host:30000/rabbitmq/`
- th2-reports `http://your-host:30000/your-namespace/`
