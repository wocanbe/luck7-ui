import L7Badge from './badge.vue'

function install (Vue) {
  if (install.installed) return
  Vue.component(L7Badge.name, L7Badge)
}
export default {install}
