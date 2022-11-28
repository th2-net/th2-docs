(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{UQSp:function(t,e,s){"use strict";e.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}},iJk6:function(t,e,s){"use strict";s.r(e);var a=s("7uw+"),n=s("UQSp"),o=s("oCYn");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}o.default.config.optionMergeStrategies;var r={VueRemarkRoot:n.a},c=function(t){var e=t.options.components=t.options.components||{},s=t.options.computed=t.options.computed||{};Object.keys(r).forEach((function(t){"object"===i(r[t])&&"function"==typeof r[t].render||"function"==typeof r[t]&&"function"==typeof r[t].options.render?e[t]=r[t]:s[t]=function(){return r[t]}}))},v=o.default.config.optionMergeStrategies,l="__vueRemarkFrontMatter",u={excerpt:null,weight:15,repo_owner:"th2-net",repo:"th2-mstore",hide_releases:!0,skip_readme:!0,related:[{name:"th2-net/cradleapi",icon:"mdi-github",href:"https://github.com/th2-net/cradleapi"}],title:"th2-mstore"};var p=function(t){t.options[l]&&(t.options[l]=u),o.default.util.defineReactive(t.options,l,u),t.options.computed=v.computed({$frontmatter:function(){return t.options[l]}},t.options.computed)},_=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("VueRemarkRoot",[s("h1",{attrs:{id:"th2-mstore"}},[s("a",{attrs:{href:"#th2-mstore","aria-hidden":"true"}},[t._v("#")]),t._v("th2-mstore")]),s("h2",{attrs:{id:"overview"}},[s("a",{attrs:{href:"#overview","aria-hidden":"true"}},[t._v("#")]),t._v("Overview")]),s("p",[s("strong",[t._v("mstore")]),t._v(" (th2 message store) is an important th2 component responsible for storing raw messages into "),s("term",{attrs:{term:"Cradle"}},[t._v("Cradle")]),t._v(". \nThis component has a pin for listening to messages via MQ.")],1),s("p",[t._v("As a part of th2-core, "),s("strong",[t._v("mstore")]),t._v(" is responsible for saving and displaying data. \nThis component's logic is same for all the th2 environments. \nMessages are the data that is going in or out of th2. "),s("strong",[t._v("mstore")]),t._v(" saves content and metadata of those messages. ")]),s("p",[t._v("When marking the pins during configurating other components, you can specify "),s("code",{pre:!0},[t._v("store")]),t._v(" attribute, which means that the messages from this pin will be stored via "),s("strong",[t._v("mstore.")])]),s("p",[s("strong",[t._v("mstore")]),t._v(" interacts with Cradle and "),s("term",{attrs:{term:"th2-common"}},[t._v("Common libraries")]),t._v(". \nUsing RabbitMQ "),s("strong",[t._v("mstore")]),t._v(" gets messages in batches, then it will try to pack batches more compactly, and finally write them to Cassandra using Cradle library. \nTake into account that the batches cannot be merged, if combined batch exceeds the size limitation configured in Cradle. ")],1),s("h2",{attrs:{id:"family"}},[s("a",{attrs:{href:"#family","aria-hidden":"true"}},[t._v("#")]),t._v("Family")]),s("p",[s("a",{attrs:{href:"https://github.com/th2-net/th2-mstore",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-mstore")]),t._v(" - component repository.")]),s("h2",{attrs:{id:"functionality"}},[s("a",{attrs:{href:"#functionality","aria-hidden":"true"}},[t._v("#")]),t._v("Functionality")]),s("p",[t._v("To automatically connect the pin to "),s("strong",[t._v("mstore")]),t._v(" and to collect all the messages into "),s("term",{attrs:{term:"Cradle"}},[t._v("Cradle")]),t._v(", you must mark a pin that produces raw messages in "),s("strong",[t._v("conn")]),t._v(", "),s("strong",[t._v("read")]),t._v(" and "),s("strong",[t._v("hand")]),t._v(" boxes via the "),s("code",{pre:!0},[t._v("store")]),t._v(" attribute. ")],1),s("p",[s("strong",[t._v("mstore")]),t._v(" consumes raw messages. \nParsed messages are not accepted. ")]),s("p",[t._v("Raw message is a base entity of th2. \nAll incoming / outgoing data is stored in this format. \nEvery raw message contains the following important parts:​")]),s("ul",[s("li",[s("p",[t._v("session alias - unique identifier of business session;")])]),s("li",[s("p",[t._v("direction - "),s("term",{attrs:{term:"direction"}},[t._v("direction")]),t._v(" of message stream;")],1)]),s("li",[s("p",[t._v("sequence number - incremental identifier;")])]),s("li",[s("p",[t._v("data - byte representation of a raw message.")])])]),s("p",[t._v("Session alias, direction and sequence number are a compound unique identifier of raw messages within th2.")]),s("p",[s("strong",[t._v("mstore")]),t._v(" uses two libraries - "),s("term",{attrs:{term:"th2-common"}},[t._v("common")]),t._v(" and Cradle.")],1),s("p",[t._v("Common library is responsible for collecting messages in "),s("strong",[t._v("mstore")]),t._v(" from all pins with "),s("code",{pre:!0},[t._v("store")]),t._v(" attribute.")]),s("p",[s("strong",[t._v("mstore")]),t._v(" uses Cradle library to write message batches in Cassandra.")]),s("h2",{attrs:{id:"configuration"}},[s("a",{attrs:{href:"#configuration","aria-hidden":"true"}},[t._v("#")]),t._v("Configuration:")]),s("p",[s("strong",[t._v("infra-schema")]),t._v(" can only contain one "),s("strong",[t._v("mstore")]),t._v(" box description. \nIt consists of one required option - a Docker image. \nPin configuration is generated and managed by "),s("strong",[t._v("infra-operator")]),t._v(".")]),s("h3",{attrs:{id:"configuration-parameters"}},[s("a",{attrs:{href:"#configuration-parameters","aria-hidden":"true"}},[t._v("#")]),t._v("Configuration parameters")]),s("ul",[s("li",[s("p",[s("code",{pre:!0},[t._v("drain-interval")]),t._v(" - interval in milliseconds to drain all aggregated batches that are not stored yet. ")])]),s("li",[s("p",[t._v("The default value is "),s("code",{pre:!0},[t._v("1000")]),t._v(".")])]),s("li",[s("p",[s("code",{pre:!0},[t._v("termination-timeout")]),t._v(" - the timeout in milliseconds to await for the inner drain scheduler to finish all the tasks. ")])]),s("li",[s("p",[t._v("The default value is "),s("code",{pre:!0},[t._v("5000")]),t._v(".")])])]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-yaml"},[s("code",{staticClass:"language-yaml"},[s("span",{staticClass:"token punctuation"},[t._v("{")]),t._v("\n  "),s("span",{staticClass:"token key atrule"},[t._v('"drain-interval"')]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token number"},[t._v("1000")]),s("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n  "),s("span",{staticClass:"token key atrule"},[t._v('"termination-timeout"')]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token number"},[t._v("5000")]),t._v("\n"),s("span",{staticClass:"token punctuation"},[t._v("}")]),t._v("\n")])]),s("copy-code-btn")],1),s("h3",{attrs:{id:"required-pins-and-links"}},[s("a",{attrs:{href:"#required-pins-and-links","aria-hidden":"true"}},[t._v("#")]),t._v("Required pins and links")]),s("p",[t._v("A user does not need to set up a MQ pin in the "),s("strong",[t._v("mstore")]),t._v(" custom resource. \nThe inbound "),s("strong",[t._v("mstore")]),t._v(" queues receive raw messages from all the boxes that have "),s("code",{pre:!0},[t._v("mq")]),t._v(" pins with the attribute "),s("code",{pre:!0},[t._v("store")]),t._v("."),s("br"),t._v("\nExamples of such boxes include "),s("strong",[t._v("conn")]),t._v(", "),s("strong",[t._v("hand")]),t._v(", and "),s("strong",[t._v("read")]),t._v(".")]),s("h3",{attrs:{id:"configuration-example"}},[s("a",{attrs:{href:"#configuration-example","aria-hidden":"true"}},[t._v("#")]),t._v("Configuration example")]),s("p",[t._v("General view of the component looks like this:")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-yaml"},[s("code",{staticClass:"language-yaml"},[s("span",{staticClass:"token key atrule"},[t._v("apiVersion")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2.exactpro.com/v1\n"),s("span",{staticClass:"token key atrule"},[t._v("kind")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" Th2Mstore\n"),s("span",{staticClass:"token key atrule"},[t._v("metadata")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),s("span",{staticClass:"token key atrule"},[t._v("name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mstore\n"),s("span",{staticClass:"token key atrule"},[t._v("spec")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),s("span",{staticClass:"token key atrule"},[t._v("image-name")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" ghcr.io/th2"),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("net/th2"),s("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("mstore\n  "),s("span",{staticClass:"token key atrule"},[t._v("image-version")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" <image version"),s("span",{staticClass:"token punctuation"},[t._v(">")]),t._v("\n  "),s("span",{staticClass:"token key atrule"},[t._v("custom-settings")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),s("span",{staticClass:"token key atrule"},[t._v("drain-interval")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token number"},[t._v("1000")]),t._v("\n    "),s("span",{staticClass:"token key atrule"},[t._v("termination-timeout")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token number"},[t._v("5000")]),t._v("\n  "),s("span",{staticClass:"token key atrule"},[t._v("extended-settings")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),s("span",{staticClass:"token key atrule"},[t._v("service")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),s("span",{staticClass:"token key atrule"},[t._v("enabled")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token boolean important"},[t._v("false")]),t._v("\n    "),s("span",{staticClass:"token key atrule"},[t._v("envVariables")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),s("span",{staticClass:"token key atrule"},[t._v("JAVA_TOOL_OPTIONS")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),s("span",{staticClass:"token string"},[t._v('"-XX:+ExitOnOutOfMemoryError -Ddatastax-java-driver.advanced.connection.init-query-timeout=\\"5000 milliseconds\\""')]),t._v("\n    "),s("span",{staticClass:"token key atrule"},[t._v("resources")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),s("span",{staticClass:"token key atrule"},[t._v("limits")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),s("span",{staticClass:"token key atrule"},[t._v("memory")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" 500Mi\n        "),s("span",{staticClass:"token key atrule"},[t._v("cpu")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" 200m\n      "),s("span",{staticClass:"token key atrule"},[t._v("requests")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),s("span",{staticClass:"token key atrule"},[t._v("memory")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" 100Mi\n        "),s("span",{staticClass:"token key atrule"},[t._v("cpu")]),s("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" 20m\n")])]),s("copy-code-btn")],1),s("h2",{attrs:{id:"useful-hints"}},[s("a",{attrs:{href:"#useful-hints","aria-hidden":"true"}},[t._v("#")]),t._v("Useful hints")]),s("h3",{attrs:{id:"message-batches"}},[s("a",{attrs:{href:"#message-batches","aria-hidden":"true"}},[t._v("#")]),t._v("Message batches")]),s("p",[s("strong",[t._v("mstore")]),t._v(" consumes "),s("code",{pre:!0},[t._v("RawMessageBatch")]),t._v(" objects. \nEvery batch must be built via the following rules:")]),s("ul",[s("li",[s("p",[t._v("all messages in one batch must have identical "),s("code",{pre:!0},[t._v("session alias")]),t._v(" and "),s("code",{pre:!0},[t._v("direction")]),t._v(";")])]),s("li",[s("p",[t._v("each batch must have messages in ascending order;")])]),s("li",[s("p",[t._v("the first message in each batch for session alias + direction pair must have a sequence number that is greater than the last message from the previous batch for the same session alias + direction pair;")])]),s("li",[s("p",[t._v("all the parts of one business message must be placed into one th2 batch and also several packages of business messages can be placed into one th2 batch.")])])]),s("notice",{attrs:{note:""}},[s("p",[t._v("Source business message can be split into several pieces when it is transferred via different protocols, for example, FIX message wrapped into HTTP package.")])]),s("notice",{attrs:{note:""}},[s("p",[s("strong",[t._v("mstore")]),t._v(" 4.1+ works with grouped message batches that contains mixed sessions")])])],1)}),[],!1,null,null,null);"function"==typeof c&&c(_),"function"==typeof p&&p(_);e.default=_.exports}}]);