<template>
  <div class="layout__doc-page">
    <v-container class="layout__main">
      <article v-if="!error">
      <!-- Title -->
        <h1 v-if="!page['inner-title']">{{ page.title }}</h1>
        <h1 v-else>{{ page['inner-title'] }}</h1>
        <!-- Meta -->
        <v-row class="my-4">
          <v-col v-if="repoInfo">
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
          </v-col>
          <!-- Related links -->
          <v-col v-if="page.related.length">
            <div>Related links</div>
            <v-list-item v-for="link in page.related" :key="link.name" :href="link.href" target="_blank" dense>
              <v-list-item-icon v-if="link.icon">
                <v-icon>{{link.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{link.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>

        <!-- Releases -->
<!--        <section class="my-4" v-if="repoInfo">-->
<!--          <div>Releases</div>-->
<!--          <spoiler class="release" :title="`${release.name} (${timeSince(release.published_at)})`" v-for="release in repoInfo.releases" :key="release.id">-->
<!--            <v-card-text>-->
<!--              <div>{{release.tag_name}}</div>-->
<!--              <p class="text-h4 text&#45;&#45;primary">-->
<!--                {{release.name}}-->
<!--              </p>-->
<!--              <p>{{release.published_at.toLocaleDateString()}} ({{timeSince(release.published_at)}})</p>-->
<!--              <div class="text&#45;&#45;primary" v-html="mdToHtml(release.body)" />-->
<!--            </v-card-text>-->
<!--          </spoiler>-->
<!--        </section>-->
        <v-divider class="my-8" />
        <nuxt-content :document="page" />
      </article>
      <article v-else>
        <h1>Page not found</h1>
      </article>
    </v-container>
    <page-content :pageInfo="page" class="layout__aside--right" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import '~/assets/layout.scss'
import '~/assets/nuxt-content.scss'
// @ts-ignore
import PageContent from "~/components/layout/PageContent.vue";
import { RepoResponse, repoInfoFromJSON } from '~/apiTypes/github/repo-info';
import {timeFormatterMixin} from "~/mixins/timeFormatter";
import { Context } from '@nuxt/types';
import { contentPageMixin, getPageInfo, getRepoInfo} from "~/mixins/contentPage";
import { markdownMixin } from '~/mixins/markdown';

export default Vue.extend({
  name: "th2BoxPage",
  components: {
    PageContent
  },
  mixins: [timeFormatterMixin, contentPageMixin, markdownMixin],
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

<style lang="scss">
.release {
  h1, h2,h3,h4,h5 {
    margin: 0 0 1em;

    &::before {
      content: none;
      height: 0;
      margin: 0;
    }

    &::after {
      content: none;
      border: none;
    }

    a {
      text-decoration: underline;

      &::before {
        content: none;
        margin: 0;
      }
    }
  }
}

</style>
