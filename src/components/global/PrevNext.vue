<template>
  <nav class="row row--dense">
    <div class="col-sm-6 col-12">
      <v-list-item v-if="prevLink" nav nuxt :to="prevLink"
                   class="v-sheet--outlined rounded">
        <v-list-item-icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="text-right">
          <v-list-item-title>
            {{prevTitle}}
          </v-list-item-title>
          <v-list-item-subtitle>
            Previous Page
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon v-if="prevIcon">
          <v-icon>{{prevIcon}}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </div>
    <div class="col-sm-6 col-12">
      <v-list-item v-if="nextLink" nav nuxt :to="nextLink"
                   class="v-sheet--outlined rounded">
        <v-list-item-icon v-if="nextIcon">
          <v-icon>{{nextIcon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{nextTitle}}
          </v-list-item-title>
          <v-list-item-subtitle>
            Next Page
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </div>

  </nav>
</template>

<script>
export default {
  name: "PrevNext",
  props: {
    prevLink: String,
    prevTitle: String,
    prevIcon: String,
    nextLink: String,
    nextTitle: String,
    nextIcon: String
  }
}
</script>

<style scoped lang="scss">


</style>
