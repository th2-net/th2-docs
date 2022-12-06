<template>
	<DocPageCommon :subsections-navigation="false">
		<template v-slot:index-content>
			<VueRemarkContent v-if="isMainModulePage" class="vue-remark module-index-page"/>
		</template>
	</DocPageCommon>
</template>

<page-query>
query ModulePage ($id: ID!) {
  doc: modulePage(id: $id) {
		__typename
    title
		description
		content
		fileInfo{path}
    headings {anchor, value, depth}
    terms {id, title, content}
		meta {
			contentTreeJSON
			module_name
			main_path
		}
  }
}
</page-query>

<script>
// TODO: Convert to TypeScript
// TODO: Edit descriptions, titles and headers to get the correct ones
import {getMetaInfo} from "../utils/seo";
import DocPageCommon from "../components/templates/DocPageCommon.vue";
import {mapGetters, mapMutations} from "vuex";
import {isMainModulePage} from "../utils/pathIdentification";
export default {
	name: "ModulePage",
	metaInfo() {
		const page = this.$page?.doc
		return {
			...getMetaInfo({
				title: page?.title,
				description: page?.description,
				keywords: page?.keywords,
				image: page?.image
			}),
			titleTemplate: this.isMainModulePage ? `${page.meta.module_name} - th2 module` : `%s | ${page.meta.module_name}`,
		}
	},
	components: {
		DocPageCommon
	},
	computed: {
		isMainModulePage() {
			return isMainModulePage(this.$route.path)
		}
	},
	methods: {
		...mapMutations(['setModuleContentTree'])
	},
	created() {
		this.setModuleContentTree(this.$page.doc.meta.contentTreeJSON)
	}
}
</script>

<style scoped>
.module-index-page{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>

