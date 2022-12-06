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
    layout: {
      state(){
        return {
          windowWidth: 1280
        }
      },
      mutations: {
        updateWindowWidth(state) {
          state.windowWidth = window.innerWidth
        }
      },
      getters: {
        isLayoutMd(state) {
          return state.windowWidth < 1280
        },
        isLayoutSm(state) {
          return state.windowWidth < 1024
        }
      }
    },
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
        resetContentTree(state){
          state.currentTree = []
          state.currentTreeId = null
        },
        setContentTree(state, payload: {
          contentTreeId: string,
          contentTreeJSON: string
        }){
          if (state.currentTreeId !== payload.contentTreeId){
            state.currentTreeId = payload.contentTreeId
            state.currentTree = JSON.parse(payload.contentTreeJSON)
          }
        },
        setModuleContentTree(state, contentTreeJSON: string){
          const tree: TreeNode[] = JSON.parse(contentTreeJSON)
          const id = tree[0].path
          if (state.currentTreeId !== id){
            state.currentTreeId = id
            state.currentTree = tree
          }
        }
      },
      getters: {
        currentTree(state){
          return state.currentTree
        },
        currentPage(state, getters, rootState: any){
          const searchNode = (tree: TreeNode[]): TreeNode | undefined => {
            let foundNode = undefined
            for (let node of tree) {
              if (node.path.startsWith(rootState.router.path))
                return foundNode = node
              else foundNode = searchNode(node.children)
              if (foundNode) break
            }
            return foundNode
          }
          return searchNode(state.currentTree)
        },
        subsections(state){
          return state.currentTree.map((node: TreeNode) => ({
            title: node.title,
            path: node.path,
            followPath: node.followPath
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
