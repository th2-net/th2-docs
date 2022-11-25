<template>
	<v-select class="my-3" outlined dense
						v-model="versionNow"
						@change="onVersionChange"
						:items="versions">

	</v-select>
</template>

<script>
import Vue from 'vue'
import {mapMutations, mapGetters} from "vuex";
export default Vue.extend({
	name: "VersionSwitcher",
	data(){
		return {
			versionNow: ''
		}
	},
	computed:{
		...mapGetters(['versions', "currentVersion"])
	},
	methods:{
		...mapMutations(['setVersion']),
		onVersionChange(event){
			this.setVersion(event)
		}
	},
	watch:{
		currentVersion(value){
			this.versionNow = value
		}
	}
})
</script>

<style scoped>

</style>
