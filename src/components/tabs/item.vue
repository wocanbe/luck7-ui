<template lang="pug">
  li.lt-tabs-item
    slot
</template>
<script>
export default {
  name: 'L7TabsItem',
  props: {
    label: {
      type: String,
      required: true
    },
    path: String,
    closable: {
      type: Boolean,
      default: false
    },
    icon: [String, Object],
    badge: [Number, String, Object]
  },
  data () {
    return {
      currentName: undefined
    }
  },
  methods: {
    updateNav () {
      this.$parent.updateNav()
    }
  },
  mounted () {
    this.updateNav()
  },
  updated () {
    this.updateNav()
    // console.log(this.$parent.activeKey, this.currentName)
  },
  destroyed () {
    this.updateNav()
    // this.updateNav()
  }
}
</script>

