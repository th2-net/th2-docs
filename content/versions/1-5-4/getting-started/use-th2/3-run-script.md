---
title: Run demo script
chapter: true
weight: 15
continue_learning:
  - title:  Demo Script Analysis
    href: ../meet-th2/step-6
    icon: mdi-magnify
---
# Run demo script
As we have already prepared environment for the tests, we can run special script to check our system for vulnerabilities.

<!--more-->

## Clone the script

Clone corresponding branch from the [demo script repository](https://github.com/th2-net/th2-demo-script).  

```shell
git clone -b ver-1.5.4-main_scenario --single-branch https://github.com/th2-net/th2-demo-script.git
```

## Import the libraries described in requirements.txt

`requirements.txt` contains standard packages to work with gRPC (e.g. google-api-core) and custom packages to work
with the th2 boxes. Please note that gRPC client (script) and gRPC server (th2 box) should use the same package.
You can find more information about the `requirements.txt` and package installation
here: https://pip.pypa.io/en/stable/user_guide/#requirements-files

Move to the script root folder and execute the following command:

```shell
python -m pip install -r requirements.txt
```

## Set up configs

Set up configurations from the directory configurations (`mq.json`, `rabbit.json`, `grpc.json`) in accordance with your components.

You can copy configurations for `mq.json` and `grpc.json` from `script-entry-point-app-config` config map in the environment namespace. 

![mq config](/img/getting-started/demo-script/db-mq.png)


You can find values for `rabbit.json` in `rabbit-mq-external-app-config` config map.

![rabbit config](/img/getting-started/demo-script/db-rabbitmq.png)


<notice note >

If this `rabbit.json` configuration doesn't work, try to change `username`
and `password` values like in `secrets.yaml`.

</notice >

## Run demo script

Finally, run demo script.

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

You can read analysis on special page in the meet th2 section. 
