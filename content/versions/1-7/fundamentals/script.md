---
title: Script
weight: 25
---

In the computer programming, a *script* is a program, or a sequence of instructions, that is interpreted or carried out by another program, rather than by a computer processor. 
The scripts in the software testing should implement business logic necessary, for checking the level of the software quality. 
This logic can include both positive and negative testing to check that there are no discrepancies between the requirements and the actual system behavior.

In th2, the **script** means a sequence of instructions for the th2 components. 
It allows user to interact with the system under test (SUT) using the functionality of the th2 boxes.

To start using the script you need to set up a th2 cluster with all the necessary components running, as well as th2 script entry point within it. 
After configuration of the script, you can use created connections to interact with the th2 modules. 
Each module is made to implement a certain piece of logic. 
Execution of each and every action might be a complex and time consuming, however, using the methods inside the script makes the process easier. 

<notice info>

The user implements business logic (a particular test scenario) as a function being invoked during the script execution. 
The th2 modules decrease complexity of the script as far as particular actions (behaviors) are encapsulated in those modules.

</notice>

## Typical use case

One of the most common use cases for th2 is an active testing. 
In this case we use **script** to send messages to the system and verify its replies. 
th2 has a ready-made components - **act** and **check1**, that respectively send messages to the SUT and verify its responses. 
The **script** communicates with **act** and **check1** via gRPC, and sends events to **estore** via RabbitMQ. 
The **script** sends messages via **act**, provides verification rules to **check1**, and receives information about verification results. 
In the diagram below, you can see the system that is configured in above mentioned way. 

![](/img/fundamentals/script/script_pic1.png) 

<center> 
<figcaption class="mb-2">
Figure 1. Active testing with th2 and script
</figcaption>
</center>

<notice info>

Outside of the scope of this diagram, the messages sent to the system are encoded in the **codec** component and then sent through the **conn** component to the system. 
Correspondingly, replies from the system go through the **conn** component, are decoded in **codec** and finally arrive back to the scope of this diagram, to **check1** to be verified.

</notice>

## Configuration

**script** runs as an *External Box*. 
The external box is a box that interacts with the th2 cluster and, instead of Kubernetes, runs inside the user machine. 
It uses `entry-point` in the th2 cluster to communicate with other modules. 
`entry-point` has pins that allow user to create links (both MQ and gRPC) with other components.

### External box configuration for the script

<notice info>

There is a custom resource (CR) called “script entry point” in the schema. 
This CR should be configured to `externalBox: enabled: true` to run the script correctly.

</notice>

#### The entry-point and the script

Technically, an entry-point is inside the th2 cluster. 
The **script** is a program that runs "within" the entry point. 
In reality **script** just uses endpoints reserved for the entry point. 
To create the endpoints for the script, it is required to create a special configuration for the external box in **infra-schema**. 
An example for configuration of the external box is provided below:

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: script-entry-point
spec:
  image-name: dev-script
  image-version: dev-script
  type: th2-script
  pins:
    - name: to_act
      connection-type: grpc
    - name: to_check1
      connection-type: grpc
  extended-settings:
    externalBox:
      enabled: true
    service:
      enabled: false
```

Comments:

- `image-name` and `image-version` are not important as there will be no runtime in a Pod;

- script can not be a gRPC server;

- `extended-settings.externalBox.enabled` should be set to `true`.

### Connect the script to the other boxes

For interaction with other boxes a special `th2-common` library is used. 
It contains all the required connectors. 
But they should be configured before use. 
There are 2 options to configure the connectors:

1) Specifying settings manually 
In this case you should get settings from Kubernetes config maps, create configuration files in the project with the script and specify configs folder while creating `CommonFactory` instance.

2) Automatic settings
In this case you should have `kubectl` configured to work with your th2 cluster. 
You should specify Kubernetes namespace and external box name while calling `CommonFactory` constructor method. 
In the case of previously provided config, the box name will be `script-entry-point`.

#### Common factory class (for specifying settings manually)

This class contains a set of tools for creating connections between the th2 boxes and the **script**. 
Configuration of these files varies depending on the components that are to be used in the **script**.

Essentially it transfers .json configuration files shown below to the `CommonFactory` object.

 - grpc.json

- mq.json

- rabbit.json

<!--TODO: create a link to the page about API’s: th2 components API -->

<spoiler title="Passing .json files to CommonFactory">

Python example:

```python

from th2_common.schema.factory.common_factory import CommonFactory

factory = CommonFactory(
    grpc_router_config_filepath="./configs/grpc.json",
    rabbit_mq_config_filepath="./configs/rabbitMQ.json",
    mq_router_config_filepath="./configs/mq.json")
```

Java example:

```java
import com.exactpro.th2.common.schema.factory.CommonFactory;

CommonFactory factory = CommonFactory.createFromArguments("--configs", "./configs");
```

</spoiler>

<spoiler title="the .json files">

`grpc.json` file

```json
{
  "services": {
    "Act": {
      "service-class": "ActService",
      "endpoints": {
        "act": {
          "host": "<kubernetes cluster hostname>",
          "port": <external port of act pod>
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
          "host": "<kubernetes cluster hostname>",
          "port": <external port of check1 pod>
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

- Contains the host and ports of **act** and **check1**

- Service-class: `ActService` or `Check1Service`

- Ports: external port of act pod and check1 pod

- host: kubernetes cluster hostname (cluster IP)

- Where do we find this information?

  - Kubernetes dashboard -> services

  - CLI -> \`kubectl get services\`

`mq.json` file

```json
{
  "queues": {
    "event-store-pin": {
      "attributes": [
        "event",
        "publish"
      ],
      "exchange": "<queue exchange. demo_exchange by default>",
      "filters": [],
      "name": "<routing-key from script-entry-point to estore>",
      "queue": "not_necessary"
    }
  }
}
```

- Contains information about the `routing-key` from the `script-entry-point` to the **estore**

- Where do we find this information?

  - Kubernetes dashboard -> config maps -> script-entry-point-app-config

  - RabbitMQ estore-pin queue

`rabbit.json` file

```json
{
  "host": "<kubernetes cluster hostname>",
  "vHost": "<vHost from RabbitMQ. Equal to namespace name by default.>",
  "port": "<external port of RabbitMQ>",
  "username": "<RabbitMQ username>",
  "password": "<RabbitMQ password>",
  "exchangeName": "<queue exchange. demo_exchange by default>"
}
```

- Contains RabbitMQ credentials

- Data source:

  - Kubernetes dashboard -> config maps -> rabbit-mq-app-config

  - RabbitMQ credentials configured in secrets

```
rabbitmq:
# set admin user credentials, it will be created during deployment
  rabbitmqUsername: th2
  rabbitmqPassword: rab-pass
  # must be random string
  rabbitmqErlangCookie: cookie
```

</spoiler>

After transferring `.json` files, you need to create MQ routers and gRPC services. 
They are the connectors to the required modules.

<spoiler title="Example of creating gRPC routers">

```python
from th2_common.schema.factory.common_factory import CommonFactory
from th2_grpc_act_template.act_service import ActService
from th2_grpc_check1.check1_service import Check1Service

def connect(config_path, tries=3):
    try:
        logging.info('Trying to connect...')
        factory = CommonFactory(config_path=config_path)
        grpc_router = factory.grpc_router
        act = grpc_router.get_service(ActService)
        check = grpc_router.get_service(Check1Service)
        estore = factory.event_batch_router
        logging.info('Connection established.')
        return {'act': act,
                'check': check,
                'estore': estore,
                'factory': factory}
    except Exception as e:
        if tries > 0:
            logging.error('Unable to connect.')
            logging.error(str(e))
            logging.info('Retry in 3...')
            print(f'Unable to connect: \n {str(e)}')
            time.sleep(3)
            connect(config_path, tries-1)
        else:
            raise
```

</spoiler>

<notice info>

Appropriate packages for ready-to-use th2 modules are available as public packages for Java and Python.

</notice>

<notice info>

If you are using certain configuration for the script frequently, it can be convenient to create a library with prepared configurations.

</notice>

## Details of implementation

Here you will find an example of implementation steps of the **script**. 
You can also use other classes with the similar functionality created by you or by the 3rd parties.

### Create an event object

This action helps to recognize what will happen when the script runs. 
For creating `event` object we import `Event`, `EventBatch`, `EventID` and `EventStatus` classes from `th2_grpc_common` and the `Timestamp` class from the `google.protobuf.timestamp_pb2` libraries.

![](/img/fundamentals/script/script_pic2.png) 

<spoiler title="Code examples">

Python example:

```python
import uuid
from google.protobuf.timestamp_pb2 import Timestamp
from th2_grpc_common.common_pb2 import Event, EventBatch, EventID

# Create EventID for future use in requests.
event_id = EventID(id=str(uuid.uuid1()))

# Create root Event for report.
current_timestamp = Timestamp()
current_timestamp.GetCurrentTime()
event = Event(
    id=event_id,
    name="Raw send example",
    status='SUCCESS',
    start_timestamp=current_timestamp)

# Add this Event to EventBatch.
event_batch = EventBatch()
event_batch.events.append(event)

# Send EventBatch to estore.
estore.send(event_batch)
```

Java example:

```java
import java.util.UUID;
import com.google.protobuf.util.Timestamps;
import com.exactpro.th2.common.grpc.Event;
import com.exactpro.th2.common.grpc.EventBatch;
import com.exactpro.th2.common.grpc.EventID;
import com.exactpro.th2.common.grpc.EventStatus;

// Create EventID for future use in requests.
EventID eventId = EventID.newBuilder().setId(UUID.randomUUID().toString()).build();
// Create root Event for report.
Event event = Event.newBuilder()
    .setId(eventId)
    .setName("Raw send example")
    .setStatus(EventStatus.SUCCESS)
    .setStartTimestamp(Timestamps.fromMillis(System.currentTimeMillis()))
    .build()
// Add this Event to EventBatch.
EventBatch eventBatch = EventBatch.newBuilder()
  .addEvents(event)
  .build();
// Send EventBatch to estore.
estore.send(eventBatch);
```

</spoiler>

### A message request to **act**

This action leads to sending message to the system by **act** component. 
To make it happen you need to create a message using `Message`, `Value`, `MessageID`, `MessageMetadata`, `ConnectionID` and `ListValue` classes from `the th2_grpc_common` library and `datetime` class from the `datetime` library. 
Then, you need to place the message to **act** using `PlaceMessageRequest` class from the `th2_grpc_act_template` library and `ConnectionID` from the `th2_grpc_common` library.

![](/img/fundamentals/script/script_pic3.png) 

<spoiler title="Code examples">

Python example:

```python
import random
import string
from datetime import datetime
from th2_grpc_common.common_pb2 import Message, Value, MessageID, MessageMetadata, ConnectionID, ListValue

clordid = "".join(random.choice(string.digits) for _ in range(7))
message = Message(
    metadata=MessageMetadata(
        message_type="NewOrderSingle",
        id=MessageID(connection_id=ConnectionID(session_alias="demo-conn1"))),
    fields={
        "Side": Value(simple_value="1"),
        "SecurityID": Value(simple_value="INSTR1"),
        "SecurityIDSource": Value(simple_value="8"),
        "OrdType": Value(simple_value="2"),
        "AccountType": Value(simple_value="1"),
        "OrderCapacity": Value(simple_value="A"),
        "OrderQty": Value(simple_value="100"),
        "Price": Value(simple_value="10"),
        "ClOrdID": Value(simple_value=clordid),
        "SecondaryClOrdID": Value(simple_value="".join(random.choice(string.ascii_letters) for _ in range(7))),
        "TransactTime": Value(simple_value=datetime.now().isoformat()),
        "TradingParty": Value(message_value=Message(
            fields={
                'NoPartyIDs': Value(list_value=ListValue(
                    values=[
                        Value(message_value=Message(
                            metadata=MessageMetadata(message_type='TradingParty_NoPartyIDs'),
                            fields={
                                'PartyID': Value(simple_value='Trader1'),
                                'PartyIDSource': Value(simple_value="D"),
                                'PartyRole': Value(simple_value="76")
                            })),
                        Value(message_value=Message(
                            metadata=MessageMetadata(message_type='TradingParty_NoPartyIDs'),
                            fields={
                                'PartyID': Value(simple_value='0'),
                                'PartyIDSource': Value(simple_value="P"),
                                'PartyRole': Value(simple_value="3")
                            }))
                    ]))}))
    }
)
```

Java example:

```java
import java.time.LocalDateTime;
import com.exactpro.th2.common.grpc.ConnectionID;
import com.exactpro.th2.common.grpc.ListValue;
import com.exactpro.th2.common.grpc.Message;
import com.exactpro.th2.common.grpc.MessageID;
import com.exactpro.th2.common.grpc.MessageMetadata;
import com.exactpro.th2.common.grpc.Value;


String clordid = String.valueOf((int)(Math.random() * (int)StrictMath.pow(10, 7)) + (int)StrictMath.pow(10, 7));
  Message message = Message.newBuilder()
  .setMetadata(MessageMetadata.newBuilder()
  .setMessageType("NewOrderSingle")
  .setId(MessageID.newBuilder()
  .setConnectionId(ConnectionID.newBuilder()
  .setSessionAlias("demo-conn1")
  .build()).build())
  .build())
  .putFields("Side", Value.newBuilder().setSimpleValue("1").build())
  .putFields("SecurityID", Value.newBuilder().setSimpleValue("INSTR1").build())
  .putFields("SecurityIDSource", Value.newBuilder().setSimpleValue("8").build())
  .putFields("OrdType", Value.newBuilder().setSimpleValue("2").build())
  .putFields("AccountType", Value.newBuilder().setSimpleValue("1").build())
  .putFields("OrderCapacity", Value.newBuilder().setSimpleValue("A").build())
  .putFields("OrderQty", Value.newBuilder().setSimpleValue("100").build())
  .putFields("Price", Value.newBuilder().setSimpleValue("10").build())
  .putFields("ClOrdID", Value.newBuilder().setSimpleValue(clordid).build())
  .putFields("SecondaryClOrdID", Value.newBuilder().setSimpleValue("your random string method").build())
  .putFields("TransactTime", Value.newBuilder().setSimpleValue(LocalDateTime.now().toString()).build())
  .putFields("TradingParty", Value.newBuilder()
  .setMessageValue(Message.newBuilder()
  .putFields("NoPartyIDs", Value.newBuilder()
  .setListValue(ListValue.newBuilder()
  .addValues(Value.newBuilder()
  .setMessageValue(Message.newBuilder()
  .setMetadata(MessageMetadata.newBuilder()
  .setMessageType("TradingParty_NoPartyIDs")
  .build())
  .putFields("PartyID", Value.newBuilder().setSimpleValue("Trader1").build())
  .putFields("PartyIDSource", Value.newBuilder().setSimpleValue("D").build())
  .putFields("PartyRole", Value.newBuilder().setSimpleValue("76").build())
  .build())
  .build())
  .addValues(Value.newBuilder()
  .setMessageValue(Message.newBuilder()
  .setMetadata(MessageMetadata.newBuilder()
  .setMessageType("TradingParty_NoPartyIDs")
  .build())
  .putFields("PartyID", Value.newBuilder().setSimpleValue("0").build())
  .putFields("PartyIDSource", Value.newBuilder().setSimpleValue("P").build())
  .putFields("PartyRole", Value.newBuilder().setSimpleValue("3").build())
  .build())
  .build())
  .build())
  .build())
  .build())
  .build())
  .build();
```

</spoiler>

### A verification request to **check1**

This action helps to verify whether the response from the actual system equals to the expected response. 
For this we need to filter the messages and then apply verification rule. 
For filtering we use `MessageFilter`, `FilterOperation` and `ValueFilter` classes from the `th2_grpc_common` library, for sending `check rule request` we use the `th2_grpc_check1` library.

![](/img/fundamentals/script/script_pic4.png) 

<spoiler title="Message filter code examples">

Python example:

```python
from th2_grpc_common.common_pb2 import MessageFilter, FilterOperation, ValueFilter

message_filter = MessageFilter(
    messageType="ExecutionReport",
    fields={'ClOrdID': ValueFilter(simple_filter=clordid, key=True),
            'Side': ValueFilter(simple_filter='1'),
            'Price': ValueFilter(operation=FilterOperation.NOT_EMPTY),
            'LeavesQty': ValueFilter(simple_filter='0', operation=FilterOperation.NOT_EQUAL),
            'OrderID': ValueFilter(simple_filter=response.response_message.fields['OrderID'].simple_value)})
```

Java example:

```java
import com.exactpro.th2.common.grpc.FilterOperation;
import com.exactpro.th2.common.grpc.MessageFilter;
import com.exactpro.th2.common.grpc.ValueFilter;

MessageFilter messageFilter = MessageFilter.newBuilder()
  .setMessageType("ExecutionReport")
  .putFields("ClOrdID", ValueFilter.newBuilder().setSimpleFilter(clordid).setKey(Boolean.TRUE).build())
  .putFields("Side", ValueFilter.newBuilder().setSimpleFilter("1").build())
  .putFields("Price", ValueFilter.newBuilder().setOperation(FilterOperation.NOT_EMPTY).build())
  .putFields("LeavesQty", ValueFilter.newBuilder().setSimpleFilter("0").setOperation(FilterOperation.NOT_EQUAL).build())
  .putFields("OrderID", ValueFilter.newBuilder().setSimpleFilter(response.getResponseMessage().getFieldsMap().get("OrderID").getSimpleValue()).build())
  .build();
```

</spoiler>

<spoiler title="Check rule request code examples">

Python example:

```python
from th2_grpc_check1.check1_pb2 import CheckRuleRequest

check1_request = CheckRuleRequest(
    connectivity_id=ConnectionID(session_alias="demo-conn1"),
    filter=message_filter,
    checkpoint=response.checkpoint_id,
    timeout=3000,
    parent_event_id=event_id,
    description="User receives the ExecutionReport message."
)
check1_response = check.submitCheckRule(check1_request)
```

Java example:

```java
import com.exactpro.th2.check1.grpc.CheckRuleRequest;
import com.exactpro.th2.check1.grpc.CheckRuleResponse;
import com.exactpro.th2.common.grpc.ConnectionID;

CheckRuleRequest check1Request = CheckRuleRequest.newBuilder()
  .setConnectivityId(ConnectionID.newBuilder()
  .setSessionAlias("demo-conn1").build())
  .setFilter(messageFilter)
  .setCheckpoint(response.getCheckpointId())
  .setTimeout(3000)
  .setParentEventId(eventId)
  .setDescription("User receives the ExecutionReport message.")
  .build();

  CheckRuleResponse check1Response = check1.submitCheckRule(check1Request);
```

</spoiler>

<!--TODO: create a link to "Writing your own script" -->
