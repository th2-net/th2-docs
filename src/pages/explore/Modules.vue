<template>
	<div>
		<div class="d-flex flex-column my-5">
			<SubsectionsNav  class="mx-auto" />
		</div>
		<section class="modules-grid ma-5">
			<v-card v-for="module in modules" :key="module.name"
							class="" outlined>
				<v-card-title>
					{{module.name}}
				</v-card-title>
				<v-card-text>
					{{module.description}}
				</v-card-text>
				<v-card-actions>
					<v-btn v-if="module.docs" :to="module.docs"
								 plain class="text-capitalize">
						<v-icon>mdi-file-document-outline</v-icon> docs
					</v-btn>
				</v-card-actions>
			</v-card>
		</section>
	</div>
</template>

<static-query>
query {
	modules: allModuleNote{
		edges {
			node {
				name
				docs
				description
			}
		}
	}
	testSection: section(id: "explore"){
		title
		contentTreeJSON
	}
}
</static-query>

<script lang="ts">
import {mapMutations} from "vuex";
import SubsectionsNav from "../../components/layout/SubsectionsNav.vue";
import {ModuleNote} from "../../plugins/gridsome/plugin/th2-modules-index/types";
import Vue from "vue"

export default Vue.extend({
	name: "Modules",
	components: {
		SubsectionsNav
	},
	computed: {
		modules(): ModuleNote[] {
			return this.$static.modules.edges.map((m: any) => m.node)
		}
	},
	methods: {
		...mapMutations(['setContentTree'])
	},
	created() {
		// @ts-ignore
		this.setContentTree({
			contentTreeId: 'Explore',
			contentTreeJSON: this.$static.testSection.contentTreeJSON
		})
	}
})
</script>

<style scoped lang="scss">
@import "src/assets/variables.scss";

.modules-grid{
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 1rem;
	align-items: start;
}

@media screen and (max-width: $window-width-sm) {
	.modules-grid{
		grid-template-columns: repeat(2, 1fr);
	}
}
@media screen and (max-width: $window-width-xsm) {
	.modules-grid{
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>
