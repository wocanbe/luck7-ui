<template lang="pug">
- var prefix = 'lt-toast';
transition(name="slider" :enter-active-class="toastAni[0]" :leave-active-class="toastAni[1]")
  div(
    v-if="toastInfo"
    key=prefix
    :class=`['${prefix}','${prefix}-'+toastInfo.position, '${prefix}-'+toastInfo.type]`
  ) {{toastInfo.msg}}
</template>

<script>
import extend from 'lodash/extend'

const defaultOpts = {
  position: 'top',
  type: 'none',
  delay: 3000
}
export default {
  name: 'L7Toast',
  data () {
    return {
      toastInfo: undefined,
      toastAni: ['', '']
    }
  },
  methods: {
    show (msg, opts) {
      const config = extend({msg}, defaultOpts, opts)
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.toastInfo.callback(true)
        this.toastInfo = undefined
      }, config.delay)
      this.toastAni = ['lt-toast-in-'+config.position, 'lt-toast-out-'+config.position,]
      this.toastInfo = config
    }
  }
}
</script>