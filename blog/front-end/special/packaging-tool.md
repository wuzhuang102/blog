# 前端工程化 --- 打包工具

## Webpack
最新版的Webpack不需要任何配置文件，但也支持配置文件
### 使用
**第一步：** 安装依赖
``` sh
npm install -D webpack webpack-cli
```
**第二步：** 创建编译源文件 /src/index.js
``` js
const s = () => { console.log(111) }
s()
```
**第三步：** package.json 中创建可执行命令
``` json
"scripts" : {
    "prod": "webpack --mode production",
    "dev": "webpack --mode development"
}
```
**第四步：** 运行，打包后的文件默认输出到 /dist目录下
``` sh
npm run prod
```

## rollup
Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。
### 功能介绍
- rollup 目的很清晰，只是为了打包js，没有其他
- Tree-shaking
### 使用
**第一步：** 全局安装rollup，也可只在项目安装
``` sh
npm install -g rollup
```
**第二步：** 编写es6代码 src/index.js
``` js
const s = () => {
    console.log(123)
}
export default s
```
**第三步：** 打包浏览器端或者node端可运行js
``` sh
rollup src/index.js -o dist/main.js -f [cjs|iife|umd --name "myBundle"]
# cjs  打包浏览器端可执行代码
# iife 打包node端可执行代码
# umd --name ""  打包浏览器和node端都可执行的代码，需要name
```
也可以使用配置文件 [rollup.config.js](https://rollupjs.org/guide/en/#command-line-reference)
``` js
export default {
    input: 'src/index.js',
    output: {
        file: 'dist/main.js',
        format: 'cjs'
    }
}
```

## Gulp
### 功能介绍
- 基于stream的打包，所以非常快。上一个的输出是下一个的输入。
### 使用
**第一步：** 全局安装依赖gulp,也可项目安装
``` sh
npm install -g gulp-cli
```
**第二步：** 编写打包源文件 src/**/*.js
``` js
// es6代码
```
**第三步：** 编写gulpfile.js
``` js
const { src, dest } = require('gulp');
const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');

exports.default = function() {
    return src('src/*.js')
        .pipe(babel())
        .pipe(src('vendor/*.js'))
        // .pipe(uglify())
        .pipe(dest('output/'));
}
```

## Grunt
### 功能介绍
- 自动化。对于需要反复重复的任务，例如压缩（minification）、编译、单元测试、linting等，自动化工具可以减轻你的劳动，简化你的工作
### 使用
**第一步：** 全局安装grunt-cli，本地安装grunt
- 安装grunt-cli并不等于安装了 Grunt！Grunt CLI的任务很简单：调用与Gruntfile在同一目录中 Grunt
``` sh
npm install -g grunt-cli
npm install -D grunt
```
**第二步：** 创建需要处理的文件 src/index.js
``` js
var index = index || {}
index = {
    init: function(argument) {
        console.log('index  init')
    }
}
index.init()
```
**第三步：** 创建Gruntfile.js
``` js
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/index.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }
    });
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify']);
};
```
**第四步：** 执行grunt 命令

## Bower
bower是一个包管理工具，可是帮我们管理前端需要用的一些静态资源
### 使用
**第一步：** 全局安装bower
``` sh
npm install -g bower
```
**第二步：** 项目中初始化生成 bower.json 文件
``` sh
bower init
```
**第三步：** 创建.bowerrc并编辑
``` js
{
    "directory": "dist/"    // 配置安装文件目录
}
```
**第四步：** 安装资源包并使用
``` sh
bower install [包名]
```

## Parcel
Parcel开箱即用，它上手比webpack会容易很多

### 使用
[官方文档](https://v2.parceljs.org/getting-started/webapp/)
