# Nginx --- location
##  1. 路由匹配
```
location [ = | ~ | ~* | ^~ ] uri { ... }
```

### 1.1 修饰符
- location [ = | ~ | ~* | ^~ ]
- 匹配字符串分为两种：**普通字符串**（literal string）和**正则表达式**（regular expression），其中 ~ 和 ~* 用于正则表达式， 其他前缀和无任何前缀都用于普通字符串。

|  | mode     | desc                                                |
|:-------|:---------|:----------------------------------------------------|
| =      | /uri     | 开头表示精确匹配                                    |
| ^~     | /uri     | 开头表示uri以某个常规字符串开头，这个不是正则表达式 |
| ~      | /pattern | 开头表示区分大小写的正则匹配;                       |
| ~*     | /pattern | 开头表示不区分大小写的正则匹配                      |
| /      | /        | 通用匹配, 如果没有其它匹配,任何请求都会匹配到       |
| @      |          |                                                     |


### 1.2 匹配顺序

1. 精确匹配 `=`
2. 前缀匹配 `^~`（立刻停止后续的正则搜索）
3. 按文件中**顺序**的正则匹配 `~`或`~*`
4. 匹配不带任何修饰的前缀匹配。

<details>
<summary> js实现匹配算法</summary>

``` js
// js 匹配算法实现
function ngx_http_core_find_location(uri, static_locations, regex_locations, named_locations, track) {
  let rc = null;
  let l = ngx_http_find_static_location(uri, static_locations, track);
  if (l) {
    if (l.exact_match) {
      return l;
    }
    if (l.noregex) {
      return l;
    }
    rc = l;
  }
  if (regex_locations) {
    for (let i = 0 ; i < regex_locations.length; i ++) {
      if (track) track(regex_locations[i].id);
      let n = null;
      if (regex_locations[i].rcaseless) {
        n = uri.match(new RegExp(regex_locations[i].name));
      } else {
        n = uri.match(new RegExp(regex_locations[i].name), "i");
      }
      if (n) {
        return regex_locations[i];
      }
    }
  }

  return rc;
}
```
</details>

[博文参考](https://juejin.im/post/5ce5e1f65188254159084141)
#### 1.2.1 案例1 （正则优先度大于前缀匹配）
``` bash
server {
    server_name website.com;
    location /doc|/document {
        return 701; # 依据返回判断匹配情况
    }
    location ~* ^/document {
        return 702;
    }
}

curl website.com/document
return 702  # 正则优先度高
```
#### 1.2.2 案例2 （^~ 优先度大于正则~|~*）
``` bash
server {
    server_name website.com;
    location ^~ /doc {
        return 701;
    }
    location ~* ^/document {
        return 702;
    }
}

curl website.com/document
return 701  # ^~优先度高于^~
```

#### 1.2.3 案例3    （前缀匹配与文件顺序无关，匹配字符串长的那个）
``` bash
server {
    server_name website.com;
    location /doc {
        return 701;
    }
    location /docu {
        return 702;
    }
}

curl website.com/document
return 702  # 前缀匹配模式下，以长的为准，与配置文件顺序无关
```

#### 1.2.4 案例4  （正则匹配与配置文件顺序有关）
``` bash
server {
	server_name website.com;
    location ~ ^/docu[a-z]+ {
        return 701;
    }

    location ~ ^/doc[a-z]+ {
        return 702;
    }
}

curl website.com/document
return 701  # 与配置文件顺序有关，匹配放在前面的一个
```









[官方Location文档](http://nginx.org/en/docs/http/ngx_http_core_module.html#location)
