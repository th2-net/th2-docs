---
title: codec
inner-title: th2-codec
related:
  - name: "th2-net/th2-codec"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-codec"
--- 

# Overview 
The `codec` is a component that is responsible for transforming messages from human-readable format into a format of a corresponding protocol and vice versa. It contains the main logic for encoding and decoding messages. The `codec` usually uses a dictionary to decode and encode messages. Dictionaries contain message structure, fields and values that `codec` can decode. 

## Encoding
During encoding `codec` must replace each parsed message of supported protocols in a message group with a raw one by encoding parsed message's content

<notice info>

`codec` can merge content of subsequent raw messages into a resulting raw message
(e.g. when a `codec` encodes only a transport layer and its payload is already encoded).

</notice>

## Decoding
During decoding `codec` must replace each raw message in a message group with a parsed one by decoding raw message content.
If exception was thrown, all raw messages will be replaced with th2-codec-error parsed messages.

NOTE: `codec` can replace raw message with a parsed message followed by several raw messages (e.g. when a `codec` decodes only a transport layer it can produce a parsed message for the transport layer and several raw messages for its payload).

 

**raw** - pin configuration item, message passing through this pin for processing is in machine-readable format, ready to be sent or received via according protocol or being decoded;

**parsed** - pin configuration item, message passing through this pin for processing is in human-readable format, used in th2;

**encode** - pin configuration item, message passing through this pin will be translated from parsed to raw;

**decode** - pin configuration item, message passing through this pin will be translated from raw to parsed.

![](/img/boxes/exactpro/codec/codec_inside_processes.png)


Example of raw message (FIX protocol):
```fix
8=FIXT.1.19=6835=034=159049=fix-client156=fix-server152=20220608-13:14:37.58110=043
```

Example of parsed message (FIX protocol):

```
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




# Family 
You can use link to docker image of needed `codec` from it's GitHub repository to deploy it using th2-infra.

There are 3 types of `codec`-related repositories.

- Box - use it to translate message from raw to parsed and back (protocol is named in repository title and link);

- Library - use it to build your own `codec` component;

- Build script collection - use it to translate messages from raw to parsed (and back) with re-using of Sailfish code (see protocols in readme of repository).

SEE ALSO: [Sailfish](https://exactpro.com/test-tools/sailfish)

## Box repositories list:

|Box repositories|Type|Comments|
|---|---|---|
|[th2-net/th2-codec-grpc](https://github.com/th2-net/th2-codec-grpc)|Box (WIP)|`codec` for grpc protocol|
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

## Library repositories:

- [th2-net/th2-codec](https://github.com/th2-net/th2-codec) - all th2 codecs were made based on this library;

- [th2-net/th2-grpc-codec](https://github.com/th2-net/th2-grpc-codec) - grpc interface for all th2 codecs (this library is used by `th2-codec`);

- [th2-net/th2-codec-sailfish](https://github.com/th2-net/th2-codec-sailfish) - all codecs that use Sailfish as a library were made using this library.
 
## Other type:

[th2-net/th2-codec-generic](https://github.com/th2-net/th2-codec-generic) - collection of codecs for 4 different protocols using their sailfish implementation and `th2-codec-sailsfish` library. It contains 4 docker images, each of them is a box.

# Functions:
The `codec` component handles message flows between components such as conn, act, check1, read and other. On a schemes below you can see example of interaction with other th2 components .

![](/img/boxes/exactpro/codec/codec_interaction_with_other_components.png)

The `codec` component have 8 pins - 4 stream, and 4 general ones. Functionality of stream and general pins is same, but creating a component with 8 pins instead of two with 4 same pins were selected to decrease amount of configuration in infra-schema and resource requirements of resulting system. Main user of general pins is data-provider component, other components are usually connected to general pins.

## Why do we need a chain of codecs?

It is a very common case when the messages you send or receive from the system have the following structure: a transport layer protocol and a payload wrapped into the transport layer.
The payload can be any other protocol (even another transport protocol and a different payload wrapped into it). Also, sometimes different systems use the same transport protocol but with different payload wrapped into it (e.g. HTTP + JSON, HTTP + FIX).

Using chain of `codec` components allows to get rid of codec`s that combines the logic of existing ones and reduce the number of "connect", “read", "hand" boxes that should be developed.

If `codec` component gets message that do not match expected format (raw message of corresponding protocol to in_codec_decode pin and parsed message  to in_codec_encode pin) it will be sent through corresponding out pins without changes.

Several codecs can be joined into a chain of codecs to reuse already implemented codecs. For example, you have HTTP, JSON and XML `codec`. You can join them together for decoding XML over HTTP or JSON over HTTP.

# Configuration:
## Configuration parameters
The `codec` settings can be specified in `codecSettings` field of `custom-config`. 

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

This configuration is a general way for deploying components in th2. It contains box configuration, pins' descriptions and other common parameters for a box.

Config file can be divided into several blocks (mandatory sections are in bold):

- **apiVersion**:  API Kubernetes version used to create object, the only available value  - th2.exactpro.com/v1;

- **kind**: kind of object created, possible values - Th2Box, Th2CoreBox, Th2Estore, Th2Mstore, Th2Dictionary;

- **metadata**: (name, UID and optional field namespace). Should be equal to the file name;

- **spec**: required object state; here image-name and image-version specicfied (including versions), type, custom-config (component-specific set of parameters), pins (to communicate with other boxes);

- **extended-settings: service** (here we specify is the object available for other components), envVariables (environment variables of pod deployment),  resources (amount of resources available for pod), etc. 

There can be many such blocks in the configuration file.

## Required pins and links
The `codec` has four types of pins: stream encode, stream decode, general encode, general decode.

- **stream encode / decode** connections used for all testing activities performed with th2; act, conn, sim, recon, bookchecker microservices connections to `codec` through stream encode / encode connections;

- **general encode / decode** connections work on demand; those connections used mainly for th2 report UI; in order to show the end-user messages stored in cassandra report-data-viewer request said messages from rpt-data-provider via `codec`.

Codec never mixes messages from the stream and the general connections

<notice info>

SEE ALSO: [stream and general pins description](../../fundamentals/pins-and-links/pins#stream-and-general-codec-pins) 

</notice>

Pins are a part of the main th2 concept. They describe what are the inputs and outputs of a box. You can read more about them here.

Every `codec` operation is associated with 2 pins - subscribe and publish  The first one is used to receive messages to decode/encode while the second one is used to send decoded/encoded messages further. 

**Typical `codec` has the following pins**: 

- Pin for the stream encoding input: `encoder_in` `parsed` `subscribe`

- Pin for the stream encoding output: `encoder_out` `raw` `publish`

- Pin for the general encoding input: `general_encoder_in` `parsed` `subscribe`

- Pin for the general encoding output: `general_encoder_out` `raw` `publish`

- Pin for the stream decoding input: `decoder_in` `raw` `subscribe`

- Pin for the stream decoding output: `decoder_out` `parsed` `publish`

- Pin for the general decoding input: `general_decoder_in` `raw` `subscribe`

- Pin for the general decoding output: `general_decoder_out` `parsed` `publish`

## Configuration example

API Kubernetes documentation contains specification format for any Kubernetes in-built object; th2-specific custom resources can be found in Readme file of component repository.

- Field **name** in metadata must be filled in as a box name.

- Field *image-name** must contain a link to the image of `codec` on your project(preferably last version)(For one project you can have more than one `codec` for same protocol)

- **Image-version** field should be filled with image tag(version of image in your project’s `codec`)

- In the **type** field you should specify the type of component in th2

- **logFile** settings can be added on request to th2-support. There's no need to fill this field, because mostly you don’t need higher levels of logs. 

- Field **codecClassName** should be described as on the screenshot. It is a link to the factory for the `codec`. If you want to learn more about this mechanism, find “Factory method pattern” on the Internet.

- Setting **parseMessageLengthAsSeparateMessage** in **CodecParameters** if set to true then `codec` parses MessageLength as a separate message. This helps to separate the logical content of the message from its length, because, for example, in ITCH, MDF and FIX protocols the length of the messages is constant and there is no need to glue it to the message itself. For protocols with variable length like OMnet protocol you need to fill this field.

- In extended-settings in resources the **limits** must be greater than **requests**. So, if in Kubernetes you faced an error “Search line limits were exceeded” when you try to bring up the box then you should increase box resources and check that limits > requests.

- **Service** parameter: with the enable flag, we specify whether or not to create a service. If we want this component to be available to other components, we need to set this flag to enable. For the bookchecker it is false.

Extended example of th2-codec configuration:

```yaml
apiVersion: th2.exactpro.com/vl 
kind: Th2Box
metadata:
  name: codec-itch-mold-book-checker
spec:
  image-name: nexus.exactpro.com:12000/th2-net/th2-codec-soup 
  image-version: 3.10.4 
  type: th2-codec
  logFile: |
    log4j.root Logger=DEBUG, CON
    log4j.appender.CON=org.apache.log4j.ConsoleAppender 
    log4j.appender.CON.layout=org.apache.log4j.Pattern Layout
    log4j.appender.CON.layout.ConversionPattern=%d{dd MMM yyyy HH:mm:ss,SSS} %-6p [%-15t] %c - %m%n 
    log4j.logger.com.exactpro.th2.readlog.impl.RegexpContentParser=DEBUG 
    log4j.logger.com.exactpro.th2=DEBUG 
  custom-config:
    codecClassName: com./exactpro.sf.externalapi.codec.impl.ExternalSoupCodecFactory
    codecParameters:
      parseMessageLengthAsSeparateMessage: true
  ﻿pins:
    # encoder
    - name: in_codec_encode 
      connection-type: mq
      attributes:
        - encoder_in
        - parsed
        - subscribe
    - name: out_codec_encode 
      connection-type: mq
      attributes:
        - encoder_out
        - raw
        - publish
    # decoder
    - name: in_codec_decode 
      connection-type: mq
      attributes:
        - decoder_in
        - raw
        - subscribe
    - name: out_codec_decode_itchmold_al_bookchecker 
      connection-type: mq 
      attributes:
        - decoder_out
        - parsed
        - publish 
      filters:
        - metadata:
            - field-name: session_alias
              expected-value: itchmold-a1-bookchecker 
              operation: EQUAL
            - field-name: message_type 
              expected-value: PacketHeader 
              operation: NOT_EQUAL
    - name: out_codec_decode_itchmold_a2_bookchecker 
      connection-type: mq 
      attributes:
        - decoder_out
        - parsed
        - publish 
      filters:
        - metadata:
            - field-name: session_alias
              expected-value: itchmold-a2-bookchecker 
              operation: EQUAL
            - field-name: message_type 
              expected-value: PacketHeader 
              operation: NOT_EQUAL
    - name: in_codec_general_encode 
      connection-type: mq 
      attributes:
        - general_encoder_in
        - parsed
        - subscribe
    - name: out_codec_general_encode 
      connection-type: mq 
      attributes:
        - generalencoderout
        - raw
        - publish
    # decoder general (technical)
    - name: in_codec_general_decode 
      connection-type: mq 
      attributes:
        - general_decoder_in
        - raw
        - subscribe
    - name: out_codec_general_decode 
      connection-type: mq 
      attributes:
        - general_decoder_out
        - parsed
        - publish
  extended-settings: 
    service:
      enabled: false 
    resources: 
      limits: 
        memory: 500Mi 
        cpu: 300m 
      requests: 
        memory: 300Mi 
        cpu: 150m
```

## Codec-related links
Schema API allows configuring routing streams of messages via links between connections and filters on pins. Let's consider some examples of routing in `codec` box.

 

### Split on 'publish' pins
For example, you got a big source data stream, and you want to split them into some pins via session alias. You can declare multiple pins with attributes `['decoder_out', 'parsed', 'publish']` and filters instead of common pin or in addition to it. Every decoded messages will be direct to all declared pins and will send to MQ only if it passes the filter.

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

The filtering can also be applied for pins with subscribe attribute.

## Links config
The main link that every `codec` instance should have is a dictionary link. The `codec` instance will use a linked dictionary as a reference for validations. **If protocol-specific `codec` needs dictionary,  it won't properly function without it**.

Example:

**dictionary-links.yml**

```yaml
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

### Connectivity link(-s)
In order to connect `conn` microservice to `codec`, you have to define three links:

- Link `fix_to_send` `conn` pin with `out_codec_encode` pin so `act` and `sim` components can send messages to the system under test ;

- Link `in_raw` and `out_raw` `conn` pins with `in_codec_decode` `codec` pin so all message flow managed by the particular `conn` gets parsed and stored in `mstore`.

**from-codec-links.yml**

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: from-codec-links
spec:
  boxes-relation:
    router-mq:
- name: codec-to-gtwquod5
      from:
        box: codec-fix-sell
        pin: out_codec_encode
      to:
        box: gtwquod5
        pin: fix_to_send
```

**from-conn-links.yml**

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: from-conn-links
spec:
  boxes-relation:
    router-mq: 
- name: gtwquod5-codec-fix-sell-in
      from:
        box: gtwquod5
        pin: in_raw
      to:
        box: codec-fix-sell
        pin: in_codec_decode
- name: gtwquod5-codec-fix-sell-out
      from:
        box: gtwquod5
        pin: out_raw
      to:
        box: codec-fix-sell
        pin: in_codec_decode
```

 
### Check1 link(-s)
In order to check parsed messages via requests to `check1` microservice, `codec` should be linked to check1 in the following way:

- **out_codec_decode** `codec` pin should be linked to `check1`'s pre-configured dedicated pin for particular `codec`.

**from-codec-links.yml**

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: from-codec-links
spec:
  boxes-relation:
    router-mq:
- name: codec-sell-to-check1
      from:
        box: codec-fix-sell
        pin: out_codec_decode
      to:
        box: check1
        pin: from_codec_fix_sell
```

### Act link(-s)
To send messages to system under test via `act` microservice (and consequently receive responses for sent messages), the `act` should be linked with `codec` in the following way:

- Dedicated to desired `conn`, `act` pin with applied session-alias filter should be linked to **in_codec_encode** `codec` pin for particular `codec`;

- **out_codec_decode** `codec` pin should be linked to `act`'s pre-configured dedicated pin for particular `codec` in order to receive responses for requests.

**from-codec-links.yml**

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: from-codec-links
spec:
  boxes-relation:
    router-mq:
- name: from-codec-sell-to-act
      from:
        box: codec-fix-sell
        pin: out_codec_decode
      to:
        box: act
        pin: from_codec_fix_sell
```

**from-act-links.yml**

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: from-act-links
spec:
  boxes-relation:
    router-mq:
- name: act-to-gtwquod5
      from:
        box: act
        pin: to_send_gtwquod5
      to:
        box: codec-fix-sell
        pin: in_codec_encode
```

### Simulator link(-s)
The `simulator` should be linked to the `codec` in order to interact with a system under test through the desired `conn`. 

- To send messages to the system under test , link dedicated to desired `conn` `sim` pin with applied session-alias as attribute should be linked to `in_codec_encode` `codec` pin;

- To receive messages from the system under test , link `out_codec_decode` `codec` pin with sim's subscribe pin.

**from-codec-links.yml**

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: from-codec-links
spec:
  boxes-relation:
    router-mq:
- name: codec-sell-to-sim
      from:
        box: codec-fix-sell
        pin: out_codec_decode
      to:
        box: sim-quod
        pin: subscribe
```

**from-sim-links.yml**

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: from-sim-links
spec:
  boxes-relation:
    router-mq:
- name: sim-quod-to-gtwquod5
      from:
        box: sim-quod
        pin: send_gtwquod5
      to:
        box: codec-fix-sell
        pin: in_codec_encode
```

### Report Data Provider link(-s)
In order to show messages that passing through `codec` in Report UI, `codec` should be linked to `rpt-data-provider` in the following way:

Dedicated to desired `codec` rpt-data-provider pin should be linked to in_codec_general_decode `codec` pin;

out_codec_general_decode `codec` pin should be linked to rpt-data-provider pre-configured dedicated pin for particular `codec`.

**from-codec-links.yml**

```yaml
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

# Useful hints 
## How to create your own `codec`?
To implement a `codec` using this library you need to:

1. add the following repositories into build.gradle:

```
maven {
       url 'https://s01.oss.sonatype.org/content/repositories/snapshots/'
   }
   
   maven {
       url 'https://s01.oss.sonatype.org/content/repositories/releases/'
   }
```

2. add dependency on com.exactpro.th2:codec:4.6.0 into build.gradle

3. set main class to com.exactpro.th2.codec.MainKt

This is usually done by using Gradle's application plugin where you can set main class like this:

```
application {
   mainClassName 'com.exactpro.th2.codec.MainKt'
}
```

4. implement codec itself by implementing IPipelineCodec interface:

```
interface IPipelineCodec : AutoCloseable {
    fun encode(messageGroup: MessageGroup): MessageGroup = TODO("encode(messageGroup) method is not implemented")
    fun encode(messageGroup: MessageGroup, context: IReportingContext): MessageGroup = encode(messageGroup)
    fun decode(messageGroup: MessageGroup): MessageGroup = TODO("decode(messageGroup) method is not implemented")
    fun decode(messageGroup: MessageGroup, context: IReportingContext): MessageGroup = decode(messageGroup)
    override fun close() {}
}
```

5. implement a factory for it using IPipelineCodecFactory interface:
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
**NOTE**: both init methods have default implementations. One of them must be overridden in your factory implementation. If your codec needs the MAIN dictionary only you can override the init(dictionary: InputStream) method. Otherwise, you should override init(pipelineCodecContext: IPipelineCodecContext) method.

**IMPORTANT**: implementation should be loadable via Java's built-in service loader

6. That's it! Your `codec` is now complete.
