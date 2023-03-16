---
weight: 10
---

# Configuration

**infra-schema** can only contain one **mstore** box description.
It consists of one required option - a Docker image.
Pin configuration is generated and managed by **infra-operator**.

## Configuration parameters

- `drain-interval` - interval in milliseconds to drain all aggregated batches that are not stored yet.
- The default value is `1000`.

- `termination-timeout` - the timeout in milliseconds to await for the inner drain scheduler to finish all the tasks.
- The default value is `5000`.

```yaml
{
  "drain-interval": 1000,
  "termination-timeout": 5000
}
```

## Required pins and links

A user does not need to set up a MQ pin in the **mstore** custom resource.
The inbound **mstore** queues receive raw messages from all the boxes that have `mq` pins with the attribute `store`.  
Examples of such boxes include **conn**, **hand**, and **read**.

## Configuration example

General view of the component looks like this:

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Mstore
metadata:
  name: mstore
spec:
  image-name: ghcr.io/th2-net/th2-mstore
  image-version: <image version>
  custom-settings:
    drain-interval: 1000
    termination-timeout: 5000
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
