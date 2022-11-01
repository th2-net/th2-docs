<template>
  <v-app v-resize="onResize">
    <style v-if="!$vuetify.theme.dark">
      :root{
        /* scrollbar */
        --scrollbar-track-color: #e0e0e0;
        --scrollbar-thumb-color: #3f979f;
        --scrollbar-thumb-color--hover: #00646c;
        /* nuxt content */
        --link-color: #3f979f;
        --divider-color: #121212;
        --copy-btn__bg-color--hover: #424242;
        --copy-btn__bg-color: #171717;
        --table__border-color: #616161;
        --table__bg-color--hover: #c1c1c1;
        --table__bg-color--header: #5cb2ba;
        /* layout */
        --layout__border-color: #8f96a3;
        /* page content */
        --toc-color: #424242;
        --toc-color--active: var(--link-color);
        /* notice */
        --note-header-bg-color: #ffc107;
        --note-bg-color: #ffffae;
        --warning-header-bg-color: #b64c4c;
        --warning-bg-color: #ffd4cd;
        --info-header-bg-color: #006193;
        --info-bg-color: #e4ffff;
        /* content tree */
        --content-tree__link: #8b8b8b;
        --content-tree__link--hover: #424242;
        --content-tree__link--main: #424242;
        --content-tree__link--active: var(--link-color);
        --content-tree__link-bg--active: #dedede;
        /* search */
        --search__btn-bg-color: #4b5465;
        --search__btn-border-color: #5293c9;
        --search__text-color: #8b8b8b;
      }
    </style>
    <style v-else>
      :root{
        /* scrollbar */
        --scrollbar-track-color: #171717;
        --scrollbar-thumb-color: #3f979f;
        --scrollbar-thumb-color--hover: #00646c;
        /* nuxt content */
        --link-color: #3f979f;
        --divider-color: #b7b7b7;
        --copy-btn__bg-color--hover: #424242;
        --copy-btn__bg-color: #171717;
        --table__border-color: #aeaeae;
        --table__bg-color--hover: #2c2c2c;
        --table__bg-color--header: #004c53;
        /* layout */
        --layout__border-color: #8f96a3;
        /* page content */
        --toc-color: #c1c1c1;
        --toc-color--active: var(--link-color);
        /* notice */
        --note-header-bg-color: #ffc107;
        --note-bg-color: #855a00;
        --warning-header-bg-color: #b64c4c;
        --warning-bg-color: #450000;
        --info-header-bg-color: #006193;
        --info-bg-color: #003360;
        /* content tree */
        --content-tree__link: #8b8b8b;
        --content-tree__link--hover: #c1c1c1;
        --content-tree__link--main: #a6a6a6;
        --content-tree__link--active: var(--link-color);
        --content-tree__link-bg--active: #2c2c2c;
        /* search */
        --search__btn-bg-color: #00646c;
        --search__btn-border-color: #5293c9;
        --search__text-color: #8b8b8b;
      }
    </style>
    <v-app-bar
      fixed
      app
      :color="$vuetify.theme.dark ? 'primary darken-4' : 'secondary'"
      class="top-layout"
    >
      <div class="header-container">
        <site-logo />
        <search-window :window-size="windowSize" />
        <div class="header-btns">
          <v-btn dark :href="$store.state.githubRepoLink" target="_blank" icon>
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <theme-switcher />
          <v-btn dark icon v-if="windowSize.x < 1024" @click="navPanel = !navPanel">
            <v-icon v-if="!navPanel">mdi-menu</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="navPanel"
      v-if="windowSize.x < 1024"
      fixed
      width="90vw"
      style="min-width: 300px"
      class="layout__aside--left--sm pt-16 px-5">
        <ContentTree class="pl-3"/>
    </v-navigation-drawer>
    <v-main>
      <div class="layout--full">
        <ContentTree class="layout__aside--left--lg" />
        <Nuxt />
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import '~/assets/layout.scss'
import '~/assets/scrollbar.scss'
import '@mdi/font/css/materialdesignicons.min.css'
import ContentTree from "../components/layout/ContentTree";
import ThemeSwitcher from "../components/layout/ThemeSwitcher";
import SiteLogo from "../components/layout/SiteLogo";
import SearchWindow from "../components/layout/SearchWindow";
import FooterVue from '~/components/layout/Footer.vue';
import Footer from '~/components/layout/Footer.vue';
export default {
  name: "DefaultLayout",
  components: { SearchWindow, SiteLogo, ThemeSwitcher, ContentTree, FooterVue, Footer },
  data () {
    return {
      windowSize: { x: 0, y: 0 },
      navPanel: false,
      title: 'th2 docs'
    }
  },
  methods:{
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
  },
  beforeMount() {
    const cookies = new Map()
    document.cookie.split('; ').forEach(c => {
      const [key, value] = c.split('=')
      cookies.set(key, value)
    })
    if (cookies.has('theme'))
      this.$vuetify.theme.dark = cookies.get('theme') === 'dark'
  }
}
</script>


<style>
html {
  scroll-behavior: smooth;
}
#app{
  font-family: "Open Sans", sans-serif;
  scroll-behavior: smooth;
}
.v-app-bar--fixed.top-layout, .top-layout{
  z-index: 100 ;
}
</style>

<style scoped lang="scss">
@import '~/assets/layout.scss';
.header-btns{
  max-width: ($max-width / 5);
  min-width: ($max-width / 5) - 50px;
  display: flex;
  justify-content: flex-end;
}
.header-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
@media screen and (max-width: $window-width-md) {
  .header-btns{
    max-width: ($max-width-md / 5);
    min-width: ($max-width-md / 5) - 30px;
  }
}

@media screen and (max-width: $window-width-sm) {
  .header-btns{
    max-width: unset;
    min-width: unset;
  }
  .header-container {
    justify-content: space-between;
  }
}
</style>
