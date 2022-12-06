<template>
	<DocPageCommon />
</template>

<page-query>
query GitOpsPage ($id: ID!) {
  doc: gitOpsPage(id: $id) {
    title
    inner_title
		content
		fileInfo{path}
    headings {anchor, value, depth}
    read_before{title, href, icon}
    continue_learning{title, href, icon}
    terms {id, title, content}
    related {name, icon, href}
  }
}
</page-query>

<static-query>
query {
	deploySection: section(id: "deploy"){
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
		const page = this.$page?.doc
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
			contentTreeId: 'Deploy',
			contentTreeJSON: this.$static.deploySection.contentTreeJSON
		})
	}
}
</script>

