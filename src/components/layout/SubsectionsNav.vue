<template>
	<v-btn-toggle dense>
		<v-btn v-for="subsection in subsections" :key="subsection.path"
					 outlined
					 :to="subsection.followPath"
					 style="text-transform: none"
					 :class="{
						 'v-btn--active': isSectionActive(subsection.path)
					 }">
			{{subsection.title}}
		</v-btn>
	</v-btn-toggle>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters} from "vuex";

export default Vue.extend({
	name: "SubsectionsNav",
	computed: {
		...mapGetters(['subsections'])
	},
	methods: {
		isSectionActive(basePath: string): boolean{
			return this.$route.path.startsWith(basePath)
		}
	}
})
</script>

<style scoped>

</style>
