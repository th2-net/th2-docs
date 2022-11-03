(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{UQSp:function(e,t,r){"use strict";t.a={name:"VueRemarkRoot",render:function(e){return e("div",null,this.$slots.default)}}},sAsY:function(e,t,r){"use strict";r.r(t);var o=r("7uw+"),n=r("UQSp"),a=r("oCYn");function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}a.default.config.optionMergeStrategies;var i={VueRemarkRoot:n.a},h=function(e){var t=e.options.components=e.options.components||{},r=e.options.computed=e.options.computed||{};Object.keys(i).forEach((function(e){"object"===s(i[e])&&"function"==typeof i[e].render||"function"==typeof i[e]&&"function"==typeof i[e].options.render?t[e]=i[e]:r[e]=function(){return i[e]}}))},c=a.default.config.optionMergeStrategies,l="__vueRemarkFrontMatter",f={excerpt:null,weight:0,title:"Architecture"};var p=function(e){e.options[l]&&(e.options[l]=f),a.default.util.defineReactive(e.options,l,f),e.options.computed=c.computed({$frontmatter:function(){return e.options[l]}},e.options.computed)},u=Object(o.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("VueRemarkRoot",[r("h1",{attrs:{id:"architecture"}},[r("a",{attrs:{href:"#architecture","aria-hidden":"true"}},[e._v("#")]),e._v("Architecture")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2")]),e._v(", a framework for automation in software testing, is designed as a set of microservices that is build out of a number of repositories. ")]),r("p",[e._v("For the open-sourced part of th2, these repositories are created and maintained on GitHub. \nThe organizational structure of th2-related code is explained in the subsection "),r("a",{attrs:{href:"../th2-net-on-github"}},[e._v("th2-net on GitHub")]),e._v(". \nDependencies schema is provided "),r("a",{attrs:{href:"https://raw.githubusercontent.com/d0rich/th2-dependencies/master/output/schema.svg",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("here")]),e._v(". \nMain component groups and their current status on GitHub can be seen on the "),r("a",{attrs:{href:"../th2-net-on-github/dashboard"}},[e._v("Dashboard")]),e._v(".")]),r("p",[e._v("From the functional perspective, the framework consists of the following blocks:")]),r("ul",[r("li",[r("p",[e._v("Infrastructure: a set of service components that facilitate th2 boxes' deployment and ensure the functioning of the th2 framework, its monitoring, and interaction between its components.  ")])]),r("li",[r("p",[e._v("Core: A set of components that are central to th2 framework as they ensure data storage and access to it, as well as provide capabilities to view and analyze test execution reports through a GUI.")])]),r("li",[r("p",[e._v("Modules: A set of components targeted at performing various actions that are commonly used in software testing; the capabilities of these components can be customized, and new th2 components may be created based on them to reflect the specifics of a client system or a test scenario.")])]),r("li",[r("p",[e._v("Data Services: A Python library supporting the data-driven approach behind th2 framework; it allows users to retrieve data from th2 data storage and perform data analysis via Jupyter Notebooks.")])])]),r("p",[e._v("These functional blocks correspond to the following groups of GitHub repositories:")]),r("ul",[r("li",[r("a",{attrs:{href:"#th2-infrastructure"}},[e._v("th2 Infrastructure")])]),r("li",[r("a",{attrs:{href:"#th2-core"}},[e._v("th2 Core")])]),r("li",[r("a",{attrs:{href:"#th2-modules"}},[e._v("th2 Modules")])]),r("li",[r("a",{attrs:{href:"#th2-data-services"}},[e._v("th2 Data Services")])])]),r("h2",{attrs:{id:"th2-infrastructure"}},[r("a",{attrs:{href:"#th2-infrastructure","aria-hidden":"true"}},[e._v("#")]),e._v("th2 Infrastructure")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-infra",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-infra")]),e._v(" – a set of charts and values for the deployment of infrastructure components. The repository is common for everyone, but you can fork or clone it if you need to customize values.")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-infra-mgr",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-infra-mgr")]),e._v(" – a Kubernetes operator responsible for rolling out schemas ("),r("strong",[e._v("infra-schema")]),e._v(" – a test environment configuration based on the "),r("a",{attrs:{href:"https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Kubernetes custom resources, or CRs")]),e._v(") from a Git repository to Kubernetes. It monitors a Git repository and deploys changed components to your "),r("a",{attrs:{href:"https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("namespace")]),e._v(".")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-infra-operator",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-infra-operator")]),e._v(" – a Java implementation of the Kubernetes "),r("a",{attrs:{href:"https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#custom-controllers",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("custom resource controller")]),e._v(" for th2 custom components. It monitors custom resources uploaded by "),r("strong",[e._v("infra-mgr")]),e._v(" and uses CRs to configure message/event routing in RabbitMQ or uploads Helm release for further configuration and deployment of th2 boxes.")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-infra-schema-demo",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-infra-schema")]),e._v(" – a configuration for th2 environment (called "),r("code",{pre:!0},[e._v("infra-schema")]),e._v(").")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-infra-editor",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-infra-editor")]),e._v(" –  a GUI for infrastructure management.")]),r("h2",{attrs:{id:"th2-core"}},[r("a",{attrs:{href:"#th2-core","aria-hidden":"true"}},[e._v("#")]),e._v("th2 Core")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-mstore",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-mstore")]),e._v(" – a th2 box that saves raw messages received from an MQ pin into the data lake.")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-estore",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-estore")]),e._v(" – a th2 box that saves test events from an MQ pin into the data lake.")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-rpt-data-provider",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-rpt-data-provider")]),e._v(" – a th2 box that interacts with the data lake to retrieve events and messages via user requests.")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-rpt-viewer",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-rpt-viewer")]),e._v(" – a web-based UI for th2 Reports; displays events and messages provided by the "),r("code",{pre:!0},[e._v("rpt-data-provider")]),e._v(".")]),r("h2",{attrs:{id:"th2-modules"}},[r("a",{attrs:{href:"#th2-modules","aria-hidden":"true"}},[e._v("#")]),e._v("th2 Modules")]),r("p",[e._v("An open set of repositories related to different actions required for testing activities. Examples include but are not limited to:")]),r("ul",[r("li",[r("a",{attrs:{href:"https://github.com/th2-net/th2-conn",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-conn")])]),r("li",[r("a",{attrs:{href:"https://github.com/th2-net/th2-codec-generic",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-codec")])]),r("li",[r("a",{attrs:{href:"https://github.com/th2-net/th2-act-template-j",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-act-template-j")])]),r("li",[r("a",{attrs:{href:"https://github.com/th2-net/th2-sim",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-sim")])]),r("li",[r("a",{attrs:{href:"https://github.com/th2-net/th2-check2-recon-template",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-check2-recon")])]),r("li",[r("a",{attrs:{href:"https://github.com/th2-net/th2-read-file-common-core",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-read")])]),r("li",[r("a",{attrs:{href:"https://github.com/th2-net/th2-hand",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-hand")])]),r("li",[e._v("...")])]),r("h2",{attrs:{id:"th2-data-services"}},[r("a",{attrs:{href:"#th2-data-services","aria-hidden":"true"}},[e._v("#")]),e._v("th2 Data services")]),r("p",[r("a",{attrs:{href:"https://github.com/th2-net/th2-data-services",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("th2-data-services")]),e._v(" – a library for creating "),r("code",{pre:!0},[e._v("th2-data-services")]),e._v(" applications")])])}),[],!1,null,null,null);"function"==typeof h&&h(u),"function"==typeof p&&p(u);t.default=u.exports}}]);