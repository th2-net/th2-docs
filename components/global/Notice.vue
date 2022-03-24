<template>
<!--  <v-card class="my-3"-->
<!--    :class="note ? 'notice&#45;&#45;note': info ? 'notice&#45;&#45;info': warning ? 'notice&#45;&#45;warning' : ''">-->
<!--    <v-card-title  class="notice__title mb-3">-->
<!--      <v-icon dark class="mr-3">-->
<!--        {{note ? 'mdi-alert-circle': info ? 'mdi-information-outline': warning ? 'mdi-alert' : 'mdi-information'}}-->
<!--      </v-icon>-->
<!--      {{note ? 'Note': info ? 'Info': warning ? 'Warning' : 'Notice'}}-->
<!--    </v-card-title>-->
<!--    <v-card-text class="notice__text">-->
<!--      <slot />-->
<!--    </v-card-text>-->
<!--  </v-card>-->
  <v-alert class="my-3" border="left" text
           :color="note ? 'orange': info ? 'blue': warning ? 'red' : 'green'"
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
