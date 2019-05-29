# ui-datepicker

## 概述
日期时间选择框

## 配置

需配合 ui 插件使用，在 ui 配置中的 components 字段中添加"datepicker"

## 参数
datepicker支持以下属性

|属性|类型|说明|默认值|
|:-----:|:------:|:---:|:------
|title|String|标题|
|value|[String, Number]|时间值|当前时间日期
|options|Object|选项|
|single|Boolean|一直展示|false

options全部属性示例
```javascript
options1: {
  format: 'yyyy-MM-dd hh:mm:ss', // 日期时间格式
  /*
    可选范围，用于固定可选时间/日期范围
    同时，超出范围的将会把展示区对应项变红，并禁用确认按钮
  */
  range: {
    start: '2008-04-22 08:23:16',
    end: '2028-05-27 19:14:47'
  } ,
  /*
    检查当前值，传入的date没有经过处理
    返回false时，将会把展示区对应项变红，并禁用确认按钮
  */
  check (date) {
    return !!date.getDay()
  },
  // 禁用选项，内部有处理，如type='date'，传入的date为xxxx-MM-dd 00:00:00:000
  // tpye的取值范围year，month，date，hour，minute，second
  // 分别代表年月日时分秒，在初始化选项的时候调用
  // date: Date类型，代表要判断的值
  // 返回true代表禁用当前值
  disabled (date, type) {
    if (type === 'date' && date.getDay() === 0) return true // 禁用周日
    return false
  }
}
```

该组件拥有1个插槽，用于修改input的展示效果以及添加自定义事件

插槽示例：用div代替input
```pug
L7DatePicker(v-model="date1" :options="options1")
 div(@click="props.show" slot-scope="props") {{props.value}}
```

## 使用示例

```html
<template lang="pug">
.main
  div
    |当前选择日期：{{date1}}
    //- L7DatePicker(v-model="date1" :single="true" :options="options1")/
    br/
    L7DatePicker(v-model="date1" :options="options1")/
    br/
    L7DatePicker(title="选择月份" v-model="month1" :options="options2")/
    br/
    L7DatePicker(v-model="time1" :options="options3")/
</template>
<script>
export default {
  data () {
    return {
      date1: 1523494298260,
      options1: {
        format: 'yyyy-MM-dd hh:mm:ss',
        range: {
          start: '2008-04-22 08:23:16',
          end: '2028-05-27 19:14:47'
        },
        disabled (type, date) {
          if (type === 'date' && date.getDay() === 0) return true
          return false
        }
      },
      month1: '2017-01',
      options2: {
        format: 'yyyy-MM',
        range: {
          start: '2017-03',
          end: '2020-03'
        }
      },
      time1: '10:30',
      options3: {
        format: 'hh:mm',
        range: {
          start: '06:03',
          end: '20:57'
        }
      }
    }
  }
}
</script>
```

## 注意事项
## 已知问题
