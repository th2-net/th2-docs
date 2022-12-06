<template>
	<v-app-bar
		fixed
		app
		:color="$vuetify.theme.dark ? 'primary darken-4' : 'secondary'"
		class="top-layout"
	>
		<div class="header-container">
			<div class="meta-btns">
				<g-link to="/" class="logo-container" v-ripple>
					<img :src="logo" />
				</g-link>
				<slot name="module-nav" />
			</div>
			<v-spacer />
			<slot name="sections-nav" />
			<v-spacer />
			<div class="header-btns">
				<v-btn dark :href="$static.metadata.githubRepoLink" target="_blank" icon>
					<v-icon>mdi-github</v-icon>
				</v-btn>
				<theme-switcher />
				<v-btn dark icon v-if="dense" @click="$emit('input', !value)">
					<v-icon v-if="!value">mdi-menu</v-icon>
					<v-icon v-else>mdi-close</v-icon>
				</v-btn>
			</div>
		</div>
	</v-app-bar>
</template>

<static-query>
query {
	metadata {
		githubRepoLink
	}
}
</static-query>

<script>
import logo from '../../assets/img/Th2Logo_full_white.png'
import ThemeSwitcher from "~/components/layout/ThemeSwitcher";
import Footer from '~/components/layout/Footer'

export default {
	props: {
		value: Boolean,
		dense: Boolean
	},
	name: "Header",
	components: {
		ThemeSwitcher, Footer
	},
	data(){
		return{
			logo
		}
	}
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';
.meta-btns{
	height: 100%;
	display: flex;
	align-items: center;
}
.header-btns{
	display: flex;
	justify-content: flex-end;
}
.header-container{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: min(95%, 800px);
	margin: auto;
}
.logo-container{
	height: 80%;
	display: flex;
	justify-content: flex-start;
	margin-right: .5rem;
	svg{
		height: 100%;
	}
}
@media screen and (max-width: $window-width-md) {

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
