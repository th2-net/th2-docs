<template>
	<v-row no-gutters outlined>
		<div v-if="repos.box" class="ma-1">
			<v-btn :href="repos.box.link" target="_blank" outlined class="text-lowercase">
				<v-icon>mdi-code-tags</v-icon> {{repos.box.name}}
			</v-btn>
		</div>
		<div v-if="repos.grpc" class="ma-1">
			<v-btn :href="repos.grpc.link" target="_blank" outlined class="text-lowercase">
				<v-icon>mdi-arrow-top-right-bottom-left</v-icon> {{repos.grpc.name}}
			</v-btn>
		</div>
	</v-row>
</template>

<script lang="ts">
import Vue from "vue";
import {ProdModuleNoteRepos} from "../../plugins/gridsome/plugin/th2-modules-index/types";
export default Vue.extend({
	name: "Th2ReposView",
	props: {
		repos: {
			type: Object as () => ProdModuleNoteRepos,
			required: true
		}
	}
})
</script>

<style scoped>

</style>
