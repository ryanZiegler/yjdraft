function jsonp(obj) {
    const cbName = 'jsonp_' + Date.now();
    // 创建script标签
    const script = document.createElement('script');
    // 参数对象转化为 GET请求参数
    obj.params = obj.params || '';
    if (typeof obj.params === 'object') {
        let arr = [];
        for(let key in obj.params) {
            arr.push(key + '=' + obj.params[key]);
        }
        obj.params = arr.join('&');
    }

    script.src = obj.url + '?cb=' + cbName + '&' + obj.params;
    
    // 把script标签加入body中
    document.body.appendChild(script);

    window[cbName] = function(res) {
        obj.success(res);
        // 删除添加的标签
        delete window.cbName;
        document.body.removeChild(script);
    }
}


jsonp({
    // 请求地址
    url: '',
    // 请求参数
    params: {

    },
    // 成功回调
    success: function(res) {
        console.log(res)
    }
});