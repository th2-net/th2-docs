<template>
  <div class="my-16">
    <v-card :href="createIssueLink" target="_blank" 
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
    </v-card>

  </div>
</template>

<script>
export default {
  props: {
    pageInfo: {
      required: true,
      type: Object
    }
  },
  computed: {
    createIssueLink(){
      const title = `One thing is unclear after reading "${this.pageInfo.title}" article`
      const body = `I've read ["${this.pageInfo.title}" article](${this.$store.state.githubRepoLink}/blob/master/content${this.pageInfo.path}${this.pageInfo.extension}) and there is one problem.`
      const assignees = `d0rich`
      const labels = `by-reader`
      return `${this.$store.state.githubRepoLink}/issues/new?title=${title}&body=${body}&assignees=${assignees}&labels=${labels}`
    }
  }
}
</script>

<style>

</style>