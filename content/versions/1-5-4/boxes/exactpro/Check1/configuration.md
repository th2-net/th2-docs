---
title: Configuration
inner-title: check1 - custom configuration
weight: 20
related:
- name: "th2-net/th2-check1"
  icon: "mdi-github"
  href: "https://github.com/th2-net/th2-check1"
---

## Configuration of check1
The general configuration of the **check1** component is given below. 

```yaml [check1.yml]
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: Check1
spec:
  image-name: ghcr.io/th2-net/th2-Check1
  image-version: <image version>
  custom-config:
    message-cache-size: '1000'
    cleanup-older-than: '60'
    cleanup-time-unit: 'SECONDS'
    max-event-batch-content-size: '1048576'
    rule-execution-timeout: '5000'
    auto-silence-check-after-sequence-rule: false
    time-precision: 'PT0.000000001S'
    decimal-precision: '0.00001'
  type: th2-Check1
  pins:
    - name: server
      connection-type: grpc
    - name: from_codec
      connection-type: mq
      attributes: ['subscribe', 'parsed']
  extended-settings:
    service:
      enabled: true
      nodePort: '<port>'
    envVariables:
      JAVA_TOOL_OPTIONS: "-XX:+ExitOnOutOfMemoryError"
    resources:
      limits:
        memory: 200Mi
        cpu: 200m
      requests:
        memory: 100Mi
        cpu: 50m
```

### th2-check1 custom configuration
Some of check1 properties are customizable. The customizable parameters, along with example values are provided in the following code snippet (a part of the config file):
```yaml
{
custom config:
  "message-cache-size": 1000,
  "cleanup-older-than": 60,
  "cleanup-time-unit": "SECONDS",
  "max-event-batch-content-size": "1048576",
  "rule-execution-timeout": 5000,
  "auto-silence-check-after-sequence-rule": false,
  "time-precision": "PT0.000000001S",
  "decimal-precision": 0.00001,
  "check-null-value-as-empty": false
}   
```
### Properties that can be customized
The following table gives a short description about the customizable properties of check1. You can change these property values to obtain a desired configuration of check1

|Property name|Type|Default Value|Property description|
|---|---|---|---|
|`message-cache-size`|`int`|`1000`|The number of messages for each stream (alias + direction) that will be buffered.|
|`cleanup-older-than`|`long`|`60L`|Variable indicates the value of the time interval for the verified message chain to be removed from the queue. The value is given in time unit defined in `cleanup-time-unit` setting.|
|`cleanup-time-unit`|`ChronoUnit`|`ChronoUnit.SECONDS`|Defines the unit of measurement for the `cleanup-older-than` setting. The available values are `MILLIS`, `SECONDS`, `MINUTES`, `HOURS`. Default: `SECONDS`.|
|`max-event-batch-content-size`|`int`|`1048576`|Maximum size of summary events content in a batch (in bytes).|  
|`rule-execution-timeout`|`long`|`5000L`|This is the amount of time allocated for rule execution. The rule execution stops automatically after the allocated time. Unit is milliseconds. `rule-execution-timeout`  is the default value, unless the parameter timeout is set in the rule request.|
|`auto-silence-check-after-sequence-rule`|`bool`|`false`|Parameter which defines a default behavior of creating `CheckSequenceRule`, if `silence_check` parameter in `CheckSequenceRule` is not specified in the request. Default: `false`.|
|`time-precision`|`Duration`|`PT0.000000001S`|Parameter used to compare two time values. It is based on the ISO-8601 duration format `PnDTnHnMn.nS` with days considered to be exactly 24 hours. Additional information can be found [here](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/time/Duration.html#parse(java.lang.CharSequence)).|
|`decimal-precision`|`double`|`0.00001`|Parameter used to compare the value of two numbers. Can be specified in number or string format. For example, `0.0001`, `0.125`, `125E-3`.|
|`check-null-value-as-empty`|`boolean`|`false`|Parameter used for `EMPTY` and `NOT_EMPTY` operations to check if `NULL_VALUE` is empty. Default: `false`. For example, if the `checkNullValueAsEmpty` parameter is true, then `NULL_VALUE` is equal to `EMPTY`, otherwise `NULL_VALUE` is equal to `NOT_EMPTY`.|




