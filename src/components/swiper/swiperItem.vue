<template lang="pug">
  component.lt-swiper-item(:is="tag")
    slot
</template>
<script>
export default {
  name: 'L7SwiperItem',
  componentName: 'L7SwiperItem',
  props: {
    tag: {
      type: String,
      default: 'li'
    }
  },
  mounted() {
    this.$parent.updateSlides()
  },
  beforeDestroy() {
    this.$parent.updateSlides()
  }
}
</script>
