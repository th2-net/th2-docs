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

As all environment is prepared we can install th2.

<!--more-->

Basically, th2 installation process depends on level of security for your system:


1. As basic variant, you can download templates with configurations and change it manually. And then apply it to th2 components.
2. You can use our Configs API to get configurations for your system. But in this case all configurations will sended in http GET request. We tried to not to require some confident information, but still there can be reasons for not to use it.

<recommendations :items="install_variants" ></recommendations>