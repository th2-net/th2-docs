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

In th2 implementation, a box functionally representing a *module* is defined through the `Th2Box` kind specified in its Custom Resource, as opposed to the `Th2CoreBox` kind reserved for th2 Core boxes.

## Message

In th2, a *Message* is the entity that is used to transfer information to and from a system under test (SUT). 
For example, if an exchange is being tested, order details are sent to the SUT by a *message*, and the SUT’s execution report is received via a *message*.  

A *message* is an instance of the class `Message`. 
This class is a data structure that contains attributes such as `parent_event_id`, `messageMetaData`, and `fields`.
*Messages* are encoded and decoded by the th2 components according to the protocol used and the information in the `messageMetaData` and the `fields` should be set up according to the specification of the protocol.
The protocol used is determined by the system that is being tested.
Consequently, a *message* exists as raw *message* (encoded) of class `RawMessage`, and a parsed *message* (decoded) of class `Message`. 

Within the th2 cluster, *messages* are transferred between the th2 components by the message broker RabbitMQ. 
All raw *messages* are saved to the th2 data lake using RabbitMQ, the component [th2-message-store](https://github.com/th2-net/th2-mstore), and [Cradle API](https://github.com/th2-net/cradleapi).
All *messages* produced are associated with their subsequent test event and can be viewed in the final th2 test report.

## Event

An _event_ corresponds to a significant action or occurrence in a software system.
In th2, _events_ correspond to the actions of th2 components during a test run.

An _event_ is the instance of `Event` class having attributes that record information about the corresponding action.
Of these `Event` attributes, `ID`, `name` (for a single _event_), and `start_timestamp` are mandatory for storing _events_. 

While a single _event_ represents a single action, a batch of _events_ represents a sequence of actions that take place during a test run.
Typically, batch creation is set up within a test script.
Each _event_ batch contains a root _event_ that represents the first action.
The subsequent _events_ in a batch can be identified as either parent or child _events_ according to their hierarchy level.
In an _event_ batch, _events_ reference their parent _event_ or other _events_ within the same batch. Different _event_ batches are isolated from each other.
_Events_ outside a batch do not reference _events_ within the batch. 

All _events_ are sent via RabbitMQ to the [th2-event-store](https://github.com/th2-net/th2-estore) component which then saves them in th2’s data lake Cassandra via [Cradle API](https://github.com/th2-net/cradleapi).
_Events_ are either stored separately or in batches.
The saved _events_ are later extracted from the storage and displayed in the th2 test report in a chronologically and hierarchically organized manner.

