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
```protobuf
    service Check1 {
    rpc createCheckpoint (CheckpointRequest) returns (CheckpointResponse) {}  
    rpc submitCheckRule (CheckRuleRequest) returns (CheckRuleResponse) {}  
    rpc submitCheckSequenceRule(CheckSequenceRuleRequest) returns (CheckSequenceRuleResponse) {}  
    rpc submitNoMessageCheck(NoMessageCheckRequest) returns (NoMessageCheckResponse) {}  
    }
```

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

After receiving a `CheckpointRequest`  from the th2-act methods or directly from the script, th2-check1 will locate the last message in all queues, note the sequence number and timestamps and send it to the th2-act component via `CheckPointResponse`.

<notice info>
The script receives the checkpoint from act and sends it to check1 by gRPC request that includes the expected results and parameters for verification.

check1 receives this gRPC request and will search for responses starting from the location and time when the checkpoint was created.

</notice>

![](/img/boxes/exactpro/check1/fgr3.png "Figure 3. Definitions for CheckPointRequest and CheckpointResponse illustrating other connected definitions")

<center>
Figure 3. Definitions for CheckPointRequest and CheckpointResponse illustrating other connected definitions.
</center>

A queue contains messages of the same direction and session alias. The messages in a queue are arranged in the order received. Each queue is stored in a cache and there are two caches for each session alias (one for each direction). Size of each cache is determined by the check1’s  `message-cache-size`. Users can edit this property in check1’s custom configuration.

<notice info>
The `direction` of a message can be `FIRST` or `SECOND`. `FIRST` messages are from the system under test (default). `SECOND` messages are sent to the the system under test. 
</notice>

### Verification by check1 using `CheckSequenceRuleRequest`

### Pre-filtering 
CheckSequenceRuleRequest comes with a prefilter. A prefilter is a mechanism for filtering messages that are not of interest to the user, for example - Heartbeats in FIX. The prefilter allows checking of only those messages that have passed through it. Users must be careful to not accidentally filter out potentially necessary messages.

### Root message filters
After pre-filtering, the messages in the queue have to be matched with the main filters (class RootMessageFilters[] ) to identify the expected and extra (unexpected) messages. These filters are also used to verify the accuracy of the information contained in the response, and to verify the order of the messages received

### Identifying system responses
The expected responses are identified using **key fields** found in the main filter. `key_fields` is a list of fields that will be used as keys when determining whether the expected message has been received or not. 

<notice info>
Each filter contains a key field which matches with a single expected message.
`CLOrdid` (client order id) is used as the key field and check1 matches the filter-message pair according to the value.
</notice>

<notice info>
Locating unexpected messages
If a message passed prefilter, but is not in the expected, it is considered as an extra message.
</notice>

The time allocated to check1 to search for a matching message(s) in the queue (rule execution) is defined by the rule parameter `timeout`. Once the allocated time runs out the rule execution stops. This value can be edited in the rule request.

If this is not specified, the default time allocated is given in `rule-execution-timeout`  which can be edited in check1’s custom configuration.

<notice info>
If any or none of the filters match up with a message in the queue, then the user is notified of a missing response.
</notice>

Users can combine more than one `CheckSequenceRuleRequest` using `chain_id` to form one large `CheckSequenceRule`. `chain_id` is similar to a checkpoint, and locates the last message verified by the previous `CheckSequenceRule`.

<notice info>
chain_id with CheckSequenceRule reduces the chance of missing unexpected extra messages.
</notice>

### Verification of message order
The filters in `CheckSequenceRuleRequest` are an ordered list and the order received should match with the filter order. To check order, the `CheckSequenceRuleRequest` parameter `check_order` is set to `True`.

### Field validation
Once the expected messages are located, field validation is conducted by comparing the expected to the actual values. The user is notified of any inaccuracies. 

## 4. Configuration:

General view of the component:

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: Check1
spec:
  image-name: ghcr.io/th2-net/th2-Check1
  image-version: <image version>
  custom-config:
    message-cache-size: '1000'
    cleanup-older-than: '60'
    cleanup-time-unit: 'SECONDS'
    max-event-batch-content-size: '1048576'
    rule-execution-timeout: '5000'
    auto-silence-check-after-sequence-rule: false
    time-precision: 'PT0.000000001S'
    decimal-precision: '0.00001'
  type: th2-Check1
  pins:
    - name: server
      connection-type: grpc
    - name: from_codec
      connection-type: mq
      attributes: ['subscribe', 'parsed']
  extended-settings:
    service:
      enabled: true
      nodePort: '<port>'
    envVariables:
      JAVA_TOOL_OPTIONS: "-XX:+ExitOnOutOfMemoryError"
    resources:
      limits:
        memory: 200Mi
        cpu: 200m
      requests:
        memory: 100Mi
        cpu: 50m
```
        
### th2-check1 custom configuration 
Some of check1 parameters are customizable. Those parameters are in the `custom-config` section of the configuration file. The customizable parameters, along with example values are provided in the following code snippet (a part of the config file):

custom config:
```json
{
  "message-cache-size": 1000,
  "cleanup-older-than": 60,
  "cleanup-time-unit": "SECONDS",
  "max-event-batch-content-size": "1048576",
  "rule-execution-timeout": 5000,
  "auto-silence-check-after-sequence-rule": false,
  "time-precision": "PT0.000000001S",
  "decimal-precision": 0.00001,
  "check-null-value-as-empty": false
}  
```
 

### check1 custom configuration - property descriptions

|Property name|Type|Default Value|Property description|
|---|---|---|---|
|`message-cache-size`|`int`|`1000`|The number of messages for each stream (alias + direction) that will be buffered.|
|`cleanup-older-than`|`long`|`60L`|Variable indicates the value of the time interval for the verified message chain to be removed from the queue. The value is given in time unit defined in cleanup-time-unit setting.|
|`cleanup-time-unit`|`ChronoUnit`|`ChronoUnit.SECONDS`|Defines the unit of measurement for the cleanup-older-than setting. The available values are MILLIS, SECONDS, MINUTES, HOURS. Default: SECONDS.|
|`max-event-batch-content-size`|`int`|`1048576`|Maximum size of summary events content in a batch (in bytes).|  
|`rule-execution-timeout`|`long`|`5000L`|This is the amount of time allocated for rule execution. The rule execution stops automatically after the allocated time. Unit is milliseconds. `rule-execution-timeout`  is the default value, unless the parameter timeout is set in the rule request.|
|`auto-silence-check-after-sequence-rule`|`bool`|`false`|Parameter which defines a default behavior of creating CheckSequenceRule, if silence_check parameter in CheckSequenceRule is not specified in the request. Default: `false`.|
|`time-precision`|`Duration`|`PT0.000000001S`|Parameter used to compare two time values. It is based on the ISO-8601 duration format PnDTnHnMn.nS with days considered to be exactly 24 hours. Additional information can be found [here](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/Duration.html#parse(java.lang.CharSequence)).|
|`decimal-precision`|`double`|`0.00001`|Parameter used to compare the value of two numbers. Can be specified in number or string format. For example, `0.0001`, `0.125`, `125E-3`.|
|`check-null-value-as-empty`|`boolean`|`false`|Parameter used for `EMPTY` and `NOT_EMPTY` operations to check if `NULL_VALUE` is empty. Default: `false`. For example, if the `checkNullValueAsEmpty` parameter is true, then `NULL_VALUE` is equal to `EMPTY`, otherwise `NULL_VALUE` is equal to `NOT_EMPTY`.|

### Required parameters for rule (verification) requests:

|Name|Type/Class|Rule request|Actions performed / Description|
|---|---|---|---|
|`parent_event_id`|`EventID`|common|All events generated by the rule will be attached to that parent event.|
|`connectivity_id`|`ConnectionID`|common|`session_alias` inside the `connectivity_id` must not be empty.|
|`root_filter`|`RootMessageFilter`|`CheckRuleRequest`|Used to verify `metadata.properties` from the message.|
|`root_message_filters`|`RootMessageFilter[]`|`CheckSequenceRuleRequest`|Used to verify `metadata.properties` from the message.|

### Optional parameters for rule (verification) requests:

|Name|Type/Class|Rule request|Actions Performed / Description|
|---|---|---|---|
|`direction`|`Direction`|common|The direction of the messages to be checked by the rule. *Default*: `FIRST`|
|`chain_id`|`ChainID`|common|The id used to connect rules together for chain verification. Considers `connectivity_id`.| 
|`description`|`string`|`common`|The description that will be added to the root event produced by the rule.|
|`timeout`|`int64`|common|The allowed timeout for rule execution (message matching). The allocated time is measured in real time. If not set, the default value from check1 settings will be taken (`rule-execution`-timeout in `Check1.yml`, default: `5000 ms`).|
|`message_timeout`|`int64`|common|Defines the allowed timeout for messages matching by the time they were received. Timeout is computed using the message timestamp.|
|`checkpoint`|`Checkpoint`|common|Must be set if `message_timeout` is used and no valid `chain_id` is provided.|
|`pre_filter`|`PreFilter`|`CheckSequenceRuleRequest`, `NoMessageCheckRequest`| Pre-filtering for the messages that should not be received. Only messages that match the `pre_filter` parameters will be checked by the main filters.|
|`check_order`|`bool`|`CheckSequenceRuleRequest`|If `True`, check1 will validate that messages are received in the defined order. 
(For example, Execution Report with `OrdStatus`:`Pending` and Execution Report with `OrdStatus`: `New` are received in exactly the same order).|
|`silence_check`|`google.protobuf.BoolValue`|`CheckSequenceRuleRequest`|If `True`, check1 will verify incoming messages, which match the pre-filter, after a CheckSequenceRuleRequest has found all the expected messages. Default: `False`. This feature helps to not miss the bugs, where unexpected messages will be received.|

### Required pins and links
#### Pins

th2 uses two methods of communication, RabbitMQ for messages and gRPC to make procedure calls. Therefore check1 needs two types of pins for communication: `grpc` and `mq`. 

<notice info>
A component can have as many pins as required.
</notice>

`gRPC` pin:

- connects to the script and allows other components to connect via the `com.exactpro.th2.Check1.grpc.Check1Service` class;
- requires a name and a connection type (`grpc`).

`mq` pin: 

- Used for listening to the parsed messages. You can link several sources with the different directions and session aliases to it.

- Requires a name, connection type (`mq`), attributes, and the filters.

In the example below, check1 has two pins named `server` and `in_parsed_message` with connection types grpc and mq respectively. The attributes of the `mq` pin are `subscribe` and `parsed`.

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

        
Attributes for `connection_type:mq` pins

|Attribute|Name|Description|
|---|---|---|
|`FIRST`|pin will take only messages which have metadata attribute direction = FIRST|
|`SECOND`|pin will take only messages which have metadata attribute direction = SECOND|
|`parsed`|message is transferred in th2 internal format (json-like)|
|`raw`|message is transferred in the initial system format (sent from/to SUT)|
|`publish`|the box distributes messages| 
|`subscribe`|the box consumes messages|
|`event`|the pin sends events to estore (note - this pin is created by default for each box, even if it’s missed from CR file);|
|`store`|all messages, which are transferred via this pin, will be stored in Cradle|

#### Links

Links describe the connection between pins. The link between the script and check1 is given below.

The link describes the connection between the pin to_check1 and server 

```yaml
name: script-to-check1
         from:
           service-class: com.exactpro.th2.check1.Check1Handler
           strategy: filter
           box: script-entry-point
           pin: to_check1
         to:
           service-class: com.exactpro.th2.check1.grpc.Check1Service
           strategy: robin
           box: check1
           pin: server
```


<notice info>     
This example is from the th2-infra-schema-demo repository branch ver-1.5.4-main_scenario.
Users can make their custom pins and links according to their requirements.
</notice>

## 5. Other useful information
### Other repositories

th2-demo-script: ver-1.5.4-main_scenario - the GitHub repository for the demo script. This repository contains
- config files: update the Act service and check1 service.yaml config files. These files should be edited, after cloning the required version of the demo script, with hostnames and ports from Kubernetes cluster.

- support functions: contains the check functions
- required libraries text : import the required version of the th2-grpc-check1 library by editing requirements.txt file.

https://github.com/th2-net/th2-infra-schema-demo/tree/ver-1.5.4-main_scenario/boxes - Can't find link 

This is a link to the `.yaml` config files of all boxes in the GitHub repository th2-infra-schema-demo. The th2-infra-schema-demo repository is used to create the th2 environment (a namespace) in the kubernetes cluster.

### Storing message queues
check1 receives decoded system messages from the th2-codec component via RabbitMQ.
