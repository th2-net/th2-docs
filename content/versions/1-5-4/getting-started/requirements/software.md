---
title: Software
weight: 10
---

# Software requirements

One machine can combine several types listed here.

## th2 node

The th2 node is a machine where your th2 system will run fully or partially.

1. Docker CE v19+  
   Container runtime Docker CE installed.  

   Docker is the most popular open-source application containerization technology.
   The th2 services will run inside separate Docker containers.

   To install the Docker, follow the [official guide](https://docs.docker.com/engine/install/). Upon installation, you will need to [configure Docker](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker) for Kubernetes.
   - [Overlay2 storage driver prerequisites](https://docs.docker.com/storage/storagedriver/overlayfs-driver/#prerequisites)
   - [Installation guide](https://docs.docker.com/engine/install/)
   - [Configuration for Kubernetes](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker)


2. Kubernetes v1.19.x or 1.20.x  
   Kubernetes cluster installed (single master node as development mode, master and 2+ workers as production mode) with the [flannel CNI plugin](https://coreos.com/flannel/docs/latest/kubernetes.html#the-flannel-cni-plugin).  

   The [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) is a service that powers the Kubernetes.  
   [Kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/) is a set of tools for creating and managing a Kubernetes cluster.  

   Kubernetes is needed as environment for th2 components. Th2 is microservices framework, so any component of th2 is some piece of logic, no more. With Kubernetes all pieces of th2 logic can be freely created, desctroyed, updated.
   - [Kubernetes tools installation](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
   - [Creating a cluster](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)
   - Installing Flannel CNI:  
    Execute the following command in the terminal:
    ```shell
    kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
    ```

## Operator box

The operator box is a machine used to monitor and control the th2 cluster.

1. Git  
   Git is the most popular project version control system. Created in line with the DevOps/GitOps paradigm, th2 synchronizes configuration in the git repositories with the state of the testing system and updates corresponding components.
   - [Installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. Kubectl  
   [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) is a command line interface for interacting with the Kubernetes cluster.  
   - [Installation guide](https://kubernetes.io/docs/tasks/tools/)
3. Helm 3+  
   Helm is a package manager for Kubernetes used to deploy required modules to a Kubernetes cluster.  
   - [Installation guide](https://helm.sh/docs/intro/install/)
4. Chrome 75 or newer  
   A browser is required to access the th2 web interface, Kubernetes dashboard, Grafana, etc.  
   - [Download](https://www.google.com/chrome)

## Apache Cassandra node

The Apache Cassandra node is a machine where the Cassandra database for your th2 system will be deployed.

1. Cassandra 3.11.6+  
   Cassandra plays role of data storage for th2. It is NoSQL distributed database with high performance. So the storage is quite flexible for your needs.
   - [Java 8 installation guide](https://www.java.com/en/download/help/download_options.html). Cassandra requires Java for running
   - [Cassandra installation guide](https://cassandra.apache.org/doc/latest/getting_started/installing.html#installing-cassandra)

2. cqlsh
   `cqlsh` is the command line interface, that provides you with an access to the Cassandra database.
   - [Python 3.7+ installation guide](https://wiki.python.org/moin/BeginnersGuide/Download). `cqlsh` is based on the Python, so you need to install this programming language as well.
   - `cqlsh` is installed with Cassandra, but you also can install it with `pip`:
    ```sh
    pip install cqlsh
    ```

## Tester box

Tester boxes are the machines used for executing special scripts in the th2 and then acquiring results.

1. Git  
   Git is required for fetching scripts from the Git server and changing `th2-infra-schema`.
   - [Installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. Kubectl  
   Some th2 modules use configured Kubectl for getting credentials for connecting to Kubernetes cluster with th2.  
   - [Installation guide](https://kubernetes.io/docs/tasks/tools/)
3. Chrome 75 or newer  
   A browser is required to access the th2 web interface, Kubernetes dashboard, Grafana, etc.  
   - [Download](https://www.google.com/chrome)
4. Programming languages and appropriate package managers for running your th2 modules locally
   th2 is microservices solution. So it is possible to run program with any programming languages you want. Mostly it happens within Docker containers. In this case you won't need to install language locally.  
   But there is a possibility to run your code locally. And it will work like it is running in th2 cluster. We call these modules *External boxes*. You need to install programming languages for *External* boxes only.  
   From expirience of Exactpro:
   - Technically, Python scripts for testing are the *External boxes*. So if you want to write scripts, you will need Python and `pip`.
   - Some *External boxes* require Java and Gradle.
