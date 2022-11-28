---
weight: 20
---

# Key concepts

- **_Box_**:
In the context of th2 implementation, a microservice.
This microservice is either an instance of a th2 module or th2 core component deployed within the th2 cluster to perform a particular function.

- **_External Box_**: 
An optional work mode that allows you to run any th2 module runtime on your local machine like it is already a part of the th2 cluster.

- **_Module_**:
Any functional unit of th2, the functionality of which can be extended/adapted to meet a wide range of testing needs.
Unlike th2 Core components, a _module_ can be represented by multiple instances (boxes) running within the same th2 environment.

- **_th2 Core_**:
_Core_ functional units of th2, the functionality of which is predefined and remains the same in all th2 test environments.
In contrast to modules, there can be only a single instance (box) of a _th2 core_ functional unit within one th2 environment.

- **_Pin_**:
A user-declared point of connection to a box.
A box sends or receives messages via pins.

- **_Link_**:
A user-declared connection between two th2 components.
A link determines the origin and the destination of messages during communication.

- **_Dictionary_**:
Static data shared between th2 components.

- **_Infra components_**:
The four components that make up the th2 infrastructure and automate the deployment of the test environment infrastructure: infra-schema, infra-mgr, infra-operator, infra-editor.

- **_th2-infra_**: 
_th2-infra_ is a repository with documentation about how to work with th2 infrastructure.
This repository has source code for helm charts which is installed with Helm CLI.

- **_infra-Schema_**:
 A custom test environment designed by the user and implemented as a Git repository of declarative manifests called [custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).

- **_Event_**:
Any noteworthy action performed by a th2 component during test execution.
Examples of events: creating checkpoints, sending messages, verification of messages.

- **_Message_**: 
A unit of information used for data transfer between th2 and the system under test as well as for communication between th2 components.

- **_th2 Report UI_**:
An interactive web app that displays stored test execution data (events and messages) and allows for a wide range of data analytics capabilities. 

- **_Script_**:
An executable test scenario triggering events in th2. 
Test actions, including sending and receiving messages, generating data, or performing various checks, are initiated within the _script_ with the help of th2 libraries.
In th2, the _script_ is run as an external box. 








