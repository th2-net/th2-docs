<template>
    <div>
        <h1 id="error-404-flag">Error 404 - page not found</h1>

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
