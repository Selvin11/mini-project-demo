/**
 * 处理微信小程序登陆态的封装
 * 前端拿到login返回的code，传递给后台，后台和微信后台交换信息，
 * 得到access_token后传递给前端
 * 前端将access_token存储在localstorage
 */
import wepy from 'wepy'

let requestAgain = false

export function checkAccessToken (res, that) {
  return new Promise((resolve, reject) => {
    // 获取当前页面路由
    let redirectRoute = that.__route__

    // 获取后台access_token登陆态
    let accessToken = wepy.getStorageSync('access_token')

    if (!accessToken) {
      wx.showModal({
        content: '验证失效，需要跳转至登陆页面',
        showCancel: false,
        confirmColor: '#ce3b28',
        success: res => {
          if (res.confirm) {
            // 跳转至登陆页面
            wepy.navigateTo({
              url: `/pages/login/login?redirect=${redirectRoute}`
            })
          }
        }
      })
    }

    // http状态码为401时，即为请求接口出现登陆验证错误
    if (res.statusCode === 401) {
      // code:1 => 非法access_token，需要重新获取
      // code:100 => 用户未登陆 code:200 => 用户未绑定手机号
      // code:201 => 用户被冻结 code:200 => 用户被停用
      if (res.data.code === 1 || res.data.code === 100 || res.data.code === 200) {
        wx.showModal({
          content: `${res.data.message}，需要跳转至登陆页面`,
          showCancel: false,
          confirmColor: '#ce3b28',
          success: res => {
            if (res.confirm) {
              // 跳转至登陆页面
              wepy.navigateTo({
                url: `/pages/login/login?redirect=${redirectRoute}`
              })
            }
          }
        })
      } else if (res.data.code === 201 || res.data.code === 202) {
        if (requestAgain) {
          return
        }
        wepy.showModal({
          content: `${res.data.message}`,
          showCancel: false,
          confirmColor: '#ce3b28'
        })
        requestAgain = true
      }
    } else {
      resolve(res) // 请求成功，拿到数据
    }
  })
}
