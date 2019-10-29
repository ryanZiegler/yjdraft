const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

const uploadHost= `http://localhost:8088/uploads/`;

module.exports = () => {
    router.get('/check', ctx => (ctx.body = 'server is working ...'));

    // form/xhr 文件上传
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

    // 分片上传
    router.post('/uploads/patch', ctx => {
        let { ep1: files=[] } = ctx.request.files || {};
        const result = [];
        // 文件标识,文件顺序
        const { token: fileToken, index: fileIndex, type, filename: name, chunkCount: count } = ctx.request.body;

        // 文件数组遍历
        files = Array.isArray(files) ? files : [files];
        files.forEach(file => {
            const { path, name: fname } = file;
            const nextPath = path.slice(0, path.lastIndexOf('\\') + 1) + fileIndex + '-' + fileToken;
            if (file.size > 0 && path) {
                // 得到扩展名
                // const extArr = fname.split('.');
                // const ext = extArr[extArr.length - 1];
                // 重命名文件
                fs.renameSync(path, nextPath);
                
                //文件可访问路径放入数组
                result.push(uploadHost+ nextPath.slice(nextPath.lastIndexOf('/') + 1));
            }
        });
        // 合并分片文件
        if (type === 'merge') {
            const filename = name,
            chunkCount = count,
                folder = path.resolve(__dirname, '../uploads') + '/';
            
            let writeStream = fs.createWriteStream(`${folder}${filename}`);
    
            let cindex = 0;
            // 合并文件
            function fnMergeFile() {
                const fname = `${folder}${cindex}-${fileToken}`;
                let readStream = fs.createReadStream(fname);
                readStream.pipe(writeStream, { end: cindex + 1 == chunkCount });
                readStream.on("end", function () { 
                    fs.unlink(fname, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                    if (cindex + 1 < chunkCount) {
                        cindex += 1;
                        fnMergeFile();
                    }
                });
            }
            fnMergeFile();
            ctx.body = 'merge ok 200';
        } else {
            ctx.body = 'patch uploaded 200';
        }
    });

    return router.routes();
}