import Vuex from "vuex";
import Vue from 'vue'
import {TreeNode} from "../plugins/gridsome/plugin/content-tree/types";

Vue.use(Vuex)
export default new Vuex.Store({
  state(){
    return {

    }
  },
  modules: {
    router: {
      state(){
        return {
          path: '/',
          fullPath: '/'
        }
      },
      mutations: {
        setPath(state, path: string){
          state.path = path
        },
        setFullPath(state, path: string){
          state.fullPath = path
        }
      }
    },
    content: {
      state(){
        return {
          currentTreeId: null as string | null,
          currentTree: [] as TreeNode[]
        }
      },
      mutations: {
        setContentTree(state, payload: {
          contentTreeId: string,
          contentTreeJSON: string
        }){
          if (state.currentTreeId !== payload.contentTreeId){
            state.currentTreeId = payload.contentTreeId
            state.currentTree = JSON.parse(payload.contentTreeJSON)
          }
        }
      },
      getters: {
        subsections(state){
          return state.currentTree.map((node: TreeNode) => ({
            title: node.title,
            path: node.path
          }))
        },
        currentSubsection(state, getters, rootState: any){
          let currentRoute: string = rootState.router.path
          if (!currentRoute.endsWith('/')){
            currentRoute = currentRoute + '/'
          }
          return state.currentTree.find((subsection: TreeNode) => currentRoute.startsWith(subsection.path))
        },
        allPathsInContentTree(state){
          if (!state.currentTree) return []
          const paths: string[] = []
          function getPaths(node: TreeNode){
            paths.push(node.path)
            for (const child of node.children)
              getPaths(child)
          }
          state.currentTree.forEach((tree: TreeNode) => getPaths(tree))
          return paths
        },
        activePathsInContentTree(state, getters, rootState: any){
          let currentRoute: string = rootState.router.path
          if (!currentRoute.endsWith('/')){
            currentRoute = currentRoute + '/'
          }
          return getters.allPathsInContentTree
            .filter((path: string) => currentRoute.startsWith(path))
        }
      }
    },
    versions: {
      state(){
        return {
          versions: [],
          currentVersion: null
        }
      },
      getters: {
        versions(state){
          return state.versions
        },
        currentVersion(state){
          return state.currentVersion
        }
      },
      mutations: {
        registerVersion(state, version){
          if (!version) return
          if (!state.versions.includes(version))
            state.versions.push(version)
        },
        initVersions(state){
          state.versions = state.versions.sort((a: string, b: string) => {
            if (a < b) { return 1 }
            if (a > b) { return -1 }
            // a must be equal to b
            return 0
          })
          state.currentVersion = state.versions[0]
        },
        resetVersions(state){
          state.versions = []
          state.currentVersion = null
        },
        isVersionDisplayed(state, version){
          return state.versions.includes(version)
        },
        setVersion(state, version){
          state.currentVersion = version
        }
      }
    }
  }
})
