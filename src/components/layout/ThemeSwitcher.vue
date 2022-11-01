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
			localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light')
    }
  },
	mounted() {
		this.$vuetify.theme.dark = localStorage.getItem('theme') === 'dark'
	},
	metaInfo(){
		if (this.$vuetify.theme.dark)
			return {
				link: [
					{ rel: 'stylesheet', href: '/th2-docs/css/darkTheme.css' },
				]
			}
		else
			return {
				link: [
					{ rel: 'stylesheet', href: '/th2-docs/css/lightTheme.css' },
				]
			}
	}
}
</script>

<style scoped>

</style>
