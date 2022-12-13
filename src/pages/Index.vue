<template>
  <div class="mx-auto px-7 my-16 pb-16" style="max-width: 1280px">
    <h1>th2: Next-generation test automation framework</h1>
    <h2 class="mt-16">What is th2?</h2>
    <p>
      <a href="https://github.com/th2-net" target="_blank">th2</a> is an open-source toolkit providing end-to-end
      functional and non-functional test automation for complex distributed transaction processing systems such
      as securities trading systems and exchanges, banking, brokerage, post-trade (e.g. clearing, settlement, custody),
      and payments platforms. Built as a cloud native Kubernetes-driven microservices solution, it aims to help regulated
      entities stay compliant and resilient to disruption,
      while focusing on innovation and having the freedom to embrace emerging technologies.
    </p>
    <v-divider class="my-16" />
    <v-row no-gutters>
      <v-card
          class="mx-auto my-2"
          max-width="344"
          v-for="link in links" :key="link.href"
      >
        <v-card-text>
          <p class="text-h4 text--primary">
            <v-icon>{{link.icon}}</v-icon> {{link.title}}
          </p>
          <div class="text--primary">
            {{link.text}}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
              text
              :to="link.href"
          >
            Learn More
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-divider class="my-16" />
    <h2>th2 benefits</h2>
    <ul>
      <li><strong>Open interface</strong>: a multi-platform framework with a powerful API, enabling intelligent interaction with many widely adopted network protocols as well as API, UI, DLT and cloud endpoints.</li>
      <li><strong>Technology stack diversity</strong>: th2 can perform tests written in different programming languages (Python, Java, C++, Kotlin, etc.).</li>
      <li><strong>Microservices architecture</strong>: provides configuration agility for building complex test instruments and executing sophisticated test algorithms, including model-based testing approaches.</li>
      <li><strong>DevOps/GitOps paradigm</strong>: enables CI/CD pipeline integration.</li>
      <li><strong>High-volume automated testing</strong>: designed to perform autonomous test execution of more functional tests under load to improve test coverage, system quality and resilience.</li>
      <li><strong>Data-driven approach</strong>: ready for implementation of AI-driven test libraries for machine learning and advanced data analytics, enhanced data capabilities including faster data processing and unified storage of test results.</li>
      <li><strong>Data governance</strong>: unified storage of distributed test data and results in the Cassandra database to enable better access to test evidence and smart analytics for governance and regulatory compliance.</li>
      <li><strong>Performance</strong>: processes multiple data streams in parallel.</li>
      <li><strong>Scalability</strong>: can be distributed between several hardware, additional computing power can be quickly involved in testing process allowing testing close to thresholds and exceeding them.</li>
    </ul>
    <v-divider class="my-16" />
    <div style="max-width: 700px" class="mx-auto">
      <youtube id="1W2IJBNa9WU" />
    </div>
  </div>
</template>
<script>
import Recommendations from "../components/global/Recommendations";
import {seoMixin} from "../utils/seo";
import {mapMutations, mapState} from "vuex";
export default {
  metaInfo(){
    return this.getMetaInfo({
      title: 'Home',
      description: 'th2 is an open-source toolkit providing end-to-end functional and non-functional test automation for complex distributed transaction processing systems such as securities trading systems and exchanges, banking, brokerage, post-trade (e.g. clearing, settlement, custody), and payments platforms. Built as a cloud native Kubernetes-driven microservices solution, it aims to help regulated entities stay compliant and resilient to disruption, while focusing on innovation and having the freedom to embrace emerging technologies.'
    })
  },
  name: "Home",
  mixins: [seoMixin],
  computed: {
    ...mapState(['currentTh2Version']),
    links(){
      return  [
        { title: 'Deploy', href: `/deploy/`, icon: 'mdi-kubernetes',
          text: 'th2 has its own GitOps system under the hood. Learn how th2 deployment work, how th2 ' +
						'components are integrated into solution, and how to create your own th2 module.' },
        { title: 'Test', href: `/test/`, icon: 'mdi-bug',
          text: 'Learn about main testing concepts of th2 and best practices of creating test scenarios.' },
        { title: 'Explore', href: `/explore/modules`, icon: 'mdi-magnify',
          text: 'th2 is the huge ecosystem. Explore existing modules for th2 and activity in th2-net organization.' },
      ]
    }
  },
	methods: {
		...mapMutations(['resetContentTree'])
	},
	created() {
		this.resetContentTree()
	}
}
</script>
