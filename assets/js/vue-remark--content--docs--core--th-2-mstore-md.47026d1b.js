(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{UQSp:function(t,e,a){"use strict";e.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}},iJk6:function(t,e,a){"use strict";a.r(e);var s=a("7uw+"),n=a("UQSp"),i=a("oCYn");function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}i.default.config.optionMergeStrategies;var r={VueRemarkRoot:n.a},c=function(t){var e=t.options.components=t.options.components||{},a=t.options.computed=t.options.computed||{};Object.keys(r).forEach((function(t){"object"===o(r[t])&&"function"==typeof r[t].render||"function"==typeof r[t]&&"function"==typeof r[t].options.render?e[t]=r[t]:a[t]=function(){return r[t]}}))},v=i.default.config.optionMergeStrategies,l="__vueRemarkFrontMatter",u={excerpt:null,weight:15,repo_owner:"th2-net",repo:"th2-mstore",hide_releases:!0,skip_readme:!0,related:[{name:"th2-net/cradleapi",icon:"mdi-github",href:"https://github.com/th2-net/cradleapi"}],title:"th2-mstore"};var p=function(t){t.options[l]&&(t.options[l]=u),i.default.util.defineReactive(t.options,l,u),t.options.computed=v.computed({$frontmatter:function(){return t.options[l]}},t.options.computed)},_=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("VueRemarkRoot",[a("h1",{attrs:{id:"th2-mstore"}},[a("a",{attrs:{href:"#th2-mstore","aria-hidden":"true"}},[t._v("#")]),t._v("th2-mstore")]),a("h2",{attrs:{id:"overview"}},[a("a",{attrs:{href:"#overview","aria-hidden":"true"}},[t._v("#")]),t._v("Overview")]),a("p",[a("strong",[t._v("mstore")]),t._v(" (th2 message store) is one of the "),a("term",{attrs:{term:"Core"}},[t._v("Core")]),t._v(" components of th2.\nIt is responsible for storing raw messages into "),a("term",{attrs:{term:"Cradle"}},[t._v("Cradle")]),t._v(", the data lake based on Cassandra NOSQL database.")],1),a("notice",{attrs:{info:""}},[t._v("\nRaw messages are produced by several th2 components during testing. \n")]),a("p",[t._v("Instead of having several components saving raw messages directly into the data lake, the raw messages are routed to the "),a("strong",[t._v("mstore")]),t._v(".\nThe "),a("strong",[t._v("mstore")]),t._v(" will keep track of the order of the saved messages and ensures that messages in the database are stored in the correct order.")]),a("p",[t._v("The "),a("strong",[t._v("mstore")]),t._v(" has a pin for listening to messages via RabbitMQ (message broker).\nThrough this pin, the "),a("strong",[t._v("mstore")]),t._v(" automatically receives raw messages from modules having pins with a connection type "),a("code",{pre:!0},[t._v("mq")]),t._v(" and attribute "),a("code",{pre:!0},[t._v("store")]),t._v(".\nTherefore, users must declare a pin with this configuration in any module that produces raw messages.\nTypically, raw messages are produced by the th2 boxes "),a("strong",[t._v("conn")]),t._v(", "),a("strong",[t._v("read")]),t._v(", and "),a("strong",[t._v("hand")]),t._v(".")]),a("p",[t._v("A single instance (box) of the "),a("strong",[t._v("mstore")]),t._v(" is always required in every th2 environment.\nThe logic of this box is the same in every th2 environment and requires no modifications.")]),a("h2",{attrs:{id:"family"}},[a("a",{attrs:{href:"#family","aria-hidden":"true"}},[t._v("#")]),t._v("Family")]),a("p",[a("a",{attrs:{href:"https://github.com/th2-net/th2-mstore",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-mstore")]),t._v(" - component repository.")]),a("h2",{attrs:{id:"functionality"}},[a("a",{attrs:{href:"#functionality","aria-hidden":"true"}},[t._v("#")]),t._v("Functionality")]),a("ul",[a("li",[t._v("The "),a("strong",[t._v("mstore")]),t._v(" automatically receives raw messages, parsed messages are not accepted. ")]),a("li",[t._v("The "),a("strong",[t._v("mstore")]),t._v(" saves these raw messages to th2's data lake.")]),a("li",[t._v("The "),a("strong",[t._v("mstore")]),t._v(" uses the Cradle Api Library to write data into the data lake.")]),a("li",[t._v("The "),a("strong",[t._v("mstore")]),t._v(" tracks all saved messages and ensures that messages are saved to the database in the correct order.")])]),a("h2",{attrs:{id:"configuration"}},[a("a",{attrs:{href:"#configuration","aria-hidden":"true"}},[t._v("#")]),t._v("Configuration:")]),a("p",[a("strong",[t._v("infra-schema")]),t._v(" requires one "),a("strong",[t._v("mstore")]),t._v(" box description (custom resource).")]),a("h3",{attrs:{id:"configuration-parameters"}},[a("a",{attrs:{href:"#configuration-parameters","aria-hidden":"true"}},[t._v("#")]),t._v("Configuration parameters")]),a("ul",[a("li",[a("p",[a("code",{pre:!0},[t._v("drain-interval")]),t._v(" - interval in milliseconds to drain all aggregated batches that are not stored yet. ")])]),a("li",[a("p",[t._v("The default value is "),a("code",{pre:!0},[t._v("1000")]),t._v(".")])]),a("li",[a("p",[a("code",{pre:!0},[t._v("termination-timeout")]),t._v(" - the timeout in milliseconds to await for the inner drain scheduler to finish all the tasks. ")])]),a("li",[a("p",[t._v("The default value is "),a("code",{pre:!0},[t._v("5000")]),t._v(".")])])]),a("div",{staticClass:"remark-highlight"},[a("pre",{staticClass:"language-yaml"},[a("code",{staticClass:"language-yaml"},[a("span",{staticClass:"token punctuation"},[t._v("{")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v('"drain-interval"')]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("1000")]),a("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v('"termination-timeout"')]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("5000")]),t._v("\n"),a("span",{staticClass:"token punctuation"},[t._v("}")]),t._v("\n")])]),a("copy-code-btn")],1),a("h3",{attrs:{id:"required-pins-and-links"}},[a("a",{attrs:{href:"#required-pins-and-links","aria-hidden":"true"}},[t._v("#")]),t._v("Required pins and links")]),a("p",[t._v("Pin configuration is generated and managed by the "),a("strong",[t._v("infra-operator")]),t._v(".")]),a("h3",{attrs:{id:"configuration-example"}},[a("a",{attrs:{href:"#configuration-example","aria-hidden":"true"}},[t._v("#")]),t._v("Configuration example")]),a("p",[t._v("General view of the component looks like this:")]),a("div",{staticClass:"remark-highlight"},[a("pre",{staticClass:"language-yaml"},[a("code",{staticClass:"language-yaml"},[a("span",{staticClass:"token key atrule"},[t._v("apiVersion")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2.exactpro.com/v1\n"),a("span",{staticClass:"token key atrule"},[t._v("kind")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" Th2Mstore\n"),a("span",{staticClass:"token key atrule"},[t._v("metadata")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v("name")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mstore\n"),a("span",{staticClass:"token key atrule"},[t._v("spec")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v("image-name")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" ghcr.io/th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("net/th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("mstore\n  "),a("span",{staticClass:"token key atrule"},[t._v("image-version")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" <image version"),a("span",{staticClass:"token punctuation"},[t._v(">")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v("custom-settings")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("drain-interval")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("1000")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("termination-timeout")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("5000")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v("extended-settings")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("service")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("enabled")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token boolean important"},[t._v("false")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("envVariables")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("JAVA_TOOL_OPTIONS")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"-XX:+ExitOnOutOfMemoryError -Ddatastax-java-driver.advanced.connection.init-query-timeout=\\"5000 milliseconds\\""')]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("resources")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("limits")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),a("span",{staticClass:"token key atrule"},[t._v("memory")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" 500Mi\n        "),a("span",{staticClass:"token key atrule"},[t._v("cpu")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" 200m\n      "),a("span",{staticClass:"token key atrule"},[t._v("requests")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n        "),a("span",{staticClass:"token key atrule"},[t._v("memory")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" 100Mi\n        "),a("span",{staticClass:"token key atrule"},[t._v("cpu")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" 20m\n")])]),a("copy-code-btn")],1),a("h2",{attrs:{id:"useful-hints"}},[a("a",{attrs:{href:"#useful-hints","aria-hidden":"true"}},[t._v("#")]),t._v("Useful hints")]),a("h3",{attrs:{id:"raw-messages"}},[a("a",{attrs:{href:"#raw-messages","aria-hidden":"true"}},[t._v("#")]),t._v("Raw Messages")]),a("p",[t._v("The raw message is a base entity of th2.\nAll incoming / outgoing data is stored in this format.\nEvery raw message contains the following important parts:​")]),a("ul",[a("li",[t._v("session alias - unique identifier of business session;")]),a("li",[t._v("direction - "),a("term",{attrs:{term:"direction"}},[t._v("direction")]),t._v(" of message stream;")],1),a("li",[t._v("sequence number - incremental identifier;")]),a("li",[t._v("data - byte representation of a raw message.")])]),a("p",[t._v("Session alias, direction and sequence number are a compound unique identifier of raw messages within th2.")]),a("h3",{attrs:{id:"message-batches"}},[a("a",{attrs:{href:"#message-batches","aria-hidden":"true"}},[t._v("#")]),t._v("Message batches")]),a("p",[a("strong",[t._v("mstore")]),t._v(" consumes "),a("code",{pre:!0},[t._v("RawMessageBatch")]),t._v(" objects. \nEvery batch must be built via the following rules:")]),a("ul",[a("li",[a("p",[t._v("all messages in one batch must have identical "),a("code",{pre:!0},[t._v("session alias")]),t._v(" and "),a("code",{pre:!0},[t._v("direction")]),t._v(";")])]),a("li",[a("p",[t._v("each batch must have messages in ascending order;")])]),a("li",[a("p",[t._v("the first message in each batch for session alias + direction pair must have a sequence number that is greater than the last message from the previous batch for the same session alias + direction pair;")])]),a("li",[a("p",[t._v("all the parts of one business message must be placed into one th2 batch and also several packages of business messages can be placed into one th2 batch.")])])]),a("notice",{attrs:{note:""}},[a("p",[t._v("Source business message can be split into several pieces when it is transferred via different protocols, for example, FIX message wrapped into HTTP package.")])]),a("notice",{attrs:{note:""}},[a("p",[a("strong",[t._v("mstore")]),t._v(" 4.1+ works with grouped message batches that contains mixed sessions")])])],1)}),[],!1,null,null,null);"function"==typeof c&&c(_),"function"==typeof p&&p(_);e.default=_.exports}}]);