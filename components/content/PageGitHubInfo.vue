<template>
  <div class="mb-5 d-flex justify-space-between">
    <span class="mr-3">
      Edited: {{timeSince(new Date(pageInfo.updatedAt))}}
    </span>

    <span>
      <v-btn icon :href="editPageLink" target="_blank">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <a :href="editPageLink" target="_blank">
         Edit this page
      </a>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {timeFormatterMixin} from "~/mixins/timeFormatter"

export default Vue.extend({
  props: {
    pageInfo: {
      required: true,
      type: Object
    }
  },
  mixins: [timeFormatterMixin],
  computed: {
    editPageLink(){
      return `${this.$store.state.githubRepoLink}/blob/master/content${this.pageInfo.path}${this.pageInfo.extension}`
    }
  }
})
</script>