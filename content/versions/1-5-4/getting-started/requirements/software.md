---
title: Software
inner-title: Software requirements
weight: 10
---

One machine can combine several types listed here.

## th2 node

The th2 node is a machine where your th2 system will run fully or partially.

1. Docker CE v19+  
   Container runtime Docker CE installed.
  - [Overlay2 storage driver prerequisites](https://docs.docker.com/storage/storagedriver/overlayfs-driver/#prerequisites)
  - [Installation guide](https://docs.docker.com/engine/install/)
  - [Configuration for Kubernetes](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker)
2. Kubernetes v1.19.x or 1.20.x  
   Kubernetes cluster installed (single master node as development mode, master and 2+ workers as production mode) with the [flannel CNI plugin](https://coreos.com/flannel/docs/latest/kubernetes.html#the-flannel-cni-plugin).
  - [Kubernetes tools installation](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
  - [Creating a cluster](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/)
  - Installing Flannel CNI:  
    Execute the following command in the terminal:
    ```shell
    kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
    ```

## Operator box

The operator box is a machine used to monitor and control the th2 cluster.

1. Git - [Installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. Kubectl - [Installation guide](https://kubernetes.io/docs/tasks/tools/)
3. Helm 3+ - [Installation guide](https://helm.sh/docs/intro/install/)
4. Chrome 75 or newer - [Download](https://www.google.com/chrome)


## Apache Cassandra node

The Apache Cassandra node is a machine where the Cassandra database for your th2 system will be deployed.

1. Java 8 - [Installation guide](https://www.java.com/en/download/help/download_options.html)
2. Python 3.7+ (for cqlsh) - [Installation guide](https://wiki.python.org/moin/BeginnersGuide/Download)
3. Cassandra 3.11.6+ - [Installation guide](https://cassandra.apache.org/doc/latest/getting_started/installing.html#installing-cassandra)
