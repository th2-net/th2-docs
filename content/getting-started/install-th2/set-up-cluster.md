---
title: "Step 3: Set up cluster"
weight: 15
chapter: false
prev:
  title: "Publish th2-infra-schema"
  link: "./publish-schema"
  icon: ""
next:
  title: "Deploy th2"
  link: "./deploy-th2"
  icon: ""
---

<custom-stepper steps="5" step="3" > </custom-stepper>

During this step, you will prepare a Kubernetes cluster and configuration maps for
installing th2.

## 1. Get th2 infra values

Clone the [`th2-infra`](https://github.com/th2-net/th2-infra) repository.

This repository contains configuration files for starting th2 inside Kubernetes.

```shell
git clone https://github.com/th2-net/th2-infra.git
```

## 2. Create namespaces

Create namespaces for _`monitoring`_ and _`th2 service`_ tools.

```shell
kubectl create namespace monitoring
kubectl create namespace service
```

Output example:

```shell
namespace/monitoring created
namespace/service created
```

<spoiler title="Check if required namespaces exist" >

Get the namespaces list:

```shell
kubectl get namespaces
```

Output example:

```shell
NAME              STATUS   AGE
default           Active   41d
kube-node-lease   Active   41d
kube-public       Active   41d
kube-system       Active   41d
monitoring        Active   41d
service           Active   41d
```

</spoiler >

## 3. Data persistence

Data persistence is required for the following components: Grafana, Prometheus,
Loki, RabbitMQ - and should be set up at this point.

<notice note >

Examples below use HostPath type of
[Persistent Volume (PV)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
Please read the documentation to choose an appropriate PV type for your environment.

</notice >

### Create directories for data persistence

```shell
mkdir /opt/grafana /opt/prometheus /opt/loki /opt/rabbitmq
```

<notice info >

If you are using minikube, create directories inside it. To do this,
connect to the minikube filesystem with `minikube SSH` first, then execute the `mkdir` command provided above.

</notice >

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

<notice warning >

Make sure that you are located in the `th2-infra/example-values` directory.

</notice >

Create the persistent volumes (PVs) and persistent volume claims (PVCs):

```shell
kubectl apply -f ./pvs.yaml
kubectl apply -f ./pvcs.yaml
```

<spoiler title="Check if required PVs and PVCs were successfully created" >

Get the list of PVs:

```shell
kubectl get persistentvolumes
```

Output example:

```shell
NAME                 CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS     CLAIM                                                                                                               STORAGECLASS    REASON   AGE
components-storage   10Gi       RWX            Retain           Released   schema/components                                                                                                   local-storage            41d
storage-grafana      1Gi        RWO            Retain           Bound      monitoring/grafana                                                                                                  local-storage            41d
storage-loki         5Gi        RWO            Retain           Bound      monitoring/loki                                                                                                     local-storage            41d
storage-prometheus   5Gi        RWO            Retain           Bound      monitoring/prometheus-prometheus-kube-prometheus-prometheus-db-prometheus-prometheus-kube-prometheus-prometheus-0                            41d
storage-rabbitmq     10Gi       RWO            Retain           Bound      service/data-rabbitmq-0                                                                                             local-storage            41d
```

Get the list of PVCs:

```shell
kubectl get persistentvolumeclaims --all-namespaces
```

Output example:

```shell
NAMESPACE    NAME                                                                                                     STATUS   VOLUME               CAPACITY   ACCESS MODES   STORAGECLASS    AGE
monitoring   grafana                                                                                                  Bound    storage-grafana      1Gi        RWO            local-storage   41d
monitoring   loki                                                                                                     Bound    storage-loki         5Gi        RWO            local-storage   41d
monitoring   prometheus-prometheus-kube-prometheus-prometheus-db-prometheus-prometheus-kube-prometheus-prometheus-0   Bound    storage-prometheus   5Gi        RWO                            41d
service      data-rabbitmq-0                                                                                          Bound    storage-rabbitmq     10Gi       RWO            local-storage   41d
```

</spoiler >

## 4. Configure th2 infra values

Once all the required software is installed on your test box and operator box and
th2-infra repositories are ready, you can start configuring the cluster.


<notice warning >

Make sure that you are located in the `th2-infra/example-values` directory.

</notice >

### `dashboard.values.yaml`

#### Define Dashboard hostname

<notice note >

Hostname must be resolved from test boxes.

</notice >

Define Dashboard hostname in the `dashboard.values.yaml`
([file in github](https://github.com/th2-net/th2-infra/blob/master/example-values/prometheus-operator.values.yaml)):

```yaml[dashboard.values.yaml]
ingress:
  hosts:
    - <th2_host_name>
```

### `prometheus-operator.values.yaml`

#### Define Grafana hostname

Define Grafana hostnames in the `prometheus-operator.values.yaml` ([file in github](https://github.com/th2-net/th2-infra/blob/master/example-values/prometheus-operator.values.yaml)):

<notice info >

To get <th2_host_name>, execute the `kubectl cluster-info` command.

</notice >

```yaml[prometheus-operator.values.yaml]
grafana:
  ingress:
    hosts:
      - <th2_host_name>
```

### Access to the `th2-infra-schema` Git repository for `th2-infra-mgr`

The `th2-infra-mgr` component monitors the `th2-infra-schema` repository and updates it
according to the user's actions in the `th2-infra-editor` GUI. To make it possible,
it is required that the `th2-infra-mgr` component is granted SSH access with write permissions.

<notice warning >

Make sure that you are located in the `th2-infra/example-values` directory.

</notice >

Generate SSH keys without a passphrase:

```shell
ssh-keygen -t rsa -m pem -f ./infra-mgr-rsa.key
```

[Add a new SSH key to your GitHub account](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)

Create a Kubernetes Secret `infra-mgr` from the private SSH key:

```shell
kubectl -n service create secret generic infra-mgr --from-file=infra-mgr=./infra-mgr-rsa.key
```

### `service.values.yaml`

#### Link `th2-infra-mgr` to the `th2-infra-schema` repository

In your copy of the `service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/master/example-values/service.values.yaml),
set the `infraMgr.git.repository` value to the SSH link of your `th2-infra-schema` repository, e.g:

```yaml[service.values.yaml]
infraMgr:
  git:
    repository: git@github.com:th2-net/th2-infra-demo-configuration.git
```

#### Define RabbitMQ hostname

In your copy of the `service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/master/example-values/service.values.yaml),
set the `externalRabbitMQHost.host` value to the hostname of your cluster.


<notice info >

To get <th2_host_name>, execute the `kubectl cluster-info` command.

</notice >

```yaml[service.values.yaml]
externalRabbitMQHost:
  host: <th2_host_name>
```

#### Define Cassandra hostname

In your copy of the `service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/master/example-values/service.values.yaml),
set the `cassandra.host` value to the hostname of the Cassandra cluster.

<notice info >

You can find the Cassandra cluster's hostname by executing the `nodetool status` command.

</notice >

<notice warning >

If you are using minikube, set `cassandra.host` value to `host.minikube.internal`.
You can find more information [here](https://minikube.sigs.k8s.io/docs/handbook/host-access/).

</notice >

```yaml[service.values.yaml]
cassandra:
  internal: false
  host: <cassandra-host>
```

#### Define th2 Ingress hostname

If required, add the `ingress.hostname` value into the
`service.values.yaml` [GitHub file](https://github.com/th2-net/th2-infra/blob/master/example-values/service.values.yaml).
Otherwise, th2 web services will be available via the IP address of the node
(e.g. <ip_address>:30000/dashboard/ rather than <ingress.hostname>:30000/dashboard/).

<notice note >

If you don't have the DNS configured for your th2 cluster, we recommend leaving `ingress.hostname` empty.

</notice >

### `secrets.yaml`

#### Create a Kubernetes Secret with th2 credentials

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
    user: <user-name>
    password: <password>

rabbitmq:
# set admin user credentials, it will be created during deployment
  rabbitmqUsername: th2
  rabbitmqPassword: rab-pass
  # must be random string
  rabbitmqErlangCookie: cookie
```

