// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetifyConfig from './plugins/vuetify'
import store from './store'
import DefaultLayout from '~/layouts/Default.vue'

import { use } from 'echarts/core'

// import ECharts modules manually to reduce bundle size
import {CanvasRenderer} from 'echarts/renderers'
import {BarChart, LineChart} from 'echarts/charts'
import {GridComponent, TooltipComponent} from 'echarts/components'

import 'prismjs/themes/prism-tomorrow.css'

// Global components
import Term from './components/global/Term'
import CustomStepper from "./components/global/CustomStepper";
import Notice from "./components/global/Notice";
import PrevNext from "./components/global/PrevNext";
import Recommendations from "./components/global/Recommendations";
import Spoiler from "./components/global/Spoiler";
import Youtube from "./components/global/Youtube";

import ECharts from 'vue-echarts'

export default function (Vue, { appOptions, router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900',
  });

  Vue.use(Vuetify)
  use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent]);

  appOptions.vuetify = new Vuetify(vuetifyConfig);
  appOptions.store = store

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('term', Term)
  Vue.component('custom-stepper', CustomStepper)
  Vue.component('notice', Notice)
  Vue.component('prev-next', PrevNext)
  Vue.component('recommendations', Recommendations)
  Vue.component('spoiler', Spoiler)
  Vue.component('youtube', Youtube)
  Vue.component('v-chart', ECharts)
}
