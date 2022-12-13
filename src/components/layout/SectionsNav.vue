<template>
	<component :is="group ? 'v-btn-toggle' : 'div'">
		<v-btn v-for="section in sections" :key="section.id"
					 :to="section.firstPage"
					 text :dark="dark" large
					 :class="{
						 'v-btn--active': isSectionActive(section.basePath) ,
						 'mx-3': !group
					 }"
					 style="text-transform: none"
					 class="elevation-0">
			{{section.title}}
		</v-btn>
	</component>
</template>

<static-query>
query {
	allSection {
		edges {
			node {
				id
				title
				firstPage
				basePath
			}
		}
	}
}
</static-query>

<script>
export default {
	name: "SectionsNav",
	props: {
		dark: Boolean,
		group: Boolean
	},
	computed: {
		sections(){
			return this.$static.allSection.edges
				.map(e => e.node)
				.reverse()
		}
	},
	methods: {
		isSectionActive(basePath){
			return this.$route.path.startsWith(basePath)
		}
	}
}
</script>

<style scoped>

</style>
