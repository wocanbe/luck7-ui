# ui-loading组件

## 概述

loading组件，实现loading效果

该组件在vue上注册了loading对象，该对象支持三个方法:show,hide,isShow

该组件注册了v-loading指令

## 参数

show方法用于显示loading，支持一个参数，该参数为String或Option类型，options类型示例如下

```javascript
{
  msg: String, // 提示文本
  type: String, // 使用内置动画的类型，取值范围default,dots,puff,round,triangle
  icon: String, // 动画图标
  animation: String, // 自定义动画(动画css类名),支持animate.scss
  hideTime: Number, // loading效果展示时间(超时将自动隐藏)，单位毫秒(ms)，默认值0，值为0时将永远显示直至手工关闭
  layerColor: String // loading效果遮罩颜色，默认为rgba(0,0,0,0)
}
```

v-loading指令支持show方法的所有参数，使用方法见示例

注意事项

  - 使用内置动画后将忽略icon和animation设置
  - type和icon都没指定的时候，将自动设置type=default

## 示例

```html
<style lang="scss">
.red {
  color: red;
}
.ele-loading-demo {
  position: relative;
  width: 500px;
  height: 400px;
  background: lightgreen;
}
</style>
<template lang="pug">
  .main
    |loading示例
    br/
    button(@click="showLoad1") 默认
    br/
    button(@click="showLoad2") 使用round效果，添加文本，并改变layerColor
    br/
    button(@click="showLoad3") 使用自定义动画
    br/
    button(@click="showLoad4") 自动关闭
    .ele-loading-demo(v-loading="isLoading"
      l7-loading-msg="Loading"
      l7-loading-layer-color="rgba(0,0,0,.6)"
      l7-loading-hide-time="wefewf"
      @click="isLoading=!isLoading") 指令形式
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    showLoad1 () {
      this.loading.show()
      setTimeout(this.hideLoad.bind(this), 3000)
    },
    showLoad2 () {
      this.loading.show({type: 'round', msg: '再飞一会', layerColor: 'rgba(141,215,182,.6)'})
      setTimeout(this.hideLoad.bind(this), 3000)
    },
    showLoad3 () {
      this.loading.show({animation: 'animated pulse infinite fast red', icon: 'heart'})
      setTimeout(this.hideLoad.bind(this), 3000)
    },
    showLoad4 () {
      this.loading.show({hideTime: 3000})
    },
    hideLoad () {
      this.loading.hide()
    }
  }
}
</script>
```

## 注意事项

## 已知问题
