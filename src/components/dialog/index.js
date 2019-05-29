import L7Dialog from './dialog.vue'
import L7Toast from './toast.vue'
import creatGlobal from './factory'

let dialogInstance

function showAlert (msg, options) {
  return dialogInstance.show('alert', msg, options)
}

function showConfirm (msg, options) {
  return dialogInstance.show('confirm', msg, options)
}

function showPrompt (msg, options) {
  return dialogInstance.show('prompt', msg, options)
}

function showToast (msg, options) {
  return dialogInstance.showToast(msg, options)
}
function hideDialog (hasToast) {
  dialogInstance.hide(hasToast)
}

// export default {
//   alert: showAlert,
//   confirm: showConfirm,
//   prompt: showPrompt,
//   toast: showToast,
//   hide: hideDialog
// }

function install (Vue) {
  if (install.installed) return
  dialogInstance = creatGlobal(Vue, L7Dialog, L7Toast)
  Vue.prototype.$alert = showAlert
  Vue.prototype.$confirm = showConfirm
  Vue.prototype.$prompt = showPrompt
  Vue.prototype.$toast = showToast
  Vue.prototype.$hideDialog = hideDialog
}
export default {install}
