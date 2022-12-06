<template>
	<Article :doc="doc" />
</template>

<page-query>
query DocPage ($id: ID!) {
  doc: docPage(id: $id) {
		__typename
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
// TODO: Edit descriptions, titles and headers to get the correct ones
import {getMetaInfo} from "../utils/seo";
import Article from "../components/content/Article.vue";
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
		Article
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
