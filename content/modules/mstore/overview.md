---
weight: 0
---

# Overview

**mstore** (th2 message store) is an important th2 component responsible for storing raw messages into <term term="Cradle">Cradle</term>. 
This component has a pin for listening to messages via MQ.

As a part of th2-core, **mstore** is responsible for saving and displaying data. 
This component's logic is same for all the th2 environments. 
Messages are the data that is going in or out of th2. **mstore** saves content and metadata of those messages. 

When marking the pins during configurating other components, you can specify `store` attribute, which means that the messages from this pin will be stored via **mstore.** 

**mstore** interacts with Cradle and <term term="th2-common">Common libraries</term>. 
Using RabbitMQ **mstore** gets messages in batches, then it will try to pack batches more compactly, and finally write them to Cassandra using Cradle library. 
Take into account that the batches cannot be merged, if combined batch exceeds the size limitation configured in Cradle.

## Functionality

To automatically connect the pin to **mstore** and to collect all the messages into <term term="Cradle">Cradle</term>, you must mark a pin that produces raw messages in **conn**, **read** and **hand** boxes via the `store` attribute. 

**mstore** consumes raw messages. 
Parsed messages are not accepted. 

Raw message is a base entity of th2. 
All incoming / outgoing data is stored in this format. 
Every raw message contains the following important parts:​

- session alias - unique identifier of business session;

- direction - <term term="direction">direction</term> of message stream;

- sequence number - incremental identifier;

- data - byte representation of a raw message.

Session alias, direction and sequence number are a compound unique identifier of raw messages within th2.

**mstore** uses two libraries - <term term="th2-common">common</term> and Cradle.

Common library is responsible for collecting messages in **mstore** from all pins with `store` attribute.

**mstore** uses Cradle library to write message batches in Cassandra.

