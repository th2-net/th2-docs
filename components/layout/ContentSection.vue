<template>
  <li>
    <nuxt-link :to="section.path">{{section.title}}</nuxt-link>
    <ul v-if="section.children && section.children.length">
      <content-section
        v-for="page in section.children"
        :key="page.path"
        :section="page" />
    </ul>
  </li>
</template>

<script>
export default {
  name: "ContentSection",
  props: {
    section: Object
  }
}
</script>

<style scoped>

</style>
