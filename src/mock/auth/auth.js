import Mock from 'mockjs'

// 验证access_token
Mock.mock(/auth\/access_token/, 'get', {
  'code': 0,
  'message': 'ok',
  'data': {
    'is_valid': false, // 是否已经过期
    'has_weixin': true, // 是否是系统的中已经有的微信用户
    'has_mobile': true // 是否已经绑定了手机号
  }
})

// 获取access_token
Mock.mock(/auth\/access_token/, 'post', {
  'code': 0,
  'message': 'ok',
  'data': {
    'access_token': 'access_token'
  }
})

// 获取验证码
Mock.mock(/auth\/\d+\/verification_code/, 'put', {
  'code': 0,
  'message': 'ok'
})

// 确认登陆，绑定手机号接口
Mock.mock(/auth\/user/, 'post', {
  'code': 0,
  'message': 'ok'
})
