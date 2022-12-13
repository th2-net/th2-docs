<template>
	<div>
		<div class="d-flex flex-column my-5">
			<SubsectionsNav v-if="!isLayoutSm"  class="mx-auto" />
		</div>
		<section class="ma-md-16 ma-8">
			<h1 class="text-md-h1 text-h3">Modules</h1>
		</section>
		<nav class="mx-5">
			<div class="text-h5">Tags:</div>
			<v-chip-group v-model="chosenTag" color="primary">
				<v-chip v-for="tag in tags" :key="tag" label >
					{{tag}}
				</v-chip>
			</v-chip-group>
		</nav>
		<section class="modules-grid ma-5">
			<v-card v-for="module in displayedModules" :key="module.name"
							class="" outlined>
				<v-card-title>
					<span class="mr-2">{{module.name}}</span>
					<v-chip v-for="tag in module.tags" :key="tag" small label
																 :color="isTagHighlighted(tag) ? 'primary' : ''" >
						{{tag}}
					</v-chip>
				</v-card-title>
				<v-card-text v-if="module.description">
					{{module.description}}
				</v-card-text>
				<v-card-actions>
					<v-spacer/>
					<v-btn v-if="module.docs" :to="module.docs"
								 plain style="text-transform: none">
						<v-icon>mdi-file-document-outline</v-icon> Docs
					</v-btn>
					<v-btn v-if="module.github" :href="module.github" target="_blank"
								 plain style="text-transform: none">
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
import {mapGetters, mapMutations} from "vuex";
import SubsectionsNav from "../../components/layout/SubsectionsNav.vue";
import {ModuleNote} from "../../plugins/gridsome/plugin/th2-modules-index/types";
import Vue from "vue"
import { getMetaInfo } from "../../utils/seo";

export default Vue.extend({
	name: "Modules",
	components: {
		SubsectionsNav
	},
	metaInfo() {
		return getMetaInfo({
			title: 'Modules'
		})
	},
	data(){
		return{
			chosenTag: undefined as number | undefined
		}
	},
	computed: {
		...mapGetters(['isLayoutSm']),
		modules(): ModuleNote[] {
			return this.$static.modules.edges
				.map((m: any) => m.node)
				.sort((a: any, b: any) => {
					if (a.name < b.name) return -1
					if (a.name > b.name) return 1
					return 0
				})
		},
		displayedModules(): ModuleNote[] {
			const chosenTag = this.chosenTag
			if (chosenTag === undefined)
				return this.modules
			else return this.modules.filter(m => m.tags.includes(this.tags[chosenTag]))
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
		...mapMutations(['setContentTree', "resetContentTree"]),
		isTagHighlighted(tag: string){
			if (this.chosenTag === undefined) return false
			else return this.tags[this.chosenTag] === tag
		}
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
