<template>
  <aside class="pl-5 pt-5 page-content-panel">
    <nav class="sticky-page-content">
      <!-- <h3 class="mb-3">Community <v-icon>mdi-github</v-icon></h3> -->
      <page-git-hub-info :pageInfo="pageInfo" />
      <page-git-hub-issue :pageInfo="pageInfo" />

      <h3 class="mb-3 mt-7">On this page</h3>
      <ul v-scroll="onScroll">
        <li v-for="(header, index) in toc" :key="header.id"
            :class="{
        'py-2': header.depth === 2,
        'h2-border': header.depth === 2 && index > 0,
        'ml-2 pb-2': header.depth === 3,
        'ml-3 pb-2': header.depth === 4,
        'ml-4 pb-2': header.depth === 5,
        'ml-5 pb-2': header.depth >= 6
        }">
          <a :href="'#'+header.id" :class="{'active': isHighlighted(header.id)}">
            <div>{{header.text}}</div>
          </a>
        </li>
      </ul>
    </nav>

  </aside>
</template>

<script>
import PageGitHubInfo from "~/components/content/PageGitHubInfo.vue"
import PageGitHubIssue from '~/components/content/PageGitHubIssue.vue'

export default {
  name: "PageContent",
  props: {
    pageInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    PageGitHubInfo, PageGitHubIssue
  },
  data(){
    return{
      headersToCheck: [],
      headersToHighlight: []
    }
  },
  computed: {
    toc(){
      return this.pageInfo.toc
    }
  },
  methods:{
    onScroll(){
      const headersToHighlight = []
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
      this.headersToCheck.forEach((el, index) => {
        if (isInViewport(el))
          headersToHighlight.push(this.toc[index].id)
      })
      this.headersToHighlight = headersToHighlight
    },
    isHighlighted(id){
      return this.headersToHighlight.findIndex(el => el === id) > -1
    }
  },
  mounted() {
    this.headersToCheck = this.toc.map(toc => document.getElementById(toc.id))
    this.onScroll()
  },
  beforeDestroy() {
    this.headersToCheck = []
  }
}
</script>

<style scoped lang="scss">
.page-content-panel{
  nav{
    min-width: 200px;
  }
  .h2-border{
    border-style: dashed;
    border-width: 1px 0 0 0 ;
  }
  ul{
    padding: 0;
    list-style-type: none;
  }
  a{
    text-decoration: none;
    font-size: .9rem;
    color: inherit;
  }
  a > div{
    transition: all 300ms ease-in-out;
  }
  li:hover > a > div{
    transform: translateX(.5rem);
  }
  // Colors
  .h2-border{
    border-color: var(--divider-color);
  }
  a{
    color: var(--toc-color);
    &.active{
      color: var(--toc-color--active);
    }
  }
}
</style>
