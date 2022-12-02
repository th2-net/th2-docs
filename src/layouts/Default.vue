<template>
	<div v-resize="onResize">
		<Header v-model:nav-panel="navPanel" :dense="windowSize.x < 1024" />
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
			<slot></slot>
		</v-main>
		<Footer />
	</div>
</template>

<script>
import '~/assets/scrollbar.scss'
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
import ContentTree from "~/components/layout/ContentTree";
export default {
	name: "DefaultLayout",
	components: {
			ContentTree, Header, Footer
		},
	data () {
		return {
			windowSize: { x: 0, y: 0 },
			navPanel: false,
			title: 'th2 docs'
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
.theme--dark.v-application{
	background: #1d1d1d !important;
}
.v-app-bar.v-app-bar--fixed.top-layout, .top-layout{
	z-index: 100 ;
}
</style>
