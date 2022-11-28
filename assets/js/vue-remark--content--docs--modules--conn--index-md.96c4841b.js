(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{UQSp:function(t,e,n){"use strict";e.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}},aUFa:function(t,e,n){"use strict";n.r(e);var o=n("7uw+"),a=n("UQSp"),s=n("oCYn");function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}s.default.config.optionMergeStrategies;var i={VueRemarkRoot:a.a},c=function(t){var e=t.options.components=t.options.components||{},n=t.options.computed=t.options.computed||{};Object.keys(i).forEach((function(t){"object"===r(i[t])&&"function"==typeof i[t].render||"function"==typeof i[t]&&"function"==typeof i[t].options.render?e[t]=i[t]:n[t]=function(){return i[t]}}))},l=s.default.config.optionMergeStrategies,p="__vueRemarkFrontMatter",h={excerpt:null,repo_owner:"th2-net",repo:"th2-conn",skip_readme:!0,related:[{name:"th2-conn repositories in th2-net",icon:"mdi-github",href:"https://github.com/orgs/th2-net/repositories?q=th2-conn&type=all&language=&sort="}],weight:5,title:"conn"};var v=function(t){t.options[p]&&(t.options[p]=h),s.default.util.defineReactive(t.options,p,h),t.options.computed=l.computed({$frontmatter:function(){return t.options[p]}},t.options.computed)},u=Object(o.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("VueRemarkRoot",[o("h1",{attrs:{id:"conn"}},[o("a",{attrs:{href:"#conn","aria-hidden":"true"}},[t._v("#")]),t._v("conn")]),o("p",[o("strong",[t._v("conn")]),t._v(' ("conn" stands for "connect") component is responsible for the communication with a target system. \nThis component implements the logic of the interaction protocol, receiving and sending messages from and to the system, respectively.')]),o("p",[o("g-image",{attrs:{src:n("q4Gu")}})],1),o("h2",{attrs:{id:"family"}},[o("a",{attrs:{href:"#family","aria-hidden":"true"}},[t._v("#")]),t._v("Family")]),o("p",[t._v("There is a number of repositories on GitHub, created as a part of connectivity module implementation. ")]),o("p",[t._v("There is no universal template for the "),o("strong",[t._v("conn")]),t._v(" component, but you can use one of the already created "),o("strong",[t._v("conn")]),t._v(" repositories in "),o("a",{attrs:{href:"https://github.com/th2-net",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-net")]),t._v(" or use one of the custom protocol implementations provided there to apply it to your own version of "),o("strong",[t._v("conn")]),t._v(".")]),o("notice",{attrs:{note:""}},[o("p",[t._v("Some of the "),o("strong",[t._v("conn")]),t._v(" repositories have "),o("code",{pre:!0},[t._v("dirty")]),t._v(" in the name. \nIt means that the component can be used for negative testing as it provides an ability to send invalid messages in order to get a protocol error.")])]),o("h3",{attrs:{id:"libraries"}},[o("a",{attrs:{href:"#libraries","aria-hidden":"true"}},[t._v("#")]),t._v("Libraries")]),o("p",[o("strong",[t._v("conn")]),t._v(" repositories with the "),o("code",{pre:!0},[t._v("core")]),t._v(" are the libraries, which can be useful for box implementation. ")]),o("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[o("div",{staticClass:"v-data-table"},[o("div",{staticClass:"v-data-table__wrapper"},[o("table",[o("thead",[o("tr",[o("th",[t._v("Repository")]),o("th",[t._v("Protocol(s)")])])]),o("tbody",[o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-dirty-tcp-core",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-dirty-tcp-core")])]),o("td",[t._v("TCP (also can be used for higher level protocols, e.g. FIX)")])])])])])])]),o("h3",{attrs:{id:"boxes"}},[o("a",{attrs:{href:"#boxes","aria-hidden":"true"}},[t._v("#")]),t._v("Boxes")]),o("p",[o("a",{attrs:{href:"https://github.com/th2-net",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-net")]),t._v(" repositories with names starting with "),o("code",{pre:!0},[t._v("th2-conn-")]),t._v(" contain implementations of "),o("strong",[t._v("conn")]),t._v("  for specific communication protocols. They already have docker image in the registry.")]),o("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[o("div",{staticClass:"v-data-table"},[o("div",{staticClass:"v-data-table__wrapper"},[o("table",[o("thead",[o("tr",[o("th",[t._v("Repository")]),o("th",[t._v("Protocol(s)")])])]),o("tbody",[o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-amqp",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-amqp")])]),o("td",[o("a",{attrs:{href:"https://www.amqp.org/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("AMQP")])])]),o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-qfj",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-qfj")])]),o("td",[o("a",{attrs:{href:"https://www.fixtrading.org/what-is-fix/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("FIX")])])]),o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-http-client",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-http-client")])]),o("td",[t._v("HTTP, HTTPS")])]),o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-http-server",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-http-server")])]),o("td",[t._v("HTTP, HTTPS")])]),o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-ws-client",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-ws-client")])]),o("td",[t._v("WebSocket")])]),o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-kafka",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-kafka")])]),o("td",[o("a",{attrs:{href:"https://kafka.apache.org/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Kafka")])])]),o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-dirty-fix",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-dirty-fix")])]),o("td",[o("a",{attrs:{href:"https://www.fixtrading.org/what-is-fix/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("FIX")])])])])])])])]),o("h3",{attrs:{id:"templates"}},[o("a",{attrs:{href:"#templates","aria-hidden":"true"}},[t._v("#")]),t._v("Templates")]),o("p",[o("strong",[t._v("conn")]),t._v(" repositories with the "),o("code",{pre:!0},[t._v("template")]),t._v(" in their name are the templates of boxes. \nYou can add custom logic into these boxes. ")]),o("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[o("div",{staticClass:"v-data-table"},[o("div",{staticClass:"v-data-table__wrapper"},[o("table",[o("thead",[o("tr",[o("th",[t._v("Repository")]),o("th",[t._v("Protocol(s)")]),o("th",[t._v("Custom Logic")])])]),o("tbody",[o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-http-ws-client-template",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-ws-client-template")])]),o("td",[t._v("HTTP, HTTPS, WebSocket")]),o("td",[t._v("Authorization, Received Messages Handler, Sending Messages, etc.")])]),o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn")])]),o("td",[o("a",{attrs:{href:"https://github.com/Exactpro/sailfish-core",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Sailfish")])]),o("td",[t._v("Allows you to create "),o("strong",[t._v("conn")]),t._v(" implementations based on Sailfish services")])])])])])])]),o("h3",{attrs:{id:"other"}},[o("a",{attrs:{href:"#other","aria-hidden":"true"}},[t._v("#")]),t._v("Other")]),o("p",[t._v("Some of the public repositories related to the "),o("strong",[t._v("conn")]),t._v(" are not for common use, but they are still useful for the th2 ecosystem.")]),o("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[o("div",{staticClass:"v-data-table"},[o("div",{staticClass:"v-data-table__wrapper"},[o("table",[o("thead",[o("tr",[o("th",[t._v("Repository")]),o("th",[t._v("Description")])])]),o("tbody",[o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-grpc-conn",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-grpc-conn")])]),o("td",[t._v("Contains a common gRPC interface for the "),o("strong",[t._v("conn")]),t._v(" modules. This interface can be used to control a "),o("strong",[t._v("conn")]),t._v(" (e.g. start or stop it).  The "),o("strong",[t._v("conn")]),t._v(" modules implementing this interface:  "),o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-qfj",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-qfj")]),o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-http-ws-client-template",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-http-ws-client-template")])])]),o("tr",[o("td",[o("a",{attrs:{href:"https://github.com/th2-net/th2-conn-generic",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn-generic")])]),o("td",[t._v("Builds "),o("a",{attrs:{href:"https://www.fixtrading.org/what-is-fix/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("FIX")]),t._v(", "),o("a",{attrs:{href:"https://www.nasdaqtrader.com/content/technicalsupport/specifications/dataproducts/souptcp.pdf",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("SOUP")]),t._v(", "),o("a",{attrs:{href:"https://www.lseg.com/sites/default/files/content/documents/MIT203%20-%20Native%20Trading%20Gateway%20Specification%20-%20Issue%2010.4.pdf",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("NTG")]),o("strong",[t._v(" conn")]),t._v(" implementations on top of the "),o("a",{attrs:{href:"https://github.com/th2-net/th2-conn",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-conn")]),t._v(" Docker image.")])])])])])])]),o("h2",{attrs:{id:"configuration"}},[o("a",{attrs:{href:"#configuration","aria-hidden":"true"}},[t._v("#")]),t._v("Configuration")]),o("p",[t._v("A generic configuration for "),o("strong",[t._v("conn")]),t._v(" is provided below. \nTo specify the "),o("code",{pre:!0},[t._v("custom-config")]),t._v(" object for a particular "),o("strong",[t._v("conn")]),t._v(" implementation provided as a "),o("a",{attrs:{href:"https://github.com/th2-net",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("th2-net")]),t._v(' repository, refer to the "Configuration" section of its ReadMe file.')]),o("div",{staticClass:"remark-highlight"},[o("pre",{staticClass:"language-yaml"},[o("code",{staticClass:"language-yaml"},[o("span",{staticClass:"token key atrule"},[t._v("apiVersion")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2.exactpro.com/v1\n"),o("span",{staticClass:"token key atrule"},[t._v("kind")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" Th2Box\n"),o("span",{staticClass:"token key atrule"},[t._v("spec")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),o("span",{staticClass:"token key atrule"},[t._v("image-name")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" your.image.repo"),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("42/th2"),o("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("conn"),o("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("template\n  "),o("span",{staticClass:"token key atrule"},[t._v("image-version")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" <image version"),o("span",{staticClass:"token punctuation"},[t._v(">")]),t._v("\n  "),o("span",{staticClass:"token key atrule"},[t._v("type")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2"),o("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("conn\n  "),o("span",{staticClass:"token key atrule"},[t._v("custom-config")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),o("span",{staticClass:"token comment"},[t._v("# Depends on specific th2-conn component")]),t._v("\n  "),o("span",{staticClass:"token key atrule"},[t._v("pins")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),o("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),o("span",{staticClass:"token key atrule"},[t._v("name")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" in_raw\n      "),o("span",{staticClass:"token key atrule"},[t._v("connection-type")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mq\n      "),o("span",{staticClass:"token key atrule"},[t._v("attributes")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),o("span",{staticClass:"token punctuation"},[t._v("[")]),o("span",{staticClass:"token string"},[t._v('"first"')]),o("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),o("span",{staticClass:"token string"},[t._v('"raw"')]),o("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),o("span",{staticClass:"token string"},[t._v('"publish"')]),o("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),o("span",{staticClass:"token string"},[t._v('"store"')]),o("span",{staticClass:"token punctuation"},[t._v("]")]),t._v("\n    "),o("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),o("span",{staticClass:"token key atrule"},[t._v("name")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" out_raw\n      "),o("span",{staticClass:"token key atrule"},[t._v("connection-type")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mq\n      "),o("span",{staticClass:"token key atrule"},[t._v("attributes")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),o("span",{staticClass:"token punctuation"},[t._v("[")]),o("span",{staticClass:"token string"},[t._v('"second"')]),o("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),o("span",{staticClass:"token string"},[t._v('"raw"')]),o("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),o("span",{staticClass:"token string"},[t._v('"publish"')]),o("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),o("span",{staticClass:"token string"},[t._v('"store"')]),o("span",{staticClass:"token punctuation"},[t._v("]")]),t._v("\n    "),o("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" "),o("span",{staticClass:"token key atrule"},[t._v("name")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" to_send\n      "),o("span",{staticClass:"token key atrule"},[t._v("connection-type")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" mq\n      "),o("span",{staticClass:"token key atrule"},[t._v("attributes")]),o("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),o("span",{staticClass:"token punctuation"},[t._v("[")]),o("span",{staticClass:"token string"},[t._v('"send"')]),o("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),o("span",{staticClass:"token string"},[t._v('"parsed"')]),o("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" "),o("span",{staticClass:"token string"},[t._v('"subscribe"')]),o("span",{staticClass:"token punctuation"},[t._v("]")]),t._v("\n")])]),o("copy-code-btn")],1),o("h3",{attrs:{id:"required-pins"}},[o("a",{attrs:{href:"#required-pins","aria-hidden":"true"}},[t._v("#")]),t._v("Required pins")]),o("p",[t._v("A "),o("strong",[t._v("conn")]),t._v(" box has 3 types of pins:")]),o("ul",[o("li",[o("code",{pre:!0},[t._v("out_raw")]),t._v(" - raw messages that go from "),o("strong",[t._v("conn")]),t._v(" to the system.")]),o("li",[o("code",{pre:!0},[t._v("in_raw")]),t._v(" - raw messages that go from the system to "),o("strong",[t._v("conn")]),t._v(".")]),o("li",[o("code",{pre:!0},[t._v("to_send")]),t._v(" - messages that go from a user to "),o("strong",[t._v("conn")]),t._v(".")])]),o("p",[t._v("The "),o("strong",[t._v("conn")]),t._v(" box uses a separate queue to send messages. \nIt subscribes to that pin at the start and waits for the messages. \nThe messages received from that pin will be sent to the target system. \nAlso, this component is responsible for maintaining connections and sessions in the cases where it is provided by the communication protocol. \nIt can automatically send "),o("term",{attrs:{term:"heartbeat messages"}},[t._v("heartbeat messages")]),t._v(", logon/logout commands and requests to retransmit messages between an external system and th2.")],1)],1)}),[],!1,null,null,null);"function"==typeof c&&c(u),"function"==typeof v&&v(u);e.default=u.exports},q4Gu:function(t,e){t.exports={type:"image",mimeType:"image/png",src:"/assets/static/th2-conn.7c9b308.273f8f1d11f9b5efcfe5730828c1d1b6.png",size:{width:1464,height:524},sizes:"(max-width: 1464px) 100vw, 1464px",srcset:["/assets/static/th2-conn.82a2fbd.273f8f1d11f9b5efcfe5730828c1d1b6.png 480w","/assets/static/th2-conn.cbab2cf.273f8f1d11f9b5efcfe5730828c1d1b6.png 1024w","/assets/static/th2-conn.7c9b308.273f8f1d11f9b5efcfe5730828c1d1b6.png 1464w"],dataUri:"data:image/svg+xml,%3csvg fill='none' viewBox='0 0 1464 524' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3cfilter id='__svg-blur-7586a0a39b28363d3f687a6b5c8468c6'%3e%3cfeGaussianBlur in='SourceGraphic' stdDeviation='40'/%3e%3c/filter%3e%3c/defs%3e%3cimage x='0' y='0' filter='url(%23__svg-blur-7586a0a39b28363d3f687a6b5c8468c6)' width='1464' height='524' xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAEAAAAAXCAYAAAC74kmRAAAACXBIWXMAAAsSAAALEgHS3X78AAAKz0lEQVRYw8VYCVSTVxb%2b/yBUq05bt1Ot0lpFT8%2bIyyiOuFEUlyiyW3WctGoH3OqC2FPXjojHragHqTIeq0BdCHsIBAgg%2bxaEhBi2yCKgRDBsQYQQIG/ue8mPwAGLtdN553zn3f9t/7vfu/e%2bhaJ6JYFAQL1tQgi9dfu9e/cSuaCggFYoFCwoY3V0dLA0Gg2RMSoqKljFxcVEbm9vZ3V1dREZt6mtraVx/8rKyrf%2b/6Cpra2N5EVFRfhHZjAhS5jccpAtBgAutwJM0StFJhTjZEf9WekPUzzWyZaKcbSl9h88SOuL3g8NDS1NSU5G2dnZ6ElFBcrKzEQ4ASFIKpWi/Px89PjxYxTI5R7HHXieF9%2bLcbSjdePZvZEIPHEOh0Pkp0%2bfTmtubl4AZfP6Q6lUzmtpaZk3QJ0Z4GNmrD%2bMCF8fHx0BH39iKHr4MF2cn/9SlJNT96SyUpmSlqasqq5W5onFylihUCmWSBTpmZlaYULCd33IdPxtC6iqqqI8PDzIv5KTk6PBnDGZWky2SCRCOTk5CMyfEM3n84mcCQuAy8ElusvKytCDBw9O4P5%2bfn4G70yAbsVsicxjrxqRs2/PB6ju%2bUzU2DC7o1Q%2bS10qN0XNTaaZ3ADT2hyRKepQm6IXdbOQqnmuRiKeGGhuNi52o/1msIBJzHjRgOX/8SVj4ny5z2u5vr6eOnfuHCFALBZHgRWglJSUztTUVJwTq8Nl2Nqw8tjSMjIyUFJSEsrLy9PIZDKUlZVFLC8sLIwQYOnjR11JzSL/cA7m09sCw8n4%2b3jR1LLrt99MADbXWL3JQm4O7uAUvtKCHfrlEnb4iuVsHshhlkvZ0exVbP4qS3aIxRJ22Ipl7FDII9evWQ/KO0CfciDAQz8GHfWVg05hH1/GrXpkPGGIL4wcgXRJDejEaG1t7Xz58iUBBL5OcANc3gXoBrTr2x/V9zcQP1OQ8Se4X6T4hSUGzP/uiR8ZULvciLw9kEc5/Mp9MxGpB/b28dNWGLwJUAVAA2MYbhtlvWY4KD1T5wK2lNDRhlGYWXUjkA0ZC2hVd/QETa0WJaJ%2bKTc3l8SYtLQ0FB8fj82%2bfxOk1WpPMwTg3DMl47UrbHb%2biPr76lFMcP53XBKL0cvGN2AQF3DUucBSQMqhA7/PlRx1pq9T1I8hwRiwF2APmIrLrmaIqNqWJlLf1d21E3AT4NWt7braoem4Wt9Q793QWO/9vPa59%2bNS%2bc%2bqZtWl56rqiFrVUx4odAGUvwlYhfvXqFpYvWPAT8kZX5e8UFbJnteVnIh94MCUd2u1b3YBxg3wYAK2Fe27/RsagtM6iMTbYQX%2bqW5v50Bdb2wFOAP%2bSvbjkEADhsSVPrcpc68bOgKu3/4RsIDI1259ucTz2hgs7%2bQeIhbg8utK0z1319ruvrtmLWDdnnvsda7BtgC7DW5hDtZHIzet3x9kbekW5HTqaOjWkg3eJlOZeRfCWYBR/kBEzPLMyup0DRQ0dWhQmxahDpATy57EfhsUMZ%2bx6ilnLg99bw0ICChPh%2bDzCIJOY2MjkhUUEPNrV6tJVH727BnKzM52J8GsS9vje/tiYqlRlM7qVtwN3r46UjgSy1ZBEbO3ITQCy2aHTlG9t7HBIBNWkYEuxh6ccz56n0VeVaohPgy9aKmhLySlk7o9YVGm5U0qEkQSHpd3Qkzozqp62pVaUYnjBip4Xte6yPuXybjtqbhketAgiHcC/NNI23VzpK77TMAPuY8kkupckaiosry8pLigoATnT8rKSlISEwvyHj6sy83K3EW2Mw/3ETCGYRx2gc/JglOTJn0xzXSri7v52StrrYL5c2dt/teOyZ/NXTR13pckdoyZMIfyELhQpyOdAS56gMzHcCG5O3y78136TBrX4XRXLCUEnElIMW/t6kZSRa3mVo5YG5hfgAIkMuSfK9EqVC3dDa/a1Hb%2b3Bm4LZA2KAEsfTywBDREO9oeE3/v6pB/5PC2vMOuHJHrPo7kh8OcAJv1HAFnC6fox2Mc2YkjX6e77NgssLO2hz5OAJv7NtYk%2bHw6w2zJlBlmLmMNxhmbWFjbTF%2b2/ugnxqb2U0wWmEC5JeRGuN2o0bOwkrQ735lMTEcGQ4IOOOF6kFnMN879c/NZ%2blVdWN%2buRm0aTfd9ySMtKK%2b9kyfVxpSUarEFPG1Wtdn7c6fjtucS0%2bhB40CP7GhrJtzsNA3LbIoysKIo1vGJE1jg4bpzuiCCBY7IWggI3uVsIDq03wC2QxYmcfmcxeQHU2Ys4ICS5Jg8cbzJ5MmfzTk%2bdaHVcFJnsmA24EMs7zj7Vc%2bETmMiIl1osASSDwRcRwgBa7krfsRYwCKVphNVNjZ1wtaHLYBYATdfpgXltfWvXrXb%2bQWYDG4B%2btMbE8TeJY35/G%2b0XsnVgIVTps83Mp65cBGsujN8TwOMBiwFGPZSfBKs8OSh/gMrj5N3uoiJAfPq1BpUC1ZwPTOn86YorxvDJ%2bth5wsgpqy%2boXO%2b141PibXEJ7/ZApqrq0jeWl8/CV92GhsaLNVq9QqQe9Dd1YVzS8BKwDLmPKCMjqIWzzYn/Y1nLMQkTAWYAz4ynrkAf39BSDExG/FaeZfZYM4KIOEcYBXAEeAEZRiO%2bhzDAbAFMJ9xgY3%2b13uCtkdCii0EvoLOXmcFfGKCQJhzLCZhJRNwbf0CBjsJ6lb/zml3osxlL69v0uBoKoiKQuVw9i4rLUVFhYWouKiIDC6FgwocY1GOSPQqJjRkLO4Tf/wIq5izkaJGz/jNVbRwWkXrfdsAYAVKmwPeB0LG6jGuH3DZeMAonRXoYgG1eG3vncsQVv5QqbKhobhOWXM1Pdv5rW6ODAlwfhueEBKyWyyTNYhyc2tKysoUsqJiRYZIpMjNz1dU1dQo0rOya5LT05UpGRlF/ggZ9bnsJMRRqVk59HlPb9bhI6dYvEghLZUV0pe8brC8rv3CSkrJIPu3p%2bD733dpu38T96fhFElrNR106QslHVtSOoypn3XpmvH4Uxd7bouRRfJhrZpO%2bvbNmzTcNUjf9vZ2WqVS9bIAR/0usNHeItrB5lnazm/Pl/3s9V3RxXOHJWfc3Yo9L7jJL//kJj3r4ZZ02JXIZVevuD2%2bdNE1fsvGTTEONpsgCNqDPPJtlOGcWYOtgIV3gtdbYa/tUP99JOwflCfvh//Nm0JMr/s7KI/38028tVazybGaot7bRlFG6wGWACzfA6wBwC5gtA4Qab1mpHCj/aj4zU4j9YMOA3wA%2bMsgwHWjmUnUND3p2dtP6wNc/4RvkDjJ5XJDuCy9aWyMD/XoU7579%2b7%2bcxg%2b4G7wruns2bMb4LpbExoaWnznzh05XF/lcXFx8sTERHl4eHhJREREBdzts2AChkP1zxs3bpCT5q1bt%2bxOnjxZLZVKi4ODg%2bVQLg8KCpLfv39fzufz5XB1lkskEjmXy5VHRUXJPT098T/lhYWFctz%2bypUrcvh/8b179xRQf6bPXYAhAU6ELBwPYh1f3xGGAp%2brXgb6I/QO/LARHR2NEhISEKwaEgqFKDk5GQERCIjA93t8tTUaKgGRkZFkbBjTJTAwEIEy5LEElCA5kI3fCpD%2bsQTxeDzyfuDr64sEAgGCKzVqa2sj7UNCQsibA8yBO%2bBW2JcQ27fxJ5Y%2bx%2b%2bFQkAYgNcP4YAogD9YxrChEtBrbLz9xsBFbaCxhwrcNw6w9//%2bUAmu8Oc/gvYb87/Et3ZcbylvTgAAAABJRU5ErkJggg==' /%3e%3c/svg%3e"}}}]);