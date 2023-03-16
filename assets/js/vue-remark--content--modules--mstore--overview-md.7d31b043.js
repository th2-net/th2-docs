(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{"+UyW":function(t,e,o){"use strict";o.r(e);var n=o("7uw+"),s=o("UQSp"),r=o("oCYn");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}r.default.config.optionMergeStrategies;var a={VueRemarkRoot:s.a},c=function(t){var e=t.options.components=t.options.components||{},o=t.options.computed=t.options.computed||{};Object.keys(a).forEach((function(t){"object"===i(a[t])&&"function"==typeof a[t].render||"function"==typeof a[t]&&"function"==typeof a[t].options.render?e[t]=a[t]:o[t]=function(){return a[t]}}))},m=r.default.config.optionMergeStrategies,u="__vueRemarkFrontMatter",p={excerpt:null,weight:0,title:"Overview"};var l=function(t){t.options[u]&&(t.options[u]=p),r.default.util.defineReactive(t.options,u,p),t.options.computed=m.computed({$frontmatter:function(){return t.options[u]}},t.options.computed)},v=Object(n.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("VueRemarkRoot",[o("h1",{attrs:{id:"overview"}},[o("a",{attrs:{href:"#overview","aria-hidden":"true"}},[t._v("#")]),t._v("Overview")]),o("p",[o("strong",[t._v("mstore")]),t._v(" (th2 message store) is an important th2 component responsible for storing raw messages into "),o("term",{attrs:{term:"Cradle"}},[t._v("Cradle")]),t._v(". \nThis component has a pin for listening to messages via MQ.")],1),o("p",[t._v("As a part of th2-core, "),o("strong",[t._v("mstore")]),t._v(" is responsible for saving and displaying data. \nThis component's logic is same for all the th2 environments. \nMessages are the data that is going in or out of th2. "),o("strong",[t._v("mstore")]),t._v(" saves content and metadata of those messages. ")]),o("p",[t._v("When marking the pins during configurating other components, you can specify "),o("code",{pre:!0},[t._v("store")]),t._v(" attribute, which means that the messages from this pin will be stored via "),o("strong",[t._v("mstore.")])]),o("p",[o("strong",[t._v("mstore")]),t._v(" interacts with Cradle and "),o("term",{attrs:{term:"th2-common"}},[t._v("Common libraries")]),t._v(". \nUsing RabbitMQ "),o("strong",[t._v("mstore")]),t._v(" gets messages in batches, then it will try to pack batches more compactly, and finally write them to Cassandra using Cradle library. \nTake into account that the batches cannot be merged, if combined batch exceeds the size limitation configured in Cradle.")],1),o("h2",{attrs:{id:"functionality"}},[o("a",{attrs:{href:"#functionality","aria-hidden":"true"}},[t._v("#")]),t._v("Functionality")]),o("p",[t._v("To automatically connect the pin to "),o("strong",[t._v("mstore")]),t._v(" and to collect all the messages into "),o("term",{attrs:{term:"Cradle"}},[t._v("Cradle")]),t._v(", you must mark a pin that produces raw messages in "),o("strong",[t._v("conn")]),t._v(", "),o("strong",[t._v("read")]),t._v(" and "),o("strong",[t._v("hand")]),t._v(" boxes via the "),o("code",{pre:!0},[t._v("store")]),t._v(" attribute. ")],1),o("p",[o("strong",[t._v("mstore")]),t._v(" consumes raw messages. \nParsed messages are not accepted. ")]),o("p",[t._v("Raw message is a base entity of th2. \nAll incoming / outgoing data is stored in this format. \nEvery raw message contains the following important parts:​")]),o("ul",[o("li",[o("p",[t._v("session alias - unique identifier of business session;")])]),o("li",[o("p",[t._v("direction - "),o("term",{attrs:{term:"direction"}},[t._v("direction")]),t._v(" of message stream;")],1)]),o("li",[o("p",[t._v("sequence number - incremental identifier;")])]),o("li",[o("p",[t._v("data - byte representation of a raw message.")])])]),o("p",[t._v("Session alias, direction and sequence number are a compound unique identifier of raw messages within th2.")]),o("p",[o("strong",[t._v("mstore")]),t._v(" uses two libraries - "),o("term",{attrs:{term:"th2-common"}},[t._v("common")]),t._v(" and Cradle.")],1),o("p",[t._v("Common library is responsible for collecting messages in "),o("strong",[t._v("mstore")]),t._v(" from all pins with "),o("code",{pre:!0},[t._v("store")]),t._v(" attribute.")]),o("p",[o("strong",[t._v("mstore")]),t._v(" uses Cradle library to write message batches in Cassandra.")])])}),[],!1,null,null,null);"function"==typeof c&&c(v),"function"==typeof l&&l(v);e.default=v.exports},UQSp:function(t,e,o){"use strict";e.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}}}]);