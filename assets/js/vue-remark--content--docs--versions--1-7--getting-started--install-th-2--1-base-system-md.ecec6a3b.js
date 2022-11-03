(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{UQSp:function(e,t,r){"use strict";t.a={name:"VueRemarkRoot",render:function(e){return e("div",null,this.$slots.default)}}},tmhx:function(e,t,r){"use strict";r.r(t);var o=r("7uw+"),n=r("UQSp"),a=r("oCYn");function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}a.default.config.optionMergeStrategies;var i={VueRemarkRoot:n.a},l=function(e){var t=e.options.components=e.options.components||{},r=e.options.computed=e.options.computed||{};Object.keys(i).forEach((function(e){"object"===s(i[e])&&"function"==typeof i[e].render||"function"==typeof i[e]&&"function"==typeof i[e].options.render?t[e]=i[e]:r[e]=function(){return i[e]}}))},c=a.default.config.optionMergeStrategies,d="__vueRemarkFrontMatter",u={excerpt:null,weight:0,read_before:[{title:"th2 software requirements",icon:"mdi-alert-circle-outline",href:"../../../getting-started/requirements/software"}],continue_learning:[{title:"Publish infra-schema",href:"./../2-infra-schema"}],use_cases_link:[{title:"th2 use cases",icon:"mdi-cog",href:"../../requirements/hardware"}],title:"1. Set up the environment"};var h=function(e){e.options[d]&&(e.options[d]=u),a.default.util.defineReactive(e.options,d,u),e.options.computed=c.computed({$frontmatter:function(){return e.options[d]}},e.options.computed)},p=Object(o.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("VueRemarkRoot",[r("h1",{attrs:{id:"1-set-up-the-environment"}},[r("a",{attrs:{href:"#1-set-up-the-environment","aria-hidden":"true"}},[e._v("#")]),e._v("1. Set up the environment")]),r("h2",{attrs:{id:"th2-platform"}},[r("a",{attrs:{href:"#th2-platform","aria-hidden":"true"}},[e._v("#")]),e._v("th2 platform")]),r("p",[e._v("th2 is running over Kubernetes and Cassandra clusters, which should be installed to use them as a platform for th2.")]),r("p",[e._v("Kubernetes is needed as an environment underpinning the idea of th2 as a microservices framework. It provides flexibility for any component of th2 to be created, updated or deleted without impacting the entire solution.")]),r("p",[e._v("Cassandra plays a role of data storage for th2. It is a high performance NoSQL distributed database. So the storage is quite flexible for user needs.")]),r("h2",{attrs:{id:"common-tools"}},[r("a",{attrs:{href:"#common-tools","aria-hidden":"true"}},[e._v("#")]),e._v("Common tools")]),r("p",[e._v("Regardless of how you are going to run the cluster, you need tools to interact with it. Interaction with Cassandra and Kubernetes is needed for the process of the th2 configuration. It can also be useful for possible debugging.")]),r("div",{staticClass:"v-sheet v-sheet--outlined elevation-2 my-5"},[r("div",{staticClass:"v-data-table"},[r("div",{staticClass:"v-data-table__wrapper"},[r("table",[r("thead",[r("tr",[r("th",[e._v("Tool")]),r("th",[e._v("Version")])])]),r("tbody",[r("tr",[r("td",[e._v("Docker")]),r("td",[e._v("19+")])]),r("tr",[r("td",[e._v("kubectl")]),r("td",[e._v("1.19.x - 1.20.x")])]),r("tr",[r("td",[e._v("Helm")]),r("td",[e._v("3+")])]),r("tr",[r("td",[e._v("cqlsh")]),r("td")])])])])])]),r("p",[e._v("You can find some th2 use cases with provided machines listing.")]),r("recommendations",{attrs:{items:e.$frontmatter.use_cases_link}}),r("p",[e._v("One machine can combine several types listed here.")]),r("p",[e._v("You can choose either a full setup described in this section, or a "),r("a",{attrs:{href:"./../../../cookbook/quick-setup"}},[e._v("quick setup")]),e._v(" for demo purposes. ")]),r("h2",{attrs:{id:"th2-node"}},[r("a",{attrs:{href:"#th2-node","aria-hidden":"true"}},[e._v("#")]),e._v("th2 node")]),r("p",[e._v("A th2 node is a machine where your th2 system runs fully or partially. A th2 node requires the following applications to be installed. ")]),r("ol",[r("li",[r("p",[e._v("Docker CE v19+")]),r("p",[e._v("Docker is an open-source application containerization technology. In th2, services are run inside separate Docker containers. To install Docker, follow the "),r("a",{attrs:{href:"https://docs.docker.com/engine/install/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("official guide")]),e._v(". Upon installation, you need to "),r("a",{attrs:{href:"https://kubernetes.io/docs/setup/production-environment/container-runtimes/#docker",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("configure Docker")]),e._v(" for Kubernetes.")]),r("p",[r("a",{attrs:{href:"https://docs.docker.com/storage/storagedriver/overlayfs-driver/#prerequisites",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Overlay2 storage driver prerequisites")]),e._v(".")])]),r("li",[r("p",[e._v("Kubernetes v1.19.x or 1.20.x")]),r("p",[e._v("The Kubernetes cluster should be installed with the "),r("a",{attrs:{href:"https://coreos.com/flannel/docs/latest/kubernetes.html#the-flannel-cni-plugin",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("flannel CNI plugin")]),e._v(" (a single master node in the development mode, and one master and 2+ worker nodes in the production mode). Kubernetes is needed as a technology platform to support the microservices nature of the th2 framework.")]),r("ul",[r("li",[r("a",{attrs:{href:"https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Kubernetes tools installation")]),e._v(".")]),r("li",[r("a",{attrs:{href:"https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Creating a cluster")]),e._v(".")]),r("li",[e._v("The "),r("a",{attrs:{href:"https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("kubelet")]),e._v(" is a service that powers Kubernetes.  ")]),r("li",[r("a",{attrs:{href:"https://kubernetes.io/docs/reference/setup-tools/kubeadm/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Kubeadm")]),e._v(" is a set of tools for creating and managing a Kubernetes cluster.     ")]),r("li",[e._v("Installing flannel CNI \n Execute the following command in the terminal: "),r("br"),r("code",{pre:!0},[e._v("kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml")])])])])]),r("h2",{attrs:{id:"operator-box"}},[r("a",{attrs:{href:"#operator-box","aria-hidden":"true"}},[e._v("#")]),e._v("Operator box")]),r("p",[e._v("The operator box is a machine used to monitor and control the th2 cluster.")]),r("ol",[r("li",[e._v("Git"),r("br"),e._v("\nCreated in line with the DevOps/GitOps paradigm, th2 synchronizes configuration in the Git repositories with the state of the testing system and updates the corresponding components."),r("ul",[r("li",[r("a",{attrs:{href:"https://git-scm.com/book/en/v2/Getting-Started-Installing-Git",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Installation guide")])])])]),r("li",[e._v("kubectl"),r("br"),r("a",{attrs:{href:"https://kubernetes.io/docs/reference/kubectl/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Kubectl")]),e._v(" is a command line interface for interacting with a Kubernetes cluster.  "),r("ul",[r("li",[r("a",{attrs:{href:"https://kubernetes.io/docs/tasks/tools/#kubectl",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Installation guide")])])])]),r("li",[e._v("Helm 3+"),r("br"),e._v("\nHelm is a package manager for Kubernetes used to deploy required modules to a Kubernetes cluster.  "),r("ul",[r("li",[r("a",{attrs:{href:"https://helm.sh/docs/intro/install/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Installation guide")])])])]),r("li",[e._v("Chrome 75 or newer"),r("br"),e._v("\nA browser is required to access the th2 web interface, Kubernetes dashboard, Grafana, etc.  "),r("ul",[r("li",[r("a",{attrs:{href:"https://www.google.com/chrome",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Download")])])])])]),r("h2",{attrs:{id:"apache-cassandra-node"}},[r("a",{attrs:{href:"#apache-cassandra-node","aria-hidden":"true"}},[e._v("#")]),e._v("Apache Cassandra node")]),r("p",[e._v("An Apache Cassandra node is a machine where the Cassandra database for th2 system is deployed.")]),r("ol",[r("li",[e._v("Cassandra 3.11.6+"),r("br"),e._v("\nCassandra plays the role of data storage for th2. It is a NoSQL distributed database with high performance. So the storage is quite flexible for user needs."),r("ul",[r("li",[r("a",{attrs:{href:"https://cassandra.apache.org/doc/latest/getting_started/installing.html#installing-cassandra",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Cassandra installation guide")]),e._v("\nCassandra requires Java for running (Java 8+)")]),r("li",[r("a",{attrs:{href:"https://www.java.com/en/download/help/download_options.html",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Java installation guide")])])])])]),r("ol",{attrs:{start:"2"}},[r("li",[e._v("cqlsh\n"),r("code",{pre:!0},[e._v("cqlsh")]),e._v(" is a command line interface, that provides an access to the Cassandra database."),r("ul",[r("li",[r("a",{attrs:{href:"https://wiki.python.org/moin/BeginnersGuide/Download",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Python 3.7+ installation guide")]),e._v(". "),r("code",{pre:!0},[e._v("cqlsh")]),e._v(" is based on Python, so you need to install this programming language as well.")]),r("li",[r("code",{pre:!0},[e._v("cqlsh")]),e._v(" is installed with Cassandra, but you also can install it with "),r("code",{pre:!0},[e._v("pip")]),e._v(":"),r("div",{staticClass:"remark-highlight"},[r("pre",{staticClass:"language-sh"},[r("code",{staticClass:"language-sh"},[e._v("pip install cqlsh")])]),r("copy-code-btn")],1)])])])]),r("p",[e._v("Also, it is needed to:")]),r("ul",[r("li",[e._v("create a user with admin rights for th2;")]),r("li",[e._v("provide access to the Cassandra database over the network.")])]),r("h2",{attrs:{id:"tester-box"}},[r("a",{attrs:{href:"#tester-box","aria-hidden":"true"}},[e._v("#")]),e._v("Tester box")]),r("p",[e._v("Tester boxes are machines used for executing test scripts and getting test execution results.")]),r("ol",[r("li",[e._v("Git"),r("br"),e._v("\nGit is required for fetching scripts from the Git server and changing "),r("code",{pre:!0},[e._v("th2-infra-schema")]),e._v("."),r("ul",[r("li",[r("a",{attrs:{href:"https://git-scm.com/book/en/v2/Getting-Started-Installing-Git",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Installation guide")])])])]),r("li",[e._v("kubectl"),r("br"),e._v("\nSome th2 modules use configured Kubectl for getting credentials for connecting to Kubernetes cluster with th2.  "),r("ul",[r("li",[r("a",{attrs:{href:"https://kubernetes.io/docs/tasks/tools/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Installation guide")])])])]),r("li",[e._v("Chrome 75 or newer"),r("br"),e._v("\nA browser is required to access the th2 web interface, Kubernetes dashboard, Grafana, etc.  "),r("ul",[r("li",[r("a",{attrs:{href:"https://www.google.com/chrome",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("Download")])])])]),r("li",[e._v("Programming languages and appropriate package managers for running your th2 modules locally."),r("br"),e._v("\nth2 is a microservices solution allowing to use diverse programming languages. To support them, Docker containers can be used so that there's no need to install a programming language locally. However, the possibility to run your code locally exists. It is implemented through th2 external boxes communicating with a th2 cluster. In this case, programming languages are installed locally for external boxes only.")])])],1)}),[],!1,null,null,null);"function"==typeof l&&l(p),"function"==typeof h&&h(p);t.default=p.exports}}]);