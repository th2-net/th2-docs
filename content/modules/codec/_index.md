---
title: codec
description: Module for encoding messages.
tags: [utils]
github: https://github.com/th2-net/th2-codec
---

<section>

# codec



<module-index-actions />

</section>

<section>

## Deploy

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: codec
spec:
  custom-config:
    codecSettings:
      messageTypeDetection: BY_INNER_FIELD
      messageTypeField: "messageType"
      rejectUnexpectedFields: true
      treatSimpleValuesAsStrings: false
```

</section>
