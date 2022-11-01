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
      // @ts-ignore
      return `${this.$store.state.githubRepoLink}/blob/master/content${this.pageInfo.path}${this.pageInfo.extension}`
    }
  }
})
</script>
