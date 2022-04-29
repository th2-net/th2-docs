---
title: Pins
weight: 5
---

Each th2 box has a number of **pins**. The **pins** are used by the box to send/receive messages, or to execute gRPC commands. 

Each pin has the following parameters:
- `name` - reflects a **pin’s** main purpose and is used in the configuration file describing corresponding **links**;
- `connection-type` - sets the connection type which a **pin** uses (`mq` or `grpc`);
- `attributes` - define the type of message streams which go through this particular **pin**. 

In the example config below the box has two **pins**: `in` and `in_raw`.
```yaml
- name: in
  connection-type: mq
  attributes:
    - first
    - parsed
    - publish
    - store
- name: in_raw
  connection-type: mq
  attributes:
    - first
    - raw
    - publish
    - store
```
### MQ connection type

MQ **pins** transfer messages through RabbitMQ - queue manager used by the th2. In the example below **pins** `in` and `in_raw` allow a th2 box to operate with raw and parsed messages that come into it from the environment under test.
```yaml
- name: in
  connection-type: mq
  attributes:
    - first
    - parsed
    - publish
    - store
- name: in_raw
  connection-type: mq
  attributes:
    - first
    - raw
    - publish
    - store
```
### gRPC connection type  

If the pin connection type is gRPC, a corresponding endpoint should be defined in the `extended-settings` of the box.
```yaml
extended-settings:
  service:
    enabled: true
    type: NodePort
    endpoints:
      - name: grpc
        targetPort: 8080
        nodePort: 31179
```
## Attributes

Attributes define the behavior of the **pins** and describe what message stream goes through a particular **pin**. They are specific for each box. Attributes section cannot be empty. 

The set of attributes varies from one th2 component to another. Each th2 component can have its own mandatory or optional attributes. 

If you are defining a **pin** in which data will be published by the current box, you must specify the `publish` attribute; if the **pin** is supposed to receive data from another box, then you can optionally specify `subscribe`. Although the `subscribe` attribute is optional, it’s still recommended to specify it, to maintain consistency. If the **pin** is accepting data and the `subscribe` attribute is not specified, then by default the **pin** will be considered as `subscribe` anyway. You cannot apply both attributes to one **pin** at the same time. A **pin** can have either a `publish` or a `subscribe` attribute.

Below is the list of possible attributes for **pins**. They are grouped in such a way that in most cases only one option of two is used for a **pin**.

### MQ action attributes:

|Attribute|Description|Usage|
|---|---|---|
|`publish`|Pin publishes messages via MQ.|Used by any of the th2 components <br> that publish messages via MQ, for example: <br> conn to codec; codec to act/check; act to conn; <br> conn to estore.|
|`subscribe`|Pin subscribes to messages via MQ. <br> If `publish` and `subscribe` attributes <br> are both not specified - **pin** will act as `subscribe`.|Used by any of the th2 components which get <br> messages via MQ, for example:conn to codec; <br> codec to act/check; act to conn; conn to estore.|

### th2-conn message direction attributes:
|Attribute|Description|Usage|
|---|---|---|
|`first`|Pin transfers messages that are sent <br> from a server to a client.|Used by the th2-conn component to retransmit dialog <br> between the th2-conn and remote system into the th2.|
|`second`|**Pin** transfers messages that are sent <br> from a client to a server.|Used by the th2-conn component to retransmit dialog <br> between the th2-conn and remote system into the th2.|
    
### th2-codec message type attributes:
There are two types of th2-codec: _decoder_ and _encoder_. Every type of th2-codec connection has `subscribe` and `publish` **pins**. The first one is used to receive messages to decode/encode while the second one is used to send decoded/encoded messages further. th2-codec works with either parsed or raw messages. 

|Attribute|Description|Usage|
|---|---|---|
|`raw`|**Pin** transfers raw message batches.|th2-codec publishes raw messages after encoding and <br> subscribes to raw messages for decoding.|
|`parsed`|**Pin** transfers parsed message batches.|Can be used by different th2 components. E.g., th2-codec <br> publishes parsed messages after decoding and subscribes <br> to parsed messages for encoding. <br> _act_, _check_, _script_ components work with this type of messages.|

### th2-codec message direction attributes:
|Attribute|Description|Usage|
|---|---|---|
|`decoder_in`|Describes input **pin** for decoder codec <br> (transforms protocol message into human-readable).|th2-codec|
|`decoder_out`|Describes output **pin** for decoder codec <br> (transforms protocol message into human-readable).|th2-codec|
|`encoder_in`|Describes input **pin** for encoder codec <br> (transforms human-readable message to protocol message).|th2-codec|
|`encoder_out`|Describes output **pin** for encoder codec <br> (transforms human-readable message to protocol message).|th2-codec|

<notice note>

Please note that there are also `general_decoder_in`, `general_decoder_out`, `general_encoder_in`, `general_encoder_out` attributes. They can be used by some of the th2 components and function as the stream attributes (without `general_`) . `general_` means that listening to this connection will be on demand, while stream connection is always active.

</notice>

### Non-mutually exclusive attributes:
|Attribute|Description|Usage|
|---|---|---|
|`send`|**Pin** transfers event batches.|Used by any box that publishes events. th2-estore <br> consumes this type of messages.|
|`event`|Indicates that the messages that come into this **pin** <br> will be stored in Cradle.|Used by **pins** that produce data to the th2, <br> for example, conn, read, this attribute <br> should be marked.|
|`store`|Special attribute for the th2-conn **pin** to receive data <br> from act or other components.|th2-conn|

## Filters
Additionally, a **pin** can have a filter section. In this case, the  message is sent or received via this particular **pin** only if this message complies with the filter parameter.
```yaml
- name: fix_to_send
  connection-type: mq
  attributes: [send, parsed, subscribe]
  filters:
    - metadata:
        - field-name: session_alias
          expected-value: conn1_session_alias
          operation: EQUAL
```
Filter options available: 
- `EQUAL`;
- `NOT_EQUAL`;
- `EMPTY`;
- `NOT_EMPTY`.
