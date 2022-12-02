<template>
  <v-expansion-panels class="my-4">
    <v-expansion-panel>
      <v-expansion-panel-header>
        {{title}}
      </v-expansion-panel-header>
      <v-expansion-panel-content eager>
        <slot/>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>

<script>
export default {
  name: "Spoiler",
  props: {
    title: String
  }
}
</script>

<style>
.doc-page .v-expansion-panel{
	max-width: min(100%, 100vw);
}
</style>
