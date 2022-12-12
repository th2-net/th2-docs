---
weight: 10
---

# Configuration

A generic configuration for **conn** is provided below.
To specify the `custom-config` object for a particular **conn** implementation provided as a [th2-net](https://github.com/th2-net) repository, refer to the "Configuration" section of its ReadMe file.

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
spec:
  image-name: your.image.repo:42/th2-conn-template
  image-version: <image version>
  type: th2-conn
  custom-config:
      # Depends on specific th2-conn component
  pins:
    - name: in_raw
      connection-type: mq
      attributes: ["first", "raw", "publish", "store"]
    - name: out_raw
      connection-type: mq
      attributes: ["second", "raw", "publish", "store"]
    - name: to_send
      connection-type: mq
      attributes: ["send", "parsed", "subscribe"]
```

## Required pins

A **conn** box has 3 types of pins:

- `out_raw` - raw messages that go from **conn** to the system.
- `in_raw` - raw messages that go from the system to **conn**.
- `to_send` - messages that go from a user to **conn**.

The **conn** box uses a separate queue to send messages.
It subscribes to that pin at the start and waits for the messages.
The messages received from that pin will be sent to the target system.
Also, this component is responsible for maintaining connections and sessions in the cases where it is provided by the communication protocol.
It can automatically send <term term="heartbeat messages">heartbeat messages</term>, logon/logout commands and requests to retransmit messages between an external system and th2.
