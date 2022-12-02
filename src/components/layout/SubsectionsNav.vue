<template>
	<v-btn-toggle dense>
		<v-btn v-for="subsection in subsections" :key="subsection.path"
					 outlined
					 :to="subsection.path"
					 class="text-capitalize">
			{{subsection.title}}
		</v-btn>
	</v-btn-toggle>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "SubsectionsNav",
	computed: {
		...mapGetters(['subsections'])
	}
}
</script>

<style scoped>

</style>
