import L7Badge from './components/badge/index'
import L7DatePicker from './components/datepicker/index'
import L7Dialog from './components/dialog/index'
import L7Icon from './components/icon/index'
import L7Loading from './components/loading/index'
import L7Swiper from './components/swiper/index'
import L7Tabs from './components/tabs/index'

function install (Vue, options) {
  if (install.installed) return
  Vue.use(L7Badge)
  Vue.use(L7DatePicker)
  Vue.use(L7Dialog)
  Vue.use(L7Icon)
  Vue.use(L7Loading)
  Vue.use(L7Swiper)
  Vue.use(L7Tabs)
}

export default {
  install: install
}
