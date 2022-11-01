import Vue from 'vue'
const marked = require('marked')

export const markdownMixin = Vue.extend({
  methods: {
    mdToHtml(md) {
      return marked.parse(md)
    }
  }
})
