---
title: Chain Verification 
weight: 20
read_before:
continue_learning:
  - title: Check1
    icon: mdi-script-text-play-outline
    href: ./1-5-4/boxes/exactpro/check1.md 
---
## Overview
**check1** is a component of th2 that performs message verification at the user’s request. Users can request verification by submitting a RuleRequest which invokes a Rule in the **check1** component.

<notice info>

A **Rule** is some logic used for verifying system messages.

A **RuleRequest** contains information required for verification and calls the respective rule for execution.

</notice>

Message verification checks whether a system response to a message (order) is accurate.

A system response is also called an execution report, and contains details about the order or the trade.

Message verification is also the process which identifies the correct response to a message (order) to the system. The system can return one or more messages in response to an order.

In this article we will look at how **check1** identifies system messages and take a closer look at chain verification and chain_id.

## Examples and scenario
Imagine a scenario where a user submits two consecutive trade orders (messages) to the system.

The user expects 2 messages from the system for each message sent to the system.

### Example 1: Using two separate CheckSequenceRuleRequests with checkpoints


<center>
<figcaption>

Figure 1. A chain of system messages (responses) from the same session alias in the same direction.

</figcaption>
</center>

Figure 1 shows a message queue with the messages from the same session alias and direction FIRST (from the system) . Two checkpoints have been created after the successful submission of each order.

**Check1** creates a checkpoint when the message for the new order is successfully submitted to th2-act.

**check1** begins verification at checkpoint1 after receiving the first `CheckSequenceRuleRequest`. The user is expecting message 4 and message 5 as responses for the first order message, and **check1** identifies the messages using the information in the first CheckSequenceRuleRequest .

Similarly, **check1** begins verification at checkpoint2 and verifies the expected message 7 and message 8. The user is informed about the successful verification for each order.

However, message 6 was not identified. Message 6 is a response from the system that was not expected by the user so was not identified by the first CheckSequenceRuleRequest . Moreover, because the message 6 is identified as the checkpoint2 by **check1**, it was not checked by the second CheckSequenceRuleRequest.

We know that response 6 is an unexpected extra message because CheckSequenceRuleRequest contains a prefilter that filters out messages that do not require verification by the main filters in a CheckSequenceRuleRequest .  The main filters in a  CheckSequenceRuleRequest are then used to identify the message and verify the information contained within the system response.

Any message that passes pre-filter but is not identified by the main filters is considered an extra message

### Example2 : Using two linked CheckSequenceRuleRequests 

After the first `CheckSequenceRuleRequest` is sent to **check1** it will start verification from the checkpoint, but the user now requests a `chain_id` from the first `CheckSequenceRuleRequest`.

**check1** creates the chain_id caret which acts as a pointer to the verified message and stops at the last verified message. The chain_id of response5 as the last verified message is returned with the `CheckSequenceResponse` (figure2). 

<center>
<figcaption>

Figure 2. Chain_id caret marks the last verified message, which is used as the starting point for the next CheckSequenceRuleRequest.

</figcaption>
</center>

The user can now request this chain_id in their second CheckSequenceRuleRequest and **check1** will start verifying from response 6. **check1** will identify message 6 as an extra system response and informs the user that there is an extra message.

**check1** temporarily stores the chain_id . The storage time allocated is defined in the **check1** custom configuration cleanup-older-than with cleanup-time-unit.

### Usage Example for chain_id

```python
...
check_connection = grpc.insecure_channel(check1_addr)
check = verifier_pb2_grpc.VerifierStub(check_connection)
# We can create chain_id for first request, or leave it blank and use it from checkpoint.
chain_id = verifier_pb2.ChainID(id=str(uuid.uuid1()))
# First request starts from checkpoint and initiates a chain.       
ver1_chain = check.submitCheckSequenceRule(CheckSequenceRuleRequest(
            description=f'Trader "{input_parameters["trader1"]}" receives Execution Report. '
            f'The order stands on book in status NEW',
            chain_id=chain_id,
            connectivity_id=ConnectionID(session_alias=input_parameters['trader1_fix']),
            checkpoint=order1_response.checkpoint_id,
            timeout=3000,
            parent_event_id=input_parameters['case_id'],
            pre_filter=PreFilter(fields={'SecurityID': ValueFilter(simple_filter=Instrument)}),
            message_filters=[sf.create_filter_object(msg_type='ExecutionReport',
                                                     fields=er1_parameters,
                                                     key_fields_list=['ClOrdID'])]
        ))
# For second request we can use chain_id from response, or from script if we fill it in first request.
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
...
```
### Example3 : Messages from different instruments

<center>
<figcaption>

Figure 3. Checking messages from different instruments

</figcaption>
</center>

We can request two `CheckSequenceRuleRequest`s from checkpoint - the first for verification of two messages on Instrument1 and the second for verification of two messages on Instrument2; then two chain_id carets will be created, with each of them stopping when desired messages are found. The desired message is searched based on the key fields of each individual filter in `CheckSequenceRuleRequest`.
