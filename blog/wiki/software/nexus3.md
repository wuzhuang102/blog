# Nexus3 的安装与使用
## 安装
### 普通安装
**环境要求：** jdk 1.8，**配置推荐：** 官方推荐四核CPU
1. 官网下载[Nexus3](https://www.sonatype.com/download-oss-sonatype)，解压至安装位置
2. 切换至 解压目录/bin 目录
    - ./nexus run 运行服务
3. 等待启动完毕后，进入 `http://服务器ip:8081`，点击登陆、
    - 默认管理员 账户：admin   密码：admin123
4. 登陆后需要修改密码，修改时勾选“Allow anonymous users to access the server Username:” 
### docker安装
``` sh
docker pull sonatype/nexus3  # 使用docker search [images] 搜索相关镜像
docker run -d --name nexus3 \
    --restart=always \
    -p 8081:8081 \
    -p 8082:8082  \
    -p 8083:8083  \
    -p 8084:8084  \
    -p 8085:8085   \
    -v /opt/nexus-data:/nexus-data \
    sonatype/nexus3

# 进入容器查看 nexus3 默认密码，也可在本机共享文件区域查看
docker exec -it [container id] /bin/bash
cat /nexus-data/admin.password
```
- 安装后也许修改密码，默认密码在`/nexus-data/admin.password`,修改时勾选“Allow anonymous users to access the server Username:” 

## 初始化仓库
#### 1. 点击齿轮标记按钮
![](/wiki/nexus3/nexus3-1.jpg)
#### 2. 点击左侧菜单Respositories，有如下仓库类型
![](/wiki/nexus3/nexus3-2.jpg)
#### 3. 点击Create repository
![](/wiki/nexus3/nexus3-3.jpg)
npm(group)表示分组，npm(hosted)表示本机私有，npm(proxy)表示远程代理
#### 4. 选择 npm(proxy)，输入Name、Remote storage
![](/wiki/nexus3/nexus3-4.jpg)
#### 5. 选择 npm(hosted)， 输入 Name
![](/wiki/nexus3/nexus3-5.jpg)
#### 6. 选择 npm(group)，输入Name，最下方两个选至右边
![](/wiki/nexus3/nexus3-6.jpg)

## 配置与npm仓库验证
``` sh
npm config get registry  # http://registry.cnpmjs.org/  这是之前的配置
npm config set registry http://服务器IP:8081/repository/npm-all/
```
配置后的文件可在 ~/.npmrc 查看<br>
之后安装的npm包走的都是 http://服务器IP:8081/repository/npm-all/