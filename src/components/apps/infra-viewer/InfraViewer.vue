<template>
  <div>
		<SchemaPicker @crs="crs = $event" />
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SchemaPicker from './SchemaPicker.vue';
import {GraphSeriesOption} from 'echarts'
import {getLinks, getNodes, getCategories } from './crs-to-series';

export default Vue.extend({
  name: 'InfraViewer',
  components: {
    SchemaPicker
  },
	data(){
		return{
			crs: {} as any
		}
	},
	computed: {
		option(): any{
			return {
				tooltip: {},
				legend: [],
				series: [
					this.crsToSeries(this.crs)
				]
			}
		}
	},
	methods: {
		crsToSeries(crs: any): GraphSeriesOption {
			return {
				name: 'th2-schema',
				type: "graph",
				layout: 'force',
				roam: true,
				label: {
					show: true,
					position: 'right',
					formatter: '{b}'
				},
				data: getNodes(crs),
				links: getLinks(crs),
				categories: getCategories(crs)
			}
		}
	}
})
</script>

<style>
.chart {
	height: 400px;
}
</style>
