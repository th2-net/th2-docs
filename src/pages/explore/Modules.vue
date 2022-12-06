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
				<v-card-subtitle>
					<v-chip v-for="tag in module.tags" :key="tag" small label >
						{{tag}}
					</v-chip>
				</v-card-subtitle>
				<v-card-text v-if="module.description">
					{{module.description}}
				</v-card-text>
				<v-card-actions>
					<v-spacer/>
					<v-btn v-if="module.docs" :to="module.docs"
								 plain class="text-capitalize">
						<v-icon>mdi-file-document-outline</v-icon> docs
					</v-btn>
					<v-btn v-if="module.github" :href="module.github" target="_blank"
								 plain class="text-capitalize">
						<v-icon>mdi-github</v-icon> GitHub
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
				github
				tags
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
		},
		tags(): string[] {
			const tags = new Set<string>()
			this.modules.forEach(module => {
				module.tags.forEach(tag => {
					tags.add(tag)
				})
			})
			return Array.from(tags).sort()
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
