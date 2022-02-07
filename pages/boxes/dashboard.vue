<template>
  <div class="layout__doc-page">
    <v-container class="layout__main">
      <h1>th2 Boxes Dashboard</h1>
      <h2>Last Releases</h2>
      <v-list>
        <v-list-item v-for="repo in lastReleases" :key="repo.id" :href="repo.html_url" target="_blank">
          <v-list-item-avatar>
            <v-img  :src="repo.owner.avatar_url" :alt="repo.owner.login" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{repo.full_name}}</v-list-item-title>
            <v-list-item-subtitle>Last release: {{timeSince(repo.releases[0].published_at)}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <h2>All Releases</h2>
      <v-sheet color="cyan" rounded elevation="12" class="mb-12 pa-2" v-if="showChart">
        <v-sparkline :labels="releaseChartLabels"
                     :value="releaseChartValues"
                     color="white"
                     height="100"
                     line-width="2"
                     padding="16"
                     stroke-linecap="round"
                     smooth
                     auto-draw />
      </v-sheet>

      <div v-for="(quarter, i) in groupedByQuarters" :key="i">
        <h3>{{quarter[0]}}</h3>
        <v-card v-for="repo in quarter[1]" :key="repo.id" class="my-4">
          <v-card-title>
            <v-avatar class="mr-3">
              <v-img :src="repo.owner.avatar_url" />
            </v-avatar>
            {{repo.full_name}}
          </v-card-title>
          <v-card-text>
            <div><a :href="repo.html_url" target="_blank">GitHub repository</a></div>
            <div>Language: {{repo.language}}</div>
            <div class="my-2">{{repo.description}}</div>
            <div>Last release: <time :datetime="repo.updated_at">{{timeSince(repo.releases[0].published_at)}}</time></div>
            <div>Last updated <time :datetime="repo.updated_at">{{timeSince(repo.updated_at)}}</time></div>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {RepoResponse, dashboardInfoFromJSON} from "~/apiTypes/github/dashboard-info";
import {timeFormatterMixin} from "~/mixins/timeFormatter";

export default Vue.extend({
  name: "dashboard",
  head(){
    return {
      title: 'th2 Boxes Dashboard'
    }
  },
  mixins: [timeFormatterMixin],
  data: () => ({
    repos: [] as RepoResponse[],
    showChart: false
  }),
  computed: {
    lastReleases(): RepoResponse[]{
      return this.repos.slice(0, 5)
    },
    groupedByQuarters(): Map<string, RepoResponse[]>{
      return this.repos.reduce((reposGroups: Map<string, RepoResponse[]>, currentRepo) => {
        const key = `${currentRepo.releases[0].published_at.getFullYear()} - Quarter ${Math.floor((currentRepo.releases[0].published_at.getMonth() + 3) / 3)}`
        if (reposGroups.has(key))
          reposGroups.get(key)?.push(currentRepo)
        else
          reposGroups.set(key, [currentRepo])
        return reposGroups
      }, new Map())
    },
    releaseChartLabels(): string[]{
      return Array.from(this.groupedByQuarters.keys())
        .reverse()
        .map(str => str.replace('uarter ', ''))
    },
    releaseChartValues(): number[]{
      return Array.from(this.groupedByQuarters.values())
        .reverse()
        .map(repos => repos.reduce((releaseCount, currentRepo) => releaseCount + currentRepo.releases.length, 0))
    }
  },
  async fetch() {
    try {
      const { data: th2Repos } = await this.$axios.get('/github/dashboard-info')
      this.repos = dashboardInfoFromJSON(th2Repos)
    }
    catch (e) {
      console.error(e)
      this.repos = []
    }
  },
  mounted() {
    this.showChart = true
  }
})
</script>

<style scoped>

</style>
