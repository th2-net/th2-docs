<template>
  <div>
		<SchemaPicker @crs="crs = $event" @loading="loading = $event" />
    <v-chart class="chart" :option="option" autoresize :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SchemaPicker from './SchemaPicker.vue';
import {GraphSeriesOption} from 'echarts'
import {getLinks, getNodes, getCategories, CRs} from './crs-to-series';

export default Vue.extend({
  name: 'InfraViewer',
  components: {
    SchemaPicker
  },
	data(){
		return{
			crs: {} as CRs,
			loading: false
		}
	},
	computed: {
		option(): any{
			return {
				tooltip: {},
				series: [
					this.crsToSeries(this.crs)
				],
				legend: [
					{
						data: getCategories(this.crs)?.map(c => c.name)
					}
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
