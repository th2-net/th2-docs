<template>
	<div class="layout__doc-page">
		<v-container class="layout__main space-bottom">
			<article>
        <h1 v-if="!doc.inner_title">{{ doc.title }}</h1>
        <h1 v-else>{{ doc.inner_title }}</h1>
        <GitHubRepoInfo />
				<recommendations v-if="!doc._githubRepository && doc.read_before && doc.read_before.length"
                         class="my-4" :items="doc.read_before" >
					<div>Before you start take a look at:</div>
				</recommendations>
				<VueRemarkContent class="doc-article" />
				<prev-next class="my-4" v-if="doc.prev || doc.next"
									 :prev-title="doc.prev ? doc.prev.title : ''"
									 :next-title="doc.next ? doc.next.title : ''"
									 :prev-link="doc.prev ? doc.prev.link : ''"
									 :next-link="doc.next ? doc.next.link : ''"
									 :prev-icon="doc.prev ? doc.prev.icon : ''"
									 :next-icon="doc.next ? doc.next.icon : ''">
				</prev-next>
				<recommendations v-if="!doc._githubRepository && doc.continue_learning && doc.continue_learning.length"
                         class="my-4" :items="doc.continue_learning" >
					<div>Continue learning:</div>
				</recommendations>
			</article>
		</v-container>
		<page-content class="layout__aside--right" />

	</div>
</template>

<page-query>
query DocPage ($id: ID!) {
  doc: docPage(id: $id) {
    title
    inner_title
    description
		content
		fileInfo{path}
    headings {anchor, value, depth}
    read_before{title, href, icon}
    continue_learning{title, href, icon}
    terms {id, title, content}
    related {name, icon, href}
    _githubRepository{
      html_url
      language
      description
      updated_at
      owner {html_url, avatar_url, login}
      releases {id, name, tag_name, body, published_at}
    }
  }
}
</page-query>

<script>
// TODO: Move all images for docs to content folder and change links to relative
// TODO: Edit descriptions, titles and headers to get the correct ones
import '~/assets/doc-article.scss'
import PageContent from "../components/layout/PageContent";
import {seoMixin} from "../utils/seoMixin";
import GitHubRepoInfo from "../components/content/GitHubRepoInfo";
import Vue from "vue";
import CopyCodeBtn from "../components/content/CopyCodeBtn";
export default {
	name: "Documentation",
  metaInfo() {
    const page = this.$page.doc
    return this.getMetaInfo({
      title: page?.title,
      description: page?.description,
      keywords: page?.keywords,
      image: page?.image
    })
  },
	components: {
		PageContent, GitHubRepoInfo
	},
  data() {
    return {
      variable: 123
    }
  },
	mixins: [seoMixin],
  computed: {
    doc() {
      return this.$page.doc
    }
  },
  mounted() {
    // TODO: Make copy button to be displayed correctly
    setTimeout(() => {
      const blocks = document.querySelectorAll('.doc-article pre')
      for (const block of blocks) {
        const CopyButton = Vue.extend(CopyCodeBtn)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  }
}
</script>

<style>
.space-bottom {
  margin-bottom: 50vh;
}
</style>
