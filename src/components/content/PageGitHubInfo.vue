<template>
  <div>
    <!-- <div>
      Edited: {{timeSince(new Date(pageInfo.updatedAt))}}
    </div> -->

    <div>
      <v-btn icon :href="editPageLink" target="_blank">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <a :href="editPageLink" target="_blank">
         Edit this page
      </a>
    </div>
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
import Vue from 'vue'

export default Vue.extend({
  computed: {
    editPageLink(){
      return `${this.$static.metadata.githubRepoLink}/blob/master/content/docs/${this.$page.doc.fileInfo.path}`
    }
  }
})
</script>
