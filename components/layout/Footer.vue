<template>
  <v-footer class="flex justify-center py-6">
    <v-col class="footer__content">
      <v-row no-gutters>
        <v-col class="px-8 py-4">
          <img :src="logo" class="mb-4" style="min-width: 200px" />
          <div class="text-center">
            Build Software to Test Software
          </div>
        </v-col>
        <v-col class="px-8 py-4">
          <h2>Contact us</h2>
          <v-divider class="my-3" />
          <div class="d-flex align-center" v-for="contact in contacts" :key="contact.href">
            <v-btn icon :href="contact.href">
              <v-icon>{{contact.icon}}</v-icon>
            </v-btn>
            <a :href="contact.href">
              {{contact.text}}
            </a>
          </div>
        </v-col>
        <v-col class="px-8 py-4">
          <h2>Follow us</h2>
          <v-divider class="my-3" />
          <v-btn icon tile large v-for="social in socials" :key="social.href" :href="social.href" target="_blank">
            <v-icon>
              {{social.icon}}
            </v-icon>
          </v-btn>
        </v-col>
        
      </v-row>
      <v-divider class="my-12" />
      <div class="text-center text-caption">
        Copyright © 2009 - {{new Date().getFullYear()}} Exactpro. All Rights Reserved. Exactpro refers to Exactpro Systems Limited, registered in England and Wales, and/or one of its subsidiaries, each of which is a separate legal entity, registered in the relevant jurisdictions.
      </div>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "Footer",
  computed: {
    logo(){
      return this.$vuetify.theme.dark ? '/footer/logo_white.svg' : '/footer/logo.svg'
    },
    contacts(){
      return [
        { icon: 'mdi-email', href: 'mailto:docops@exactpro.com', text: 'docops@exactpro.com' },
        { icon: 'mdi-email', href: 'mailto:info@exactpro.com', text: 'info@exactpro.com' },
      ]
    },
    socials(){
      return [
        { icon: 'mdi-github', href: 'https://github.com/th2-net', color: '' },
        { icon: 'mdi-facebook', href: 'https://www.facebook.com/exactpro/', color: '' },
        { icon: 'mdi-twitter', href: 'https://twitter.com/exactpro', color: '' },
        { icon: 'mdi-youtube', href: 'https://www.youtube.com/c/exactprosystems', color: '' },
      ]
    }
  }
})
</script>

<style scoped>
.footer__content{
  max-width: 1000px;
}
</style>>

