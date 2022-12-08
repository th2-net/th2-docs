---
weight: 10
---

# Usage

<term term="th2-infra-operator">th2-infra-operator</term> (component responsible for creating boxes) automatically adds special MQ <term term="pin">pin</term> for receiving events to **estore** by any other component.

At the same time, any box with <term term="Custom resource">CR</term> kind `Th2Box` will get special MQ <term term="pin">pin</term> for sending events to the **estore**. These <term term="pin">pins</term>  have attributes `event` and `publish`. 
