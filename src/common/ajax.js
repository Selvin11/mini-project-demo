import wepy from 'wepy'
import Mock from 'mockjs'
// 域名配置
import domainConfig from '@/config/index'

class Ajax {
  constructor (options) {
    this.$http = function(config) {
      let isMock = wepy.getStorageSync('mock')
      if (isMock === 1) {
        // 获取需要mock的url数组
        let mockUrl = Object.keys(Mock._mocked)
        // 设置匹配请求url的reg以及数组索引
        let reg = ''
        let urlIndex = 0
        for (let k in mockUrl) {
          // 获取url相应的正则以及数组索引，增加请求方式的筛选
          if (
            Mock._mocked[mockUrl[k]].rurl.test(config.url) &&
            Mock._mocked[mockUrl[k]].rtype.toLowerCase() === config.method.toLowerCase()
          ) {
            reg = Mock._mocked[mockUrl[k]].rurl
            urlIndex = k
            break
          }
        }

        // 不满足则直接返回原方法
        if (!reg.test(config.url)) {
          return wepy.request(config)
        }

        let resTemplate = Mock._mocked[mockUrl[urlIndex]].template
        let response = Mock.mock(resTemplate)
        // 将mock数据的结果返回给页面
        return new Promise((resolve, reject) => {
          resolve(response)
        })
      } else {
        return wepy.request(config)
      }
    }
    this.baseUrl = options && options.baseUrl ? options.baseUrl : domainConfig.dev.baseUrl
    this.queryMap = {}
    this.createMap = {}
    this.putWayMap = {}
  }

  setConfig (config) {
    // 定义config
    let defaultConfig = {
      header: {
        'channelType': 'wx',
        'content-type': 'json' // 默认值
      }
    }
    // 获取access_token
    let accesstoken = wepy.getStorageSync('access_token')
    defaultConfig.header['access-token'] = accesstoken

    config = Object.assign(defaultConfig, config)
    return config
  }

  parse(path, id) {
    if (typeof id === 'string') {
      return path + '/' + id
    }
    if (typeof id === 'object') {
      let search = '?'
      let counter = 0
      for (let key in id) {
        if (counter) search += '&'
        search += key + '=' + id[key]
        counter++
      }
      return path + search
    }
    return path
  }

  query(path) {
    if (!this.queryMap[path]) { // cache path closure
      let url = ''
      this.queryMap[path] = (id, expand, config1 = {}) => {
        // 合并config
        let config = Object.assign({}, config1)
        url = expand ? (path + '/' + expand) : path
        let newPath = id ? this.parse(url, id) : url

        let baseUrl = config.baseUrl || this.baseUrl
        config = this.setConfig(Object.assign({
          method: 'GET',
          url: baseUrl + newPath
        }, config))

        return this.$http(config).then((res) => {
          return res.header ? res.data : res
        }, (res) => {
          return res
        })
      }
    }
    return this.queryMap[path]
  }

  create(path) {
    if (!this.createMap[path]) { // cache path closure
      let url = ''
      this.createMap[path] = (data, expand, config1 = {}) => {
        // 合并config
        let config = Object.assign({}, config1)
        url = expand ? (path + '/' + expand) : path

        let baseUrl = this.baseUrl
        config = this.setConfig(Object.assign({
          method: 'POST',
          url: baseUrl + url,
          data: data,
          dataType: 'json'
        }, config))

        return this.$http(config).then((res) => {
          return res.header ? res.data : res
        }, res => {
          return res
        })
      }
    }
    return this.createMap[path]
  }

  putWay(path) {
    if (!this.putWayMap[path]) { // cache path closure
      let url = ''
      this.putWayMap[path] = (data, expand, config1 = {}) => {
        // 合并config
        let config = Object.assign({}, config1)
        url = expand ? (path + '/' + expand) : path

        let baseUrl = this.baseUrl
        config = this.setConfig(Object.assign({
          method: 'PUT',
          url: baseUrl + url,
          data: data,
          dataType: 'json'
        }, config))

        return this.$http(config).then((res) => {
          return res.header ? res.data : res
        }, res => {
          return res
        })
      }
    }
    return this.putWayMap[path]
  }
  // 小程序暂不支持patch（局部修改）请求
}

export default new Ajax()
