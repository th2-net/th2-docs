---
title: check1
description: Module for assertions
tags: [assertion]
github: https://github.com/th2-net/th2-check1
---

<section>

# check1

Module for assertions

<module-index-actions />

</section>

<section>

## Deploy

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: Check1
spec:
  pins:
    - name: server
      connection-type: grpc
    - name: in_parsed_message
      connection-type: mq
      attributes:
        - "subscribe"
        - "parsed"
```

</section>
