import BScroll from 'better-scroll'
import statusWords from './status'
function lyScroll (dom, cb) {
  var bScrollConfig = {
    mouseWheel: true,
    scrollbar: {
      fade: true
    },
    click: true,
    probeType: 3,
    pullDownRefresh: {
      threshold: 20
    },
    pullUpLoad: {
      threshold: 20
    }
  }
  const myScroll = new BScroll(dom, bScrollConfig)
  let needRefresh = 0
  let needLoadMore = 0
  myScroll.on('pullingDown', function () {
    // console.log('刷新中')
    cb(statusWords[2])
  })
  myScroll.on('pullingUp', function () {
    // console.log('加载更多中')
    cb(statusWords[5])
  })
  myScroll.on('scroll', (pos) => {
    // console.log(pos.y, myScroll.maxScrollY)
    if (pos.y > 0) {
      if (pos.y > 20) {
        if (!needRefresh) {
          needRefresh = 1 // 为了防止重复调用，以免重复产生‘刷新前’状态
          // console.log('刷新前')
          cb(statusWords[1])
        }
      } else if (needRefresh) {
        needRefresh = 0
        // console.log('刷新回正常')
        cb(statusWords[0])
      }
    }
    if (pos.y < (myScroll.maxScrollY + 20)) {
      if (pos.y < (myScroll.maxScrollY - 20)) {
        if (!needLoadMore) {
          needLoadMore = 1
          // console.log('加载更多前')
          cb(statusWords[4])
        }
      } else if (needLoadMore) {
        needLoadMore = 0
        // console.log('加载更多回正常')
        cb(statusWords[0])
      }
    }
  })
  return {
    getY () {
      return myScroll.maxScrollY
    },
    refresh () {
      myScroll.refresh()
    },
    finishPullDown () {
      myScroll.finishPullDown()
    },
    finishPullUp () {
      myScroll.finishPullUp()
    },
    closePullUp () {
      myScroll.closePullUp()
    },
    openPullUp () {
      myScroll.openPullUp()
    }
  }
}
export default lyScroll
