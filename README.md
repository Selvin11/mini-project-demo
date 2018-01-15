## mini-project-demo


采用[wepy](https://github.com/Tencent/wepy)框架搭建的微信小程序demo，尽量贴合原Vue项目开发习惯。


### wepy介绍

WePY资源汇总：[awesome-wepy](https://github.com/aben1188/awesome-wepy)

WePY 是一款让小程序支持组件化开发的框架，通过预编译的手段让开发者可以选择自己喜欢的开发风格去开发小程序。框架的细节优化，Promise，Async Functions的引入都是为了能让开发小程序项目变得更加简单，高效。


### wepy特性：

* 类Vue开发风格
* 支持自定义组件开发
* 支持引入NPM包
* 支持[Promise](https://github.com/wepyjs/wepy/wiki/wepy%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8Promise)
* 支持ES2015+特性，如[Async Functions](https://github.com/wepyjs/wepy/wiki/wepy%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8async-await)
* 支持多种编译器，Less/Sass/Styus、Babel/Typescript、Pug
* 支持多种插件处理，文件压缩，图片压缩，内容替换等
* 支持 Sourcemap，ESLint等
* 小程序细节优化，如请求列队，事件优化等


### 引入的新特性：

* 新增mock模块
* 新增基于`wepy.request`的ajax类，以及rest模块进行接口管理
* 登陆态保持方案


### 待完成

- [ ] 列表页面
- [ ] 下拉刷新以及上拉加载
- [ ] 问题汇总


### 安装使用

#### 安装（更新） wepy 命令行工具。

```console
npm install wepy-cli -g
```

#### Mock模块的报错处理

[wepy引入mock的问题](https://github.com/Tencent/wepy/issues/379)

```javascript

// 删掉./node_module/mockjs/dist/mock.js:1476

var Canvas = module.require('canvas')
```

#### 引入mock，无法使用mock中的随机图片

mock中的随机图片是通过cavas绘制的，但小程序中的canvas是独立封装的，方法和使用形式都改变了，因此转而求其次，寻找提供图片的第三方接口作为mock中的图片数据，如http://lorempixel.com/80/80/，可以获得任意尺寸的随机图片

#### 开发实时编译

```console
npm run dev
```

#### 开发者工具使用

1. 使用`微信开发者工具`新建项目，本地开发选择`dist`目录。
2. `微信开发者工具`-->项目-->关闭ES6转ES5。<font style="color:red">重要：漏掉此项会运行报错。</font>
3. `微信开发者工具`-->项目-->关闭上传代码时样式自动补全 <font style="color:red">重要：某些情况下漏掉此项会也会运行报错。</font>
4. `微信开发者工具`-->项目-->关闭代码压缩上传 <font style="color:red">重要：开启后，会导致真机computed, props.sync 等等属性失效。[#270](https://github.com/wepyjs/wepy/issues/270)</font>
5. 项目根目录运行`wepy build --watch`，开启实时编译。


