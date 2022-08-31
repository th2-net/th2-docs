---
title: th2-conn
repo_owner: th2-net
repo: th2-conn
skip_readme: true
related:
  - name: "th2-conn repositories in th2-net"
    icon: "mdi-github"
    href: "https://github.com/orgs/th2-net/repositories?q=th2-conn&type=all&language=&sort="
weight: 5
---

**th2-conn** (where “conn” stands for "connect") component is responsible for the communication with a target system. This component implements the logic of the interaction protocol, receiving and sending messages from and to the system, respectively.

<!--more-->

![](/img/boxes/exactpro/th2-conn/th2-conn.png)

## Family

<notice info>

There is no universal template for the **th2-conn** component, but you can use one of the already created **th2-conn** repositories in [th2-net](https://github.com/th2-net) or take some custom protocol realisation from there and implement it to your version of **th2-conn**.

</notice>

Different **th2-conn** repositories in [th2-net](https://github.com/th2-net) use connect component with different types of communication protocols.

|Repository|Protocol(s)|
|----------|-----------|
|[th2-conn-amqp](https://github.com/th2-net/th2-conn-amqp)|[AMQP](https://www.amqp.org/)|
|[th2-conn-qfj](https://github.com/th2-net/th2-conn-qfj)|[FIX](https://www.fixtrading.org/what-is-fix/)|
|[th2-conn-http-client](https://github.com/th2-net/th2-conn-http-client)|HTTP, HTTPS|
|[th2-conn-http-server](https://github.com/th2-net/th2-conn-http-server)|HTTP, HTTPS|
|[th2-conn-ws-client](https://github.com/th2-net/th2-conn-ws-client)|WebSocket|

### Templates

**th2-conn** repositories with the “template“ part in their name allow you to add custom logic into a component. 

|Repository|Protocol(s)|Custom Logic|
|----------|-----------|------------|
|[th2-conn-ws-client-template](https://github.com/th2-net/th2-conn-http-ws-client-template)|HTTP, HTTPS, WebSocket|Authorization, Recieved Messages Handler, Sending Messages, etc.|

### Platforms

Some of the `th2-conn` repositories implement not only some protocol. They are made for a specific platform for processing data.

|Repository|Platform|
|----------|--------|
|[th2-conn](https://github.com/th2-net/th2-conn)|[Sailfish](https://github.com/Exactpro/sailfish-core)|
|[th2-conn-kafka](https://github.com/th2-net/th2-conn-kafka)|[Kafka](https://kafka.apache.org/)|

### Dirty

Some of the **th2-conn** repositories have “dirty“ in the name. It means that the component can be used for negative testing as it provides an ability to send invalid messages in order to get a protocol error.

|Repository|Protocol(s)|
|----------|-----------|
|[th2-conn-dirty-fix](https://github.com/th2-net/th2-conn-dirty-fix)|[FIX](https://www.fixtrading.org/what-is-fix/)|
|[th2-conn-dirty-http](https://github.com/th2-net/th2-conn-dirty-http)|	HTTP, HTTPS|
|[th2-conn-dirty-pillar](https://github.com/th2-net/th2-conn-dirty-pillar) |[Pillar](https://pillarprotocol.com/)|
|[th2-conn-dirty-tcp-core](https://github.com/th2-net/th2-conn-dirty-tcp-core) |TCP|

### Other

Some of the public repositories related to the **th2-conn** are not for community usage, but they are still usefull for the th2 ecosystem.

|Repository|Protocol(s)|
|----------|-----------|
|[th2-grpc-conn](https://github.com/th2-net/th2-grpc-conn)|Contains [GitHub action](https://github.com/features/actions) for publishing packages with gRPC client classes. These clients can send special requests to th2-conn components. <br> Supported th2-conn repositories: <br> [th2-conn-qfj](https://github.com/th2-net/th2-conn-qfj) <br> [th2-conn-http-ws-client-template](https://github.com/th2-net/th2-conn-http-ws-client-template) |
|[th2-conn-generic](https://github.com/th2-net/th2-conn-generic)|	Contains [GitHub action](https://github.com/features/actions) for publishing docker images for some of th2-conn boxes.|

## Configuration

Configuration for the **th2-conn** is provided below. Please refer to the instructions for the appropriate **th2-conn** component to specify `custom-config` object.

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

### Required pins

The **th2-conn** box has 3 types of pins:

- `out_raw` - raw messages that go from the **th2-conn** to the system.
- `in_raw` - raw messages that go from the system to **th2-conn**.
- `to_send` - messages that go from a user to **th2-conn**.

The connect component uses a separate queue to send messages. The component subscribes to that pin at the start and waits for the messages. The messages received from that pin will be sent to the target system. Also, this component is responsible for maintaining connections and sessions in the cases where it is provided by the communication protocol. Here you can automatically send <term term="heartbeat messages">heartbeat messages</term> , send a logon/logout, requests to retransmit messages in the event of a gap, etc.
