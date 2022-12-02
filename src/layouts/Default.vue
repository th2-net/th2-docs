<template>
	<div v-resize="onResize">
		<Header v-model="navPanel" :dense="isLayoutSm">
			<template v-if="!isLayoutSm" v-slot:sections-nav>
				<SectionsNav dark />
			</template>
		</Header>
		<v-navigation-drawer
			v-model="navPanel"
			v-if="isLayoutSm"
			fixed
			width="90vw"
			style="min-width: 300px"
			class="pt-16 px-5">
			<ContentTree class="pl-3">
				<template v-if="isLayoutSm" v-slot:sections-nav>
					<SectionsNav group />
				</template>
			</ContentTree>
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
import ContentTree from "../components/layout/ContentTree";
import SectionsNav from "../components/layout/SectionsNav.vue";
import {mapGetters, mapMutations} from "vuex";
export default {
	name: "DefaultLayout",
	components: {
			ContentTree, Header, Footer, SectionsNav
		},
	data () {
		return {
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
