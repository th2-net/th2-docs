<template>
  <div class="youtube-wrap mt-3 mb-5">
    <iframe width="560"
            height="315"
            :src="`https://www.youtube.com/embed/${id}?${muted ? 'mute=1&': ''}${autoplay ? 'autoplay=1&': ''}${loop ? 'loop=1&': ''}${noControls ? 'controls=0&': ''}`"
            frameborder="0"
            allowfullscreen>

    </iframe>
  </div>
</template>

<script>
export default {
  name: "Youtube",
  props: {
    id: String,
    mute: Boolean,
    autoplay: Boolean,
    loop: Boolean,
    noControls: Boolean,
  },
  computed:{
    muted(){
      return this.mute || this.autoplay
    }
  }
}
</script>

<style>
.youtube-wrap {
  position: relative;
  padding-bottom: 56.25%; /* задаёт высоту контейнера для 16:9 (если 4:3 — поставьте 75%) */
  height: 0;
  overflow: hidden;
}
.youtube-wrap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-width: 0;
  outline-width: 0;
}
</style>
