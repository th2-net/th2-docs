<template>
  <div id="calc-app">
    <div id="total-requirements">
      <slot name="total">
        <h2>Total hardware minimal requirements</h2>
      </slot>
      <div class="v-sheet v-sheet--outlined elevation-2 mt-12">
        <div class="v-data-table">
          <div class="v-data-table__wrapper">
            <table>
              <thead>
              <tr>
                <th>Requirement for node</th>
                <th>Infra & Core Components</th>
                <th>Custom & Building blocks components</th>
                <th>Apache Cassandra node</th>
                <th>Total</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Memory (GB)</td>
                <td>{{th2_core.memory / 1000}} GB</td>
                <td>{{th2_custom.memory / 1000}} GB</td>
                <td>{{cassandra.memory / 1000}} GB</td>
                <td>{{(th2_core.memory + th2_custom.memory + cassandra.memory) / 1000}} GB</td>
              </tr>
              <tr>
                <td>CPU (cores)</td>
                <td>{{Math.ceil(th2_core.core / 1000)}} cores</td>
                <td>{{Math.ceil(th2_custom.core / 1000)}} cores</td>
                <td>{{Math.ceil(cassandra.core / 1000)}} cores</td>
                <td>{{Math.ceil((th2_core.core + th2_custom.core + cassandra.core) / 1000)}} cores</td>
              </tr>
              <tr>
                <td>Disk space (GB)</td>
                <td>{{th2_core.space}} GB</td>
                <td>{{th2_custom.space}} GB</td>
                <td>{{cassandra.space}} GB</td>
                <td>{{th2_core.space + th2_custom.space + cassandra.space}} GB</td>
              </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
      
    </div>


    <slot name="components">
      <h2>th2 components requirements</h2>
    </slot>

    <div class="v-sheet v-sheet--outlined elevation-2 mt-12">
      <div class="v-data-table">
        <div class="v-data-table__wrapper">
          <table>
            <thead>
            <tr>
              <th>Infra & Core Components</th>
              <th>Memory (MB)</th>
              <th>CPU (millicores)</th>
              <th>Comment</th>
              <th>Included to node</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>th2 infra</td>
              <td>1000 MB</td>
              <td>800 m</td>
              <td>Required for all solutions: helm, infra-mgr, infra-editor, infra-operator</td>
              <td><input type="checkbox" v-model="checks.infra"></td>
            </tr>
            <tr>
              <td>th2 core</td>
              <td>2500 MB</td>
              <td>2000 m</td>
              <td>Required for all solutions: mstore, estore, rpt-provider, rpt-viewer</td>
              <td><input type="checkbox" v-model="checks.core"></td>
            </tr>
            <tr>
              <td>th2 monitoring</td>
              <td>1500 MB</td>
              <td>2000 m</td>
              <td>Recommended. Plus Loki log storage: 150 GB disk space</td>
              <td><input type="checkbox" v-model="checks.monitoring"></td>
            </tr>
            <tr>
              <td>Rabbitmq replica 1 in th2 infra</td>
              <td>2000 MB</td>
              <td>1000 m</td>
              <td>Required for all solutions</td>
              <td><input type="checkbox" v-model="checks.rabbitmq"></td>
            </tr>
            <tr>
              <td>Other supporting components in th2 infra</td>
              <td>500 MB</td>
              <td>250 m</td>
              <td>Depends on the deployment configuration. E.g. in-cluster CD system, ingress and etc</td>
              <td><input type="checkbox" v-model="checks.other"></td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
    <div class="v-sheet v-sheet--outlined elevation-2 mt-12">
      <div class="v-data-table">
        <div class="v-data-table__wrapper">
          <table>
            <thead>
            <tr>
              <th>Custom &amp; Building blocks components</th>
              <th>Memory (MB)</th>
              <th>CPU (millicores)</th>
              <th>Included to node</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>th2 in-cluster connectivity services</td>
              <td>200 MB</td>
              <td>200 m</td>
              <td>
                <input type="number" min="0" v-model="numbers.conn">
              </td>
            </tr>
            <tr>
              <td>th2 codec, act</td>
              <td>200 MB</td>
              <td>200 m</td>
              <td>
                <input type="number" min="0" v-model="numbers.codec_act">
              </td>
            </tr>
            <tr>
              <td>th2 Java read</td>
              <td>200 MB</td>
              <td>200 m</td>
              <td>
                <input type="number" min="0" v-model="numbers.java_read">
              </td>
            </tr>
            <tr>
              <td>th2 recon</td>
              <td>200 MB</td>
              <td>200 m</td>
              <td>
                <input type="number" min="0" v-model="numbers.recon">
              </td>
            </tr>
            <tr>
              <td>th2 check2</td>
              <td>800 MB</td>
              <td>200 m</td>
              <td>
                <input type="number" min="0" v-model="numbers.check2">
              </td>
            </tr>
            <tr>
              <td>th2 hand</td>
              <td>300 MB</td>
              <td>400 m</td>
              <td>
                <input type="number" min="0" v-model="numbers.hand">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    

    <slot name="cassandra">
      <h2>Apache Cassandra cluster hardware requirements</h2>
    </slot>
    <div class="v-sheet v-sheet--outlined elevation-2 mt-12">
      <div class="v-data-table">
        <div class="v-data-table__wrapper">
          <table>
            <thead>
            <tr>
              <th>Apache Cassandra node</th>
              <th>Memory (MB)</th>
              <th>CPU (millicores)</th>
              <th>Disk space (GB)</th>
              <th>Included to node</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Cassandra node_n</td>
              <td>4000 MB</td>
              <td>2000 m</td>
              <td>215 GB</td>
              <td><input type="checkbox" v-model="checks.cassandra"></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "RequirementsCalculatorApp",
  data() {
    return {
      memory: {
        infra: 1000,
        core: 2500,
        monitoring: 1500,
        rabbitmq: 2000,
        other: 500,
        conn: 200,
        codec_act: 200,
        java_read: 200,
        recon: 200,
        check2: 800,
        hand: 300,
        cassandra: 4000
      },
      core: {
        infra: 800,
        core: 2000,
        monitoring: 2000,
        rabbitmq: 1000,
        other: 250,
        conn: 200,
        codec_act: 200,
        java_read: 200,
        recon: 200,
        check2: 200,
        hand: 400,
        cassandra: 2000
      },
      checks: {
        infra: true,
        core: true,
        monitoring: false,
        rabbitmq: false,
        other: false,
        cassandra: true
      },
      numbers: {
        conn: 4,
        codec_act: 2,
        java_read: 1,
        recon: 1,
        check2: 1,
        hand: 0
      },
      space: {
        monitoring: 150,
        cassandra: 225
      }
    }

  },
  computed: {
    th2_core(){
      const memory = this.memory.infra * this.checks.infra +
        this.memory.core * this.checks.core +
        this.memory.monitoring * this.checks.monitoring +
        this.memory.rabbitmq * this.checks.rabbitmq +
        this.memory.other * this.checks.other
      const core = this.core.infra * this.checks.infra +
        this.core.core * this.checks.core +
        this.core.monitoring * this.checks.monitoring +
        this.core.rabbitmq * this.checks.rabbitmq +
        this.core.other * this.checks.other
      const space = this.space.monitoring * this.checks.monitoring
      return {memory, core, space}
    },
    th2_custom(){
      const memory = this.memory.conn * this.numbers.conn +
        this.memory.codec_act * this.numbers.codec_act +
        this.memory.java_read * this.numbers.java_read +
        this.memory.recon * this.numbers.recon +
        this.memory.check2 * this.numbers.check2 +
        this.memory.hand * this.numbers.hand
      const core = this.core.conn * this.numbers.conn +
        this.core.codec_act * this.numbers.codec_act +
        this.core.java_read * this.numbers.java_read +
        this.core.recon * this.numbers.recon +
        this.core.check2 * this.numbers.check2 +
        this.core.hand * this.numbers.hand
      return {memory, core, space: 0}
    },
    cassandra(){
      const memory = this.memory.cassandra * this.checks.cassandra
      const core = this.core.cassandra * this.checks.cassandra
      const space = this.space.cassandra * this.checks.cassandra
      return { memory, core, space }
    }
  }
}
</script>

<style scoped>

</style>
