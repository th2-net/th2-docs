---
weight: 5
---

# Configuration

**estore** has its own <term term="Custom resource">custom resource</term> definition called `Th2Estore`.

<notice note>

Make sure to indicate `Th2Estore` when specifying `kind` of the <term term="Custom resource">custom resource</term> for `**estore**.

</notice>

Infra schema can contain only one **estore** box description.
It consists of a single required option - <term term="Docker Image">docker_image</term>.
Configuration for <term term="pin">pins</term> is specified in the `Th2Estore` <term term="Custom resource">custom resource</term> definition.
More details on that are provided in the “Automatic pins configuration“ section.

General view of the component will look like this:

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
