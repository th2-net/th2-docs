(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{"2uev":function(t,n,e){"use strict";e.r(n);var a=e("7uw+"),s=e("UQSp"),o=e("oCYn");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}o.default.config.optionMergeStrategies;var r={VueRemarkRoot:s.a},p=function(t){var n=t.options.components=t.options.components||{},e=t.options.computed=t.options.computed||{};Object.keys(r).forEach((function(t){"object"===i(r[t])&&"function"==typeof r[t].render||"function"==typeof r[t]&&"function"==typeof r[t].options.render?n[t]=r[t]:e[t]=function(){return r[t]}}))},v=o.default.config.optionMergeStrategies,c="__vueRemarkFrontMatter",u={excerpt:null,weight:0,title:"Overview"};var _=function(t){t.options[c]&&(t.options[c]=u),o.default.util.defineReactive(t.options,c,u),t.options.computed=v.computed({$frontmatter:function(){return t.options[c]}},t.options.computed)},l=Object(a.a)({},(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("VueRemarkRoot",[e("h1",{attrs:{id:"overview"}},[e("a",{attrs:{href:"#overview","aria-hidden":"true"}},[t._v("#")]),t._v("Overview")]),e("p",[e("strong",[t._v("estore")]),t._v(" is one of the core components in the th2 environment. \nIt is responsible for storing events into "),e("term",{attrs:{term:"Cradle"}},[t._v("Cradle")]),t._v(". \nSending events to "),e("strong",[t._v("estore")]),t._v(" from other components is possible via special methods from the "),e("term",{attrs:{term:"th2-common"}},[t._v("th2-common")]),t._v(" library.")],1),e("h2",{attrs:{id:"functionality"}},[e("a",{attrs:{href:"#functionality","aria-hidden":"true"}},[t._v("#")]),t._v("Functionality")]),e("h3",{attrs:{id:"events"}},[e("a",{attrs:{href:"#events","aria-hidden":"true"}},[t._v("#")]),t._v("Events")]),e("p",[t._v("Event is a fundamental unit of data stored and processed by th2. \nTest execution data as well as information related to the work of all th2 components are presented via events hierarchy. \nEvery event in th2 consists of important parts:")]),e("ul",[e("li",[e("code",{pre:!0},[t._v("id")]),t._v(" - unique identifier (in UUID format) within the th2.")]),e("li",[e("code",{pre:!0},[t._v("parentId")]),t._v(" - optional link to a parent event.")]),e("li",[e("code",{pre:!0},[t._v("description")]),t._v(" - set of fields for short descriptions.")]),e("li",[e("code",{pre:!0},[t._v("body")]),t._v(" - useful data in JSON format.")]),e("li",[e("code",{pre:!0},[t._v("attachedMessageIDs")]),t._v(" - the list of message IDs that are linked to the event.")])]),e("h3",{attrs:{id:"how-to-send-events-to-estore"}},[e("a",{attrs:{href:"#how-to-send-events-to-estore","aria-hidden":"true"}},[t._v("#")]),t._v("How to send events to estore")]),e("p",[t._v("You can create "),e("code",{pre:!0},[t._v("Event")]),t._v(" object in th2 component with "),e("code",{pre:!0},[t._v("th2-common-py")]),t._v(" library.")]),e("p",[t._v("Put primary event data to variables. Maybe you will need it in the future.")]),e("div",{staticClass:"remark-highlight"},[e("pre",{staticClass:"language-py"},[e("code",{staticClass:"language-py"},[t._v("root_event_id "),e("span",{staticClass:"token operator"},[t._v("=")]),t._v(" EventID"),e("span",{staticClass:"token punctuation"},[t._v("(")]),e("span",{staticClass:"token builtin"},[t._v("id")]),e("span",{staticClass:"token operator"},[t._v("=")]),e("span",{staticClass:"token builtin"},[t._v("str")]),e("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("uuid1"),e("span",{staticClass:"token punctuation"},[t._v("(")]),e("span",{staticClass:"token punctuation"},[t._v(")")]),e("span",{staticClass:"token punctuation"},[t._v(")")]),e("span",{staticClass:"token punctuation"},[t._v(")")]),t._v("\n\nstart_timestamp "),e("span",{staticClass:"token operator"},[t._v("=")]),t._v(" Timestamp"),e("span",{staticClass:"token punctuation"},[t._v("(")]),e("span",{staticClass:"token punctuation"},[t._v(")")]),t._v("\nstart_timestamp"),e("span",{staticClass:"token punctuation"},[t._v(".")]),t._v("FromDatetime"),e("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("datetime"),e("span",{staticClass:"token punctuation"},[t._v(".")]),t._v("now"),e("span",{staticClass:"token punctuation"},[t._v("(")]),e("span",{staticClass:"token punctuation"},[t._v(")")]),e("span",{staticClass:"token punctuation"},[t._v(")")]),t._v("\n")])]),e("copy-code-btn")],1),e("p",[t._v("Create "),e("code",{pre:!0},[t._v("Event")]),t._v(" object.")]),e("div",{staticClass:"remark-highlight"},[e("pre",{staticClass:"language-py"},[e("code",{staticClass:"language-py"},[t._v("root_event "),e("span",{staticClass:"token operator"},[t._v("=")]),t._v(" Event"),e("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("\n   "),e("span",{staticClass:"token builtin"},[t._v("id")]),e("span",{staticClass:"token operator"},[t._v("=")]),t._v("root_event_id"),e("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n   parent_id"),e("span",{staticClass:"token operator"},[t._v("=")]),e("span",{staticClass:"token boolean"},[t._v("None")]),e("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n   start_timestamp"),e("span",{staticClass:"token operator"},[t._v("=")]),t._v("start_timestamp"),e("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n   "),e("span",{staticClass:"token comment"},[t._v('# end_timestamp="",')]),t._v("\n   status"),e("span",{staticClass:"token operator"},[t._v("=")]),t._v("EventStatus"),e("span",{staticClass:"token punctuation"},[t._v(".")]),t._v("SUCCESS"),e("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n   name"),e("span",{staticClass:"token operator"},[t._v("=")]),e("span",{staticClass:"token string"},[t._v('"Test Event"')]),e("span",{staticClass:"token punctuation"},[t._v(",")]),t._v("\n   body"),e("span",{staticClass:"token operator"},[t._v("=")]),e("span",{staticClass:"token string"},[t._v('b""')]),t._v("\n"),e("span",{staticClass:"token punctuation"},[t._v(")")]),t._v("\n")])]),e("copy-code-btn")],1),e("p",[t._v("Create "),e("code",{pre:!0},[t._v("EventBatch")]),t._v(" object and send it using event router.")]),e("div",{staticClass:"remark-highlight"},[e("pre",{staticClass:"language-py"},[e("code",{staticClass:"language-py"},[t._v("event_batch "),e("span",{staticClass:"token operator"},[t._v("=")]),t._v(" EventBatch"),e("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("parent_event_id"),e("span",{staticClass:"token operator"},[t._v("=")]),e("span",{staticClass:"token boolean"},[t._v("None")]),e("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" events"),e("span",{staticClass:"token operator"},[t._v("=")]),e("span",{staticClass:"token punctuation"},[t._v("[")]),t._v("root_event"),e("span",{staticClass:"token punctuation"},[t._v("]")]),e("span",{staticClass:"token punctuation"},[t._v(")")]),t._v("\nestore"),e("span",{staticClass:"token punctuation"},[t._v(".")]),t._v("send"),e("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("event_batch"),e("span",{staticClass:"token punctuation"},[t._v(")")]),t._v("\n")])]),e("copy-code-btn")],1)])}),[],!1,null,null,null);"function"==typeof p&&p(l),"function"==typeof _&&_(l);n.default=l.exports},UQSp:function(t,n,e){"use strict";n.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}}}]);