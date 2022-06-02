---
title: 3. Deploy th2
weight: 2
install_variants:
  - title: Manual configuration
    href: ./3-th2/dl-configs
    icon: mdi-hand-back-left-outline
  - title: Generate configs
    href: ./3-th2/generate-configs
    icon: mdi-api
---

As all the environments are prepared, we can install th2.

<!--more-->

The process of th2 installation depends on the level of security for your system:


1. You can download the templates with the configurations and change them manually. Then apply them to the th2 components, or
2. you can use our Configs API to get configurations for your system. 

<recommendations :items="install_variants" ></recommendations>