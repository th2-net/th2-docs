<template>
	<aside class="pt-5 content-tree-panel">
		<div class="sticky-tree px-3 ml-n3">
			<h3 class="mb-3">Content</h3>
			<v-select class="my-3" outlined dense
								v-model="versionNow"
								@change="onVersionChange"
								return-object
								:items="allVersions" item-text="number">

			</v-select>
			<div class="py-2">
				<g-link exact to="/" class="main-section"
									 :class="{'nuxt-link-exact-active': '/' === $route.path}">
					<div class="tree__path-name">
						<span> Home </span>
					</div>
				</g-link>
			</div>
			<div v-for="link in pagesTree" :key="link.path"
					 class="py-2">
				<g-link exact :to="link.path" class="main-section"
									 :class="{'nuxt-link-exact-active': link.path === $route.path}">
					<div class="tree__path-name">
            <span>
              {{link.title}}
            </span>
					</div>
				</g-link>
				<v-treeview v-if="link.children.length"
										class="ml-n3"
										:items="link.children"
										item-key="path"
										item-text="title"
										:open="activeRoute"
										dense>
					<template v-slot:label="{ item }">
						<g-link exact :to="item.path"
											 :class="{'nuxt-link-exact-active': item.path === $route.path}">
							<div class="tree__path-name">
								{{item.title}}
							</div>
						</g-link>
					</template>
				</v-treeview>
			</div>
		</div>
	</aside>

</template>

<script>
import pagesTrees from '../../../temp/pagesTrees.json'
import {mapMutations} from "vuex";

export default {
  name: "ContentTree",
  data(){
    return {
			pagesTrees,
			versionNow: ''
    }
  },
  computed: {
    pagesTree(){
      return this.pagesTrees || []
    },
		allVersions(){
			return ['1.7']
		},
		allPaths(){
			if (!this.pagesTrees) return []
			const paths = []
			function getPaths(node){
				paths.push(node.path)
				for (const child of node.children)
					getPaths(child)
			}
			this.pagesTree.forEach(tree => getPaths(tree))
			return paths
		},
    // All tree nodes to expand
    activeRoute(){
      return this.allPaths
        .filter(path => this.$route.path.startsWith(path))
    }
  },
	methods: {
    ...mapMutations(['setCurrentTh2Versions']),
		onVersionChange(event){
			// TODO: implement new versioning logic
		}
	},
	created() {
		// TODO: implement new versioning logic
		this.versionNow = '1.7'
	}

}
</script>

<style>
.content-tree-panel .v-treeview--dense .v-treeview-node__root{
  min-height: 1.8rem;
}
</style>
<style scoped lang="scss">
.content-tree-panel{
  // Базовые стили ссылок
  a {
    text-decoration: none;
    font-size: .85rem;
    transition: all 200ms ease-in-out;
    color: var(--content-tree__link);

    // Главные секции
    &.main-section {
      font-size: 1rem;
      color: var(--content-tree__link--main);
    }
    // Текст в обычном состоянии
    .tree__path-name{
      transition: all 50ms ease-in-out;
      white-space: normal;
      text-overflow: unset;
    }
    // Текст текущей ссылки
    &.nuxt-link-exact-active .tree__path-name {
      color: var(--content-tree__link--active);
      background-color: var(--content-tree__link-bg--active);
      border-radius: .5rem;
      padding: .3rem .7rem;
    }
  }

  .layout__aside--left--sm{
    a.nuxt-link-exact-active{
      .tree__path-name {
        background-color: var(--content-tree__link--active);
        border-radius: .5rem;
        padding: .3rem .7rem;
      }
    }
  }

  a:hover{
    color: var(--content-tree__link--hover);
    &.nuxt-link-exact-active {
      color: var(--content-tree__link--active);
    }
  }
  a.main-section:hover{
    color: var(--content-tree__link--active);
  }
}
</style>
