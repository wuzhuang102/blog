# Docker 常用软件与命令

## 常用命令
### 1. 进入容器
``` sh
docker exec -it [container id] /bin/bash
```

## 软件
### 1. mysql
``` sh
docker run -p 3306:3306  --restart=always  --privileged=true --name mysql  -e MYSQL_ROOT_PASSWORD="password" -d mysql
```
docker中mysql 可能有 `Client does not support authentication protocol requested by server; consider upgrading MySQL client`问题，执行下面命令解决。这种问题主要出现在node连接mysql时
``` sh
mysql> ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
mysql> flush privileges;
```