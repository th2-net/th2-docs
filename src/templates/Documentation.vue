<template>
	<div class="layout__doc-page">
		<v-container class="layout__main space-bottom">
			<article>
<!--        <h1 v-if="!doc.inner_title">{{ doc.title }}</h1>-->
<!--        <h1 v-else>{{ doc.inner_title }}</h1>-->
        <GitHubRepoInfo />
				<recommendations v-if="doc.read_before && doc.read_before.length"
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
				<recommendations v-if="doc.continue_learning && doc.continue_learning.length"
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
		hide_releases
    _githubRepository{
      html_url
      language
      description
      updated_at
      owner {html_url, avatar_url, login}
      releases {id, name, tag_name, body, published_at}
    }
  }
  readmeDoc: readmePage(id: $id) {
    title
    headings {anchor, value, depth}
    fileInfo{path}
  }
}
</page-query>

<script>
// TODO: Convert to TypeScript
// TODO: Move all images for docs to content folder and change links to relative
// TODO: Edit descriptions, titles and headers to get the correct ones
import '~/assets/doc-article.scss'
import PageContent from "../components/layout/PageContent";
import {getMetaInfo} from "../utils/seo";
import GitHubRepoInfo from "../components/content/GitHubRepoInfo";
export default {
	name: "Documentation",
  metaInfo() {
    const page = this.doc
    return getMetaInfo({
      title: page?.title,
      description: page?.description,
      keywords: page?.keywords,
      image: page?.image
    })
  },
	components: {
		PageContent, GitHubRepoInfo
	},
  computed: {
    doc() {
      return this.$page.doc || this.$page.readmeDoc
    }
  }
}
</script>

<style>
.space-bottom {
  margin-bottom: 50vh;
}
</style>
