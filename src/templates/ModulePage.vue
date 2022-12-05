<template>
	<DocPageCommon :subsections-navigation="false" />
</template>

<page-query>
query ModulePage ($id: ID!) {
  doc: modulePage(id: $id) {
    title
		content
		fileInfo{path}
    headings {anchor, value, depth}
    terms {id, title, content}
		contentTreeJSON
  }
}
</page-query>

<script>
// TODO: Convert to TypeScript
// TODO: Edit descriptions, titles and headers to get the correct ones
import {getMetaInfo} from "../utils/seo";
import DocPageCommon from "../components/templates/DocPageCommon.vue";
import {mapMutations} from "vuex";
export default {
	name: "ModulePage",
	metaInfo() {
		const page = this.$page.doc
		return getMetaInfo({
			title: page?.title,
			description: page?.description,
			keywords: page?.keywords,
			image: page?.image
		})
	},
	components: {
		DocPageCommon
	},
	methods: {
		...mapMutations(['setModuleContentTree'])
	},
	created() {

		this.setModuleContentTree(this.$page.doc.contentTreeJSON)
	}
}
</script>

