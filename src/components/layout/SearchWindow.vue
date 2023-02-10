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
        <v-card-title></v-card-title>
        <v-card-text>
          <ais-instant-search
              :search-client="searchClient"
              index-name="docs"
            >
            <!-- <v-text-field
              placeholder="Search docs..."
              v-model="searchValue"
              :loading="searchProgress"
              clearable
              @click:clear="searchResults=[]"
              
              outlined prepend-inner-icon="mdi-magnify" /> -->
            <ais-search-box placeholder="Search here…" class="searchbox"  />

            <!-- <div style="max-height: 400px; overflow-y: auto">
              <p v-if="!searchValue">Type in search to see results.</p>
              <p v-else-if="searchResults.length === 0">There no results. Please, try another input.</p>

              <v-list>
                <v-list-item v-for="page in searchResults" :key="page.path" :id="page.path"
                            two-line
                            @click="searchDialog = false"
                            :to="page.path" exact  >
                  <v-list-item-content>
                    <v-list-item-title v-html="highlightPrompt(page.title)">
                    </v-list-item-title>
                    <p v-html="highlightPrompt(page.content)">
                    </p>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>  -->
            <v-list>
              <ais-hits>
                <template slot="item" slot-scope="{ item }">
                  <v-list-item :key="item.path" two-line
                            @click="searchDialog = false"
                            :to="item.path" exact  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <ais-highlight :hit="item" attribute="title" />
                      </v-list-item-title>
                      <p><ais-snippet :hit="item" attribute="content" /></p>
                    </v-list-item-content>
                  </v-list-item>                  
                </template>
              </ais-hits>
            </v-list>
          </ais-instant-search>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn outlined
                 color="primary"
                 @click="searchDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>

import axios from 'axios'
import algoliasearch from 'algoliasearch'

// TODO: Integrate with Algolia search (possible only for public websites)
export default {
  name: "SearchWindow",
  props:{
    windowSize: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      searchClient: new algoliasearch('4U0QJ1EU4V', '25c9a8f508bd3bd78959f3da8ffd9568'),
      searchDialog: false,
      searchValue: '', // user input
      searchProgress: false, // show the loader
      searchResults: [],
      // new adds here
      //userPrompt:'',
      fresults: {},
    }
  },
  computed:{
    dialogWidth(){
      if (this.windowSize.x > 1024) return '500px'
      else return '100vw'
    }
  },
  methods: {
    // async search(){
    //   if (this.searchValue.length > 2){
    //     this.searchProgress = true
    //     const result = await this.$content('/', {deep:true})
    //       .only(['title', 'description', 'path', 'dir'])
    //       .limit(10)
    //       .search(this.searchValue)
    //       .fetch()
    //     this.searchResults = this.processPagesPaths(result)
    //     this.searchProgress = false
    //   }
    //   else this.searchResults = []
    // }

    // this function highlights the userPrompt as described by style class="prompt"
        highlightPrompt(text){
          return text.replace(new RegExp(`(${this.searchValue})`,'i'),`<span class="prompt">$1</span>` )
        }
  }, 
  watch:{
    
    async searchValue(newValue){
      if (this.searchValue.length > 2){
        this.searchProgress = true
        try{
          const tresult = await axios.get( 'https://th2-search.onrender.com/search/'+ newValue )
          this.searchResults = tresult.data.result // useful info inside axios data
        }
        catch(err){
          console.error(err)
        }
        this.searchProgress = false
      }
      
    }
  }
}
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
@media screen and (max-width: $window-width-sm / 2) {
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
    mark{
    color: #3f979f;
    font-weight: bold;
    background: none !important;
  }
</style>
