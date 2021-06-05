(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{392:function(s,a,t){"use strict";t.r(a);var e=t(28),r=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"linux-常用知识"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#linux-常用知识"}},[s._v("#")]),s._v(" Linux --- 常用知识")]),s._v(" "),t("h2",{attrs:{id:"ssh免密登陆"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ssh免密登陆"}},[s._v("#")]),s._v(" SSH免密登陆")]),s._v(" "),t("h3",{attrs:{id:"ssh密码登陆过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ssh密码登陆过程"}},[s._v("#")]),s._v(" SSH密码登陆过程")]),s._v(" "),t("ol",[t("li",[s._v("服务器接收到客户机的登陆请求后，会把自己的公钥发送给客户机")]),s._v(" "),t("li",[s._v("客户机使用公钥将密码加密再发送给服务器")]),s._v(" "),t("li",[s._v("服务器解密从客户端发送过来的加密密码，密码正确则登陆成功")])]),s._v(" "),t("h3",{attrs:{id:"免密登陆操作步骤"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#免密登陆操作步骤"}},[s._v("#")]),s._v(" 免密登陆操作步骤")]),s._v(" "),t("p",[t("strong",[s._v("第一步：")]),s._v(" 客户端使用命令生成一对密钥")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("ssh-keygen -t rsa  -C "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"my-email@email.com"')]),s._v("\n")])])]),t("p",[t("strong",[s._v("第二步：")]),s._v(" 将生成的 id_rsa.pub 通过 ssh-copy-id 命令发送至目标服务器")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("ssh-copy-id -i ~/.ssh/id_rsa.pub user@xxx.xxx.xxx.xxx\n")])])]),t("p",[s._v("git也可使用免密登陆操作，将生成的id-rsa.pub内容粘贴至git仓库中指定位置即可")]),s._v(" "),t("h3",{attrs:{id:"免密登陆逻辑"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#免密登陆逻辑"}},[s._v("#")]),s._v(" 免密登陆逻辑")]),s._v(" "),t("ol",[t("li",[s._v("客户机发送请求之后 ssh root@xxx.xxx.xxx.xxx")]),s._v(" "),t("li",[s._v("服务器得到客户端的请求后，到 authorized_keys 中查找，如果有响应的用户名和IP，就会生成随机生成一个字符串")]),s._v(" "),t("li",[s._v("服务器端使用公钥对生成的随机字符串进行加密返回给客户机")]),s._v(" "),t("li",[s._v("客户机使用私钥解密服务器端返回的加密字符串，再将解密后的字符串发送给服务器")]),s._v(" "),t("li",[s._v("服务器接收发送来的解密字符串与之前的对比，一致则免密登陆成功")])]),s._v(" "),t("h3",{attrs:{id:"禁用服务器密码登陆"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#禁用服务器密码登陆"}},[s._v("#")]),s._v(" 禁用服务器密码登陆")]),s._v(" "),t("p",[s._v("开启了免密登陆之后，密码登陆就可以关闭了（防止攻击）")]),s._v(" "),t("p",[t("strong",[s._v("第一步：")]),s._v(" 修改 /etc/ssh/sshd_config")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" /etc/ssh/sshd_config\n")])])]),t("p",[t("strong",[s._v("第二步：")]),s._v(" 配置文件修改成如下（vi命令模式中使用 /xxx 搜索）,有#就去掉，没有的直接添加上去")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("RSAAuthentication yes\nPubkeyAuthentication yes\nAuthorizedKeysFile .ssh/authorized_keys\nPasswordAuthentication no\n")])])]),t("p",[t("strong",[s._v("第三步：")]),s._v(" sshd 服务重启")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[s._v("systemctl restart sshd.service\n")])])]),t("h2",{attrs:{id:"常用命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[s._v("#")]),s._v(" 常用命令")]),s._v(" "),t("h3",{attrs:{id:"_1-rpm-包安装与卸载"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-rpm-包安装与卸载"}},[s._v("#")]),s._v(" 1. rpm 包安装与卸载")]),s._v(" "),t("div",{staticClass:"language-sh extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sh"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -ivh *.rpm\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 卸载")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -q *    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# -q 先查询安装的包名，在用-e删除")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -e 包名\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);