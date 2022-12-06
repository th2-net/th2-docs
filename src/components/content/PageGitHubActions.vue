<template>
	<div>
		<v-btn :href="editPageLink" target="_blank"
					 class="text-capitalize ma-1 justify-start" text :block="!isLayoutSm">
			<v-icon color="info">mdi-pencil-outline</v-icon>
			Edit this page
		</v-btn>
		<v-btn :href="createIssueLink" target="_blank"
					 class="text-capitalize ma-1 justify-start" text :block="!isLayoutSm">
			<v-icon color="error">mdi-alert-circle-outline</v-icon>
			Create an issue
		</v-btn>
	</div>
</template>

<static-query>
query {
	metadata {
		githubRepoLink
	}
}
</static-query>

<script>
import {mapGetters} from "vuex";

export default {
	name: "PageGitHubActions",
	computed: {
		...mapGetters(['isLayoutSm']),
		doc(){
			return this.$page.doc || this.$page.readmeDoc
		},
		editPageLink(){
			return `${this.$static.metadata.githubRepoLink}/blob/master/content/docs/${this.doc.fileInfo.path}`
		},
		createIssueLink(){
			const title = `One thing is unclear after reading "${this.doc.title}" article`
			const body = `I've read ["${this.doc.title}" article](${this.$static.metadata.githubRepoLink}/blob/master/content/${this.doc.fileInfo.path}) and there is one problem.`
			const assignees = `d0rich`
			const labels = `by-reader`
			return `${this.$static.metadata.githubRepoLink}/issues/new?title=${title}&body=${body}&assignees=${assignees}&labels=${labels}`
		}
	}
}
</script>

<style scoped>

</style>
