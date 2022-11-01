import { Th2Version } from "~/apiTypes/content/versions";
import {Context} from "@nuxt/types";
import {ContentTree} from "~/apiTypes/content/contentTree";

export const state = () => ({
  pagesTree: [] as ContentTree,
  pagesRoutes: [] as string[],
  versions: [] as Th2Version[],
  version: undefined as Th2Version | undefined,
  githubRepoLink: 'https://github.com/th2-net/th2-docs'
})

export const mutations = {
  setPagesTree(state: any, pages: ContentTree){
    state.pagesTree = pages
  },
  setPagesRoutes(state: any, routes: any){
    state.pagesRoutes = routes
  },
  setVersions(state: any, versions: Th2Version[]){
    state.versions = versions
  },
  setVersion(state: any, version: Th2Version){
    state.version = version
  }
}

export const actions = {
  // @ts-ignore
  async nuxtServerInit ({ commit, dispatch, state }: any, { req, $vuetify, route }: Context) {
    // Get theme
    const cookies = new Map()
    req?.headers?.cookie?.split('; ').forEach((c: string) => {
      const [key, value] = c.split('=')
      cookies.set(key, value)
    })
    if (cookies.has('theme'))
      $vuetify.theme.dark = cookies.get('theme') === 'dark'
    await dispatch('getVersions')
    // @ts-ignore
    const versionFromPath = route.path
      .match(/\/[^\/]*/)[0]
    let versionNow: Th2Version = state.versions.find((v: Th2Version) => v.content_dir === `/versions${versionFromPath}`) || state.versions.reverse()[0]
    commit('setVersion', versionNow)
    await dispatch('getPagesTree', versionNow)
  },
  async getVersions({ commit }: any){
    // @ts-ignore
    const versions: Th2Version = await this.$axios.$get('content/versions')
    commit('setVersions', versions)
  },
  async getPagesTree({ commit }: any, version: Th2Version){
    const versionString = version.content_dir.replace('/versions/', '')
    // @ts-ignore
    const tree: ContentTree = await this.$axios.$get(`content/tree/${versionString}`)
    // @ts-ignore
    const routes: string[] = await this.$axios.$get(`content/routes/${versionString}`)
    commit('setPagesTree', tree)
    commit('setPagesRoutes', routes)
  }
}

export const getters = {
  // Get sign of th2 version for url creation
  versionDirName: (state: any) => state.version?.content_dir.replace('/versions/', '')
}
