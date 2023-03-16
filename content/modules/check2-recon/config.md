---
weight: 10
---

# Configuration

To use **check2-recon**, configure it for your purposes by editing the `check2-recon.yaml` configuration file.
In particular, the adjustment is needed for the parameters for a Kubernetes Pod (the `spec/custom-config` section) and parameters describing comparison rules (the `spec/custom-config/rules` section of the config file).

## Custom resource configuration

### Parameters defined for the Kubernetes Pod configuration:

- `recon_name` - the name of the report in GUI.
- `cache_size` - maximum message group size. When the message group is full, a new message replaces the oldest one. An appropriate event is sent about this.
- `rules_package_path` - the path to the rules.
- `event_batch_max_size` - maximum number of events in one EventBatch.
- `event_batch_send_interval` - the frequency of sending EventBatch with events.
- `rules` - list of *rule* configurations.

### Configuration for each rule in rules list:

- `name` - name of the file with the rule.
- `enabled` - the flag that toggles the rule usage. Set to `true` to enable.
- `match_timeout` - time interval between compared messages in seconds. The current time is taken from a new message. For all messages, that arrived earlier than (`actual_time` - `match_timeout`) and did not participate in the checks, the corresponding events will be created.
- `match_timeout_offset_ns` - the addend for `match_timeout` * 1_000_000_000, if precision to nanoseconds is needed.

Example of the Pod configuration:

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
