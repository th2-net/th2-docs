<template>
	<div v-resize="onResize">
		<Header v-model:nav-panel="navPanel" :dense="isLayoutSm" />
		<v-navigation-drawer
			v-model="navPanel"
			v-if="isLayoutSm"
			fixed
			width="90vw"
			style="min-width: 300px"
			class="pt-16 px-5">
			<ContentTree class="pl-3"/>
		</v-navigation-drawer>
		<v-main>
			<slot />
		</v-main>
		<Footer />
	</div>
</template>

<script>
import '~/assets/scrollbar.scss'
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
import ContentTree from "~/components/layout/ContentTree";
import {mapGetters, mapMutations} from "vuex";
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
	computed: {
		...mapGetters(["isLayoutSm"])
	},
	methods:{
		...mapMutations(['updateWindowWidth']),
		onResize () {
			this.updateWindowWidth()
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
