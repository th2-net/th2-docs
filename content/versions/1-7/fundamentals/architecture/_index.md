---
title: Architecture
weight: 0
---

[th2](https://github.com/th2-net), a framework for automation in software testing, is designed as a set of microservices that is build out of a number of repositories. 

<!--more-->

For the open-sourced part of th2, these repositories are created and maintained on GitHub. The organizational structure of th2-related code is explained in the subsection [“th2-net organization on GitHub”](./architecture/th2-net-on-github). Dependencies schema is provided [here](https://raw.githubusercontent.com/d0rich/th2-dependencies/master/output/schema.svg). Main component groups and their current status on GitHub can be seen on the [Dashboard](./architecture/dashboard).

From the *functional* perspective, the framework consists of the following blocks:

Infrastructure: a set of service components that facilitate th2 boxes' deployment and ensure the functioning of the th2 framework, its monitoring, and interaction between its components.  

Core: A set of components that are central to th2 framework as they ensure data storage and access to it, as well as provide capabilities to view and analyze test execution reports through a GUI.

Modules: A set of components targeted at performing various actions that are commonly used in software testing; the capabilities of these components can be customized, and new th2 components may be created based on them to reflect the specifics of a client system or a test scenario.

[Placeholder] Data Services: A Python library supporting the data-driven approach behind th2 framework; it allows users to retrieve data from th2 data storage and perform data analysis via Jupyter Notebooks.

These functional blocks correspond to the following groups of GitHub repositories:
- th2 Infrastructure
- th2 Core 
- th2 Modules
- th2 Data Services

## th2 Infrastructure

[th2-infra](https://github.com/th2-net/th2-infra) – a set of charts and values for the deployment of infrastructure components. The repository is common for everyone, but you can fork or clone it if you need to customize values.

[th2-infra-mgr](https://github.com/th2-net/th2-infra-mgr) – a Kubernetes operator responsible for rolling out schemas (`th2-infra-schema` – a test environment configuration based on the [Kubernetes custom resources, or CRs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)) from a Git repository to Kubernetes. It monitors a Git repository and deploys changed components to your [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

[th2-infra-operator](https://github.com/th2-net/th2-infra-operator) – a Java implementation of the Kubernetes [custom resource controller](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#custom-controllers) for th2 custom components. It monitors custom resources uploaded by `th2-infra-mgr` and uses CRs to configure message/event routing in RabbitMQ or uploads Helm release for further configuration and deployment of th2 boxes.

[th2-infra-schema](https://github.com/th2-net/th2-infra-schema-demo) – a configuration for th2 environment (called `infra-schema`).

[th2-infra-editor](https://github.com/th2-net/th2-infra-editor) –  a GUI for infrastructure management.

## th2 Core 

[th2-mstore](https://github.com/th2-net/th2-mstore) – a th2 box that saves raw messages received from an MQ pin [link to be replaced] into the data lake.

[th2-estore](https://github.com/th2-net/th2-estore) – a th2 box that saves test events from an MQ pin [link to be replaced] into the data lake.

[th2-rpt-data-provider](https://github.com/th2-net/th2-rpt-data-provider) – a th2 box that interacts with the data lake to retrieve events and messages via user requests.

[th2-rpt-viewer](https://github.com/th2-net/th2-rpt-viewer) – a web-based UI for th2 Reports; displays events and messages provided by the `rpt-data-provider`.

## th2 Modules

An open set of repositories related to different actions required for testing activities. Examples include but are not limited to:
- [th2-conn](https://github.com/th2-net/th2-conn)
- [th2-codec](https://github.com/th2-net/th2-codec-generic)
- [th2-act-template-j](https://github.com/th2-net/th2-act-template-j)
- [th2-sim](https://github.com/th2-net/th2-sim)
- [th2-check2-recon](https://github.com/th2-net/th2-check2-recon-template)
- [th2-read](https://github.com/th2-net/th2-read-file-common-core)
- [th2-hand](https://github.com/th2-net/th2-hand)
- etc. 

## th2 Data services

[th2-data-services](https://github.com/th2-net/th2-data-services) – a library for creating th2-data-services applications

