// mixin 上拉加载
import wepy from 'wepy'

export default class pullUpMixin extends wepy.mixin {
  data = {
    isLoading: false, // 控制显示加载中
    isNoMore: false, // 控制显示无更多内容
    start: 0, // 起始位置
    count: 10, // 结束位置
    total: 0 // 数据总数
  }

  getListData (listArrName, cb) {
    if (this[listArrName].length === this.total) {
      this.isNoMore = this.total !== 0
      return false
    }

    if (!this.isLoading) {
      this.isLoading = true
      this.start += 10
      this.count += 10
      setTimeout(cb, 1000)
    }
  }
}
