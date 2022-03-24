---
title: "Get and run demo script"
weight: 15
chapter: false
prev:
  title: Create th2 environment
  link: ./step-4
next:
  title: Demo script analysis
  link: ./step-6
---

<custom-stepper :steps="6" :step="5" > </custom-stepper>

With this instruction you will download some components and run them like they are inside cluster. 
It is useful feature for components development. One of these components make requests to the exchange simulator.
There are correct and incorrect requests. So you will be able to analyze this activity in the next step.

<!--more-->

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

## 1. Clone the script

Clone needed branch from the [demo script repository](https://github.com/th2-net/th2-demo-script).  
At the moment of creating guide, actual branch is `ver-1.5.4-main_scenario`

```shell
git clone -b <branch_name> --single-branch https://github.com/th2-net/th2-demo-script.git
```

## 2. Get Python environment 3.7+ (e.g. Conda)

<notice info >

Python already might be installed after step **1.3.1 Install required software**.

</notice >

To install Python follow [this instruction](https://wiki.python.org/moin/BeginnersGuide/Download).

Recommendation: get IDE to work with Python (e.g. PyCharm, Spyder). You can also start this script from the command line,
but IDE will make process more convenient.

## 3. Import the libraries described in requirements.txt

`requirements.txt` contains standart packages to work with gRPC (e.g. google-api-core) and custom packages to work
with th2 boxes. Please note that gRPC client (script) and gRPC server (th2 box) should use the same package.
You can find more information about requirements.txt and package installation
here: https://pip.pypa.io/en/stable/user_guide/#requirements-files

Locate to the script root folder:

```shell
python -m pip install -r requirements.txt
```

## 4. Set up configs

Set up configs from directory configs (mq.json, rabbit.json, grpc.json) according to your components.

<notice note >

Words inside `<value>` in JSON examples and in dashboard config maps are names of the values, that depend on your cluster.
You must find it by the following instructions.

</notice >

### mq.json

Fill mq.json in folder config with RabbitMQ
exchange and routing key from script-entry-point to estore.
You can find this queue in Kubernetes Dashboard in Config Maps tab -
script-entry-point-app-config.

![mq config](/img/getting-started/demo-script/db-mq.png)

```json[mq.json]
{
  "queues": {
    "event-store-pin": {
      "attributes": [
        "event",
        "publish"
      ],
      "exchange": "th2-exchange",
      "filters": [],
      "name": "key[th2-1-5-4:script-entry-point:estore-pin]",
      "queue": "not_necessary"
    }
  }
}
```

### grpc.json

Fill host and port fields in grpc.json

```json[grpc.json]

{
  "services": {
    "Act": {
      "service-class": "ActService",
      "endpoints": {
        "act": {
          "host": "<cluster-ip>",
          "port": "<act-port>"
        }
      },
      "strategy": {
        "name": "robin",
        "endpoints": ["act"]
      }
    },
    "Check1": {
      "service-class": "Check1Service",
      "endpoints": {
        "check1": {
          "host": "<cluster-ip>",
          "port": "<check1-port>"
        }
      },
      "strategy": {
        "name": "robin",
        "endpoints": ["check1"]
      }
    }
  }
}
```

You can find values for grpc.json in Kubernetes Dashboard in Config Maps tab -
script-entry-point-app-config (same as for [mq.json](#mqjson)).


<spoiler title="Alternative way to find values" >

Alternatively you can find `check1-port` and `act-port` by executing following command:

```shell
kubectl get service -n <th2-schema-namespace> 
```

Some ports are written in the following style: \<cluster-port\>:\<node-port\>/\<protocol\>.  
For configuration you will need `node-port` of appropriate service.

Output example:
```shell
NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                         AGE
act-fix                     NodePort    10.104.237.158   <none>        8080:31178/TCP,9752:32434/TCP   19d
act-ui                      NodePort    10.99.109.111    <none>        8080:31356/TCP,9752:30284/TCP   19d
act-ui-backend              NodePort    10.107.95.164    <none>        8080:31357/TCP,9752:31848/TCP   18d
check1                      NodePort    10.111.68.46     <none>        8080:31179/TCP,9752:31099/TCP   19d
........
```

</spoiler >

#### Example of `grpc.json`:

```json[grpc.json]
{
  "services": {
    "Act": {
      "service-class": "ActService",
      "endpoints": {
        "act": {
          "host": "10.44.16.110",
          "port": 31178
        }
      },
      "strategy": {
        "name": "robin",
        "endpoints": ["act"]
      }
    },
    "Check1": {
      "service-class": "Check1Service",
      "endpoints": {
        "check1": {
          "host": "10.44.16.110",
          "port": 31179
        }
      },
      "strategy": {
        "name": "robin",
        "endpoints": ["check1"]
      }
    }
  }
}
```

### rabbit.json

You can find values for rabbit.json by following path:
Kubernetes Dashboard / Config Maps / rabbit-mq-external-app-config

![rabbit config](/img/getting-started/demo-script/db-rabbitmq.png)

`rabbit.json` example:

```json[rabbit.json]
{
  "host": "10.44.16.110",
  "vHost": "th2-1-5-4",
  "port": "32000",
  "username": "th2-1-5-4",
  "password": "${RABBITMQ_PASS}",
  "exchangeName": "th2-exchange"
}
```

<notice note >

If this configuration doesn't work, try to change `username`
and `password` values like in `secrets.yaml`.

</notice >

## 5. Run demo script

Finally run demo script.

```shell
sudo python run.py
```

Output example:

```shell
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
