---
weight: 15
---

# Useful hints

## Message batches

**mstore** consumes `RawMessageBatch` objects.
Every batch must be built via the following rules:

- all messages in one batch must have identical `session alias` and `direction`;

- each batch must have messages in ascending order;

- the first message in each batch for session alias + direction pair must have a sequence number that is greater than the last message from the previous batch for the same session alias + direction pair;

- all the parts of one business message must be placed into one th2 batch and also several packages of business messages can be placed into one th2 batch.

<notice note>

Source business message can be split into several pieces when it is transferred via different protocols, for example, FIX message wrapped into HTTP package.

</notice>

<notice note>

**mstore** 4.1+ works with grouped message batches that contains mixed sessions

</notice>
