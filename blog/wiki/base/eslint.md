# Eslint
本篇仅当做使用笔记，不做过多阐述

## 1. 基本文档
.eslintrc.js 配置
- **[rule](https://eslint.org/docs/rules/)**：自定义的规则
- **[parserOptions](https://eslint.org/docs/user-guide/configuring#specifying-parser-options)**：配置es版本、是否开启jsx、全局开启严格模式
- **[parser](https://eslint.org/docs/user-guide/configuring#specifying-parser)**：指定解析器，默认是 `esprima` ，可选 `@babel/eslint-parser`、`@typescript-eslint/parser`
- **[processor](https://eslint.org/docs/user-guide/configuring#specifying-processor)**：
    ``` js
    // overrides 指定一类文件的lint规则
    {
        "overrides": [
            {
                "files": ["*.md"],
                "processor": "a-plugin/markdown",
                "rule": {}
            }
        ]
    }
    ```
- **[env](https://eslint.org/docs/user-guide/configuring#specifying-environments)**：指定运行环境(node、browser等)，也可在 package.json 中配置
- **[globals](https://eslint.org/docs/user-guide/configuring#specifying-globals)**：针对 `no-undef` 规则，定义可以使用和禁止使用的变量
- **[plugins](https://eslint.org/docs/user-guide/configuring#configuring-plugins)**：第三方插件
- **[ignorePatterns](https://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories)**：忽略文件、文件夹, `.eslintignore`会覆盖此项
- **[eslint-disable](https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments)**：配置eslint忽略的区域
    ``` js
    1. /* eslint-disable no-alert */    /* eslint-enable no-alert */
    2. /* eslint-disable-line example/rule-name */
    3. /* eslint-disable-next-line no-alert */
    ```

## 2. 最佳实践