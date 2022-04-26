<template>
  <v-menu offset-y @input="getTermOnce">
    <template v-slot:activator="{ on, attrs }">
      <span class="term" v-bind="attrs" v-on="on">
        <slot>{{term}}</slot>
      </span>
    </template>
    <v-card min-width="200" max-width="400">
      <v-card-title>{{term}}</v-card-title>
      <v-card-text>
        <v-progress-circular v-if="loading" color="primary" indeterminate />
        <nuxt-content v-else-if="!error" :document="definition" />
        <div v-else class="text--red">Term "{{term}}" was not found in the dictionary</div>
      </v-card-text>
    </v-card>
  </v-menu>

</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: 'Term',
  props: {
    term: {
      type: String,
      required: true
    }
  },
  data(){
    return{
      definition: {} as any,
      loading: false,
      loaded: false,
      error: false
    }
  },
  methods:{
    getTermOnce(){
      if (!this.loaded) this.getTerm()
      this.loaded = true
    },
    async getTerm(){
      this.loading = true
      try {
        this.definition = await this.$axios.$get(`terms/${this.term}`)
      } catch(e){
        this.error = true
      }
      this.loading = false
    }
  }
})
</script>

<style>
.term {
  text-decoration: underline;
  color: var(--link-color) !important;
  cursor: pointer;
}
</style>
