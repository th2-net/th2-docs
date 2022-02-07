---
title: "Step 1: Install required software"
weight: 5
chapter: false
image: /img/getting-started/th2-env-schema/Demo-cluster-components-1-install-software.drawio.png
next:
  title: "Publish th2-infra-schema"
  link: /getting-started/install-demo/publish-schema
  icon: ""
---

<custom-stepper steps="7" step="1" > </custom-stepper>

As a result of this step, you will prepare your test and operator boxes and get the following
th2 components as part of the final th2 schema:

1. [Docker](#1-docker-ce-v19)
2. [Kubernetes cluster](#3-kubernetes-cluster)
3. [Cassandra database cluster](#5-cassandra)
4. [Git](#1-git)
5. [Web browser](#4-chrome-75-or-newer)

![](/img/getting-started/th2-env-schema/Demo-cluster-components-1-install-software.drawio.png)

## Operator box

### 1. Git

Git is the most popular project version control system. Created in line with DevOps/GitOps paradigm, th2 keeps track of git repositories of modules and updates its configuration when they change.

Follow [these instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install Git.

<spoiler title="Verify GIT is installed" >

Check the Git version:

```bash
git --version
```

Output example:

```bash
git version 2.33.0
```

</spoiler >

### 2. Kubectl

Kubectl is a command line interface for interacting with the Kubernetes cluster.

Installation instructions are given on the [Kubernetes website](https://kubernetes.io/docs/tasks/tools/#kubectl).

<spoiler title="Verify that kubectl is installed" >

Check kubectl version:

```shell
kubectl version
```

Output example:

```shell
Client Version: version.Info{Major:"1", Minor:"22", GitVersion:"v1.22.2", GitCommit:"8b5a19147530eaac9476b0ab82980b4088bbc1b2", GitTreeState:"clean", BuildDate:"2021-09-15T21:38:50Z", GoVersion:"go1.16.8", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"19", GitVersion:"v1.19.14", GitCommit:"0fd2b5afdfe3134d6e1531365fdb37dd11f54d1c", GitTreeState:"clean", BuildDate:"2021-08-11T18:02:17Z", GoVersion:"go1.15.15", Compiler:"gc", Platform:"linux/amd64"}
```

</spoiler >

### 3. Helm 3+

Helm is a package manager for Kubernetes used to deploy required modules to a Kubernetes cluster.

[Official installation guide](https://helm.sh/docs/intro/install/).

<spoiler title="Verify Helm is installed" >

Check the Helm version:

```bash
helm version
```

Output example:

```bash
version.BuildInfo{Version:"v3.6.0", GitCommit:"7f2df6467771a75f5646b7f12afb408590ed1755", GitTreeState:"clean", GoVersion:"go1.16.3"}
```

</spoiler >

### 4. Chrome 75 or newer

A browser is required to access the th2 web interface, Kubernetes dashboard, Grafana, etc. For th2, we use Chrome. To install it, use [this link](https://www.google.com/chrome).

### 5. Python 3.7+

Python programming language is required for CQLSH and for running demo script.

[Installation guide](https://wiki.python.org/moin/BeginnersGuide/Download)

<spoiler title="Verify Python is installed" >

Check the Helm version:

```shell
python --version
```

Output example:

```shell
Python 3.9.6
```

</spoiler >

### 6. Java 8

Java programming language is required for running special modules for demo script.

[Installation guide](https://www.java.com/en/download/help/download_options.html)

<spoiler title="Verify Java is installed" >

Check the Helm version:

```shell
java --version
```

Output example:

```shell
openjdk 11.0.13 2021-10-19
OpenJDK Runtime Environment (build 11.0.13+8-Ubuntu-0ubuntu1.20.04)
OpenJDK 64-Bit Server VM (build 11.0.13+8-Ubuntu-0ubuntu1.20.04, mixed mode, sharing)
```

</spoiler >

### 7. Cassandra Query Language Shell (CQLSH)

CQLSH is the command line interface, that provide you access to the Cassandra database.

```shell
pip install cqlsh
```

<spoiler title="Verify CQLSH is installed" >

Check the Helm version:

```shell
cqlsh -u cassandra -p cassandra
```

Output example:

```shell
Connected to My Cluster at 127.0.0.1:9042
[cqlsh 6.0.0 | Cassandra 4.0.1 | CQL spec 3.4.5 | Native protocol v5]
Use HELP for help.
cassandra@cqlsh> 
```

</spoiler >

### 8. Portainer (Optional)

Portainer is the web UI for docker.
It can help to manage `minikube` container with Kubernetes cluster
and `th2-storage` container with Cassandra database.

Run Portainer docker container:

```shell
docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
```

After that Portainer can be accessed from `http://localhost:9000`

## Test box (th2 node)

To get started with th2, you will need a fully operational [Kubernetes](https://kubernetes.io/) cluster
installed on your test box/boxes. A quick guide on Kubernetes installation on Centos-7 is available
in the [FAQ section](https://github.com/th2-net/th2-documentation/wiki/Centos-7-kubernetes-and-cassandra-installation-guide)
of the th2 GitHub repository Wiki.

Prior to moving to the next steps, make sure that your test box and operator box
meet th2 [technical requirements](https://d0rich.github.io/th2-docs/getting-started/requirements/).

### 1. Docker CE v19+

Docker is the most popular open-source application containerization technology.
The th2 services will run inside separate Docker containers.

To install Docker, follow the [official guide](https://docs.docker.com/engine/install/). Upon installation, you will need to [configure Docker](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker) for Kubernetes.

<spoiler title="Verify that the Docker Engine is installed correctly" >

Check the status of the Docker process:

```bash
sudo docker run hello-world
```

Output example:

```bash
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

</spoiler >

### 2. Minikube

Minikube runs a Kubernetes cluster inside a container.
It is easier to configure than common Kubernetes cluster, 
but it cannot be expanded to several nodes.
See the [installation instructions](https://minikube.sigs.k8s.io/docs/start/) 
in the official minikube documentation.

### 3. Kubernetes cluster

The th2 modules will run on the Kubernetes [cluster](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-cluster).

With minikube it is possible to specify a version of a Kubernetes cluster before running it.

```shell
minikube start --kubernetes-version v1.19.14
```

<spoiler title="Verify that the minikube Kubernetes cluster is running" >

Check cluster information:

```shell
minikube kubectl cluster-info
```

Output example:

```bash
Kubernetes control plane is running at https://192.168.49.2:8443
KubeDNS is running at https://192.168.49.2:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

</spoiler >

### 4. Flannel CNI

Flannel is a Kubernetes add-on that addresses networking [issues](https://kubernetes.io/docs/concepts/cluster-administration/networking/).

To install it, you need to run the following command:

```bash
minikube kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

<spoiler title="Verify Flannel plugin is installed" >

Get the Flannel pod:

```bash
minikube kubectl get pods -l app=flannel -n kube-system
```
Output example:

```bash
NAME                    READY   STATUS    RESTARTS   AGE
kube-flannel-ds-g4tmx   1/1     Running   0          41d
```

</spoiler >

### 5. Cassandra

The Cassandra database is used in th2 setup to store all the data generated or processed by th2.

For the demo purposes we will run Cassandra inside docker.

```shell
docker run --name th2-storage -p 0.0.0.0:9042:9042 -v "$HOME/cassandra:/var/lib/cassandra" -d bitnami/cassandra:latest
```

<spoiler title="Verify Cassandra database is running" >

Get `USERS` table from inside docker container:

```shell
docker exec -it th2-storage bash
cqlsh -u cassandra -p cassandra
LIST USERS;
exit
exit
```
Output example:

```shell
I have no name!@398e6ce6c24e:/$ cqlsh -u cassandra -p cassandra
Connected to My Cluster at 127.0.0.1:9042
[cqlsh 6.0.0 | Cassandra 4.0.1 | CQL spec 3.4.5 | Native protocol v5]
Use HELP for help.
cassandra@cqlsh> list users;

 name      | super | datacenters
-----------+-------+-------------
 cassandra |  True |         ALL

(1 rows)
```

</spoiler >


