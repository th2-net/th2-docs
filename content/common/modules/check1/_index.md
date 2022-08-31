---
title: check1
inner-title: check1 - a brief introduction

repo_owner: th2-net
repo: th2-check1
related: []
weight: 15
---
<!-- TODO: Add usecase subpage -->

## Overview

**check1** is the component of the th2 system that checks if a message(s) sent by the system under test (a real exchange or simulator) is accurate. This process is called <term term="verification">**verification**</term>. Verification is an essential part of the testing process because it allows you to ensure that a system is functioning properly. Verification is performed by comparing the actual results produced by a system to your expected results. You can write a script or create a model to send your expected results to **check1**.

By using **check1** you will be able to:

- identify the message(s) from the system related to your order message;

- identify the missing or extra messages by the system;

- check the order of the messages received;

- verify that the information contained within a system message is correct.


## Family
The following repositories are required by **th2-check1** module:

- [**th2-check1**](https://github.com/th2-net/th2-check1)
  - The check1 repository contains the source code which can be used to generate an image for a docker container. But the **check1** image is already in the registry for use. This image is pulled to Kubernetes to create a pod.
- [**th2-grpc-check1**](https://github.com/th2-net/th2-grpc-check1)
  - the gRPC check1 library. This library is required for communication by gRPC and includes the `check1.proto` file described below. This library is also used to create and publish the required packages in Python or Java.
  - [**th2-check1.proto**](https://github.com/th2-net/th2-grpc-check1/blob/master/src/main/proto/th2_grpc_check1/check1.proto)
    - The gRPC `check1.proto` file contains the definitions of **check1** service and the data structure of the requests and responses.
- [**th2-grpc-common**](https://github.com/th2-net/th2-grpc-common)
  - This library contains common proto messages that are used in all th2 components. Tool generates code from `.proto` files and uploads built packages (`.proto` files and generated code) to specified repositories.
  - [**th2-grpc-common.proto**](https://github.com/th2-net/th2-grpc-common/blob/master/src/main/proto/th2_grpc_common/common.proto)
    - this gRPC `common.proto` file contains definitions on common classes required by the check1 service.


A `.proto` file is the interface definition written using Interface Definition Language (IDL) from Protocol Buffers and defines the interface between a client and server for gRPC. The Protocol Buffers IDL is a custom, platform-neutral language with an open specification.

The `.proto` file is used to automatically generate language - or platform-specific stubs for clients and servers. Stubs are needed for parameter conversion so that servers can understand the client requests. The client program imports this interface, while the server program exports this interface.

The interface allows two components written in two languages to communicate with each other. By sharing `.proto` files, teams can generate code to use each others' services, without needing to take a code dependency.

More information is available at [**Protocol Buffers**](https://developers.google.com/protocol-buffers/docs/overview)

