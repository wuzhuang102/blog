# CSS --- 常用CSS

## CSS经验之谈
### 1. CSS 重置的问题
- 直接使用 * 的杀伤力太大，建议使用 [Neat.css](https://github.com/thx/cube/blob/gh-pages/src/scss/neat.scss),它是Normalize.css(修复) 和 Reset.css(重置)的集合
- 移动端可使用以下代码，防止页面被撑开
    ``` css
    html { box-sizing: border-box; }
    *,*:before,*:after { box-sizing: inherit}
    ```
### 2. CSS Font问题
[font family详解](https://github.com/chokcoco/iCSS/issues/6)

1. web可用字体大致可以分为以下5种
    - **serif(衬线)**：衬线的意思是在字符笔画末端有叫做衬线的小细节的额外装饰，而且笔画的粗细会有所不同，这些细节在大写字母中特别明显
    - **sans-serif(无衬线)**：专指西文中没有衬线的字体，与汉字字体中的黑体相对应;
    - monospace(等宽)
    - fantasy(梦幻)
    - cuisive(草体)
2. 大厂常用font-family
    ``` css
    /* taobao */
    font-family: tahoma, arial, "Hiragino Sans GB", 宋体, sans-serif;
    /* 天猫 */
    font-family: "PingFang SC",miui,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif;
    /* github */
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    /* css-tricks */
    font-family: system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
    ```
    - sans-serif 一般用来做兜底方案，统一风格
    - 要保证西文字体在中文字体前面
### 3. 内容的水平、垂直居中
``` css
.container {
    display: flex;
}
.container div {
    margin: auto;
}
```
### 4. 浮动与清除浮动
#### 4.1 定义
浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止
#### 4.2 浮动的副作用
父元素高度塌陷
#### 4.3 清除浮动
- 给浮动元素父元素添加高度（扩展不好）
- clear: both; 
    - 最后添加一个块级元素（伪类元素亦可）并添加 clear: both;样式
- 让父元素形成 [BFC](/front-end/css/formatting-context.html#bfc布局规则)
    - BFC 可以包含浮动，这点可以清除浮动
    - 最常用的就是 `overflow: hidden` 形成BFC
- `<br clear="all" />`
    - br 拥有一个属性 clear


## 另辟蹊径
### 1. AE动画转前端动画
[LottieFile](https://lottiefiles.com/)帮助我们将AE动画转H5、Android、iOS动画
### 2. 使用 overflow:scroll 创建可拉伸布局
``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>自动拉伸</title>
    <style>
        .column {
            overflow: hidden;
            border: 1px dashed darkkhaki;
        }

        .column-left {
            height: 400px;
            background-color: #fff;
            position: relative;
            float: left;
        }

        .column-right {
            height: 400px;
            padding: 16px;
            background-color: #eee;
            box-sizing: border-box;
            overflow: hidden;
        }

        .resize-save {
            position: absolute;
            top: 0;
            right: 5px;
            bottom: 0;
            left: 0;
            padding: 16px;
            overflow-x: hidden;
        }

        .resize-bar {
            width: 200px;
            height: inherit;
            resize: horizontal;
            cursor: ew-resize;
            opacity: 0;
            overflow: scroll;
        }

        /* 拖拽线 */
        .resize-line {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            border-right: 2px solid #eee;
            border-left: 1px solid #bbb;
            pointer-events: none;
        }

        /* 匹配所有同级的resize-line */
        .resize-bar:hover~.resize-line {
            border-left: 1px dashed skyblue;
        }

        .resize-bar::-webkit-scrollbar {
            width: 200px;
            height: inherit;
        }
    </style>
</head>

<body>
    <div class="column">
        <div class="column-left">
            <div class="resize-bar"></div>
            <div class="resize-line"></div>
            <div class="resize-save">
                左侧的内容，左侧的内容，左侧的内容，左侧的内容
            </div>
        </div>
        <div class="column-right">
            右侧的内容，右侧的内容，右侧的内容，右侧的内容
        </div>
    </div>
</body>

</html>
```
### 3. CSS矩阵
[CSS矩阵](https://juejin.im/post/6844903872121569293)

如有必要，可使用[http://ds-overdesign.com/transform/matrix3d.html](http://ds-overdesign.com/transform/matrix3d.html)将scale、translate、rotate、skew 转换成 martrix 使用
### 4. 不常用但有用的CSS属性
- **混合模式种类**：[mix-blend-mode](https://drafts.fxtf.org/compositing-1/#mix-blend-mode)
- [isolation](https://drafts.fxtf.org/compositing-1/#isolation)
- [background-blend-mode](https://drafts.fxtf.org/compositing-1/#background-blend-mode)
- [shape-outside](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-outside)：属性定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装
### 5. CSS项目合集
- **12个令人惊叹的CSS实验项目：**： [12个令人惊叹的CSS实验项目](https://juejin.im/post/6844903769214304264)

## 布局
*圣杯布局* 和 *双飞翼布局* 都是实现三栏布局的方法，左右定宽，中间自适应，是很常见的布局，其原理差不多，都有负边距的应用

在不考虑兼容的情况下： `flex` 可以轻松的实现双飞翼布局
### 1. 圣杯布局
#### 要求
1. header 和 footer 各自占领屏幕虽有宽度
2. 中间container是三栏布局，两侧宽度固定，中间部分自动填充
3. 中间部分的高度是三栏中最高的区域高度
#### 实现
1. left、center、right 都设左浮动且 `position: relative`
2. 容器设置 `padding: 0 150px`, padding 为 left、right 放置内容区域
3. left负边距 -100%，并左移 150px；right 负边距 -150px，并右移 150px;

``` html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
</head>
<style>
    body {
        min-width: 550px;
        font-weight: bold;
        font-size: 20px;
    }

    #header,
    #footer {
        background-color: #ccc;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    #container {
        padding: 0 150px;
        overflow: hidden;
    }

    #center,
    #left,
    #right {
        position: relative;
        height: 300px;
        text-align: center;
        line-height: 300px;
        float: left;
    }

    #center {
        background-color: #eee;
        width: 100%;
    }

    #left {
        width: 150px;
        margin-left: -100%;
        left: -150px;
    }

    #right {
        width: 150px;
        margin-left: -150px;
        right: -150px;
    }
</style>

<body>
    <div id="header">#header</div>

    <div id="container">
        <div id="center">#center</div>
        <div id="left">#left</div>
        <div id="right">#right</div>
    </div>

    <div id="footer">#footer</div>
</body>

</html>
```

### 2. 双飞翼布局

#### 实现
1. left、center、right 都设置左浮动
2. center宽度为100%
3. 设置负边距，left 设置负边距为100%，right设置负边距为自身宽度
4. content 的左右 margin 值为左右两个侧栏的宽度
``` html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
</head>
<style>
    body {
        min-width: 550px;
        font-weight: bold;
        font-size: 20px;
    }

    #header,
    #footer {
        background: rgba(29, 27, 27, 0.726);
        text-align: center;
        height: 60px;
        line-height: 60px;
    }

    #container {
        overflow: hidden;
    }

    .column {
        text-align: center;
        height: 300px;
        line-height: 300px;
    }

    #left,
    #right,
    #center {
        float: left;
    }

    #center {
        width: 100%;
        background: rgb(206, 201, 201);
    }

    #left {
        width: 200px;
        margin-left: -100%;
        background: rgba(95, 179, 235, 0.972);
    }

    #right {
        width: 150px;
        margin-left: -150px;
        background: rgb(231, 105, 2);
    }

    .content {
        margin: 0 150px 0 200px;
    }
</style>

<body>
    <div id="header">#header</div>

    <div id="container">
        <div id="center" class="column">
            <div class="content">#center</div>
        </div>
        <div id="left" class="column">#left</div>
        <div id="right" class="column">#right</div>
    </div>

    <div id="footer">#footer</div>
</body>

</html>
```
![双飞翼](/css/double-swing.jpg)