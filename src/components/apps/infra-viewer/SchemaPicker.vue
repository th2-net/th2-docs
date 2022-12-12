<template>
  <div>
		<v-select v-model="selectedBranch" :items="branches" @change="getCRs" />
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
      selectedBranch: undefined as string | undefined
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
    },
    async getCRs(){
			const result = await fetchCRs(
				this.getRepo(),
				this.selectedBranch)
			this.$emit('crs', result)
    }
  },
  created(){
    this.fetchBranches()
  },
  watch:{
    schemaLink(){
      this.fetchBranches()
    }
  }

})
</script>
