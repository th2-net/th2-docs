<template>
  <div class="search-container">
    <button class="search-btn" @click="searchDialog = !searchDialog" v-ripple>
      <v-icon dark>
        mdi-magnify
      </v-icon>
      <span>
      Search
    </span>
    </button>
    <v-dialog  :width="dialogWidth" v-model="searchDialog">
      <v-card>
        <ais-instant-search
            :search-client="searchClient"
            index-name="docs"
            show-loading-indicator
          >
          <ais-configure :hits-per-page.camel="10" />
          <ais-search-box placeholder="Search here…" class="searchbox"  />
          <ais-hits :class-names="{
                'ais-Hits-list': 'ais-Hits-list custom-hits-list',
                'ais-Hits-item': 'ais-Hits-item custom-list-item'
              }">
              <!-- Use deprecated slot syntax, beacause it is brokes with relevant scope syntax -->
              <template slot="item" slot-scope="{ item }">
                <g-link :to="item.path" class="text--primary">
                  <div @click="searchDialog = false">
                    <ais-highlight :hit="item" attribute="title" class="text-h6" />
                    <p><ais-snippet :hit="item" attribute="content" /></p> 
                  </div>
                </g-link>    
              </template>
            </ais-hits>
            <AlgoliaLogo />
        </ais-instant-search>
      </v-card>
    </v-dialog>
  </div>

</template>

<script lang="ts">
import 'instantsearch.css/themes/algolia-min.css'
import Vue from 'vue'
import AlgoliaLogo from './AlgoliaLogo.vue'
import algoliasearch from 'algoliasearch'

export default Vue.extend({
    name: "SearchWindow",
    components: {
        AlgoliaLogo
    },
    props: {
        windowSize: {
            type: Object as () => {
                x: number;
                y: number;
            },
            required: true
        }
    },
    data() {
        return {
            searchDialog: false,
            // TODO: Use environment variables
            searchClient: algoliasearch("4U0QJ1EU4V", "25c9a8f508bd3bd78959f3da8ffd9568"),
        };
    },
    computed: {
        dialogWidth() {
            if (this.windowSize.x > 1024)
                return "500px";
            else
                return "100vw";
        }
    }
})
</script>

<style scoped lang="scss">
@import '~/assets/layout.scss';
.search-container{
  max-width: ($max-width * 3 / 5) - 40px;
  min-width: ($max-width * 3 / 5) - 80px;
}
.search-btn{
  width: 100%;
  text-align: left;
  background-color: var(--search__btn-bg-color);
  border: var(--search__btn-bg-color) solid 2px;
  border-radius: .2rem;
  padding: .3rem .5rem .3rem .2rem;
  transition: all 100ms ease-in-out;

  span{
    color: var(--search__text-color);
  }
}

.search-btn:hover{
  cursor: pointer;
  border-color: var(--search__btn-border-color);

  span{
    color: white;
  }
}


@media screen and (max-width: $window-width-md) {
  .search-container{
    max-width: ($max-width-md * 3 / 5) - 30px;
    min-width: ($max-width-md * 3 / 5) - 60px;
  }
  .search-btn{

  }
}

@media screen and (max-width: $window-width-sm) {
  .search-container{
    max-width: ($max-width-md / 4) - 20px;
    min-width: ($max-width-md / 4) - 40px;
  }

}
@media screen and (max-width: ($window-width-sm / 2)) {
  .search-container{
    max-width: unset;
    min-width: unset;
    margin: 0 2rem;
  }

  .search-btn{
    padding: .3rem;
    span{
      display: none;
    }
  }
}
</style>

<style>
.ais-Hits-list.custom-hits-list {
  margin-top: 0;
  padding-top: 1rem;
  padding-bottom: 2rem;
  flex-direction: column;
  flex-wrap: nowrap;
  max-height: 50vh;
  overflow-y: auto;
}
.ais-Hits-item.custom-list-item {
  width: 100%;
  margin: 0;
  border: none;
  box-shadow: none;
  padding: 0;
}
.ais-Hits-item.custom-list-item a {
  text-decoration: none;
}
.ais-Hits-item.custom-list-item a > div {
  padding: 1rem;
  border-radius: 5px;
  transition: color 0.3s ease-in-out;
}
.ais-Hits-item.custom-list-item a > div:hover {
  background-color: var(--search__btn-bg-color--hover);
}
.ais-PoweredBy {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
}
mark{
  color: #3f979f;
  text-decoration: underline;
  font-weight: bold;
  background: none !important;
  font-size: inherit !important;
}
</style>
