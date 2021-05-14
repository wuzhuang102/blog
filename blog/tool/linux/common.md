# Linux --- 常用知识

## SSH免密登陆
### SSH密码登陆过程
1. 服务器接收到客户机的登陆请求后，会把自己的公钥发送给客户机
2. 客户机使用公钥将密码加密再发送给服务器
3. 服务器解密从客户端发送过来的加密密码，密码正确则登陆成功
### 免密登陆操作步骤
**第一步：** 客户端使用命令生成一对密钥
``` sh
ssh-keygen -t rsa  -C "my-email@email.com"
```
**第二步：** 将生成的 id_rsa.pub 通过 ssh-copy-id 命令发送至目标服务器
``` sh
ssh-copy-id -i ~/.ssh/id_rsa.pub user@xxx.xxx.xxx.xxx
```
git也可使用免密登陆操作，将生成的id-rsa.pub内容粘贴至git仓库中指定位置即可
### 免密登陆逻辑
1. 客户机发送请求之后 ssh root@xxx.xxx.xxx.xxx
2. 服务器得到客户端的请求后，到 authorized_keys 中查找，如果有响应的用户名和IP，就会生成随机生成一个字符串
3. 服务器端使用公钥对生成的随机字符串进行加密返回给客户机
4. 客户机使用私钥解密服务器端返回的加密字符串，再将解密后的字符串发送给服务器
5. 服务器接收发送来的解密字符串与之前的对比，一致则免密登陆成功
### 禁用服务器密码登陆
开启了免密登陆之后，密码登陆就可以关闭了（防止攻击）

**第一步：** 修改 /etc/ssh/sshd_config
``` sh
vi /etc/ssh/sshd_config
```
**第二步：** 配置文件修改成如下（vi命令模式中使用 /xxx 搜索）,有#就去掉，没有的直接添加上去
```
RSAAuthentication yes
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
```
**第三步：** sshd 服务重启
``` sh
systemctl restart sshd.service
```

## 常用命令
### 1. rpm 包安装与卸载
``` sh
# 安装
rpm -ivh *.rpm

# 卸载
rpm -q *    # -q 先查询安装的包名，在用-e删除
rpm -e 包名
```
