---
weight: 15
repo_owner: th2-net
repo: th2-mstore
hide_releases: true
skip_readme: true
related:
  - name: "th2-net/cradleapi"
    icon: "mdi-github"
    href: "https://github.com/th2-net/cradleapi"
---

# th2-mstore

## Overview

**mstore** (th2 message store) is one of <term term="Core">Core</term> components of th2.
It is responsible for storing raw messages into <term term="Cradle">Cradle</term>, the data lake based on Cassandra NOSQL database.

<notice info>
Raw messages are produced by several th2 components during testing. 
</notice>

Instead of having several components saving raw messages directly into the data lake, the raw messages are routed to the **mstore**.
The **mstore** will keep track of the order of the saved messages and ensures that messages in the database are stored in the correct order.

The **mstore** has a pin for listening to messages via RabbitMQ (message broker).
Through this pin, the **mstore** automatically receives raw messages from modules having pins with a connection type `mq` and attribute `store`.
Therefore, users must declare a pin with this configuration in any module that produces raw messages.
Typically, raw messages are produced by the th2 boxes **conn**, **read**, and **hand**.

A single instance (box) of the **mstore** is always required in every th2 environment.
The logic of this box is the same in every th2 environment and requires no modifications.
 
## Family

 [th2-mstore](https://github.com/th2-net/th2-mstore) - component repository.

## Functionality

- The **mstore** automatically receives raw messages, parsed messages are not accepted. 
- The **mstore** saves these raw messages to th2's data lake.
- The **mstore** uses the Cradle Api Library to write data into the data lake.
- The **mstore** tracks all saved messages and ensures that messages are saved to the database in the correct order.

## Configuration:

**infra-schema** requires one **mstore** box description (custom resource).

### Configuration parameters

- `drain-interval` - interval in milliseconds to drain all aggregated batches that are not stored yet. 
- The default value is `1000`.

- `termination-timeout` - the timeout in milliseconds to await for the inner drain scheduler to finish all the tasks. 
- The default value is `5000`.

```yaml
{
  "drain-interval": 1000,
  "termination-timeout": 5000
}
```

### Required pins and links
Pin configuration is generated and managed by the **infra-operator**.


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

### Raw Messages

The raw message is a base entity of th2.
All incoming / outgoing data is stored in this format.
Every raw message contains the following important parts:​

- session alias - unique identifier of business session;
- direction - <term term="direction">direction</term> of message stream;
- sequence number - incremental identifier;
- data - byte representation of a raw message.

Session alias, direction and sequence number are a compound unique identifier of raw messages within th2.

### Message batches

**mstore** consumes `RawMessageBatch` objects. 
Every batch must be built via the following rules:

- all messages in one batch must have identical `session alias` and `direction`;

- each batch must have messages in ascending order;

- the first message in each batch for session alias + direction pair must have a sequence number that is greater than the last message from the previous batch for the same session alias + direction pair;

- all the parts of one business message must be placed into one th2 batch and also several packages of business messages can be placed into one th2 batch.

<notice note>

Source business message can be split into several pieces when it is transferred via different protocols, for example, FIX message wrapped into HTTP package.

</notice>

<notice note>

**mstore** 4.1+ works with grouped message batches that contains mixed sessions

</notice>
