<template>
	<div class="d-flex flex-column doc-layout mx-auto">
		<SubsectionsNav  class="mx-auto my-5" />
		<div class="doc-page">
			<ContentTree v-if="!isLayoutSm" class="doc-page__aside" />
			<Article :doc="doc" class="doc-page__article" />
			<PageContent class="doc-page__aside" />
		</div>
	</div>
</template>

<script>
import Article from "../content/Article.vue";
import PageContent from "../layout/PageContent.vue";
import ContentTree from "../layout/ContentTree.vue";
import SubsectionsNav from "../layout/SubsectionsNav.vue";
import {mapGetters} from "vuex";
export default {
	name: "DocPageCommon",
	components: {
		Article, PageContent, ContentTree, SubsectionsNav
	},
	computed: {
		...mapGetters(['isLayoutSm']),
		doc() {
			return this.$page.doc
		}
	}
}
</script>

<style scoped lang="scss">
@import "src/assets/variables";
.doc-layout{
	width: min( #{$max-width}, 95vw );
}
.doc-page {
	display: flex;
}

.doc-page__aside {
	width: $aside-width;
	overflow-x: hidden;
}

.doc-page__article {
	width: min(95vw, 1280px - #{$aside-width} * 2);
}

@media screen and (max-width: $window-width-md) {
	.doc-page__article{
		width: min(100%, #{$max-width} - #{$aside-width-md} * 2);
	}
	.doc-page__aside {
		width: $aside-width-md;
	}
}

@media screen and (max-width: $window-width-sm) {
	.doc-layout{
		width: 95vw;
	}
	.doc-page{
		width: unset;
		display: flex;
		flex-direction: column-reverse;
		margin: auto;
	}
	.doc-page__article {
		width: 95vw
	}
	.doc-page__aside {
		width: unset;
	}
}

</style>

