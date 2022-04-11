<template>
  <div class="layout__doc-page">
    <v-container class="layout__main">
      <article v-if="!error">
        <h1 v-if="!page.chapter">{{ page.title }}</h1>
        <page-git-hub-info :pageInfo="page" />
        <recommendations class="my-4" v-if="page.read_before" :items="page.read_before" >
          <div>Read before this article:</div>
        </recommendations>
        <nuxt-content :document="page" />
        <prev-next class="my-4" v-if="page.prev || page.next"
                   :prev-title="page.prev ? page.prev.title : ''"
                   :next-title="page.next ? page.next.title : ''"
                   :prev-link="page.prev ? page.prev.link : ''"
                   :next-link="page.next ? page.next.link : ''"
                   :prev-icon="page.prev ? page.prev.icon : ''"
                   :next-icon="page.next ? page.next.icon : ''">
        </prev-next>
        <recommendations class="my-4" v-if="page.continue_learning" :items="page.continue_learning" >
          <div>Continue learning:</div>
        </recommendations>
        <page-git-hub-issue :pageInfo="page" />
      </article>
      <article v-else>
        <h1>Page not found</h1>
      </article>
    </v-container>
    <page-content :toc="page.toc" class="layout__aside--right" />

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '~/assets/layout.scss'
import '~/assets/nuxt-content.scss'
// @ts-ignore
import PageContent from "~/components/layout/PageContent";
import { contentPageMixin, getPageInfo } from "../mixins/contentPage";
import { Context } from "@nuxt/types";
import Recommendations from "~/components/global/Recommendations.vue";
import PageGitHubInfo from '~/components/content/PageGitHubInfo.vue';
import PageGitHubIssue from '~/components/content/PageGitHubIssue.vue';

export default Vue.extend({
  name: "MarkdownContent",
  components: {
    Recommendations,
    PageContent, 
    PageGitHubInfo, PageGitHubIssue
  },
  data: () => ({
    error: false
  }),
  mixins: [contentPageMixin],
  async asyncData (context: Context) {
    return {
      page: await getPageInfo(context),
    }
  },
})
</script>

<style scoped>

</style>
