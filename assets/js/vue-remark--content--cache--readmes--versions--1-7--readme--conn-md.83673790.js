(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{Kgii:function(e,t,s){"use strict";s.r(t);var n=s("7uw+"),i=s("UQSp"),a=s("oCYn");function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}a.default.config.optionMergeStrategies;var r={VueRemarkRoot:i.a},c=function(e){var t=e.options.components=e.options.components||{},s=e.options.computed=e.options.computed||{};Object.keys(r).forEach((function(e){"object"===o(r[e])&&"function"==typeof r[e].render||"function"==typeof r[e]&&"function"==typeof r[e].options.render?t[e]=r[e]:s[e]=function(){return r[e]}}))},l=a.default.config.optionMergeStrategies,v="__vueRemarkFrontMatter",_={excerpt:null,weight:70,"tree-title":"conn",readme:"https://raw.githubusercontent.com/th2-net/th2-conn/master/README.md",title:"Connect (3.10.1)"};var h=function(e){e.options[v]&&(e.options[v]=_),a.default.util.defineReactive(e.options,v,_),e.options.computed=l.computed({$frontmatter:function(){return e.options[v]}},e.options.computed)},p=Object(n.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("VueRemarkRoot",[s("h1",{attrs:{id:"connect-3101"}},[s("a",{attrs:{href:"#connect-3101","aria-hidden":"true"}},[e._v("#")]),e._v("Connect (3.10.1)")]),s("p",[e._v('The "Connect" component is responsible for the communication with a target system.\nThis component implements the logic of the interaction protocol, receiving and sending messages from and to the system, respectively.')]),s("p",[e._v("This project includes only an adapter for using the Sailfish service in the th2 packed into a Docker Image.\nThis image should be used as a base to implement extensions with the real logic for specific protocols using services in the Sailfish format.")]),s("p",[e._v("As an example, the "),s("a",{attrs:{href:"https://github.com/th2-net/th2-conn-generic",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-conn-generic")]),e._v(" project implements the extension for connecting via FIX protocol using standard Sailfish's FIX service.")]),s("h2",{attrs:{id:"configuration"}},[s("a",{attrs:{href:"#configuration","aria-hidden":"true"}},[e._v("#")]),e._v("Configuration")]),s("p",[e._v("This configuration should be specified in the custom configuration block in schema editor.")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-shell"},[s("code",{staticClass:"language-shell"},[e._v("yaml\nsession-alias: "),s("span",{staticClass:"token string"},[e._v('"connectivity-alias"')]),e._v("\nworkspace: "),s("span",{staticClass:"token string"},[e._v('"/home/sailfish/workspace"')]),e._v("\ntype: "),s("span",{staticClass:"token string"},[e._v('"th2_service:Your_Service_Type"')]),e._v("\nname: "),s("span",{staticClass:"token string"},[e._v('"your_service"')]),e._v("\nsettings:\n  param1: "),s("span",{staticClass:"token string"},[e._v('"value1"')]),e._v("\n")])])]),s("p",[e._v("Parameters:")]),s("ul",[s("li",[e._v("session-alias - that session alias will be set for all messages received or sent by this component. "),s("strong",[e._v('It should be unique for each "Connect" component')]),e._v(";")]),s("li",[e._v("workspace - the folder inside the container that will contain a plugin adapted to use in the TH2;")]),s("li",[e._v("type - the service type from "),s("strong",[e._v("services.xml")]),e._v(" file. If service name from services.xml file contains "),s("code",{pre:!0},[e._v("-")]),e._v(" symbols they must be replaced with "),s("code",{pre:!0},[e._v("_")]),e._v(" symbol;")]),s("li",[e._v("name - the service name that will be displayed in the events inside the report;")]),s("li",[e._v("settings - the parameters that will be transformed to the actual service's settings specified in the "),s("strong",[e._v("services.xml")]),e._v(" file.")]),s("li",[e._v("maxMessageBatchSize - the limitation for message batch size which connect sends to the first and to the second publish pins with. The default value is set to 100.")]),s("li",[e._v("enableMessageSendingEvent - if this option is set to "),s("code",{pre:!0},[e._v("true")]),e._v(", connect sends a separate event for every message sent which incomes from the pin with the send attribute. The default value is set to true")])]),s("h2",{attrs:{id:"metrics"}},[s("a",{attrs:{href:"#metrics","aria-hidden":"true"}},[e._v("#")]),e._v("Metrics")]),s("p",[e._v("Connect component produces several metrics related to its activity.")]),s("ul",[s("li",[e._v("th2_conn_incoming_msg_quantity / th2_conn_outgoing_msg_quantity are counter type metrics which are incremented when a message is sent or received via the implemented protocol.  They contain the "),s("code",{pre:!0},[e._v("session_alias")]),e._v(" attribute.")])]),s("h2",{attrs:{id:"extension"}},[s("a",{attrs:{href:"#extension","aria-hidden":"true"}},[e._v("#")]),e._v("Extension")]),s("p",[e._v("You can add the ability to connect to a target system by implementing your own service in the Sailfish format and putting it together with its configuration to the correct places into the base image.")]),s("p",[e._v("You need to perform the following steps:")]),s("ol",[s("li",[s("p",[e._v("Create the implementation of the "),s("a",{attrs:{href:"https://github.com/exactpro/sailfish-core/blob/master/BackEnd/Core/sailfish-core/src/main/java/com/exactpro/sf/services/IService.java",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("com.exactpro.sf.services.IService")]),e._v(".\nThe examples of implementing this interface can be found "),s("a",{attrs:{href:"https://github.com/exactpro/sailfish-core/tree/master/BackEnd/Service",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("here")]),e._v(".\nIf the protocol is already implemented in the Sailfish services you can simply use the dependencies on the service's artifact for that protocol.")])]),s("li",[s("p",[e._v("Create the "),s("strong",[e._v("services.xml")]),e._v(' configuration file that contains the description for services you can use from that "Connect" component.\nYou can find the example '),s("a",{attrs:{href:"https://github.com/th2-net/th2-conn-generic/blob/master/conn-fix/src/main/plugin/cfg/services.xml",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("here")]),e._v(".\nThis file must contain:")]),s("ul",[s("li",[e._v('service name - the alias to use it from the "Connect" component;')]),s("li",[e._v("the full class name of the "),s("em",[e._v("com.exactpro.sf.services.IService")]),e._v(" interface implementation for the protocol;")]),s("li",[e._v("the full settings' class name for that protocol;")]),s("li",[e._v("the full validator's class name - the optional parameter. "),s("em",[e._v("Can be omitted")]),e._v(".")])])]),s("li",[s("p",[e._v("Create a file with "),s("strong",[e._v("VERSION")]),e._v(" in the following format (parameters "),s("em",[e._v("plugin_alias")]),e._v(" and "),s("em",[e._v("name")]),e._v(" can be customized, but you will need to use a different folder on step 4):")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-yaml"},[s("code",{staticClass:"language-yaml"},[s("span",{staticClass:"token key atrule"},[e._v("lightweight")]),s("span",{staticClass:"token punctuation"},[e._v(":")]),e._v(" "),s("span",{staticClass:"token boolean important"},[e._v("true")]),e._v("\n"),s("span",{staticClass:"token key atrule"},[e._v("plugin_alias")]),s("span",{staticClass:"token punctuation"},[e._v(":")]),e._v(" th2_service\n"),s("span",{staticClass:"token key atrule"},[e._v("name")]),s("span",{staticClass:"token punctuation"},[e._v(":")]),e._v(" th2_service\n"),s("span",{staticClass:"token key atrule"},[e._v("build_number")]),s("span",{staticClass:"token punctuation"},[e._v(":")]),e._v(" "),s("span",{staticClass:"token number"},[e._v("0")]),e._v("\n"),s("span",{staticClass:"token key atrule"},[e._v("revision")]),s("span",{staticClass:"token punctuation"},[e._v(":")]),e._v(" "),s("span",{staticClass:"token number"},[e._v("0")]),e._v("\n"),s("span",{staticClass:"token key atrule"},[e._v("git_hash")]),s("span",{staticClass:"token punctuation"},[e._v(":")]),e._v(" "),s("span",{staticClass:"token number"},[e._v("0")]),e._v("\n"),s("span",{staticClass:"token key atrule"},[e._v("branch")]),s("span",{staticClass:"token punctuation"},[e._v(":")]),e._v(" fake\n"),s("span",{staticClass:"token key atrule"},[e._v("version")]),s("span",{staticClass:"token punctuation"},[e._v(":")]),e._v(" 3.2.0.0\n"),s("span",{staticClass:"token key atrule"},[e._v("core_version")]),s("span",{staticClass:"token punctuation"},[e._v(":")]),e._v(" 3.2.0\n")])])])]),s("li",[s("p",[e._v("Create you own image based on the current one and put all the files in the correct places in the base image:")]),s("ul",[s("li",[e._v("Create the following directory - "),s("strong",[e._v("${workspace}/plugins/th2_service")]),e._v(".\n"),s("em",[s("strong",[e._v("${workspace}")])]),e._v(' - it is a folder from the "Connect" configuration.\nIf you use the '),s("em",[e._v("plugin_alias")]),e._v(" and "),s("em",[e._v("name")]),e._v(" different from "),s("em",[e._v("th2_service")]),e._v(" in the VERSION file correct the "),s("em",[e._v("th2_service")]),e._v(" folder name according to the value that you are using.\nLet's name that directory as "),s("strong",[e._v("PLUGIN_DIRECTORY")]),e._v(" for simplicity. This name will be used in future steps.")]),s("li",[e._v("Artifact with the service(s) implementation(s) and all its dependencies should be put into the following directory - "),s("strong",[e._v("${PLUGIN_DIRECTORY}/libs")]),e._v(".")]),s("li",[e._v("The configuration file created on the step 2 should be put into the following directory - "),s("strong",[e._v("${PLUGIN_DIRECTORY}/cfg")]),e._v(".")]),s("li",[e._v("The "),s("em",[e._v("VERSION")]),e._v(" file created on step 3 should be put into the following directory - "),s("strong",[e._v("${PLUGIN_DIRECTORY}/")]),e._v(".")])])])]),s("h2",{attrs:{id:"pins"}},[s("a",{attrs:{href:"#pins","aria-hidden":"true"}},[e._v("#")]),e._v("Pins")]),s("p",[e._v("Connect has 2 types of pins for interacting with th2 components.\nMessages that were received from / sent to the target system will be sent to the following queues:")]),s("ul",[s("li",[e._v("incoming raw messages")]),s("li",[e._v("outgoing raw messages")])]),s("p",[e._v('The "Connect" component uses a separate queue to send messages. The component subscribes to that pin at the start and waits for the messages.\nThe messages received from that pin will be sent to the target system.\nAlso, this component is responsible for maintaining connections and sessions in the cases where this is provided by the communication protocol.\nHere you can automatically send heartbeat messages, send a logon/logout, requests to retransmit messages in the event of a gap, etc.')]),s("h2",{attrs:{id:"custom-resources-for-infra-mgr"}},[s("a",{attrs:{href:"#custom-resources-for-infra-mgr","aria-hidden":"true"}},[e._v("#")]),e._v("Custom resources for infra-mgr")]),s("div",{staticClass:"remark-highlight"},[s("pre",{staticClass:"language-shell"},[s("code",{staticClass:"language-shell"},[e._v("yaml\napiVersion: th2.exactpro.com/v1\nkind: Th2GenericBox\nspec:\n  image-name: your.image.repo:42/your_image_name\n  image-version: "),s("span",{staticClass:"token number"},[e._v("1.0")]),e._v(".0\n  type: th2-conn\n  custom-config:\n    session-alias: "),s("span",{staticClass:"token string"},[e._v('"connectivity-alias"')]),e._v("\n    workspace: "),s("span",{staticClass:"token string"},[e._v('"/home/sailfish/workspace"')]),e._v("\n    type: "),s("span",{staticClass:"token string"},[e._v('"th2_service:Your_Service_Type"')]),e._v("\n    name: "),s("span",{staticClass:"token string"},[e._v('"your_service"')]),e._v("\n    maxMessageBatchSize: "),s("span",{staticClass:"token number"},[e._v("100")]),e._v("\n    enableMessageSendingEvent: "),s("span",{staticClass:"token boolean"},[e._v("true")]),e._v("\n    settings:\n      param1: "),s("span",{staticClass:"token string"},[e._v('"value1"')]),e._v("\n  pins:\n    - name: in_raw\n      connection-type: mq\n      attributes: "),s("span",{staticClass:"token punctuation"},[e._v("[")]),s("span",{staticClass:"token string"},[e._v('"first"')]),e._v(", "),s("span",{staticClass:"token string"},[e._v('"raw"')]),e._v(", "),s("span",{staticClass:"token string"},[e._v('"publish"')]),e._v(", "),s("span",{staticClass:"token string"},[e._v('"store"')]),s("span",{staticClass:"token punctuation"},[e._v("]")]),e._v("\n    - name: out_raw\n      connection-type: mq\n      attributes: "),s("span",{staticClass:"token punctuation"},[e._v("[")]),s("span",{staticClass:"token string"},[e._v('"second"')]),e._v(", "),s("span",{staticClass:"token string"},[e._v('"raw"')]),e._v(", "),s("span",{staticClass:"token string"},[e._v('"publish"')]),e._v(", "),s("span",{staticClass:"token string"},[e._v('"store"')]),s("span",{staticClass:"token punctuation"},[e._v("]")]),e._v("\n    - name: to_send\n      connection-type: mq\n      attributes: "),s("span",{staticClass:"token punctuation"},[e._v("[")]),s("span",{staticClass:"token string"},[e._v('"send"')]),e._v(", "),s("span",{staticClass:"token string"},[e._v('"raw"')]),e._v(", "),s("span",{staticClass:"token string"},[e._v('"subscribe"')]),s("span",{staticClass:"token punctuation"},[e._v("]")]),e._v("\n")])])]),s("h2",{attrs:{id:"release-notes"}},[s("a",{attrs:{href:"#release-notes","aria-hidden":"true"}},[e._v("#")]),e._v("Release notes")]),s("h3",{attrs:{id:"3101"}},[s("a",{attrs:{href:"#3101","aria-hidden":"true"}},[e._v("#")]),e._v("3.10.1")]),s("ul",[s("li",[e._v("Update "),s("code",{pre:!0},[e._v("sailfish-core")]),e._v(" version from "),s("code",{pre:!0},[e._v("3.2.1674")]),e._v(" to "),s("code",{pre:!0},[e._v("3.2.1741")]),s("ul",[s("li",[e._v("Add exception for checking the property in "),s("code",{pre:!0},[e._v("IMetadata")])])])]),s("li",[e._v("Added synchronization by processor to "),s("code",{pre:!0},[e._v("ServiceListener.onMessage()")]),e._v(" otherwise processor sometimes misses some sequences")]),s("li",[e._v("Added log about missed sequences")]),s("li",[e._v("Added trace log to flowable processor")])]),s("h3",{attrs:{id:"3100"}},[s("a",{attrs:{href:"#3100","aria-hidden":"true"}},[e._v("#")]),e._v("3.10.0")]),s("ul",[s("li",[e._v("Update "),s("code",{pre:!0},[e._v("th2-common")]),e._v(" version from "),s("code",{pre:!0},[e._v("3.25.1")]),e._v(" to "),s("code",{pre:!0},[e._v("3.33.0")])]),s("li",[e._v("Update "),s("code",{pre:!0},[e._v("org.jetbrains.kotlin.jvm")]),e._v(" version from "),s("code",{pre:!0},[e._v("1.3.72")]),e._v(" to "),s("code",{pre:!0},[e._v("1.5.30")])])]),s("h3",{attrs:{id:"390"}},[s("a",{attrs:{href:"#390","aria-hidden":"true"}},[e._v("#")]),e._v("3.9.0")]),s("ul",[s("li",[e._v("Update "),s("code",{pre:!0},[e._v("sailfish-core")]),e._v(" version from "),s("code",{pre:!0},[e._v("3.2.1650")]),e._v(" to "),s("code",{pre:!0},[e._v("3.2.1674")]),s("ul",[s("li",[e._v("Embedded Sailfish service based on MINA decodes the message as sender during sending. This approach is important for protocols in which a pair of messages have the same protocol message type and different structures depending on the direction. ")])])]),s("li",[e._v("Update "),s("code",{pre:!0},[e._v("th2-common")]),e._v(" version from "),s("code",{pre:!0},[e._v("3.16.5")]),e._v(" to "),s("code",{pre:!0},[e._v("3.25.1")])]),s("li",[e._v("Update "),s("code",{pre:!0},[e._v("th2-sailfish-utils")]),e._v(" version from "),s("code",{pre:!0},[e._v("3.4.0")]),e._v(" to "),s("code",{pre:!0},[e._v("3.8.0")])])]),s("h3",{attrs:{id:"381"}},[s("a",{attrs:{href:"#381","aria-hidden":"true"}},[e._v("#")]),e._v("3.8.1")]),s("ul",[s("li",[e._v("Netty services do not copy metadata to the "),s("code",{pre:!0},[e._v("IMessage")]),e._v(" when sending one. This problem was fixed and now they copy metadata.")])]),s("h3",{attrs:{id:"380"}},[s("a",{attrs:{href:"#380","aria-hidden":"true"}},[e._v("#")]),e._v("3.8.0")]),s("ul",[s("li",[e._v("Disable waiting for connection recovery when closing the "),s("code",{pre:!0},[e._v("SubscribeMonitor")])])]),s("h3",{attrs:{id:"372"}},[s("a",{attrs:{href:"#372","aria-hidden":"true"}},[e._v("#")]),e._v("3.7.2")]),s("ul",[s("li",[e._v("Update Sailfish version to 3.2.1603")])]),s("h3",{attrs:{id:"371"}},[s("a",{attrs:{href:"#371","aria-hidden":"true"}},[e._v("#")]),e._v("3.7.1")]),s("ul",[s("li",[e._v("Update Sailfish version to 3.2.1572 (unwraps the EvolutionBatch when sending raw message)")])]),s("h3",{attrs:{id:"370"}},[s("a",{attrs:{href:"#370","aria-hidden":"true"}},[e._v("#")]),e._v("3.7.0")]),s("ul",[s("li",[e._v("Added maxMessageBatchSize option to configure limitation of message batch size ")]),s("li",[e._v("Added enableMessageSendingEvent option to manage the event emitted related to sent messages")]),s("li",[e._v("Produce th2_conn_incoming_msg_quantity / th2_conn_outgoing_msg_quantity metrics")])]),s("h3",{attrs:{id:"361"}},[s("a",{attrs:{href:"#361","aria-hidden":"true"}},[e._v("#")]),e._v("3.6.1")]),s("ul",[s("li",[e._v("Use release version for sailfish-core")]),s("li",[e._v("An alert is sent if it gets an ErrorMessage when sending raw message")]),s("li",[e._v("Copies message properties from the th2 proto Message to Sailfish IMessage when converting")])]),s("h3",{attrs:{id:"360"}},[s("a",{attrs:{href:"#360","aria-hidden":"true"}},[e._v("#")]),e._v("3.6.0")]),s("ul",[s("li",[e._v("resets embedded log4j configuration before configuring it from a file")])]),s("h3",{attrs:{id:"351"}},[s("a",{attrs:{href:"#351","aria-hidden":"true"}},[e._v("#")]),e._v("3.5.1")]),s("ul",[s("li",[e._v("removed gRPC event loop handling")]),s("li",[e._v("fixed dictionary reading")])]),s("h3",{attrs:{id:"350"}},[s("a",{attrs:{href:"#350","aria-hidden":"true"}},[e._v("#")]),e._v("3.5.0")]),s("ul",[s("li",[e._v("reads dictionaries from the /var/th2/config/dictionary folder.")]),s("li",[e._v("uses mq_router, grpc_router, cradle_manager optional JSON configs from the /var/th2/config folder")]),s("li",[e._v("tries to load log4j.properties files from sources in order: '/var/th2/config', '/home/etc', configured path via cmd, default configuration")]),s("li",[e._v("update Cradle version. Introduce async API for storing events")])]),s("h3",{attrs:{id:"341"}},[s("a",{attrs:{href:"#341","aria-hidden":"true"}},[e._v("#")]),e._v("3.4.1")]),s("ul",[s("li",[e._v("Netty:"),s("ul",[s("li",[e._v("Fix incorrect timeout information in "),s("code",{pre:!0},[e._v("SendMessageFailedException")])])])])]),s("h3",{attrs:{id:"340"}},[s("a",{attrs:{href:"#340","aria-hidden":"true"}},[e._v("#")]),e._v("3.4.0")]),s("ul",[s("li",[e._v("Validates configured dictionaries during initialization")])]),s("h3",{attrs:{id:"331"}},[s("a",{attrs:{href:"#331","aria-hidden":"true"}},[e._v("#")]),e._v("3.3.1")]),s("ul",[s("li",[e._v("Support for sending raw messages via Netty services")])]),s("h3",{attrs:{id:"330"}},[s("a",{attrs:{href:"#330","aria-hidden":"true"}},[e._v("#")]),e._v("3.3.0")]),s("ul",[s("li",[e._v("Copies the parent event ID from the original raw message to the actual one;")]),s("li",[e._v("Joins all related "),s("code",{pre:!0},[e._v("IMessage")]),e._v("s to a single raw message;")]),s("li",[e._v("Messages that were sent using this connectivity but did not have any parent event ID\nare attached to the dedicated event for this connectivity.")])])])}),[],!1,null,null,null);"function"==typeof c&&c(p),"function"==typeof h&&h(p);t.default=p.exports},UQSp:function(e,t,s){"use strict";t.a={name:"VueRemarkRoot",render:function(e){return e("div",null,this.$slots.default)}}}}]);