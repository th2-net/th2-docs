---
title: Hardware
inner_title: Recommended hardware
weight: 4
---

import RequirementsCalculatorApp from '~/components/apps/RequirementsCalculatorApp.vue'

## Sample hardware configurations

This section provides requirements for some of the th2 use cases.

<notice note >

When creating a node, you may want to mount the `/var` filesystem to a
disk partition (or LVM) of required size.
This approach is convenient because a considerable
amount of disk space required for Cassandra, Docker or
other container runtime is allocated inside `/var` filesystem by default.

</notice >

### Use case #1. Single machine cluster for PoC or development

#### Kubernetes node **x1**

|CPU (Сores)|Memory(GB)	|Disk space (GB)|
|---|---|---|
|6-8 CPU cores|16-32 GB RAM|`/var` 150 GB<br>`/opt` 150 GB|

### Use case #2. Single machine cluster with moderate amount of workloads (less than 100 pods) without non-functional testing

#### Kubernetes node **x1**

|CPU (Сores)|Memory(GB)	|Disk space (GB)|
|---|---|---|
|8-12 CPU cores|32 GB RAM|`/var` 80 GB <br>`/opt` 150 GB (for logs and metrics)|

#### Cassandra node **x3**

|CPU (Сores)|Memory(GB)	|Disk space (GB)|
|---|---|---|
|4 CPU cores|8 GB RAM|`/var` 500 GB|

### Use case #3. Cluster with significant amount of workloads (more than 100 pods) with non-functional testing

#### Kubernetes master node **x1**

|CPU (Сores)|Memory(GB)	|Disk space (GB)|
|---|---|---|
|2-4 CPU cores|2-4 GB RAM|`/` 20 GB|

#### Kubernetes worker node **x3+**

|CPU (Сores)|Memory(GB)	|Disk space (GB)|
|---|---|---|
|8-12 CPU cores|32 GB RAM|`/` 80 GB <br>`/opt` 150 GB (for logs and metrics)|

#### Cassandra node **x3**

|CPU (Сores)|Memory(GB)	|Disk space (TB)|
|---|---|---|
|4 CPU cores|8 GB RAM|`/` 1 TB|

## Minimal hardware requirements calculator

The recommended working disk capacity, CPU, and memory required for the th2 installation can be calculated
via the following formula (please find the reference table below):

th2 environment = **th2 infra** + **th2 core** + **th2 monitoring** + **th2 building blocks** + **th2 custom** + **data storage (Cassandra)**

<notice info >

Tables below provide **minimal** hardware requirements for different th2 blocks and components within a node.
By ticking the checkboxes, you can select options to use on your machine - as a result,
total **minimal** hardware requirements will be displayed in the [corresponding table](#total-requirements).

</notice >


<requirements-calculator-app>

<template v-slot:total>

## Total hardware minimal requirements

</template>

<template v-slot:components>

## th2 components requirements

</template>

<template v-slot:cassandra>

## Apache Cassandra cluster hardware requirements

Though it is possible to use Cassandra single-node installation,
generally it’s recommended to setup at least 3-nodes cluster. Requirements for each node are the same.

</template>

</requirements-calculator-app>
