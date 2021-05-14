# CSS --- 未来新特性
## CSS Houdini
[Houdini](https://developer.mozilla.org/zh-CN/docs/Web/Houdini)是一组底层API，它们公开了CSS引擎的各个部分，从而使开发人员能够通过加入浏览器渲染引擎的样式和布局过程来扩展CSS。

[can i use --- Houdini](https://caniuse.com/#search=houdini)支持程度还不是很好，可以作为知识储备，但无法作直接用于生产项目

## CSS 变量
使用 `--参数名` 定义变量，变量是有作用域的，然后使用 `var(--参数名)` 使用
``` css
:root {
    --first-color: #488cff;
    --second-color: #ffff8c;
}

#firstParagraph {
    background-color: var(--first-color);
    color: var(--second-color);
}
```

css变量的兼容问题可用 [postcss-css-variables](https://www.npmjs.com/package/postcss-css-variables)来解决