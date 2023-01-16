---
weight: 10
---

# th2-common

`th2-common` is a library used for enabling transfer of data in th2 and is required when setting up communications for a module.

The library is currently available in 3 languages: Java, Kotlin and Python. 
Links to the open source repositories:

1. Java & Kotlin - [GitHub - th2-net/th2-common-j](https://github.com/th2-net/th2-common-j)
2. Python - [GitHub - th2-net/th2-common-py](https://github.com/th2-net/th2-common-py)

To be exact, these are some of the things the common library is used for:

1. set up RabbitMQ consumer and producer 
2. set up gRPC client and server
3. set up prometheus client

   - collect metrics on loads to and from RabbitMQ,
   - collect metrics about gRPC loads
   - collect message metrics
   - collect event metrics
   - send metrics to Prometheus

Some of the above activities are not automated and requires initial setting up by the user.

## CommonFactory class

`CommonFactory` is a class, that allows user to execute activities, related to communication between component developed and other th2 components.

Users should create instance of `CommonFactory`  in order to integrate a component into the th2 cluster. 
`CommonFactory` contains functions that will access configuration files to obtain the required settings which allows the module to make the connections with solutions such as RabbitMQ, gRPC or Prometheus.

There are two methods for accessing the configuration files.

1. User creates the configuration files and then provides the path to these files
2. Access config maps from the Kubernetes cluster

The configuration files (list below) required by a module to read:

1. A **RabbitMQ** config from the `rabbitMQ.json` file
2. A **message's router configuration** from the `mq.json` file
3. A **gRPC router configuration** from the `grpc_router.json` file
4. A **gRPC configuration** from the `grpc.json` file
5. A **Cradle configuration** from the `cradle.json` file

<notice warning>

These filenames can be customized, but it is recommended that file names remains unchanged. 
`CommonFactory` variant on Java has them hardcoded.
If files names were to be changed you should change them in the imported `CommonFactory` library for Java as well.

</notice>

## Setting up an instance of Common Factory

To gain access to the required configuration files, a user may choose to set up the instance named factory, of class `CommonFactory`, in the following ways. 
Several examples are provided below.

### Option 1: User creates the configuration files and then provides the path to these files

Create instance of `CommonFactory` and provide access to the config files. 
This should be specified during the start of the application.

1. Create an instance with configs files in the default path (`/var/th2/config/*`)

```java

var factory = new CommonFactory();

```

2. Provide custom paths as shown below

The `.json` config files should created and be placed in directories in the path.

``` 

var factory = new CommonFactory(rabbitMQ, routerMQ, routerGRPC, cradle, custom, prometheus, dictionariesDir);

```

3. Create instance with configs from command line arguments.  
The arguments from Group1 (see below) will access the user made config files. 
`args` is a string array of command line arguments.
`.createFromArguments` returns a

```java

var factory = CommonFactory.createFromArguments(args);

```

### Option 2: Access config files from the Kubernetes cluster

Either use the `.createFromArguments()` method with arguments from group 2 or the `.createFromKubernetes()` method to access configuration files in the config maps of Kubernetes cluster
```java

var factory = CommonFactory.createFromKubernetes(namespace, boxName, contextName, dictionaries);


```

Two objects will be created:

- `generated_configs` directory - this directory stores `.json` configuration files from Kubernetes;
    - These files are overridden when `CommonFactory.createFromKubernetes(namespace, boxName)` and `CommonFactory.createFromKubernetes(namespace, boxName, contextName)` are invoked again.
- `factory` - the tool object that contains interfaces which are used to set up connections with th2 services.

There are requirements that must be met when creating the object `factory` using Kubernetes:

1. It is necessary to have Kubernetes configuration written in `~/.kube/config`. See more on kubectl configuration [here](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/).
2. User needs to have authentication with service account token that has the necessary access to read custom resources (CRs) and secrets from the specified namespace.
   - Common Factory will look for RabbitMQ and Cassandra secret name and password key.

<notice note>

A custom resource (or CR) is an extension of the Kubernetes API, that represents a customization of a particular Kubernetes installation.

A secret is an object that contains a small amount of sensitive data such as a password, a token, or a key. 
Secrets are similar to config maps but are specifically intended to hold confidential data.

</notice>

## Run component

In first attempts of running your component, you probably will run it as [external box](../../cookbook/run-box-outside-cluster/). 
Depending on the method used to create the component, you can run it in different ways.

### Option 1: Run without arguments

The main commands to run the box are slightly different for different programming languages:

- Java: `gradle run`
- Python: `python run.py`

### Option 2: Run with arguments

If you have not specified configs for `th2-common` to connect to the th2, you should specify them along with arguments in terminal. 
You can use one of the groups of arguments provided below.

<notice note>

Arguments from different groups cannot be used together.

</notice>

Local files configuration arguments:

- `--rabbitConfiguration` – a path to the `.json` file with RabbitMQ configuration
- `--messageRouterConfiguration` – a path to the `.json` file with configuration for MessageRouter
- `--grpcRouterConfiguration` – a path to the `.json` file with configuration for gRPCRouter
- `--cradleConfiguration` – a path to the `.json` file with configuration for Cradle
- `--customConfiguration` – a path to the `.json` file with a custom configuration
- `--dictionariesDir` – a path to the directory with encoded dictionary files
- `--prometheusConfiguration` – a path to the `.json` file with a configuration for Prometheus metrics server
- `--boxConfiguration` – a path to the `.json` file with external box
- `-c/` and `--configs` – a folder with `.json` files for schema configurations with following names:

1) rabbitMq.json – a configuration file for RabbitMQ

2) mq.json – a configuration file for MessageRouter

3) grpc.json – a configuration file for gRPCRouter

4) cradle.json – a configuration file for the Cradle API

5) custom.json – custom configuration

Kubernetes-based configuration arguments:

<notice note>

when using these arguments, prior installation and configuration of kubectl is required

</notice>

- `--namespace` – the namespace in Kubernetes to search for config maps

- `--boxName` – the name of the target th2 box placed in the specified Kubernetes namespace

- `--contextName` – the context name to search connection parameters in kubeconfig

- `--dictionaries` – the mapping between a dictionary in infra-schema and a dictionary type specified in the following format: `--dictionaries <dictionary name>=<dictionary type> [<dictionary name>=<dictionary type>]`.
  This argument is provided  when dictionaries are required to start a specific box.



A CLI command example:

```java

gradle run --args='--namespace myNamespace --boxName myExternalBox --contextName myContext'

```

With these parameters, your component will connect to the destination Kubernetes cluster and namespace, and find the right entry point (that is external box itself) to act from.

Also, there are special ConfigMaps in the *schema* namespace with the parameters for connecting to the th2 infrastructure. 
`th2-common` will save it automatically in the repository of the box you are running.

## th2-common integrations configuration

th2 as a framework based on open-source technologies, made by other developers.
They allows data storage, interchange and displaying.

### RabbitMQ

RabbitMQ is a powerful engine for message queues. 
It allows you to be confident that some component of the system will receive a message in any case.

After RabbitMQ is installed in your th2 cluster, this service is accessible within Kubernetes private network and for external systems. 
Configuration for connecting to the RabbitMQ service can be applied automatically or set manually. 
It depends on how you created the instance of `CommonFactory`.

After you created `factory` object, you can get routers for receiving and sending messages.

<notice note>

Code examples here are given in Java. 
And it can be different for other programming languages.

</notice>

```java

var messageRouter = factory.getMessageRouterParsedBatch();
var rawRouter = factory.getMessageRouterRawBatch();
var eventRouter = factory.getEventBatchRouter();

```

This example creates 3 different routers for 3 batches:

- `messageRouter` is working with `MessageBatch`;
- `rawRouter` is working with `RawMessageBatch`;
- `eventRouter` is working with `EventBatch`.

These batches differ from each other by content type.

With the router created, you can subscribe to pins (by specifying the callback function) or to send data that the router works with:

```java

router.subscribe(callback, attrs...);  // subscribe to only one pin
router.subscribeAll(callback, attrs...);  // subscribe to one or several pins
router.send(message, attrs...);  // send to only one pin
router.sendAll(message, attrs...);  // send to one or several pins

```

`attrs...` is non-mandatory list of pin attributes to filter pins for action. 
If these attributes are not specified pins will be filtered by default attributes. 
Default attributes depend on the router and action types:

- `message_parsed_batch_router`
  - Subscribe: `subscribe`, `parsed`
  - Send: `publish`, `parsed`
- `message_raw_batch_router`
  - Subscribe: `subscribe`, `raw`
  - Send: `publish`, `raw`
- `event_batch_router`
  - Subscribe: `subscribe`, `event`
  - Send: `publish`, `event`

If you want to use default pins for router, specify `callback` or `message` only as first parameter:

```java

router.subscribe(callback);
router.subscribeAll(callback);
router.send(message);
router.sendAll(message);

```

If you want to provide some custom attributes, you will need to list them as strings after the first parameter:

```java

router.subscribe(callback, "subscribe", "parsed");
router.subscribeAll(callback, "subscribe", "event");
router.send(message, "publish", "raw");
router.sendAll(message, "publish", "raw");

```

Please be careful that all messages are filtered on the level of `th2-common`. 
So Kubernetes do not affect on the message delivery. 
And RabbitMQ only provides channels for messages.

There is a list of predefined Pin’s attributes for th2 framework. 
And it will be better for you, if you follow architecture recommendations by the th2 team.

Let you know, that this Pin’s attributes system is very flexible and you can define any attributes you want. 
But keep in mind, that these attributes must be specified in `subscribe()` and `send()` methods calls.

For example, you can see how two th2 modules send messages to each other. 
Keep in mind, that every Pin is connected to only 1 Pin in another module.

![RabbitMQ workflow](./rabbitmq_workflow.png)

Sent message has the following lifecycle:

1. `th2-module-1` calls a method for sending message;
2. `th2-common` in `th2-module-1` choose Pins to send message with. 
Pins are filtered by attributes given in `send` method call;
3. message is sent with RabbitMQ client in `th2-common` in `th2-module-1`;
4. message on RabbitMQ server is redirected to right endpoint (Pin on the `th2-module-2`)
5. message is received by RabbitMQ client in `th2-common` in `th2-module-2`;
6. message is filtered by its content with Pin’s filters;
7. `th2-common` choose callback to trigger by attributes of Pin-receiver provided in the method call for subscription.

## gRPC

gRPC is a high performance protocol for messaging between apps. 
And you can use it for integration of your th2 module to the system.

To use gRPC protocol it is needed to create gRPC client (for sending messages) and gRPC server (to receive messages) in your app. 
Basically, `th2-common` will do it for you.

If you use gRPC it is required to define an endpoint in extended settings for it in the `Th2Box` configuration:

```yaml

extended-settings:
  service:
    enabled: true
    type: NodePort
    endpoints:
      - name: grpc
        targetPort: 8080
        nodePort: 31179

```

Endpoint parameters:

- `name` must be `grpc`
- `targetPort` - port on the Pod which gRPC server and client are listening
- `nodePort` - port on the global th2 service (provided by NGINX Ingress Controller). 
Requests to this port are redirected to the Pod’s `targetPort`

<notice note>

Code examples here are given in Python . And it can be different for other programming languages.

</notice>

First of all we need to get `grpc_router` from `CommonFactory` instance, like with routers for RabbitMQ.

```python

grpc_router = factory.grpc_router

```

#### Creating client

gRPC client sends requests to other modules. gRPC is a typed protocol. 
It means that you are not allowed to send any message you want. 
The message must have specific structure described in `.proto` files (e.g. https://github.com/th2-net/th2-grpc-common/blob/master/src/main/proto/th2_grpc_common/common.proto ) and then transferred to the native programming language classes.

Most of th2 modules which uses gRPC have additional `th2-grpc-...` repository with described messages structure and prepared to generate Python or Java classes.

Generate special gRPC services class for component, you want to integrate with your module. And then provide it in your module.

```python

service = router.get_service(Service)

```

And that’s all, now you can send messages to another component with gRPC. 
Just call needed method in service by name.

```python

service.needed_method_name(request, timeout)

```

Where parameters are:

- `request` is the data that we send 
- `timeout` is the timeout for the request

#### Creating server

First of all we need to define gRPC messages structure via `.proto` files and transform it to the native class, like as described for gRPC client. 
For the new module we can use https://github.com/th2-net/th2-grpc-common  as the template and change it for our needs.

<notice note>

If you implement some existing module, you can use appropriate `th2-grpc-...` repository.

</notice>

After that generate service class and import it to the module. 
Use this class (`LibraryServicer` in example) to create your custom one (`GrpcHandler` in example) with overrided methods:

```python

class GrpcHandler(LibraryServicer):

    def method_1(self, request, context):
        ...

    ...

    def method_n(self, request, context):
        ...

```

Create gRPC server with `router`:

```python

server = router.server

```

Create an instance of your custom gRPC handler and add services from it the local gRPC server with `add_LibraryServices_to_server()` method.

```python

from th2_grpc_library import library_pb2_grpc

library_pb2_grpc.add_LibraryServices_to_server(GrpcHandler(), server)

```

And when you want to receive requests, start the server:

```python

server.start()

```

### Prometheus

[Prometheus](https://github.com/prometheus) is an open-source systems monitoring and alerting toolkit. 
th2 use it to gather metrics from all the components for Grafana.

`th2-common` automatically sends metrics based on:

- load on the system, created by your component;
- load on your custom message queues;
- load on message queues for th2 messages;
- load on events message queues.

It can be performed by the following utility methods in `CommonMetrics` class

- `setLiveness` - sets "liveness" metric of a service (exported as `th2_liveness` gauge)
- `setReadiness` - sets "readiness" metric of a service (exported as `th2_readiness` gauge)
- in order for the metrics to be exported, you will also need to create an instance of `CommonFactory`
- common JVM metrics will also be exported alongside common service metrics
- some metric labels are enumerations (`th2_type`: `MESSAGE_GROUP`, `EVENT`, `<customTag>;message_type`: `RAW_MESSAGE`, `MESSAGE`)

Prometheus collects metrics for Grafana. 
The following metrics are collected by `th2-common`.

ABSTRACT (RabbitMQ) METRICS:

Measures the amount of the data **transferred via RabbitMQ**. 
The data includes th2 batch messages, event or custom content.

1. the total size of data published to RabbitMQ in bytes
2. the total size of data subscribed from RabbitMQ in bytes
3. The total number of data published to RabbitMQ (unit ???)
4. The time for data processing during subscription from RabbitMQ in seconds

gRPC METRICS:

1. total number calling a particular gRPC method
2. number of bytes sent to a particular gRPC call - request
3. number of bytes sent to a particular gRPC call - response

MESSAGES METRICS:

1. total quantity of all published messages (raw or parsed)
2. total quantity of all subscribed messages (raw or parsed)
3. total quantity of published messages dropped after filtering ( raw or parsed)
4. total quantity of subscribed messages dropped after filtering ( raw or parsed)
5. total quantity of published message groups
6. total quantity of subscribed message groups
7. total quantity of dropped published message groups after filtering
8. total quantity of dropped subscribed message groups after filtering
9. last published sequence
10. last subscribed sequence

EVENT METRICS:

1. total quantity of published events
2. total quantity of received events