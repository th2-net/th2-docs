<template>
  <div>
    <div>
      <v-btn icon :href="createIssueLink" target="_blank">
        <v-icon>mdi-alert-circle-outline</v-icon>
      </v-btn>
      <a :href="createIssueLink" target="_blank">
         Create an issue
      </a>
    </div>
    <!-- <v-card :href="createIssueLink" target="_blank"
      class="pa-4 px-4 my-4 mx-auto"
      style="width: fit-content"
      outlined>
      <div class="d-flex flex-column align-center">
        <span class="red--text">
          Found something strange?
        </span>
        <v-icon class="my-5" color="red" style="font-size: 5rem">mdi-alert-circle-outline</v-icon>
        <span class="red--text font-weight-black" style="font-size: 1.2rem">
         Create an Issue
        </span>
      </div>
    </v-card> -->

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
  computed: {
    createIssueLink(){
      const title = `One thing is unclear after reading "${this.$page.doc.title}" article`
      const body = `I've read ["${this.$page.doc.title}" article](${this.$static.metadata.githubRepoLink}/blob/master/content/${this.$page.doc.fileInfo.path}) and there is one problem.`
      const assignees = `d0rich`
      const labels = `by-reader`
      return `${this.$static.metadata.githubRepoLink}/issues/new?title=${title}&body=${body}&assignees=${assignees}&labels=${labels}`
    }
  }
}
</script>

<style>

</style>
