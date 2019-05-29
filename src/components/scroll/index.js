import L7Scroll from './components/scroll.vue'

function install (Vue) {
  if (install.installed) return
  Vue.component(L7Scroll.name, L7Scroll)
}
export default {install}
