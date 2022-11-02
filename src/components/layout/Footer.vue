<template>
  <v-footer class="flex justify-center py-6"
            :color="$vuetify.theme.dark ? 'primary darken-4' : 'secondary'" dark>
    <v-col class="footer__content">
      <div class="d-flex justify-space-between footer__sections">
        <div class="d-flex flex-column px-8 py-4 pa-sm-0 pa-xs-0">
          <a href="https://exactpro.com/" class="mb-4">
            <img :src="logo" style="width: max(200px, 100%)" />
          </a>
          <div class="text-center">
            Build Software to Test Software
          </div>
        </div>
        <div class="d-flex flex-column px-8 py-4 pa-sm-0 pa-xs-0">
          <h2>Contact Us</h2>
          <div class="highliter my-3" />
          <div class="d-flex align-center contact" v-for="contact in contacts" :key="contact.href">
            <v-btn icon :href="contact.href">
              <v-icon>{{contact.icon}}</v-icon>
            </v-btn>
            <a :href="contact.href" class="contact__text">
              {{contact.text}}
            </a>
          </div>
        </div>
        <div class="d-flex flex-column px-8 py-4 pa-sm-0 pa-xs-0">
          <h2>Follow Us</h2>
          <div class="highliter my-3" />
          <div class="d-flex">
            <v-btn icon tile large class="mr-2"
                 v-for="social in socials" :key="social.href"
                 :href="social.href" target="_blank">
            <v-img :src="social.icon" eager />
          </v-btn>
          </div>

        </div>

      </div>
      <v-divider class="my-12" />
      <div class="text-center text-caption">
        Copyright © 2009 - {{new Date().getFullYear()}} Exactpro. All Rights Reserved. Exactpro refers to Exactpro Systems Limited, registered in England and Wales, and/or one of its subsidiaries, each of which is a separate legal entity, registered in the relevant jurisdictions.
      </div>
      <div class="text-center text-caption policies">
        <a v-for="policy in policies" :key="policy.href"
           class="mx-1"
           :href="policy.href" target="blank">
           {{policy.text}}
        </a>
      </div>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import githubLogo from '../../assets/img/github.svg'
// @ts-ignore
import facebookLogo from '../../assets/img/facebook.svg'
// @ts-ignore
import twitterLogo from '../../assets/img/twitter.svg'
// @ts-ignore
import linkedinLogo from '../../assets/img/linkedin.svg'
// @ts-ignore
import youtubeLogo from '../../assets/img/youtube.svg'
// @ts-ignore
import exactpro from '../../assets/img/logo_white.svg'

export default Vue.extend({
  name: "Footer",
  computed: {
    logo(){
      // @ts-ignore
      return exactpro
    },
    contacts(){
      return [
        { icon: 'mdi-email', href: 'mailto:docops@exactpro.com', text: 'docops@exactpro.com' },
        { icon: 'mdi-email', href: 'mailto:info@exactpro.com', text: 'info@exactpro.com' },
        { icon: 'mdi-phone', href: 'tel:+4402033191644', text: '+44 (0) 20 3319 1644' },
        { icon: 'mdi-phone', href: 'tel:+16463403000', text: '+1 (646) 340 3000' },
      ]
    },
    socials(){
      return [
        { icon: githubLogo, href: 'https://github.com/th2-net', color: '' },
        { icon: facebookLogo, href: 'https://www.facebook.com/exactpro/', color: '' },
        { icon: twitterLogo, href: 'https://twitter.com/exactpro', color: '' },
        { icon: linkedinLogo, href: 'https://www.linkedin.com/company/exactpro-systems-llc?trk=biz-companies-cym', color: '' },
        { icon: youtubeLogo, href: 'https://www.youtube.com/c/exactprosystems', color: '' },
      ]
    },
    policies(){
      return [
        {text: 'Terms and Conditions', href: 'https://exactpro.com/terms-and-conditions'},
        {text: 'Privacy policy', href: 'https://exactpro.com/privacy-policy'},
        {text: 'Cookies policy', href: 'https://exactpro.com/cookies-policy'},
      ]
    }
  }
})
</script>

<style scoped>
.footer__content{
  max-width: 1000px;
}
.contact .contact__text{
  text-decoration: none;
  color: white;
}
.contact:hover .contact__text{
  text-decoration: underline;
}
.highliter{
  /* Highliter */

  width: 120.4px;
  height: 7px;

  /* Dark Blue/Dark Blue 400 */
  background: #78B6BC;

  border-radius: 9999999px;

}

.policies > a{
  color: inherit;
}

.policies > a:hover{
  text-decoration: none;
}

@media screen and (max-width: 1000px) {
  .footer__sections{
    flex-direction: column;
    align-content: center;
    align-items: center;
  }
  .footer__sections > .d-flex{
    max-width: 300px;
    align-items: center;
  }
}
</style>>

