# Node基本知识

## 全局变量
- __dirname
- __filename
- process

## 常用模块
### fs 模块
``` js
const fs = require('fs')

const buf = fs.readFileSync('./test.txt');console.log(buf)
fs.readFile('./test.txt', { encoding: 'utf8' }, (err, data) => {
    console.log(data)
})

fs.writeFileSync('test2.txt', 'hello world')
fs.writeFile('test2.txt', 'hello world', { encoding: 'utf8' }, err => {
    if (err) { console.log('失败了') }
})

fs.appendFileSync('test2.txt', '同步追加内容')
fs.appendFile('test2.txt','异步追加内容', err => {
    if(err) { console.log('异步追加失败') }
})

fs.read(fd, buffer, offset, length, position, callback)  // 读取大文件
```
#### fs.open(path, flags, [,mode], callback)
flags值
| Flag | 描述                                 |
|:-----|:-------------------------------------|
| r    | 只读模式打开,文件不存在时抛出异常    |
| r+   | 读写模式打开，文件不存在时抛出异常   |
| rs+  | 同步的方式读取和写入文件             |
| w    | 写入模式打开，文件不存在时创建文件   |
| wx   | 类似'w',文件存在时抛出异常           |
| w+   | 读写模式打开文件，文件不存在时则创建 |
| wx+  | 类似'w+',文件存在时抛出异常          |
| a    | 追加模式打开文件，文件不存在时则创建 |
| ax   | 类似'a',文件存在时抛出异常           |
| a+   | 读取追加模式打开,文件不存在则创建    |
| ax+  | 类似'a+',文件存在时抛出异常          |