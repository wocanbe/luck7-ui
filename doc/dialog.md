# ui-dialog组件

## 概述

页面提示组件，实现js常用的交互提示，包含alert、confirm、prompt和toast四种提示效果

该组件会自动在vue上挂载$alert、$confirm、$prompt和$toast四种方法，它们均支持两个参数，返回一个Promise 

$alert、$confirm、$prompt这三种方法只能同时存在一个，后一个出现的会自动替换前一个

## 参数

  - msg

  String类型，必填
  - options

  Object类型，可选

$alert方法的options示例如下

```javascript
{
  title: 'alert框标题',
  okTxt: '确认按钮文字',
  showMask: true, // 是否显示遮罩
  maskClose: true, // 点击遮罩是否可以关闭alert框
  beforeClose: Function
  /*
   * 关闭对话框前的拦截方法
   * 该方法有两个参数(val, err), 
   * val代表是不是点击了确认按钮
   * err代表取消理由，cannel代表点击取消按钮，mask代表点击遮罩关闭，replace代表被其他dialog方法替代，hideall代表调用隐藏方法(hideAll)
  */
}
```
$confirm方法的options示例如下
```javascript
{
  title: 'confirm框标题',
  okTxt: '确认按钮文字',
  cannelTxt: '取消按钮文字',
  showMask: true,
  maskClose: true,
  beforeClose: Function
}
```
$prompt方法的options示例如下
```javascript
{
  title: 'prompt框标题',
  showMask: true,
  maskClose: true,
  beforeClose: Function
}
```
$toast方法的options示例如下
```javascript
{
  position: 'top', // toast信息的显示位置，top、left、bottom、right、center
  type: 'none', // none、info、warning、success、error
  delay: 3000 // toast信息显示时间，单位毫秒
}
```

## 示例

```html
<template lang="pug">
  .main
    |dialog示例
    br/
    button(@click="showAlert1") 显示alert1
    br/
    button(@click="showAlert2") 显示alert2
    br/
    button(@click="showAlert3") 显示alert3
    br/
    button(@click="showAlert4") 显示alert4
    br/
    button(@click="showConfirm") 显示confirm
    br/
    button(@click="showPrompt") 显示prompt
</template>

<script>
export default {
  methods: {
    showAlert1 () {
      this.$alert('alert信息')
    },
    showAlert2 () {
      this.$alert('alert信息，更改标题和确认文字', {
        title: '更改后的标题',
        okTxt: '好的'
      })
    },
    showAlert3 () {
      this.$alert('alert信息，无遮罩', {
        showMask: false
      })
    },
    showAlert4 () {
      this.$alert('alert信息，有回调，点击遮罩能关闭对话框', {
        maskClose: true
      }).then(res => {
        this.$toast('你点击了确认')
      }).catch(e => {
        this.$toast('你点击了遮罩').then(res => {
          console.log('toast隐藏了')
        })
      })
    },
    showConfirm () {
      this.$confirm('confirm信息').then(res => {
        this.$toast('你点击了确认')
      }).catch(e => {
        this.$toast('你点击了取消')
      })
    },
    showPrompt () {
      this.$prompt('请输入你的姓名', {
        emptyWarn: '姓名不能为空'
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
```

## 注意事项

 - dialog模拟原生js的alert等，同时增加了常用的轻提示toast，不考虑实现多个同时弹出(包括toast)，如果要多个同时弹出，请使用popup

## 已知问题
