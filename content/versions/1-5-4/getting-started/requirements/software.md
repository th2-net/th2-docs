---
title: Software
inner-title: Software requirements
weight: 10
---

This table contains the list of Technologies and their versions which are required to work with th2. Installation instructions are given in [Installation](../../getting-started/install-th2/1-base-system/basic) section. 

# th2 node
The th2 node is a machine where your th2 system will run fully or partially.

|Technology|Version|
|---|---|
|Docker|19+ or 20+|   
|Kubernetes|1.19.x or 1.20.x latest patch version|   
|kubeadm||   
|kubelet||
|kubectl|1.18, 1.19, 1.20, 1.21. You must use a kubectl version that is within one minor version difference of your cluster. |
|flannel CNI||

# Operator box 
The operator box is a machine used to monitor and control the th2 cluster.

|Technology|Version|
|---|---|
|Git||
|Helm 3+||
|kubectl|You must use a kubectl version that is within one minor version difference of your cluster.|
|Chrome|75 or newer|

# Apache Cassandra node
The Apache Cassandra node is a machine where the Cassandra database for your th2 system will be deployed.

|Technology|Version|
|---|---|
|Cassandra|3.11.6+|
|Java|8|
|sqlsh||
|Python|3.7+ (for sqlsh)|

# Tester box

Tester boxes are the machines used for executing special scripts in th2 and then acquiring results.

|Technology|Version|
|---|---|
|Git||
|kubectl||
|Chrome|75 or newer|

# External box
External boxes are needed to run the code locally. For example, Python scripts for th2 are external boxes. 
For running the code locally (not inside Docker containers) you need to install programming languages. 

The choice of the languages depends on testing purposes. 

|Technology|Version|
|---|---|
|Python||
|pip||
|Java|8+|
|Gradle||
