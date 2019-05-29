import L7Tabs from './tabs'
import L7TabsItem from './item.vue'

function install (Vue) {
  if (install.installed) return
  Vue.component(L7Tabs.name, L7Tabs)
  Vue.component(L7TabsItem.name, L7TabsItem)
}
export default {install}
