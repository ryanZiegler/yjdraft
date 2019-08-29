/**
 * 用 setTimeout 实现 setInterval，阐述实现的效果与setInterval的差异
 * @param {Func} fn 定时执行的方法 
 * @param {Number} time  定时时间
 * @param {Number} count 执行次数
 */
function _setInterval(fn, time, count) {
    function interval() {
        if(typeof count === 'undefined' || count-- > 0){
            setTimeout(interval, time);
            try {
              fn()
            } catch(e) {
              count = 0;
              throw e.toString();
            }
        }
    }
    setTimeout(interval, time);
}

// 1.标准中，setInterval()如果前一次代码没有执行完，则会跳过此次代码的执行。
// 2.浏览器中，setInterval()如果前一次代码没有执行完，不会跳过此次代码，而是将其插在队列中，等待前一次代码执行完后立即执行。
// 3.Node中，setInterval()会严格按照间隔时间执行：一直等待完成上一次代码函数后，再经过时间间隔，才会进行下一次调用。
