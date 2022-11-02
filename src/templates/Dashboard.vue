<template>
  <v-container class="layout__main">
    <h1>th2 Modules dashboard</h1>
    <!-- Families Section -->
    <section>
      <h2>Boxes groups</h2>
      <v-tabs v-model="familyTab" :show-arrows="false">
        <v-tab v-for="groupTab in families" :key="groupTab.family" > {{groupTab.family}} </v-tab>
      </v-tabs>
      <v-tabs-items :value="familyTab1" style="max-height: 400px; overflow: auto">
        <v-tab-item v-for="groupItem in families" :key="groupItem.family">
          <v-list>
            <v-list-item v-for="repo in groupItem.repos" :key="repo.id" :href="repo.html_url" target="_blank">
              <v-list-item-avatar>
                <v-img  :src="repo.owner.avatar_url" :alt="repo.owner.login" eager />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{repo.full_name}}</v-list-item-title>
                <v-list-item-subtitle>{{repo.custom_info.info_topics.join(', ')}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </section>
    <!-- Releases Section -->
    <h2>Last releases</h2>
    <v-list>
      <v-list-item v-for="repo in lastReleases" :key="repo.id" :href="repo.html_url" target="_blank">
        <v-list-item-avatar>
          <v-img  :src="repo.owner.avatar_url" :alt="repo.owner.login" eager />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{repo.full_name}}</v-list-item-title>
          <v-list-item-subtitle>Last release: {{repo.releases[0].name}} ({{timeSince(repo.releases[0].published_at)}})</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <h2>All releases</h2>
    <v-sheet :color="$vuetify.theme.dark ? 'primary darken-4' : 'secondary'"
             dark
             rounded elevation="12" class="mb-12 pa-2 mt-3"
             style="height: 400px; max-height: 40vh">
      <h3>Releases chart</h3>
      <v-chart :option="releasesChartOption" autoresize class="mb-n16"  />
    </v-sheet>

    <div v-for="(quarter, i) in groupedByQuarters" :key="i">
      <h3>{{quarter[0]}}</h3>
      <v-card v-for="repo in quarter[1]" :key="repo.id" class="my-4">
        <v-card-title>
          <v-avatar class="mr-3">
            <v-img :src="repo.owner.avatar_url" eager />
          </v-avatar>
          {{repo.full_name}}
        </v-card-title>
        <v-card-text>
          <div><a :href="repo.html_url" target="_blank">GitHub repository</a></div>
          <div>Language: {{repo.language}}</div>
          <div class="my-2">{{repo.description}}</div>
          <div>Last release: {{repo.releases[0].name}} (<time :datetime="repo.updated_at">{{timeSince(repo.releases[0].published_at)}}</time>)</div>
          <div>Last updated <time :datetime="repo.updated_at">{{timeSince(repo.updated_at)}}</time></div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {RepoResponse, dashboardInfoFromJSON, RepoGroupByFamily, DashboardResponse} from "../utils/dashboard-info";
import {timeFormatterMixin} from "../utils/timeFormatterMixin";
const dashboardInfo = require('../../temp/dashboard.json')

export default Vue.extend({
  name: "dashboard",
  // @ts-ignore
  metaInfo(){
    return {
      title: 'th2 Boxes Dashboard'
    }
  },
  mixins: [timeFormatterMixin],
  data: () => ({
    releasesFeed: [] as RepoResponse[],
    families: [] as RepoGroupByFamily[],
    showChart: false,
    familyTab: null,
    familyTab1: null
  }),
  watch: {
    familyTab(v){
      this.familyTab1 = v
    }
  },
  computed: {
    lastReleases(): RepoResponse[]{
      return this.releasesFeed.slice(0, 5)
    },
    groupedByQuarters(): Map<string, RepoResponse[]>{
      return this.releasesFeed.reduce((reposGroups: Map<string, RepoResponse[]>, currentRepo) => {
        const key = `${currentRepo.releases[0].published_at.getFullYear()} - Quarter ${Math.floor((currentRepo.releases[0].published_at.getMonth() + 3) / 3)}`
        if (reposGroups.has(key))
          reposGroups.get(key)?.push(currentRepo)
        else
          reposGroups.set(key, [currentRepo])
        return reposGroups
      }, new Map())
    },
    releaseChartLabels(): string[]{
      // @ts-ignore
      return Array.from(this.groupedByQuarters.keys())
          .reverse()
          // @ts-ignore
          .map((str) => str.replace('uarter ', ''))
    },
    releaseChartValues(): number[]{
      // @ts-ignore
      return Array.from(this.groupedByQuarters.values())
          .reverse()
          // @ts-ignore
          .map(repos => repos.reduce((releaseCount, currentRepo) => releaseCount + currentRepo.releases.length, 0))
    },
    releasesChartOption(): any {
      return {
        xAxis: {
          type: 'category',
          // @ts-ignore
          data: this.releaseChartLabels
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            // @ts-ignore
            data: this.releaseChartValues,
            type: 'line',
            smooth: true
          }
        ]
      }
    }
  },
  mounted() {
    this.showChart = true
  },
  created() {
    const dashboard = dashboardInfoFromJSON(dashboardInfo)
    this.releasesFeed = dashboard.releasesFeed
    this.families = dashboard.families
  }
})
</script>

<style scoped>

</style>
