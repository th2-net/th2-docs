<template>
	<v-container class="layout__main space-bottom">
		<article>
			<GitHubRepoInfo />
			<recommendations v-if="doc.read_before && doc.read_before.length"
											 class="my-4" :items="doc.read_before" >
				<div>Before you start take a look at:</div>
			</recommendations>
			<VueRemarkContent class="doc-article" />
			<prev-next class="my-4" v-if="doc.prev || doc.next"
								 :prev-title="doc.prev ? doc.prev.title : ''"
								 :next-title="doc.next ? doc.next.title : ''"
								 :prev-link="doc.prev ? doc.prev.link : ''"
								 :next-link="doc.next ? doc.next.link : ''"
								 :prev-icon="doc.prev ? doc.prev.icon : ''"
								 :next-icon="doc.next ? doc.next.icon : ''">
			</prev-next>
			<recommendations v-if="doc.continue_learning && doc.continue_learning.length"
											 class="my-4" :items="doc.continue_learning" >
				<div>Continue learning:</div>
			</recommendations>
		</article>
	</v-container>
</template>

<script>
import '~/assets/doc-article.scss'
import GitHubRepoInfo from "~/components/content/GitHubRepoInfo";

export default {
	props: {
		doc: Object
	},
	name: "Article",
	components: {
		GitHubRepoInfo
	}
}
</script>

<style scoped>

</style>
