<template>
  <div>
		<SchemaPicker @crs="displayCRs" />
    <v-chart class="chart" :option="option" autoresize :loading="!showChart" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SchemaPicker from './SchemaPicker.vue';
import {GraphSeriesOption} from 'echarts'
import {getLinks, getNodes } from './crs-to-series';

export default Vue.extend({
  name: 'InfraViewer',
  components: {
    SchemaPicker
  },
	data(){
		return{
			showChart: false,
			series: {
				name: 'th2-schema',
				type: "graph",
				layout: 'force',
				roam: true,
				label: {
					show: true,
					position: 'right',
					formatter: '{b}'
				},
				data: [],
				links: []
			} as GraphSeriesOption
		}
	},
	computed: {
		option(): any{
			return {
				tooltip: {},
				legend: [],
				series: [
					this.series
				]
			}
		}
	},
	methods: {
		displayCRs(crs: any){
			console.log(crs)
			this.series.data = getNodes(crs)
			this.series.links = getLinks(crs)
			this.showChart = true

		}
	}
})
</script>

<style>
.chart {
	height: 400px;
}
</style>
