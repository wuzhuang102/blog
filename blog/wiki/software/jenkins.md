# Jenkins的安装与使用

## 1. Jenkins的安装 (centos)
[jenkins](https://www.jenkins.io/zh/download/),mac 等平台可下载*.war包使用 `java -jar *.war` 启动

**第一步：** 安装 JDK<br>
jenkins对java有版本要求[JDK]((https://www.jenkins.io/doc/book/installing/#installation-of-java))

**第二步：** 安装 jenkins
``` sh
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key   # 导入新的gpg key
yum install -y jenkins
```
**第三部：** 修改配置文件 (可选)
``` sh
vi /etc/sysonfig/jenkins
```
**第四步：** 服务启动
``` sh
service jenkins start|stop|restart
```
初始密码在 `/var/lib/jenkins/secrets/initialAdminPassword `

## 2. Jenkins初始化
### 2.1. 基本菜单 (Jenkins -> manage Jenkins)
![jenkins](/wiki/jenkins/jenkins-config.jpg)
#### configure System
- **Global properties**：配置系统环境变量，一些命令可在这配置(node、npm)
![](/wiki/jenkins/global-properties.jpg)

- **Gitee Configuration**：如有Gitee仓库，需要在此配置基本连接，在实际项目中选用此连接
    - Credentials 需要在 Jenkins用户下创建 API v5 token
![](/wiki/jenkins/gitee.jpg)

- **public over SSH**：Jenkins可以通过SSH连接的服务器，可配置多个，上面三行为默认配置，下面可自定义进行覆盖
![](/wiki/jenkins/ssh.jpg)
#### 2. Plugin Manager
系统插件管理
#### 3. User中心
- **创建Gitee API token**：这里生成的配置供 Gitee Configuration 使用
    - Kind 选择Gitee API token
    - Gitee APIV5 token 在[gitee]( https://gitee.com/profile/personal_access_tokens)
![](/wiki/jenkins/gitee-token.jpg)
- **创建 Jenkins Private Key**：服务器jenkins用户中生成一对密钥，公钥放git仓库，私钥放这里
![](/wiki/jenkins/private-key.jpg)

## 3. 新建CD项目
- **项目基本配置**：
![](/wiki/jenkins/project-1.jpg)
可选择配置好的Gitee项目配置

- **配置项目代码仓库**
![](/wiki/jenkins/project-2.jpg)
Credentials为jenkins服务器私钥，Branch为指定的分支

- 配置构建策略
![](/wiki/jenkins/project-3.jpg)
构建策略有：定时构建、钩子构建、自定义构建等等

- **构建时触发的脚本命令**
![](/wiki/jenkins/project-4.jpg)
还有其他配置，在构建完成时触发


## 4. 一些问题
### 4.1 Jenkins 任务结束时杀死子进程的问题
jenkins 任务结束时会使用 processTreeKiller 杀掉所有子进程

- **解决办法**：
    - 命令行脚本添加 `BUILD_ID=dontKillMe`
    - jenkins 添加环境变量 `BUILD_ID=dontKillMe`，参考 [https://blog.csdn.net/qq_25559693/article/details/72844340](https://blog.csdn.net/qq_25559693/article/details/72844340)