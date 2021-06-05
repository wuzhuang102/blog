(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{306:function(t,s,a){"use strict";a.r(s);var n=a(28),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"原理篇-javascript-执行堆栈详解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#原理篇-javascript-执行堆栈详解"}},[t._v("#")]),t._v(" 原理篇 --- JavaScript 执行堆栈详解")]),t._v(" "),a("h2",{attrs:{id:"_1-基本概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-基本概念"}},[t._v("#")]),t._v(" 1. 基本概念")]),t._v(" "),a("p",[t._v("JavaScript 代码执行时会将不同的变量存于内存中不同位置：堆（heap）和栈（stack）来区分。")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("堆")]),t._v("用来存放一些对象，")]),t._v(" "),a("li",[a("strong",[t._v("栈")]),t._v("则存放一些基础类型变量以及对象的指针")])]),t._v(" "),a("h3",{attrs:{id:"_1-1-执行上下文的类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-执行上下文的类型"}},[t._v("#")]),t._v(" 1.1 执行上下文的类型")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("全局执行上下文")]),t._v("（Global Context，GO）：JS在执行可执行的脚本时，首先会创建一个全局执行上下文")]),t._v(" "),a("li",[a("strong",[t._v("函数执行上下文")]),t._v("（Execution Context, EC）：JS执行在遇到函数时就会创建一个函数执行上下文")]),t._v(" "),a("li",[a("strong",[t._v("Eval 函数执行上下文")]),t._v("："),a("code",[t._v("eval")]),t._v(" 函数中运行的代码，不建议使用")])]),t._v(" "),a("h3",{attrs:{id:"_1-2-执行栈"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-执行栈"}},[t._v("#")]),t._v(" 1.2 执行栈")]),t._v(" "),a("p",[t._v("当可执行程序存在很多函数调用，就会创建很多 EC，此时 JS 引擎就会创建"),a("strong",[t._v("执行上下文栈")]),t._v("（Execution Context Stack, ECS）来管理 EC。\n函数调用完成后，JS会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境，循环往复，直到执行栈代全部执行完毕。")]),t._v(" "),a("p",[t._v("浏览器解释器执行js是单线程的过程，这就意味着同一时间，只能有一个事件在进行。其它的活动和事件只能排队等候，生成一个等候队列的"),a("strong",[t._v("执行栈")]),t._v("（Exection Stack）")]),t._v(" "),a("h3",{attrs:{id:"_1-3-执行上下文的创建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-执行上下文的创建"}},[t._v("#")]),t._v(" 1.3 执行上下文的创建")]),t._v(" "),a("h4",{attrs:{id:"_1-3-1-创建阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-1-创建阶段"}},[t._v("#")]),t._v(" 1.3.1 创建阶段")]),t._v(" "),a("ol",[a("li",[a("strong",[t._v("this binding")]),t._v("，确定 "),a("code",[t._v("this")]),t._v(" 的值\n"),a("ul",[a("li",[a("strong",[t._v("全局上下文")]),t._v("中，"),a("code",[t._v("this")]),t._v(" 指向全局对象，浏览器中指向 "),a("code",[t._v("window")]),t._v("，"),a("code",[t._v("nodejs")]),t._v(" 中 指向本文件的 "),a("code",[t._v("module")]),t._v(" 对象")]),t._v(" "),a("li",[a("strong",[t._v("函数执行上下文")]),t._v("中，"),a("code",[t._v("this")]),t._v(" 的值取决于函数的调用方式，有：默认绑定、隐式绑定、显示绑定、 "),a("code",[t._v("new")]),t._v(" 绑定、箭头函数")])])]),t._v(" "),a("li",[a("strong",[t._v("LexicalEnvironment")]),t._v("（词法环境）被创建\n"),a("ul",[a("li",[t._v("词法环境的两个组成部分\n"),a("ul",[a("li",[a("strong",[t._v("环境记录")]),t._v("：存储变量和函数声明的实际位置")]),t._v(" "),a("li",[a("strong",[t._v("对外部环境的引用")]),t._v("：可以访问外部的词法环境")])])]),t._v(" "),a("li",[t._v("词法环境的两种类型\n"),a("ul",[a("li",[a("strong",[t._v("全局环境")]),t._v("：是一个没有外部环境的词法环境，拥有一个全局对象及关联的方法和属性以及任何用户自定义的全局变量，"),a("code",[t._v("this")]),t._v(" 指向这个全局变量")]),t._v(" "),a("li",[a("strong",[t._v("函数环境")]),t._v("：用户在函数中定义的变量被存储在环境记录中，包含 "),a("code",[t._v("arguments")]),t._v(" 对象。对外部环境的引用可以是全局环境，也可以是包含内部的外部函数环境")])])])])]),t._v(" "),a("li",[a("strong",[t._v("VariableEnviroment")]),t._v("（变量环境）被创建\n"),a("ul",[a("li",[t._v("变量环境也是一个词法环境")])])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),a("p",[t._v("变量提升的原因：创建阶段，函数声明存储在环境中，而变量会被设置为 "),a("code",[t._v("undefined")]),t._v("(var) 或者 未初始化（let、const）")])]),t._v(" "),a("p",[t._v("ES6 中let const 不存在变量提升的问题， 并且产生了块级作用域。在块级作用域中，变量在声明之前的区域被称为暂时性死区。任何在暂 时性死区内访问变量的企图都会导致“运行时”错误(runtime error)。只有执行到变量的声明 语句时，该变量才会从暂时性死区内被移除并可以安全使用。")]),t._v(" "),a("h4",{attrs:{id:"_1-3-2-执行阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-2-执行阶段"}},[t._v("#")]),t._v(" 1.3.2 执行阶段")]),t._v(" "),a("p",[t._v("完成所有变量的分配，最后执行代码")]),t._v(" "),a("ul",[a("li",[t._v("执行栈（Execution Context Satck）")]),t._v(" "),a("li",[t._v("全局对象（Global Context）")]),t._v(" "),a("li",[t._v("活动对象（Activation Object）")]),t._v(" "),a("li",[t._v("变量对象（Variable Object）")]),t._v(" "),a("li",[t._v("全局上下文（Global Execution Context）")]),t._v(" "),a("li",[t._v("执行上下文（Execution Context）")]),t._v(" "),a("li",[t._v("垃圾回收（Garbage Colletion）")]),t._v(" "),a("li",[t._v("词法环境（Lexical Environment）")]),t._v(" "),a("li",[t._v("变量环境（Variable Environment）")]),t._v(" "),a("li",[t._v("环境记录（Environment Record）")])]),t._v(" "),a("h2",{attrs:{id:"_2-执行栈压栈顺序"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-执行栈压栈顺序"}},[t._v("#")]),t._v(" 2. 执行栈压栈顺序")]),t._v(" "),a("p",[t._v("代码刚执行时，便确定了一个全局执行上下文（Global Execution Context）作为默认值，如果在全局环境中调用了其它函数，程序将会创建一个新的 EC，并将这个 EC 推入执行栈中")]),t._v(" "),a("h3",{attrs:{id:"_2-1-压栈过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-压栈过程"}},[t._v("#")]),t._v(" 2.1 压栈过程")]),t._v(" "),a("p",[t._v("随着代码的执行 三个函数会被依次押入执行栈中")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fun3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fun3'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fun2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fun3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fun1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fun2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fun1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//执行fun1 结果如下 ")]),t._v("\nECStack "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    fun3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    fun2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    fun1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    globalContext\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-2-变量对象（variable-object）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-变量对象（variable-object）"}},[t._v("#")]),t._v(" 2.2 变量对象（Variable Object）")]),t._v(" "),a("p",[t._v("变量对象 VO 是与执行上下文相关的特殊对象，用来存储上下文的函数声明、函数的形参和变量")]),t._v(" "),a("ul",[a("li",[t._v("变量对象 VO 存储上下文中包含以下内容\n"),a("ul",[a("li",[t._v("函数声明，不包含函数表达式")]),t._v(" "),a("li",[t._v("函数形参")]),t._v(" "),a("li",[t._v("变量声明–注意 "),a("code",[t._v("b=10")]),t._v(" 不是变量，但是 "),a("code",[t._v("var b = 10;")]),t._v(" 是变量，有变量声明提升")])])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("30")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("x")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("30")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -----------------  解释区  ------------------")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 全局执行上下文")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("globalContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    a"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    test"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("reference to funtion"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// test 函数上下文")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("text functionContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    x"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("30")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    b"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// VO 分为全局上下文的对象 VO，函数上下文的变量对象 VO")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("globalContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" global"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-3-活动对象（activation-object）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-活动对象（activation-object）"}},[t._v("#")]),t._v(" 2.3 活动对象（Activation Object）")]),t._v(" "),a("p",[t._v("函数上下文中，变量对象被表示为活动对象 AO，当函数被调用后，这个活动对象就被创建了。它包含普通参数与特殊参数对象")]),t._v(" "),a("ul",[a("li",[t._v("函数执行上下文中， VO 是不能直接访问的，此时由活动对象 AO 扮演 VO 的角色\n"),a("ul",[a("li",[t._v("Arguments 对象包括的如下属性：callee、length")]),t._v(" "),a("li",[t._v("内部定义的函数")]),t._v(" "),a("li",[t._v("绑定上的对应环境变量")]),t._v(" "),a("li",[t._v("内部定义的变量")])])]),t._v(" "),a("li",[t._v("AO 分两个阶段：创建阶段和执行阶段，我们现阶段是创建阶段")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" c "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("d")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_e")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("x")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -----------------  解释区  ------------------")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("functionContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    a"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    b"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    c"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    d"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("reference to FunctionDeclaration "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"d"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    e"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// AO里并不包含函数“x”。这是因为“x” 是一个函数表达式(FunctionExpression, 缩写为 FE) 而不是 函数声明，函数表达式不会影响VO")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-4-深度活动对象（activation-object）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-深度活动对象（activation-object）"}},[t._v("#")]),t._v(" 2.4 深度活动对象（Activation Object）")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("i")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("b")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("privateB")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("c")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h4",{attrs:{id:"_1-创建阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-创建阶段"}},[t._v("#")]),t._v(" 1. 创建阶段")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("fooExecutionContext "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    scopeChain"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Scope "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AO")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        arguments"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            length"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        c"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" pointer to "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("c")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        a"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        b"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VO")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    Scope"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" globalContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"_2-执行阶段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-执行阶段"}},[t._v("#")]),t._v(" 2. 执行阶段")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("fooExecutionContext "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    scopeChain"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AO")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        arguments"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            length"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        c"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" pointer to "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("c")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        a"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        b"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" pointer to "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("privateB")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VO")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    Scope"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("AO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" globalContext"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VO")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" 运行时确认 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-5-补充活动对象（activation-object）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-补充活动对象（activation-object）"}},[t._v("#")]),t._v(" 2.5 补充活动对象（Activation Object）")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" barFn "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'alert(x); alert(y);'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("barFn")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// 10, "y" is not defined ')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// -----------------  解释区  ------------------")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1. 通过函构造函数创建的函数的[[scope]]属性总是唯一的全局对象(LexicalEnvironment)。")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2. Eval code - eval 函数包含的代码块也有同样的效果")]),t._v("\n")])])]),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("ul",[a("li",[t._v("闭包的原理是Scope(堆空间中存储closure(foo))，")]),t._v(" "),a("li",[t._v("this的原理是动态绑定，")]),t._v(" "),a("li",[t._v("作用域链 的原理是Scope: [AO, globalContext.VO],")]),t._v(" "),a("li",[t._v("eval不能回收的原理是推不进AO,")]),t._v(" "),a("li",[t._v("变量提升的原理是AO的准备阶段，")]),t._v(" "),a("li",[t._v("异队列的原理是ECS.")])])])}),[],!1,null,null,null);s.default=e.exports}}]);