import wepy from 'wepy'

import config from './config'

Object.assign(wepy.component.prototype, {
  $rest: config
})
