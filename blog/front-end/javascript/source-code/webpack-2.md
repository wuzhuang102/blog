# 源码篇 --- Webpack(二)：源码分析

## 1. 启动文件 
### 1. [webpack/lib/webpack.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-master/bin/webpack.js)
这是webpack启动时执行的第一个文件, 它先去判断 `webpack-cli` 这个包是否被安装，
- 如果未安装，会 通过 `questionInterface.question` 提示我们全装，
- 已安装后， 就去 `require(path.resolve(path.dirname(pkgPath), pkg.bin[cli.binName]))`,也就是 webpack-cli 项目中的 `bin/cli.js`

<div style="height:500px;overflow:scroll">

``` js
const cli = {
	name: "webpack-cli",
	package: "webpack-cli",
	binName: "webpack-cli",
	installed: isInstalled("webpack-cli"),
	url: "https://github.com/webpack/webpack-cli"
};

if (!cli.installed) {
	const path = require("path");
	const fs = require("graceful-fs");
	const readLine = require("readline");
	const notify =
		"CLI for webpack must be installed.\n" + `  ${cli.name} (${cli.url})\n`;
	console.error(notify);

	// 有 yarn 就使用 yarn 安装
	const isYarn = fs.existsSync(path.resolve(process.cwd(), "yarn.lock"));
	const packageManager = isYarn ? "yarn" : "npm";
	const installOptions = [isYarn ? "add" : "install", "-D"];

	console.error(
		`We will use "${packageManager}" to install the CLI via "${packageManager} ${installOptions.join(
			" "
		)}".`
	);

	const question = `Do you want to install 'webpack-cli' (yes/no): `;
	const questionInterface = readLine.createInterface({
		input: process.stdin,
		output: process.stderr
	});

	// In certain scenarios (e.g. when STDIN is not in terminal mode), the callback function will not be
	// executed. Setting the exit code here to ensure the script exits correctly in those cases. The callback
	// function is responsible for clearing the exit code if the user wishes to install webpack-cli.
	// 这一步是交互步骤，y 表示安装自动 cli
	process.exitCode = 1;
	questionInterface.question(question, answer => {
		questionInterface.close();
		const normalizedAnswer = answer.toLowerCase().startsWith("y");
		if (!normalizedAnswer) {
			console.error(
				"You need to install 'webpack-cli' to use webpack via CLI.\n" +
					"You can also install the CLI manually."
			);
			return;
		}
		process.exitCode = 0;
		runCommand(packageManager, installOptions.concat(cli.package))
			.then(() => {
				require(cli.package); //eslint-disable-line
			})
			.catch(error => {
				console.error(error);
				process.exitCode = 1;
			});
	});
} else {
	const path = require("path");
	const pkgPath = require.resolve(`${cli.package}/package.json`);
	// eslint-disable-next-line node/no-missing-require
	const pkg = require(pkgPath);
	// eslint-disable-next-line node/no-missing-require
	require(path.resolve(path.dirname(pkgPath), pkg.bin[cli.binName]));
}
```
</div>

### 2. [webpack-cli/bin/cli.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-cli/bin/cli.js)
cli.js 就是一个入口文件，它的任务很简单，就是去找 /lib/bootstrap.js
```js
const runCLI = require('../lib/bootstrap');

if (packageExists('webpack')) {
    const [, , ...rawArgs] = process.argv;
    runCLI(rawArgs);
} else { /* ... */ }
```

### 3. [webpack-cli/bin/bootstrap.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-cli/lib/bootstrap.js)
boostrap 核心任务是配置 webpack [命令行](https://github.com/wuzhuang102/blog/blob/source-code/webpack-cli/lib/utils/cli-flags.js)、格式化参数(包括各种 `webpack.config.**.js` 中的配置)，把过滤后的参数交给 `webpack-cli` 中的 `run` 来执行

### 4. [webpack-cli/bin/webpack-cli.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-cli/lib/webpack-cli.js)
创建 webpack 实例，创建动作在 [webpack-cli/lib/utils/Compiler.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-cli/lib/utils/Compiler.js) 中
```js
class WebpackCLI extends GroupHelper {
    constructor() {
        super();
        this.groupMap = new Map();
        this.compilation = new Compiler();
        this.compilerConfiguration = {};
        this.outputConfiguration = {};
    }
    async run(args, cliOptions) {
        // 合并命令行、各种 webpack.config.**.js 中的参数至 this.compilerConfiguration
        await this.processArgs(args, cliOptions);
        await this.compilation.createCompiler(this.compilerConfiguration);
        const webpack = await this.compilation.webpackInstance({
            options: this.compilerConfiguration,
            outputOptions: this.outputConfiguration,
        });
        return webpack;
    }
}
```
### 5. [webpack/lib/index.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-master/lib/index.js)
index.js 的主要作用就是将各种 [plugin](https://webpack.js.org/plugins/) 挂载在 webpack 上，并将 webpack 暴露出去

<div style="height: 300px;overflow:scroll">

``` js
const fn = lazyFunction(() => require("./webpack"));
module.exports = mergeExports(fn, {
	get webpack() {
		return require("./webpack");
	},
	get AutomaticPrefetchPlugin() {
		return require("./AutomaticPrefetchPlugin");
	}
	// ...
}

const mergeExports = (obj, exports) => {
	const descriptors = Object.getOwnPropertyDescriptors(exports);
	for (const name of Object.keys(descriptors)) {
		const descriptor = descriptors[name];
		if (descriptor.get) {
			const fn = descriptor.get;
			Object.defineProperty(obj, name, {
				configurable: false,
				enumerable: true,
				get: memorize(fn)
			});
		} else if (typeof descriptor.value === "object") {
			Object.defineProperty(obj, name, {
				configurable: false,
				enumerable: true,
				writable: false,
				value: mergeExports({}, descriptor.value)
			});
		} else {
			throw new Error(
				"Exposed values must be either a getter or an nested object"
			);
		}
	}
	return /** @type {A & B} */ (Object.freeze(obj));
};
```
</div>

### 6. [webpack/lib/webpack.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-master/lib/webpack.js)
上面提到 webpack-cli 中创建 webpack 实例在 [webpack-cli/lib/utils/Compiler.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-cli/lib/utils/Compiler.js) 中，它实际引入的是 
[webpack/lib/index.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-master/lib/index.js)，这个文件负责 webpack 项目依赖的管理，根本还是在 [webpack/lib/webpack.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-master/lib/webpack.js) 中
<div style="height: 500px;overflow: scroll">

``` js
const webpack = /** @type {WebpackFunctionSingle & WebpackFunctionMulti} */ ((
	options,
	callback
) => {
	const create = () => {
		validateSchema(webpackOptionsSchema, options);
		/** @type {MultiCompiler|Compiler} */
		let compiler;
		let watch = false;
		/** @type {WatchOptions|WatchOptions[]} */
		let watchOptions;
		if (Array.isArray(options)) {
			/** @type {MultiCompiler} */
			compiler = createMultiCompiler(options);
			watch = options.some(options => options.watch);
			watchOptions = options.map(options => options.watchOptions || {});
		} else {
			/** @type {Compiler} */
			compiler = createCompiler(options);
			watch = options.watch;
			watchOptions = options.watchOptions || {};
		}
		return { compiler, watch, watchOptions };
	};
	if (callback) {
		try {
			const { compiler, watch, watchOptions } = create();
			if (watch) {
				compiler.watch(watchOptions, callback);
			} else {
				compiler.run((err, stats) => {
					compiler.close(err2 => {
						callback(err || err2, stats);
					});
				});
			}
			return compiler;
		} catch (err) {
			process.nextTick(() => callback(err));
			return null;
		}
	} else {
		const { compiler, watch } = create();
		if (watch) {
			util.deprecate(
				() => {},
				"A 'callback' argument need to be provided to the 'webpack(options, callback)' function when the 'watch' option is set. There is no way to handle the 'watch' option without a callback.",
				"DEP_WEBPACK_WATCH_WITHOUT_CALLBACK"
			)();
		}
		return compiler;
	}
});
module.exports = webpack;
```
</div>

## 2. Compiler
项目启动的最后一步 [webpack/lib/webpack.js](https://github.com/wuzhuang102/blog/blob/source-code/webpack-master/lib/webpack.js) 中，创建了 complier

### 1. webpack/lib/webpack.js
``` js
const NodeEnvironmentPlugin = require("./node/NodeEnvironmentPlugin");

const createCompiler = rawOptions => {
	// 得到规范化后的参数
	const options = getNormalizedWebpackOptions(rawOptions);
	applyWebpackOptionsBaseDefaults(options);
	const compiler = new Compiler(options.context);
	compiler.options = options;
	new NodeEnvironmentPlugin({
		infrastructureLogging: options.infrastructureLogging
	}).apply(compiler);
	// complier挂载插件
	if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				plugin.call(compiler, compiler);
			} else {
				plugin.apply(compiler);
			}
		}
	}
	applyWebpackOptionsDefaults(options);
	compiler.hooks.environment.call();
	compiler.hooks.afterEnvironment.call();
	new WebpackOptionsApply().process(options, compiler);
	compiler.hooks.initialize.call();
	return compiler;
};
```
### 2. webpack/lib/Compiler
Compiler 中定义了很多的 Hooks，具体的 Hooks 请参考 [compiler-hooks](https://webpack.js.org/api/compiler-hooks/)
``` js
const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require("tapable");

class Compiler {
	this.hooks = Object.freeze({
		initialize: new SyncHook([]),
		run: new AsyncSeriesHook(["compiler"]),
		emit: new AsyncSeriesHook(["compilation"]),
	})

	run()
	compile() 
}
```
- **tapable**
	- [tapable](https://webpack.js.org/api/plugins/#tapable) 是一种类似于 node 中 EventEmitter ，主要控制钩子函数的订阅与发布，订的事件会被一次执行
	``` js
	const { SyncHook } = require('tapable')
	const syncHook = new SyncHook(["name", "age"]);

	// 注册事件
	syncHook.tap("1", (name, age) => {
		console.log("1", name, age);
	});
	syncHook.tap("2", (name, age) => {
		console.log("2", name, age);
	});

	// 触发事件，让监听函数执行
	syncHook.call("doThings", 18);
	// 1 doThings 18
	// 2 doThings 18
	```
- **自定义插件**
	- 通过 Compiler 的实现以及 tapable 的使用，我们就能理解webpack插件中为什么要使用 `compiler.hooks.run.tap()` 来注册任务了
	``` js
	class WebpackFiveTry {
		apply(compiler) {
			compiler.hooks.run.tapAsync('MyPlugin', (source, target, routesList, callback) => {
			    console.log('以异步方式触及 run 钩子。');
			    callback();
			});
		}
	}
	```
### 3. Compiler.run()
- run 方法的主要目的就是依次执行各个hooks，并在必要的时候创建需要的工具（compilation等）
- run 函数在正常情况下会调用 `hooks.beforeRun.callAsync()` --> `hooks.run.callAsync()` --> `readRecords()` --> `compile()`
- `onCompiled` 函数会在 `this.compile` 执行完后调用，也是触发一些 hooks

<div style="height: 500px;overflow: scroll">

``` js
run(callback) {
	const finalCallback = (err, stats) => {
		this.hooks.afterDone.call(stats);
	};
	const onCompiled = (err, compilation) => {
		if (this.hooks.shouldEmit.call(compilation) === false) {
			const stats = new Stats(compilation);
			this.hooks.done.callAsync(stats, err => {
				return finalCallback(null, stats);
			});
		}

		process.nextTick(() => {
			this.emitAssets(compilation, err => {
				if (compilation.hooks.needAdditionalPass.call()) {
					const stats = new Stats(compilation);
					this.hooks.done.callAsync(stats, err => {
						this.hooks.additionalPass.callAsync(err => {
							this.compile(onCompiled);
						});
					});
					return;
				}
				this.emitRecords(err => {
					const stats = new Stats(compilation);
					this.hooks.done.callAsync(stats, err => {
						this.cache.storeBuildDependencies(
							compilation.buildDependencies,
							err => {
								return finalCallback(null, stats);
							}
						);
					});
				});
			});
		});
	};

	const run = () => {
		this.hooks.beforeRun.callAsync(this, err => {
			if (err) return finalCallback(err);
			this.hooks.run.callAsync(this, err => {
				if (err) return finalCallback(err);
				this.readRecords(err => {
					if (err) return finalCallback(err);
					// 实例化 compilation 并传给 hook.make
					this.compile(onCompiled);
				});
			});
		});
	};
	// ...
	run()
}
```
</div>

### 4. Compiler.compile()
- 这一步主要就是实例化 compilation， 并将它传给 hook.make
- `hooks.beforeCompile.callAsync()` --> `createCompilation()` --> `hooks.make.callAsync()` --> `hooks.finishMake.callAsync()` --> `hooks.afterCompile.callAsync()`

``` js
compile(callback) {
	const params = this.newCompilationParams();
	this.hooks.beforeCompile.callAsync(params, err => {
		this.hooks.compile.call(params);
		const compilation = this.newCompilation(params);

		this.hooks.make.callAsync(compilation, err => {
			this.hooks.finishMake.callAsync(compilation, err => {
				process.nextTick(() => {
					compilation.finish(err => {
						compilation.seal(err => {
							this.hooks.afterCompile.callAsync(compilation, err => {
								return callback(null, compilation);
							});
						});
					});
				});
			});
		});
	});
}
```
### 5. compiler.hooks.emit.callAsync()
- `compile()` 执行完后，准确说是 `compilation.seal()`执行完，模块的所有信息以及打包后源码信息都存在内存中，这时需要将代码输出到对应的目录中
- `emitAssets()` 方法中会执行 `hooks.emit.callAsync()`，回调函数就会做出输出动作
``` js
emitAssets(compilation, callback) {
	let outputPath;
	const  emitFiles = err => { /* ... */ }
	this.hooks.emit.callAsync(compilation, err => {
		if (err) return callback(err);
		outputPath = compilation.getPath(this.outputPath, {});
		mkdirp(this.outputFileSystem, outputPath, emitFiles);
	});
}
```

## 3. Compilattion
compilation 在创建之后，compiler.hooks.finishMake.callAsync 阶段后，调用 `compilation.finish` 和 `compilation.seal` 参见 [Compiler.compile](/front-end/javascript/source-code/webpack-2.html#_2-compiler)
- 参考文档：
	- Compilation 相关对象、方法的说明 [Compilation Object](https://webpack.js.org/api/compilation-object/)


### 1. webpack/lib/Compilation
``` js
class Compilation {
	constructor() {
		this.hooks = {
			// ....
		}
		this.entries = new Map();    	// 打包文件的入口
		this.chunks = new Set();		// 所有的chunk
		this.modules = new Set();		// 所有解析后的模块
		this.assets = {};				// 打包生成的文件
	}
}
```
compilation 创建后第一步执行了 **hooks.make.callAsync**

### 2. (compiler).hooks.make.callAsync
我们可以全局搜索 compiler.hooks.make.tapAsync 查看哪些地方订阅了 hooks.make,总共有五个,但只有 EntryPlugin 是默认安装的，其它的需要手动配置，可以自己去搜搜

默认配置时调用了 `compilation.addEntry()`、`compilation.addModuleChain()`
``` js
// EntryPlugin.js  
// 调用 compilation.addEntry 添加入口文件
compiler.hooks.make.tapAsync("EntryPlugin", (compilation, callback) => {
	const { entry, options, context } = this;
	const dep = EntryPlugin.createDependency(entry, options);
	compilation.addEntry(context, dep, options, err => {
		callback(err);
	});
});

// 等等...
```
### 3. Compilation.addEntry()
`addEntry()` 的主要代码迁移到了 `_addEntryItem()` 中，
- 主要调用步骤：
	- `this.addEntry` --> `this.addModuleChain` --> `this.handleModuleCreation` --> `this.factorizeModule` --> `this.addModule`
		--> `this.buildModule` ：这些阶段主要是收集入口文件以及相关模块（通过import/require）导入的
	- --> `module.build`：这个方法负责将

### 4. NormalModule.build()
`this.parser` 是 `JavascriptParser`的实例对象，借助其上的 parse 方法能进行 AST 语法分析
``` js
let result;
result = this.parser.parse(this._ast || this._source.source(), {
	current: this,
	module: this,
	compilation: compilation,
	options: options
});

```
### 5. NormalModule.doBuild()
`doBuild` 的主要作用就是用合适的 `loader` 去加载资源文件，将文件(css、less、vue等)转换成 JS 模块，这样才能统一解析，配置的 `loaders` 就是在这里生效的
``` js
doBuild(options, compilation, resolver, fs, callback){
	runLoaders({ 
		resource: this.resource, loaders: this.loaders, context: loaderContext,
		readResource: (resource, callback) => { /* ... */}
	},(err, result) => {
		// ... 
		if (
			this.loaders.length > 0 &&
			this.buildInfo.buildDependencies === undefined
		) {
			this.buildInfo.buildDependencies = new LazySet();
		}
		for (const loader of this.loaders) {
			this.buildInfo.buildDependencies.add(loader.loader);
		}
		this.buildInfo.cacheable = result.cacheable;
		processResult(err, result.result);
	});
}
```

到这里， webpack 已经完整的收集了该模块的信息和依赖项，接下来就是打包封装模块了
### 6. Compilation.seal()
`seal()` 步骤比较多，封闭模块，生成资源 `this.assets`、`this.chunks`

然后 `this.createChunkAssets` 把所有的依赖项通过对应的模版 render 出一个拼接好的字符串
``` js
createChunkAssets(callback){
    asyncLib.forEach(
        this.chunks,
        (chunk, callback) => {
            // manifest是数组结构，每个manifest元素都提供了 `render` 方法，提供后续的源码字符串生成服务。至于render方法何时初始化的，在`./lib/MainTemplate.js`中
            let manifest = this.getRenderManifest()
            asyncLib.forEach(
                manifest,
                (fileManifest, callback) => {
                    ...
                    source = fileManifest.render()
                    this.emitAsset(file, source, assetInfo)
                },
                callback
            )
        },
        callback
    )
}
```
到这里，返回 compiler 中将代码输出到文件中，整个大流程就结束了


### 7. 总结
- `compilation` 被创建后先去执行 `compiler.hook.make.callSync()`，这个时候触发 `compilation.addEntry()` --> `compilation.addModuleChain()`，收集入口文件以及相关依赖
- `moudle.doBuild()` 中使用各种 loaders，将资源文件转换成标准 JS 代码，
- `seal()` 封闭打包，生成 `assets` 和 `chunk`
- `emitAssets()` 导出生成文件 


<br>
<br>
<br>

**博文参考**
- [https://github.com/amandakelake/blog](https://github.com/amandakelake/blog)
- [https://juejin.im/post/6844903987129352206](https://juejin.im/post/6844903987129352206)



