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
				<v-card-text v-if="module.description">
					{{module.description}}
				</v-card-text>
				<v-card-actions>
					<v-spacer/>
					<v-btn v-if="module.docs" :to="module.docs"
								 plain class="text-capitalize">
						<v-icon>mdi-file-document-outline</v-icon> docs
					</v-btn>
				</v-card-actions>
				<v-card-actions v-if="module.prod_repos">
					<Th2ReposView :repos="module.prod_repos" />
				</v-card-actions>
				<v-card-actions class="flex-column align-start" v-if="module.custom_repos">
					<section v-if="module.custom_repos.core && module.custom_repos.core.length" class="mt-2">
						<div>Core:</div>
						<v-btn v-for="repo in module.custom_repos.core" :key="repo.name"
									 :href="repo.link" outlined class="text-lowercase ma-1">
							<v-icon>mdi-github</v-icon> {{repo.name}}
						</v-btn>
					</section>
					<section v-if="module.custom_repos.templates && module.custom_repos.templates.length" class="mt-2">
						<div>Templates:</div>
						<Th2ReposView v-for="(repos, index) in module.custom_repos.templates" :key="index"
													:repos="repos" />
					</section>
					<section v-if="module.custom_repos.implementations && module.custom_repos.implementations.length" class="mt-2">
						<div>Implementations:</div>
						<Th2ReposView v-for="(repos, index) in module.custom_repos.implementations" :key="index"
													:repos="repos" />
					</section>

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
				prod_repos {
					box {link, name}
				}
				custom_repos {
					core {link, name}
					templates {
						box {link, name}
					}
					implementations {
						box {link, name}
					}
				}
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
import Th2ReposView from "../../components/modules/Th2ReposView.vue";
import {ModuleNote} from "../../plugins/gridsome/plugin/th2-modules-index/types";
import Vue from "vue"

export default Vue.extend({
	name: "Modules",
	components: {
		SubsectionsNav, Th2ReposView
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
