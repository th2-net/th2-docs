---
title: Pins
weight: 5
related: []
---

Each th2 box has a number of pins. Pins are used by a box (available only for `Th2Box` and `Th2CoreBox`) to send/receive messages, or to execute gRPC commands. 

## Configuration 

The available configuration fields for a pin are listed below.

- `name` (mandatory) - reflects a pin’s main purpose and is used in the configuration file describing corresponding links;
- `connection-type` (mandatory) - sets the connection type used by the pin (starting from th2-infra v1.6.0, the options are `mq`, `grpc-client` or `grpc-server`; for earlier versions, possible values are `mq` or `grpc`)
- `attributes` (optional) - define the type of message streams which go through this particular pin;
- `settings` (optional) - section specifies two settings that configure which strategy will be used while declaring queues in rabbitMq: `storageOnDemand` and `queueLength`;
- `filters` (optional and available only for `mq` connection type) - section describes what messages/metadate can go through this particular pin. Filters can be applied to `metadata` or `message` and contain the following parameters: `field-name`, `expected-value`, `operation`.  
- `service-class` - should be specified if the pin is grpc-client , in other words if pin is used as “from” component in link;
- `service-classes` - should be specified if the pin is grpc-server , in other words if pin is used as “to” component in link.

Configuration example:

```yaml
pins: [object-array] (optional, available only for Th2Box and Th2CoreBox)
    - name: [string] 
      connection-type: [enum] 
      attributes: [string array] 
        - atr1
        - atr2
      settings: [object]
        storageOnDemand: [enum boolean]
        queueLength: [string] 
      filters:
        - metadata:
            - field-name: [string] 
              expected-value: [string] 
              operation: [enum] 
          message: 
            - field-name: [string] 
              expected-value: [string] 
              operation: [enum]
      service-class: [string, used if pin is grpc-client] *
      service-classes: [string-array, used if pin is grpc-server] *
        - com.exactpro.th2.box.grpc.BoxService
        - com.exactpro.th2.otherbox.grpc.OtherBoxService
```

In one configuration it is possible to specify several pins. In the example config below the box has two pins: `in` and `in_raw`.

```yaml
- name: in
  connection-type: mq
  attributes:
    - first
    - parsed
    - subscribe
    - store
- name: in_raw
  connection-type: mq
  attributes:
    - first
    - raw
    - subscribe
    - store
```
### Filters section

A pin can have a `filters` section. Filters can have `metadata` or `message` fields. In this case, the metadata/message is sent or received via this particular pin only if it complies with the filter parameter.
Filter options available: 
- `EQUAL`;
- `NOT_EQUAL`;
- `EMPTY`;
- `NOT_EMPTY`;
- `WILDCARD`.

For example: 

```yaml
- name: fix_to_send
  connection-type: mq
  attributes: [send, parsed, subscribe]
  filters:
    - metadata:
        - field-name: session_alias
          expected-value: conn1_session_alias
          operation: EQUAL
    - message: 
        - field-name: field_name
          expected-value: value
          operation: NOT_EQUAL
```


### Settings section for MQ connection type

MQ pins transfer messages through RabbitMQ - queue manager used by th2.
If `connection-type: mq` we can specify `settings` section. Under this section we can specify two settings that configure which strategy will be used while declaring queues in rabbitMq.
- `storageOnDemand` (optional) - option which defines an overflow strategy which will be drop-head if set to `false`. *Default*: `true`. 
- `queueLength` (optional) - the length of the queue created by the operator. *Default*: 1000 msg.  
Important: `queueLength` isn't used if `storageOnDemand` is set to `true`. 

<notice note> Please note that if an external box has a pin with `subscribe` attribute and exists a box in Kubernetes that publishes on your pin (e.g. **act** has `from_codec` pin related to the queue in rabbitMQ and receives messages from **codec**), then if you close your external application - the messages will accumulate in the queue and can fill the cluster memory. To prevent that, please configure the queue limit on your external box pins. </notice>

For example: 

```yaml
pins:
    - name: to_send
      connection-type: mq
      attributes:
        - subscribe
        - send
        - raw
      settings:
        storageOnDemand: false
        queueLength: 1000
```
### Settings section for gRPC connection type  

gRPC pins use gRPC technology for synchronous client-server API calls between different boxes in the cluster. 

Logically gRPC pin can stand for server endpoint and client endpoint. For these cases th2 specification contains appropriate connection types:
- `connection-type: grpc-server`
- `connection-type: grpc-client`

<notice info>

`grpc-client` pins affect on the box's config map only. Technically, you can connect to gRPC server without created client pins, but is convenient to have generated endpoints configuration.

</notice>

If `connection-type` is `grpc-server`, you should specify `service-classes` as array; if `grpc-client` - `service-class` as string

```yaml
  pins:
    - name: server
      connection-type: grpc-server
      service-classes:
        - com.exactpro.th2.act.grpc.ActService
        - com.exactpro.th2.box.grpc.BoxService
    - name: to_check1
      connection-type: grpc-client
      service-class: com.exactpro.th2.check1.grpc.Check1Service
```
<notice note> 

Important note about `service-classes` and `service-class` is that they must be compatible for link to be applied. For example, if the client has a service class `com.exactpro.th2.box.grpc.BoxService` them the server should contain the same service class in its list.

</notice>

<notice note>

If your gRPC pin stands for server endpoint it is required to create enpoint in `extended-settings.service.endpoints` option in box configuration.

</notice>

To create endpoint box should have:

- `extended-settings.service.enabled`: `true`;
- `extended-settings.service.type`: type of native Kubernetes service, which you want to use;

In endpoint options:

- `name` - name of endpoint unique for box;
- `targetPort` - docker container port for listening;
- `nodePort` - kubernetes node port for listening;

Example of extended settings:

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
## Attributes section 

Attributes define the behavior of the pins and describe what message stream goes through a particular pin. They are specific for each box.  

The set of attributes varies from one th2 component to another. Each th2 component can have its own mandatory or optional attributes. 

If you are defining a pin in which data will be published by the current box, you must specify the `publish` attribute; if the pin is supposed to receive data from another box, then you can optionally specify `subscribe`. Although the `subscribe` attribute is optional, it’s still recommended to specify it, to maintain consistency. If the pin is accepting data and the `subscribe` attribute is not specified, then by default the pin will be considered as `subscribe` anyway. You cannot apply both attributes to one pin at the same time. A pin can have either a `publish` or a `subscribe` attribute.

Below is the list of possible attributes for pins. They are grouped in such a way that in most cases only one option of two is used for a pin.

### MQ action attributes:

|Attribute|Description|Usage|
|---|---|---|
|`publish`|Pin publishes messages via MQ.|Used by any of the th2 components <br> that publish messages via MQ, for example: <br> conn to codec; codec to act/check; act to conn; <br> conn to estore.|
|`subscribe`|Pin subscribes to messages via MQ. <br> If `publish` and `subscribe` attributes <br> are both not specified - pin will act as `subscribe`.|Used by any of the th2 components which get <br> messages via MQ, for example:conn to codec; <br> codec to act/check; act to conn; conn to estore.|

### th2-conn message direction attributes:
|Attribute|Description|Usage|
|---|---|---|
|`first`|Pin transfers messages that are sent <br> from a server to a client.|Used by the **th2-conn** component to retransmit dialog <br> between the **th2-conn** and remote system into the th2.|
|`second`|Pin transfers messages that are sent <br> from a client to a server.|Used by the **th2-conn** component to retransmit dialog <br> between the **th2-conn** and remote system into the th2.|
    
### th2-codec message type attributes:
There are two types of **th2-codec**: _decoder_ and _encoder_. Every type of **th2-codec** connection has `subscribe` and `publish` pins. The first one is used to receive messages to decode/encode while the second one is used to send decoded/encoded messages further. th2-codec works with either parsed or raw messages. 

|Attribute|Description|Usage|
|---|---|---|
|`raw`|Pin transfers raw message batches.|**th2-codec** publishes raw messages after encoding and <br> subscribes to raw messages for decoding.|
|`parsed`|Pin transfers parsed message batches.|Can be used by different th2 components. E.g., **th2-codec** <br> publishes parsed messages after decoding and subscribes <br> to parsed messages for encoding. <br> _act_, _check_, _script_ components work with this type of messages.|

### th2-codec message direction attributes:
|Attribute|Description|Usage|
|---|---|---|
|`decoder_in`|Describes input pin for decoder codec <br> (transforms protocol message into human-readable).|**th2-codec**|
|`decoder_out`|Describes output pin for decoder codec <br> (transforms protocol message into human-readable).|**th2-codec**|
|`encoder_in`|Describes input pin for encoder codec <br> (transforms human-readable message to protocol message).|**th2-codec**|
|`encoder_out`|Describes output pin for encoder codec <br> (transforms human-readable message to protocol message).|**th2-codec**|

### Stream and general codec pins:

Please note that there are also `general_decoder_in`, `general_decoder_out`, `general_encoder_in`, `general_encoder_out` attributes. They can be used by some of the th2 components and function as the stream attributes (without `general_`) . `general_` means that listening to this connection will be on demand, while stream connection is always active.


### Non-mutually exclusive attributes:
|Attribute|Description|Usage|
|---|---|---|
|`send`|Pin transfers event batches.|Used by any box that publishes events. **th2-estore** <br> consumes this type of messages.|
|`event`|Indicates that the messages that come into this pin <br> will be stored in Cradle.|Used by pins that produce data to the th2, <br> for example, conn, read, this attribute <br> should be marked.|
|`store`|Special attribute for the **th2-conn** pin to receive data <br> from act or other components.|**th2-conn**|
