---
weight: 13
---

# Infrastructure

The infrastructure of th2 consists of elements collectively referred to as Infra components. 
One of the components is the infra-schema describing a test environment consisting of th2 <term term='core'>Core</term> and <term term='module'>Module</term> boxes. 
The rest of the infra components work together to monitor and maintain this test environment in a state desired by the user.
Additionally, infra components allow users to change or update deployed test environments.


<!--more-->


![](./th2-infra-2.png)

### Infra-docs in GitHub
Developer information about [th2-infra](https://github.com/th2-net/th2-infra) can be found within the [infra docs](https://github.com/th2-net/th2-infra/tree/master/docs). 
- Reference: View CRD schema reference.
- Compatibility: Check compatibility with different versions of Kubernetes.
- Migration: How to upgrade th2-infra for each new version of th2.
- Permissions: Permissions granted to infrastructure components to access the resources within the cluster.
- Release: Understand the Release Cycle of th2-infra.

Learn more about th2 infrastructure:
- [th2-infra](../infrastructure/th2-infra-repository)
- [th2-infra-schema](../infrastructure/th2-infra-schema)
- [th2-infra components](../infrastructure/infra-components)

