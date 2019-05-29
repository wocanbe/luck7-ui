<template lang="pug">
- var prefix='lt-page';
  div(class=prefix)
    select(v-model="currentPageSize" v-if="total&&size!='mini'" @change="changeSize")
      option(:value="item" v-for="item in pageSizes" :key="item") {{item}}条/页
    ul(v-if="size!='mini'" class=prefix+'-box' :class="{'hasbg':background,'smail':size=='smail'}")
      li(v-if="pageData.showFirst" class=prefix+'-item' key="first" alt="首页" @click="goTo(1)") {{firstText}}
      //- li(v-if="pageData.showFirst" key="prev" @click="goTo(1)") {{prevText}}
      li(
        v-for="(pn,index) in pageData.btns"
        :key="index"
        class=prefix+'-item'
        :class="{'active':pn===currentPage}"
        @click="goTo(pn)"
      ) {{pn}}
      //- li(v-if="pageData.showLast" key="next" @click="goTo(pageData.allPage)") {{nextText}}
      li(v-if="pageData.showLast" class=prefix+'-item' key="last" alt="末页" @click="goTo(pageData.allPage)") {{lastText}}
    span 第 #[input(class=prefix+'-input' :value="pageData.localPage" @keyup="keyUp")] / {{pageData.allPage}} 页
</template>
<script>
export default {
  name: 'L7Page',
  props: {
    currentPage: { // 当前页码
      type: Number,
      default: 1
    },
    allPage: Number, // 总页数
    total: Number, // 总条数
    pageSize: { // 每页显示条数
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () { return [10, 20, 50] }
    }, // 可选择的每页显示条数
    currentChange: Function, // 换页数
    sizeChange: Function, // 更换每页显示条数
    size: {
      type: String,
      default: 'normal' // 分页大小，normal, smail, mini
    },
    background: { // 显示背景
      type: Boolean,
      default: false
    },
    firstText: {
      type: String, // 首页文字
      default: '<<'
    },
    lastText: {
      type: String, // 末页文字
      default: '>>'
    },
    // prevText: {
    //   type: String, // 上一页文字
    //   default: '<'
    // },
    // nextText: {
    //   type: String, // 下一页文字
    //   default: '>'
    // }
  },
  data () {
    return {
      currentPageSize: this.pageSize,
      pageConfig: {
        range: {
          normal: [-3, 3],
          smail: [-2, 2],
          mini: false
        }
      }
    }
  },
  computed: {
    pageData () {
      const pageBtn = []
      let localPageNo = this.currentPage
      let maxPageNo
      let showFirst = true
      let showLast = true

      if (this.allPage) {
        maxPageNo = this.allPage
      } else if (this.total) {
        maxPageNo = Math.ceil(this.total / this.pageSize)
      } else {
        console.warn('缺少总页数设置')
        maxPageNo = 1
      }

      if (localPageNo < 1) localPageNo = 1
      if (localPageNo > maxPageNo) {
        localPageNo = maxPageNo
      }

      let btnRange = this.pageConfig.range[this.size]
      if (btnRange) {
        for (let i = btnRange[0]; i <= btnRange[1]; i++) {
          let tlpn = localPageNo + i
          if (tlpn > 0 && tlpn <= maxPageNo) {
            pageBtn.push(tlpn)
          }
        }
        if (pageBtn.indexOf(1) > -1) showFirst = false
        if (pageBtn.indexOf(maxPageNo) > -1) showLast = false
      }

      return {
        btns: pageBtn,
        localPage: localPageNo,
        allPage: maxPageNo,
        showFirst,
        showLast
      }
    }
  },
  methods: {
    goTo (pageNo) {
      let localPageNo = pageNo
      const maxPageNo = this.allPage
      if (localPageNo > maxPageNo) localPageNo = maxPageNo
      if (localPageNo < 1) localPageNo = 1
      if (this.currentPage === localPageNo) return
      this.pageData.localPage = localPageNo
      this.currentChange(localPageNo)
    },
    changeSize (e) {
      this.sizeChange(this.currentPageSize)
    },
    keyUp (e) {
      const key = e.keyCode
      const val = parseInt(e.target.value)
      if (key === 38) { // 上方向键
        this.goTo(this.currentPage - 1)
      } else if (key === 40) { // 下方向键
        this.goTo(this.currentPage + 1)
      } else if (key === 13) { // 回车键
        this.goTo(val)
        e.target.value = this.pageData.localPage
      }
    }
  }
}
</script>
