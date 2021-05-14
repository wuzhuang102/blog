# WebAssembly


## 1. 什么是 WebAssembly
WebAssembly/wasm WebAssembly 或者 wasm 是一个可移植、体积小、加载快并且兼容 Web 的全新格式
## 2. 为什有 WebAssembly
- WebAssembly 主打的一点就是性能
## 3. 特点
- **高效**：WebAssembly 有一套完整的语义，实际上 wasm 是体积小且加载快的二进制格式， 其目标就是充分发挥硬件能力以达到原生执行效率
- **安全**：WebAssembly 运行在一个沙箱化的执行环境中，甚至可以在现有的 JavaScript 虚拟机中实现。在web环境中，WebAssembly将会严格遵守同源策略以及浏览器安全策略。
- **开放**：WebAssembly 设计了一个非常规整的文本格式用来、调试、测试、实验、优化、学习、教学或者编写程序。可以以这种文本格式在web页面上查看wasm模块的源码。
- **标准**：WebAssembly 在 web 中被设计成无版本、特性可测试、向后兼容的。WebAssembly 可以被 JavaScript 调用，进入 JavaScript 上下文，也可以像 Web API 一样调用浏览器的功能。当然，WebAssembly 不仅可以运行在浏览器上，也可以运行在非web环境下。

## 4. 相关工具
- [emscripten](https://emscripten.org/)：将 C、C++ 代码转换成 wasm、asm.js

## 5. 初体验

<br>
<br>

**博文参考**
- [WebAssembly 现状与实战](https://developer.ibm.com/zh/articles/wa-lo-webassembly-status-and-reality/)
- [https://www.wasm.com.cn/](https://www.wasm.com.cn/)