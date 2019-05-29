import isString from 'lodash/isString'
import L7Loading from './loading.vue'

function creatLoading (Vue, el, isGlobal) {
  const div = document.createElement('div')
  let template = '<global-loading ref="loading" :style="bgColor" v-if="isLoading" :type="type" :msg="msg" :animation="animation" :icon="icon"'
  if (isGlobal) template += ' style="position:fixed"'
  template += '/>'
  el.appendChild(div)

  const loading = new Vue({
    el: div,
    template,
    components: { globalLoading: L7Loading },
    data () {
      return {
        isLoading: false,
        type: undefined,
        msg: undefined,
        animation: undefined,
        icon: undefined,
        bgColor: undefined
      }
    },
    methods: {
      show (options) {
        if (isString(options)) options = {msg: options}
        const {msg, type, icon, animation, hideTime, layerColor} = options
        if (hideTime) {
          setTimeout(() => {
            this.isLoading = false
          }, hideTime)
        }
        this.msg = msg
        if (type) this.type = type
        else if (icon) {
          this.type = undefined
          this.icon = icon
          this.animation = animation
        } else this.type = 'default'
        this.bgColor = layerColor ? {background: layerColor} : undefined
        this.isLoading = true
      },
      hide () {
        this.isLoading = false
      }
    }
  })

  return loading
}
export default creatLoading
