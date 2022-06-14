---
title: check1
inner-title: th2-check1
related:
  - name: "th2-net/th2-check1"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-check1"
--- 

## 1. Overview

th2-check1 is a component of th2 that performs message stream verification. When users accept response(s) from the system, they can use check1 to execute **rule(s)** to verify these system response(s) by submitting rule requests using **gRPC**.
 
<notice info>
A rule is a set of logical steps to compare actual results against expected outcomes. 
</notice>

Rule requests are submitted by the script and verification is done in the background while the script continues to work without waiting for verification to complete. 

<notice info>
The th2-script is code which contains a set of requests to the th2 components.
Check1 component (server) interacts with the script (client) through gRPC. 
</notice>



Rules, used for check1 verification, exist only in the th2-check1 component and rule execution happens on the th2-check1 side. The user can perform verification through the following three rule requests.

`CheckRuleRequest` - contains a filter to verify a single message. The rule is unable to identify other unexpected responses from the system. 

`CheckSequenceRuleRequest` (recommended rule) - contains more than one filter and can check several responses.  

`NoMessageCheckRequest` - is used for pre-filtering the messages that should not be received.

<notice info>

`CheckSequenceRule` is a rule in check1 that compares a message to expected results;

`CheckSequenceRuleRequest` is a request created by a user and contains expected results and parameters for verification logic;

`submitCheckSequenceRule()` is a method to submit the `CheckSequenceRuleRequest` in check1 for `CheckSequenceRule` execution.

</notice>

Verification by check1 identifies expected, unexpected (extra), and missing responses from the system, checks the order of the responses and verifies the accuracy of the information in the field.

<notice info>

A response is created as a result of a message sent to the system. 

For example, a new trade order sent to an exchange (system) returns an execution report (response) with details about the trade’s execution.

</notice>

### Interactions between check1 and other th2 components

![](/img/boxes/exactpro/check1/fgr1_check1_interactions.png "Figure 1. Interactions between check1 and other components") 

<center>
Figure 1. Interactions between check1 and other components.
</center> 

|Component| Description| Communication
|---|---|---|
|th2-script|If the message request to th2-act by the script was a success, check1 receives verification requests with expected values, parameters, and checkpoint.|grpc|
|th2-act|Once the th2-act component receives a send message request from the script, check1 receives a checkpoint request, and sends back checkpoints to th2-act.|grpc
|th2-codec|check1 receives decoded system responses.| mq , parsed|
|th2-estore|check1 sends all events, such as checkpoint creation and verified responses, to event store and cradle. Each event has a unique string id, and the id of a parent event, and timestamps for start and end of event.|mq , event|

## 2. Family of repositories that are required for th2-check1
The th2-check1 module is represented by the following repositories:

th2-net/th2-check1 - the repository with a source code which can be used to generate the docker image. Check1 image is already in the registry for use. The docker image is pulled to Kubernetes to create the pod. 

th2-net/th2-grpc-check1 - the gRPC check1 library (3.5.1). This library is used to create and publish packages in Python or Java. Includes the check1.proto file described below.

check1.proto - the gRPC check1.proto file contains the definition of check1 service and the data structure of the requests and responses.

common.proto - the gRPC common.proto file contains definitions on common classes required by the check1 service.

<notice info>
A .proto file is the interface definition written using Interface Definition Language (IDL) from Protocol Buffers and defines the interface between a client and server for gRPC. The Protocol Buffers IDL is a custom, platform-neutral language with an open specification.

The .proto file is then used to automatically generate language- or platform-specific stubs for clients and servers. Stubs are needed for parameter conversion so that servers can understand the client requests. The client program imports this interface, while the server program exports this interface. 

The interface allows two components written in two languages to communicate with each other. By sharing .proto files, teams can generate code to use each others' services, without needing to take a code dependency.

More information is available at Overview  |  Protocol Buffers  |  Google Developers 

</notice>

The Protocol Buffers IDL is a custom, platform-neutral language with an open specification

## 3. Function of th2-check1

### th2-check1 service
The definition of the check1 RPC service as defined in the check1.proto file found in the th2-grpc-check1 repository.  

    service Check1 {
    rpc createCheckpoint (CheckpointRequest) returns (CheckpointResponse) {}  
    rpc submitCheckRule (CheckRuleRequest) returns (CheckRuleResponse) {}  
    rpc submitCheckSequenceRule(CheckSequenceRuleRequest) returns (CheckSequenceRuleResponse) {}  
    rpc submitNoMessageCheck(NoMessageCheckRequest) returns (NoMessageCheckResponse) {}  
    }

<notice info>
The  `Check1Service` address (hostname and port) must be updated in config file `grpc.json`
</notice>

th2-check1 returns a response to the requests it receives. 
- The `CheckpointResponse` contains a checkpoint and the status of the request (`SUCCESS` or `FAIL`).
- All rule responses contain a chain id and the status of the request (`SUCCESS` or `FAIL`).

<notice info>
Chain id marks the last verified message in a queue, and is used for linking the next rule request to the current message queue.
</notice>

### Creating a checkpoint

A checkpoint is used as a starting point for verification. Checkpoint data contains the message sequence number in session and the message creation timestamp, returned as a universally unique identifier (UUID) to the act component.

![](/img/boxes/exactpro/check1/fgr2_path_of_chckpnt.png "Figure 2. Path of a checkpoint")
<center>
Figure 2. Path of a checkpoint
</center>

After receiving a CheckpointRequest  from the th2-act methods or directly from the script, th2-check1 will locate the last message in all queues, note the sequence number and timestamps and send it to the th2-act component via CheckPointResponse .

<notice info>
The script receives the checkpoint from act and sends it to check1 by gRPC request that includes the expected results and parameters for verification.

check1 receives this gRPC request and will search for responses starting from the location and time when the checkpoint was created.

</notice>

![](/img/boxes/exactpro/check1/fgr3.png "Figure 3. Definitions for CheckPointRequest and CheckpointResponse illustrating other connected definitions")

<center>
Figure 3. Definitions for CheckPointRequest and CheckpointResponse illustrating other connected definitions.
</center>

