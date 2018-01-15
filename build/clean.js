let shell = require('shelljs')
let prod = process.env.NODE_ENV === 'production'

if (prod) {
  // 需要移除的文件
  let fileArr = [
    'dist/mock',
    'dist/npm/mockjs'
  ]

  fileArr.forEach(file => {
    shell.rm('-rf', file)
  })
} else {
  // run dev 前删除dist目录
  // 目前微信开发者工具需要退出程序后，再进入
  shell.rm('-rf', 'dist')
}
