<template lang="pug">
- var prefix = 'lt-dialog';
div(class=prefix v-if="dialogType")
  div(class=prefix+'-mask' v-if="showMask" @click="hideMask")

  div(class=prefix+'-box' v-if="dialogType==='alert'" key=`${prefix}-alert`)
    div(class=prefix+'-title') {{dialogInfo.title}}
    div(class=prefix+'-content')
      div(class=prefix+'-msg') {{dialogInfo.msg}}
    div(class=prefix+'-op')
      div(class=prefix+'-btn' @click="hide(true)") {{dialogInfo.okTxt}}
  
  div(class=prefix+'-box' v-if="dialogType==='confirm'" key=`${prefix}-confirm`)
    div(class=prefix+'-title') {{dialogInfo.title}}
    div(class=prefix+'-content')
      div(class=prefix+'-msg') {{dialogInfo.msg}}
    div(class=prefix+'-op')
      div(class=prefix+'-btn '+prefix+'-btn-cancel' @click="hide(false, 'cannel')") {{dialogInfo.cannelTxt}}
      div(class=prefix+'-btn' @click="hide(true)") {{dialogInfo.okTxt}}
  
  div(class=prefix+'-box' v-if="dialogType==='prompt'" key=`${prefix}-prompt`)
    div(class=prefix+'-title') {{dialogInfo.title}}
    div(class=prefix+'-content')
      div(class=prefix+'-prompt')
        input(
          class=prefix+'-input'
          v-model="promptVal"
          :placeholder="dialogInfo.msg"
          @blur="showWarn=!promptVal"
        )
        br/
        span(class=prefix+'-prompt-error' v-if="showWarn") {{dialogInfo.emptyWarn}}
    div(class=prefix+'-op')
      div(class=prefix+'-btn' @click="hide(promptVal)") {{dialogInfo.okTxt}}
</template>

<script>
import extend from 'lodash/extend'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'

const defaultOpts = {
  showMask: true,
  maskClose: false,
  okTxt: '确认',
  cannelTxt: '取消'
}
export default {
  name: 'L7Dialog',
  data () {
    return {
      showMask: false,
      maskClose: false,
      dialogType: '',
      dialogInfo: undefined,
      promptVal: '',
      showWarn: false
    }
  },
  methods: {
    hideAll () {
      if (this.dialogInfo) this.dialogInfo.callback(false, 'hideall')
      this.dialogType = ''
      this.dialogInfo = undefined
    },
    hide (value, closeType) {
      const dialogType = this.dialogType
      if (dialogType === 'prompt') {
        if (this.dialogInfo.emptyWarn) {
          if (this.promptVal === '') {
            this.showWarn = true
            return
          } else {
            this.showWarn = false
          }
        }
        this.promptVal = ''
      }

      let beforeStatus = true
      if (isFunction(this.dialogInfo.beforeClose)) {
        beforeStatus = this.dialogInfo.beforeClose(value, closeType)
      }
      if (beforeStatus) {
        const callback = this.dialogInfo.callback
        this.dialogInfo = undefined
        this.dialogType = ''
        callback(value, closeType)
      }
    },
    hideMask () {
      if (this.maskClose) this.hide(false, 'mask')
    },
    show (type, msg, opts) {
      if (this.dialogInfo) this.dialogInfo.callback(false, 'replace')
      const config = extend({msg}, defaultOpts, opts)
      this.showMask = config.showMask
      this.maskClose = config.maskClose
      this.dialogType = type
      this.dialogInfo = config
    }
  }
}
</script>