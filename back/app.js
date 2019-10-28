const fs = require('fs');
const http = require('http');
const path = require('path');

const koa = require('koa2');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');

const routes = require('./router/routes');

const app = new koa();
const port = process.env.PORT || '8088';

// 文件上传
app.use(koaBody({
    formidable: {
        //设置文件的默认保存目录，不设置则保存在系统临时目录下
        uploadDir: path.join(__dirname, 'uploads')
    },
    multipart: true // 开启文件上传，默认是关闭
}));

// 静态文件访问
app.use(koaStatic(
    path.join(__dirname, 'static')
));

app.use(routes());

const server = http.createServer(app.callback());
server.listen(port);
console.log(`server is launched listen port ${port} ...`);