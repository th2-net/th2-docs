(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{"QRv/":function(t,a,s){"use strict";s.r(a);var n=s("7uw+"),e=s("UQSp"),o=s("oCYn");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}o.default.config.optionMergeStrategies;var c={VueRemarkRoot:e.a},p=function(t){var a=t.options.components=t.options.components||{},s=t.options.computed=t.options.computed||{};Object.keys(c).forEach((function(t){"object"===i(c[t])&&"function"==typeof c[t].render||"function"==typeof c[t]&&"function"==typeof c[t].options.render?a[t]=c[t]:s[t]=function(){return c[t]}}))},l=o.default.config.optionMergeStrategies,u="__vueRemarkFrontMatter",v={excerpt:null,weight:30,related:[],title:"Links"};var _=function(t){t.options[u]&&(t.options[u]=v),o.default.util.defineReactive(t.options,u,v),t.options.computed=l.computed({$frontmatter:function(){return t.options[u]}},t.options.computed)},k=Object(n.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("VueRemarkRoot",[n("h1",{attrs:{id:"links"}},[n("a",{attrs:{href:"#links","aria-hidden":"true"}},[t._v("#")]),t._v("Links")]),n("p",[t._v("After all the pins are defined and configured, you should also specify the links between them. \nIt can be done by uploading a special CR called the th2 link. \nBased on the components that the links connect, they can be separated into several files (e.g. "),n("code",{pre:!0},[t._v("from-codec-links.yaml")]),t._v(", "),n("code",{pre:!0},[t._v("from-act-links.yaml")]),t._v(", "),n("code",{pre:!0},[t._v("dictionary-links.yaml")]),t._v("). \nThe most important is the location of the "),n("code",{pre:!0},[t._v(".yaml")]),t._v(" files in the links directory. \nAlso, all links can be configured in one file, but links for the dictionary should be in the "),n("code",{pre:!0},[t._v("dictionaries-relation")]),t._v(" section, and all other links in the "),n("code",{pre:!0},[t._v("boxes-relation")]),t._v(" section.")]),n("p",[t._v("Links from the "),n("code",{pre:!0},[t._v("boxes-relation")]),t._v(" section connect boxes (Kubernetes pods) using pins, whereas, the  "),n("code",{pre:!0},[t._v("dictionaries-relation")]),t._v(" links allow boxes to use dictionary files (that are not related to the Kubernetes pods). ")]),n("h2",{attrs:{id:"dictionary-links"}},[n("a",{attrs:{href:"#dictionary-links","aria-hidden":"true"}},[t._v("#")]),t._v("Dictionary links")]),n("p",[t._v("Example of "),n("code",{pre:!0},[t._v("dictionary-links")]),t._v(": ")]),n("div",{staticClass:"remark-highlight"},[n("pre",{staticClass:"language-yaml"},[n("code",{staticClass:"language-yaml"},[n("span",{staticClass:"token key atrule"},[t._v("apiVersion")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2.exactpro.com/v1\n"),n("span",{staticClass:"token key atrule"},[t._v("kind")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" Th2Link\n"),n("span",{staticClass:"token key atrule"},[t._v("metadata")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" dictionary"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("links\n"),n("span",{staticClass:"token key atrule"},[t._v("spec")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("dictionaries-relation")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" codec"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("dictionary\n      "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" codec"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix\n      "),n("span",{staticClass:"token key atrule"},[t._v("dictionary")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" fix50"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("generic\n        "),n("span",{staticClass:"token key atrule"},[t._v("type")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" MAIN\n")])]),n("copy-code-btn")],1),n("h2",{attrs:{id:"boxes-links"}},[n("a",{attrs:{href:"#boxes-links","aria-hidden":"true"}},[t._v("#")]),t._v("Boxes links")]),n("p",[t._v("Each link has the following attributes:")]),n("ul",[n("li",[n("p",[n("code",{pre:!0},[t._v("name")]),t._v(" - the name of the link;")])]),n("li",[n("p",[n("code",{pre:!0},[t._v("from")]),t._v(" - the pin of the box from which this link goes;")])]),n("li",[n("p",[n("code",{pre:!0},[t._v("to")]),t._v(" - the pin of the box to which it leads.")])])]),n("p",[t._v("There are two ways of communication between the components via links:")]),n("ul",[n("li",[n("p",[t._v("RabbitMQ - message broker for asynchronous messaging;")])]),n("li",[n("p",[t._v("gRPC - for specifying routing calls.")])])]),n("p",[t._v("For each of the connection type there is a separate option in configuration:")]),n("ul",[n("li",[n("p",[n("code",{pre:!0},[t._v("router-mq")])])]),n("li",[n("p",[n("code",{pre:!0},[t._v("router-grpc")])])])]),n("p",[t._v("Example of "),n("code",{pre:!0},[t._v("boxes-links")]),t._v(": ")]),n("div",{staticClass:"remark-highlight"},[n("pre",{staticClass:"language-yaml"},[n("code",{staticClass:"language-yaml"},[n("span",{staticClass:"token key atrule"},[t._v("apiVersion")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2.exactpro.com/v1\n"),n("span",{staticClass:"token key atrule"},[t._v("kind")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" Th2Link\n"),n("span",{staticClass:"token key atrule"},[t._v("metadata")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" set"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("of"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("links\n"),n("span",{staticClass:"token key atrule"},[t._v("spec")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("boxes-relation")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),n("span",{staticClass:"token key atrule"},[t._v("router-mq")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mq_relation_link\n        "),n("span",{staticClass:"token key atrule"},[t._v("from")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" source_box_name\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" publish_pin_name\n        "),n("span",{staticClass:"token key atrule"},[t._v("to")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" destination_box_name\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" subscribe_pin_name\n    "),n("span",{staticClass:"token key atrule"},[t._v("router-grpc")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" grpc_relation_link\n        "),n("span",{staticClass:"token key atrule"},[t._v("from")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" source_box_name\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" source_pin_name\n        "),n("span",{staticClass:"token key atrule"},[t._v("to")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" destination_box_name\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" destination_pin_name\n")])]),n("copy-code-btn")],1),n("h3",{attrs:{id:"mq-router"}},[n("a",{attrs:{href:"#mq-router","aria-hidden":"true"}},[t._v("#")]),t._v("MQ Router")]),n("p",[t._v("MQ links are described in the "),n("code",{pre:!0},[t._v("router-mq")]),t._v(" section of the link "),n("code",{pre:!0},[t._v(".yaml")]),t._v(" file. When using MQ links, you should keep in mind that the pins that are marked with the "),n("code",{pre:!0},[t._v("publish")]),t._v(" attribute must be specified in the "),n("code",{pre:!0},[t._v("from")]),t._v(" section, and those marked with "),n("code",{pre:!0},[t._v("subscribe")]),t._v(" (or not marked with either) must be specified in the "),n("code",{pre:!0},[t._v("to")]),t._v(" section. The message flow between the pins should be from "),n("code",{pre:!0},[t._v("publish")]),t._v(" to "),n("code",{pre:!0},[t._v("subscribe")]),t._v(". ")]),n("div",{staticClass:"remark-highlight"},[n("pre",{staticClass:"language-yaml"},[n("code",{staticClass:"language-yaml"},[n("span",{staticClass:"token key atrule"},[t._v("apiVersion")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2.exactpro.com/v1\n"),n("span",{staticClass:"token key atrule"},[t._v("kind")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" Th2Link\n"),n("span",{staticClass:"token key atrule"},[t._v("metadata")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" from"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("conn"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("links\n"),n("span",{staticClass:"token key atrule"},[t._v("spec")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("boxes-relation")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),n("span",{staticClass:"token key atrule"},[t._v("router-mq")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" democonn1"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("codec\n        "),n("span",{staticClass:"token key atrule"},[t._v("from")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" demo"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("conn1\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" in_raw\n        "),n("span",{staticClass:"token key atrule"},[t._v("to")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" codec"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" in_codec_decode\n")])]),n("copy-code-btn")],1),n("h3",{attrs:{id:"grpc-router"}},[n("a",{attrs:{href:"#grpc-router","aria-hidden":"true"}},[t._v("#")]),t._v("gRPC Router")]),n("p",[t._v("gRPC links are described in the section "),n("code",{pre:!0},[t._v("router-grpc")]),t._v(".")]),n("notice",{attrs:{note:""}},[t._v(" Starting from v.1.7 of th2-infra-schema, this section no longer contains the `strategy` and `service-class` fields. \nFor newer releases, the properties are to be specified in configurations of pins ([more details](./pins#service-classes-setting-for-grpc-connection-type)). ")]),n("p",[t._v("An example of a gRPC link:")]),n("div",{staticClass:"remark-highlight"},[n("pre",{staticClass:"language-yaml"},[n("code",{staticClass:"language-yaml"},[n("span",{staticClass:"token key atrule"},[t._v("apiVersion")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2.exactpro.com/v1\n"),n("span",{staticClass:"token key atrule"},[t._v("kind")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" Th2Link\n"),n("span",{staticClass:"token key atrule"},[t._v("metadata")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" from"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("act"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("links\n"),n("span",{staticClass:"token key atrule"},[t._v("spec")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("boxes-relation")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),n("span",{staticClass:"token key atrule"},[t._v("router-grpc")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" act"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("to"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("check1\n        "),n("span",{staticClass:"token key atrule"},[t._v("from")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" act"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" to_check1\n        "),n("span",{staticClass:"token key atrule"},[t._v("to")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" check1\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" server\n")])]),n("copy-code-btn")],1),n("h2",{attrs:{id:"example"}},[n("a",{attrs:{href:"#example","aria-hidden":"true"}},[t._v("#")]),t._v("Example")]),n("p",[t._v("Here you can see shortened example of "),n("a",{attrs:{href:"https://github.com/th2-net/th2-infra-schema-demo/blob/ver-1.5.4-main_scenario/links/links.yml",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("links.yaml")]),t._v(" file with different sections:")]),n("div",{staticClass:"remark-highlight"},[n("pre",{staticClass:"language-yaml"},[n("code",{staticClass:"language-yaml"},[n("span",{staticClass:"token key atrule"},[t._v("apiVersion")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2.exactpro.com/v1\n"),n("span",{staticClass:"token key atrule"},[t._v("kind")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" Th2Link\n"),n("span",{staticClass:"token key atrule"},[t._v("metadata")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" links\n"),n("span",{staticClass:"token key atrule"},[t._v("spec")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("##############################################################################")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("###                           DICTIONARIES                                 ###")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("##############################################################################")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("dictionaries-relation")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" codec"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("dictionary\n      "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" codec"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix\n      "),n("span",{staticClass:"token key atrule"},[t._v("dictionary")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" fix50"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("generic\n        "),n("span",{staticClass:"token key atrule"},[t._v("type")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" MAIN\n"),n("span",{staticClass:"token comment"},[t._v("##############################################################################")]),t._v("\n    "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" codec"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("demo"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("dictionary\n      "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" codec"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("demo\n      "),n("span",{staticClass:"token key atrule"},[t._v("dictionary")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" fix50"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("generic\n        "),n("span",{staticClass:"token key atrule"},[t._v("type")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" MAIN\n\n"),n("span",{staticClass:"token comment"},[t._v("##############################################################################")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("###                           BOXES MQ                                     ###")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("##############################################################################")]),t._v("\n  "),n("span",{staticClass:"token key atrule"},[t._v("boxes-relation")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),n("span",{staticClass:"token key atrule"},[t._v("router-mq")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("#########################ACT-FIX -> CODEC-FIX#################################")]),t._v("\n      "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" from"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("act"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("to"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("codec\n        "),n("span",{staticClass:"token key atrule"},[t._v("from")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" act"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" to_send\n        "),n("span",{staticClass:"token key atrule"},[t._v("to")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" codec"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" in_codec_encode\n"),n("span",{staticClass:"token comment"},[t._v("##############################################################################")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("#####################ACT-UI-BACKEND -> CODEC-FIX##############################")]),t._v("\n      "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" act"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("to"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("codec\n        "),n("span",{staticClass:"token key atrule"},[t._v("from")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" act"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("ui"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("backend\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" to"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("codec\n        "),n("span",{staticClass:"token key atrule"},[t._v("to")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" codec"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" in_codec_encode\n\n"),n("span",{staticClass:"token comment"},[t._v("##############################################################################")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("###                         BOXES GRPC                                     ###")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("##############################################################################")]),t._v("\n    "),n("span",{staticClass:"token key atrule"},[t._v("router-grpc")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("#####################ACT-FIX -> CHECK1########################################")]),t._v("\n      "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" act"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("to"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("check1\n        "),n("span",{staticClass:"token key atrule"},[t._v("from")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" act"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("fix\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" to_check1\n        "),n("span",{staticClass:"token key atrule"},[t._v("to")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" check1\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" server\n"),n("span",{staticClass:"token comment"},[t._v("##############################################################################")]),t._v("\n"),n("span",{staticClass:"token comment"},[t._v("#####################RECON -> UTIL############################################")]),t._v("\n      "),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),n("span",{staticClass:"token key atrule"},[t._v("name")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" recon"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("to"),n("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("util\n        "),n("span",{staticClass:"token key atrule"},[t._v("from")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" recon\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" to_util\n        "),n("span",{staticClass:"token key atrule"},[t._v("to")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n          "),n("span",{staticClass:"token key atrule"},[t._v("box")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" util\n          "),n("span",{staticClass:"token key atrule"},[t._v("pin")]),n("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" server\n")])]),n("copy-code-btn")],1),n("p",[t._v("Below is the illustration of links between boxes given in the configuration file above.\n"),n("g-image",{attrs:{src:s("Qsql")}})],1)],1)}),[],!1,null,null,null);"function"==typeof p&&p(k),"function"==typeof _&&_(k);a.default=k.exports},Qsql:function(t,a){t.exports={type:"image",mimeType:"image/png",src:"/assets/static/links_schema.42db587.acdbce08e857e51916fc380cf11d522d.png",size:{width:2560,height:2326},sizes:"(max-width: 2560px) 100vw, 2560px",srcset:["/assets/static/links_schema.82a2fbd.acdbce08e857e51916fc380cf11d522d.png 480w","/assets/static/links_schema.cbab2cf.acdbce08e857e51916fc380cf11d522d.png 1024w","/assets/static/links_schema.2665e34.acdbce08e857e51916fc380cf11d522d.png 1920w","/assets/static/links_schema.42db587.acdbce08e857e51916fc380cf11d522d.png 2560w"],dataUri:"data:image/svg+xml,%3csvg fill='none' viewBox='0 0 2560 2326' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3cfilter id='__svg-blur-e714bf6580ec3479011f6e6343d94f9c'%3e%3cfeGaussianBlur in='SourceGraphic' stdDeviation='40'/%3e%3c/filter%3e%3c/defs%3e%3cimage x='0' y='0' filter='url(%23__svg-blur-e714bf6580ec3479011f6e6343d94f9c)' width='2560' height='2326' xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAEAAAAA6CAYAAAAA0F95AAAACXBIWXMAAA7EAAAOxAGVKw4bAAALDUlEQVRo3sWbSW8byRXH%2bbFyzy2HHHLINcgnCJDklkuQIDnklGWADLJggDnMYAbBxHbGxhhjy7bkTV5k7bYsa5e1UKRIcSe1vNTvsR9RavVGUpQaKHWzu6rr1b/e/lo5ccfZ2ZmUSiXJ5/NycHBwoXG/XC6LHfT3z8fHx1IoFCLH2vh6vX5uzCgOe3ez2Yxdi7V2u619c/zZ39%2bXo6Mj6XQ6%2biDcuA9ALNImsslOTk5kZ2dHJ40aa%2bOZo1qtXgAwazs9PdUW9Sy8eOiJWwut1WppH65z/ACRLMfe3t6FCQ8PD6VWq6WO9efxCb%2bsnbf3sfNwZNrBhrIhCoDtrKFsSIdRZxeTAAiPsTMHIpD35jHRgWDeQSsWiz1xg7itrW0FnXsLCwsyPT0j29vb2m99fV02Nzd7XGXv3HX9OwEAcdxjdEPTOQDSZCsLALHvOO5IJyDWDtj16dOn8uLFC3ny5IkszM/L7OyszMzMyNzcnExMTMja2prcvn1bbt26JW/evHG/VxUEno2NjcnHjx/PvbPudlbnS1mL0X1OBEAEpJeWlnQSzm/fvs0MACgvLy/L6uqqEsb4onvO8WhxSX77zbdSLB%2bpONTrDWk4ADqdY2k5WWy6e1y32x33vN1rbSfLhUJR%2b5%2benjnQWtrgHvrWGw1tgFl1dPzx5h25PT2nc7YD3bOysqI0%2baIeCQCcAPrsCGd24/Xr16pQsugA7s27XXz58qUC9/z5c9lzBHD8fWxCfvCnv8ny5rY0G005qlSlUq055VtxLH%2bkrRS0stf4Tb%2by61cqlfVc9vpVa3V9Dii7%2bYL88M%2bfyu9ufdflMLc26Hn//r0sLi7K7u5uMgCjFIGKY/%2bVjU057nSUA5rNhspvw%2b3eMAdz8x70Bu9eXluXWmByM4uArwTpcOLOJxFmJw4A38ZHKVHdDbfQmiMUhYZ4IdsbGxuR%2bifNJPr9YG0aO8y7Dp2CPDs7TTSnF5TgVZnBfDAPO8bkyC2tyxHds4lbmJv8eemL3wL3MAZfhMbi2KROP2bQbCc3kMdjx5r/mXwtv/r6ppOpvO5apVJR0xPlCKGMkC36xDUmgjAIx3zdu3dPdYSZN5PPqakp5YokAHgXluPVq1eqaD98%2bKAchYXg2hwh%2bgFSHD3Mp46QsT4ydOhAOG015a93x%2bRHn/xLNnd2lXUZxC6Hd9/OvKgL4FFk490mJvQ1Nkxi/TjZZSy7nnQwB4s0EKLosXfkoiZDS%2bedRnWzKuHGokkuaD%2b%2bepScJ/WNG2%2bAwJlski3OFp8GFO/IRSGPXW04EFAu7969U9uOLY0jIqs/HxafqOs4UKLGcEAbNKIPjOVtpxGNNHpyUZOweGyuyTiKyXdtfRd3lNFdGhfhCrMx6JKog/tx4mZHLAAV56jMzc3K%2bPh4T9FwpqGsjL2uCwCUKg7O1tbWBTNuZ99s9w0AFgEFaEoLMwM3sHBfkV0XAFlMNwAMxgFO4eFmZg1D02R%2bVByAX4KsY/bQAfgk/DYb7/stfXOAAZCkxNK09Si4w97J4mB/FCAiiX9BDINPgZjiT2DrBwPAcUApggP8l/ms5Xticb7CKESAOUciAoSeNddWVj44VF9qREhoS2RFHP7s2TON1zGTd%2b7ckbt378rk5KQqJZQmXpkRN0oATBH7MYsffwynBJ0VwPnBA0S%2bzHc3JwPTiLzBepZn40w/7o9KSUYBEKd/BgcgRgSGsdn99M/iOGXJ/aEnBvYDSDywyzR2np216CscXg5rBaK8waj3%2buyNxkfJWZp7b29frYGl5wHIHKQkGqJ1gFsomRZknLgdbwu5RsPC8qNQcoO%2bx8YdORd4P49i7PoqtlEDAaCucCACFqObO4xyu2xN7wc27CIgo2T9a/QKShjfHzPHfTaHTWKnTW/1C2xkMIQOKDpngpwgWh8OYEJidzQ919PT0%2bfyA5cBAOBi1%2bE2LE03C7ym%2bUmz85YxtnwlecdZdw/PtVKpXrAKaXWIyHD4pN2RKtnboNpjB1wAkab1j738%2b3WJgB2IbP6g0LdTlrOFaXKR1JaToS%2beTMrPP/tS9ouH0iG54O77QFwm4YOG1Shmc4dRiHPzC/Lk2aTzYEt6j2dZkrU5Fo%2bs8ZKDQlHatar8%2b8GE/PSfn8vK5pYclcua20fjRtndJPOV1rff%2bqCNgWbSYcaRcKJZCK7NMwWINBByvkMR2pbzae1KRYOMpKSInxlOM2fhvEJa5scHADqyJGLpE0XzBQCMvXu1wQi7awnFJM/LMrr9Huxat9LTTuUMA8DqCVG1P59mK%2btnAiBRyRBmFouJfajbEQuQsZ1xVgKTNT7%2bSM0XGhwLQqNyRL0PDU5Wh%2bv79%2b9rphjtT6MPch6Z0nZ01ILNSKQ5KJhkFgGrzmJzua/p7qCg%2bfv/fSc/%2b%2bwLpytKGixRjqpac6xG8ISuWFnFcVqVre2Psu5C0sW372T74467v%2boWuyWbLoR9/5483pKsrq3Ltuu3vPxBn6%2b6sfRhHPdIy9UbTZ2vqkraxSPOI/3lV/%2bVX3z5TS8mAGDMJ9eEyLS%2bOMAAsMqsX5JeCzy/T%2b49kl9/dUNq1e5ia7W6Oh9dMKrauEc9rtlq67NGs6UFTK65j3/R0AKIM6PuPv0Yo%2b9yfQETB8wKpwBQcgtAOVeCWmLD9f3N1zfkD9/e7S0SLkIpVpWGWs8FzswBWUSg7ZDvuEZflddWK6jt1YcygeiNZScW0IGr/fjx46C6TLFjyonFopbOW62uOAB%2bfmfXKY7O5YmAAZCkeMqacq4qe2E2kWW/kkPpehCz5rvBvWRLUJ%2b8UK/AQ3UiCFfANeGPOvyWWQRglyTt7ZekzKSY7TUCTHtHxQlp72Usyg/RA1TcXJIvuNrm8uL7Mx/BDsMs/38pZtBqaZbSsrN/zRmFSF8jDk2P8oFIfsO%2bEJs1Xe7vvNXrINjCbs78ZgcBqeC8Uit7AwY0s7i4xjh0mW8uY11hOsEJuI9RrRttNXpsaHGAeWAQyH373W8eILWyHADgj4FrDbSo5pfGEl3hQWt7w/brxxXe28%2bfA3YQmhM5YJDa3qjqAeHx7Hw9go37pTlTQuS6jzDB%2bAPFYmmkafbcZaI57OLDZnFv/yBTUmMoAC5Tni5z9wuFQ/3ya9Tz9r4Qsbx%2b3Le1oyyGhheIk3N4WB754hUAs/FJX1Z3085751Jgl9nCeUEcnrBojOrIEQHW6%2bn%2bvH1%2b4hMVTnZEPUtKekQlPgh8CJauYvcjEyLhIoSxPrFAKQAgrtqSVKy0d1l6PQoIoj37MuWqvkBRALJkck7w/ryvOguFA43ScIFJT1vUhmuM745vT3KERqj64MEDuff995rswJ1%2b%2bPChPBgb6/nq%2bj8F%2bYNIizBSAMjtIwJ%2b6YtrS4Hx6VzTuZY3J1/JjRdTcuZ2uRP8hwj5gt3dPY0IiRL3ncfGmQUvOxBIanBGx2xsbMr6%2boYDZ8UtNK95/iUX/MBVvG/fmbx26CPJKwGAbDAKrruYXU0u8D0QO6mBjtvJRdd%2b/JdP5Sf/%2bFyOnGNSrlAhrmtCoxokM2iaJXK/q5Y0CVqlUtP%2baHeeU8HRRIh7Rg0SZ%2bcqTN5QIrC0uSXzK2ty4hVLW/q5e6f3WVpaJfY6/YxEAJLq7L1CRL2bj4Ol4RJYnZIZ0SKhMc3PwQ9jDq8UAL/OnkQY2aDDQGH5feGA8PhBCx5X/cWZAlANPmFPO6zuThIErU/aGg7gjP6AA0iDj%2brTmJEBoDY%2byJ7EJUR4Rh8WhaWwZIhljOwjCu5d524OFQxl/SeFq6j0XuXxfxqInJWqLTg%2bAAAAAElFTkSuQmCC' /%3e%3c/svg%3e"}},UQSp:function(t,a,s){"use strict";a.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}}}]);