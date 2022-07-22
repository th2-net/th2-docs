---
title: th2-mstore
repo_owner: th2-net
repo: th2-mstore
skip_readme: true
related:
  - name: "th2-net/cradleapi"
    icon: "mdi-github"
    href: "https://github.com/th2-net/cradleapi"
---

## Overview

**mstore** (th2 message store) is an important th2 component responsible for storing raw messages into Cradle. This component has a pin for listening to messages via MQ.

As a part of th2-core, **mstore** is responsible for saving and displaying data. This component's logic is still the same for all the th2 environments. Messages - data that is going in or out of th2. **mstore** saves message content and metadata. 

During pins of other components configuration, you can specify `store` attribute, means that messages from this pin will be stored via mstore. 

mstore interacts with Cradle and Common libraries. Using RabbitMQ mstore gets messages in batches, then trying to pack it more compactly, and finally writing them to Cassandra using Cradle library.

## Family

 [th2-mstore](https://github.com/th2-net/th2-mstore) - component repository.

## Functionality

You must mark a pin that produces raw messages in **conn**, **read** and **hand** boxes via the `store` attribute, in order to automatically connect that pin to **mstore** and to collect all messages into Cradle.

mstore consumes raw messages. Parsed messages will not be accepted. 

Raw message is a base entity of th2. All incoming / outgoing data is stored in this format. Every raw message contains important parts:​

- session alias - unique identifier of business session;

- direction - direction of message stream;

- sequence number - incremental identifier;

- data - byte representation of a raw message.

Session alias, direction and sequence number are a ***compound unique identifier** of raw messages within th2.

mstore uses two libraries - common and <term term="Cradle">Cradle</term>.

Common library is responsible for collecting messages in **mstore** from all pins with `store` attribute.

**mstore** uses Cradle library to write message batches in Cassandra.

## Configuration:

**infra-schema** can only contain one **mstore** box description. It consists of one required option - docker image. Pin configuration is generated and managed by **infra-operator**.

### Configuration parameters

- `drain-interval` - interval in milliseconds to drain all aggregated batches that are not stored yet. The default value is `1000`.

- `termination-timeout` - the timeout in milliseconds to await for the inner drain scheduler to finish all the tasks. The default value is `5000`.

```yaml
{
  "drain-interval": 1000,
  "termination-timeout": 5000
}
```

### Required pins and links

The **mstore** component has nothing we call "pin" in general. There are MQ queues, and you fill it with raw messages via `store` attribute for several pins (usually for **conn**, **hand** and **read** components).

### Configuration example

General view of the component looks like this:

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Mstore
metadata:
  name: mstore
spec:
  image-name: ghcr.io/th2-net/th2-mstore
  image-version: <image version>
  custom-settings:
    drain-interval: 1000
    termination-timeout: 5000
  extended-settings:
    service:
      enabled: false
    envVariables:
      JAVA_TOOL_OPTIONS: "-XX:+ExitOnOutOfMemoryError -Ddatastax-java-driver.advanced.connection.init-query-timeout=\"5000 milliseconds\""
    resources:
      limits:
        memory: 500Mi
        cpu: 200m
      requests:
        memory: 100Mi
        cpu: 20m
```

## Useful hints

### Message batches

**mstore** can consume `RawMessageBatch` objects. Every batch must be built via the following rules:

- all messages in one batch must have identical `session alias` and `direction`;

- each batch must have messages in ascending order;

- the first message in each batch for session alias + direction pair must have a sequence number that is greater than the last message from the previous batch for the same session alias + direction pair;

- all the parts of one business message must be placed into one th2 batch and also several packages of business messages can be placed into one th2 batch.

<notice note>

Source business message can be split into several pieces when it is transferred via different protocols, for example, FIX message wrapped into HTTP package.

</notice>

<notice note>

mstore 4.1+ works with grouped message batches that contains mixed sessions

</notice>
