# ui-scroll

## 概述
下拉刷新，滑动加载更多

## 配置

## 参数
scroll支持以下属性

|属性|类型|说明|默认值
|:-----:|:------:|:---:|:------
|pullupTxt|String|下拉刷新的提示语|下拉刷新
|pulldownTxt|String|上拉加载更多的提示语|上拉加载更多
|loadingTxt|String|数据加载中的提示语|数据加载中
|nodataTxt|String|没有更多数据的提示语|没有更多数据
|bgColor|String|背景颜色|-
|filterKey|String|数据过滤的唯一key，也可以通过filter方法(详见示例)实现|-

scroll支持的方法
 - action 参数 {type: String, cb: Function, page: Number}

该方法必须实现

type的取值范围如下
 - 'nomral', // 正常，用于滑动出‘刷新前’/‘加载前’再滑动回去，只有type参数
 - 'prerefresh', // 刷新前，只有type参数
 - 'refresh', // 刷新中，有type和cb参数
 - 'preload', // 加载更多前，只有type参数
 - 'loadmore', // 加载更多中，有type、page和cb参数

cb(hasMore:Boolean) 回调函数有一个参数，标示有没有更多页，该参数存在且为true时表示有更多页,详见示例

该组件拥有5个插槽
 - 默认插槽: scroll主体
 - pullup插槽: 下拉刷新效果的插槽
 - loading插槽: 数据加载中效果的插槽
 - pulldown插槽: 上拉加载更多插槽
 - nodata插槽: 没有更多数据插槽

## 使用

简单使用示例

```html
<style scoped lang="scss">
.list {
  position: fixed;
  top: 72px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  ul {
    li {
      background-color: #eee;
      border-bottom: 1px solid #ddd;
      color: #666;
      display: flex;
      line-height:32px;
      padding: 0 8px;
      position: relative;
      .id {
        flex: 1;
      }
      .data {
        flex: 2;
      }
    }
  }
}
</style>
<template lang="pug">
  div
    // 滑动区域大小及位置由class(此处为list)或style指定
    lt-scroll.list(@action="action")
      ul
        li(v-for="payItem in payList")
          .id {{payItem.id}}
          .data {{payItem.d1}}
          .data {{payItem.d2}}
</template>
<script>
  export default {
    data () {
      return {
        payList: []
      }
    },
    methods: {
      action (opts) {
        if (opts.type === 'refresh') {
          this.payList = []
          this.loadData(1, opts.cb)
        } else if (opts.type === 'loadmore') {
          this.loadData(opts.page, opts.cb)
        }
      },
      loadData (pageNo, done) {
        setTimeout(() => {
          let date = []
          for (let i = 1; i < 51; i++) {
            date.push({
              id: (pageNo - 1) * 50 + i,
              d1: `第${pageNo}页第${i}条数据1`,
              d2: `第${pageNo}页第${i}条数据2`
            })
          }
          this.payList = this.payList.concat(date)
          if (pageNo >= 3) {
            done(false) // 表示没有更多页
          } else {
            done(true)
          }
        }, 800)
      }
    }
  }
</script>
```

数据筛选示例

```html
<style scoped lang="scss">
.list {
  // ...
}
.filter-boxs {
  line-height: 36px;
  padding: 0 18px;
  font-size: 18px;
}
</style>
<template lang="pug">
  div
    .filter-boxs
      input(v-model="filterParam" placeholder="请输入筛选关键词")
      //- button(@click="reload1") 筛选
      button(@click="reload2") 筛选
    // 滑动区域大小及位置由class(此处为list)或style指定
    L7Scroll.list(@action="action" ref="my_scroller" :filterKey="filterKey")
      ul
        li(v-for="payItem in payList")
          .id {{payItem.id}}
          .data {{payItem.d1}}
          .data {{payItem.d2}}
</template>
<script>
  export default {
    data () {
      return {
        payList: [],
        filterKey: '',
        filterParam: ''
      }
    },
    methods: {
      reload1 () {
        this.filterParam = 'filterParam'
        this.$refs.my_scroller.filter()
      },
      reload2 () {
        this.filterParam = 'filterParam'
        this.filterKey = '' + Math.random()
      },
      action (opts) {
        if (opts.type === 'refresh') {
          this.payList = []
          this.loadData(1, opts.cb)
        } else if (opts.type === 'loadmore') {
          this.loadData(opts.page, opts.cb)
        }
      },
      loadData (pageNo, done) {
        console.log(`筛选条件:${this.filterParam}`, '将用于ajax的提交参数')
        setTimeout(() => {
          let date = []
          for (let i = 1; i < 51; i++) {
            date.push({
              id: ((pageNo - 1) * 50 + i),
              d1: `第${pageNo}页第${i}条数据1`,
              d2: `第${pageNo}页第${i}条数据2`
            })
          }
          this.payList = this.payList.concat(date)
          if (pageNo >= 3) {
            done(false) // 表示没有更多页
          } else {
            done(true)
          }
        }, 800)
      }
    }
  }
</script>
```
修改状态文本示例

```html
<style scoped lang="scss">
.list {
  // ...
}
</style>
<template lang="pug">
  div
    lt-scroll.list(
      @action="action"
      :pullupTxt="pullupTxt"
      :pulldownTxt="pulldownTxt"
      :loadingTxt="loadingTxt"
      :nodataTxt="nodataTxt"
    )
      ul
        li(v-for="payItem in payList")
          .id {{payItem.id}}
          .data {{payItem.d1}}
          .data {{payItem.d2}}
</template>
<script>
  export default {
    data () {
      return {
        payList: [],
        pullupTxt: '数据过时了？',
        pulldownTxt: '偷偷告诉你还有更多数据哦',
        loadingTxt: '阿信正在努力获取数据',
        nodataTxt: '我也是有底线的'
      }
    },
    methods: {
      action (opts) {
        if (opts.type === 'nomral') {
          this.pullupTxt = '数据过时了？'
          this.pulldownTxt = '偷偷告诉你还有更多数据哦'
        } else if (opts.type === 'prerefresh') {
          this.pullupTxt = '放开我，加载最新数据'
        } else if (opts.type === 'preload') {
          this.pulldownTxt = '放开我，加载更多数据'
        } else if (opts.type === 'refresh') {
          this.payList = []
          this.loadData(1, opts.cb)
        } else if (opts.type === 'loadmore') {
          this.loadData(opts.page, opts.cb)
        }
      },
      loadData (pageNo, done) {
        // 省略，见简单示例
      }
    }
  }
</script>
```

使用插槽实例

```html
<style scoped lang="scss">
.list {
  // ...
}
.load-bar {
  text-align: center;
  padding: 80px 0;
  font-size: 18px;
}
</style>
<template lang="pug">
  div
    lt-scroll.list(@action="action")
      div(slot="loading") // 加载中插槽
        .load-bar
          lt-icon(type="load-c")
          |loading
      ul
        li(v-for="payItem in payList")
          .id {{payItem.id}}
          .data {{payItem.d1}}
          .data {{payItem.d2}}
</template>
<script>
  export default {
    data () {
      return {
        payList: []
      }
    },
    methods: {
      action (opts) {
        if (opts.type === 'refresh') {
          this.payList = []
          this.loadData(1, opts.cb)
        } else if (opts.type === 'loadmore') {
          this.loadData(opts.page, opts.cb)
        }
      },
      loadData (pageNo, done) {
        // 省略，见简单示例
      }
    }
  }
</script>
```
## 示例工程

## 注意事项
1、目前只支持竖向滚动
## 已知问题
