import extend from 'lodash/extend'
import isString from 'lodash/isString'

function creatGlobal (Vue, dialog, toast) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const dialogEle = new Vue({
    el: div,
    template: '<div><l7-dialog ref="dialog"/><l7-toast ref="toast"/></div>',
    // template: '<div></div>',
    components: {
      l7Dialog: dialog,
      l7Toast: toast
    }
  })

  return {
    show (type, msg, opts) {
      if (!isString(msg)) { // 必须在弹出前检查，否则会导致没有弹出对话框，还盖住底下的html元素，无法操作
        return Promise.reject(new Error(type + '的msg配置错误，请检查'))
      }
      return new Promise((resolve, reject) => {
        let callback = (res, err) => {
          // err值
          // cannel 点击取消按钮
          // mask 点击遮罩关闭
          // replace 被其他dialog方法替代
          // hideall 调用隐藏方法(hideAll)
          err ? reject(err) : resolve(res)
        }
        const useOpts = extend(opts, {callback})
        dialogEle.$refs.dialog.show(type, msg, useOpts)
      })
    },
    showToast (msg, opts) {
      if (!isString(msg)) return Promise.reject(new Error('toast的msg配置错误，请检查'))
      return new Promise((resolve, reject) => {
        const useOpts = extend(opts, {
          callback (res, err) {
            err ? reject(err) : resolve(res)
          }
        })
        dialogEle.$refs.toast.show(msg, useOpts)
      })
    },
    hide () {
      dialogEle.$refs.dialog.hideAll()
    }
  }
}

export default creatGlobal

