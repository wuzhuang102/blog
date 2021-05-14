``` sh
http {
    server {
        listen 80;
        sever_name bestwuzhuang.com;
        location / {
            proxy_pass http://127.0.0.1:8080;
        }
        # location * {}
    }

    # server
}

```


## 在前端中的功用
[参考博文](https://juejin.im/post/5bacbd395188255c8d0fd4b2)
### 1.1 简单的访问限制
``` nginx
location / {
    deny  192.168.1.100;
    allow 192.168.1.10/200;
    allow 10.110.50.16;
    deny  all;
}
```
deny和allow是ngx_http_access_module模块（已内置）中的语法。采用的是从上到下匹配方式，匹配到就跳出不再继续匹配。上述配置的意思就是，首先禁止192.168.1.100访问，然后允许192.168.1.10-200 ip段内的访问（排除192.168.1.100），同时允许10.110.50.16这个单独ip的访问，剩下未匹配到的全部禁止访问。实际生产中，经常和ngx_http_geo_module模块（可以更好地管理ip地址表，已内置）配合使用。

### 1.2 解决跨域问题
``` nginx
# 1. 反向代理解决跨域
location ^~ /api/ {
    proxy_pass https://www.kaola.com/;
}  

# 2. 添加跨域头
location ^~ /api/ {
    #   指定允许跨域的方法，*代表所有
    add_header Access-Control-Allow-Methods *;
    #   表示允许这个域跨域调用（客户端发送请求的域名和端口） 
    #   $http_origin动态获取请求客户端请求的域   不用*的原因是带cookie的请求不支持*号
    add_header Access-Control-Allow-Origin $http_origin;
    ----------------------------------- # 以上两个足以解决
    #   预检命令的缓存，如果不缓存每次会发送两次请求
    add_header Access-Control-Max-Age 3600;
    #   带cookie请求需要加上这个字段，并设置为true
    add_header Access-Control-Allow-Credentials true;
    #   表示请求头的字段 动态获取
    add_header Access-Control-Allow-Headers  $http_access_control_request_headers;
    #   OPTIONS预检命令，预检命令通过时才发送请求
    #   检查请求的类型是不是预检命令
    if ($request_method = OPTIONS){
        return 200;
    }
}
```
### 1.3 适配PC与移动端
``` nginx
location / {
    # pc跳转h5
    if ($http_user_agent ~* '(mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)') {
        rewrite ^.+ http://h5.com;
    }

    # h5 跳转pc
    if ($http_user_agent !~* '(mobile|nokia|iphone|ipad|android|samsung|htc|blackberry)') {
        rewrite ^.+ http://pc.com;
    }
}  
```
### 1.4 图片处理
利用[ngx_http_image_filter_module](http://nginx.org/en/docs/http/ngx_http_image_filter_module.html)模块，可以做一个简洁的图片服务器
``` nginx
# 图片缩放处理
# 这里约定的图片处理url格式：以 mysite-base.com/img/路径访问
location ~* /img/(.+)$ {
    alias /Users/cc/Desktop/server/static/image/$1; #图片服务端储存地址
    set $width -; #图片宽度默认值
    set $height -; #图片高度默认值
    if ($arg_width != "") {
        set $width $arg_width;
    }
    if ($arg_height != "") {
        set $height $arg_height;
    }
    image_filter resize $width $height; #设置图片宽高
    image_filter_buffer 10M;   #设置Nginx读取图片的最大buffer。
    image_filter_interlace on; #是否开启图片图像隔行扫描
    error_page 415 = 415.png; #图片处理错误提示图，例如缩放参数不是数字
}
```
### 1.5 页面内容修改
Nginx可以通过向页面底部或者顶部插入额外的css和js文件，从而实现修改页面内容，[nginx_http_footer_filter](https://github.com/alibaba/nginx-http-footer-filter),[ngx_http_addition_module](http://nginx.org/en/docs/http/ngx_http_addition_module.html)
``` nginx
server {
        listen 80;
        listen  443 ssl;
        expires -1;
        # 想要代理的域名
        server_name m-element.kaola.com;
        set $root /Users/cc/Desktop/server;
        charset utf-8;
        ssl_certificate      /usr/local/etc/nginx/m-element.kaola.com.crt;
        ssl_certificate_key  /usr/local/etc/nginx/m-element.kaola.com.key;

        # 设置默认$switch_host，一般默认为线上host，这里的1.1.1.1随便写的
        set $switch_host '1.1.1.1';
        # 设置默认$switch_hostname，一般默认为线上'online'
        set $switch_hostname '';
        # 从cookie中获取环境ip
        if ($http_cookie ~* "switch_host=(.+?)(?=;|$)") {
            set $switch_host $1;
        }
        
        # 从cookie中获取环境名
        if ($http_cookie ~* "switch_hostname=(.+?)(?=;|$)") {
            set $switch_hostname $1;
        }
        
        location / {
            expires -1;
            index index.html;
            proxy_set_header Host $host;
            #把html页面的gzip压缩去掉，不然sub_filter无法替换内容
            proxy_set_header Accept-Encoding '';
            #反向代理到实际服务器ip
            proxy_pass  http://$switch_host:80;
            #全部替换
            sub_filter_once off;
            #ngx_http_addition_module模块替换内容。
            # 这里在头部插入一段css，内容是hosts切换菜单的css样式
            sub_filter '</head>' '</head><link rel="stylesheet" type="text/css" media="screen" href="/local/switchhost.css" />';
            #将页面中的'网易考拉'文字后面加上环境名，便于开发识别目前环境
            sub_filter '网易考拉' '网易考拉:${switch_hostname}';
            #这里用了另一个模块nginx_http_footer_filter，其实上面的模块就行，只是为了展示用法
            # 最后插入一段js，内容是hosts切换菜单的js逻辑
            set $injected '<script language="javascript" src="/local/switchhost.js"></script>';
            footer '${injected}';
        }
        # 对于/local/请求，优先匹配本地文件
        # 所以上面的/local/switchhost.css，/local/switchhost.js会从本地获取
        location ^~ /local/ {
            root $root;
        }
}
```

## 一些简单的配置
### 1. 静态资源访问
``` nginx
server {
    listen  80;
    server_name	xxx.bestwuzhuang.com;
    gzip on;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript ;
    gzip_min_length 1k;  # 1k以下不压缩
    gzip_comp_level 4;  # 1~9
    # nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩，如果找不到则不进行压缩
    gzip_static on|off;   
    gzip_vary on;
    location / {
        root    /etc/nginx/html/web;        # 静态资源根路径
        try_files $uri $uri/ /index.html;  # 单页应用需要配置
    }
}
```
### 2. 缓存配置
``` nginx
location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js)$ {
    root   /mnt/dat1/test/tes-app;

    # add_header Cache-Control max-age=3600;
    expires 30d;  # 强缓存
    etag on;
    
}
```
### 3. 服务反向代理
``` nginx
server {
	listen		80;
	server_name	xxx.bestwuzhuang.com;
	gzip on;
	location / {
		proxy_pass http://127.0.0.1:3000;
	}
}
```