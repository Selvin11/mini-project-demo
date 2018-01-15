import Mock from 'mockjs'

// 竞拍大厅 获取待开拍/拍卖中列表
Mock.mock(/auctions\?/, 'get', {
  code: 0, // 无错误
  messsage: 'ok', // 无错误
  data: {
    page: 1, // 输入的page
    count: 10, // 输入的count
    total_count: 10, // 匹配到的记录总数
    'auctions|5': [ // 拍卖列表 可能为一个空的列表 []
      {
        id: 1, // 拍卖编号
        is_in_auction: true, // 是否在拍卖中
        status: 2, // 拍卖状态 数字
        status_code: 'bidding', // 拍卖状态 字符串
        status_name: '竞拍中', // 拍卖状态 中文
        minimum_price: 100000, // 起拍价
        lateset_quote_price: 1000000, // 最新出价（最高价也是这个），如果是当前用户拍到，那么这是拍到价
        car_info: {
          id: 1, // 车辆信息快照id
          car_model_name: '雷克萨斯blablabla', // 车型
          belonged_city: '北京', // 车辆所属城市
          located_city: '北京', // 车辆所在地
          license_issued_year: 2017, // 上牌年份
          mileage: 1000000, // 车辆里程
          image: 'http://lorempixel.com/80/80/' // 车辆左前图片image链接
        },
        store: {
          id: 1, // 门店id
          name: '东莞雷克萨斯4S店' // 门店名称
        },
        session: {
          started_at: '2018-01-10 14:00', // 拍卖场次开始时间
          is_today_auction: false // 是否是今天的拍卖场次
        },
        order: { // 订单信息，如果当前用户没有拍到 则此字段为null
          id: 1, // 订单id
          status: 1, // 订单状态
          status_code: 'pending_payment',
          status_name: '待付款'
        }
      }
    ]
  }
})
