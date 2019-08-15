// 原生js发送请求
const xhr = new XMLHttpRequest();
// get请求参数放在url中; post请求放在data中
// 调用open()方法并不会真正发送请求，而只是启动一个请求以备发送。
// 请求方法, URL, 是否异步 默认false
const url = 'https://';
let data = 'name=花花&age=18';
// 启动一个请求准备发送
xhr.open('GET', url + '?' + data, true);

// 设置请求头
xhr.setRequestHeader("Content-type","application/json");

// 发送请求
xhr.send();         // GET
data = {
    name: '草草',
    age: 108
}
xhr.send(data)      // POST

// 接收响应 
xhr.onreadystatechange = function() {
    // 0:请求未初始化 1:服务器连接已建立 2:请求已接收 3:请求处理中 4:请求已完成，且响应已就绪
    if (xhr.readyState === 4) {
        const status = xhr.status;
        if (status > 200 && status < 300) {
            // http状态码 200成功
            let response;
            const type = xhr.getResponseHeader('Content-type');
            if(type.indexOf('xml') !== -1 && xhr.responseXML) {   
                response = xhr.responseXML;                         //Document对象响应   
              } else if(type === 'application/json') {   
                response = JSON.parse(xhr.responseText);            //JSON响应   
              } else {
                response = xhr.responseText;                        //字符串响应 
              };
              // 执行成功回调
        } else {
            // 输出错误
        }
    }
}