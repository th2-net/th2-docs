---
title: Use th2
weight: 6
read_before:
  - title:  Install th2
    href: ./install-th2
    icon: mdi-tune-vertical
test_config:
  - title: Test configuration
    href: https://github.com/th2-net/th2-infra-schema-demo/tree/ver-1.5.4-main_scenario
    icon: mdi-github
---

In this guide, you will learn how to use th2 in testing.

<!--more-->

As you already have Kubernetes cluster with th2, we can try it testing.

## Required software

### Python 3.7+

Python programming language is required for CQLSH and for running the demo script.

[Installation guide](https://wiki.python.org/moin/BeginnersGuide/Download)


### Java 8

Java programming language is required for running special modules for the demo script.

[Installation guide](https://www.java.com/en/download/help/download_options.html)

### Git

Git is the most popular project version control system. Created in line with the DevOps/GitOps paradigm, th2 synchronizes configuration in git repositories with the state of the testing system and updates corresponding components.

Follow [these instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install Git.

### Chrome 75 or newer

A browser is required to access the th2 web interface, Kubernetes dashboard, Grafana, etc. For th2, we use Chrome. To install it, use [this link](https://www.google.com/chrome).

## Create testing environment

You can create any modules for test logic that you want. You can architect any system of these modules, that you want. 

All you need is create Docker images of your module and describe it in `th2-infra-schema` repository. Every branch in this repository is the custom configuration for the th2 environment. 

We have prepared demonstration environment for you. All modules are already in the container registry. To try it, you need just create branch in `th2-infra-schema` with the content from our branch for th2 1.5.4 test configuration.

<recommendations :items="test_config"></recommendations>

As we created our `th2-infra-schema` from this template, we will just create new branch from this one.

We created new branch from `ver-1.5.4-main_scenario` to not commit changes in
the base configuration.

![](/img/getting-started/th2-infra-schema/git-based/create-branch.png)

In the new branch it is needed to edit `infra-mgr-config.yml`: variable `spec.k8s-propagation` should be configured as rule
instead of `off` to automatically apply all dependencies from _`th2-infra-schema`_. Lets commit changes.

```yml[infra-mgr-config.yml]
kind: SettingsFile
metadata:
  name: infra-mgr-config
spec:
  k8s-propagation: rule
```


`th2-infra-mgr` is monitoring your infra schema repository.
After described actions it will create `th2-<new_branch_name>` namespace and deploy all needed components.

In the infra editor new schema is available.

![Infra Schema](/img/getting-started/th2-infra-schema/git-based/infra-schema.png)

Infra Editor will create new namespace `th2-<new_schema_name>` in Kubernetes cluster for new schema.
It can require some time, there will be pods for this environment in Kubernetes cluster. You can go the Kubernetes dashboard and see it.

![New namespace](/img/getting-started/th2-infra-schema/git-based/new-namespace.png)

## Get and run simulator boxes

### Clone simulator boxes

Clone [Simulator](https://github.com/th2-net/th2-sim-template) branch for the demo script:

```shell
git clone -b demo-ver-1.5.4-local --single-branch https://github.com/th2-net/th2-sim-template.git
```

Clone [Log reader](https://github.com/th2-net/th2-read-log) branch for the demo script:

```shell
git clone -b demo-ver-1.5.4-local --single-branch https://github.com/th2-net/th2-read-log.git
```

Clone [CSV reader](https://github.com/th2-net/th2-read-log) branch for the demo script:

```shell
git clone -b demo-ver-1.5.4-local --single-branch https://github.com/th2-net/th2-read-csv.git
```

### Run simulator boxes

Run CSV reader:

```shell
gradle run --args='--namespace <schema-namespace> --boxName read-csv --contextName $(kubectl config current-context)'
```

Run Log reader:

```shell
gradle run --args='--namespace <schema-namespace> --boxName read-log --contextName $(kubectl config current-context)'
```

Run simulator:

```shell
gradle run --args='--namespace <schema-namespace> --boxName sim-demo --contextName $(kubectl config current-context)'
```

## Clone the script

Clone needed branch from the [demo script repository](https://github.com/th2-net/th2-demo-script).  
At the moment of creating guide, actual branch is `ver-1.5.4-main_scenario`

```shell
git clone -b <branch_name> --single-branch https://github.com/th2-net/th2-demo-script.git
```

## Get Python environment 3.7+ (e.g. Conda)

<notice info >

Python already might be installed after step **1.3.1 Install required software**.

</notice >

To install Python follow [this instruction](https://wiki.python.org/moin/BeginnersGuide/Download).

Recommendation: get IDE to work with Python (e.g. PyCharm, Spyder). You can also start this script from the command line,
but IDE will make process more convenient.

## Import the libraries described in requirements.txt

`requirements.txt` contains standart packages to work with gRPC (e.g. google-api-core) and custom packages to work
with th2 boxes. Please note that gRPC client (script) and gRPC server (th2 box) should use the same package.
You can find more information about requirements.txt and package installation
here: https://pip.pypa.io/en/stable/user_guide/#requirements-files

Locate to the script root folder:

```shell
python -m pip install -r requirements.txt
```

## Set up configs

Set up configs from directory configs (mq.json, rabbit.json, grpc.json) according to your components.

You can copy configurations for `mq.json` and `grpc.json` from `script-entry-point-app-config` config map in environment namespace. 

![mq config](/img/getting-started/demo-script/db-mq.png)


You can find values for `rabbit.json` in `rabbit-mq-external-app-config` config map.

![rabbit config](/img/getting-started/demo-script/db-rabbitmq.png)


<notice note >

If this `rabbit.json` configuration doesn't work, try to change `username`
and `password` values like in `secrets.yaml`.

</notice >

## Run demo script

Finally run demo script.

```shell
sudo python run.py
```

```shell[Output]
Using th2-common==3.3.6
2021-09-22 16:03:58,632 - asyncio - DEBUG - Using selector: SelectSelector
2021-09-22 16:04:03,336 - root - INFO - Connection established.
2021-09-22 16:04:03,343 - root - INFO - Storing event [TS_1]Aggressive IOC vs two orders: second order's price is lower than first...
.....
2021-09-22 16:04:03,346 - root - INFO - Storing event Case[TC_1.1]: Trader DEMO-CONN1 vs trader DEMO-CONN2 for instrument INSTR1...
.....
2021-09-22 16:04:03,348 - root - INFO - Sending request to act...
description: "STEP1: Trader \"DEMO-CONN1\" sends request to create passive Order."
.....
```
After client activity was simulated we can analyze it. The th2 components save information about requests and visualize them in special dashboards. So we have all tools to see what was wrong and where. 

<!--more-->

## Demo script scenario
1. User1 submit passive buy order with **Price=x** and **Size=30** - **Order1**
2. User1 receives an Execution Report with **ExecType=0**
3. User1 submit passive buy order with **Price=x+1** and **Size=10** - **Order2**
4. User1 receives an Execution Report with **ExecType=0**
5. User2 submit an aggressive sell IOC (Immediate Or Cancel) order with **price=x-1** and **Size=100** - **Order3**
  1. User1 receives an Execution Report with **ExecType=F** on trade between **Order2** and **Order3**
  2. User2 receives an Execution Report with **ExecType=F** on trade between **Order3** and **Order2**
  3. User1 receives an Execution Report with **ExecType=F** on trade between **Order1** and **Order3**
  4. User2 receives an Execution Report with **ExecType=F** on trade between **Order3** and **Order1**
  5. User2 receives an Execution Report with **ExecType=C** on expired **Order3**

## Boxes in schema

You have installed th2-infra-schema at the step 3. 
Boxes created by the th2-infra-schema for demo version are described below. 
![Environment schema](https://github.com/th2-net/th2-infra-schema-demo/blob/master/schema-ver-154.png?raw=true "Environment schema")

The demo script uses the following boxes:
1. `script` - there demo script is running;
2. `act-fix` can initiate FIX message sending;
3. `check1` is needed for data comparison;
4. `codec-fix` encrypts and decrypts messages on the client side;
5. `conn-client-fix` (connectivity client FIX) sends and receives FIX messages on the client side;
6. `conn-server-fix` (connectivity server FIX) sends and receives FIX messages on the server side;
7. `conn-server-dc` (connectivity server Drop Copy) replicates FIX messages for one or more participants;
8. `conn-dc-fix` (connectivity Drop Copy FIX) needed for receiving replicated FIX messages;
9. `codec-sim-fix` encrypts and decrypts messages on the server side;
10. `sim` (simulation) simulate server activity;
11. `estore` - store for events;
12. `mstore` - store for messages.

## Demo script flow

The script represents the set of messages sent to the system and the responses recived from the system.

In this example, **flow** is the path of the one message sent by the _script_.

When sending the message, script sends a gRPC request to the `act` component with
the instructions of which message should go to which connector. Act
transfers the message to the `conn` client component. Then, based on
the used gRPC call, it starts to find the message which will be the response
from the system on the message we’ve sent.

The `conn` client component gets the th2 message from the `act`, forms the FIX message
based on a dictionary and then sends it to the `conn` server on FIX protocol.

The `sim` gets this message from the `conn` server and creates a response on it, simulating remote system behavior.

The response returns on the `conn` server and then transfers to the `conn` client
on FIX protocol. Then response goes to the `codec`, where it is decoded into human-readable
th2 format which is also clear for the other components. From the codec all
the messages come to the `act`, to the `check1` for verifying on
requests from script and to the `recon` for passive verification.

When checking, the script sends a gRPC request to
`check1` with instructions on messages verification. These instructions
contain expected result on each message we want to verify.

Also, component `recon` performs the passive verification during all the env work.


![Demo script flow animation](https://github.com/th2-net/th2-documentation/raw/master/images/demo-ver154-main/script_flow.gif)

In the diagram below flow is described in static way.

![Demo script flow](/img/getting-started/analyze/Demo_script_flow-separated_conns.drawio.png)

## th2 reports

There is a web application that can display reports about th2 work.

It can be reached with the URI _http://\<hostname\>:30000/\<schema-namespace\>/_

![th2 reports GUI](/img/getting-started/analyze/th2-reports.png)

## Demo script steps

Demo script runs 6 times - with 6 different instruments.

![](/img/getting-started/analyze/6-runs.png)

Each run, except 6th, consists of 7 steps. 

![](/img/getting-started/analyze/7-steps-in-run.png)

First run will be commented there.

### Steps 1, 2

#### Scenario

In the **step 1** _script_ sends request to create passive buy order by user _DEMO-CONN1_.
Order has next parameters:
- Size (_OrderQty_) = 30
- Price = 55 (_x_ | _x_ depends on instrument)

To the end of the **step 1** response message about successfully created order is expected.

In the **step 2** _script_ sends instructions for checking response to the _check1_.

To the end of the **step 2** response be successfully checked by sent instructions is expected.

#### Generated events

Next image contains events within steps 1 and 2 from the th2 reports.

Moments of creating these events are demonstrated in "Actual work" section.

![](/img/getting-started/analyze/steps-1-2-report.png)

There is a possibility to check messages details. It can be very useful.  
For example, details of  _ExecutionReport_ from **step 1**.
Fields _Price_, _OrderQty_ (Size), _Text_ (Comment) can be found here.

![](/img/getting-started/analyze/step1-exec-report-details.png)

_Text_ contains information that this report is about placing order.

#### Actual work in **Step 1**

1. Trader "DEMO-CONN1" sends request to create passive Order.
2. Trader "DEMO-CONN1" receives Execution Report. The order stands on book in status NEW.

_"Received 'ExecutionReport' response message"_ is an expected output in **step 1**.


| Step 1.1 | Step 1.2 | 
|---|---|
| ![]( /img/getting-started/analyze/Demo_script_steps-step1-1.drawio.png) | ![]( /img/getting-started/analyze/Demo_script_steps-step1-2.drawio.png) |  

#### Actual work in **Step 2**

1. _Script_ sends instructions for response check to _check1_.
2. _Check1_ analyses response and generates event as the result.

Green _"Check messages"_ is an expected output in **step 2**.

![](/img/getting-started/analyze/Demo_script_steps-step2.drawio.png)

### Steps 3, 4

#### Scenario

In the **step 3** _script_ sends request to create passive buy order by user _DEMO-CONN1_.
Order has the following parameters:
- Size (_OrderQty_) = 10
- Price = 56 (_x+1_ | _x_ depends on instrument)

To the end of the **step 3** response message about successfully created order is expected.

In the **step 4** _script_ sends instructions for checking response to the _check1_.

To the end of the **step 4** response be successfully checked by sent instructions is expected.

#### Generated events

Next image contains events within steps 3 and 4 from th2 reports.

![](/img/getting-started/analyze/steps-3-4-report.png)

#### Actual work in **Step 3**

1. Trader "DEMO-CONN1" sends request to create passive Order with price lower than first order.
2. Trader "DEMO-CONN1" receives Execution Report. The order stands on book in status NEW.

_"Received 'ExecutionReport' response message"_ is an expected output in **step 3**.


| Step 3.1 | Step 3.2 | 
|---|---|
| ![]( /img/getting-started/analyze/Demo_script_steps-step1-1.drawio.png) | ![]( /img/getting-started/analyze/Demo_script_steps-step1-2.drawio.png) |  

#### Actual work in **Step 4**

1. _Script_ sends instructions for response check to _check1_.
2. _Check1_ analyses response and generates event as the result.

Green _"Check messages"_ is an expected output in **step 4**.

![](/img/getting-started/analyze/Demo_script_steps-step2.drawio.png)

### Steps 5, 6, 7

#### Scenario

In the **step 5** _script_ sends a request to create aggressive sell IOC order by user _DEMO-CONN2_.
Order has next parameters:
- Size (_OrderQty_) = 100
- Price = 54 (_x-1_ | _x_ depends on instrument)

To the end of the **step 5** response message about successfully trades or
cancelling order expected, because IOC
cannot be just placed.

There are **2 buy orders** with overall size (30 + 10) not bigger
than size of the **sell order** (100). Prices of these **buy orders** (55 and 56) are bigger
than price of the **sell order** (54). So trades are happening.

In the **step 6** _script_ sends instructions for checking
response messages for user _DEMO-CONN1_ to the _check1_.
_DEMO-CONN1_ awaits messages about buying by 2 orders, so there should be only 2 messages.

To the end of the **step 6** response be successfully checked
**2** messages by sent instructions is expected.

In the **step 7** _script_ sends instructions for checking
response messages for user _DEMO-CONN2_ to the _check1_.
_DEMO-CONN2_ should receive 3 messages:
1. Trade with _DEMO-CONN1_ for Order with Size=30
2. Trade with _DEMO-CONN1_ for Order with Size=10
3. Cancelling not traded Size (100 - 30 - 10 = 60)

To the end of the **step 7** response be successfully checked
**3** messages by sent instructions is expected.

#### Generated events

Next image contains events within steps 5, 6 and 7 from th2 reports.

![](/img/getting-started/analyze/steps-5-6-7-report.png)

#### Actual work in **Step 5**

1. Trader "DEMO-CONN2" sends request to create aggressive IOC Order.
2. Trader "DEMO-CONN1" receives Execution Reports with ExecType=F: first at Order2 and second on Order1.
3. Trader "DEMO-CONN2" receives Execution Reports: first trade with Order2, next with Order1 and then cancellation.

_"Received 'ExecutionReport' response message"_ is an expected output in **step 5**.

| Step 5.1 | Step 5.2/5.3 | 
|---|---|
| ![]( /img/getting-started/analyze/Demo_script_steps-step1-1.drawio.png) | ![]( /img/getting-started/analyze/Demo_script_steps-step1-2.drawio.png) |  

#### Actual work in **Step 6**

1. _Script_ sends instructions for response for trader "DEMO-CONN1" check to _check1_.
2. _Check1_ analyses response and generates event as the result.

Green _"Check messages"_ is an expected output in **step 6**.

![](/img/getting-started/analyze/Demo_script_steps-step2.drawio.png)

#### Actual work in **Step 7**

1. _Script_ sends instructions for response for trader "DEMO-CONN2" check to _check1_.
2. _Check1_ analyses response and generates event as the result.

Green _"Check messages"_ is an expected output in **step 7**.

![](/img/getting-started/analyze/Demo_script_steps-step7.drawio.png)

## Searching exceptions
th2 is the **test** tool. So it should be able to catch exceptions.

To demonstrate this ability _simulator box_ was programmed to create
exceptions with the specific instruments from the _script_.

_INSTR1_, _INSTR2_, _INSTR3_ work normally. Exceptions from other
instruments will be described below.

### Instr4

As described in the _Demo script steps_ section,
there should be 3 messages for the seller _DEMO-CONN2_ in the **step 7** of the demo script.

![](/img/getting-started/analyze/instr4-step7-report.png)

In fact, there are 4 messages.
The Simulator box sent a redundant execution report message to call an exception.

This information is displayed in the check sequence event details.

![img.png](/img/getting-started/analyze/instr4-step7-check-details.png)

You may find comment about exception in the details of one of the filtered messages.

![img.png](/img/getting-started/analyze/instr4-step7-extra-m-details.png)

### Instr5

The Simulator box sends one message with incorrect values at **step 7** within this run.

![img.png](/img/getting-started/analyze/instr5-verification-events.png)

Please note that there is a discrepancy between some expected and actual values,
which prompts the exception message in the th2 report.

### Instr6

In **step 1** within this run, the script sends the message with an unknown _security ID_, which leads to the
message being rejected.

Message structure:

![img_1.png](/img/getting-started/analyze/instr6-step1-message-details.png)

Exception details:

![img.png](/img/getting-started/analyze/instr6-exception-details.png)

## Compare results

<youtube id="mQa8c-OZZhU" ></youtube> 
