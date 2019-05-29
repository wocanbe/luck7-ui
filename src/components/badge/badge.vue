<template lang="pug">
  span.lt-badge(ref="badge")
    slot
    sup(:class="classes" :style="styles" v-show="badge") {{finalCount}}
</template>
<script>
import {oneOf} from 'luck7-ui/src/utils'
export default {
  name: 'L7Badge',
  props: {
    value: [Number, String],
    mode: {
      type: String,
      default: 'normal',
      validator (value) {
        return oneOf(value, ['normal', 'dot', 'custom'])
      }
    },
    max: {
      type: [Number, String],
      default: 99
    },
    className: String,
    color: String
  },
  computed: {
    alone () {
      return this.$slots.default === undefined
    },
    styles () {
      if (this.color) return {background: this.color}
    },
    classes () {
      const backCls = []
      if (this.mode !== 'custom') {
        backCls.push(`lt-badge-${this.mode}`)
        if (this.alone) backCls.push(`lt-badge-${this.mode}-alone`)
      }
      if (this.className) {
        backCls.push(this.className)
      }
      return backCls
    },
    finalCount () {
      if (this.mode === 'dot') {
        return ''
      } else {
        return parseInt(this.value) >= parseInt(this.max) ? `${this.max}+` : this.value
      }
    },
    badge () {
      let status = false
      if (this.value) {
        status = !(parseInt(this.value) === 0)
      }
      if (this.mode === 'dot') {
        status = true
        if (this.value !== null) {
          if (parseInt(this.value) === 0) {
            status = false
          }
        }
      }
      return status
    },
  }
}
</script>
