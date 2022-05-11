---
title: Use th2
weight: 6
read_before:
  - title:  Install th2
    href: ./install-th2
    icon: mdi-tune-vertical
children:
  - title:  Install Software
    href: ./use-th2/1-software
    icon: mdi-language-python
  - title:  Create Environment
    href: ./use-th2/2-create-env
    icon: mdi-sync
  - title:  Run Script
    href: ./use-th2/3-run-script
    icon: mdi-script-text-play-outline
---

In this guide, you will learn how to use th2 in testing.

<!--more-->

As you already have Kubernetes cluster along with the th2, we can try testing it.

The following actions will be needed:

1. Install Software for interaction with the th2 components;
2. Create environment to run tests inside it;
3. Run script to test your system for vulnerabilities.

<recommendations :items="children"></recommendations>
