<template>
	<div v-resize="onResize">
		<Header v-model="navPanel" :dense="isLayoutSm">
			<template v-if="isModulePage" v-slot:module-nav>
				<v-btn :to="moduleMetaInfo.mainPath"
							 exact large
							 dark text class="text-lowercase font-weight-bold">
					{{moduleMetaInfo.name}}
				</v-btn>
			</template>
			<template v-else-if="!isLayoutSm" v-slot:sections-nav>
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
			<ContentTree class="pl-3" ignore-hidden>
				<template v-if="isLayoutSm && !isModulePage" v-slot:sections-nav>
					<SectionsNav class="mx-3 my-2" group />
				</template>
				<template v-if="isLayoutSm && !isModulePage" v-slot:subsections-nav>
					<SubsectionsNav class="mx-3 my-2" />
				</template>
			</ContentTree>
		</v-navigation-drawer>
		<v-main class="main-container">
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
import {isModulePage} from "../utils/pathIdentification";
import SubsectionsNav from "../components/layout/SubsectionsNav.vue";
export default {
	name: "DefaultLayout",
	components: {
			SubsectionsNav,
			ContentTree, Header, Footer, SectionsNav
		},
	data () {
		return {
			navPanel: false,
			title: 'th2 docs'
		}
	},
	computed: {
		...mapGetters(["isLayoutSm"]),
		isModulePage(){
			return isModulePage(this.$route.path)
		},
		moduleMetaInfo(){
			return {
				name: this.$page?.doc?.meta?.module_name,
				mainPath: this.$page?.doc?.meta?.main_path
			}
		}
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
.main-container {
	min-height: calc(100vh - 440px);
}
</style>
