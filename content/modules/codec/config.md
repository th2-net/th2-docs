---
weight: 10
---

# Configuration

## Configuration parameters

Config file includes the following parameters:

- `apiVersion` - API Kubernetes version used to create an object, the only available value - `th2.exactpro.com/v1`.

- `kind`- kind of the created object, possible values - `Th2Box`, `Th2CoreBox`, `Th2Estore`, `Th2Mstore`, `Th2Dictionary`.

- `metadata` (name, UID and optional field namespace) - should be equal to the file name without extension.

- `spec` - required object configuration. This seciton contains `image-name` and `image-version` (including versions), `type`, `custom-config` (component-specific set of parameters), `pins` (to communicate with other boxes).

- `extended-settings: service` - here we specify whether the object is available for other components, envVariables (environment variables for pod deployment), resources (amount of resources available for a Pod), etc.

The **codec** settings can be specified in `codecSettings` field of `custom-config`.

For example:

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

### Required pins and links
The **codec** has four types of pins: stream encode, stream decode, general encode, general decode.

- _stream encode / decode_ pins are used for all testing activities performed with th2; **act**, **conn**, **sim**, **recon**, **bookchecker** microservices interact with **codec** through the _stream encode / decode_ pins.

- _general encode / decode_ pins work on demand; those pins are mainly used for the th2 report UI: in order to show messages stored in Cassandra to the end user, **report-data-viewer** requests these messages from **rpt-data-provider** via **codec**.

Codec never mixes messages from the _stream_ and the _general_ pins.

<notice info>

SEE ALSO: [stream and general pins description](/infrastructure/th2-infra-schema/pins/#stream-and-general-codec-pins)

</notice>

Pins are a part of the main th2 concept.
They describe what are the inputs and outputs of a box.
You can read more about them [here](../../infrastructure/th2-infra-schema/pins/).

Every **codec** operation is associated with 2 pins - `subscribe` and `publish`.
The first one is used to receive messages to decode/encode, while the second one is used to send decoded/encoded messages further.

**Typical codec has the following pins**:

- Pin for the _stream encoding_ input: `encoder_in` `parsed` `subscribe`

- Pin for the _stream encoding_ output: `encoder_out` `raw` `publish`

- Pin for the _general encoding_ input: `general_encoder_in` `parsed` `subscribe`

- Pin for the _general encoding_ output: `general_encoder_out` `raw` `publish`

- Pin for the _stream decoding_ input: `decoder_in` `raw` `subscribe`

- Pin for the _stream decoding_ output: `decoder_out` `parsed` `publish`

- Pin for the _general decoding_ input: `general_decoder_in` `raw` `subscribe`

- Pin for the _general decoding_ output: `general_decoder_out` `parsed` `publish`

### Configuration example

API Kubernetes documentation contains specification format for any in-built Kubernetes object. th2-specific custom resources can be found in a Readme file of the component repository.

- `name` in metadata must be filled in as a box name.

- `image-name` must contain a <term term='link'>link</term> to the image of **codec** on your project (preferably the last version). For one project you can have more than one **codec** for the same protocol.

- `image-version` should be filled with image tag (version of image in your project’s **codec**).

- `type` specifies the type of component in th2.

- `logFile` - this field is not mandatory and is only filled out in case of the user requiring log information on a very detailed level.

- In `extended-settings.resources`, the `limits` value must be greater than the value of `requests`.

- `service` parameter: to make this component available to other th2 boxes, set `service.enabled` to `true`.

This configuration is a general way for deploying components in th2.
It contains box configuration, pins' descriptions and other common parameters for a box.

You can configure a specific implementation of **codec** using the `codecSettings` section (Exception: for **codec-sailfish-...**, use `codecParameters` instead of `codecSettings`).

Extended example of the **codec** configuration:

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: codec
spec:
  custom-config:
    codecSettings:
      parameter1: value
      parameter2:
        - value1
        - value2
  pins:
    # encoder
    - name: in_codec_encode
      connection-type: mq
      attributes: [ 'encoder_in', 'parsed', 'subscribe' ]
    - name: out_codec_encode
      connection-type: mq
      attributes: [ 'encoder_out', 'raw', 'publish' ]
    # decoder
    - name: in_codec_decode
      connection-type: mq
      attributes: ['decoder_in', 'raw', 'subscribe']
    - name: out_codec_decode
      connection-type: mq
      attributes: ['decoder_out', 'parsed', 'publish']
    # encoder general (technical)
    - name: in_codec_general_encode
      connection-type: mq
      attributes: ['general_encoder_in', 'parsed', 'subscribe']
    - name: out_codec_general_encode
      connection-type: mq
      attributes: ['general_encoder_out', 'raw', 'publish']
    # decoder general (technical)
    - name: in_codec_general_decode
      connection-type: mq
      attributes: ['general_decoder_in', 'raw', 'subscribe']
    - name: out_codec_general_decode
      connection-type: mq
      attributes: ['general_decoder_out', 'parsed', 'publish']
```

## Codec-related links
Schema API allows configuring routing streams of the messages via links between the connections and the filters on pins.
Let's consider some examples of routing in a **codec** box.


### Split on 'publish' pins
To split a big source data stream into different pins by session alias, consider declaring multiple pins with attributes `['decoder_out', 'parsed', 'publish']` and filters instead of a common pin or in addition to it.
Every decoded message will be directed to all declared pins and will be sent to MQ only if it passes the filter.

```yaml
apiVersion: th2.exactpro.com/v1
kind: Th2Box
metadata:
  name: codec
spec:
  pins:
    # decoder
    - name: out_codec_decode_first_session_alias
      connection-type: mq
      attributes: ['decoder_out', 'parsed', 'publish']
      filters:
        - metadata:
            - field-name: session_alias
              expected-value: first_session_alias
              operation: EQUAL
    - name: out_codec_decode_secon_session_alias
      connection-type: mq
      attributes: ['decoder_out', 'parsed', 'publish']
      filters:
        - metadata:
            - field-name: session_alias
              expected-value: second_session_alias
              operation: EQUAL
```

The filtering can also be applied for pins with a `subscribe` attribute.

## Links config
The main link for a typical **codec** instance is a dictionary link.
A linked dictionary serves as a reference for validations performed by a **codec** instance.


Example:

```yaml
##### dictionary-links.yml #####
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: dictionary-links
spec:
  dictionaries-relation:
  - name: codec-fix-sell-dictionary
    box: codec-fix-sell
    dictionary:
      name: fix-sell
      type: MAIN
```
### Connectivity links
Functionally, **codec** is a regular th2 box that communicates with other boxes via pins and links.
To configure the connections, use a template on the [Links](../../infrastructure/th2-infra-schema/links/#boxes-links) page.



### Report Data Provider link(-s)
For messages passing through **codec** to be displayed in Report UI, **codec** should be linked to **rpt-data-provider** in the following way:

Dedicated to desired **codec**, **rpt-data-provider** pin should be linked to `in_codec_general_decode` **codec** pin.

`out_codec_general_decode` **codec** pin should be linked to **rpt-data-provider** pre-configured dedicated pin for particular **codec**.


```yaml
##### from-codec-links.yml #####
apiVersion: th2.exactpro.com/v1
kind: Th2Link
metadata:
  name: from-codec-links
spec:
  boxes-relation:
    router-mq:
    - name: provider-to-codec-fix-sell
      from:
        box: rpt-data-provider
        pin: to_codec-fix-sell
      to:
        box: codec-fix-sell
        pin: in_codec_general_decode
    - name: codec-fix-sell-to-provider
      from:
        box: codec-fix-sell
        pin: out_codec_general_decode
      to:
        box: rpt-data-provider
        pin: from_codec-fix-sell
```
