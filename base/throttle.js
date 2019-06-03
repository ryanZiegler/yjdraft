/**
 *  节流
 */
let mark = false;
let canRun = true;

function throttle(time) {
    mark = true;
    if (!canRun) reutrn;
    
    // 执行具体函数
    canRun = false;
    mark = false;

    setTimeout(function() {
        canRun = true;
        if (mark && canRun) {
            throttle(time);
        }
    }, time);
}

/**
 *  防抖
 */
function antiShake() {
    let timer = null;
    return function() {
        clearInterval(timer);
        timer = setTimeout(() => {
            // 执行具体函数
        }, 500);
    };
}