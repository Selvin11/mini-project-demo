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

- [x] 列表页面
- [x] 下拉刷新以及上拉加载
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


### 问题汇总

1. 引入mock，无法使用mock中的随机图片

  * mock中的随机图片是通过cavas绘制的，但小程序中的canvas是独立封装的，方法和使用形式都改变了，因此转而求其次，寻找提供图片的第三方接口作为mock中的图片数据，如http://lorempixel.com/80/80/，可以获得任意尺寸的随机图片

2. 数据绑定

  * `:props="data"`：在向组件传递props时，只有在data中定义的对象才能被传递

  * 类名的绑定形式：`:class="{'isActive': condition/computed}"`或者`class="{{'isActive': condition/computed}}"`

3. 获取路由参数

  * 在Page的onLoad生命周期函数中，路由参数对象会作为该周期函数的参数传递
  * Page.prototype.route可以获取当前路由对象

4. 文件编译缓存

  * 清除掉原有文件，修改文件后重新编译即可

5. 组件中comoputed的使用说明

  * props传值，最好设置类型，也可以用数组设置多类型，如果props为Object，computed中涉及该prop会重复计算三次，前两次为undefined，所以需要给对象中的属性给对应的默认值，以免报错中断程序；其它类型Boolean/String等，传入到组件中，computed中也只会执行一次。

6. props传值

  * 静态传值：父组件向子组件传递常量数据，因此只能传递String字符串类型。
  * 动态传值：父组件向子组件传递动态数据内容，父子组件数据完全独立互不干扰。但可以通过使用.sync修饰符来达到父组件数据绑定至子组件的效果，也可以通过设置子组件props的twoWay: true来达到子组件数据绑定至父组件的效果。那如果即使用.sync修饰符，同时子组件props中添加的twoWay: true时，就可以实现数据的双向绑定了。
  * 父级传递给自组件的prop，最好是定义在data中，可以保证数据传递无延时，不会出现第一次传递为undefined的情况。

7. 组件循环使用repeat，但是computed中无法监听所有组件的变化，只能监听到循环中第一个组件中的prop变化。

8. wepy项目中不能有空文件，不然会报错`TypeError: Cannot read property 'script' of null`，而且无法编译

9. IOS中小程序不识别`2018-1-1 12:12:12`这种日期格式，无法转为时间戳，需要转为这种`2018/1/1 12:12:12`这种格式

```javascript
'2018-1-1 12:12:12'.replace(/-/g, '/')
```

10. 小程序最新版本库更新到1.9.1了，**但是wepy组件中定义的prop没有给默认值，或者定义的computed没有返回默认值的话，控制台会出现大量undefined的警告**，只需要增加相应的默认值以及默认返回值，就可以避免了

11. `.wey`文件中引入less文件时，末尾必须**加分号;**

12. wepy中已有class后，继续绑定class时，class名中超过一个`-`时，解析会出错

```html
<view class="car" :class="{{'car-time-red': condition}}"> </view>

<!--编译后--> 
<view class="car car -time red"></view>
```

13. 小程序中的跳转路由写法

以app.json配置文件中的路由为例，如登陆页面路由为`pages/login`

* `/pages/login`

* `login`
当前在`pages/index`页面，需要跳转至登陆页

```javascript
// 第一种写法
wepy.navigateTo({
  url: '/pages/login'
})

// 第二种写法，仅限于前面的路由相同，此例中都为pages
wepy.navigateTo({
  url: 'login'
})

```

14. wepy中调用小程序的showModal时，无法监听到相应的success、fail、complete回调，需要用wx调用才可以