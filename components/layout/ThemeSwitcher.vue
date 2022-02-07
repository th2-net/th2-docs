<template>
  <v-btn dark icon @click="switchTheme">
    <v-icon v-if="!$vuetify.theme.dark">mdi-brightness-5</v-icon>
    <v-icon v-else>mdi-brightness-2</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ThemeSwitcher",
  methods:{
    switchTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      document.cookie = `theme=${this.$vuetify.theme.dark ? 'dark' : 'light'}; max-age=${60*60*24*365}`
    }
  },
  mounted(){
  }
}
</script>

<style scoped>

</style>
