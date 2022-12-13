<template>
	<div>
		<v-btn :href="editPageLink" target="_blank"
					 style="text-transform: none"
					 class="ma-1 justify-start" text :block="block">
			<v-icon color="info">mdi-pencil-outline</v-icon>
			Edit this page
		</v-btn>
		<v-btn :href="createIssueLink" target="_blank"
					 style="text-transform: none"
					 class="ma-1 justify-start" text :block="block">
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

export default {
	props: {
		block: Boolean
	},
	name: "PageGitHubActions",
	computed: {
		doc(){
			return this.$page.doc || this.$page.readmeDoc
		},
		collectionFolder(){
			switch (this.doc.__typename) {
				case 'GitOpsPage':
					return 'deploy'
				case 'TestingPage':
					return 'test'
				case 'ModulePage':
					return 'modules'
				default:
					return 'test'
			}
		},
		editPageLink(){
			return `${this.$static.metadata.githubRepoLink}/blob/master/content/${this.collectionFolder}/${this.doc.fileInfo.path}`
		},
		createIssueLink(){
			const title = `One thing is unclear after reading "${this.doc.title}" article`
			const body = `I've read ["${this.doc.title}" article](${this.$static.metadata.githubRepoLink}/blob/master/content/${this.collectionFolder}/${this.doc.fileInfo.path}) and there is one problem.`
			const assignees = `d0rich`
			const labels = `by-reader`
			return `${this.$static.metadata.githubRepoLink}/issues/new?title=${title}&body=${body}&assignees=${assignees}&labels=${labels}`
		}
	}
}
</script>

<style scoped>

</style>
