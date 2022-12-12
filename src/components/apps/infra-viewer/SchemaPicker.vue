<template>
  <div>
		<v-select v-model="selectedBranch" :items="branches"
							@change="getCRs" :loading="loading.branches" />
		<v-progress-circular
			v-if="loading.crs"
			indeterminate
			color="primary"
		></v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {fetchCRs, repoGetContent, repoListBranches} from "./fetch-infra-schema";

type Branches = any //GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listBranches>
type Content = any //GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.getContent>

export default Vue.extend({
  name: 'InfraSchemaPicker',
  props: {
    schemaLink: {
      type: String,
      default: 'https://github.com/th2-net/th2-infra-schema-demo'
    }
  },
  data(){
    return {
      branches: [] as Branches,
      selectedBranch: undefined as string | undefined,
			loading: {
				branches: false,
				crs: false
			}
    }
  },
  computed: {

  },
  methods: {
    getRepo(){
      const ownerAndRepo = this.schemaLink
        .replace('https://github.com/', '')
        .split('/')
      return {
        owner: ownerAndRepo[0] ?? 'th2-net',
        name: ownerAndRepo[1] ?? 'th2-infra-schema-demo'
      }
    },
    async fetchBranches(){
			this.loading.branches = true
      try {
        const repo = this.getRepo()
        const data = await repoListBranches({
          owner: repo.owner,
          repo: repo.name
        })
        this.branches = data
      } catch (e){
        this.branches = []
      }
			this.loading.branches = false
    },
    async getCRs(){
			this.loading.crs = true
			const result = await fetchCRs(
				this.getRepo(),
				this.selectedBranch)
			this.loading.crs = false
			this.$emit('crs', result)
    }
  },
  created(){
    this.fetchBranches()
  },
  watch:{
    schemaLink(){
      this.fetchBranches()
    },
		'loading.crs'(value){
			this.$emit('loading', value)
		}
  }

})
</script>
