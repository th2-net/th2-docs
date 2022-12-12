<template>
  <div>
		<SchemaPicker @crs="displayCRs" />
    InfraViewer
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SchemaPicker from './SchemaPicker.vue';

export default Vue.extend({
  name: 'InfraViewer',
  components: {
    SchemaPicker
  },
	methods: {
		displayCRs(crs: any){
			console.log(crs)
		}
	}
})
</script>
