---
title: "Step 3: Set up cluster"
weight: 15
chapter: false
prev:
  title: "Publish th2-infra-schema"
  link: /getting-started/install-demo/publish-schema
  icon: ""
next:
  title: "Deploy th2"
  link: /getting-started/install-demo/deploy-th2
  icon: ""
---

<custom-stepper steps="7" step="3" > </custom-stepper>

During this step, you will prepare a Kubernetes cluster and configuration maps for
installing th2.

## 1. Get th2 infra values

Clone the [`th2-infra`](https://github.com/th2-net/th2-infra) repository.

This repository contains configuration files for starting th2 inside Kubernetes.

```shell
git clone https://github.com/th2-net/th2-infra.git
```

Go to the `th2-infra/example-values` directory.

```shell
cd th2-infra/example-values
```

## 2. Create namespaces

Create namespaces for _`monitoring`_ and _`th2 service`_ tools.

```shell
kubectl create namespace monitoring
kubectl create namespace service
```

## 3. Data persistence

Data persistence is required for the following components: Grafana, Prometheus,
Loki, RabbitMQ - and should be set up at this point.

<notice note >

Examples below use HostPath type of
[Persistent Volume (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
Please read the documentation to choose an appropriate PV type for your environment.

</notice >

### Create directories for data persistence

Directories must be created in the container with Kubernetes cluster, as we are using minikube.

```shell
minikube ssh
sudo mkdir /opt/grafana /opt/prometheus /opt/loki /opt/rabbitmq
exit
```

### Edit persistence volume configuration

Configurations of persistent volumes are specified in the `pvs.yaml` config file
located in the `th2-infra/example-values` directory.

To set the node name in `pvs.yaml`, replace the `<node-name>` value
with the name of your node (can be retrieved with the `kubectl get nodes` command).  

A `pvs.yaml` example:

```yaml[pvs.yaml]
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: storage-loki
  labels:
    app: loki
spec:
  capacity:
    storage: 5Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-storage
  local:
    path: /opt/loki
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: kubernetes.io/hostname
              operator: In
              values:
                - <node-name> # replace with node name
---
```

### Create Kubernetes entities for data persistence

Create the persistent volumes (PVs) and persistent volume claims (PVCs):

```shell
kubectl apply -f ./pvs.yaml
kubectl apply -f ./pvcs.yaml
```

## 4. Configure th2 infra values

Once all the required software is installed on your test box and operator box and
th2-infra repositories are ready, you can start configuring the cluster.


### dashboard.values.yaml

Define Dashboard hostname in the `dashboard.values.yaml`
([file in github](https://github.com/th2-net/th2-infra/blob/master/example-values/prometheus-operator.values.yaml)):

```yaml[dashboard.values.yaml]
ingress:
  hosts:
    - <th2_host_name>
```

<notice note >

For demo purposes we can leave hosts empty.
In this case dashboard will be automatically available by cluster IP address.

```yaml[dashboard.values.yaml]
ingress:
  hosts: []
```

</notice>


### prometheus-operator.values.yaml

Define Grafana hostnames in the `prometheus-operator.values.yaml` ([file in github](https://github.com/th2-net/th2-infra/blob/master/example-values/prometheus-operator.values.yaml)):

```yaml[prometheus-operator.values.yaml]
grafana:
  ingress:
    hosts:
      - <th2_host_name>
```

<notice note >

For demo purposes we can leave hosts empty.
In this case dashboard will be automatically available by cluster IP address.

```yaml[prometheus-operator.values.yaml]
grafana:
  ingress:
    hosts: []
```

</notice>

### Access to the _th2-infra-schema_ Git repository for _th2-infra-mgr_

The `th2-infra-mgr` component monitors the `th2-infra-schema` repository and updates it
according to the user's actions in the `th2-infra-editor` GUI. To make it possible,
it is required that the `th2-infra-mgr` component is granted SSH access with write permissions.

Generate SSH keys without a passphrase:

```shell
ssh-keygen -t rsa -m pem -f ./infra-mgr-rsa.key
```

[Add a new SSH key to your GitHub account](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)

Create a Kubernetes Secret `infra-mgr` from the private SSH key:

```shell
kubectl -n service create secret generic infra-mgr --from-file=infra-mgr=./infra-mgr-rsa.key
```

### service.values.yaml

`service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/master/example-values/service.values.yaml)

Set the `infraMgr.git.repository` value to the SSH link of your `th2-infra-schema` repository, e.g:

```yaml[service.values.yaml]
infraMgr:
  git:
    repository: git@github.com:th2-net/th2-infra-demo-configuration.git
```

Set the `externalRabbitMQHost.host` value to the hostname of your cluster.


<notice info >

To get <th2_host_name>, execute the `kubectl cluster-info` command.

</notice >

```yaml[service.values.yaml]
externalRabbitMQHost:
  host: <th2_host_name>
```

Set the `cassandra.host` value to the hostname of the Cassandra cluster.

As we are using minikube, set `cassandra.host` value to `host.minikube.internal`.
You can find more information [here](https://minikube.sigs.k8s.io/docs/handbook/host-access/).

Also it is needed to specify datacenter. 
You can find datacenter name by executing following queries with `csqlsh` 
(by default it is `datacenter1`):

```cassandraql
USE SYSTEM;
SELECT data_center FROM local;
```

```yaml[service.values.yaml]
cassandra:
  internal: false
  host: host.minikube.internal
  cluster:
    datacenter: datacenter1
```

### secrets.yaml

Create the `secrets.yaml` file in the `th2-infra` folder.

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
    user: cassandra
    password: cassandra

rabbitmq:
# set admin user credentials, it will be created during deployment
  rabbitmqUsername: th2
  rabbitmqPassword: rab-pass
  # must be random string
  rabbitmqErlangCookie: cookie
```

