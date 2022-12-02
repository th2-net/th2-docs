<template>
	<aside v-if="items.length" class="pt-5 content-tree-panel sticky-aside">
		<div class="px-3 ml-n3 border-right">
			<VersionSwitcher />
			<slot name="sections-nav" />
			<v-treeview 	class="ml-n3 py-2" dense
										:items="items"
										item-key="path"
										item-text="title"
									 	hoverable
										:open="activePathsInContentTree"
										>
					<template v-slot:label="{ item }">
						<g-link exact :to="item.followPath"
											 :class="{'nuxt-link-exact-active':  ($route.path + '/').includes(item.path)}">
							<div class="tree__path-name">
								{{item.title}}
							</div>
						</g-link>
					</template>
			</v-treeview>
		</div>
	</aside>

</template>

<script>
import VersionSwitcher from "../content/VersionSwitcher";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "ContentTree",
	components: {VersionSwitcher},
  computed: {
		...mapGetters(['activePathsInContentTree', 'currentSubsection']),
		items(){
			return this.currentSubsection?.children || []
		}
  },
	methods: {
		...mapMutations(['setPath'])
	},
	created() {
		this.setPath(this.$route.path)
	}

}
</script>

<style>
.content-tree-panel .v-treeview--dense .v-treeview-node__root{
  min-height: 1.8rem;
}
</style>
<style scoped lang="scss">
@import "src/assets/variables";
.border-right{
	border-right: solid 1px var(--layout__border-color);
}
@media screen and (max-width: $window-width-sm){
	.border-right{
		border-right: unset;
	}
}
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
      //background-color: var(--content-tree__link-bg--active);
      //border-radius: .5rem;
      //padding: .3rem .7rem;
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
