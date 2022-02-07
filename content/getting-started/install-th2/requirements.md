---
title: "Step 1: Install required software"
weight: 5
chapter: false
image: /img/getting-started/th2-env-schema/Demo-cluster-components-1-install-software.drawio.png
next:
  title: "Publish th2-infra-schema"
  link: "./publish-schema"
  icon: ""
---

<custom-stepper steps="5" step="1" > </custom-stepper>

As a result of this step, you will prepare your test and operator boxes and get the following
th2 components as part of the final th2 schema:

1. [Docker](#1-docker-ce-v19)
2. [Kubernetes cluster](#3-kubernetes-cluster)
3. [Cassandra database cluster](#5-cassandra)
4. [Git](#1-git)
5. [Web browser](#4-chrome-75-or-newer)

![](/img/getting-started/th2-env-schema/Demo-cluster-components-1-install-software.drawio.png)

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

### 2. kubelet, kubeadm, kubectl v1.19.x - 1.20.x

[Kubernetes](https://kubernetes.io/) is an open-source automated management system for containerized applications – in our case, Docker containers.

The [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) is a service that powers the Kubernetes.

[Kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/) is a set of tools for creating and managing a Kubernetes cluster.

[Kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) is a command line interface for interacting with a Kubernetes cluster.

Instructions for installing these tools can be found in the official Kubernetes [installation guide](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/).

<spoiler title="Verify that kubelet, kubeadm, kubectl are installed" >

Check if the kubelet service running:

```bash
systemctl status kubelet
```

Output example:

```bash
● kubelet.service - kubelet: The Kubernetes Node Agent
     Loaded: loaded (/lib/systemd/system/kubelet.service; enabled; vendor preset: enabled)
    Drop-In: /etc/systemd/system/kubelet.service.d
             └─10-kubeadm.conf
     Active: inactive (dead) (Result: exit-code) since Fri 2021-09-17 14:26:40 MSK; 1 weeks 3 days ago
       Docs: https://kubernetes.io/docs/home/
   Main PID: 3355568 (code=exited, status=255/EXCEPTION)
```

Check kubectl version and kubeadm version:

```bash
kubectl version
kubeadm version
```

Output example:

```bash
$ kubectl version
Client Version: version.Info{Major:"1", Minor:"22", GitVersion:"v1.22.2", GitCommit:"8b5a19147530eaac9476b0ab82980b4088bbc1b2", GitTreeState:"clean", BuildDate:"2021-09-15T21:38:50Z", GoVersion:"go1.16.8", Compiler:"gc", Platform:"linux/amd64"}
Server Version: version.Info{Major:"1", Minor:"19", GitVersion:"v1.19.14", GitCommit:"0fd2b5afdfe3134d6e1531365fdb37dd11f54d1c", GitTreeState:"clean", BuildDate:"2021-08-11T18:02:17Z", GoVersion:"go1.15.15", Compiler:"gc", Platform:"linux/amd64"}
$ kubeadm version
kubeadm version: &version.Info{Major:"1", Minor:"20", GitVersion:"v1.20.9", GitCommit:"7a576bc3935a6b555e33346fd73ad77c925e9e4a", GitTreeState:"clean", BuildDate:"2021-07-15T21:00:30Z", GoVersion:"go1.15.14", Compiler:"gc", Platform:"linux/amd64"}
```

</spoiler >

### 3. Kubernetes cluster

<notice note >

Minikube can be installed as an alternative to **2. kubelet, kubeadm, kubectl** and **3. Kubernetes cluster** steps.
Minikube runs a Kubernetes cluster inside a container.
It is easier to configure, but it cannot expand a cluster to several nodes.
See the [installation instructions](https://minikube.sigs.k8s.io/docs/start/) in the official minikube documentation.

<spoiler title="How to create a Kubernetes cluster with Minikube" >

It is possible to specify a version of a Kubernetes cluster before running it.

```bash
minikube start --kubernetes-version v1.19.14
```

</spoiler >

</notice >

The th2 modules will run on the Kubernetes [cluster](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-cluster). Use the official [guide](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) to create a cluster.

<spoiler title="Verify that the Kubernetes cluster is running" >

Check cluster information:

```bash
kubectl cluster-info
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
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

<spoiler title="Verify Flannel plugin is installed" >

Get the Flannel pod:

```bash
kubectl get pods -l app=flannel -n kube-system
```
Output example:

```bash
NAME                    READY   STATUS    RESTARTS   AGE
kube-flannel-ds-g4tmx   1/1     Running   0          41d
```

</spoiler >

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

### 5. Cassandra

The Cassandra database is used in th2 setup to store all the data generated or processed by th2.

To install Cassandra, follow the [guide](https://cassandra.apache.org/doc/latest/cassandra/getting_started/installing.html).

<notice warning >

If you are using Minikube, change `rpc_address` in the [Cassandra config file](https://cassandra.apache.org/doc/latest/cassandra/getting_started/configuring.html)
from `localhost` to `0.0.0.0`.

</notice >
