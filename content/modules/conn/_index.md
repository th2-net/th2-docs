---
title: conn
description: Module for integration of th2 solution with external system.
tags: [integration]
github: https://github.com/orgs/th2-net/repositories?language=&q=th2-conn&sort=&type=all
---

<section>

# conn

Integrate your testing solution with external system via:

- TCP
- FIX
- HTTP(S)
- ...

<module-index-actions />

</section>

<section>

## Deploy

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
spec:
  image-name: your.image.repo:42/th2-conn-template
  image-version: <image version>
  type: th2-conn
  custom-config:
      # Depends on specific th2-conn component
  pins:
    - name: in_raw
      connection-type: mq
      attributes: ["first", "raw", "publish", "store"]
    - name: out_raw
      connection-type: mq
      attributes: ["second", "raw", "publish", "store"]
    - name: to_send
      connection-type: mq
      attributes: ["send", "parsed", "subscribe"]
```

</section>
