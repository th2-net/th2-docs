<template>
  <g-link to="/" class="logo-container">
    <img :src="src" />
  </g-link>
</template>

<script>
import logo from '../../assets/img/Th2Logo_full_white.png'
export default {
  name: "SiteLogo",
  props: {
    dark: {
      type: Boolean
    }
  },
  computed:{
    src(){
      return logo
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/layout.scss';
.logo-container{
  max-width: ($max-width / 5);
  min-width: ($max-width / 5) - 50px;
  height: 80%;
  display: flex;
  justify-content: flex-start;

  svg{
    height: 100%;
  }
}

@media screen and (max-width: $window-width-md) {
  .logo-container{
    max-width: ($max-width-md / 5);
    min-width: ($max-width-md / 5) - 30px;
  }
}

@media screen and (max-width: $window-width-sm) {
  .logo-container{
    max-width: unset;
    min-width: unset;
  }
}
</style>
