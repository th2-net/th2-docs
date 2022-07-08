---
title: Download configs
weight: 0
image: /img/getting-started/th2-env-schema/Demo-cluster-components-full-schema.drawio.png
continue_learning:
  - title: Use th2
    href: ../../use-th2
tokens_link:
  - title: Creating a personal access token
    icon: mdi-github
    href: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
---

This page contains instructions about installation of th2. All the configs will be changed manually.

<!--more-->

## Install Flannel CNI

Flannel is a Kubernetes add-on that addresses networking [issues](https://kubernetes.io/docs/concepts/cluster-administration/networking/).

To install it, you need to run the following command:

```shell
kubectl apply -f "https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml"
```

## Get th2 infra values

Clone the [`th2-infra`](https://github.com/th2-net/th2-infra) repository.

This repository contains configuration files for starting th2 inside the Kubernetes.

```shell
git clone -b release-v1.5.x https://github.com/th2-net/th2-infra.git
```

Go to the `th2-infra/example-values` directory.

```shell
cd th2-infra/example-values
```

## Create namespaces

Create the namespaces for _monitoring_ and _service_.

```shell
kubectl create namespace monitoring
kubectl create namespace service
```

## Data persistence

Data persistence is required for the following components: Grafana, Prometheus,
Loki, RabbitMQ - and should be set up at this point.

<notice note >

The examples below use HostPath type of
[Persistent Volume (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
Read the documentation to choose an appropriate PV type for your environment.

</notice >

### Create directories for data persistence


```shell
mkdir /opt/grafana /opt/prometheus /opt/loki /opt/rabbitmq
```


<notice info >

If you are using minikube, create the directories inside it. To do so,
first connect to the minikube filesystem with `minikube ssh`, then execute the `mkdir` command provided above.

```shell
minikube ssh
sudo mkdir /opt/grafana /opt/prometheus /opt/loki /opt/rabbitmq
exit
```
</notice >

### Edit persistence volume configuration

The configurations for the persistent volumes are specified in the `pvs.yaml` config file,
located in the `th2-infra/example-values` directory.

To set up the node name in `pvs.yaml`, replace the `<node-name>` value
with the name of your node (can be retrieved with the `kubectl get nodes` command).

A `pvs.yaml` example:

```yaml[pvs.yaml]
---
apiVersion: v1
kind: PersistentVolume
metadata:
  ...
spec:
  ...
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
                - <node-name> # replace with node name
---
...
```

### Create Kubernetes entities for data persistence

Create the persistent volumes (PVs) and the persistent volume claims (PVCs):

```shell
kubectl apply -f ./pvs.yaml
kubectl apply -f ./pvcs.yaml
```

You can start configuring the cluster once all the required software is installed on your test and operator boxes 
and the `th2-infra` repositories are ready.

## Configure dashboard.values.yaml



### Define Dashboard hostname

<notice note >

The hostname must be resolved from the test boxes.

</notice >

Define the dashboard hostname in the `dashboard.values.yaml`
([file in github](https://github.com/th2-net/th2-infra/blob/release-v1.5.x/example-values/dashboard.values.yaml)):

```yaml[dashboard.values.yaml]
...
ingress:
  ...
  hosts:
    - <th2_host_name>
...
```

## prometheus-operator.values.yaml

### Define Grafana hostname

Define the Grafana hostname in the `prometheus-operator.values.yaml` ([file in github](https://github.com/th2-net/th2-infra/blob/release-v1.5.x/example-values/prometheus-operator.values.yaml)):

```yaml[prometheus-operator.values.yaml]
...
grafana:
  ...
  ingress:
    hosts:
      - <th2_host_name>
...
```

## Access to the th2-infra-schema Git repository for th2

The `th2-infra-mgr` component monitors the `th2-infra-schema` repository and updates it
according to the user's actions in the `th2-infra-editor` GUI. To make it possible,
it is required that the `th2-infra-mgr` component is granted an access with write permissions.

Different Git systems have different mechanisms for accessing a repository. So your next actions depend on the system where your `th2-infra-schema` is published.

### GitHub

Due to the [improvements in Git protocol security](https://github.blog/2021-09-01-improving-git-protocol-security-github/) on GitHub, keys supported in ssh have underwent changes. These changes affected the th2 ssh connections to the GitHub repositories. 
SSH keys generated with RSA algorithm are no longer accepted when uploaded to GitHub after March 15, 2022. Keys uploaded before this date will continue to work.

GitHub repositories can be accessed via personal access tokens. In case you cannot use a token, update your th2 version to use ssh connection.

<recommendations :items="tokens_link" ></recommendations>

It is required to grant permissions from `repo` scope. Other permissions are not needed.

![Token permissions](/img/getting-started/install-th2/gh-token-permissions.png)

You will need generated token for the next step.

Create `infra-mgr` secret required by `th2-infra-mgr`.

```shell
kubectl -n service create secret generic infra-mgr --from-literal=infra-mgr=infra-mgr
```

### GitLab

GitLab uses SSH keys to authorize all requests to read and change repository.

Generate SSH keys pair without a passphrase:

```shell
ssh-keygen -t rsa -m pem -f ./infra-mgr-rsa.key
```

[Add a ssh key to your GitLab account](https://docs.gitlab.com/ee/ssh/#add-an-ssh-key-to-your-gitlab-account)

Create a Kubernetes Secret `infra-mgr` from the private ssh key:

```shell
kubectl -n service create secret generic infra-mgr --from-file=infra-mgr=./infra-mgr-rsa.key
```

In this case your link to configuration will be the default link to clone repository with ssh.


## Configure service.values.yaml

### Link `th2-infra-mgr` to the `th2-infra-schema` repository

#### Link for infra-schema in GitHub

In your copy of the `service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/release-v1.5.x/example-values/service.values.yaml),
set the following values:
- `infraMgr.git.repository` - HTTPS link to your `th2-infra-schema` repository
- `infraMgr.git.httpAuthUsername` - GitHub personal access token with permissions for repository
- `infraMgr.git.httpAuthPassword` - empty string

```yaml[service.values.yaml]
infraMgr:
  git:
    repository: https://github.com/th2-net/th2-infra-schema-demo.git
    httpAuthUsername: xxx_xxxxxxxxxx11xxxx1xxx1xxxxxxxxx1xx1xx
    httpAuthPassword: ''
...
```
#### Link for infra-schema in GitLab

In your copy of the `service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/release-v1.5.x/example-values/service.values.yaml),
set the `infraMgr.git.repository` value to the ssh link of your `th2-infra-schema` repository.

<notice note>

Configured ssh key required for providing access to infra schema in GitLab.

</notice>

```yaml[service.values.yaml]
infraMgr:
  git:
    repository: git@github.com:th2-net/th2-infra-demo-configuration.git
...
```

### Define RabbitMQ hostname

In your copy of the `service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/release-v1.5.x/example-values/service.values.yaml),
set the `externalRabbitMQHost.host` value to the hostname of your cluster.

```yaml[service.values.yaml]
...
externalRabbitMQHost:
  host: <th2_host_name>
```

### Define Cassandra hostname and datacenter

In your copy of the `service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/release-v1.5.x/example-values/service.values.yaml),
set the `cassandra.host` value to the hostname of the Cassandra cluster. 

If used Cassandra datacenter is not `dc1`, provide its name in `cassandra.cluster.datacenter`

<notice warning >

If you are using minikube, set `cassandra.host` value to `host.minikube.internal`.
You can find more information [here](https://minikube.sigs.k8s.io/docs/handbook/host-access/).

</notice >

```yaml[service.values.yaml]
...
cassandra:
  internal: false
  host: <cassandra-host>
  cluster:
    datacenter: <datacenter>
```

### Define th2 Ingress hostname

If required, add the `ingress.hostname` value into the
`service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/release-v1.5.x/example-values/service.values.yaml).
Otherwise, th2 web services will be available via the IP address of the node
(e.g. `<ip_address>:30000/dashboard/` rather than `<ingress.hostname>:30000/dashboard/`).

<notice note >

If you don't have the DNS configured for your th2 cluster, we recommend leaving `ingress.hostname` empty.

</notice >

## Configure secrets.yaml

### Create a Kubernetes Secret with th2 credentials

Create the `secrets.yaml` file.

<notice warning >

Do not commit the `secrets.yaml` file into Git to keep its data confidential.

</notice >

Example:
```yaml[secrets.yaml]
# required only for images from a private registry, will be attached as the first PullSecret to deployments
#productRegistry:
#  username: user
#  password: password
#  name: private-registry-1.example.com # core components registry

# required only for images from a private registry, will be attached as the second PullSecret to deployments
#solutionRegistry:
#  username: user
#  password: password
#  name: private-registry-2.example.com # components registry

# required only for images from a private registry, will be attached as the third PullSecret to deployments
#proprietaryRegistry:
#  username: user
#  password: password
#  name: private-registry-3.example.com # components registry

cassandra:
# set credentials for the existing Cassandra cluster
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


## Deploy th2

<notice warning >

Make sure that you are located in the `th2-infra/example-values` directory.

</notice >

### Install the Helm Operator

The Helm Operator is a Kubernetes operator, allowing one to declaratively manage Helm chart releases.
Using this you can automatically create Kubernetes objects (as **Pods**, **Namespaces**, **Deployments**, **Configmaps**,
**Secrets**, **Custom Resources**).

Download and install the Helm Operator:

```shell
helm repo add fluxcd https://charts.fluxcd.io
helm install --version=1.2.0 helm-operator -n service fluxcd/helm-operator -f ./helm-operator.values.yaml
```

### Install the NGINX Ingress Controller

th2 uses its own implementation of the NGINX Ingress Controller.
It provides access to the th2 web services through HTTP.

Download and install the NGINX Ingress Controller:

```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install -n service --version=3.31.0 ingress ingress-nginx/ingress-nginx -f ./ingress.values.yaml
```


### Install Prometheus

Prometheus is an open-source systems monitoring and alerting toolkit.
It will be used by Grafana as a data source.
And also it contains Custom Resource Definitions (CRD) required by the th2 infra.

Download and install Prometheus:

```shell
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install --version=15.0.0 prometheus -n monitoring prometheus-community/kube-prometheus-stack -f ./prometheus-operator.values.yaml
```

### Install th2-infra components in the _service_ namespace

`th2-infra` helm chart contains description for 4 th2 components:
1. [_**th2-infra-editor**_](https://github.com/th2-net/th2-infra-editor)
2. [_**th2-infra-mgr**_](https://github.com/th2-net/th2-infra-mgr)
3. [_**th2-infra-operator**_](https://github.com/th2-net/th2-infra-operator)
4. [_**th2-infra-repo**_](https://github.com/th2-net/th2-infra-repo)

Download and install `th2-infra`:

<notice note >

In the sample command replace `<version>` with the `th2-infra` release version you need, please follow the [release notes](https://github.com/th2-net/th2-infra/releases).

</notice >

```shell
helm repo add th2 https://th2-net.github.io
helm install -n service --version=1.5.4 th2-infra th2/th2 -f ./service.values.yaml -f ./secrets.yaml
```

### Install Kubernetes Dashboard

Dashboard is a web-based Kubernetes user interface.
With this tool you can monitor existing Kubernetes Objects and its details.

Download and install
[Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/):

```shell
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm install dashboard -n monitoring kubernetes-dashboard/kubernetes-dashboard -f ./dashboard.values.yaml
```

### Install Grafana

Grafana provides dashboard for the CPU, memory, and network usage of th2.

Download and install Grafana:

```shell
helm repo add grafana https://grafana.github.io/helm-charts
helm install --version=0.40.1 loki -n monitoring grafana/loki-stack -f ./loki.values.yaml
```

### Check result

#### Pods

Check if the service pods are running:

```shell
kubectl get pods -n service
```

```shell[Output]
NAME                                               READY   STATUS    RESTARTS   AGE
helm-operator-79fc58f746-q8qwd                     1/1     Running   0          21d
infra-editor-7cd68c8587-q5tfp                      1/1     Running   0          20d
infra-mgr-67b65f4bb-gb4cc                          1/1     Running   0          20d
infra-operator-6b7987b55-zxxdt                     1/1     Running   0          20d
infra-repo-9c77fd6f7-xj9wf                         1/1     Running   0          20d
ingress-ingress-nginx-controller-b556b7cb5-gfrhl   1/1     Running   0          22d
rabbitmq-0                                         1/1     Running   0          21d
```

Check if the monitoring pods are running:

```shell

kubectl get pods -n monitoring
```

```shell[Output]
NAME                                                     READY   STATUS    RESTARTS   AGE
........
pod/dashboard-kubernetes-dashboard-77d85586db-j9v8f      1/1     Running   0          56s
alertmanager-prometheus-prometheus-oper-alertmanager-0   2/2     Running   0          75s
loki-0                                                   1/1     Running   0          4m47s
loki-promtail-wqfml                                      1/1     Running   0          4m47s
prometheus-grafana-68f8dd6d57-2gtns                      2/2     Running   0          82s
prometheus-kube-state-metrics-75d4cc9dbd-psb88           1/1     Running   0          82s
prometheus-prometheus-node-exporter-gfzp6                1/1     Running   0          82s
prometheus-prometheus-oper-operator-df668d457-snxks      1/1     Running   0          82s
prometheus-prometheus-prometheus-oper-prometheus-0       3/3     Running   1          65s        
........
```
#### Access from browser

Check the access to Grafana (the default `user/password: admin/prom-operator` must be changed for information security purposes):  
`http://your-host:30000/grafana/login`.

## Check out installed services

- Kubernetes dashboard `http://your-host:30000/dashboard/`
- Grafana `http://your-host:30000/grafana/`
- th2-infra-editor `http://your-host:30000/editor/`
- RabbitMQ `http://your-host:30000/rabbitmq/`
- th2-reports `http://your-host:30000/your-namespace/`


