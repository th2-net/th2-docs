<template>
	<div class="d-flex flex-column doc-layout mx-auto">
		<SubsectionsNav  class="mx-auto my-5" />
		<div class="doc-page">
			<ContentTree />
			<Article :doc="doc" class="doc-page__article" />
			<PageContent />
		</div>
	</div>
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
import Article from "../components/content/Article.vue";
import PageContent from "../components/layout/PageContent.vue";
import ContentTree from "../components/layout/ContentTree.vue";
import SubsectionsNav from "../components/layout/SubsectionsNav.vue";
import {mapMutations} from "vuex";
export default {
	name: "GitOpsPage",
	metaInfo() {
		const page = this.doc
		return getMetaInfo({
			title: page?.title,
			description: page?.description,
			keywords: page?.keywords,
			image: page?.image
		})
	},
	components: {
		SubsectionsNav,
		Article, PageContent, ContentTree
	},
	computed: {
		doc() {
			return this.$page.doc
		}
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

<style scoped lang="scss">
@import "src/assets/variables";
.doc-layout{
	width: min( 1280px, 95vw );
}
.doc-page {
	display: grid;
	grid-template-columns: $aside-width 1fr $aside-width;
}

.doc-page__article {
	width: min(95vw, 1280px - #{$aside-width} * 2);
}

</style>
