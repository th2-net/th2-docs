<template>
	<DocPageCommon />
</template>

<page-query>
query TestingPage ($id: ID!) {
  doc: modulePage(id: $id) {
    title
		content
		fileInfo{path}
    headings {anchor, value, depth}
    terms {id, title, content}
  }
}
</page-query>

<static-query>
query {
	testSection: section(id: "explore"){
		title
		contentTreeJSON
	}
}
</static-query>

<script>
// TODO: Convert to TypeScript
// TODO: Edit descriptions, titles and headers to get the correct ones
import {getMetaInfo} from "../utils/seo";
import DocPageCommon from "../components/templates/DocPageCommon.vue";
import {mapMutations} from "vuex";
export default {
	name: "GitOpsPage",
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
		...mapMutations(['setContentTree'])
	},
	created() {
		this.setContentTree({
			contentTreeId: 'Explore',
			contentTreeJSON: this.$static.testSection.contentTreeJSON
		})
	}
}
</script>

