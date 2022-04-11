<template>
  <div class="my-16">
    Found something strange?

    <v-card :href="createIssueLink" target="_blank" 
      class="pa-4 my-4 mx-auto"
      style="width: fit-content"
      outlined>
      <div class="d-flex flex-column justify-center">
        <div class="red--text font-weight-black">
         Create an Issue
        </div> 
        <v-icon color="red" style="font-size: 5rem">mdi-alert-circle</v-icon>
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