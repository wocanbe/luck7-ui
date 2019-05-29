<template lang="pug">
  .lt-loading
    .lt-loading-content
      .lt-loading-icon
        div(:class="loadingIcon")
      .lt-loading-text(v-if="msg") {{msg}}
</template>
<script>
export default {
  name: 'L7Loading',
  props: {
    type: String,
    msg: String,
    animation: String,
    icon: String
  },
  computed: {
    loadingIcon () {
      switch (this.type) {
        case 'default':
        case 'dots':
        case 'puff':
        case 'round':
        case 'triangle':
          return `loading-${this.type}`
        default:
          return [this.animation, 'lc-icon', `lc-icon-${this.icon}`]
      }
    }
  },
}
</script>