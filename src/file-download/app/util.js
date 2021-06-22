const fs = require('fs');
const path  = require('path')

const fileDownload = (ctx, next) => {
  const resource_url = './resource/avatar.jpeg';
  const res = fs.createReadStream(path.relative(__dirname, './app/', resource_url));
  res.pipe(ctx.body);
  next();
};

module.exports = { fileDownload };
