---
title: Checkpoints
inner-title: check1 - introduction to checkpoints and chain IDs
weight : 10
related:
- name: "th2-net/th2-check1"
  icon: "mdi-github"
  href: "https://github.com/th2-net/th2-check1"
---

## Overview

You can submit all 3 requests to **check1** with a `checkpoint` or `chain_id` and **check1** will return a new `chain_id` value with the response.

## What are Checkpoints

In order for **check1** to begin verification you must provide a starting point in the message queue. 
This starting point is called a checkpoint.

Checkpoint data contains the message sequence number in session and the message creation timestamp,
returned as a universally unique identifier (UUID) to the **act** component.

![](/img/boxes/exactpro/check1/checkpoint_class.png "Figure1.Checkpoint Class")
<center> 
<figcaption class="mb-2">
Figure 1. Associations with Checkpoint class.
</figcaption> 
</center>


After receiving a `CheckpointRequest` from the **act** methods or directly from the script,
**check1** will locate the last message in all queues, note the sequence number and timestamps 
and send it to the **act** component via `CheckPointResponse` .

![](/img/boxes/exactpro/check1/checkpoint_path.png "Figure 2.Checkpoint path")
<center> 
<figcaption class="mb-2">
Figure 2. A checkpoint is not stored 
</figcaption>
</center>

The script receives the checkpoint from **act** and sends it to the **check1**. 
**check1** starts verification from the location and time when the checkpoint was created.

![](/img/boxes/exactpro/check1/message_queue_checkpoint.png "Figure 3.message_queue_checkpoint")
<center> 
<figcaption class="mb-2">
Figure 3. A queue of messages from the same session alias arranged according to the time received and and direction= FIRST 
</figcaption> 
</center>

## Chain ID

A chain id is similar to a checkpoint and is created by **check1**. 
The `chain_id` caret acts as a pointer and marks the last verified message in a message queue.

Chain IDs are usually used to continue verification.

![](/img/boxes/exactpro/check1/chainid_class.png "Figure 4.chainid_class")

<center> 
<figcaption class="mb-2">
Figure 4. The structure of ChainID class.
</figcaption>
</center>


When the `chain_id` parameter in a rule request is `Null`, **check1** generates a `chain_id` caret that points to the verified message. 
After verification is completed, this `chain_id` caret stops at the last verified message of the message queue. 
**check1** returns the `chain_id` value in the response and this value is sent back with the next rule request to continue verification. 
**check1** temporarily stores the `chain_id` value. The storage time allocated is set by the **check1** custom configuration `cleanup-older-than` and `cleanup-time-unit`.

Joining several rule requests to continuously check the whole message queue is known as chain verification.


![](/img/boxes/exactpro/check1/chainid_flowchart.png "Figure 4.chainid_flowchart")
<center> 
<figcaption class="mb-2">

Figure 5. Flowchart illustrating `chain_id`

</figcaption>
</center>



## Differences between a checkpoint and chain_id

- A checkpoint marks the last message of a message queue but a chain_id marks the last verified message.

- A checkpoint is used to begin verification but chain_id's are used to continue verification.

- Checkpoints are not stored in check1 but chain_id's are temporarily stored in check1

- If the value of the chain_id is provided in a rule request, the checkpoint is ignored.
