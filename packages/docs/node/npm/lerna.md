# Lerna

## 使用方法

## 基础命令

### 1. [lerna publish](https://github.com/lerna/lerna/tree/main/commands/publish)

lerna 不会发布 package.json 中 private 为 true 的包

#### 使用

- learn publish：发布有改动的包
- learn publish from-git： 发布已经打了 tag 的包，配合 lerna version 使用
- learn publish from-package：发布 npm registry 不存在的包

#### lerna publish [生命周期](https://github.com/lerna/lerna/tree/main/commands/publish#lifecycle-scripts)

1. root `prepublish`
2. root `prepare`
3. root `prepublishOnly`
4. root `prepack`
5. For each changed package
   - i. `prepublish`
   - ii. `prepare`
   - iii. `prepublishOnly`
   - iv. `prepack`
   - v. Create package tarball in temp directory
   - vi. `postpack`
6. root `postpack`
7. For each changed package
   - i. publish package to configured registry
   - ii. `publish`
   - iii. `postpublish`
8. root `publish`
9. root `postpublish`
10. update dist-tag to latest

### 2. [learn version](https://github.com/lerna/lerna/tree/main/commands/version)

1. 标记从上次发布至今更新的 packages
2. 新版本提示
3. 修改包的元数据和映射版本，在根目录和包目录中运行适当的生命周期脚本
4. 提交改动并打 tag
5. 推送到远端

## 注意事项

### 1. You must sign up for private packages

lerna publish 时，若包名中带 @，默认发布的是私包，就会出现此问题

1. **npm** 可以通过 `npm publish --access=public` 解决

2. **lerna** 中能通过配置文件解决
   ```json
   // package.json 追加配置
   {
     "name": "@feu/tools",
     "publishConfig": {
       // 如果该模块需要发布，对于scope模块，需要设置为publish，否则需要权限验证
       "access": "publish"
     }
   }
   ```

### 2. learn 发布失败之后的解决方案

`lerna publish` 本质是从本地提交代码、打 tag、然后 `npm publish`，出问题往往在最后一步，之后想再 publish 总是会提示 `No changed packages to publish`

从 git 提交中发布新包

```
lerna publish form-git
```
