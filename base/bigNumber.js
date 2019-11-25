/**
 * 大数相加
 * @param {*} a 
 * @param {*} b 
 */
function bigNumberSum(a, b) {
    let temp = 0,
        res = '';
    
    a = a.toString().split('');
    b = b.toString().split('');
    
    while(a.length || b.length || temp) {
        // true + 1 => 1    false + 1 => 1
        temp += ~~a.pop() + ~~b.pop();
        res = temp % 10 + res;
        temp = temp > 9; 
    }

    return res.replace(/^0+/, '');
}

console.log(bigNumberSum('0001', '002'));

/**
 * 千分位转化
 * @param {*} num 
 * 
 */
function numFormat(num) {
    return num.toString().indexOf('.') !== -1 ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
console.log(numFormat(123456789));