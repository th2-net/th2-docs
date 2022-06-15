---
title: th2-estore
repo_owner: th2-net
repo: th2-estore
skip_readme: true
related:
  - name: "th2-net/th2-check2-recon"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-check2-recon"
  - name: "th2-net/th2-grpc-check2-recon"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-grpc-check2-recon"
---

`th2-estore` is one of the core components in the th2 environment. It is responsible for storing events into Cradle. Sending events to `th2-estore` from other components is possible via special methods from the `th2-common` library.

<!--more-->

<notice note >

Cradle is a datalake where the th2 stores messages and events. It is based on Cassandra database and creates th2-specific data processing.

</notice>

## Events

Event is a base entity of the th2. Information, related to the work of every component, the executed tests, and the problems that happened are presented as an events hierarchy. Every event consists of important parts:

- `id` - unique identifier (in UUID format) within the th2;
- `parentId` - optional link to a parent event;
- `description` - set of fields for short descriptions;
- `body` - useful data in JSON format;
- `attachedMessageIDs` - the list of message IDs that are linked to the event.

## How to send events to estore

You can create `Event` object in th2 component with `th2-common-py` library.

Put primary event data to variables. May be you will need it in the future.

```py
root_event_id = EventID(id=str(uuid1()))

start_timestamp = Timestamp()
start_timestamp.FromDatetime(datetime.now())
```

Create `Event` object.

```py
root_event = Event(
   id=root_event_id,
   parent_id=None,
   start_timestamp=start_timestamp,
   # end_timestamp="",
   status=EventStatus.SUCCESS,
   name="Test Event",
   body=b""
)
```

Create `EventBatch` object and send it using event router.

```py
event_batch = EventBatch(parent_event_id=None, events=[root_event])
estore.send(event_batch)
```

## Schema config file

`th2-estore` has its own custom resource definition called `Th2Estore`. 

<notice note>

Make sure to indicate `Th2Estore` when specifying `kind` of the custom resource for `th2-estore`.

</notice>

Infra schema can only contain one estore box description. It consists of one required option - docker image. Configuration for pins is specified in `Th2Estore` custom resource definition. More details will be in “Automatic pins configuration“ section.

General view of the component will look like this: 

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Estore
metadata:
  name: estore
spec:
  image-name: ghcr.io/th2-net/th2-estore
  image-version: <image version>
  extended-settings:
    service:
      enabled: false
    envVariables:
      JAVA_TOOL_OPTIONS: "-XX:+ExitOnOutOfMemoryError -Ddatastax-java-driver.advanced.connection.init-query-timeout=\"5000 milliseconds\""
    resources:
      limits:
        memory: 500Mi
        cpu: 200m
      requests:
        memory: 100Mi
        cpu: 20m
```

## Automatic pins configuration

`th2-infra-operator` (component responsible for creating boxes) automatically adds special MQ pin for receiving events to `th2-estore` by any other component.

At the same time, any box with CR kind `Th2Box` will get special MQ pin for sending events to `th2-estore`. These pins have attributes `event` and `publish`. 
