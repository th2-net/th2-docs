---
title: mstore
description: Storage for messages.
tags: [core]
github: https://github.com/th2-net/th2-mstore
---

<section>

# mstore

Efficient storage for messages produced in the process of communication between components.

<module-index-actions />

</section>

<section>

## Deploy

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

</section>
