const fs = require('fs');
const path = require('path');
const resource_url = path.join(__dirname, './resource/头像.jpeg');

const fileDownload = (ctx, next) => {
  const file = fs.readFileSync(resource_url);
  ctx.set({
    'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
    'Content-Disposition': `attachment; filename=${encodeURIComponent('头像.jpeg')}`, //告诉浏览器这是一个需要下载的文件
  });
  ctx.body = file;
  next();
};

const streamDownload = (ctx, next) => {
  const stream = fs.createReadStream(resource_url);
  ctx.set({
    'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
    'Content-Disposition': `attachment; filename=${encodeURIComponent('头像.jpeg')}`, //告诉浏览器这是一个需要下载的文件
  });
  ctx.body = stream;
  next();
};

function requestPromise(options) {
  
}

const bufferDownload = (ctx, next) => {

};

module.exports = { fileDownload, streamDownload, bufferDownload };
