// 0: 正常
// 1: 刷新前
// 2: 刷新中
// 3: 刷新完成(废弃)
// 4: 加载更多前
// 5: 加载更多中
// 6: 加载更多完成(废弃)
// 9: 尚未初始化(废弃)

const statusWords = [
  'nomral', // 正常，用于滑动出‘刷新前’/‘加载前’再滑动回去
  'prerefresh', // 刷新前
  'refresh', // 刷新中
  'over', // 刷新完成，废弃，共用0
  'preload', // 加载更多前
  'loadmore', // 加载更多中
  'over' // 加载更多完成，废弃，共用0
]

export default statusWords
