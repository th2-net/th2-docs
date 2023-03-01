<template>
    <div id="error-404-flag" class="error-container">
			<img src="~~/assets/img/chaos-cat.png" style="max-width: 100%">
			<div class="pa-5">
				<h1>Error 404: Page Not Found</h1>
				<p class="my-5">
					Sorry, but this page does not exist.
				</p>
				<v-btn to="/" color="primary" style="text-transform: none;">
					Go to homepage
				</v-btn>
			</div>
    </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
    name: 'Error404',
		methods: {
			...mapMutations(['resetContentTree'])
		},
		created() {
			this.resetContentTree()
		}
}
</script>

<style scoped>
.error-container {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	max-width: 1000px;
	margin: 0 auto 5rem;
}
</style>