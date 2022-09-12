---
title: 1. Set up the environment 
weight: 0
read_before:
  - title: th2 software requirements
    icon: mdi-alert-circle-outline
    href: ../../getting-started/requirements/software
continue_learning:
  - title: Publish infra schema
    href: ./2-infra-schema
use_cases_link:
  - title: th2 use cases
    icon: mdi-cog
    href: ../requirements/hardware
install_variants:
  - title: Basic installation
    href: ./basic
    icon: mdi-hand-back-left-outline
clusters_link:
  - title: Run Kubernetes cluster
    icon: mdi-kubernetes
    href: ../requirements/software#th2-node
  - title: Run Cassandra cluster
    icon: mdi-database
    href: ../requirements/software#apache-cassandra-node
---

Install Kubernetes and Cassandra clusters to use them as a fundamental system for th2.


<!--more-->

## Fundamental system

th2 is running over Kubernetes and Cassandra clusters.

Kubernetes is needed as an environment underpinning the idea of th2 as a microservices framework. It provides the flexibility for any component of th2 to be created, updated or deleted without impacting the entire solution.

Cassandra plays a role of data storage for th2. It is a high performance NoSQL distributed database. So the storage is quite flexible for your needs.

## Common tools

Independently of how you are going to run the fundamental system, you will need some tools to interact with it. Interaction with Cassandra and Kubernetes is needed for the process of the th2 configuration. It can also be useful for possible debugging.

| Tool    | Version         |
| ------- | --------------- |
| Docker  | 19+             |
| kubectl | 1.19.x - 1.20.x |
| Helm    | 3+              |
| cqlsh   |                 |


You can find some th2 use cases with provided machines listing.

<recommendations :items="use_cases_link"></recommendations>

One machine can combine several types listed here.

You can choose either a full setup, or a [quick setup](#quick-installation) for demo purposes. 


## th2 node

The th2 node is a machine where your th2 system will run fully or partially.

1. Docker CE v19+  
   
   Docker is the most popular open-source application containerization technology.
   The th2 services will run inside separate Docker containers.

   To install Docker, follow the [official guide](https://docs.docker.com/engine/install/). Upon installation, you will need to [configure Docker](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker) for Kubernetes.
   - [Overlay2 storage driver prerequisites](https://docs.docker.com/storage/storagedriver/overlayfs-driver/#prerequisites)
   
2. Kubernetes v1.19.x or 1.20.x  
   Kubernetes cluster installed (single master node as development mode, master and 2+ workers as production mode) with the [flannel CNI plugin](https://coreos.com/flannel/docs/latest/kubernetes.html#the-flannel-cni-plugin).  

   The [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) is a service that powers Kubernetes.  
   [Kubeadm](https://kubernetes.io/docs/reference/setup-tools/kubeadm/) is a set of tools for creating and managing a Kubernetes cluster.  

   Kubernetes is needed as an environment for th2 components. th2 is a microservices framework, so any component of th2 is some piece of logic, no more. With Kubernetes all pieces of th2 logic can be freely created, destroyed, updated.
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
2. kubectl  
   [Kubectl](https://kubernetes.io/docs/reference/kubectl/) is a command line interface for interacting with a Kubernetes cluster.  
   - [Installation guide](https://kubernetes.io/docs/tasks/tools/#kubectl)
3. Helm 3+  
   Helm is a package manager for Kubernetes used to deploy required modules to a Kubernetes cluster.  
   - [Installation guide](https://helm.sh/docs/intro/install/)
4. Chrome 75 or newer  
   A browser is required to access the th2 web interface, Kubernetes dashboard, Grafana, etc.  
   - [Download](https://www.google.com/chrome)

## Apache Cassandra node

The Apache Cassandra node is a machine where the Cassandra database for your th2 system will be deployed.

1. Cassandra 3.11.6+  
   Cassandra plays the role of data storage for th2. It is NoSQL distributed database with high performance. So the storage is quite flexible for your needs.
   - [Cassandra installation guide](https://cassandra.apache.org/doc/latest/getting_started/installing.html#installing-cassandra)
   Cassandra requires Java for running (Java 8+)
   - [Java installation guide](https://www.java.com/en/download/help/download_options.html)
   

2. cqlsh
   `cqlsh` is the command line interface, that provides you with an access to the Cassandra database.
   - [Python 3.7+ installation guide](https://wiki.python.org/moin/BeginnersGuide/Download). `cqlsh` is based on Python, so you need to install this programming language as well.
   - `cqlsh` is installed with Cassandra, but you also can install it with `pip`:
    ```sh
    pip install cqlsh
    ```

Also it is needed to:
- create a user with admin rights for th2;
- provide access to the Cassandra database over the network.

## Tester box

Tester boxes are machines used for executing test scripts and getting test execution results.

1. Git  
   Git is required for fetching scripts from the Git server and changing `th2-infra-schema`.
   - [Installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. kubectl  
   Some th2 modules use configured Kubectl for getting credentials for connecting to Kubernetes cluster with th2.  
   - [Installation guide](https://kubernetes.io/docs/tasks/tools/)
3. Chrome 75 or newer  
   A browser is required to access the th2 web interface, Kubernetes dashboard, Grafana, etc.  
   - [Download](https://www.google.com/chrome)
4. Programming languages and appropriate package managers for running your th2 modules locally
   th2 is a microservices solution allowing to use diverse programming languages. To support them, Docker containers can be used so that there's no need to install a programming language locally.  
   However, the possibility to run your code locally exists. It is implemented through th2 external boxes communicating with a th2 cluster. In this case, programming languages are installed locally for external boxes only.  
