import Vuex from "vuex";
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state(){
    return {
      currentTh2Version: {
        title: '1.7',
        path: '/1-7/'
      }
    }
  },
  mutations: {
    setCurrentTh2Versions(store, { title, path }){
      store.currentTh2Version = { title, path }
    }
  }
})