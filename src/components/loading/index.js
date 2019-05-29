import creatLoading from './creat'
import creatDirective from './directive'

function install (Vue) {
  if (install.installed) return
  const globalLoading = creatLoading(Vue, document.body, true)
  Vue.prototype.loading = {
    isShow: () => globalLoading.isLoading,
    show (options = {}) {
      globalLoading.show(options)
    },
    hide () { globalLoading.hide() }
  }
  creatDirective(Vue, creatLoading)
}
export default {install}
