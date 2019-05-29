import Luck7Icon from './icon.vue'

function install (Vue) {
  if (install.installed) return
  Vue.component(Luck7Icon.name, Luck7Icon)
}
export default {install}
