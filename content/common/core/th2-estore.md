---
title: th2-estore
weight: 10
repo_owner: th2-net
repo: th2-estore
skip_readme: true
related:
  - name: "th2-net/cradleapi"
    icon: "mdi-github"
    href: "https://github.com/th2-net/cradleapi"
---

**estore** is one of the core components in the th2 environment. 
It is responsible for storing events into <term term="Cradle">Cradle</term>. 
Sending events to **estore** from other components is possible via special methods from the <term term="th2-common">th2-common</term> library.

<!--more-->

## Functionality

### Events

Event is a fundamental unit of data stored and processed by th2. 
Test execution data as well as information related to the work of all th2 components are presented via events hierarchy. 
Every event in th2 consists of important parts:

- `id` - unique identifier (in UUID format) within the th2.
- `parentId` - optional link to a parent event.
- `description` - set of fields for short descriptions.
- `body` - useful data in JSON format.
- `attachedMessageIDs` - the list of message IDs that are linked to the event.

### How to send events to estore

You can create `Event` object in th2 component with `th2-common-py` library.

Put primary event data to variables. Maybe you will need it in the future.

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

## Configuration

**estore** has its own <term term="Custom resource">custom resource</term> definition called `Th2Estore`. 

<notice note>

Make sure to indicate `Th2Estore` when specifying `kind` of the <term term="Custom resource">custom resource</term> for `**estore**.

</notice>

Infra schema can contain only one **estore** box description. 
It consists of one required option - <term term="Docker Image">docker_image</term>. 
Configuration for <term term="pin">pins</term>  is specified in `Th2Estore` <term term="Custom resource">custom resource</term> definition. 
More details will be in “Automatic <term term="pin">pins</term>  configuration“ section.

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

### Automatic pins configuration

<term term="th2-infra-operator">th2-infra-operator</term> (component responsible for creating boxes) automatically adds special MQ <term term="pin">pin</term> for receiving events to **estore** by any other component.

At the same time, any box with <term term="Custom resource">CR</term> kind `Th2Box` will get special MQ <term term="pin">pin</term> for sending events to the **estore**. These <term term="pin">pins</term>  have attributes `event` and `publish`. 
