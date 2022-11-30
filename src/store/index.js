import Vuex from "vuex";
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state(){
    return {

    }
  },
  modules: {
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
          state.versions = state.versions.sort((a, b) => {
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
