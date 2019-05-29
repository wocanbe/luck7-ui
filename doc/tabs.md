# ui-tabs

## 概述
标签组件

## 配置

需配合 ui 插件使用，在 ui 配置中的 components 字段中添加"tabs"

## 参数

该组件包含L7Tabs和L7TabsItem两个标签

L7Tabs支持4个属性和1个插槽，支持一个事件(tab-remove)

|属性|类型|默认值|说明
|:-----:|:------:|:---:|:------
|type|String|normal|标签样式，取值范围normal,brief,card
|mode|String|normal|标签工作模式，取值范围normal,route,link
|className|[String, Object, Array]||css样式名，支持vue语法
|styles|[String, Object]||内联样式，支持vue语法

tab-remove传回一个参数

|方法|返回参数|说明
|:-----:|:------:|:------
|tab-remove|Number|要删除项的序号，从0开始

L7TabsItem支持5个属性和1个插槽

|属性|类型|默认值|说明
|:-----:|:------:|:---:|:------
|label|String||关联的标签名称，必填
|path|String||内容对应的路径，只有在route或link模式下有效
|closable|Boolean|false|是否可以关闭
|icon|[String, Object]||标签要包含的图标
|badge|[Number, String, Object]||标签要包含的徽标

注意

  - normal模式下L7TabsItem插槽有效
  - route和link模式下L7TabsItem插槽无效，内容通过path指定

## 使用

## 示例工程
```html
<style lang="scss" scoped>
.customer {
  position: fixed;
  top: 48px;
  left: 12px;
  right: 12px;
  overflow: auto;
  bottom: 62px;
  background-color: #fff;
}
</style>
<style>
.custom {
  height: 300px;
}
</style>
<template lang="pug">
div
  br/
  |默认风格(nomarl)
  L7Tabs
    L7TabsItem(label="菜单1") 内容1
    L7TabsItem(label="菜单2") 内容2
    L7TabsItem(label="菜单3") 内容3
    L7TabsItem(label="菜单4") 内容4
  br/
  |极简风格(brief)
  L7Tabs(type="brief")
    L7TabsItem.test(label="菜单1") 内容1
    L7TabsItem(label="菜单2") 内容2
    L7TabsItem(label="菜单3") 内容3
    L7TabsItem(label="菜单4") 内容4
  br/
  |卡片风格(card)+自定义内容样式
  L7Tabs(
    type="card"
    class-name="custom"
    :styles="{color:'deepskyblue',fontSize:'18px'}"
  )
    L7TabsItem(label="菜单1") 内容1
    L7TabsItem(label="菜单2") 内容2
    L7TabsItem(label="菜单3") 内容3
    L7TabsItem(label="菜单4") 内容4
  br/
  |可关闭
  L7Tabs(@on-tab-remove="removeItem")
    L7TabsItem(label="菜单1") 内容1
    L7TabsItem(label="菜单2" :closable="true" v-if="showItem2") 内容2
    L7TabsItem(label="菜单3" :closable="true" v-if="showItem3") 内容3
    L7TabsItem(label="菜单4" :closable="true" v-if="showItem4") 内容4
  br/
  |默认风格(nomarl)+icon
  L7Tabs
    L7TabsItem(label="菜单1" icon="star") 内容1
    L7TabsItem(label="菜单2" :icon="{type:'heart',color:'red'}") 内容2
  br/
  |默认风格(nomarl)+tabs
  L7Tabs
    L7TabsItem(label="菜单1" :tabs="106") 内容1
    L7TabsItem(label="菜单2" :tabs="{mode: 'dot'}") 内容2
  |路由模式(route)
  L7Tabs(mode="route")
    L7TabsItem(label="菜单1" path="menu1")
    L7TabsItem(label="菜单2" path="menu2")
    L7TabsItem(label="菜单3" path="menu3")
    L7TabsItem(label="菜单4" path="menu4")
  br/
  |链接模式(link)
  L7Tabs(mode="link" styles="height:400px;")
    L7TabsItem(label="菜单1" path="http://www.baidu.com")
    L7TabsItem(label="菜单2" path="http://www.qq.com")
    L7TabsItem(label="菜单3" path="http://www.sina.com")
    L7TabsItem(label="菜单4" path="http://www.taobao.com")
  br/
  |路由模式+可关闭
  L7Tabs(mode="route" @tab-remove="removeItem")
    L7TabsItem(label="菜单1" path="menu1" :closable="true" v-if="showItem1")
    L7TabsItem(label="菜单2" path="menu2" :closable="true" v-if="showItem2")
    L7TabsItem(label="菜单3" path="menu3" :closable="true" v-if="showItem3")
    L7TabsItem(label="菜单4" path="menu4" :closable="true" v-if="showItem4")
</template>
<script>
export default {
  data () {
    return {
      showItem1: true,
      showItem2: true,
      showItem3: true,
      showItem4: true
    }
  },
  methods: {
    removeItem (name) {
      console.log('out', name)
      this['showItem' + (name + 1)] = false
    }
  },
  mounted () {
    // console.log(this.$route, this.$router)
  }
}
</script>
```
## 注意事项

## 已知问题
