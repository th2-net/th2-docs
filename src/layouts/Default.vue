<template>
	<div v-resize="onResize">

		<v-app-bar
			fixed
			app
			:color="$vuetify.theme.dark ? 'primary darken-4' : 'secondary'"
			class="top-layout"
		>
			<div class="header-container">
				<g-link to="/" class="logo-container">
					<img :src="logo" />
				</g-link>
				<search-window :window-size="windowSize" />
				<div class="header-btns">
          <v-btn dark :href="$static.metadata.githubRepoLink" target="_blank" icon>
            <v-icon>mdi-github</v-icon>
          </v-btn>
					<theme-switcher />
					<v-btn dark icon v-if="windowSize.x < 1024" @click="navPanel = !navPanel">
						<v-icon v-if="!navPanel">mdi-menu</v-icon>
						<v-icon v-else>mdi-close</v-icon>
					</v-btn>
				</div>
			</div>
		</v-app-bar>
		<v-navigation-drawer
			v-model="navPanel"
			v-if="windowSize.x < 1024"
			fixed
			width="90vw"
			style="min-width: 300px"
			class="layout__aside--left--sm pt-16 px-5">
			<ContentTree class="pl-3"/>
		</v-navigation-drawer>
		<v-main>
			<div class="layout--full">
				<ContentTree class="layout__aside--left--lg" />

				<slot></slot>

			</div>
		</v-main>
		<Footer />
	</div>
</template>

<static-query>
query {
  metadata {
    githubRepoLink
  }
}
</static-query>

<script>
import '~/assets/layout.scss'
import '~/assets/scrollbar.scss'
import logo from '../assets/img/Th2Logo_full_white.png'
import ContentTree from "~/components/layout/ContentTree";
import ThemeSwitcher from "~/components/layout/ThemeSwitcher";
import SearchWindow from "~/components/layout/SearchWindow";
import Footer from '~/components/layout/Footer'
export default {
	name: "DefaultLayout",
	components: {
			SearchWindow,
			ThemeSwitcher,
			ContentTree,
			Footer
		},
	data () {
		return {
			windowSize: { x: 0, y: 0 },
			navPanel: false,
			title: 'th2 docs',
			logo
		}
	},
	methods:{
		onResize () {
			this.windowSize = { x: window.innerWidth, y: window.innerHeight }
		},
	},
}
</script>

<style>
html {
	scroll-behavior: smooth;
}
#app{
	font-family: "Open Sans", sans-serif;
}
.v-app-bar.v-app-bar--fixed.top-layout, .top-layout{
	z-index: 100 ;
}
</style>

<style scoped lang="scss">
@import '~/assets/layout.scss';
.header-btns{
	max-width: ($max-width / 5);
	min-width: ($max-width / 5) - 50px;
	display: flex;
	justify-content: flex-end;
}
.header-container{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
}
.logo-container{
	max-width: ($max-width / 5);
	min-width: ($max-width / 5) - 50px;
	height: 80%;
	display: flex;
	justify-content: flex-start;

	svg{
		height: 100%;
	}
}
@media screen and (max-width: $window-width-md) {
	.header-btns{
		max-width: ($max-width-md / 5);
		min-width: ($max-width-md / 5) - 30px;
	}
	.logo-container{
		max-width: ($max-width-md / 5);
		min-width: ($max-width-md / 5) - 30px;
	}
}

@media screen and (max-width: $window-width-sm) {
	.header-btns{
		max-width: unset;
		min-width: unset;
	}
	.header-container {
		justify-content: space-between;
	}
	.logo-container{
		max-width: unset;
		min-width: unset;
	}
}
</style>
