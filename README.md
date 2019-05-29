# luck7-ui

## 引入

 - 引入方式1:直接引用

```js
// main.js
import Vue from 'vue'
import Router from 'vue-router'
import luck7Ui from 'luck7-ui' // 引入组件
import App from './App'
import router from './router'
import store from './store'
import './assets/theme.scss' // 引入css

Vue.use(Router)
Vue.use(luck7Ui)

Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
```
```css
/* theme.scss */
@import '~luck7-ui/src/scss/index';
```

 - 引入方式2: 通过babel-plugin-import

```js
// .babelrc
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": [
    "transform-runtime",
    ["import", {
      "libraryName": "luck7-ui",
      "libraryDirectory": "src/components"
    }]
  ],
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["istanbul"]
    }
  }
}
```
```js
import Vue from 'vue'
import Router from 'vue-router'
import {icon, datepicker, dialog, swiper, badge, tabs, loading} from 'luck7-ui'
import App from './App'
import router from './router'
import store from './store'
import './assets/theme.scss' // 引入css

Vue.use(Router)
Vue.use(icon)
Vue.use(datepicker)
Vue.use(dialog)
Vue.use(swiper)
Vue.use(badge)
Vue.use(tabs)
Vue.use(loading)

Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
```
```css
/* theme.scss */
/* scss工具类，包括color工具类等 */
@import '~luck7-ui/src/scss/tools/index';
/* 皮肤相关变量以及全局css，可以不引入，在这儿重新定义 */
@import '~luck7-ui/src/scss/theme/index';
/* 下面引入各个组件样式 */
@import '~luck7-ui/src/scss/modules/icon';
@import '~luck7-ui/src/scss/modules/datepicker';
@import '~luck7-ui/src/scss/modules/dialog';
@import '~luck7-ui/src/scss/modules/swiper';
@import '~luck7-ui/src/scss/modules/badge';
@import '~luck7-ui/src/scss/modules/tabs';
@import '~luck7-ui/src/scss/modules/loading';
```
 - 引入方式3: 通过.luck7rc.js

```js
// 在webpack配置中增加如下loader
{
  test: require.resolve('luck7/plugins'),
  loader: ['babel-loader', 'luck7/libs/loader']
}
```
```js
module.exports = {
  plugins: {
    router: {
      routeFilter: '@/config/filter'
    },
    ui: {
      components: ['icon', 'datepicker', 'dialog', 'swiper', 'badge', 'tabs', 'loading']
    }
  }
}
```
```js
import Vue from 'vue'
import Router from 'vue-router'
import {l7Ui} from 'luck7/plugins'
import App from './App'
import router from './router'
import store from './store'

Vue.use(Router)
Vue.use(l7Ui)

Vue.config.productionTip = false
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

```
