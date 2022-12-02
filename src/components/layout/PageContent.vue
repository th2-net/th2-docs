<template>
  <aside class="pl-5 pt-5 page-content-panel sticky-aside" v-if="headings.length">
    <nav class="pr-2 pl-4 border-left">
			<page-git-hub-info />
			<page-git-hub-issue />
			<h3 class="mb-3 mt-7">On this page</h3>
      <ul v-scroll="onScroll">
        <li v-for="(header, index) in headings" :key="header.anchor"
            :class="{
											'font-weight-bold': header.depth === 1,
											'py-2': header.depth === 2,
											'h2-border': header.depth === 2 && index > 0 && headings[index-1].depth !== 1,
											'ml-2 pb-2': header.depth === 3,
											'ml-3 pb-2': header.depth === 4,
											'ml-4 pb-2': header.depth === 5,
											'ml-5 pb-2': header.depth >= 6
										}">
          <a :href="header.anchor" :class="{'active': isHighlighted(header.anchor)}">
            <div>{{header.value}}</div>
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
		headings(){
			return this.$page?.doc?.headings || this.$page?.readmeDoc?.headings
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
          headersToHighlight.push(this.headings[index].anchor)
      })
      this.headersToHighlight = headersToHighlight
    },
    isHighlighted(id){
      return this.headersToHighlight.findIndex(el => el === id) > -1
    },
		scrollToHeading(hash){
			this.$router.push({ ...this.$route, hash })
		}
  },
  mounted() {
		setTimeout(() => {
			this.headersToCheck = this.headings
				.filter(header => header.depth > 1)
				.map(header => {
					return document.getElementById(header.anchor.replace('#', ''))
				})
			this.onScroll()
		}, 100)

  },
  beforeDestroy() {
    this.headersToCheck = []
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/variables";

.border-left{
	border-left: solid 1px var(--layout__border-color);
}
@media screen and (max-width: $window-width-sm){
	.border-left{
		border-left: unset;
	}
}
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
