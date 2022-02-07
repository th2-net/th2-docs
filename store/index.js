import {processSearchMixin} from "../mixins/processSearch";

export const state = () => ({
  pagesTree: [],
  pagesRoutes: []
})

export const mutations = {
  setPagesTree(state, pages){
    state.pagesTree = pages
  },
  setPagesRoutes(state, routes){
    state.pagesRoutes = routes
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req, $content, $vuetify }) {
    const cookies = new Map()
    req?.headers?.cookie?.split('; ').forEach(c => {
      const [key, value] = c.split('=')
      cookies.set(key, value)
    })
    if (cookies.has('theme'))
      $vuetify.theme.dark = cookies.get('theme') === 'dark'
    let pages = await $content('/', { deep: true })
      .only(['title', 'dir', 'path'])
      .sortBy('weight', 'asc')
      .fetch()
    pages.unshift(
      {
        title: 'Dashboard',
        path: '/boxes/dashboard',
        dir: '/boxes'
      }
    )
    pages = processSearchMixin.methods.processPagesPaths(pages)
    commit('setPagesRoutes', pages)
    commit('setPagesTree', processSearchMixin.methods.constructPagesTree(pages))
  }
}

export const getters = {

}
