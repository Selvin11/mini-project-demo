// mixin 下拉刷新
import wepy from 'wepy'

export default class pullDownMixin extends wepy.mixin {
  updatePage (cb) {
    setTimeout(cb, 2000)
  }
}
