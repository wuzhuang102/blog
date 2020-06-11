# 前端测试
本文测试代码地址 [单元测试、e2e测试](https://github.com/wuzhuang102/blog/tree/study_demo/qa)

## 1. 单元测试
- 断言库：检验代码最小单元是否正常运行
- 测试风格：
    - 测试驱动开发（Test-Driven Development, TDD）：关注所有的功能是否被实现(每一个功能都必须有对应的测试用 例)
    - 行为驱动开发（Behavior-Driven Development, BDD）：关注整体行为是否符合整体预期,编写的每一行代码都有目的提 供一个全面的测试用例集
- 单元测试框架
    - Mocha
    - Karma

### karma实战
**第一步：** 安装依赖
``` bash
npm install -g karma
npm install -D karma-coverage karma-jasmine phantomjs
```

**第二步：** 初始化karma
``` bash
karma init
```
生成配置文件 `karma.conf.js`
``` js
module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			"./src/**/*.js",
			"./test/unit/**/*.spec.js"
		],
		reporters: ['progress', 'coverage'],
		preprocessors: {
			'src/**/*.js': ['coverage']
		},
		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
        },
        // ...
        browsers: ['PhantomJS']
	})
}
```
**第三步：** 编写应用程序与测试用例

`./src/index.js` 应用程序
``` js
window.add = function (a) {
    if(a == 1) {
        return 1
    }else {
        return (a = a + 1)
    }
}
```

`./test/unit/index.spec.js`  测试用例文件
``` js
describe("基本测试用例", function() {
    it('+1测试函数', function() {
        expect(window.add(1)).toBe(1)
        expect(window.add(2)).toBe(3)
    })
})
```
**第四步：**
``` bash
karma test
```
## 2. UI测试
用UI的设计图与代码写出的程序作像素点比较，对比出差异所在

UI测试框架
- [backstopjs](https://www.npmjs.com/package/backstopjs)

### backstop 实战
**第一步：** 初始化
``` bash
npm install -g backstopjs
backstop init
```
backstop init会生成 `backstop_data` 文件夹和` backstop.json` 的文件

**第二步：** 添加对比设计图和测试网页连接
- 我们需要在 `backstop_data`下创建 `bitmaps_reference`文件夹，这里面放入需要对比的设计图 
- `backstop.json` 中，scenarios 下 url 设置需要测试的网页连接

`backstop.json` 文件内容主体如下
``` json
{
	"id": "backstop_default",
	"viewports": [
		{
			"label": "phone",
			"width": 375,
			"height": 667
		},
		{
			"label": "tablet",
			"width": 1024,
			"height": 768
		}
	],
	"onBeforeScript": "puppet/onBefore.js",
	"onReadyScript": "puppet/onReady.js",
	"scenarios": [
		{
			"label": "BackstopJS Homepage",
			"cookiePath": "backstop_data/engine_scripts/cookies.json",
			"url": "https://m.gushenpai.com/",  // init后需要在此添加测试的网站连接
			// ...
		}
	],
	"paths": {
		"bitmaps_reference": "backstop_data/bitmaps_reference",
		"bitmaps_test": "backstop_data/bitmaps_test",
		"engine_scripts": "backstop_data/engine_scripts",
		"html_report": "backstop_data/html_report",
		"ci_report": "backstop_data/ci_report"
	},
	"report": [
		"browser"
	],
	// ...
}
```
**第三步：** 进行UI测试
``` bash
backstop test
```
此时，我们就能看见设计图与网页的像素级差距



## 3. e2e测试

### selenium-webdriver实战
**第一步：** 安装依赖
``` js
npm install -D selenium-webdriver
```
**第二步：** 下载需要的浏览器组件[组件下载地址](https://www.selenium.dev/selenium/docs/api/javascript/),放在项目根目录
![浏览器组件](/js/browser-component.jpg)

**第三步：** 创建测试实例 `baidu.spec.js`
``` js
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://baidu.com');
        await driver.findElement(By.name('wd')).sendKeys('吴壮', Key.RETURN);
        await driver.wait(until.titleIs('吴壮_百搜索'), 1000);
    } finally {
        await driver.quit();
    }
})();
```
**第四步：** 运行测试实例 
``` bash
node baidu.spec.js
```
程序会打开指定的浏览器进行指令操作

### rize + puppeteer 实战
`puppeteer` 是 `Rize` 的一个 peer dependency,因此使用rize的时候，puppteer也需要被安装

**第一步：** 安装依赖
``` bash
npm install -D puppeteer rize
```
**第二步：** 编写测试实例 `github.spec.js`
``` js
const Rize = require('rize');
const rize = new Rize();
rize
  .goto('https://github.com/')
  .type('input.header-search-input', 'node')
  .press('Enter')
  .waitForNavigation()
  .assertSee('Node.jsxxx')
  .end(); // 别忘了调用 `end` 方法来退出浏览器！
```
**第三步：**
``` bash
node github.spec.js
```
测试实例正确的话，进程会安稳结束没有输出，错误的话，会报具体问题

## 4. 功能测试
- [实战代码](https://github.com/wuzhuang102/blog/tree/study_demo/qa)
- 功能测试框架
    - mocha

### Mocha 实战
**第一步：** 安装依赖
``` bash
npm install -S koa
npm install -D supertest mocha mochawesome
```

**第二步：**

创建主体程序文件 `app.js`
``` js
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    ctx.body = {
        data: '刁民'
    }
})

app.listen(3000, () => {
    console.log('服务在3000端口')
})

module.exports = app
```
创建测试文件 app.spec.js
``` js
const superagent = require('supertest')
const app = require('./app')

function request() {
    return superagent(app.listen())
}

describe('自动化脚本', function() {
    it('获取后台接口数据', function(done) {
        request()
            .get('/')
            .set('Accept','application')
            .expect('Content-Type',/json/)
            .expect(200)
            .end(function(err, res) {
                if(err) {
                    done(new Error('请求出错'))
                }else {
                    console.log(res.body)
                    if(res.body.data === '刁民') {
                        done()
                    }else {
                        done(new Error('请求数据出错'))
                    }
                }
            })
    })

    it('404容错脚本', function(done) {
        request()
            .get('/educated')
            .expect(404, done)
    }) 
})
```
创建执行文件 `mochaRunner.js`
``` js
const Mocha = require('mocha')

const mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'docs/mochawesome-report' // 文档生成位置
    }
})

mocha.addFile('./test/service/app.spec.js')  //测试代码文件

mocha.run(function() {
    process.exit(0)
})
```
**第三步：** 执行mochaRunner.js
``` bash
node mochaRunner.js
```
执行结果大致如下
![功能测试](/js/qa_function.jpg)

## 性能测试

## 安全测试

## 功能测试
