<template>
	<div class="d-flex flex-column doc-layout mx-auto">
		<SubsectionsNav class="mx-auto my-5" v-if="subsectionsNavigation" />
		<div class="doc-page">
			<ContentTree v-if="!isLayoutSm && !isMainModulePage" class="doc-page__aside" />
			<Article :doc="doc" :hide-doc="hideDoc" class="doc-page__article">
				<template v-slot:index-content>
					<slot name="index-content" />
				</template>
			</Article>
			<PageContent v-if="!hideDoc" class="doc-page__aside" />
		</div>
	</div>
</template>

<script>
import Article from "../content/Article.vue";
import PageContent from "../layout/PageContent.vue";
import ContentTree from "../layout/ContentTree.vue";
import SubsectionsNav from "../layout/SubsectionsNav.vue";
import {mapGetters} from "vuex";
import {isMainModulePage} from "../../utils/pathIdentification";

export default {
	name: "DocPageCommon",
	props: {
		subsectionsNavigation: {
			type: Boolean,
			default: true
		}
	},
	components: {
		Article, PageContent, ContentTree, SubsectionsNav
	},
	computed: {
		...mapGetters(['isLayoutSm', 'currentPage']),
		doc() {
			return this.$page.doc
		},
		isMainModulePage(){
			return isMainModulePage(this.$route.path)
		},
		hideDoc(){
			return !!this.currentPage?.children?.length
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

