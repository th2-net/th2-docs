<template>
  <nav>
    <slot />
    <div class="row row--dense my-2">
      <div class="col-lg-4 col-sm-6 col-12" v-for="recommendation in items" :key="recommendation.href">
        <v-list-item class="v-sheet--outlined rounded" :to="recommendation.href">
          <v-list-item-icon v-if="recommendation.icon">
            <v-icon :color="recommendation.icon_color || 'primary'">{{recommendation.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
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
  }
})
</script>

<style scoped>

</style>
