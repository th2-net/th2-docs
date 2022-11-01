---
tree-title: Communication
weight : 15
related:
- name: "th2-net/th2-check1"
  icon: "mdi-github"
  href: "https://github.com/th2-net/th2-check1"
---

# check1 - introduction to communication

## Learn more:
Check interacts with other th2 components in th2 through gRPC and RabbitMQ.

- Read more about [gRPC](https://grpc.io/)

<!-- TODO: Read more about th2 gRPC modules here -->

- Read more about [RabbitMQ](https://www.rabbitmq.com/documentation.html)

<!-- TODO: Read about th2 pins here and th2 links  -->

<!-- TODO: Read about th2 components API here -->

- Th2 uses kubernetes. Learn more about kubernetes  [config maps](https://kubernetes.io/docs/concepts/configuration/configmap/)


## Overview
**check1** uses gRPC for the remote procedure calls. 
Use the th2-grpc-check1 [repository](https://github.com/th2-net/th2-grpc-check1) to generate language specific API for **check1**. 
This repository contains the required `.proto` files for client-server interface and it automatically publishes the required packages.

<!-- TODO: list all possible events created by estore -->

**check1** uses the message broker RabbitMQ for receiving messages to verify.

## Interactions with other components

<!-- FIXME: Remove focus on estore and mstore -->

![](/img/boxes/exactpro/check1/communication_othercomponents.png "Figure 1. Communication with other components ")

<center> 
<figcaption class="mb-2">
Figure 1. Communication with other components
</figcaption>
</center>

## The check1 service for gRPC
**check1** receives several requests by gRPC and its responses are defined below.

```protobuf
service Check1 {
rpc createCheckpoint (CheckpointRequest) returns (CheckpointResponse) {}  
rpc submitCheckRule (CheckRuleRequest) returns (CheckRuleResponse) {}  
rpc submitCheckSequenceRule(CheckSequenceRuleRequest) returns (CheckSequenceRuleResponse) {}  
rpc submitNoMessageCheck(NoMessageCheckRequest) returns (NoMessageCheckResponse) {}  
}
```

### A checkpoint request
**check1** receives a checkpoint request and sends back checkpoints to **act**.

The `CheckpointResponse` contains a checkpoint and the status of the request (`SUCCESS` or `ERROR`).

![](/img/boxes/exactpro/check1/checkpointrequest_class.png "Figure 2. Definitions for CheckPointRequest and CheckpointResponse illustrating other associations ")
<center> 
<figcaption class="mb-2">
Figure 2. Definitions for CheckPointRequest and CheckpointResponse illustrating other associations.
</figcaption>
</center>


### Rule Requests

**check1** receives verification (rule) requests from the script.

All the responses to the rule request contain a `chain_id` and the status of the request (`SUCCESS` or `ERROR`).

![](/img/boxes/exactpro/check1/ruleresponse_class.png "Figure 3. Class diagram of check1 responses ")

<center> 
<figcaption class="mb-2">
Figure 3. Class diagram of **check1** responses.
</figcaption>
</center>

## Messaging

Storing message queues

**check1** receives decoded system messages from the **codec** component via RabbitMQ.


![](/img/boxes/exactpro/check1/queue.png "Figure 4. A queue of messages from the same session alias arranged according to the time received and and direction= FIRST ")
<center>
<figcaption class="mb-2">
Figure 4. A queue of messages from the same session alias arranged according to the time received and and direction= FIRST.
</figcaption>
</center>

Figure 4 shows a message queue. The queue contains messages of the same `direction` and `session alias`. 
The messages in the queue are arranged in the order received. 
Each queue is stored in cache and there are separate cache flows for each `session alias` (one for each direction). 
The size of each cache is determined by the **check1**’s message-cache-size. 
Users can edit this property in **check1**’s custom configuration.

<notice info>

The direction of a message can be `FIRST` or `SECOND`. 
`FIRST` messages are from the system under test (default).
`SECOND` messages are sent to the the system under test.

</notice>


## Structure

### Pins

**check1** needs two types of pins for communication: gRPC and MQ.

<notice info> A component can have as many pins as required. </notice>

grpc pin:

- connects to the script and allows other components to connect via the `com.exactpro.th2.Check1.grpc.Check1Service class`.


mq pin:

- Used for listening to the parsed messages. You can link several sources with the different directions and session aliases to it.

mq pin for receiving messages should have `subscribe` and `parsed` attributes
In the example below, **check1** has two pins named `server` and `in_parsed_message`
with connection types `grpc` and `mq` respectively.
The attributes of the MQ pin are `subscribe` and `parsed`.

<!-- TODO: add info about changes from grpc to grpc-client and grpc-server -->

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: Check1
spec:
  pins:
    - name: server
      connection-type: grpc
    - name: in_parsed_message
      connection-type: mq
      attributes:
        - "subscribe"
        - "parsed"
```

### Attributes for Pins: connection_type:`mq`

| Attribute Name | Description|
|---|---|
|`FIRST`| pin will take only messages which have metadata attribute direction = FIRST|
|`SECOND`|pin will take only messages which have metadata attribute direction = SECOND|
| `parsed`| message is transferred in th2 internal format (json-like)|
| `raw`| message is transferred in the initial system format (sent from/to SUT)|
| `publish`| the box distributes messages|
| `subscribe`| the box consumes messages|
| `event`| the pin sends events to estore (note - this pin is created by default for each box);|
| `store` | all messages, which are transferred via this pin, will be stored in Cradle|

