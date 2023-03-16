<template>
  <v-menu offset-y open-on-hover eager >
    <template v-slot:activator="{ on, attrs }">
      <span class="term" v-bind="attrs" v-on="on">
        <slot>{{term}}</slot>
      </span>
    </template>
    <v-card min-width="200" max-width="400">
      <v-card-title>{{term}}</v-card-title>
      <v-card-text>
        <div v-if="!term" class="red--text">Term was not provided.</div>
        <div v-else-if="!error" v-html="definition" />
        <div v-else class="red--text">Term "{{term}}" was not found in the dictionary.</div>
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
      type: String
    }
  },
  data(){
    return{
    }
  },
  computed: {
    pageTerms(): {title: string, content: string}[] {
      // @ts-ignore
      return this.$page.doc.terms
    },
    definition(): string | undefined {
      return this.pageTerms.find(term => term.title === this.term)?.content
    },
    error(): boolean {
      return !this.definition
    }
  },
  methods:{

  }
})
</script>

<style>
.term {
  color: var(--link-color) !important;
  cursor: pointer;
}
</style>
