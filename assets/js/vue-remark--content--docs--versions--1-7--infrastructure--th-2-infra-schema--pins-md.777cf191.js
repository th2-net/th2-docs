(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{Jnpd:function(t,e,s){"use strict";s.r(e);var a=s("7uw+"),n=s("UQSp"),o=s("oCYn");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}o.default.config.optionMergeStrategies;var c={VueRemarkRoot:n.a},r=function(t){var e=t.options.components=t.options.components||{},s=t.options.computed=t.options.computed||{};Object.keys(c).forEach((function(t){"object"===i(c[t])&&"function"==typeof c[t].render||"function"==typeof c[t]&&"function"==typeof c[t].options.render?e[t]=c[t]:s[t]=function(){return c[t]}}))},v=o.default.config.optionMergeStrategies,p="__vueRemarkFrontMatter",_={excerpt:null,weight:5,related:[],title:"Pins"};var u=function(t){t.options[p]&&(t.options[p]=_),o.default.util.defineReactive(t.options,p,_),t.options.computed=v.computed({$frontmatter:function(){return t.options[p]}},t.options.computed)},l=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("VueRemarkRoot",[s("h1",{attrs:{id:"pins"}},[s("a",{attrs:{href:"#pins","aria-hidden":"true"}},[t._v("#")]),t._v("Pins")]),s("p",[t._v("Each th2 box has a number of pins. \nPins are used by a box (available only for "),s("code",{pre:!0},[t._v("Th2Box")]),t._v(" and "),s("code",{pre:!0},[t._v("Th2CoreBox")]),t._v(") to send/receive messages, or to execute gRPC commands.")]),s("h2",{attrs:{id:"configuration"}},[s("a",{attrs:{href:"#configuration","aria-hidden":"true"}},[t._v("#")]),t._v("Configuration")]),s("p",[t._v("The configuration fields available for a pin are listed below.")]),s("ul",[s("li",[s("code",{pre:!0},[t._v("name")]),t._v(" (mandatory) - reflects a pin’s main purpose and is used in the configuration file describing corresponding links;")]),s("li",[s("code",{pre:!0},[t._v("connection-type")]),t._v(" (mandatory) - sets the connection type used by the pin (starting from th2-infra v1.6.0, the options are "),s("code",{pre:!0},[t._v("mq")]),t._v(", "),s("code",{pre:!0},[t._v("grpc-client")]),t._v(" or "),s("code",{pre:!0},[t._v("grpc-server")]),t._v("; for earlier versions, possible values are "),s("code",{pre:!0},[t._v("mq")]),t._v(" or "),s("code",{pre:!0},[t._v("grpc")]),t._v(")")]),s("li",[s("code",{pre:!0},[t._v("attributes")]),t._v(" (optional) - define the type of message streams which go through this particular pin;")]),s("li",[s("code",{pre:!0},[t._v("settings")]),t._v(" (optional) – the section specifies two settings determining the strategy to be used to declare queues in RabbitMQ: "),s("code",{pre:!0},[t._v("storageOnDemand")]),t._v(" and "),s("code",{pre:!0},[t._v("queueLength")]),t._v(";")]),s("li",[s("code",{pre:!0},[t._v("filters")]),t._v(" (optional and available only for "),s("code",{pre:!0},[t._v("mq")]),t._v(" connection type) - the section describes what messages/metadata can go through this particular pin. Filters can be applied to "),s("code",{pre:!0},[t._v("metadata")]),t._v(" or "),s("code",{pre:!0},[t._v("message")]),t._v(" and contain the following parameters: "),s("code",{pre:!0},[t._v("field-name")]),t._v(", "),s("code",{pre:!0},[t._v("expected-value")]),t._v(", "),s("code",{pre:!0},[t._v("operation")]),t._v(".")]),s("li",[s("code",{pre:!0},[t._v("service-class")]),t._v(" – should be specified if the pin is a gRPC-client (in other words, if it is specified as the “from” component in a config for any link);")]),s("li",[s("code",{pre:!0},[t._v("service-classes")]),t._v(" – should be specified if the pin is a gRPC-server (in other words, if the pin is specified as the “to” component in a config for any link).")]),s("li",[s("code",{pre:!0},[t._v("strategy")]),t._v(" - defines the strategy of requests. Possible values: "),s("code",{pre:!0},[t._v("filter")]),t._v(" or "),s("code",{pre:!0},[t._v("robin")]),t._v(". "),s("em",[t._v("Default")]),t._v(": "),s("code",{pre:!0},[t._v("robin")]),t._v(".")])]),s("p",[t._v("Configuration example:")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-yaml"},[s("code",{staticClass:"language-yaml"},[s("span",{staticClass:"token key atrule"},[t._v("pins")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("object"),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("array"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" (optional"),s("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" available only for Th2Box and Th2CoreBox)\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" \n      "),s("span",{staticClass:"token key atrule"},[t._v("connection-type")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("enum"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" \n      "),s("span",{staticClass:"token key atrule"},[t._v("attributes")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string array"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" \n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" atr1\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" atr2\n      "),s("span",{staticClass:"token key atrule"},[t._v("settings")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("object"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v("\n        "),s("span",{staticClass:"token key atrule"},[t._v("storageOnDemand")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("enum boolean"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v("\n        "),s("span",{staticClass:"token key atrule"},[t._v("queueLength")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" \n      "),s("span",{staticClass:"token key atrule"},[t._v("filters")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("metadata")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n            "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("field-name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" \n              "),s("span",{staticClass:"token key atrule"},[t._v("expected-value")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" \n              "),s("span",{staticClass:"token key atrule"},[t._v("operation")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("enum"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" \n          "),s("span",{staticClass:"token key atrule"},[t._v("message")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" \n            "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("field-name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" \n              "),s("span",{staticClass:"token key atrule"},[t._v("expected-value")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" \n              "),s("span",{staticClass:"token key atrule"},[t._v("operation")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("enum"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v("\n      "),s("span",{staticClass:"token key atrule"},[t._v("service-class")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string"),s("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" used if pin is grpc"),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("client"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" *\n      "),s("span",{staticClass:"token key atrule"},[t._v("service-classes")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string"),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("array"),s("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" used if pin is grpc"),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("server"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v(" *\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" com.exactpro.th2.box.grpc.BoxService\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" com.exactpro.th2.otherbox.grpc.OtherBoxService\n      "),s("span",{staticClass:"token key atrule"},[t._v("strategy")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("string"),s("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("default")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token string"},[t._v("'robin'")]),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v("\n")])])]),s("p",[t._v("It is possible to specify several pins in one configuration. \nIn the example config file below, a box has two pins: "),s("code",{pre:!0},[t._v("in")]),t._v(" and "),s("code",{pre:!0},[t._v("in_raw")]),t._v(".")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-yaml"},[s("code",{staticClass:"language-yaml"},[s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" in\n  "),s("span",{staticClass:"token key atrule"},[t._v("connection-type")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mq\n  "),s("span",{staticClass:"token key atrule"},[t._v("attributes")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" first\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" parsed\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" subscribe\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" store\n"),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" in_raw\n  "),s("span",{staticClass:"token key atrule"},[t._v("connection-type")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mq\n  "),s("span",{staticClass:"token key atrule"},[t._v("attributes")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" first\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" raw\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" subscribe\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" store\n")])])]),s("h3",{attrs:{id:"filters-section"}},[s("a",{attrs:{href:"#filters-section","aria-hidden":"true"}},[t._v("#")]),t._v("Filters section")]),s("p",[t._v("A pin can have a "),s("code",{pre:!0},[t._v("filters")]),t._v(" section. \nFilters can have "),s("code",{pre:!0},[t._v("metadata")]),t._v(" or "),s("code",{pre:!0},[t._v("message")]),t._v(" fields. \nIn this case, the metadata/message is sent or received via this particular pin only if it complies with the filter parameter.\nFilter options available:")]),s("ul",[s("li",[s("code",{pre:!0},[t._v("EQUAL")]),t._v(";")]),s("li",[s("code",{pre:!0},[t._v("NOT_EQUAL")]),t._v(";")]),s("li",[s("code",{pre:!0},[t._v("EMPTY")]),t._v(";")]),s("li",[s("code",{pre:!0},[t._v("NOT_EMPTY")]),t._v(";")]),s("li",[s("code",{pre:!0},[t._v("WILDCARD")]),t._v(".")])]),s("p",[t._v("For example:")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-yaml"},[s("code",{staticClass:"language-yaml"},[s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" fix_to_send\n  "),s("span",{staticClass:"token key atrule"},[t._v("connection-type")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mq\n  "),s("span",{staticClass:"token key atrule"},[t._v("attributes")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("send"),s("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" parsed"),s("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" subscribe"),s("span",{staticClass:"token punctuation"},[t._v("]")]),t._v("\n  "),s("span",{staticClass:"token key atrule"},[t._v("filters")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("metadata")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("field-name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" session_alias\n          "),s("span",{staticClass:"token key atrule"},[t._v("expected-value")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" conn1_session_alias\n          "),s("span",{staticClass:"token key atrule"},[t._v("operation")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" EQUAL\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("message")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" \n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("field-name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" field_name\n          "),s("span",{staticClass:"token key atrule"},[t._v("expected-value")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" value\n          "),s("span",{staticClass:"token key atrule"},[t._v("operation")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" NOT_EQUAL\n")])])]),s("h3",{attrs:{id:"settings-section-for-mq-connection-type"}},[s("a",{attrs:{href:"#settings-section-for-mq-connection-type","aria-hidden":"true"}},[t._v("#")]),t._v("Settings section for MQ connection type")]),s("p",[t._v("MQ pins transfer messages through RabbitMQ - queue manager used by th2.\nIf "),s("code",{pre:!0},[t._v("connection-type: mq")]),t._v(" we can specify "),s("code",{pre:!0},[t._v("settings")]),t._v(" section. Under this section we can specify two settings that configure which strategy will be used while declaring queues in RabbitMQ.")]),s("ul",[s("li",[s("code",{pre:!0},[t._v("storageOnDemand")]),t._v(" (optional) - option which defines an overflow strategy which will be drop-head if set to "),s("code",{pre:!0},[t._v("false")]),t._v(". "),s("em",[t._v("Default")]),t._v(": "),s("code",{pre:!0},[t._v("true")]),t._v(".")]),s("li",[s("code",{pre:!0},[t._v("queueLength")]),t._v(" (optional) - the length of the queue created by the operator. "),s("em",[t._v("Default")]),t._v(": 1000 msg."),s("br"),t._v("\nImportant: "),s("code",{pre:!0},[t._v("queueLength")]),t._v(" isn't used if "),s("code",{pre:!0},[t._v("storageOnDemand")]),t._v(" is set to "),s("code",{pre:!0},[t._v("true")]),t._v(".")])]),s("notice",{attrs:{note:""}},[t._v(" Please note that if an external box has a pin with `subscribe` attribute and exists a box in Kubernetes that publishes on your pin (e.g. **act** has `from_codec` pin related to the queue in rabbitMQ and receives messages from **codec**), then if you close your external application - the messages will accumulate in the queue and can fill the cluster memory. \nTo prevent that, please configure the queue limit on your external box pins. ")]),s("p",[t._v("For example:")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-yaml"},[s("code",{staticClass:"language-yaml"},[s("span",{staticClass:"token key atrule"},[t._v("pins")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" to_send\n      "),s("span",{staticClass:"token key atrule"},[t._v("connection-type")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mq\n      "),s("span",{staticClass:"token key atrule"},[t._v("attributes")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" subscribe\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" send\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" raw\n      "),s("span",{staticClass:"token key atrule"},[t._v("settings")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),s("span",{staticClass:"token key atrule"},[t._v("storageOnDemand")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token boolean important"},[t._v("false")]),t._v("\n        "),s("span",{staticClass:"token key atrule"},[t._v("queueLength")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token number"},[t._v("1000")]),t._v("\n")])])]),s("h3",{attrs:{id:"settings-section-for-grpc-connection-type"}},[s("a",{attrs:{href:"#settings-section-for-grpc-connection-type","aria-hidden":"true"}},[t._v("#")]),t._v("Settings section for gRPC connection type")]),s("p",[t._v("gRPC pins use gRPC technology for synchronous client-server API calls between different boxes in the cluster.")]),s("p",[t._v("Logically, a gRPC pin can stand for server endpoint and client endpoint. \nFor these cases, th2 specification contains corresponding connection types:")]),s("ul",[s("li",[s("code",{pre:!0},[t._v("connection-type: grpc-server")])]),s("li",[s("code",{pre:!0},[t._v("connection-type: grpc-client")])])]),s("notice",{attrs:{info:""}},[s("p",[s("code",{pre:!0},[t._v("grpc-client")]),t._v(" pins affect the box's config map only. Technically, you can connect to gRPC server without created client pins, but it is convenient to have generated endpoints configuration.")])]),s("p",[t._v("If "),s("code",{pre:!0},[t._v("connection-type")]),t._v(" is "),s("code",{pre:!0},[t._v("grpc-server")]),t._v(", you should specify "),s("code",{pre:!0},[t._v("service-classes")]),t._v(" as array; if "),s("code",{pre:!0},[t._v("grpc-client")]),t._v(" - "),s("code",{pre:!0},[t._v("service-class")]),t._v(" as string.")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-yaml"},[s("code",{staticClass:"language-yaml"},[s("span",{staticClass:"token key atrule"},[t._v("pins")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" server\n      "),s("span",{staticClass:"token key atrule"},[t._v("connection-type")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" grpc"),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("server\n      "),s("span",{staticClass:"token key atrule"},[t._v("service-classes")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" com.exactpro.th2.act.grpc.ActService\n        "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" com.exactpro.th2.box.grpc.BoxService\n    "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" to_check1\n      "),s("span",{staticClass:"token key atrule"},[t._v("connection-type")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" grpc"),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("client\n      "),s("span",{staticClass:"token key atrule"},[t._v("service-class")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" com.exactpro.th2.check1.grpc.Check1Service\n")])])]),s("notice",{attrs:{note:""}},[s("p",[t._v("Important note about "),s("code",{pre:!0},[t._v("service-classes")]),t._v(" and "),s("code",{pre:!0},[t._v("service-class")]),t._v(" is that they must be compatible for link to be applied. For example, if the client has a service class "),s("code",{pre:!0},[t._v("com.exactpro.th2.box.grpc.BoxService")]),t._v(" then the server should contain the same service class in its list.")])]),s("notice",{attrs:{note:""}},[s("p",[t._v("If you want to provide access to gRPC server from external boxes, it is required to create an endpoint in "),s("code",{pre:!0},[t._v("extended-settings.service.endpoints")]),t._v(" option in box configuration.")])]),s("p",[t._v("To create an endpoint a box should have:")]),s("ul",[s("li",[s("code",{pre:!0},[t._v("extended-settings.service.enabled")]),t._v(": "),s("code",{pre:!0},[t._v("true")]),t._v(";")]),s("li",[s("code",{pre:!0},[t._v("extended-settings.service.type")]),t._v(": type of a native Kubernetes service, which you want to use;")])]),s("p",[t._v("In endpoint options:")]),s("ul",[s("li",[s("code",{pre:!0},[t._v("name")]),t._v(" - name of endpoint unique for a box;")]),s("li",[s("code",{pre:!0},[t._v("targetPort")]),t._v(" - Docker container port for listening;")]),s("li",[s("code",{pre:!0},[t._v("nodePort")]),t._v(" - Kubernetes node port for listening;")])]),s("p",[t._v("Example of extended settings:")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-yaml"},[s("code",{staticClass:"language-yaml"},[s("span",{staticClass:"token key atrule"},[t._v("extended-settings")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),s("span",{staticClass:"token key atrule"},[t._v("service")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),s("span",{staticClass:"token key atrule"},[t._v("enabled")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token boolean important"},[t._v("true")]),t._v("\n    "),s("span",{staticClass:"token key atrule"},[t._v("type")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" NodePort\n    "),s("span",{staticClass:"token key atrule"},[t._v("endpoints")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),s("span",{staticClass:"token key atrule"},[t._v("name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" grpc\n        "),s("span",{staticClass:"token key atrule"},[t._v("targetPort")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token number"},[t._v("8080")]),t._v("\n        "),s("span",{staticClass:"token key atrule"},[t._v("nodePort")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token number"},[t._v("31179")]),t._v("\n")])])]),s("h2",{attrs:{id:"attributes-section"}},[s("a",{attrs:{href:"#attributes-section","aria-hidden":"true"}},[t._v("#")]),t._v("Attributes section")]),s("p",[t._v("Attributes define the behavior of the pins and describe what message stream goes through a particular pin. \nThey are specific for each box.")]),s("p",[t._v("The set of attributes varies from one th2 component to another. \nEach th2 component can have its own mandatory or optional attributes.")]),s("p",[t._v("If you are defining a pin in which data will be published by the current box, you must specify the "),s("code",{pre:!0},[t._v("publish")]),t._v(" attribute; if the pin is supposed to receive data from another box, then you can optionally specify "),s("code",{pre:!0},[t._v("subscribe")]),t._v(". \nAlthough the "),s("code",{pre:!0},[t._v("subscribe")]),t._v(" attribute is optional, it’s still recommended to specify it, to maintain consistency. \nIf the pin is accepting data and the "),s("code",{pre:!0},[t._v("subscribe")]),t._v(" attribute is not specified, then by default the pin will be considered as "),s("code",{pre:!0},[t._v("subscribe")]),t._v(" anyway. \nYou cannot apply both attributes to one pin at the same time. \nA pin can have either a "),s("code",{pre:!0},[t._v("publish")]),t._v(" or a "),s("code",{pre:!0},[t._v("subscribe")]),t._v(" attribute.")]),s("p",[t._v("Below is the list of possible attributes for pins. \nThey are grouped in such a way that in most cases only one option of two is used for a pin.")]),s("h3",{attrs:{id:"mq-action-attributes"}},[s("a",{attrs:{href:"#mq-action-attributes","aria-hidden":"true"}},[t._v("#")]),t._v("MQ action attributes:")]),s("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[s("div",{staticClass:"v-data-table"},[s("div",{staticClass:"v-data-table__wrapper"},[s("table",[s("thead",[s("tr",[s("th",[t._v("Attribute")]),s("th",[t._v("Description")]),s("th",[t._v("Usage")])])]),s("tbody",[s("tr",[s("td",[s("code",{pre:!0},[t._v("publish")])]),s("td",[t._v("Pin publishes messages via MQ.")]),s("td",[t._v("Used by any of the th2 components  that publish messages via MQ, for example:  conn to codec; codec to act/check; act to conn;  conn to estore.")])]),s("tr",[s("td",[s("code",{pre:!0},[t._v("subscribe")])]),s("td",[t._v("Pin subscribes to messages via MQ.  If "),s("code",{pre:!0},[t._v("publish")]),t._v(" and "),s("code",{pre:!0},[t._v("subscribe")]),t._v(" attributes  are both not specified - pin will act as "),s("code",{pre:!0},[t._v("subscribe")]),t._v(".")]),s("td",[t._v("Used by any of the th2 components which get  messages via MQ, for example:conn to codec;  codec to act/check; act to conn; conn to estore.")])])])])])])]),s("h3",{attrs:{id:"th2-conn-message-direction-attributes"}},[s("a",{attrs:{href:"#th2-conn-message-direction-attributes","aria-hidden":"true"}},[t._v("#")]),t._v("th2-conn message direction attributes:")]),s("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[s("div",{staticClass:"v-data-table"},[s("div",{staticClass:"v-data-table__wrapper"},[s("table",[s("thead",[s("tr",[s("th",[t._v("Attribute")]),s("th",[t._v("Description")]),s("th",[t._v("Usage")])])]),s("tbody",[s("tr",[s("td",[s("code",{pre:!0},[t._v("first")])]),s("td",[t._v("Pin transfers messages that are sent  from a server to a client.")]),s("td",[t._v("Used by the "),s("strong",[t._v("conn")]),t._v(" component to retransmit dialog  between the "),s("strong",[t._v("conn")]),t._v(" and remote system into the th2.")])]),s("tr",[s("td",[s("code",{pre:!0},[t._v("second")])]),s("td",[t._v("Pin transfers messages that are sent  from a client to a server.")]),s("td",[t._v("Used by the "),s("strong",[t._v("conn")]),t._v(" component to retransmit dialog  between the "),s("strong",[t._v("conn")]),t._v(" and remote system into the th2.")])])])])])])]),s("h3",{attrs:{id:"th2-codec-message-type-attributes"}},[s("a",{attrs:{href:"#th2-codec-message-type-attributes","aria-hidden":"true"}},[t._v("#")]),t._v("th2-codec message type attributes:")]),s("p",[t._v("There are two types of "),s("strong",[t._v("codec")]),t._v(": "),s("code",{pre:!0},[t._v("decoder")]),t._v(" and "),s("code",{pre:!0},[t._v("encoder")]),t._v(". \nEvery type of "),s("strong",[t._v("codec")]),t._v(" connection has "),s("code",{pre:!0},[t._v("subscribe")]),t._v(" and "),s("code",{pre:!0},[t._v("publish")]),t._v(" pins. \nThe first one is used to receive messages to decode/encode while the second one is used to send decoded/encoded messages further. \n"),s("strong",[t._v("codec")]),t._v(" works with either "),s("code",{pre:!0},[t._v("parsed")]),t._v(" or "),s("code",{pre:!0},[t._v("raw")]),t._v(" messages.")]),s("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[s("div",{staticClass:"v-data-table"},[s("div",{staticClass:"v-data-table__wrapper"},[s("table",[s("thead",[s("tr",[s("th",[t._v("Attribute")]),s("th",[t._v("Description")]),s("th",[t._v("Usage")])])]),s("tbody",[s("tr",[s("td",[s("code",{pre:!0},[t._v("raw")])]),s("td",[t._v("Pin transfers raw message batches.")]),s("td",[s("strong",[t._v("codec")]),t._v(" publishes raw messages after encoding and  subscribes to raw messages for decoding.")])]),s("tr",[s("td",[s("code",{pre:!0},[t._v("parsed")])]),s("td",[t._v("Pin transfers parsed message batches.")]),s("td",[t._v("Can be used by different th2 components. E.g., "),s("strong",[t._v("codec")]),t._v("  publishes parsed messages after decoding and subscribes  to parsed messages for encoding.  "),s("strong",[t._v("act")]),t._v(", "),s("strong",[t._v("check_")]),s("strong",[t._v("script")]),t._v(" components work with this type of messages.")])])])])])])]),s("h3",{attrs:{id:"th2-codec-message-direction-attributes"}},[s("a",{attrs:{href:"#th2-codec-message-direction-attributes","aria-hidden":"true"}},[t._v("#")]),t._v("th2-codec message direction attributes:")]),s("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[s("div",{staticClass:"v-data-table"},[s("div",{staticClass:"v-data-table__wrapper"},[s("table",[s("thead",[s("tr",[s("th",[t._v("Attribute")]),s("th",[t._v("Description")]),s("th",[t._v("Usage")])])]),s("tbody",[s("tr",[s("td",[s("code",{pre:!0},[t._v("decoder_in")])]),s("td",[t._v("Describes input pin for decoder codec  (transforms protocol message into human-readable).")]),s("td",[s("strong",[t._v("codec")])])]),s("tr",[s("td",[s("code",{pre:!0},[t._v("decoder_out")])]),s("td",[t._v("Describes output pin for decoder codec  (transforms protocol message into human-readable).")]),s("td",[s("strong",[t._v("codec")])])]),s("tr",[s("td",[s("code",{pre:!0},[t._v("encoder_in")])]),s("td",[t._v("Describes input pin for encoder codec  (transforms human-readable message to protocol message).")]),s("td",[s("strong",[t._v("codec")])])]),s("tr",[s("td",[s("code",{pre:!0},[t._v("encoder_out")])]),s("td",[t._v("Describes output pin for encoder codec  (transforms human-readable message to protocol message).")]),s("td",[s("strong",[t._v("codec")])])])])])])])]),s("h3",{attrs:{id:"stream-and-general-codec-pins"}},[s("a",{attrs:{href:"#stream-and-general-codec-pins","aria-hidden":"true"}},[t._v("#")]),t._v("Stream and general codec pins:")]),s("p",[t._v("Please note that there are also "),s("code",{pre:!0},[t._v("general_decoder_in")]),t._v(", "),s("code",{pre:!0},[t._v("general_decoder_out")]),t._v(", "),s("code",{pre:!0},[t._v("general_encoder_in")]),t._v(", "),s("code",{pre:!0},[t._v("general_encoder_out")]),t._v(" attributes. They can be used by some of the th2 components and function as the stream attributes (without "),s("code",{pre:!0},[t._v("general_")]),t._v(") . "),s("code",{pre:!0},[t._v("general_")]),t._v(" means that listening to this connection will be on demand, while stream connection is always active.")]),s("h3",{attrs:{id:"non-mutually-exclusive-attributes"}},[s("a",{attrs:{href:"#non-mutually-exclusive-attributes","aria-hidden":"true"}},[t._v("#")]),t._v("Non-mutually exclusive attributes:")]),s("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[s("div",{staticClass:"v-data-table"},[s("div",{staticClass:"v-data-table__wrapper"},[s("table",[s("thead",[s("tr",[s("th",[t._v("Attribute")]),s("th",[t._v("Description")]),s("th",[t._v("Usage")])])]),s("tbody",[s("tr",[s("td",[s("code",{pre:!0},[t._v("send")])]),s("td",[t._v("Pin transfers event batches.")]),s("td",[t._v("Used by any box that publishes events. "),s("strong",[t._v("estore")]),t._v("  consumes this type of messages.")])]),s("tr",[s("td",[s("code",{pre:!0},[t._v("event")])]),s("td",[t._v("Indicates that the messages that come into this pin  will be stored in Cradle.")]),s("td",[t._v("Used by pins that produce data to the th2,  for example, "),s("strong",[t._v("conn")]),t._v(", "),s("strong",[t._v("read")]),t._v(", this attribute  should be marked.")])]),s("tr",[s("td",[s("code",{pre:!0},[t._v("store")])]),s("td",[t._v("Special attribute for the "),s("strong",[t._v("conn")]),t._v(" pin to receive data  from "),s("strong",[t._v("act")]),t._v(" or other components.")]),s("td",[s("strong",[t._v("th2-conn")])])])])])])])])],1)}),[],!1,null,null,null);"function"==typeof r&&r(l),"function"==typeof u&&u(l);e.default=l.exports},UQSp:function(t,e,s){"use strict";e.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}}}]);