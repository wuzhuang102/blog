# HTTPS

## 密码学入门
- 密码学的处理对象是数字和字符串。
- 散列是一种数据，一旦转换为其他形式将永远无法恢复的技术
- 加密
    - 对称加密（AES、DES、3DES）
        - 3DES就是DES算法算三遍
    - 非对称加密（RSA）
- 密钥交换算法
    - Diffie-Hellman 算法是一种著名的密钥协商算法，这种算法可以使得信息交换的双方通过公开的非安全的网络协商生成安全的共享密钥。
        1. Alice 与 Bob 确定两个大素数 n 和 g,这两个数不用保密。
        2. Alice 选择另一个大随机数 x ，并计算A如下：A = gx mod n
        3. Alice 将 A 发送给 Bob
        4. Bob 选择另一个大随机数 y ,并计算B如下：B = gy mod n
        5. Bob 将 B 发送给 Alice
        6. 计算秘密密钥K1如下：K1 = Bx mod n
        7. 计算秘密密钥K2如下：K2 = Ay mod n
        - K1 = K2，因此可以解密

## 证书发布机构（CA）
- 通过CA发放的证书完成密钥的交换，实际上是利用非对称的加密算法完成数据加密密钥的交换，然后再利用数据加密密钥完成数据的安全交换。
- 数字证书：数字证书是互联网通信中标识双方身份信息的数字文件，由CA签发。
- 公钥加密，私钥解密；私钥签名，公钥验签。
- CA工作流程
    1. 服务器 wuzhuang.com将从CA请求TLS证书， 例如Digicert。
    2. Digicert 为 wuzhuang.com 创建证书，证书包含必要的数据，例如服务器名称、服务器公钥等
    3. Digicert 将创建数据（证书）的哈希值，并使用自己的私钥对其进行加密。
    4. 浏览器和操作系统自带Digicert等权威机构的公钥
    5. 当浏览器收到签名时，它将使用公钥从签名生成哈希值，他还将使用证书中指定的散列算法生成数据（证书）的散列，如果两个哈希值匹配，则证书是成功且可信的。
    6. 现在浏览器可以使用指定的 wuzhuang.com 的公钥进行身份验证过程

## 浏览器如何验证服务器证书的有效性
- 几个概念
    - **中间CA(intermediate CA)**：CA为服务器创建并签署证书，CA的机构很少，如果它们为所有服务器签署证书，那所有签名必须使用相同的私钥，一旦丢失，那么所有信任都会丢失，intermediate CA 就是为了解决这个问题
    - **Root CA**：根证书，可以用来发布 intermediate CA
    - 服务器使用 intermediate CA 颁发的签名，使用时共享两个证书
        1. 包含服务器的公钥，即实际的服务器证书
        2. 由 Root CA 颁发的 intermediate CA 证书
- 浏览器验证流程
    1. 客户端拿到站点证书
    2. 追溯证书的 Root CA 并使用其公钥来验证 intermediate CA 的数字签名，中间证书可信则站点证书可信
## SSL/TLS 协议
- 传输层安全协议（Transport Layer Security - TLS）,及其前身安全套接层（Secure Sockets Layer - SSL）是一种安全协议，为互联网通信提供安全及数据完整性保障。
- HTTPS协议的安全性由 SSL 协议实现，当前使用的 TLS 是其1.2 版本，包含了四个子协议：握手协议、密钥配置切换协议应用数据协议及报警协议
    - 对称密钥可以通过密钥安全交换算法共享
    - 如果请求被截获，密钥交换可能会被欺骗
    - 使用数字签名进行身份验证
- HTTPS协议、SSL协议、TSL协议、握手协议
    - HTTPS是 Hypertext Transfer Protocol over Secure Socket Layer 的缩写，即 HTTP over SSL
    - SSL协议是一种记录协议，扩展性良好，可以很方便的添加子协议
    - 握手协议是 SSL 协议的一个子协议
    - TLS 是 SSL的后续，版本1.2

## HTTPS协议分析
![](/http/TLS.jpg)
- TLS握手步骤
    1. ClientHello: 客户端发送所支持的 SSL/TLS 最高协议版本号和所支持的加密算法集合及压缩方法集合等信息给服务器端。
    2. ServerHello: 服务器端接收到客户端信息后，选定双方都能支持的 SSL/TLS 协议版本和加密方法及压缩方法给客户端。
    3. SendCertificate(可选): 服务器端发送证书给客户端
    4. RequestCertificate(可选): 如果选择双向验证，服务器端向客户端请求客户端证书
    5. SeverHelloDone: 服务端通知客户端协商结束
    6. RequestCertificate(可选): 如果选择双向验证，客户端向服务端发送客户端证书
    7. ClientKeyExchange: 客户端使用服务端的公钥，对客户端公钥和密钥种子进行加密，在发给服务器端
    8. CertificateVerify(可选): 如果选择双向认证，客户端用本地私钥生成数字签名，并发送给服务器端，让其通过收到的客户端公钥进行身份验证
    9. CreateSecretKey: 通讯双方基于密钥种子等信息生成通讯密钥
    10. ChangeCipherSpec: 客户端通知服务器端已将通讯方式切到加密模式
    11. Finished: 客户端做好加密通讯的准备
    12. ChangeCipherSpec: 服务器端通知客户端已将通讯方式切到加密模式
    13. Finished: 服务器做好加密通讯的准备
    14. Encrypted/DecryptedData: 双方使用客户端密钥，通过对称加密算法对通讯内容进行加密、解密
    15. ClosedConnection: 通讯结束后，任何一方发出断开 SSl 连接的消息