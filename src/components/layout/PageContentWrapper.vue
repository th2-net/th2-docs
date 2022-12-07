<template>
	<nav v-if="!dense">
		<slot name="title" />
		<slot name="content" />
	</nav>
	<v-expansion-panels v-else flat class="v-sheet--outlined">
		<v-expansion-panel >
			<v-expansion-panel-header >
				<slot name="title" />
			</v-expansion-panel-header>
			<v-expansion-panel-content eager >
				<slot name="content" />
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
export default {
	props: {
		dense: Boolean
	},
	name: "PageContentWrapper"
}
</script>

<style scoped>

</style>
