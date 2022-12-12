---
title: estore
description: Storage for th2 events.
tags: [core]
github: https://github.com/th2-net/th2-estore
---

<section>

# estore

Efficient storage for events produced by th2 components.

<module-index-actions />

</section>

<section>

## Deploy

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

</section>
