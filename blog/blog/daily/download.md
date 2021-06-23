# 文件下载

## Node 中的文件下载

### 1. 基于 Node.Js 读取文件流的方式

1. File 文件流

```js
const file = fs.readFileSync(resource_url);
ctx.set({
    "Content-Type": "application/octet-stream", //告诉浏览器这是一个二进制文件
    "Content-Disposition": `attachment; filename=${encodeURIComponent(
        "头像.jpeg"
    )}`, //告诉浏览器这是一个需要下载的文件
});
ctx.body = file;
```

2. **Stream 文件流**

stream 文件流适合大文件传输

```js
const stream = fs.createReadStream(resource_url);
ctx.set({
    "Content-Type": "application/octet-stream", //告诉浏览器这是一个二进制文件
    "Content-Disposition": `attachment; filename=${encodeURIComponent(
        "头像.jpeg"
    )}`, //告诉浏览器这是一个需要下载的文件
});
ctx.body = stream;
```

3. **Buffer 文件流**

    如果文件由服务端生成，Node 只是一个中专站，先从服务器下载对应的二进制文件，然后将文件缓存在 Buffer 中，最后把二进制写到 body 中

```js
function requestPromise(options) {
    return new Promise(function (resolve, reject) {
        const req = http.request(options, function (res) {
            let { statusCode } = res;
            //返回不是200
            if (statusCode !== 200) {
                return reject(new Error("error"));
            }
            let arr = [];
            let len = 0;
            res.on("data", (chunk) => {
                len += chunk.length;
                arr.push(Buffer.from(chunk));
            });
            res.on("end", () => {
                //正确 success
                return resolve(Buffer.concat(arr, len));
            });
        });

        //请求出错
        req.on("error", (err) => {
            return reject(err);
        });
        req.end();
    });
}

/** 下载文件 */
ctx.set({
    "Content-Type": "application/octet-stream", //告诉浏览器这是一个二进制文件
    "Content-Disposition": `attachment; filename=${encodeURIComponent(
        "头像.jpeg"
    )}`, //告诉浏览器这是一个需要下载的文件
});
let buffer = await requestPromise(/** options */);
ctx.body = buffer;
```

### 2. 前端下载

1. **文件地址下载**

```html
<!-- a标签下载 -->
<a href="https://blog.bestwuzhuang.com/avatar.jpg" download></a>

<!-- JS自动创建标签 -->
<script>
    const a = document.createElement("a");
    a.download = "avatar.jpg";
    a.href = "https://blog.bestwuzhuang.com/avatar.jpg";
    a.click();
</script>
```

2. **URL.createObjectURL()**

URL.createObjectURL()会创建一个 DOMString，其中包含一个资源对象的 URL，它的生命周期与窗口中的 document 绑定，这个 URL 表示指定的 File 对象或者 Blob 对象<br>
参数支持 File、Blob 或者 MediaSource

<br/>
<br/>

-   **博文参考**
    -   [Node.js Koa 框架下载文件](https://jinyy.app/article/koa-download/)
    -   [前端实现文件下载功能的三种方式](https://cloud.tencent.com/developer/article/1630962)
