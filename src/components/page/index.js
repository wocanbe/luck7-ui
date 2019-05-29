import L7Page from './page.vue'

function install (Vue) {
  if (install.installed) return
  Vue.component(L7Page.name, L7Page)
}
export default {install}
