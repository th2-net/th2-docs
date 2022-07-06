---
title: Demo main scenario
weight: 10
read_before:
  - title: Install th2
    href: ../getting-started/install-th2
    icon: mdi-tune-vertical
  - title: Quick cluster setup
    href: ./quick-demo-setup
    icon: mdi-fast-forward-outline
---

This guide contains instructions on how to: 
1. deploy the th2 environment with an exchange simulator to your th2 cluster;
2. run a special script to check exchange and client requests.

## Requirements

1. th2 cluster
2. [Tester box](../getting-started/requirements/software#tester-box) with installed software:
   - Git
   - kubectl
   - Chrome 75+
   - Python and `pip`
   - Java 8+ and Gradle

## Set up th2 environment

You will deploy a th2 environment, configured for this demo script. The boxes are described below.

![Environment schema](https://github.com/th2-net/th2-infra-schema-demo/blob/master/schema-ver-154.png?raw=true "Environment schema")

The demo script uses the following boxes:
1. `script` - demo script is running;
2. `act-fix` initiates FIX message sending;
3. `check1` needed for data comparison;
4. `codec-fix` encrypts and decrypts messages on the client side;
5. `conn-client-fix` (connectivity client FIX) sends and receives the FIX messages on the client side;
6. `conn-server-fix` (connectivity server FIX) sends and receives the FIX messages on the server side;
7. `conn-server-dc` (connectivity server Drop Copy) replicates the FIX messages for one or more participants;
8. `conn-dc-fix` (connectivity Drop Copy FIX) needed for receiving the replicated FIX messages;
9. `codec-sim-fix` encrypts and decrypts messages on the server side;
10. `sim` (simulator) simulates server (exchange) activity;
11. `estore` - store for events;
12. `mstore` - store for messages.

### Create th2 environment

[`Here`](https://github.com/th2-net/th2-infra-schema-demo/tree/ver-1.5.4-main_scenario) is the configuration for the th2 environment for this scenario. Copy the branch to the new branch of your `th2-infra-schema`.

In the new branch edit `infra-mgr-config.yml`: variable `spec.k8s-propagation` should be configured as a `rule`
instead of `off` to automatically apply all dependencies from _`th2-infra-schema`_. Commit the changes.

```yml[infra-mgr-config.yml]
kind: SettingsFile
metadata:
  name: infra-mgr-config
spec:
  k8s-propagation: rule
```

`th2-infra-mgr` is monitoring your `th2-infra-schema` repository.
After creating the environment, `th2-infra-mgr` will create a `th2-<new_branch_name>` namespace and deploy all the needed components.

<notice info>

It will take 10-15 minutes to deploy and run all the components.

</notice>

A new schema is available in the `th2-infra-editor`. 

<spoiler title="Infra schema in Infra Editor">

![Infra Schema](/img/getting-started/th2-infra-schema/git-based/infra-schema.png)

</spoiler>

`th2-infra-operator` will create a new namespace `th2-<new_schema_name>` in Kubernetes cluster for the new schema.
It can require some time. There will be pods for this environment in Kubernetes cluster. You can go to the Kubernetes dashboard and see them.

<spoiler title="New Kubernetes namespace in Dashboard">

![New namespace](/img/getting-started/th2-infra-schema/git-based/new-namespace.png)

</spoiler>

### Prepare environment

In this environment there are several Java *External boxes*. The boxes of this type should be run on your machine from outside the cluster. 

<notice note>

You will need configured  `kubectl` to work with your cluster.

</notice>

#### Clone simulator boxes

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

#### Run simulator boxes

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

## Run 1.5.4 demo main scenario

### Clone the script

Clone the corresponding branch from the [demo script repository](https://github.com/th2-net/th2-demo-script): 

```shell
git clone -b ver-1.5.4-main_scenario --single-branch https://github.com/th2-net/th2-demo-script.git
```

### Import dependencies

<notice note>

`requirements.txt` contains standard packages to work with gRPC (e.g. google-api-core) and custom packages to work with the th2 boxes. Please note that gRPC client (script) and gRPC server (th2 box) should use the same package. You can find more information about the `requirements.txt` and package installation here: https://pip.pypa.io/en/stable/user_guide/#requirements-files

</notice>

Move to the script root folder and execute the following command:

```shell
python -m pip install -r requirements.txt
```

### Set up configs

Set up configurations from the directory configurations (`mq.json`, `rabbit.json`, `grpc.json`) in accordance with your components.

You can copy configurations for `mq.json` and `grpc.json` from `script-entry-point-app-config` config map in the environment namespace. 

<spoiler title="Script configuration in Kubernetes Dashboard">

![mq config](/img/getting-started/demo-script/db-mq.png)

</spoiler>

You can find values for `rabbit.json` in `rabbit-mq-external-app-config` config map.

<spoiler title="RabbitMQ client configuration in Kubernetes Dashboard">

![rabbit config](/img/getting-started/demo-script/db-rabbitmq.png)

</spoiler>

<notice note >

If this `rabbit.json` configuration doesn't work, try to change `username`
and `password` values as they are in `secrets.yaml`.

</notice >

### Run demo script

Finally, run the demo script.

```shell
python run.py
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

## Demo script flow

The script represents the set of messages sent to the system and the responses recived from the system.

In this example, **flow** is the path of one message sent by the _script_.

When sending the message, the script sends a gRPC request to the `act` component with the instructions on which message should go to which connector. `Act` transfers the message to the `conn` client component. Then, based on the used gRPC call, it starts looking for the message which will be the response from the system on the message we’ve sent.

The `conn` client component gets the th2 message from the `act`, forms the FIX message based on a dictionary, and then, sends it to the `conn` server on FIX protocol.

The `sim` gets this message from the `conn` server and creates a response on it, simulating remote system behavior.

The response returns on the `conn` server and then transfers to the `conn` client on FIX protocol. Then response goes to `codec`, where it is decoded into human-readable th2 format, which is also clear for the other components. From `codec` all the messages come to `act`, to `check1` (for verifying on requests from script), and to `recon` (for passive verification).

When checking, the script sends a gRPC request to `check1` with the instructions on message verification. These instructions contain expected result on each message we want to verify.

Also, the `recon` component performs passive verification while other environment components continue working.


![Demo script flow animation](https://github.com/th2-net/th2-documentation/raw/master/images/demo-ver154-main/script_flow.gif)

<spoiler title="Demo script flow UML sequence diagram">

![Demo script flow](/img/getting-started/analyze/Demo_script_flow-separated_conns.drawio.png)

</spoiler>

## th2 reports

There is a web application that can display reports about th2 work.

It can be reached with the URI _http://\<hostname\>:30000/\<schema-namespace\>/_

![th2 reports GUI](/img/getting-started/analyze/th2-reports.png)

## Demo script steps

The demo script runs case scenarios for 6 instruments.

![](/img/getting-started/analyze/6-runs.png)

Each case, except for the 6th, consists of 7 steps. 

![](/img/getting-started/analyze/7-steps-in-run.png)

The first case for INSTR1 will be explained here in details.

### Steps 1, 2

#### Scenario

In **step 1** the script sends request to create a passive buy order by user _DEMO-CONN1_.
The order has the following parameters:
- Size (_OrderQty_) = 30
- Price = 55 (_x_ | _x_ depends on the instrument)

At the end of **step 1** message "the order stands on book in status NEW" is expected.

In **step 2** the script sends instructions for checking a response to **check1**.

At the end of **step 2** message "the order stands on book in status NEW" is expected.

#### Generated events

The following image contains events within steps 1 and 2 from the th2 reports.

Moments of creating those events are demonstrated in the "Actual work" section.

![](/img/getting-started/analyze/steps-1-2-report.png)

You can check the messages' details. It can be very useful.  
For example, details of  _ExecutionReport_ from **step 1**.
Fields _Price_, _OrderQty_ (Size), _Text_ (Comment) can be found here.

![](/img/getting-started/analyze/step1-exec-report-details.png)

_Text_ contains information that this report is about placing order.

#### Actual work in **Step 1**

1. Trader "DEMO-CONN1" sends request to create a passive order.
2. Trader "DEMO-CONN1" receives Execution Report. The order stands on book in status NEW.

_"Received 'ExecutionReport' response message"_ is an expected output in **step 1**.


| Step 1.1 | Step 1.2 | 
|---|---|
| ![]( /img/getting-started/analyze/Demo_script_steps-step1-1.drawio.png) | ![]( /img/getting-started/analyze/Demo_script_steps-step1-2.drawio.png) |  

#### Actual work in **Step 2**

1. The script sends instructions for response check to _check1_.
2. **check1** analyses response and generates an event as the result.

Green _"Check messages"_ is an expected output in **step 2**.

![](/img/getting-started/analyze/Demo_script_steps-step2.drawio.png)

### Steps 3, 4

#### Scenario

In **step 3** the  script sends request to create a passive buy order by user _DEMO-CONN1_.
The order has the following parameters:
- Size (_OrderQty_) = 10
- Price = 56 (_x+1_ | _x_ depends on the instrument)

At the end of **step 3** message "the order stands on book in status NEW" is expected.

In **step 4** the script sends instructions for checking response to **check1**.

At the end of **step 4** message "the order stands on book in status NEW" is expected.

#### Generated events

The following image contains events within steps 3 and 4 from the th2 reports.

![](/img/getting-started/analyze/steps-3-4-report.png)

#### Actual work in **Step 3**

1. Trader "DEMO-CONN1" sends request to create a passive Order with price lower than the first order.
2. Trader "DEMO-CONN1" receives Execution Report. The order stands on book in status NEW.

_"Received 'ExecutionReport' response message"_ is an expected output in **step 3**.


| Step 3.1 | Step 3.2 | 
|---|---|
| ![]( /img/getting-started/analyze/Demo_script_steps-step1-1.drawio.png) | ![]( /img/getting-started/analyze/Demo_script_steps-step1-2.drawio.png) |  

#### Actual work in **Step 4**

1. The script sends instructions for response check to **check1**.
2. **check1** analyses response and generates an event as the result.

Green _"Check messages"_ is an expected output in **step 4**.

![](/img/getting-started/analyze/Demo_script_steps-step2.drawio.png)

### Steps 5, 6, 7

#### Scenario

In **step 5** the script sends a request to create an aggressive sell IOC order by user _DEMO-CONN2_.
Order has the following parameters:
- Size (_OrderQty_) = 100
- Price = 54 (_x-1_ | _x_ depends on the instrument)

At the end of **step 5** message about successful trades or cancelling the order is expected, as IOC cannot just be placed.

There are **2 buy orders** with overall size (30 + 10) not bigger than size of the **sell order** (100). Prices of these **buy orders** (55 and 56) are bigger than price of the **sell order** (54). So the trades are happening.

In **step 6** the script sends instructions for checking response messages for user _DEMO-CONN1_ to **check1**.
_DEMO-CONN1_ awaits messages about buying by 2 orders, so there should only be 2 messages.

At the end of **step 6** message of successfully checked **2** messages by sent instructions is expected.

In **step 7** script sends instructions for checking response messages for user _DEMO-CONN2_ to **check1**.
_DEMO-CONN2_ should receive 3 messages:
1. Trade with _DEMO-CONN1_ for Order with Size=30;
2. Trade with _DEMO-CONN1_ for Order with Size=10;
3. Cancelling not traded Size (100 - 30 - 10 = 60).

At the end of **step 7** message of successfully checked **3** messages by sent instructions is expected.

#### Generated events

The following image contains events within steps 5, 6 and 7 from the th2 reports.

![](/img/getting-started/analyze/steps-5-6-7-report.png)

#### Actual work in **Step 5**

1. Trader "DEMO-CONN2" sends a request to create an aggressive IOC Order.
2. Trader "DEMO-CONN1" receives Execution Reports with ExecType=F: first at Order2 and second on Order1.
3. Trader "DEMO-CONN2" receives Execution Reports: first trade with Order2, next with Order1 and then cancellation.

_"Received 'ExecutionReport' response message"_ is an expected output in **step 5**.

| Step 5.1 | Step 5.2/5.3 | 
|---|---|
| ![]( /img/getting-started/analyze/Demo_script_steps-step1-1.drawio.png) | ![]( /img/getting-started/analyze/Demo_script_steps-step1-2.drawio.png) |  

#### Actual work in **Step 6**

1. The script sends instructions for response for trader "DEMO-CONN1" check to **check1**.
2. **check1** analyses response and generates an event as the result.

Green _"Check messages"_ is an expected output in **step 6**.

![](/img/getting-started/analyze/Demo_script_steps-step2.drawio.png)

#### Actual work in **Step 7**

1. The script sends instructions for response for trader "DEMO-CONN2" check to **check1**.
2. **check1** analyses response and generates an event as the result.

Green _"Check messages"_ is an expected output in **step 7**.

![](/img/getting-started/analyze/Demo_script_steps-step7.drawio.png)

## Searching exceptions
th2 is a test tool. So it should be able to catch exceptions.

To do so, the _simulator box_ was programmed to create exceptions with the specific instruments from the script.

_INSTR1_, _INSTR2_, _INSTR3_ work normally. Exceptions from other instruments will be described below.

### Instr4

As described in the _Demo script steps_ section,
there should be 3 messages for the seller _DEMO-CONN2_ in **step 7** of the demo script.

![](/img/getting-started/analyze/instr4-step7-report.png)

In fact, there are 4 messages.
The simulator box has sent a redundant execution report message to call an exception.

This information is displayed in the check sequence event details.

![img.png](/img/getting-started/analyze/instr4-step7-check-details.png)

You may find a comment about exception in the details of one of the filtered messages.

![img.png](/img/getting-started/analyze/instr4-step7-extra-m-details.png)

### Instr5

The simulator box sends one message with incorrect values at **step 7** within this run.

![img.png](/img/getting-started/analyze/instr5-verification-events.png)

Please note that there is a discrepancy between some expected and actual values, which prompts the exception message in the th2 report.

### Instr6

In **step 1** within this run, the script sends the message with an unknown _security ID_, which leads to the
message being rejected.

Message structure:

![img_1.png](/img/getting-started/analyze/instr6-step1-message-details.png)

Exception details:

![img.png](/img/getting-started/analyze/instr6-exception-details.png)

## Compare results

<youtube id="mQa8c-OZZhU" ></youtube> 
