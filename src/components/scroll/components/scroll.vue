<template lang="pug">
  .lt-scroll-boxs
    .lt-scroll-pullup
      slot(name="pullup" v-if="status!=='refresh'") {{pullupTxt}}
    .lt-scroll-list(ref="contain")
      .lt-scroll-main(:style="mainStyles" ref="wrapper")
        slot
        slot(name="loading" v-if="loading")
          .lt-scroll-down {{loadingTxt}}
        slot(name="pulldown" v-else-if="hasMoreData")
          .lt-scroll-down {{pulldownTxt}}
        slot(name="nodata" v-else)
          .lt-scroll-down {{nodataTxt}}
</template>
<script>
  import extend from 'lodash/extend'
  import Scroller from '../lib/scroller'
  export default {
    name: 'L7Scroll',
    props: {
      pullupTxt: {
        type: String,
        default: '下拉刷新'
      },
      pulldownTxt: {
        type: String,
        default: '上拉加载更多'
      },
      loadingTxt: {
        type: String,
        default: '数据加载中'
      },
      nodataTxt: {
        type: String,
        default: '没有更多数据'
      },
      filterKey: String,
      bgColor: String
    },
    computed: {
      mainStyles () {
        if (this.bgColor) {
          return {
            backgroundColor: this.bgColor
          }
        }
      }
    },
    data () {
      return {
        needRefresh: false,
        hasMoreData: false,
        isRefresh: false,
        loading: false,
        localPage: 0,
        status: 'normal',
        scrollObj: undefined
      }
    },
    mounted () {
      this.$refs.wrapper.style.minHeight = `${this.$refs.contain.offsetHeight + 1}px`
      this.status = 'refresh'
      this.scrollObj = new Scroller(this.$refs.contain, this.changeStatus.bind(this))
    },
    updated () {
      if (this.needRefresh) {
        this.needRefresh = false
        this.scrollObj.refresh()
        if (this.hasMoreData && this.scrollObj.getY() > -2) { // 首次加载没有充满时，加载更多页
          this.status = 'loadmore'
        }
      }
    },
    watch: {
      filterKey (val, oldVal) {
        if (val !== oldVal) this.status = 'refresh'
      },
      status (val, oldVal) {
        let backData = {
          type: val
        }
        switch (val) {
          case 'refresh':
            this.localPage = 0
            this.loading = true
            backData = extend(backData, {
              cb: this.loadOver.bind(this)
            })
            break
          case 'loadmore':
            backData = extend(backData, {
              cb: this.loadOver.bind(this),
              page: this.localPage + 1
            })
            this.loading = true
            break
        }
        this.$emit('action', backData)
      }
    },
    methods: {
      changeStatus (status) {
        // console.log(status)
        if (this.loading) return // 在加载中时禁止任何更改
        if (!this.hasMoreData) { // 没有更多数据时禁止‘加载更多前，加载更多中’状态
          if (status === 'preload' || status === 'loadmore') return
        }
        this.status = status
      },
      loadOver (hasMore) {
        // console.log(hasMore, this.status)
        if (this.status === 'refresh') {
          this.scrollObj.finishPullDown()
        } else if (this.status === 'loadmore') {
          this.scrollObj.finishPullUp()
        }
        if (hasMore) this.scrollObj.openPullUp()
        else this.scrollObj.closePullUp()
        this.hasMoreData = !!hasMore
        this.loading = false
        this.localPage += 1
        this.status = 'normal'
        this.needRefresh = true
      },
      // finishPullUp: Function,
      // finishPullDown: Function,
      // closePullDown: Function,
      // openPullDown: Function
      filter () {
        this.status = 'refresh'
      }
    }
  }
</script>
