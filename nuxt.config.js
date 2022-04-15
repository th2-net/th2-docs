import vuetifyConfig from './plugins/vuetify'
import {getRoutes} from "./plugins/sitemap";

let axiosBaseUrl = !!process.env.BASE_URL ? process.env.BASE_URL : !!process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/api/` : 'http://localhost:3000/api'
let axiosPublicBaseUrl = !!process.env.PUBLIC_BASE_URL ? process.env.PUBLIC_BASE_URL : !!process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/api/` : 'http://localhost:3000/api'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | th2 docs',
    title: 'th2 docs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description',
        content: 'Documentation for th2 - the next-generation test automation framework for financial markets'
      },
      { hid: 'keywords', name: 'keywords',
        content: 'Exactpro, th2, test automation, financial technologies, microservices, kubernetes, k8s'
      },
      { hid: 'og:site_name', name: 'og:site_name', content: 'th2 documentation' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:title', name: 'og:title', content: 'th2 docs' },
      { hid: 'og:description', name: 'og:description',
        content: 'Documentation for th2 - the next-generation test automation framework for financial markets' },
      { hid: 'og:image', name: 'og:image', content: 'https://th2.dev/og-image.png' },
      { hid: 'robot', name: 'robot', content: 'none' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  serverMiddleware: [
    '~/api/index.ts',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3000/api',
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: axiosPublicBaseUrl
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: axiosBaseUrl
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: vuetifyConfig,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  sitemap: {
    hostname: axiosPublicBaseUrl.replace('/api', '/'),
    routes() {
      return getRoutes();
    }
  }
}
