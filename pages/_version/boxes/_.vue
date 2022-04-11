<template>
  <div class="layout__doc-page">
    <v-container class="layout__main">
      <article v-if="!error">
        <h1 v-if="!page.chapter">{{ page.title }}</h1>
        <page-git-hub-info :page-info="page" />
        <section v-if="repoInfo" class="my-4">
          <v-list-item :href="repoInfo.owner.html_url" target="_blank">
            <v-list-item-avatar>
              <v-img  :src="repoInfo.owner.avatar_url" :alt="repoInfo.owner.login" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{repoInfo.owner.login}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <div><a :href="repoInfo.html_url" target="_blank">GitHub repository</a></div>
          <div>Language: {{repoInfo.language}}</div>
          <div>{{repoInfo.description}}</div>
          <div>Last updated <time :datetime="repoInfo.updated_at">{{timeSince(repoInfo.updated_at)}}</time></div>
        </section>
        <section class="my-4">
          <h2>Related Links:</h2>
          <v-list-item v-for="link in page.related" :key="link.name" :href="link.href" target="_blank">
            <v-list-item-icon v-if="link.icon">
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{link.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </section>
        <section v-if="repoInfo">
          <h2>Releases</h2>
          <v-card v-for="release in repoInfo.releases" :key="release.id">
            <v-card-text>
              <div>{{release.tag_name}}</div>
              <p class="text-h4 text--primary">
                {{release.name}}
              </p>
              <p>{{release.published_at.toLocaleDateString()}}</p>
              <div class="text--primary">
                {{release.body}}
              </div>
            </v-card-text>
          </v-card>
        </section>
        <nuxt-content :document="page" />

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
import PageContent from "~/components/layout/PageContent.vue";
import PageGitHubInfo from "~/components/content/PageGitHubInfo.vue"
import { RepoResponse, repoInfoFromJSON } from '~/apiTypes/github/repo-info';
import {timeFormatterMixin} from "~/mixins/timeFormatter";
import { Context } from '@nuxt/types';
import { contentPageMixin, getPageInfo, getRepoInfo} from "~/mixins/contentPage";

export default Vue.extend({
  name: "th2BoxPage",
  components: {
    PageContent, PageGitHubInfo
  },
  mixins: [timeFormatterMixin, contentPageMixin],
  data: () => ({
    error: false,
    page: null as any,
    repoInfo: null as RepoResponse | null
  }),
  async asyncData (context: Context) {
    const pageInfo = await getPageInfo(context)
    return {
      page: pageInfo,
      repoInfo: await getRepoInfo(context, pageInfo)
    }
  },
})
</script>

<style scoped>

</style>
