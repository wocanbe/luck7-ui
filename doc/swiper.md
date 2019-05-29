# ui-slider

## 概述
幻灯片组件

## 配置
该组件支持11个属性和2个插槽

L7Swiper支持的属性

|属性|类型|默认值|说明
|:-----:|:------:|:---:|:------
|effect|String|fade|切换动画效果
|current|Number|0|当前展示第几项(从0开始)，兼容微信
|value|Number||当前展示第几项(从0开始)，比current优先级高
|height|String,Number|auto|高度，兼容微信
|autoplay|Boolean|false|自动播放，兼容微信
|interval|Number|5000|自动滑动时间间隔，单位ms，不能小于1000，兼容微信
|arrow|String|hover|左右两侧切换按钮的展示方式，hover、always、never，兼容微信
|indicatorDots|Boolean|false|是否显示轮播状态区，兼容微信
|indicatorColor|String|rgba(0,0,0,.3)|轮播状态区点的颜色，兼容微信
|indicatorActiveColor|String|rgba(0,0,0,1)|当前轮播状态点的颜色，兼容微信
|trigger|String|click|轮播状态点触发控制的方式，click、hover，兼容微信
|bindchange|Function|-|轮播切换时调用的方法，兼容微信

由于实现方式问题，不支持微信中的duration(动画时长)和circular(循环播放开关)等。

L7Swiper支持2个插槽，用以实现修改展示项的显示效果及添加行为，以及修改dots的显示效果，详见示例

L7SwiperItem支持的属性

|属性|类型|默认值|说明
|:-----:|:------:|:---:|:------
|tag|string|li|L7SwiperItem对应的html标签

注意:

 - 切换动画效果

    - 通过css实现，支持入场动画和出场动画
    - 内部集成了fade,round-in,scale,scale-in,scale-out，支持通过css拓展更多效果
    - 不支持区分情况的出/入场动画，如区分左滑右滑的动画(transform)
## 参数

## 使用

## 示例工程
```html
<style lang="scss" scoped>
.customer {
  width: 100%;
  position: relative;
  .intro {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    right: 0;
    width: 150px;
    height: 100%;
    color: #fff;
    padding: 6px;
    text-indent: 2rem;
    font-size: 14px;
    text-align: left;
  }
}
</style>

<template lang="pug">
.main
  br/
  L7Swiper
    L7SwiperItem(v-for="item in sliderData" :key="item.id")
      img(:src="item.src")
  br/
  L7Swiper(effect="round-in" arrow="always")
    L7SwiperItem(v-for="item in sliderData" :key="item.id")
      img(:src="item.src")
  br/
  L7Swiper(effect="scale" :interval="3000" :autoplay="true" arrow="never")
    L7SwiperItem(v-for="item in sliderData" :key="item.id")
      img(:src="item.src")
  br/
  L7Swiper(effect="scale-in" :indicator-dots="true" indicator-color="lightskyblue" indicator-active-color="deepskyblue")
    L7SwiperItem(v-for="item in sliderData" :key="item.id")
      img(:src="item.src")
  br/
  L7Swiper(effect="scale-out")
    L7SwiperItem(v-for="item in sliderData" :key="item.id")
      .customer
        img(:src="item.src")
        .intro {{item.intro}}
</template>
<script>
export default {
  data () {
    return {
      sliderData: [{
        id: 1,
        src: '/static/1.jpg',
        intro: '张奶奶展示红军老物件：锅'
      }, {
        id: 2,
        src: '/static/2.jpg',
        intro: '张奶奶展示红军老物件：碗'
      }, {
        id: 3,
        src: '/static/3.jpg',
        intro: '张奶奶展示红军老物件：瓢'
      }, {
        id: 4,
        src: '/static/4.jpg',
        intro: '张奶奶展示红军老物件：盆'
      }]
    }
  }
}
</script>
```
## 注意事项

## 已知问题
