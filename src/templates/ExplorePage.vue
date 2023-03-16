<template>
	<DocPageCommon />
</template>

<page-query>
query ExplorePage ($id: ID!) {
  doc: explorePage(id: $id) {
		__typename
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
	exploreSection: section(id: "explore"){
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
	name: "ExplorePage",
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
			contentTreeId: 'Explore',
			contentTreeJSON: this.$static.exploreSection.contentTreeJSON
		})
	}
}
</script>

