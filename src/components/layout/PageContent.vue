<template>
  <aside class="pl-5 pt-5 page-content-panel sticky-aside" v-if="headings.length">
    <nav class="pr-2 pl-4 border-left">
			<page-git-hub-info />
			<page-git-hub-issue />
			<h3 class="mb-3 mt-7">On this page</h3>
      <ul>
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
			headersToHighlight: [],
			highlightMap: new Map(),
			observer: new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					this.highlightMap.set('#' + entry.target.id, entry.isIntersecting)
				})
				this.headersToHighlight = Array.from(this.highlightMap.keys())
					.filter(id => this.highlightMap.get(id))
			})
    }
  },
	computed: {
		headings(){
			return this.$page?.doc?.headings || this.$page?.readmeDoc?.headings
		},
	},
  methods:{
    isHighlighted(id){
      return this.headersToHighlight.findIndex(h => h === id) > -1
    },
		setupObserver(){
			this.observer.disconnect()
			this.headings
				.forEach(header => {
					const el = document.getElementById(header.anchor.replace('#', ''))
					this.observer.observe(el)
				})
		}
  },
  mounted() {
		setTimeout(() => {
			this.setupObserver()
		}, 100)
  },
  beforeDestroy() {
		this.observer.disconnect()
  },
	watch: {
		$route(){
			setTimeout(() => {
				this.setupObserver()
			}, 100)
		}
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
