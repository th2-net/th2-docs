<template>
  <v-sheet outlined rounded class="d-flex flex-column">
		<SchemaPicker @crs="crs = $event" @loading="loading = $event" />
		<v-row no-gutters class="justify-space-around">
			<v-switch label="estore connections" inset dense v-model="options.estore" />
			<v-switch label="mstore connections" inset dense v-model="options.mstore"  />
		</v-row>
		<v-chart class="chart" :option="option" autoresize :loading="loading" />
  </v-sheet>
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
			loading: false,
			options: {
				estore: false,
				mstore: false
			}
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
				lineStyle: {
					curveness: 0.3
				},
				data: getNodes(crs),
				links: getLinks(crs, {
					estore: this.options.estore,
					mstore: this.options.mstore
				}),
				categories: getCategories(crs)
			}
		}
	}
})
</script>

<style>
.chart {
	min-height: 400px;
	height: 100%;
}
</style>
