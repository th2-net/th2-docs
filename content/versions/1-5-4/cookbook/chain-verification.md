---
title: Chain Verification
weight: 20
read_before:
- title: Check1
  icon: mdi-script-text-play-outline
  href: ./1-5-4/boxes/exactpro/check1
---
## Overview
**check1** is a component of th2 that performs message verification at the user’s request. The users can request verification by submitting a **rule request** which invokes a **rule** found in **check1**.

<notice info>
<!-- TODO: add these as hover over terms -->

A **rule** is logic used for verifying system messages.

A **rule request** contains information required for verification and calls the respective **rule** for execution.

</notice>

During verification **check1** checks if the system's message is accurate.

A system message is also called an execution report and contains details about the trade (order execution).

The system can return more than one message in response to an order.

This section explains how **check1** identifies system messages using **chain verification** with `chain_id`.

## Examples and scenario
Imagine a scenario where the user submits two consecutive trade orders (messages) to the system.

The user will expect 2 messages from the system in response to each order message sent to the system.

### Example 1: Using two separate `CheckSequenceRuleRequests` with checkpoints

![](/img/cookbook/chain-verification/message_chain_with_two_checkpoints.png "Figure1.message_chain_with_two_checkpoints")
<center>
<figcaption>

Figure 1. A chain of system messages (responses) from the same session alias in the same direction.

</figcaption>
</center>

Figure 1 shows a message queue with the messages from the same **session alias** and `direction = FIRST` (from the system). Two checkpoints have been created after the successful submission of each order.

**check1** creates `checkpoint1` and begins verification, after receiving the first `CheckSequenceRuleRequest`. The user is expecting the message 4 and the message 5 as responses to the order message 1, and **check1** identifies these messages using the `key_fields_list` provided in the first `CheckSequenceRuleRequest`.

Similarly, **check1** begins verification at `checkpoint2` and verifies the expected message 7 and message 8. The user is informed about the successful verification for each order.

However,the message 6 was not identified. The message 6 is a response from the system that was not expected by the user and therefore was not identified by the first `CheckSequenceRuleRequest`. Moreover, because **check1** identifies the message 6 as `checkpoint2` it was not checked by the second `CheckSequenceRuleRequest`. 

Therefore, the message 6 is what is known as an **extra message**. Identification of the extra messages is important as their prescence can indicate a prevailing issue in the system under test.

<notice info>
<!-- TODO : make into hover over terms -->

Any message that passes `PreFilter` but is not identified by the main filter is considered as an extra message. 

</notice>


### Example2: Using two linked CheckSequenceRuleRequests

After the first `CheckSequenceRuleRequest` is sent to **check1**, it will start verification from the `checkpoint1`, but the user now requests a `chain_id` from the first `CheckSequenceRuleRequest`.

**check1** creates the `chain_id` caret which acts as a pointer to the verified message. This caret stops at the last verified message. The `chain_id` of the message 5 is returned as the last verified message with the `CheckSequenceResponse`. 

![](/img/cookbook/chain-verification/chain_id.png "Figure2.chain_id")

<center>
<figcaption>

Figure 2. `chain_id` caret marks the last verified message, which is used as the starting point for the next `CheckSequenceRuleRequest`.

</figcaption>
</center>

The user can now request this `chain_id` in their second `CheckSequenceRuleRequest` and **check1** will start verifying from the message 6. **check1** will identify the message 6 as an extra system response and inform the user that there is an extra message.

![](/img/cookbook/chain-verification/chain_id2.png "Figure3.chain_id2")
<center>
<figcaption>

Figure 3. After the second `CheckSequenceRuleRequest`

</figcaption>
</center>

**check1** temporarily stores the `chain_id`. The storage time is determined by the **check1** custom configuration `cleanup-older-than` with `cleanup-time-unit`. Therefore, `chain_id` is removed once the verified message chain is removed. 

Using this stored `chain_id` we can link as many `CheckSequenceRuleRequests` as required to conduct a complete check of the whole message chain. This act of **"chaining"** rule requests together is called chain verification. 

### Example 4 : Messages from different instruments

![](/img/cookbook/chain-verification/two_instruments2.png "Figure4.two_instruments2")

<center>
<figcaption>

Figure 4. Checking messages from different instruments

</figcaption>
</center>

We can request two `CheckSequenceRuleRequest`s from the checkpoint - the first for verification of two messages on `Instrument1` and the second for verification of two messages on `Instrument2`. Then the two `chain_id` carets will be created, with each of them stopping when desired messages are found. The desired message is searched based on the key fields of each individual filter in `CheckSequenceRuleRequest`.


### Usage Example for chain_id

```python
#...
check_connection = grpc.insecure_channel(check1_addr)
check = verifier_pb2_grpc.VerifierStub(check_connection)

# We can create chain_id for the first request, or leave it blank and use it from checkpoint.
chain_id = verifier_pb2.ChainID(id=str(uuid.uuid1()))

# First request starts from the checkpoint and initiates a chain.       
ver1_chain = check.submitCheckSequenceRule(CheckSequenceRuleRequest(
            description=f'Trader "{input_parameters["trader1"]}" receives Execution Report. '
            f'The order stands on book in status NEW',
            chain_id=chain_id,
            connectivity_id=ConnectionID(session_alias=input_parameters['trader1_fix']),
            checkpoint=order1_response.checkpoint_id,
            timeout=3000,
            parent_event_id=input_parameters['case_id'],
            pre_filter=PreFilter(fields={'SecurityID': ValueFilter(simple_filter=Instrument)}),
            message_filters = [filter_object]
        ))
        
# For the second request we can use chain_id from the response, or from the script if we fill it in the first request.
check.submitCheckSequenceRule(CheckSequenceRuleRequest(
            description=f'Trader "{input_parameters["trader1"]}" receives Execution Reports: '
            f'first at Order2 and second on Order1 .',
            connectivity_id=ConnectionID(session_alias=input_parameters['trader1_fix']),
            chain_id=ver1_chain.chain_id,
            timeout=3000,
            parent_event_id=input_parameters['case_id'],
            pre_filter=PreFilter(fields={'SecurityID': ValueFilter(simple_filter=Instrument)}),
            message_filters=[er_2vs3_filter, er_1vs3_filter],
            check_order=True))
            
# For future requests we can use stored chain_id.
#...
```
<!-- TODO: Add a link to the checkpoints page -->

<!-- TODO: Add a link to the rulerequests page --> 

