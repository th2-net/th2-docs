---
title: check2-recon
description: Module for reconciliation
tags: [reconciliation]
github: https://github.com/th2-net/th2-check2-recon
---

<section>

# check2-recon

Check your messages in background.

<module-index-actions />

</section>

<section>

## Deploy 

```yaml
##### check2-recon.yaml #####
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: recon
spec:
  image-name: some_image_name
  image-version: some_image_version
  type: th2-check2-recon
  custom-config:
    recon_name: Demo_Recon
    cache_size: 5000
    event_batch_max_size: 100
    event_batch_send_interval: 1
    rules_package_path: rules
    rules:
      - name: "rule_demo_1"
        enabled: true
        match_timeout: 10
        match_timeout_offset_ns: 0
        configuration: ""
      - name: "demo_conn1_vs_demo_conn2"
        enabled: true
        match_timeout: 10
        match_timeout_offset_ns: 0
        configuration: ""
      - name: "demo_conn_vs_demo_dc"
        enabled: true
        match_timeout: 10
        match_timeout_offset_ns: 0
        configuration: ""
      - name: "log_vs_demo_conn"
        enabled: true
        match_timeout: 10
        match_timeout_offset_ns: 0
        configuration: ""
      - name: "refData_vs_demo_conn"
        enabled: true
        match_timeout: 10
        match_timeout_offset_ns: 0
        configuration: ""
```

</section>
