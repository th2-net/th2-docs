---
title: check1
inner-title: th2-check1
related:
  - name: "th2-net/th2-check1"
    icon: "mdi-github"
    href: "https://github.com/th2-net/th2-check1"
--- 

## 1. Overview

th2-check1 is a component of th2 that performs message stream verification. When users accept response(s) from the system, they can use check1 to execute **rule(s)** to verify these system response(s) by submitting rule requests using **gRPC**.
 
<notice info>
A rule is a set of logical steps to compare actual results against expected outcomes. 
</notice>

Rule requests are submitted by the script and verification is done in the background while the script continues to work without waiting for verification to complete. 

<notice info>
The th2-script is code which contains a set of requests to the th2 components.
Check1 component (server) interacts with the script (client) through gRPC. 
</notice>



Rules, used for check1 verification, exist only in the th2-check1 component and rule execution happens on the th2-check1 side. The user can perform verification through the following three rule requests.

`CheckRuleRequest` - contains a filter to verify a single message. The rule is unable to identify other unexpected responses from the system. 

`CheckSequenceRuleRequest` (recommended rule) - contains more than one filter and can check several responses.  

`NoMessageCheckRequest` - is used for pre-filtering the messages that should not be received.

<notice info>

`CheckSequenceRule` is a rule in check1 that compares a message to expected results;

`CheckSequenceRuleRequest` is a request created by a user and contains expected results and parameters for verification logic;

`submitCheckSequenceRule()` is a method to submit the `CheckSequenceRuleRequest` in check1 for `CheckSequenceRule` execution.

</notice>

Verification by check1 identifies expected, unexpected (extra), and missing responses from the system, checks the order of the responses and verifies the accuracy of the information in the field.

<notice info>

A response is created as a result of a message sent to the system. 

For example, a new trade order sent to an exchange (system) returns an execution report (response) with details about the trade’s execution.

</notice>

## Interactions between check1 and other th2 components

![](/img/boxes/exactpro/check1/check1_interactions.png "Figure 1. Interactions between check1 and other components") 

<center>
Figure 1. Interactions between check1 and other components.
</center> 
