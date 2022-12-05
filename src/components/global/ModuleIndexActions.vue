<template>
	<div class="d-flex no-gutters">
		<v-btn class="text-capitalize mr-2" :to="getStartedLink" outlined>
			Get started
		</v-btn>
		<v-btn v-if="githubLink" class="text-capitalize" :to="getStartedLink" outlined>
			<v-icon>mdi-github</v-icon>
			GitHub
		</v-btn>
	</div>
</template>

<script>
import Vue from "vue";
import {mapGetters} from "vuex";
export default Vue.extend({
	name: "ModuleIndexActions",
	computed: {
		...mapGetters(['currentTree']),
		getStartedLink(){
			return this.currentTree[0].followPath
		},
		githubLink(){
			const doc = this.$page.doc
			return null
		}
	}
})
</script>

<style scoped>

</style>
