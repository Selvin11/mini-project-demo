import ajax from '@/common/ajax'

export default {
  auth: {
    checkToken: ajax.query('/auth/access_token'),
    getToken: ajax.create('/auth/access_token'),
    getCode: ajax.putWay('/auth'), // 获取验证码
    postUser: ajax.create('/auth/user') // 提交用户信息
  }
}
