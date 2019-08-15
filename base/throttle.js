/**
 *  节流
 */
function throttle(func, wait = 50) {
    // 上一次函数执行时间
    let lastTime = 0;
    return function(...args) {
        let now = +new Date();
        if (now - lastTime > wait) {
            lastTime = now;
            func.apply(this, args);
        }
    }
}

setInterval(
    throttle(() => {
        console.log(1)
    }, 500),
    1
)

/**
 *  防抖
 */
function debounce(func, wait = 50) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            // 执行具体函数
            func.apply(this, ...args);
        }, wait);
    };
}