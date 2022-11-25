<template>
  <section v-if="repoInfo">
    <!-- Meta -->
    <v-row class="my-4">
      <v-col>
        <v-list-item :href="repoInfo.owner.html_url" target="_blank">
          <v-list-item-avatar>
            <v-img eager :src="repoInfo.owner.avatar_url" :alt="repoInfo.owner.login" />
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
      <v-col v-if="doc.related && doc.related.length">
        <div>Related links</div>
        <v-list-item v-for="link in doc.related" :key="link.name" :href="link.href" target="_blank" dense>
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
    <div class="my-4" v-if="!doc.hide_releases">
      <div>Releases</div>
      <spoiler class="release" :title="`${release.name} (${timeSince(release.published_at)})`" v-for="release in repoInfo.releases" :key="release.id">
        <v-card-text>
          <div>{{release.tag_name}}</div>
          <p class="text-h4 text--primary">
            {{release.name}}
          </p>
          <p>{{localeDateString(release.published_at)}} ({{timeSince(release.published_at)}})</p>
          <div class="text--primary" v-html="mdToHtml(release.body)" />
        </v-card-text>
      </spoiler>
    </div>
  </section>
</template>

<script>
import {markdownMixin} from "../../utils/mardownMixin";
import {timeFormatterMixin} from "../../utils/timeFormatterMixin";

export default {
  name: "GitHubRepoInfo",
  computed: {
    doc() {
      return this.$page?.doc || this.$page?.readmeDoc
    },
    repoInfo() {
      return this.doc._githubRepository
    }
  },
  mixins: [markdownMixin, timeFormatterMixin]
}
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
