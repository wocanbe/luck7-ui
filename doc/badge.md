# ui-badge

## 概述
徽标组件

## 配置

需配合 ui 插件使用，在 ui 配置中的 components 字段中添加"badge"

## 参数

该组件支持5个属性和1个插槽

L7Badge支持的属性

|属性|类型|默认值|说明
|:-----:|:------:|:---:|:------
|value|[Number, String]||徽标值，显示在内容的右上角
|mode|String|normal|显示方式，值的范围:normal,dot,custom
|max|Number|99|最大显示值，value超过该值将显示为xx+(如"99+")
|className|String||自定义样式类，一般配合mode="custom"使用
|color|String||自定义徽标颜色，可以是任意合法的css颜色

注意：

  - className指定的样式类必须是全局样式，否则不会生效

## 使用

## 示例工程
```html
<style lang="scss" scoped>
.badgedemo1 {
  height: 24px;
  padding: 5px 12px 3px;
  margin: 6px;
  border-radius: 5px;
  background-color: #fff;
  font-size: 14px;
}
.badgedemo2 {
  height: 24px;
  margin: 6px;
  background-color: #fff;
  font-size: 14px;
  overflow: hidden;
  padding: 12px 24px;
  height: 36px;
}
</style>
<style>
.customer {
  position: absolute;
  z-index: 10;
  transform: rotateZ(45deg)scale(.9);
  top: 4px;
  right: -17px;
  background: #FF5722;
  padding: 0 16px 2px;
  color: #fff;
  font-size: 12px;
}
</style>
<template lang="pug">
  .main
    L7Badge.badgedemo1(:value="msgNo") 未读消息
    br/
    L7Badge.badgedemo1(mode="dot") 检查更新
    br/
    L7Badge.badgedemo1(value="热" color="orange") 智赢人生
    br/
    L7Badge.badgedemo2(mode="custom" value="new" className="customer") 智享人生
    br/
    button(@click="setMsgNo") 全部标为已读
</template>
<script>
export default {
  data: () => {msgNo: 9999},
  methods: {
    setMsgNo () {
      this.msgNo = 0
    }
  }
}
</script>
```
## 注意事项

## 已知问题
