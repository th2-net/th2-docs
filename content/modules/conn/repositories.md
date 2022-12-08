---
weight: 5
---

# Repositories

There is a number of repositories on GitHub, created as a part of connectivity module implementation.

There is no universal template for the **conn** component, but you can use one of the already created **conn** repositories in [th2-net](https://github.com/th2-net) or use one of the custom protocol implementations provided there to apply it to your own version of **conn**.

<notice note>

Some of the **conn** repositories have `dirty` in the name.
It means that the component can be used for negative testing as it provides an ability to send invalid messages in order to get a protocol error.

</notice>

## Libraries

**conn** repositories with the `core` are the libraries, which can be useful for box implementation.

|Repository|Protocol(s)|
|----------|-----------|
|[th2-conn-dirty-tcp-core](https://github.com/th2-net/th2-conn-dirty-tcp-core) |TCP (also can be used for higher level protocols, e.g. FIX)|

## Boxes

[th2-net](https://github.com/th2-net) repositories with names starting with `th2-conn-` contain implementations of **conn**  for specific communication protocols. They already have docker image in the registry.

|Repository|Protocol(s)|
|----------|-----------|
|[th2-conn-amqp](https://github.com/th2-net/th2-conn-amqp)|[AMQP](https://www.amqp.org/)|
|[th2-conn-qfj](https://github.com/th2-net/th2-conn-qfj)|[FIX](https://www.fixtrading.org/what-is-fix/)|
|[th2-conn-http-client](https://github.com/th2-net/th2-conn-http-client)|HTTP, HTTPS|
|[th2-conn-http-server](https://github.com/th2-net/th2-conn-http-server)|HTTP, HTTPS|
|[th2-conn-ws-client](https://github.com/th2-net/th2-conn-ws-client)|WebSocket|
|[th2-conn-kafka](https://github.com/th2-net/th2-conn-kafka)|[Kafka](https://kafka.apache.org/)|
|[th2-conn-dirty-fix](https://github.com/th2-net/th2-conn-dirty-fix)|[FIX](https://www.fixtrading.org/what-is-fix/)|

## Templates

**conn** repositories with the `template` in their name are the templates of boxes.
You can add custom logic into these boxes.

|Repository|Protocol(s)|Custom Logic|
|----------|-----------|------------|
|[th2-conn-ws-client-template](https://github.com/th2-net/th2-conn-http-ws-client-template)|HTTP, HTTPS, WebSocket|Authorization, Received Messages Handler, Sending Messages, etc.|
|[th2-conn](https://github.com/th2-net/th2-conn)|[Sailfish](https://github.com/Exactpro/sailfish-core)|Allows you to create **conn** implementations based on Sailfish services|

## Other

Some of the public repositories related to the **conn** are not for common use, but they are still useful for the th2 ecosystem.

|Repository| Description                                                                                                                                                                                                                                                                                                                                                                                                          |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|[th2-grpc-conn](https://github.com/th2-net/th2-grpc-conn)| Contains a common gRPC interface for the **conn** modules. This interface can be used to control a **conn** (e.g. start or stop it). <br> The **conn** modules implementing this interface: <br> [th2-conn-qfj](https://github.com/th2-net/th2-conn-qfj) <br> [th2-conn-http-ws-client-template](https://github.com/th2-net/th2-conn-http-ws-client-template)                                                        |
|[th2-conn-generic](https://github.com/th2-net/th2-conn-generic)| Builds [FIX](https://www.fixtrading.org/what-is-fix/), [SOUP](https://www.nasdaqtrader.com/content/technicalsupport/specifications/dataproducts/souptcp.pdf), [NTG](https://docs.londonstockexchange.com/sites/default/files/documents/mit203_-_native_trading_gateway_specification_-_issue_13.2.pdf) ** conn** implementations on top of the [th2-conn](https://github.com/th2-net/th2-conn) Docker image. |
