# InfraViewer app

This application can visualize public infra schema on GitHub.

By default this application visualize [th2-infra-schema-demo](https://github.com/th2-net/th2-infra-schema-demo).

To add it to markdown document:

```
import InfraViewer from "~/components/apps/infra-viewer"

<InfraViewer style="height: 80vh" />
```

## Functionality

This component is powered by [Apache Echarts Graph chart](https://echarts.apache.org/examples/en/index.html#chart-type-graph). So it supports all basic manipulations for dynamic images.

List of noticeable functions:
- you can toggle groups of components by selecting it in legend;
- tooltips on hover are supported;
- you can display links to estore and mstore which are created automatically and not in CRs.