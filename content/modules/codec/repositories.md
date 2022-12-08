---
weight: 5
---

# Repositories

There are 3 types of **codec**-related repositories.

- <term term='box'>Box</term> - use it to translate messages from raw to parsed and back (the name of repository contains the protocol which is used).

- Library - use it to build your own **codec** component.

- Build script collection - use it to translate messages from raw to parsed (and back) with re-using of Sailfish code (see protocols in Readme files of the repository). SEE ALSO: [Sailfish](https://exactpro.com/test-tools/sailfish).

## Box repositories list:

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

## Library repositories:

- [th2-net/th2-codec](https://github.com/th2-net/th2-codec) — a common **codec** library with basic functionalities of subscribing/publishing to message queues and loading **codec** settings; all **codecs** written specifically for th2 are based on this library.

- [th2-net/th2-grpc-codec](https://github.com/th2-net/th2-grpc-codec) - library containing gRPC interface for **th2-codec** library. This interface can be used to encode/decode messages via RPC call.

- [th2-net/th2-codec-sailfish](https://github.com/th2-net/th2-codec-sailfish) - all **codecs** that use Sailfish as a library are based on this library.

## Build script collection:

[th2-net/th2-codec-generic](https://github.com/th2-net/th2-codec-generic) - a repository that builds FAST, FIX, ITCH, NTG, and SOUP **codecs** using their Sailfish implementation and `th2-codec-sailsfish` as a base.

You can use a link to a docker image of needed **codec** from its GitHub repository to deploy it using **th2-infra**.
