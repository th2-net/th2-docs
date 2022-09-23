---
title: codec
inner-title: th2-codec
related:
  - name: "th2-net/th2-codec"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-codec"
weight: 10
--- 

## Overview 

The **codec** is a component responsible for transforming <term term='message'>messages</term> from human-readable format into a format of a corresponding protocol and vice versa. 
It contains the main logic for encoding and decoding messages. 
The **codec** usually uses <term term='dictionary'>dictionary</term> to decode and encode messages. 
Dictionaries contain message structures, fields and values that **codec** can decode. 

### Encoding
During encoding, **codec** replaces each parsed message of the supported protocols in a message group with a raw one, by encoding parsed message content.

NOTE: **codec** can merge content of subsequent raw messages into a resulting raw message (e.g. when a **codec** encodes only a transport layer and its payload is already encoded).


### Decoding
During decoding **codec** must replace each raw message in a message group with a parsed one by decoding raw message content. 
If an exception was thrown, all raw messages will be replaced with `th2-codec-error` parsed messages.

NOTE: **codec** can replace a raw message with a parsed message followed by several raw messages (e.g. when a **codec** decodes only a transport layer it can produce a parsed message for the transport layer and several raw messages for its payload).

The schema below describes encoding/decoding processes. 

![](/img/boxes/exactpro/codec/codec_inside_processes.png)

- **raw** - <term term='pin'>pin</term> configuration item, message passing through this pin for processing is in a machine-readable format, ready to be sent or received via according protocol or being decoded.

- **parsed** - pin configuration item, message passing through this pin for processing is in a human-readable format, used in th2.

- **encode** - pin configuration item, message passing through this pin will be translated from parsed to raw.

- **decode** - pin configuration item, message passing through this pin will be translated from raw to parsed.


Example of a raw message (FIX protocol):
```
8=FIXT.1.19=6835=034=159049=fix-client156=fix-server152=20220608-13:14:37.58110=043
```

Example of a parsed message (FIX protocol):

```json
{
  "metadata": {
    "id": {
      "connectionId": {
        "sessionAlias": "fix-server1"
      },
      "sequence": "1653493560372614018",
      "subsequence": [
        1
      ]
    },
    "timestamp": "2022-06-08T13:14:37.582Z",
    "messageType": "Heartbeat",
    "protocol": "FIX"
  },
  "fields": {
    "trailer": {
      "messageValue": {
        "fields": {
          "CheckSum": {
            "simpleValue": "043"
          }
        }
      }
    },
    "header": {
      "messageValue": {
        "fields": {
          "BeginString": {
            "simpleValue": "FIXT.1.1"
          },
          "SenderCompID": {
            "simpleValue": "fix-client1"
          },
          "SendingTime": {
            "simpleValue": "2022-06-08T13:14:37.581"
          },
          "TargetCompID": {
            "simpleValue": "fix-server1"
          },
          "MsgType": {
            "simpleValue": "0"
          },
          "MsgSeqNum": {
            "simpleValue": "1590"
          },
          "BodyLength": {
            "simpleValue": "68"
          }
        }
      }
    }
  }
}
```

## Family 

There are 3 types of **codec**-related repositories.

- <term term='box'>Box</term> - use it to translate messages from raw to parsed and back (the name of repository contains the protocol which is used).

- Library - use it to build your own **codec** component.

- Build script collection - use it to translate messages from raw to parsed (and back) with re-using of Sailfish code (see protocols in Readme files of the repository). SEE ALSO: [Sailfish](https://exactpro.com/test-tools/sailfish).

### Box repositories list:

|Box repositories|Type|Comments|
|---|---|---|
|[th2-net/th2-codec-grpc](https://github.com/th2-net/th2-codec-grpc)|Box (WIP)|`codec` for gRPC protocol|
|[th2-net/th2-codec-qfj](https://github.com/th2-net/th2-codec-qfj)|Box (WIP)|
|[th2-net/th2-codec-open-api](https://github.com/th2-net/th2-codec-open-api)|Box|
|[th2-net/th2-codec-xml-via-xsd](https://github.com/th2-net/th2-codec-xml-via-xsd)|Box|
|[th2-net/th2-conn-http-ws-client-template](https://github.com/th2-net/th2-conn-http-ws-client-template)|Box|
|[th2-net/th2-codec-moldudp64](https://github.com/th2-net/th2-codec-moldudp64)|Box(WIP)|
|[th2-net/th2-codec-xml](https://github.com/th2-net/th2-codec-xml)|Box|
|[th2-net/th2-codec-json](https://github.com/th2-net/th2-codec-json)|Box|
|[th2-net/th2-codec-http](https://github.com/th2-net/th2-codec-http)|Box|
|[th2-net/th2-codec-html](https://github.com/th2-net/th2-codec-html)|Box|
|[th2-net/th2-codec-hand](https://github.com/th2-net/th2-codec-hand)|Box|
|[th2-net/th2-codec-hand-html](https://github.com/th2-net/th2-codec-hand-html)|Box|
|[th2-net/th2-codec-csv](https://github.com/th2-net/th2-codec-csv)|Box|
|[th2-net/th2-codec-fix-orchestra](https://github.com/th2-net/th2-codec-fix-orchestra)|Box|

### Library repositories:

- [th2-net/th2-codec](https://github.com/th2-net/th2-codec) — a common **codec** library with basic functionalities of subscribing/publishing message queues and loading **codec** settings; all **codecs** written specifically for th2 are based on this library.

- [th2-net/th2-grpc-codec](https://github.com/th2-net/th2-grpc-codec) - library containing gRPC interface for **th2-codec** library. This interface can be used to encode/decode messages via RPC call. 

- [th2-net/th2-codec-sailfish](https://github.com/th2-net/th2-codec-sailfish) - all **codecs** that use Sailfish as a library are made based on this library.
 
### Build script collection:

[th2-net/th2-codec-generic](https://github.com/th2-net/th2-codec-generic) - a repository that builds FAST, FIX, ITCH, NTG, and SOUP **codecs** using their Sailfish implementation and `th2-codec-sailsfish` as a base.

You can use a link to a docker image of needed **codec** from its GitHub repository to deploy it using **th2-infra**.

## Functions:

The **codec** component handles message flows between components such as **conn**, **act**, **check1**, **read** and other. 
On the scheme below you can see an example of interaction with other th2 components.

![](/img/boxes/exactpro/codec/codec_interaction_with_other_components.png)

The **codec** component has eight pins - four for the stream, and four general ones. 
Functionality of the stream and the general pins is the same. 
A common system setup uses two data flows: 1) to and from the system, and 2) to and from data provider. 
Messages from these flows cannot be mixed. 
One way to avoid this intersection is to use two instances of a component with four pins. 
Another option is to configure eight pins – this allows the user to decrease the amount of required settings in **infra-schema** as well as resource utilization of the resulting system. 
General pins are used by the data-provider component, other components are usually connected to the stream pins.

### Why do we need a chain of codecs?

It is a very common case when the messages you send or receive from the system have the following structure: a transport layer protocol and a payload wrapped into the transport layer. 
The payload can be any other protocol (even another transport protocol and a different payload wrapped into it). 
Also, sometimes different systems use the same transport protocol but with the different payload wrapped into it (e.g. HTTP + JSON, HTTP + FIX).

In case you need to encode/decode a message but do not have a single **codec** for such case, you can reuse already implemented **codecs** by joining them into a chain of **codecs**. It is also recommended for the **codec** to work only with a single protocol.  
For example, you have HTTP, JSON and XML **codec**. 
You can join them together for decoding XML over HTTP or JSON over HTTP.

If the **codec** component gets a message that does not match an expected format (a raw message of corresponding protocol to `in_codec_decode` pin and a parsed message to `in_codec_encode` pin) it will be sent through the corresponding out pins without changes.


## Configuration:  

### Configuration parameters

Config file includes the following parameters:

- `apiVersion` - API Kubernetes version used to create an object, the only available value - `th2.exactpro.com/v1`.

- `kind`- kind of the created object, possible values - `Th2Box`, `Th2CoreBox`, `Th2Estore`, `Th2Mstore`, `Th2Dictionary`.

- `metadata` (name, UID and optional field namespace) - should be equal to the file name without extension.

- `spec` - required object configuration. This seciton contains `image-name` and `image-version` (including versions), `type`, `custom-config` (component-specific set of parameters), `pins` (to communicate with other boxes).

- `extended-settings: service` - here we specify whether the object is available for other components, envVariables (environment variables for pod deployment), resources (amount of resources available for a Pod), etc. 

The **codec** settings can be specified in `codecSettings` field of `custom-config`. 

For example:

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: codec
spec:
  custom-config:
    codecSettings:
      messageTypeDetection: BY_INNER_FIELD
      messageTypeField: "messageType"
      rejectUnexpectedFields: true
      treatSimpleValuesAsStrings: false
```

### Required pins and links
The **codec** has four types of pins: stream encode, stream decode, general encode, general decode.

- `stream encode / decode` connections used for all testing activities performed with th2; **act**, **conn**, **sim**, **recon**, **bookchecker** microservices connections to **codec** through the stream encode / decode connections.

- `general encode / decode` connections work on demand; those connections are mainly used for the th2 report UI; in order to show the end-user messages stored in Cassandra **report-data-viewer** requests the said messages from **rpt-data-provider** via **codec**.

Codec never mixes messages from the stream and the general connections.

<notice info>

SEE ALSO: [stream and general pins description](/1-7/infrastructure/th2-infra-schema/pins#stream-and-general-codec-pins) 

</notice>

Pins are a part of the main th2 concept. 
They describe what are the inputs and outputs of a box. 
You can read more about them [here](../infrastructure/th2-infra-schema/pins).

Every **codec** operation is associated with 2 pins - `subscribe` and `publish`. 
The first one is used to receive messages to decode/encode, while the second one is used to send decoded/encoded messages further. 

**Typical codec has the following pins**: 

- Pin for the stream encoding input: `encoder_in` `parsed` `subscribe`

- Pin for the stream encoding output: `encoder_out` `raw` `publish`

- Pin for the general encoding input: `general_encoder_in` `parsed` `subscribe`

- Pin for the general encoding output: `general_encoder_out` `raw` `publish`

- Pin for the stream decoding input: `decoder_in` `raw` `subscribe`

- Pin for the stream decoding output: `decoder_out` `parsed` `publish`

- Pin for the general decoding input: `general_decoder_in` `raw` `subscribe`

- Pin for the general decoding output: `general_decoder_out` `parsed` `publish`

### Configuration example

API Kubernetes documentation contains specification format for any in-built Kubernetes object. th2-specific custom resources can be found in a Readme file of the component repository.

- `name` in metadata must be filled in as a box name.

- `image-name` must contain a <term term='link'>link</term> to the image of **codec** on your project (preferably the last version). For one project you can have more than one **codec** for the same protocol.

- `image-version` should be filled with image tag (version of image in your project’s **codec**).

- `type` specifies the type of component in th2.

- `logFile` - this field is not mandatory and is only filled out in case of the user requiring log information on a very detailed level.

- In `extended-settings.resources`, the `limits` value must be greater than the value of `requests`. So, if you face an error “Search line limits were exceeded” when deploying a **codec** box in Kubernetes, you should increase the box's resources and check that `limits` > `requests`.

- `service` parameter: to make this component available to other th2 boxes, set `service.enabled` to `true`.

This configuration is a general way for deploying components in th2. 
It contains box configuration, pins' descriptions and other common parameters for a box.

You can configure a specific implementation of **codec** using the `codecSettings` section (Exception: for **codec-sailfish-...**, use `codecParameters` instead of `codecSettings`).

Extended example of the **codec** configuration:

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: codec
spec:
  custom-config:
    codecSettings:
      parameter1: value
      parameter2:
        - value1
        - value2
  pins:
    # encoder
    - name: in_codec_encode
      connection-type: mq
      attributes: [ 'encoder_in', 'parsed', 'subscribe' ]
    - name: out_codec_encode
      connection-type: mq
      attributes: [ 'encoder_out', 'raw', 'publish' ]
    # decoder
    - name: in_codec_decode
      connection-type: mq
      attributes: ['decoder_in', 'raw', 'subscribe']
    - name: out_codec_decode
      connection-type: mq
      attributes: ['decoder_out', 'parsed', 'publish']
    # encoder general (technical)
    - name: in_codec_general_encode
      connection-type: mq
      attributes: ['general_encoder_in', 'parsed', 'subscribe']
    - name: out_codec_general_encode
      connection-type: mq
      attributes: ['general_encoder_out', 'raw', 'publish']
    # decoder general (technical)
    - name: in_codec_general_decode
      connection-type: mq
      attributes: ['general_decoder_in', 'raw', 'subscribe']
    - name: out_codec_general_decode
      connection-type: mq
      attributes: ['general_decoder_out', 'parsed', 'publish']
```

### Codec-related links
Schema API allows configuring routing streams of the messages via links between the connections and the filters on pins. 
Let's consider some examples of routing in a **codec** box.

 
#### Split on 'publish' pins
For example, you have got a big source data stream, and you want to split them into some pins via session alias. 
You can declare multiple pins with attributes `['decoder_out', 'parsed', 'publish']` and filters instead of a common pin, or in addition to it. 
Every decoded message will be directed to all declared pins and will be sent to MQ only if it passes the filter.

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: codec
spec:
  pins:
    # decoder
    - name: out_codec_decode_first_session_alias
      connection-type: mq
      attributes: ['decoder_out', 'parsed', 'publish']
      filters:
        - metadata:
            - field-name: session_alias
              expected-value: first_session_alias
              operation: EQUAL
    - name: out_codec_decode_secon_session_alias
      connection-type: mq
      attributes: ['decoder_out', 'parsed', 'publish']
      filters:
        - metadata:
            - field-name: session_alias
              expected-value: second_session_alias
              operation: EQUAL
```

The filtering can also be applied for pins with a `subscribe` attribute.

### Links config
The main link that every **codec** instance should have is a dictionary link. 
The **codec** instance will use a linked dictionary as a reference for validations. 

<notice note >

If a protocol-specific **codec** requires a dictionary, it won't properly function without it.

</notice >

Example:

```yaml[dictionary-links.yml]
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: dictionary-links
spec:
  dictionaries-relation:

 - name: codec-fix-sell-dictionary
    box: codec-fix-sell
    dictionary:
      name: fix-sell
      type: MAIN
```
#### Connectivity links
Functionally, **codec** is a regular th2 box that communicates with other boxes via pins and links. 
To configure the connections, use a template on the [Links](../infrastructure/th2-infra-schema/links#boxes-links) page.



#### Report Data Provider link(-s)
For messages passing through **codec** to be displayed in Report UI, **codec** should be linked to **rpt-data-provider** in the following way:

Dedicated to desired **codec**, **rpt-data-provider** pin should be linked to `in_codec_general_decode` **codec** pin.

`out_codec_general_decode` **codec** pin should be linked to **rpt-data-provider** pre-configured dedicated pin for particular **codec**.


```yaml[from-codec-links.yml]
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: from-codec-links
spec:
  boxes-relation:
    router-mq:
- name: provider-to-codec-fix-sell
      from:
        box: rpt-data-provider
        pin: to_codec-fix-sell
      to:
        box: codec-fix-sell
        pin: in_codec_general_decode
    - name: codec-fix-sell-to-provider
      from:
        box: codec-fix-sell
        pin: out_codec_general_decode
      to:
        box: rpt-data-provider
        pin: from_codec-fix-sell
```

## Useful hints 
### How to create your own codec?

To implement a **codec** using this library you need to:

1. add the following repositories into `build.gradle`:

```
maven {
       url 'https://s01.oss.sonatype.org/content/repositories/snapshots/'
   }
   
   maven {
       url 'https://s01.oss.sonatype.org/content/repositories/releases/'
   }
```

2. add dependency on `com.exactpro.th2:codec:4.6.0` into `build.gradle`

3. set main class to `com.exactpro.th2.codec.MainKt`

This is usually done by using Gradle application plugin where you can set the main class like this:

```
application {
   mainClassName 'com.exactpro.th2.codec.MainKt'
}
```

4. implement `codec` itself by implementing IPipelineCodec interface:

```
interface IPipelineCodec : AutoCloseable {
    fun encode(messageGroup: MessageGroup): MessageGroup = TODO("encode(messageGroup) method is not implemented")
    fun encode(messageGroup: MessageGroup, context: IReportingContext): MessageGroup = encode(messageGroup)
    fun decode(messageGroup: MessageGroup): MessageGroup = TODO("decode(messageGroup) method is not implemented")
    fun decode(messageGroup: MessageGroup, context: IReportingContext): MessageGroup = decode(messageGroup)
    override fun close() {}
}
```

5. implement a factory for it, using IPipelineCodecFactory interface:
```
interface IPipelineCodecFactory : AutoCloseable {
    val protocols: Set<String>
    val settingsClass: Class<out IPipelineCodecSettings>
    fun init(dictionary: InputStream): Unit = TODO("not implemented")
    fun init(pipelineCodecContext: IPipelineCodecContext): Unit = pipelineCodecContext[DictionaryType.MAIN].use(::init)
    fun create(settings: IPipelineCodecSettings? = null): IPipelineCodec
    override fun close() {}
}
```
**NOTE**: both init methods have default implementations. 
One of them must be overridden in your factory implementation. 
If your **codec** needs the MAIN dictionary, only you can override the `init(dictionary: InputStream)` method. 
Otherwise, you should override the `init(pipelineCodecContext: IPipelineCodecContext)` method.

**IMPORTANT**: implementation should be loadable via Java's built-in service loader.

6. That's it! Your **codec** is now complete.
