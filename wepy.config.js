const path = require('path')
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    modules: ['node_modules']
  },
  eslint: true,
  compilers: {
    less: {
      compress: true
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  delete module.exports.compilers.babel.sourcesMap
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {compress: true}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    },
    replace: [{
      filter: /\/dist\/app\.js$/,
      config: [{
        // 移除mock引入
        find: ',require("./mock/index.js")',
        replace: ''
      }, {
        // 更改路由顺序
        find: '["pages/index",',
        replace: '['
      }, {
        find: 'pagePath:"pages/index"',
        replace: 'pagePath:"pages/movie/list"' // 正式环境的入口
      }]
    }, {
      filter: /\/dist\/app\.json$/,
      config: [{
        // 更改路由顺序
        find: '["pages/index",',
        replace: '['
      }]
    }, {
      filter: /\/dist\/common\/ajax\.js$/,
      config: [{
        find: 'require("./../npm/mockjs/dist/mock.js")',
        replace: '""'
      }, {
        find: 'dev.baseUrl',
        replace: 'build.baseUrl'
      }]
    }, {
      filter: /\/dist\/pages\/login\/login\.js/,
      config: [{
        find: 'wx.redirectTo({url:"/pages/movie/list"})',
        replace: 'wx.switchTab({url:"/pages/movie/list"})'
      }]
    }]
  }
}
