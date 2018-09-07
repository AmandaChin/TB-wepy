
# 时间银行小程序端

框架： wepy+weui

Demo: [🐼满熊阅读📖](https://img003.qufenqi.com/products/b4/54/b4543ad35eb9486354397bf33af8f8b5.jpg) which used in a very early version.


### Start

``` bash
git clone git@github.com:Thunf/wepy-demo-bookmall.git

cd wepy-demo-bookmall

npm install wepy-cli -g
npm install

npm run dev
```


> **Remind**
- 使用微信开发者工具新建项目，本地开发**选择 `dist` 目录**
- 微信开发者工具 -> 项目
  - **关闭** ES6 转 ES5
  - **关闭** 代码压缩上传
  - **关闭** 上传代码时样式文件自动补全
  - **开启** 开发环境不校验请求域名、TLS版本以及HTTPS证书


### Build
```
npm run build
```


## What's Included

- `npm run dev`
  - Compile `.wpy` files to `.wxml` / `.js` / `.wxss` etc
  - Related NPM packages
  - Copy static files
  - Watch changes

- `npm run build`: Production ready build.
  - Compile `.wpy` files to `.wxml` / `.js` / `.wxss` etc
  - Related NPM packages
  - Minified JavaScript
  - Copy static files



## Thanks

This repository relies on the [wepy](https://github.com/wepyjs/wepy), thanks to the efforts of the author.

For detailed explanation & more functions, checkout the [微信官方小程序文档](https://mp.weixin.qq.com/debug/wxadoc/dev/api/) and [小程序框架wepy文档](https://wepyjs.github.io/wepy/).




