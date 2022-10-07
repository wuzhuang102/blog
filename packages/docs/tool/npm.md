# NPM

## 相关命令

### 1. npm link

[npm link 官方文档](https://docs.npmjs.com/cli/v7/commands/npm-link)

- #### 同项目 link

  ```bash
  npm link path/to/package
  ```

- #### 跨项目 link

  `npm link` 会将本地模块软链到本机全局 `node_modules` 中 <br/>

  `npm link package-name` 会将全局 `node_modules` 中的包软链到本项目的 `node_modules`

  ```bash
  # 模块目录
  npm link

  # 项目目录
  npm link package-name
  ```

- #### unlink

  使用完后记得清除

  ```bash
  # 项目目录
  npm unlink package-name
  ```

### 2. npm publish

[npm publish 官方文档](https://docs.npmjs.com/cli/v7/commands/npm-publish)

```bash
npm publish [<tarball>|<folder>] [--tag <tag>] [--access <public|restricted>] [--otp otpcode] [--dry-run]
# Publishes '.' if no argument supplied
# Sets tag 'latest' if no --tag specified
```

- #### 使用
  ```bash
  npm publish --tag beta
  ```

## 相关工具

### nvm 包管理工具

### nrm 源管理工具
