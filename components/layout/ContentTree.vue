<template>
  <aside class="pt-5 content-tree-panel">
    <div class="sticky-tree pr-3">
      <h3 class="mb-3">Content</h3>
      <v-select class="my-3" outlined dense
                  v-model="version" :value="$store.state.version"
                  @change="onVersionChange"
                  return-object
                  :items="versions" item-text="number">

      </v-select>
      <div class="py-2">
        <nuxt-link exact to="/" class="main-section"
                   :class="{'nuxt-link-exact-active': '/' === $route.path}">
          <div class="tree__path-name">
            <span> Home </span>
          </div>
        </nuxt-link>
      </div>
      <div v-for="link in pagesTree" :key="link.path"
           class="py-2">
        <nuxt-link exact :to="link.path" class="main-section"
                   :class="{'nuxt-link-exact-active': link.path === $route.path}">
          <div class="tree__path-name">
            <span>
              {{link.title}}
            </span>
          </div>
        </nuxt-link>
        <v-treeview v-if="link.children.length"
                    class="ml-n3"
                    :items="link.children"
                    item-key="path"
                    item-text="title"
                    :open="activeRoute"
                    dense>
          <template v-slot:label="{ item }">
            <nuxt-link exact :to="item.path"
                       :class="{'nuxt-link-exact-active': item.path === $route.path}">
              <div class="tree__path-name">
                  {{item.title}}
              </div>
            </nuxt-link>
          </template>
        </v-treeview>
      </div>
    </div>


  </aside>

</template>

<script lang="ts">
import {processSearchMixin} from "../../mixins/processSearch";
import Vue from "vue";
import {Th2Version} from "~/apiTypes/content/versions";

export default Vue.extend({
  name: "ContentTree",
  mixins: [processSearchMixin],
  data: () => ({
    version: undefined as Th2Version | undefined
  }),
  computed: {
    pagesTree(){
      return this.$store.state.pagesTree
    },
    versions(){
      return this.$store.state.versions
    },
    // All tree nodes to expand
    activeRoute(){
      const path = this.$route.path
      return this.$store.state.pagesRoutes
        .filter((page: string) => path.startsWith(page))
    }
  },
  methods: {
    onVersionChange(v: Th2Version){
      console.log(v)
      this.$store.commit('setVersion', v)
      this.$store.dispatch('getPagesTree', v)
    }
  },
  created() {
    this.version = this.$store.state.version
  }


})
</script>

<style>
.v-treeview--dense .v-treeview-node__root{
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
