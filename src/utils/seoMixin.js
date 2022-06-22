import Vue from 'vue'

export const seoMixin = Vue.mixin({
  methods: {
    getMetaInfo({ title = '', description = '', keywords = [], image = '' }){
      const baseKeyWords = ['Exactpro', 'th2', 'test automation']
      const meta = []
      if (title){
        meta.push({ hid: 'og:title', name: 'og:title', content: title })
      }
      if (description){
        meta.push(
          { hid: 'description', name: 'description',
            content: description
          },
          { hid: 'og:description', name: 'og:description',
            content: description
          }
        )
      }
      if (keywords && keywords.length){
        meta.push({ hid: 'keywords', name: 'keywords',
          content: [...keywords, ...baseKeyWords].join(', ')
        })
      }
      if (image){
        meta.push({ hid: 'og:image', name: 'og:image', content: 'https://th2.dev' + image })
      }
      return{
        title,
        meta,
      }
    }
  }
})
