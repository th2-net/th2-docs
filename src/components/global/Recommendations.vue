<template>
  <nav>
    <slot />
    <div class="row row--dense my-2">
      <div class="col-lg-4 col-sm-6 col-12" v-for="recommendation in items" :key="recommendation.href">
        <v-list-item class="v-sheet--outlined rounded"
                     :to="linkLocal(recommendation.href)"
                     :href="linkGlobal(recommendation.href)"
                     :target="targetForLink(recommendation.href)" >
          <v-list-item-icon v-if="recommendation.icon">
            <v-icon :color="recommendation.icon_color || 'primary'">{{recommendation.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-wrap">
              {{recommendation.title}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
type RecommendItem = {
  title: string,
  href: string,
  icon?: string,
  icon_color?: string
}

export default Vue.extend({
  name: "Recommendations",
  props:{
    items: {
      type: Array as () => RecommendItem[],
      required: true
    }
  },
  methods:{
    linkLocal(href: string){
      return this.linkGlobal(href) ? undefined : href
    },
    linkGlobal(href: string){
      return href.includes('https://') ? href : undefined
    },
    targetForLink(href: string){
      return this.linkGlobal(href) ? '_blank' : '_self'
    }
  }
})
</script>

<style scoped>

</style>
