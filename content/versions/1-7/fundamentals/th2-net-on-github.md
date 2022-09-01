---
title: th2-net on GitHub
weight: 5
---

th2 is the next generation test harness, based on microservice architecture. It is made up of components with the  corresponding [repositories](https://github.com/orgs/th2-net/repositories) on GitHub. 

<!--more-->

th2-net repositories can be classified based on their: 
1. usage – how a repository is supposed to be used;
2. functionality – which th2 functional module is related to the repository;
3. box groups – based on the th2 structural blocks, such as th2-core, th2-infra, etc.;
4. technology support – which technologies are supported by the module.

In th2-net organization on GitHub this classification is implemented with [topics](https://github.blog/2017-01-31-introducing-topics/).

## Usage topics

First group of topics are the usage topics which combine such components as:  `th2-box`, `th2-library`, `th2-grpc-library`.

[th2-box](https://github.com/search?q=topic%3Ath2-box+org%3Ath2-net+fork%3Atrue&type=repositories) repository has a prepared Docker configuration for using current repository as a th2 module.

[th2-library](https://github.com/search?q=topic%3Ath2-library+org%3Ath2-net+fork%3Atrue&type=repositories) repository contains library with specific for th2 logic. It might be published in an appropriate package registry.

[th2-grpc-library](https://github.com/search?q=topic%3Ath2-grpc-library+org%3Ath2-net+fork%3Atrue&type=repositories) repository contains `.proto` definitions for gRPC messages and scripts for native library generation. The repository is not a library itself, but there are published Python and Java packages, which are generated with current repository. The packages have the same name as the repository.

## Functionality topics

Each module of th2 has its own functionality. Also, a module can have different variants of its implementation – for example, `th2-grpc-library` repositories are created for certain modules. All these repositories comprise a module-specific repository family united by the functionality of its main component. Functionality-related topics are named in line with the names of the corresponding modules:
- [th2-check1](https://github.com/search?q=topic%3Ath2-check1+org%3Ath2-net+fork%3Atrue&type=repositories)
- [th2-act](https://github.com/search?q=topic%3Ath2-act+org%3Ath2-net+fork%3Atrue&type=repositories)
- [th2-conn](https://github.com/search?q=topic%3Ath2-conn+org%3Ath2-net+fork%3Atrue&type=repositories)
- [th2-check2](https://github.com/search?q=topic%3Ath2-check2+org%3Ath2-net+fork%3Atrue&type=repositories)
- topics for other modules can be added in the future

## Box groups topics

th2 has its own classification of boxes, which includes 3 groups: `th2-infra`, `th2-core`, `th2-box` (intersects with the usage topics).

- [th2-infra](https://github.com/search?q=topic%3Ath2-infra+org%3Ath2-net+fork%3Atrue&type=repositories) repositories are not really th2 boxes. They contain libraries and pods source code providing synchronization between th2-infra-schema and th2 environment inside Kubernetes cluster, RabbitMQ server etc.
- [th2-core](https://github.com/search?q=topic%3Ath2-core+org%3Ath2-net+fork%3Atrue&type=repositories) repositories contain libraries and boxes providing access to common data storage in th2 environment.
- [th2-box](https://github.com/search?q=topic%3Ath2-box+org%3Ath2-net+fork%3Atrue&type=repositories) repositories contain source code for some logical module of th2.

## Technology support topics

Also, th2 modules can support different technologies. It can be reflected in topics as well:
- [grpc](https://github.com/search?q=topic%3Agrpc+org%3Ath2-net+fork%3Atrue&type=repositories)
- [fix](https://github.com/search?q=topic%3Afix+org%3Ath2-net+fork%3Atrue&type=repositories)
- [native](https://github.com/search?q=topic%3Anative+org%3Ath2-net+fork%3Atrue&type=repositories)
- [soup](https://github.com/search?q=topic%3Asoup+org%3Ath2-net+fork%3Atrue&type=repositories)
- [rest-api](https://github.com/search?q=topic%3Arest-api+org%3Ath2-net+fork%3Atrue&type=repositories)
- [otherprotocols](https://github.com/search?q=topic%3Aotherprotocols+org%3Ath2-net+fork%3Atrue&type=repositories)
- [webui](https://github.com/search?q=topic%3Awebui+org%3Ath2-net+fork%3Atrue&type=repositories)

## th2-net map

You also can track dependencies on this auto-generated graph.

[![th2 dependencies](https://raw.githubusercontent.com/d0rich/th2-dependencies/master/output/schema.svg)](https://raw.githubusercontent.com/d0rich/th2-dependencies/master/output/schema.svg)
