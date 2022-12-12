---
weight: 0
---

# Overview

**estore** is one of the core components in the th2 environment. 
It is responsible for storing events into <term term="Cradle">Cradle</term>. 
Sending events to **estore** from other components is possible via special methods from the <term term="th2-common">th2-common</term> library.

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
