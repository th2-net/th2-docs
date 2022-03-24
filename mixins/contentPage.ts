import { IContentOptions } from '@nuxt/content'
import Vue from "vue";
import CopyCodeBtn from "~/components/content/CopyCodeBtn.vue";
import {repoInfoFromJSON} from "~/apiTypes/github/repo-info";
import {Context} from "@nuxt/types";

export const getPageInfo = async ({ $content, $axios, error, route }: Context) => {
  let pageInfo: any
  try {
    pageInfo = await $axios.$get(`content/page?path=${route.path}`)
  } catch (e) {
    return error({ statusCode: 404, message: 'Page not found'  })
  }

  return pageInfo
}

export const getRepoInfo = async ({ $axios }: Context, pageInfo: any) => {
  let repoInfo = null
  if (pageInfo.repo && pageInfo.repo_owner) {
    repoInfo = repoInfoFromJSON(await $axios.$get(`/github/box/${pageInfo.repo_owner}/${pageInfo.repo}`))
  }
  return repoInfo
}

export const contentPageMixin = Vue.extend({
  head(){
    let meta = []
    if (this.page.title){
      meta.push({ hid: 'og:title', name: 'og:title', content: this.page.title })
    }
    if (this.page.description){
      meta.push(
        { hid: 'description', name: 'description',
          content: this.page.description
        },
        { hid: 'og:description', name: 'og:description',
          content: this.page.description
        }
      )
    }
    if (this.page.keywords && this.page.keywords.length){
      meta.push({ hid: 'keywords', name: 'keywords',
        content: this.page.keywords?.join(', ') + ', Exactpro, th2, test automation'
      })
    }
    if (this.page.image){
      meta.push({ hid: 'og:image', name: 'og:image', content: 'https://th2-docs.herokuapp.com' + this.page.image })
    }
    return{
      title: this.page.title,
      meta,
    }
  },
  data: () => ({
    page: {} as any
  }),
  methods: {
    getPageInfo, getRepoInfo
  },
  mounted() {
    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')
      // @ts-ignore
      for (const block of blocks) {
        const CopyButton = Vue.extend(CopyCodeBtn)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  }
})
