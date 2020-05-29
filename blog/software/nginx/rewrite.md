## module rewrite的指令 

| directive                          | scope of use               | desc                               |
|:-----------------------------------|:---------------------------|:-----------------------------------|
| break                              | server, location, if       |                                    |
| if ( condition ){}                 | server, location           |                                    |
| return                             | server, location, if       |                                    |
| rewrite                            | server, location, if       |                                    |
| rewrite_log &nbsp; on\off          | http, server, location, if |                                    |
| set $variable value                | server, location, if       |                                    |
| uninitialized_variable_warn on\off | http, server, location, if | 控制是否记录有关未初始化变量的警告 |


## 1. rewrite 指令
``` nginx
rewrite regex replacement [flag];
```

- 如果正则表达式包含“}”或“;”字符，整个表达式应用单引号或双引号引起来
- 当replacement 是以`http://` `https://` `$scheme`开头时，处理停止，直接重定向一个302
- 如果替换字符串包括新的请求参数，则先前的请求参数将附加在它们之后
``` nginx
rewrite ^/users/(.*)$ /show?user=$1? last;
```

### 1.1 flag
| flag      | url change or not | desc                                                                                                          |
|:----------|:------------------|:--------------------------------------------------------------------------------------------------------------|
| last      | no                | 停止处理当前的ngx_http_rewrite_module指令集，并开始搜索与更改后的URI相匹配的新位置；                          |
| break     | no                | 与break指令一样，停止处理当前的ngx_http_rewrite_module指令集；                                                |
| redirect  | yes               | 返回带有302代码的临时重定向；如果替换字符串不是以“ http：//”，“ https：//”或“ $ scheme”开头，则使用该字符串； |
| permanent | yes               | 返回带有301代码的永久重定向                                                                                   |

- break与last都能阻止后续的rewrite指令执行，但是last如果在location下的话，对于重写的URI会重新匹配location,但break不会
    - last： 停止当前这个请求，并根据rewrite匹配的规则重新发起一个请求。新请求又从第一阶段开始执行…
    - break：相对last，break并不会重新发起一个请求，只是跳过当前的rewrite阶段，并执行本请求后续的执行阶段


## 2. if 指令

- 如果变量 $variable 的值为空字符串或者字符串"0"，则为false
    - 版本 `1.0.1` 之前，任何以"0"开始的字符串都会计算成false
- 变量与一个字符串的比较 相等为`=` 不相等为`!=`  **此处与赋值语句有区别的**
- 变量与一个正则表达式的模式匹配 操作符可以是(`~` 区分大小写的正则匹配， `~*`不区分大小写的正则匹配， `!~` `!~*`，前面两者的非)
- 检测文件是否存在 使用 `-f`(存在) 和 `!-f`(不存在)
- 检测路径是否存在 使用 `-d`(存在) 和 `!-d`(不存在) 后面判断可以是字符串也可是变量
- 检测文件、路径、或者链接文件是否存在 使用 `-e`(存在) 和 `!-e`(不存在) 后面判断可以是字符串也可是变量
- 检测文件是否为可执行文件 使用 `-x`(可执行) 和 `!-x`(不可执行) 后面判断可以是字符串也可是变量


## 3. return 指令
```
return code [text];
return code URL;
return URL;
```




[官方rewrite模块](http://nginx.org/en/docs/http/ngx_http_rewrite_module.html)