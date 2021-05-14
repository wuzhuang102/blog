# Docker的安装与使用
[官方Docker安装手册](https://docs.docker.com/get-docker/)

## 命令详解
主要讲解 docker --help 下常用命令的使用
### 镜像（images）
``` docker
docker images                           # 镜像列表
docker search  [param]                  # 镜像搜索
docker pull [image]:[verson]            # 远程镜像拉至本地
docker rmi [image]                      # 删除镜像
```
### 容器（container）
[docker run](https://docs.docker.com/engine/reference/commandline/run/)，[docker exec](https://docs.docker.com/engine/reference/commandline/exec/)
``` docker
docker run --name [name] [option] [image]                # 运行一个容器
    # - [option] 有许多参数，具体查看 docker run --help
    # - [option] 常用的有：    -d 后台运行
    #                        - it 运行并进入容器
docker exec -it [container] bash        # 进入一个容器
docker ps                               # 运行中的容器
docker ps -a                            # 所有容器，包括停止的
docker pause [container]                # 暂停容器
docker unpause [container]              # 开始一个暂停的容器
docker stop [container]                 # 停止容器
docker start [container]                # 重新启动容器
docker rm [container]                   # 删除容器，容器必须是停止运行的
```
常用软件按安装请参考 [docker 软件](/tool/docker/software.html#软件)