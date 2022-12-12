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
    }
  }

})

// import { Octokit } from 'octokit'
import axios from 'axios'
const YAML = require('js-yaml')

export async function repoListBranches(options: {
	owner: string,
	repo: string
}){
	const {data} = await axios.get(`https://api.github.com/repos/${options.owner}/${options.repo}/branches`)
	return data.map((branch: any): string => branch.name)
}

export async function repoGetContent(options: {
	owner: string,
	repo: string,
	path: string,
	ref: string
}){
	const {data} = await axios.get(`https://api.github.com/repos/${options.owner}/${options.repo}/contents/${options.path}`,
		{
			params: {
				ref: options.ref
			}
		})
	return data as Content
}

export async function fetchCRs(repo: {
	owner: string
	name: string
}, selectedBranch: string = 'master'){
	const crs = {
		boxes: [] as any[],
		core: [] as any[],
		dictionaries: [] as any[],
		links: [] as any[]
	}
	try {
		const content = await repoGetContent({
			owner: repo.owner,
			repo: repo.name,
			path: '',
			ref: selectedBranch
		})
		if (!Array.isArray(content)) return crs
		const crFolders = content
			.filter(item => item.type === 'dir' && ['boxes', 'core', 'dictionaries', 'links'].includes(item.name))
		const getYamlFiles = async (path: string) => {
			const content = await repoGetContent({
				owner: repo.owner,
				repo: repo.name,
				path: path,
				ref: selectedBranch
			})
			if (!Array.isArray(content)) return []
			const yamlPromises = content
				.filter(item => item.type === 'file')
				.filter(item => item.name.endsWith('.yaml') || item.name.endsWith('.yml'))
				.filter(item => item.download_url)
				.map(async (item) => {
					const {data} = await axios.get(item.download_url as string)
					return data
				})
			const yamls = await Promise.all(yamlPromises)
			return yamls.map(yaml => YAML.load(yaml))
		}
		for (let folder of crFolders){
			if (folder.name === 'boxes')
				crs.boxes = await getYamlFiles(folder.path)
			if (folder.name === 'core')
				crs.core = await getYamlFiles(folder.path)
			if (folder.name === 'dictionaries')
				crs.dictionaries = await getYamlFiles(folder.path)
			if (folder.name === 'links')
				crs.links = await getYamlFiles(folder.path)
		}
		return crs
	} catch (e){
		return crs
	}
}

</script>
