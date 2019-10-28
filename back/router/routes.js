const fs = require('fs');
const router = require('koa-router')();

const uploadHost= `http://localhost:8088/uploads/`;

module.exports = () => {
    router.get('/check', ctx => (ctx.body = 'server is working ...'));

    // form 文件上传
    router.post('/uploads', ctx => {
        let { ep1: files } = ctx.request.files || {};
        if (!files) {
            ctx.status = 400;
            ctx.body = '无上传文件';
            return;
        };
        const result = [];
        // 文件数组遍历
        files = Array.isArray(files) ? files : [files];
        files.forEach(file => {
            const { path, name: fname } = file;
            // const nextPath = path + fname;
            if (file.size > 0 && path) {
                // 得到扩展名
                const extArr = fname.split('.');
                const ext = extArr[extArr.length - 1];
                const nextPath = path + '.' + ext;
                // 重命名文件
                fs.renameSync(path, nextPath);
                
                //文件可访问路径放入数组
                result.push(uploadHost+ nextPath.slice(nextPath.lastIndexOf('/') + 1));
            }
        })

        // 以 json 形式输出上传文件地址
        ctx.body = `{
            "fileUrl": ${JSON.stringify(result)}
        }`;
    });

    router.post('/xhr/check', ctx => {
        ctx.body = 'hello world';
    });

    return router.routes();
}