(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{UQSp:function(t,n,a){"use strict";n.a={name:"VueRemarkRoot",render:function(t){return t("div",null,this.$slots.default)}}},uEIi:function(t,n,a){"use strict";a.r(n);var s=a("7uw+"),e=a("UQSp"),i=a("oCYn");function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}i.default.config.optionMergeStrategies;var r={VueRemarkRoot:e.a},c=function(t){var n=t.options.components=t.options.components||{},a=t.options.computed=t.options.computed||{};Object.keys(r).forEach((function(t){"object"===o(r[t])&&"function"==typeof r[t].render||"function"==typeof r[t]&&"function"==typeof r[t].options.render?n[t]=r[t]:a[t]=function(){return r[t]}}))},v=i.default.config.optionMergeStrategies,p="__vueRemarkFrontMatter",u={excerpt:null,"tree-title":"infra-mgr",weight:10,repo_owner:"th2-net",repo:"th2-infra-mgr",related:[{name:"th2-net/th2-infra",icon:"mdi-github",href:"https://github.com/th2-net/th2-infra"}],title:"th2-infra-mgr"};var l=function(t){t.options[p]&&(t.options[p]=u),i.default.util.defineReactive(t.options,p,u),t.options.computed=v.computed({$frontmatter:function(){return t.options[p]}},t.options.computed)},_=Object(s.a)({},(function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("VueRemarkRoot",[a("h1",{attrs:{id:"th2-infra-mgr"}},[a("a",{attrs:{href:"#th2-infra-mgr","aria-hidden":"true"}},[t._v("#")]),t._v("th2-infra-mgr")]),a("p",[a("strong",[t._v("infra-mgr")]),t._v(" (th2 Infrastructure manager) is one of the th2 "),a("a",{attrs:{href:".."}},[t._v("infra components")]),t._v(". \nIt is installed alongside with the th2 framework infrastructure. \nBasically, "),a("strong",[t._v("infra-mgr")]),t._v(" is the of middle steps of interaction between the user and the Kubernetes cluster.")]),a("h2",{attrs:{id:"functionality"}},[a("a",{attrs:{href:"#functionality","aria-hidden":"true"}},[t._v("#")]),t._v("Functionality")]),a("p",[t._v("The th2 infra components control all infrastructure of th2 environments, from RabbitMQ exchanges to Kubernetes Pods."),a("br"),t._v("\nAs for "),a("strong",[t._v("infra-mgr")]),t._v(", it interacts with the "),a("strong",[t._v("infra-schema")]),t._v(", "),a("strong",[t._v("infra-editor")]),t._v(", and with Kubernetes cluster during process of changing th2 environment. ")]),a("img",{pre:!0,attrs:{src:"https://www.plantuml.com/plantuml/png/VPB1QiCm38RlUWgTDXYui5qsoYY5ibFPfTVIWs8hYMbi5rc5zUsdD5tRmLWk3fy_IR-nbrL9z9W66BXLr88IkrunH66liMI0hVOlBkPMo768MWJV7mwSVHmMEwIA4xpNKZSvKakU72FGbY6mOFKz9y8jtFm9WRCFclB55NmHXX3F2KYYaI7cVOLhV-TBRcCtErdo7PYVLSg0wsF3abcj008fDLGPLrGhvI04S3c04xSOC-4SFunSCi58tD6sBXddk64AV-1LISdAV4-v6qUT3HDkuqtwf4mTOwR4zK3UlF-qrURn9bmJsoXXKiOzdwOcJm2v66YAQabOshlZ8Qv_D2HXzEVQWBRHdF3t_SGy0doUlQ8Ls_e6RElO6vRsPq_Y6m00"}}),a("p",[a("strong",[t._v("infra-mgr")]),t._v(" receives necessary information about th2 environment from an "),a("strong",[t._v("infra-schema")]),t._v(" which describes a target state of cluster via a set of "),a("code",{pre:!0},[t._v(".yaml")]),t._v(" config files.")]),a("p",[a("strong",[t._v("infra-schemas")]),t._v(" in th2 can be vizualized in "),a("strong",[t._v("infra-editor")]),t._v(", a web-based GUI for working with th2 states. \nWhen the user saves a new state in GUI, it changes a corresponding "),a("strong",[t._v("infra-schema")]),t._v(". \nOnce updated, the "),a("strong",[t._v("infra-schema")]),t._v(" is applied by the same workflow as if it was changed manually.")]),a("h3",{attrs:{id:"infra-schema"}},[a("a",{attrs:{href:"#infra-schema","aria-hidden":"true"}},[t._v("#")]),t._v("Infra schema")]),a("p",[a("strong",[t._v("infra-mgr")]),t._v(" continiously monitors the "),a("strong",[t._v("infra-schema")]),t._v(" for updates. \nAlso, it can apply changes to the "),a("strong",[t._v("infra-schema")]),t._v(", in some configuration cases.")]),a("h3",{attrs:{id:"kubernetes-cluster"}},[a("a",{attrs:{href:"#kubernetes-cluster","aria-hidden":"true"}},[t._v("#")]),t._v("Kubernetes cluster")]),a("p",[t._v("Depending on the configuration for th2 environment, "),a("strong",[t._v("infra-mgr")]),t._v(" can commit 3 types of changes in the Kubernetes cluster:")]),a("ol",[a("li",[t._v("Create namespaces for each th2 environment;")]),a("li",[t._v("Create basic ConfigMaps for th2 environments;")]),a("li",[t._v("Apply th2 Custom Resources which will be fetched by "),a("strong",[t._v("infra-operator")]),t._v(";")]),a("li",[t._v("Delete existing custom resources.")])]),a("h3",{attrs:{id:"cassandra"}},[a("a",{attrs:{href:"#cassandra","aria-hidden":"true"}},[t._v("#")]),t._v("Cassandra")]),a("p",[t._v("When a new th2 environment is created, "),a("strong",[t._v("infra-mgr")]),t._v(" generates a special config map for the Cassandra database. \nThis new config map is then used by "),a("strong",[t._v("estore")]),t._v(" or "),a("strong",[t._v("mstore")]),t._v(" to create a new keyspace in the Cassandra database for storing messages and events. ")]),a("notice",{attrs:{info:""}},[a("p",[a("strong",[t._v("infra-mgr")]),t._v(" creates keyspaces directly on Cassandra only in th2 of versions 1.7 and 1.8.")])]),a("h2",{attrs:{id:"configuration"}},[a("a",{attrs:{href:"#configuration","aria-hidden":"true"}},[t._v("#")]),t._v("Configuration")]),a("p",[a("strong",[t._v("infra-mgr")]),t._v(" can be configured on the th2 cluster level and th2 environment level.")]),a("h3",{attrs:{id:"th2-cluster"}},[a("a",{attrs:{href:"#th2-cluster","aria-hidden":"true"}},[t._v("#")]),t._v("th2 cluster")]),a("p",[t._v("Settings for "),a("strong",[t._v("infra-mgr")]),t._v(" should be defined in the section of special config map, which is applied during th2-infra installation to the Kubernetes cluster.")]),a("p",[t._v("Example provides default values for configuration.")]),a("div",{staticClass:"remark-highlight"},[a("pre",{staticClass:"language-yaml"},[a("code",{staticClass:"language-yaml"},[a("span",{staticClass:"token comment"},[t._v("# service.values.yaml")]),t._v("\n"),a("span",{staticClass:"token comment"},[t._v("# ...")]),t._v("\n"),a("span",{staticClass:"token key atrule"},[t._v("infraMgr")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v("image")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("repository")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" ghcr.io/th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("net/th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("infra"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("mgr\n    "),a("span",{staticClass:"token key atrule"},[t._v("tag")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" 1.1.1\n  "),a("span",{staticClass:"token key atrule"},[t._v("git")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("secretName")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" infra"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("mgr\n    "),a("span",{staticClass:"token key atrule"},[t._v("privateKeyFileSecret")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" infra"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("mgr\n    "),a("span",{staticClass:"token key atrule"},[t._v("secretMountPath")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" /home/service/keys\n    "),a("span",{staticClass:"token key atrule"},[t._v("repository")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" git@github.com"),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("net/th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("demo"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("configuration.git\n    "),a("span",{staticClass:"token key atrule"},[t._v("repositoryLocalCache")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" /home/service/repository\n    "),a("span",{staticClass:"token key atrule"},[t._v("httpAuthUsername")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('""')]),t._v(" "),a("span",{staticClass:"token comment"},[t._v("#should be stored in secret th2-git-access-schemas ")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("httpAuthPassword")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('""')]),t._v(" "),a("span",{staticClass:"token comment"},[t._v("#should be stored in secret th2-git-access-schemas")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v("rabbitmq")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("vHostPrefix")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("usernamePrefix")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("user"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("secret")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" rabbitmq\n    "),a("span",{staticClass:"token key atrule"},[t._v("passwordLength")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token number"},[t._v("24")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v("cassandra")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("keyspacePrefix")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" schema_\n    "),a("span",{staticClass:"token key atrule"},[t._v("secret")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" cassandra\n  "),a("span",{staticClass:"token key atrule"},[t._v("kubernetes")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("namespacePrefix")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"th2-"')]),t._v(" "),a("span",{staticClass:"token comment"},[t._v("# must be not more than 5 symbols")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("ingress")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" ingress"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("rules\n    "),a("span",{staticClass:"token key atrule"},[t._v("configMaps")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("logging")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" logging"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("config"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("template\n      "),a("span",{staticClass:"token key atrule"},[t._v("rabbitmq")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" rabbit"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("mq"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("app"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("config\n      "),a("span",{staticClass:"token key atrule"},[t._v("rabbitmq-ext")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" rabbit"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("mq"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("external"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("app"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("config\n      "),a("span",{staticClass:"token key atrule"},[t._v("cassandra")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" cradle\n      "),a("span",{staticClass:"token key atrule"},[t._v("cassandra-ext")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" cradle"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("external\n      "),a("span",{staticClass:"token key atrule"},[t._v("prometheus")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" prometheus"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("app"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("config\n    "),a("span",{staticClass:"token key atrule"},[t._v("secrets")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("core \n    "),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("solution\n    "),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v(" th2"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("proprietary\n"),a("span",{staticClass:"token comment"},[t._v("# ...")]),t._v("\n")])]),a("copy-code-btn")],1),a("h3",{attrs:{id:"git-authorization"}},[a("a",{attrs:{href:"#git-authorization","aria-hidden":"true"}},[t._v("#")]),t._v("Git authorization")]),a("p",[a("strong",[t._v("infra-mgr")]),t._v(" supports several ways of authorization on the git service:")]),a("ol",[a("li",[t._v("SSH key (default) - private SSH key should be stored in the special Kubernetes secret. With this key app is authorized on the git service.")]),a("li",[t._v("HTTP credentials - fill appropriate fields to authorize on the git service with your login and password.")]),a("li",[t._v("Personal access token - to authorize with your PAT, put it to "),a("code",{pre:!0},[t._v("httpAuthUsername")]),t._v(" field for GitHub or to  "),a("code",{pre:!0},[t._v("httpAuthPassword")]),t._v(" field for GitLab.")])]),a("h3",{attrs:{id:"th2-environment"}},[a("a",{attrs:{href:"#th2-environment","aria-hidden":"true"}},[t._v("#")]),t._v("th2 environment")]),a("p",[a("code",{pre:!0},[t._v("infra-mgr-config.yml")]),t._v(" is a configuration file specifying the type of synchronization between Git and Kubernetes. \nThere are 4 synchronization options:")]),a("ol",[a("li",[a("code",{pre:!0},[t._v("off")]),t._v(" - No synchronization will be done;")]),a("li",[a("code",{pre:!0},[t._v("deny")]),t._v(" - No synchronization will be done and associated namespaces will be removed from Kubernetes;")]),a("li",[a("code",{pre:!0},[t._v("sync")]),t._v(" - Synchronizes repository changes with Kubernetes;")]),a("li",[a("code",{pre:!0},[t._v("rule")]),t._v(" - Synchronizes repository changes with Kubernetes, watches resource changes in it and brings those changes back to the repository state.")])]),a("notice",{attrs:{info:""}},[a("p",[t._v("Configuration is done in "),a("code",{pre:!0},[t._v("infra-mgr-config.yml")]),t._v(" for each th2 environment. ")])]),a("div",{staticClass:"remark-highlight"},[a("pre",{staticClass:"language-yaml"},[a("code",{staticClass:"language-yaml"},[a("span",{staticClass:"token comment"},[t._v("# infra-mgr-config.yml")]),t._v("\n"),a("span",{staticClass:"token key atrule"},[t._v("kind")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" SettingsFile\n"),a("span",{staticClass:"token key atrule"},[t._v("metadata")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v("name")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" infra"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("mgr"),a("span",{staticClass:"token punctuation"},[t._v("-")]),t._v("config\n"),a("span",{staticClass:"token key atrule"},[t._v("spec")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n  "),a("span",{staticClass:"token key atrule"},[t._v("k8s-propagation")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" off\n  "),a("span",{staticClass:"token key atrule"},[t._v("th2BoxConfig")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("logging")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("logLevelTh2")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" INFO\n      "),a("span",{staticClass:"token key atrule"},[t._v("logLevelRoot")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" INFO\n    "),a("span",{staticClass:"token key atrule"},[t._v("mqRouter")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("connectionTimeout")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"-1"')]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("connectionCloseTimeout")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"10000"')]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("maxRecoveryAttempts")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"5"')]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("minConnectionRecoveryTimeout")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"10000"')]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("maxConnectionRecoveryTimeout")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"10000"')]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("prefetchCount")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"10"')]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("grpcRouter")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("workers")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"5"')]),t._v("\n    "),a("span",{staticClass:"token key atrule"},[t._v("cradleManager")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("cradleMaxEventBatchSize")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"1048576"')]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("cradleMaxMessageBatchSize")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"1048576"')]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("timeout")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"5000"')]),t._v("\n      "),a("span",{staticClass:"token key atrule"},[t._v("pageSize")]),a("span",{staticClass:"token punctuation"},[t._v(":")]),t._v(" "),a("span",{staticClass:"token string"},[t._v('"5000"')]),t._v("\n")])]),a("copy-code-btn")],1)],1)}),[],!1,null,null,null);"function"==typeof c&&c(_),"function"==typeof l&&l(_);n.default=_.exports}}]);