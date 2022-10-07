# Git

[https://juejin.cn/post/6978812726411788295#heading-6](https://juejin.cn/post/6978812726411788295#heading-6)

## 1. 常用指令

### git config

```bash
# 查看配置信息
git config <--local | --global | --system> -l

# 查看当前生效的配置信息
git config -l

# 编辑配置文件
git config <--local | --global | --system> -e

# 添加配置项
git config <--local | --global | --system> --add <name> <value>

# 获取配置项
git config <--local | --global | --system> --get <name>

# 删除配置项
git config <--local | --global | --system> --unset <name>

# 配置提交信息中用户信息
git config --global user.name <用户名>
git config --global user.email <邮箱地址>
```

### git add

将要提交的文件添加到暂存区，再使用 commit 进行提交

```bash
# 添加指定文件到暂存区
git add <文件路径>

# 添加更新的文件(修改、删除)到暂存区
git add -u <文件路径>

# 添加文件(修改、删除、新增)到暂存区˝
git add -A

# 查看更新的文件(修改、删除)但没有提交的文件
git add -i
```

### git commit

```bash
# 暂存区的文件提交到本地仓库，会调起文本编辑器
git commit

# 暂存区的文件提交到本地仓库中并添加信息
git commit -m 'feat: message'

# 1. 将更新的文件(修改、删除)的文件提交到暂存区  === git add -u
# 2. 暂存区文件提交到本地仓库
git add -am 'feat: message'

# 修改上次提交的描述信息
git commit --amend
```

### git clone

```bash
# 远程仓库克隆到本地
git clone <远程仓库>

# 指定本地目录名称
git clone <远程仓库> <本地目录>

# 指定远程分支
git clone <远程仓库> -b <远程分支>
```

### git branch

```bash
# 显示本地所有分支
git branch

# 显示本地所有分支，并显示最后一次提交
git branch -v

# 基于本分支创建新分支
git branch <分支名>

# 指定分支创建一个新分支
git branch <新分支名称> <源分支名|tag名>

# 删除(强制)本地分支
git branch -(d|D) <分支名称>
```

### git checkout

```bash
# 切换到已存在的指定分支
git checkout <分支名称>

# 创建并切换到一个分支上
git checkout -b <分支名称>

# 创建并切换到指定分支，删除所有提交记录
git checkout --orphan <分支名称>

# 替换掉本地的改动，新增和已经添加到暂存区的内容不收影响
git checkout <文件路径>
```

### git diff

```bash
#  比较当前文件和暂存区文件间的差异
git diff [<文件>]

# 比较暂存区文件和上次提交时的差异
git diff --staged [<文件>]

# 比较当前文件和上次提交时的差异
git diff HEAD [<文件>]

# 查看指定版本之后的改动
git diff <commit ID>  [<文件>]

# 查看两个分支的改动内容
git diff <分支名称> <分支名称>
```

### git fetch

远程的更新同步到本地，但是不合并 commit

```bash
# 将远程仓库所有分支的最新版本获取到本地
git fetch <远程仓库>

# 拉取远程仓库指定分支取回到本地
git fetch <远程仓库别名> <分支名>
```

### git log

```bash
# 查看所有日志
git log

# 查看commit ID 之前的所有提交记录
git log <commit ID>

# 查看一定数量的提交记录
git log -<指定数量>
```

### git merge

```bash
# 指定分支合并到当前所在分支下，并进行commit
git merge <分支名称>

# 指定分支的改动合并到当前分支，不进行commit
git merge --no-commit <分支名称>
```

### git mv

```bash
#重命名文件/文件夹
git mv <文件> <文件>
```

### git push

```bash
# 本地分支推送到远程仓库的指定分支
git push <远程仓库别名> <本地分支名>:<远程分支名>

# 删除指定远程仓库的分支
git push <仓库别名> --delete <远程分支名>
```

### git remote

```bash
# 列出已存在的仓库
git remote

# 列出远程仓库的详细信息
git remote -v

# 添加远程仓库
git remote add <仓库别名> <远程地址URL>

# 修改远程仓库别名
git remote rename <仓库别名> <新别名>

# 删除指定远程仓库
git remote remove <远程仓库的别名>

# 修改远程仓库的URL地址
git remote set-url <仓库别名> <新的远程仓库URL>
```

### git reset

```bash
# 重置暂存区，相当于将 git add 的文件撤出暂存区
git reset [<文件名称>]

# 改变 HEAD 指向，撤销提交记录，文件未改变
git reset <commit ID>

# 相当于 git reset + git add
git reset --soft <commit ID>

# 将 HEAD 的指向改变，撤销到指定的提交记录，文件也修改了
git reset --hard <commit ID>
```

### git revert

```bash
# 生成一个新的提交来撤销某次提交
git revert <commit ID>
```

### git rm

```bash
# 移除文件，并从本地仓库的文件夹中删除
git rm <文件路径>

# 移除跟踪指定的文件夹，并从本地仓库的文件夹中删除
git rm -r <文件夹路径>

# 移除跟踪指定文件，本地仓库中保留
git rm --cache
```

### git status

```bash
# 查看本地仓库状态
git status
```

### git tag

```bash
# 展示所有tag
git tag

# 添加标签，可以指定 commit ID
git tag <标签名> [<commit ID>]

# 添加标签和描述，可以指定 commit ID
git tag -a <标签名> -m <标签描述信息> [<commit ID>]

# 切换到指定标签
git checkout <标签名>

# 查看标签信息
git show <标签名称>

# 删除指定的标签
git tag -d <标签名>

# 指定 tag 提交到远程
git push <仓库别名> <标签名称>

# 将本地所有标签全部提交到远程仓库
git push <远程仓库别名> -tags
```

### git stash

```bash
# 保存当前未commit的代码
git stash

# 保存未 commit 的代码并添加备注
git stash save "备注"

# 列出所有记录
git stash list

# 清除所有 stash 记录
git stash clear

# 删除最近一次的stash[指定一条记录]
gti stash drop [stash@{1}]

# 应用最近一次stash[指定一条记录]
git stash apply [stash@{1}]

# 应用最近一次stash，并删除该记录[指定一条记录]
git stash pop  [stash@{1}]
```

## 2. 常用命令组合

### 2.1 远程分支已被删除，本地 remotes/origin 分支进行同步

```bash
git remote show origin  # 远程分支与本地分支差异对比
git remote prune origin # 删除远程已经删除过的分支
```

## 3. Git Commit 规范

- 博文参考
  - https://juejin.cn/post/7018771333173477383
