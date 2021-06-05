(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{409:function(t,a,s){"use strict";s.r(a);var e=s(28),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"位运算"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#位运算"}},[t._v("#")]),t._v(" 位运算")]),t._v(" "),s("p",[t._v("位运算是低级的运算操作，所以速度也是最快的（相对于加减乘除），借助位运算的特性实现一些算法有很多好处")]),t._v(" "),s("h2",{attrs:{id:"_1-基本概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-基本概念"}},[t._v("#")]),t._v(" 1. 基本概念")]),t._v(" "),s("h3",{attrs:{id:"_1-1-整数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-整数"}},[t._v("#")]),t._v(" 1.1 整数")]),t._v(" "),s("p",[t._v("ECMAScript 中整数有两种类型")]),t._v(" "),s("ul",[s("li",[t._v("有符号整数（正数、负数）\n"),s("ul",[s("li",[t._v("有符号整数使用 31 位表示整数的数值，用第 32 位表示整数的符号，0 表示正数，1 表示负数。")])])]),t._v(" "),s("li",[t._v("无符号整数（只允许正数）")])]),t._v(" "),s("p",[s("strong",[t._v("位运算会把二进制数限制在32位，超出部分会被舍弃")])]),t._v(" "),s("h3",{attrs:{id:"_1-2-源码、反码、补码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-源码、反码、补码"}},[t._v("#")]),t._v(" 1.2 源码、反码、补码")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("源码")]),t._v("：数字转换成二进制数，最左边表示符号位，0是正数，1是负数")]),t._v(" "),s("li",[s("strong",[t._v("反码")]),t._v("：正数的反码与源码相同，负数的反码除符号位，其它取反")]),t._v(" "),s("li",[s("strong",[t._v("补码")]),t._v("：正数的补码与源码相同，负数的补码取反码 +1")])]),t._v(" "),s("h2",{attrs:{id:"_2-位运算符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-位运算符"}},[t._v("#")]),t._v(" 2. 位运算符")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"left"}},[t._v("运算符")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("用法")]),t._v(" "),s("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("与")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("a & b")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("对于每一个比特位，对应的比特位都为1时，结果才为1，否则位0")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("或")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("a | b")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("对于每一个比特位，对应的比特位至少一个为1时，结果才为1，否则位0")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("异或")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("a ^ b")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("对于每一个比特位，对应的比特位有且只有一个为1，结果才为1，否则位0")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("非")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("~ a")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("反转操作位的比特位，1 变 0，0 变 1")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("左移")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("a << b")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("a 的二进制向左移 b 位，左边用0填充")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("有符号右移")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("a >> b")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("a 的二进制向右移 b 位，丢弃被移出的位")])]),t._v(" "),s("tr",[s("td",{staticStyle:{"text-align":"left"}},[t._v("无符号右移")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("a >>> b")]),t._v(" "),s("td",{staticStyle:{"text-align":"left"}},[t._v("将二进制的表示向右移 b 位，丢弃被移出的位，并使用 0 填充左侧")])])])]),t._v(" "),s("h3",{attrs:{id:"_2-1-与（-）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-与（-）"}},[t._v("#")]),t._v(" 2.1 与（&）")]),t._v(" "),s("h4",{attrs:{id:"运算步骤"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运算步骤"}},[t._v("#")]),t._v(" 运算步骤")]),t._v(" "),s("ol",[s("li",[t._v("数字转换成二进制补码")]),t._v(" "),s("li",[t._v("相同位进行比较（1&1 = 1, 否则为 0）")]),t._v(" "),s("li",[t._v("如果计算结果为负，还要再做补码处理")])]),t._v(" "),s("h4",{attrs:{id:"示例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[t._v("#")]),t._v(" 示例")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("14")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("13")]),t._v("    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2  ")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -16")]),t._v("\n")])])]),s("h3",{attrs:{id:"_2-2-或（-）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-或（-）"}},[t._v("#")]),t._v(" 2.2 或（|）")]),t._v(" "),s("h4",{attrs:{id:"运算步骤-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运算步骤-2"}},[t._v("#")]),t._v(" 运算步骤")]),t._v(" "),s("ol",[s("li",[t._v("数字转换成二进制补码")]),t._v(" "),s("li",[t._v("相同位进行比较（0 | 0 = 0, 否则为 1）")]),t._v(" "),s("li",[t._v("如果计算结果为负，还要再做补码处理")])]),t._v(" "),s("h4",{attrs:{id:"示例-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例-2"}},[t._v("#")]),t._v(" 示例")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 11")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -1")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("15")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("21")]),t._v("   "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -5")]),t._v("\n")])])]),s("h3",{attrs:{id:"_2-3-非（～）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-非（～）"}},[t._v("#")]),t._v(" 2.3 非（～）")]),t._v(" "),s("h4",{attrs:{id:"运算步骤-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运算步骤-3"}},[t._v("#")]),t._v(" 运算步骤")]),t._v(" "),s("p",[t._v("非 "),s("code",[t._v("~")]),t._v(" 运算又称取反运算，十进制可视为")]),t._v(" "),s("ol",[s("li",[t._v("取数字的负数")]),t._v(" "),s("li",[t._v("减1")])]),t._v(" "),s("h4",{attrs:{id:"示例-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例-3"}},[t._v("#")]),t._v(" 示例")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("         "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -2")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("        "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 0")]),t._v("\n")])])]),s("h3",{attrs:{id:"_2-4-异或（-）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-异或（-）"}},[t._v("#")]),t._v(" 2.4 异或（^）")]),t._v(" "),s("h4",{attrs:{id:"运算步骤-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运算步骤-4"}},[t._v("#")]),t._v(" 运算步骤")]),t._v(" "),s("ol",[s("li",[t._v("把两个数转换成2进制补码")]),t._v(" "),s("li",[t._v("相同位置进行比较（必须是0和1或者1和0，结果才为1）")]),t._v(" "),s("li",[t._v("如果结果为负，再取补码")])]),t._v(" "),s("h4",{attrs:{id:"示例-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例-4"}},[t._v("#")]),t._v(" 示例")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 9")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -9")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 11")]),t._v("\n")])])]),s("h3",{attrs:{id:"_2-5-带符号左移（-）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-带符号左移（-）"}},[t._v("#")]),t._v(" 2.5 带符号左移（<<）")]),t._v(" "),s("h4",{attrs:{id:"运算步骤-5"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运算步骤-5"}},[t._v("#")]),t._v(" 运算步骤")]),t._v(" "),s("ol",[s("li",[t._v("把数字转换成2进制补码")]),t._v(" "),s("li",[t._v("左移指定位数，右边补0")]),t._v(" "),s("li",[t._v("如果结果未负数，再取补码")])]),t._v(" "),s("h4",{attrs:{id:"示例-5"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例-5"}},[t._v("#")]),t._v(" 示例")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 00000001 左移2位, 即 00000100，结果为：4")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1010 << 3 等于 1010000，取补码，1110000 即：-48")]),t._v("\n")])])]),s("h3",{attrs:{id:"_2-6-带符号右移（-）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-带符号右移（-）"}},[t._v("#")]),t._v(" 2.6 带符号右移（>>）")]),t._v(" "),s("h4",{attrs:{id:"运算步骤-6"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运算步骤-6"}},[t._v("#")]),t._v(" 运算步骤")]),t._v(" "),s("ol",[s("li",[t._v("取数字二进制补码")]),t._v(" "),s("li",[t._v("右移指定位数，左边补位与符号位一致")]),t._v(" "),s("li",[t._v("多余位被舍弃")]),t._v(" "),s("li",[t._v("如果计算结果为负，再取补码")])]),t._v(" "),s("h4",{attrs:{id:"示例-6"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例-6"}},[t._v("#")]),t._v(" 示例")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 0101 右移1位 0010，即 2")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1101 右移两位 1001，即-1")]),t._v("\n")])])]),s("h3",{attrs:{id:"_2-7-无符号右移（-）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-7-无符号右移（-）"}},[t._v("#")]),t._v(" 2.7 无符号右移（>>>）")]),t._v(" "),s("h4",{attrs:{id:"运算步骤-7"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#运算步骤-7"}},[t._v("#")]),t._v(" 运算步骤")]),t._v(" "),s("ol",[s("li",[t._v("把数字转换成32位2进制补码")]),t._v(" "),s("li",[t._v("连同符号位，右移动指定的位数")]),t._v(" "),s("li",[t._v("向右被移出的位被丢弃，左侧用0填充")])]),t._v(" "),s("h4",{attrs:{id:"示例-7"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#示例-7"}},[t._v("#")]),t._v(" 示例")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 101 右移2位 001 即：1")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("     "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 补码：11111111 11111111 11111111 11111011，右移：00111111 11111111 11111111 11111110")]),t._v("\n")])])]),s("br"),t._v(" "),s("br"),t._v(" "),s("p",[s("strong",[t._v("博文参考")])]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://juejin.im/post/6854573220948164615",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://juejin.im/post/6854573220948164615"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=r.exports}}]);