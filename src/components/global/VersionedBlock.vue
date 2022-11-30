<template>
	<div v-show="currentVersion === version">
		<slot />
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapMutations} from 'vuex'

export default Vue.extend({
	name: "VersionedBlock",
	props: {
		version: String
	},
	computed: {
		...mapGetters(['currentVersion'])
	},
	methods: {
		...mapMutations(['registerVersion', 'initVersions', 'resetVersions'])
	},
	mounted() {
		this.registerVersion(this.version)
		this.initVersions()
	},
	beforeDestroy() {
		this.resetVersions()
	}
})
</script>

<style scoped>

</style>
