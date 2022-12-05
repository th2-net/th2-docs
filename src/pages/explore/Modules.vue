<template>
	<div>
		<div class="d-flex flex-column my-5">
			<SubsectionsNav  class="mx-auto" />
		</div>
	</div>
</template>

<static-query>
query {
	testSection: section(id: "explore"){
		title
		contentTreeJSON
	}
}
</static-query>

<script>
import {mapMutations} from "vuex";
import SubsectionsNav from "../../components/layout/SubsectionsNav.vue";

export default {
	name: "Modules",
	components: {
		SubsectionsNav
	},
	methods: {
		...mapMutations(['setContentTree'])
	},
	created() {
		this.setContentTree({
			contentTreeId: 'Explore',
			contentTreeJSON: this.$static.testSection.contentTreeJSON
		})
	}
}
</script>

<style scoped>

</style>
