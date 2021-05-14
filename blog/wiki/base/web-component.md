# Web Component
## 什么是 web component
Web Component 是一套网页API，允许你在网页和webapp中 创建自定义的、可重用的且密封的 HTML 标签。自定义的组件和小部件建立在 web component 标准上，可以在现代浏览器上直接运行，也可以在任何 JavaScript 库或者使用HTML的框架一起使用。
## web component 的使用
### 1. 创建自定义标签
window.customElements.define(tag-name, tag-class) 用来创建自定义标签，自定义标签中的细节可以使用 js 在UserCard 类中实现
``` js
class UserCard extend HTMLElement {
    constructor() {
        super()
        // 具体操作
    }
}
window.customElements.define('user-card', UserCard);
```
### 2. template
直接在 UserCard 类中操作 DOM 会比较繁琐，Web-Component API 提供了 `template` 标签，可在其中编写 html 和 css
``` html
<template id="userCardTemplate">
    <style>...</style>
    <div></div>
</template>
```
### 3. Shadow DOM
我们不希望用户能够看到 `<user-card>` 的内部代码，Web Component 允许内部代码隐藏起来，这叫做 Shadow DOM，即这部分 DOM 默认与外部 DOM 隔离，内部任何代码都无法影响外部。

使用 attachShadow({ mode: 'closed' }) 封闭 Shadow DOM
``` js
class UserCard extends HTMLElement {
    constructor() {
        super();
        var shadow = this.attachShadow( { mode: 'closed' } );
    }
}
```
### 4. 完整demo
[demo 页面](https://jsbin.com/zudebabaxa/edit?html,js,output)
``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>JS Bin</title>
   
</head>
<body>
    <user-card image="https://semantic-ui.com/images/avatar2/large/kristy.png" name="User Name"
        email="yourmail@some-email.com"></user-card>

    <template id="userCardTemplate">
        <style>
            :host {
                display: flex;
                align-items: center;
                width: 450px;
                height: 180px;
                background-color: #d4d4d4;
                border: 1px solid #d5d5d5;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
                border-radius: 3px;
                overflow: hidden;
                padding: 10px;
                box-sizing: border-box;
                font-family: 'Poppins', sans-serif;
            }
            .image {
                flex: 0 0 auto;
                width: 160px;
                height: 160px;
                vertical-align: middle;
                border-radius: 5px;
            }
            .container {
                box-sizing: border-box;
                padding: 20px;
                height: 160px;
            }
            .container>.name {
                font-size: 20px;
                font-weight: 600;
                line-height: 1;
                margin: 0;
                margin-bottom: 5px;
            }
            .container>.email {
                font-size: 12px;
                opacity: 0.75;
                line-height: 1;
                margin: 0;
                margin-bottom: 15px;
            }
            .container>.button {
                padding: 10px 25px;
                font-size: 12px;
                border-radius: 5px;
                text-transform: uppercase;
            }
        </style>

        <img class="image">
        <div class="container">
            <p class="name"></p>
            <p class="email"></p>
            <button class="button">Follow John</button>
        </div>
    </template>

    <script>
        class UserCard extends HTMLElement {
            constructor() {
                super();
                var shadow = this.attachShadow( { mode: 'closed' } );
                
                var templateElem = document.getElementById('userCardTemplate');
                var content = templateElem.content.cloneNode(true);
                content.querySelector('img').setAttribute('src', this.getAttribute('image'));
                content.querySelector('.container>.name').innerText = this.getAttribute('name');
                content.querySelector('.container>.email').innerText = this.getAttribute('email');

                shadow.appendChild(content);
            }
        }
        window.customElements.define('user-card', UserCard);
    </script>
</body>
</html>
```

## 相关支持
- 腾讯 omi

<br>
<br>
<br>

**博文参考**
- [http://www.ruanyifeng.com/blog/2019/08/web_components.html](http://www.ruanyifeng.com/blog/2019/08/web_components.html)
- [https://www.webcomponents.org/introduction](https://www.webcomponents.org/introduction)