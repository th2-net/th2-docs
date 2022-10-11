---
title: Key concepts
weight: 20
---

## Box
Across this documentation resource, the term *box* can refer to two different things: 
1) a virtual or physical machine performing a particular function (e.g. *operator box* or *tester box*), and 
2) an instance of a th2 module deployed within a th2 cluster as a microservice. 

*th2 box* is a box in the 2nd sense – a th2 component that represents some function or service of th2.
Across the th2 ecosystem, the source code of each microservice (or box) is typically written in Java or Kotlin, but can be written in any language as per business needs.
The source code for each open-source module can be found in GitHub: among several repositories comprising a family, there is typically one that is used as is or after customization to deploy a corresponding box (or several boxes) in a th2 cluster.
Boxes in th2 can refer to implementations of either Core (framework-level th2 functionalities) or Module (specific software testing–related functionalities) instances. 

Each box exists as a docker image in a registry and is deployed as a Docker container. 
Management of the deployed th2 boxes is orchestrated using the combination of infra components and Kubernetes.
To deploy a box, a custom resource (CR) must be created. Each CR is a `yaml` file that describes the state of the box after deployment.
The CR contains information such as Docker image and version, resources, pins, etc. 
A set of boxes (in the form of CRs) is provided in infra-schema in a Git repository.

## Module
While a box is a particular instance in th2 implementation, a *module* is the functional unit within the th2 framework. 
th2 *modules* are responsible for a wide range of functionalities associated with specific software testing actions, such as connecting to external systems, sending and receiving messages, performing rule-based checks.
On GitHub, a typical *module* is represented by a family of [th2-net](https://github.com/th2-net) repositories containing source code for a th2 box to be deployed as is, as well as libraries and templates to support creation of custom th2 boxes of a certain functional type.

In case of customization, a generic Docker image of a specific box is used as a basis for implementing extensions on top of the off-the-shelf functionality of the component (e.g. extensions related to different protocols).
For example, the [th2-conn-generic](https://github.com/th2-net/th2-conn-generic) repository contains an implementation of the FIX protocol connectivity extension on top of the basic [th2-conn](https://github.com/th2-net/th2-conn) functionality.

In th2 implementation, a box functionally representing a *module is defined through the `Th2Box` kind specified in its Custom Resource, as opposed to the `Th2CoreBox` kind reserved for th2 Core boxes.

<!-- more concepts to be added in the future -->
