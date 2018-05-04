# routed-server-rendering

npm install --save express
npm install --save-dev babel-cli babel-preset-react

手动命令行转换：
node_modules/.bin/babel static --presets react --out-dir static

自动化转换，修改package.json
"scripts": {
    "compile": "babel src --presets react --out-dir static",
    "watch": "babel src --presets react --out-dir static --watch",


ES2015转换
  安装
   npm install --save-dev babel-preset-es2015
  修改package.json配置
  "scripts": {
    "compile": "babel src --presets react,es2015 --out-dir static",
    "watch": "babel src --presets react,es2015 --out-dir static --watch",

服务器自动重启 开发阶段安装nodemon
  安装
  npm install --save-dev nodemon
  修改package.json配置
   "scripts": {
    "start": "nodemon -w server.js server.js",



安装mongoose创建schema
  npm install --save mongoose


安装webpack3.6.0
  npm install --save-dev webpack@3.6.0
或
   npm install --save-dev webpack@3.8.1

   安装加载器 目的生成两个捆绑包，一个用于应用，一个用于库
   npm install --save-dev babel-loader

   npm install --save-dev babel-core
   npm install --save-dev babel-preset-env
   npm install --save-dev babel-preset-stage-0

   npm install --save-dev react 
   npm install --save-dev react-dom 
   npm install --save-dev whatwg-fetch 
   npm install --save-dev babel-polyfill


   模块热替换，监控变化，并让浏览器等待捆绑包就绪，保证不会加载到之前的版本。
   安装webpack-dev-server
   npm install --save-dev webpack-dev-server

   
   Vagrant环境
   默认配置下，服务器只允许在它的本地访问。通过更改 --host 参数，便能够在我们的 PC 上访问它。
   webpack-dev-server --host 0.0.0.0 --public 192.168.3.10:8000 --watch-poll

   http://www.css88.com/doc/webpack/guides/development-vagrant/

=========================================================================

   至此， 我们都是分别在两个终端窗口中运行，npm start(启动后端服务器)，npm run watch(启动前端开发服务器，并监控代码变化)
  

   若Express代码中处理HMR，就只需要一台服务器，在提供API的同时还能监控客户端代码变化、重新打包并将增量更新发送给客户端。

   安装
      npm install --save-dev webpack-dev-middleware@1.6.1 
      npm install --save-dev webpack-hot-middleware@2.12.2 


使用服务器端使用ES2015的语法
npm install --save-dev babel-preset-es2015-node6
在项目根下添加文件.babelrc
并包含如下内容：
{
    "presets": [
      "env",
      "stage-0",
      "react"
    ]
  }

 修改package.json
  "scripts": {
    "start": "nodemon -w server ./node_modules/.bin/babel-node server/server.js",

编译服务器端node.js
./node_modules/.bin/babel server --presets es2015-node6 --out-dir dist

要让Node.js使用源映射来报告行号，需要安装
 npm install --save-dev source-map-support
 npm install --save-dev babel-register



eslint测试
 npm install --save-dev eslint 
 npm install --save-dev eslint-config-airbnb

 $ node_modules/.bin/eslint --init
? How would you like to configure ESLint? Inspect your JavaScript file(s)
? Which file(s), path(s), or glob(s) should be examined? glob
? What format do you want your config file to be in? YAML
? Are you using ECMAScript 6 features? Yes
? Are you using ES6 modules? Yes
? Where will your code run? Browser
? Do you use CommonJS? Yes
? Do you use JSX? Yes
? Do you use React? Yes


  Checking peerDependencies of eslint-config-standard@latest
Installing eslint-config-standard@latest, eslint-plugin-import@>=2.8.0, eslint-plugin-node@>=5.2.1, eslint-plugin-promise@>=3.6.0, eslint-plugin-standard@>=3.0.1

在项目根下创两个文件
.eslintignore 文件内容 （文件中的注释用#号）
    coverage/
    dist/
    data/

 .eslintrc.yml 文件内容
 env:
  browser: true
  commonjs: true
  es6: true
  jest: true
extends: 'eslint:recommended'
parserOptions:
  ecmaFeatures:
    experimentalObjectRestSpread: true
    jsx: true
  sourceType: module
plugins:
  - react
rules:
  indent:
    - 2
    - 4
    - SwitchCase: 1
  # linebreak-style:
  #  - error
  #  - unix 
  no-unused-vars: 0
  no-console: 0
globals:
    process: true
    __dirname: true
    _testColors: true
    Enzyme: true

==============================
路由安装
npm install --save-dev react-router-dom

npm install --save-dev react-icons
npm install --save-dev prop-types

修改webpack.config.js配置
module.exports = {
    entry: {
        app:  ['./client/src/App.jsx'],
        vendor: ['react','react-dom','whatwg-fetch','babel-polyfill','react-router-dom'],
    },


<Link  to={{
        pathname: '/issues',
        search:'?status=Open',
        hash: '#hash'
    }}>Open Issues</Link>   





    =====================
  npm install --save-dev react-bootstrap

 npm install --save bootstrap








   




   

  
  