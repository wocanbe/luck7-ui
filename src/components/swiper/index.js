import L7Swiper from './swiper.vue'
import L7SwiperItem from './swiperItem.vue'

function install (Vue) {
  if (install.installed) return
  Vue.component(L7Swiper.name, L7Swiper)
  Vue.component(L7SwiperItem.name, L7SwiperItem)
}
export default {install}
