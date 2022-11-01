<template>
  <v-alert class="my-3" border="left" text
           :color="color"
           :icon="note ? 'mdi-alert-circle': info ? 'mdi-information-outline': warning ? 'mdi-alert' : 'mdi-information'">
    <slot />
  </v-alert>
</template>

<script>
export default {
  name: "Notice",
  props: {
    note: Boolean,
    info: Boolean,
    warning: Boolean
  },
  computed: {
    color(){
      if (this.$vuetify.theme.dark)
        return this.note ? 'orange': this.info ? 'blue': this.warning ? 'red' : 'green'
      else
        return this.note ? 'orange darken-3': this.info ? 'blue darken-4': this.warning ? 'red darken-4' : 'green darken-4'
    }
  }
}
</script>

<style scoped lang="scss">
.notice--note{
  background-color: var(--note-bg-color);
  .notice__title{
    background-color: var(--note-header-bg-color);
    color: white;
  }
}

.notice--warning{
  background-color: var(--warning-bg-color);
  .notice__title{
    color: white;
    background-color: var(--warning-header-bg-color);
  }
}

.notice--info{
  background-color: var(--info-bg-color);
  .notice__title{
    color: white;
    background-color: var(--info-header-bg-color);
  }
}

</style>
