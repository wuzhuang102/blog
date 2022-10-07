# VSCode

## 插件

- Path Intellisense：文件名自动补全
- npm Intellisense：npm 包名自动补全
- GitLens：git 历史、分支 管理
- Can I Use：兼容性查看
- Code spell Checker： 单词拼写查看

## [debug](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

vscode debug 支持任何可以转换成 javascript 的语言，其他语言 debug 需要 `Debuggers` 扩展的支持

### 1. launch.json 属性

### 3. 全局 launch configuration

配置在 user settings 中

```
"launch": {
    "version": "0.2.0",
    "configurations": [{
        "type": "node",
        "request": "launch",
        "name": "Launch Program",
        "program": "${file}"
    }]
}
```
