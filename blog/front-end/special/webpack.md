# 前端工程化 --- Webpack
``` js
// webpack.config.js
module.exports = {
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    module: {},
    plugins: []
}
```

## Webpack整体流程
![Webpack](/front-end/special/webpack-1.png)
### 1. Compiler
负责文件监听和启动编译。compiler实例中包含了完整的webpack配置，全局只有一个compiler实例
#### 1. Compiler 类
`Compiler` 类继承自 `Tapable`，初始化定义了很多 [hooks](https://webpack.js.org/api/compiler-hooks/)，这也是 webpack 的核心 
- *lib/Compiler.js*
    ```js
    class Compiler extends Tapable {
        constructor(context) {
            super();
            this.hooks = {
                // 定义了很多不同类型的钩子
                beforeCompile: new AsyncSeriesHook(["params"]),
                compile: new SyncHook(["params"]),
                afterCompile: new AsyncSeriesHook(["compilation"]),
                make: new AsyncParallelHook(["compilation"]),
                entryOption: new SyncBailHook(["context", "entry"])
                // ...
            };
        }
    }
    ```
- **lib/webpack.js**
    ```js
    const webpack = (options, callback) => {
        // 首先会检查配置参数是否合法
        // 创建Compiler
        let compiler;
        compiler = new Compiler(options.context); 
        compiler.options = new WebpackOptionsApply().process(options, compiler);
        if (options.watch === true || ..) {
            return compiler.watch(watchOptions, callback);
        }
        compiler.run(callback);
    }
    ```
#### 2. Compiler 插件编写
[Compiler anatomy](https://webpack.js.org/concepts/plugins/#anatomy)，我们可以在Compiler 编写一些 webpack插件

### 2. Compilation
webpack以开发模式运行时，监测到文件变化，一次新的compliation将被创建。一个 compliation 对象包含了当前的模块资源、编译生成资源、变化的文件等。他也提供了事件回调公插件扩展
### 3. Chunk
- `coding split`的产物
    - 可以把一些代码打成单独的chunk，比如一些公共模块，去重，更好的混存
    - 按需加载模块，优化加载时间
### 4. Template
生成代码最终需要用到的代码模版

### 5. 其它核心概念
- **Module**：模块，webpack，里面一切皆模块，一个模块对应一个文件。Webpack会从配置entry开始递归找出所有依赖的模块
- **Loader**：模块转换器，把模块按需求转换成新内容
    - loader 是有先后顺序的，从上到下，从左到右
- **Plugins**：扩展插件，webpack在构建过程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生
- **Parser**：基于acorn来分析AST语法树，解析代码模块的依赖
- **Dependency**：解析时用于保存代码模块对应的依赖使用对象。Module实例的build方法在执行完对应的loader时，处理完模块代码自身的转换后，继续调用Parser的实例来
解析自身依赖的模块，解析后的结果放在 module.dependencies中，首先保存的是依赖的路径，后续会经由 compilation.processModuleDependencies 方法，再来处理各个依赖模块，递归地去建立整个依赖

## Webpack5 基本使用
[webpack4中文文档](https://v4.webpack.js.org/configuration/)  [webpack5中文文档](https://webpack.js.org/configuration/)，后文以 webpack5 配置为主，4/5 主题流程一致，4的具体配置看官方文档
### 1. [entry](https://webpack.js.org/configuration/entry-context/#entry)
- 入口文件配置的几种方式
    - `string`
    - `[string]`
    - `object = { <key> string | [string] | object = { import string | [string], dependOn string | [string], filename string }}`
    - `(function() => string | [string] | object = { <key> string | [string] } | object = { import string | [string], dependOn string | [string], filename string })`
```js
module.exports = {
    entry: {
        home: './home.js',
        shared: ['react', 'react-dom', 'redux', 'react-redux'],
        catalog: {
            import: './catalog.js',
            filename: 'pages/catalog.js',
            dependOn: 'shared'
        },
        personal: {
            import: './personal.js',
            filename: 'pages/personal.js',
            dependOn: 'shared',
            chunkLoading: 'jsonp',
        }
    }
};
```

### 2. [ouput](https://webpack.js.org/configuration/output/)
主要的的配置有 `filername` `path` `libraryTarget`
```js
module.exports = {
    output: {
        // 打包的绝对路径,也可以填cdn的位置
        path: path.resolve(__dirname, 'dist/assets'),
        // 可选有 name、id、chunkhash、contenthash 等等
        filename: `[name].[contenthash].js`,
        // 配置打包的代码规范
        library: 'webpackNumbers',
        libraryTarget:'umd'
    }
}
```
### 3. [loaders](https://webpack.js.org/configuration/module/#ruleuse)
[webpack 搭配的 loaders](https://webpack.js.org/loaders/)

webpack 使用 Rule.use 来配置 loaders，
- 以 less-loader 为例
    ```
    npm install style-loader css-loader less less-loader -D
    ```
    ``` js
    // webpack.config.js
    module.exports = {
        module: {
            rules: [
                {
                    // 以 less 结尾的 less 文件都会被 以下三个 loader 处理
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'less-loader', options: { noIeCompat: true } }
                    ]
                }
            ]
        }
    };
    ```
- 加入 postcss
    - postcss 需要 autoprefixer 的支持
    ```
    npm install autoprefixer postcss-loader -D
    ```
    ``` js
    // webpack.config.js
    module.exports = {
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'less-loader', options: { noIeCompat: true } },
                        'postcss-loader'
                    ]
                }
            ]
        }
    };

    // postcss.config.js
    module.exports = {
        plugins: [
            require('autoprefixer')
        ]
    }

    // package.json
    "browserslist": [
        "defaults",
        "not ie <= 8",
        "last 2 versions",
        "> 1%",
        "iOS >= 7",
        "Android >= 4.0"
    ]
    ```
### 4. [plugins](https://webpack.js.org/configuration/plugins/)
插件配置依赖于具体的插件内容，参照对应插件文档即可
``` js
module.exports = {
  //...
    plugins: [
        new webpack.DefinePlugin({
            // Definitions...
        })
    ]
};
```
### 5. [resolve](https://webpack.js.org/configuration/resolve/)
该选项能设置模块如何被解析
``` js
module.exports = {
    resolve: {
        alias: { 
            // 配置别名，import 时 可直接 import template from 'Templates/index.html'
            Templates: path.resolve(__dirname, 'src/templates/') 
        }
    }
}
```
### 6. [externals](https://webpack.js.org/configuration/externals/)
支持多种格式 ：`string` `[string]` `object` `function` `RegExp`

项目中的公共库不想打包进去，可以使用以下配置,
``` js
module.exports = {
  //...
    externals: {
        jquery: 'jQuery'
    }
};
```
### 7. [devServer](https://webpack.js.org/configuration/dev-server/)
配置一个本地开发服务，还可以配置代理、http2等
``` js
module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
```
### 8. [Devtool](https://webpack.js.org/configuration/devtool/)
控制是否生成，以及如何生成 source map，具体需求配置可以参考 webpack 文档
- **source-map**：一种映射关系，会生成一个 map 文件
- **inline**：会打包在一个文件里
- **cheap**：打包在一个文件,只提示多少行,不管多少列,直管业务代码 不管依赖的 module
- **eval**：最快的一种打包方式
``` js
module.exports = { 
    // 生产环境建议使用
    devtool: 'cheap-module-source-map',
    // 开发环境建议使用
    devtool: 'cheap-module-eval-source-map'
}
```
### 9. [optimization](https://webpack.js.org/configuration/optimization/)
optimization 重要的配置是 [splitChunks](https://webpack.js.org/plugins/split-chunks-plugin/)
``` js
module.exports = {
    optimization: {
        splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
}
```
### 10. [performance](https://webpack.js.org/configuration/performance/)
该选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
    

## 一些问题总结
### 1. tree-shaking问题
- webpack4中内置了tree-shaking，webpack3中需要借助插件才可以实现
- webpack 的 tree-shaking 需要模块代码支持es6才可以，例如它无法处理 lodash, 但可以处理 lodash-es
### 2. 插件扩展
#### 1. js
- **webpack-deep-scope-plugin**：深度tree-shaking
- **thread-loader**： 多线程压缩
- **html-webpack-externals-plugin**：公共包提取
- **prepack-webpack-plugin**： 代码求值
- **terser-webpack-plugin**：uglifyjs-webpack-plugin不支持es6
#### 2. HTML
- **html-webpack-inline-source-plugin**：将css、js内嵌至html
- **html-inline-css-webpack-plugin**：核心的css放到页面内部
- inline-manifest-webpack-plugin
#### 3. CSS
- **[cssnano](https://cssnano.co/guides/getting-started/)**：css打包优化
- **optimize-css-assets-webpack-plugin**： css 多核压缩 

#### 4. 打包优化
- **hard-source-webpack-plugin**：工程开启缓存
- **cache-loader**： loader的缓存
- **image-webpack-loader**： 图片压缩
- **HtmlWebpackPlugins**
    ``` js
    new HtmlWebpackPlugin({
        inlineSource: ".css$",
        template: path.join(__dirname, `src/${pageName}/index.html`), filename: `${pageName}.html`,
        chunks: ["vendors", pageName],
        inject: true,
        minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
        }, 
    });
    ``
#### 5. 工程篇
- **webpack-bundle-analyzer**：打包大小分析，可从此入手优化打包
- **webpackbar**： 打包进度展示
- **speed-measure-webpack-plugin**：打包速度分析
- **webpack-build-notifier**：打包编译信息（成功/失败）提醒
- **set-iterm2-badge && node-bash-title**：设置标题、设置背景
- **friendly-errors-webpack-plugin**： 打包页面友好展示




<br>
<br>

**参考博文**
- [https://juejin.im/post/6844904000169607175](https://juejin.im/post/6844904000169607175)

